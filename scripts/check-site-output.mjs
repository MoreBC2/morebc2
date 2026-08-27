import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const distRoot = path.join(repoRoot, 'dist');
const siteOrigin = 'https://morebc2-preview.pages.dev';

function toPosix(value) {
  return value.replaceAll('\\', '/');
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function pageUrlForHtml(htmlFile) {
  const relative = toPosix(path.relative(distRoot, htmlFile));
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -10)}`;
  return `/${relative}`;
}

function candidateFiles(pathname) {
  const relative = pathname.replace(/^\/+/, '');
  if (!relative || pathname.endsWith('/')) return [path.join(distRoot, ...relative.split('/'), 'index.html')];
  if (path.posix.extname(pathname)) return [path.join(distRoot, ...relative.split('/'))];
  return [
    path.join(distRoot, ...relative.split('/')),
    path.join(distRoot, ...relative.split('/'), 'index.html'),
    path.join(distRoot, ...`${relative}.html`.split('/')),
  ];
}

const allFiles = await listFiles(distRoot);
// Keep exact casing even on case-insensitive development filesystems so the
// audit matches Cloudflare Pages' Linux behavior.
const existingFiles = new Set(allFiles.map((file) => path.resolve(file)));
const htmlFiles = allFiles.filter((file) => file.toLowerCase().endsWith('.html'));
const htmlCache = new Map();

async function readHtml(file) {
  const key = path.resolve(file).toLowerCase();
  if (!htmlCache.has(key)) htmlCache.set(key, await fs.readFile(file, 'utf8'));
  return htmlCache.get(key);
}

const issues = [];
let internalLinks = 0;
let anchors = 0;

for (const htmlFile of htmlFiles) {
  const html = await readHtml(htmlFile);
  const pageUrl = pageUrlForHtml(htmlFile);
  const hrefs = [...html.matchAll(/\shref=(?:"([^"]*)"|'([^']*)')/gi)].map((match) => decodeHtml(match[1] ?? match[2]));

  for (const href of hrefs) {
    if (!href || /^(mailto|tel|javascript|data):/i.test(href)) continue;

    let url;
    try {
      url = new URL(href, `${siteOrigin}${pageUrl}`);
    } catch {
      issues.push(`${pageUrl}: malformed href ${href}`);
      continue;
    }
    if (url.origin !== siteOrigin) continue;
    internalLinks += 1;

    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      issues.push(`${pageUrl}: malformed URL encoding in ${href}`);
      continue;
    }
    if (/\.md$/i.test(pathname)) {
      issues.push(`${pageUrl}: local href still points to Markdown: ${href}`);
      continue;
    }

    const candidates = candidateFiles(pathname);
    const target = candidates.find((candidate) => existingFiles.has(path.resolve(candidate)));
    if (!target) {
      issues.push(`${pageUrl}: unresolved local route ${href}`);
      continue;
    }

    if (url.hash && target.toLowerCase().endsWith('.html')) {
      anchors += 1;
      let fragment;
      try {
        fragment = decodeURIComponent(url.hash.slice(1));
      } catch {
        issues.push(`${pageUrl}: malformed fragment encoding in ${href}`);
        continue;
      }
      if (!fragment) continue;
      const targetHtml = await readHtml(target);
      const ids = new Set([...targetHtml.matchAll(/\sid=(?:"([^"]+)"|'([^']+)')/gi)].map((match) => decodeHtml(match[1] ?? match[2])));
      if (!ids.has(fragment)) issues.push(`${pageUrl}: missing anchor ${href}`);
    }
  }
}

if (issues.length > 0) {
  throw new Error(`Generated site link audit failed:\n- ${[...new Set(issues)].join('\n- ')}`);
}

console.log(`Audited ${htmlFiles.length} HTML files, ${internalLinks} internal links, and ${anchors} anchored links.`);
