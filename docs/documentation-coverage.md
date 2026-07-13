# Documentation coverage

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-07-13

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
| Network/P2P documentation | Partial | Source notes, release comparison, selected blob checks, test coverage map, and test run plan exist. A local node/RPC smoke test exists, but broader network test execution and live P2P test coverage remain open. |
| Release documentation | Partial | Release observations, API metadata, uploaded asset inventory, generated source archive metadata, tag/commit signature metadata, source comparison, network comparison, release artifact checklist, and release verification guide exist. Hash checks, release-file signatures, trusted-key path, and binary checks remain open. |
| API and infrastructure documentation | Partial | First-class API and Infrastructure sections summarize dated REST, WebSocket, Electrum, public endpoint, explorer, price, rich-list, mining-statistics, and service-directory observations. Reliability, official ownership, full schemas, broadcast behavior, and long-term sync remain open. |
| Ecosystem documentation | Partial | Ecosystem direct-check plan and templates exist. Dated explorer/API/WebSocket/Electrum/exchange/mining-statistics observations now exist, but wallet compatibility, mining-pool behavior, community resources, official status, account-gated exchange behavior, and service reliability remain open. |
| Exchange integration | Framework | Native-coin integration docs, listing packet, target matrix, readiness checklist, and service checklist exist. Public exchange pages were observed, but confirmation policy, contacts, release checks, account-level deposits/withdrawals, and service-provider recommendations remain open. |
| RPC documentation | Partial | Mining, blockchain, network, raw transaction, mempool, and wallet RPC groups have source review. Nine read-only RPC commands have one dated Windows/mainnet local test record; sensitive, wallet, transaction, mining, peer-control, shutdown, and cross-platform examples remain untested unless a specific dated record says otherwise. |
| Wallet documentation | Partial | Wallet startup and major wallet RPC groups have source review. Platform paths, GUI behavior, wallet database internals, and tested examples remain open. |
| Command tracking | Framework | Command status tracker, smoke-test plan, and Codex command-shaped audit record exist. No command should be treated as locally tested without a dated record. |
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
- GitHub API uploaded-asset metadata captured by Codex,
- GitHub-generated source archive metadata captured by Codex,
- public external signature repository checks,
- lightweight tag and GitHub-reported commit signature metadata,
- Codex command-shaped audit and command-safety fixes,
- local BitcoinII node inspection and read-only RPC smoke test,
- same-time local-node/explorer and local-node/API comparisons,
- public REST, WebSocket, and Electrum smoke test,
- first-class API, Infrastructure, Releases, and Compatibility navigation,
- public exchange-page observations,
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
| Release hash/signature/key process | [Releases](releases/README.md), [Release verification guide](releases/release-verification-guide.md), [Developer release verification guide](developers/release-verification.md) |
| Local command records | [Command testing status](verification/command-testing.md) |
| Developer test execution | [Network test run plan](verification/network-test-run-plan.md) |
| Dated ecosystem checks and refresh policy | [Infrastructure directory](infrastructure/README.md), [Ecosystem direct check plan](verification/ecosystem-direct-check-plan.md) |
| Confirmation policy for services | [Open questions backlog](verification/open-questions.md) |
| Public license/reuse decision | [Legal and reuse posture](LEGAL_REUSE.md) |
| Outside technical review | [Private review readiness](verification/private-review-readiness.md) |

## Current priority order

1. Refresh stale summaries and older bridge pages so they route readers to dated evidence.
2. Start or continue the first narrow private-review assignment, preferably command safety, release wording, or API/evidence wording.
3. Obtain outside review of core technical claims.
4. Resolve the public license and contribution posture.
5. Wait for or document the absence of public release checksum, signature, and trusted-key infrastructure.
6. Run additional command smoke tests only in documented disposable or explicitly scoped local environments.
7. Perform or refresh dated checks for pools, wallets, community tools, and account-gated exchange behavior only when deliberately assigned.

## Verification

**Status:** Draft
**Primary sources checked:** Project status, verification README, verification evidence index, open questions backlog, local node/RPC records, public API/Electrum smoke test, release verification docs, release asset inventory attempt, Codex API asset inventory report, Codex generated source archive report, Codex external signature repo check, Codex tag metadata report, ecosystem direct-check plan, refreshed ecosystem pages, network release comparison, network test coverage map, and network test run plan
**Notes:** This dashboard is synchronized after the v0.2 API, Infrastructure, Releases, Compatibility, and verification-navigation batches. It remains a tracker, not a claim that commands, tests, release assets, or live services are broadly verified.
