# BitcoinII releases

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-07-04

## Summary

This page tracks public BitcoinII release information checked from GitHub.

This page does not prove release authenticity. It records release-page/API observations and gaps that still need verification.

## Public release page observation

The public BitcoinII Core release page rechecked by MoreBC2 was:

- `https://github.com/Bitcoin-II/BitcoinII-Core/releases`

Older links such as `https://github.com/BitcoinII-Dev/BitcoinII/releases` have previously been observed redirecting to a different GitHub repository path observed as `KvantaMechanic/BitcoinII`.

This repository-path split remains a public-launch blocker until the canonical release/source path is confirmed by maintainers or official project material.

## Releases observed

### BitcoinII Core v29.1.0

Observed on the `Bitcoin-II/BitcoinII-Core` release page and through Codex GitHub API metadata review:

- Release title: `BitcoinII Core v29.1.0`
- Tag: `v29.1.0`
- Target commitish from API metadata: `main`
- Tag target object: `3f2a352467750425ec28abe3505a5db5bbc5fa35`
- Release created_at from API metadata: `2025-11-27T04:20:37Z`
- Release published_at from API metadata: `2025-11-27T04:22:39Z`
- Release updated_at from API metadata: `2026-06-22T21:25:13Z`
- Earlier rendered page observation showed a `Latest` marker.
- Earlier rendered page observation showed GPG key ID `B5690EEEBB952194` for GitHub's verified signature system.
- Release note shown: `Mandatory release including updated seed server and blockchain checkpoints. Previous v29 releases are now fully deprecated and should not be used.`

Important caveat:

GitHub API metadata resolved the timestamp that the unauthenticated rendered HTML previously showed only as `27 Nov 04:22`. This still does not prove release authenticity, asset authenticity, or canonical project status.

#### Uploaded release assets from GitHub API

Codex captured 10 uploaded assets from GitHub API metadata:

| # | Asset name | Size bytes | Content type |
|---:|---|---:|---|
| 1 | `BitcoinII-29.1.0-aarch64-linux-CLI.tar.gz` | 7,313,922 | `application/gzip` |
| 2 | `BitcoinII-29.1.0-aarch64-linux-GUI.tar.gz` | 19,831,620 | `application/gzip` |
| 3 | `BitcoinII-29.1.0-arm-linux-gnueabihf-CLI.tar.gz` | 6,820,132 | `application/gzip` |
| 4 | `BitcoinII-29.1.0-arm-linux-gnueabihf-GUI.tar.gz` | 17,911,678 | `application/gzip` |
| 5 | `BitcoinII-29.1.0-arm64-apple-darwin.zip` | 15,810,838 | `application/zip` |
| 6 | `BitcoinII-29.1.0-x86_64-apple-darwin.zip` | 17,133,023 | `application/zip` |
| 7 | `BitcoinII-29.1.0-x86_64-linux-CLI.tar.gz` | 7,812,863 | `application/gzip` |
| 8 | `BitcoinII-29.1.0-x86_64-linux-GUI.tar.gz` | 20,480,068 | `application/gzip` |
| 9 | `BitcoinII-29.1.0-x86_64-win64-CLI.zip` | 7,987,528 | `application/zip` |
| 10 | `BitcoinII-29.1.0-x86_64-win64-GUI.zip` | 19,362,931 | `application/zip` |

Asset-count caveat:

- Earlier rendered page observation showed 12 assets.
- GitHub API uploaded-asset metadata reported 10 uploaded assets.
- The difference likely comes from GitHub-generated source archives being shown in the rendered page, but those should be tracked separately from uploaded release assets.

Verification caveats:

- MoreBC2 did not download binaries.
- MoreBC2 did not calculate independent hashes.
- MoreBC2 did not verify any detached signature or signed checksum manifest.
- No uploaded asset name appears to be a checksum manifest.
- No uploaded asset name appears to be a detached signature file.
- MoreBC2 did not identify a BitcoinII trusted release-key source.
- MoreBC2 did not prove release binaries match reviewed source files.
- GitHub's verified signature marker is useful metadata, but it is not the same as verifying a downloaded release binary against a signed checksum manifest.
- GitHub API digest fields, if present, should not be treated as independent MoreBC2 hash verification.

### Legacy observed release path: v0.27.1

Observed on the redirected `KvantaMechanic/BitcoinII` release page during earlier review:

- Tag shown: `v0.27.1`
- Release date shown by GitHub page: `2025-11-29 04:04`
- Release note shown: `Update DNS seeds and chain transaction data`
- Assets observed: 14 assets.
- GitHub page marks the release commit as created on GitHub.com and signed with GitHub's verified signature system.
- GitHub page shows GPG key ID `B5690EEEBB952194`.

Observed asset naming pattern includes:

- `BitcoinII-27.1.0-aarch64-linux-CLI.tar.gz`
- `BitcoinII-27.1.0-aarch64-linux-GUI.tar.gz`
- `BitcoinII-27.1.0-arm-linux-gnueabihf-CLI.tar.gz`
- `BitcoinII-27.1.0-arm-linux-gnueabihf-GUI.tar.gz`
- `BitcoinII-27.1.0-arm64-macos-CLI.zip`
- `BitcoinII-27.1.0-arm64-macos-GUI.zip`
- `BitcoinII-27.1.0-x86_64-linux-CLI.tar.gz`
- `BitcoinII-27.1.0-x86_64-linux-GUI.tar.gz`
- `BitcoinII-27.1.0-x86_64-macos-CLI.zip`
- `BitcoinII-27.1.0-x86_64-macos-GUI.zip`
- Source code archives.

Verification caveats:

- This appears on a redirected legacy repository path, not the current observed `Bitcoin-II/BitcoinII-Core` path.
- MoreBC2 should not treat this as the current release path until the canonical path is confirmed.
- Legacy asset naming does not prove the current `v29.1.0` asset list.

### Legacy observed release: v0.27.0

Observed on the redirected legacy release page during earlier review:

- Release title shown: `Genesis Release`
- Tag shown: `v0.27.0`
- Release date shown by GitHub page: `2025-07-28`
- Release note shown: `Genesis commit of BitcoinII v0.27.0 Sourcecode`
- Assets observed: 6 assets.

## Source-tree verification helper note

The current BitcoinII Core source tree contains `contrib/verify-binaries/README.md`.

That file describes a Bitcoin Core-style verification model involving:

- `SHA256SUMS`
- `SHA256SUMS.asc`
- trusted public keys
- signature checks over the checksum file
- hash checks of downloaded binaries

However, this source-tree helper is not enough by itself to prove the current BitcoinII release workflow because:

- The helper text may be inherited from upstream.
- The helper text references external Bitcoin Core download hosts.
- MoreBC2 has not confirmed that current BitcoinII releases publish `SHA256SUMS` and `SHA256SUMS.asc` files.
- MoreBC2 has not confirmed which BitcoinII release keys should be trusted.

## Release verification status

| Question | Current status | Notes |
|---|---|---|
| Release page path observed | Partial | Observed path is `Bitcoin-II/BitcoinII-Core/releases`. Canonical status still needs confirmation. |
| Latest-release marker observed | Partial | `BitcoinII Core v29.1.0` showed a GitHub `Latest` marker during the 2026-07-02 rendered-page recheck. |
| Release date resolved | Partial | GitHub API metadata gives `published_at` as `2025-11-27T04:22:39Z`. |
| Uploaded release asset list captured | Partial | GitHub API metadata reports 10 uploaded assets. |
| Rendered asset count reconciled | Partial | Earlier rendered page showed 12 assets, likely including GitHub-generated source archives. Source archive listing remains separate. |
| Asset hashes independently calculated | Not done | No binaries downloaded. |
| Checksum manifest found | Needs Review | No uploaded asset name appears to be a checksum manifest; external/other official checksum source not checked. |
| Detached signature found | Needs Review | No uploaded asset name appears to be a signature file; external/other official signature source not checked. |
| Release tag signature checked | Needs Review | GitHub verified commit marker observed, but tag-signature status was not independently checked. |
| Trusted release keys identified | Needs Review | GitHub key ID observed, but BitcoinII trust model is not confirmed. |
| Source comparison performed | Partial | Release source comparison and network release comparison exist, but source comparison does not verify release binaries. |
| Exchange-grade verification path confirmed | No | Requires manifest/signature/key workflow or maintainer-approved alternative. |

## Open items

- Confirm canonical repository and release path.
- Decide whether GitHub-generated source archives should be listed separately.
- Confirm whether release assets include checksum manifests outside uploaded assets.
- Confirm whether checksum manifests are signed.
- Confirm whether tags are signed separately from GitHub's verified commit marker.
- Confirm which key or keys should be trusted for BitcoinII releases.
- Download at least one release asset in a safe environment and independently calculate SHA256 in a documented test record.
- Create a user-facing wallet release-verification guide only after the actual release model is confirmed.

## Sources

- Release page rechecked 2026-07-02: `https://github.com/Bitcoin-II/BitcoinII-Core/releases`
- Release tag page rechecked 2026-07-02: `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v29.1.0`
- Codex GitHub API asset inventory report, 2026-07-04
- Legacy redirected release page observed during earlier review: `https://github.com/BitcoinII-Dev/BitcoinII/releases`
- `contrib/verify-binaries/README.md` in `Bitcoin-II/BitcoinII-Core`
- [Release verification guide](../developers/release-verification.md)
- [Release asset inventory attempt](../verification/release-asset-inventory-attempt.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [Release source comparison notes](../verification/release-source-comparison.md)
- [Network release comparison](../verification/network-release-comparison.md)
- [Open questions backlog](../verification/open-questions.md)

## Verification

**Status:** Needs Review
**Primary sources checked:** Partially
**Notes:** GitHub release pages, GitHub API asset metadata through Codex, and source-tree verification-helper text were checked. MoreBC2 has not downloaded binaries, calculated hashes, verified manifests, verified detached signatures, confirmed trusted release keys, or confirmed canonical repository status.
