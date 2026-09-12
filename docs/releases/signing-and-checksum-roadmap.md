# Signing and checksum roadmap

**Category:** Releases
**Status:** Reviewed / Roadmap and current-gap tracking
**Last reviewed:** 2026-09-12

## Summary

This page separates current BitcoinII Core release-authentication evidence from inherited release tooling and roadmap context.

The current release baseline is `v31.1.0`.

## Current public evidence

For `v31.1.0`, MoreBC2 has established:

- the canonical GitHub release metadata;
- six currently uploaded Linux, Windows, and macOS binary archives;
- GitHub-reported SHA-256 digest metadata for all six assets;
- a local MoreBC2 SHA-256 match for the Windows Qt archive used in the September 11 runtime test;
- the current lightweight tag target commit;
- GitHub's `verified: true`, `reason: valid` state for that target commit.

MoreBC2 has **not** established for the current release:

- a publisher checksum manifest such as `SHA256SUMS`;
- a signed checksum manifest such as `SHA256SUMS.asc`;
- detached signatures over the six release assets;
- a documented trusted BitcoinII release-signing key path;
- independent MoreBC2 hashes for the other five current uploaded assets;
- binary-to-source reproducibility or attestation;
- platform code-signing coverage across all release binaries.

The extracted Windows Qt executable used in the dated v31 runtime test returned Windows Authenticode status `NotSigned`.

GitHub-reported digests and local repeat-byte matches are useful integrity evidence, but they are not substitutes for a publisher-authenticated trust path.

See [Authentication status](authentication-status.md).

## Current release attachments

The current `v31.1.0` release inventory contains six binary archives and no release-specific checksum/signature attachment.

No attachment named `SHA256SUMS`, `SHA256SUMS.asc`, or equivalent was present in the current GitHub release inventory checked on 2026-09-12.

A repository search for `v31.1.0 SHA256SUMS` also returned no current release-specific result.

## Inherited release-verification machinery

The BitcoinII Core source tree contains substantial Bitcoin Core-derived release tooling and documentation, including Guix/release-process material and verification utilities that mention:

- `SHA256SUMS`;
- `SHA256SUMS.asc`;
- Guix build attestations;
- signature gathering;
- release-key verification;
- binary-verification scripts.

Some inherited verification utilities still refer to Bitcoin Core publication locations such as `bitcoincore.org` or `bitcoin.org`.

These files establish that the inherited source tree contains release-verification machinery. They do **not** establish that BitcoinII currently operates that infrastructure, publishes compatible attestations, uses Bitcoin Core's signer set, or followed that process for `v31.1.0`.

That distinction is important: documentation or scripts describing a possible release process are not evidence that the process was actually executed for a given release.

## Current tag-signature boundary

The `v31.1.0` Git ref currently points directly to commit:

`8daaf7b12e71d3646eed787f040bf2899a69dc1c`

The release therefore currently uses a lightweight tag rather than a separately annotated tag object.

GitHub reports the target commit as cryptographically verified. That is useful commit-provenance evidence, but it does not provide:

- a separately signed release tag;
- signatures over the six release assets;
- a documented BitcoinII release-key trust path;
- proof that the uploaded binaries were built from that target commit.

## Historical integrity evidence

MoreBC2 independently hashed all 10 uploaded `v29.1.0` assets and both GitHub-generated source archives on 2026-08-27.

That historical integrity record remains useful for `v29.1.0` only. It does not authenticate `v31.1.0` and should not be described as current-release verification.

## Maintainer-statement boundary

Previous maintainer-supplied context recorded by MoreBC2 described release signing/signatures as roadmap work rather than an already deployed public verification system.

Treat that as maintainer context only. It is not cryptographic evidence, and current public evidence should take precedence when describing what a verifier can actually use today.

## Recommended project-side release-authentication target

A practical stronger BitcoinII release process could publish, for each release:

1. an immutable or clearly versioned asset inventory;
2. a project-controlled `SHA256SUMS` covering every uploaded binary archive;
3. one or more signatures over that manifest from documented BitcoinII release keys;
4. fingerprint and key-rotation guidance published on a project-controlled channel;
5. signed or otherwise authenticated release tags;
6. reproducible-build or build-attestation evidence where feasible;
7. platform code-signing guidance for Windows/macOS packages where applicable;
8. a stable verification page explaining the supported trust path to users, exchanges, and integrators.

This is a roadmap recommendation, not a claim that the project currently provides these items.

## Roadmap wording

Until project-controlled signing material is published and independently verified, use narrow wording:

- current release assets have GitHub-reported digests;
- the Windows Qt archive has one independent MoreBC2 hash match;
- the target commit is reported by GitHub as verified;
- no current BitcoinII-specific signed checksum trust path has been established by MoreBC2;
- inherited Bitcoin Core release tooling is source context, not proof of current BitcoinII release practice;
- documentation should be updated if a project-controlled verification process becomes public.

Do not convert inherited tooling, a verified commit, or roadmap context into current release-asset authentication.

## Open questions

Still unresolved:

- whether BitcoinII intends to publish checksum manifests for future releases;
- where those manifests would live;
- what signature format would be used;
- which signing keys would be trusted and how fingerprints would be authenticated;
- whether future tags will use a project-controlled signed-tag process;
- whether Guix/reproducible-build attestations will be published;
- whether Windows/macOS packages will use platform code signing;
- what official guidance exchanges should follow when signed release artifacts are required.

## Related pages

- [v31.1.0 release assets](v31.1.0-assets.md)
- [Authentication status](authentication-status.md)
- [Release verification guide](release-verification-guide.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Verification evidence index](../verification/verification-index.md)
- [Historical v29.1.0 artifact audit](../verification/release-artifact-authentication-2026-08-27.md)

## Verification

**Status:** Reviewed / Roadmap and current-gap tracking  
**Primary sources checked:** Current `v31.1.0` release/tag/commit metadata, repository searches, and existing MoreBC2 release/runtime evidence  
**Notes:** This page distinguishes current evidence from inherited tooling and roadmap recommendations. It does not assert a deployed BitcoinII release-signing system where none has been established.
