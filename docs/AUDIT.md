# Repository audit

**Category:** Project maintenance  
**Status:** Reviewed / Ongoing maintenance  
**Last reviewed:** 2026-09-12  
**Current technical baseline:** BitcoinII Core `v31.1.0`

## Assessment

MoreBC2 is now a **public source repository with a deployed documentation site**. The earlier audit state that said the repository was not ready for a visibility change is historical and no longer describes the project.

The current repository has a coherent evidence-first documentation structure, a current v31 technical baseline, repeated CI/deployment checks, explicit security-reporting guidance, and a broad completed documentation audit. Important technical and operational gaps remain visible and should remain visible.

Public/deployed does not mean every BitcoinII claim or integration workflow is Verified.

## Current publication state

Current project state includes:

- public GitHub repository;
- production Astro/Starlight documentation site on Cloudflare Pages;
- repository Markdown as the editable source of record;
- GitHub Private Vulnerability Reporting enabled and verified for MoreBC2;
- root `SECURITY.md` separating ordinary documentation issues, sensitive MoreBC2 reports, and upstream/third-party vulnerabilities;
- path-scoped licensing/notice package and provenance documentation;
- generated-output private-path protection in the deployment workflow;
- live indexing-policy verification after production deployment.

## Completed documentation audit sequence

The principal reader-facing sections were reviewed against the same current evidence base during the September 12 audit sequence:

- Documentation
- Configuration
- Nodes
- Releases
- API / Explorer Resources
- Infrastructure
- Wallets
- Mining
- Developers / Source Atlas
- Architecture
- Ecosystem
- Exchange integration
- Encyclopedia
- Research
- History
- Discussion
- News
- Verification navigation/current queues

A section may remain **Reviewed / Partial** after audit because real evidence gaps remain. That status is preferable to overstating certainty.

## Tail-section and maintenance closure — 2026-09-12

After the major technical-section passes, the remaining tail was reviewed as one maintenance sweep:

- History was updated with current Core release/genesis chronology while preserving legacy repository history;
- Discussion and News were converted from untouched June drafts into reviewed evidence/placement frameworks;
- Verification router, evidence index, known-unknown queue, open-question queue, and command-testing matrix were synchronized to the current v31 runtime/source evidence;
- the documentation root index and coverage dashboard were synchronized to the completed audit sequence;
- obsolete pre-launch site-planning files were explicitly archived rather than left presenting a future website that already exists;
- the repository audit, ongoing review handoff, and legal/reuse posture were rewritten for the actual public/deployed project state.

Historical dated evidence records and rights/provenance audits were intentionally not rewritten merely to make them look newer.

## Current v31 technical posture

Current source-backed documentation includes:

- ShockWave per-block difficulty from mainnet height `57750`;
- replay protection from `57750` with domain `0x01324342`;
- consensus data restrictions from `57750`;
- fork-aware header synchronization;
- accumulated-chainwork best-chain selection;
- ShockWave-aware candidate-time / `nBits` handling in mining/template paths;
- wallet/raw/PSBT/mempool/block/cache replay-domain propagation;
- current mainnet P2P `8338`, RPC default `8332`, and current chain/network constants.

Current runtime evidence includes:

- bounded Windows `v31.1.0` mainnet node/RPC startup, peer discovery, advancing IBD, cookie RPC, shutdown/restart, and disposable-wallet isolation;
- separate isolated zero-peer regtest wallet/PSBT signing/finalization/mempool/local-submission workflow.

These do not establish universal production/cross-platform behavior.

## Release-integrity posture

Current release evidence includes:

- six `v31.1.0` assets with GitHub-reported SHA-256 metadata;
- lightweight `v31.1.0` tag target recorded;
- target commit GitHub-verified/valid;
- independent MoreBC2 hash match for the Windows Qt release archive;
- extracted Windows Qt executable observed as `Authenticode: NotSigned`.

Still unresolved:

- independent hashing of the other five current assets;
- a publisher-authenticated checksum/signature path;
- trusted release-key guidance;
- reproducible-build proof.

A verified source commit is not binary authentication.

## Public-service and ecosystem posture

Current dated observations exist for:

- Official BitcoinII Explorer;
- project-linked and supplemental Mempool-style explorer/API services;
- REST/WebSocket behavior;
- Electrum TCP/TLS reachability;
- current exchange confirmation settings for several BC2 venues;
- current pool/Stratum configuration and payout-language observations.

These remain point-in-time observations. They do not prove long-term uptime, backend independence, payout reliability, custody-grade behavior, or valid public transaction broadcast.

## Exchange/custody posture

MoreBC2 currently uses **50 confirmations as a provisional normal-deposit baseline**, supported by current NonKYC and NestEx settings. CoinEx uses a much more aggressive staged policy.

This is operational guidance, not BitcoinII consensus finality.

Still open:

- cumulative-chainwork settlement example;
- large-value escalation thresholds;
- empirical reorganization history;
- production custody architecture;
- deposit/withdrawal/reorg incident runbooks;
- periodic policy rechecks.

## Security and privacy posture

Current tracked/project workflows include safeguards against publishing known private local-user path variants in generated output.

Historical evidence retains useful path structure with identifying components redacted where previously audited. The project does not claim that old Git history was rewritten or erased.

Sensitive MoreBC2 security reports should follow `SECURITY.md` and the verified private-reporting route. MoreBC2 does not represent itself as the upstream BitcoinII Core security authority.

## Legal / provenance posture

The repository retains:

- root licensing files;
- `NOTICE` / third-party notices;
- [Legal and reuse posture](LEGAL_REUSE.md);
- [Third-party provenance audit](THIRD_PARTY_PROVENANCE_AUDIT.md).

The provenance audit remains a dated rights-review record rather than a legal warranty. New copied/adapted upstream material, generated distributable artifacts, or dependency bundles should receive their own rights review as appropriate.

## Remaining high-value work

The repository no longer needs another blanket “is anything documented?” pass. The important remaining work is targeted:

- stronger release authentication/reproducibility;
- complete/long-duration current node operation;
- controlled ShockWave/reorg/activation-boundary tests;
- external/hardware/third-party signer compatibility;
- wallet backup/restore/encryption/recovery tests;
- end-to-end pool Stratum/share/payout qualification where useful;
- production exchange/custody runbooks and chainwork-aware risk thresholds;
- periodic service/release freshness checks;
- independent technical review of consequential current-facing claims.

See [Verification evidence index](verification/verification-index.md), [Known unknowns](verification/known-unknowns.md), and [Open questions](verification/open-questions.md).

## Automated quality gate

The production workflow currently checks, among other things:

- type/content correctness;
- static-site build;
- rendered internal links/output;
- Windows node-documentation assumptions;
- blocked private-path variants in generated output;
- Cloudflare Pages production deployment;
- live indexing policy.

Passing those checks validates the documentation/deployment mechanics for the commit. It is not a BitcoinII protocol certification.

## Audit conclusion

The broad documentation/currentness cleanup is substantially complete. The project is public, deployed, navigable, and explicit about its uncertainty boundaries.

Future audits should be **change-triggered**—new BitcoinII releases, new runtime evidence, changed services, new integrations, or discovered provenance/security issues—rather than repeatedly redoing the same full repository review without a concrete trigger.

## Verification

**Status:** Reviewed / Ongoing maintenance  
**Primary evidence checked:** Current project status, completed section audits, current verification index/queues, v31 runtime and source records, release records, public-service evidence, security/publication state, and deployment workflow results  
**Notes:** This is a repository-maintenance assessment. It does not independently verify BitcoinII consensus or guarantee production suitability.
