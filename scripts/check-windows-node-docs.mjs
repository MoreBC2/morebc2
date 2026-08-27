import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const guidePath = path.join(repoRoot, 'docs', 'nodes', 'node-guide.md');
const recordPath = path.join(repoRoot, 'docs', 'verification', 'windows-node-operator-test-2026-08-27.md');
const guide = await fs.readFile(guidePath, 'utf8');
const record = await fs.readFile(recordPath, 'utf8');
const combined = `${guide}\n${record}`;

const expected = {
  version: 'v29.1.0',
  artifact: 'BitcoinII-29.1.0-x86_64-win64-CLI.zip',
  bytes: '7,987,528',
  sha256: '94985c39c2e99406b50b3a318442677ffa3df6f9d471c03cb30f1fb0c4b8fa3a',
  daemon: 'bitcoinIId.exe',
  cli: 'bitcoinII-cli.exe',
  testPort: '28337',
};

for (const [name, value] of Object.entries(expected)) {
  assert.ok(guide.includes(value), `Guide is missing expected ${name}: ${value}`);
  assert.ok(record.includes(value), `Evidence record is missing expected ${name}: ${value}`);
}

assert.match(guide, /^\*\*Status:\*\* Draft$/m);
assert.match(record, /^\*\*Status:\*\* Draft \/ Dated local test$/m);
assert.ok(combined.includes('INTEGRITY RECORDED, AUTHENTICITY UNVERIFIED'));
assert.match(combined, /do not authenticate the publisher|repeat-byte integrity evidence only/i);
assert.match(combined, /Do not expose BitcoinII Core RPC to the public internet/i);
assert.match(guide, /`28337` is an explicit operator-selected port used by this isolated test/i);
assert.match(guide, /does not generalize `8337` or `28337` as a universal default/i);
assert.match(guide, /evidence that contains `8332` is also a separate evidence type/i);
assert.match(record, /explicit loopback override `28337`/i);
assert.match(record, /Neither port is asserted here as universal/i);
assert.match(guide, /three redacted one-shot peer addresses borrowed from a separate local node/i);
assert.match(guide, /fresh-node bootstrap path remains unresolved/i);
assert.match(record, /three outbound peer addresses were obtained from the separate local node/i);
assert.match(record, /No public peer list or generalized repair is established here/i);
assert.match(guide, /initialblockdownload.*true/is);
assert.match(record, /initialblockdownload.*true/is);
assert.match(guide, /did not establish full synchronization/i);
assert.match(record, /test stopped before full synchronization/i);
assert.match(guide, /not an exhaustive filesystem-integrity or corruption test/i);
assert.match(guide, /Shutdown: done/);
assert.match(record, /Shutdown: done/);

for (const line of [
  'server=1',
  'disablewallet=1',
  'listen=0',
  'rpcbind=127.0.0.1',
  'rpcallowip=127.0.0.1',
  'rpcport=28337',
]) {
  assert.ok(guide.includes(line), `Guide is missing tested config line: ${line}`);
  assert.ok(record.includes(line), `Evidence record is missing tested config line: ${line}`);
}

for (const command of [
  'getblockchaininfo',
  'getnetworkinfo',
  'getconnectioncount',
  'getblockcount',
  'getbestblockhash',
  'stop',
]) {
  assert.ok(guide.includes(command), `Guide is missing tested command: ${command}`);
  assert.ok(record.includes(command), `Evidence record is missing tested command: ${command}`);
}

for (const unsafe of ['createwallet', 'getnewaddress', 'sendtoaddress', 'dumpprivkey', 'generatetoaddress']) {
  assert.ok(!combined.includes(unsafe), `Node documentation unexpectedly contains wallet/mining command: ${unsafe}`);
}

assert.ok(!combined.includes('C:\\Users\\Dan'), 'Node documentation contains a personal filesystem path');
assert.ok(!combined.includes('rpcbind=0.0.0.0'), 'Node documentation contains a public RPC bind');

async function verifyRelativeLinks(markdown, sourcePath) {
  const links = [...markdown.matchAll(/\[[^\]]+\]\(([^)]+\.md)(?:#[^)]+)?\)/g)].map((match) => match[1]);
  for (const link of links) {
    const destination = path.resolve(path.dirname(sourcePath), link);
    await fs.access(destination);
  }
  return links.length;
}

const guideLinks = await verifyRelativeLinks(guide, guidePath);
const recordLinks = await verifyRelativeLinks(record, recordPath);

console.log(`Windows node documentation assumptions verified: 2 files, ${guideLinks + recordLinks} local links.`);
