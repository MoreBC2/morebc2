# BitcoinII releases

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-09-02

## Summary

This page tracks public BitcoinII Core release information checked from GitHub.

It records release-page/API observations and verification boundaries. It does not prove release authenticity by itself.

## Canonical release path

Current operational release and source citations use:

- https://github.com/Bitcoin-II/BitcoinII-Core
- https://github.com/Bitcoin-II/BitcoinII-Core/releases

Older redirected repository/release paths are retained only as historical migration evidence.

## Current release: BitcoinII Core v31.1.0

Observed from the canonical GitHub release page/API:

- Release title: `BitcoinII v31.1.0`
- Tag: `v31.1.0`
- Target commitish: `main`
- Created: `2026-08-29T02:30:46Z`
- Published: `2026-08-29T02:39:30Z`
- Updated: `2026-08-29T02:39:30Z`

Release notes identify these consensus-level changes:

- ShockWave per-block difficulty adjustment
- consensus-level Ordinals, inscriptions, and Runes mitigation
- BC2 transaction replay protection
- fork-aware header synchronization
- associated wallet, mining, mempool, RPC, validation, and PSBT updates

### Uploaded assets observed

| Asset | Size bytes | GitHub-reported SHA-256 digest |
|---|---:|---|
| `BitcoinII-v31.1-Linux-CLI.tar.gz` | 8,839,080 | `78a88df783c2e15d09ea73c05065f7477cad34086b6e995991f7adeae781603f` |
| `BitcoinII-v31.1-Linux-Qt.tar.gz` | 20,629,261 | `745f6fc1cf7132357ca1ee09ea9c02873aac98cae92a6067ee3a26e8e5fd09ac` |
| `BitcoinII-v31.1-Win64-CLI.zip` | 9,116,723 | `74e052791cbd5183b1876693e5d99f474fb4165b795ba45d8f3c966bd5a7d687` |
| `BitcoinII-v31.1-Win64-Qt.zip` | 20,557,870 | `f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d` |

Important boundary: these digest values are GitHub hosting-provider metadata. MoreBC2 has not yet completed an independent `v31.1.0` artifact-authentication record equivalent to the dated `v29.1.0` audit.

See [v31.1.0 release assets](../releases/v31.1.0-assets.md).

## Historical release: v29.1.0

`v29.1.0` was the current documented release during MoreBC2's 2026-08-27 release-authentication work.

That dated work included:

- inventory of 10 uploaded release assets;
- separate recording of two GitHub-generated source archives;
- independent hashing of all 12 downloads;
- size/hash comparison with GitHub metadata;
- bounded tag/commit signature review;
- search for checksum manifests, detached signatures, and a trusted release-key path.

Those records remain valid historical evidence for `v29.1.0`, but `v29.1.0` is no longer the current release.

See:

- [v29.1.0 asset record](../releases/v29.1.0-assets.md)
- [Release-artifact authentication — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)

## Legacy redirected release path

Earlier MoreBC2 review observed legacy releases such as `v0.27.1` and `v0.27.0` on redirected older repository paths.

Those observations are migration/history evidence only and should not be used as the current operational release path.

## Current verification status

| Question | Current status |
|---|---|
| Canonical release path | Observed |
| Current release identity | `v31.1.0` observed |
| Current uploaded asset list | Observed |
| GitHub-reported asset digests | Observed |
| Independent v31.1.0 hashes | Not yet recorded |
| Publisher checksum manifest | Not established |
| Detached release signature | Not established |
| Trusted BitcoinII release key | Not established |
| Binary-to-source binding | Not established |
| Reproducible build proof | Not established |

## Open items

- Independently download and hash all `v31.1.0` assets.
- Check current tag/commit signature state.
- Check whether publisher checksum/signature material exists outside uploaded assets.
- Establish any maintainer-approved trusted release-key path.
- Keep historical `v29.1.0` verification clearly version-scoped.

## Sources

- Current release page: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- Canonical release index: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- [v31.1.0 release assets](../releases/v31.1.0-assets.md)
- [Release verification guide](../developers/release-verification.md)
- [Historical v29.1.0 authentication record](../verification/release-artifact-authentication-2026-08-27.md)

## Verification

**Status:** Needs Review
**Primary sources checked:** GitHub current release page/API plus existing MoreBC2 historical verification records
**Notes:** Current-release identity and metadata are refreshed to `v31.1.0`. Independent current-release authentication remains open.