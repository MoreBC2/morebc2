# Release process guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-07

## Summary

This page documents what MoreBC2 has observed about public BitcoinII Core release information.

It does not claim to know internal maintainer procedures.

It also does not prove any release download. Download checks are tracked separately in [Release verification guide](release-verification.md), [Release source comparison notes](../verification/release-source-comparison.md), and [Release artifact checklist](../verification/release-artifact-checklist.md).

## Current observed release path

Current observed public release path:

- `https://github.com/Bitcoin-II/BitcoinII-Core/releases`

Older release links such as `https://github.com/BitcoinII-Dev/BitcoinII/releases` may redirect elsewhere and are retained only as legacy observations. Current operational release citations use the canonical `Bitcoin-II/BitcoinII-Core` path.

## What is known from current review

The current observed release page and MoreBC2 release record show:

- `BitcoinII Core v31.1.0`
- tag `v31.1.0`
- publication timestamp `2026-08-29T02:39:30Z`
- four uploaded Linux/Windows CLI/Qt assets recorded from GitHub release metadata
- GitHub-reported SHA-256 asset digests, which are hosting-provider metadata rather than publisher-signed authentication

MoreBC2 also observed legacy release-page entries for:

- `v0.27.1`
- `v0.27.0`

Those legacy observations are historical evidence and must not be treated as the current canonical release path.

## Source-tree process documents observed

Current source-tree review found:

- `doc/release-process.md`
- `contrib/verify-binaries/README.md`

These files describe a release-checking workflow with tags, build attestations, checksum files, and key-based authenticity checks.

Important caveat:

Source-tree process documents are useful evidence about intended or inherited process shape, but they do not prove that the current BitcoinII `v31.1.0` release published all related release-check materials.

## Release information still to document

This page should eventually answer:

- How should a future canonical-repository or release-path move be detected and recorded?
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
- That the current canonical path can never change ownership or location.

Those claims need direct review.

## Open items

- Monitor the canonical repository and release path for future changes.
- Independently hash the recorded `v31.1.0` asset set.
- Check whether checksum files are published.
- Check whether release authenticity files are published.
- Check whether release tags are independently checkable.
- Check for reproducible build documentation.
- Ask maintainers for preferred release checking process if public sources are incomplete.

## Sources

- Current observed BitcoinII Core releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- [Current v31.1.0 asset record](../releases/v31.1.0-assets.md)
- [Release verification guide](release-verification.md)
- [Release source comparison notes](../verification/release-source-comparison.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Current release metadata is synchronized to `v31.1.0`. Independent asset hashing, publisher checksums/signatures, reproducibility evidence, and trusted keys remain unresolved.
