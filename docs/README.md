# MoreBC2 Docs

**Category:** Documentation index
**Status:** Draft
**Last reviewed:** 2026-09-02

This directory holds the working documentation for MoreBC2.

Current-facing technical pages now use **BitcoinII Core `v31.1.0`** as the release baseline. Dated `v29.1.0` local tests and release-verification records remain preserved as historical, version-scoped evidence.

## Current technical anchors

Start here for present-day BitcoinII behavior:

- [What is BitcoinII?](documentation/what-is-bitcoinii.md)
- [Network specifications](documentation/network-specifications.md)
- [Consensus overview](documentation/consensus-overview.md)
- [Difficulty adjustment](encyclopedia/difficulty-adjustment.md)
- [Mining overview](mining/mining-overview.md)
- [Current releases](releases/README.md)
- [Exchange integration package](exchange/integration-package.md)
- [Known compatibility breakpoints](compatibility/known-breakpoints.md)

Current `v31.1.0` topics represented in those pages include ShockWave per-block difficulty adjustment, replay protection, consensus-level data restrictions, and fork-aware header synchronization.

## Evidence and currentness

For evidence boundaries and remaining work:

- [Verification evidence index](verification/verification-index.md)
- [Known unknowns](verification/known-unknowns.md)
- [Open questions backlog](verification/open-questions.md)
- [v31 currentness audit](verification/v31-currentness-audit-2026-09-02.md)

Historical records keep their original dates and release versions. MoreBC2 does not rewrite an old test to make it look like a current-release test.

## Main sections

- [Documentation](documentation/README.md) — current source-backed BitcoinII behavior.
- [Architecture](architecture/README.md) — conceptual maps of BitcoinII Core components and flows.
- [Configuration](configuration/README.md) — BitcoinII Core configuration concepts and option references.
- [API](api/README.md) — evidence-linked REST, WebSocket, Electrum, public-endpoint, and read-only example summaries.
- [Infrastructure](infrastructure/README.md) — observed public service directory and status wording policy.
- [Releases](releases/README.md) — current release metadata plus historical version-scoped verification evidence.
- [Compatibility](compatibility/README.md) — RPC, REST, Electrum, wallet, explorer, and integration breakpoints.
- [Research](research/README.md) — technical explainers and analysis.
- [Discussion](discussion/README.md) — community ideas, proposals, and opinions.
- [History](history/README.md) — past events and milestones.
- [Exchange](exchange/README.md) — exchange and service-provider integration resources.
- [Developers](developers/README.md) — RPC, build, Source Atlas, and integration notes.
- [Mining](mining/README.md) — mining guides and pool information.
- [Wallets](wallets/README.md) — wallet resources and user guides.
- [Nodes](nodes/README.md) — node operation and network resources.
- [Ecosystem](ecosystem/README.md) — wallets, explorers, pools, exchanges, tools, APIs, and services.
- [Encyclopedia](encyclopedia/README.md) — concept explainers and cross-linked background pages.
- [Verification](verification/README.md) — evidence records, open questions, and review coordination.

## Current caution

Source-reviewed does not always mean locally tested.

In particular, many operational tests were run against `v29.1.0`. Use those records as historical evidence until equivalent `v31.1.0` runtime checks exist.

## Rule of thumb

If it describes how BitcoinII works today, it must agree with the current release/source baseline or state clearly that it is historical.

If it records a dated observation or test, preserve the original release/version/date and add a new record when re-testing occurs.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 documentation structure and current `v31.1.0` refresh scope
**Notes:** This index is a navigation aid. It does not independently verify BitcoinII protocol behavior.