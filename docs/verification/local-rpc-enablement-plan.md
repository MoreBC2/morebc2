# Local-only RPC enablement plan

**Category:** Verification plan  
**Status:** Planned / Not yet executed  
**Last reviewed:** 2026-07-10

## Summary

This page records a proposed safe configuration for enabling local-only JSON-RPC access to a BitcoinII Core v29.1.0 GUI node on Windows.

The plan was derived from BitcoinII source defaults and a read-only inspection of the locally running node. It has not yet been executed or validated.

## Environment

Observed local paths:

- GUI executable:
  `C:\Users\<user>\Desktop\BitcoinII-29.1.0-x86_64-win64-GUI\BitcoinII-29.1.0-x86_64-win64-GUI\bitcoinII-qt.exe`
- CLI executable:
  `C:\bcli\bin\Release\bitcoinII-cli.exe`
- Data directory:
  `C:\Users\<user>\AppData\Local\BitcoinII`
- Proposed configuration file:
  `C:\Users\<user>\AppData\Local\BitcoinII\bitcoinII.conf`

## Source-observed ports

BitcoinII Core v29.1.0 source in `src/chainparamsbase.cpp` indicates:

- Mainnet JSON-RPC port: `8337`
- Mainnet P2P port: `8338`

The running node was already observed listening for P2P on `8338`.

A separate listener on `127.0.0.1:8339` did not respond as a usable BitcoinII JSON-RPC HTTP endpoint when tested with `bitcoinII-cli`.

## Proposed configuration

```ini
server=1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcport=8337
```

Cookie authentication is preferred. No `rpcuser`, `rpcpassword`, or `rpcauth` setting is proposed.

Interpretation:

- `server=1` enables RPC server mode for the GUI node.
- `rpcbind=127.0.0.1` binds RPC only to localhost.
- `rpcallowip=127.0.0.1` limits accepted RPC clients to localhost.
- `rpcport=8337` uses the source-observed BitcoinII mainnet RPC default.

## Planned restart procedure

1. Close BitcoinII GUI normally.
2. Wait until `bitcoinII-qt.exe` is no longer running.
3. Create `bitcoinII.conf` in the observed data directory with the reviewed content above.
4. Start the same GUI executable again.
5. Confirm the GUI uses the same data directory.
6. Confirm a localhost listener exists on port `8337`.
7. Run only the reviewed read-only RPC commands below.

Do not kill the process, edit wallet files, delete cookie files, or expose authentication material.

## Planned read-only checks

```powershell
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getblockcount

& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getbestblockhash

& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getblockchaininfo

& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getnetworkinfo

& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getconnectioncount
```

Optional harmless listener check:

```powershell
netstat -ano | Select-String -Pattern ':8337\s'
```

## Data to record after execution

- Date and time checked.
- BitcoinII Core version.
- `chain`.
- `blocks`.
- `headers`.
- `bestblockhash`.
- `verificationprogress`.
- `initialblockdownload`.
- `networkactive`.
- `subversion`.
- `connections`.
- Same-time explorer height and tip hash, if a comparison is performed.
- Exact commands used and whether each command passed or failed.

Do not record cookie contents, RPC credentials, wallet data, addresses, balances, or transaction history.

## Rollback

If RPC should be disabled again:

1. Close BitcoinII GUI normally.
2. Remove or rename:
   `C:\Users\<user>\AppData\Local\BitcoinII\bitcoinII.conf`
3. Restart the same GUI executable.

Rollback means returning to the previous no-config-file state. Do not delete `.cookie`, wallet files, chainstate, blocks, or settings files.

## What this plan does not prove

This page does not prove:

- that RPC has been enabled,
- that port `8337` is reachable,
- that cookie authentication succeeds,
- that the detected CLI is fully compatible with the running GUI,
- that any RPC result is correct,
- that the explorer or local node is synced.

## Related pages

- [Local node inspection — 2026-07-10](local-node-inspection-2026-07-10.md)
- [Command testing status](command-testing.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Explorers](../ecosystem/explorers.md)

## Verification

**Status:** Planned / Not yet executed  
**Primary sources checked:** BitcoinII Core v29.1.0 source port defaults and the 2026-07-10 local-node inspection report  
**Notes:** This is a reviewed plan only. No configuration or runtime change is verified by this page.
