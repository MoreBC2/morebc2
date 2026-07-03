# Open questions backlog

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page collects major open questions from across MoreBC2.

Local pages may still keep their own open-question sections, but this backlog should help contributors find high-value verification work in one place.

## How to read this page

Each item should be treated as unresolved unless a linked page says it has been verified.

Priority labels:

- **Blocks private review** — should be resolved or clearly caveated before invite-only review.
- **Blocks public launch** — can remain during private review, but should be resolved before broad public launch.
- **Future improvement** — useful but not launch-blocking.
- **Research only** — belongs in Research or Discussion unless implementation changes.

## Project identity and official sources

### Canonical repository path

**Question:** Which GitHub path should MoreBC2 treat as the canonical public BitcoinII repository path?

**Why it matters:** Many pages cite source files. Canonical source links should be stable before public launch.

**Needed evidence:** Maintainer-confirmed repository link, official website link, or stable release/source link.

**Priority:** Blocks public launch

**Status:** Needs Review

### Official ticker source

**Question:** What is the strongest primary source confirming `BC2` as the ticker?

**Why it matters:** MoreBC2 consistently uses BC2, but the strongest source should be identified.

**Needed evidence:** Official website, README, release note, UI/help text, exchange listing, or maintainer statement.

**Priority:** Blocks public launch

**Status:** Needs Review

### Official website and contact process

**Question:** What official website and contact path should exchanges, explorers, pools, and wallet developers use?

**Why it matters:** Integration pages need a reliable contact process.

**Needed evidence:** Official website, repository contact info, maintainer statement, or project-maintained contact page.

**Priority:** Blocks public launch

**Status:** Needs Review

### Project license and contribution posture

**Question:** What license and contribution workflow should MoreBC2 use before public collaboration?

**Why it matters:** Public contributors need clear licensing, contribution expectations, and review rules.

**Needed evidence:** Repository owner decision, license file review, contribution policy update.

**Priority:** Blocks public launch

**Status:** Needs Review

## Releases and verification

### Release verification model

**Question:** How should users verify BitcoinII release downloads?

**Needed evidence:** Checksums, checksum manifests, signatures, signed tags, reproducible-build notes, maintainer instructions, or official release documentation.

**Priority:** Blocks public launch

**Status:** Needs Review

### Current release branch

**Question:** Do the source values documented from `main` match the current public release branch?

**Why it matters:** Network specifications and source-atlas pages should not silently document unreleased values as current network behavior.

**Needed evidence:** Current release tag/branch comparison against documented values.

**Priority:** Blocks public launch

**Status:** Partial

**Notes:** Network release comparison now records that the reviewed P2P/network files did not appear in the GitHub changed-file list when comparing `v29.1.0` to `main`. `src/kernel/chainparams.cpp` did appear in the changed-file list and remains version-sensitive.

### Binary names and platform release assets

**Question:** Which binaries, installers, archives, and platform assets are officially published for BitcoinII Core?

**Why it matters:** Wallet, node, and RPC examples need correct binary names and platform expectations.

**Needed evidence:** Current release assets and/or official build documentation.

**Priority:** Blocks public launch

**Status:** Needs Review

## Consensus and validation

### Confirmation recommendations

**Question:** What confirmation count should exchanges or services use for BitcoinII deposits and withdrawals?

**Needed evidence:** Maintainer guidance, exchange guidance, or a documented risk model.

**Priority:** Blocks public launch

**Status:** Needs Review

### Live activation state

**Question:** What is the current live-chain activation state for listed soft-fork heights and deployments?

**Needed evidence:** Running node output, explorer data, release notes, or maintainer confirmation.

**Priority:** Blocks public launch

**Status:** Needs Review

### Checkpoint usage

**Question:** How exactly does BitcoinII Core use checkpoint data in validation paths?

**Needed evidence:** Source review of checkpoint usage beyond `chainparams.cpp`.

**Priority:** Future improvement

**Status:** Needs Review

### Script validation model

**Question:** Which script flags are mandatory consensus checks, which are policy checks, and which callers use them?

**Needed evidence:** Source review of validation/mempool caller paths and tests.

**Priority:** Future improvement

**Status:** Partial

### Subsidy calculation path

**Question:** Where exactly is subsidy calculation implemented and how should it be linked from mining/consensus docs?

**Needed evidence:** Source review of subsidy and reward calculation files/functions.

**Priority:** Future improvement

**Status:** Needs Review

## Mempool, transaction policy, and RPC

### Replacement policy

**Question:** What replacement policy is implemented and which source files define it?

**Needed evidence:** Source review of policy and mempool acceptance paths, plus any relevant defaults.

**Priority:** Future improvement

**Status:** Needs Review

### Package acceptance details

**Question:** What package acceptance behavior should be explained beyond the first-pass mempool acceptance and mempool RPC audits?

**Needed evidence:** Deeper package-policy source review and tests.

**Priority:** Future improvement

**Status:** Needs Review

### Mempool option defaults

**Question:** What are the default mempool limits, expiry rules, relay fees, and standardness settings?

**Needed evidence:** Source/default-argument review and local command output.

**Priority:** Future improvement

**Status:** Needs Review

### RPC command verification

**Question:** Which RPC examples have been tested against a running BitcoinII Core node?

**Needed evidence:** Local command records including operating system, BitcoinII version or commit, network mode, command, date tested, and result.

**Priority:** Blocks public launch

**Status:** Needs Review

### Read-only service RPC recommendations

**Question:** Which reviewed RPC commands are safe enough to recommend for exchanges, explorers, and services after testing?

**Needed evidence:** Command testing, service-integration review, and separation of read-only vs state-changing commands.

**Priority:** Blocks public launch

**Status:** Needs Review

### Transaction relay and dry-run guidance

**Question:** How should MoreBC2 document transaction relay, dry-run acceptance checks, and package submission safely?

**Needed evidence:** Local regtest examples, mempool RPC review, and service-oriented risk notes.

**Priority:** Blocks public launch

**Status:** Needs Review

## Wallet and user operations

### Wallet backup and restore process

**Question:** What wallet backup/restore guidance is verified for BitcoinII Core?

**Needed evidence:** Temporary-wallet tests, release-version notes, and wallet RPC/source review.

**Priority:** Blocks public launch

**Status:** Needs Review

### Wallet access-state workflow

**Question:** What wallet encryption, timed unlock, relock, and access-phrase update workflow can be safely documented for users?

**Needed evidence:** Temporary-wallet tests and source-reviewed command behavior.

**Priority:** Blocks public launch

**Status:** Needs Review

### Wallet database and GUI behavior

**Question:** Which wallet database formats and GUI wallet flows should MoreBC2 document?

**Needed evidence:** Source review of wallet database internals, GUI paths, build options, and local tests.

**Priority:** Future improvement

**Status:** Needs Review

### Platform paths and local setup

**Question:** What are the correct BitcoinII data directories, config paths, and wallet paths on Windows, Linux, and macOS?

**Needed evidence:** Source/manpage review and local platform testing.

**Priority:** Blocks public launch

**Status:** Needs Review

## Ecosystem and service status

### Active explorers

**Question:** Which BitcoinII explorers are active, synced, and reliable?

**Needed evidence:** Direct explorer checks, sync status, API availability, uptime notes, and review dates.

**Priority:** Blocks public launch

**Status:** Needs direct checks

### Active mining pools

**Question:** Which mining pools support BitcoinII today, and what are their fees/payout rules?

**Needed evidence:** Direct pool checks, payout model notes, pool status, and review dates.

**Priority:** Blocks public launch

**Status:** Needs direct checks

### Exchange listings

**Question:** Which exchanges currently list BitcoinII, and are deposits/withdrawals open?

**Needed evidence:** Direct exchange checks and dates reviewed.

**Priority:** Blocks public launch

**Status:** Needs direct checks

### Community tools and resources

**Question:** Which community tools are active, maintained, and compatible with current BitcoinII?

**Needed evidence:** Direct checks, repository activity, version compatibility, and review dates.

**Priority:** Future improvement

**Status:** Needs direct checks

### Explorer/API framework

**Question:** What explorer/API fields and endpoints should MoreBC2 document for service integrators?

**Needed evidence:** Direct explorer/API checks, service-provider needs, and current endpoint behavior.

**Priority:** Blocks public launch

**Status:** Needs Review

## Architecture and source review still needed

### Network and P2P architecture

**Question:** What network and peer-communication areas still need review after the first-pass P2P Source Atlas work?

**Needed evidence:** Follow-up review of address-manager callers, peer-list RPC details, optional blob-level release spot checks, live-network checks, and any missing `net.cpp` edge cases.

**Priority:** Future improvement

**Status:** Partial

**Notes:** First-pass pages now exist for protocol primitives, network RPC, lower-level connection management, address manager, peer-list management, handshake, address sharing, block/header sharing, transaction sharing, peer health/stale-tip checks, and send-loop behavior. Network release comparison records that these reviewed P2P/network files did not appear in the GitHub changed-file list for `v29.1.0` to `main`.

### Network RPC and CLI source review

**Question:** Which network/utility RPC files and CLI paths should MoreBC2 review next?

**Needed evidence:** Source review of remaining `src/rpc/` files and `src/bitcoinII-cli.cpp`.

**Priority:** Future improvement

**Status:** Needs Review

### Wallet internals

**Question:** Which non-RPC wallet internals matter for user-facing behavior and service integration?

**Needed evidence:** Source review of wallet database, transaction creation, scanning, key management, and notification paths.

**Priority:** Future improvement

**Status:** Needs Review

### Functional test mapping

**Question:** Which unit and functional tests cover the reviewed source areas?

**Needed evidence:** Test tree review and local test command records.

**Priority:** Future improvement

**Status:** Needs Review

## Documentation polish and review process

### Architecture and Source Atlas cross-link pass

**Question:** Which architecture pages need links to the newer Source Atlas RPC, wallet, and P2P pages?

**Needed evidence:** Cross-link review across architecture pages and Source Atlas entries.

**Priority:** Blocks private review

**Status:** Partial

**Notes:** Architecture overview, architecture index, peer communication model, developer reading order, source tree guide, repository map, and coverage dashboard were refreshed through address-manager review and network release comparison. Remaining cross-link work should focus on smaller lifecycle pages and any new pages added later.

### Terminology and glossary cleanup

**Question:** Which terms from the wallet/RPC/mempool/source-review work should be added or cross-linked in the glossaries?

**Needed evidence:** Glossary review against current architecture and Source Atlas pages.

**Priority:** Blocks private review

**Status:** Needs Review

### Untested-command labeling

**Question:** Are all untested command examples clearly labeled as source-observed or placeholder examples?

**Needed evidence:** Search and review of docs for command examples and verification blocks.

**Priority:** Blocks private review

**Status:** Needs Review

### Outside technical review

**Question:** Which core technical claims should be reviewed by an outside reader before public launch?

**Needed evidence:** Invite-only review notes and issue/feedback tracking.

**Priority:** Blocks public launch

**Status:** Needs Review

## Verification

**Status:** Draft
**Primary sources checked:** Existing MoreBC2 open questions, audit findings, coverage dashboard, current section README rules, and network release comparison
**Notes:** This backlog was refreshed after first-pass network Source Atlas work through address-manager review and network release comparison. Items should move out of this page only after the relevant documentation is updated and sourced. Some local page questions may remain where they help the reader understand that exact page.
