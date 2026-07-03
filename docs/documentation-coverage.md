# Documentation coverage

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-07-02

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
| Architecture overview | Partial | Refreshed with P2P Source Atlas links through connection-management, peer-list/discouragement review, address-manager review, and network release-comparison caveats. |
| Node startup | Partial | Built from first-pass startup-path review, now including wallet loader/startup notes. GUI, daemon, shutdown details pending. |
| Consensus model | Partial | Refreshed with script-engine, mempool RPC, policy/service-surface, and reorg-history links. Full flag caller mapping still pending. |
| Life of a transaction | Partial | Refreshed with wallet RPC, raw transaction RPC, mempool/transaction RPC, dry-run acceptance, block-template links, P2P transaction-sharing slice, and send-loop caveats. Lifecycle examples remain untested. |
| Life of a block | Partial | Refreshed with candidate-template, mining RPC, blockchain RPC, wallet-history visibility links, P2P block/header-sharing slice, and send-loop caveats. Compact-block details and live behavior remain open. |
| Life of a reorganization | Partial | Refreshed with wallet transaction-history RPC, mempool RPC, service visibility, and pruned-node caveats. Wallet/index/P2P internals still need deeper review. |
| Block validation flow | Reviewed | Strong first-pass flow map exists. |
| Mempool flow | Partial | Refreshed with mempool RPC, dry-run distinction, mempool inspection, persistence notes, and local-mempool-versus-peer-sharing boundary. Send-loop slice now exists; replacement policy and tests pending. |
| Wallet flow | Partial | First-pass wallet startup/lifecycle, wallet RPC, backup/import, spend/PSBT, encryption, coins/balances, and transaction-history RPC review exists. Wallet database internals pending. |
| Candidate block flow | Partial | First-pass template assembly and mining RPC review exists. External-operation docs pending. |
| P2P flow | Partial | Source Atlas slices cover protocol primitives, lower-level connection management, peer list/discouragement management, address-manager behavior, network RPC, handshake, address sharing, block/header sharing, transaction sharing, peer health/stale-tip checks, and send-loop behavior. Network release comparison now records that reviewed P2P/network files did not appear in the `v29.1.0` to `main` changed-file list. Live-network checks remain open. |
| Peer communication model | Framework | Draft architecture model now exists and summarizes reviewed P2P layers. Network release comparison exists; live test follow-up remains open. |

## Source atlas coverage

| Source area | Status | Notes |
|---|---|---|
| `src/kernel/chainparams.cpp` | Reviewed | Refreshed with source-version caveats; stale BIP9 warning height and stale chain-data snapshot values corrected. This file appears in the `v29.1.0` to `main` changed-file list, so moving chain-data fields still need source-version labels. |
| `src/init.cpp` | Partial | Startup orchestration first pass exists; source links refreshed and release-versus-main comparison remains open. |
| `src/pow.cpp` | Reviewed | Difficulty retarget and PoW checks documented; `v29.1.0` spot check matches the Bitcoin-style retarget model and source links were refreshed. |
| `src/addrman.h` / `src/addrman.cpp` / `src/addrman_impl.h` | Partial | First-pass address-manager review exists. These files did not appear in the `v29.1.0` to `main` changed-file list. Full caller review, tests, live seed reachability, and optional blob-level spot checks remain open. |
| `src/banman.h` / `src/banman.cpp` | Partial | First-pass peer list/discouragement management review exists. These files did not appear in the `v29.1.0` to `main` changed-file list. RPC command details, tests, addrman interaction, and optional blob-level spot checks remain open. |
| `src/chainparamsseeds.h` | Partial | First-pass seed-array context reviewed with address-manager page. This file did not appear in the `v29.1.0` to `main` changed-file list. Live reachability remains open. |
| `src/consensus/tx_check.*` | Reviewed | Source links refreshed; context-independent transaction checks first pass exists. Upstream and release-versus-main comparisons pending. |
| `src/consensus/tx_verify.*` | Reviewed | Source links refreshed; finality, sequence locks, operation-count helpers, and input checks first pass exists. Upstream and release-versus-main comparisons pending. |
| `src/script/interpreter.*` | Partial | First-pass script-engine map exists. Full flag caller mapping and upstream comparison pending. |
| `src/validation.cpp` | Partial | Major validation, connection, reorg, mempool acceptance paths reviewed. Large file still not fully exhausted. |
| `src/validationinterface.*` | Partial | First-pass validation event interface map exists; source links refreshed and subscriber call sites pending. |
| `src/node/blockstorage.*` | Partial | First-pass block storage, pruning, reindex, and import map exists; source links refreshed. Undo-read and failure-recovery details pending. |
| `src/node/miner.*` | Partial | First-pass candidate-block template assembly and package selection review exists; source links refreshed. |
| `src/node/mini_miner.*` | Partial | First-pass fee/ordering simulation helper review exists; source links refreshed. Caller paths pending. |
| `src/rpc/mining.cpp` | Partial | First-pass mining RPC, getblocktemplate, submitblock, submitheader, and mining-info review exists. Commands untested; source links refreshed. |
| `src/rpc/blockchain.cpp` | Partial | First-pass blockchain RPC, block lookup, pruning, UTXO stats, scans, and chainstate review exists. Commands untested; source links refreshed. |
| `src/rpc/net.cpp` | Partial | First-pass network RPC, peer status, network status, address-manager, peer list, manual peer, and hidden testing command review exists. Did not appear in the `v29.1.0` to `main` changed-file list. Commands untested. |
| `src/protocol.h` / `src/protocol.cpp` | Partial | First-pass P2P protocol primitives review exists. Did not appear in the `v29.1.0` to `main` changed-file list. Upstream comparison remains open. |
| `src/net.h` / `src/net.cpp` | Partial | First-pass lower-level connection-management review exists. Did not appear in the `v29.1.0` to `main` changed-file list. Socket edge cases and live checks remain open. |
| `src/net_processing.h` / `src/net_processing.cpp` | Partial | First-pass slices now exist for handshake, address sharing, block/header sharing, transaction sharing, peer health/stale-tip checks, send-loop behavior, and selected peer-list/discouragement caller paths. Did not appear in the `v29.1.0` to `main` changed-file list. Upstream comparison remains open. |
| `src/rpc/rawtransaction.cpp` | Partial | First-pass raw transaction lookup, decode, construction, explicit-key signing, and PSBT review exists. Commands untested; source links refreshed. |
| `src/rpc/mempool.cpp` | Partial | First-pass transaction sharing, mempool acceptance testing, mempool inspection, persistence, orphan, and package RPC review exists. Commands untested; source links refreshed. |
| `src/wallet/init.cpp` | Partial | First-pass wallet option, parameter interaction, and loader construction review exists; source links refreshed. |
| `src/wallet/load.*` | Partial | First-pass wallet verification, loading, start, flush, stop, and unload review exists; source links refreshed. |
| `src/wallet/context.*` | Partial | First-pass shared wallet context review exists; source links refreshed. |
| `src/wallet/wallet.h` | Partial | Startup-adjacent declarations and defaults reviewed. Deeper wallet internals pending. |
| `src/wallet/rpc/wallet.cpp` | Partial | First-pass wallet RPC registration, management, creation, loading, migration, and status exists. Commands untested; source links refreshed. |
| `src/wallet/rpc/addresses.cpp` | Partial | First-pass address, change address, label, grouping, and multisig RPC exists. Commands untested; source links refreshed. |
| `src/wallet/rpc/backup.cpp` | Partial | First-pass backup, restore, legacy import, descriptor import, export, and rescan-related review exists. Commands untested; source links refreshed. |
| `src/wallet/rpc/spend.cpp` | Partial | First-pass wallet send, funding, fee setting, fee bumping, signing, and PSBT RPC exists. Commands untested; source links refreshed. |
| `src/wallet/rpc/encrypt.cpp` | Partial | First-pass wallet timed unlock, relock, and first-time encryption review exists. Commands untested; source links refreshed. |
| `src/wallet/rpc/coins.cpp` | Partial | First-pass received amount, balance, output locking, and listunspent review exists. Commands untested; source links refreshed. |
| `src/wallet/rpc/transactions.cpp` | Partial | First-pass wallet transaction listing, listsinceblock, gettransaction, local abandoned-state handling, and rescan-related review exists. Commands untested; source links refreshed. |
| Block lifecycle path | Reviewed | Source links refreshed in block-acceptance page; block acceptance/activation first pass exists. Storage, pruning, net-processing, callbacks/events, and release-versus-main comparison pending. |
| `src/txmempool.*` | Partial | Core mempool structure and many functions reviewed; stale source links refreshed. Policy details pending. |
| `src/kernel/mempool_entry.h` | Reviewed | First-pass entry metadata review exists; source links refreshed and release-versus-main comparison remains open. |
| `src/kernel/disconnected_transactions.*` | Reviewed | First-pass disconnected transaction pool exists; source links refreshed and release-versus-main comparison remains open. |
| `src/primitives/block.*` | Needs recheck | Block hash path reviewed; source links refreshed. Broader primitive and release/main comparison pending. |
| `src/hash.h` | Needs recheck | Double-SHA256 hashing behavior reviewed; source link refreshed. Broader hash utility and release/main comparison pending. |
| `src/consensus/amount.h` | Partial | COIN/MAX_MONEY documented; broader consensus files pending. |
| Other RPC internals | Not started | Utility, CLI, and remaining wallet internals still pending. |

## Documentation section coverage

| Area | Status | Notes |
|---|---|---|
| Documentation README | Partial | Normalized for current-doc boundaries, source-backed anchors, and untested-command caution. |
| What is BitcoinII | Partial | Needs final source review and public wording pass. |
| Project overview | Partial | Needs current source/official-source review. |
| Network specifications | Partial | Refreshed current observed source path, corrected stale BIP9 and moving chain-data values, and linked P2P Source Atlas slices. Network release comparison now exists for reviewed P2P files; live-node review still pending. |
| Consensus overview | Partial | Strong PoW and amount notes exist; transaction-helper and script-engine material has been refreshed. |
| Checkpoints | Framework | Existence documented; checkpoint list should distinguish `v29.1.0` from `main`. |
| Releases | Partial | Current and legacy release-page observations refreshed; release source comparison, network release comparison, and artifact checklist added; full asset verification still pending. |
| Explorer resources | Framework | Expanded with API framework links and endpoint-check expectations; active explorer checks pending. |
| Configuration README | Partial | Normalized for source-observed configuration anchors and local-testing rules. |
| Encyclopedia README | Partial | Normalized for concept pages, Source Atlas links, and BitcoinII-specific claim rules. |
| News README | Partial | Normalized for dated-source and archive/current-status separation. |
| Site README | Partial | Normalized for public website planning, launch blockers, and status-display requirements. |

## Ecosystem and integration coverage

| Area | Status | Notes |
|---|---|---|
| Exchange README | Partial | Expanded with native-coin listing research, listing packet template, target matrix, readiness checklist, source anchors, and production-use caveats. |
| Exchange integration | Framework | Good structure exists; confirmations/contact/release verification pending. |
| Deposit monitoring | Framework | Stale wording scan updated command caveats and current observed source links; RPC testing and confirmation policy still pending. |
| Service integration checklist | Framework | Useful checklist; initial stale wording scan found no blocking issue. Each item still needs evidence links. |
| Exchange listing packet template | Framework | Draft packet structure exists; placeholders must be replaced and current source checks completed before use. |
| Exchange listing target matrix | Framework | First-pass listing target structure exists; fees/current listing requirements must be treated as unconfirmed unless exchange-published and rechecked. |
| Native coin listing guide | Framework | Draft native-coin guide exists; must stay clear that BC2 is a native coin, not a token. |
| Ecosystem README | Partial | Linked API framework and added API-specific listing caution. |
| Ecosystem APIs | Framework | Added API listing and endpoint-test framework. No live APIs verified yet. |
| Ecosystem wallets | Framework | Current observed release path and legacy/redirected path are distinguished; canonical wallet download verification still pending. |
| Ecosystem explorers | Framework | Direct explorer checks pending; initial stale wording scan found no active-listing claim. |
| Ecosystem mining pools | Framework | Direct pool checks pending; initial stale wording scan found no active-listing claim. |
| Ecosystem exchanges | Framework | Current listing checks pending; initial stale wording scan found no active-listing claim. |
| Ecosystem resources | Framework | Community resources need direct review. |

## User operation coverage

| Area | Status | Notes |
|---|---|---|
| Wallet guide | Partial | Command testing status added for wallet RPC examples; initial stale wording/command scan found no blocking issue. Platform/release/local testing pending. |
| Wallets README | Partial | Normalized for current wallet source-review anchors and command-safety rules. |
| Node guide | Partial | Command testing status added for node command examples; initial stale wording/command scan found no blocking issue. Platform/release/local testing pending. |
| Nodes README | Partial | Normalized for current node/source-review anchors and operator-safety rules. |
| Mining overview | Partial | Command testing status added for mining RPC examples; initial stale wording/command scan found no blocking issue. Live software/pool data pending. |
| Mining README | Partial | Normalized for current mining source-review anchors and live-ecosystem caution. |
| Research README | Partial | Normalized for research-vs-documentation boundaries. |
| Discussion README | Partial | Normalized for proposal/status labeling and discussion boundaries. |
| History README | Partial | Normalized for dated-source and archive/current-status separation. |
| Verification README | Partial | Normalized for verification workflow, review feedback buckets, stale-wording scan, command-example scan, command tracking, release tracking, network release comparison, smoke-test planning, and priority unknowns. |
| Review feedback buckets | Framework | Added feedback taxonomy and narrow assignment guidance for private review. |
| Stale wording scan | Partial | Updated through status-label cleanup, release-page recheck, network navigation refresh, and network-specification cleanup. Remaining scans: command examples, fresh old-path check, release assets, live ecosystem. |
| Command example scan | Partial | Updated through exchange, wallet, mining, RPC overview, node/config, developer workflow, Source Atlas RPC/wallet/network pages, command tracker, and smoke-test plan. Full local grep still pending. |
| Known unknowns | Partial | Refreshed as short executive list linked to full backlog. |
| Open questions backlog | Partial | Consolidated with priority labels, evidence needs, and public/private review blockers. |
| Command testing status | Framework | Refreshed with network status command candidates and operator-only network commands. No command is locally tested yet. |
| Command smoke-test plan | Framework | Refreshed with Phase 1B read-only network status checks and explicit exclusions for manual peer/peer-list/network-active commands. |
| Release source comparison notes | Partial | Added `v29.1.0` versus `main` comparison and source spot checks. |
| Network release comparison | Partial | Records that reviewed P2P/network files did not appear in the GitHub changed-file list when comparing `v29.1.0` to `main`. Not binary verification or live testing. |
| Release artifact checklist | Framework | Added asset-inventory table, workflow observation, release-process notes, and future test-record template. |
| Configuration overview | Partial | Command/config testing status added; stale source links updated. Platform examples and startup commands pending. |
| RPC overview | Partial | Mining, blockchain, network, raw transaction, mempool, and wallet RPC groups have source review. Command examples remain linked to command-test tracker. |
| RPC configuration | Partial | Command/config testing status added; stale source links updated. Auth/setup examples still need testing. |

## Developer onboarding coverage

| Area | Status | Notes |
|---|---|---|
| Root README | Partial | Refreshed with private reviewer start flow. |
| Docs README | Partial | Refreshed with best starting points, untested-command caution, and legal/reuse posture link. |
| Contributing guide | Framework | Refreshed as private-review workflow with evidence rules, status rules, and feedback buckets. |
| Legal and reuse posture | Framework | Added private-review-only posture because no repository license file was found. |
| Private review handoff | Framework | Updated after contribution workflow, feedback-bucket work, and legal/reuse note. |
| Developer README | Partial | Links reading order, verification workflow, source review guide, source atlas, local development, build, testing, and release verification. |
| Repository map | Partial | Refreshed with address-manager, peer-list, network/P2P source slices, and network RPC. |
| Source tree guide | Partial | Refreshed with address-manager, peer-list, protocol, net-processing, network RPC, send-loop, and lower-level net connection-management reviewed areas. |
| Developer reading order | Framework | Updated to include current network Source Atlas group, address-manager page, connection-management page, peer-list page, send-loop page, and exchange-listing docs. |
| Source review guide | Framework | Created as contributor workflow; should be tested on future source reviews. |
| Verification standards | Framework | Practical workflow page exists; evidence scale remains the root confidence model. |
| Local development environment | Framework | Developer workflow scan found no blocking command-label issue. Commands still need actual testing. |
| Build system guide | Partial | First-pass CMake/source-doc review exists; developer workflow scan found no blocking command-label issue. Commands still need actual testing. |
| Testing guide | Partial | First-pass unit, wallet, CTest, and functional test-runner review exists; developer workflow scan found no blocking command-label issue. Commands still need actual testing. |
| Release process guide | Partial | Refreshed current observed release path and caveats. Full release artifact checks still pending. |
| Release verification guide | Partial | Current release-page observations, source comparison, artifact checklist, and verification gaps recorded; asset verification still pending. |
| Documentation polish plan | Framework | Broad cleanup plan exists and should guide the next phase. |
| Developer glossary | Partial | Refreshed with RPC, PSBT, broadcast, package, and wallet-history terminology. |
| Root glossary | Partial | Refreshed with general RPC, raw transaction, PSBT, package, broadcast, and watch-only terms. |

## Current priority order

1. Optional blob-level spot checks for key network files at `v29.1.0` and `main`.
2. Safe command smoke-test execution when a BitcoinII binary/environment is available.
3. Continue release artifact verification when full release asset data is available.
4. Direct ecosystem checks for explorers, APIs, pools, and exchanges.
5. Repository-wide command-term and stale-path recheck with a full local grep or more reliable method.
6. Expand node troubleshooting docs after live network checks are available.

## Verification

**Status:** Draft
**Primary sources checked:** Repository docs, current section indexes, and network release comparison
**Notes:** This dashboard was refreshed after network Source Atlas/navigation work, network specifications cleanup, command-tracker updates, command smoke-test plan updates, command-example scan updates, send-loop source review, lower-level net connection-management source review, peer-list/discouragement source review, address-manager source review, and network release comparison. It remains a project-management tracker, not a claim that commands or live services are verified.
