# Bitcoin Core RPC compatibility

**Category:** Compatibility
**Status:** Draft / Locally tested partial
**Last reviewed:** 2026-07-13

## Summary

BitcoinII Core exposes Bitcoin Core-style JSON-RPC behavior, but MoreBC2 has not established full Bitcoin Core RPC compatibility.

Canonical evidence:

- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [RPC overview](../developers/rpc-overview.md)
- [Read-only examples](../api/read-only-examples.md)
- [RPC configuration](../configuration/rpc-configuration.md)

## Observed and locally tested

The 2026-07-10 local smoke test used BitcoinII Core `v29.1.0` on Windows mainnet with local-only RPC at `127.0.0.1:8337`.

These read-only commands were locally tested:

- `getblockcount`
- `getbestblockhash`
- `getblockchaininfo`
- `getnetworkinfo`
- `getconnectioncount`
- `getpeerinfo`
- `getmempoolinfo`
- `getdifficulty`
- `uptime`

The node reported:

- RPC-reported version: `290100`
- subversion: `/Satoshi:29.1.0/`
- protocol version: `70016`
- chain: `main`
- `initialblockdownload=false`
- `pruned=true`

## Local-only RPC configuration

The local node inspection recorded this configuration:

```ini
server=1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcport=8337
```

The check observed RPC bound to `127.0.0.1:8337`, with no public or LAN-address RPC bind.

See [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md).

## Source reviewed

MoreBC2 has first-pass source review for mining, blockchain, network, raw transaction, mempool/broadcast, and wallet RPC groups. See [RPC overview](../developers/rpc-overview.md).

Source-reviewed does not mean locally tested.

## Intentionally not tested

The local smoke test did not run:

- wallet commands,
- private-key commands,
- seed or descriptor commands,
- address-generation commands,
- transaction creation or broadcast commands,
- mining commands,
- import/export commands,
- peer-control commands,
- shutdown,
- state-changing RPC.

## Compatibility boundaries

Do not claim:

- full Bitcoin Core RPC compatibility,
- cross-platform RPC behavior,
- wallet-command safety,
- transaction-broadcast compatibility,
- mining-command compatibility,
- byte-for-byte equivalence between the locally built CLI and official release assets.

Safe wording:

> Nine read-only Bitcoin Core-style RPC commands were locally tested against BitcoinII Core v29.1.0 on Windows mainnet.

## Verification

**Status:** Draft / Locally tested partial  
**Primary sources checked:** Existing RPC smoke-test and source-review records linked above  
**Notes:** This page summarizes current RPC compatibility evidence. It does not broaden the tested command scope.
