# BitcoinII v31.1.0 documentation currentness audit — 2026-09-02

**Category:** Verification
**Status:** Audit record
**Date:** 2026-09-02

## Purpose

This record documents the MoreBC2 refresh triggered by BitcoinII Core `v31.1.0`.

The goal is to prevent current-facing MoreBC2 pages from continuing to present `v29.1.0` as the current release or the pre-ShockWave 2016-block-only difficulty path as current mainnet behavior.

## Current upstream baseline checked

- Canonical repository: `Bitcoin-II/BitcoinII-Core`
- Current release: `v31.1.0`
- Published: `2026-08-29T02:39:30Z`

Release notes identify:

- ShockWave per-block difficulty adjustment;
- consensus-level Ordinals, inscriptions, and Runes mitigation;
- BC2 transaction replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

Reviewed `v31.1.0` mainnet chain parameters additionally establish:

- `nShockWaveActivationHeight = 57750`
- `nDataRestrictionsHeight = 57750`
- `nReplayProtectionHeight = 57750`
- `nReplayProtectionForkId = 0x01324342`
- target block spacing remains 10 minutes
- default P2P port remains `8338`
- Bitcoin-like address prefixes remain present

Reviewed `v31.1.0/src/pow.cpp` establishes the current ShockWave implementation and its per-block post-activation difficulty behavior.

## Current-facing pages refreshed in this pass

- `README.md`
- `docs/README.md`
- `docs/documentation/what-is-bitcoinii.md`
- `docs/documentation/network-specifications.md`
- `docs/documentation/consensus-overview.md`
- `docs/documentation/releases.md`
- `docs/architecture/consensus-model.md`
- `docs/encyclopedia/difficulty-adjustment.md`
- `docs/encyclopedia/proof-of-work.md`
- `docs/mining/mining-overview.md`
- `docs/developers/source-atlas/pow-cpp.md`
- `docs/developers/source-atlas/chainparams-cpp.md`
- `docs/compatibility/known-breakpoints.md`
- `docs/nodes/README.md`
- `docs/releases/README.md`
- `docs/releases/v31.1.0-assets.md`
- `docs/verification/verification-index.md`
- `docs/verification/known-unknowns.md`
- `docs/verification/open-questions.md`

The exchange integration/operator pages were refreshed separately immediately before this pass and are already v31.1.0-aware on `main`.

## Historical records intentionally not rewritten

Dated evidence records remain tied to the version and environment actually tested. Examples include:

- `docs/verification/local-node-inspection-2026-07-10.md`
- `docs/verification/read-only-rpc-smoke-test-2026-07-10.md`
- `docs/verification/release-artifact-authentication-2026-08-27.md`
- `docs/verification/windows-node-operator-test-2026-08-27.md`
- `docs/verification/windows-peer-discovery-test-2026-08-28.md`
- `docs/releases/v29.1.0-assets.md`

A historical record saying `v29.1.0` is not stale merely because a newer release exists, provided the record clearly describes a dated `v29.1.0` observation/test.

## Wording rules after this refresh

Current-facing documentation should not say:

- `v29.1.0` is the current BitcoinII release;
- current BitcoinII mainnet changes difficulty only every 2016 blocks;
- Dark Gravity Wave alone is the current BitcoinII algorithm name;
- older local `v29.1.0` RPC/node observations prove `v31.1.0` runtime behavior.

Current-facing documentation may say:

- BitcoinII Core `v31.1.0` is the current documented release as of this audit;
- ShockWave applies per-block difficulty adjustment beginning at mainnet height `57750`;
- pre-57750 history used the inherited Bitcoin-style retarget path;
- v31 activates replay protection and data restrictions at height `57750`;
- current release notes include fork-aware header synchronization and related subsystem updates;
- historical tests remain version-scoped evidence.

## Remaining currentness risks

This pass prioritizes pages that state current release, consensus, mining, node, compatibility, or verification posture.

The repository contains a large Source Atlas and many older first-pass architecture/RPC/wallet/mempool pages. Those pages may remain structurally useful even when they predate v31, but detailed behavior in files touched by v31 should be spot-checked before being elevated as current release-specific evidence.

Priority follow-up areas:

1. replay-protection implementation path;
2. data-restriction validation path;
3. fork-aware header synchronization;
4. wallet/PSBT changes;
5. mempool/RPC/validation changes;
6. mining subsystem changes beyond difficulty;
7. fresh `v31.1.0` runtime node/RPC testing;
8. independent `v31.1.0` artifact authentication.

## Evidence boundary

This audit is a documentation-currentness pass. It does not claim that every source file in BitcoinII Core was diffed or every MoreBC2 runtime workflow was re-executed.

Where current source/release facts are established, current-facing wording was corrected. Where current runtime evidence does not yet exist, older evidence remains version-labeled and the gap is recorded rather than guessed away.

## Verification

**Status:** Audit record
**Primary sources checked:** BitcoinII Core `v31.1.0` release metadata, `v31.1.0/src/kernel/chainparams.cpp`, `v31.1.0/src/pow.cpp`, and affected MoreBC2 current-facing pages
**Notes:** Use this record as the boundary between the 2026-08-27/28 v29 evidence cycle and the v31.1.0 documentation baseline.