# Architecture overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

BitcoinII Core is reference software for participating in the BitcoinII (BC2) network.

This page gives a high-level architecture map and points readers toward focused architecture and Source Atlas pages. Current-facing architecture notes now use BitcoinII Core `v31.1.0` as the release baseline.

## v31.1.0 architecture boundary

The current release introduces BitcoinII-specific behavior that affects several major architecture paths:

- ShockWave per-block difficulty adjustment from mainnet height `57750`;
- consensus-level data restrictions from height `57750`;
- BC2 replay protection from height `57750`;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

Older Source Atlas and architecture pages remain useful first-pass structural reviews, but detailed behavior in files touched by these changes should be treated as needing v31-specific spot checks unless the page says otherwise.

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
      +-- Chain parameters and activation heights
      +-- RPC server, if enabled
      +-- Wallet / PSBT paths, if enabled
      +-- Peer-to-peer networking
      +-- Address manager and seed state
      +-- Header synchronization
      +-- Mempool and transaction sharing policy
      +-- Block and transaction validation
      +-- Replay/data-restriction consensus checks
      +-- Chainstate and UTXO view
      +-- Block storage and indexes
      +-- Mining / candidate block assembly
      +-- ShockWave next-work calculation
      |
      v
BitcoinII peer-to-peer network
```

## Core startup path

Startup prepares the node before normal peer operation begins. Existing MoreBC2 source reviews cover argument handling, initialization, chainstate loading, networking, RPC registration, indexes, wallet loading, mempool loading, and shutdown wiring.

Dated local runtime evidence is largely `v29.1.0`-scoped. Use those records as historical evidence until equivalent `v31.1.0` runtime tests are added.

## Consensus and validation

Current high-level consensus anchors include:

- BitcoinII chain parameters and genesis identity;
- proof-of-work target checks;
- ShockWave per-block next-work calculation after height `57750`;
- transaction consensus helpers and script validation;
- BitcoinII replay protection;
- consensus-level data restrictions;
- block/header validation and chain selection;
- UTXO connection/disconnection and reorganization handling.

The [Consensus model](consensus-model.md) and [Consensus overview](../documentation/consensus-overview.md) contain the current v31-facing summary.

Detailed replay-protection and data-restriction validation paths still need dedicated Source Atlas coverage.

## Mempool and transaction acceptance

Existing first-pass reviews cover mempool structure, acceptance, replacement/package behavior, transaction relay, raw-transaction RPC, and reorg interaction.

Because `v31.1.0` release notes identify mempool, RPC, validation, wallet, and PSBT changes, older detailed pages should be read as structural/source-review evidence unless they have been specifically refreshed against v31.

## Blocks, chainstate, and reorgs

Existing architecture reviews cover:

- header and block acceptance;
- candidate-chain selection;
- block connection/disconnection;
- UTXO updates and undo data;
- reorganization handling;
- block storage and pruning-adjacent paths.

`v31.1.0` additionally identifies fork-aware header synchronization. The high-level current fact is established; detailed current-release header-sync flow remains a verification priority.

## Peer-to-peer networking

MoreBC2 has broad first-pass source coverage for protocol primitives, connection management, address management, DNS/bootstrap paths, handshake, address relay, transaction relay, block/header relay, peer health, and send-loop behavior.

Current DNS/seed and header-sync claims must use current release/source evidence or retain explicit date/version labels.

## Mining and proof of work

Current BitcoinII mainnet targets 10-minute blocks and uses double-SHA256 block-header hashing.

The present difficulty model is **ShockWave per block from height `57750`**, not the historical 2016-block-only retarget schedule.

See:

- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Mining overview](../mining/mining-overview.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)

## User and service interfaces

MoreBC2 has first-pass coverage for mining, blockchain, network, raw-transaction, mempool, and wallet RPC groups, plus exchange/operator integration material.

Current `v31.1.0` operator-facing exchange docs have been refreshed, while broad runtime regression testing for wallet/RPC/PSBT behavior remains open.

## Current review priorities

1. Replay-protection implementation path.
2. Consensus data-restriction validation path.
3. Fork-aware header synchronization.
4. Validation/mempool changes identified by `v31.1.0`.
5. Wallet/PSBT changes identified by `v31.1.0`.
6. Mining/RPC changes beyond the ShockWave refresh.
7. Fresh current-release runtime tests.

## Related pages

- [Consensus model](consensus-model.md)
- [Block validation flow](block-validation-flow.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Source Atlas](../developers/source-atlas/README.md)
- [Open questions backlog](../verification/open-questions.md)
- [v31 currentness audit](../verification/v31-currentness-audit-2026-09-02.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors plus existing MoreBC2 architecture and Source Atlas coverage
**Notes:** This page is a high-level currentness map. It does not claim every detailed architecture/Source Atlas page has already undergone a v31-specific diff or runtime test.