# Read-only examples

**Category:** Developer platform
**Status:** Draft / Locally tested partial
**Last reviewed:** 2026-09-12

## Summary

This page summarizes harmless BitcoinII JSON-RPC examples with current local test evidence.

Primary current evidence:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)

Historical v29.1.0 command-line evidence remains available in:

- [Read-only RPC smoke test — 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)

## Current tested environment

The 2026-09-11 validation used:

- BitcoinII Core `v31.1.0`
- Windows 11 x86_64
- mainnet
- official Win64 Qt release artifact
- `-server=1`
- disposable, newly created datadir
- loopback-only JSON-RPC on an explicitly selected test port `127.0.0.1:28332`
- random-cookie authentication
- direct HTTP JSON-RPC from PowerShell

Port `28332` was a test override because local port `8332` was already occupied. The documented v31.1.0 mainnet RPC default remains `8332`.

## Current read-only methods exercised

The current v31.1.0 record directly exercised or recorded results from:

| Method | Status | Publication note |
|---|---|---|
| `getnetworkinfo` | Locally Tested | Safe as an example if local/network address details are omitted. |
| `getblockchaininfo` | Locally Tested | Safe with time-dependent/sync-dependent output clearly labeled. |
| `getmempoolinfo` | Locally Tested | Safe with output labeled as point-in-time. |
| `getpeerinfo` | Locally Tested | Do not publish raw peer addresses or session-specific fields. |
| `getnettotals` | Locally Tested | Safe with time-dependent counters labeled. |
| `uptime` | Locally Tested | Harmless read-only example. |
| `getchaintips` | Locally Tested | Safe with sync-state context; test node was still in initial block download. |
| `getindexinfo` | Locally Tested | Safe; returned `{}` because optional indexes were not enabled. |
| `listwallets` | Locally Tested | Safe only in an explicitly isolated disposable environment. |
| `listwalletdir` | Locally Tested | Safe only with wallet names reviewed before publication. |
| `getwalletinfo` | Locally Tested | Tested only against the new disposable zero-transaction wallet. |

The test also used state-changing administrative methods such as `createwallet`, `loadwallet`, and `stop` within the disposable environment. Those are not presented here as generic read-only examples.

## Example direct JSON-RPC shape

The v31.1.0 test did not use a v29 CLI against the v31 node. It sent JSON-RPC directly over loopback HTTP using the disposable datadir's cookie authentication.

Conceptual PowerShell shape:

```powershell
$body = @{
  jsonrpc = '1.0'
  id      = 'getblockchaininfo'
  method  = 'getblockchaininfo'
  params  = @()
} | ConvertTo-Json -Compress

Invoke-RestMethod `
  -Uri 'http://127.0.0.1:<rpc-port>/' `
  -Method Post `
  -Headers $headers `
  -ContentType 'application/json' `
  -Body $body
```

Do not publish RPC cookie contents, credentials, or copied local filesystem paths.

## Historical CLI examples

The July v29.1.0 smoke test also succeeded with these familiar read-only commands through `bitcoinII-cli.exe`:

- `getblockcount`
- `getbestblockhash`
- `getblockchaininfo`
- `getnetworkinfo`
- `getconnectioncount`
- `getpeerinfo`
- `getmempoolinfo`
- `getdifficulty`
- `uptime`

These remain useful historical command-shape evidence, but current release examples should identify whether they were tested on v31.1.0 or only on v29.1.0.

## Output privacy rules

Do not publish raw output containing:

- peer IP addresses,
- local bind or service addresses,
- RPC credentials or cookie contents,
- local user paths,
- unrelated process details,
- real wallet names or wallet contents,
- private keys, descriptors, seeds, or signing material.

## Verification

**Status:** Draft / Locally tested partial  
**Primary source checked:** [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)  
**Notes:** Current v31.1.0 read-only/node-inspection examples are separated from historical v29 CLI evidence. No existing wallet or datadir was used in the current test.