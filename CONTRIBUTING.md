# Contributing to MoreBC2

**Status:** Draft public contribution workflow; license decision pending
**Last reviewed:** 2026-09-07

## Summary

MoreBC2 is an independently maintained, source-backed documentation project for BitcoinII (BC2). This guide is intended for reviewers and contributors preparing focused issues and pull requests.

## Current contribution posture

Until the owner adds a repository license:

- Do not assume permission to copy, redistribute, or reuse repository content.
- Do not publish MoreBC2 pages as official BitcoinII documentation.
- Do not imply that Draft, Partial, or Needs Review pages are final.
- Do not upgrade claims from memory or community assumption.
- Keep contributions narrow enough for factual, licensing, and provenance review.

## Core rule

Document what is verified.

Clearly label what is not verified.

Do not make uncertain material sound more certain than the evidence supports.

## Repository workflow

Use a short-lived branch for each focused change. Changes should normally enter `main` through a pull request rather than a direct push.

The preferred review flow is:

1. Keep the branch and pull request limited to one understandable purpose.
2. Complete the relevant checks in this guide and record the validation in the pull request.
3. Ask a reviewer to check substantive changes. Authors should not approve their own substantive work.
4. Verify factual and technical claims against the cited evidence; a formatting-only review is not enough for those claims.
5. Involve `@MoreBC2/maintainers` when a change affects repository administration, dependencies, validation, build behavior, deployment behavior, or other workflow-sensitive paths.
6. Merge only after the requested review and validation are complete.

The `contributors`, `reviewers`, and `maintainers` teams provide the repository access needed for these roles. Contributors do not need organization Owner access.

GitHub does not currently enable CODEOWNERS or enforce the preferred `main` protections for this private repository on the organization's current plan. The CODEOWNERS file records the intended ownership model, but GitHub will not automatically request those teams or require their approval under the current plan. The pull-request and review steps above are project policy even where the GitHub interface cannot require them. They are intended to remain the same if CODEOWNERS and enforceable branch protections or rulesets become available later.

## Repository safety and privacy

Do not commit secrets, API tokens, passwords, private keys, seed phrases, personal information, or unnecessary personal data. Use redacted examples and safe test data. If sensitive material is exposed, stop sharing it and notify a maintainer privately so the affected credential or data can be handled appropriately.

Preserve MoreBC2's existing status vocabulary, evidence scale, sourcing standards, and verification blocks. Do not weaken an uncertainty label or strengthen a claim merely to make a change appear complete.

## Evidence expectations

When adding or changing a factual claim, identify the evidence source.

Preferred evidence types:

- Current BitcoinII source code.
- Release tag source code.
- Official project website or repository.
- Current release asset or release page.
- Local command test record.
- Direct ecosystem check with date.
- Maintainer statement, clearly attributed.
- Archived historical source for historical claims.

Do not use memory alone as evidence.

## Status labels

Use existing page status labels conservatively:

- **Draft** — useful structure exists, but not ready to rely on.
- **Framework** — mostly structure, placeholders, or checklist material.
- **Partial** — some source-backed material exists, but review is incomplete.
- **Reviewed** — a meaningful first-pass review exists.
- **Needs Review** — important material still needs checking.
- **Verified** — only use when evidence is strong and current.

Do not mark a page Verified without explicit review and a verification block that explains why.

## Page verification blocks

Most pages should end with:

```md
## Verification

**Status:** Draft / Framework / Partial / Reviewed / Needs Review / Verified
**Primary sources checked:** ...
**Notes:** ...
```

If a page is only a framework, say so.

If command examples are untested, say so.

If ecosystem links are not directly checked, say so.

## Command examples

Command examples are not verified unless they have a test record.

Before adding or promoting a command example, check:

- [Command testing status](docs/verification/command-testing.md)

A tested command record should include:

- Date tested.
- Operating system.
- BitcoinII Core version, release, branch, or commit.
- Network mode.
- Node or wallet state.
- Command entered.
- Expected result.
- Actual result.
- Pass/fail.
- Notes.

Do not add wallet-moving, sensitive, or live submission examples to beginner docs.

## Release claims

Release claims must stay conservative.

Before claiming a release artifact is verified, check:

- [Release verification guide](docs/developers/release-verification.md)
- [Release source comparison notes](docs/verification/release-source-comparison.md)
- [Release artifact checklist](docs/verification/release-artifact-checklist.md)

Do not claim that a binary is verified unless hashes and available signatures have been checked.

A GitHub release asset existing is not the same as a verified binary.

A workflow artifact is not the same as a release asset unless it is confirmed on the release page.

## Ecosystem claims

Do not list explorers, APIs, pools, exchanges, wallets, tools, or services as active unless they have been directly checked.

Every ecosystem listing should include:

- Status.
- URL.
- Last checked date.
- Evidence level.
- Notes.

Do not call a resource official unless an official source says so.

## Source review workflow

When reviewing source:

1. Name the repository.
2. Name the ref: branch, tag, or commit.
3. Name the file path.
4. Describe only what was actually checked.
5. Avoid broad claims about unreviewed files.
6. Link related Source Atlas or architecture pages.
7. Add open questions for anything unresolved.

If a page is based on `main`, and a release tag differs, say so.

## Suggested feedback buckets

Use these buckets for issues, review notes, or private comments:

- `source-mismatch`
- `stale-link`
- `unclear-status`
- `unsupported-claim`
- `missing-source`
- `command-not-tested`
- `ecosystem-needs-check`
- `release-verification`
- `wording-polish`
- `navigation-crosslink`
- `open-question`
- `good-first-review`

## Good first contributions

Good first tasks are narrow:

- Fix a broken link.
- Add a missing related-page link.
- Mark an untested command as untested.
- Check one source-backed claim against one source file.
- Add a verification note to one page.
- Add one open question to the backlog.
- Review one explorer/API/pool/exchange listing with a direct date.

## Changes requiring extra review

Use a narrowly scoped proposal and maintainer review for:

- Rewriting many pages at once.
- Marking pages Verified.
- Adding install guides with copy/paste commands.
- Adding wallet movement or recovery guides.
- Adding active ecosystem listings without direct checks.
- Making repository-readiness or adoption claims.
- Changing consensus claims without source review.

## Pull request or review note checklist

Before submitting changes or review notes, ask:

- Did I keep Draft/Partial/Needs Review labels conservative?
- Did I separate current facts from research, discussion, and history?
- Did I avoid claiming untested commands are working instructions?
- Did I avoid claiming live services are active without direct checks?
- Did I link any unresolved issue to the verification queue?
- Did I avoid treating MoreBC2 as official BitcoinII documentation?

## Tone

Use plain, useful language. The site should help newcomers without talking down to experienced users.

## Naming standard

Use **BitcoinII** for the project name and **BC2** for the ticker. Avoid using **Bitcoin2** in MoreBC2 documentation unless quoting or documenting historical third-party usage.

## Related pages

- [Docs index](docs/README.md)
- [Owner review handoff](docs/REVIEW_HANDOFF.md)
- [Documentation coverage](docs/documentation-coverage.md)
- [Known unknowns](docs/verification/known-unknowns.md)
- [Open questions backlog](docs/verification/open-questions.md)
- [Command testing status](docs/verification/command-testing.md)
- [Release artifact checklist](docs/verification/release-artifact-checklist.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 project status, review handoff, verification queue, command tracker, and release tracker
**Notes:** This workflow remains Draft until the owner resolves the repository license and final public contribution terms.
