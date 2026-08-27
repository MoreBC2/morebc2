import { execFileSync, spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const RELEASE_TAG = 'v29.1.0';
const OBSERVED_DATE = '2026-08-27';
const EXPECTED_TAG_COMMIT = '3f2a352467750425ec28abe3505a5db5bbc5fa35';
const EXPECTED_MAIN_COMMIT = '218d1b7e0f682c2aa43c3698d927cbfbb7adfe76';
const SOURCE_MOREBC2_COMMIT = 'ca08df7369f22953b19d845218766233e5b4ca1d';
const CURRENT_NOTE = `The mutable current-upstream \`main\` links below were re-observed on ${OBSERVED_DATE} and are intentionally retained to track upstream state. They are not release-pinned evidence.`;

const releaseSpecificFiles = new Set([
  'docs/architecture/block-validation-flow.md',
  'docs/encyclopedia/difficulty-adjustment.md',
  'docs/encyclopedia/proof-of-work.md',
  'docs/exchange/integration-package.md',
  'docs/exchange/operator-guide.md',
  'docs/nodes/node-guide.md',
]);

const ignoredDirectories = new Set([
  '.git',
  'dist',
  'node_modules',
  'src',
]);

const mutableUrlPattern = /https:\/\/github\.com\/Bitcoin-II\/BitcoinII-Core\/(?:blob|tree|raw)\/main\/[^\s)>`"'\]]+|https:\/\/raw\.githubusercontent\.com\/Bitcoin-II\/BitcoinII-Core\/main\/[^\s)>`"'\]]+/g;

function parseArguments(argv) {
  const options = { apply: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--apply') {
      options.apply = true;
    } else if (argument === '--upstream') {
      options.upstream = argv[++index];
    } else if (argument === '--output') {
      options.output = argv[++index];
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  if (!options.upstream) throw new Error('--upstream is required');
  return options;
}

async function listMarkdownFiles(directory, root = directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(absolute, root));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(path.relative(root, absolute).replaceAll('\\', '/'));
    }
  }
  return files.sort();
}

function git(upstream, args) {
  return execFileSync('git', ['-c', `safe.directory=${upstream.replaceAll('\\', '/')}`, '-C', upstream, ...args], { encoding: 'utf8' }).trim();
}

function gitObjectExists(upstream, spec) {
  return spawnSync('git', ['-c', `safe.directory=${upstream.replaceAll('\\', '/')}`, '-C', upstream, 'cat-file', '-e', spec], {
    encoding: 'utf8',
  }).status === 0;
}

function upstreamPathFromUrl(url) {
  return url
    .replace(/^https:\/\/github\.com\/Bitcoin-II\/BitcoinII-Core\/(?:blob|tree|raw)\/main\//, '')
    .replace(/^https:\/\/raw\.githubusercontent\.com\/Bitcoin-II\/BitcoinII-Core\/main\//, '');
}

function classify(sourceFile) {
  if (releaseSpecificFiles.has(sourceFile)) {
    return {
      category: 'A',
      label: 'release-specific evidence',
      action: `pin to ${RELEASE_TAG}`,
      rationale: `The surrounding claim describes behavior or values applicable to MoreBC2's documented ${RELEASE_TAG} release.`,
    };
  }
  return {
    category: 'C',
    label: 'intentionally current-upstream evidence',
    action: 'retain main and add a dated mutable-evidence note',
    rationale: 'The page explicitly presents the source as current upstream or as a Source Atlas review of current upstream state.',
  };
}

function verificationBasis(classification, upstreamPath, comparison) {
  if (classification.category === 'C') {
    return `Path exists at ${RELEASE_TAG} and current upstream; classification follows the page's explicit current-upstream intent rather than blob equality.`;
  }
  if (comparison.identical) {
    return `Path exists at ${RELEASE_TAG}; its blob is byte-identical to current upstream, so the cited substantive evidence is unchanged.`;
  }
  if (upstreamPath === 'src/kernel/chainparams.cpp') {
    return `Path exists at ${RELEASE_TAG}. The only post-tag diff changes regtest genesis/checkpoint/AssumeUTXO data; the candidate pages cite unchanged mainnet ports, seeds, timing, prefixes, genesis, and proof-of-work parameters.`;
  }
  if (upstreamPath === 'README.md') {
    return `Path exists at ${RELEASE_TAG}. The only post-tag diff removes macOS unsigned-binary notes; the integration package's project/release context remains present at the tag.`;
  }
  return `Unsafe to pin automatically because the path differs after ${RELEASE_TAG} and no scoped substantive-evidence proof is recorded.`;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const repositoryRoot = process.cwd();
  const upstreamRoot = path.resolve(options.upstream);
  const tagCommit = git(upstreamRoot, ['rev-parse', `${RELEASE_TAG}^{commit}`]);
  const mainCommit = git(upstreamRoot, ['rev-parse', 'origin/main']);
  if (tagCommit !== EXPECTED_TAG_COMMIT) throw new Error(`Unexpected ${RELEASE_TAG} commit: ${tagCommit}`);
  if (mainCommit !== EXPECTED_MAIN_COMMIT) throw new Error(`Unexpected upstream main commit: ${mainCommit}`);

  const files = await listMarkdownFiles(repositoryRoot);
  const occurrences = [];
  const sourceContents = new Map();
  const comparisons = new Map();

  for (const sourceFile of files) {
    const absolute = path.join(repositoryRoot, sourceFile);
    const content = await fs.readFile(absolute, 'utf8');
    sourceContents.set(sourceFile, content);
    const lines = content.split(/\r?\n/);
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      for (const match of lines[lineIndex].matchAll(mutableUrlPattern)) {
        const url = match[0];
        const upstreamPath = upstreamPathFromUrl(url);
        if (!comparisons.has(upstreamPath)) {
          const tagExists = gitObjectExists(upstreamRoot, `${RELEASE_TAG}:${upstreamPath}`);
          const mainExists = gitObjectExists(upstreamRoot, `origin/main:${upstreamPath}`);
          const tagBlob = tagExists ? git(upstreamRoot, ['rev-parse', `${RELEASE_TAG}:${upstreamPath}`]) : null;
          const mainBlob = mainExists ? git(upstreamRoot, ['rev-parse', `origin/main:${upstreamPath}`]) : null;
          const postTagChange = mainExists
            ? git(upstreamRoot, ['log', '-1', '--format=%H|%cI|%s', `${RELEASE_TAG}..origin/main`, '--', upstreamPath]) || null
            : null;
          comparisons.set(upstreamPath, {
            tag_exists: tagExists,
            main_exists: mainExists,
            identical: Boolean(tagBlob && mainBlob && tagBlob === mainBlob),
            tag_blob: tagBlob,
            main_blob: mainBlob,
            post_tag_change: postTagChange,
          });
        }
        let classification = classify(sourceFile);
        const comparison = comparisons.get(upstreamPath);
        const basis = verificationBasis(classification, upstreamPath, comparison);
        if (classification.category === 'A' && basis.startsWith('Unsafe')) {
          classification = {
            category: 'E',
            label: 'ambiguous / unsafe to pin',
            action: 'leave unchanged',
            rationale: 'The immutable ref cannot be established confidently from the recorded evidence.',
          };
        }
        occurrences.push({
          id: `mutable-${String(occurrences.length + 1).padStart(3, '0')}`,
          source_file: sourceFile,
          line: lineIndex + 1,
          url,
          upstream_path: upstreamPath,
          context: lines[lineIndex].trim(),
          classification,
          upstream_verification: comparison,
          verification_basis: basis,
        });
      }
    }
  }

  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const occurrence of occurrences) counts[occurrence.classification.category] += 1;
  const inventoryOccurrences = occurrences.map(({ url, context, ...occurrence }) => ({
    ...occurrence,
    url_kind: url.includes('raw.githubusercontent.com') ? 'raw-content' : url.includes('/tree/') ? 'github-tree' : url.includes('/raw/') ? 'github-raw' : 'github-blob',
    original_ref: 'main',
    context: context.replace(url, '[mutable upstream URL]'),
  }));
  const inventory = {
    schema_version: 1,
    observed_date: OBSERVED_DATE,
    source_morebc2_commit: SOURCE_MOREBC2_COMMIT,
    source_repository: 'Bitcoin-II/BitcoinII-Core',
    release_tag: RELEASE_TAG,
    release_commit: tagCommit,
    upstream_main_commit: mainCommit,
    summary: {
      mutable_occurrences: occurrences.length,
      source_files: new Set(occurrences.map((item) => item.source_file)).size,
      distinct_upstream_paths: comparisons.size,
      classification_counts: counts,
    },
    changed_path_findings: {
      'src/kernel/chainparams.cpp': 'Post-tag change 218d1b7e0f682c2aa43c3698d927cbfbb7adfe76 changes regtest genesis/checkpoint/AssumeUTXO data only; mainnet evidence cited by A pages is unchanged.',
      'README.md': 'Post-tag change 0c89479d2c7659bfac53571bb5b010432bd13653 removes macOS unsigned-binary notes only; the A-page project/release context is unchanged.',
    },
    occurrences: inventoryOccurrences,
  };

  if (options.output) {
    const output = path.resolve(options.output);
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
  }

  if (options.apply) {
    const byFile = new Map();
    for (const occurrence of occurrences) {
      if (!byFile.has(occurrence.source_file)) byFile.set(occurrence.source_file, []);
      byFile.get(occurrence.source_file).push(occurrence);
    }
    for (const [sourceFile, fileOccurrences] of byFile) {
      let content = sourceContents.get(sourceFile);
      if (fileOccurrences.some((item) => item.classification.category === 'A')) {
        for (const occurrence of fileOccurrences.filter((item) => item.classification.category === 'A')) {
          const replacement = occurrence.url
            .replace('/blob/main/', `/blob/${RELEASE_TAG}/`)
            .replace('/tree/main/', `/tree/${RELEASE_TAG}/`)
            .replace('/raw/main/', `/raw/${RELEASE_TAG}/`)
            .replace('/BitcoinII-Core/main/', `/BitcoinII-Core/${RELEASE_TAG}/`);
          content = content.replaceAll(occurrence.url, replacement);
        }
      }
      if (fileOccurrences.some((item) => item.classification.category === 'C') && !content.includes(CURRENT_NOTE)) {
        const sourcesHeading = content.match(/\r?\n## Sources\r?\n\r?\n/);
        if (!sourcesHeading) throw new Error(`Missing Sources heading in ${sourceFile}`);
        const newline = sourcesHeading[0].includes('\r\n') ? '\r\n' : '\n';
        content = content.replace(sourcesHeading[0], `${sourcesHeading[0]}${CURRENT_NOTE}${newline}${newline}`);
      }
      await fs.writeFile(path.join(repositoryRoot, sourceFile), content, 'utf8');
    }
  }

  process.stdout.write(`${JSON.stringify(inventory.summary)}\n`);
}

await main();
