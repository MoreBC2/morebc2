# Ongoing review handoff

**Category:** Project maintenance  
**Status:** Reviewed / Ongoing owner-maintainer checklist  
**Last reviewed:** 2026-09-12

## Purpose

This page is now an **ongoing review checklist** for a repository that is already public and deployed.

The previous pre-publication wording about changing visibility, enabling Private Vulnerability Reporting after publication, and deciding whether the site should become public is historical. Those transitions have already occurred.

Use this checklist when a new BitcoinII release, major documentation change, new runtime evidence, ecosystem change, or security/provenance issue requires a focused owner/maintainer review.

## Current review order

1. [Project status](../PROJECT_STATUS.md)
2. [Documentation index](README.md)
3. [Documentation coverage](documentation-coverage.md)
4. [Repository audit](AUDIT.md)
5. [Verification evidence index](verification/verification-index.md)
6. [Known unknowns](verification/known-unknowns.md)
7. [Open questions](verification/open-questions.md)
8. [Current release records](releases/README.md)
9. [Legal and reuse posture](LEGAL_REUSE.md)
10. [Third-party provenance audit](THIRD_PARTY_PROVENANCE_AUDIT.md)
11. [Contribution guide](../CONTRIBUTING.md)
12. root `SECURITY.md`
13. [Roadmap](../ROADMAP.md)

## Current publication/security state

The repository is public and the generated documentation site is deployed through Cloudflare Pages.

GitHub Private Vulnerability Reporting for MoreBC2 is enabled and verified. Sensitive MoreBC2 reports should use the current `SECURITY.md` instructions. This does not make MoreBC2 the upstream BitcoinII Core security authority.

## Review triggers

A fresh focused review is warranted when:

- BitcoinII Core publishes a new release/tag;
- release assets or authentication material change;
- consensus/network parameters change;
- new runtime testing materially changes evidence status;
- an explorer/API/Electrum/pool/exchange/wallet status changes;
- a new integration target is being approached;
- new copied/adapted third-party material enters the repository;
- a security/privacy issue is reported;
- the site build/deployment pipeline changes;
- a consequential claim receives contradictory evidence.

## Technical review lanes

Assign narrow reviews rather than asking one person to certify everything:

- consensus activation / difficulty / chainwork;
- replay protection / signing / PSBT;
- data restrictions / validation;
- header synchronization / reorg behavior;
- node/RPC/operator safety;
- wallet/recovery/external signer behavior;
- mining/template/Stratum behavior;
- release integrity/authentication;
- exchange confirmation/custody guidance;
- API/explorer/Electrum/public infrastructure;
- ecosystem freshness;
- licensing/provenance;
- site build/deployment/security controls.

Each review should state the evidence type: release-pinned source, local runtime, direct public-service observation, historical record, third-party claim, or operational policy.

## Current evidence rules

- Do not relabel old v29 evidence as v31 evidence.
- Do not treat source review as runtime testing.
- Do not treat local zero-peer transaction submission as public propagation.
- Do not treat a service's existence or endpoint as an uptime/SLA guarantee.
- Do not treat a verified source commit as binary authentication.
- Do not treat an exchange's confirmation count as consensus finality.
- Do not infer signer/wallet compatibility from Bitcoin-like address/script/API structure alone.

## Owner / maintainer decisions that remain meaningful

The owner/maintainers may still need to decide:

- whether new external contributions or copied material satisfy licensing/provenance requirements;
- whether a new claim is strong enough for Documentation versus Verification/Research;
- whether a service should be recommended, merely listed, or removed;
- whether a new release invalidates current-facing guidance;
- whether independent technical review is needed before outreach or promotion;
- whether operational guidance such as confirmation/risk thresholds should change.

## Deployment closure checklist

For substantial documentation changes:

- site-check workflow passes;
- type/content check passes;
- static build passes;
- rendered output/internal-link audit passes;
- Windows node-documentation guard passes when relevant;
- generated output contains no blocked private-path variants;
- production Cloudflare deployment succeeds;
- live indexing policy check succeeds;
- canonical site responds successfully;
- preview-app state is interpreted separately from production state.

## Evidence closure checklist

For technical changes:

- current release/ref named;
- source links release-pinned where appropriate;
- runtime environment/date recorded if executed;
- public-service observations dated;
- unresolved limits stated;
- current index/known-unknown/open-question pages synchronized when the new evidence changes the queue.

## Historical coordination material

Earlier invite-only review packets, private-review assignments, and the archived polish plan remain project-management history. They are not the current review process.

## Verification

**Status:** Reviewed / Ongoing owner-maintainer checklist  
**Primary evidence checked:** Current public/deployed project state, current security route, completed documentation audits, verification index/queues, and deployment workflow  
**Notes:** This page coordinates maintenance review. It does not itself verify BitcoinII protocol behavior.
