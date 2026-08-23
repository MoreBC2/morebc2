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

const hiddenProjectFiles = new Set([
  'README.md',
  'ROADMAP.md',
  'GOVERNANCE.md',
  'FOUNDING_PRINCIPLES.md',
  'DOCUMENTATION_PHILOSOPHY.md',
  'DOCUMENTATION_TAXONOMY.md',
  'STYLE_GUIDE.md',
  'STYLE_CONVENTIONS.md',
  'WRITING_CHECKLIST.md',
]);

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

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
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

function extractDocumentMetadata(markdown) {
  const lines = markdown.split('\n');
  const metadata = {};
  const patterns = [
    ['category', /^\*\*Category:\*\*\s*(.+)$/i],
    ['status', /^\*\*Status:\*\*\s*(.+)$/i],
    ['lastReviewed', /^\*\*Last reviewed:\*\*\s*(.+)$/i],
  ];

  const consumed = new Set();
  const scanLimit = Math.min(lines.length, 12);

  for (let index = 0; index < scanLimit; index += 1) {
    const line = lines[index].trim();
    for (const [key, pattern] of patterns) {
      const match = line.match(pattern);
      if (match) {
        metadata[key] = match[1].trim();
        consumed.add(index);
      }
    }
  }

  if (consumed.size === 0) return { markdown, metadata };

  const remaining = lines.filter((_, index) => !consumed.has(index));
  while (remaining[0] === '') remaining.shift();
  return { markdown: remaining.join('\n'), metadata };
}

function metadataBlock(metadata) {
  const items = [];
  if (metadata.category) {
    items.push(`<span class="morebc2-meta__item"><strong>Category</strong><span>${escapeHtml(metadata.category)}</span></span>`);
  }
  if (metadata.status) {
    const statusClass = slugFromFilename(metadata.status).replace(/[^a-z0-9-]/g, '-');
    items.push(`<span class="morebc2-meta__item"><strong>Status</strong><span class="morebc2-status morebc2-status--${statusClass}">${escapeHtml(metadata.status)}</span></span>`);
  }
  if (metadata.lastReviewed) {
    items.push(`<span class="morebc2-meta__item"><strong>Last reviewed</strong><span>${escapeHtml(metadata.lastReviewed)}</span></span>`);
  }

  if (items.length === 0) return '';
  return `<div class="morebc2-meta" role="group" aria-label="Document status">${items.join('')}</div>\n\n`;
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

function makeFrontmatter(title, sourcePath, { hidden = false } = {}) {
  const lines = [
    '---',
    `title: ${escapeYamlString(title)}`,
    `description: ${escapeYamlString(`MoreBC2 documentation sourced from ${sourcePath}.`)}`,
  ];

  if (hidden) {
    lines.push('sidebar:', '  hidden: true');
  }

  lines.push('---', '');
  return lines.join('\n');
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

async function writeConverted(sourceAbsolute, outputRelative, sourceLabel, options = {}) {
  let markdown = await fs.readFile(sourceAbsolute, 'utf8');
  const fallbackTitle = path.basename(sourceAbsolute, '.md').replace(/[-_]/g, ' ');
  const title = extractTitle(markdown, fallbackTitle);

  markdown = stripDuplicateTopHeading(markdown, title);
  const extracted = extractDocumentMetadata(markdown);
  markdown = extracted.markdown;
  markdown = rewriteMarkdownLinks(markdown, sourceAbsolute);

  const destination = path.join(outputRoot, outputRelative);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(
    destination,
    `${makeFrontmatter(title, sourceLabel, options)}${metadataBlock(extracted.metadata)}${markdown.trimStart()}\n`,
    'utf8',
  );
}

async function writeHomepage() {
  const homepage = `---
title: MoreBC2
description: Community-maintained, source-backed documentation for the BitcoinII (BC2) ecosystem.
template: splash
hero:
  title: MoreBC2
  tagline: Preserving the knowledge. Strengthening the ecosystem.
  actions:
    - text: Start with BitcoinII
      link: /documentation/what-is-bitcoinii/
      icon: right-arrow
    - text: Network specifications
      link: /documentation/network-specifications/
      icon: right-arrow
    - text: Verification
      link: /verification/
      icon: right-arrow
---

## A map to the source of truth

MoreBC2 preserves, organizes, and explains publicly verifiable information about BitcoinII. It is not the source of truth; it is a map to the source of truth.

The documentation separates established facts, direct observations, research, historical context, and open questions so readers can see how strongly each claim is supported.

## New here?

Start with [What is BitcoinII?](/documentation/what-is-bitcoinii/), then continue to [network specifications](/documentation/network-specifications/), [wallets](/wallets/), [nodes](/nodes/), or [mining](/mining/).

## Building or integrating?

Developers and service operators can browse the [developer documentation](/developers/), [RPC material](/developers/rpc-overview/), [exchange integration package](/exchange/), and [verification records](/verification/).

## Evidence first

Many MoreBC2 pages are still Draft or Needs Review. Status labels are intentionally conservative. Technical claims should be checked against the cited primary source or dated observation before being treated as verified.
`;

  await fs.writeFile(path.join(outputRoot, 'index.md'), homepage, 'utf8');
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

  // The public homepage is generated explicitly below rather than exposing the docs index.
  if (/^README\.md$/i.test(normalized)) continue;

  let outputRelative = docsRelative;
  const isSectionIndex = /^README\.md$/i.test(path.basename(outputRelative));
  if (isSectionIndex) {
    outputRelative = path.join(path.dirname(outputRelative), 'index.md');
  }

  await writeConverted(sourceAbsolute, outputRelative, `docs/${normalized}`, { hidden: isSectionIndex });
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
  await writeConverted(sourceAbsolute, outputRelative, filename, { hidden: hiddenProjectFiles.has(filename) });
  converted += 1;
}

await writeHomepage();
converted += 1;

console.log(`Prepared ${converted} MoreBC2 pages for Starlight.`);
