import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const guidePath = path.join(repoRoot, 'docs', 'nodes', 'node-guide.md');
const recordPath = path.join(
  repoRoot,
  'docs',
  'verification',
  'windows-v31-node-rpc-validation-2026-09-11.md',
);
const psbtRecordPath = path.join(
  repoRoot,
  'docs',
  'verification',
  'windows-v31-psbt-replay-validation-2026-09-11.md',
);
const historicalRecordPath = path.join(
  repoRoot,
  'docs',
  'verification',
  'windows-node-operator-test-2026-08-27.md',
);
const historicalDiscoveryPath = path.join(
  repoRoot,
  'docs',
  'verification',
  'windows-peer-discovery-test-2026-08-28.md',
);

const guide = await fs.readFile(guidePath, 'utf8');
const record = await fs.readFile(recordPath, 'utf8');
const psbtRecord = await fs.readFile(psbtRecordPath, 'utf8');
const historicalRecord = await fs.readFile(historicalRecordPath, 'utf8');
const historicalDiscovery = await fs.readFile(historicalDiscoveryPath, 'utf8');
const currentCombined = `${guide}\n${record}\n${psbtRecord}`;
const historicalCombined = `${historicalRecord}\n${historicalDiscovery}`;

const expected = {
  version: 'v31.1.0',
  artifact: 'BitcoinII-v31.1-Win64-Qt.zip',
  bytes: '20,557,870',
  sha256: 'f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d',
  executable: 'bitcoinII-qt.exe',
  protocol: '70016',
  p2pPort: '8338',
  testPort: '28332',
};

for (const [name, value] of Object.entries(expected)) {
  assert.ok(guide.includes(value), `Guide is missing expected ${name}: ${value}`);
  assert.ok(record.includes(value), `Current v31 evidence record is missing expected ${name}: ${value}`);
}

assert.match(guide, /^\*\*Status:\*\* Reviewed \/ Partial$/m);
assert.match(record, /^\*\*Status:\*\* Directly observed \/ Dated local test$/m);
assert.match(
  psbtRecord,
  /^\*\*Status:\*\* Directly observed PSBT runtime \/ Source-confirmed replay protection$/m,
);

assert.match(currentCombined, /Do not expose BitcoinII Core RPC (?:directly )?to the public internet/i);
assert.match(guide, /`28332` was chosen only because local default port `8332` was already occupied/i);
assert.match(guide, /test overrides, not BitcoinII defaults/i);
assert.match(guide, /mainnet.*P2P port.*8338/is);
assert.match(guide, /generated example.*8333.*stale/is);
assert.match(record, /P2P listeners.*8338/is);
assert.match(guide, /automatic outbound peer discovery/i);
assert.match(guide, /4 outbound full-relay IPv4 peers/i);
assert.match(guide, /6 outbound full-relay peers/i);
assert.match(guide, /initialblockdownload = true/i);
assert.match(record, /initialblockdownload.*true/is);
assert.match(guide, /did not.*wait for full synchronization/i);
assert.match(record, /did not wait for initial block download to complete/i);
assert.match(guide, /pruned = false/i);
assert.match(guide, /getindexinfo = \{\}/i);
assert.match(record, /getindexinfo.*\{\}/is);
assert.match(guide, /pruning and `txindex` are incompatible/i);
assert.match(guide, /fresh disposable/i);
assert.match(record, /No existing BitcoinII data directory or wallet was opened/i);
assert.match(guide, /random-cookie authentication/i);
assert.match(record, /Random-cookie authentication/i);
assert.match(guide, /Shutdown done/);
assert.match(record, /Shutdown done/);
assert.match(guide, /not an exhaustive corruption\/recovery test/i);

for (const line of [
  'server=1',
  'rpcbind=127.0.0.1',
  'rpcallowip=127.0.0.1',
  'rpcport=28332',
]) {
  assert.ok(guide.includes(line), `Guide is missing tested config line: ${line}`);
  assert.ok(record.includes(line), `Current v31 record is missing tested config line: ${line}`);
}

for (const command of [
  'getblockchaininfo',
  'getnetworkinfo',
  'getmempoolinfo',
  'getpeerinfo',
  'getchaintips',
  'getindexinfo',
  'uptime',
  'stop',
]) {
  assert.ok(guide.includes(command), `Guide is missing tested command: ${command}`);
  assert.ok(record.includes(command), `Current v31 record is missing tested command: ${command}`);
}

assert.ok(
  guide.includes('../verification/windows-v31-node-rpc-validation-2026-09-11.md'),
  'Guide does not link to the current v31 node/RPC evidence record',
);
assert.ok(
  guide.includes('../verification/windows-v31-psbt-replay-validation-2026-09-11.md'),
  'Guide does not link to the current v31 PSBT evidence record',
);
assert.ok(
  guide.includes('../verification/windows-node-operator-test-2026-08-27.md'),
  'Guide does not preserve the historical v29 operator record link',
);
assert.ok(
  guide.includes('../verification/windows-peer-discovery-test-2026-08-28.md'),
  'Guide does not preserve the historical v29 peer-discovery record link',
);

assert.match(historicalRecord, /^\*\*Status:\*\* Draft \/ Dated local test$/m);
assert.match(historicalDiscovery, /^\*\*Status:\*\* Draft \/ Dated local test$/m);
assert.ok(historicalCombined.includes('v29.1.0'));
assert.ok(historicalCombined.includes('BitcoinII-29.1.0-x86_64-win64-CLI.zip'));

assert.doesNotMatch(
  currentCombined,
  /C:\\Users\\(?!<user>\\)[^\\\r\n]+\\/i,
  'Current node documentation contains an unredacted personal filesystem path',
);
assert.ok(!currentCombined.includes('rpcbind=0.0.0.0'), 'Current node documentation contains a public RPC bind');

const guideIpv4Literals = [...new Set(guide.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) ?? [])].sort();
assert.deepEqual(
  guideIpv4Literals,
  ['0.0.0.0', '127.0.0.1'],
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

for (const unsafe of [
  'dumpprivkey',
  'sendtoaddress',
]) {
  assert.ok(!guideCommandText.includes(unsafe), `Guide contains unsafe wallet command example: ${unsafe}`);
}

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
const psbtLinks = await verifyRelativeLinks(psbtRecord, psbtRecordPath);
const historicalRecordLinks = await verifyRelativeLinks(historicalRecord, historicalRecordPath);
const historicalDiscoveryLinks = await verifyRelativeLinks(historicalDiscovery, historicalDiscoveryPath);

console.log(
  `Windows node documentation assumptions verified: 5 files, ${
    guideLinks + recordLinks + psbtLinks + historicalRecordLinks + historicalDiscoveryLinks
  } local links.`,
);
