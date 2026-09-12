# Open questions backlog

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page collects major unresolved questions across MoreBC2 after the BitcoinII Core `v31.1.0` refresh, deep consensus-source audit, wallet/mempool/mining regression review, current-release runtime checks, public-infrastructure probes, and current exchange-policy review.

The principal v31 source paths are now documented. Remaining work is increasingly about **executing tests, collecting runtime evidence, measuring the live network, and validating third-party compatibility** rather than discovering where the new code lives.

## Current-release verification

### v31.1.0 artifact authentication

**Question:** How should users independently verify current `v31.1.0` downloads?

**Known:** Current release metadata, six uploaded assets, GitHub-reported SHA-256 digests, the lightweight `v31.1.0` tag, and a GitHub-verified target commit are recorded.

**Needed:** Independent downloads/hashes for the remaining current assets, publisher checksum/signature discovery, trusted BitcoinII release-key guidance, and reproducible-build evidence if available.

**Priority:** High

### v31.1.0 runtime regression record

**Question:** Which current-release behaviors have been re-tested?

**Known:** Fresh isolated Windows v31.1.0 evidence now covers Qt server-mode startup, cookie RPC, mainnet peer discovery, initial sync, selected read-only commands, shutdown/restart, and a disposable regtest PSBT lifecycle.

**Needed:** Full sync, longer-duration operation, headless-daemon coverage, optional index/pruning combinations, fee behavior, production custody flows, and external-signer compatibility.

**Priority:** High

## Consensus and validation

### ShockWave tests and empirical behavior

**Resolved source question:** Activation, production entry point, rolling baseline, response controllers, timestamp moderation, emergency recovery, mining interaction, and headers-sync history are source-reviewed.

**Needed:** Execute/map upstream tests, build controlled boundary vectors, and compare the source model with live-network behavior under abrupt hashrate changes.

### Replay-protection vectors and compatibility

**Resolved source question:** Activation, fork-id selection, signature hashing, mempool boundary handling, validation-cache separation, wallet/raw-RPC/PSBT and external-signer paths are source-reviewed.

**Known runtime evidence:** A fresh isolated v31.1.0 regtest wallet completed a PSBT create/fund/sign/finalize/decode/mempool/local-submit workflow. Regtest leaves the mainnet replay activation disabled as shipped.

**Needed:** Deterministic mainnet-domain digest vectors, external/hardware-signer tests, and third-party signing-library audits.

### Consensus data-restriction boundary tests

**Resolved source question:** Explicit output and Taproot witness restrictions and their block-connection enforcement path are documented.

**Needed:** Execute located unit/functional tests and record activation-boundary behavior.

### Fork-aware header synchronization runtime scenarios

**Resolved source question:** Two-phase sync, fork-point anchoring, private ShockWave history and exact work validation are documented.

**Needed:** Run current-release competing-branch/recovery scenarios and map tests to observed behavior.

### Exchange confirmation policy

**Question:** How should MoreBC2 refine and maintain its provisional exchange confirmation baseline under changing network conditions?

**Known:** Direct 2026-09-12 exchange evidence records CoinEx at `2/6`, NonKYC at `50`, and NestEx at explicit BC2 `50`; Biconomy's current count remains unverified. MoreBC2 therefore currently uses **50 confirmations as a provisional normal-deposit baseline**.

**Needed:**

- community/maintainer review of the provisional baseline;
- a worked cumulative-chainwork monitoring example;
- empirical reorganization-depth/history analysis;
- value/risk-based escalation thresholds for large or unusual deposits;
- periodic exchange-policy rechecks.

The open question is no longer simply “what number should exchanges use?” The number now has a documented provisional answer; the remaining work is to validate and operationalize the risk model around it.

See [Exchange confirmation evidence — 2026-09-12](exchange-confirmation-evidence-2026-09-12.md).

## Wallet, PSBT, RPC, mempool, and mining

The 2026-09-02 regression audit classifies the major v31 differences across these subsystems:

- wallet/PSBT signing propagates the BC2 next-block sighash fork domain;
- raw-transaction signing/finalization uses the same next-block domain;
- mempool validation checks signatures for the next block and clears legacy-domain transactions at activation;
- script-validation cache separation includes the fork id;
- external signers require BC2 replay-domain support;
- mining/template code recalculates `nBits` when candidate time changes because ShockWave work can be candidate-time-sensitive.

See [v31 wallet/mempool/mining regression audit](v31-wallet-mempool-mining-regression-2026-09-02.md).

### Remaining subsystem tests

**Needed:**

1. raw-transaction signing equivalence with wallet signing;
2. deterministic signature-hash vectors;
3. isolated mempool activation-boundary test;
4. candidate-time / ShockWave `nBits` template test;
5. third-party and external signer compatibility matrix;
6. production-oriented fee estimation and broadcast monitoring examples.

## Project identity and contact

### Technical/security contact

**Question:** What official path should exchanges, explorers, pools, wallet developers, and security reporters use?

## Ecosystem and compatibility

### Active services

**Question:** Which explorers, APIs, pools, exchanges, wallets, and community tools are currently active and compatible with v31-era BitcoinII?

**Known:** Dated direct checks now exist for the main public explorer/API/Electrum surfaces and for CoinEx, NonKYC, NestEx, and Biconomy exchange metadata/policy visibility.

**Needed:** Periodic direct rechecks before current recommendations or integration submissions.

### Third-party wallet compatibility

**Question:** Which wallets work safely with current BitcoinII replay protection and current service infrastructure?

**Needed:** Disposable/watch-only tests where possible; avoid unnecessary private-key or real-fund exposure.

## Documentation maintenance

### Historical evidence boundaries

**Question:** Are all dated `v29.1.0` test records clearly labeled as historical rather than current release evidence?

**Needed:** Periodic current-facing-link audit; do not rewrite historical test files.

### Source Atlas currentness

The highest-priority consensus and subsystem paths now have release-specific reviews.

**Next priority after current runtime/evidence work:** chainwork-aware exchange operations, ecosystem/service freshness, and release-specific annotations for any remaining lower-priority wallet/RPC pages encountered during testing.

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core `v31.1.0`, dedicated v31 Source Atlas reviews, subsystem regression audit, fresh v31 runtime records, current public-infrastructure evidence, current exchange evidence, and refreshed current-facing MoreBC2 docs
**Notes:** This backlog now separates resolved source/runtime questions from the remaining empirical, operational, and third-party compatibility work. The exchange confirmation count has moved from unknown to provisional guidance; chainwork thresholds and ongoing validation remain open.