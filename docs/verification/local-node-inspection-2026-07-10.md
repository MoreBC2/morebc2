# Local BitcoinII node inspection — 2026-07-10

**Category:** Verification record  
**Status:** Partial, successful read-only RPC check  
**Date checked:** 2026-07-10

## Summary

This page records a local BitcoinII Core v29.1.0 GUI node inspection on Windows, successful local-only RPC enablement, five read-only RPC checks, and a same-time comparison against the public BitcoinII explorer tip endpoint.

The local node and explorer returned the same height and best-block hash during the comparison window. This is a dated point-in-time agreement, not a permanent reliability claim.

No wallet balances, addresses, transactions, private keys, seeds, descriptors, cookie contents, or RPC credentials were inspected or printed. No transaction, mining, peer-control, import, or other state-changing RPC command was used.

## Environment

- Operating system: Windows
- Process: `bitcoinII-qt.exe`
- PID after restart: `37820`
- BitcoinII Core version: `v29.1.0`
- Network: `main`
- Data directory: `C:\Users\<user>\AppData\Local\BitcoinII`

## Executables

GUI:

```text
C:\Users\<user>\Desktop\BitcoinII-29.1.0-x86_64-win64-GUI\BitcoinII-29.1.0-x86_64-win64-GUI\bitcoinII-qt.exe
```

CLI:

```text
C:\bcli\bin\Release\bitcoinII-cli.exe
```

## Local-only RPC configuration

Configuration file:

```text
C:\Users\<user>\AppData\Local\BitcoinII\bitcoinII.conf
```

Configuration used:

```ini
server=1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcport=8337
```

The GUI log confirmed these arguments were loaded.

Observed bindings after restart:

- RPC: `127.0.0.1:8337`
- P2P: `0.0.0.0:8338`
- P2P IPv6: `[::]:8338`

No `0.0.0.0:8337` or LAN-address RPC bind was observed. RPC was therefore localhost-only during the check.

No previous `bitcoinII.conf` existed, so no backup was required.

## Read-only commands run

```powershell
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getblockcount
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getbestblockhash
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getblockchaininfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getnetworkinfo
& 'C:\bcli\bin\Release\bitcoinII-cli.exe' -datadir='C:\Users\<user>\AppData\Local\BitcoinII' -rpcconnect=127.0.0.1 -rpcport=8337 getconnectioncount
```

## Local RPC results

Local check timestamp:

```text
2026-07-10T20:46:08.8662219-04:00
```

| Field | Result |
|---|---|
| `getblockcount` | `57420` |
| `getbestblockhash` | `0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596` |
| Chain | `main` |
| Blocks | `57420` |
| Headers | `57420` |
| Verification progress | `0.9998990523854668` |
| Initial block download | `false` |
| Version | `290100` |
| Subversion | `/Satoshi:29.1.0/` |
| Network active | `true` |
| Connections | `10` |
| Inbound connections | `0` |
| Outbound connections | `10` |
| `getconnectioncount` | `10` |

The successful RPC responses show that the detected CLI could communicate with the running GUI node under this local configuration.

## Same-time explorer comparison

Explorer endpoint:

```text
https://bitcoinii.ddns.net/explorer/api/blocks/tip
```

Explorer check timestamp:

```text
2026-07-10T20:46:16.9332436-04:00
```

Explorer response summary:

```json
{
  "height": 57420,
  "hash": "0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596"
}
```

Comparison:

| Source | Height | Tip hash |
|---|---:|---|
| Local BitcoinII node | `57420` | `0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596` |
| BitcoinII explorer API | `57420` | `0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596` |

Result: same-time height and tip-hash match, with the two checks approximately eight seconds apart.

## What this record supports

This record supports that, at the recorded time:

- BitcoinII Core v29.1.0 was running on mainnet,
- local-only RPC was successfully enabled on `127.0.0.1:8337`,
- the five listed read-only RPC commands worked,
- the node reported blocks equal to headers,
- the node reported `initialblockdownload: false`,
- the node had 10 outbound connections and no inbound connections,
- the local node and public explorer API agreed on height `57420` and the same tip hash.

## What this record does not support

This record does not prove:

- permanent explorer synchronization or reliability,
- explorer official status,
- binary authenticity,
- release artifact verification,
- wallet safety or correctness,
- exchange/service suitability,
- that the node and explorer will continue to agree after the recorded check.

## Errors and caveats

- An initial explorer request from a sandboxed network failed, then succeeded through approved public GET access.
- No RPC startup or configuration errors were observed.
- No rollback was required.
- Earlier attempts against `127.0.0.1:8339` failed because that listener was not the BitcoinII JSON-RPC endpoint.

## Verification

**Status:** Partial, successful dated check  
**Primary evidence:** Local process/config inspection, local-only port inspection, five successful read-only RPC calls, and public explorer tip GET  
**Notes:** This is a dated operational observation. It should not be generalized into a permanent sync or reliability claim.
