# Release verification guide

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page defines how MoreBC2 should evaluate BitcoinII Core release artifacts.

It does not claim that BitcoinII releases currently provide every verification artifact listed here. It defines the standard MoreBC2 should use when checking releases and records the current gaps found so far.

For release-page observations, see [BitcoinII releases](../documentation/releases.md).

For the working artifact checklist, see [Release artifact checklist](../verification/release-artifact-checklist.md).

## Core idea

Release verification should prove that a downloaded binary matches what the project intended to publish.

For exchange and service integration, the strongest normal path is:

```text
release binary
  -> SHA256 hash
  -> checksum or manifest file
  -> signature over checksum or manifest
  -> trusted release key or signed tag
```

If any step is missing, document the gap clearly.

## Keep these evidence types separate

Do not combine these into a single broad "verified release" statement:

| Evidence type | What it can support | What it cannot support by itself |
|---|---|---|
| GitHub release page observed | Release exists at an observed path and has visible metadata. | Binary authenticity. |
| GitHub verified commit marker | GitHub says the commit was signed or verified in its UI. | Downloaded release asset verification. |
| Source comparison | Whether source files differ between refs. | Whether binaries were built from that source. |
| Workflow artifact | A workflow produced an artifact. | That the artifact is a release asset or safe for users. |
| Checksum file | A hash list exists. | Authenticity unless the checksum source is trusted. |
| Signed checksum file | A stronger authenticity path if the key is trusted. | Trust if the signing key source is unknown. |
| Locally calculated SHA256 | The downloaded file's hash. | Authenticity unless matched against trusted data. |

## Current finding

MoreBC2 rechecked the public GitHub release page on 2026-07-02 after private-review audit feedback flagged release-currentness and date wording.

Current observations:

- Observed release path: `https://github.com/Bitcoin-II/BitcoinII-Core/releases`.
- Observed release title: `BitcoinII Core v29.1.0`.
- The `v29.1.0` GitHub release page showed a `Latest` marker during the 2026-07-02 recheck.
- The rendered page showed release timestamp text as `27 Nov 04:22`, without a year in the visible unauthenticated HTML.
- The `v29.1.0` GitHub release page showed a GitHub verified commit marker and assets count during that pass.
- The source tree includes `contrib/verify-binaries/README.md`, which describes a checksum-and-signature model using `SHA256SUMS` and `SHA256SUMS.asc`.
- The source tree includes `doc/release-process.md`, which describes Guix build attestations, signed tags, checksum files, and signature files.
- A post-release workflow on `main` targets `v29.1.0` for a macOS arm64 DMG artifact.
- A network source comparison page now records that reviewed P2P/network source files did not appear changed between `v29.1.0` and `main`, with selected blob-SHA spot checks.

Current caveats:

- MoreBC2 has not resolved the exact `v29.1.0` release timestamp from API metadata or an authenticated GitHub view.
- MoreBC2 has not confirmed that the GitHub release path is canonical.
- MoreBC2 has not confirmed the full `v29.1.0` release asset list.
- MoreBC2 has not confirmed that current BitcoinII releases publish `SHA256SUMS` and `SHA256SUMS.asc`.
- MoreBC2 has not confirmed trusted BitcoinII release keys.
- MoreBC2 has not downloaded release binaries or calculated independent hashes.
- MoreBC2 has not verified detached signatures.
- MoreBC2 has not confirmed that workflow artifacts are attached to the release page.
- MoreBC2 has not proved release binaries match reviewed source files.

Therefore, MoreBC2 should still treat release verification as **Needs Review**, not Verified.

## Evidence levels for releases

### Strong evidence

Examples:

- Signed release tag.
- Signed checksum manifest.
- Detached signature for checksum file.
- Reproducible build instructions with matching hashes.
- Maintainer-documented release verification process.

### Medium evidence

Examples:

- Unsigned checksum file on the official release page.
- GitHub verified commit or tag, if reviewed.
- Hashes published in official documentation without detached signature.

### Weak evidence

Examples:

- GitHub release asset exists but no checksum is provided.
- Community-posted hash without maintainer verification.
- Third-party mirror hash.

## Release asset checklist

For each release, record:

- Release version.
- Release date.
- Release URL.
- Tag name.
- Whether tag is signed.
- Release commit.
- Whether commit is verified by GitHub.
- Asset names.
- Asset sizes.
- SHA256 hashes calculated independently.
- Checksum file name, if present.
- Whether checksum file includes each asset.
- Signature file name, if present.
- Verification command used.
- Result.
- Reviewer and date.

Use [Release artifact checklist](../verification/release-artifact-checklist.md) for the current working table.

## Current release table

| Version | Release path | Hash checked | Checksum file | Signature | Status | Notes |
|---|---|---:|---|---|---|---|
| v29.1.0 | `Bitcoin-II/BitcoinII-Core` | No | Needs review | Needs review | Needs Review | Rechecked 2026-07-02; GitHub page showed Latest marker, but exact timestamp, full asset list, checksums, signatures, and trusted-key path still need direct verification. |
| v0.27.1 | redirected legacy path | No | Needs review | Needs review | Needs Review | Observed on redirected legacy repository path; not confirmed as current canonical path. |
| v0.27.0 | redirected legacy path | No | Needs review | Needs review | Needs Review | Genesis release observed on redirected legacy path; not independently verified. |

## Source-tree helper caveat

The source tree includes a verification helper page at `contrib/verify-binaries/README.md`.

That page describes verifying a checksum file and signature file before comparing downloaded binary hashes.

However, MoreBC2 should not treat that inherited helper as proof that current BitcoinII releases publish all required artifacts. A release-specific review still needs to find the actual checksum files, signature files, and trusted keys for BitcoinII.

## Release process caveat

The source tree also includes `doc/release-process.md`.

That page describes a stronger release process involving signed tags, Guix builds, builder attestations, checksum files, and signature files.

MoreBC2 should treat this as source-observed process documentation, not proof that any specific current release completed every step. The actual `v29.1.0` release assets still need direct verification.

## Verification commands

Do not mark commands verified until they have been run.

When verified, record commands in the test-record format from [Command testing status](../verification/command-testing.md) or [Local development environment](local-development.md).

Common command categories to test later:

- Calculate SHA256 hash of a downloaded file.
- Verify checksum file contains that hash.
- Verify detached signature over checksum file.
- Verify release tag signature.
- Compare calculated binary hashes against published hashes.

## Exchange/service standard

For exchange or service integration, MoreBC2 should be strict.

A release is strongest when an integrator can:

1. Download the release asset.
2. Calculate the asset hash.
3. Find that hash in an official checksum manifest.
4. Verify the manifest signature.
5. Confirm the signing key is trusted by the BitcoinII project.

If this path cannot be completed, MoreBC2 should say so instead of filling the gap with assumptions.

## What not to do

Do not claim:

- A binary is safe because it came from GitHub alone.
- A release is signed unless a signature was checked.
- A checksum proves authenticity by itself.
- A community-posted hash is equivalent to a signed maintainer manifest.
- A release workflow is exchange-grade until the full chain is checked.
- A workflow artifact is the same as a release asset unless it is confirmed on the release page.
- A source comparison proves release binaries match source.
- A GitHub verified commit marker verifies downloaded release assets.

## Relationship to BasicSwap-style standards

Some service integrations require a binary, a checksum or manifest file, and a signature over that checksum or manifest.

MoreBC2 should track whether BitcoinII releases meet that kind of standard without claiming they do until verified.

## Open questions

- Confirm the exact `v29.1.0` release timestamp with API metadata or authenticated GitHub view.
- Is `Bitcoin-II/BitcoinII-Core` the canonical release repository?
- Are BitcoinII release tags signed?
- Are BitcoinII release commits GitHub-verified for all current releases?
- Are SHA256 checksum files published for each release?
- Are checksum files signed?
- Which key or keys should be trusted for BitcoinII releases?
- Are release builds reproducible?
- Are source archives and binary assets generated from the same commit?
- What release-verification process should exchanges follow today?
- How should the redirected legacy repository path be documented?

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This guide defines the release verification standard and records release-page, source-comparison, network-comparison, workflow, and process-document observations. The release page was rechecked on 2026-07-02, but this still does not verify a specific BitcoinII release binary.
