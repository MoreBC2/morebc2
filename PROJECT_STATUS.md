# MoreBC2 project status

**Status:** Private foundation-building, preparing narrow invite-only review
**Last reviewed:** 2026-07-01

## Summary

MoreBC2 is currently a private, source-backed documentation and ecosystem reference project for BitcoinII (BC2).

The repository has moved beyond a basic wiki framework. It now has a substantial architecture handbook, Source Atlas, RPC review track, wallet review track, exchange framework, ecosystem/API framework, release-verification framework, command-test tracker, smoke-test plan, verification queue, private-review workflow, and editorial rules.

## Current phase

**Phase:** v0.1 narrow private-review preparation

Current goal:

- Prepare exact review lanes for trusted readers or agents.
- Keep license/reuse posture explicit while the final license decision is pending.
- Keep verified documentation separate from research, discussion, history, and ecosystem tracking.
- Avoid public-launch claims until release, ecosystem, and command examples are verified.
- Keep command examples as placeholders unless local test records exist.

## Launch readiness

MoreBC2 is **not ready for broad public launch yet**.

It is close to a coherent narrow private-review draft. Before inviting the first reviewers or agents, it still needs:

- One final skim of the stale wording and untested-command scan results.
- Exact narrow assignments using `docs/verification/private-review-readiness.md` and `docs/REVIEW_HANDOFF.md`.

Before public sharing it still needs:

- Final license decision.
- Tested local command examples before any command guide is marked Verified.
- Active ecosystem/explorer/API/exchange checks from direct sources.
- Release asset verification model checked against actual releases.
- At least one outside reviewer for core technical claims.
- Confirmation policy for exchange/service docs.

## Current strengths

- Clear editorial rule: document reality, explore possibilities, separate the two.
- Strong naming standard: BitcoinII / BC2 / BitcoinII Core / MoreBC2.
- Root and docs indexes route readers through project status, coverage, private-review handoff, legal/reuse posture, and reviewer start flow.
- Section READMEs are normalized.
- `CONTRIBUTING.md` defines a private-review workflow.
- Review feedback buckets are documented.
- Private-review readiness has its own checklist.
- Legal/reuse posture is documented as private-review-only until a license decision is made.
- Multiple architecture explainer pages now exist and are cross-linked to Source Atlas.
- Source Atlas has meaningful reviewed entries across consensus, validation, storage, wallet, mining, RPC, network RPC, protocol primitives, and mempool areas.
- RPC overview tracks mining, blockchain, network, raw transaction, mempool, and wallet RPC groups.
- Wallet guide has source-backed startup, address, backup/import, spend/PSBT, encryption, coin/balance, and transaction-history notes.
- Command testing tracker and command smoke-test plan exist, and major user/operator pages link to command safety material.
- Release source comparison and artifact checklist exist.
- Verification queue exists and tracks important unresolved questions.
- Exchange, ecosystem, explorer, and API frameworks exist without falsely listing unverified services as active.
- Technical pages are generally conservative and clearly marked Draft, Partial, Reviewed, or Needs Review.

## Current risks

- Final public license decision is not made.
- Public issue/PR workflow is not set up.
- Source Atlas pages and architecture pages overlap enough that future consistency checks will still be useful.
- Glossary cross-linking has improved, but it is not complete enough for public review.
- Command examples are still mostly untested and must remain clearly marked as placeholders or draft material.
- Release artifacts are not verified yet.
- Ecosystem and service pages are mostly frameworks until active services are checked directly.
- Lower-level P2P behavior is only beginning to be reviewed beyond network RPC and protocol primitives.

## Recommended sharing stage

### Now

Keep private, but prepare exact narrow assignments for invite-only review.

### Next

Invite one or two trusted readers or agents with constrained lanes after:

- A final skim confirms stale wording and command-example trackers are acceptable.
- Assignments are copied from `docs/verification/private-review-readiness.md` or `docs/REVIEW_HANDOFF.md`.

### Later

Public launch after:

- Top-level navigation is polished.
- Known unknowns remain centralized.
- License choice is final.
- Issues and contribution workflow are ready.
- Release verification model is checked against actual releases.
- Active ecosystem resources are directly checked and dated.
- At least one outside reviewer has checked core claims.

## Current coverage snapshot

| Area | Status | Notes |
|---|---|---|
| Repository principles | Strong | Existing root governance/style files establish the philosophy. |
| Documentation taxonomy | Strong | Categories are defined and mostly respected. |
| Architecture explainers | Partial | Transaction, block, reorg, startup, consensus, mempool, validation, wallet, and candidate-block pages exist; deeper P2P/network and wallet internals remain pending. |
| Source Atlas | Partial | Strong first-pass coverage now exists for chainparams, PoW, transaction checks, script, validation, storage, wallet RPC groups, mining RPC, blockchain RPC, network RPC, protocol primitives, raw transaction RPC, and mempool/broadcast RPC. |
| Verification queue | Partial | Major unknowns, release-check work, command-test tracking, command smoke-test plan, feedback buckets, stale-wording scan tracker, and review handoff now exist. |
| RPC documentation | Partial | Major RPC groups are source-reviewed, but command examples are not locally tested. |
| Wallet documentation | Partial | Major wallet RPC groups are source-reviewed, but platform guides, database internals, GUI flows, and tested examples are pending. |
| Release verification | Partial | Release page observations, source comparison, and artifact checklist exist; binaries/manifests/signatures are not verified. |
| Exchange integration | Framework | Useful structure exists; confirmation policy and direct service checks remain unverified. |
| Ecosystem directory | Framework | Good conservative structure; active services still need direct checks. API framework exists. |
| Developer onboarding | Partial | Reading order, repository map, source tree guide, source review guide, local dev, build, testing, release verification, contributing guide, legal/reuse posture, private-review handoff, readiness checklist, and root reviewer flow exist. |
| Glossary | Partial | Root and developer glossaries have been expanded; cross-linking and missing terms remain cleanup work. |
| Public website planning | Early | Site section exists, but navigation/search/publishing choices remain open. |

## Immediate next actions

1. Prepare the first one or two narrow private-review assignments.
2. Do one final skim of stale wording and command-example trackers before sending assignments.
3. Continue lower-level P2P source review in focused slices.
4. Run command smoke tests only when a disposable BitcoinII binary/environment is available.

## Verification

**Status:** Draft
**Primary sources checked:** Repository structure, current documentation files, coverage dashboard, private-review readiness checklist, private-review handoff, contribution guide, legal/reuse posture note, command smoke-test plan, and root README reviewer flow
**Notes:** This dashboard is a project-management document for MoreBC2. It is not BitcoinII protocol documentation.
