# Documentation coverage

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page tracks MoreBC2 documentation coverage.

It is a project-management dashboard. It is not BitcoinII protocol documentation, and it is not a record that commands, tests, release files, or live services have passed checks.

## Status legend

| Status | Meaning |
|---|---|
| Not started | No meaningful page exists yet. |
| Framework | A page or section exists, but it mostly defines structure. |
| Partial | Some source-backed material exists, but review is incomplete. |
| Reviewed | A meaningful first-pass review exists. |
| Needs recheck | Existing content should be checked against newer sources or releases. |
| Verified | Strong primary sources checked and page is ready to rely on. |

## Current coverage snapshot

| Area | Status | Current state |
|---|---|---|
| Architecture pages | Partial | Startup, consensus, transaction lifecycle, block lifecycle, reorg, mempool, wallet, candidate block, and peer communication pages exist. Runtime behavior still needs tests and review. |
| Source Atlas | Partial | Strong first-pass source notes exist across chain parameters, PoW, validation, storage, mempool, wallet RPC groups, mining RPC, blockchain RPC, network RPC, protocol, connection management, address manager, peer-list management, net-processing slices, raw transaction RPC, and mempool RPC. |
| Network/P2P documentation | Partial | Source notes, release comparison, selected blob checks, test coverage map, and test run plan exist. Local test execution and live checks are still missing. |
| Release documentation | Partial | Release observations, source comparison, network comparison, release asset inventory attempt, release artifact checklist, and release verification guide exist. Full asset names, hashes, signatures, trusted keys, and binary checks remain open. |
| Ecosystem documentation | Framework | Ecosystem direct-check plan exists. Explorer, API, pool, exchange, and wallet templates were refreshed with stricter dated-check fields. No live services are promoted as checked. |
| Exchange integration | Framework | Native-coin integration docs, listing packet, target matrix, readiness checklist, and service checklist exist. Confirmation policy, contacts, release checks, and direct service checks remain open. |
| RPC documentation | Partial | Mining, blockchain, network, raw transaction, mempool, and wallet RPC groups have source review. User-facing examples remain untested unless a future local test record says otherwise. |
| Wallet documentation | Partial | Wallet startup and major wallet RPC groups have source review. Platform paths, GUI behavior, wallet database internals, and tested examples remain open. |
| Command tracking | Framework | Command status tracker and smoke-test plan exist. No command should be treated as locally tested without a dated record. |
| Developer test planning | Framework | Network test coverage map and network test run plan exist. These are planning docs, not pass/fail records. |
| Private review workflow | Framework | Handoff, readiness page, assignment cards, feedback buckets, contribution guide, and legal/reuse posture exist. Repo is ready for first narrow private review, not broad public launch. |
| Legal/reuse posture | Framework | Private-review-only posture exists because final public license/reuse decision is still pending. |
| Glossaries | Partial | Root and developer glossaries have been expanded. Cross-linking and missing terms remain cleanup work. |
| Public site planning | Early | Site section exists, but publishing/navigation/search choices remain open. |

## Recent synchronization notes

This dashboard was brought current with the latest work on:

- release artifact checklist cleanup,
- release verification guide cleanup,
- release asset inventory attempt,
- ecosystem direct-check plan,
- refreshed ecosystem templates,
- network release comparison,
- network test coverage mapping,
- network test run planning,
- private-review readiness and assignment cards.

## Main blockers before public launch

| Blocker | Current tracking page |
|---|---|
| Canonical repository/release path | [Open questions backlog](verification/open-questions.md) |
| Release asset inventory | [Release asset inventory attempt](verification/release-asset-inventory-attempt.md) |
| Release hashes/signatures/trusted keys | [Release artifact checklist](verification/release-artifact-checklist.md) |
| Local command records | [Command testing status](verification/command-testing.md) |
| Developer test execution | [Network test run plan](verification/network-test-run-plan.md) |
| Dated ecosystem checks | [Ecosystem direct check plan](verification/ecosystem-direct-check-plan.md) |
| Confirmation policy for services | [Open questions backlog](verification/open-questions.md) |
| Public license/reuse decision | [Legal and reuse posture](LEGAL_REUSE.md) |
| Outside technical review | [Private review readiness](verification/private-review-readiness.md) |

## Current priority order

1. Refresh `known-unknowns.md` so it matches the current verification queue and this dashboard.
2. Record the latest stale-wording sweep attempt and decide whether a stronger local grep is needed.
3. Start the first narrow private-review assignment, preferably command safety or release wording.
4. Capture the full `v29.1.0` release asset inventory when a reliable method is available.
5. Run command smoke tests only when a disposable BitcoinII environment is available.
6. Run developer network tests only when a suitable build/test environment is available.
7. Perform dated ecosystem checks for explorers, APIs, pools, exchanges, and wallets.

## Verification

**Status:** Draft
**Primary sources checked:** Project status, verification README, open questions backlog, release verification docs, release asset inventory attempt, ecosystem direct-check plan, refreshed ecosystem pages, network release comparison, network test coverage map, and network test run plan
**Notes:** This dashboard is synchronized after the latest release and ecosystem framework work. It remains a tracker, not a claim that commands, tests, release assets, or live services are checked.
