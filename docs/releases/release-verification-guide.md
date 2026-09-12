# Release verification guide

**Category:** Releases
**Status:** Reviewed / Current verification standard
**Last reviewed:** 2026-09-12

## Summary

This page defines the release-verification standard MoreBC2 should use when discussing BitcoinII Core releases.

The current release baseline is `v31.1.0`. Historical `v29.1.0` evidence remains useful only within its recorded version/date scope.

A release can have useful integrity and source-provenance evidence without having a complete publisher-authenticated binary trust path. MoreBC2 should describe each evidence class separately.

## Strong release-verification path

For release binaries, a strong normal path is:

```text
release binary
  -> locally calculated SHA-256
  -> independently trusted expected checksum
  -> signature/attestation over that checksum or build output
  -> trusted release key or independently trusted release process
  -> reproducible or otherwise auditable binary-to-source relationship
```

Not every project uses exactly that mechanism, but the trust questions remain the same: what bytes were retrieved, who authenticated the expected bytes, what source they correspond to, and how that relationship can be independently checked.

If one of those links is missing, document the gap rather than silently treating another evidence type as a substitute.

## Evidence types to keep separate

| Evidence type | What it can support | What it cannot support by itself |
|---|---|---|
| Observed release page/API metadata | A release exists at an observed path with recorded metadata. | Binary authenticity. |
| Uploaded asset inventory | Asset names, sizes, timestamps, URLs, and hosting metadata were recorded. | That the assets are safe, signed, or authentic. |
| GitHub-reported SHA-256 digest | Hosting-provider metadata for the uploaded bytes. | A publisher-signed expected hash or independent authentication. |
| Locally calculated SHA-256 | The retrieved bytes have a repeatable local fingerprint. | Publisher authentication without an independently trusted expected value. |
| GitHub-generated source archive | A snapshot was generated from a tag/ref. | That uploaded binaries match that source. |
| Lightweight tag target | The tag currently resolves to a recorded commit. | A signed-tag assertion or permanent guarantee that the ref will never move. |
| GitHub verified commit | GitHub reports cryptographic verification of that commit object. | A BitcoinII release-signing key or signatures over release binaries. |
| Platform code signing | A platform-specific executable/package signature can be inspected. | Reproducible source provenance by itself. |
| Source comparison | Whether reviewed source refs/files differ. | Whether binaries were built from those sources. |
| Reproducible-build attestation | Can strengthen binary-to-source provenance when independently verifiable. | Publisher identity unless the attestation trust path is also established. |
| Maintainer statement | Context about intended or planned release process. | Cryptographic proof by itself. |

## Practical verification sequence

For a current BitcoinII release, use this order.

### 1. Record the release snapshot

Capture:

- tag and release title;
- publication and update timestamps;
- whether GitHub reports the release as immutable;
- asset names and sizes;
- asset creation/update timestamps;
- hosting-provider digests.

This matters because release assets can be added or replaced after first publication. `v31.1.0`, for example, was published on 2026-08-29 and updated on 2026-09-06 when the current macOS archives were added.

### 2. Pin the source ref

Resolve the release tag to its exact object/commit.

For the current `v31.1.0` snapshot:

```text
refs/tags/v31.1.0
  -> 8daaf7b12e71d3646eed787f040bf2899a69dc1c
```

The ref currently points directly to a commit, so it is a lightweight tag.

Record the target commit rather than relying only on the human-readable tag name.

### 3. Inspect commit/tag signature state

GitHub currently reports the `v31.1.0` target commit as `verified: true` with `reason: valid` and a signature present in the verification payload.

Record that as commit-level provenance only. Do not rewrite it as "the release binaries are signed" or "the release tag is signed."

### 4. Calculate local asset hashes

For every asset actually retrieved, calculate a local SHA-256 and preserve the filename, byte size, source URL, date, and result.

On Windows PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 .\BitcoinII-v31.1-Win64-Qt.zip
```

The September 11 MoreBC2 Windows test obtained:

```text
f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d
```

for `BitcoinII-v31.1-Win64-Qt.zip`, matching GitHub's reported digest.

That proves a repeat-byte match between the retrieved archive and the hosting metadata observed for that asset. It is not a publisher signature.

### 5. Look for project-controlled expected checksums/signatures

Check the release attachments and documented project-controlled locations for:

- checksum manifests;
- signatures over manifests or assets;
- documented release-signing keys;
- attestations;
- reproducible-build records.

For `v31.1.0`, the current six release attachments contain no `SHA256SUMS`, `SHA256SUMS.asc`, detached-signature attachment, or release-key file.

### 6. Do not confuse inherited tooling with deployed project practice

The BitcoinII Core source tree contains Bitcoin Core-derived Guix/release-process files and verification utilities that reference signed checksum workflows.

Those files are useful source context, but they do not establish that BitcoinII used that inherited process for the current release. A current repository search for `v31.1.0 SHA256SUMS` returned no release-specific result.

### 7. Inspect platform signing separately

Platform code signing is its own evidence class.

The extracted Windows Qt executable used in the September 11 test returned:

```text
Authenticode: NotSigned
```

That result applies to the tested executable. It does not automatically describe every Windows/macOS asset.

### 8. Keep binary-to-source verification separate

A source tag plus a local binary hash still does not prove the binary was built from that source.

To make that claim, establish a reproducible or otherwise independently auditable build/provenance path.

## Current v31.1.0 status

Current MoreBC2 records establish:

- release identity and current six-asset inventory observed;
- GitHub-reported SHA-256 digest metadata recorded for all six assets;
- one current asset (`BitcoinII-v31.1-Win64-Qt.zip`) independently hashed and matched;
- current lightweight tag target recorded;
- target commit reported by GitHub as verified;
- no release-specific signed checksum manifest established;
- no detached current-release asset signatures established;
- no trusted BitcoinII release-key path established;
- no current binary-to-source reproducibility established.

See [v31.1.0 release assets](v31.1.0-assets.md).

## Historical v29.1.0 evidence

MoreBC2's 2026-08-27 `v29.1.0` audit independently hashed all 10 uploaded assets and two GitHub-generated source archives and performed bounded release-signature/trust-path checks.

That record should be cited when discussing `v29.1.0` verification history. It must not be used to imply that all `v31.1.0` assets have undergone the same process.

## Safe user-facing wording

Prefer phrases such as:

- "current release metadata observed";
- "six current uploaded assets recorded";
- "GitHub-reported asset digest recorded";
- "Windows Qt archive independently hashed and matched GitHub metadata";
- "target commit reported by GitHub as verified";
- "trusted BitcoinII release-key path not established";
- "binary-to-source reproducibility not established."

Avoid phrases such as:

- "v31.1.0 release verified";
- "all binaries verified";
- "signed release" unless a BitcoinII-specific release-signing trust path has actually been established;
- "trusted binaries";
- "GitHub digest proves publisher authenticity";
- "verified commit proves the release assets";
- "historical v29 hashes verify current v31 assets."

## Relationship to verification records

Use:

- [Current v31.1.0 asset record](v31.1.0-assets.md) for current release metadata, digests, tag/commit state, and the one local archive hash match;
- [Authentication status](authentication-status.md) for the current high-level trust boundary;
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md) for the Windows archive/executable fingerprints and runtime context;
- [Historical v29.1.0 artifact authentication](../verification/release-artifact-authentication-2026-08-27.md) for the dated deeper historical audit;
- [Open questions backlog](../verification/open-questions.md) for unresolved work.

## Verification

**Status:** Reviewed / Current verification standard  
**Primary sources checked:** Current `v31.1.0` release/tag/commit metadata, repository search, and existing MoreBC2 release/runtime evidence  
**Notes:** This page defines claim boundaries and the verification sequence. It does not convert GitHub metadata, commit verification, or inherited release tooling into publisher-authenticated binary provenance.
