# Release authentication status

**Category:** Releases
**Status:** Draft / Clearly bounded partial
**Last reviewed:** 2026-08-27

## Summary

This page summarizes what MoreBC2 currently knows about BitcoinII Core `v29.1.0` release authentication.

It does not authenticate the release.

Canonical evidence:

- [Verification evidence index](../verification/verification-index.md)
- [Developer release verification guide](../developers/release-verification.md)
- [Release asset inventory attempt](../verification/release-asset-inventory-attempt.md)
- [Release-artifact authentication record — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [BitcoinII releases](../documentation/releases.md)

## Current status

| Item | Status | Evidence / limit |
|---|---|---|
| Uploaded release asset inventory | Observed partial | 10 uploaded assets were captured from GitHub API metadata. |
| GitHub-generated source archives | Observed partial | Two generated source archive links were recorded separately. |
| Local artifact hashes | Integrity recorded | All 10 uploaded assets and both generated source archives were downloaded and independently hashed on 2026-08-27. These are repeat-download fingerprints, not authenticated expected values. |
| `SHA256SUMS` | Not found | No publisher checksum manifest was found in the release, archives, canonical repository review, or obvious public signature-repository paths. |
| `SHA256SUMS.asc` | Not found | No signed checksum manifest was found in the checked public locations. |
| Detached release signature | Not found | No `.asc`, `.sig`, minisign/signify, or other detached release-asset signature was found. |
| Published trusted release keys | Not established | No BitcoinII release-key trust path was found. GitHub's web-flow key is a GitHub service key, not a BitcoinII release key. |
| Signed annotated tag | Not observed | The `v29.1.0` tag appears lightweight in the recorded metadata. |
| Tagged commit signature | Cryptographically checked / bounded | The source commit verifies against GitHub's published web-flow key. It does not bind uploaded assets to source or establish a BitcoinII release signer. |
| Binary authenticity | Not established | Matching local hashes and GitHub metadata do not authenticate downloaded binaries. |

## Tag and commit signature note

The [developer release verification guide](../developers/release-verification.md) records:

```text
refs/tags/v29.1.0 -> commit 3f2a352467750425ec28abe3505a5db5bbc5fa35
```

Interpretation recorded by MoreBC2:

- the tag appears lightweight because the ref points directly to a commit object,
- because it does not point to a separate annotated tag object, there is no tag-object signature metadata to report,
- GitHub commit API metadata reports the tagged commit signature as verified with reason `valid` and `verified_at` of `2025-11-27T04:20:37Z`,
- local verification with GitHub's published `web-flow.gpg` key produced a good signature from `GitHub <noreply@github.com>`, fingerprint `9684 79A1 AFF9 27E3 7D1A 566B B569 0EEE BB95 2194`,
- that key authenticates GitHub web-flow commit data, not BitcoinII release artifacts or a maintainer-controlled release process.

Commit signature metadata is not release binary verification.

## Source-reviewed process material

MoreBC2 has observed Bitcoin Core-style release verification material in the source tree, including references to:

- `SHA256SUMS`,
- `SHA256SUMS.asc`,
- signed tags,
- Guix builds,
- builder attestations,
- trusted keys.

These source-tree documents are useful comparison material. They do not prove that BitcoinII Core `v29.1.0` published those artifacts or followed that process.

## What remains unknown

- Whether BitcoinII has unpublished, private, renamed, deleted, or externally hosted checksum/signature material.
- Which keys, if any, should be trusted for BitcoinII release verification.
- Whether release binaries match reviewed source.
- Whether a reproducible-build process exists for the current release.

## Verification

**Status:** Draft / Clearly bounded partial  
**Primary sources checked:** Existing MoreBC2 release verification records and the dated 2026-08-27 artifact authentication record linked above
**Notes:** Artifact integrity was recorded; release authenticity remains unverified.
