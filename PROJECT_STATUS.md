# MoreBC2 project status

**Status:** Public source repository and deployed documentation site; ongoing verification work
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 is an independently maintained, source-backed documentation and verification project for BitcoinII (BC2).

Current-facing technical documentation uses BitcoinII Core `v31.1.0` as its baseline. Older `v29.1.0` runtime and release records remain preserved as historical, version-scoped evidence and must not be relabeled as current testing.

The source repository is public, the documentation site is built and deployed through the repository's Cloudflare Pages workflow, and current project policy continues to separate source review, dated observations, local testing, historical evidence, service policy, and unresolved claims.

## Current BitcoinII baseline

Current documentation records the mainnet height-`57750` activation of:

- ShockWave per-block difficulty adjustment;
- replay protection;
- consensus-level data restrictions; and
- fork-aware header-synchronization-related behavior.

The current release is BitcoinII Core `v31.1.0`, published 2026-08-29.

## Current evidence established

MoreBC2 now has current `v31.1.0` evidence in addition to its preserved historical records:

- release-pinned source and release metadata;
- a 2026-09-11 isolated Windows `v31.1.0` node/RPC validation covering startup, cookie-authenticated loopback RPC, peer discovery, initial sync, restart, and clean shutdown;
- a 2026-09-11 isolated `v31.1.0` regtest PSBT lifecycle with local-only mempool submission, plus a release-pinned replay-protection source trace;
- a 2026-09-11 public explorer/API/WebSocket/Electrum smoke test;
- a 2026-09-12 exchange-confirmation evidence record for CoinEx, NonKYC, NestEx, and Biconomy;
- current release-asset digest/tag/commit provenance records with explicit authentication limits;
- automated Starlight site generation, rendered-output checks, private-path scanning, and production deployment checks.

These records are deliberately bounded. They do not establish complete production custody behavior, permanent public-service availability, reproducible binaries, or universal exchange policy.

## Current exchange-integration position

Direct exchange evidence supports **50 confirmations as a provisional MoreBC2 normal-deposit baseline** because NonKYC and NestEx independently expose 50-confirmation BC2 settings. CoinEx uses a much more aggressive `2` / `6` staged policy.

This is operational MoreBC2 guidance, not a BitcoinII consensus rule, maintainer mandate, or mathematical-finality claim. See [Exchange confirmation evidence — 2026-09-12](docs/verification/exchange-confirmation-evidence-2026-09-12.md).

## Publication and deployment state

The source repository is public and the generated documentation site is deployed through the production Cloudflare Pages workflow.

The workflow builds the static site, runs content/type checks, checks Windows-node documentation assumptions, scans generated output for blocked private-path variants, deploys the `main` build to the `morebc2` Cloudflare Pages project, and verifies the live site's indexing policy.

A successful deployment proves that the generated site passed those automated checks and was published. It does **not** make every factual claim on the site Verified.

## Contribute & project audit — 2026-09-12

The root project/contribution documents used by the site's **Contribute & project** section were reviewed together so their current-state wording and project policies stay synchronized.

| Page | Audit state | Current note |
|---|---|---|
| `PROJECT_STATUS.md` | Refreshed 2026-09-12 | Updated for current v31 runtime evidence, exchange evidence, and deployed production site. |
| `CONTRIBUTING.md` | Refreshed 2026-09-12 | Contribution evidence rules, deployment boundaries, and current ownership wording were tightened. |
| `EVIDENCE_SCALE.md` | Refreshed 2026-09-12 | Evidence authority is now explicitly claim-specific; service policy, release provenance, live observation, and local-test boundaries are clearer. |
| `SOURCE_REGISTRY.md` | Refreshed 2026-09-12 | Stale `v29.1.0` current-release entry replaced with current `v31.1.0` sources and dated infrastructure/service records. |
| `GLOSSARY.md` | Refreshed 2026-09-12 | Added current BC2 terms and clearer chainwork/finality/replay/ShockWave distinctions. |
| `README.md` | Refreshed 2026-09-12 | Removed obsolete non-indexed/future-publication wording and synchronized the current evidence baseline. |
| `ROADMAP.md` | Refreshed 2026-09-12 | Completed work was retired from the active queue and the remaining technical/operational priorities were narrowed. |
| `GOVERNANCE.md` | Reviewed / current draft | Independence, stewardship, role, and disagreement rules remain appropriate. |
| `FOUNDING_PRINCIPLES.md` | Reviewed / current framework | No substantive stale claim required revision. |
| `DOCUMENTATION_PHILOSOPHY.md` | Reviewed / current framework | Evidence-first separation of documentation/research/discussion remains current. |
| `DOCUMENTATION_TAXONOMY.md` | Reviewed / current framework | Current category placement rules remain appropriate. |
| `STYLE_GUIDE.md` | Reviewed / current framework | Naming, uncertainty, and source-strength guidance remains appropriate. |
| `STYLE_CONVENTIONS.md` | Reviewed / current framework | Current headings/status/date/verification conventions remain appropriate. |
| `WRITING_CHECKLIST.md` | Reviewed / current framework | Current pre-commit verification checklist remains appropriate. |

A document can remain **Draft** or **Framework** after being reviewed. Those labels describe the document's maturity or function; they do not mean the page was skipped in this audit.

## Important unresolved technical and operational work

The principal open areas are now narrower than the previous project-status page implied:

- stronger publisher-authenticated release verification, including any signed checksum/signing-key/reproducible-build path that may exist;
- a canonical BitcoinII technical/security contact process suitable for infrastructure providers;
- production custody architecture and deposit/withdrawal runbooks;
- concrete cumulative-chainwork thresholds and a reorganization incident playbook around exchange deposits;
- external/third-party signer replay-protection compatibility and transaction vectors;
- successful valid-public-broadcast evidence if that becomes necessary;
- broader wallet/Electrum compatibility and long-duration node-operation evidence;
- independent technical review of consequential current-facing claims;
- periodic rechecks of time-sensitive exchanges, explorers, APIs, pools, wallet services, and community links.

## Security reporting

GitHub Private Vulnerability Reporting is enabled and the external private-reporting route has been verified. See [SECURITY.md](SECURITY.md). Ordinary non-sensitive documentation problems may use public GitHub issues; sensitive material should not be posted publicly.

## Navigation

- [README](README.md)
- [Contributing](CONTRIBUTING.md)
- [Evidence scale](EVIDENCE_SCALE.md)
- [Source registry](SOURCE_REGISTRY.md)
- [Glossary](GLOSSARY.md)
- [Roadmap](ROADMAP.md)
- [Documentation index](docs/README.md)
- [Documentation coverage](docs/documentation-coverage.md)
- [Verification evidence index](docs/verification/verification-index.md)
- [Known unknowns](docs/verification/known-unknowns.md)

## Verification

**Status:** Reviewed project dashboard
**Primary sources checked:** Current MoreBC2 v31.1.0 source/runtime records, release evidence, 2026-09-11 public-infrastructure evidence, 2026-09-12 exchange evidence, repository deployment workflow, and project policy files
**Notes:** This page summarizes the state of the MoreBC2 project. It does not independently turn bounded evidence into universal BitcoinII behavior, permanent service availability, or production-readiness claims.