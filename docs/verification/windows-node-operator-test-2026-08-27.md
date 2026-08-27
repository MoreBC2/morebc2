# Windows node-operator test — 2026-08-27

**Category:** Verification
**Status:** Draft / Dated local test
**Date tested:** 2026-08-27

## Summary

MoreBC2 exercised a wallet-disabled BitcoinII Core `v29.1.0` command-line node on 64-bit Windows in a dedicated data directory. The daemon started, accepted cookie-authenticated read-only RPC on loopback, connected to outbound peers, acquired 57,743 headers, advanced block validation from height 0 to 4,901 during the first run, stopped through the supported RPC command, and restarted from the same data directory at height 6,795.

The bounded test did not wait for initial block download to finish. It establishes a tested startup, observation, read-only RPC, shutdown, and restart path; it does not establish sync duration, cross-platform behavior, wallet safety, or a universal RPC port.

## Environment

| Field | Tested value |
|---|---|
| Host | 64-bit Windows, NT `10.0.26200.9168`; registry `DisplayVersion` `25H2` |
| Network | BitcoinII mainnet |
| BitcoinII Core | Both executables reported `v29.1.0` with `-version`; `getnetworkinfo` returned `version=290100` and `subversion=/Satoshi:29.1.0/` |
| Artifact | `BitcoinII-29.1.0-x86_64-win64-CLI.zip` |
| Artifact bytes | `7,987,528` |
| Artifact SHA-256 | `94985c39c2e99406b50b3a318442677ffa3df6f9d471c03cb30f1fb0c4b8fa3a` |
| Extracted executables | `bitcoinIId.exe` (`15,555,072` bytes), `bitcoinII-cli.exe` (`2,241,536` bytes) |
| Data directory | Dedicated disposable directory represented below as `<test-root>\data` |
| Wallet | Disabled with `disablewallet=1`; no wallet directory was created |
| P2P posture | Outbound only with `listen=0` |
| RPC | Cookie authentication, `127.0.0.1:28337` |

The archive filename, byte size, and local SHA-256 matched the [release-artifact authentication record](release-artifact-authentication-2026-08-27.md). This is repeat-byte integrity evidence only. The artifact still has no publisher-authenticated checksum or BitcoinII release-key trust path; the release conclusion remains **INTEGRITY RECORDED, AUTHENTICITY UNVERIFIED**.

## Archive and executable checks

Commands run before execution:

```powershell
(Get-Item -LiteralPath $Archive).Length
(Get-FileHash -LiteralPath $Archive -Algorithm SHA256).Hash.ToLowerInvariant()
```

The archive member list contained exactly:

- `BitcoinII-29.1.0-x86_64-win64-CLI/bitcoinII-cli.exe`
- `BitcoinII-29.1.0-x86_64-win64-CLI/bitcoinIId.exe`

Both executables reported `v29.1.0` when invoked with `-version`. The prior authentication record found these Windows executables unsigned through Authenticode; this test did not produce stronger authenticity evidence.

## Configuration and startup

The default configuration filename and location were confirmed by generated help and runtime logging: with `-datadir=<test-root>\data`, the daemon read `<test-root>\data\bitcoinII.conf`, wrote `<test-root>\data\debug.log`, and created its cookie in that data directory.

Test configuration:

```ini
server=1
disablewallet=1
listen=0
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcport=28337
```

Startup method:

```powershell
$Node = Start-Process -FilePath '<test-root>\BitcoinII-29.1.0-x86_64-win64-CLI\bitcoinIId.exe' `
  -ArgumentList '-datadir=<test-root>\data' `
  -WorkingDirectory '<test-root>\BitcoinII-29.1.0-x86_64-win64-CLI' `
  -WindowStyle Hidden -PassThru
```

The log reported the expected data directory and configuration, `Wallet disabled!`, RPC binding on `127.0.0.1:28337`, mainnet genesis at height 0, network-thread startup, and `Done loading`. A socket check showed only `127.0.0.1:28337` listening for this test RPC server.

## Port observation and startup exceptions

An already-running local BitcoinII Core `v29.1.0` GUI node occupied `127.0.0.1:8337`. Attempting to start the isolated daemon on the same address and port failed cleanly with `Unable to bind any endpoint for RPC server`. The existing process was not stopped or altered. A read-only `getnetworkinfo` call to that existing node again reported version `290100` and working outbound connections.

The isolated test therefore used the explicit loopback override `28337`. This does not contradict the earlier Windows/mainnet `v29.1.0` observation at `127.0.0.1:8337`; it demonstrates why the data-directory configuration and every CLI invocation must agree on an available port. Neither port is asserted here as universal across releases, networks, or platforms.

During initialization, an explicit CLI `-rpcconnect=127.0.0.1` attempt returned `EOF reached`, while omitting `-rpcconnect` and relying on the CLI's local default succeeded with the same data directory and port. The reader guide uses only the successful syntax. The cause of the explicit-connect behavior was not established and remains unresolved.

## Peer and synchronization observations

The isolated node initially reported:

- `networkactive: true`;
- `connections: 0`;
- `blocks: 0`;
- `headers: 0`;
- `initialblockdownload: true`.

Both configured DNS seeds returned zero addresses in this test environment. To test synchronization without publishing peer addresses, three outbound peer addresses were obtained from the separate local node and passed to the isolated node as one-shot connections:

```text
bitcoinII-cli.exe -datadir=<test-root>\data -rpcport=28337 addnode <redacted-peer-address> onetry
```

All three one-shot requests succeeded. This setup-only peer-control action is recorded for reproducibility of the test, but is not presented as a reader command or a recommended peer source.

A second fresh data directory tested the source-listed hostname directly:

```text
bitcoinII-cli.exe -datadir=<second-test-root>\data -rpcport=28338 addnode bitcoinII.ddns.net:8338 onetry
```

The command returned success, but after eight seconds the node still reported zero persistent connections, zero headers, and height 0. This bounded attempt did not establish the hostname as a reliable manual recovery path, so the reader guide does not recommend it as one.

After connections formed:

| Observation | Value |
|---|---:|
| Outbound connections at first sync sample | `3` |
| Headers | `57,743` |
| Blocks at first sync sample | `1,082` |
| Blocks at later `getblockchaininfo` sample | `4,876` |
| Separate `getblockcount` moments later | `4,901` |
| `verificationprogress` at the later sample | approximately `0.026875` |
| `initialblockdownload` | `true` |

The changing block height while headers remained at 57,743 established that block validation was progressing. The test stopped before full synchronization. No expected sync duration is claimed.

## Read-only RPC checks

The successful CLI form was:

```text
bitcoinII-cli.exe -datadir=<test-root>\data -rpcport=28337 <command>
```

| Command | Result used to establish success |
|---|---|
| `getblockchaininfo` | `chain=main`; headers and blocks present; `initialblockdownload=true`; progress and best hash present |
| `getnetworkinfo` | `version=290100`; `subversion=/Satoshi:29.1.0/`; `networkactive=true`; outbound-connection count present |
| `getconnectioncount` | Returned `3` at the first connected sample and `2` at the later sample |
| `getblockcount` | Advanced to `4,901` during the first run |
| `getbestblockhash` | Returned a 64-character block hash corresponding to the node's then-current validated tip |

Live hashes, heights, connection counts, and progress values are time-dependent observations, not expected constants for readers.

## Shutdown and restart

Shutdown command:

```text
bitcoinII-cli.exe -datadir=<test-root>\data -rpcport=28337 stop
```

The CLI returned `BitcoinII Core stopping`; the daemon process exited; and `debug.log` recorded `Shutdown: In progress...` followed by `Shutdown: done`.

The same startup command was then run against the same data directory. RPC became available, `getblockchaininfo` returned `blocks=6795`, `headers=57743`, and `initialblockdownload=true`, showing that the earlier chain state was retained and readable. A second `stop` completed cleanly. No corruption warning or unexpected state was observed.

## Troubleshooting actually observed

- **RPC not ready yet:** calls can fail while initialization is still underway. The successful readiness marker in this test was `init message: Done loading` in `debug.log`.
- **RPC port already occupied:** the daemon logged a bind failure and exited when `127.0.0.1:8337` was already in use. Use one unused loopback port consistently in the config and CLI commands; do not expose RPC publicly.
- **Wrong data directory or port:** the CLI must point to the data directory containing the node's cookie and use the configured port. The daemon logs the data directory and config path it actually selected.
- **No peers:** this test's DNS seeds returned no addresses. `getnetworkinfo` and `getconnectioncount` exposed the zero-peer state. A one-shot attempt using `bitcoinII.ddns.net:8338` did not establish a persistent connection. No public peer list or generalized repair is established here.
- **Still syncing:** `initialblockdownload=true`, headers ahead of blocks, and increasing block height identified active initial sync.
- **Clean shutdown:** use the `stop` RPC and wait for the process to exit or for `Shutdown: done`; do not terminate the process merely because a CLI call returns.

## Evidence boundaries

### Locally tested

- CLI archive identity and member names.
- Wallet-disabled, outbound-only daemon startup with an isolated data directory.
- Config, cookie, and log placement.
- Loopback RPC on the explicit test port.
- Five read-only RPC calls.
- Header acquisition and advancing initial block validation.
- RPC shutdown and restart from retained chain state.

### Source/help reviewed

- `-datadir`, `-conf`, `-disablewallet`, `-listen`, `-rpcbind`, `-rpcallowip`, `-rpcport`, and `-server` option descriptions.
- Meanings of the documented RPC fields are linked from the reader guide to the existing RPC and Source Atlas pages.

### Release-specific

- Artifact filename, size, hash, executable names, and reported version apply to BitcoinII Core `v29.1.0` Windows x86_64 CLI release bytes checked on 2026-08-27.

### Unresolved or not tested

- Full synchronization completion and elapsed time.
- Whether DNS seeding succeeds in other Windows environments.
- A generally reproducible recovery path when a fresh node finds no peers.
- Cause of the explicit `-rpcconnect=127.0.0.1` CLI failure.
- Universal or cross-platform RPC defaults.
- GUI startup and GUI shutdown in this test data directory.
- Wallet creation, wallet operations, keys, transactions, mining, pruning, inbound P2P, port forwarding, firewall changes, and public RPC.
- Publisher authenticity and binary-to-source reproducibility.

## Safety and privacy

No wallet was created or funded. No wallet, seed, private-key, password, authentication cookie, personal public IP, or peer address is included in this record. RPC was bound only to loopback. No firewall, router, infrastructure, organization, Cloudflare, or deployment setting was changed.

## Related evidence

- [Tested Windows node guide](../nodes/node-guide.md)
- [Release-artifact authentication — 2026-08-27](release-artifact-authentication-2026-08-27.md)
- [Local BitcoinII node inspection — 2026-07-10](local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test — 2026-07-10](read-only-rpc-smoke-test-2026-07-10.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Source Atlas: startup initialization](../developers/source-atlas/init-cpp.md)
- [Source Atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)

## Verification

**Status:** Draft / Dated local test
**Primary sources checked:** Canonical `v29.1.0` Windows x86_64 CLI release archive; extracted daemon and CLI help/version output; isolated runtime logs; local process/socket state; read-only RPC output
**Notes:** The operator sequence was locally exercised through advancing initial sync, clean shutdown, and restart. Full synchronization and release authenticity remain unverified.
