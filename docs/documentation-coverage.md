# Documentation coverage

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-09-08

This dashboard summarizes coverage. It does not turn source review, plans, or dated observations into runtime verification.

## Status legend

| Status | Meaning |
|---|---|
| Framework | Structure or checklist material exists. |
| Partial | Useful evidence exists, but important review or testing remains. |
| Source Reviewed | The cited source path was reviewed; runtime behavior is not implied. |
| Locally Tested | A dated, version- and environment-scoped runtime record exists. |
| Needs Recheck | Date, release, link, or service freshness requires another check. |
| Verified | The page's stated verification requirements and evidence are complete. |

## Current coverage

| Area | Status | Boundary |
|---|---|---|
| Current release identity | Source Reviewed / observed | `v31.1.0` is the current documentation baseline; independent binary authentication remains open. |
| Consensus and difficulty | Strong partial | ShockWave and height-`57750` activation material is current-facing; runtime and deeper path review remain incomplete. |
| Architecture and Source Atlas | Strong partial | Broad source coverage exists, including dedicated v31 pages; source review is not runtime testing. |
| Node and RPC | Historical locally tested / current needs test | `v29.1.0` Windows evidence is preserved; a fresh `v31.1.0` record is needed. |
| Wallet, mempool, mining, RPC, validation, PSBT | Partial | Structural and targeted v31 source review exists; current regression and runtime coverage is incomplete. |
| Releases | Partial | Historical v29 integrity work and current v31 metadata exist; authentication and reproducibility remain open. |
| API and infrastructure | Needs Recheck | Dated public-service observations exist; permanence, ownership, reliability, and complete schemas are not established. |
| Exchange integration | Partial | Operator guidance is v31-aware; confirmation policy and account-level behavior remain unresolved. |
| Ecosystem | Needs Recheck | Dated observations must be refreshed before recommendations. |
| Contribution and governance | Draft | Licensing guidance exists; final contribution workflow and team/enforcement details need owner confirmation. |
| Site tooling | Automated checks | Astro/Starlight generation, adapter tests, rendered output, and Windows evidence guards exist. Passing them does not verify protocol claims. |
| Independent technical review | Important quality task | Strongly encouraged for consequential current-facing claims; absence alone is not a visibility blocker. |
| Public-release readiness | Blocked | The licensing package is present; privacy treatment, residual rights/attribution review, a public security-reporting route, and owner approval remain open. |

## Current routes

- [Project status](../PROJECT_STATUS.md)
- [Repository audit](AUDIT.md)
- [Roadmap](../ROADMAP.md)
- [Verification evidence index](verification/verification-index.md)
- [Known unknowns](verification/known-unknowns.md)
- [v31 currentness audit](verification/v31-currentness-audit-2026-09-02.md)
- [Legal and reuse posture](LEGAL_REUSE.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current repository status, verification index, v31 audit, release records, historical runtime records, scripts, and workflows
**Notes:** This dashboard reports documentation coverage and explicit gaps; it is not a BitcoinII verification certificate.
