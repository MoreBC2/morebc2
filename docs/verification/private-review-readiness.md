# Private review readiness

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-01

## Summary

This page tracks whether MoreBC2 is ready to invite a small group of trusted readers or agents for narrow private review.

It is not a public-launch checklist. Public launch has higher requirements around license, release artifact verification, command testing, ecosystem checks, and outside technical review.

## Current readiness call

**Current stage:** Nearly ready for narrow invite-only review.

MoreBC2 is now coherent enough for focused peer review, but reviewers should be given small assignments instead of being asked to review the whole repository at once.

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
| Source-backed technical base | Strong partial | First-pass Source Atlas coverage exists across consensus, validation, storage, mempool, wallet, mining, RPC, network RPC, and protocol primitives. |
| Verification workflow | Mostly done | Verification queue, coverage dashboard, command trackers, stale wording scan, command scan, release trackers, and feedback buckets exist. |
| Private review handoff | Mostly done | `docs/REVIEW_HANDOFF.md` and review feedback buckets exist. This page narrows the go/no-go decision. |
| Command safety posture | Strong framework | Commands remain placeholders until tested; smoke-test plan exists. Actual command test records are still missing. |
| Release verification posture | Partial | Release source comparison and artifact checklist exist, but binary/hash/signature verification remains open. |
| Ecosystem/service posture | Framework | Ecosystem/API/explorer/pool/exchange pages avoid active claims, but direct live checks remain open. |
| Legal/reuse posture | Clear blocker | No public reuse posture until license decision is made. |

## What is ready for peer review now

These areas are suitable for narrow private review:

- Editorial and status-label rules.
- Source Atlas entry format.
- Chain parameter documentation style.
- PoW and difficulty documentation wording.
- RPC overview and command-safety boundaries.
- Command smoke-test plan.
- Release verification framework wording.
- Ecosystem page caution and active-service claim boundaries.
- Review feedback bucket workflow.

## What should not be treated as peer-validated yet

These areas are not ready to be treated as verified:

- Locally tested command examples.
- Release binary verification.
- Active ecosystem/explorer/API/pool/exchange listings.
- Exchange confirmation policy.
- Lower-level P2P behavior beyond protocol primitives and network RPC.
- Wallet database internals and GUI behavior.
- Public launch readiness.

## Remaining pre-review checks

Before inviting the first small group, complete or confirm:

| Check | Current status | Notes |
|---|---|---|
| Stale wording tracker updated | Mostly done | Recent source-link and overclaim scans are recorded. One final skim is still useful. |
| Command example tracker updated | Mostly done | Main command surfaces are recorded. Repository search behavior was unreliable, so a manual/code-search recheck is still useful. |
| Coverage dashboard current | Mostly done | Updated after Source Atlas cleanup, command plan, network RPC, and protocol primitives. |
| Review assignments narrow enough | Needs final pass | Create exact assignment bullets before inviting reviewers. |
| License/reuse caveat visible | Done for private review | Public reuse remains blocked until license choice. |
| Public-launch caveat visible | Done | Project status says not ready for broad public launch. |

## Suggested first reviewer lanes

Give each reviewer one lane only:

1. **Chain parameters reviewer**
   - Check `docs/developers/source-atlas/chainparams-cpp.md` against `v29.1.0` and current `main`.
   - Flag any value that should be labeled release-specific.

2. **Command safety reviewer**
   - Review `docs/verification/command-smoke-test-plan.md` and `docs/verification/command-testing.md`.
   - Flag any command that should move to `Do not publish` or later-phase testing.

3. **Release verification reviewer**
   - Review `docs/developers/release-verification.md`, `docs/verification/release-source-comparison.md`, and `docs/verification/release-artifact-checklist.md`.
   - Flag any wording that sounds like binary verification is complete.

4. **RPC reviewer**
   - Review `docs/developers/rpc-overview.md` plus one RPC Source Atlas page.
   - Confirm command names and risk categories, not runtime behavior.

5. **Ecosystem wording reviewer**
   - Review ecosystem/API/explorer/pool/exchange pages.
   - Flag any active-service claim without direct dated evidence.

6. **P2P reviewer**
   - Review `docs/developers/source-atlas/rpc-network.md` and `docs/developers/source-atlas/protocol.md`.
   - Flag any wording that goes beyond source-reviewed primitives.

## Invite wording for reviewers

Use narrow wording like:

```text
Please review only the assigned page(s). Do not rewrite broadly. Please flag:

- claims that sound stronger than the evidence,
- missing source/version labels,
- command examples that look tested but are not,
- public-launch wording that should stay private-review-only,
- anything that should move to Open Questions instead of docs.
```

## Go/no-go recommendation

**Recommendation:** MoreBC2 is close enough to prepare first narrow private-review assignments now.

Do not open broad review yet. Invite one or two trusted reviewers or agents at a time, with constrained assignments and explicit evidence rules.

## Public launch blockers

Do not treat private review readiness as public launch readiness.

Public launch still needs:

- Final license decision.
- Release artifact verification model checked against current releases.
- At least one outside technical review of core claims.
- Local command test records for any published command examples.
- Direct ecosystem checks with dates.
- Confirmation policy for exchange/service docs.
- Issue/PR workflow decision for public contributors.

## Related pages

- [Project status](../../PROJECT_STATUS.md)
- [Private review handoff](../REVIEW_HANDOFF.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Documentation coverage](../documentation-coverage.md)
- [Stale wording scan](stale-wording-scan.md)
- [Command example scan](command-example-scan.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Legal and reuse posture](../LEGAL_REUSE.md)

## Verification

**Status:** Draft
**Primary sources checked:** Project status, review handoff, coverage dashboard, stale wording scan, command example scan, command testing status, command smoke-test plan, release verification pages, legal/reuse posture
**Notes:** This page is a private-review readiness dashboard. It does not verify BitcoinII protocol behavior or public-launch readiness.
