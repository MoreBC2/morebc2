# Documentation polish plan

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page defines the next broad cleanup pass for MoreBC2.

The repository now has enough source-backed material that the next useful phase is not more isolated page creation. The next useful phase is navigation, consistency, cross-linking, and trust cleanup.

This is not BitcoinII protocol documentation. It is a project-maintenance plan for the MoreBC2 documentation repo.

## Goal

Prepare MoreBC2 for a cleaner private-review draft by making the existing material easier to navigate and harder to misread.

The polish pass should:

- Improve top-level navigation.
- Keep source-backed claims tied to source review pages.
- Make Draft/Partial/Reviewed/Verified status language consistent.
- Reduce stale TODO wording.
- Consolidate repeated open questions.
- Separate untested command examples from verified examples.
- Keep ecosystem and service pages conservative until directly checked.

## Non-goals

This pass should not:

- Mark command examples Verified without local testing.
- Claim active exchanges, explorers, wallets, or pools without direct current checks.
- Add speculative BitcoinII claims to user-facing docs.
- Rename large sections unnecessarily.
- Merge research/discussion pages into documentation pages.
- Turn Source Atlas pages into beginner guides.

## Priority 1: top-level navigation

Files to review first:

- `README.md`
- `docs/README.md`
- `PROJECT_STATUS.md`
- `docs/AUDIT.md`
- `docs/documentation-coverage.md`

Tasks:

- Make the root README reflect current coverage.
- Make the docs index point readers to the best starting pages.
- Ensure status, audit, and coverage pages agree with each other.
- Add a clear reader path for private reviewers.
- Keep public-launch language conservative.

## Priority 2: section README normalization

Files to check:

- `docs/architecture/README.md`
- `docs/developers/README.md`
- `docs/documentation/README.md`
- `docs/exchange/README.md`
- `docs/ecosystem/README.md`
- `docs/mining/README.md`
- `docs/wallets/README.md`
- `docs/nodes/README.md`
- `docs/research/README.md`
- `docs/discussion/README.md`
- `docs/history/README.md`
- `docs/verification/README.md`

Target shape:

- Category/status/date block where useful.
- Summary.
- Current pages.
- Planned pages or open work.
- Rules for the section.
- Verification block.

## Priority 3: architecture and Source Atlas consistency

Architecture pages should explain concepts and lifecycle flow.

Source Atlas pages should anchor implementation details to reviewed files.

Tasks:

- Check architecture pages for implementation claims that need Source Atlas links.
- Check Source Atlas pages for user-guide language that belongs elsewhere.
- Make sure lifecycle pages link to the newest RPC and wallet Source Atlas pages when relevant.
- Avoid duplicate deep explanations across both layers.

## Priority 4: RPC and command-example safety

RPC pages now include first-pass source reviews for major command groups.

Tasks:

- Clearly label all example commands as untested unless locally run.
- Keep live send/broadcast commands separate from read-only commands.
- Keep private-key, passphrase, and wallet-moving commands out of beginner docs unless heavily caveated.
- Create a future test-record table for commands that are eventually run locally.

## Priority 5: open-question consolidation

Files to check:

- `docs/verification/open-questions.md`
- `docs/documentation-coverage.md`
- Source Atlas pages
- architecture pages
- wallet/mining/RPC pages

Tasks:

- Move repeated local questions into the central backlog.
- Keep page-local questions only when they help the reader understand that exact page.
- Mark questions as one of:
  - blocks private review
  - blocks public launch
  - good future improvement
  - research/speculation only

## Priority 6: glossary and terminology pass

Files to check:

- `GLOSSARY.md`
- `docs/encyclopedia/developer-glossary.md`
- architecture pages
- Source Atlas pages

Tasks:

- Add missing terms discovered during RPC and wallet review.
- Cross-link terms only where it improves understanding.
- Keep glossary definitions short enough to stay useful.
- Avoid turning glossary entries into mini source reviews.

## Priority 7: next work-stream decision

After polish, choose the next source-backed work stream.

Good candidates:

- Release artifact verification.
- Explorer/API documentation framework.
- Network RPC source review.
- P2P/network source review.
- Wallet internals and database behavior.
- Local command smoke-test records.

Suggested next choice after polish:

1. Release artifact verification if public trust is the priority.
2. Explorer/API framework if service integration is the priority.
3. Local command smoke-test records if user/operator docs are the priority.
4. Network/P2P source review if architecture completeness is the priority.

## Definition of done for polish pass

The broad polish pass is good enough when:

- Root README gives a clear current map of the project.
- `docs/README.md` points to the right first pages.
- `PROJECT_STATUS.md`, `docs/AUDIT.md`, and `docs/documentation-coverage.md` agree.
- Section READMEs have consistent structure.
- Newer Source Atlas pages are discoverable from navigation pages.
- Untested examples are not presented as verified instructions.
- Central open questions are easier to scan.
- Public-launch blockers are clearly separated from private-review blockers.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 documentation structure
**Notes:** This plan is for documentation maintenance only. It does not verify BitcoinII protocol behavior or current ecosystem status.
