# MoreBC2 project status

**Status:** Public-release readiness review; owner decision pending
**Last reviewed:** 2026-09-08

## Summary

MoreBC2 is an independently maintained, source-backed documentation and verification project for BitcoinII (BC2). Current-facing technical documentation uses BitcoinII Core `v31.1.0` as its baseline, while dated `v29.1.0` runtime and release records remain historical evidence.

The repository is suitable for owner review, but it is **not ready to begin the publication transition**. The path-scoped licensing and third-party notice package is present, unnecessary personal local-user path details have been removed from the current tree, and [`SECURITY.md`](https://github.com/MoreBC2/morebc2/blob/main/SECURITY.md) now separates ordinary public issues from sensitive reports. A verified private security intake route is not available while the repository remains private. Owner review of contributor authority and third-party notices and approval to begin the controlled publication transition remain open.

## Current baseline

The current documentation records the height-`57750` mainnet activation of:

- ShockWave per-block difficulty adjustment;
- replay protection;
- consensus-level data restrictions; and
- fork-aware header-synchronization-related behavior.

Current source-facing coverage is substantial, but status labels remain Draft, Partial, Source Reviewed, or Needs Review where the evidence does not support Verified.

## What has evidence

- `v31.1.0` source and release metadata have been reviewed for the current documentation refresh.
- Dedicated source notes cover ShockWave, replay protection, data restrictions, and fork-aware header synchronization.
- Dated `v29.1.0` Windows/mainnet records cover node startup, local-only RPC, nine read-only commands, shutdown/restart, peer discovery, and release-asset integrity work.
- Site generation, rendered-output checks, and documentation-specific validation are automated.

The dated `v29.1.0` evidence establishes only what those records say. It is not `v31.1.0` runtime verification.

## Blocking items before public visibility

1. Review and approve the implemented path-scoped licensing map and third-party notices, including contributor authority and remaining provenance uncertainties.
2. Generate and review artifact-specific dependency notices for the actual site or other artifact that will be distributed.
3. Confirm the repository contents and documented checks are acceptable for the visibility transition.
4. Obtain explicit owner review and approval to begin the publication transition.

## Immediate publication-transition gate

After changing the repository to public visibility, the owner should immediately enable GitHub Private Vulnerability Reporting, verify the external private-reporting interface, and update `SECURITY.md` with the working instructions and link. Do not actively announce, promote, or treat the repository as publication-complete until those steps succeed. If Private Vulnerability Reporting cannot be enabled or verified, establish another verified private intake route before active publication proceeds.

## Important unresolved technical and operational work

- Fresh bounded `v31.1.0` runtime and RPC evidence.
- Independent authentication of `v31.1.0` release assets and a trusted signing-key path.
- Detailed regression coverage for wallet, mempool, mining, RPC, validation, and PSBT behavior.
- Exchange/service confirmation policy based on current network evidence.
- Current wallet, explorer, API, exchange, and mining-service observations.
- Live-network verification of activation and synchronization behavior.
- Independent technical review of consequential current-facing claims is strongly encouraged as a public-review and quality task, but its absence alone is not a visibility blocker once the actual publication blockers are resolved.
- Recheck live external services and links immediately before publication.

## Navigation

- [README](README.md)
- [Documentation index](docs/README.md)
- [Documentation coverage](docs/documentation-coverage.md)
- [Repository audit](docs/AUDIT.md)
- [Roadmap](ROADMAP.md)
- [Legal and reuse posture](docs/LEGAL_REUSE.md)
- [Verification evidence index](docs/verification/verification-index.md)
- [Known unknowns](docs/verification/known-unknowns.md)
- [v31 currentness audit](docs/verification/v31-currentness-audit-2026-09-02.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 evidence records and the BitcoinII Core `v31.1.0` release/source anchors cited by those records
**Notes:** This is a project dashboard. It does not independently verify BitcoinII runtime behavior, release binaries, external services, or public-release readiness.
