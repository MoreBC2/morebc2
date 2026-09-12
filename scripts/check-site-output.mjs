import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const distRoot = path.join(repoRoot, 'dist');
const siteOrigin = 'https://morebc2.pages.dev';
const legacyRoutesExpectedNoindex = new Set([
  '/verification/dashboard/',
  '/verification/historical-index/',
]);
const staleCurrentPhrases = [
  'Many MoreBC2 pages are still Draft or Needs Review.',
  'This section plans the future MoreBC2 public website.',
  'MoreBC2 is in early foundation-building mode.',
];

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

function decodeXml(value) {
  return decodeHtml(value).replaceAll('&apos;', "'");
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

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? decodeHtml(match[1] ?? match[2]) : null;
}

function robotsDirectives(html) {
  const directives = [];
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if (attribute(tag, 'name')?.toLowerCase() !== 'robots') continue;
    const content = attribute(tag, 'content') ?? '';
    directives.push(...content.toLowerCase().split(',').map((value) => value.trim()).filter(Boolean));
  }
  return directives;
}

function canonicalHref(html) {
  const canonicals = [];
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = (attribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical')) canonicals.push(attribute(tag, 'href'));
  }
  return canonicals.filter(Boolean);
}

function isStaticVerificationHtml(htmlFile) {
  const relative = toPosix(path.relative(distRoot, htmlFile));
  return /^google[^/]*\.html$/i.test(relative);
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
let contentPages = 0;
let noindexPages = 0;
const indexableCanonicalUrls = new Set();
const routeRobots = new Map();

for (const htmlFile of htmlFiles) {
  const html = await readHtml(htmlFile);
  const pageUrl = pageUrlForHtml(htmlFile);
  const hrefs = [...html.matchAll(/\shref=(?:"([^"]*)"|'([^']*)')/gi)].map((match) => decodeHtml(match[1] ?? match[2]));

  for (const href of hrefs) {
    if (!href || /^(mailto|tel|javascript|data):/i.test(href)) continue;
    if (/^https:\/\/[^/]*morebc2-preview\.pages\.dev(?:\/|$)/i.test(href)) {
      issues.push(`${pageUrl}: production output contains preview-host link ${href}`);
    }

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

  const relative = toPosix(path.relative(distRoot, htmlFile));
  if (relative === '404.html' || isStaticVerificationHtml(htmlFile) || !/<html\b/i.test(html)) continue;
  contentPages += 1;

  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !decodeHtml(titleMatch[1].replace(/<[^>]+>/g, '')).trim()) {
    issues.push(`${pageUrl}: missing or empty document title`);
  }

  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  if (h1Count !== 1) issues.push(`${pageUrl}: expected exactly one H1, found ${h1Count}`);

  const canonicals = canonicalHref(html);
  if (canonicals.length !== 1) {
    issues.push(`${pageUrl}: expected exactly one canonical link, found ${canonicals.length}`);
  } else {
    try {
      const canonical = new URL(canonicals[0], siteOrigin);
      if (canonical.origin !== siteOrigin) issues.push(`${pageUrl}: canonical points to unexpected origin ${canonical.href}`);
      if (canonical.pathname !== pageUrl) issues.push(`${pageUrl}: canonical pathname ${canonical.pathname} does not match rendered route`);
      indexableCanonicalUrls.add(canonical.href);
    } catch {
      issues.push(`${pageUrl}: malformed canonical URL ${canonicals[0]}`);
    }
  }

  const directives = robotsDirectives(html);
  routeRobots.set(pageUrl, directives);
  if (directives.includes('noindex')) noindexPages += 1;

  if (!directives.includes('noindex')) {
    for (const phrase of staleCurrentPhrases) {
      if (html.includes(phrase)) issues.push(`${pageUrl}: stale current-facing wording found: ${phrase}`);
    }
  }

  if (pageUrl.startsWith('/site/')) issues.push(`${pageUrl}: archived docs/site material leaked into deployed routes`);
}

for (const route of legacyRoutesExpectedNoindex) {
  const directives = routeRobots.get(route);
  if (!directives) {
    issues.push(`${route}: expected retained legacy route was not rendered`);
  } else if (!directives.includes('noindex')) {
    issues.push(`${route}: retained legacy route is not marked noindex`);
  }
}

const robotsPath = path.join(distRoot, 'robots.txt');
if (!existingFiles.has(path.resolve(robotsPath))) {
  issues.push('/robots.txt: missing generated robots file');
} else {
  const robots = await fs.readFile(robotsPath, 'utf8');
  if (!/^User-agent:\s*\*\s*$/mi.test(robots)) issues.push('/robots.txt: missing User-agent: *');
  if (!/^Allow:\s*\/\s*$/mi.test(robots)) issues.push('/robots.txt: missing Allow: /');
  if (/^Disallow:\s*\/\s*$/mi.test(robots)) issues.push('/robots.txt: root is disallowed');
}

const sitemapIndexPath = path.join(distRoot, 'sitemap-index.xml');
const sitemapUrls = new Set();
if (!existingFiles.has(path.resolve(sitemapIndexPath))) {
  issues.push('/sitemap-index.xml: missing generated sitemap index');
} else {
  const indexXml = await fs.readFile(sitemapIndexPath, 'utf8');
  const sitemapLocs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
  if (sitemapLocs.length === 0) issues.push('/sitemap-index.xml: contains no sitemap locations');

  for (const loc of sitemapLocs) {
    let sitemapUrl;
    try {
      sitemapUrl = new URL(loc);
    } catch {
      issues.push(`/sitemap-index.xml: malformed sitemap URL ${loc}`);
      continue;
    }
    if (sitemapUrl.origin !== siteOrigin) {
      issues.push(`/sitemap-index.xml: sitemap points to unexpected origin ${loc}`);
      continue;
    }

    const sitemapCandidates = candidateFiles(sitemapUrl.pathname);
    const sitemapFile = sitemapCandidates.find((candidate) => existingFiles.has(path.resolve(candidate)));
    if (!sitemapFile) {
      issues.push(`/sitemap-index.xml: unresolved sitemap file ${loc}`);
      continue;
    }

    const xml = await fs.readFile(sitemapFile, 'utf8');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
    for (const pageLoc of locs) {
      let page;
      try {
        page = new URL(pageLoc);
      } catch {
        issues.push(`${sitemapUrl.pathname}: malformed page URL ${pageLoc}`);
        continue;
      }
      if (page.origin !== siteOrigin) {
        issues.push(`${sitemapUrl.pathname}: page points to unexpected origin ${pageLoc}`);
        continue;
      }
      if (sitemapUrls.has(page.href)) issues.push(`${sitemapUrl.pathname}: duplicate sitemap URL ${page.href}`);
      sitemapUrls.add(page.href);

      const target = candidateFiles(page.pathname).find((candidate) => existingFiles.has(path.resolve(candidate)));
      if (!target) issues.push(`${sitemapUrl.pathname}: sitemap URL does not resolve to generated output ${pageLoc}`);

      const directives = routeRobots.get(page.pathname) ?? [];
      if (directives.includes('noindex')) issues.push(`${sitemapUrl.pathname}: noindex page remains in sitemap ${pageLoc}`);
    }
  }
}

for (const canonical of indexableCanonicalUrls) {
  const url = new URL(canonical);
  const directives = routeRobots.get(url.pathname) ?? [];
  if (!directives.includes('noindex') && !sitemapUrls.has(canonical)) {
    issues.push(`${url.pathname}: indexable canonical page is missing from sitemap`);
  }
}

if (issues.length > 0) {
  throw new Error(`Generated site structural QA failed:\n- ${[...new Set(issues)].join('\n- ')}`);
}

console.log(`Audited ${htmlFiles.length} HTML files, ${contentPages} content pages, ${internalLinks} internal links, ${anchors} anchored links, ${sitemapUrls.size} sitemap URLs, and ${noindexPages} noindex page(s).`);
