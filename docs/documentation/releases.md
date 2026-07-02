# BitcoinII releases

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-07-02

## Summary

This page tracks public BitcoinII release information checked from GitHub.

This page does not prove release authenticity. It records release-page observations and gaps that still need verification.

## Public release page observation

The public BitcoinII Core release page rechecked by MoreBC2 on 2026-07-02 was:

- `https://github.com/Bitcoin-II/BitcoinII-Core/releases`

Older links such as `https://github.com/BitcoinII-Dev/BitcoinII/releases` have previously been observed redirecting to a different GitHub repository path observed as `KvantaMechanic/BitcoinII`.

This repository-path split remains a public-launch blocker until the canonical release/source path is confirmed by maintainers or official project material.

## Releases observed

### BitcoinII Core v29.1.0

Observed on the `Bitcoin-II/BitcoinII-Core` release page during the 2026-07-02 recheck:

- Release title shown: `BitcoinII Core v29.1.0`
- Page shows a `Latest` marker for this release.
- Tag shown: `v29.1.0`
- Release timestamp rendered by GitHub page context: `27 Nov 04:22`
- Release commit shown: `3f2a352`
- GitHub page marked the release commit as created on GitHub.com and signed with GitHub's verified signature system.
- GitHub page showed GPG key ID `B5690EEEBB952194`.
- Release note shown: `Mandatory release including updated seed server and blockchain checkpoints. Previous v29 releases are now fully deprecated and should not be used.`
- Assets observed: 12 assets.

Date caveat:

- GitHub's unauthenticated rendered HTML showed `27 Nov 04:22` without a year in the visible text during this recheck.
- MoreBC2 should not infer the year from that rendered text alone.
- The earlier `2026-11-27 04:22` note should be treated as a rendering/interpretation risk, not as confirmed release metadata.

Verification caveats:

- The rendered GitHub page did not expose the full asset list during this pass.
- MoreBC2 did not download binaries.
- MoreBC2 did not calculate independent hashes.
- MoreBC2 did not verify any detached signature or signed checksum manifest.
- GitHub's verified signature marker is useful metadata, but it is not the same as verifying a downloaded release binary against a signed checksum manifest.

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
| Latest-release marker observed | Partial | `BitcoinII Core v29.1.0` showed a GitHub `Latest` marker during the 2026-07-02 recheck. |
| Release date resolved | Needs Review | Rendered HTML showed `27 Nov 04:22` without a year. Do not infer the year from the rendered text alone. |
| Release asset list complete | Needs Review | GitHub rendered page showed 12 assets but not full names in this pass. |
| Asset hashes independently calculated | Not done | No binaries downloaded. |
| Checksum manifest found | Needs Review | Not confirmed for current releases. |
| Detached signature found | Needs Review | Not confirmed for current releases. |
| Release tag signature checked | Needs Review | GitHub verified commit marker observed, but tag-signature status was not independently checked. |
| Trusted release keys identified | Needs Review | GitHub key ID observed, but BitcoinII trust model is not confirmed. |
| Exchange-grade verification path confirmed | No | Requires manifest/signature/key workflow or maintainer-approved alternative. |

## Open items

- Confirm the exact `v29.1.0` release timestamp with API metadata or authenticated GitHub view.
- Confirm canonical repository and release path.
- Fetch full asset list for `v29.1.0`.
- Confirm whether release assets include Windows GUI and CLI downloads.
- Confirm whether release assets include checksum manifests.
- Confirm whether checksum manifests are signed.
- Confirm whether tags are signed separately from GitHub's verified commit marker.
- Confirm which key or keys should be trusted for BitcoinII releases.
- Download at least one harmless release asset and independently calculate SHA256 in a documented test record.
- Create a user-facing wallet release-verification guide only after the actual release model is confirmed.

## Sources

- Release page rechecked 2026-07-02: `https://github.com/Bitcoin-II/BitcoinII-Core/releases`
- Release tag page rechecked 2026-07-02: `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v29.1.0`
- Legacy redirected release page observed during earlier review: `https://github.com/BitcoinII-Dev/BitcoinII/releases`
- `contrib/verify-binaries/README.md` in `Bitcoin-II/BitcoinII-Core`
- [Release verification guide](../developers/release-verification.md)
- [Open questions backlog](../verification/open-questions.md)

## Verification

**Status:** Needs Review
**Primary sources checked:** Partially
**Notes:** GitHub release pages and source-tree verification-helper text were checked, and the release page was rechecked on 2026-07-02. MoreBC2 has not downloaded binaries, calculated hashes, verified manifests, verified detached signatures, confirmed trusted release keys, or resolved the exact release timestamp from API metadata.
