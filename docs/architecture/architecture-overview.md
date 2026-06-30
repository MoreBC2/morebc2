# Architecture overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

BitcoinII Core is reference software for participating in the BitcoinII (BC2) network.

This page gives a high-level architecture map and points readers toward the more focused architecture and Source Atlas pages.

It is intentionally conservative. It does not claim that every subsystem has been fully reviewed.

## How to read this section

Start here, then move outward:

1. [Node startup](node-startup.md)
2. [Consensus model](consensus-model.md)
3. [Life of a transaction](life-of-a-transaction.md)
4. [Life of a block](life-of-a-block.md)
5. [Life of a reorganization](life-of-a-reorg.md)
6. [Block validation flow](block-validation-flow.md)
7. [Mempool flow](mempool-flow.md)

The architecture pages explain flows.

The Source Atlas pages explain where those flows are implemented.

## Conceptual component map

```text
User / service / miner / wallet
      |
      v
CLI / GUI / RPC / wallet interface
      |
      v
BitcoinII Core node
      |
      +-- Startup and configuration
      +-- Chain parameters
      +-- RPC server, if enabled
      +-- Wallet clients, if enabled
      +-- Peer-to-peer networking
      +-- Mempool and transaction relay policy
      +-- Block and transaction validation
      +-- Chainstate and UTXO view
      +-- Block storage and indexes
      +-- Mining interface / block assembly paths
      |
      v
BitcoinII peer-to-peer network
```

## Core startup path

Startup prepares the node before normal peer operation begins.

Reviewed startup topics include:

- Runtime argument and shutdown wiring.
- Parameter interaction.
- Sanity checks and directory locks.
- Logging and scheduler setup.
- Validation signals.
- Wallet interface construction.
- RPC registration and warmup.
- Network component preparation.
- Chainstate and block index loading.
- Peer manager creation.
- Index initialization.
- Wallet loading.
- Mempool loading.
- Final startup handoff.

Related:

- [Node startup](node-startup.md)
- [Source atlas: startup initialization](../developers/source-atlas/init-cpp.md)

## Consensus and validation

Consensus rules decide whether blocks and transactions are valid.

Reviewed consensus-adjacent areas include:

- Chain parameters.
- Genesis block values.
- Proof-of-work checks.
- Difficulty retargeting.
- Header checks.
- Context-free and contextual block checks.
- Block connection against the UTXO view.
- Reorganization handling.

Still pending:

- Transaction consensus files.
- Script interpreter internals.
- Full deployment-state review.
- Full checkpoint behavior review.

Related:

- [Consensus model](consensus-model.md)
- [Block validation flow](block-validation-flow.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)

## Mempool and transaction acceptance

The mempool is local node state for unconfirmed transactions.

Reviewed mempool topics include:

- `CTxMemPool` structure.
- Mempool entry metadata.
- Ancestor and descendant tracking.
- Single and package transaction acceptance.
- Policy checks vs consensus checks.
- Reorg interaction through disconnected transaction handling.

Related:

- [Mempool flow](mempool-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Source atlas: mempool accept](../developers/source-atlas/mempool-accept.md)
- [Source atlas: mempool source](../developers/source-atlas/txmempool.md)

## Blocks, chainstate, and reorgs

Reviewed block lifecycle topics include:

- Header acceptance.
- Full block acceptance.
- Candidate selection.
- Best-chain activation.
- UTXO connection.
- Disconnection with undo data.
- Reconsidering disconnected block transactions for mempool entry.

Related:

- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)
- [Source atlas: disconnected transactions](../developers/source-atlas/disconnected-transactions.md)

## User and service interfaces

Reviewed interface-level material is still partial.

Current anchors include:

- RPC overview pages.
- Exchange integration framework.
- Configuration pages.
- Node, wallet, and mining section frameworks.

Still pending:

- RPC source internals.
- Wallet source internals.
- GUI entry paths.
- Local command testing.

Related:

- [RPC overview](../developers/rpc-overview.md)
- [Exchange integration](../exchange/README.md)
- [Configuration](../configuration/README.md)
- [Wallets](../wallets/README.md)
- [Nodes](../nodes/README.md)

## Areas still needing deeper review

- Peer-to-peer message handling.
- DNS seed consumption and peer discovery internals.
- Block storage and pruning internals.
- Wallet loading, key management, address generation, and transaction creation.
- RPC command implementation details.
- Mining and block-template selection.
- Validation-interface callback ordering.
- Build and release verification.

## What this page does not claim

This page does not claim:

- That every listed component has been fully reviewed.
- That BitcoinII has custom behavior in every listed area.
- That unreviewed files are identical to Bitcoin Core.
- That Draft architecture pages are final specifications.

## Related pages

- [Repository map](../developers/repository-map.md)
- [Source tree guide](../developers/source-tree.md)
- [Developer reading order](../developers/reading-order.md)
- [Documentation coverage](../documentation-coverage.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)

## Sources

- BitcoinII source repository currently reviewed through MoreBC2 source-atlas entries.
- `src/init.cpp`
- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/validation.cpp`
- `src/txmempool.*`
- `src/kernel/mempool_entry.h`
- `src/kernel/disconnected_transactions.*`
- `src/primitives/block.*`
- `src/hash.h`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This overview summarizes existing MoreBC2 architecture and Source Atlas coverage. It should be updated whenever major subsystems are newly reviewed.
