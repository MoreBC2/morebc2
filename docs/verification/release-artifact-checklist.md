# Release artifact checklist

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page defines the next release-artifact verification checklist for BitcoinII Core.

It is a working checklist, not a completed verification record.

MoreBC2 has not downloaded release binaries, calculated independent hashes, or verified checksum/signature files.

## Target release

Current target release for this checklist:

- Repository: `Bitcoin-II/BitcoinII-Core`
- Release tag: `v29.1.0`
- Release title observed: `BitcoinII Core v29.1.0`
- Release commit observed: `3f2a352467750425ec28abe3505a5db5bbc5fa35`

## Evidence buckets

Keep these buckets separate when updating this page:

| Bucket | Meaning | Current status |
|---|---|---|
| Release page observed | GitHub release page was viewed and basic fields were recorded. | Partial |
| Asset inventory observed | Full release asset names, sizes, and URLs captured. | Needs Review |
| Source comparison observed | Source refs compared against current `main`. | Partial |
| Checksum/manifest observed | Checksum file or manifest found on release page. | Needs Review |
| Signature observed | Signature file found for manifest or assets. | Needs Review |
| Trusted key identified | BitcoinII-trusted release key source identified. | Needs Review |
| Hash calculated | MoreBC2 independently calculated a downloaded asset hash. | Not done |
| Signature checked | MoreBC2 verified a signature with a trusted key. | Not done |
| Binary verified | Downloaded binary tied to signed checksum/key process. | Not done |

Do not collapse these buckets into one generic "release verified" claim.

## Artifact inventory status

| Item | Status | Notes |
|---|---|---|
| Full release asset names | Needs Review | GitHub rendered page showed 12 assets, but MoreBC2 has not captured the full asset list. |
| Asset sizes | Needs Review | Not captured. |
| Asset download URLs | Needs Review | Not captured. |
| Source archive names | Needs Review | GitHub-generated source archives likely exist, but final release asset names still need capture. |
| Windows GUI asset | Needs Review | Not confirmed for `v29.1.0`. |
| Windows CLI asset | Needs Review | Not confirmed for `v29.1.0`. |
| Linux GUI assets | Needs Review | Not confirmed for `v29.1.0`. |
| Linux CLI assets | Needs Review | Not confirmed for `v29.1.0`. |
| macOS GUI assets | Partial | A post-release workflow exists for a macOS arm64 DMG artifact, but this does not prove it is attached to the release page. |
| macOS CLI assets | Needs Review | Not confirmed for `v29.1.0`. |
| Checksum manifest | Needs Review | Not confirmed on the release page. |
| Manifest signature | Needs Review | Not confirmed on the release page. |
| Trusted release key list | Needs Review | Not confirmed. |

## Workflow observation

MoreBC2 found a workflow on `main` named `macOS arm64 .dmg (v29.1.0, CMake)`.

Observed workflow behavior:

- It is manually triggered with `workflow_dispatch`.
- It sets `TARGET_TAG: v29.1.0`.
- It checks out the release tag before building.
- It installs dependencies through Homebrew.
- It configures a Release build with GUI, wallet, BDB, ZMQ, and QR encode support.
- It builds `bitcoinII-qt` or falls back to building all targets.
- It creates `BitcoinII-Qt.app`.
- It uses `macdeployqt` to create a DMG.
- It uploads a workflow artifact named `bitcoinII-core-v29.1.0-macos-arm64-dmg`.

Important caveat:

A workflow artifact is not the same as a verified release asset. It still needs release-page confirmation, hash calculation, and any available signature or checksum verification.

## Release process source observation

The source tree contains `doc/release-process.md`.

Relevant source-observed release-process notes include:

- The process describes creating a signed git tag through a maintainer-tool workflow.
- It describes Guix builds and builder attestations.
- It references non-codesigned and codesigned `SHA256SUMS` files and `.asc` signature files.
- It says multiple matching Guix builds should be combined into `SHA256SUMS.asc`.
- It says release outputs, `SHA256SUMS`, and `SHA256SUMS.asc` are uploaded as release materials in that process.

Important caveat:

The release-process document appears to be inherited/adapted from Bitcoin Core-style release procedures. MoreBC2 should not assume that the current BitcoinII `v29.1.0` GitHub release actually followed every step until the actual release assets and signatures are checked.

## Minimum acceptable release-asset record

For each release asset, a future verification record should include:

| Field | Required before saying checked? |
|---|---|
| Release URL | Yes |
| Asset name | Yes |
| Asset size | Yes |
| Asset URL captured | Yes |
| Download date | Yes, if downloaded |
| Download method | Yes, if downloaded |
| Calculated SHA256 | Yes, if hash checked |
| Checksum manifest name | Yes, if manifest exists |
| Manifest entry matched | Yes, if manifest exists |
| Signature file name | Yes, if signature exists |
| Signature verification command | Yes, if signature checked |
| Trusted key source | Yes, if signature checked |
| Pass/fail status | Yes, after checks |
| Notes and gaps | Always |

## Artifact verification steps to perform

For `v29.1.0`, a future verifier should:

1. Capture the complete GitHub release asset list.
2. Record each asset name, size, and download URL.
3. Identify whether `SHA256SUMS` exists.
4. Identify whether `SHA256SUMS.asc` or another signature file exists.
5. Identify any detached signature files for individual assets, if present.
6. Identify which signing key or keys are trusted by the BitcoinII project.
7. Download at least one release asset in a safe environment.
8. Calculate SHA256 for the downloaded asset.
9. Compare the calculated hash to the checksum manifest if one exists.
10. Verify the manifest signature if one exists.
11. Record all commands and results in a local test record.

## Suggested asset table

Fill this in during the next verification pass.

| Asset name | Size | Platform | Type | URL captured | Downloaded | SHA256 calculated | In manifest | Signature checked | Status |
|---|---:|---|---|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | No | No | No | Needs Review | Needs Review | Needs Review |

## Suggested command record

```md
### Release artifact check: BitcoinII Core v29.1.0 / asset name

**Date tested:** YYYY-MM-DD
**Tester:**
**Operating system:**
**Release URL:**
**Asset name:**
**Asset size:**
**Download method:**
**Calculated SHA256:**
**Checksum manifest found:** yes / no
**Manifest entry matched:** yes / no / not applicable
**Signature file found:** yes / no
**Signature verification command:**
**Signature verification result:**
**Trusted key source:**
**Pass/fail:**
**Notes:**
```

## What not to claim yet

Do not claim yet that:

- `v29.1.0` binaries are verified.
- `v29.1.0` assets have a signed checksum manifest.
- `v29.1.0` assets are exchange-grade verified.
- A GitHub workflow artifact is equivalent to a release asset.
- A GitHub verified commit marker verifies downloaded release binaries.
- Source comparison proves release binaries match source.
- The current release process fully follows the inherited source-tree release-process document.

## Related pages

- [BitcoinII releases](../documentation/releases.md)
- [Release verification guide](../developers/release-verification.md)
- [Release source comparison notes](release-source-comparison.md)
- [Network release comparison](network-release-comparison.md)
- [Command testing status](command-testing.md)
- [Open questions backlog](open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This checklist is based on current release-page observations, the macOS arm64 workflow, the source-tree release process document, and current release verification docs. No release binaries have been downloaded or verified.
