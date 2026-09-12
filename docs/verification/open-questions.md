# Open questions backlog

**Category:** Verification  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This backlog tracks unresolved questions after the coordinated BitcoinII Core `v31.1.0` documentation, architecture, wallet, mining, compatibility, node, release, and Developers / Source Atlas audits.

Most high-priority **source-location/currentness** questions are now resolved. The remaining work is primarily about executing controlled tests, gathering longer runtime evidence, validating third-party implementations, measuring live-network behavior, and turning provisional operational guidance into reproducible runbooks.

## Release authentication

### How can users authenticate all current `v31.1.0` binaries more strongly?

**Known:** Six assets are recorded; GitHub reports SHA-256 metadata for all six; the lightweight tag points to a GitHub-verified commit; MoreBC2 independently matched the Windows Qt archive hash.

**Open:**

- independently hash the other five current assets;
- determine whether a maintainer-signed checksum manifest or detached asset signatures are published through a canonical route;
- document any trusted release-key distribution process;
- determine whether reproducible-build evidence exists or can be produced.

**Priority:** High

## Node and operator runtime

### What does a full/long-duration v31 node run establish?

**Known:** Bounded Windows Qt/server-mode mainnet startup, peer discovery, advancing IBD, cookie RPC, shutdown/restart, and disposable-wallet isolation succeeded.

**Open:**

- complete IBD;
- observe long-duration operation/reconnection;
- deliberately exercise supported pruning/index combinations;
- test a current headless-daemon deployment path if an appropriate release artifact becomes available;
- document production-oriented fee-estimation and monitoring behavior.

**Priority:** High

## ShockWave

### Can MoreBC2 independently reproduce controlled candidate-time / target transitions?

**Known:** Current source review establishes activation, rolling baseline, short-horizon response, timestamp safeguards, emergency recovery, mining-template interaction, and header-sync history requirements.

**Open:**

- deterministic candidate-time / `nBits` vectors;
- abrupt hashrate-arrival/departure scenarios;
- emergency-recovery threshold examples;
- execution/mapping of relevant upstream tests;
- empirical post-activation block timing/difficulty analysis.

See [Research: difficulty adjustment notes](../research/difficulty-adjustment-notes.md).

## Replay protection and signing

### Which third-party signing implementations correctly support the BC2 replay domain?

**Known:** Mainnet activation `57750`, domain `0x01324342`, and the relevant wallet/raw/PSBT/mempool/block/cache paths are source-traced. Ordinary v31 PSBT signing/finalization was exercised on isolated regtest.

**Open:**

- deterministic mainnet-domain sighash/signature vectors;
- external/hardware signer qualification;
- third-party wallet/library audit;
- activation-boundary mempool/signing tests.

## Consensus data restrictions

### Do executed boundary tests match the source-reviewed rule paths?

**Known:** Activation and the principal output/Taproot witness restrictions plus block-connection enforcement are mapped.

**Open:** execute the located tests and record representative activation-boundary accept/reject vectors.

## Fork-aware header synchronization

### How does current v31 behave under controlled competing-header/fork scenarios?

**Known:** Two-phase sync, fork anchoring, bounded private ShockWave history, and exact-work validation are source-reviewed.

**Open:**

- competing-branch/recovery runtime scenarios;
- malformed/insufficient branch-history cases;
- activation-boundary scenarios;
- executed-test mapping.

## Reorganizations and settlement

### What is the practical BC2 reorg/settlement risk model?

**Known:** Chain selection is accumulated-work based. Reorg disconnect/undo/reconnect/mempool-repair behavior is source-reviewed. MoreBC2 uses 50 confirmations as a provisional normal-deposit exchange baseline.

**Open:**

- empirical reorg-depth/frequency history;
- controlled v31 reorg simulation;
- a worked cumulative-chainwork monitoring example;
- operational incident handling when a credited deposit is disconnected;
- value/risk-based escalation thresholds for large or unusual deposits.

## Exchange confirmation policy

### How should the provisional 50-confirmation baseline be maintained?

**Known:** CoinEx exposes `2/6`; NonKYC exposes `50`; NestEx exposes BC2 `50`; Biconomy's exact current count remains publicly unverified.

**Open:**

- periodic direct policy rechecks;
- maintainer/community feedback if available;
- chainwork-aware examples;
- large-value escalation policy;
- reorg incident playbook.

The question is no longer “what number?” but how to operationalize and revisit the provisional baseline responsibly.

## Mining / Stratum

### Which current pool endpoints work end-to-end with v31 BC2?

**Known:** Published pool modes, fees, and endpoint families have been recorded. Core mining/template source is reviewed. `generatetoaddress` was exercised in isolated regtest.

**Open:**

- subscribe/authorize;
- job receipt/update behavior;
- share difficulty and extranonce behavior;
- accepted/rejected shares;
- candidate-time / `nBits` compatibility;
- block attribution;
- payout accounting/timing/reliability.

## Core mining RPC

### Which mining RPCs have current release-binary runtime evidence?

**Known:** `generatetoaddress` was executed in the v31 regtest PSBT workflow.

**Open:** `getmininginfo`, `getnetworkhashps`, `getblocktemplate`, `submitblock`, and `submitheader` remain source-reviewed but not current-release runtime-qualified.

## Public transaction propagation

### Is there a verified public valid-BC2 transaction submission path?

**Known:** Local zero-peer regtest `sendrawtransaction` worked. Three Mempool-style `/api/tx` routes rejected malformed `00` payloads; Official Explorer candidate routes returned 403.

**Open:** successful valid public submission/propagation remains unverified.

This should only be tested if needed, in a deliberate disposable workflow. Existing user wallets must not be used.

## Public infrastructure

### Which services are genuinely independent and reliable enough for production redundancy?

**Known:** Current point-in-time REST/WebSocket/Electrum behavior is documented; Official Explorer is materially distinct from the Mempool-style services.

**Open:**

- operator/backend independence;
- long-term uptime/reliability;
- behavior under lag/stress;
- wallet-level Electrum compatibility;
- public transaction broadcast behavior.

## Wallet and external signer compatibility

### Which third-party wallets/signers are safe for current v31 BC2?

**Open:** build a small compatibility matrix using disposable/watch-only fixtures where possible, with replay-domain support treated as a hard signing requirement. Do not use existing user wallets merely to generate documentation evidence.

## Custody / exchange production design

### What production architecture should a serious service use?

**Open:**

- wallet-based vs non-wallet deposit tracking;
- `txindex`/indexing recommendations;
- withdrawal signing/broadcast/monitoring;
- hot/cold separation;
- backup/recovery and key-management procedures;
- reorg/deposit rollback handling;
- chainwork/risk alerting.

MoreBC2's current exchange pages are integration guidance, not a certified custody design.

## Technical and security contact

### What upstream BitcoinII contact route should integration providers use?

GitHub Issues and a verified Core commit-author email exist, but MoreBC2 has not established a canonical upstream technical/security/integration contact process. Do not invent one.

## Documentation maintenance

### What still needs recurring recheck rather than one-time source work?

- current release inventory and metadata;
- exchanges and their deposit/withdrawal policy;
- explorers/APIs/Electrum;
- pools and Stratum endpoints;
- third-party wallets;
- current Core release/source baseline;
- public-site deployment and link integrity.

The large Source Atlas/Architecture currentness question is now substantially resolved; future work should be triggered by new releases or evidence gaps rather than blanket re-audits.

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Completed v31 source/architecture audits, September runtime records, current release evidence, public infrastructure evidence, exchange evidence, and current mining/wallet/operator documentation  
**Notes:** This backlog intentionally contains unresolved work. Source questions already answered by the current audit sequence have been removed or rewritten as test/runtime questions.
