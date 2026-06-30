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
| Architecture overview | Framework | Existing overview needs refresh after lifecycle pages. |
| Node startup | Partial | Built from first-pass `src/init.cpp` startup-path review. GUI/daemon/shutdown paths pending. |
| Consensus model | Partial | Built from reviewed chainparams, PoW, validation, block connection, reorg, and transaction consensus helper notes. Script consensus pending. |
| Life of a transaction | Partial | Built from reviewed broadcast, mempool, block, and reorg notes. Wallet/P2P/mining paths pending. |
| Life of a block | Partial | Built from reviewed block acceptance and validation paths. Mining/P2P/storage details pending. |
| Life of a reorganization | Partial | Built from reviewed reorg, disconnection, undo, and mempool re-add paths. Wallet/index handling pending. |
| Block validation flow | Reviewed | Strong first-pass flow map exists. |
| Mempool flow | Reviewed | Strong first-pass mempool and transaction acceptance map exists. |
| Wallet flow | Not started | Requires wallet source review. |
| Mining flow | Not started | Requires miner/block-template review. |

## Source atlas coverage

| Source area | Status | Notes |
|---|---|---|
| `src/kernel/chainparams.cpp` | Reviewed | Mainnet parameters documented; release-branch confirmation still needed. |
| `src/init.cpp` | Partial | Startup orchestration first pass exists. GUI/daemon/shutdown and option-level details pending. |
| `src/pow.cpp` | Reviewed | Difficulty retarget and PoW checks documented. |
| `src/consensus/tx_check.*` | Reviewed | Context-independent transaction checks first pass exists. Upstream comparison pending. |
| `src/consensus/tx_verify.*` | Reviewed | Finality, sequence locks, operation-cost helpers, and input checks first pass exists. Script internals pending. |
| `src/validation.cpp` | Partial | Major validation, connection, reorg, mempool acceptance paths reviewed. Large file still not fully exhausted. |
| Block acceptance path | Reviewed | Consolidated source-atlas lifecycle page exists. |
| `src/txmempool.*` | Partial | Core mempool structure and many functions reviewed. Policy details pending. |
| `src/kernel/mempool_entry.h` | Reviewed | First-pass entry metadata review exists. |
| `src/kernel/disconnected_transactions.*` | Reviewed | First-pass disconnected transaction pool review exists. |
| `src/primitives/block.*` | Partial | Block hash path reviewed; broader primitive review pending. |
| `src/hash.h` | Partial | Double-SHA256 path reviewed; broader hash utility review pending. |
| `src/consensus/amount.h` | Partial | COIN/MAX_MONEY documented; broader consensus files pending. |
| Script interpreter | Not started | Needed for script validation model. |
| Block storage | Not started | Needed for disk/pruning details. |
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
| Consensus overview | Partial | Strong PoW/amount/block-hash notes exist; transaction/script consensus pending. |
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
| Developer README | Partial | Now links reading order, verification workflow, source review guide, and source atlas. |
| Repository map | Partial | Needs refresh against current repository structure. |
| Source tree guide | Partial | Needs source audit links. |
| Developer reading order | Framework | Created as contributor navigation path; should be updated as sections move. |
| Source review guide | Framework | Created as contributor workflow; should be tested on future source reviews. |
| Verification standards | Framework | Practical workflow page now exists; evidence scale remains the root confidence model. |
| Developer glossary | Framework | Developer-facing glossary framework now exists under Encyclopedia. |
| Root glossary | Partial | Short general glossary exists; can be expanded and cross-linked. |

## Current priority order

1. Script validation source review.
2. Consensus overview refresh.
3. Repository map refresh for transaction consensus files.
4. Source tree guide refresh for transaction consensus files.
5. Local development environment guide.
6. Release verification guide.
7. Glossary expansion and cross-linking.
8. Block storage source review.

## Verification

**Status:** Draft
**Primary sources checked:** Repository docs and current section indexes
**Notes:** This dashboard should be updated whenever a major source audit or architecture page is added.
