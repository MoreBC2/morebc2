# Open questions backlog

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page collects major unresolved questions across MoreBC2 after the BitcoinII Core `v31.1.0` refresh and first deep consensus-source audit.

Historical questions about whether BitcoinII still uses the old 2016-block-only retarget model are resolved: current mainnet uses ShockWave after height `57750`.

The detailed source paths for ShockWave, replay protection, BitcoinII data restrictions, and ShockWave-aware header synchronization are now documented in the Source Atlas. Remaining work is primarily test execution, runtime evidence, empirical analysis, and third-party compatibility.

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

### ShockWave test and empirical mapping

**Resolved source question:** The activation boundary, production entry point, rolling 25-block/24-interval MTP baseline, per-block bounds, short-horizon controller, timestamp moderation, emergency-recovery constants, mining interaction, and headers-sync history requirements are now source-reviewed in [ShockWave v31](../developers/source-atlas/shockwave-v31.md).

**Needed:** Map helpers to specific upstream tests, execute those tests locally, build controlled boundary vectors, and compare the source model with live-network behavior under abrupt hashrate changes.

### Replay-protection test vectors and compatibility

**Resolved source question:** The activation, fork-id selection, signature-hash domain, mempool boundary handling, validation cache, wallet signing, raw-transaction RPC, PSBT, and external-signer paths are now source-reviewed in [Replay protection v31](../developers/source-atlas/replay-protection-v31.md).

**Needed:** Safe pre/post-fork digest vectors, disposable-wallet runtime tests, hardware/external-signer tests, and audits of third-party signing libraries.

### Consensus data-restriction boundary tests

**Resolved source question:** The explicit post-activation output and Taproot witness restrictions and their block-connection enforcement path are now documented in [Data restrictions v31](../developers/source-atlas/data-restrictions-v31.md).

**Needed:** Execute located unit/functional tests, record activation-boundary behavior, and avoid overbroad claims about arbitrary data protocols beyond the explicit consensus rules.

### Fork-aware header synchronization runtime scenarios

**Resolved source question:** The two-phase headers-sync model, fork-point anchoring, private 35-index ShockWave history, exact `GetNextWorkRequired()` validation, and failure-state clearing are now documented in [Header sync v31](../developers/source-atlas/headers-sync-v31.md).

**Needed:** Map ShockWave-specific branches to individual test assertions and run current-release competing-branch/recovery scenarios.

### Confirmation recommendations

**Question:** What confirmation count should exchanges/services use under current network conditions?

**Needed:** Maintainer guidance or a documented risk model informed by current reorg/hashrate behavior.

## RPC, wallet, mempool, mining, and PSBT

The `v31.1.0` release identifies associated updates across these areas.

The replay-protection audit has already established that wallet signing, raw-transaction RPC, PSBT handling and mempool validation include v31-specific fork-id behavior.

**Question:** Which additional detailed MoreBC2 Source Atlas/RPC pages need release-specific annotations beyond replay protection?

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

The highest-priority v31 consensus paths now have dedicated release-specific entries.

**Next priority:** validation/mempool details outside the four audited consensus features, wallet/PSBT follow-up, mining/RPC changes, and any v31 release-specific caller/test annotations needed in older file-oriented pages.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors, dedicated v31 Source Atlas feature audits, refreshed current-facing MoreBC2 docs, and existing historical verification records
**Notes:** This backlog now separates source questions that were resolved by the 2026-09-02 deep audit from runtime/test/compatibility work that remains open.