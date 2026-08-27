# Release verification guide

**Category:** Releases
**Status:** Draft / Standard and current gaps
**Last reviewed:** 2026-08-27

## Summary

This page explains the release verification standard MoreBC2 should use when discussing BitcoinII Core releases.

It does not claim that the current BitcoinII release provides every required artifact.

Detailed current evidence remains in:

- [Developer release verification guide](../developers/release-verification.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [Authentication status](authentication-status.md)
- [Release-artifact authentication record — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)

## Strong release verification path

For release binaries, the strongest normal path is:

```text
release binary
  -> locally calculated SHA256 hash
  -> checksum or manifest file
  -> signature over checksum or manifest
  -> trusted release key or signed release process
```

If one of those links is missing, MoreBC2 should document the gap clearly.

## Evidence types to keep separate

| Evidence type | What it can support | What it cannot support by itself |
|---|---|---|
| Observed release page/API metadata | A release exists at an observed path with recorded metadata. | Binary authenticity. |
| Uploaded asset inventory | Asset names, sizes, content types, and URLs were recorded. | That the assets are safe, signed, or authentic. |
| GitHub-generated source archive metadata | Archive links are generated from the tag. | That uploaded binaries match source. |
| Lightweight tag ref | A tag name points directly to a commit. | Signed annotated tag evidence. |
| Locally calculated SHA-256 | The exact retrieved bytes have a repeatable fingerprint. | Publisher authentication without an independently trusted expected value. |
| GitHub web-flow commit signature | The tagged commit data verifies against GitHub's published service key. | A BitcoinII maintainer signature, signed tag, or binary-to-source binding. |
| Source comparison | Whether source refs differ in observed files. | Whether binaries were built from those sources. |
| Workflow artifact | A workflow produced an artifact. | That the artifact is a verified release asset. |
| Maintainer Statement | Context about intended or planned release process. | Cryptographic proof or current release authentication. |

## Current v29.1.0 limits

For BitcoinII Core `v29.1.0`, current MoreBC2 records show:

- independent SHA-256 values recorded for all 10 uploaded assets and two generated source archives,
- all uploaded-asset sizes and hashes matched GitHub API metadata,
- no verified checksum manifest,
- no verified `SHA256SUMS`,
- no verified `SHA256SUMS.asc`,
- no detached release signature verified,
- no trusted BitcoinII release-key path established,
- no signed annotated tag observed,
- no release binary authenticity established.

The first two findings are integrity and hosting cross-checks only. They do not supply an authenticated publisher value.

## Safe user-facing wording

Use:

- "release metadata observed"
- "uploaded asset inventory recorded"
- "local integrity fingerprints recorded"
- "source archives listed separately"
- "GitHub commit signature metadata observed but not independently verified"
- "release authentication path remains unresolved"
- "signing/checksum publication is roadmap context, not current proof"

Do not use:

- "release verified"
- "binary verified"
- "signed release"
- "trusted binaries"
- "exchange-grade verified"
- "source comparison proves binary provenance"
- "GitHub verified commit proves release assets are authentic"

## Relationship to existing verification records

The existing verification records remain canonical:

- use [Release asset inventory attempt](../verification/release-asset-inventory-attempt.md) for asset metadata,
- use [Release artifact checklist](../verification/release-artifact-checklist.md) for required future checks,
- use [Release source comparison notes](../verification/release-source-comparison.md) for source-ref comparison caveats,
- use [Network release comparison](../verification/network-release-comparison.md) for network/P2P source comparison notes,
- use [Open questions backlog](../verification/open-questions.md) for unresolved release questions.

## Verification

**Status:** Draft / Standard and current gaps  
**Primary sources checked:** Existing MoreBC2 release verification records and the dated 2026-08-27 artifact authentication record linked above
**Notes:** This page is guidance for wording and evidence separation. The current evidence records integrity, not release authenticity.
