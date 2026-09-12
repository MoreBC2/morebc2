# Verification

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This section tracks MoreBC2 evidence records, open questions, test plans, and verification queues.

Start with the [Verification evidence index](verification-index.md). It is the canonical evidence summary for MoreBC2.

The dated records contain the detailed evidence. Plans are not completed results, and archived readiness dashboards are not current public-release assessments.

## 1. Evidence index

Canonical current evidence summary:

- [Verification evidence index](verification-index.md)

Older navigation/status pages:

- [Older verification index](index.md) - retained as a superseded/historical navigation page.
- [Verification dashboard](dashboard.md) - retained as a legacy manually maintained dashboard concept.

## 2. Dated evidence records

Local runtime and RPC:

- [Windows fresh-node peer discovery test - 2026-08-28](windows-peer-discovery-test-2026-08-28.md)
- [Windows node-operator test - 2026-08-27](windows-node-operator-test-2026-08-27.md)
- [Local BitcoinII node inspection - 2026-07-10](local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test - 2026-07-10](read-only-rpc-smoke-test-2026-07-10.md)
- [Local RPC enablement plan](local-rpc-enablement-plan.md)

Developer platform and public infrastructure:

- [Public infrastructure smoke test - 2026-09-11](public-infrastructure-smoke-test-2026-09-11.md)
- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)

Project identity:

- [Project identity source check - 2026-07-10](project-identity-source-check-2026-07-10.md)

Release integrity and authentication:

- [Release-artifact authentication - 2026-08-27](release-artifact-authentication-2026-08-27.md)

## 3. Open questions and known unknowns

Unresolved items stay in these queues until a dated record or source review resolves them:

- [Open questions backlog](open-questions.md)
- [Known unknowns](known-unknowns.md)

## 4. Test plans and testing status

Plans are not completed results. They describe safe order, scope, or test coverage until a dated execution record exists.

- [Command testing status](command-testing.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Command example scan](command-example-scan.md)
- [Network test coverage map](network-test-coverage-map.md)
- [Network test run plan](network-test-run-plan.md)
- [Stale wording scan](stale-wording-scan.md)

Internal task prompts and narrow reviewer packets are intentionally not linked from this reader-facing index.

## 5. Release verification

Release records are carefully bounded. Asset inventory is not binary verification, and maintainer roadmap context is not cryptographic proof.

- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Release-artifact authentication - 2026-08-27](release-artifact-authentication-2026-08-27.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release source comparison notes](release-source-comparison.md)
- [Network release comparison](network-release-comparison.md)

Narrow reviewer packets for release wording are intentionally kept outside the normal reader flow.

## 6. Ecosystem checks

Ecosystem records and plans should distinguish reachable services from reliable, official, synced, or recommended services.

- [Ecosystem direct check plan](ecosystem-direct-check-plan.md)
- [Public infrastructure smoke test - 2026-09-11](public-infrastructure-smoke-test-2026-09-11.md)
- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)
- [Explorers](../ecosystem/explorers.md)
- [APIs](../ecosystem/apis.md)
- [Exchanges](../ecosystem/exchanges.md)
- [Mining pools](../ecosystem/mining-pools.md)
- [Infrastructure service directory](../infrastructure/service-directory.md)
- [Infrastructure status policy](../infrastructure/status-policy.md)

## 7. Archived review coordination

Earlier invite-only review packets and coordination pages are retained as project-management history. They are intentionally omitted from this reader-facing index and from normal site navigation/search. Use the current [owner public-release review handoff](../REVIEW_HANDOFF.md) for release-readiness work.

## 8. Project identity and status evidence

Use these pages to keep canonical-source, naming, contact, and status claims scoped to the evidence.

- [Project identity source check - 2026-07-10](project-identity-source-check-2026-07-10.md)
- [Verification evidence index](verification-index.md)
- [Project status](../../PROJECT_STATUS.md)
- [Known unknowns](known-unknowns.md)
- [Open questions backlog](open-questions.md)

## How to use this section

1. Check the [Verification evidence index](verification-index.md) first.
2. Follow the linked dated record for detailed evidence.
3. Keep unresolved items in [Open questions](open-questions.md) or [Known unknowns](known-unknowns.md).
4. Keep plans separate from completed records.
5. Keep archived review coordination separate from current public-release readiness.
6. Do not upgrade a page or claim without the required evidence record.

## Rules

- Do not move an item out of verification until the evidence is strong enough for the target page.
- Keep current facts, historical facts, research ideas, and discussion proposals separate.
- Record the source type used: source code, release artifact, official website, archive, maintainer statement, local test, or current direct check.
- Command examples should remain unverified until run locally with environment details.
- Release artifact claims should remain unverified until assets and hashes are checked directly.
- Ecosystem claims should remain unverified until checked directly and dated.
- Developer test-suite plans should remain separate from user-facing command smoke tests.

## Verification

**Status:** Draft
**Primary sources checked:** Current verification section structure, verification evidence index, dated records, open-question queues, test plans, release records, ecosystem records, and private-review coordination pages
**Notes:** This page is a router for verification material. It does not independently verify BitcoinII protocol behavior, service reliability, release binaries, or ecosystem claims.