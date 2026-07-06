# Release verification guide

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page defines how MoreBC2 should evaluate BitcoinII Core release artifacts.

It does not claim that BitcoinII releases currently provide every verification artifact listed here. It defines the standard MoreBC2 should use when checking releases and records the current gaps found so far.

For release-page observations, see [BitcoinII releases](../documentation/releases.md).

For the working artifact checklist, see [Release artifact checklist](../verification/release-artifact-checklist.md).

## Core idea

Release verification should prove that a downloaded binary matches what the project intended to publish.

For exchange and service integration, the strongest normal path is:

```text
release binary
  -> SHA256 hash
  -> checksum or manifest file
  -> signature over checksum or manifest
  -> trusted release key or signed tag
```

If any step is missing, document the gap clearly.

## Keep these evidence types separate

Do not combine these into a single broad "verified release" statement:

| Evidence type | What it can support | What it cannot support by itself |
|---|---|---|
| GitHub release page/API observed | Release exists at an observed path and has visible/API metadata. | Binary authenticity. |
| GitHub verified commit marker | GitHub says the commit was signed or verified in its UI. | Downloaded release asset verification. |
| GitHub API digest field | GitHub API may expose a digest value for an uploaded asset. | Independent MoreBC2 hash verification or maintainer-signed checksum proof. |
| Source comparison | Whether source files differ between refs. | Whether binaries were built from that source. |
| Workflow artifact | A workflow produced an artifact. | That the artifact is a release asset or safe for users. |
| Checksum file | A hash list exists. | Authenticity unless the checksum source is trusted. |
| Signed checksum file | A stronger authenticity path if the key is trusted. | Trust if the signing key source is unknown. |
| Locally calculated SHA256 | The downloaded file's hash. | Authenticity unless matched against trusted data. |

## Current finding

MoreBC2 rechecked the public GitHub release page on 2026-07-02 after private-review audit feedback flagged release-currentness and date wording. Codex later captured GitHub API asset metadata and searched for obvious checksum, signature, and trusted-key material.

Current observations:

- Observed release path: `https://github.com/Bitcoin-II/BitcoinII-Core/releases`.
- Observed release title: `BitcoinII Core v29.1.0`.
- The `v29.1.0` GitHub release page showed a `Latest` marker during the 2026-07-02 recheck.
- GitHub API metadata gives release `published_at` as `2025-11-27T04:22:39Z`.
- GitHub API metadata reports 10 uploaded release assets for `v29.1.0`.
- No uploaded asset name appears to be `SHA256SUMS`, `SHA256SUMS.asc`, a checksum manifest, a detached signature file, or a release-key file.
- The source tree includes `contrib/verify-binaries/README.md`, which describes a checksum-and-signature model using `SHA256SUMS` and `SHA256SUMS.asc`.
- The source tree includes `doc/release-process.md`, which describes Guix build attestations, signed tags, checksum files, and signature files.
- `contrib/verify-binaries/verify.py` contains `SUMS_FILENAME = 'SHA256SUMS'` and `SIGNATUREFILENAME = 'SHA256SUMS.asc'`, but Codex reported that it still references `bitcoincore.org` and `bitcoin.org` download locations.
- `contrib/verify-commits/trusted-keys` contains key fingerprints for commit verification, but that is not the same as release binary signature trust.
- Codex checked obvious public GitHub paths for `guix.sigs` and detached-signature repositories, including `bitcoinII-core/guix.sigs`, `bitcoinII-core/bitcoinII-detached-sigs`, `BitcoinII/guix.sigs`, `BitcoinII/bitcoinII-detached-sigs`, `Bitcoin-II/guix.sigs`, and `Bitcoin-II/bitcoinII-detached-sigs`. These were not publicly found by the GitHub API during that check.
- A post-release workflow on `main` targets `v29.1.0` for a macOS arm64 DMG artifact.
- A network source comparison page records that reviewed P2P/network source files did not appear changed between `v29.1.0` and `main`, with selected blob-SHA spot checks.

Current caveats:

- MoreBC2 has not confirmed that the GitHub release path is canonical.
- MoreBC2 has not confirmed that current BitcoinII releases publish `SHA256SUMS` and `SHA256SUMS.asc` outside uploaded release assets.
- MoreBC2 has not confirmed trusted BitcoinII release keys.
- MoreBC2 found no public GitHub API evidence at the obvious `guix.sigs` or detached-signature repository paths, but those repositories could be private, renamed, deleted, never created, or hosted elsewhere.
- MoreBC2 has not downloaded release binaries or calculated independent hashes.
- MoreBC2 has not verified detached signatures.
- MoreBC2 has not checked whether the release tag itself is signed.
- MoreBC2 has not confirmed that workflow artifacts are attached to the release page.
- MoreBC2 has not proved release binaries match reviewed source files.

Therefore, MoreBC2 should still treat release verification as **Needs Review**, not Verified.

## Evidence levels for releases

### Strong evidence

Examples:

- Signed release tag.
- Signed checksum manifest.
- Detached signature for checksum file.
- Reproducible build instructions with matching hashes.
- Maintainer-documented release verification process.

### Medium evidence

Examples:

- Unsigned checksum file on the official release page.
- GitHub verified commit or tag, if reviewed.
- Hashes published in official documentation without detached signature.

### Weak evidence

Examples:

- GitHub release asset exists but no checksum is provided.
- Community-posted hash without maintainer verification.
- Third-party mirror hash.
- GitHub API digest fields not paired with a maintainer-trusted signature or checksum workflow.

## Release asset checklist

For each release, record:

- Release version.
- Release date.
- Release URL.
- Tag name.
- Whether tag is signed.
- Release commit.
- Whether commit is verified by GitHub.
- Asset names.
- Asset sizes.
- SHA256 hashes calculated independently.
- Checksum file name, if present.
- Whether checksum file includes each asset.
- Signature file name, if present.
- Verification command used.
- Result.
- Reviewer and date.

Use [Release artifact checklist](../verification/release-artifact-checklist.md) for the current working table.

## Current release table

| Version | Release path | Asset inventory | Hash checked | Checksum file | Signature | Status | Notes |
|---|---|---|---:|---|---|---|---|
| v29.1.0 | `Bitcoin-II/BitcoinII-Core` | Partial | No | Needs review | Needs review | Needs Review | GitHub API reports 10 uploaded assets. No uploaded asset name appears to be a checksum manifest or detached signature file. Obvious public GitHub `guix.sigs` and detached-signature repo paths were not found. |
| v0.27.1 | redirected legacy path | Partial | No | Needs review | Needs review | Needs Review | Observed on redirected legacy repository path; not confirmed as current canonical path. |
| v0.27.0 | redirected legacy path | Partial | No | Needs review | Needs review | Needs Review | Genesis release observed on redirected legacy path; not independently verified. |

## Source-tree helper caveat

The source tree includes a verification helper page at `contrib/verify-binaries/README.md`.

That page describes verifying a checksum file and signature file before comparing downloaded binary hashes.

However, MoreBC2 should not treat that inherited helper as proof that current BitcoinII releases publish all required artifacts. A release-specific review still needs to find the actual checksum files, signature files, and trusted keys for BitcoinII.

Additional Codex finding:

- `contrib/verify-binaries/verify.py` uses `SHA256SUMS` and `SHA256SUMS.asc` names, but still points to Bitcoin Core web hosts in the inspected source. This makes it unsafe to treat the helper as ready BitcoinII-specific user guidance without further review.

## Release process caveat

The source tree also includes `doc/release-process.md`.

That page describes a stronger release process involving signed tags, Guix builds, builder attestations, checksum files, and signature files.

MoreBC2 should treat this as source-observed process documentation, not proof that any specific current release completed every step. The actual `v29.1.0` release assets still need direct verification.

Codex's investigation found the release-process and verification docs appear heavily inherited/upstream-style with BitcoinII naming substitutions. They are useful as a model to compare against, but not enough to claim the `v29.1.0` GitHub release completed that process.

## External signature repository check

Codex checked obvious public GitHub paths suggested by the source-tree release-process wording.

Paths checked included:

- `bitcoinII-core/guix.sigs`
- `bitcoinII-core/bitcoinII-detached-sigs`
- `BitcoinII/guix.sigs`
- `BitcoinII/bitcoinII-detached-sigs`
- `Bitcoin-II/guix.sigs`
- `Bitcoin-II/bitcoinII-detached-sigs`

Result:

- These paths were not publicly found by the GitHub API during the check.
- Repository searches for BitcoinII Guix/signature-related terms did not return visible public matches.
- The owner path `bitcoinII-core` was also not publicly found.

Caveat:

This is a negative public-GitHub visibility check only. It does not prove the material never existed or does not exist elsewhere. The repositories could be private, renamed, deleted, unpublished, or hosted outside GitHub.

## Verification commands

Do not mark commands verified until they have been run.

When verified, record commands in the test-record format from [Command testing status](../verification/command-testing.md) or [Local development environment](local-development.md).

Common command categories to test later:

- Calculate SHA256 hash of a downloaded file.
- Verify checksum file contains that hash.
- Verify detached signature over checksum file.
- Verify release tag signature.
- Compare calculated binary hashes against published hashes.

## Exchange/service standard

For exchange or service integration, MoreBC2 should be strict.

A release is strongest when an integrator can:

1. Download the release asset.
2. Calculate the asset hash.
3. Find that hash in an official checksum manifest.
4. Verify the manifest signature.
5. Confirm the signing key is trusted by the BitcoinII project.

If this path cannot be completed, MoreBC2 should say so instead of filling the gap with assumptions.

## What not to do

Do not claim:

- A binary is safe because it came from GitHub alone.
- A release is signed unless a signature was checked.
- A checksum proves authenticity by itself.
- A GitHub API digest field is equivalent to an independent checksum verification record.
- A community-posted hash is equivalent to a signed maintainer manifest.
- A release workflow is exchange-grade until the full chain is checked.
- A workflow artifact is the same as a release asset unless it is confirmed on the release page.
- A source comparison proves release binaries match source.
- A GitHub verified commit marker verifies downloaded release assets.
- Source-tree release-process docs prove the current release followed that process.
- A public-GitHub 404 proves no signature material exists anywhere.

## Relationship to BasicSwap-style standards

Some service integrations require a binary, a checksum or manifest file, and a signature over that checksum or manifest.

MoreBC2 should track whether BitcoinII releases meet that kind of standard without claiming they do until verified.

## Open questions

- Is `Bitcoin-II/BitcoinII-Core` the canonical release repository?
- Are BitcoinII release tags signed?
- Are BitcoinII release commits GitHub-verified for all current releases?
- Are SHA256 checksum files published outside uploaded GitHub release assets?
- Are checksum files signed?
- Does release signature material exist in a private, renamed, deleted, external, or non-obvious location?
- Which key or keys should be trusted for BitcoinII releases?
- Are release builds reproducible?
- Are source archives and binary assets generated from the same commit?
- What release-verification process should exchanges follow today?
- How should the redirected legacy repository path be documented?

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This guide defines the release verification standard and records release-page, API-asset-inventory, checksum/signature/key-search, public external-signature-repo check, source-comparison, network-comparison, workflow, and process-document observations. This still does not verify any BitcoinII release binary.
