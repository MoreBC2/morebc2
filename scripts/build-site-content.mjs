import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

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

// These working pages remain directly addressable and searchable, but do not
// belong in the normal reader sidebar.
const hiddenDocPaths = new Set([
  'docs/verification/codex-task-prompts.md',
  'docs/verification/first-review-packet-command-safety.md',
  'docs/verification/first-review-packet-release-wording.md',
  'docs/verification/private-review-assignments.md',
  'docs/verification/private-review-readiness.md',
  'docs/verification/review-feedback-buckets.md',
]);

function toPosix(value) {
  return value.replaceAll('\\', '/');
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\.md$/i, '')
    .replace(/&/g, '-and-')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function humanizeFilename(filename) {
  const value = path.basename(filename, '.md').replace(/[-_]+/g, ' ').trim();
  return value ? value[0].toUpperCase() + value.slice(1) : 'Untitled';
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

function plainTextHeading(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/\s+#+\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseSimpleYamlScalar(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }
  return trimmed;
}

function extractSourceFrontmatter(markdown) {
  const normalized = markdown.replace(/^\uFEFF/, '');
  const lines = normalized.split('\n');
  if (lines[0]?.trim() !== '---') return { markdown: normalized, data: {} };

  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (closingIndex === -1) {
    throw new Error('Source Markdown starts with YAML frontmatter but has no closing delimiter.');
  }

  const raw = lines.slice(1, closingIndex);
  const data = {};
  const supportedKeys = new Set(['title', 'description']);
  const unsupportedKeys = raw
    .map((line) => line.match(/^([A-Za-z][A-Za-z0-9_-]*):/)?.[1])
    .filter((key) => key && !supportedKeys.has(key.toLowerCase()));
  for (const key of ['title', 'description']) {
    const keyPattern = new RegExp(`^${key}:\\s*`, 'i');
    const match = raw.find((line) => keyPattern.test(line));
    if (match) data[key] = parseSimpleYamlScalar(match.replace(keyPattern, ''));
  }

  return {
    markdown: lines.slice(closingIndex + 1).join('\n').replace(/^\s*\n/, ''),
    data,
    unsupportedKeys: [...new Set(unsupportedKeys)],
  };
}

function findFirstH1(markdown) {
  const lines = markdown.split('\n');
  let fence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const fenceMatch = lines[index].match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) {
        fence = { character: marker[0], length: marker.length };
      } else if (marker[0] === fence.character && marker.length >= fence.length) {
        fence = null;
      }
      continue;
    }

    if (!fence) {
      const match = lines[index].match(/^#\s+(.+?)\s*$/);
      if (match) return { index, raw: match[1].trim() };
    }
  }

  return null;
}

function removeHeading(markdown, headingIndex) {
  if (headingIndex === undefined) return markdown;
  const lines = markdown.split('\n');
  lines.splice(headingIndex, 1);
  if (lines[headingIndex]?.trim() === '') lines.splice(headingIndex, 1);
  return lines.join('\n');
}

function extractDocumentMetadata(markdown, sourceLabel) {
  const lines = markdown.split('\n');
  const metadata = {};
  const patterns = [
    ['category', /^\*\*Category:\*\*\s*(.*?)\s*$/i],
    ['status', /^\*\*Status:\*\*\s*(.*?)\s*$/i],
    ['lastReviewed', /^\*\*Last reviewed:\*\*\s*(.*?)\s*$/i],
  ];

  let index = 0;
  while (lines[index]?.trim() === '') index += 1;
  let end = index;

  while (end < lines.length) {
    const line = lines[end].trim();
    if (!line) {
      end += 1;
      continue;
    }

    const matched = patterns.find(([, pattern]) => pattern.test(line));
    if (!matched) break;
    const [key, pattern] = matched;
    const value = line.match(pattern)?.[1]?.trim();
    if (!value) throw new Error(`${sourceLabel}: metadata field ${key} has no value.`);
    if (metadata[key]) throw new Error(`${sourceLabel}: metadata field ${key} appears more than once in the document header.`);
    metadata[key] = value;
    end += 1;
  }

  if (Object.keys(metadata).length === 0) return { markdown, metadata };
  while (lines[end]?.trim() === '') end += 1;
  return { markdown: [...lines.slice(0, index), ...lines.slice(end)].join('\n'), metadata };
}

function statusTone(status) {
  const normalized = status.toLowerCase().trim();
  if (normalized === 'reviewed' || normalized === 'verified') return normalized;
  if (normalized.startsWith('draft')) return 'draft';
  if (normalized.startsWith('framework')) return 'framework';
  if (normalized.startsWith('needs review') || normalized.startsWith('needs direct')) return 'needs-review';
  if (normalized.startsWith('partial') || normalized.startsWith('partially')) return 'partial';
  return 'other';
}

function metadataBlock(metadata) {
  const items = [];
  if (metadata.category) {
    items.push(`<span class="morebc2-meta__item"><strong>Category</strong><span>${escapeHtml(metadata.category)}</span></span>`);
  }
  if (metadata.status) {
    items.push(`<span class="morebc2-meta__item"><strong>Status</strong><span class="morebc2-status morebc2-status--${statusTone(metadata.status)}">${escapeHtml(metadata.status)}</span></span>`);
  }
  if (metadata.lastReviewed) {
    items.push(`<span class="morebc2-meta__item"><strong>Last reviewed</strong><span>${escapeHtml(metadata.lastReviewed)}</span></span>`);
  }

  if (items.length === 0) return '';
  return `<div class="morebc2-meta" role="group" aria-label="Document status">${items.join('')}</div>\n\n`;
}

function outputRelativeForDocs(docsRelative) {
  const normalized = toPosix(docsRelative);
  const segments = normalized.split('/');
  const filename = segments.pop();
  const directories = segments.map(slugify);
  if (/^README\.md$/i.test(filename)) return [...directories, 'index.md'].join('/');
  // A canonical index.md next to README.md needs a distinct site route. Without
  // this name it would silently overwrite the section README output.
  if (/^index\.md$/i.test(filename)) return [...directories, 'historical-index.md'].join('/');

  const slug = slugify(filename);
  if (!slug) throw new Error(`Cannot generate a slug for docs/${normalized}.`);
  return [...directories, `${slug}.md`].join('/');
}

function routeFromOutput(outputRelative) {
  const withoutExtension = toPosix(outputRelative).replace(/\.md$/i, '');
  if (withoutExtension === 'index') return '/';
  if (withoutExtension.endsWith('/index')) return `/${withoutExtension.slice(0, -6)}/`;
  return `/${withoutExtension}/`;
}

function projectOutputRelative(filename) {
  return `project/${slugify(filename)}.md`;
}

async function listMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(absolute));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(absolute);
    }
  }

  return files;
}

function buildSourceMaps(convertibleEntries) {
  const sourceRoutes = new Map();
  const caseInsensitiveSources = new Map();
  const routeOwners = new Map();
  const outputOwners = new Map();

  for (const entry of convertibleEntries) {
    const sourceKey = entry.sourceKey;
    const routeKey = entry.route.toLowerCase();
    const outputKey = entry.outputRelative.toLowerCase();

    if (caseInsensitiveSources.has(sourceKey.toLowerCase())) {
      throw new Error(`Source path differs only by case: ${sourceKey} and ${caseInsensitiveSources.get(sourceKey.toLowerCase())}.`);
    }
    if (routeOwners.has(routeKey)) {
      throw new Error(`Duplicate generated route ${entry.route}: ${entry.sourceLabel} and ${routeOwners.get(routeKey)}.`);
    }
    if (outputOwners.has(outputKey)) {
      throw new Error(`Generated files would overwrite each other: ${entry.outputRelative}.`);
    }

    sourceRoutes.set(sourceKey, entry.route);
    caseInsensitiveSources.set(sourceKey.toLowerCase(), sourceKey);
    routeOwners.set(routeKey, entry.sourceLabel);
    outputOwners.set(outputKey, entry.sourceLabel);
  }

  // docs/README.md is represented by the purpose-built homepage.
  sourceRoutes.set('docs/README.md', '/');
  caseInsensitiveSources.set('docs/readme.md', 'docs/README.md');
  return { sourceRoutes, caseInsensitiveSources };
}

function parseMarkdownTarget(rawTarget) {
  const wrapped = rawTarget.startsWith('<') && rawTarget.endsWith('>');
  const target = wrapped ? rawTarget.slice(1, -1) : rawTarget;
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//')) return null;

  const fragmentIndex = target.indexOf('#');
  const beforeFragment = fragmentIndex === -1 ? target : target.slice(0, fragmentIndex);
  const fragment = fragmentIndex === -1 ? '' : target.slice(fragmentIndex);
  const queryIndex = beforeFragment.indexOf('?');
  const pathname = queryIndex === -1 ? beforeFragment : beforeFragment.slice(0, queryIndex);
  const query = queryIndex === -1 ? '' : beforeFragment.slice(queryIndex);
  if (!/\.md$/i.test(pathname)) return null;
  return { pathname, query, fragment, wrapped };
}

function resolveMarkdownTarget(sourceKey, rawTarget, maps, linkIssues) {
  const parsed = parseMarkdownTarget(rawTarget);
  if (!parsed) return null;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(parsed.pathname);
  } catch {
    linkIssues.push(`${sourceKey}: malformed URL encoding in ${rawTarget}`);
    return null;
  }

  if (decodedPath.includes('\\')) {
    linkIssues.push(`${sourceKey}: Markdown links must use POSIX separators: ${rawTarget}`);
    return null;
  }

  const candidate = decodedPath.startsWith('/')
    ? path.posix.normalize(decodedPath.slice(1))
    : path.posix.normalize(path.posix.join(path.posix.dirname(sourceKey), decodedPath));
  const route = maps.sourceRoutes.get(candidate);

  if (!route) {
    const caseMatch = maps.caseInsensitiveSources.get(candidate.toLowerCase());
    if (caseMatch) {
      linkIssues.push(`${sourceKey}: link target has incorrect case (${rawTarget}); expected ${caseMatch}`);
    } else {
      linkIssues.push(`${sourceKey}: link target is not a generated page: ${rawTarget}`);
    }
    return null;
  }

  const replacement = `${route}${parsed.query}${parsed.fragment}`;
  return parsed.wrapped ? `<${replacement}>` : replacement;
}

function rewriteMarkdownLinks(markdown, sourceKey, maps, linkIssues) {
  const lines = markdown.split('\n');
  let fence = null;

  return lines.map((line) => {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) {
        fence = { character: marker[0], length: marker.length };
      } else if (marker[0] === fence.character && marker.length >= fence.length) {
        fence = null;
      }
      return line;
    }
    if (fence) return line;

    let rewritten = line.replace(/(\]\(\s*)(<[^>\n]+>|[^)\s\n]+)([^)\n]*\))/g, (match, prefix, target, suffix) => {
      const replacement = resolveMarkdownTarget(sourceKey, target, maps, linkIssues);
      return replacement ? `${prefix}${replacement}${suffix}` : match;
    });

    rewritten = rewritten.replace(/^(\s{0,3}\[[^\]]+\]:\s*)(<[^>]+>|\S+)(.*)$/g, (match, prefix, target, suffix) => {
      const replacement = resolveMarkdownTarget(sourceKey, target, maps, linkIssues);
      return replacement ? `${prefix}${replacement}${suffix}` : match;
    });
    return rewritten;
  }).join('\n');
}

function makeFrontmatter(title, sourcePath, { description, hidden = false } = {}) {
  const lines = [
    '---',
    `title: ${escapeYamlString(title)}`,
    `description: ${escapeYamlString(description || `MoreBC2 documentation sourced from ${sourcePath}.`)}`,
  ];

  if (hidden) lines.push('sidebar:', '  hidden: true');
  lines.push('---', '');
  return lines.join('\n');
}

async function writeConverted(entry, maps, linkIssues, metadataSummary) {
  let markdown = await fs.readFile(entry.sourceAbsolute, 'utf8');
  let sourceFrontmatter;
  let unsupportedFrontmatterKeys;
  try {
    ({ markdown, data: sourceFrontmatter, unsupportedKeys: unsupportedFrontmatterKeys = [] } = extractSourceFrontmatter(markdown));
  } catch (error) {
    throw new Error(`${entry.sourceLabel}: ${error.message}`);
  }
  if (unsupportedFrontmatterKeys.length > 0) {
    throw new Error(`${entry.sourceLabel}: unsupported source frontmatter key(s): ${unsupportedFrontmatterKeys.join(', ')}.`);
  }

  const heading = findFirstH1(markdown);
  const title = plainTextHeading(heading?.raw || sourceFrontmatter.title || humanizeFilename(entry.sourceAbsolute));
  if (!title) throw new Error(`${entry.sourceLabel}: no usable generated title.`);

  markdown = removeHeading(markdown, heading?.index);
  const extracted = extractDocumentMetadata(markdown, entry.sourceLabel);
  markdown = rewriteMarkdownLinks(extracted.markdown, entry.sourceKey, maps, linkIssues);

  if (!extracted.metadata.status) metadataSummary.withoutStatus.push(entry.sourceLabel);
  if (extracted.metadata.lastReviewed) {
    const value = extracted.metadata.lastReviewed;
    const dateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const parsed = dateMatch ? new Date(`${value}T00:00:00Z`) : null;
    const validDate = parsed && !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
    if (!validDate && !/^(Not yet reviewed|YYYY-MM-DD)$/i.test(value)) {
      metadataSummary.malformedDates.push(`${entry.sourceLabel}: ${value}`);
    }
  }

  const destination = path.join(outputRoot, ...entry.outputRelative.split('/'));
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(
    destination,
    `${makeFrontmatter(title, entry.sourceLabel, { ...entry, description: sourceFrontmatter.description })}${metadataBlock(extracted.metadata)}${markdown.trimStart()}\n`,
    'utf8',
  );
}

async function writeHomepage() {
  const homepage = `---
title: MoreBC2
description: Community-maintained, source-backed documentation for the BitcoinII (BC2) ecosystem.
template: splash
prev: false
next: false
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

## Reviewing or contributing?

Use the [evidence scale](/project/evidence-scale/), [source registry](/project/source-registry/), and [contribution guide](/project/contributing/) before proposing documentation or verification changes.

## Evidence first

Many MoreBC2 pages are still Draft or Needs Review. Status labels are intentionally conservative. Technical claims should be checked against the cited primary source or dated observation before being treated as verified.
`;

  await fs.writeFile(path.join(outputRoot, 'index.md'), homepage, 'utf8');
}

async function main() {
  const docsFiles = await listMarkdownFiles(docsRoot);
  const convertibleEntries = [];

  for (const sourceAbsolute of docsFiles) {
    const docsRelative = toPosix(path.relative(docsRoot, sourceAbsolute));
    const sourceKey = `docs/${docsRelative}`;
    if (docsRelative.startsWith('site/') || /^README\.md$/i.test(docsRelative)) continue;

    const outputRelative = outputRelativeForDocs(docsRelative);
    const isSectionIndex = /^README\.md$/i.test(path.posix.basename(docsRelative));
    convertibleEntries.push({
      sourceAbsolute,
      sourceKey,
      sourceLabel: sourceKey,
      outputRelative,
      route: routeFromOutput(outputRelative),
      hidden: isSectionIndex || hiddenDocPaths.has(sourceKey),
    });
  }

  for (const filename of rootProjectFiles) {
    const sourceAbsolute = path.join(repoRoot, filename);
    try {
      await fs.access(sourceAbsolute);
    } catch {
      continue;
    }

    const outputRelative = projectOutputRelative(filename);
    convertibleEntries.push({
      sourceAbsolute,
      sourceKey: filename,
      sourceLabel: filename,
      outputRelative,
      route: routeFromOutput(outputRelative),
      hidden: hiddenProjectFiles.has(filename),
    });
  }

  const maps = buildSourceMaps(convertibleEntries);
  const linkIssues = [];
  const metadataSummary = { withoutStatus: [], malformedDates: [] };

  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });

  for (const entry of convertibleEntries) {
    await writeConverted(entry, maps, linkIssues, metadataSummary);
  }

  if (linkIssues.length > 0) {
    throw new Error(`Internal Markdown link validation failed:\n- ${[...new Set(linkIssues)].join('\n- ')}`);
  }
  if (metadataSummary.malformedDates.length > 0) {
    throw new Error(`Malformed Last reviewed metadata:\n- ${metadataSummary.malformedDates.join('\n- ')}`);
  }

  await writeHomepage();

  console.log(`Prepared ${convertibleEntries.length + 1} MoreBC2 pages for Starlight.`);
  if (metadataSummary.withoutStatus.length > 0) {
    console.log(`Metadata note: ${metadataSummary.withoutStatus.length} generated source page(s) have no header Status field.`);
  }
}

export {
  buildSourceMaps,
  extractDocumentMetadata,
  extractSourceFrontmatter,
  findFirstH1,
  outputRelativeForDocs,
  plainTextHeading,
  resolveMarkdownTarget,
  rewriteMarkdownLinks,
  routeFromOutput,
  slugify,
};

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
