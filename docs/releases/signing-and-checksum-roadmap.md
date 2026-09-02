# Signing and checksum roadmap

**Category:** Releases
**Status:** Draft / Maintainer Statement and Roadmap context
**Last reviewed:** 2026-09-02

## Summary

This page separates maintainer-supplied release-signing roadmap context from current public cryptographic evidence.

The current release baseline is BitcoinII Core `v31.1.0`.

## Current public evidence

For `v31.1.0`, MoreBC2 has observed:

- the canonical GitHub release metadata;
- four uploaded Linux/Windows CLI/Qt assets;
- GitHub-reported SHA-256 digest metadata for those uploaded assets.

MoreBC2 has **not** established for the current release:

- a publisher checksum manifest such as `SHA256SUMS`;
- a signed checksum manifest such as `SHA256SUMS.asc`;
- detached release signatures;
- a trusted BitcoinII release-signing key path;
- independent MoreBC2 hashes for the `v31.1.0` assets;
- binary-to-source authenticity or reproducible-build proof.

GitHub-reported digests are hosting-provider metadata, not a substitute for a publisher-signed checksum trust path.

See [Authentication status](authentication-status.md).

## Historical integrity evidence

MoreBC2 independently hashed the `v29.1.0` release assets and generated source archives on 2026-08-27.

That historical integrity record is useful for `v29.1.0` only. It does not authenticate `v31.1.0` and should not be described as current-release verification.

## Maintainer statement

The repository owner has previously understood from maintainer conversation that release signing/signatures are roadmap work rather than an already deployed public verification system.

MoreBC2 records that as maintainer-supplied context only. It is not cryptographic evidence.

## Roadmap wording

Until project-controlled signing material is published and verified, use narrow wording:

- release signing/checksum publication has been discussed as roadmap work;
- current public trusted-key/signature infrastructure has not been established by MoreBC2;
- current GitHub digest metadata is useful for integrity metadata but not publisher authentication;
- documentation should be updated when a project-controlled verification process becomes public.

Do not convert roadmap context into current release evidence.

## Unknown

Still unresolved:

- where BitcoinII would publish checksum manifests;
- what manifest/signature filenames would be used;
- which signing keys would be trusted;
- whether release tags will use a project-controlled signing process;
- whether reproducible-build attestations will be published;
- what official guidance exchanges should follow when they require signed release artifacts.

## Related pages

- [v31.1.0 release assets](v31.1.0-assets.md)
- [Authentication status](authentication-status.md)
- [Release verification guide](release-verification-guide.md)
- [Verification evidence index](../verification/verification-index.md)
- [Historical v29.1.0 artifact audit](../verification/release-artifact-authentication-2026-08-27.md)

## Verification

**Status:** Draft / Maintainer Statement and Roadmap context
**Primary sources checked:** Current `v31.1.0` release metadata plus existing MoreBC2 release-verification records
**Notes:** This page records roadmap context and current evidence boundaries; it does not verify release signatures, checksums, or keys.