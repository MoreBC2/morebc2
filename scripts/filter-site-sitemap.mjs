import { promises as fs } from 'node:fs';
import path from 'node:path';

const distRoot = path.join(process.cwd(), 'dist');
const siteOrigin = 'https://morebc2.pages.dev';

function toPosix(value) {
  return value.replaceAll('\\', '/');
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

function hasNoindex(html) {
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  return metaTags.some((tag) => {
    const name = tag.match(/\bname=(?:"([^"]*)"|'([^']*)')/i)?.[1] ?? tag.match(/\bname=(?:"([^"]*)"|'([^']*)')/i)?.[2];
    const content = tag.match(/\bcontent=(?:"([^"]*)"|'([^']*)')/i)?.[1] ?? tag.match(/\bcontent=(?:"([^"]*)"|'([^']*)')/i)?.[2];
    return name?.toLowerCase() === 'robots' && content?.toLowerCase().split(',').map((value) => value.trim()).includes('noindex');
  });
}

const allFiles = await listFiles(distRoot);
const htmlFiles = allFiles.filter((file) => file.toLowerCase().endsWith('.html'));
const noindexPaths = new Set();

for (const htmlFile of htmlFiles) {
  const html = await fs.readFile(htmlFile, 'utf8');
  if (hasNoindex(html)) noindexPaths.add(pageUrlForHtml(htmlFile));
}

const sitemapFiles = allFiles.filter((file) => {
  const basename = path.basename(file).toLowerCase();
  return basename.startsWith('sitemap-') && basename.endsWith('.xml') && basename !== 'sitemap-index.xml';
});

let removed = 0;
for (const sitemapFile of sitemapFiles) {
  let xml = await fs.readFile(sitemapFile, 'utf8');
  xml = xml.replace(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/gi, (block, rawLoc) => {
    let url;
    try {
      url = new URL(rawLoc.trim());
    } catch {
      return block;
    }
    if (url.origin === siteOrigin && noindexPaths.has(url.pathname)) {
      removed += 1;
      return '';
    }
    return block;
  });
  await fs.writeFile(sitemapFile, xml, 'utf8');
}

console.log(`Sitemap filtering: removed ${removed} noindex page(s) from ${sitemapFiles.length} sitemap file(s).`);
