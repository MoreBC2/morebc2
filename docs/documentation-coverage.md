# Documentation coverage

**Category:** Project maintenance  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

This dashboard summarizes MoreBC2 coverage and evidence maturity. It does not turn source review, a plan, a public-service observation, or a successful site deployment into universal runtime verification.

## Status legend

| Status | Meaning |
|---|---|
| Framework | Structure/process guidance exists. |
| Reviewed / Partial | The page/section was audited, but genuine evidence gaps remain. |
| Source Reviewed | Current release-pinned source path was reviewed; runtime behavior is not implied. |
| Locally Tested | A dated, release/environment-scoped runtime record exists. |
| Directly Observed | A dated external/public-service observation exists. |
| Historical | Preserved evidence for an older release/date/context. |
| Verified | The page's stated verification requirements are complete for its defined scope. |

## Current coverage

| Area | Current state | Evidence boundary |
|---|---|---|
| Current release identity | Reviewed / directly observed | `v31.1.0` baseline, six assets, tag target and GitHub digest metadata recorded; stronger binary authentication/reproducibility remain open. |
| Documentation core | Reviewed / Partial | Network specs, consensus, checkpoints, releases, explorers, project overview, and identity pages audited against v31/current evidence. |
| Consensus / difficulty | Strong source coverage | ShockWave, replay protection, data restrictions, fork-aware header sync, chainwork selection, and activation anchors mapped. Controlled runtime vectors remain incomplete. |
| Architecture | Reviewed / Partial | Full architecture set synchronized to current v31 source/runtime boundaries. Controlled reorg and some edge-case runtime scenarios remain open. |
| Developers / Source Atlas | Reviewed / Partial | Full 55-page developer surface audited; current source paths and command-specific runtime boundaries synchronized. Clean source build/full upstream test execution remain open. |
| Configuration | Reviewed / Partial | Current P2P/RPC defaults, server mode, pruning/index defaults, and generated-config discrepancy documented. Production deployment patterns remain environment-specific. |
| Nodes / RPC | Current locally tested | Bounded Windows v31 mainnet node/RPC startup, sync progress, peer discovery, cookie RPC, shutdown/restart, and disposable wallet evidence exist. Full sync/long-duration/index-pruning matrix remain open. |
| Wallet / PSBT | Current locally tested + source reviewed | Disposable v31 wallet and zero-peer regtest PSBT lifecycle tested. Backup/restore, encryption, external signing, third-party wallet compatibility remain open. |
| Mining | Reviewed / Partial | ShockWave-aware mining/template path plus pool/Stratum/payout observations documented; end-to-end public Stratum qualification remains open. |
| Releases | Reviewed / Partial | Six current assets documented; Windows Qt archive independently hash-matched; verified target commit distinguished from binary authentication. Signed manifest/reproducibility remain open. |
| API / Explorer / Electrum | Directly observed / Reviewed | 2026-09-11 REST/WebSocket/Electrum checks plus current hierarchy/boundaries documented. Independence, uptime and valid public broadcast remain open. |
| Infrastructure | Reviewed / Partial | Service roles and current point-in-time behavior documented without claiming SLA/independence. |
| Compatibility | Reviewed / Partial | RPC, REST, Electrum, wallet, replay-domain, and service breakpoints synchronized to current evidence. Third-party workflow qualification remains partial. |
| Exchange integration | Reviewed / Partial | v31-aware integration/operator docs, current service evidence, and provisional 50-confirmation baseline documented. Production custody/runbooks/chainwork thresholds remain open. |
| Ecosystem | Reviewed / time-sensitive | Current wallets/explorers/APIs/exchanges/pools/resources audited; live services require periodic recheck. |
| Encyclopedia | Reviewed / Partial | Confirmation/finality, reorg, PoW, difficulty and developer glossary synchronized to current v31 evidence. |
| Research | Reviewed / Partial | Resolved source facts removed from research uncertainty; remaining questions are empirical/comparative. |
| History | Reviewed / Partial | Recorded timeline milestones now distinguish current Core releases from legacy repository history; comprehensive ecosystem chronology remains incomplete. |
| Discussion | Reviewed framework | No current proposal pages; placement/status semantics updated. |
| News | Reviewed framework | No standalone news entries; evidence/placement rules updated. |
| Verification | Reviewed / Partial | Current evidence index, known unknowns, open questions and command-testing status synchronized to the audit sequence. Remaining gaps are real runtime/operational work. |
| Contribution / governance | Reviewed project framework | Root contribution/status/evidence/source/glossary/roadmap documents audited; governance/framework docs remain appropriate. |
| Site tooling | Repeatedly tested | Astro/Starlight checks, link/output validation, Windows-doc guard, private-path scan, Cloudflare production deploy, and live indexing verification pass on current changes. |
| Security reporting | Current | Repository is public and GitHub Private Vulnerability Reporting is enabled/verified; `SECURITY.md` remains the MoreBC2 route, distinct from upstream BitcoinII security authority. |
| Public site/repository state | Public / deployed | Repository and production documentation site are live. Publication status does not imply technical completeness or universal verification. |

## Current evidence anchors

- [Project status](../PROJECT_STATUS.md)
- [Verification evidence index](verification/verification-index.md)
- [Known unknowns](verification/known-unknowns.md)
- [Open questions](verification/open-questions.md)
- [Windows v31 node/RPC validation](verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31 PSBT/replay validation](verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Public infrastructure smoke test](verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Exchange confirmation evidence](verification/exchange-confirmation-evidence-2026-09-12.md)
- [Current v31 release assets](releases/v31.1.0-assets.md)

## Remaining high-value evidence gaps

The broad documentation-structure/currentness phase is largely complete. Remaining work is narrower:

- stronger current-release binary authentication/reproducibility;
- full/long-duration node operation and optional index/pruning qualification;
- controlled ShockWave/reorg/activation-boundary vectors;
- external/hardware/third-party signer compatibility;
- wallet backup/restore/encryption/recovery tests;
- production exchange custody/deposit/withdrawal/reorg runbooks;
- chainwork-aware settlement examples and risk thresholds;
- end-to-end pool Stratum/share/payout qualification;
- periodic rechecks of time-sensitive services/releases;
- independent technical review of consequential claims.

## Audit rule

A section can be fully **audited** and still remain **Partial**. “Partial” now means the documentation accurately describes an evidence boundary that still requires real-world testing or external confirmation—not that the section was skipped.

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Completed 2026-09-12 section audits, current project status, verification records, v31 source reviews, runtime/service/exchange evidence, and deployment workflow results  
**Notes:** This dashboard summarizes documentation/evidence coverage. It is not a BitcoinII certification or production-readiness guarantee.
