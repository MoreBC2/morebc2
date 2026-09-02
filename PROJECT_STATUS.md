# MoreBC2 project status

**Status:** Private documentation and verification project; current-facing baseline refreshed for BitcoinII Core v31.1.0
**Last reviewed:** 2026-09-02

## Summary

MoreBC2 is a source-backed documentation and verification project for BitcoinII (BC2) in the `MoreBC2/morebc2` GitHub organization repository.

Current-facing technical documentation now uses **BitcoinII Core `v31.1.0`** as the release baseline.

The repository also preserves dated `v29.1.0` local-runtime and release-integrity records as historical evidence. Those files are intentionally not rewritten to appear current.

See the [v31.1.0 currentness audit](docs/verification/v31-currentness-audit-2026-09-02.md).

## Current BitcoinII baseline

`v31.1.0`, published 2026-08-29, identifies:

- ShockWave per-block difficulty adjustment;
- consensus-level Ordinals, inscriptions, and Runes mitigation;
- BC2 transaction replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

Mainnet source anchors the principal new rules at height `57750`, including ShockWave, data restrictions, and replay protection.

## Current strengths

- Canonical source/release path is synchronized to `Bitcoin-II/BitcoinII-Core`.
- Exchange integration/operator docs are v31.1.0-aware.
- Network specifications, consensus, mining, proof-of-work, difficulty, and core Source Atlas pages have been refreshed for ShockWave.
- Current release metadata and GitHub-reported asset digests are recorded.
- Replay-protection and data-restriction activation anchors are documented.
- Historical evidence remains explicitly version-scoped rather than silently rewritten.
- Substantial architecture, Source Atlas, RPC, wallet, mempool, mining, and verification coverage exists.

## Historical operational evidence

MoreBC2 has dated `v29.1.0` Windows/mainnet evidence for:

- node startup and advancing initial sync;
- local-only RPC configuration;
- nine read-only RPC commands;
- clean shutdown/restart;
- fresh-node DNS peer discovery;
- release-asset integrity hashing for the `v29.1.0` release.

This remains valuable evidence for what was actually tested. It is **not** current `v31.1.0` runtime evidence.

## Current gaps and priorities

### 1. Fresh v31.1.0 runtime record

Re-run a bounded Windows node/RPC path against `v31.1.0`, recording version, environment, sync state, peers, read-only RPC, shutdown/restart, and any header-sync observations.

### 2. Current release authentication

MoreBC2 has recorded the current release assets and GitHub-reported SHA-256 digests but has not yet independently authenticated the `v31.1.0` release.

Needed work includes independent hashes, signature/tag review, trusted key guidance, and reproducibility evidence if available.

### 3. New consensus-path detail

Detailed source review remains needed for:

- replay protection;
- consensus data restrictions;
- fork-aware header synchronization;
- v31-related validation/mempool/wallet/RPC/PSBT changes.

### 4. Confirmation policy

Exchange/service confirmation recommendations remain unresolved and should be informed by current network/reorg/hashrate behavior rather than copied from Bitcoin assumptions.

### 5. Ecosystem freshness

Explorer, API, exchange, mining-pool, and wallet/service observations are date-sensitive and should be rechecked before current recommendations.

## Current navigation

- [Docs index](docs/README.md)
- [Network specifications](docs/documentation/network-specifications.md)
- [Consensus overview](docs/documentation/consensus-overview.md)
- [Releases](docs/releases/README.md)
- [Exchange integration package](docs/exchange/integration-package.md)
- [Verification evidence index](docs/verification/verification-index.md)
- [Known unknowns](docs/verification/known-unknowns.md)
- [Open questions](docs/verification/open-questions.md)
- [v31 currentness audit](docs/verification/v31-currentness-audit-2026-09-02.md)

## Coverage snapshot

| Area | Current posture |
|---|---|
| Current release identity | Refreshed for `v31.1.0` |
| Consensus/difficulty documentation | Refreshed for ShockWave and height-57750 activations |
| Exchange integration | v31.1.0-aware; confirmation/runtime items still Draft |
| Source Atlas | Strong first-pass coverage; targeted v31 spot checks still needed |
| Local node/RPC evidence | Strong historical `v29.1.0`; fresh v31 record needed |
| Release verification | Historical v29 integrity record + current v31 metadata; v31 independent authentication needed |
| Wallet/mempool/RPC/PSBT | Strong structural/source coverage; current release regression review needed |
| Ecosystem | Dated observations; freshness checks required |

## Editorial rule for release transitions

When BitcoinII releases change:

1. Update current-facing release/consensus/operator pages.
2. Preserve dated evidence under the release actually tested.
3. Do not globally replace old version numbers in historical records.
4. Add new runtime/verification evidence for the new release.
5. Record unresolved regression areas explicitly.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors and MoreBC2 currentness audit
**Notes:** This is a project-management summary, not independent proof of every BitcoinII behavior.