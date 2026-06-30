# Repository audit

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This audit reviews the MoreBC2 repository as a documentation project, not as BitcoinII protocol documentation.

The repository is in good shape for private foundation-building. The main issue is no longer lack of content. The main issue is now polish, navigation, tested examples, and readiness for invite-only review.

## Audit scope

Reviewed areas:

- Root README and root governance/style files.
- Main docs index.
- Architecture section.
- Documentation section.
- Developer section and Source Atlas.
- Verification queue.
- Exchange section.
- Ecosystem section.
- Mining, wallets, nodes, research, discussion, and history section indexes.
- Current documentation coverage dashboard.
- Current project status dashboard.

## Overall assessment

MoreBC2 has a strong foundation and has reached the point where a broader cleanup pass makes sense.

The strongest parts are:

- Clear mission and editorial philosophy.
- Strong separation between documentation, research, discussion, history, and ecosystem tracking.
- Conservative verification language.
- Growing Source Atlas tied to reviewed code paths.
- Architecture explainers that are easier to read than raw source notes.
- RPC overview with first-pass source review of mining, blockchain, raw transaction, mempool/broadcast, and wallet command groups.
- Wallet guide with source-backed notes across startup, address, backup/import, spend/PSBT, encryption, balances, and transaction history.

The weakest parts are now:

- Top-level polish.
- Centralized open-question cleanup.
- Section README consistency.
- Command examples that are intentionally untested.
- Release verification against real release artifacts.
- Ecosystem/explorer/exchange checks from direct current sources.

## Critical findings

### 1. Project dashboard exists but needs current polish

Before the first audit, readers had to infer the project state from many separate files.

Fix status:

- Added `PROJECT_STATUS.md`.
- Refreshed it for the current Source Atlas/RPC/wallet coverage.

Remaining work:

- Keep this page aligned with `docs/documentation-coverage.md` during polish.

### 2. Documentation coverage dashboard exists

Before the first audit, the repository needed one page showing which areas had been reviewed, partially reviewed, or not started.

Fix status:

- Added `docs/documentation-coverage.md`.
- Expanded it repeatedly as new Source Atlas pages were added.

Remaining work:

- Reconcile it after each major polish batch.
- Keep priority order realistic rather than letting old tasks linger after completion.

### 3. Developer reading order exists

New contributors needed a guided path through architecture, Source Atlas, and verification rules.

Fix status:

- Added `docs/developers/reading-order.md`.

Remaining work:

- Refresh the reading order after the broad polish pass so it reflects current RPC and wallet coverage.

### 4. Open questions are still spread across many pages

Many pages contain local open questions. That is useful, but the project also needs a central backlog that reduces duplication.

Fix status:

- Added `docs/verification/open-questions.md`.

Remaining work:

- Consolidate repeated open questions from Source Atlas pages, architecture pages, and user-operation pages.
- Mark which questions block invite-only review versus public launch.

## High-priority findings

### Section README consistency

Some section README files are strong and current, especially:

- `docs/architecture/README.md`
- `docs/configuration/README.md`
- `docs/developers/README.md`
- `docs/developers/source-atlas/README.md`
- `docs/ecosystem/README.md`

Some are still thinner and should be normalized during polish:

- `docs/mining/README.md`
- `docs/wallets/README.md`
- `docs/nodes/README.md`
- `docs/research/README.md`
- `docs/history/README.md`
- `docs/discussion/README.md`

Recommendation:

Every section README should include:

- Category/status/date block when appropriate.
- Summary.
- Current pages.
- Planned pages.
- Rules.
- Verification block.

### Architecture section is ahead of some navigation

Architecture pages are substantial enough to be part of the recommended reading path.

Fix status:

- Added reading order.
- Added repository map and source tree guide.
- Added more cross-links from Source Atlas pages.

Remaining work:

- Refresh root README and docs index around the current architecture/source coverage.
- Check whether architecture pages duplicate or drift from Source Atlas pages.

### Source Atlas needs periodic coverage indexing

The Source Atlas index now lists many current pages, but coverage status belongs in the dedicated coverage dashboard, not the atlas index.

Fix status:

- Added and expanded `docs/documentation-coverage.md`.

Remaining work:

- Keep Source Atlas index simple.
- Keep detailed coverage status in the dashboard.

## Medium-priority findings

### Terminology

Preferred terms should be:

- `Block lifecycle` for high-level architecture.
- `Block acceptance` for source-level implementation path.
- `Mempool acceptance` or `transaction acceptance` depending on context.
- `Source Atlas` for file-by-file implementation notes.
- `Architecture` for conceptual flow pages.
- `Raw transaction RPC` for `src/rpc/rawtransaction.cpp`.
- `Mempool and broadcast RPC` for `src/rpc/mempool.cpp`.

### Duplication

There is expected overlap between architecture pages and Source Atlas pages.

Current duplication is acceptable because:

- Architecture explains why and how to think about the flow.
- Source Atlas explains where behavior is implemented.

Future risk:

- If both layers keep expanding without rules, they may drift.

Recommended fix:

- During polish, ensure architecture pages summarize and Source Atlas pages anchor implementation.
- Avoid adding new implementation detail to architecture pages unless it points back to a Source Atlas page.

### Verification block normalization

Most technical pages include a verification block, but older section README files and some framework pages may not use the newer format.

Recommended fix:

- Normalize section READMEs during the broad cleanup pass.
- Do not mark command examples Verified until commands have been run locally.

## Low-priority findings

### Diagrams

Text diagrams are useful and consistent enough for now.

Later, the project could add SVG diagrams, but that should wait until structure stabilizes.

### Page naming

Current names are mostly fine. Avoid large renames until public launch planning, because renames can make the audit harder to follow.

Small naming cleanup is acceptable when it reduces confusion, but avoid churn.

## Launch-readiness assessment

### Private development

Ready.

### Invite-only review

Getting close after the broad polish pass.

Before invite-only review, finish:

- Root README refresh.
- Docs index refresh.
- Documentation coverage reconciliation.
- Open-question consolidation.
- Section README normalization.
- One pass over Source Atlas links and verification blocks.

### Public launch

Not ready yet.

Reasons:

- Public contribution workflow and license posture should be decided first.
- Release verification needs real artifact checks.
- Ecosystem/explorer/exchange pages need direct current checks.
- Command examples should be tested or clearly separated as untested.
- Core technical claims should get at least one outside review.

## Recommended next tasks

1. Refresh root README and docs README around current coverage.
2. Normalize thin section README files.
3. Reconcile `docs/documentation-coverage.md` with current Source Atlas pages.
4. Consolidate repeated open questions into `docs/verification/open-questions.md`.
5. Run a cross-link pass from architecture pages to Source Atlas pages.
6. Separate untested command examples from future verified examples.
7. After polish, choose the next source-backed work stream: release verification, explorer/API framework, network RPC, or wallet internals.

## Verification

**Status:** Draft
**Primary sources checked:** Repository files listed in audit scope
**Notes:** This is a project-maintenance audit. It does not verify BitcoinII protocol behavior.
