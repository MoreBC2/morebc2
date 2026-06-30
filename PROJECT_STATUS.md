# MoreBC2 project status

**Status:** Private foundation-building, ready for broad documentation polish pass
**Last reviewed:** 2026-06-30

## Summary

MoreBC2 is currently a private, source-backed documentation and ecosystem reference project for BitcoinII (BC2).

The repository has moved beyond a basic wiki framework. It now has a substantial architecture handbook, Source Atlas, RPC review track, wallet review track, exchange framework, ecosystem framework, verification queue, and editorial rules.

## Current phase

**Phase:** v0.1 foundation hardening

Current goal:

- Stabilize repository structure.
- Improve navigation.
- Track coverage clearly.
- Keep verified documentation separate from research, discussion, history, and ecosystem tracking.
- Prepare the project for invite-only review later.
- Start a broader polish pass across navigation, language, duplication, and open questions.

## Launch readiness

MoreBC2 is **not ready for broad public launch yet**.

It is now much closer to a coherent private-review draft. Before public sharing it still needs:

- A clear contribution workflow.
- License/public contribution decision.
- Source-backed pages checked for stale links and wording consistency.
- Tested local command examples before any command guide is marked Verified.
- Active ecosystem/explorer/exchange checks from direct sources.
- At least one outside reviewer for core technical claims.

## Current strengths

- Clear editorial rule: document reality, explore possibilities, separate the two.
- Strong naming standard: BitcoinII / BC2 / BitcoinII Core / MoreBC2.
- Multiple architecture explainer pages now exist.
- Source Atlas has meaningful reviewed entries across consensus, validation, storage, wallet, mining, RPC, and mempool areas.
- RPC overview now tracks mining, blockchain, raw transaction, mempool, and wallet RPC groups.
- Wallet guide now has source-backed startup, address, backup/import, spend/PSBT, encryption, coin/balance, and transaction-history notes.
- Verification queue exists and tracks important unresolved questions.
- Exchange and ecosystem frameworks exist without falsely listing unverified services as active.
- Technical pages are generally conservative and clearly marked Draft, Partial, Reviewed, or Needs Review.

## Current risks

- Many pages are Draft, which is correct, but readers need stronger guidance on which pages to trust first.
- Source Atlas pages and architecture pages now overlap enough that a consistency pass is needed.
- Open questions are still spread across many pages even though a central backlog exists.
- Some section README files are still thinner than newer sections.
- Glossary cross-linking has improved, but it is not complete enough for public review.
- Command examples are still mostly untested and must remain clearly marked as placeholders or draft material.
- Ecosystem and service pages are mostly frameworks until active services are checked directly.

## Recommended sharing stage

### Now

Keep private while the first broad polish pass is completed.

### Next

Invite-only review with a small group of trusted readers after:

- Root README and docs index are refreshed around the current coverage.
- Documentation coverage dashboard is reconciled with the latest Source Atlas pages.
- Audit and open-question pages are consolidated.
- Thin section README files are normalized.
- Obvious duplication and stale TODO wording are cleaned up.

### Later

Public launch after:

- Top-level navigation is polished.
- Known unknowns are centralized.
- License choice is final.
- Issues and contribution workflow are ready.
- Release verification model is checked against actual releases.
- At least one outside reviewer has checked core claims.

## Current coverage snapshot

| Area | Status | Notes |
|---|---|---|
| Repository principles | Strong | Existing root governance/style files establish the philosophy. |
| Documentation taxonomy | Strong | Categories are defined and mostly respected. |
| Architecture explainers | Partial | Transaction, block, reorg, startup, consensus, mempool, and validation pages exist; P2P/network and wallet internals remain pending. |
| Source Atlas | Partial | Strong first-pass coverage now exists for chainparams, PoW, transaction checks, script, validation, storage, wallet RPC groups, mining RPC, blockchain RPC, raw transaction RPC, and mempool/broadcast RPC. |
| Verification queue | Partial | Key unknowns are tracked, but open questions from individual pages should be consolidated during polish. |
| RPC documentation | Partial | Major RPC groups are source-reviewed, but command examples are not locally tested. |
| Wallet documentation | Partial | Major wallet RPC groups are source-reviewed, but platform guides, database internals, GUI flows, and tested examples are pending. |
| Exchange integration | Framework | Useful structure exists; confirmation policy and direct service checks remain unverified. |
| Ecosystem directory | Framework | Good conservative structure; active services still need direct checks. |
| Developer onboarding | Partial | Reading order, repository map, source tree guide, source review guide, local dev, build, testing, and release verification pages exist. |
| Glossary | Partial | Root and developer glossaries have been expanded; cross-linking and missing terms remain cleanup work. |
| Public website planning | Early | Site section exists, but navigation/search/publishing choices remain open. |

## Immediate next actions

1. Run a broad polish pass across root README, docs README, and section README files.
2. Reconcile documentation coverage with the newest Source Atlas and RPC pages.
3. Consolidate repeated open questions into the central backlog.
4. Normalize status/date/verification blocks on older pages.
5. Check cross-links from architecture pages to Source Atlas pages.
6. Separate command examples into untested placeholders vs locally verified examples.
7. Decide whether release verification or explorer/API framework should be the next source-backed work stream after polish.

## Verification

**Status:** Draft
**Primary sources checked:** Repository structure and current documentation files
**Notes:** This dashboard is a project-management document for MoreBC2. It is not BitcoinII protocol documentation.
