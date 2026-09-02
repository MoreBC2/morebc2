# BitcoinII v31.1.0 wallet, PSBT, RPC, mempool, and mining regression audit — 2026-09-02

**Category:** Verification / Source review
**Status:** Source-reviewed partial
**Date:** 2026-09-02

## Purpose

This audit follows the v31 consensus-path review and asks a narrower question: which existing MoreBC2 wallet, PSBT, raw-transaction RPC, mempool, validation-cache, and mining/template pages remain structurally accurate under BitcoinII Core `v31.1.0`, and where did v31 introduce behavior that must now be documented explicitly?

The baseline comparison is BitcoinII Core `v29.1.0` to `v31.1.0`. This is a source-delta review, not a runtime regression test.

## Executive result

| Area | Current assessment | v31-specific action |
|---|---|---|
| Wallet spend paths | Structurally accurate but incomplete | Add replay-protection next-block sighash domain |
| PSBT | Material v31 integration change | Fork id must flow through precompute/finalize/analyze/signing paths |
| Raw transaction RPC | Material v31 integration change | Signing/finalization must use next-block sighash fork id |
| Mempool acceptance | Material v31 consensus-boundary change | Validate signatures for next block; clear legacy-domain mempool at activation |
| Validation cache | Material v31 correctness change | Cache key includes sighash fork id to prevent cross-domain reuse |
| Block template / mining | Structurally accurate with important v31 change | Candidate-time changes may change ShockWave `nBits`; recalculate work |
| Package/fee selection | No BitcoinII-specific semantic change identified in this pass | Existing structural documentation remains first-pass valid |
| External signing | New compatibility boundary | External signer must understand BC2 replay-protection sighash domain |

## Wallet and PSBT

The existing MoreBC2 wallet spend page remains useful for the broad RPC surface, fee/funding behavior, send commands, and PSBT workflows. Its old statement that no BitcoinII-specific spend behavior had been identified is no longer current.

### v31 replay-domain selection

The wallet now exposes a next-block replay-protection signature-hash domain through `CWallet::GetSighashForkId()`.

The chain interface exposes `getSighashForkId(height)`, backed by `Consensus::Params::SighashForkId(height)`.

The wallet uses the current chain height to obtain the domain appropriate for transactions intended for the next block. Below activation the value is zero; from mainnet height `57750` onward it is `0x01324342`.

### PSBT propagation

The fork id is threaded into PSBT handling rather than treated as wallet-only metadata:

- `PrecomputePSBTData(..., sighash_fork_id)` stores the selected domain in `PrecomputedTransactionData`;
- wallet PSBT processing calls `PrecomputePSBTData` with the wallet's current next-block domain;
- wallet spend RPC passes the domain into PSBT finalization/extraction;
- node PSBT analysis accepts a fork-id parameter;
- signature creation/checking receives the same domain through signing helpers.

This is a material compatibility difference from generic Bitcoin PSBT tooling. A third-party PSBT library can parse a BitcoinII PSBT correctly yet still produce unusable signatures if it computes legacy Bitcoin-style digests and ignores the BC2 post-activation domain.

### External signer boundary

`external_signer_scriptpubkeyman.cpp` explicitly warns that an external signer cannot safely sign BitcoinII post-fork transactions without replay-protection sighash support.

MoreBC2 should therefore treat hardware/external signer compatibility as **unverified unless BC2 fork-id support is specifically demonstrated**.

## Raw transaction RPC

The existing raw-transaction RPC command inventory remains structurally useful, but v31 changes the signing/finalization boundary.

`src/rpc/rawtransaction.cpp` defines a `NextBlockSighashForkId` helper. It obtains the active chain height and asks consensus for the domain of `height + 1`.

That design matches mempool/wallet behavior: signing helpers must prepare a transaction for the block in which it could next be mined, including an activation transition that may differ from the current tip's domain.

The fork id is then propagated through relevant raw-transaction signing and PSBT operations. This means service code that clones Bitcoin Core raw-transaction signing semantics without BC2's extra domain parameter is not post-fork compatible.

Read-only raw transaction commands such as decoding and lookup are not made replay-domain-sensitive merely by this change. The material difference is in signing, signature verification, PSBT completion/finalization, and related analysis paths.

## Mempool acceptance

The existing `MemPoolAccept` architecture remains broadly accurate, but v31 adds a consensus-boundary behavior that is important enough to document explicitly.

### Next-block signature validation

During mempool acceptance, `validation.cpp` sets `PrecomputedTransactionData::m_sighash_fork_id` from:

```text
SighashForkId(active_chain_height + 1)
```

Therefore a transaction submitted while the tip is immediately below activation is checked using the signature domain required by the activation block.

This prevents the node from accepting a transaction into the mempool under the legacy domain when that transaction could only be mined under the post-fork domain.

### Activation-boundary mempool clear

When the newly connected block makes the **next** block height equal to `nReplayProtectionHeight`, BitcoinII clears the mempool before replay-protection activation.

That is a deliberate cleanup boundary for transactions accepted under the old domain.

For service operators, this means a temporary mempool discontinuity at the activation boundary was intentional protocol behavior, not necessarily a node fault.

## Validation-cache separation

v31 also incorporates the sighash fork id into script-validation cache separation.

The validation cache key includes `txdata.m_sighash_fork_id` along with the existing transaction/script verification context.

This is a correctness requirement: a signature-valid result computed under the legacy digest domain must not be reused as proof that the same transaction is valid under the post-activation BC2 domain, or vice versa.

This is a material BitcoinII-specific change even though most of the surrounding `MemPoolAccept` flow remains inherited Bitcoin-style logic.

## Mining and block-template construction

The existing MoreBC2 block-template page remains structurally accurate for `BlockAssembler`, package selection, coinbase creation, transaction ordering, and template validity checks.

The important v31 change is header time/difficulty coupling under ShockWave.

### Candidate time can change required work

`src/node/miner.cpp` now explicitly treats candidate-time updates as potentially difficulty-changing under ShockWave.

When `UpdateTime` changes a candidate header time, the miner recalculates `nBits` with `GetNextWorkRequired()` rather than assuming mainnet difficulty is independent of candidate time between long fixed retarget periods.

`CreateNewBlock` likewise fills the candidate header's `nBits` through the current production `GetNextWorkRequired()` path.

This matters because ShockWave's emergency-stall logic can depend on the candidate header time. Mining software or template-generation code that updates time while retaining stale `nBits` can construct an invalid candidate.

### What did not become BitcoinII-specific here

This pass did not identify a BC2-specific rewrite of the normal ancestor-aware mempool package selection algorithm, block-weight accounting, fee selection, or MiniMiner fee simulation. Those existing MoreBC2 explanations remain useful as structural documentation, while they should still avoid claiming exhaustive v31 equivalence to upstream Bitcoin Core.

## RPC/server helper implication

The current source also constructs next-header context in RPC server helpers by updating candidate time and then calling `GetNextWorkRequired()` before building the synthetic next-block index.

That reinforces the general v31 rule: code that needs next-block consensus context should derive difficulty from the actual candidate header rather than treat the current tip's `nBits` as automatically reusable.

## Existing MoreBC2 page classification

### Still structurally accurate, but needs v31 annotation

- `wallet-spend-rpc.md`
- `rpc-rawtransaction.md`
- `mempool-accept.md`
- `miner.md`
- wallet RPC overview pages that discuss PSBT/signing at a high level
- mining RPC/template pages that previously assumed ordinary Bitcoin-style difficulty context

### Material new v31 behavior to cross-link

- replay-protection fork-id propagation
- PSBT precompute/finalization domain
- raw-RPC next-block domain selection
- external signer compatibility warning
- mempool next-block validation domain
- activation-boundary mempool clear
- validation-cache domain separation
- candidate-time-triggered ShockWave work recalculation

### No runtime claim yet

MoreBC2 has not yet executed a v31 wallet/PSBT signing regression suite, generated a pre/post activation signature test vector, tested an external signer, or exercised block-template time/difficulty behavior against a live/regtest v31 node.

## Primary source set

Pinned/current `v31.1.0` source reviewed for this pass includes:

- `src/consensus/params.h`
- `src/interfaces/chain.h`
- `src/node/interfaces.cpp`
- `src/script/interpreter.h`
- `src/script/interpreter.cpp`
- `src/script/sign.cpp`
- `src/psbt.h`
- `src/psbt.cpp`
- `src/node/psbt.h`
- `src/node/psbt.cpp`
- `src/rpc/rawtransaction.cpp`
- `src/rpc/rawtransaction_util.cpp`
- `src/validation.cpp`
- `src/wallet/wallet.h`
- `src/wallet/wallet.cpp`
- `src/wallet/scriptpubkeyman.h`
- `src/wallet/scriptpubkeyman.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/external_signer_scriptpubkeyman.cpp`
- `src/node/miner.cpp`
- `src/rpc/server_util.cpp`

Canonical source tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Follow-up runtime work

Highest-value safe follow-ups are:

1. generate deterministic pre/post-fork signature-hash vectors from v31 code;
2. run wallet PSBT create/process/finalize on a disposable regtest or test environment;
3. verify raw transaction RPC signing uses the same digest domain;
4. exercise mempool boundary behavior in an isolated chain fixture;
5. test candidate-time changes against ShockWave `nBits` calculation;
6. document which third-party signing libraries cannot represent the BC2 fork domain.

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** BitcoinII Core `v31.1.0` plus the `v29.1.0...v31.1.0` release comparison
**Notes:** Source paths and compatibility boundaries are established. No MoreBC2 runtime transaction-signing or mining regression suite has yet been executed.