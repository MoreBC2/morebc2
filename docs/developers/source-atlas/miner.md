# Block template assembly

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/node/miner.h`
- `src/node/miner.cpp`
- `src/node/mini_miner.h`
- `src/node/mini_miner.cpp`

These files cover candidate block assembly and a smaller fee-selection simulation helper.

This page is about local block-template construction and transaction selection. It is not a hardware guide, profitability guide, or service setup guide.

## Why this file matters

MoreBC2 needs to separate several layers:

- Consensus proof-of-work rules.
- Local candidate-block construction.
- Mempool transaction selection.
- RPC behavior.
- External operator tooling.

The reviewed files sit mostly in the candidate-block construction and transaction-selection layer.

## Key symbols reviewed

- `CBlockTemplate`
- `CTxMemPoolModifiedEntry`
- `BlockAssembler`
- `BlockAssembler::Options`
- `BlockAssembler::CreateNewBlock`
- `BlockAssembler::addPackageTxs`
- `BlockAssembler::TestPackage`
- `BlockAssembler::TestPackageTransactions`
- `BlockAssembler::SortForBlock`
- `GetMinimumTime`
- `UpdateTime`
- `RegenerateCommitments`
- `ApplyArgsManOptions`
- `MiniMiner`
- `MiniMinerMempoolEntry`

## Block template object

`CBlockTemplate` contains:

- The candidate `CBlock`.
- Per-transaction fee data.
- Per-transaction operation-cost data.
- Coinbase commitment data.
- Package feerates in the order packages are selected for inclusion.

This object represents a candidate block before valid proof-of-work has been found.

## BlockAssembler role

`BlockAssembler` constructs a new block template.

Reviewed state tracked during assembly includes:

- Current block weight.
- Current transaction count.
- Current operation cost.
- Total fees.
- Transactions already included in the template.
- Target height.
- Locktime cutoff.
- Chain parameters.
- Optional mempool pointer.
- Chainstate reference.

## BlockAssembler options

Reviewed options include:

- Maximum block weight.
- Minimum transaction fee rate for template inclusion.
- Whether to run `TestBlockValidity` at the end of block creation.
- Whether to print modified fee information.
- Reserved block weight.
- Coinbase output configuration inherited from block-create options.

`ApplyArgsManOptions` maps command-line settings such as `-blockmaxweight`, `-blockmintxfee`, `-printpriority`, and `-blockreservedweight` into assembler options.

## Time and difficulty helpers

`GetMinimumTime` computes the minimum time a creator should use for the next candidate block. The reviewed comments say it accounts for the BIP94 timewarp rule and may differ from the strict consensus limit.

`UpdateTime` updates the block header time to at least the required minimum or current node time. On networks allowing minimum-difficulty blocks, updating time can also update `nBits` through `GetNextWorkRequired`.

## CreateNewBlock flow

Reviewed `CreateNewBlock` behavior includes:

1. Reset block assembly counters.
2. Create a new `CBlockTemplate`.
3. Add a dummy coinbase transaction first.
4. Lock chain state.
5. Read previous tip and compute next height.
6. Compute block version from versionbits.
7. Set block time and locktime cutoff.
8. Add mempool transactions if a mempool is available.
9. Build the real coinbase transaction.
10. Add subsidy plus selected transaction fees to the coinbase output.
11. Add coinbase height data to the coinbase input script.
12. Generate the coinbase commitment.
13. Fill header fields: previous block hash, time, difficulty bits, nonce.
14. Optionally run `TestBlockValidity` without proof-of-work or merkle-root checks.
15. Return the template.

## Transaction selection

`addPackageTxs` selects transactions from the mempool for inclusion in the block template.

Reviewed behavior includes:

- Locking the mempool.
- Considering transactions by ancestor-aware fee score.
- Maintaining a modified-transaction set for descendants whose ancestor state changes when parents are included.
- Tracking failed transactions to avoid repeated evaluation.
- Stopping when remaining packages fall below the configured minimum fee rate.
- Checking block weight and operation-cost limits.
- Calculating ancestor packages.
- Removing already-included transactions from package candidates.
- Checking package transaction finality.
- Sorting package entries so ancestors appear before descendants.
- Adding selected transactions to the template.
- Updating descendant package state after inclusion.

## Package checks

`TestPackage` rejects a package if adding it would exceed the configured block weight limit or maximum operation-cost limit.

`TestPackageTransactions` checks package transaction finality for the candidate block height and locktime cutoff.

## Coinbase and reward notes

`CreateNewBlock` sets the coinbase output value to selected transaction fees plus `GetBlockSubsidy` for the candidate height.

MoreBC2 has not yet reviewed the subsidy calculation file deeply enough to document the complete block subsidy schedule here.

## MiniMiner role

`MiniMiner` is described in the reviewed header as a minimal version of `BlockAssembler` using the same ancestor-set scoring algorithm on a limited transaction set while ignoring consensus rules.

Reviewed uses include:

- Calculating bump fees for unconfirmed outputs at a target feerate.
- Linearizing a list of transactions to see selection order.

This is not real block production. It is a simulation/helper for fee and ordering calculations.

## MiniMiner behavior

Reviewed behavior includes:

- Copying relevant mempool transaction data while holding the mempool lock.
- Releasing the mempool lock after building its local data structures.
- Tracking transactions that are expected to be replaced.
- Building descendant caches.
- Sorting entries by a fee score based on ancestor and individual fee rates.
- Building a mock template until a target feerate is reached or all entries are selected.
- Recording selection order for linearization.
- Calculating bump fees based on both individual and ancestor-set fee requirements.

## Relationship to mining overview

This source review supports adding a clearer distinction to mining docs:

- Proof-of-work rules come from consensus and PoW files.
- Candidate block templates come from `BlockAssembler`.
- Mempool package selection is local policy/template behavior.
- MiniMiner is a helper/simulation path.
- Solo/pool operation and external tools still require separate verification.

Related pages:

- [Mining overview](../../mining/mining-overview.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Source atlas: pow.cpp](pow-cpp.md)
- [Source atlas: transaction consensus files](transaction-consensus.md)

## BitcoinII-specific notes

This first-pass review did not identify BitcoinII-specific template behavior beyond project naming, header guards, and executable/RPC naming.

The reviewed file structure appears Bitcoin-style, but no upstream comparison has been completed.

## Open questions

- Where is `GetBlockSubsidy` implemented, and what is the full BitcoinII subsidy schedule?
- Which RPC path calls `BlockAssembler` for `getblocktemplate`?
- Which local submit-block paths should be documented next?
- Which block-template tests are most relevant for MoreBC2?
- Does BitcoinII differ from upstream Bitcoin Core in template construction or package selection?
- Which external operation instructions can be verified from current primary sources?
- Confirm whether `v29.1.0` differs from current `main` for these files before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/node/miner.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/miner.h
- Current observed `main` `src/node/miner.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/miner.cpp
- Current observed `main` `src/node/mini_miner.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/mini_miner.h
- Current observed `main` `src/node/mini_miner.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/mini_miner.cpp
- Current observed `main` `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/pow.cpp
- Current observed `main` `src/validation.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.cpp
- Current observed `main` `src/rpc/mining.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/rpc/mining.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass block-template and MiniMiner review. RPC caller paths, subsidy schedule, local commands, external operation guides, upstream comparison, and release-versus-main comparison remain open.
