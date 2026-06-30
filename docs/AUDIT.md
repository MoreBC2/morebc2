# Repository audit

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This audit reviews the MoreBC2 repository as a documentation project, not as BitcoinII protocol documentation.

The repository is in good shape for private foundation-building. The main issue is no longer lack of content. The main issue is navigation and contributor-readiness.

## Audit scope

Reviewed areas:

- Root README and root governance/style files.
- Main docs index.
- Architecture section.
- Documentation section.
- Developer section and source atlas.
- Verification queue.
- Exchange section.
- Ecosystem section.
- Mining, wallets, nodes, research, discussion, and history section indexes.

## Overall assessment

MoreBC2 has a strong foundation.

The strongest parts are:

- Clear mission and editorial philosophy.
- Strong separation between documentation, research, discussion, history, and ecosystem tracking.
- Conservative verification language.
- Growing source atlas tied to reviewed code paths.
- Architecture explainers that are easier to read than raw source notes.

The weakest parts are:

- Contributor onboarding.
- Centralized coverage tracking.
- Centralized open-question tracking.
- Glossary depth.
- Normalized README structure across all sections.

## Critical findings

### 1. Missing project dashboard

Before this audit, readers had to infer the project state from many separate files.

Fix started:

- Added `PROJECT_STATUS.md`.

### 2. Missing documentation coverage dashboard

The repository needs one page showing which areas have been reviewed, partially reviewed, or not started.

Recommended fix:

- Add `docs/documentation-coverage.md`.

### 3. Missing developer reading order

New contributors need a guided path through architecture, source atlas, and verification rules.

Recommended fix:

- Add `docs/developers/reading-order.md`.

### 4. Open questions are scattered

Many pages contain local open questions. That is good, but the project also needs a master backlog.

Recommended fix:

- Add `docs/verification/open-questions.md` or expand `docs/verification/README.md` into a dashboard.

## High-priority findings

### Section README consistency

Some section README files are strong and current, especially:

- `docs/architecture/README.md`
- `docs/configuration/README.md`
- `docs/ecosystem/README.md`
- `docs/developers/source-atlas/README.md`

Some are thinner and should be normalized later:

- `docs/mining/README.md`
- `docs/wallets/README.md`
- `docs/nodes/README.md`
- `docs/research/README.md`
- `docs/history/README.md`

Recommendation:

Every section README should include:

- Category/status/date block when appropriate.
- Summary.
- Current pages.
- Planned pages.
- Rules.
- Verification block.

### Architecture section is now ahead of navigation

Architecture pages are now substantial enough that they should become part of the recommended reading path.

Recommended fix:

- Add reading order.
- Link architecture pages from root README more clearly.

### Source atlas needs coverage indexing

The Source Atlas index lists current pages, but it does not show coverage status by subsystem.

Recommended fix:

- Add coverage table to a dedicated dashboard rather than overloading the atlas README.

## Medium-priority findings

### Terminology

Preferred terms should be:

- `Block lifecycle` for high-level architecture.
- `Block acceptance` for source-level implementation path.
- `Mempool acceptance` or `transaction acceptance` depending on context.
- `Source Atlas` for file-by-file implementation notes.
- `Architecture` for conceptual flow pages.

### Duplication

There is expected overlap between architecture pages and Source Atlas pages.

Current duplication is acceptable because:

- Architecture explains why and how to think about the flow.
- Source Atlas explains where behavior is implemented.

Future risk:

- If both layers keep expanding without rules, they may drift.

Recommended fix:

- Add a documentation style rule: architecture pages summarize, Source Atlas pages anchor implementation.

### Verification block normalization

Most technical pages include a verification block, but some older section README files do not use the newer format.

Recommended fix:

- Normalize section READMEs during a later cleanup pass.

## Low-priority findings

### Diagrams

Text diagrams are useful and consistent enough for now.

Later, the project could add SVG diagrams, but that should wait until structure stabilizes.

### Page naming

Current names are mostly fine. Avoid large renames until public launch planning, because renames can make the audit harder to follow.

## Launch-readiness assessment

### Private development

Ready.

### Invite-only review

Almost ready after adding:

- Coverage dashboard.
- Reading order.
- Verification standards page.
- Master open-question backlog.

### Public launch

Not ready yet.

Reasons:

- Contributor path is not clear enough.
- License/public contribution workflow should be decided first.
- Glossary and coverage dashboards need more polish.
- Core technical claims should get at least one outside review.

## Recommended next tasks

1. Create documentation coverage dashboard.
2. Create developer reading order.
3. Create master open-questions backlog.
4. Normalize thin section README files.
5. Create verification standards page.
6. Create source-review guide.
7. Expand glossary framework.

## Verification

**Status:** Draft
**Primary sources checked:** Repository files listed in audit scope
**Notes:** This is a project-maintenance audit. It does not verify BitcoinII protocol behavior.
