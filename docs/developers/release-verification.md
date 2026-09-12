# Release verification guide

**Category:** Developer guide
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page defines how MoreBC2 evaluates BitcoinII Core release artifacts. The current release baseline is `v31.1.0`; historical evidence must remain version-scoped.

## Core verification model

A strong release-authentication path connects downloaded bytes to a trusted project-controlled expectation, for example:

```text
release artifact
  -> independently calculated hash
  -> project-controlled expected hash / manifest
  -> authenticated signer or release process
  -> source/build provenance where practical
```

Reproducible-build evidence can further connect reviewed source to released binaries.

## Evidence separation

Do not collapse these into one broad "verified release" claim:

| Evidence | Supports | Does not prove by itself |
|---|---|---|
| GitHub release/API metadata | Release/version/assets were observed | Publisher-authenticated binary provenance |
| GitHub asset digest | Hosting-provider digest metadata | Maintainer-signed expected hash |
| Independent local hash | Fingerprint of the exact downloaded/extracted bytes | Publisher authenticity without a trusted expected value |
| GitHub verified commit | Cryptographic provenance for the source commit as reported by GitHub | Release-asset authenticity or reproducible build |
| Lightweight tag target | Which commit the release tag resolves to | A separately signed annotated tag |
| Signed checksum manifest | Strong artifact-authentication evidence when signer/key is trusted | Trust if key provenance is unknown |
| Reproducible-build evidence | Binary/source reproducibility | Publisher identity by itself |

## Current v31.1.0 finding

MoreBC2 has recorded:

- canonical release path `Bitcoin-II/BitcoinII-Core`;
- release `v31.1.0`, published 2026-08-29;
- **six** uploaded Linux/Windows/macOS release assets;
- GitHub-reported SHA-256 digest metadata for all six assets;
- lightweight tag `v31.1.0` resolving directly to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`;
- GitHub verification status `verified` / `valid` for that target commit;
- an independently calculated SHA-256 for the extracted Windows Qt executable used in the September 11 runtime tests, repeated consistently across the node/RPC and PSBT validation work.

The independently recorded executable hash is evidence for the exact binary tested. It is not an independent hash of the Windows release ZIP and is not a publisher-authenticated expected value.

MoreBC2 has **not yet** established for `v31.1.0`:

- independent local hashes of all six release archives;
- a publisher checksum manifest;
- a signed checksum manifest or detached asset signatures;
- a trusted BitcoinII release-signing-key path;
- binary-to-source provenance;
- reproducible-build proof.

Therefore `v31.1.0` has useful **partial provenance and integrity evidence**, but not a complete exchange-grade artifact-authentication chain.

See:

- [v31.1.0 asset record](../releases/v31.1.0-assets.md)
- [Release authentication status](../releases/authentication-status.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Historical v29.1.0 result

The 2026-08-27 `v29.1.0` audit recorded independent local hashes for its downloaded artifacts and bounded commit/tag evidence, but did not establish a BitcoinII publisher checksum/signature/trusted-key path or binary-to-source authenticity proof.

That remains historical evidence for `v29.1.0` only.

## Source-tree helper caveat

BitcoinII Core inherits release-process and verification-helper material describing checksum manifests, signatures, tags, and reproducible-build workflows. The existence of those helpers does not prove a particular BitcoinII release published or followed every described artifact/process.

## Per-release checklist

For every release, record:

- version and publication date;
- release URL and tag/ref;
- tag type and target commit;
- commit/tag verification state;
- asset names and sizes;
- hosting-provider digest metadata, if present;
- independently calculated archive hashes;
- independently calculated extracted-binary hashes when runtime testing is performed;
- checksum manifest and signature files, if present;
- trusted signing-key source;
- reproducible-build evidence, if present;
- reviewer/date and exact verification commands.

## Current release table

| Version | Currentness | Asset metadata | Independent integrity evidence | Publisher manifest/signature | Status |
|---|---|---|---|---|---|
| `v31.1.0` | Current | Six assets + GitHub digests recorded | Extracted Windows Qt executable hash repeated in dated runtime tests; all archive hashes not yet independently recorded | Not established | Reviewed / Partial |
| `v29.1.0` | Historical | Dated audit record | Historical local fingerprints recorded | Not established | Historical bounded partial |
| `v0.27.x` | Legacy | Partial redirected-path observations | Not established | Not established | Historical / Needs Review |

## Exchange/service standard

For exchange or service integration, prefer a chain that lets the operator independently fingerprint the release, compare it with a project-controlled expected value, authenticate that expected value through a trusted signer/process, and connect the binary to reviewed source where practical.

If BitcoinII does not yet provide the full chain, MoreBC2 should state the missing links rather than fill them with assumptions.

## Current priorities

1. Independently download/hash all six `v31.1.0` archives.
2. Search current project-controlled locations for checksum/signature/key guidance.
3. Determine whether a maintainer-approved verification procedure exists.
4. Attempt or document reproducible-build verification if feasible.
5. Preserve the distinction between commit authentication, archive integrity, executable integrity, and binary reproducibility.

## What not to claim

Do not claim:

- GitHub hosting alone authenticates a binary;
- GitHub digest metadata is equivalent to a signed publisher checksum;
- a GitHub verified commit authenticates release assets;
- the lightweight `v31.1.0` tag is itself a separately signed annotated tag;
- the repeated Windows executable hash authenticates the release ZIP or publisher;
- historical v29 hashes verify v31;
- inherited release-process documentation proves the current release followed that process.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current `v31.1.0` release metadata, tag/commit verification metadata, and September 11 runtime artifact records  
**Notes:** Refreshed on 2026-09-12. Six current assets and target-commit provenance are recorded; complete publisher-authenticated artifact verification and reproducible-build proof remain open.