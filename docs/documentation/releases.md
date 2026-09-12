# BitcoinII releases

**Category:** Documentation
**Status:** Reviewed / Partial authentication evidence
**Last reviewed:** 2026-09-12

## Summary

This page summarizes the current BitcoinII Core release state and the evidence boundary around source provenance, asset integrity, and binary authentication.

Current release metadata is observable from GitHub. That is not the same thing as proving that every binary is independently authenticated or reproducibly built from the tagged source.

## Canonical release path

Current operational source/release citations use:

- https://github.com/Bitcoin-II/BitcoinII-Core
- https://github.com/Bitcoin-II/BitcoinII-Core/releases

Older redirected repository/release paths remain historical migration evidence only.

## Current release: BitcoinII Core v31.1.0

Observed current release metadata:

- Release title: `BitcoinII v31.1.0`
- Tag: `v31.1.0`
- Published: `2026-08-29T02:39:30Z`
- Tag target commit: `8daaf7b12e71d3646eed787f040bf2899a69dc1c`

Release notes identify these major current changes:

- ShockWave per-block difficulty adjustment;
- consensus-level Ordinals/inscriptions/Runes mitigation;
- BC2 transaction replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

## Current uploaded assets

GitHub currently records **six** uploaded `v31.1.0` assets:

| Asset | GitHub-reported SHA-256 digest |
|---|---|
| `BitcoinII-v31.1-Linux-CLI.tar.gz` | `78a88df783c2e15d09ea73c05065f7477cad34086b6e995991f7adeae781603f` |
| `BitcoinII-v31.1-Linux-Qt.tar.gz` | `745f6fc1cf7132357ca1ee09ea9c02873aac98cae92a6067ee3a26e8e5fd09ac` |
| `BitcoinII-v31.1-Win64-CLI.zip` | `74e052791cbd5183b1876693e5d99f474fb4165b795ba45d8f3c966bd5a7d687` |
| `BitcoinII-v31.1-Win64-Qt.zip` | `f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d` |
| `BitcoinII-Core-v31.1-x86_64-apple.zip` | `ec44c2472c3501b2f853393a797cf5a8bdfa2292f375630c772723218ce3b7a8` |
| `BitcoinII-Core-v31.1-arm64.zip` | `e41f5dc4fc16277883aa12b9f92dc2043cb38fc355eed01da619ba5f7bf43acc` |

These are GitHub hosting-provider digest fields. They are not a maintainer-signed BitcoinII checksum manifest.

See [v31.1.0 release assets](../releases/v31.1.0-assets.md).

## Tag and source-commit provenance

The `v31.1.0` Git ref is a **lightweight tag** pointing directly to commit:

`8daaf7b12e71d3646eed787f040bf2899a69dc1c`

GitHub reports that target commit as cryptographically verified with a valid signature.

This is useful source-commit provenance evidence.

It does **not** prove:

- that the lightweight tag itself is an annotated/signed tag object;
- that every release archive is individually signed;
- that every binary was reproducibly built from that commit;
- that GitHub's asset digest metadata was signed by a BitcoinII maintainer.

## September Windows artifact evidence

MoreBC2's September 11 Windows `v31.1.0` node/RPC and PSBT tests used the release archive:

`BitcoinII-v31.1-Win64-Qt.zip`

The locally calculated archive SHA-256 was:

`f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d`

That exactly matched GitHub's recorded asset digest.

The extracted `bitcoinII-qt.exe` reported `v31.1.0` at runtime, and the same executable hash was observed across the two September test efforts.

This is meaningful byte-integrity/runtime-identity evidence for that tested Windows artifact. It is still not a publisher-authenticated checksum path or reproducible-build proof.

## Current authentication status

| Question | Current status |
|---|---|
| Canonical release path | Established |
| Current release identity | `v31.1.0` established |
| Current uploaded asset list | Six assets recorded |
| GitHub-reported asset digests | Recorded |
| Target commit identity | Recorded |
| Target commit GitHub verification | `verified` / `valid` |
| Independent Windows Qt archive hash | Matches GitHub digest |
| Independent hashes for all six assets | Not completed |
| Maintainer-signed checksum manifest | Not established |
| Detached signatures for every binary | Not established |
| Documented trusted BitcoinII release-signing-key process | Not established |
| Binary-to-source reproducibility | Not established |

## Historical v29.1.0 evidence

MoreBC2's August 27 release-authentication work remains valid historical evidence for `v29.1.0` only.

That work included independent hashing/inventory and bounded signature/provenance review. It must not be reused as authentication proof for `v31.1.0`.

See:

- [v29.1.0 asset record](../releases/v29.1.0-assets.md)
- [Release-artifact authentication — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)

## Current safe wording

A careful current statement is:

> BitcoinII Core v31.1.0 is the current documented release. GitHub records six release assets and SHA-256 digest metadata, and the lightweight v31.1.0 tag points to a GitHub-verified signed commit. MoreBC2 independently matched the Windows Qt archive to GitHub's digest during September runtime testing, but a maintainer-signed checksum manifest and reproducible-build proof have not been established.

## Related pages

- [Release section](../releases/README.md)
- [v31.1.0 release assets](../releases/v31.1.0-assets.md)
- [Release authentication status](../releases/authentication-status.md)
- [Release verification guide](../releases/release-verification-guide.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial authentication evidence  
**Primary sources checked:** Current GitHub release/tag/commit metadata, six-asset v31.1.0 inventory, September Windows artifact/runtime records, and historical v29 authentication evidence  
**Notes:** Current release identity, six assets, GitHub digests, lightweight-tag target, verified target commit, and the tested Windows Qt archive hash are established. Full six-asset independent hashing, maintainer-signed release checksums/signatures, and reproducible-build proof remain open.
