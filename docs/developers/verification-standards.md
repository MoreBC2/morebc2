# Verification standards workflow

**Category:** Developer guide
**Status:** Reviewed / Framework
**Last reviewed:** 2026-09-12

## Summary

This page turns the root [Evidence Scale](../../EVIDENCE_SCALE.md) into a practical workflow for MoreBC2 contributors.

The central rule is simple: document what can be checked, identify what the evidence actually has authority to prove, and keep the boundary around the test or source.

## Current evidence levels

MoreBC2 uses the current root evidence scale:

- **E1 — Source-code evidence**
- **E2 — Release and provenance evidence**
- **E3 — Official-document evidence**
- **E4 — Direct live-network or public-service observation**
- **E5 — Local-test evidence**
- **E6 — Service-owner evidence**
- **E7 — Developer or maintainer statement**
- **E8 — Community or third-party evidence**

A page may contain claims at several levels. Do not average them into one confidence label.

Examples:

- `src/kernel/chainparams.cpp` can be E1 evidence for a consensus/network parameter.
- A GitHub release page can be E2 evidence that an asset was published, without proving reproducible binary provenance.
- A dated local v31 node test can be E5 evidence for the exact runtime behavior exercised.
- CoinEx's API can be E6 primary evidence for CoinEx's own confirmation setting, but not for BitcoinII consensus finality.
- A community report can be E8 evidence that an incident was reported, not proof of its cause.

## Claim-specific authority

Do not use a fixed source hierarchy mechanically. Ask which source controls the claim.

For protocol and implementation behavior, prefer release-pinned BitcoinII Core source. For release identity and assets, prefer release metadata and provenance evidence. For a service's own settings, prefer that service's API or documentation. For what happened in a local test, prefer the dated test record.

Official-looking evidence in the wrong domain does not outrank claim-appropriate evidence.

## Page status labels

Common page-level labels include **Draft**, **Needs Review**, **Reviewed / Partial**, **Verified**, **Historical**, and **Superseded**.

Page status describes document maturity, not the evidence level of every sentence. A Draft can contain strong facts; a Reviewed page can contain explicit unknowns.

Use **Verified** only when the page's stated verification scope has actually been met and another contributor can retrace the important evidence.

## Claim review workflow

For each important claim, ask:

1. What exactly is being claimed?
2. Is it protocol behavior, release provenance, runtime behavior, service policy, history, or discussion?
3. Which source has authority over that claim?
4. Is the evidence release-pinned or mutable/current?
5. Is the claim time-sensitive?
6. What did the source or test *not* establish?
7. Does the page record the relevant version/date/environment?
8. Can another contributor retrace the evidence?
9. Does newer evidence supersede an older statement?

## Source-code verification

For source-code claims, record the repository, release/tag/commit, file path, important symbol or call path, what was checked, and what remains unchecked.

Prefer release-pinned links for current-release claims. Mutable `main` observations should be labeled as such.

Keep consensus, policy, wallet behavior, networking, UI, and build tooling separate. A Bitcoin-like inherited structure is not proof that BitcoinII-specific behavior is identical.

Current v31 examples requiring special care include ShockWave difficulty, replay-protection signature hashing, activation-boundary mempool behavior, fork-aware header synchronization, and consensus data restrictions.

## Release verification

For release claims, keep these distinct:

- asset existence;
- GitHub-reported asset digest;
- independently calculated local hash;
- tag/commit verification state;
- maintainer-signed checksum or detached signature;
- trusted release-signing-key path;
- binary-to-source provenance;
- reproducible-build proof.

One does not automatically establish the others.

## Live network and public-service verification

For explorer, API, WebSocket, Electrum, node-output, or other public-service observations, record the service, date/time window, route or method, relevant result, and limits of the observation.

A point-in-time HTTP 200 does not prove uptime, operator independence, custody-grade reliability, or valid transaction broadcast. Rejecting malformed transaction data proves less than successfully broadcasting a valid transaction.

## Local testing verification

For tested commands or workflows, record operating system, BitcoinII version/ref, network, data-directory/wallet isolation, command or procedure, actual result, date, and safety boundaries.

Do not generalize a bounded regtest, partial-sync, platform-specific, or zero-peer result into universal mainnet behavior.

The September 2026 v31 wallet/PSBT test is a good example: it proves the documented isolated lifecycle worked, while replay activation itself remained source-confirmed rather than regtest-runtime-confirmed.

## Service-owner evidence

A service or exchange can be authoritative for its own operational setting. Record the exact field/wording and observation date.

Do not translate service terminology into protocol guarantees. For example, an exchange field named `irreversible_confirmations` is that exchange's setting; it is not cryptographic finality.

## Developer, maintainer, community, and third-party evidence

Developer or maintainer statements can establish attributable intent, explanation, or plans, but do not override implemented source/runtime evidence.

Community and third-party material is useful for discovery, reports, historical context, and questions worth checking. Preserve it as that evidence type unless stronger evidence confirms the broader claim.

## Verification queue

Use the verification queue when a claim matters but lacks claim-appropriate evidence, a source is stale, a release changed behavior, a service state needs rechecking, or a test has not been run.

Related pages:

- [Verification index](../verification/verification-index.md)
- [Verification section](../verification/README.md)
- [Known unknowns](../verification/known-unknowns.md)
- [Open questions backlog](../verification/open-questions.md)

## Minimum verification block

Substantial technical pages should state at minimum:

```md
## Verification

**Status:** <page maturity>
**Primary sources checked:** <claim-appropriate sources>
**Notes:** <what was checked and what remains outside scope>
```

Add version, date, environment, route, commit, or service details wherever the claim needs them.

## Upgrade and downgrade rules

Upgrade a page only when its important claims are retraceable, time-sensitive claims are current, and unresolved boundaries are explicit. Downgrade or qualify a page when a new release changes behavior, a service observation becomes stale, a claim was based on weaker evidence than originally understood, or newer evidence contradicts it.

## Verification

**Status:** Reviewed / Framework  
**Primary sources checked:** Current MoreBC2 Evidence Scale, September 2026 verification records, contributor rules, and current documentation practice  
**Notes:** Refreshed on 2026-09-12 to match claim-specific authority, E6 service-owner evidence, bounded local runtime testing, and current v31 evidence discipline.