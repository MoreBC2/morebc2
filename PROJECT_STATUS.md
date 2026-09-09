# MoreBC2 project status

**Status:** Public source repository; ongoing verification and documentation work
**Last reviewed:** 2026-09-08

## Summary

MoreBC2 is an independently maintained, source-backed documentation and verification project for BitcoinII (BC2). Current-facing technical documentation uses BitcoinII Core `v31.1.0` as its baseline, while dated `v29.1.0` runtime and release records remain historical evidence.

The source repository is public. The path-scoped licensing and third-party notice package is present, unnecessary personal local-user path details have been removed from reachable repository history, and [SECURITY.md](https://github.com/MoreBC2/morebc2/blob/main/SECURITY.md) separates ordinary public issues from sensitive reports and provides a verified private reporting route.

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

## Completed publication prerequisites

1. The implemented path-scoped licensing map and third-party notices were reviewed and approved for source-repository publication.
2. The repository contents and documented checks were accepted for public visibility.
3. Owner approval for the controlled source-repository publication was completed.

The visibility transition publishes the tracked source repository; it does not publish a tracked build, release archive, binary, vendored dependency tree, or other generated artifact. The current `NOTICE` and `THIRD_PARTY_NOTICES.md` are sufficient for that source-only step. Before a built site, downloadable release, or other generated artifact is newly distributed or treated as a publication artifact, generate and review dependency notices against that exact artifact.

## Security reporting

GitHub Private Vulnerability Reporting is enabled and the external private-reporting interface has been verified. [SECURITY.md](https://github.com/MoreBC2/morebc2/blob/main/SECURITY.md) contains the working private-reporting instructions.

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
