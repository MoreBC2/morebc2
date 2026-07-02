# Source atlas

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

The source atlas is a file-by-file companion to the BitcoinII Core codebase.

Each page should explain one important source file in plain language, link it to related MoreBC2 documentation, and record open questions.

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
- [P2P protocol primitives](protocol.md)
- [net processing handshake](net-processing-handshake.md)
- [raw transaction RPC](rpc-rawtransaction.md)
- [mempool and transaction broadcast RPC](rpc-mempool.md)
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
- Prefer source links and line references when available.
- Mark uncertain items as Needs Review.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** The atlas starts with files already reviewed for MoreBC2 core technical pages. Network RPC, protocol primitives, and a first net-processing handshake slice now have first-pass source reviews; remaining lower-level peer-processing review is still open.
