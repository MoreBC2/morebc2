# Source atlas

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

The Source Atlas is the file-by-file and feature-path companion to BitcoinII Core. The full atlas was audited as a coordinated `v31.1.0` pass on 2026-09-12.

Current-release claims should prefer release-pinned BitcoinII Core `v31.1.0` source and dated MoreBC2 runtime records. Older structural material is retained only where its call-path or file-map value remains useful and its source/runtime boundary is explicit.

The atlas contains **43 Markdown pages including this index**. During the final Developers / Source Atlas pass, pages materially affected by current v31 evidence were repaired; pages already synchronized by the wallet, mempool, replay-protection, compatibility, architecture, node, release, and mining audits were reviewed and left unchanged where no correction was needed.

## Current v31 evidence anchors

The strongest current developer evidence is:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [v31 wallet, PSBT, RPC, mempool, and mining source regression audit — 2026-09-02](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Public infrastructure smoke test — 2026-09-11](../../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Mining overview](../../mining/mining-overview.md)
- [v31.1.0 release assets](../../releases/v31.1.0-assets.md)

The September 11 runtime records supersede older statements that no current v31 wallet, PSBT, mempool, or node/RPC behavior had been exercised. They do **not** turn unrelated source-only paths into runtime-tested paths.

## v31.1.0 release-specific reviews

Current BitcoinII-specific deep-review entries include:

- [ShockWave difficulty adjustment](shockwave-v31.md)
- [Replay protection](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Fork-aware header synchronization](headers-sync-v31.md)
- [pow.cpp](pow-cpp.md)
- [chainparams.cpp](chainparams-cpp.md)
- [block template assembly](miner.md)
- [mining RPC](rpc-mining.md)

These pages control current BitcoinII-specific claims when an older inherited structural page overlaps them.

## Mining and difficulty status

Current mining documentation now uses the v31 model consistently:

- ShockWave activates on mainnet at height `57750`.
- Current mainnet difficulty is not described as 2016-block-only retargeting.
- Candidate `nTime` can affect required work, so template code must recalculate `nBits` through `GetNextWorkRequired()` when the candidate time changes.
- Chain selection remains accumulated-chainwork based.
- Core mining/template RPC and pool Stratum are separate interfaces.
- `generatetoaddress` was exercised in the isolated zero-peer v31 regtest PSBT workflow.
- `getmininginfo`, `getnetworkhashps`, `getblocktemplate`, `submitblock`, and `submitheader` remain source-reviewed rather than current release-binary runtime verified.
- Public pool Stratum subscribe/authorize/share submission and payout accounting remain separate unverified operational tasks.

## Replay-protection and signing status

Mainnet `v31.1.0` activates the BC2 replay domain at height `57750` with fork/domain id `0x01324342`.

Release-pinned source traces that domain through signature hashing, wallet signing, raw-transaction signing, PSBT processing/finalization, mempool validation, block validation, and validation-cache separation.

The September 11 isolated regtest PSBT lifecycle directly tested ordinary v31 wallet/PSBT signing, finalization, decoding, mempool acceptance, and zero-peer local submission. It did **not** runtime-trigger the mainnet replay activation because regtest leaves that activation disabled as shipped.

Bitcoin-style address prefixes, script forms, or APIs therefore do not by themselves prove third-party BC2 signing compatibility. External/hardware signer support remains unverified unless the signer can represent the BC2 replay-domain semantics.

## Validation and mempool status

The current atlas now treats these as explicit v31 boundaries rather than generic Bitcoin-like behavior:

- ShockWave contextual-header difficulty checks;
- consensus data restrictions from height `57750`;
- replay-domain-aware script verification;
- next-block replay-domain selection during mempool acceptance;
- activation-boundary mempool clearing;
- replay-domain-aware validation-cache separation;
- most-work chain selection and reorg handling.

The September 11 isolated regtest workflow directly observed `testmempoolaccept`, zero-peer `sendrawtransaction`, `getmempoolentry`, and `getmempoolinfo` for the disposable transaction. That is local mempool/runtime evidence, not public propagation evidence.

## RPC status

Current source/runtime classification is intentionally command-specific.

Direct v31 runtime coverage includes a bounded node/status RPC subset plus disposable-wallet creation/status, address generation, balance inspection, PSBT creation/signing/finalization, transaction decoding, local mempool acceptance, and local zero-peer submission.

Source-reviewed RPC groups include:

- [Mining RPC](rpc-mining.md)
- [Blockchain RPC](rpc-blockchain.md)
- [Network RPC](rpc-network.md)
- [Raw transaction RPC](rpc-rawtransaction.md)
- [Mempool and transaction RPC](rpc-mempool.md)
- [Wallet RPC](wallet-rpc.md)

A command being registered in source does not mean MoreBC2 has executed it. Public broadcast, peer-changing RPC, pruning mutation, external signing, backup/restore, wallet encryption, rescans, and advanced block submission remain separately bounded unless a dated runtime record establishes them.

## Networking status

The broad networking pages remain useful structural maps, but the final audit repaired their old blanket "not live tested" wording where current v31 evidence exists.

The September 11 Windows node run directly established automatic outbound peer connectivity, protocol version `70016`, current P2P behavior sufficient for initial synchronization, advancing chain/header state, and current node/network RPC observations in the documented environment.

That does not runtime-certify every lower-level addrman, BanMan, BIP324, relay, eviction, compact-block, send-loop, DNS-seed, or socket branch.

The current mainnet P2P port is `8338`. Source seed wording is release-scoped; stale earlier seed observations are not promoted to current v31 facts without current evidence.

## Wallet status

Current wallet/PSBT atlas pages distinguish:

- runtime-tested disposable wallet lifecycle and ordinary PSBT flow;
- source-backed backup/import, encryption, history/rescan, and broader wallet RPC behavior;
- untested external/hardware signer behavior;
- untested third-party wallet compatibility.

No existing user wallet was used for the September runtime tests.

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

## 2026-09-12 full-atlas audit result

All **43** Source Atlas Markdown pages were included in the coordinated audit scope.

The principal repairs were:

- synchronizing stale Draft / Needs Review wording where stronger current v31 evidence now exists;
- replacing stale pre-v31 difficulty assumptions with ShockWave-aware wording;
- threading replay-protection boundaries through signing, validation, mempool, and script documentation;
- updating mining RPC status after the isolated regtest generation/PSBT test;
- distinguishing local zero-peer `sendrawtransaction` from public transaction propagation;
- incorporating current node/network runtime observations without pretending every lower-level P2P branch was tested;
- repairing stale chain-parameter, seed, P2P-port, and release-baseline wording;
- distinguishing release-binary runtime evidence from unexecuted source-build/test-suite work;
- keeping backup/restore, encryption, rescan, external signing, advanced mining RPC, and direct Stratum/payout behavior appropriately unverified.

Pages that remain `Reviewed / Partial` or `Source-reviewed partial` are intentionally partial because the evidence itself is partial, not because they were skipped during this audit.

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
- Keep runtime evidence environment-specific.
- Keep local zero-peer submission separate from public propagation evidence.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0`, the September 2 v31 source-regression audit, September 11 v31 runtime validation records, current release evidence, and the September mining/pool audit  
**Notes:** The full atlas was audited. Current v31 consensus/signing/mining and the directly exercised runtime paths are synchronized. Remaining partial labels identify genuine untested or source-only boundaries such as clean source builds/test-suite execution, advanced mining RPC, full lower-level P2P coverage, backup/restore/encryption/rescan workflows, public broadcast, and external/hardware signing.