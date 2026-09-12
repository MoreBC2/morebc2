# MoreBC2 roadmap

**Status:** Active project roadmap
**Last reviewed:** 2026-09-12

This roadmap organizes MoreBC2 work. It is not the BitcoinII protocol or software roadmap.

## Current stage — public repository and deployed documentation site

The source repository is public and the generated documentation site is deployed through Cloudflare Pages from `main`.

Current-facing BitcoinII material uses the `v31.1.0` baseline. MoreBC2 now has bounded current-version node/RPC and PSBT runtime evidence, current public-infrastructure observations, and a current-dated exchange-confirmation evidence record. Historical `v29.1.0` records remain preserved as version-scoped history.

Publishing the site does not mean every page is Verified. Page status and evidence boundaries remain claim-specific.

## Work completed since the previous roadmap state

The following items are no longer merely future tasks:

- fresh isolated `v31.1.0` Windows node/RPC testing;
- isolated `v31.1.0` PSBT runtime testing and replay-protection source tracing;
- current public explorer/API/WebSocket/Electrum smoke testing;
- a source-backed current-release asset/provenance record;
- direct exchange-confirmation evidence and a provisional 50-confirmation normal-deposit baseline;
- production Cloudflare Pages deployment and live indexing verification;
- current audit passes for Exchange Integration and Contribute & project documentation.

These completions are bounded by their evidence records and should not be generalized beyond them.

## Current technical priorities

- Strengthen release authentication if a maintainer-approved signing/checksum path or reproducible-build route can be established.
- Add concrete cumulative-chainwork examples for exchange deposit monitoring.
- Define practical reorganization alert/incident handling without pretending a fixed block count creates absolute finality.
- Develop production-oriented deposit and withdrawal runbooks while keeping custody architecture operator-specific.
- Produce external/third-party signer replay-protection compatibility evidence or vectors.
- Extend wallet/Electrum compatibility testing where it can be done safely and without touching existing user wallets.
- Establish successful valid-public-broadcast evidence only if it materially improves integration documentation and can be done safely with disposable funds/test infrastructure.
- Add longer-duration node-operation, sync/storage, and recovery evidence where useful.

## Current project and integration priorities

- Establish a canonical BitcoinII technical/security contact path suitable for exchanges and infrastructure providers.
- Keep applicant-authority boundaries explicit: MoreBC2 can prepare documentation but should not impersonate the BitcoinII project team.
- Recheck exchange listing requirements, confirmation settings, explorers, APIs, wallets, pools, and public services on a dated basis.
- Keep current release/source links synchronized when BitcoinII publishes a new release.
- Seek independent technical review of consequential consensus, operator, and exchange-facing claims.

## Documentation and tooling priorities

- Keep the README, project status, roadmap, source registry, evidence scale, verification index, and known-unknowns page synchronized.
- Continue category-by-category documentation audits rather than allowing old Draft/Needs Review labels to become stale by default.
- Keep issue and pull-request templates conservative about verification.
- Run documented site checks on relevant changes and preserve the generated-output privacy scan.
- Maintain clear separation among release provenance, runtime testing, public-service observations, exchange policy, and historical records.
- Address CI/runtime dependency warnings when they become a compatibility or maintenance concern rather than silently changing supported versions.

## Site and distribution priorities

The documentation site is already public and indexable at `https://morebc2.pages.dev/`.

Future distribution decisions remain separate work, including:

- custom-domain strategy, if desired;
- downloadable MoreBC2 releases or packaged documentation artifacts;
- artifact-specific dependency notices for newly distributed bundles where required;
- deployment/runtime dependency maintenance;
- analytics or other site operations that do not weaken privacy or documentation independence.

## Longer-term work

- Expand developer, architecture, node, wallet, mining, API, and integration material as evidence permits.
- Add diagrams and examples where they genuinely improve understanding and can be kept current.
- Improve maintainer/reviewer participation and independent review without granting unnecessary repository privileges.
- Preserve historical records without allowing them to masquerade as current behavior.
- Build a sustainable process for periodic source, release, service, and documentation freshness checks.

## Completion rule

No roadmap item changes a page to Verified by itself.

Verification requires the evidence and review appropriate to the claim, as described in [EVIDENCE_SCALE.md](EVIDENCE_SCALE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Verification

**Status:** Reviewed roadmap
**Primary sources checked:** Current project status, v31.1.0 verification records, release evidence, exchange evidence, and production deployment workflow
**Notes:** Refreshed 2026-09-12 to retire work already completed and focus the active queue on the remaining release-authentication, chainwork/reorg, custody, contact, compatibility, and long-duration operational gaps.