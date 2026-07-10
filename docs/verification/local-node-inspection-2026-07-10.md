# Local BitcoinII node inspection — 2026-07-10

**Category:** Verification record  
**Status:** Partial  
**Date checked:** 2026-07-10

## Summary

This page records a read-only inspection of a locally running BitcoinII Core v29.1.0 GUI node on Windows.

The inspection identified the running process, executable path, data directory, active P2P ports, version, local best block height/hash from `debug.log`, and current peer activity. Read-only CLI RPC attempts were made, but the detected local port did not behave as a usable BitcoinII RPC HTTP endpoint.

No node restart, configuration change, wallet inspection, transaction action, private-key access, mining action, or file edit was performed during the inspection.

## Environment

- Operating system: Windows
- Process: `bitcoinII-qt.exe`
- PID at check time: `38508`
- Process start time: `2026-07-10 4:39:22 PM`
- BitcoinII Core version observed in log: `v29.1.0`
- Network: mainnet inferred from default-looking ports, absence of testnet/regtest configuration, and observed chain activity

## Running executable

```text
C:\Users\<user>\Desktop\BitcoinII-29.1.0-x86_64-win64-GUI\BitcoinII-29.1.0-x86_64-win64-GUI\bitcoinII-qt.exe
```

Active command line:

```text
"C:\Users\<user>\Desktop\BitcoinII-29.1.0-x86_64-win64-GUI\BitcoinII-29.1.0-x86_64-win64-GUI\bitcoinII-qt.exe"
```

## CLI executable found

```text
C:\bcli\bin\Release\bitcoinII-cli.exe
```

The running GUI package directory contained `bitcoinII-qt.exe`, but no CLI executable was found next to it.

## Data directory

Detected from `debug.log`:

```text
C:\Users\<user>\AppData\Local\BitcoinII
```

No `bitcoinII.conf` file was present there during the check.

## Ports and network activity

Observed from `debug.log` and `netstat`:

- P2P listener: `0.0.0.0:8338`
- IPv6 P2P listener: `[::]:8338`
- Local listener: `127.0.0.1:8339`
- Network active: `true`
- External established peer connections observed: 10

Important caveat:

`127.0.0.1:8339` did not behave as a usable BitcoinII RPC HTTP endpoint when probed with `bitcoinII-cli.exe`. The CLI returned an invalid-header connection error.

## Read-only commands used

Process and environment inspection:

```powershell
Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'bitcoin|bc2|bitcoinii|bitcoinII|qt' -or $_.CommandLine -match 'bitcoin|bc2|bitcoinii|bitcoinII' } | Select-Object ProcessId,Name,ExecutablePath,CommandLine | Format-List

Get-ChildItem -LiteralPath 'C:\Users\<user>\AppData\Local\BitcoinII' -Force

netstat -ano | Select-String -Pattern '\s38508$'

Select-String -LiteralPath 'C:\Users\<user>\AppData\Local\BitcoinII\debug.log' -Pattern 'UpdateTip: new best=|Leaving InitialBlockDownload|SetNetworkActive|BitcoinII Core version|Using data directory|Config file:|Bound to|block tree size'
```

Read-only RPC attempts:

```powershell
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcport=8339 getblockcount
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcport=8339 getbestblockhash
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcport=8339 getblockchaininfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcport=8339 getnetworkinfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcport=8339 getconnectioncount
```

All five RPC attempts failed with:

```text
Could not connect to the server 127.0.0.1:8339
error while reading header, or invalid header
```

## Observed local chain state

Observed from `debug.log`:

- Local best block height: `57,418`
- Local best block hash: `000000000000000007b1af4392f1a07850331b4a599f24bf1ecbabdf02336a39`
- Verification progress at last logged tip: `0.999837`
- Initial block download: log contained `Leaving InitialBlockDownload (latching to false)`
- Version: `BitcoinII Core version v29.1.0`
- Network active: `true`

Headers were not available through RPC. The log showed `block tree size = 57426`, but this page does not equate that value with the RPC `headers` field.

Connection count was not available through RPC. `netstat` showed 10 established external peer connections to remote `:8338` endpoints at the time checked.

## Explorer comparison

Previously observed explorer state from 2026-07-06:

- Explorer height: `57,398`
- Explorer tip hash: `0000000000000000230effe4c66d34cc5a97064e0860f462df9920ac4ba96f83`

The local node log contained the same hash at height `57,398`.

This supports a historical same-height/same-hash match for that block.

At the time of the local inspection, the locally logged tip was height `57,418`, which was 20 blocks ahead of the previously recorded explorer observation. This does not show that either source was currently synced because the checks were made on different dates.

## What this record supports

This record supports:

- a locally running BitcoinII Core v29.1.0 GUI node was directly observed,
- the active process, executable path, data directory, P2P ports, and peer activity were identified,
- the local log recorded height `57,418` and best block hash `000000000000000007b1af4392f1a07850331b4a599f24bf1ecbabdf02336a39`,
- the local log contained the previously observed explorer hash at height `57,398`,
- the node had left initial block download according to the log.

## What this record does not support

This record does not prove:

- a working RPC configuration,
- current explorer sync status,
- current local-node sync status against another source at the same moment,
- exact RPC `headers`, `subversion`, or `connections` values,
- binary authenticity,
- wallet safety or wallet state,
- exchange/service suitability.

## Remaining unknowns

- Which local port, if any, is configured for BitcoinII JSON-RPC.
- Whether GUI startup omitted RPC server mode.
- Whether the CLI build at `C:\bcli\bin\Release\bitcoinII-cli.exe` is fully compatible with the running GUI build.
- Exact RPC values for `getblockchaininfo`, `getnetworkinfo`, and `getconnectioncount`.
- Current same-time explorer/local-node height and tip-hash comparison.

## Safe next step

If RPC access is needed later, start the GUI intentionally with RPC server mode enabled, using a reviewed configuration or explicit `-server=1`, then rerun only the same read-only RPC commands.

Do not publish RPC credentials, cookie contents, or wallet-sensitive data in the verification record.
