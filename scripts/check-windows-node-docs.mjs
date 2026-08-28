import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const guidePath = path.join(repoRoot, 'docs', 'nodes', 'node-guide.md');
const recordPath = path.join(repoRoot, 'docs', 'verification', 'windows-node-operator-test-2026-08-27.md');
const discoveryRecordPath = path.join(
  repoRoot,
  'docs',
  'verification',
  'windows-peer-discovery-test-2026-08-28.md',
);
const guide = await fs.readFile(guidePath, 'utf8');
const record = await fs.readFile(recordPath, 'utf8');
const discoveryRecord = await fs.readFile(discoveryRecordPath, 'utf8');
const combined = `${guide}\n${record}\n${discoveryRecord}`;

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
assert.match(discoveryRecord, /^\*\*Status:\*\* Draft \/ Dated local test$/m);
assert.ok(combined.includes('INTEGRITY RECORDED, AUTHENTICITY UNVERIFIED'));
assert.match(combined, /do not authenticate the publisher|repeat-byte integrity evidence only/i);
assert.match(combined, /Do not expose BitcoinII Core RPC to the public internet/i);
assert.match(guide, /`28337` is an explicit operator-selected port used by this isolated test/i);
assert.match(guide, /does not generalize `8337` or `28337` as a universal default/i);
assert.match(guide, /evidence that contains `8332` is also a separate evidence type/i);
assert.match(record, /explicit loopback override `28337`/i);
assert.match(record, /Neither port is asserted here as universal/i);
assert.match(guide, /three redacted one-shot peer addresses borrowed from a separate local node/i);
assert.match(guide, /on 2026-08-27, one fresh isolated Windows `v29\.1\.0` node did not automatically obtain persistent peers/i);
assert.match(guide, /two additional fresh isolated Windows nodes.*successfully bootstrapped through the two configured DNS seeds/is);
assert.match(guide, /Independent review reproduced successful default DNS bootstrap again/i);
assert.ok(
  guide.includes('../verification/windows-peer-discovery-test-2026-08-28.md'),
  'Guide does not link to the later peer-discovery evidence record',
);
assert.match(guide, /do not guarantee that every fresh node will obtain peers immediately/i);
assert.match(guide, /DNS seed availability can change over time/i);
assert.match(guide, /may still temporarily remain at zero peers/i);
assert.match(guide, /three compiled fixed seeds did not establish usable fallback peers/i);
assert.match(guide, /are not recommended as a recovery path/i);
assert.match(record, /three outbound peer addresses were obtained from the separate local node/i);
assert.match(record, /No public peer list or generalized repair is established here/i);
assert.match(discoveryRecord, /Default discovery succeeded twice without borrowed peers, manual peer addresses/i);
assert.match(discoveryRecord, /earlier 2026-08-27 zero-peer observation was therefore not reproduced/i);
assert.match(discoveryRecord, /does not prove that the DNS seeds will always answer/i);
assert.match(discoveryRecord, /does not prove that the endpoints are permanently offline/i);
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

const guideIpv4Literals = [...new Set(guide.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) ?? [])];
assert.deepEqual(
  guideIpv4Literals,
  ['127.0.0.1'],
  'Guide contains an unexpected IPv4 literal that could publish or recommend a peer address',
);

const guideCommandText = [
  ...[...guide.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((match) => match[1]),
  ...[...guide.matchAll(/`([^`\n]+)`/g)].map((match) => match[1]),
].join('\n');
assert.doesNotMatch(
  guideCommandText,
  /(?:^|\s)-?(?:addnode|seednode|connect)(?:=|\s+\S+)/im,
  'Guide contains a manual peer or bootstrap-address command',
);

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
const discoveryRecordLinks = await verifyRelativeLinks(discoveryRecord, discoveryRecordPath);

console.log(
  `Windows node documentation assumptions verified: 3 files, ${guideLinks + recordLinks + discoveryRecordLinks} local links.`,
);
