# Signing and checksum roadmap

**Category:** Releases
**Status:** Draft / Maintainer Statement and Roadmap context
**Last reviewed:** 2026-07-13

## Summary

This page separates maintainer-supplied release-signing roadmap context from current public cryptographic evidence.

Canonical evidence:

- [Verification evidence index](../verification/verification-index.md)
- [Project status](../../PROJECT_STATUS.md)
- [Private review readiness](../verification/private-review-readiness.md)
- [Developer release verification guide](../developers/release-verification.md)

## Current public evidence

Current MoreBC2 records do not establish:

- uploaded `SHA256SUMS`,
- uploaded `SHA256SUMS.asc`,
- detached release signatures,
- signed annotated release tag,
- trusted BitcoinII release-key path,
- independent binary hash record,
- binary authenticity.

See [Authentication status](authentication-status.md).

## Maintainer Statement

The current [Project status](../../PROJECT_STATUS.md) records that the repository owner has spoken with the maintainer and understands release signing and signatures to be roadmap work that is not implemented yet.

MoreBC2 records that as maintainer-supplied context only.

It is not:

- a checksum manifest,
- a detached signature,
- a release key,
- a verified binary,
- proof that future signing is already available.

## Roadmap

Current roadmap wording should stay narrow:

- release signing and checksums are planned,
- current public signing/checksum/trusted-key infrastructure has not been established,
- documentation should be updated when public signing material exists.

Do not convert roadmap context into current release evidence.

## Unknown

Still unknown:

- where BitcoinII will publish checksum manifests,
- whether manifests will be named `SHA256SUMS`,
- whether signatures will be named `SHA256SUMS.asc`,
- which signing keys will be trusted,
- whether tags will become signed annotated tags,
- whether Guix or other reproducible-build attestations will be published,
- what guidance exchanges should follow today if they require signed release artifacts.

## Verification

**Status:** Draft / Maintainer Statement and Roadmap context  
**Primary sources checked:** Existing MoreBC2 project status and release verification records linked above  
**Notes:** This page records current roadmap context and unknowns. It does not verify release signatures, checksums, or keys.
