# `src/kernel/mempool_entry.h`

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Purpose

`mempool_entry.h` defines the per-transaction data stored by BitcoinII Core's mempool.

The main type reviewed here is `CTxMemPoolEntry`.

## File header notes

The file header states that BitcoinII was forked from Bitcoin Core version `0.27.0` and is distributed under the MIT software license.

## Why it matters

`CTxMemPoolEntry` is the unit of accounting for mempool transactions.

It stores both the transaction itself and cached metadata used for:

- Fee sorting.
- Mining selection.
- Ancestor tracking.
- Descendant tracking.
- Replacement and relay policy support.
- Reorg lock-point repair.
- Mempool graph algorithms.

## `LockPoints`

`LockPoints` stores cached height and median-time-past values needed to satisfy relative locktime constraints.

Reviewed fields:

- `height`
- `time`
- `maxInputBlock`

The source comment explains that cached lock points remain valid after a reorg as long as the current chain still descends from the highest block containing one of the transaction inputs used in the calculation.

## Parent and child references

`CTxMemPoolEntry` defines:

- `Parents`
- `Children`

Both are sets of references to other mempool entries, ordered by transaction hash.

These are used to track direct in-mempool parents and direct in-mempool children.

## Core stored fields

Reviewed private fields include:

- `tx` — transaction reference.
- `m_parents` — direct mempool parents.
- `m_children` — direct mempool children.
- `nFee` — original transaction fee.
- `nTxWeight` — cached transaction weight.
- `nUsageSize` — cached memory usage.
- `nTime` — local mempool entry time.
- `entry_sequence` — sequence used for relay recency behavior.
- `entryHeight` — chain height when the transaction entered the mempool.
- `spendsCoinbase` — whether the transaction spends a coinbase output.
- `sigOpCost` — total signature operation cost.
- `m_modified_fee` — fee after local priority adjustment.
- `lockPoints` — cached relative-locktime values.

## Descendant accounting

Reviewed descendant fields:

- `m_count_with_descendants`
- `nSizeWithDescendants`
- `nModFeesWithDescendants`

The source comment explains that when a new mempool entry is added, descendant state is updated for all ancestors of the newly added transaction.

## Ancestor accounting

Reviewed ancestor fields:

- `m_count_with_ancestors`
- `nSizeWithAncestors`
- `nModFeesWithAncestors`
- `nSigOpCostWithAncestors`

These values cache package-level data needed for ancestor-aware policy and mining selection.

## Constructor behavior

The constructor stores transaction metadata and initializes:

- Original fee.
- Transaction weight.
- Memory usage.
- Entry time.
- Entry height.
- Coinbase-spend flag.
- Sigop cost.
- Modified fee as the original fee.
- Lock points.
- Ancestor and descendant counts/sizes/fees to the transaction itself.

## Reviewed methods

### Transaction accessors

Reviewed methods include:

- `GetTx()`
- `GetSharedTx()`
- `GetFee()`
- `GetTxSize()`
- `GetTxWeight()`
- `GetTime()`
- `GetHeight()`
- `GetSequence()`
- `GetSigOpCost()`
- `GetModifiedFee()`
- `DynamicMemoryUsage()`
- `GetLockPoints()`

### State update methods

Reviewed methods include:

- `UpdateDescendantState()`
- `UpdateAncestorState()`
- `UpdateModifiedFee()`
- `UpdateLockPoints()`

`UpdateModifiedFee()` updates the modified fee for the entry itself and also updates cached modified-fee totals with ancestors and descendants.

`UpdateLockPoints()` is used after a reorg when cached lock-point values need to be repaired.

### Parent and child accessors

Reviewed methods include:

- `GetMemPoolParentsConst()`
- `GetMemPoolChildrenConst()`
- `GetMemPoolParents()`
- `GetMemPoolChildren()`

These are the direct link structures used by broader mempool graph logic.

## Transaction notification structs

The file also defines transaction-info helper structs:

### `TransactionInfo`

Stores:

- Transaction reference.
- Fee.
- Virtual transaction size.
- Height when the transaction entered the mempool.

The source comment notes that virtual transaction size is a policy field and is the primary metric used by the mining algorithm to select transactions.

### `RemovedMempoolTransactionInfo`

Wraps `TransactionInfo` for removed mempool transactions.

### `NewMempoolTransactionInfo`

Stores new-transaction notification metadata, including whether:

- Mempool limits were bypassed.
- The transaction was submitted as part of a package.
- The chainstate was current when added.
- The transaction had no unconfirmed parents.

## Relationship to other mempool files

`CTxMemPoolEntry` is used by `CTxMemPool` in `src/txmempool.h` and `src/txmempool.cpp`.

`CTxMemPool` updates entry ancestor/descendant state when transactions are added, removed, reprioritized, or repaired after reorg processing.

## BitcoinII-specific notes

The reviewed file shows BitcoinII naming and fork metadata, but this first pass has not identified BitcoinII-specific entry behavior beyond inherited Bitcoin Core-derived logic.

## Related MoreBC2 pages

- [Mempool source](txmempool.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Disconnected transactions](disconnected-transactions.md)

## Open questions

- Review how `CTxMemPoolEntry` fields are set during transaction acceptance.
- Review mining/block-template selection to confirm how virtual transaction size and ancestor data are used.
- Review replacement policy interactions with entry metadata.
- Review fee-estimation use of entry data.
- Confirm whether `v29.1.0` differs from current `main` for this file before upgrading status.

## Sources

- Current observed `main` `src/kernel/mempool_entry.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/mempool_entry.h
- Current observed `main` `src/txmempool.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/txmempool.h
- Current observed `main` `src/txmempool.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/txmempool.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** This page documents the mempool entry data structure. Transaction acceptance, mining selection, replacement policy, and release-versus-main comparison still need separate review.
