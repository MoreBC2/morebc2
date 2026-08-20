import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, 'docs');
const outputRoot = path.join(repoRoot, 'src', 'content', 'docs');

const rootProjectFiles = [
  'README.md',
  'PROJECT_STATUS.md',
  'ROADMAP.md',
  'CONTRIBUTING.md',
  'EVIDENCE_SCALE.md',
  'SOURCE_REGISTRY.md',
  'GLOSSARY.md',
  'GOVERNANCE.md',
  'FOUNDING_PRINCIPLES.md',
  'DOCUMENTATION_PHILOSOPHY.md',
  'DOCUMENTATION_TAXONOMY.md',
  'STYLE_GUIDE.md',
  'STYLE_CONVENTIONS.md',
  'WRITING_CHECKLIST.md',
];

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function slugFromFilename(filename) {
  return filename
    .replace(/\.md$/i, '')
    .replace(/_/g, '-')
    .toLowerCase();
}

function escapeYamlString(value) {
  return JSON.stringify(value.replace(/\s+/g, ' ').trim());
}

function extractTitle(markdown, fallback) {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading || fallback;
}

function stripDuplicateTopHeading(markdown, title) {
  const lines = markdown.split('\n');
  const headingIndex = lines.findIndex((line) => line.trim() === `# ${title}`);
  if (headingIndex === -1) return markdown;

  lines.splice(headingIndex, 1);
  if (lines[headingIndex] === '') lines.splice(headingIndex, 1);
  return lines.join('\n');
}

function docsRoute(relativePath) {
  const normalized = toPosix(relativePath);
  if (/^README\.md$/i.test(normalized)) return '/';
  if (/\/README\.md$/i.test(normalized)) {
    return `/${normalized.replace(/\/README\.md$/i, '')}/`;
  }
  return `/${normalized.replace(/\.md$/i, '')}/`;
}

function projectRoute(filename) {
  const base = path.basename(filename);
  if (/^README\.md$/i.test(base)) return '/project/readme/';
  return `/project/${slugFromFilename(base)}/`;
}

function resolveMarkdownTarget(sourceAbsolute, rawTarget) {
  const [targetPath, fragment = ''] = rawTarget.split('#', 2);
  if (!targetPath || !/\.md$/i.test(targetPath)) return null;
  if (/^[a-z]+:/i.test(targetPath) || targetPath.startsWith('//')) return null;

  const resolved = path.resolve(path.dirname(sourceAbsolute), targetPath);
  const relativeToDocs = path.relative(docsRoot, resolved);

  if (!relativeToDocs.startsWith('..') && !path.isAbsolute(relativeToDocs)) {
    return `${docsRoute(relativeToDocs)}${fragment ? `#${fragment}` : ''}`;
  }

  const relativeToRepo = path.relative(repoRoot, resolved);
  if (!relativeToRepo.startsWith('..') && !path.isAbsolute(relativeToRepo)) {
    const repoRelative = toPosix(relativeToRepo);
    if (!repoRelative.includes('/') && rootProjectFiles.includes(repoRelative)) {
      return `${projectRoute(repoRelative)}${fragment ? `#${fragment}` : ''}`;
    }
  }

  return null;
}

function rewriteMarkdownLinks(markdown, sourceAbsolute) {
  return markdown.replace(/\]\(([^)]+\.md(?:#[^)]+)?)\)/g, (match, target) => {
    const replacement = resolveMarkdownTarget(sourceAbsolute, target);
    return replacement ? `](${replacement})` : match;
  });
}

function makeFrontmatter(title, sourcePath) {
  return [
    '---',
    `title: ${escapeYamlString(title)}`,
    `description: ${escapeYamlString(`MoreBC2 documentation sourced from ${sourcePath}.`)}`,
    '---',
    '',
  ].join('\n');
}

async function listMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(absolute));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(absolute);
    }
  }

  return files;
}

async function writeConverted(sourceAbsolute, outputRelative, sourceLabel) {
  let markdown = await fs.readFile(sourceAbsolute, 'utf8');
  const fallbackTitle = path.basename(sourceAbsolute, '.md').replace(/[-_]/g, ' ');
  const title = extractTitle(markdown, fallbackTitle);

  markdown = stripDuplicateTopHeading(markdown, title);
  markdown = rewriteMarkdownLinks(markdown, sourceAbsolute);

  const destination = path.join(outputRoot, outputRelative);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, `${makeFrontmatter(title, sourceLabel)}${markdown.trimStart()}\n`, 'utf8');
}

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

const docsFiles = await listMarkdownFiles(docsRoot);
let converted = 0;

for (const sourceAbsolute of docsFiles) {
  const docsRelative = path.relative(docsRoot, sourceAbsolute);
  const normalized = toPosix(docsRelative);

  // Site-planning drafts describe the website rather than BitcoinII itself.
  if (normalized.startsWith('site/')) continue;

  let outputRelative = docsRelative;
  if (/^README\.md$/i.test(path.basename(outputRelative))) {
    outputRelative = path.join(path.dirname(outputRelative), 'index.md');
  }

  await writeConverted(sourceAbsolute, outputRelative, `docs/${normalized}`);
  converted += 1;
}

for (const filename of rootProjectFiles) {
  const sourceAbsolute = path.join(repoRoot, filename);
  try {
    await fs.access(sourceAbsolute);
  } catch {
    continue;
  }

  const outputRelative = path.join('project', `${slugFromFilename(filename)}.md`);
  await writeConverted(sourceAbsolute, outputRelative, filename);
  converted += 1;
}

console.log(`Prepared ${converted} MoreBC2 Markdown pages for Starlight.`);
