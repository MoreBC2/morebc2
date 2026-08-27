# Tested Windows node guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-08-27

## Scope

This is one narrow, locally tested route for running the BitcoinII Core `v29.1.0` command-line node on 64-bit Windows. It uses:

- the Windows x86_64 CLI archive;
- a dedicated data directory;
- wallet functionality disabled;
- outbound-only peer-to-peer networking;
- cookie-authenticated RPC bound only to loopback;
- safe read-only status calls;
- the supported RPC shutdown path.

The test reached advancing initial block synchronization and then completed a clean shutdown and restart. It did not wait for full synchronization. This is not a wallet, transaction, mining, inbound-node, firewall, or public-RPC guide.

**Important peer-discovery limit:** the fresh isolated node did not automatically obtain persistent peers in the tested environment. The synchronization progress reported below required three redacted one-shot peer addresses borrowed from a separate local node. Those addresses were test scaffolding, are not published or recommended, and are not required for the startup, local RPC, shutdown, or restart portions of this guide. A generally reproducible fresh-node bootstrap path remains unresolved, so a reader following this Draft procedure may remain at zero peers.

## 1. Obtain the tested release

Use the canonical [`v29.1.0` release page](https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v29.1.0) and select:

```text
BitcoinII-29.1.0-x86_64-win64-CLI.zip
```

The 2026-08-27 MoreBC2 record observed:

| Field | Expected value |
|---|---|
| Size | `7,987,528` bytes |
| SHA-256 | `94985c39c2e99406b50b3a318442677ffa3df6f9d471c03cb30f1fb0c4b8fa3a` |
| Executables | `bitcoinIId.exe`, `bitcoinII-cli.exe` |

Check a download in PowerShell:

```powershell
$Archive = 'C:\Downloads\BitcoinII-29.1.0-x86_64-win64-CLI.zip'
(Get-Item -LiteralPath $Archive).Length
(Get-FileHash -LiteralPath $Archive -Algorithm SHA256).Hash.ToLowerInvariant()
```

The size and hash let you compare your file with the exact bytes MoreBC2 retrieved. They do not authenticate the publisher. No publisher checksum manifest, release-asset signature, or trusted BitcoinII release-key path was found for `v29.1.0`. Read the [dated release-artifact record](../verification/release-artifact-authentication-2026-08-27.md) before deciding whether that limitation is acceptable.

**Current conclusion:** **INTEGRITY RECORDED, AUTHENTICITY UNVERIFIED**

## 2. Extract into a dedicated location

The tested path avoided the normal BitcoinII data directory and did not touch an existing wallet or node. Use a new writable directory; this example keeps the operator files under the current Windows user's local application-data area:

```powershell
$NodeRoot = Join-Path $env:LOCALAPPDATA 'BitcoinII-v29.1.0-operator'
$DataDir = Join-Path $NodeRoot 'data'
New-Item -ItemType Directory -Path $NodeRoot -ErrorAction Stop
Expand-Archive -LiteralPath $Archive -DestinationPath $NodeRoot
New-Item -ItemType Directory -Path $DataDir -ErrorAction Stop
$BinDir = Join-Path $NodeRoot 'BitcoinII-29.1.0-x86_64-win64-CLI'
Get-ChildItem -LiteralPath $BinDir
```

Use a different empty directory if `$NodeRoot` already exists. Do not overwrite a data directory whose contents you have not inspected.

The final listing should include only the two executables named above. You can confirm their reported release without starting the node:

```powershell
& (Join-Path $BinDir 'bitcoinIId.exe') "-datadir=$DataDir" -version
& (Join-Path $BinDir 'bitcoinII-cli.exe') -version
```

## 3. Create the isolated configuration

Create `$DataDir\bitcoinII.conf` with exactly this bounded test configuration:

```ini
server=1
disablewallet=1
listen=0
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcport=28337
```

Why these choices:

- `disablewallet=1` keeps wallet and key operations outside this procedure.
- `listen=0` permits outbound peer connections but does not accept inbound P2P connections.
- `rpcbind` and `rpcallowip` restrict RPC to the same computer.
- `28337` is an explicit operator-selected port used by this isolated test because another local `v29.1.0` node already occupied `8337`.

Earlier Windows/mainnet `v29.1.0` testing observed RPC on `127.0.0.1:8337`, and that address was observed again during this test. This guide does not generalize `8337` or `28337` as a universal default. The source/configuration evidence that contains `8332` is also a separate evidence type; see [RPC configuration](../configuration/rpc-configuration.md).

Never bind RPC to a public address. Do not expose BitcoinII Core RPC to the public internet.

## 4. Start the node

Run this from the same PowerShell session that defines `$BinDir` and `$DataDir`:

```powershell
$Node = Start-Process `
  -FilePath (Join-Path $BinDir 'bitcoinIId.exe') `
  -ArgumentList ('-datadir="{0}"' -f $DataDir) `
  -WorkingDirectory $BinDir `
  -WindowStyle Hidden `
  -PassThru
```

This is the startup method exercised on 2026-08-27. The daemon reads `$DataDir\bitcoinII.conf`, writes `$DataDir\debug.log`, stores chain state beneath `$DataDir`, and creates a temporary local authentication cookie there.

Confirm the process exists:

```powershell
Get-Process -Id $Node.Id
```

Then inspect the end of the log:

```powershell
Get-Content -LiteralPath (Join-Path $DataDir 'debug.log') -Tail 40
```

`Done loading` means initialization reached the point where the tested RPC calls can proceed. A running process alone does not prove that peers exist or that synchronization is complete.

## 5. Check RPC readiness and node identity

The tested CLI syntax relies on its local default connection and supplies the same data directory and port as the daemon:

```powershell
$Cli = Join-Path $BinDir 'bitcoinII-cli.exe'
& $Cli "-datadir=$DataDir" -rpcport=28337 getnetworkinfo
```

During the test, calls made before initialization completed failed transiently. Wait for `Done loading` and try the read-only call again. Do not add credentials to the command line; the CLI and daemon use the cookie in the shared data directory.

For `v29.1.0`, the tested success fields were:

- `version: 290100`;
- `subversion: /Satoshi:29.1.0/`;
- `networkactive: true`.

Live connection counts vary.

## 6. Observe peers and synchronization

The tested synchronization advance depended on the redacted one-shot peer scaffolding disclosed in the Scope section. The commands below accurately show whether your node found peers and is advancing, but this guide does not claim that the preceding fresh-node steps will discover peers automatically.

Run:

```powershell
& $Cli "-datadir=$DataDir" -rpcport=28337 getconnectioncount
& $Cli "-datadir=$DataDir" -rpcport=28337 getblockchaininfo
```

Interpret the fields together:

| Question | Evidence to inspect |
|---|---|
| Is the daemon answering? | The CLI returns structured output rather than a connection error. |
| Is networking active? | `getnetworkinfo` reports `networkactive: true`. |
| Are peers connected? | `getconnectioncount` is greater than zero; `getnetworkinfo` reports connection counts. |
| Are headers being learned? | `headers` rises or is ahead of `blocks`. |
| Are blocks being validated? | Repeated `getblockcount` or `blocks` values increase. |
| Is initial sync still active? | `initialblockdownload` is `true`, or headers remain ahead of blocks. |
| Is the node fully synchronized? | `initialblockdownload` is `false`, validated blocks have caught up with headers, and the tip continues to track a separately trusted current reference. |

The local test observed 57,743 headers and block height advancing from 0 through 4,901, with `initialblockdownload: true`. It did not establish full synchronization or an expected completion time.

Do not publish raw `getpeerinfo` output; it contains network addresses and session details. This beginner route does not require it.

## 7. Run the tested read-only checks

These five commands were exercised against the isolated node:

```powershell
& $Cli "-datadir=$DataDir" -rpcport=28337 getblockchaininfo
& $Cli "-datadir=$DataDir" -rpcport=28337 getnetworkinfo
& $Cli "-datadir=$DataDir" -rpcport=28337 getconnectioncount
& $Cli "-datadir=$DataDir" -rpcport=28337 getblockcount
& $Cli "-datadir=$DataDir" -rpcport=28337 getbestblockhash
```

Heights, hashes, peer counts, and progress are live values. Treat a well-formed response and internally consistent fields—not the dated example numbers—as success. For method details, follow [RPC overview](../developers/rpc-overview.md), [Source Atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md), and the [dated Windows operator test](../verification/windows-node-operator-test-2026-08-27.md).

## 8. Stop cleanly

Use the supported RPC path:

```powershell
& $Cli "-datadir=$DataDir" -rpcport=28337 stop
```

The tested response was `BitcoinII Core stopping`. Wait for the process to exit:

```powershell
Wait-Process -Id $Node.Id
Select-String -LiteralPath (Join-Path $DataDir 'debug.log') -Pattern 'Shutdown: done'
```

Do not force-close the process merely because the CLI returned. The test treated process exit and `Shutdown: done` as the completion signals.

## 9. Restart

Run the startup command from step 4 again with the same `$DataDir`. After `Done loading`, repeat `getblockchaininfo`. The test restarted successfully, read the retained chain state at height 6,795, and then completed a second clean RPC shutdown without a corruption warning.

That bounded restart shows that the retained state was readable in this test; it is not an exhaustive filesystem-integrity or corruption test.

## Troubleshooting boundaries

Only cases directly observed in this test or supported by the linked help/source evidence are included:

- **Executable not found:** confirm that `$BinDir` contains both release executables and that the archive was extracted one level where expected.
- **RPC call fails during startup:** wait for `Done loading` in `debug.log`, then use the exact successful syntax with the same `$DataDir` and `-rpcport`.
- **RPC bind failure:** another process may own the selected port. The test observed this at `127.0.0.1:8337`. Choose a free loopback port and update both the config and every CLI command; do not widen the bind address.
- **Wrong config or data directory:** the beginning of `debug.log` reports the selected data directory and config file. Correct the command rather than copying cookies or passwords.
- **No peers:** check `networkactive`, `connections`, and DNS/network errors in `debug.log`. Both configured DNS seeds returned no addresses in this test environment, so automatic peer discovery was not proven here. This guide does not recommend untrusted peer lists.
- **Node is still syncing:** inspect `initialblockdownload`, `headers`, `blocks`, and repeated block-height samples. Do not infer a sync deadline.
- **Shutdown appears slow:** wait for process exit and `Shutdown: done`; do not kill the daemon while it is writing state.

## What this guide proves—and does not

### Locally tested on 2026-08-27

- The named `v29.1.0` Windows CLI archive and executable names.
- A dedicated, wallet-disabled, outbound-only data directory.
- Config-file selection, log location, and loopback cookie RPC.
- Five read-only RPC calls while initial sync advanced.
- Clean RPC shutdown and restart with retained chain state.

### Source/help reviewed

- The configuration switches used here and the meanings of the linked RPC fields.

### Release-specific

- The artifact name, size, hash, executable names, and observed behavior are bounded to Windows x86_64 BitcoinII Core `v29.1.0` and the 2026-08-27 test.

### Still unresolved

- Full-sync completion and sync duration.
- Automatic peer discovery across Windows environments.
- Universal RPC port behavior.
- Publisher authenticity and binary-to-source reproducibility.
- Wallet, transaction, mining, pruning, inbound networking, firewall, and public-service workflows.

## Related pages

- [Windows node-operator test — 2026-08-27](../verification/windows-node-operator-test-2026-08-27.md)
- [Release-artifact authentication — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)
- [Node configuration](../configuration/node-configuration.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Command testing status](../verification/command-testing.md)
- [Source Atlas: startup initialization](../developers/source-atlas/init-cpp.md)
- [Source Atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core `v29.1.0` Windows x86_64 CLI release artifact and generated help; 2026-08-27 isolated local runtime, log, process, socket, RPC, shutdown, and restart evidence; linked Source Atlas and configuration records
**Notes:** The primary route was locally tested through advancing initial sync, clean shutdown, and restart. Draft status is retained because full sync, cross-platform behavior, automatic peer discovery, release authenticity, and broader operational workflows remain unresolved.
