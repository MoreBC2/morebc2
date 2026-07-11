# BitcoinII read-only RPC smoke test — 2026-07-10

**Category:** Verification record  
**Status:** Locally tested  
**Date tested:** 2026-07-10

## Summary

This page records a narrow read-only RPC smoke test against a locally running BitcoinII Core v29.1.0 mainnet GUI node on Windows.

The RPC server was bound to `127.0.0.1:8337` and used local cookie authentication through the active BitcoinII data directory. No wallet, mining, transaction, import/export, peer-control, shutdown, cookie-reading, credential-reading, or state-changing commands were run.

## Environment

- Operating system: Windows
- BitcoinII Core version: `v29.1.0`
- RPC-reported version: `290100`
- RPC-reported subversion: `/Satoshi:29.1.0/`
- Network: `main`
- Node state: `initialblockdownload=false`
- Pruning: `pruned=true`
- RPC target: `127.0.0.1:8337`
- CLI executable: `C:\bcli\bin\Release\bitcoinII-cli.exe`
- Data directory: `C:\Users\Dan\AppData\Local\BitcoinII`

Command prefix used:

```powershell
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337
```

## Results

| Command | Timestamp | Result | Status | Documentation note |
|---|---:|---|---|---|
| `getblockcount` | `2026-07-10T20:52:52.7670708-04:00` | `57420` | Pass | Suitable as a harmless read-only example. |
| `getbestblockhash` | `2026-07-10T20:52:52.7966818-04:00` | `0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596` | Pass | Suitable as a harmless read-only example; value is time-dependent. |
| `getblockchaininfo` | `2026-07-10T20:52:52.8335433-04:00` | `chain=main`, `blocks=57420`, `headers=57420`, `verificationprogress=0.9998927291265401`, `initialblockdownload=false`, `pruned=true` | Pass | Suitable with clear example-output labeling. |
| `getnetworkinfo` | `2026-07-10T20:52:52.8663042-04:00` | `version=290100`, `subversion=/Satoshi:29.1.0/`, `protocolversion=70016`, `networkactive=true`, `connections=10`, `connections_in=0`, `connections_out=10` | Pass | Suitable only when local/public address fields are omitted or redacted. |
| `getconnectioncount` | `2026-07-10T20:52:52.9025684-04:00` | `10` | Pass | Suitable as a harmless read-only example. |
| `getpeerinfo` | `2026-07-10T20:52:52.9341234-04:00` | 10 peers; 0 inbound; 10 outbound; protocol `70016`; all IPv4; all P2P v2 transport; 2 block-relay-only; 8 outbound-full-relay; synced headers/blocks reported `57420` | Pass | Raw output is not safe for publication without redaction because it includes peer/local addresses and session identifiers. |
| `getmempoolinfo` | `2026-07-10T20:52:53.0101550-04:00` | `loaded=true`, `size=10`, `bytes=1800`, `usage=11792`, `maxmempool=300000000`, `mempoolminfee=0.00001000`, `fullrbf=true` | Pass | Suitable as a harmless read-only example; values are time-dependent. |
| `getdifficulty` | `2026-07-10T20:52:53.0502265-04:00` | `17582345189.58188` | Pass | Suitable as a harmless read-only example; value is time-dependent. |
| `uptime` | `2026-07-10T20:52:53.0901810-04:00` | `458` seconds | Pass | Suitable as a harmless read-only example. |

## Exact commands run

```powershell
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getblockcount
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getbestblockhash
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getblockchaininfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getnetworkinfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getconnectioncount
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getpeerinfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getmempoolinfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getdifficulty
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\Dan\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 uptime
```

## Notable observations

- The node reported protocol version `70016`.
- The node reported service names including `WITNESS`, `NETWORK_LIMITED`, and `P2P_V2`.
- All 10 observed peer connections were outbound at the test time.
- All observed peers used P2P v2 transport.
- The node was pruned and not in initial block download.
- Raw `getpeerinfo` output should not be copied into public documentation without redacting remote addresses, local bind/address fields, and session identifiers.

## What this record supports

This record supports marking the nine tested RPC commands as **Locally tested** for BitcoinII Core v29.1.0 on Windows mainnet in the documented environment.

It also supports presenting `getblockcount`, `getbestblockhash`, `getblockchaininfo`, `getconnectioncount`, `getmempoolinfo`, `getdifficulty`, and `uptime` as harmless read-only examples when their outputs are clearly labeled as time-dependent examples.

`getnetworkinfo` and `getpeerinfo` should only be shown with privacy-sensitive fields omitted or redacted.

## What this record does not support

This record does not establish:

- permanent behavior across future BitcoinII versions,
- command behavior on Linux or macOS,
- behavior on testnet, signet, or regtest,
- wallet-command safety,
- mining-command safety,
- transaction-command safety,
- whether the locally built CLI binary is byte-for-byte identical to an official release CLI,
- that every field returned by these RPCs is safe to publish without review.

## Verification

**Status:** Locally tested  
**Primary source:** Local BitcoinII Core v29.1.0 RPC execution on Windows mainnet, 2026-07-10  
**Notes:** All nine commands succeeded. Raw peer and network outputs require privacy review before publication.