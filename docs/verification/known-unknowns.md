# Known unknowns

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page lists the highest-level things MoreBC2 does not know yet.

A known unknown is not a failure. It is an invitation to verify.

For the full working list, use the [open questions backlog](open-questions.md) and [verification queue](README.md).

## Highest-priority known unknowns

### Current release authentication

The current BitcoinII Core release is `v31.1.0`, published on 2026-08-29.

MoreBC2 has observed the current release metadata, four uploaded Linux/Windows CLI/Qt assets, and GitHub-reported SHA-256 digests.

The deeper 2026-08-27 artifact audit applies to historical `v29.1.0`, not automatically to `v31.1.0`.

**Needed:** Independent `v31.1.0` downloads/hashes, current tag/commit signature review, publisher checksum/signature discovery, trusted BitcoinII release-key guidance, and reproducible-build evidence if available.

**Blocks:** Strong public release-authentication claims.

### v31.1.0 runtime regression coverage

Release notes identify wallet, mining, mempool, RPC, validation, and PSBT updates in addition to the headline consensus changes.

MoreBC2's existing local command/node evidence is largely `v29.1.0`-scoped.

**Needed:** Current-release runtime records for core read-only node/RPC behavior and selected safe workflows.

**Blocks:** Claims that earlier local tests prove current-release behavior.

### ShockWave detailed validation and live behavior

MoreBC2 has source-backed current documentation for ShockWave activation and its high-level algorithm structure.

**Needed:** Detailed test/caller-path mapping plus empirical post-activation analysis of block timing, hashrate shocks, and emergency recovery behavior.

**Blocks:** Strong quantitative claims about ShockWave performance.

### Replay-protection transaction path

MoreBC2 has confirmed mainnet replay protection activation at height `57750` and fork ID `0x01324342`.

**Needed:** Detailed source review of transaction serialization/signing/validation behavior and wallet/service integration implications.

**Blocks:** Detailed integration guidance beyond the activation/fork-domain facts.

### Consensus data restrictions

MoreBC2 has confirmed `nDataRestrictionsHeight = 57750` and the `v31.1.0` release description of Ordinals, inscriptions, and Runes mitigation.

**Needed:** Detailed validation-path review and boundary testing.

**Blocks:** Precise claims about which data-carrier patterns are accepted or rejected.

### Fork-aware header synchronization

The `v31.1.0` release explicitly identifies fork-aware header synchronization.

**Needed:** Detailed source review and current-release runtime testing around competing-header/fork scenarios.

**Blocks:** Strong operational claims about all synchronization edge cases.

### Official ticker source

BC2 is used throughout the ecosystem, but MoreBC2 still needs the strongest project-controlled source confirming ticker usage.

**Needed:** Official website, README, release note, source UI/help text, or maintainer statement.

### Exchange confirmation recommendation

MoreBC2 has not established a recommended deposit/withdrawal confirmation policy for current v31 network conditions.

**Needed:** Maintainer recommendation or community-reviewed risk model informed by current ShockWave/reorg behavior.

### Technical/security contact process

MoreBC2 has not confirmed the preferred public contact process for exchanges, explorers, pools, wallet developers, or security reports.

**Needed:** Official contact page, repository guidance, or maintainer statement.

### Wallet and third-party compatibility

MoreBC2 has source-reviewed BitcoinII Core wallet behavior and dated public Electrum observations, but broad third-party wallet compatibility is not established.

**Needed:** Safe current-release compatibility records without private keys, real funds, or unnecessary broadcast risk.

### Active ecosystem resources

Explorer, API, exchange, pool, and market-service observations can become stale.

**Needed:** Dated direct rechecks before publication/recommendation and a clear stale-service policy.

### Architecture and Source Atlas release drift

Many Source Atlas pages were written against pre-v31 source and remain useful first-pass structural reviews, but release-specific BitcoinII modifications can invalidate detailed assumptions.

**Needed:** Prioritized v31 spot-checks for files touched by the new consensus, validation, header-sync, wallet, mempool, RPC, mining, and PSBT changes.

## Historical evidence rule

Do not rewrite dated `v29.1.0` test or verification records to make them appear current.

Instead:

- preserve the historical record;
- label it clearly by version/date;
- add a new `v31.1.0` record when the workflow is re-tested.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors plus existing MoreBC2 evidence records
**Notes:** This page is an executive list. The detailed backlog remains in `open-questions.md`.