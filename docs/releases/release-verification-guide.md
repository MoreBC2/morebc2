# Release verification guide

**Category:** Releases
**Status:** Draft / Standard and current gaps
**Last reviewed:** 2026-09-02

## Summary

This page explains the release-verification standard MoreBC2 should use when discussing BitcoinII Core releases.

It does not claim that the current BitcoinII release provides every artifact needed for strong independent authentication.

The current release baseline is `v31.1.0`. Historical `v29.1.0` evidence remains useful only within its recorded version/date scope.

## Strong release verification path

For release binaries, a strong normal path is:

```text
release binary
  -> locally calculated SHA256 hash
  -> checksum or manifest file
  -> signature over checksum or manifest
  -> trusted release key or independently trusted release process
```

If one of those links is missing, MoreBC2 should document the gap clearly.

## Evidence types to keep separate

| Evidence type | What it can support | What it cannot support by itself |
|---|---|---|
| Observed release page/API metadata | A release exists at an observed path with recorded metadata. | Binary authenticity. |
| Uploaded asset inventory | Asset names, sizes, content types, URLs, and hosting metadata were recorded. | That the assets are safe, signed, or authentic. |
| GitHub-reported SHA-256 digest | Hosting-provider metadata for the uploaded bytes. | A publisher-signed expected hash or independent authentication. |
| GitHub-generated source archive metadata | Archive links are generated from a tag/ref. | That uploaded binaries match source. |
| Locally calculated SHA-256 | The retrieved bytes have a repeatable local fingerprint. | Publisher authentication without an independently trusted expected value. |
| GitHub web-flow commit signature | Commit data verifies against GitHub's published service key. | A BitcoinII maintainer release signature or binary-to-source binding. |
| Source comparison | Whether reviewed source refs/files differ. | Whether binaries were built from those sources. |
| Reproducible-build attestation | Can strengthen binary-to-source provenance when independently verifiable. | Publisher identity unless the attestation trust path is also established. |
| Maintainer statement | Context about intended or planned release process. | Cryptographic proof by itself. |

## Current v31.1.0 limits

For BitcoinII Core `v31.1.0`, current MoreBC2 records show:

- current release identity and publication time observed;
- four uploaded Linux/Windows CLI/Qt assets recorded;
- GitHub-reported SHA-256 digest metadata recorded for those assets;
- no independent MoreBC2 `v31.1.0` artifact hash record yet;
- no current publisher-signed checksum manifest established;
- no detached current-release signature established;
- no trusted BitcoinII release-key path established;
- no current binary-to-source provenance established;
- no current reproducible-build proof established.

The GitHub-reported digest fields are useful metadata, but they are not equivalent to independent MoreBC2 hashing plus a publisher-authenticated expected value.

## Historical v29.1.0 evidence

MoreBC2's 2026-08-27 `v29.1.0` audit independently hashed all 10 uploaded assets and two GitHub-generated source archives and performed bounded release-signature/trust-path checks.

That record should be cited when discussing `v29.1.0` verification history. It must not be used to imply that `v31.1.0` has already undergone the same independent process.

## Safe user-facing wording

Use phrases such as:

- "current release metadata observed"
- "GitHub-reported asset digest recorded"
- "historical v29.1.0 integrity fingerprints recorded"
- "independent v31.1.0 artifact authentication remains open"
- "trusted BitcoinII release-key path not established"

Avoid phrases such as:

- "v31.1.0 release verified"
- "binary verified"
- "signed release" unless a BitcoinII-specific trust path has actually been established
- "trusted binaries"
- "GitHub digest proves publisher authenticity"
- "historical v29 hashes verify current v31 assets"

## Relationship to verification records

Use:

- [Current v31.1.0 asset record](v31.1.0-assets.md) for current release metadata and GitHub-reported digests;
- [Authentication status](authentication-status.md) for the current high-level boundary;
- [Historical v29.1.0 artifact authentication](../verification/release-artifact-authentication-2026-08-27.md) for the dated deeper audit;
- [Open questions backlog](../verification/open-questions.md) for unresolved current-release work.

## Verification

**Status:** Draft / Standard and current gaps
**Primary sources checked:** Current `v31.1.0` release metadata and existing MoreBC2 release-verification evidence
**Notes:** This page defines evidence wording and keeps current-release metadata separate from historical deeper verification.