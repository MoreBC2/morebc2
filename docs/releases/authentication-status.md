# Release authentication status

**Category:** Releases
**Status:** Reviewed / Clearly bounded partial
**Last reviewed:** 2026-09-12

## Summary

This page summarizes what MoreBC2 currently knows about BitcoinII Core release authentication.

The current release baseline is `v31.1.0`. The current GitHub release contains six uploaded binary archives. GitHub reports a SHA-256 digest for each one, and MoreBC2 independently hashed the Windows Qt archive used in the September 11 Windows runtime test and obtained the same SHA-256 value.

That one local hash match is useful repeat-byte integrity evidence. It does not establish publisher authentication of the release.

The deeper `v29.1.0` artifact audit remains preserved as historical evidence for that release only.

## Current v31.1.0 status

| Item | Status | Evidence / limit |
|---|---|---|
| Current release identity | Observed | `v31.1.0`, published 2026-08-29 on the canonical GitHub release path. |
| Release inventory freshness | Time-scoped | Release updated 2026-09-06; GitHub currently reports `immutable: false`. |
| Uploaded release asset inventory | Observed | Six uploaded binary archives currently recorded. |
| GitHub-reported SHA-256 digests | Observed hosting metadata | GitHub exposes SHA-256 digest metadata for all six uploaded assets. This is not a maintainer-signed checksum manifest. |
| Independent local artifact hashes | Partial | The Windows Qt archive was independently hashed on 2026-09-11 and matched GitHub's reported digest. The other five current assets have no independent MoreBC2 hash record yet. |
| Windows Qt executable fingerprint | Locally recorded | Extracted executable SHA-256 `8b918df903377565a9d7fa59d2d2dc087ed77155c858b2a0abcdee03f0423db5`; Authenticode `NotSigned`. |
| Tag type | Observed | `refs/tags/v31.1.0` currently points directly to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`, so the tag is lightweight. |
| Target commit signature state | Observed | GitHub reports `verified: true`, `reason: valid`, with a signature present in the commit-verification payload. |
| Publisher checksum manifest | Not established | No current release attachment such as `SHA256SUMS` or equivalent is present. |
| Detached release/asset signature | Not established | No current detached signature attachment has been established. |
| Published trusted BitcoinII release key | Not established | GitHub commit verification is not equivalent to a documented BitcoinII release-signing-key trust path. |
| Binary-to-source binding | Not established | No current uploaded binary has been proven to be a reproducible build of the tagged source. |
| Reproducible-build proof | Not established | No release-specific public reproducibility evidence has been established by MoreBC2. |

See [v31.1.0 release assets](v31.1.0-assets.md) and [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md).

## What the Windows Qt hash match means

The September 11 runtime test independently calculated:

```text
f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d
```

for `BitcoinII-v31.1-Win64-Qt.zip`, exactly matching GitHub's release-asset digest.

That supports saying the locally tested archive bytes matched the bytes represented by GitHub's current digest metadata for that asset.

It does **not** answer who should be trusted to define the expected hash, whether the archive was built from the tagged source, or whether a BitcoinII maintainer signed the archive or its checksum.

## Tag/commit authentication boundary

The `v31.1.0` tag currently resolves directly to a commit rather than to a separately signed annotated-tag object.

The target commit is reported by GitHub as cryptographically verified. This strengthens provenance for the commit object itself, but it does not create a cryptographic chain from that commit to the six uploaded binary archives.

For release authentication, keep these separate:

```text
tag target / source commit provenance
                    !=
release-asset integrity
                    !=
publisher-authenticated expected hashes
                    !=
binary-to-source reproducibility
```

## Inherited signing tooling is not current release proof

The BitcoinII Core source tree contains Bitcoin Core-derived Guix and release-process material that references `SHA256SUMS`, `SHA256SUMS.asc`, signature gathering, and binary verification.

Those inherited files show that the repository contains release-verification tooling and documentation. They do **not** establish that the BitcoinII `v31.1.0` release used that process, published matching attestations, or adopted Bitcoin Core's signing trust model.

A current repository search for `v31.1.0 SHA256SUMS` returned no release-specific result.

## Historical v29.1.0 authentication record

On 2026-08-27 MoreBC2 performed a deeper bounded integrity/authentication review of `v29.1.0`.

That record includes:

- 10 uploaded assets captured from GitHub API metadata;
- two GitHub-generated source archives recorded separately;
- independent local hashes for all 12 downloads;
- uploaded-asset size/hash comparison with GitHub metadata;
- bounded tag/commit signature review;
- searches for checksum manifests, detached signatures, and trusted BitcoinII release-key material.

The conclusion for that historical release remained that integrity fingerprints were recorded but publisher-authenticated binary provenance was not established.

See [Release-artifact authentication record — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md).

## Evidence boundary

Do not treat any of the following as equivalent to publisher-authenticated release binaries:

- a GitHub release page existing;
- GitHub-reported digest metadata;
- one or more local hash matches without an independently trusted expected value;
- a GitHub verified commit marker;
- a lightweight release tag;
- inherited release-verification tooling in the source tree;
- source comparison alone;
- historical hashes from another BitcoinII release.

A stronger release-verification path normally requires an independently trusted expected value or provenance path, such as a publisher-signed checksum manifest, trusted release key, reproducible-build attestation, or another maintainer-approved authentication process.

## Current next steps

1. Independently download and hash the other five `v31.1.0` assets.
2. Fingerprint the current GitHub-generated v31 source archives if they are used in verification.
3. Check project-controlled locations for current BitcoinII-specific checksum/signature/key material.
4. Document any maintainer-approved release trust path if one is published.
5. Keep commit authentication, archive integrity, platform code signing, and binary reproducibility as separate evidence classes.

## Related pages

- [Current v31.1.0 asset record](v31.1.0-assets.md)
- [Release verification guide](release-verification-guide.md)
- [Signing and checksum roadmap](signing-and-checksum-roadmap.md)
- [BitcoinII releases](../documentation/releases.md)
- [Historical v29.1.0 authentication record](../verification/release-artifact-authentication-2026-08-27.md)

## Verification

**Status:** Reviewed / Clearly bounded partial  
**Primary sources checked:** Current `v31.1.0` release/tag/commit metadata, repository search, and dated MoreBC2 release/runtime records  
**Notes:** Six current assets are observed; one current archive has an independent MoreBC2 hash match. Publisher-authenticated checksum/signature infrastructure and reproducible-build provenance remain unestablished.
