# First review packet: release verification wording

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This is a ready-to-send packet for a narrow release-verification wording review.

It asks a reviewer to check that release docs do not overstate what MoreBC2 has actually checked.

## Reviewer goal

Check whether release-related docs clearly separate:

- release-page observations,
- source comparison,
- network source comparison,
- workflow artifact observation,
- release asset inventory,
- checksum or manifest evidence,
- signature evidence,
- trusted key evidence,
- local hash calculation,
- binary verification.

## Pages to review

Primary pages:

- `docs/documentation/releases.md`
- `docs/developers/release-verification.md`
- `docs/verification/release-artifact-checklist.md`
- `docs/verification/release-asset-inventory-attempt.md`
- `docs/verification/release-source-comparison.md`
- `docs/verification/network-release-comparison.md`

Secondary pages if time allows:

- `PROJECT_STATUS.md`
- `docs/documentation-coverage.md`
- `docs/verification/known-unknowns.md`
- `docs/verification/open-questions.md`

## Review rules

Please review only the assigned pages.

Do not:

- download release files,
- run binaries,
- calculate hashes unless separately assigned,
- mark release assets checked,
- infer a release timestamp year from partial rendered page text,
- treat GitHub's verified commit marker as binary verification,
- treat source comparison as proof that binaries match source,
- promote any release page to Verified.

## What to flag

Flag wording that implies any of the following without direct evidence:

- `v29.1.0` binaries are checked,
- release assets have a signed checksum manifest,
- a trusted BitcoinII release key is known,
- a workflow artifact is a release asset,
- GitHub verification proves binary authenticity,
- source comparison proves binary authenticity,
- legacy release asset names prove current release asset names,
- current release asset inventory is complete.

## Expected feedback format

Use this format:

```md
### Release wording review feedback

**Reviewer:**
**Date:**
**Pages reviewed:**

#### Finding 1

**Page:**
**Section or line:**
**Concern type:** overclaim / missing caveat / unclear source / binary verification confusion / release-path confusion / asset-inventory gap
**Current wording:**
**Suggested fix:**
**Severity:** blocker / medium / minor

#### Finding 2

...

### Overall recommendation

Ready for next review / Needs fixes first
```

## Copy/paste assignment note

```md
Please review only the assigned release-verification pages. Do not download files, run binaries, calculate hashes, or rewrite broadly.

Goal: flag wording that makes release assets sound more checked than they are.

Please especially check that GitHub release-page observations, source comparisons, workflow artifacts, asset inventory, checksums, signatures, trusted keys, local hash calculations, and binary verification remain clearly separate.

Please use the feedback format in `docs/verification/first-review-packet-release-wording.md`.
```

## Success criteria

This review is successful if it produces one of these outcomes:

- no blockers found and the reviewer says release wording is clear enough for private review,
- specific overclaims are flagged for softer wording,
- missing caveats are identified,
- release asset inventory gaps are confirmed and tracked.

## Related pages

- [Private review assignments](private-review-assignments.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Release verification guide](../developers/release-verification.md)
- [BitcoinII releases](../documentation/releases.md)
- [Stale wording scan](stale-wording-scan.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Private review assignments, release verification guide, release artifact checklist, release asset inventory attempt, release source comparison, network release comparison
**Notes:** This packet sets up a narrow private-review assignment. It is not a completed release verification.
