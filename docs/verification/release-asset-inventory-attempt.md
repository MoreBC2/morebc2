# Release asset inventory attempt

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page records the current attempt status for capturing the `v29.1.0` release asset inventory.

It is now a GitHub API-based uploaded-asset inventory, not a binary verification record.

No binaries were downloaded. No hashes were independently calculated. No signatures were verified. GitHub API digest fields, if present, should not be treated as independent MoreBC2 hash verification.

## Target

Target release:

- Repository path observed: `Bitcoin-II/BitcoinII-Core`
- Release tag observed: `v29.1.0`
- Release title observed: `BitcoinII Core v29.1.0`
- Release page path observed: `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v29.1.0`

## GitHub API release metadata

Captured by Codex from GitHub API metadata:

| Field | Value |
|---|---|
| Release title | `BitcoinII Core v29.1.0` |
| Tag | `v29.1.0` |
| Target commitish | `main` |
| Tag target object | `3f2a352467750425ec28abe3505a5db5bbc5fa35` |
| Release created_at | `2025-11-27T04:20:37Z` |
| Release published_at | `2025-11-27T04:22:39Z` |
| Release updated_at | `2026-06-22T21:25:13Z` |

## Current inventory status

| Item | Status | Notes |
|---|---|---|
| Release page path | Partial | Public path observed. Canonical status still needs confirmation. |
| Release title | Partial | `BitcoinII Core v29.1.0` observed by page review and API metadata. |
| Release timestamp | Partial | API metadata gives created and published timestamps. Canonical status of release path still needs confirmation. |
| Uploaded asset count | Partial | GitHub API reports 10 uploaded assets. Earlier rendered page showed 12, likely including GitHub-generated source archives. |
| Uploaded asset names | Partial | 10 uploaded asset names captured from API metadata. |
| Uploaded asset sizes | Partial | Uploaded asset sizes captured from API metadata. |
| Uploaded asset URLs | Partial | Browser download URLs captured from API metadata. |
| Checksum manifest | Needs Review | No uploaded asset name appears to be a checksum manifest. This does not prove no checksum exists elsewhere. |
| Signature file | Needs Review | No uploaded asset name appears to be a detached signature file. This does not prove no signature exists elsewhere. |
| Trusted release key source | Needs Review | Not confirmed. |
| Downloaded files | Not done | MoreBC2 has not downloaded release assets. |
| Calculated hashes | Not done | MoreBC2 has not calculated SHA256 hashes for release assets. |
| Signature checks | Not done | MoreBC2 has not checked detached signatures. |

## Uploaded asset inventory from GitHub API

| # | Asset name | Size bytes | Content type | Platform | Type | Checksum manifest? | Signature file? |
|---:|---|---:|---|---|---|---|---|
| 1 | `BitcoinII-29.1.0-aarch64-linux-CLI.tar.gz` | 7,313,922 | `application/gzip` | Linux aarch64 | CLI archive | No | No |
| 2 | `BitcoinII-29.1.0-aarch64-linux-GUI.tar.gz` | 19,831,620 | `application/gzip` | Linux aarch64 | GUI archive | No | No |
| 3 | `BitcoinII-29.1.0-arm-linux-gnueabihf-CLI.tar.gz` | 6,820,132 | `application/gzip` | Linux arm gnueabihf | CLI archive | No | No |
| 4 | `BitcoinII-29.1.0-arm-linux-gnueabihf-GUI.tar.gz` | 17,911,678 | `application/gzip` | Linux arm gnueabihf | GUI archive | No | No |
| 5 | `BitcoinII-29.1.0-arm64-apple-darwin.zip` | 15,810,838 | `application/zip` | macOS arm64 | Archive | No | No |
| 6 | `BitcoinII-29.1.0-x86_64-apple-darwin.zip` | 17,133,023 | `application/zip` | macOS x86_64 | Archive | No | No |
| 7 | `BitcoinII-29.1.0-x86_64-linux-CLI.tar.gz` | 7,812,863 | `application/gzip` | Linux x86_64 | CLI archive | No | No |
| 8 | `BitcoinII-29.1.0-x86_64-linux-GUI.tar.gz` | 20,480,068 | `application/gzip` | Linux x86_64 | GUI archive | No | No |
| 9 | `BitcoinII-29.1.0-x86_64-win64-CLI.zip` | 7,987,528 | `application/zip` | Windows x86_64 | CLI archive | No | No |
| 10 | `BitcoinII-29.1.0-x86_64-win64-GUI.zip` | 19,362,931 | `application/zip` | Windows x86_64 | GUI archive | No | No |

Browser download URLs were captured by Codex in the API report. They follow the GitHub release download path for `Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/` plus the asset filename.

## Count comparison

| Source | Count | Notes |
|---|---:|---|
| Earlier rendered GitHub page observation | 12 | Likely included GitHub-generated source archives. |
| GitHub API uploaded assets | 10 | Uploaded release assets only. |

The difference should not be treated as an error unless a future check shows the API missed uploaded assets. MoreBC2 should distinguish uploaded release assets from GitHub-generated source archives.

## Checksum and signature observation

Based on uploaded asset names only:

- No uploaded asset appears to be `SHA256SUMS`, a checksum manifest, or similar.
- No uploaded asset appears to be a detached signature file such as `.asc` or `.sig`.
- No trusted release key source was identified.
- No binary, hash, or signature verification was performed.

## What to avoid

Do not:

- treat this inventory as binary verification,
- infer trusted release keys,
- treat GitHub API digest fields as independent MoreBC2 hash checks,
- treat GitHub commit or tag metadata as binary verification,
- assume the absence of uploaded checksum/signature assets proves no checksum/signature information exists elsewhere,
- download or run binaries as part of inventory capture unless explicitly assigned,
- mark release assets verified from inventory alone.

## Next steps

1. Decide whether GitHub-generated source archives should be separately listed in release docs.
2. Confirm whether checksum manifests or signatures are published outside uploaded release assets.
3. Identify any official BitcoinII trusted-key source or maintainer guidance.
4. Only after inventory and trust-source questions are resolved, decide whether a safe hash-check pass should be run.

## Related pages

- [BitcoinII releases](../documentation/releases.md)
- [Release verification guide](../developers/release-verification.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release source comparison notes](release-source-comparison.md)
- [Open questions backlog](open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Existing release-page observations, release artifact checklist, and Codex GitHub API asset inventory report
**Notes:** This page records uploaded release asset metadata. It does not verify assets, hashes, signatures, trusted keys, or release authenticity.
