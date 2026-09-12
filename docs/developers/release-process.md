# Release process guide

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page documents what MoreBC2 can establish about the public BitcoinII Core release process. It does not claim knowledge of private maintainer procedures and does not treat GitHub hosting metadata as a complete binary-authentication chain.

## Current observed release path

Current canonical public release path:

- `https://github.com/Bitcoin-II/BitcoinII-Core/releases`

Older release locations are historical only unless re-established by current project-controlled evidence.

## Current v31.1.0 release evidence

MoreBC2 currently records:

- release `BitcoinII Core v31.1.0`;
- tag `v31.1.0`;
- publication timestamp `2026-08-29T02:39:30Z`;
- **six** uploaded release assets: Linux CLI, Linux Qt, Windows CLI, Windows Qt, macOS x86_64, and macOS arm64;
- GitHub-reported SHA-256 digest metadata for all six assets;
- lightweight tag `v31.1.0` resolving directly to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`;
- GitHub verification of that target commit as a valid signed commit.

The tag itself is not a separate annotated/signed tag object. The verified source commit does not prove that the six release binaries were reproducibly built from that commit or individually authenticated by the same signer.

See [BitcoinII Core v31.1.0 release assets](../releases/v31.1.0-assets.md).

## Runtime artifact evidence

The September 11 Windows runtime validations independently recorded the SHA-256 of the extracted `bitcoinII-qt.exe` used for testing and repeated the same executable hash across the node/RPC and PSBT test work.

That is useful byte-integrity evidence for the exact executable tested. It is **not** an independent hash of the release ZIP archive, a publisher-authenticated expected hash, or reproducible-build proof.

## Source-tree process documents

Current source-tree review found inherited release-process material including:

- `doc/release-process.md`
- `contrib/verify-binaries/README.md`

Those files describe intended/helper workflows involving tags, attestations, checksums, and key-based verification. Their presence does not prove that BitcoinII `v31.1.0` published or followed every artifact/process described there.

## Authentication boundary

Current public evidence does not yet establish:

- a BitcoinII maintainer-signed checksum manifest for `v31.1.0`;
- detached signatures over the six release assets;
- a documented trusted BitcoinII release-signing-key path;
- independent local hashing of all six release archives;
- binary-to-source provenance;
- reproducible-build proof.

These are separate questions from whether GitHub reports an asset digest or a source commit is verified.

## Per-release record

For each release, record:

- version and publication date;
- canonical release URL and tag/ref;
- source commit and tag type;
- commit/tag verification state;
- asset names, sizes, and hosting-provider digests;
- independently calculated hashes, when performed;
- checksum/signature files, when present;
- trusted signing-key source;
- reproducible-build evidence, when present;
- exact reviewer/date and commands for local verification.

## What this page does not claim

Do not claim that:

- GitHub hosting alone authenticates a binary;
- a GitHub asset digest is equivalent to a maintainer-signed checksum;
- a verified source commit authenticates the release binaries;
- an independently repeated executable hash authenticates the release archive or publisher;
- historical v29 verification automatically applies to v31;
- inherited release-process documentation proves the current release followed that process.

## Current priorities

1. Independently download and hash all six `v31.1.0` release archives.
2. Check current project-controlled locations for checksum/signature/key guidance.
3. Determine whether maintainers publish a preferred release-authentication procedure.
4. Attempt or document reproducible-build verification if feasible.
5. Keep source-commit authentication, archive integrity, extracted-binary integrity, and reproducibility as separate claims.

## Sources

- Current BitcoinII Core releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- [Current v31.1.0 asset record](../releases/v31.1.0-assets.md)
- [Release verification guide](release-verification.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current `v31.1.0` release metadata, tag/commit verification metadata, and September 11 runtime artifact records  
**Notes:** Current public release inventory and source-commit provenance are recorded. Publisher-signed artifact authentication and reproducible-build evidence remain unresolved.