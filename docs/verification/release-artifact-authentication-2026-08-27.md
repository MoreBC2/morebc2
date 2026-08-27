# BitcoinII Core v29.1.0 release-artifact authentication — 2026-08-27

**Category:** Verification
**Status:** Draft / Dated integrity record
**Date checked:** 2026-08-27

## Summary

MoreBC2 downloaded and independently hashed all 10 uploaded BitcoinII Core `v29.1.0` release assets and the two GitHub-generated source archives shown with the release. Every uploaded asset's local byte size and SHA-256 matched the corresponding GitHub API metadata.

That result records the exact bytes retrieved and provides fingerprints for repeat-download comparison. It does **not** authenticate the artifacts. No publisher checksum manifest, detached release signature, BitcoinII release-key trust path, public build attestation, or reproducible-build proof was found that binds the uploaded artifacts to the tagged source.

**Authentication conclusion:** **INTEGRITY RECORDED, AUTHENTICITY UNVERIFIED**

## Scope and method

- Canonical repository: `Bitcoin-II/BitcoinII-Core`
- Release page: `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v29.1.0`
- GitHub release ID: `265642298`
- Release tag: `v29.1.0`
- Tag target: `3f2a352467750425ec28abe3505a5db5bbc5fa35`
- Retrieval and verification date: `2026-08-27`
- Verification host: Windows, America/New_York
- Download location: temporary workspace outside the MoreBC2 repository
- Hash command: PowerShell `Get-FileHash -Algorithm SHA256`

The binaries were not executed. Archive member lists were read to check that the downloads were structurally readable and to search for obvious embedded checksum, manifest, and detached-signature files.

## Evidence categories

| Category | Finding | Boundary |
|---|---|---|
| Artifact integrity | Local SHA-256 and byte size recorded for all 12 release-page downloads. The 10 uploaded assets matched GitHub API size and digest metadata. | A locally calculated hash is a fingerprint of retrieved bytes, not an authenticated expected value. |
| Publisher-provided checksums | None found for `v29.1.0`. | GitHub's asset `digest` field is hosting-provider metadata, not a publisher checksum manifest. |
| Cryptographic authenticity | The source commit has a mathematically valid signature by GitHub's web-flow key. No release-asset or manifest signature tied to a BitcoinII-trusted key was found. | A GitHub service signature on source commit data does not authenticate uploaded binaries. |
| Reproducibility | Guix and verification tooling exists in the source tree. No release-specific builder attestations or independently reproduced matching outputs were found. | Tooling and inherited process text are not proof that `v29.1.0` was reproducibly built. |
| Hosting/provenance | Release, tag, uploader, asset IDs, timestamps, URLs, sizes, and GitHub digests were observed. | GitHub hosting, HTTPS, uploader identity, filenames, and version strings are not cryptographic release authentication. |

## Release metadata

| Field | Observed value |
|---|---|
| Title | `BitcoinII Core v29.1.0` |
| Author / asset uploader | `KvantaMechanic` |
| Target commitish | `main` |
| Created | `2025-11-27T04:20:37Z` |
| Published | `2025-11-27T04:22:39Z` |
| Last updated | `2026-06-22T21:25:13Z` |
| Draft / prerelease | `false` / `false` |
| GitHub immutable-release flag | `false` |

These are GitHub hosting observations only.

## Uploaded artifacts and independent hashes

The release download base is `https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/`.

| # | Artifact | Platform / architecture | Bytes | Local SHA-256 | GitHub size and digest match | Source |
|---:|---|---|---:|---|---|---|
| 1 | `BitcoinII-29.1.0-aarch64-linux-CLI.tar.gz` | Linux aarch64 CLI | 7,313,922 | `90a2a4ac94d5acad2d1ba0aa0bbf1947bf308517b6b1c07e06e615e96a5a362d` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-aarch64-linux-CLI.tar.gz) |
| 2 | `BitcoinII-29.1.0-aarch64-linux-GUI.tar.gz` | Linux aarch64 GUI | 19,831,620 | `e5e05ce463e8014fbcbec42596a1716367ec42504aa3c70748527c68c640b5f5` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-aarch64-linux-GUI.tar.gz) |
| 3 | `BitcoinII-29.1.0-arm-linux-gnueabihf-CLI.tar.gz` | Linux arm gnueabihf CLI | 6,820,132 | `da0ef9a87f6ff996497d31a81b0e88b207c940fc188dbf5d66d59602fb632438` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-arm-linux-gnueabihf-CLI.tar.gz) |
| 4 | `BitcoinII-29.1.0-arm-linux-gnueabihf-GUI.tar.gz` | Linux arm gnueabihf GUI | 17,911,678 | `72f3a36f27b354788c4bf8713dce32851ca57b1ee2aed3e721f4479fc03aa5ac` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-arm-linux-gnueabihf-GUI.tar.gz) |
| 5 | `BitcoinII-29.1.0-arm64-apple-darwin.zip` | macOS arm64 GUI bundle | 15,810,838 | `f781951949d00be8b1923373278c6f62823c0286db33cbd46a3abf5f8da2b54a` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-arm64-apple-darwin.zip) |
| 6 | `BitcoinII-29.1.0-x86_64-apple-darwin.zip` | macOS x86_64 GUI bundle | 17,133,023 | `ca7b2464f70997f96bccb615eb0951ade6effd5aa11427f20b25ff1e4ade415b` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-x86_64-apple-darwin.zip) |
| 7 | `BitcoinII-29.1.0-x86_64-linux-CLI.tar.gz` | Linux x86_64 CLI | 7,812,863 | `4e4e05bc85b7a8376a1a29ee347239d52f20aad860bcbace1867a79db98ad204` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-x86_64-linux-CLI.tar.gz) |
| 8 | `BitcoinII-29.1.0-x86_64-linux-GUI.tar.gz` | Linux x86_64 GUI | 20,480,068 | `db4c5ae92f7b18373a4222c7d78c1769265e33324651fc3393ce9fb4f3255680` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-x86_64-linux-GUI.tar.gz) |
| 9 | `BitcoinII-29.1.0-x86_64-win64-CLI.zip` | Windows x86_64 CLI | 7,987,528 | `94985c39c2e99406b50b3a318442677ffa3df6f9d471c03cb30f1fb0c4b8fa3a` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-x86_64-win64-CLI.zip) |
| 10 | `BitcoinII-29.1.0-x86_64-win64-GUI.zip` | Windows x86_64 GUI | 19,362,931 | `02eb5ebaf57b870cecc8f75b00af8da91e299eeb760e96a75fdc56b66c04ff09` | Yes / Yes | [download](https://github.com/Bitcoin-II/BitcoinII-Core/releases/download/v29.1.0/BitcoinII-29.1.0-x86_64-win64-GUI.zip) |

### GitHub asset metadata

| Artifact | Asset ID | Content type | Created | Updated |
|---|---:|---|---|---|
| `BitcoinII-29.1.0-aarch64-linux-CLI.tar.gz` | `321356813` | `application/gzip` | `2025-11-27T04:22:19Z` | `2025-11-27T04:22:22Z` |
| `BitcoinII-29.1.0-aarch64-linux-GUI.tar.gz` | `321356822` | `application/gzip` | `2025-11-27T04:22:22Z` | `2025-11-27T04:22:24Z` |
| `BitcoinII-29.1.0-arm-linux-gnueabihf-CLI.tar.gz` | `321356835` | `application/gzip` | `2025-11-27T04:22:26Z` | `2025-11-27T04:22:26Z` |
| `BitcoinII-29.1.0-arm-linux-gnueabihf-GUI.tar.gz` | `321356838` | `application/gzip` | `2025-11-27T04:22:26Z` | `2025-11-27T04:22:27Z` |
| `BitcoinII-29.1.0-arm64-apple-darwin.zip` | `324673615` | `application/zip` | `2025-12-05T08:28:37Z` | `2025-12-05T08:28:41Z` |
| `BitcoinII-29.1.0-x86_64-apple-darwin.zip` | `331438160` | `application/zip` | `2025-12-21T20:12:09Z` | `2025-12-21T20:12:13Z` |
| `BitcoinII-29.1.0-x86_64-linux-CLI.tar.gz` | `321356847` | `application/gzip` | `2025-11-27T04:22:27Z` | `2025-11-27T04:22:28Z` |
| `BitcoinII-29.1.0-x86_64-linux-GUI.tar.gz` | `321356851` | `application/gzip` | `2025-11-27T04:22:28Z` | `2025-11-27T04:22:29Z` |
| `BitcoinII-29.1.0-x86_64-win64-CLI.zip` | `454972307` | `application/zip` | `2026-06-22T21:24:52Z` | `2026-06-22T21:24:56Z` |
| `BitcoinII-29.1.0-x86_64-win64-GUI.zip` | `454972570` | `application/zip` | `2026-06-22T21:25:11Z` | `2026-06-22T21:25:13Z` |

All 10 records reported state `uploaded` and uploader `KvantaMechanic`.

## GitHub-generated source archives

These two downloads are generated by GitHub from the tag and are not entries in the release API's uploaded `assets` list. GitHub did not provide uploaded-asset size or digest metadata for them.

| Artifact | Bytes | Local SHA-256 | Source |
|---|---:|---|---|
| `BitcoinII-Core-29.1.0-source.tar.gz` | 12,233,693 | `3ff391329b90ebfc4851de870e5e621e0347f7ab362c2173f90f4da539000f1f` | [tag tarball](https://github.com/Bitcoin-II/BitcoinII-Core/archive/refs/tags/v29.1.0.tar.gz) |
| `BitcoinII-Core-29.1.0-source.zip` | 13,745,614 | `c64dba331f8a3a4adde2ee1eeac3ae0ac79dbb50f687ce6c4aa57340306c309b` | [tag zipball](https://github.com/Bitcoin-II/BitcoinII-Core/archive/refs/tags/v29.1.0.zip) |

These local hashes are retrieval fingerprints only. They are not publisher-provided expected values, and GitHub-generated archive bytes should not be assumed to be a stable distribution format without a separately authenticated expected hash.

## Checksum and signature search

The following were checked:

- all release asset names and release text;
- member names in all 12 downloaded archives;
- the canonical source tree at `v29.1.0`;
- canonical repository history and release-related documentation;
- obvious public `guix.sigs`, `gitian.sigs`, and detached-signature repository paths;
- GitHub's public artifact-attestation API for each uploaded asset digest.

Findings:

- No `SHA256SUMS`, `SHA256SUMS.asc`, checksum manifest, `.asc`, `.sig`, minisign/signify signature, release key, provenance file, or release-specific build attestation was published as a `v29.1.0` uploaded asset.
- No such detached authentication material was found inside the downloaded archives.
- GitHub's asset digest metadata matched the locally retrieved uploaded assets, but it is not publisher-signed checksum evidence.
- Public GitHub API checks for `Bitcoin-II/guix.sigs`, `Bitcoin-II/gitian.sigs`, `Bitcoin-II/BitcoinII-detached-sigs`, and the source-documented `bitcoinII-core` variants returned `404` on 2026-08-27. This is a dated public-visibility check, not proof that private, renamed, deleted, or externally hosted material never existed.
- GitHub's artifact-attestation endpoint returned `404` for all 10 uploaded asset digests. No public GitHub provenance attestation was established by that check.

## Platform signature observations

- PowerShell `Get-AuthenticodeSignature` reported `NotSigned` for `bitcoinII-cli.exe`, `bitcoinIId.exe`, and `bitcoinII-qt.exe` extracted from the two Windows archives.
- Both macOS archives contain `BitcoinII-Qt.app/Contents/_CodeSignature/CodeResources`. The tagged README nevertheless describes the macOS binaries as unsigned and not notarized. A macOS `codesign`/Gatekeeper verification was not available on this Windows host, so no signer identity or platform trust result is claimed.
- No detached signature tied to any Linux archive was found.

An embedded platform-signing structure, even when present, is not a substitute for an authenticated release manifest, and no macOS authenticity conclusion is drawn from the bundle layout alone.

## Tag and commit authentication

`refs/tags/v29.1.0` points directly to commit `3f2a352467750425ec28abe3505a5db5bbc5fa35`. `git cat-file -t v29.1.0` returned `commit`, so the tag is lightweight and has no separate annotated tag object or tag-object signature.

The commit contains a PGP signature. GitHub's commit API reports `verified: true`, reason `valid`, and `verified_at: 2025-11-27T04:20:37Z`.

Local verification proceeded in two stages:

1. `git verify-commit` identified RSA key ID `B5690EEEBB952194` but could not check the signature before a public key was supplied.
2. GitHub's published [`web-flow.gpg`](https://github.com/web-flow.gpg) key was imported into an isolated temporary keyring. `git verify-commit` then reported a good signature from `GitHub <noreply@github.com>` with fingerprint `9684 79A1 AFF9 27E3 7D1A 566B B569 0EEE BB95 2194`. GPG reported the key's local trust as unknown because the isolated keyring had no user-certified trust relationships.

[GitHub documents](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) that commits made through its web interface are automatically signed by GitHub and identifies `web-flow.gpg` as the key for local verification. This establishes service-key provenance through GitHub's own publication and confirms that the commit data matches a GitHub web-flow signature. It does not establish an independently trusted BitcoinII maintainer-controlled release key, a signed tag, or any authenticated link from the source commit to the uploaded assets.

## Process and reproducibility findings

The source tree contains Bitcoin Core-style tooling and documentation, including:

- [`contrib/guix`](https://github.com/Bitcoin-II/BitcoinII-Core/tree/v29.1.0/contrib/guix) build, attestation, and verification tooling;
- [`contrib/verify-binaries/verify.py`](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/contrib/verify-binaries/verify.py);
- [`doc/release-process.md`](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/doc/release-process.md) instructions for Guix attestations, signed tags, `SHA256SUMS`, and `SHA256SUMS.asc`.

Those materials entered the canonical repository together in the 2025-11-26 canonical-source import. The verification helper still names Bitcoin Core hosts, and the release-process text refers to signature repositories that were not publicly found. The `v29.1.0` release has none of the checksum or attestation outputs that the documented process describes.

Therefore:

- the source tree contains reproducible-build capability and inherited process guidance;
- MoreBC2 did not find release-specific builder attestations;
- MoreBC2 did not independently reproduce any release build;
- no binary-to-source equivalence has been established.

## Safe use of these hashes

The hashes in this record can be used to identify the exact bytes retrieved by MoreBC2 on 2026-08-27 and to compare a later retrieval against that observation.

They must not be presented as authenticated publisher checksums. A future verifier still needs an authenticated expected value, such as a publisher manifest signed by a documented BitcoinII release key or independently reviewed reproducible-build attestations.

## Remaining gaps

- Publisher-provided checksum manifest for the 10 uploaded assets.
- Detached signature over that manifest or over individual artifacts.
- BitcoinII-controlled release signing key and documented fingerprint trust path.
- Signed annotated release tag, or a documented reason for relying on another source trust mechanism.
- Authenticated binding between tagged source and uploaded artifacts.
- Public builder attestations and independently matching reproducible builds.
- Native macOS signature/notarization verification for the two macOS bundles.

## Verification

**Status:** Draft / Dated integrity record
**Primary sources checked:** Canonical GitHub release page and API; all 10 uploaded assets; both GitHub-generated tag archives; canonical `v29.1.0` tag, commit, source tree, and history; GitHub web-flow signing-key documentation and key; public signature-repository and artifact-attestation endpoints
**Notes:** Integrity was recorded. Release-artifact authenticity remains unverified.
