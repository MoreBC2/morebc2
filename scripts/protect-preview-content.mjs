import { promises as fs } from 'node:fs';
import path from 'node:path';

const docsRoot = path.join(process.cwd(), 'src', 'content', 'docs');

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

for (const filename of files) {
  let markdown = await fs.readFile(filename, 'utf8');
  if (!markdown.startsWith('---\n')) continue;
  if (!/^sidebar:\n  hidden: true$/m.test(markdown)) continue;
  if (/^pagefind:\s*false$/m.test(markdown)) continue;

  const closing = markdown.indexOf('\n---\n', 4);
  if (closing === -1) {
    throw new Error(`Generated page has malformed frontmatter: ${path.relative(docsRoot, filename)}`);
  }

  markdown = `${markdown.slice(0, closing)}\npagefind: false${markdown.slice(closing)}`;
  await fs.writeFile(filename, markdown, 'utf8');
  protectedPages += 1;
}

console.log(`Preview protection: excluded ${protectedPages} hidden page(s) from Pagefind search.`);
