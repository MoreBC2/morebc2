# Open questions backlog

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page collects major unresolved questions across MoreBC2 after the BitcoinII Core `v31.1.0` refresh, deep consensus-source audit, and wallet/mempool/mining regression review.

The principal v31 source paths are now documented. Remaining work is increasingly about **executing tests, collecting runtime evidence, measuring the live network, and validating third-party compatibility** rather than discovering where the new code lives.

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

### ShockWave tests and empirical behavior

**Resolved source question:** Activation, production entry point, rolling baseline, response controllers, timestamp moderation, emergency recovery, mining interaction, and headers-sync history are source-reviewed.

**Needed:** Execute/map upstream tests, build controlled boundary vectors, and compare the source model with live-network behavior under abrupt hashrate changes.

### Replay-protection vectors and compatibility

**Resolved source question:** Activation, fork-id selection, signature hashing, mempool boundary handling, validation-cache separation, wallet/raw-RPC/PSBT and external-signer paths are source-reviewed.

**Needed:** Deterministic pre/post-fork digest vectors, disposable-wallet runtime tests, external/hardware-signer tests, and third-party signing-library audits.

### Consensus data-restriction boundary tests

**Resolved source question:** Explicit output and Taproot witness restrictions and their block-connection enforcement path are documented.

**Needed:** Execute located unit/functional tests and record activation-boundary behavior.

### Fork-aware header synchronization runtime scenarios

**Resolved source question:** Two-phase sync, fork-point anchoring, private ShockWave history and exact work validation are documented.

**Needed:** Run current-release competing-branch/recovery scenarios and map tests to observed behavior.

### Confirmation recommendations

**Question:** What confirmation count should exchanges/services use under current network conditions?

**Needed:** Maintainer guidance or a documented risk model informed by current reorg/hashrate behavior.

## Wallet, PSBT, RPC, mempool, and mining

The 2026-09-02 regression audit now classifies the major v31 differences across these subsystems:

- wallet/PSBT signing propagates the BC2 next-block sighash fork domain;
- raw-transaction signing/finalization uses the same next-block domain;
- mempool validation checks signatures for the next block and clears legacy-domain transactions at activation;
- script-validation cache separation includes the fork id;
- external signers require BC2 replay-domain support;
- mining/template code recalculates `nBits` when candidate time changes because ShockWave work can be candidate-time-sensitive.

See [v31 wallet/mempool/mining regression audit](v31-wallet-mempool-mining-regression-2026-09-02.md).

### Remaining subsystem tests

**Needed:**

1. wallet PSBT create/process/finalize on a disposable environment;
2. raw-transaction signing equivalence with wallet signing;
3. deterministic signature-hash vectors;
4. isolated mempool activation-boundary test;
5. candidate-time / ShockWave `nBits` template test;
6. third-party and external signer compatibility matrix.

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

**Question:** Which wallets work safely with current BitcoinII replay protection and current service infrastructure?

**Needed:** Disposable/watch-only tests where possible; avoid unnecessary private-key or real-fund exposure.

## Documentation maintenance

### Historical evidence boundaries

**Question:** Are all dated `v29.1.0` test records clearly labeled as historical rather than current release evidence?

**Needed:** Periodic current-facing-link audit; do not rewrite historical test files.

### Source Atlas currentness

The highest-priority consensus and subsystem paths now have release-specific reviews.

**Next priority after runtime evidence:** ecosystem/service freshness, exchange confirmation-risk analysis, and release-specific annotations for any remaining lower-priority wallet/RPC pages encountered during testing.

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core `v31.1.0`, dedicated v31 Source Atlas reviews, subsystem regression audit, refreshed current-facing MoreBC2 docs, and historical verification records
**Notes:** This backlog now separates resolved source-path questions from runtime, empirical, and third-party compatibility work.