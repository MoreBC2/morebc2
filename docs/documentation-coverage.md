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
| Architecture overview | Framework | Overview has been refreshed, but should keep changing as source areas and navigation are polished. |
| Node startup | Partial | Built from first-pass startup-path review, now including wallet loader/startup notes. GUI, daemon, shutdown details pending. |
| Consensus model | Partial | Built from reviewed chainparams, PoW, validation, block connection, reorg, transaction-helper, and script-engine notes. Flag caller mapping still pending. |
| Life of a transaction | Partial | Built from reviewed broadcast, mempool, block, reorg, wallet spend/history RPC notes, raw transaction construction/PSBT notes, and mempool/broadcast RPC notes. Lower-level P2P paths pending. |
| Life of a block | Partial | Built from reviewed block acceptance, validation, notification, storage, template assembly, mining RPC, and blockchain RPC paths. P2P details pending. |
| Life of a reorganization | Partial | Built from reviewed reorg, disconnection, undo, storage, notification, and mempool re-add paths. Wallet and index handling pending. |
| Block validation flow | Reviewed | Strong first-pass flow map exists. |
| Mempool flow | Reviewed | Strong first-pass mempool and transaction acceptance map exists. |
| Wallet flow | Partial | First-pass wallet startup/lifecycle, wallet RPC, backup/import, spend/PSBT, encryption, coins/balances, and transaction-history RPC review exists. Wallet database internals pending. |
| Candidate block flow | Partial | First-pass template assembly and mining RPC review exists. External-operation docs pending. |

## Source atlas coverage

| Source area | Status | Notes |
|---|---|---|
| `src/kernel/chainparams.cpp` | Reviewed | Mainnet parameters documented; release-branch confirmation still needed. |
| `src/init.cpp` | Partial | Startup orchestration first pass exists. GUI, daemon, shutdown, and option-level details pending. |
| `src/pow.cpp` | Reviewed | Difficulty retarget and PoW checks documented. |
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
| `src/rpc/mempool.cpp` | Partial | First-pass transaction broadcast, mempool acceptance testing, mempool inspection, persistence, orphan, and package RPC review exists. Commands untested. |
| `src/wallet/init.cpp` | Partial | First-pass wallet option, parameter interaction, and loader construction review exists. |
| `src/wallet/load.*` | Partial | First-pass wallet verification, loading, start, flush, stop, and unload review exists. |
| `src/wallet/context.*` | Partial | First-pass shared wallet context review exists. |
| `src/wallet/wallet.h` | Partial | Startup-adjacent declarations and defaults reviewed. Deeper wallet internals pending. |
| `src/wallet/rpc/wallet.cpp` | Partial | First-pass wallet RPC registration, management, creation, loading, migration, and status review exists. Commands untested. |
| `src/wallet/rpc/addresses.cpp` | Partial | First-pass address, change address, label, grouping, and multisig RPC review exists. Commands untested. |
| `src/wallet/rpc/backup.cpp` | Partial | First-pass backup, restore, legacy import, descriptor import, export, and rescan-related review exists. Commands untested. |
| `src/wallet/rpc/spend.cpp` | Partial | First-pass wallet send, funding, fee setting, fee bumping, signing, and PSBT review exists. Commands untested. |
| `src/wallet/rpc/encrypt.cpp` | Partial | First-pass wallet timed unlock, relock, credential update, and first-time encryption review exists. Commands untested. |
| `src/wallet/rpc/coins.cpp` | Partial | First-pass received amount, balance, output locking, and listunspent review exists. Commands untested. |
| `src/wallet/rpc/transactions.cpp` | Partial | First-pass wallet transaction listing, listsinceblock, gettransaction, abandon, rescan, and abort-rescan review exists. Commands untested. |
| Block lifecycle path | Reviewed | Consolidated source-atlas lifecycle page exists. |
| `src/txmempool.*` | Partial | Core mempool structure and many functions reviewed. Policy details pending. |
| `src/kernel/mempool_entry.h` | Reviewed | First-pass entry metadata review exists. |
| `src/kernel/disconnected_transactions.*` | Reviewed | First-pass disconnected transaction pool review exists. |
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
| Network specifications | Partial | Strong source-backed values exist; current release branch should be checked. |
| Consensus overview | Partial | Strong PoW and amount notes exist; transaction-helper and script-engine material has been refreshed. |
| Checkpoints | Framework | Existence documented; full checkpoint table and usage pending. |
| Releases | Framework | Release verification model remains open. |
| Explorer resources | Framework | Active explorer checks pending. |
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
| Ecosystem README | Partial | Normalized for listing rules, direct-check requirements, and active-service caution. |
| Ecosystem wallets | Framework | Conservative listing model exists. |
| Ecosystem explorers | Framework | Direct explorer checks pending. |
| Ecosystem mining pools | Framework | Direct pool checks pending. |
| Ecosystem exchanges | Framework | Current listing checks pending. |
| Ecosystem resources | Framework | Community resources need direct review. |

## User operation coverage

| Area | Status | Notes |
|---|---|---|
| Wallet guide | Partial | First-pass wallet startup, wallet RPC, backup/import, spend/PSBT, encryption, coins/balances, transaction-history, address, and source-observed defaults added. Release verification, platform steps, and command testing pending. |
| Wallets README | Partial | Normalized for current wallet source-review anchors and command-safety rules. |
| Node guide | Framework | Needs tested commands and current config checks. |
| Nodes README | Partial | Normalized for current node/source-review anchors and operator-safety rules. |
| Mining overview | Partial | Consensus-level mining, candidate-template assembly, and mining RPC paths have first-pass source review. Live software/pool data pending. |
| Mining README | Partial | Normalized for current mining source-review anchors and live-ecosystem caution. |
| Research README | Partial | Normalized for research-vs-documentation boundaries. |
| Discussion README | Partial | Normalized for proposal/status labeling and discussion boundaries. |
| History README | Partial | Normalized for dated-source and archive/current-status separation. |
| Verification README | Partial | Normalized for verification workflow and priority unknowns. |
| Configuration overview | Partial | Based on generated config/source; local testing pending. |
| RPC overview | Partial | Mining, blockchain, raw transaction, mempool, and wallet RPC groups have source review. Examples still untested. |
| RPC configuration | Partial | Needs tested command examples. |

## Developer onboarding coverage

| Area | Status | Notes |
|---|---|---|
| Root README | Partial | Refreshed for polish phase and current source-backed coverage. |
| Docs README | Partial | Refreshed with best starting points and untested-command caution. |
| Developer README | Partial | Links reading order, verification workflow, source review guide, source atlas, local development, build, testing, and release verification. |
| Repository map | Partial | Refreshed through mempool/broadcast RPC. Needs polish pass rather than immediate new navigation work. |
| Source tree guide | Partial | Refreshed through mempool/broadcast RPC. Needs polish pass rather than immediate new navigation work. |
| Developer reading order | Framework | Updated to include current Source Atlas and developer workflow paths; should be refreshed after polish. |
| Source review guide | Framework | Created as contributor workflow; should be tested on future source reviews. |
| Verification standards | Framework | Practical workflow page exists; evidence scale remains the root confidence model. |
| Local development environment | Framework | Defines safe test-record workflow; commands still need actual testing. |
| Build system guide | Partial | First-pass CMake/source-doc review exists. Commands still need actual testing. |
| Testing guide | Partial | First-pass unit, wallet, CTest, and functional test-runner review exists. Commands still need actual testing. |
| Release verification guide | Framework | Defines release artifact verification standard; specific releases still need checks. |
| Documentation polish plan | Framework | Broad cleanup plan exists and should guide the next phase. |
| Developer glossary | Partial | Expanded with transaction, storage, and validation-notification terms. More cross-linking still useful. |
| Root glossary | Partial | Expanded with common architecture, storage, policy, and release-verification terms. |

## Current priority order

1. Open-question consolidation pass.
2. Cross-link and terminology pass across architecture and Source Atlas pages.
3. Release artifact verification pass.
4. Explorer/API documentation framework.
5. Build/test command smoke-test record.
6. Network RPC or P2P source review.
7. Glossary cross-linking during future page updates.

## Verification

**Status:** Draft
**Primary sources checked:** Repository docs and current section indexes
**Notes:** This dashboard should be updated whenever a major source audit, polish pass, or architecture page is added.
