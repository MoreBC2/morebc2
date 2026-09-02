# Release verification guide

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page defines how MoreBC2 should evaluate BitcoinII Core release artifacts.

The current release baseline is `v31.1.0`. The deeper 2026-08-27 verification work applies to historical `v29.1.0` only and is preserved as version-scoped evidence.

## Core verification model

Release verification should establish that downloaded bytes match what the BitcoinII project intended to publish.

A strong normal path is:

```text
release binary
  -> independently calculated SHA256
  -> project-controlled checksum manifest
  -> signature over that manifest
  -> trusted BitcoinII release key / independently trusted release process
```

Reproducible-build evidence can further strengthen the connection between reviewed source and released binaries.

## Evidence separation

Do not collapse these into one broad "verified release" claim:

| Evidence | Supports | Does not prove by itself |
|---|---|---|
| GitHub release/API metadata | Release/version/assets were observed. | Publisher-authenticated binary provenance. |
| GitHub API digest | Hosting-provider digest metadata for an uploaded asset. | A maintainer-signed expected hash. |
| Independent local SHA-256 | Fingerprint of downloaded bytes. | Publisher authenticity without a trusted expected value. |
| GitHub verified commit | GitHub service/commit signature status. | Release asset authenticity or signed release tag. |
| Source/tag comparison | Source differences or tag identity. | That binaries were built from that source. |
| Signed checksum manifest | Strong artifact-authentication evidence when the key is trusted. | Trust if signer/key provenance is unknown. |
| Reproducible-build attestation | Binary/source reproducibility evidence. | Publisher identity unless its trust path is established. |

## Current v31.1.0 finding

MoreBC2 has currently recorded:

- canonical release path `Bitcoin-II/BitcoinII-Core`;
- release `v31.1.0`, published 2026-08-29;
- four uploaded Linux/Windows CLI/Qt release assets;
- GitHub-reported SHA-256 digest metadata for those four assets.

MoreBC2 has **not yet** recorded for `v31.1.0`:

- independent local hashes of all release assets;
- a publisher checksum manifest;
- a signed checksum manifest or detached asset signature;
- a trusted BitcoinII release-signing key path;
- current tag/commit signature analysis comparable to the historical audit;
- binary-to-source provenance;
- reproducible-build proof.

Therefore the current release remains **Needs Review** from an authentication standpoint.

See:

- [v31.1.0 asset record](../releases/v31.1.0-assets.md)
- [Release authentication status](../releases/authentication-status.md)

## Historical v29.1.0 result

The 2026-08-27 `v29.1.0` audit recorded:

- 10 uploaded assets and two generated source archives;
- independent local SHA-256 fingerprints for all 12 downloads;
- agreement between uploaded-asset local hashes/sizes and GitHub metadata;
- a lightweight release tag pointing to a commit;
- bounded verification of that commit against GitHub's web-flow service key;
- no established BitcoinII publisher checksum/signature/trusted-key path;
- no binary-to-source authenticity proof.

That evidence remains useful for `v29.1.0` history, but must not be used to imply that `v31.1.0` has already undergone the same procedure.

See [Release-artifact authentication — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md).

## Source-tree helper caveat

BitcoinII Core inherits release-process and verification-helper material describing checksum manifests, signatures, signed tags, and reproducible-build workflows.

The existence of those helper documents does not prove a particular BitcoinII release actually published or followed every artifact/process described there. Release-specific evidence must be checked directly.

## Per-release checklist

For every release, record:

- version and publication date;
- release URL and tag/ref;
- release commit/tag signature state;
- asset names and sizes;
- GitHub-reported digest metadata, if present;
- independently calculated SHA-256 values;
- checksum manifest and signature files, if present;
- trusted signing-key source;
- reproducible-build evidence, if present;
- reviewer/date and exact verification commands.

## Current release table

| Version | Currentness | Asset metadata | Independent hashes | Publisher manifest/signature | Status |
|---|---|---|---|---|---|
| `v31.1.0` | Current | Four uploaded assets + GitHub digests recorded | Not yet | Not established | Needs Review |
| `v29.1.0` | Historical | Complete dated audit record | Yes, integrity fingerprints | Not established | Historical bounded partial |
| `v0.27.x` | Legacy | Partial redirected-path observations | No | Not established | Historical / Needs Review |

## Exchange/service standard

For exchange or service integration, prefer a chain that lets the operator:

1. download the release asset;
2. independently calculate its hash;
3. compare against a project-controlled expected value;
4. authenticate that expected value with a trusted signer/process;
5. verify release/source provenance where practical.

If BitcoinII does not yet provide the full chain, MoreBC2 should state the missing links rather than filling them with assumptions.

## Current priorities

1. Independently download/hash `v31.1.0` assets.
2. Record current tag/commit signature state.
3. Search current project-controlled locations for checksum/signature/key guidance.
4. Determine whether a reproducible-build path exists for the current release.
5. Document any maintainer-approved verification process.

## What not to claim

Do not claim:

- GitHub hosting alone authenticates a binary;
- GitHub digest metadata is equivalent to a signed publisher checksum;
- a GitHub verified commit authenticates release assets;
- historical `v29.1.0` hashes verify `v31.1.0`;
- inherited release-process documentation proves a current release followed that process;
- a missing public GitHub path proves signature material cannot exist elsewhere.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release metadata plus historical MoreBC2 `v29.1.0` verification records
**Notes:** This page defines the current release-verification standard and preserves the version boundary between current metadata and historical deeper evidence.