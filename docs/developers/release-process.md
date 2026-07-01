# Release process guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page documents what MoreBC2 has observed about public BitcoinII Core release information.

It does not claim to know internal maintainer procedures.

It also does not prove any release download. Download checks are tracked separately in [Release verification guide](release-verification.md), [Release source comparison notes](../verification/release-source-comparison.md), and [Release artifact checklist](../verification/release-artifact-checklist.md).

## Current observed release path

Current observed public release path:

- `https://github.com/Bitcoin-II/BitcoinII-Core/releases`

Older release links such as `https://github.com/BitcoinII-Dev/BitcoinII/releases` may redirect elsewhere and should be treated as legacy observations until the canonical source and release path are confirmed.

## What is known from current review

The current observed release page shows:

- `BitcoinII Core v29.1.0`
- tag `v29.1.0`
- release commit observed as `3f2a352467750425ec28abe3505a5db5bbc5fa35`
- release note stating the release is mandatory and previous v29 releases are deprecated
- 12 assets shown by the release page view, but MoreBC2 has not captured the complete asset list

MoreBC2 also observed legacy release-page entries for:

- `v0.27.1`
- `v0.27.0`

Those legacy observations should not be treated as the current canonical release path until maintainers or official project material confirm the path.

## Source-tree process documents observed

Current source-tree review found:

- `doc/release-process.md`
- `contrib/verify-binaries/README.md`

These files describe a release-checking workflow with tags, build attestations, checksum files, and key-based authenticity checks.

Important caveat:

Source-tree process documents are useful evidence about intended or inherited process shape, but they do not prove that the current BitcoinII `v29.1.0` release actually published all related release-check materials.

## Release information still to document

This page should eventually answer:

- Which repository path is canonical?
- Where are official releases published?
- Which assets are published for each platform?
- Are checksum files provided?
- Are release authenticity files provided?
- Are release tags independently checkable?
- Are builds reproducible?
- How should users verify downloads?
- How should exchanges verify daemon binaries?

## What this page does not claim

This page does not claim:

- That current release assets have completed independent download checks.
- That checksum manifests exist for the current release.
- That builds are reproducible.
- That GitHub release metadata alone is sufficient for exchange-grade verification.
- That workflow artifacts are attached to the public release page.
- That `Bitcoin-II/BitcoinII-Core` is final canonical path without maintainer or official-source confirmation.

Those claims need direct review.

## Open items

- Confirm canonical repository and release path.
- Capture full `v29.1.0` asset list.
- Check whether checksum files are published.
- Check whether release authenticity files are published.
- Check whether release tags are independently checkable.
- Check for reproducible build documentation.
- Ask maintainers for preferred release checking process if public sources are incomplete.

## Sources

- Current observed BitcoinII Core releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- [Release verification guide](release-verification.md)
- [Release source comparison notes](../verification/release-source-comparison.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Release-page observations and source-tree process files have been reviewed at a high level. Release download checking workflow, asset list, checksums, authenticity files, and trusted keys are not yet confirmed.
