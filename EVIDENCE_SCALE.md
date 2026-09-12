# MoreBC2 Evidence Scale

**Status:** Framework
**Last reviewed:** 2026-09-12

The evidence scale explains how much confidence readers should place in a claim and what a particular source can actually prove.

A page can contain multiple claims with different evidence levels. Evidence labels are not the same as page status: a Draft page may contain strong source-backed facts, while a Reviewed page may still contain explicitly unresolved items.

## Core rule: authority is claim-specific

There is no single source that is strongest for every question.

- BitcoinII Core source is strongest for current protocol and implementation claims.
- BitcoinII release metadata is strongest for release identity and published assets.
- A dated local test is strongest for what happened in that exact test environment.
- An exchange's own API is strongest for that exchange's observed operational setting.
- A public explorer is useful for dated chain/service observations, but it does not override consensus source code.

Never upgrade a claim because the source sounds official in a different context.

## Evidence levels

### E1 — Source-code evidence

The claim is checked directly against the relevant BitcoinII source, preferably a release-pinned tag or commit.

Use for consensus behavior, network parameters, address formats, ports, hashing paths, RPC presence, wallet/node implementation, and configuration defaults.

Record the repository, ref, file path, and review date. Source review proves what the reviewed code says; it does not by itself prove live-network activation, runtime behavior on every platform, or third-party compatibility.

### E2 — Release and provenance evidence

The claim is checked against official release notes, release assets, tags, commits, or release metadata.

Use for release version, publication date, release notes, asset inventory, and specifically identified provenance signals.

Keep these claims separate:

- an asset exists on a release page;
- GitHub reports an asset digest;
- a source commit or tag is cryptographically verified;
- a maintainer-signed checksum manifest exists;
- a binary has been independently hashed;
- a binary is reproducibly built from reviewed source.

One does not automatically prove the others.

### E3 — Official-document evidence

The claim is checked against an official project website, project-controlled documentation, or repository documentation.

Use for project descriptions, official links, public-facing instructions, and project positioning.

Official documentation can become stale. For current technical behavior, prefer newer release-pinned source when the website or older documentation conflicts with it.

### E4 — Direct live-network or public-service observation

The claim is directly observed from an explorer, API, WebSocket, Electrum service, node output, or another public service.

Use for dated block height, tip agreement, route behavior, service responses, and current-looking operational state.

Always include the date or observation window. A successful point-in-time check does not prove long-term uptime, backend independence, an SLA, custody-grade reliability, or behavior outside the tested routes.

### E5 — Local-test evidence

The claim is established by running software or commands in a recorded local environment.

Use for node startup, wallet behavior, RPC examples, PSBT flows, build steps, configuration behavior, and other runtime checks.

A useful test record includes the date, operating system, BitcoinII Core version/ref, network, node/wallet state, command or procedure, actual result, and safety/isolation boundaries.

Do not generalize a bounded regtest, testnet, partial-sync, or platform-specific result into universal mainnet behavior.

### E6 — Service-owner evidence

The claim comes directly from the service or exchange whose behavior is being described, such as its public API, status page, helpdesk, or listing documentation.

Use for that service's confirmation policy, deposit/withdrawal state, listing process, published fee, or other service-controlled settings.

This can be primary evidence **for the service's own policy** while remaining third-party evidence relative to BitcoinII consensus. Service settings are time-sensitive and should be dated and rechecked.

### E7 — Developer or maintainer statement

The claim is based on an attributable public statement from a relevant developer or maintainer.

Use for intent, planned work, rationale, or clarification that is not otherwise established by implementation evidence.

A developer statement is not the same as implemented code or runtime evidence.

### E8 — Community or third-party evidence

The claim comes from community discussion, social media, Reddit, Telegram, an external article, aggregator, or other non-authoritative source for the question at hand.

Use for discovery, historical context, user reports, proposals, rumors needing verification, independent commentary, or external market metadata.

Label the source type and do not promote it to implementation or current service fact without stronger evidence.

## Confidence descriptions

### High confidence

The important claim is supported by strong claim-appropriate evidence, its scope is clear, and contradictory current evidence has not been found.

### Medium confidence

Useful evidence exists, but runtime scope, freshness, independence, compatibility, or review coverage remains incomplete.

### Low confidence

The claim depends mainly on discussion, third-party summaries, indirect inference, or stale material.

### Historical confidence

The evidence is valid for a stated past version or date but should not be used as a current claim without a new check.

## Required uncertainty discipline

Use explicit wording when the evidence stops short of the broader claim. Examples include:

- Needs verification.
- Source-confirmed; runtime-unverified.
- Directly observed on 2026-09-11; not an uptime guarantee.
- Locally tested on isolated regtest; mainnet behavior was not exercised.
- This is exchange policy, not protocol finality.
- Backend/operator independence has not been established.
- Current source differs from older website documentation.

## Page-status boundary

Page status describes the maturity of the page, not the strength of every individual claim.

A page should only be marked **Verified** when its stated verification scope has been met. It is acceptable—and often preferable—for a current, useful page to remain Draft, Partial, Framework, or Reviewed when important boundaries remain.

## Verification

**Status:** Framework
**Primary sources checked:** Current MoreBC2 verification records, contribution policy, release evidence, public-infrastructure records, and exchange evidence
**Notes:** The scale was refreshed on 2026-09-12 to distinguish claim-specific authority, service-owner evidence, release provenance, dated live observations, and bounded local testing.