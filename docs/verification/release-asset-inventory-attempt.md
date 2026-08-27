# Release asset inventory attempt

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-08-27

## Summary

This page records the original inventory and its current completion state for the `v29.1.0` release assets.

It is a GitHub API-based uploaded-asset inventory plus a separate record of GitHub-generated source archive links. The completed download, hash, and authentication-boundary results are in [Release-artifact authentication — 2026-08-27](release-artifact-authentication-2026-08-27.md).

All 10 uploaded assets and both generated source archives were downloaded and independently hashed on 2026-08-27. GitHub API digest fields matched the local hashes for the uploaded assets, but remain hosting-provider metadata rather than publisher-authenticated checksum evidence. No detached release signature or BitcoinII release-key trust path was found.

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
| Release page path | Partial | Current canonical path established by separate project-controlled metadata review; artifact authentication remains separate. |
| Release title | Partial | `BitcoinII Core v29.1.0` observed by page review and API metadata. |
| Release timestamp | Partial | API metadata gives created and published timestamps; this does not authenticate the release or assets. |
| Uploaded asset count | Partial | GitHub API reports 10 uploaded assets. |
| Uploaded asset names | Partial | 10 uploaded asset names captured from API metadata. |
| Uploaded asset sizes | Partial | Uploaded asset sizes captured from API metadata. |
| Uploaded asset URLs | Partial | Browser download URLs captured from API metadata. |
| GitHub-generated source archives | Partial | Two generated tag source archive links captured through metadata/header checks. They are separate from uploaded release assets. |
| Rendered asset count reconciliation | Partial | Earlier rendered page showed 12 items; 10 uploaded assets plus 2 generated source archives likely explains the count. |
| Checksum manifest | Needs Review | No uploaded asset name or generated source archive appears to be a checksum manifest. This does not prove no checksum exists elsewhere. |
| Signature file | Needs Review | No uploaded asset name or generated source archive appears to be a detached signature file. This does not prove no signature exists elsewhere. |
| Trusted release key source | Needs Review | Not confirmed. |
| Downloaded files | Complete for observed release-page downloads | All 10 uploaded assets and both generated source archives were retrieved on 2026-08-27. |
| Calculated hashes | Integrity recorded | SHA-256 and byte size were recorded for all 12 downloads; all uploaded-asset values matched GitHub metadata. |
| Signature checks | No release signature available | No detached release signature was found. The tagged source commit's GitHub service signature was checked separately and does not authenticate assets. |

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

## GitHub-generated source archives

Codex checked GitHub release metadata and HTTP headers for generated source archive links. These are generated by GitHub from the tag and are not part of the release's uploaded `assets` list.

| Type | Display name | API URL | Browser URL | Final URL | Content type | Content-Disposition |
|---|---|---|---|---|---|---|
| GitHub-generated tarball | `Source code (tar.gz)` | `https://api.github.com/repos/Bitcoin-II/BitcoinII-Core/tarball/v29.1.0` | `https://github.com/Bitcoin-II/BitcoinII-Core/archive/refs/tags/v29.1.0.tar.gz` | `https://codeload.github.com/Bitcoin-II/BitcoinII-Core/tar.gz/refs/tags/v29.1.0` | `application/x-gzip` | `attachment; filename=BitcoinII-Core-29.1.0.tar.gz` |
| GitHub-generated zipball | `Source code (zip)` | `https://api.github.com/repos/Bitcoin-II/BitcoinII-Core/zipball/v29.1.0` | `https://github.com/Bitcoin-II/BitcoinII-Core/archive/refs/tags/v29.1.0.zip` | `https://codeload.github.com/Bitcoin-II/BitcoinII-Core/zip/refs/tags/v29.1.0` | `application/zip` | `attachment; filename=BitcoinII-Core-29.1.0.zip` |

`Content-Length` was not provided in the HEAD responses Codex received.

## Count comparison

| Source | Count | Notes |
|---|---:|---|
| Earlier rendered GitHub page observation | 12 | Likely included uploaded assets plus GitHub-generated source archives. |
| GitHub API uploaded assets | 10 | Uploaded release assets only. |
| GitHub-generated source archives | 2 | Tag source archive links generated by GitHub. |

This reconciles the earlier count without treating generated source archives as uploaded release assets.

## Checksum and signature observation

Based on release metadata, all downloaded archive member names, canonical repository review, and public signature-material searches:

- No uploaded asset appears to be `SHA256SUMS`, a checksum manifest, or similar.
- No uploaded asset appears to be a detached signature file such as `.asc` or `.sig`.
- GitHub-generated source archive links are not checksum or signature artifacts.
- No BitcoinII trusted release key source was identified.
- Independent integrity fingerprints were recorded for every listed download.
- No publisher-authenticated checksum, release-asset signature, or binary-to-source binding was established.

## What to avoid

Do not:

- treat this inventory as binary verification,
- treat generated source archive links as uploaded release assets,
- treat generated source archive links as checksum or signature artifacts,
- infer trusted release keys,
- treat GitHub API digest fields as independent MoreBC2 hash checks,
- treat GitHub commit or tag metadata as binary verification,
- assume the absence of uploaded checksum/signature assets proves no checksum/signature information exists elsewhere,
- run the downloaded binaries as part of inventory capture,
- mark release assets verified from inventory alone.

## Next steps

1. Obtain a publisher checksum manifest or another authenticated expected-value source.
2. Identify a BitcoinII release key through a documented fingerprint trust path.
3. Verify any future manifest or artifact signature against that documented key.
4. Compare the recorded local hashes against authenticated expected values.
5. Obtain public build attestations or independently reproduce release outputs if the project adopts that path.

## Related pages

- [BitcoinII releases](../documentation/releases.md)
- [Release verification guide](../developers/release-verification.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release source comparison notes](release-source-comparison.md)
- [Open questions backlog](open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Existing release-page observations, release artifact checklist, GitHub API asset metadata, generated source archives, and the dated 2026-08-27 authentication record
**Notes:** This page records uploaded release asset metadata and generated source archive link metadata. The linked dated record adds local integrity hashes but does not establish signatures, trusted keys, binary provenance, or release authenticity.
