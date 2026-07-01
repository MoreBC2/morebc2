# `src/txmempool.h` and `src/txmempool.cpp`

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Purpose

The `txmempool` files define and implement BitcoinII Core's in-memory transaction pool.

The mempool stores transactions that are valid according to the current best chain and may be included in a future block.

## File header notes

The reviewed files state that BitcoinII was forked from Bitcoin Core version `0.27.0` and is distributed under the MIT software license.

## Why it matters

The mempool affects:

- Transaction relay.
- Block template construction.
- Fee estimation.
- Transaction replacement behavior.
- Reorg recovery.
- Ancestor and descendant package tracking.
- Local wallet visibility for unconfirmed transactions.

## Core definition

The source comment for `CTxMemPool` describes it as storing transactions that are valid according to the current best chain and may be included in the next block.

It also states that not all seen transactions are added. Examples include:

- Transactions below minimum fee requirements.
- Double-spends that do not meet replacement requirements.
- Non-standard transactions.

## `MEMPOOL_HEIGHT`

The header defines `MEMPOOL_HEIGHT = 0x7FFFFFFF` as a fake height value used in `Coin` to signify outputs that only exist in the memory pool.

## Main data structure

`mapTx` is a Boost multi-index container.

Reviewed indexes:

- Transaction hash / txid.
- Witness transaction hash / wtxid.
- Descendant feerate ordering.
- Entry time ordering.
- Ancestor feerate ordering.

## Ancestors and descendants

The source comments define:

- Descendants: in-mempool transactions that depend on a transaction.
- Ancestors: in-mempool transactions that a transaction depends on.

The mempool tracks direct parents and direct children through link data, and tracks ancestor/descendant size and fee totals inside `CTxMemPoolEntry`.

## Consistency and locks

The header documents important consistency guarantees:

- Locking both `cs_main` and `mempool.cs` gives a mempool view consistent with the current chain tip and fully populated after reorg processing.
- Locking only `mempool.cs` gives a mempool view consistent with some chain that was active since `cs_main` was last locked.
- Adding transactions and changing the chain tip require both locks until the mempool is consistent with the new chain tip.

## Reorg-specific behavior

The header explicitly describes a reorg exception to the normal assumption that newly added transactions have no in-mempool children.

During reorg processing:

- Transactions from blocks that left the active chain may be re-added while descendants already exist in the mempool.
- The mempool may be temporarily inconsistent until cleanup occurs.
- The caller must call `UpdateTransactionsFromBlock()` to repair state after re-adding transactions from those blocks.

## Options visible in the header

Reviewed `CTxMemPool` options include:

- Maximum mempool size.
- Expiry time.
- Incremental relay feerate.
- Minimum relay feerate.
- Dust relay feerate.
- Bare multisig policy.
- Maximum datacarrier bytes.
- Standardness requirement.
- Full replacement setting.
- v1 mempool persistence setting.
- Ancestor/descendant limits.

## Reviewed functions

### `TestLockPointValidity`

Reviewed behavior:

- If a transaction's lock points depend on a previous block, checks whether that block is still in the active chain.
- Returns false if the active chain no longer contains that block.
- Returns true when lock points are still valid.

### `UpdateTransactionsFromBlock`

Reviewed behavior:

- Used after reorg-related re-addition of transactions from blocks that left the active chain.
- Reconstructs parent/child links for in-mempool descendants.
- Uses `mapNextTx` to find children spending outputs of re-added transactions.
- Processes transactions in reverse order to maximize descendant cache usefulness.
- Calls `UpdateForDescendants` to update descendant and ancestor state.
- Removes descendants that exceed ancestor limits after state repair.

### `CalculateAncestorsAndCheckLimits`

Reviewed behavior:

- Walks staged ancestors.
- Adds ancestor transaction sizes to total package size.
- Checks descendant size and count limits for ancestors.
- Checks ancestor size and count limits for the transaction/package being evaluated.
- Returns either the ancestor set or an error explaining which limit was hit.

### `CheckPackageLimits`

Reviewed behavior:

- Checks package count against ancestor and descendant count limits.
- Checks package virtual size against ancestor and descendant size limits.
- Adds in-mempool parents to staged ancestors.
- Uses `CalculateAncestorsAndCheckLimits` to verify the package against mempool limits.

### `CalculateMemPoolAncestors`

Reviewed behavior:

- Finds in-mempool parents by scanning transaction inputs and looking them up in the mempool.
- Can also use cached parent links for entries already in the mempool.
- Uses `CalculateAncestorsAndCheckLimits` for limit enforcement.

### `UpdateAncestorsOf`

Reviewed behavior:

- Adds or removes a transaction as a child of each direct parent.
- Updates descendant size, fee, and count state for all ancestors.

### `UpdateEntryForAncestors`

Reviewed behavior:

- Computes total ancestor size, fee, count, and sigop cost.
- Updates the entry's cached ancestor state.

### `UpdateForRemoveFromMempool`

Reviewed behavior:

- Updates descendant state when entries are removed.
- Uses cached parent/child relationships carefully during reorg states where full link consistency may not yet be restored.
- Updates parent and child links after calculating the removal set.

### `addUnchecked`

Reviewed behavior:

- Inserts a mempool entry after external validation has already occurred.
- Applies fee deltas from prioritization.
- Updates memory usage.
- Adds inputs to `mapNextTx`.
- Updates parent links and ancestor/descendant state.
- Increments transaction update counters.
- Adds the transaction to randomized transaction storage.

### `removeUnchecked`

Reviewed behavior:

- Increments the mempool sequence number.
- Emits removal notifications except when removal reason is block inclusion.
- Removes prevout spends from `mapNextTx`.
- Removes the transaction from unbroadcast tracking.
- Updates randomized storage.
- Updates total size, total fee, memory usage, and `mapTx`.
- Increments transaction update counters.

### `removeForBlock`

Reviewed behavior:

- Called when a block is connected.
- Removes transactions from the mempool when they appear in the connected block.
- Removes conflicts caused by transactions in the connected block.
- Clears prioritisation for block transactions.
- Emits a `MempoolTransactionsRemovedForBlock` signal.
- Updates rolling-fee tracking state after block connection.

### `check`

Reviewed behavior:

- Runs only according to the configured mempool check ratio.
- Verifies that mempool inputs are available either from the active coins view or from other mempool transactions.
- Verifies that `mapNextTx` tracks transaction inputs.
- Checks parent and child link consistency.
- Recalculates ancestor state and compares it against cached values.
- Checks that mempool transactions pass `Consensus::CheckTxInputs` against the constructed mempool coins view.
- Verifies total size, total fee, and cached memory usage accounting.

### `CompareDepthAndScore`

Reviewed behavior:

- Compares two transactions for relay/ordering purposes.
- Prefers transactions already in the mempool over missing ones.
- Prefers fewer ancestors first.
- Uses fee score when ancestor count is equal.

### `PrioritiseTransaction`

Reviewed behavior:

- Adds or updates a local fee delta for a transaction.
- If the transaction is already in the mempool, updates its modified fee.
- Updates ancestor descendant-fee accounting.
- Updates descendant ancestor-fee accounting.
- Clears the delta entry if the resulting delta becomes zero.

### `CCoinsViewMemPool::GetCoin`

Reviewed behavior:

- Checks temporary package-added coins first.
- Checks mempool transactions before the base coins view.
- Returns mempool outputs with `MEMPOOL_HEIGHT`.
- Falls back to the base coins view if the output is not in temporary package data or the mempool.

### `DynamicMemoryUsage`

Reviewed behavior:

- Estimates memory used by `mapTx`, `mapNextTx`, fee deltas, randomized storage, and cached inner usage.

### `RemoveStaged`

Reviewed behavior:

- Updates mempool state for the staged removal set.
- Calls `removeUnchecked` for each staged entry.

### `Expire`

Reviewed behavior:

- Uses the entry-time index to find transactions older than the expiry threshold.
- Calculates descendants of expired transactions.
- Removes expired transactions and descendants with removal reason `EXPIRY`.
- Returns the number of removed transactions.

### `GetMinFee`

Reviewed behavior:

- Returns the current rolling minimum fee rate.
- Decays the rolling minimum fee rate over time after blocks are found.
- Decays faster when memory usage is below lower fractions of the mempool size limit.
- Returns at least the incremental relay feerate when rolling minimum fee is active.

### `TrimToSize`

Reviewed behavior:

- Removes transactions while dynamic memory usage exceeds the configured size limit.
- Chooses removal candidates by descendant score.
- Removes the candidate and its descendants.
- Bumps the rolling minimum fee based on the removed package feerate plus incremental relay feerate.
- Optionally records prevouts that may no longer have spends remaining.

### `GetTransactionAncestry`

Reviewed behavior:

- Returns ancestor count, descendant count, ancestor size, and ancestor fees for a transaction if it is in the mempool.

### `CCoinsViewMemPool::PackageAddTransaction`

Reviewed behavior:

- Adds outputs from package transactions to temporary package-added coins.
- Marks those coins as non-base coins for package validation lookup.

## Relationship to validation and reorg docs

The mempool is updated during block connection and reorganization flow:

```text
ConnectTip
  -> removeForBlock
  -> disconnectpool.removeForBlock

DisconnectTip
  -> disconnectpool.AddTransactionsFromBlock

MaybeUpdateMempoolForReorg
  -> AcceptToMemoryPool
  -> UpdateTransactionsFromBlock
  -> removeForReorg
  -> LimitMempoolSize
```

## BitcoinII-specific notes

The reviewed files show BitcoinII naming and fork metadata, but this pass has not identified BitcoinII-specific mempool behavior beyond inherited Bitcoin Core-derived logic and configured options.

## Related MoreBC2 pages

- [Mempool flow](../../architecture/mempool-flow.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Disconnected transactions](disconnected-transactions.md)
- [Source atlas: validation.cpp](validation-cpp.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)

## Open questions

- Review `kernel/mempool_entry.h` in detail.
- Review mempool option defaults.
- Review replacement policy files.
- Review package acceptance in `validation.cpp` together with mempool limits.
- Review mempool persistence behavior.
- Confirm whether `v29.1.0` differs from current `main` for these files before upgrading status.

## Sources

- Current observed `main` `src/txmempool.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/txmempool.h
- Current observed `main` `src/txmempool.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/txmempool.cpp
- Current observed `main` `src/validation.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a broader mempool architecture audit. Transaction acceptance, policy details, and release-versus-main comparison still need separate review.
