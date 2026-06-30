# MoreBC2 project status

**Status:** Private foundation-building
**Last reviewed:** 2026-06-29

## Summary

MoreBC2 is currently a private, source-backed documentation and ecosystem reference project for BitcoinII (BC2).

The repository has moved beyond a basic wiki framework. It now has a growing architecture handbook, source atlas, exchange framework, ecosystem framework, verification queue, and editorial rules.

## Current phase

**Phase:** v0.1 foundation

Current goal:

- Stabilize repository structure.
- Improve navigation.
- Track coverage clearly.
- Keep verified documentation separate from research, discussion, history, and ecosystem tracking.
- Prepare the project for invite-only review later.

## Launch readiness

MoreBC2 is **not ready for broad public launch yet**.

It is close enough for private development and internal review, but before public sharing it still needs:

- A stronger top-level contributor path.
- Documentation coverage dashboard.
- Developer reading order.
- Glossary framework.
- Verification standards page.
- Clear issue/PR workflow.
- Review of source-backed pages for stale links and wording consistency.

## Current strengths

- Clear editorial rule: document reality, explore possibilities, separate the two.
- Strong naming standard: BitcoinII / BC2 / BitcoinII Core / MoreBC2.
- Multiple architecture explainer pages now exist.
- Source atlas has meaningful reviewed entries.
- Verification queue exists and tracks important unresolved questions.
- Exchange and ecosystem frameworks exist without falsely listing unverified services as active.
- Technical pages are generally conservative and clearly marked Draft or Needs Review.

## Current risks

- Many pages are Draft, which is correct, but readers may need guidance on which pages to read first.
- Some section README files are thinner than newer sections and need normalization.
- Open questions are still spread across many pages.
- The glossary is not yet strong enough to support deep cross-linking.
- Technical coverage is currently concentrated in validation, mempool, block lifecycle, and proof-of-work; other subsystems remain mostly untouched.

## Recommended sharing stage

### Now

Keep private while structure is stabilized.

### Next

Invite-only review with a small group of trusted readers after the following are added:

- Developer reading order.
- Documentation coverage dashboard.
- Verification standards.
- Glossary framework.
- Root README refresh.

### Later

Public launch after:

- Top-level navigation is polished.
- Known unknowns are centralized.
- License choice is final.
- Issues and contribution workflow are ready.
- At least one outside reviewer has checked core claims.

## Current coverage snapshot

| Area | Status | Notes |
|---|---|---|
| Repository principles | Strong | Existing root governance/style files establish the philosophy. |
| Documentation taxonomy | Strong | Categories are defined and mostly respected. |
| Architecture explainers | Partial | Transaction, block, and reorg lifecycle pages exist. Node startup and consensus model are pending. |
| Source atlas | Partial | Core validation, PoW, mempool, and block lifecycle entries exist. Many subsystems are pending. |
| Verification queue | Partial | Key unknowns are tracked, but open questions from individual pages should be consolidated. |
| Exchange integration | Framework | Useful structure exists; confirmation policy and contact process remain unverified. |
| Ecosystem directory | Framework | Good conservative structure; active services still need direct checks. |
| Developer onboarding | Weak | Needs reading order, repository tour, source-review guide, and contributor workflow. |
| Glossary | Weak | Existing glossary needs expansion into developer-focused terms. |
| Public website planning | Early | Site section exists, but navigation/search/publishing choices remain open. |

## Immediate next actions

1. Add documentation coverage dashboard.
2. Add developer reading order.
3. Add verification standards page or update existing evidence material into one clear workflow.
4. Normalize thinner README files.
5. Create a master open-questions backlog.
6. Expand glossary framework.

## Verification

**Status:** Draft
**Primary sources checked:** Repository structure and current documentation files
**Notes:** This dashboard is a project-management document for MoreBC2. It is not BitcoinII protocol documentation.
