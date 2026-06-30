# Documentation coverage

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-29

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
| Architecture overview | Framework | Overview has been refreshed, but should keep changing as new source areas are reviewed. |
| Node startup | Partial | Built from first-pass startup-path review. GUI, daemon, and shutdown paths pending. |
| Consensus model | Partial | Built from reviewed chainparams, PoW, validation, block connection, reorg, transaction-helper, and script-engine notes. Flag caller mapping still pending. |
| Life of a transaction | Partial | Built from reviewed broadcast, mempool, block, and reorg notes. Wallet, P2P, and mining paths pending. |
| Life of a block | Partial | Built from reviewed block acceptance and validation paths. Mining, P2P, and storage details pending. |
| Life of a reorganization | Partial | Built from reviewed reorg, disconnection, undo, and mempool re-add paths. Wallet and index handling pending. |
| Block validation flow | Reviewed | Strong first-pass flow map exists. |
| Mempool flow | Reviewed | Strong first-pass mempool and transaction acceptance map exists. |
| Wallet flow | Not started | Requires wallet source review. |
| Mining flow | Not started | Requires miner/block-template review. |

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
| Block lifecycle path | Reviewed | Consolidated source-atlas lifecycle page exists. |
| `src/txmempool.*` | Partial | Core mempool structure and many functions reviewed. Policy details pending. |
| `src/kernel/mempool_entry.h` | Reviewed | First-pass entry metadata review exists. |
| `src/kernel/disconnected_transactions.*` | Reviewed | First-pass disconnected transaction pool review exists. |
| `src/primitives/block.*` | Partial | Block hash path reviewed; broader primitive review pending. |
| `src/hash.h` | Partial | Double-SHA256 path reviewed; broader hash utility review pending. |
| `src/consensus/amount.h` | Partial | COIN/MAX_MONEY documented; broader consensus files pending. |
| Block storage | Not started | Needed for disk and pruning details. |
| Mining/block template | Not started | Needed for mining flow and mempool selection details. |
| Wallet internals | Not started | Needed for wallet flow. |
| RPC internals | Not started | Needed for RPC flow and service integration examples. |
| Validation interface | Not started | Needed for callback ordering and wallet/index notifications. |

## Documentation section coverage

| Area | Status | Notes |
|---|---|---|
| What is BitcoinII | Partial | Needs final source review and public wording pass. |
| Project overview | Partial | Needs current source/official-source review. |
| Network specifications | Partial | Strong source-backed values exist; current release branch should be checked. |
| Consensus overview | Partial | Strong PoW and amount notes exist; transaction-helper and script-engine material now needs summary refresh. |
| Checkpoints | Framework | Existence documented; full checkpoint table and usage review pending. |
| Releases | Framework | Release verification model remains open. |
| Explorer resources | Framework | Active explorer checks pending. |

## Ecosystem and integration coverage

| Area | Status | Notes |
|---|---|---|
| Exchange integration | Framework | Good structure exists; confirmations/contact/release verification pending. |
| Deposit monitoring | Framework | Needs RPC testing and confirmation policy. |
| Service integration checklist | Framework | Useful checklist; each item needs evidence links. |
| Ecosystem wallets | Framework | Conservative listing model exists. |
| Ecosystem explorers | Framework | Direct explorer checks pending. |
| Ecosystem mining pools | Framework | Direct pool checks pending. |
| Ecosystem exchanges | Framework | Current listing checks pending. |
| Ecosystem resources | Framework | Community resources need direct review. |

## User operation coverage

| Area | Status | Notes |
|---|---|---|
| Wallet guide | Framework | Needs official release verification and user safety review. |
| Node guide | Framework | Needs tested commands and current config checks. |
| Mining overview | Partial | Needs mining source and live pool/software review. |
| Configuration overview | Partial | Based on generated config/source; local testing pending. |
| RPC configuration | Partial | Needs tested command examples. |

## Developer onboarding coverage

| Area | Status | Notes |
|---|---|---|
| Developer README | Partial | Links reading order, verification workflow, source review guide, and source atlas. |
| Repository map | Partial | Needs latest reviewed files added after script-engine review. |
| Source tree guide | Partial | Needs latest reviewed files added after script-engine review. |
| Developer reading order | Framework | Created as contributor navigation path; should be updated as sections move. |
| Source review guide | Framework | Created as contributor workflow; should be tested on future source reviews. |
| Verification standards | Framework | Practical workflow page exists; evidence scale remains the root confidence model. |
| Developer glossary | Framework | Developer-facing glossary framework exists under Encyclopedia. |
| Root glossary | Partial | Short general glossary exists; can be expanded and cross-linked. |

## Current priority order

1. Consensus overview refresh.
2. Repository map refresh for transaction and script-engine files.
3. Source tree guide refresh for transaction and script-engine files.
4. Local development environment guide.
5. Release verification guide.
6. Glossary expansion and cross-linking.
7. Block storage source review.
8. Validation interface source review.

## Verification

**Status:** Draft
**Primary sources checked:** Repository docs and current section indexes
**Notes:** This dashboard should be updated whenever a major source audit or architecture page is added.
