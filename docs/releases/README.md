# BitcoinII releases

**Category:** Releases
**Status:** Reviewed / Current evidence summary
**Last reviewed:** 2026-09-12

## Summary

This section records BitcoinII Core release metadata, integrity evidence, authentication boundaries, and verification practices.

The current release baseline is **BitcoinII Core `v31.1.0`**, published on 2026-08-29 and updated on 2026-09-06. The current GitHub release inventory contains six uploaded binary archives.

MoreBC2 has now independently hashed the Windows Qt release archive used in the September 11 Windows node/RPC test and matched it to GitHub's reported SHA-256 digest. The other five current uploaded archives have not yet been independently hashed in a current MoreBC2 record.

Older `v29.1.0` verification records remain valuable historical evidence, but they must not be presented as authentication of `v31.1.0`.

## Current release pages

- [v31.1.0 release assets](v31.1.0-assets.md) — current six-asset inventory, GitHub digests, tag/commit state, and the Windows Qt local hash match.
- [Authentication status](authentication-status.md) — what is and is not established for the current release.
- [Release verification guide](release-verification-guide.md) — evidence rules and a practical verification sequence.
- [GitHub-generated source archives](source-archives.md) — current v31 archive paths plus historical v29 fingerprints.
- [Signing and checksum roadmap](signing-and-checksum-roadmap.md) — current public gaps versus inherited tooling and roadmap context.
- [v29.1.0 uploaded assets — historical audit](v29.1.0-assets.md) — preserved historical release evidence.

## Current v31.1.0 posture

Current evidence supports the following:

| Item | Current status |
|---|---|
| Release identity | Observed: `v31.1.0` |
| Publication time | Observed: `2026-08-29T02:39:30Z` |
| Release last updated | Observed: `2026-09-06T16:31:26Z` |
| Uploaded binary archives | Six currently observed |
| GitHub-reported SHA-256 digests | Recorded for all six uploaded assets |
| Independent MoreBC2 hash | Windows Qt archive matched on 2026-09-11 |
| Tag type | Lightweight tag currently pointing directly to a commit |
| Tag target | `8daaf7b12e71d3646eed787f040bf2899a69dc1c` |
| Target commit verification | GitHub reports `verified: true`, `reason: valid` |
| Publisher-signed checksum manifest | Not established |
| Detached binary signatures | Not established |
| Trusted BitcoinII release-signing key | Not established |
| Reproducible-build proof | Not established |
| Binary-to-source equivalence | Not established |

The Windows Qt executable used in the dated runtime test was additionally fingerprinted and returned Windows Authenticode status `NotSigned`.

See [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md).

## Why dated snapshots matter

The `v31.1.0` release was modified after initial publication: the macOS archives were uploaded on 2026-09-06. GitHub currently reports the release as `immutable: false`.

That means release verification should record **when** the inventory was observed, not merely the tag name. A careful record should capture:

- release/tag identity;
- exact tag target commit;
- asset names and sizes;
- GitHub-reported digests;
- local hashes where calculated;
- checksum/signature material, if any;
- platform code-signing state where relevant.

## Commit verification is not binary verification

The `v31.1.0` tag currently resolves directly to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`. GitHub reports the target commit as cryptographically verified.

That is useful source-commit provenance evidence. It does **not** by itself establish that any uploaded binary was built from that commit, that the release tag itself was independently signed, or that the binaries were signed by a trusted BitcoinII release key.

## Checksum/signature evidence boundary

The current release attachments do not include a release-specific `SHA256SUMS`, `SHA256SUMS.asc`, detached-signature file, or published release-key file.

The BitcoinII Core source tree contains inherited Bitcoin Core-style Guix/release-process documentation and verification utilities that reference signed checksum workflows. Those files show that the inherited source tree contains release-verification machinery; they do **not** prove that BitcoinII used that machinery for `v31.1.0` or published the corresponding attestations.

## Historical v29.1.0 evidence

MoreBC2 performed a deeper artifact-integrity audit of `v29.1.0` on 2026-08-27, including independent hashing of all 10 uploaded assets and two GitHub-generated source archives.

That work remains preserved as dated evidence for `v29.1.0`. It does not automatically carry forward to `v31.1.0`.

## Evidence labels

- **Observed** — recorded from a public page, GitHub API metadata, or committed evidence record.
- **Locally Tested** — exercised in a documented local environment.
- **Source Reviewed** — found in reviewed source material.
- **Maintainer Statement** — maintainer-supplied context; not cryptographic proof.
- **Unknown** — not established by current evidence.
- **Roadmap** — planned or expected, not current evidence.

## Current verification priorities

1. Independently hash the remaining five `v31.1.0` uploaded assets.
2. Fingerprint the current GitHub-generated `v31.1.0` source archives if they are used in verification.
3. Establish whether BitcoinII publishes a project-controlled checksum/signature trust path outside the GitHub release attachments.
4. Record platform code-signing status for the remaining binaries where applicable.
5. Attempt reproducible-build or other binary-to-source verification if feasible.
6. Continue treating the historical `v29.1.0` record as version-scoped evidence only.

## Related verification records

- [Verification evidence index](../verification/verification-index.md)
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Release-artifact authentication — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [Developer release verification guide](../developers/release-verification.md)
- [BitcoinII release documentation](../documentation/releases.md)

## Verification

**Status:** Reviewed / Current evidence summary  
**Primary sources checked:** Current `v31.1.0` GitHub release/tag/commit metadata, repository search, and dated MoreBC2 runtime/release evidence  
**Notes:** Current inventory is six uploaded assets. One current archive has an independent MoreBC2 hash match. Publisher-authenticated release artifacts and reproducible-build proof remain open.
