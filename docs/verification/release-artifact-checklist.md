# Release artifact checklist

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-07

## Summary

This page preserves the checklist and completed procedure details for the historical BitcoinII Core `v29.1.0` artifact audit. Apply the same evidence buckets to `v31.1.0`, but record new results separately rather than overwriting the historical values below.

It is a working checklist. The download-and-hash portion was completed in the [dated release-artifact authentication record](release-artifact-authentication-2026-08-27.md); the authentication chain remains incomplete.

MoreBC2 downloaded and independently hashed all 10 uploaded release assets and both generated source archives for `v29.1.0`. No publisher checksum/signature chain was found. The current `v31.1.0` release has a metadata record, but equivalent independent authentication work remains open.

## Current target

- Release tag: `v31.1.0`
- Current metadata: [v31.1.0 asset record](../releases/v31.1.0-assets.md)
- Next work: independent hashes, checksum/signature path, tag/commit review, trusted-key guidance, and reproducibility evidence if available

## Historical target recorded below

The completed table and observations below apply to:

- Repository: `Bitcoin-II/BitcoinII-Core`
- Release tag: `v29.1.0`
- Release title observed: `BitcoinII Core v29.1.0`
- Release commit observed: `3f2a352467750425ec28abe3505a5db5bbc5fa35`
- GitHub API published_at observed: `2025-11-27T04:22:39Z`

## Evidence buckets

Keep these buckets separate when updating this page:

| Bucket | Meaning | Current status |
|---|---|---|
| Release page/API observed | GitHub release page and API metadata were viewed and basic fields were recorded. | Partial |
| Uploaded asset inventory observed | Uploaded release asset names, sizes, and URLs captured from GitHub API metadata. | Partial |
| Source comparison observed | Source refs compared against current `main`. | Partial |
| Checksum/manifest observed | Checksum file or manifest found on release page or another official source. | Not found in checked public locations |
| Signature observed | Signature file found for manifest or assets. | Not found in checked public locations |
| Trusted key identified | BitcoinII-trusted release key source identified. | Not established |
| Hash calculated | MoreBC2 independently calculated a downloaded asset hash. | Complete for all 12 release-page downloads |
| Signature checked | MoreBC2 verified a signature with a trusted BitcoinII release key. | Not possible; no release signature/key chain found |
| Binary verified | Downloaded binary tied to signed checksum/key process. | Not done |

Do not collapse these buckets into one generic "release verified" claim.

## Artifact inventory status

| Item | Status | Notes |
|---|---|---|
| Full uploaded release asset names | Partial | GitHub API reports 10 uploaded assets and names are now captured. |
| Uploaded asset sizes | Partial | Captured from GitHub API metadata. |
| Uploaded asset download URLs | Partial | Captured by Codex report from GitHub API metadata. |
| Source archive names | Partial | Two GitHub-generated source archives were listed separately and independently hashed. |
| Windows GUI asset | Partial | `BitcoinII-29.1.0-x86_64-win64-GUI.zip` observed by API metadata. |
| Windows CLI asset | Partial | `BitcoinII-29.1.0-x86_64-win64-CLI.zip` observed by API metadata. |
| Linux GUI assets | Partial | aarch64, arm gnueabihf, and x86_64 Linux GUI archives observed by API metadata. |
| Linux CLI assets | Partial | aarch64, arm gnueabihf, and x86_64 Linux CLI archives observed by API metadata. |
| macOS assets | Partial | arm64 and x86_64 apple-darwin zip archives observed by API metadata. CLI/GUI split is not explicit in the filename. |
| Checksum manifest | Not found | No publisher manifest was found in the release, downloaded archives, canonical repository review, or obvious public signature-repository paths. |
| Manifest signature | Not found | No detached release signature was found in the checked public locations. |
| Trusted release key list | Not established | The GitHub web-flow key signs source commit data; it is not a BitcoinII release key. |

## Uploaded asset table

| Asset name | Size bytes | Platform | Type | Downloaded | SHA256 calculated | In manifest | Signature checked | Status |
|---|---:|---|---|---|---|---|---|---|
| `BitcoinII-29.1.0-aarch64-linux-CLI.tar.gz` | 7,313,922 | Linux aarch64 | CLI archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-aarch64-linux-GUI.tar.gz` | 19,831,620 | Linux aarch64 | GUI archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-arm-linux-gnueabihf-CLI.tar.gz` | 6,820,132 | Linux arm gnueabihf | CLI archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-arm-linux-gnueabihf-GUI.tar.gz` | 17,911,678 | Linux arm gnueabihf | GUI archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-arm64-apple-darwin.zip` | 15,810,838 | macOS arm64 | Archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-x86_64-apple-darwin.zip` | 17,133,023 | macOS x86_64 | Archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-x86_64-linux-CLI.tar.gz` | 7,812,863 | Linux x86_64 | CLI archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-x86_64-linux-GUI.tar.gz` | 20,480,068 | Linux x86_64 | GUI archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-x86_64-win64-CLI.zip` | 7,987,528 | Windows x86_64 | CLI archive | Yes | Yes | Not found | Not available | Integrity recorded |
| `BitcoinII-29.1.0-x86_64-win64-GUI.zip` | 19,362,931 | Windows x86_64 | GUI archive | Yes | Yes | Not found | Not available | Integrity recorded |

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

The release-process document appears to be inherited/adapted from Bitcoin Core-style release procedures. MoreBC2 should not assume that the historical BitcoinII `v29.1.0` GitHub release followed every step; the same caution applies independently to `v31.1.0`.

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

For `v29.1.0`, the remaining verifier work is to:

1. Obtain a publisher checksum manifest or another authenticated expected-value source.
2. Obtain a detached signature or equivalent authentication binding for the artifacts.
3. Identify a BitcoinII-controlled release signing key and documented fingerprint trust path.
4. Verify the manifest or artifact signature if one becomes available.
5. Obtain public builder attestations or perform independent reproducible builds if the project adopts that path.
6. Compare the recorded local hashes against any future authenticated expected values.

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
- GitHub API digest fields are independent MoreBC2 hash checks.
- Source comparison proves release binaries match source.
- The current release process fully follows the inherited source-tree release-process document.

## Related pages

- [BitcoinII releases](../documentation/releases.md)
- [Release verification guide](../developers/release-verification.md)
- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Release source comparison notes](release-source-comparison.md)
- [Network release comparison](network-release-comparison.md)
- [Command testing status](command-testing.md)
- [Open questions backlog](open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** The detailed tables preserve the 2026-08-27 `v29.1.0` download-and-hash work. `v31.1.0` is the current target and still needs a separate independent authentication record.
