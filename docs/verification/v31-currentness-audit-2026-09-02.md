# BitcoinII v31.1.0 documentation currentness audit — 2026-09-02

**Category:** Verification
**Status:** Audit record
**Date:** 2026-09-02

## Purpose

This record documents the MoreBC2 refresh triggered by BitcoinII Core `v31.1.0` and the first deep follow-up audit of its principal BitcoinII-specific consensus changes.

The goal is to prevent current-facing MoreBC2 pages from continuing to present `v29.1.0` as the current release, the pre-ShockWave 2016-block-only difficulty path as current behavior, or release-note feature names without source-path detail.

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

Reviewed `v31.1.0` mainnet chain parameters establish:

- `nShockWaveActivationHeight = 57750`
- `nDataRestrictionsHeight = 57750`
- `nReplayProtectionHeight = 57750`
- `nReplayProtectionForkId = 0x01324342`
- target block spacing remains 10 minutes
- default P2P port remains `8338`
- Bitcoin-like address prefixes remain present

## Deep consensus-source audit completed

The following release-note areas now have dedicated release-pinned Source Atlas reviews:

1. [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
   - activation boundary and production `GetNextWorkRequired()` dispatch;
   - 25-block / 24-interval MTP rolling baseline;
   - short-horizon response and timestamp moderation;
   - emergency stall recovery constants and recovery behavior;
   - mining candidate-time recalculation;
   - exact history requirements for header synchronization.

2. [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
   - fork-id selection by block height;
   - signature-hash domain behavior;
   - next-block mempool validation and activation-boundary mempool clearing;
   - validation-cache separation;
   - wallet, raw-transaction RPC, PSBT and external-signer paths.

3. [Data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)
   - post-activation OP_RETURN count/size rules;
   - OP_13 detection in OP_RETURN scripts;
   - bare multisig restriction;
   - Taproot annex, tapscript-size and Ordinals-envelope restrictions;
   - block-connection enforcement;
   - located unit/functional test surfaces.

4. [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
   - existing PRESYNC/REDOWNLOAD anti-DoS model;
   - candidate branch anchoring at the known fork point;
   - private 35-index branch-specific ShockWave/MTP history;
   - exact `GetNextWorkRequired()` verification during header sync;
   - per-peer state clearing on failure;
   - located unit/fuzz test surfaces.

## Current-facing pages refreshed in the v31 baseline pass

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

## Wording rules after this audit

Current-facing documentation should not say:

- `v29.1.0` is the current BitcoinII release;
- current BitcoinII mainnet changes difficulty only every 2016 blocks;
- Dark Gravity Wave alone is the current BitcoinII algorithm name;
- replay protection is an address-format change;
- the data restrictions constitute a proven blanket ban on every arbitrary-data protocol;
- header sync itself chooses the active chain;
- older local `v29.1.0` RPC/node observations prove `v31.1.0` runtime behavior.

Current-facing documentation may say:

- BitcoinII Core `v31.1.0` is the current documented release as of this audit;
- ShockWave applies per-block difficulty adjustment beginning at mainnet height `57750`;
- pre-57750 history used the inherited Bitcoin-style retarget path;
- v31 activates replay protection and data restrictions at height `57750`;
- replay protection adds a BC2 signature-hash domain with fork id `0x01324342`;
- the explicit post-activation transaction-data rules are documented from source;
- header synchronization reproduces branch-specific ShockWave history for candidate branches within the existing anti-DoS sync framework;
- historical tests remain version-scoped evidence.

## Remaining follow-up priorities

The first three source-mapping priorities from the original currentness pass are now substantially resolved at the source-review level.

Remaining high-value work:

1. execute/map v31 consensus and header-sync tests locally;
2. generate safe replay-protection pre/post-fork test vectors;
3. run data-restriction activation-boundary tests;
4. run current-release competing-branch/header-sync scenarios;
5. review wallet/PSBT changes beyond the replay-protection path;
6. review mempool/RPC/validation changes outside these audited features;
7. review mining subsystem changes beyond difficulty;
8. perform fresh `v31.1.0` runtime node/RPC testing;
9. independently authenticate `v31.1.0` release artifacts.

## Evidence boundary

This audit is a source/documentation review. It does not claim that every BitcoinII Core source file was diffed or that MoreBC2 executed the upstream test suite.

Where source paths are established, the documentation now records them. Where runtime/test evidence does not yet exist, the gap remains explicit.

## Verification

**Status:** Audit record
**Primary sources checked:** BitcoinII Core `v31.1.0` release metadata and release-pinned source paths for chain parameters, difficulty, validation, transaction data rules, replay-protection signing/validation, wallet/PSBT, and headers synchronization
**Notes:** Use this record as the boundary between the initial v31 currentness refresh and the deeper feature-path audit completed on 2026-09-02.