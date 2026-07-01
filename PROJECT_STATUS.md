# MoreBC2 project status

**Status:** Private foundation-building, near invite-only review
**Last reviewed:** 2026-06-30

## Summary

MoreBC2 is currently a private, source-backed documentation and ecosystem reference project for BitcoinII (BC2).

The repository has moved beyond a basic wiki framework. It now has a substantial architecture handbook, Source Atlas, RPC review track, wallet review track, exchange framework, ecosystem/API framework, release-verification framework, command-test tracker, verification queue, private-review workflow, and editorial rules.

## Current phase

**Phase:** v0.1 private-review preparation

Current goal:

- Stabilize the final private-review workflow.
- Keep license/reuse posture explicit while the final license decision is pending.
- Keep verified documentation separate from research, discussion, history, and ecosystem tracking.
- Prepare narrow tasks for trusted reviewers or agents.
- Avoid public-launch claims until release, ecosystem, and command examples are verified.

## Launch readiness

MoreBC2 is **not ready for broad public launch yet**.

It is now close to a coherent private-review draft. Before inviting new eyes or agents, it still needs:

- A final stale wording scan.
- A final untested-command scan.
- Root README reviewer start flow update.
- Narrow review assignments that prevent broad rewrites or unsupported claim upgrades.

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
- Root and docs indexes now route readers through project status, coverage, private-review handoff, and legal/reuse posture.
- Section READMEs are normalized.
- `CONTRIBUTING.md` defines a private-review workflow.
- Review feedback buckets are documented.
- Legal/reuse posture is documented as private-review-only until a license decision is made.
- Multiple architecture explainer pages now exist and are cross-linked to Source Atlas.
- Source Atlas has meaningful reviewed entries across consensus, validation, storage, wallet, mining, RPC, and mempool areas.
- RPC overview tracks mining, blockchain, raw transaction, mempool, and wallet RPC groups.
- Wallet guide has source-backed startup, address, backup/import, spend/PSBT, encryption, coin/balance, and transaction-history notes.
- Command testing tracker exists and major user/operator pages link to it.
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

## Recommended sharing stage

### Now

Keep private, but prepare invite-only review.

### Next

Invite-only review with a small group of trusted readers or agents after:

- Reviewer start flow is linked from root/docs indexes.
- A final stale wording and untested-command scan is done.
- Narrow assignments are prepared using `docs/REVIEW_HANDOFF.md`.

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
| Architecture explainers | Partial | Transaction, block, reorg, startup, consensus, mempool, and validation pages exist; P2P/network and wallet internals remain pending. |
| Source Atlas | Partial | Strong first-pass coverage now exists for chainparams, PoW, transaction checks, script, validation, storage, wallet RPC groups, mining RPC, blockchain RPC, raw transaction RPC, and mempool/broadcast RPC. |
| Verification queue | Partial | Major unknowns, release-check work, command-test tracking, feedback buckets, and review handoff now exist. |
| RPC documentation | Partial | Major RPC groups are source-reviewed, but command examples are not locally tested. |
| Wallet documentation | Partial | Major wallet RPC groups are source-reviewed, but platform guides, database internals, GUI flows, and tested examples are pending. |
| Release verification | Partial | Release page observations, source comparison, and artifact checklist exist; binaries/manifests/signatures are not verified. |
| Exchange integration | Framework | Useful structure exists; confirmation policy and direct service checks remain unverified. |
| Ecosystem directory | Framework | Good conservative structure; active services still need direct checks. API framework now exists. |
| Developer onboarding | Partial | Reading order, repository map, source tree guide, source review guide, local dev, build, testing, release verification, contributing guide, legal/reuse posture, and private-review handoff pages exist. |
| Glossary | Partial | Root and developer glossaries have been expanded; cross-linking and missing terms remain cleanup work. |
| Public website planning | Early | Site section exists, but navigation/search/publishing choices remain open. |

## Immediate next actions

1. Add reviewer start flow to the root README.
2. Run final stale wording scan for overconfident claims.
3. Run final command-example scan for untested examples.
4. Prepare narrow private-review assignments using `docs/REVIEW_HANDOFF.md`.
5. Then invite narrow private review or agents if desired.

## Verification

**Status:** Draft
**Primary sources checked:** Repository structure, current documentation files, coverage dashboard, private-review handoff, contribution guide, and legal/reuse posture note
**Notes:** This dashboard is a project-management document for MoreBC2. It is not BitcoinII protocol documentation.
