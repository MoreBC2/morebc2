# Review feedback buckets

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page defines suggested feedback buckets for MoreBC2 private review.

Use these buckets for issues, review comments, handoff notes, or agent assignments.

The goal is to keep feedback narrow, actionable, and evidence-oriented.

## Suggested buckets

### `source-mismatch`

Use when a page appears to disagree with a cited source file, release tag, official page, or direct check.

Good note format:

```md
Page:
Claim:
Source checked:
Mismatch:
Suggested fix:
```

### `stale-link`

Use when a link is broken, redirected unexpectedly, points to the wrong repository path, or should be replaced with a better current source.

Good note format:

```md
Page:
Current link:
Observed problem:
Suggested replacement:
Date checked:
```

### `unclear-status`

Use when a page's Draft, Framework, Partial, Reviewed, Needs Review, or Verified status is unclear or too confident.

Good note format:

```md
Page:
Current status:
Why unclear:
Suggested status:
```

### `unsupported-claim`

Use when a claim sounds factual but has no source, no test record, or no direct check.

Good note format:

```md
Page:
Claim:
Why unsupported:
Needed evidence:
```

### `missing-source`

Use when a page is broadly correct but needs a stronger source link or source note.

Good note format:

```md
Page:
Section:
Source needed:
Possible source:
```

### `command-not-tested`

Use when a command example appears without clear untested labeling or without a record in the command tracker.

Good note format:

```md
Page:
Command:
Issue:
Should link to: docs/verification/command-testing.md
```

### `ecosystem-needs-check`

Use for explorers, APIs, pools, exchanges, wallets, tools, or services that need direct current checking.

Good note format:

```md
Resource:
URL:
What to check:
Date checked:
Status observed:
Evidence level:
```

### `release-verification`

Use for release assets, hashes, manifests, signatures, release tags, or trusted key questions.

Good note format:

```md
Release:
Asset or source:
Question:
Evidence checked:
Next step:
```

### `wording-polish`

Use for clarity, tone, duplication, confusing phrasing, or overlong text.

Do not use this bucket to change technical meaning without a source check.

### `navigation-crosslink`

Use when a page needs better links to related docs, Source Atlas pages, verification pages, or glossary entries.

Good note format:

```md
Page:
Missing link:
Why useful:
Suggested target:
```

### `open-question`

Use when an unresolved item should be added to the central backlog.

Target page:

- [Open questions backlog](open-questions.md)

### `good-first-review`

Use for small review tasks that a new reviewer or agent can safely handle.

Examples:

- Check one source link.
- Check one command example label.
- Check one page's verification block.
- Check one ecosystem URL.
- Check one cross-link.

## Assignment rules

Keep assignments narrow.

Good:

- Review `docs/architecture/life-of-a-block.md` for stale links only.
- Check `docs/developers/source-atlas/pow-cpp.md` against `src/pow.cpp` at `v29.1.0` only.
- Search for untested `bitcoinII-cli` examples only.

Avoid:

- Review all docs.
- Rewrite the wallet guide.
- Make the repo public-ready.
- Verify all ecosystem resources.

## Priority before private review

Before inviting new reviewers, prioritize:

1. `unsupported-claim`
2. `command-not-tested`
3. `stale-link`
4. `unclear-status`
5. `source-mismatch`
6. `navigation-crosslink`
7. `wording-polish`

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 contribution guide, review handoff, command tracker, and verification queue
**Notes:** This page defines feedback organization for private review. It does not verify BitcoinII protocol behavior.
