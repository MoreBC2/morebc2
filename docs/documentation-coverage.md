# Documentation coverage

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page tracks MoreBC2 documentation coverage.

It is a project-management dashboard. It is not BitcoinII protocol documentation.

## Status legend

| Status | Meaning |
|---|---|
| Not started | No meaningful page exists yet. |
| Framework | A page or section exists, but it mostly defines structure. |
| Partial | Some source-backed material exists, but review is incomplete. |
| Reviewed | A meaningful first-pass review exists. |
| Needs recheck | Existing content should be checked against newer sources or releases. |
| Verified | Strong primary sources checked and page is ready to rely on. |

## Architecture coverage

| Area | Status | Notes |
|---|---|---|
| Architecture overview | Partial | Refreshed with current Source Atlas, wallet/RPC, mempool, block-template, and service-interface links. |
| Node startup | Partial | Built from first-pass startup-path review, now including wallet loader/startup notes. GUI, daemon, shutdown details pending. |
| Consensus model | Partial | Refreshed with script-engine, mempool RPC, policy/service-surface, and reorg-history links. Full flag caller mapping still pending. |
| Life of a transaction | Partial | Refreshed with wallet RPC, raw transaction RPC, mempool/broadcast RPC, dry-run acceptance, and block-template links. Lower-level P2P paths pending. |
| Life of a block | Partial | Refreshed with candidate-template, mining RPC, blockchain RPC, and wallet-history visibility links. P2P and subscriber behavior pending. |
| Life of a reorganization | Partial | Refreshed with wallet transaction-history RPC, mempool RPC, service visibility, and pruned-node caveats. Wallet/index/P2P internals pending. |
| Block validation flow | Reviewed | Strong first-pass flow map exists. |
| Mempool flow | Partial | Refreshed with mempool RPC, dry-run distinction, mempool inspection, and persistence notes. Replacement policy and tests pending. |
| Wallet flow | Partial | First-pass wallet startup/lifecycle, wallet RPC, backup/import, spend/PSBT, encryption, coins/balances, and transaction-history RPC review exists. Wallet database internals pending. |
| Candidate block flow | Partial | First-pass template assembly and mining RPC review exists. External-operation docs pending. |

## Source atlas coverage

| Source area | Status | Notes |
|---|---|---|
| `src/kernel/chainparams.cpp` | Reviewed | Mainnet parameters documented; release-branch comparison has started and moving chain-data fields need release/main labels. |
| `src/init.cpp` | Partial | Startup orchestration first pass exists. GUI, daemon, shutdown, and option-level details pending. |
| `src/pow.cpp` | Reviewed | Difficulty retarget and PoW checks documented; `v29.1.0` spot check matches the Bitcoin-style retarget model. |
| `src/consensus/tx_check.*` | Reviewed | Context-independent transaction checks first pass exists. Upstream comparison pending. |
| `src/consensus/tx_verify.*` | Reviewed | Finality, sequence locks, operation-cost helpers, and input checks first pass exists. |
| `src/script/interpreter.*` | Partial | First-pass script-engine map exists. Full flag caller mapping and upstream comparison pending. |
| `src/validation.cpp` | Partial | Major validation, connection, reorg, mempool acceptance paths reviewed. Large file still not fully exhausted. |
| `src/validationinterface.*` | Partial | First-pass validation notification interface map exists. Subscriber call sites pending. |
| `src/node/blockstorage.*` | Partial | First-pass block storage, pruning, reindex, and import map exists. Undo-read and failure-recovery details pending. |
| `src/node/miner.*` | Partial | First-pass candidate-block template assembly and package selection review exists. |
| `src/node/mini_miner.*` | Partial | First-pass fee/ordering simulation helper review exists. Caller paths pending. |
| `src/rpc/mining.cpp` | Partial | First-pass mining RPC, getblocktemplate, submitblock, submitheader, and mining-info review exists. Commands untested. |
| `src/rpc/blockchain.cpp` | Partial | First-pass blockchain RPC, block lookup, pruning, UTXO stats, scans, and chainstate review exists. Commands untested. |
| `src/rpc/rawtransaction.cpp` | Partial | First-pass raw transaction lookup, decode, construction, explicit-key signing, and PSBT review exists. Commands untested. |
| `src/rpc/mempool.cpp` | Partial | First-pass transaction relay, mempool acceptance testing, mempool inspection, persistence, orphan, and package RPC review exists. Commands untested. |
| `src/wallet/init.cpp` | Partial | First-pass wallet option, parameter interaction, and loader construction review exists. |
| `src/wallet/load.*` | Partial | First-pass wallet verification, loading, start, flush, stop, and unload review exists. |
| `src/wallet/context.*` | Partial | First-pass shared wallet context review exists. |
| `src/wallet/wallet.h` | Partial | Startup-adjacent declarations and defaults reviewed. Deeper wallet internals pending. |
| `src/wallet/rpc/wallet.cpp` | Partial | First-pass wallet RPC registration, management, creation, loading, migration, and status exists. Commands untested. |
| `src/wallet/rpc/addresses.cpp` | Partial | First-pass address, change address, label, grouping, and multisig RPC exists. Commands untested. |
| `src/wallet/rpc/backup.cpp` | Partial | First-pass backup, restore, legacy import, descriptor import, export, and rescan-related review exists. Commands untested. |
| `src/wallet/rpc/spend.cpp` | Partial | First-pass wallet send, funding, fee setting, fee bumping, signing, and PSBT review exists. Commands untested. |
| `src/wallet/rpc/encrypt.cpp` | Partial | First-pass wallet timed unlock, relock, and first-time encryption review exists. Commands untested. |
| `src/wallet/rpc/coins.cpp` | Partial | First-pass received amount, balance, output locking, and listunspent review exists. Commands untested. |
| `src/wallet/rpc/transactions.cpp` | Partial | First-pass wallet transaction listing, listsinceblock, gettransaction, abandon, and rescan-related review exists. Commands untested. |
| Block lifecycle path | Reviewed | Consolidated source-atlas lifecycle page exists. |
| `src/txmempool.*` | Partial | Core mempool structure and many functions reviewed. Policy details pending. |
| `src/kernel/mempool_entry.h` | Reviewed | First-pass entry metadata review exists. |
| `src/kernel/disconnected_transactions.*` | Reviewed | First-pass disconnected transaction pool exists. |
| `src/primitives/block.*` | Partial | Block hash path reviewed; broader primitive review pending. |
| `src/hash.h` | Partial | Double-SHA256 hashing behavior reviewed. Broader hash utility review pending. |
| `src/consensus/amount.h` | Partial | COIN/MAX_MONEY documented; broader consensus files pending. |
| Other RPC internals | Not started | Network, utility, CLI, and remaining wallet internals still pending. |

## Documentation section coverage

| Area | Status | Notes |
|---|---|---|
| Documentation README | Partial | Normalized for current-doc boundaries, source-backed anchors, and untested-command caution. |
| What is BitcoinII | Partial | Needs final source review and public wording pass. |
| Project overview | Partial | Needs current source/official-source review. |
| Network specifications | Partial | Strong source-backed values exist; current release branch comparison has started. |
| Consensus overview | Partial | Strong PoW and amount notes exist; transaction-helper and script-engine material has been refreshed. |
| Checkpoints | Framework | Existence documented; checkpoint list should distinguish `v29.1.0` from `main`. |
| Releases | Partial | Current and legacy release-page observations refreshed; release source comparison and artifact checklist added; full asset verification still pending. |
| Explorer resources | Framework | Expanded with API framework links and endpoint-check expectations; active explorer checks pending. |
| Configuration README | Partial | Normalized for source-observed configuration anchors and local-testing rules. |
| Encyclopedia README | Partial | Normalized for concept pages, Source Atlas links, and BitcoinII-specific claim rules. |
| News README | Partial | Normalized for dated factual update rules and source expectations. |
| Site README | Partial | Normalized for public website planning, launch blockers, and status-display requirements. |

## Ecosystem and integration coverage

| Area | Status | Notes |
|---|---|---|
| Exchange README | Partial | Normalized for service-provider framework, source anchors, and production-use caveats. |
| Exchange integration | Framework | Good structure exists; confirmations/contact/release verification pending. |
| Deposit monitoring | Framework | Needs RPC testing and confirmation policy. |
| Service integration checklist | Framework | Useful checklist; each item needs evidence links. |
| Ecosystem README | Partial | Linked API framework and added API-specific listing caution. |
| Ecosystem APIs | Framework | Added API listing and endpoint-test framework. No live APIs verified yet. |
| Ecosystem wallets | Framework | Conservative listing model exists. |
| Ecosystem explorers | Framework | Direct explorer checks pending. |
| Ecosystem mining pools | Framework | Direct pool checks pending. |
| Ecosystem exchanges | Framework | Current listing checks pending. |
| Ecosystem resources | Framework | Community resources need direct review. |

## User operation coverage

| Area | Status | Notes |
|---|---|---|
| Wallet guide | Partial | Command testing status added for wallet RPC examples; platform/release/local testing pending. |
| Wallets README | Partial | Normalized for current wallet source-review anchors and command-safety rules. |
| Node guide | Partial | Command testing status added for node command examples; platform/release/local testing pending. |
| Nodes README | Partial | Normalized for current node/source-review anchors and operator-safety rules. |
| Mining overview | Partial | Command testing status added for mining RPC examples; live software/pool data pending. |
| Mining README | Partial | Normalized for current mining source-review anchors and live-ecosystem caution. |
| Research README | Partial | Normalized for research-vs-documentation boundaries. |
| Discussion README | Partial | Normalized for proposal/status labeling and discussion boundaries. |
| History README | Partial | Normalized for dated-source and archive/current-status separation. |
| Verification README | Partial | Normalized for verification workflow, review feedback buckets, stale-wording scan, command-example scan, command tracking, release tracking, and priority unknowns. |
| Review feedback buckets | Framework | Added feedback taxonomy and narrow assignment guidance for private review. |
| Stale wording scan | Partial | Initial high-risk orientation scan recorded; exchange/wallet/mining/ecosystem scans still pending. |
| Command example scan | Framework | Added command-example scan checklist and priority files. Scan still needs to be run. |
| Known unknowns | Partial | Refreshed as short executive list linked to full backlog. |
| Open questions backlog | Partial | Consolidated with priority labels, evidence needs, and public/private review blockers. |
| Command testing status | Framework | Added command-test tracker, status labels, untested inventory, and test-record template. |
| Release source comparison notes | Partial | Added `v29.1.0` versus `main` comparison and source spot checks. |
| Release artifact checklist | Framework | Added asset-inventory table, workflow observation, release-process notes, and future test-record template. |
| Configuration overview | Partial | Command/config testing status added; platform examples and startup commands pending. |
| RPC overview | Partial | Mining, blockchain, raw transaction, mempool, and wallet RPC groups have source review. Untested examples now link to command-test tracker. |
| RPC configuration | Partial | Command/config testing status added; auth/setup examples still need testing. |

## Developer onboarding coverage

| Area | Status | Notes |
|---|---|---|
| Root README | Partial | Refreshed with private reviewer start flow. |
| Docs README | Partial | Refreshed with best starting points, untested-command caution, and legal/reuse posture link. |
| Contributing guide | Framework | Refreshed as private-review workflow with evidence rules, status rules, and feedback buckets. |
| Legal and reuse posture | Framework | Added private-review-only posture because no repository license file was found. |
| Private review handoff | Framework | Updated after contribution workflow, feedback-bucket work, and legal/reuse note. |
| Developer README | Partial | Links reading order, verification workflow, source review guide, source atlas, local development, build, testing, and release verification. |
| Repository map | Partial | Refreshed through mempool/broadcast RPC. Needs polish pass rather than immediate new navigation work. |
| Source tree guide | Partial | Refreshed through mempool/broadcast RPC. Needs polish pass rather than immediate new navigation work. |
| Developer reading order | Framework | Updated to include current Source Atlas and developer workflow paths; should be refreshed after polish. |
| Source review guide | Framework | Created as contributor workflow; should be tested on future source reviews. |
| Verification standards | Framework | Practical workflow page exists; evidence scale remains the root confidence model. |
| Local development environment | Framework | Defines safe test-record workflow; commands still need actual testing. |
| Build system guide | Partial | First-pass CMake/source-doc review exists. Commands still need actual testing. |
| Testing guide | Partial | First-pass unit, wallet, CTest, and functional test-runner review exists. Commands still need actual testing. |
| Release verification guide | Partial | Current release-page observations, source comparison, artifact checklist, and verification gaps recorded; asset verification still pending. |
| Documentation polish plan | Framework | Broad cleanup plan exists and should guide the next phase. |
| Developer glossary | Partial | Refreshed with RPC, PSBT, broadcast, package, and wallet-history terminology. |
| Root glossary | Partial | Refreshed with general RPC, raw transaction, PSBT, package, broadcast, and watch-only terms. |

## Current priority order

1. Continue stale wording scan in exchange, wallet, mining, and ecosystem pages.
2. Run final command-example scan.
3. Build/test command smoke-test record framework.
4. Network RPC or P2P source review.
5. Continue release artifact verification when full release asset data is available.
6. Direct ecosystem checks for explorers, APIs, pools, and exchanges.

## Verification

**Status:** Draft
**Primary sources checked:** Repository docs and current section indexes
**Notes:** This dashboard should be updated whenever a major source audit, polish pass, or architecture page is added.
