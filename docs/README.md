# MoreBC2 Docs

**Category:** Documentation index
**Status:** Draft
**Last reviewed:** 2026-06-30

This directory holds the working documentation for MoreBC2.

MoreBC2 is still a private, source-backed documentation project. Many pages are intentionally marked Draft or Partial because command examples, release artifacts, and ecosystem claims still need direct verification.

## Best starting points

For a quick project-level orientation, start with:

- [Project status](../PROJECT_STATUS.md)
- [Repository audit](AUDIT.md)
- [Documentation coverage](documentation-coverage.md)
- [Private review handoff](REVIEW_HANDOFF.md)
- [Legal and reuse posture](LEGAL_REUSE.md)
- [Documentation polish plan](POLISH_PLAN.md)

For a technical reader, start with:

- [Architecture](architecture/README.md)
- [Developers](developers/README.md)
- [Source Atlas](developers/source-atlas/README.md)
- [RPC overview](developers/rpc-overview.md)
- [API documentation](api/README.md)
- [Infrastructure directory](infrastructure/README.md)
- [Wallet guide](wallets/wallet-guide.md)

## Project-maintenance pages

- [Repository audit](AUDIT.md)
- [Documentation coverage](documentation-coverage.md)
- [Private review handoff](REVIEW_HANDOFF.md)
- [Legal and reuse posture](LEGAL_REUSE.md)
- [Documentation polish plan](POLISH_PLAN.md)

## Main sections

- [Documentation](documentation/README.md) — current source-backed BitcoinII behavior.
- [Architecture](architecture/README.md) — conceptual maps of BitcoinII Core components and flows.
- [Configuration](configuration/README.md) — BitcoinII Core configuration concepts and option references.
- [API](api/README.md) — evidence-linked REST, WebSocket, Electrum, public-endpoint, and read-only example summaries.
- [Infrastructure](infrastructure/README.md) — observed public service directory and status wording policy.
- [Research](research/README.md) — technical explainers and analysis.
- [Discussion](discussion/README.md) — community ideas, proposals, and opinions.
- [History](history/README.md) — past events and milestones.
- [Exchange](exchange/README.md) — exchange and service-provider integration resources.
- [Developers](developers/README.md) — RPC, build, source atlas, and integration notes.
- [Mining](mining/README.md) — mining guides and pool information.
- [Wallets](wallets/README.md) — wallet resources and user guides.
- [Nodes](nodes/README.md) — node operation and network resources.
- [Ecosystem](ecosystem/README.md) — wallets, explorers, pools, exchanges, tools, APIs, and services.
- [Encyclopedia](encyclopedia/README.md) — concept explainers and cross-linked background pages.
- [Verification](verification/README.md) — open verification work, known unknowns, and source-backed status tracking.
- [Site](site/README.md) — public website planning.

## Current caution

The repository has many source-reviewed pages, but not all examples are tested.

Before using a command in production, check whether the relevant page says the command was actually run. If it does not, treat the command as source-observed and untested.

## Private review caution

Before opening the repo to new readers or agents, use [Private review handoff](REVIEW_HANDOFF.md) and [Legal and reuse posture](LEGAL_REUSE.md).

Those pages explain what is ready for narrow review, what should not be changed broadly yet, which public-launch blockers remain, and how to avoid accidental reuse assumptions before a license decision.

## Rule of thumb

If it describes how BitcoinII works today, place it in Documentation.

If it explains how reviewed components fit together, place it in Architecture.

If it describes a reviewed implementation file, place it in Developers / Source Atlas.

If it summarizes observed public REST, WebSocket, Electrum, or endpoint behavior, place it in API and link the dated verification record.

If it lists public services or service-status wording rules, place it in Infrastructure and link the dated verification record.

If it describes something people are considering, debating, or comparing, place it in Research or Discussion.

If it records what still needs to be checked, place it in Verification.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 documentation structure
**Notes:** This index is a navigation aid for MoreBC2. It does not verify BitcoinII protocol behavior.
