# Source atlas

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

The Source Atlas is a file-by-file and feature-path companion to BitcoinII Core. Current-release claims should prefer release-pinned `v31.1.0` source; older structural pages remain useful only within their stated source-review scope.

## v31.1.0 release-specific reviews

Current deep-review entries:

- [ShockWave difficulty adjustment](shockwave-v31.md)
- [Replay protection](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Fork-aware header synchronization](headers-sync-v31.md)
- [Wallet / PSBT / RPC / mempool / mining regression audit](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)

The regression audit classifies older wallet, raw-transaction RPC, mempool, validation-cache, and mining pages against `v31.1.0`, identifying where inherited structure remains useful and where replay protection or ShockWave creates a material BitcoinII-specific difference.

## Runtime evidence added after the source regression audit

The September 2 regression audit correctly described its work as source-only at the time. That no-runtime statement is now historical.

On 2026-09-11 MoreBC2 added:

- [Windows v31.1.0 node and RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

Those tests establish bounded release-binary runtime behavior for the documented environments. They do not convert every Source Atlas page into a runtime-verified page, and the mainnet replay-protection activation switch remains source-confirmed rather than regtest-runtime-confirmed.

## Current atlas entries

### Consensus, validation, blocks, and mining

- [chainparams.cpp](chainparams-cpp.md)
- [pow.cpp](pow-cpp.md)
- [transaction consensus files](transaction-consensus.md)
- [script engine](script-interpreter.md)
- [validation.cpp](validation-cpp.md)
- [validation interface](validation-interface.md)
- [block lifecycle](block-acceptance.md)
- [block storage](block-storage.md)
- [block primitives](block-primitives.md)
- [hash.h](hash-h.md)
- [block template assembly](miner.md)
- [mining RPC](rpc-mining.md)

### Mempool and transaction handling

- [mempool accept](mempool-accept.md)
- [mempool source](txmempool.md)
- [mempool entry](mempool-entry.md)
- [disconnected transactions](disconnected-transactions.md)
- [raw transaction RPC](rpc-rawtransaction.md)
- [mempool and transaction RPC](rpc-mempool.md)
- [blockchain RPC](rpc-blockchain.md)

### Networking

- [P2P protocol primitives](protocol.md)
- [net connection management](net-connection-management.md)
- [addrman](addrman.md)
- [banman](banman.md)
- [net processing handshake](net-processing-handshake.md)
- [net processing address relay](net-processing-address-relay.md)
- [net processing block and header relay](net-processing-block-relay.md)
- [net processing transaction relay](net-processing-transaction-relay.md)
- [net processing peer eviction and stale-tip checks](net-processing-peer-eviction.md)
- [net processing send loop](net-processing-send-loop.md)
- [network RPC](rpc-network.md)

### Wallet

- [wallet startup](wallet-startup.md)
- [wallet RPC](wallet-rpc.md)
- [wallet backup/import RPC](wallet-backup-import-rpc.md)
- [wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [wallet encryption RPC](wallet-encryption-rpc.md)
- [wallet coins and balances RPC](wallet-coins-rpc.md)
- [wallet transaction history RPC](wallet-transactions-rpc.md)

### Startup and v31 feature paths

- [startup initialization](init-cpp.md)
- [ShockWave](shockwave-v31.md)
- [Replay protection](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Fork-aware header synchronization](headers-sync-v31.md)

## 2026-09-12 audit interpretation

The atlas was reviewed as a collection against the existing v31 source-regression work and the new September runtime records.

The v31-specific pages and the pages materially affected by v31 remain the authority for current BitcoinII-specific behavior. Older broad structural pages are retained because their file/call-path maps remain useful, but they should not be read as proof of complete v31 equivalence to upstream Bitcoin Core or as runtime certification.

Where a structural page and a v31-specific page overlap, the release-pinned v31 page controls the current BitcoinII-specific claim.

## Entry standard

Each Source Atlas page should identify:

- purpose and why it matters;
- source release/ref;
- key classes/functions/constants/call paths;
- BitcoinII-specific notes;
- consensus/policy/runtime boundaries where relevant;
- related MoreBC2 pages;
- open questions;
- primary sources;
- verification status.

## Rules

- Prefer release-pinned source links for current-release claims.
- Keep mutable `main` observations separate from release-pinned evidence.
- Do not claim more than the reviewed path supports.
- Mark located but unexecuted tests as located, not passed.
- Do not infer third-party compatibility from Bitcoin-like structure.
- Cross-link replay protection for signing/PSBT/mempool/validation paths affected by the v31 domain.
- Cross-link ShockWave for difficulty/mining/template behavior affected by candidate time or per-block work selection.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0`, the September 2 v31 source-regression audit, v31-specific atlas entries, and September 11 runtime validation records  
**Notes:** The atlas contains broad structural first-pass coverage plus release-specific v31 reviews. Runtime evidence is linked where it exists but does not automatically upgrade unrelated source-only entries.