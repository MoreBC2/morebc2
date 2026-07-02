# Architecture overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

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
      +-- Mining interface / candidate block assembly paths
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
- [Source atlas: wallet startup](../developers/source-atlas/wallet-startup.md)

## Consensus and validation

Consensus rules decide whether blocks and transactions are valid.

Reviewed consensus-adjacent areas include:

- Chain parameters.
- Genesis block values.
- Proof-of-work checks.
- Difficulty retargeting.
- Transaction consensus helpers.
- Script engine first-pass behavior.
- Header checks.
- Context-free and contextual block checks.
- Block connection against the UTXO view.
- Reorganization handling.

Still pending:

- Full mandatory-vs-policy script flag mapping.
- Full deployment-state review.
- Full checkpoint behavior review.
- Release-branch matching against documented `main` source values.

Related:

- [Consensus model](consensus-model.md)
- [Block validation flow](block-validation-flow.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)
- [Source atlas: transaction consensus files](../developers/source-atlas/transaction-consensus.md)
- [Source atlas: script engine](../developers/source-atlas/script-interpreter.md)

## Mempool and transaction acceptance

The mempool is local node state for unconfirmed transactions.

Reviewed mempool topics include:

- `CTxMemPool` structure.
- Mempool entry metadata.
- Ancestor and descendant tracking.
- Single and package transaction acceptance.
- Policy checks vs consensus checks.
- Reorg interaction through disconnected transaction handling.
- Mempool and broadcast RPC surfaces.
- Dry-run acceptance checks and live transaction broadcast behavior.
- First-pass P2P transaction relay handling.

Related:

- [Mempool flow](mempool-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Source atlas: mempool accept](../developers/source-atlas/mempool-accept.md)
- [Source atlas: mempool source](../developers/source-atlas/txmempool.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)
- [Source atlas: raw transaction RPC](../developers/source-atlas/rpc-rawtransaction.md)
- [Source atlas: net processing transaction relay](../developers/source-atlas/net-processing-transaction-relay.md)

## Blocks, chainstate, and reorgs

Reviewed block lifecycle topics include:

- Header acceptance.
- Full block acceptance.
- Candidate selection.
- Candidate block-template assembly.
- Best-chain activation.
- UTXO connection.
- Disconnection with undo data.
- Reconsidering disconnected block transactions for mempool entry.
- Block storage, pruning-adjacent, reindex, and import paths.
- Blockchain RPC surfaces for block and chainstate inspection.
- First-pass P2P block and header relay handling.

Related:

- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)
- [Source atlas: block storage](../developers/source-atlas/block-storage.md)
- [Source atlas: block template assembly](../developers/source-atlas/miner.md)
- [Source atlas: mining RPC](../developers/source-atlas/rpc-mining.md)
- [Source atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)
- [Source atlas: disconnected transactions](../developers/source-atlas/disconnected-transactions.md)
- [Source atlas: net processing block and header relay](../developers/source-atlas/net-processing-block-relay.md)

## Peer-to-peer networking

Reviewed P2P material is still first-pass and source-observed, but it now covers more than network RPC.

Current anchors include:

- P2P message names, headers, service flags, address serialization, and inventory helpers.
- Network RPC commands for peer and network status.
- Peer handshake and early feature negotiation.
- Address relay and peer-discovery-adjacent behavior.
- Block and header relay.
- Transaction relay.
- Peer eviction, stale-tip checks, discouragement, and ping timeout behavior.

Still pending:

- Dedicated peer communication architecture page.
- Send-loop behavior.
- Lower-level `src/net.cpp` connection management.
- Banman behavior.
- Release-versus-main comparison.
- Live-network tests.

Related:

- [Source atlas: P2P protocol primitives](../developers/source-atlas/protocol.md)
- [Source atlas: network RPC](../developers/source-atlas/rpc-network.md)
- [Source atlas: net processing handshake](../developers/source-atlas/net-processing-handshake.md)
- [Source atlas: net processing address relay](../developers/source-atlas/net-processing-address-relay.md)
- [Source atlas: net processing block and header relay](../developers/source-atlas/net-processing-block-relay.md)
- [Source atlas: net processing transaction relay](../developers/source-atlas/net-processing-transaction-relay.md)
- [Source atlas: net processing peer eviction and stale-tip checks](../developers/source-atlas/net-processing-peer-eviction.md)

## User and service interfaces

Reviewed interface-level material is still partial but now broader than the initial framework.

Current anchors include:

- RPC overview pages.
- Mining, blockchain, network, raw transaction, mempool/broadcast, and wallet RPC source-atlas pages.
- Wallet startup and wallet RPC source-atlas pages.
- Exchange integration framework.
- Configuration pages.
- Node, wallet, and mining section frameworks.

Still pending:

- CLI source review.
- GUI entry paths.
- Lower-level wallet internals.
- Local command testing.

Related:

- [RPC overview](../developers/rpc-overview.md)
- [Exchange integration](../exchange/README.md)
- [Configuration](../configuration/README.md)
- [Wallets](../wallets/README.md)
- [Nodes](../nodes/README.md)
- [Source atlas: network RPC](../developers/source-atlas/rpc-network.md)
- [Source atlas: wallet RPC](../developers/source-atlas/wallet-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet transaction history RPC](../developers/source-atlas/wallet-transactions-rpc.md)

## Areas still needing deeper review

- Dedicated peer communication model.
- Send-loop behavior.
- Lower-level `src/net.cpp` connection management.
- Banman behavior.
- DNS seed consumption and peer discovery internals.
- CLI source review.
- Wallet database internals, key-management internals, and GUI flows.
- Local command testing.
- Validation-interface subscriber behavior.
- Build and release verification.
- Current ecosystem and explorer checks.

## What this page does not claim

This page does not claim:

- That every listed component has been fully reviewed.
- That BitcoinII has custom behavior in every listed area.
- That unreviewed files are identical to Bitcoin Core.
- That Draft architecture pages are final specifications.
- That source-observed command behavior has been locally tested.
- That P2P behavior has been live-network tested.

## Related pages

- [Repository map](../developers/repository-map.md)
- [Source tree guide](../developers/source-tree.md)
- [Developer reading order](../developers/reading-order.md)
- [Documentation coverage](../documentation-coverage.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Open questions backlog](../verification/open-questions.md)

## Sources

- BitcoinII source repository currently reviewed through MoreBC2 Source Atlas entries.
- `src/init.cpp`
- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/validation.cpp`
- `src/txmempool.*`
- `src/kernel/mempool_entry.h`
- `src/kernel/disconnected_transactions.*`
- `src/node/blockstorage.*`
- `src/node/miner.*`
- `src/rpc/mining.cpp`
- `src/rpc/blockchain.cpp`
- `src/rpc/net.cpp`
- `src/rpc/rawtransaction.cpp`
- `src/rpc/mempool.cpp`
- `src/wallet/rpc/*` reviewed groups
- `src/protocol.h`
- `src/protocol.cpp`
- `src/net_processing.h`
- `src/net_processing.cpp`
- `src/primitives/block.*`
- `src/hash.h`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This overview summarizes current MoreBC2 architecture and Source Atlas coverage. It was refreshed after first-pass P2P Source Atlas slices were added for protocol primitives, network RPC, handshake, address relay, block/header relay, transaction relay, and peer eviction/stale-tip checks.
