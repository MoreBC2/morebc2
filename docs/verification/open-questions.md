# Open questions backlog

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page collects major open questions from across MoreBC2.

Local pages may still keep their own open-question sections, but this backlog should help contributors find high-value verification work in one place.

## How to read this page

Each item should be treated as unresolved unless a linked page says it has been resolved with evidence.

Priority labels:

- **Blocks private review** — should be resolved or clearly caveated before invite-only review.
- **Blocks public launch** — can remain during private review, but should be resolved before broad public launch.
- **Future improvement** — useful but not launch-blocking.
- **Research only** — belongs in Research or Discussion unless implementation changes.

## Project identity and official sources

### Canonical repository path drift

**Question:** Has the current canonical `Bitcoin-II/BitcoinII-Core` path changed ownership or location since the 2026-07-10 project-identity check?

**Needed evidence:** A periodic recheck of project-controlled GitHub organization/repository metadata and the project website link.

**Priority:** Monitor for drift

**Status:** Needs Review

### Official ticker source

**Question:** What is the strongest primary source confirming `BC2` as the ticker?

**Needed evidence:** Official website, README, release note, UI/help text, exchange listing, or maintainer statement.

**Priority:** Blocks public launch

**Status:** Needs Review

### Official website and contact process

**Question:** What official website and contact path should exchanges, explorers, pools, and wallet developers use?

**Needed evidence:** Official website, repository contact info, maintainer statement, or project-maintained contact page.

**Priority:** Blocks public launch

**Status:** Needs Review

### Project license and contribution posture

**Question:** What license and contribution workflow should MoreBC2 use before public collaboration?

**Needed evidence:** Repository owner decision, license file review, contribution policy update.

**Priority:** Blocks public launch

**Status:** Needs Review

## Releases and verification

### Release verification model

**Question:** How should users verify BitcoinII release downloads?

**Needed evidence:** Full asset list, checksums, checksum manifests, signatures, signed tags, reproducible-build notes, trusted key source, maintainer instructions, or official release documentation.

**Priority:** Blocks public launch

**Status:** Needs Review

**Notes:** Release docs now separate release-page observation, source comparison, workflow artifact observation, checksum/manifest evidence, signature evidence, trusted-key evidence, local hash calculation, and binary verification. No downloaded release file is checked yet.

### Current release branch

**Question:** Do source values documented from `main` match the current public release branch?

**Needed evidence:** Current release tag/branch comparison against documented values.

**Priority:** Blocks public launch

**Status:** Partial

**Notes:** Network release comparison records that reviewed network/P2P files did not appear in the GitHub changed-file list when comparing `v29.1.0` to `main`; selected blob spot checks also matched. `src/kernel/chainparams.cpp` remains version-sensitive. Source comparison still does not verify release files.

### Binary names and platform release assets

**Question:** Which binaries, installers, archives, and platform assets are published for BitcoinII Core `v29.1.0`?

**Needed evidence:** Current full release asset inventory with names, sizes, URLs, and dates captured.

**Priority:** Blocks public launch

**Status:** Needs Review

**Notes:** GitHub rendered page showed 12 assets during the 2026-07-02 recheck, but MoreBC2 has not captured the full asset list. The release asset inventory attempt tracks this gap.

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

### RPC command records

**Question:** Which RPC examples have been tested against a running BitcoinII Core node?

**Needed evidence:** Local command records including operating system, BitcoinII version or commit, network mode, command, date tested, and result.

**Priority:** Blocks public launch

**Status:** Needs Review

### Read-only service RPC recommendations

**Question:** Which reviewed RPC commands are appropriate to recommend for exchanges, explorers, and services after testing?

**Needed evidence:** Command testing, service-integration review, and separation of read-only vs state-changing commands.

**Priority:** Blocks public launch

**Status:** Needs Review

## Wallet and user operations

### Wallet backup and restore process

**Question:** What wallet backup/restore guidance is checked for BitcoinII Core?

**Needed evidence:** Temporary-wallet tests, release-version notes, and wallet RPC/source review.

**Priority:** Blocks public launch

**Status:** Needs Review

### Wallet access-state workflow

**Question:** What wallet encryption, timed unlock, relock, and access-phrase update workflow can be documented for users?

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

### Ecosystem direct checks

**Question:** Which explorers, APIs, pools, exchanges, wallets, and resources can be described as currently reachable or active?

**Needed evidence:** Direct dated checks using the ecosystem direct-check plan.

**Priority:** Blocks public launch

**Status:** Framework

**Notes:** The check plan and refreshed listing templates now exist. Actual dated checks have not been performed.

### Active explorers

**Question:** Which BitcoinII explorers are reachable, synced, and useful?

**Needed evidence:** Direct explorer checks, sync comparison, API availability, and review dates.

**Priority:** Blocks public launch

**Status:** Needs direct checks

### Active mining pools

**Question:** Which mining pools support BitcoinII today, and what are their fee and payout rules?

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

## Architecture and source review still needed

### Network and P2P architecture

**Question:** What network and peer-communication areas still need review after the first-pass Source Atlas work?

**Needed evidence:** Follow-up review of stale-tip coverage, DNS/seed test coverage, peer-list RPC details, live-network checks, and any missing `net.cpp` edge cases.

**Priority:** Future improvement

**Status:** Partial

**Notes:** Source pages, release comparison, test coverage map, and test run plan exist. Runtime tests and live checks remain open.

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

### Developer test execution

**Question:** Which mapped unit and functional tests have actually been run by MoreBC2?

**Needed evidence:** Local test records with environment, ref, command, result, and notes.

**Priority:** Future improvement

**Status:** Framework

**Notes:** Network test coverage mapping and a test run plan exist, but no local test-run record exists yet.

## Documentation polish and review process

### Architecture and Source Atlas cross-link pass

**Question:** Which architecture pages need links to newer Source Atlas RPC, wallet, and P2P pages?

**Needed evidence:** Cross-link review across architecture pages and Source Atlas entries.

**Priority:** Blocks private review

**Status:** Partial

### Terminology and glossary cleanup

**Question:** Which terms from wallet/RPC/mempool/source-review work should be added or cross-linked in the glossaries?

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
**Primary sources checked:** Verification README, known unknowns, coverage dashboard, release verification docs, release asset inventory attempt, ecosystem direct-check plan, network release comparison, and network test run plan
**Notes:** This backlog was synchronized after the latest catch-up sweep. Items should move out of this page only after the relevant documentation is updated and sourced.
