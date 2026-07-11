# Private review readiness

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-10

## Summary

This page tracks whether MoreBC2 is ready to invite a small group of trusted readers or agents for narrow private review.

It is not a public-launch checklist. Public launch has higher requirements around license, contribution workflow, release authentication, service claims, and outside technical review.

## Current readiness call

**Current stage:** Ready for first narrow invite-only review.

MoreBC2 is coherent enough for focused private review. Reviewers should still receive small assignments instead of being asked to review the whole repository at once.

The project now has dated operational evidence in addition to review frameworks:

- a locally running BitcoinII Core `v29.1.0` Windows mainnet node was inspected,
- localhost-only RPC was enabled and tested,
- a same-time local-node/explorer height and tip-hash match was recorded,
- nine harmless read-only RPC commands were locally tested,
- release assets and missing authentication materials were inventoried,
- explorers, public APIs, exchanges, and mining statistics received dated direct checks,
- the canonical public implementation and project-controlled identity sources were reviewed.

See the [verification evidence index](verification-index.md) for the current evidence map.

## Readiness levels

| Level | Meaning |
|---|---|
| Not ready | Major structure, status labels, or safety boundaries missing. |
| Almost ready | Core structure exists; a few final scans or assignment notes remain. |
| Ready for narrow review | Small scoped review tasks can be sent to trusted readers or agents. |
| Ready for broad review | Many reviewers can review without high risk of misunderstanding Draft pages as verified. |
| Public-ready | Public release blockers are cleared. |

## Current milestone status

| Milestone | Status | Notes |
|---|---|---|
| Private documentation foundation | Mostly done | Main sections, READMEs, status labels, review rules, and conservative boundaries exist. |
| Source-backed technical base | Strong partial | First-pass Source Atlas coverage exists across consensus, validation, storage, mempool, wallet, mining, RPC, and network/P2P areas. |
| Verification workflow | Strong | Verification queue, evidence index, coverage dashboard, command trackers, release trackers, ecosystem records, and feedback buckets exist. |
| Private review handoff | Ready | Review handoff, assignment cards, readiness page, first review packets, and feedback buckets exist. |
| Command safety posture | Locally tested partial | Nine read-only commands were tested on Windows mainnet. Wallet, transaction, mining, and operator state-changing workflows remain outside this batch. |
| Explorer/API posture | Dated operational evidence | A same-time local-node/explorer tip match and harmless public API checks were recorded. Official ownership and long-term reliability remain open. |
| Network/P2P verification posture | Strong partial | Source review and live peer summaries exist. Full developer test execution and broader runtime behavior remain open. |
| Release verification posture | Clearly bounded partial | Release metadata and asset inventory exist. Public checksum/signature/trusted-key infrastructure is not currently available; the maintainer has described it as roadmap work. |
| Ecosystem/service posture | Direct-check partial | Explorer, API, exchange, and mining-statistics observations are dated. Account-gated and reliability claims remain untested. |
| Project identity posture | Strong partial | Canonical implementation and project-controlled website/ticker usage were identified. Dedicated technical/security contact remains unclear. |
| Legal/reuse posture | Clear blocker | No broad public reuse posture until a license and contribution decision is made. |
| Outside technical review | Open blocker | No independent reviewer has yet completed a core-claims review. |

## What is ready for peer review now

These areas are suitable for narrow private review:

- Command-safety wording and the local read-only RPC record.
- Explorer/API wording and the same-time comparison record.
- Release-verification wording, including the explicit absence of current signing infrastructure.
- Project identity and canonical-repository evidence.
- Chain parameter documentation style.
- Network/P2P wording boundaries.
- Network test coverage and test-run planning.
- Exchange and ecosystem claim boundaries.
- Editorial status labels and verification terminology.

## What should not be treated as peer-validated yet

- Release binary authenticity or reproducibility.
- Permanent explorer/API reliability or official ownership.
- Exchange deposits, withdrawals, liquidity, safety, or regional availability.
- Recommended exchange confirmation policy.
- Wallet backup, restore, encryption, spending, or recovery workflows.
- Full runtime network health or developer test-suite results.
- Public contribution and reuse posture.
- Public launch readiness.

## Recommended first reviewer lanes

Give each reviewer one lane only.

### 1. Command and local-runtime reviewer

Review:

- [Read-only RPC smoke test](read-only-rpc-smoke-test-2026-07-10.md)
- [Command testing status](command-testing.md)
- `docs/developers/rpc-overview.md`

Check command names, output-redaction rules, version/platform limits, and whether any wording sounds broader than the test environment.

### 2. Release-verification reviewer

Review:

- `docs/developers/release-verification.md`
- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Network release comparison](network-release-comparison.md)

Confirm that no wording implies binary verification, signed releases, or a trusted key path currently exists.

### 3. Explorer/API reviewer

Review:

- `docs/ecosystem/explorers.md`
- `docs/ecosystem/apis.md`
- [Local node inspection](local-node-inspection-2026-07-10.md)

Confirm that the point-in-time tip match is described accurately and is not turned into a permanent reliability claim.

### 4. Project identity reviewer

Review:

- [Project identity source check](project-identity-source-check-2026-07-10.md)
- canonical repository, website, ticker, contact, and inherited security-contact wording

Confirm the distinction between project-controlled public evidence and maintainer conversation context.

### 5. Ecosystem wording reviewer

Review exchange, mining-pool, explorer, and API pages. Flag any claim about active operations, safety, reliability, liquidity, fees, deposits, withdrawals, or official status that lacks direct evidence.

### 6. Network/P2P reviewer

Review the peer communication model and selected P2P Source Atlas pages. Flag wording that goes beyond source review, the one-node live observation, or the existing test plan.

## Invite wording for reviewers

```text
Please review only the assigned page(s). Do not rewrite broadly. Please flag:

- claims that sound stronger than the evidence,
- missing source, date, release, platform, or network labels,
- examples whose live values could be mistaken for constants,
- private or network data that should be redacted,
- public-launch wording that should remain private-review-only,
- anything that belongs in Open Questions instead of documentation.
```

## Go/no-go recommendation

**Recommendation:** MoreBC2 is ready to send the first one or two narrow private-review assignments now.

The strongest first lanes are:

1. local RPC and command-safety review,
2. release-verification wording review,
3. explorer/API evidence wording review.

Do not open broad review yet.

## Public launch blockers

Public launch still needs:

- Final MoreBC2 license decision.
- Public issue/PR and contributor workflow decision.
- At least one independent technical review of core claims.
- Release verification guidance that accurately reflects the absence of current signing infrastructure and can be upgraded when public checksums/signatures/keys appear.
- Clear labeling of which locally tested commands are suitable for published instructions.
- Continued dated ecosystem checks and a policy for stale service information.
- Confirmation policy or explicit non-recommendation posture for exchange/service integration.
- Dedicated official technical/security contact information, or an explicit statement that none is published.

## Related pages

- [Verification evidence index](verification-index.md)
- [Project status](../../PROJECT_STATUS.md)
- [Private review handoff](../REVIEW_HANDOFF.md)
- [Private review assignments](private-review-assignments.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Open questions backlog](open-questions.md)
- [Documentation coverage](../documentation-coverage.md)
- [Command testing status](command-testing.md)
- [Local node inspection](local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test](read-only-rpc-smoke-test-2026-07-10.md)
- [Project identity source check](project-identity-source-check-2026-07-10.md)
- [Legal and reuse posture](../LEGAL_REUSE.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 verification records, project status, review handoff, coverage dashboard, local node/RPC records, release verification records, ecosystem direct-check records, project identity source check, and legal/reuse posture
**Notes:** This is a private-review readiness dashboard. It does not verify BitcoinII protocol behavior, release binaries, service reliability, or public-launch readiness.