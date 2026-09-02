# Source atlas

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

The source atlas is a file-by-file and feature-path companion to the BitcoinII Core codebase.

Each page should explain one important source file or tightly related implementation path in plain language, link it to related MoreBC2 documentation, and record open questions.

## v31.1.0 consensus feature paths

The current release-specific deep-review entries are:

- [ShockWave difficulty adjustment](shockwave-v31.md)
- [Replay protection](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Fork-aware header synchronization](headers-sync-v31.md)

These pages are pinned to the canonical BitcoinII Core `v31.1.0` source and are intended to complement the older file-oriented atlas entries.

## Current atlas entries

- [chainparams.cpp](chainparams-cpp.md)
- [startup initialization](init-cpp.md)
- [pow.cpp](pow-cpp.md)
- [transaction consensus files](transaction-consensus.md)
- [script engine](script-interpreter.md)
- [validation.cpp](validation-cpp.md)
- [validation interface](validation-interface.md)
- [block storage](block-storage.md)
- [block template assembly](miner.md)
- [mining RPC](rpc-mining.md)
- [blockchain RPC](rpc-blockchain.md)
- [network RPC](rpc-network.md)
- [banman](banman.md)
- [addrman](addrman.md)
- [P2P protocol primitives](protocol.md)
- [net connection management](net-connection-management.md)
- [net processing handshake](net-processing-handshake.md)
- [net processing address relay](net-processing-address-relay.md)
- [net processing block and header relay](net-processing-block-relay.md)
- [net processing transaction relay](net-processing-transaction-relay.md)
- [net processing peer eviction and stale-tip checks](net-processing-peer-eviction.md)
- [net processing send loop](net-processing-send-loop.md)
- [raw transaction RPC](rpc-rawtransaction.md)
- [mempool and transaction RPC](rpc-mempool.md)
- [wallet startup](wallet-startup.md)
- [wallet RPC](wallet-rpc.md)
- [wallet backup/import RPC](wallet-backup-import-rpc.md)
- [wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [wallet encryption RPC](wallet-encryption-rpc.md)
- [wallet coins and balances RPC](wallet-coins-rpc.md)
- [wallet transaction history RPC](wallet-transactions-rpc.md)
- [block lifecycle](block-acceptance.md)
- [mempool accept](mempool-accept.md)
- [mempool source](txmempool.md)
- [mempool entry](mempool-entry.md)
- [disconnected transactions](disconnected-transactions.md)
- [hash.h](hash-h.md)
- [block primitives](block-primitives.md)

## Entry standard

Each source atlas page should include:

- Purpose
- Why it matters
- Key classes/functions/constants
- BitcoinII-specific notes
- Related MoreBC2 pages
- Open questions
- Sources
- Verification block

## Rules

- Do not claim more than the file review supports.
- Quote sparingly, summarize carefully.
- Prefer release-pinned source links for current-release claims.
- Keep mutable `main` observations clearly separate from release-pinned evidence.
- Mark unexecuted upstream tests as located, not locally verified.
- Mark uncertain items as Needs Review or Source-reviewed partial.

## Verification

**Status:** Draft
**Primary sources checked:** Partially, with dedicated `v31.1.0` source review for ShockWave, replay protection, data restrictions, and header synchronization
**Notes:** The atlas now contains both broad file-oriented first-pass coverage and release-specific feature-path reviews for the principal BitcoinII v31 consensus changes.