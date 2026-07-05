# MoreBC2 project status

**Status:** Private foundation-building, ready for first narrow invite-only review
**Last reviewed:** 2026-07-04

## Summary

MoreBC2 is currently a private, source-backed documentation and ecosystem reference project for BitcoinII (BC2).

The repository has moved beyond a basic wiki framework. It now has a substantial architecture handbook, Source Atlas, RPC review track, wallet review track, exchange framework, ecosystem/API framework, release-verification framework, release asset inventory tracker, command-test tracker, smoke-test plan, network release comparison, network test coverage map, network test run plan, verification queue, private-review workflow, and editorial rules.

## Current phase

**Phase:** v0.1 first narrow private-review readiness

Current goal:

- Share one or two exact review lanes with trusted readers or agents.
- Keep license/reuse posture explicit while the final license decision is pending.
- Keep verified documentation separate from research, discussion, history, and ecosystem tracking.
- Avoid public-launch claims until release, ecosystem, and command examples are checked.
- Keep command examples as placeholders unless local test records exist.
- Keep developer test-suite planning separate from user-facing command guidance.

## Launch readiness

MoreBC2 is **not ready for broad public launch yet**.

It is ready for the first one or two narrow private-review assignments, especially:

- command safety review
- release verification wording review

Additional second-wave narrow assignments can include:

- P2P wording boundary review
- network test-plan review
- ecosystem active-claim review

Before public sharing it still needs:

- Final license decision.
- Tested local command examples before any command guide is marked Verified.
- Active ecosystem/explorer/API/exchange checks from direct sources.
- Full release asset inventory and release artifact checks.
- At least one outside reviewer for core technical claims.
- Confirmation policy for exchange/service docs.

## Current strengths

- Clear editorial rule: document reality, explore possibilities, separate the two.
- Strong naming standard: BitcoinII / BC2 / BitcoinII Core / MoreBC2.
- Root and docs indexes route readers through project status, coverage, private-review handoff, legal/reuse posture, and reviewer start flow.
- Section READMEs are normalized.
- `CONTRIBUTING.md` defines a private-review workflow.
- Review feedback buckets are documented.
- Private-review readiness and narrow assignment cards exist.
- Legal/reuse posture is documented as private-review-only until a license decision is made.
- Multiple architecture explainer pages now exist and are cross-linked to Source Atlas.
- Source Atlas has meaningful reviewed entries across consensus, validation, storage, wallet, mining, RPC, network, P2P, and mempool areas.
- RPC overview tracks mining, blockchain, network, raw transaction, mempool, and wallet RPC groups.
- Wallet guide has source-backed startup, address, backup/import, spend/PSBT, encryption, coin/balance, and transaction-history notes.
- Command testing tracker and command smoke-test plan exist, and major user/operator pages link to command safety material.
- Release source comparison, network release comparison, release asset inventory attempt, and artifact checklist exist.
- Network test coverage map and network test run plan exist.
- Ecosystem direct-check plan exists, and ecosystem templates were refreshed around dated evidence fields.
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
- Full `v29.1.0` release asset names, sizes, URLs, hashes, signatures, and trusted keys are not captured.
- Ecosystem and service pages are mostly frameworks until active services are checked directly.
- Peer/network behavior has strong first-pass source review, but runtime tests and live network checks remain open.

## Recommended sharing stage

### Now

Keep private, but begin the first one or two narrow invite-only review assignments.

Recommended first assignments:

1. Command safety review.
2. Release verification wording review.

### Next

Invite one additional trusted reviewer or agent at a time for constrained lanes such as:

- P2P wording boundary review.
- Network test-plan review.
- Ecosystem active-claim review.
- Chain parameter source-version review.

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
| Architecture explainers | Partial | Transaction, block, reorg, startup, consensus, mempool, validation, wallet, candidate-block, and peer-communication pages exist. Wallet internals and live-network behavior remain pending. |
| Source Atlas | Partial | Strong first-pass coverage now exists for chainparams, PoW, transaction checks, script, validation, storage, wallet RPC groups, mining RPC, blockchain RPC, network RPC, protocol primitives, connection management, addrman, banman, net-processing slices, raw transaction RPC, and mempool/broadcast RPC. |
| Verification queue | Partial | Major unknowns, release-check work, release asset inventory, command-test tracking, command smoke-test plan, network release comparison, network test coverage map, network test run plan, ecosystem direct-check plan, feedback buckets, stale-wording scan tracker, and review handoff now exist. |
| RPC documentation | Partial | Major RPC groups are source-reviewed, but command examples are not locally tested. |
| Wallet documentation | Partial | Major wallet RPC groups are source-reviewed, but platform guides, database internals, GUI flows, and tested examples are pending. |
| Network/P2P documentation | Partial | First-pass source reviews, release comparison, selected blob checks, test coverage mapping, and test-run planning exist. Runtime tests and live checks remain open. |
| Release verification | Partial | Release page observations, source comparison, network comparison, release asset inventory attempt, and artifact checklist exist; release files/manifests/signatures are not verified. |
| Exchange integration | Framework | Useful structure exists; confirmation policy and direct service checks remain unverified. |
| Ecosystem directory | Framework | Direct-check plan and conservative templates exist; active services still need direct checks. |
| Developer onboarding | Partial | Reading order, repository map, source tree guide, source review guide, local dev, build, testing, release verification, contributing guide, legal/reuse posture, private-review handoff, readiness checklist, assignment cards, and root reviewer flow exist. |
| Glossary | Partial | Root and developer glossaries have been expanded; cross-linking and missing terms remain cleanup work. |
| Public website planning | Early | Site section exists, but navigation/search/publishing choices remain open. |

## Immediate next actions

1. Refresh `known-unknowns.md` so it matches the current verification queue and coverage dashboard.
2. Record the latest stale-wording sweep attempt and identify whether a stronger local grep is needed.
3. Start the first one or two narrow private-review assignments.
4. Keep private-review feedback in narrow buckets.
5. Continue release asset inventory when full asset data is available.
6. Run command smoke tests only when a disposable BitcoinII environment is available.
7. Run developer network tests only when a suitable build/test environment is available.
8. Continue direct ecosystem checks separately from source documentation.

## Verification

**Status:** Draft
**Primary sources checked:** Repository structure, documentation coverage dashboard, verification queue, private-review readiness checklist, private-review assignments, private-review handoff, contribution guide, legal/reuse posture note, release asset inventory attempt, ecosystem direct-check plan, command smoke-test plan, network release comparison, network test coverage map, network test run plan, and root README reviewer flow
**Notes:** This dashboard is a project-management document for MoreBC2. It is not BitcoinII protocol documentation.
