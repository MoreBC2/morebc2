# BitcoinII releases

**Category:** Releases
**Status:** Draft / Evidence-linked summary
**Last reviewed:** 2026-09-02

## Summary

This section summarizes BitcoinII Core release information recorded in MoreBC2.

The current release baseline is **BitcoinII Core `v31.1.0`**, published on 2026-08-29.

Older `v29.1.0` verification records remain valuable historical evidence, but they must not be presented as current-release authentication.

## Current release pages

- [v31.1.0 uploaded assets and GitHub-reported digests](v31.1.0-assets.md)
- [v29.1.0 uploaded assets — historical audit](v29.1.0-assets.md)
- [GitHub-generated source archives](source-archives.md)
- [Authentication status](authentication-status.md)
- [Release verification guide](release-verification-guide.md)
- [Signing and checksum roadmap](signing-and-checksum-roadmap.md)

## Current release posture

Observed current release:

- Tag: `v31.1.0`
- Published: `2026-08-29T02:39:30Z`
- Four uploaded Linux/Windows CLI/Qt assets were observed through GitHub release metadata.
- GitHub reports SHA-256 digests for those uploaded assets.
- Release notes describe ShockWave, data restrictions, replay protection, fork-aware header synchronization, and associated wallet/mining/mempool/RPC/validation/PSBT updates.

Current evidence supports saying that the release and its GitHub-hosted metadata were observed.

Current evidence does **not** yet support saying that MoreBC2 has independently authenticated the `v31.1.0` binaries, established a trusted BitcoinII release-signing key, proven reproducible builds, or bound the distributed binaries to reviewed source.

## Historical v29.1.0 evidence

MoreBC2 performed a deeper artifact-integrity audit of `v29.1.0` on 2026-08-27, including independent hashing of 10 uploaded assets and two GitHub-generated source archives.

That work remains preserved as dated evidence for `v29.1.0`. It does not automatically carry forward to `v31.1.0`.

## Evidence labels

- **Observed** — recorded from a public page, GitHub API metadata, or committed evidence record.
- **Locally Tested** — exercised in a documented local environment.
- **Source Reviewed** — found in reviewed source material.
- **Maintainer Statement** — maintainer-supplied context; not cryptographic proof.
- **Unknown** — not established by current evidence.
- **Roadmap** — planned or expected, not current evidence.

## Current verification priorities

1. Independently hash the `v31.1.0` uploaded assets.
2. Check current checksum/signature publication paths.
3. Check tag/commit signature state for `v31.1.0`.
4. Preserve the distinction between hosting-provider digest metadata and publisher-authenticated expected hashes.
5. Keep the `v29.1.0` audit explicitly historical.

## Related verification records

- [Verification evidence index](../verification/verification-index.md)
- [Release-artifact authentication — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [Developer release verification guide](../developers/release-verification.md)
- [BitcoinII release documentation](../documentation/releases.md)

## Verification

**Status:** Draft / Evidence-linked summary
**Primary sources checked:** Current `v31.1.0` GitHub release metadata plus existing dated MoreBC2 release evidence
**Notes:** Current release metadata is refreshed. Independent `v31.1.0` authentication work remains open.