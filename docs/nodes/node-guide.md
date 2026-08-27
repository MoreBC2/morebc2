# Node guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-08-27

## Summary

This page is the starting point for running a BitcoinII (BC2) node.

A BitcoinII Core node connects to the BitcoinII peer-to-peer network, downloads blocks and transactions, and validates them according to consensus rules.

This guide is not yet a step-by-step setup guide. A narrow read-only RPC command set has been locally tested on BitcoinII Core v29.1.0 on Windows mainnet, but platform-specific setup, wallet workflows, transaction workflows, mining workflows, peer-control workflows, shutdown behavior, and broader command examples still need local testing before being promoted.

## What is source-backed today

From checked source, generated configuration, and dated local evidence:

- Default mainnet P2P port: `8338`
- BitcoinII v29.1.0 mainnet RPC port used in dated local testing: `8337`
- DNS seeds:
  - `dnsseed.bitcoin-ii.org.`
  - `bitcoinII.ddns.net.`
- The generated config supports `daemon`, `datadir`, `reindex`, `txindex`, `prune`, and other node operation settings.

The mainnet P2P value is source-observed, and the `8337` RPC value is supported by the dated local Windows/mainnet RPC setup. Older inherited or generated Bitcoin Core-style material may mention `8332`; do not treat that as the BitcoinII v29.1.0 local-test value without checking the relevant version and source context.

## Node types

### Full node

A full node downloads and validates blocks and transactions.

### Pruned node

A pruned node reduces disk usage by deleting old block data after validation. The generated example config documents `prune` behavior and warns that reverting pruning requires re-downloading the blockchain.

Pruned-node guidance should remain Draft until local behavior and wallet/service limitations are tested.

### Wallet node

A node with wallet functionality enabled can manage addresses and send or receive transactions.

Wallet-specific behavior is covered in the [Wallet guide](../wallets/wallet-guide.md).

## Command testing status

MoreBC2 has locally tested a narrow read-only command set against BitcoinII Core v29.1.0 on Windows mainnet using localhost-only RPC at `127.0.0.1:8337`.

Evidence records:

- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [API read-only examples](../api/read-only-examples.md)
- [Command testing status](../verification/command-testing.md)

The tested read-only commands include:

- `bitcoinII-cli getblockchaininfo`
- `bitcoinII-cli getnetworkinfo`
- `bitcoinII-cli getblockcount`
- `bitcoinII-cli getbestblockhash`
- `bitcoinII-cli getdifficulty`
- `bitcoinII-cli getmempoolinfo`
- `bitcoinII-cli getconnectioncount`
- `bitcoinII-cli getpeerinfo`
- `bitcoinII-cli uptime`

This is one Windows/mainnet environment, not cross-platform proof. Wallet, transaction, mining, peer-control, shutdown, import/export, and state-changing workflows remain outside that smoke test.

## Basic operational principles

- Keep node software updated from official release sources.
- Verify release downloads once the BitcoinII release-verification model is documented.
- Back up wallet data before changing node or wallet settings.
- Do not expose RPC to the public internet.
- Keep enough disk space available for chain data.
- Use `reindex` only when needed, because it can take time.
- Treat pruning, reindexing, importing, and mempool persistence as advanced workflows until tested locally.

## Guides to create

- Windows full node setup.
- Linux full node setup.
- macOS full node setup.
- Headless daemon setup.
- Pruned node setup.
- Node troubleshooting.
- Firewall and port-forwarding notes.
- Tested node command examples.

## Open items

- Test startup commands on each platform.
- Confirm data directory paths by operating system.
- Confirm current disk usage.
- Confirm current sync time expectations.
- Confirm whether inbound port `8338` should be recommended for public listening nodes.
- Confirm binary names from release assets.
- Add additional local command-test records before promoting examples beyond the narrow read-only test set.
- Monitor the canonical repository/source path for future ownership or location changes.

## Sources

- Current observed BitcoinII Core repository: https://github.com/Bitcoin-II/BitcoinII-Core
- `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/kernel/chainparams.cpp
- `share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/share/examples/bitcoinII.conf
- [Command testing status](../verification/command-testing.md)
- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Source atlas: startup initialization](../developers/source-atlas/init-cpp.md)
- [Source atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Network values are source-backed where linked. Canonical-source and RPC wording were synchronized on 2026-08-27. The narrow read-only RPC command set has one dated Windows/mainnet local test record; `8337` is not claimed as universal. Platform setup instructions, release asset names, sync behavior, pruning guidance, wallet workflows, transaction workflows, mining workflows, peer-control workflows, and broader node command examples still need testing.
