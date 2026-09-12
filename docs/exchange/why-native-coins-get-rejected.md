# Why Native Coins Get Rejected by Exchanges

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page tracks common reasons a native blockchain coin may be rejected, delayed, or deprioritized by an exchange.

It is a prevention checklist, not a claim that any specific exchange has rejected BitcoinII (BC2) for these reasons.

## 1. The exchange cannot quickly understand the project

Common symptoms:

- no clear project summary;
- website, ticker, chain name, or branding are inconsistent;
- documentation uses hype instead of technical facts;
- claims are not linked to sources;
- current and historical protocol behavior are mixed together.

How to reduce risk:

- maintain one canonical project summary;
- keep website, repository, explorer, and release links current;
- use release-pinned technical facts for consensus behavior;
- separate current behavior from historical behavior;
- avoid exaggerated claims.

## 2. The exchange cannot confirm that the chain is alive and operable

Common symptoms:

- explorer is offline or stale;
- blocks are not progressing;
- node software or release status is unclear;
- public infrastructure cannot be independently checked;
- project links are dead.

How to reduce risk:

- provide a current explorer and dated block-production check;
- provide the current release and canonical repository;
- document seed/P2P/RPC information;
- provide dated public-infrastructure evidence where available;
- avoid describing point-in-time reachability as an uptime guarantee.

## 3. The exchange cannot safely integrate or update the software

Common symptoms:

- no clear daemon/node setup notes;
- ambiguous RPC defaults or unsafe public-RPC guidance;
- no release digest/signature explanation;
- no build/update procedure;
- no reliable technical contact for urgent software questions.

How to reduce risk:

- provide current source and release links;
- document release-authentication evidence honestly;
- distinguish GitHub asset digests and verified commits from signed-binary or reproducible-build proof;
- provide tested or clearly bounded node/RPC evidence;
- document update/restart/recovery expectations;
- provide an official or maintainer-approved technical contact process when one exists.

## 4. The exchange cannot evaluate deposit and reorganization risk

Common symptoms:

- no confirmation guidance;
- confirmation count presented as guaranteed finality;
- no reorganization procedure;
- no chain-health or cumulative-chainwork monitoring guidance;
- no escalation rule for large or unusual deposits.

How to reduce risk:

- document a clearly labeled operational confirmation policy;
- explain that Proof-of-Work finality is probabilistic;
- monitor cumulative chainwork, tip progress, peers, difficulty/work rate, and reorganization signals in addition to block count;
- document rollback/hold behavior if a credited deposit leaves the active best-work chain;
- define manual-review conditions for higher-risk deposits.

## 5. The exchange sees unresolved security or trust concerns

Common symptoms:

- release-authentication claims are stronger than the available evidence;
- no security/contact process;
- unsupported audit claims;
- replay-protection or signer compatibility is assumed rather than tested;
- known gaps are hidden instead of documented.

How to reduce risk:

- keep release-verification limitations visible;
- state honestly when a signed checksum manifest, detached signatures, reproducible builds, or an audit have not been established;
- maintain known-unknowns and dated verification records;
- provide replay-protection and signer evidence appropriate to the intended custody stack;
- do not turn a bounded test into a production-security claim.

## 6. The exchange sees weak market or community support

Common symptoms:

- stale or broken social links;
- no existing markets or liquidity plan;
- no current community snapshot;
- inflated follower, volume, or partnership claims;
- project activity appears abandoned.

How to reduce risk:

- provide current official/community links with a check date;
- identify existing markets from direct exchange sources;
- provide a realistic liquidity/market-support plan only when requested and actually available;
- avoid inflated activity or volume claims.

## 7. Legal, compliance, or issuer information is incomplete

Higher-barrier exchanges may request much more than technical documentation. Current public listing processes can ask for:

- legal-entity registration records;
- legal opinions;
- project-owner/core-team details;
- KYC for core team members;
- code/security review or audit material;
- supply/distribution information;
- compliance questionnaires.

A strong technical packet does not replace those requirements.

How to reduce risk:

- determine what the specific exchange requires before submission;
- have the authorized project representative supply legal/KYC information where required;
- do not invent a legal entity, audit, project-owner role, or compliance approval;
- use neutral language and avoid investment-return promises.

## 8. The applicant is not authorized to represent the project

Some exchanges require the applicant to be part of the official project team or to have explicit permission from that team. Others ask for project-owner or core-team information.

For MoreBC2 this matters directly: MoreBC2 is an independent documentation project and should not present itself as the BitcoinII project team.

How to reduce risk:

- record the submitter's actual relationship to BitcoinII;
- obtain project-team authorization when the exchange requires it;
- use MoreBC2 to prepare technical documentation, not to manufacture official standing;
- if submitting only independent technical information, say so plainly.

## 9. The application is sent before the packet is ready

Common symptoms:

- placeholder fields remain;
- broken links are included;
- old release information is submitted;
- explorer/network status was not rechecked;
- the exchange asks basic technical questions that the packet should already answer;
- old listing-fee or integration-requirement information is reused without rechecking.

How to reduce risk:

- use [Exchange Readiness Checklist](exchange-readiness-checklist.md);
- use [Exchange Listing Packet Template](listing-packet-template.md);
- recheck the target exchange's official application requirements immediately before submission;
- save the exact submitted packet and submission date;
- track every response and requested change.

## BC2-specific readiness snapshot — 2026-09-12

Several earlier BC2 blockers have materially improved:

- **Project identity / ticker:** source-confirmed.
- **Current release:** BitcoinII Core `v31.1.0` is identified and release assets/digests are recorded.
- **Network parameters:** current v31 mainnet values are source-reviewed.
- **Explorer/public infrastructure:** dated direct checks exist.
- **Current node/RPC behavior:** an isolated Windows v31.1.0 node/RPC workflow has current-dated runtime evidence.
- **PSBT transaction path:** an isolated v31.1.0 regtest PSBT workflow has current-dated runtime evidence.
- **Confirmation guidance:** MoreBC2 now has an evidence-backed provisional 50-confirmation normal-deposit baseline with chainwork/risk caveats.
- **Existing exchange precedent:** current direct evidence exists for CoinEx, NonKYC, NestEx, and Biconomy.

Important remaining gaps include:

- a canonical technical/security contact process;
- complete release-binary authentication beyond GitHub asset digest metadata and verified target-commit evidence;
- production custody architecture and deposit/withdrawal procedures;
- concrete cumulative-chainwork thresholds and a reorganization incident playbook;
- external/third-party signer compatibility evidence;
- current branding/community/submission assets;
- applicant authority where an exchange requires an official project representative;
- legal/KYC/audit material for exchanges that require it.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 v31.1.0 integration/runtime evidence, current exchange-confirmation evidence, and 2026-09-12 exchange-listing requirement research
**Notes:** Refreshed on 2026-09-12. The page no longer treats current release, explorer, node/RPC evidence, or confirmation guidance as wholly missing, but it continues to distinguish those improvements from unresolved production custody, contact, release-authentication, authorization, and compliance work. It does not claim that any specific exchange rejected BC2 for these reasons.