# Release verification guide

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page defines how MoreBC2 should evaluate BitcoinII Core release artifacts.

It does not claim that BitcoinII releases currently provide every verification artifact listed here. It defines the standard MoreBC2 should use when checking releases.

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

## Suggested release table

| Version | Asset | Hash checked | Checksum file | Signature | Status | Notes |
|---|---|---|---|---|---|---|
| v0.27.0 | Needs review | No | Needs review | Needs review | Needs Review | Genesis release observed, verification workflow not confirmed. |
| v0.27.1 | Needs review | No | Needs review | Needs review | Needs Review | Release observed, verification workflow not confirmed. |

## Verification commands

Do not mark commands verified until they have been run.

When verified, record commands in the test-record format from [Local development environment](local-development.md).

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

## Relationship to BasicSwap-style standards

Some service integrations require a binary, a checksum or manifest file, and a signature over that checksum or manifest.

MoreBC2 should track whether BitcoinII releases meet that kind of standard without claiming they do until verified.

## Open questions

- Are BitcoinII release tags signed?
- Are BitcoinII release commits GitHub-verified?
- Are SHA256 checksum files published for each release?
- Are checksum files signed?
- Which key or keys should be trusted for BitcoinII releases?
- Are release builds reproducible?
- Are source archives and binary assets generated from the same commit?
- What release-verification process should exchanges follow today?

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This guide defines the release verification standard MoreBC2 should apply. It does not yet verify a specific BitcoinII release.
