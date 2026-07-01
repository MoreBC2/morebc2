# Node guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page is the starting point for running a BitcoinII (BC2) node.

A BitcoinII Core node connects to the BitcoinII peer-to-peer network, downloads blocks and transactions, and validates them according to consensus rules.

This guide is not yet a step-by-step setup guide. Platform-specific setup and command examples still need local testing before being marked verified.

## What is source-backed today

From checked source and generated configuration:

- Default mainnet P2P port: `8338`
- Default mainnet RPC port: `8332`
- DNS seeds:
  - `dnsseed.bitcoin-ii.org.`
  - `bitcoinII.ddns.net.`
- The generated config supports `daemon`, `datadir`, `reindex`, `txindex`, `prune`, and other node operation settings.

These values are source-observed from reviewed files. They should still be checked against current release artifacts before public-launch use.

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

MoreBC2 has not yet verified node command examples against a running BitcoinII Core node.

Track future tests in [Command testing status](../verification/command-testing.md).

Candidate node commands that need local test records include:

- `bitcoinII-cli getblockchaininfo`
- `bitcoinII-cli getnetworkinfo`
- `bitcoinII-cli getblockcount`
- `bitcoinII-cli getbestblockhash`
- `bitcoinII-cli getdifficulty`
- `bitcoinII-cli getmempoolinfo`

Do not treat these as working instructions until a matching command-test record exists.

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
- Add local command-test records before promoting examples.
- Confirm canonical repository/source path before public-link polish.

## Sources

- Current observed BitcoinII Core repository: https://github.com/Bitcoin-II/BitcoinII-Core
- `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp
- `share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/share/examples/bitcoinII.conf
- [Command testing status](../verification/command-testing.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Source atlas: startup initialization](../developers/source-atlas/init-cpp.md)
- [Source atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Network values are source-backed. Platform setup instructions, release asset names, sync behavior, pruning guidance, and node command examples still need testing. Source links use the current observed repository path, but canonical repository status still needs confirmation.
