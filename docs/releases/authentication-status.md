# Release authentication status

**Category:** Releases
**Status:** Draft / Clearly bounded partial
**Last reviewed:** 2026-07-13

## Summary

This page summarizes what MoreBC2 currently knows about BitcoinII Core `v29.1.0` release authentication.

It does not authenticate the release.

Canonical evidence:

- [Verification evidence index](../verification/verification-index.md)
- [Developer release verification guide](../developers/release-verification.md)
- [Release asset inventory attempt](../verification/release-asset-inventory-attempt.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [BitcoinII releases](../documentation/releases.md)

## Current status

| Item | Status | Evidence / limit |
|---|---|---|
| Uploaded release asset inventory | Observed partial | 10 uploaded assets were captured from GitHub API metadata. |
| GitHub-generated source archives | Observed partial | Two generated source archive links were recorded separately. |
| Local binary hash calculation | Not done | MoreBC2 has not downloaded release binaries or calculated independent hashes. |
| `SHA256SUMS` | Unknown / not observed in uploaded asset names | No uploaded asset name appears to be `SHA256SUMS`; this does not prove no checksum exists elsewhere. |
| `SHA256SUMS.asc` | Unknown / not observed in uploaded asset names | No uploaded asset name appears to be `SHA256SUMS.asc`; this does not prove no signature exists elsewhere. |
| Detached release signature | Unknown / not observed in uploaded asset names | No uploaded asset name appears to be a detached signature file such as `.asc` or `.sig`. |
| Published trusted release keys | Unknown | No BitcoinII trusted release-key path has been established. |
| Signed annotated tag | Not observed | The `v29.1.0` tag appears lightweight in the recorded metadata. |
| GitHub commit signature metadata | Observed | GitHub commit API metadata reports the tagged commit signature as verified with reason `valid`; MoreBC2 did not independently verify it. |
| Binary authenticity | Not established | Inventory, source comparison, and commit metadata do not verify downloaded binaries. |

## Tag and commit signature note

The [developer release verification guide](../developers/release-verification.md) records:

```text
refs/tags/v29.1.0 -> commit 3f2a352467750425ec28abe3505a5db5bbc5fa35
```

Interpretation recorded by MoreBC2:

- the tag appears lightweight because the ref points directly to a commit object,
- because it does not point to a separate annotated tag object, there is no tag-object signature metadata to report,
- GitHub commit API metadata reports the tagged commit signature as verified with reason `valid` and `verified_at` of `2025-11-27T04:20:37Z`,
- MoreBC2 did not import keys or independently verify the commit signature.

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

- Whether BitcoinII publishes release checksums outside uploaded GitHub assets.
- Whether BitcoinII publishes `SHA256SUMS.asc`.
- Whether detached signatures exist in a non-obvious location.
- Which keys, if any, should be trusted for BitcoinII release verification.
- Whether release binaries match reviewed source.
- Whether a reproducible-build process exists for the current release.

## Verification

**Status:** Draft / Clearly bounded partial  
**Primary sources checked:** Existing MoreBC2 release verification records linked above  
**Notes:** This page summarizes authentication gaps. It does not verify release authenticity.
