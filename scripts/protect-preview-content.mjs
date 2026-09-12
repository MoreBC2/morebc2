import { promises as fs } from 'node:fs';
import path from 'node:path';

const docsRoot = path.join(process.cwd(), 'src', 'content', 'docs');

// These legacy verification pages remain directly addressable for historical
// links, but should not appear in the normal sidebar or Pagefind search.
const forceHiddenPages = new Set([
  'verification/dashboard.md',
  'verification/historical-index.md',
]);

const staleHomepageSentence = 'Many MoreBC2 pages are still Draft or Needs Review. Status labels are intentionally conservative. Technical claims should be checked against the cited primary source or dated observation before being treated as verified.';
const currentHomepageSentence = 'MoreBC2 uses conservative status labels even after a documentation audit. Reviewed / Partial, source-reviewed, historical, and other bounded labels remain where evidence is incomplete; technical claims should still be checked against the cited primary source or dated observation before being treated as verified.';

function toPosix(value) {
  return value.replaceAll('\\', '/');
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

const files = await listMarkdownFiles(docsRoot);
let protectedPages = 0;
let forcedHiddenPages = 0;
let homepageRepairs = 0;
let noindexPages = 0;

for (const filename of files) {
  let markdown = await fs.readFile(filename, 'utf8');
  const relative = toPosix(path.relative(docsRoot, filename));

  if (relative === 'index.md' && markdown.includes(staleHomepageSentence)) {
    markdown = markdown.replace(staleHomepageSentence, currentHomepageSentence);
    homepageRepairs += 1;
  }

  if (!markdown.startsWith('---\n')) {
    if (relative === 'index.md' && homepageRepairs > 0) await fs.writeFile(filename, markdown, 'utf8');
    continue;
  }

  let closing = markdown.indexOf('\n---\n', 4);
  if (closing === -1) {
    throw new Error(`Generated page has malformed frontmatter: ${relative}`);
  }

  if (forceHiddenPages.has(relative) && !/^sidebar:\n  hidden: true$/m.test(markdown)) {
    markdown = `${markdown.slice(0, closing)}\nsidebar:\n  hidden: true${markdown.slice(closing)}`;
    forcedHiddenPages += 1;
    closing = markdown.indexOf('\n---\n', 4);
  }

  const hidden = /^sidebar:\n  hidden: true$/m.test(markdown);
  if (hidden && !/^pagefind:\s*false$/m.test(markdown)) {
    markdown = `${markdown.slice(0, closing)}\npagefind: false${markdown.slice(closing)}`;
    protectedPages += 1;
    closing = markdown.indexOf('\n---\n', 4);
  }

  if (hidden && !/^\s*name:\s*robots\s*$/m.test(markdown)) {
    markdown = `${markdown.slice(0, closing)}\nhead:\n  - tag: meta\n    attrs:\n      name: robots\n      content: "noindex, nofollow"${markdown.slice(closing)}`;
    noindexPages += 1;
  }

  await fs.writeFile(filename, markdown, 'utf8');
}

console.log(`Site content protection: excluded ${protectedPages} hidden page(s) from Pagefind search; marked ${noindexPages} hidden page(s) noindex; force-hid ${forcedHiddenPages} legacy page(s); repaired ${homepageRepairs} homepage sentence(s).`);
