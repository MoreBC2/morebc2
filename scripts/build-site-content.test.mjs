import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildSourceMaps,
  extractDocumentMetadata,
  extractSourceFrontmatter,
  findFirstH1,
  outputRelativeForDocs,
  plainTextHeading,
  rewriteMarkdownLinks,
  routeFromOutput,
  slugify,
} from './build-site-content.mjs';

test('extracts simple source frontmatter without emitting duplicate delimiters', () => {
  const result = extractSourceFrontmatter('---\ntitle: "Quoted: title"\ndescription: A source description\n---\n\nBody');
  assert.deepEqual(result.data, { title: 'Quoted: title', description: 'A source description' });
  assert.deepEqual(result.unsupportedKeys, []);
  assert.equal(result.markdown, 'Body');
  assert.deepEqual(extractSourceFrontmatter('---\ntitle: Fine\ndraft: true\n---\nBody').unsupportedKeys, ['draft']);
});

test('finds the first real H1 and ignores headings in fenced examples', () => {
  const markdown = '```md\n# Example only\n```\n\n# `RPC`: café — overview\n';
  const heading = findFirstH1(markdown);
  assert.equal(heading?.raw, '`RPC`: café — overview');
  assert.equal(plainTextHeading(heading.raw), 'RPC: café — overview');
  assert.equal(findFirstH1('No heading here'), null);
});

test('extracts only header metadata and rejects duplicate header fields', () => {
  const result = extractDocumentMetadata('\n**Category:** Documentation\n**Status:** Needs Review\n**Last reviewed:** 2026-07-01\n\nBody\n\n**Status:** Historical note', 'fixture.md');
  assert.deepEqual(result.metadata, {
    category: 'Documentation',
    status: 'Needs Review',
    lastReviewed: '2026-07-01',
  });
  assert.match(result.markdown, /\*\*Status:\*\* Historical note/);
  assert.throws(
    () => extractDocumentMetadata('**Status:** Draft\n**Status:** Needs Review\nBody', 'fixture.md'),
    /appears more than once/,
  );
});

test('creates predictable slugs and keeps README and canonical index routes distinct', () => {
  assert.equal(slugify('v29.1.0-assets.md'), 'v29-1-0-assets');
  assert.equal(outputRelativeForDocs('verification/README.md'), 'verification/index.md');
  assert.equal(outputRelativeForDocs('verification/index.md'), 'verification/historical-index.md');
  assert.equal(routeFromOutput('verification/index.md'), '/verification/');
  assert.equal(routeFromOutput('verification/historical-index.md'), '/verification/historical-index/');
});

test('detects generated route collisions case-insensitively', () => {
  const fixture = (sourceKey, route, outputRelative) => ({ sourceKey, sourceLabel: sourceKey, route, outputRelative });
  assert.throws(
    () => buildSourceMaps([
      fixture('docs/A.md', '/same/', 'same.md'),
      fixture('docs/B.md', '/SAME/', 'SAME.md'),
    ]),
    /Duplicate generated route/,
  );
});

test('rewrites nested, encoded, root-project, titled, and reference links only outside fences', () => {
  const sourceRoutes = new Map([
    ['docs/target.md', '/target/'],
    ['docs/space name.md', '/space-name/'],
    ['PROJECT_STATUS.md', '/project/project-status/'],
  ]);
  const caseInsensitiveSources = new Map([...sourceRoutes.keys()].map((key) => [key.toLowerCase(), key]));
  const issues = [];
  const markdown = [
    '[Target](../target.md#part "title")',
    '[Space](../space%20name.md)',
    '[Project](../../PROJECT_STATUS.md)',
    '[External](https://example.com/readme.md)',
    '[ref]: ../target.md',
    '```md',
    '[Example](../target.md)',
    '```',
  ].join('\n');
  const result = rewriteMarkdownLinks(markdown, 'docs/nested/page.md', { sourceRoutes, caseInsensitiveSources }, issues);

  assert.match(result, /\[Target\]\(\/target\/#part "title"\)/);
  assert.match(result, /\[Space\]\(\/space-name\/\)/);
  assert.match(result, /\[Project\]\(\/project\/project-status\/\)/);
  assert.match(result, /https:\/\/example\.com\/readme\.md/);
  assert.match(result, /^\[ref\]: \/target\/$/m);
  assert.match(result, /```md\n\[Example\]\(\.\.\/target\.md\)\n```/);
  assert.deepEqual(issues, []);
});

test('reports incorrect link-target case without silently rewriting it', () => {
  const sourceRoutes = new Map([['docs/Target.md', '/target/']]);
  const caseInsensitiveSources = new Map([['docs/target.md', 'docs/Target.md']]);
  const issues = [];
  const result = rewriteMarkdownLinks('[Target](../target.md)', 'docs/nested/page.md', { sourceRoutes, caseInsensitiveSources }, issues);
  assert.equal(result, '[Target](../target.md)');
  assert.match(issues[0], /incorrect case/);
});
