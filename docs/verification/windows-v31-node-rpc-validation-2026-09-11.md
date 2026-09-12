# Windows v31.1.0 node and RPC validation — 2026-09-11

**Category:** Verification
**Status:** Directly observed / Dated local test
**Test date:** 2026-09-11 (America/New_York)
**Scope:** Isolated BitcoinII Core v31.1.0 mainnet startup, local RPC, disposable-wallet isolation, shutdown, and restart

## Summary

BitcoinII Core `v31.1.0` was exercised on 64-bit Windows 11 in Qt server mode because the locally available v31.1 Windows artifact did not include a headless daemon or matching CLI. Every node launch explicitly selected a newly created disposable data directory. No existing BitcoinII data directory or wallet was opened, copied, rescanned, imported, unlocked, inspected, or spent from.

The first run started successfully, used random-cookie RPC authentication on loopback, discovered mainnet peers, acquired the current header chain, advanced block validation, answered the requested RPCs, created one new zero-transaction disposable wallet, and stopped cleanly. The same binary then restarted against the same disposable directory, retained chain state, reconnected normally, exposed the disposable wallet in `listwalletdir`, and stopped cleanly a second time.

The bounded test did not wait for initial block download to complete. No transaction was created, signed, submitted, or broadcast.

## Environment and artifact

| Field | Observed value |
|---|---|
| Host | Windows 11 Version 25H2, x86_64 (reported by the v31.1.0 runtime log) |
| Network | BitcoinII mainnet (`getblockchaininfo.chain = "main"`) |
| Executable | `<user>\Desktop\BitcoinII-v31.1-Win64-Qt\bitcoinII-qt.exe` |
| Runtime identity | `BitcoinII version v31.1.0 (release build)`; `getnetworkinfo.version = 310100`; `subversion = /BitcoinII:31.1.0/`; protocol `70016` |
| Executable size | `42,903,572` bytes |
| Executable SHA-256 | `8b918df903377565a9d7fa59d2d2dc087ed77155c858b2a0abcdee03f0423db5` |
| Release archive | `BitcoinII-v31.1-Win64-Qt.zip`, `20,557,870` bytes |
| Archive SHA-256 | `f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d` |
| Authenticode | `NotSigned` |
| Data directory | `<user>\Documents\Codex\2026-09-11\referenced-chatgpt-conversation-this-is-an\work\bc2-v31-node-validation-20260911-2230\datadir` |
| Wallet | Newly created `morebc2-disposable-v31`; SQLite descriptor wallet; zero transactions |
| RPC | Random-cookie authentication, `127.0.0.1:28332` |
| P2P listeners | `0.0.0.0:8338`; local onion service control on `127.0.0.1:8339` |

The locally calculated archive hash exactly matches the GitHub-reported digest already recorded in [the v31.1.0 asset inventory](../releases/v31.1.0-assets.md). This is a useful repeat-byte integrity check, but the unsigned executable and lack of a maintainer-authenticated checksum path mean binary authenticity and reproducible-build equivalence remain unverified.

The username component above is replaced with `<user>` for the public record. Runtime logging captured the selected absolute path. Peer addresses, the RPC cookie value, and unrelated process details are also omitted.

## Safety and isolation

Before launch:

- no BitcoinII or test RPC process was listening on the selected `28332` port;
- the test directory was newly created and contained only the test configuration;
- `listwallets` returned an empty array before wallet creation;
- `listwalletdir` returned `{"wallets":[]}` before wallet creation;
- all launches included the disposable `-datadir` argument;
- the runtime log explicitly reported both the selected disposable data directory and its `bitcoinII.conf` path.

Two unrelated local processes were observed and left untouched:

- an existing CapStash process occupied `127.0.0.1:8332`;
- a pre-existing BitcoinII Qt process had been running since 2026-09-09.

The search for binaries was limited to executable/archive locations and project workspaces. The default BitcoinII data directory was not enumerated or inspected. The runtime log printed the platform default path for informational purposes and immediately confirmed use of the explicitly selected disposable directory.

## Configuration and commands

Test configuration:

```ini
server=1
rpcport=28332
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

`txindex`, pruning, block-filter indexing, and coin-statistics indexing were deliberately not configured so their defaults could be observed.

The Qt release is a Windows GUI-subsystem executable. Its `-version` action opened an About window rather than writing version text to the console. That test-created About window was closed normally. Exact release identity was therefore corroborated through Windows file metadata, the runtime log, and `getnetworkinfo`.

Startup and restart used the same command shape:

```powershell
$args = @(
  '-datadir=<test-root>\datadir',
  '-server=1',
  '-rpcport=28332',
  '-rpcbind=127.0.0.1',
  '-rpcallowip=127.0.0.1',
  '-nosplash',
  '-min'
)

Start-Process -FilePath '<v31-root>\bitcoinII-qt.exe' `
  -ArgumentList $args -WindowStyle Hidden -PassThru
```

There was no locally available v31.1.0 CLI executable. A discovered `bitcoinII-cli.exe` reported `v29.1.0` and was not used against the v31 node. RPC calls were made directly over HTTP JSON-RPC with the cookie from the disposable data directory. The cookie was converted to an in-memory Basic authorization header and was never printed:

```powershell
$cookie = Get-Content -LiteralPath '<test-root>\datadir\.cookie' -Raw
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cookie.Trim()))
$headers = @{ Authorization = "Basic $auth" }
$body = @{
  jsonrpc = '1.0'
  id = $method
  method = $method
  params = $params
} | ConvertTo-Json -Compress

Invoke-RestMethod -Uri 'http://127.0.0.1:28332/' `
  -Method Post -Headers $headers -ContentType 'application/json' -Body $body
```

The wallet-scoped `getwalletinfo` request used `/wallet/morebc2-disposable-v31`. Shutdown used the same direct-RPC method with `method = "stop"`.

## First-run timeline and RPC output

The process started at `2026-09-11T22:11:47.6850705-04:00`. The log reported `Done loading` at `2026-09-11T22:11:48-04:00`, and the first outbound peer connected one second later.

### `getnetworkinfo` — 2026-09-11T22:12:40.4341097-04:00

```json
{
  "version": 310100,
  "subversion": "/BitcoinII:31.1.0/",
  "protocolversion": 70016,
  "localservicesnames": ["NETWORK", "WITNESS", "NETWORK_LIMITED", "P2P_V2"],
  "localrelay": true,
  "timeoffset": 0,
  "networkactive": true,
  "connections": 4,
  "connections_in": 0,
  "connections_out": 4,
  "relayfee": 0.000001,
  "incrementalfee": 0.000001,
  "localaddresses": [],
  "warnings": []
}
```

IPv4 and IPv6 were reported reachable; onion, I2P, and CJDNS were limited/unreachable with no proxy configured.

### `getblockchaininfo` — 2026-09-11T22:12:40.4625645-04:00

```json
{
  "chain": "main",
  "blocks": 4214,
  "headers": 58970,
  "bestblockhash": "00000000011ff927d524a157c367a396452a779d5dfc79175017fdf539a6ca0e",
  "difficulty": 3.793681313276695,
  "verificationprogress": 0.02255401143374135,
  "initialblockdownload": true,
  "size_on_disk": 1211908,
  "pruned": false,
  "warnings": []
}
```

The best-block hash and difficulty above describe the then-current validated height, not the network header tip.

### `getmempoolinfo` — 2026-09-11T22:12:40.4653063-04:00

```json
{
  "loaded": true,
  "size": 0,
  "bytes": 0,
  "usage": 0,
  "total_fee": 0.0,
  "maxmempool": 300000000,
  "mempoolminfee": 0.000001,
  "minrelaytxfee": 0.000001,
  "incrementalrelayfee": 0.000001,
  "unbroadcastcount": 0,
  "fullrbf": true,
  "permitbaremultisig": false,
  "maxdatacarriersize": 83,
  "maxtapscriptsize": "3600",
  "policylog": true,
  "policyrejections": 0,
  "limitclustercount": 64,
  "limitclustersize": 101000,
  "optimal": true
}
```

### `getpeerinfo` summary — 2026-09-11T22:12:40.6032953-04:00

```json
{
  "count": 4,
  "inbound": 0,
  "outbound": 4,
  "network_counts": [{"network": "ipv4", "count": 4}],
  "connection_type_counts": [{"connection_type": "outbound-full-relay", "count": 4}],
  "protocol_versions": [70016],
  "subversions": ["/BitcoinII:31.1.0/"]
}
```

Peer addresses were intentionally omitted from the public record.

### `getnettotals` — 2026-09-11T22:12:40.6067103-04:00

```json
{
  "totalbytesrecv": 8900123,
  "totalbytessent": 285153,
  "timemillis": 1789179160605,
  "uploadtarget": {
    "timeframe": 86400,
    "target": 0,
    "target_reached": false,
    "serve_historical_blocks": true,
    "bytes_left_in_cycle": 0,
    "time_left_in_cycle": 0
  }
}
```

### `uptime` and `getchaintips`

`uptime` returned `52` seconds at `2026-09-11T22:12:40.6108998-04:00`.

```json
[
  {
    "height": 58970,
    "hash": "00000000000000007c12b4c6f486f6ab1ac47a153267417ff83da27692617ead",
    "branchlen": 54736,
    "status": "headers-only"
  },
  {
    "height": 4234,
    "hash": "0000000013feb401e44807f3abab1f187739766f2aad9630a46bf8014defce61",
    "branchlen": 0,
    "status": "active"
  }
]
```

The active height advanced between the immediately preceding blockchain snapshot and this call. This is expected during initial synchronization.

### `getindexinfo`

At `2026-09-11T22:12:40.6499589-04:00`, `getindexinfo` returned:

```json
{}
```

No optional index was enabled. In particular, there was no `txindex`, block-filter index, or coin-statistics index.

### Disposable wallet isolation

Before creation:

```json
listwallets: []
listwalletdir: {"wallets":[]}
```

`createwallet "morebc2-disposable-v31"` returned `{"name":"morebc2-disposable-v31"}`. The subsequent wallet-specific result was:

```json
{
  "walletname": "morebc2-disposable-v31",
  "walletversion": 169900,
  "format": "sqlite",
  "txcount": 0,
  "keypoolsize": 4000,
  "keypoolsize_hd_internal": 4000,
  "private_keys_enabled": true,
  "avoid_reuse": false,
  "scanning": false,
  "descriptors": true,
  "external_signer": false,
  "blank": false,
  "flags": ["last_hardened_xpub_cached", "descriptor_wallet"]
}
```

No address-generation, signing, import, rescan, send, raw-transaction, PSBT, or broadcast RPC was called.

## Shutdown and restart

The first `stop` request was sent at `2026-09-11T22:13:55.4318270-04:00` and returned:

```text
BitcoinII stopping
```

The process exited by `2026-09-11T22:13:58.0689573-04:00`. The cookie had been removed, and the log ended with `Shutdown done`. The final logged active height was `9963`.

The node restarted at `2026-09-11T22:14:11.4627147-04:00` with the same executable, arguments, and disposable directory. At `2026-09-11T22:14:59.8098949-04:00`, 48.283 seconds after process start, it reported:

```json
{
  "version": 310100,
  "subversion": "/BitcoinII:31.1.0/",
  "protocolversion": 70016,
  "networkactive": true,
  "connections": 6,
  "connections_in": 0,
  "connections_out": 6,
  "blocks": 16341,
  "headers": 58970,
  "verificationprogress": 0.08767891507193926,
  "initialblockdownload": true,
  "pruned": false,
  "peer_networks": ["ipv4:6"],
  "peer_connection_types": ["outbound-full-relay:6"],
  "uptime": 48,
  "indexinfo": {}
}
```

This established retained chain state and normal outbound reconnection after restart.

Immediately after restart, `listwallets` was empty while `listwalletdir` showed only `morebc2-disposable-v31`. The wallet was not auto-loaded. An explicit `loadwallet "morebc2-disposable-v31"` succeeded; the wallet still reported `txcount = 0`, `scanning = false`, and the same SQLite descriptor format. No other wallet name or directory was observed.

The final `stop` request was sent at `2026-09-11T22:15:15.7432120-04:00`. The process exited by `2026-09-11T22:15:16.3728917-04:00`; the cookie was removed; the log again ended with `Shutdown done`; and no RPC listener remained. Subsequent socket entries for port `28332` were only operating-system `TIME_WAIT` records.

The disposable data directory was left stopped and intact for auditability. It is not an installed or existing BitcoinII data directory.

## Defaults and source expectations

| Setting | Source/default expectation | Runtime observation | Result |
|---|---|---|---|
| Network | Mainnet absent a test-chain selector | `chain = "main"` | Match |
| Mainnet RPC | `8332`, operator-configurable | `8332` was occupied by unrelated CapStash; explicit loopback test port `28332` used | Qualified match; default not bound in this test |
| Mainnet P2P | `8338` in v31.1.0 chain parameters | Qt listened on `0.0.0.0:8338`; peers used `:8338` | Match |
| `txindex` | `DEFAULT_TXINDEX = false` | `getindexinfo = {}` | Match |
| Pruning | `-prune` defaults to `0`/disabled | `getblockchaininfo.pruned = false`; log reported non-prune mode | Match |
| Block-filter index | disabled by default | absent from `getindexinfo` | Match |
| Coin-statistics index | disabled by default | absent from `getindexinfo` | Match |
| Authentication | random cookie when no static RPC credentials are configured | log reported random-cookie authentication; `.cookie` created for each run and removed at shutdown | Match |

The test configuration did not set the index or pruning options. Runtime observations therefore exercise those defaults rather than explicit overrides.

## Pass/fail table

| Check | Result | Evidence |
|---|---|---|
| Exact v31.1.0 binary identity | PASS | File metadata `31.1.0`; runtime log `v31.1.0`; RPC `310100` and `/BitcoinII:31.1.0/` |
| Fresh disposable data directory | PASS | New directory; explicit `-datadir`; runtime-selected path logged |
| Existing-wallet/datadir isolation | PASS | Empty wallet RPCs before creation; only the new disposable wallet observed; default directory not inspected |
| Startup in server mode | PASS | RPC and network threads started; `Done loading`; loopback RPC listener present |
| Mainnet status | PASS | `getblockchaininfo.chain = main` |
| RPC default handling | PASS WITH DEVIATION | Documented `8332` was occupied; explicit loopback `28332` used consistently |
| Cookie authentication | PASS | Random cookie created in disposable directory, used in memory, and removed at shutdown |
| Requested node/network RPCs | PASS | `getnetworkinfo`, `getblockchaininfo`, `getmempoolinfo`, summarized `getpeerinfo`, `getnettotals`, `uptime`, `getchaintips` all returned successfully |
| `getindexinfo` availability | PASS | RPC present and returned `{}` |
| Wallet RPC isolation | PASS | Empty before creation; only `morebc2-disposable-v31` after creation/load; zero transactions |
| Peer discovery/connectivity | PASS | Four outbound peers first run; six after restart; current headers acquired |
| Initial sync progress | PASS / BOUNDED | Height advanced to `9963` first run and `16341` after restart; IBD remained true |
| Index/prune defaults | PASS | No optional indexes; unpruned; matches reviewed defaults |
| Clean shutdown | PASS | Two RPC stops; process exits; cookie removal; `Shutdown done` twice |
| Restart and reconnection | PASS | Retained chain state and six outbound connections after 48 seconds |
| Transaction/broadcast safety | PASS | No transaction construction, signing, submission, broadcast, or spend performed |

No required check failed. Qualified or bounded results are called out rather than upgraded to unconditional claims.

## Notable deviations and observations

1. **No local v31.1.0 headless daemon or matching CLI was available.** The released Qt binary was used with `-server=1`, and RPC was sent directly over loopback HTTP. The older v29.1.0 daemon/CLI installation was not used.
2. **Port `8332` was already occupied by an unrelated CapStash process.** The isolated node used `127.0.0.1:28332`. This test therefore confirms the documented default through source/release documentation and confirms operator override behavior at runtime; it does not show the v31 binary successfully binding `8332` on this host.
3. **The Qt `-version` action used an About window rather than console output.** Runtime log and RPC identity supplied stronger execution evidence.
4. **The disposable wallet was not auto-loaded after restart.** It remained discoverable through `listwalletdir` and loaded successfully only when explicitly named. Operators should not assume `createwallet` makes a wallet load automatically on later starts unless they explicitly test or configure that behavior.
5. **The log contained one RPC-bind warning after logging the same bind target twice.** The same RPC settings were present in the config and repeated on the command line. One listener on `127.0.0.1:28332` started successfully and served every request. Future test commands can avoid repeating identical RPC bind settings in both places.
6. **A NAT-PMP external-address request and a Windows default-route lookup logged non-fatal failures.** DNS seeding still returned addresses, outbound peers connected immediately, and normal synchronization proceeded.

## Explicit remaining unverified items

- Full initial block download, final synced height/hash, total sync time, and disk use.
- Behavior after crossing and fully validating the v31.1.0 activation height `57750` in this fresh runtime.
- `txindex=1`, block-filter index, coin-statistics index, pruning, reindex, and incompatible-setting behavior.
- Inbound peer reachability, UPnP/NAT-PMP success, firewall behavior, and long-duration peer stability.
- v31.1.0 headless-daemon and matching-CLI behavior on Windows; neither executable was locally available for this test.
- Wallet auto-load configuration, backup/restore, encryption, unlock, import, rescan, address generation, balances, signing, PSBT, and transaction workflows.
- Any valid or invalid transaction submission or broadcast through local RPC.
- Fee estimation after full synchronization and a populated mempool.
- Cross-platform behavior.
- Publisher-authenticated artifact signatures, trusted checksum provenance, and reproducible binary-to-source equivalence.
- Whether the duplicate RPC-bind warning occurs when settings are supplied only once.

## Evidence boundary

This record establishes a bounded local v31.1.0 Windows/Qt-server runtime path: fresh-directory startup, mainnet identity, cookie-authenticated loopback RPC, requested read-only observations, creation and inspection of one disposable wallet, peer discovery, active initial synchronization, clean shutdown, restart, retained chain state, and peer reconnection.

It does not establish full synchronization, exchange-production suitability, wallet spending behavior, transaction correctness, public RPC safety, release authenticity, or long-term network reliability.

## Related evidence

- [Verification evidence index](verification-index.md)
- [Windows node-operator test — 2026-08-27](windows-node-operator-test-2026-08-27.md)
- [Windows fresh-node peer discovery test — 2026-08-28](windows-peer-discovery-test-2026-08-28.md)
- [v31.1.0 release asset record](../releases/v31.1.0-assets.md)
- [Network specifications](../documentation/network-specifications.md)
- [RPC configuration](../configuration/rpc-configuration.md)

## Verification

**Status:** Directly observed / Dated local test
**Primary evidence:** Local v31.1.0 executable metadata and SHA-256; runtime log; socket/process state; direct cookie-authenticated JSON-RPC output; clean shutdown/restart observations; release-pinned defaults already documented in MoreBC2
**Notes:** The node is stopped. The disposable directory remains isolated and intact. No existing wallet/datadir and no transaction workflow was accessed.
