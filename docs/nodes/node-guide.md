# Node guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page is the starting point for running a BitcoinII (BC2) node.

A BitcoinII Core node connects to the BitcoinII peer-to-peer network, downloads blocks and transactions, and validates them according to consensus rules.

## What is verified today

From checked source and generated configuration:

- Default mainnet P2P port: `8338`
- Default mainnet RPC port: `8332`
- DNS seeds:
  - `dnsseed.bitcoin-ii.org.`
  - `bitcoinII.ddns.net.`
- The generated config supports `daemon`, `datadir`, `reindex`, `txindex`, `prune`, and other node operation settings.

## Node types

### Full node

A full node downloads and validates blocks and transactions.

### Pruned node

A pruned node reduces disk usage by deleting old block data after validation. The generated example config documents `prune` behavior and warns that reverting pruning requires re-downloading the blockchain.

### Wallet node

A node with wallet functionality enabled can manage keys and send or receive transactions.

## Basic operational principles

- Keep node software updated from official release sources.
- Back up wallet data before changing node or wallet settings.
- Do not expose RPC to the public internet.
- Keep enough disk space available for chain data.
- Use `reindex` only when needed, because it can take time.

## Guides to create

- Windows full node setup.
- Linux full node setup.
- macOS full node setup.
- Headless daemon setup.
- Pruned node setup.
- Node troubleshooting.
- Firewall and port-forwarding notes.

## Open items

- Test startup commands on each platform.
- Confirm data directory paths by operating system.
- Confirm current disk usage.
- Confirm current sync time expectations.
- Confirm whether inbound port `8338` should be recommended for public listening nodes.
- Confirm binary names from release assets.

## Sources

- BitcoinII README: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/README.md
- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp
- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Network values are source-backed. Platform setup instructions still need testing.
