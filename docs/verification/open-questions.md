# Open questions backlog

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page collects major unresolved questions across MoreBC2 after the BitcoinII Core `v31.1.0` refresh.

Historical questions that were specifically about whether BitcoinII still used the old 2016-block-only retarget model are resolved: current mainnet uses ShockWave after height `57750`.

## Current-release verification

### v31.1.0 artifact authentication

**Question:** How should users independently verify current `v31.1.0` downloads?

**Known:** Current release metadata, four uploaded asset names/sizes, and GitHub-reported SHA-256 digests are recorded.

**Needed:** Independent downloads/hashes, tag/commit signature review, publisher checksum/signature discovery, trusted BitcoinII release-key guidance, and reproducible-build evidence if available.

**Priority:** High

### v31.1.0 runtime regression record

**Question:** Which earlier node/RPC behaviors have been re-tested on the current release?

**Known:** Strong dated Windows evidence exists for `v29.1.0`.

**Needed:** Fresh `v31.1.0` startup/sync/read-only RPC/peer/header-sync record.

**Priority:** High

## Consensus and validation

### ShockWave detailed path

**Question:** Which functions/tests cover each current ShockWave mechanism and its activation boundary?

**Known:** Activation at height `57750` and high-level algorithm structure are source-backed.

**Needed:** Test mapping, caller-path review, boundary tests, and empirical network analysis.

### Replay protection

**Question:** How exactly does BC2 replay protection affect transaction signing/validation and service integration?

**Known:** Activation height `57750`; fork ID `0x01324342`.

**Needed:** Detailed transaction/wallet/validation source path and safe test vectors.

### Consensus data restrictions

**Question:** Which data-carrier transaction patterns are rejected or altered after height `57750`?

**Known:** `nDataRestrictionsHeight = 57750`; release describes Ordinals/inscriptions/Runes mitigation.

**Needed:** Detailed validation-path review and boundary tests.

### Fork-aware header synchronization

**Question:** How does the new header-sync behavior handle competing branches and recovery cases?

**Known:** `v31.1.0` release explicitly identifies fork-aware header synchronization.

**Needed:** Source mapping and current-release runtime scenarios.

### Confirmation recommendations

**Question:** What confirmation count should exchanges/services use under current network conditions?

**Needed:** Maintainer guidance or a documented risk model informed by current reorg/hashrate behavior.

## RPC, wallet, mempool, mining, and PSBT

The `v31.1.0` release identifies associated updates across these areas.

**Question:** Which detailed MoreBC2 Source Atlas/RPC pages remain accurate without modification, and which need release-specific annotations?

**Needed:** Prioritized v31 spot checks of changed upstream files/functions plus selected safe runtime tests.

## Project identity and contact

### Official ticker source

**Question:** What is the strongest project-controlled source explicitly confirming `BC2` as the ticker?

### Technical/security contact

**Question:** What official path should exchanges, explorers, pools, wallet developers, and security reporters use?

## Ecosystem and compatibility

### Active services

**Question:** Which explorers, APIs, pools, exchanges, wallets, and community tools are currently active and compatible with v31-era BitcoinII?

**Needed:** Dated direct checks before current recommendations.

### Third-party wallet compatibility

**Question:** Which wallets work safely with current BitcoinII behavior, including replay protection and current Electrum/service infrastructure?

**Needed:** Disposable/watch-only tests where possible; avoid unnecessary private-key or real-fund exposure.

## Documentation maintenance

### Historical evidence boundaries

**Question:** Are all dated `v29.1.0` test records clearly labeled as historical rather than current release evidence?

**Needed:** Periodic current-facing-link audit; do not rewrite historical test files.

### Source Atlas currentness

**Question:** Which Source Atlas pages describe inherited structure accurately but need v31-specific change notes?

**Priority order:** consensus/difficulty, chainparams, validation/header sync, transaction/replay behavior, mempool, wallet/PSBT, mining/RPC.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors, refreshed current-facing MoreBC2 docs, and existing historical verification records
**Notes:** This is the current high-value backlog after the v31 documentation refresh.