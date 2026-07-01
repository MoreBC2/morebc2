# Verification queue

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This section tracks claims, values, links, examples, and pages that need checking.

Use this section when something is important but not ready to become verified documentation.

Verification pages should help MoreBC2 keep uncertainty visible instead of hiding it inside confident-sounding docs.

## Main verification pages

- [Open questions backlog](open-questions.md)
- [Known unknowns](known-unknowns.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Command testing status](command-testing.md)
- [Release source comparison notes](release-source-comparison.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Documentation coverage](../documentation-coverage.md)

## How to use this queue

1. Write the claim or question clearly.
2. List possible sources.
3. Assign a current evidence level.
4. Decide whether it blocks private review, public launch, or only future polish.
5. Move verified results into the correct documentation page.
6. Leave a note explaining what changed.

For review notes, use [Review feedback buckets](review-feedback-buckets.md) to keep feedback narrow and actionable.

For command examples, also add or update a record in [Command testing status](command-testing.md).

For release checks, also update [Release source comparison notes](release-source-comparison.md) or [Release artifact checklist](release-artifact-checklist.md).

## Open verification items

### Canonical BitcoinII repository path

**Question:** Which GitHub path should MoreBC2 treat as the canonical public BitcoinII repository path?

**Current evidence:** Current release review observes `Bitcoin-II/BitcoinII-Core`, while older paths may redirect elsewhere.

**Needed source:** Maintainer confirmation or stable official project link.

**Status:** Needs Review

### Official ticker source

**Question:** What is the strongest primary source confirming `BC2` as the ticker?

**Current evidence:** Source-code comments and UI strings refer to BC2 units, and community usage is BC2.

**Needed source:** Official website, README, release note, or maintainer statement.

**Status:** Needs Review

### Release verification model

**Question:** How should users verify BitcoinII release downloads?

**Current evidence:** Source-tree verification and release-process docs describe checksum/signature style workflows, but current release assets and signatures still need direct checking.

**Needed source:** Release assets, checksum files, signatures, signed tags, trusted keys, or maintainer statement.

**Status:** Needs Review

### Recommended exchange confirmations

**Question:** What confirmation count should exchanges use for deposits and withdrawals?

**Needed source:** Maintainer recommendation, exchange integration note, or community-reviewed risk model.

**Status:** Needs Review

### Technical contact process

**Question:** How should exchanges, explorers, pools, or wallet developers contact BitcoinII maintainers for integration support?

**Needed source:** Official website, repository contact info, Discord maintainer statement, or project-maintained contact page.

**Status:** Needs Review

### Current explorer list

**Question:** Which explorers should MoreBC2 list as active and reliable?

**Needed source:** Direct explorer checks and community review.

**Status:** Needs Review

### Current mining pool list

**Question:** Which pools should MoreBC2 list as active?

**Needed source:** Direct pool checks and community review.

**Status:** Needs Review

### Command test records

**Question:** Which command examples have local test records?

**Needed source:** Local command records with environment details.

**Status:** Needs Review

## Rules

- Do not move an item out of verification until the evidence is strong enough for the target page.
- Keep current facts, historical facts, research ideas, and discussion proposals separate.
- Record the source type used: source code, release artifact, official website, archive, maintainer statement, local test, or current direct check.
- Command examples should remain unverified until run locally with environment details.
- Release artifact claims should remain unverified until assets, hashes, and any available signatures are checked directly.
- Ecosystem claims should remain unverified until checked directly and dated.

## Notes

The backlog page is now the preferred place to add larger cross-project verification questions. This README keeps the highest-priority legacy queue visible.

Items in this queue should not be treated as verified documentation until moved to the proper page with sources.

## Verification

**Status:** Draft
**Primary sources checked:** Current verification section structure
**Notes:** This section README tracks verification workflow, feedback buckets, command-test tracking, release-check tracking, and priority unknowns. It does not verify BitcoinII protocol behavior.
