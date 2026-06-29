# Architecture overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

BitcoinII Core is reference software for participating in the BitcoinII (BC2) network.

This page gives a high-level architecture map without claiming unverified implementation details.

## Conceptual component map

```text
User / service
      |
      v
Wallet / CLI / RPC client
      |
      v
BitcoinII Core node
      |
      +-- Peer-to-peer networking
      +-- Block and transaction validation
      +-- Chain state and block storage
      +-- Mempool
      +-- Wallet functionality, if enabled
      +-- RPC server, if enabled
      |
      v
BitcoinII peer-to-peer network
```

## Source-backed anchors

MoreBC2 has already reviewed source-backed anchors for:

- Chain parameters: `src/kernel/chainparams.cpp`
- Proof-of-work and difficulty: `src/pow.cpp`
- Block structure and hash path: `src/primitives/block.h`, `src/primitives/block.cpp`, `src/hash.h`
- Monetary unit sanity checks: `src/consensus/amount.h`
- Example configuration: `share/examples/bitcoinII.conf`

## Architecture areas to verify next

### Node startup

Needs review:

- Initialization flow.
- Configuration loading.
- Chain selection.
- Network startup.
- Wallet loading.

Likely source area:

- `src/init.cpp`

### Networking

Needs review:

- Peer discovery.
- P2P message handling.
- DNS seed usage.
- Default listening behavior.

Likely source areas:

- `src/net.*`
- `src/protocol.*`

### Validation

Needs review:

- Block validation.
- Transaction validation.
- Chain selection.
- Reorganization behavior.

Likely source areas:

- `src/validation.*`
- `src/consensus/`

### RPC

Needs review:

- RPC server setup.
- RPC command modules.
- Wallet RPC behavior.
- Exchange-relevant RPC methods.

Likely source areas:

- `src/rpc/`
- `src/wallet/rpc*`

### Wallet

Needs review:

- Wallet loading.
- Key management.
- Address generation.
- Transaction creation.

Likely source areas:

- `src/wallet/`
- `src/qt/`

## What this page does not claim

This page does not claim:

- That every listed component has been fully reviewed.
- That BitcoinII has BitcoinII-specific behavior in every listed area.
- That architecture is identical to Bitcoin Core in unreviewed files.

## Related pages

- [Repository map](../developers/repository-map.md)
- [Source tree guide](../developers/source-tree.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [RPC overview](../developers/rpc-overview.md)

## Sources

- BitcoinII repository: https://github.com/BitcoinII-Dev/BitcoinII

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** The high-level component map is conceptual. Source-backed anchors are linked to files already reviewed.
