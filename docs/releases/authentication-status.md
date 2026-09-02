# Release authentication status

**Category:** Releases
**Status:** Draft / Clearly bounded partial
**Last reviewed:** 2026-09-02

## Summary

This page summarizes what MoreBC2 currently knows about BitcoinII Core release authentication.

The current release baseline is `v31.1.0`. MoreBC2 has observed current release metadata and GitHub-reported SHA-256 digests, but has **not** yet completed an independent `v31.1.0` artifact-authentication record.

The deeper `v29.1.0` artifact audit remains preserved as historical evidence for that release only.

## Current v31.1.0 status

| Item | Status | Evidence / limit |
|---|---|---|
| Current release identity | Observed | `v31.1.0`, published 2026-08-29 on the canonical GitHub release path. |
| Uploaded release asset inventory | Observed | Four Linux/Windows CLI/Qt assets are recorded. |
| GitHub-reported SHA-256 digests | Observed hosting metadata | GitHub API exposes SHA-256 digest metadata for the four uploaded assets. This is not a maintainer-signed checksum manifest. |
| Independent local artifact hashes | Not yet recorded for v31.1.0 | The historical `v29.1.0` hashes do not authenticate or fingerprint the new release. |
| Publisher checksum manifest | Not established | No current BitcoinII publisher-signed checksum path has been established by MoreBC2. |
| Detached release signature | Not established | No current detached signature path has been established by MoreBC2. |
| Published trusted BitcoinII release key | Not established | GitHub service-key verification is not equivalent to a BitcoinII release-signing key. |
| Binary-to-source binding | Not established | Current binaries have not been proven to match reviewed source. |
| Reproducible-build proof | Not established | No release-specific public reproducibility evidence has been established by MoreBC2. |

See [v31.1.0 release assets](v31.1.0-assets.md).

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

Do not treat any of the following as equivalent to independent release authentication:

- a GitHub release page existing;
- GitHub-reported digest metadata;
- a GitHub verified commit marker;
- source comparison alone;
- historical hashes from another BitcoinII release.

A stronger release-verification path normally requires an independently trusted expected value, such as a publisher-signed checksum manifest, trusted release key, reproducible-build attestation, or another maintainer-approved authentication process.

## Current next steps

1. Independently download and hash all `v31.1.0` assets.
2. Record the current tag/commit signature state.
3. Search current project-controlled locations for checksum/signature material.
4. Document any maintainer-approved release trust path.
5. Keep binary-to-source reproducibility separate from simple download integrity.

## Related pages

- [Verification evidence index](../verification/verification-index.md)
- [Current v31.1.0 asset record](v31.1.0-assets.md)
- [Release verification guide](release-verification-guide.md)
- [BitcoinII releases](../documentation/releases.md)
- [Historical v29.1.0 authentication record](../verification/release-artifact-authentication-2026-08-27.md)

## Verification

**Status:** Draft / Clearly bounded partial
**Primary sources checked:** Current `v31.1.0` release metadata plus existing dated MoreBC2 release-verification records
**Notes:** Current release metadata and hosting-provider digests are observed; independent `v31.1.0` release authentication remains open.