# Verification

**Category:** Verification  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

Verification is MoreBC2's evidence layer: dated runtime records, direct public-service observations, release-integrity records, open questions, and test plans.

Start with the [Verification evidence index](verification-index.md). It is the canonical current evidence summary.

A dated record is preserved for the environment/version actually tested. A plan is not a completed result. A source review is not automatically runtime verification. A successful website deployment verifies the documentation build/deploy workflow, not every BitcoinII technical claim on the site.

## Current strongest evidence

### BitcoinII Core `v31.1.0`

- [Windows v31.1.0 node and RPC validation — 2026-09-11](windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](windows-v31-psbt-replay-validation-2026-09-11.md)
- [v31 wallet/mempool/mining source regression audit — 2026-09-02](v31-wallet-mempool-mining-regression-2026-09-02.md)
- [v31 currentness audit — 2026-09-02](v31-currentness-audit-2026-09-02.md)

### Public infrastructure and exchange policy

- [Public infrastructure smoke test — 2026-09-11](public-infrastructure-smoke-test-2026-09-11.md)
- [Exchange confirmation evidence — 2026-09-12](exchange-confirmation-evidence-2026-09-12.md)
- [Public API/WebSocket/Electrum smoke test — 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)

### Release provenance

- [Current v31.1.0 release assets](../releases/v31.1.0-assets.md)
- [Release authentication status](../releases/authentication-status.md)
- [Release-artifact authentication — 2026-08-27](release-artifact-authentication-2026-08-27.md) — historical `v29.1.0` evidence

## Current evidence boundary

The current records establish, among other things:

- bounded Windows `v31.1.0` mainnet startup, peer discovery, cookie RPC, partial initial sync, shutdown/restart, and disposable-wallet isolation;
- isolated zero-peer regtest wallet/PSBT creation, signing, finalization, decoding, mempool acceptance, and local submission;
- source-confirmed mainnet ShockWave, replay-protection, data-restriction, and fork-aware-header-sync paths;
- current public explorer/API/WebSocket/Electrum reachability observations;
- current exchange confirmation-policy observations supporting a provisional MoreBC2 50-confirmation normal-deposit baseline;
- current release asset inventory/digests and verified target-commit evidence, with explicit binary-authentication limits.

They do **not** establish universal production readiness, permanent service uptime, successful public transaction propagation, external-signer compatibility, reproducible binaries, or deterministic transaction finality.

## Open work

Use these pages for unresolved work:

- [Open questions backlog](open-questions.md)
- [Known unknowns](known-unknowns.md)
- [Command testing status](command-testing.md)

The remaining high-value work is increasingly execution/operations oriented: long-duration/current-release node behavior, optional indexes/pruning, controlled ShockWave vectors, external-signer/replay-domain compatibility, production custody/deposit workflows, chainwork-aware settlement examples, and periodic service rechecks.

## Plans versus results

Planning/checklist pages remain useful, but should never be cited as if they are execution records:

- [Command smoke-test plan](command-smoke-test-plan.md)
- [Network test coverage map](network-test-coverage-map.md)
- [Network test run plan](network-test-run-plan.md)
- [Ecosystem direct-check plan](ecosystem-direct-check-plan.md)
- [Release artifact checklist](release-artifact-checklist.md)

When a plan is executed, create or update a dated result record rather than silently converting the plan into evidence.

## Historical evidence

Historical records remain version-scoped. In particular, `v29.1.0` Windows/node/release records continue to be useful evidence for that environment, but they are not upgraded to `v31.1.0` by wording changes.

Current-facing pages should prefer the September v31 records where they answer the same question.

## Superseded coordination material

- [Older verification index](index.md) — historical/superseded navigation.
- [Verification dashboard](dashboard.md) — legacy manually maintained dashboard concept.
- earlier invite-only/private-review coordination pages — project-management history, not current evidence.

## Rules

- Name the release/ref, platform, network, date, and environment for runtime evidence.
- Keep source review, runtime testing, public-service observation, and operational policy distinct.
- Do not infer public broadcast from local zero-peer `sendrawtransaction`.
- Do not infer wallet compatibility from Electrum reachability or Bitcoin-style address formats.
- Do not infer service independence from similar/different hostnames alone.
- Do not call an exchange confirmation count a consensus constant or cryptographic finality rule.
- Preserve old dated evidence; add new records for new releases/tests.
- Recheck time-sensitive public services before using them as current recommendations.

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Current verification records/indexes, completed v31 Source Atlas/Architecture audits, September runtime/public-infrastructure records, and September exchange evidence  
**Notes:** The verification navigation is current. Remaining Partial status reflects genuine unexecuted tests and operational unknowns, not an unaudited section.
