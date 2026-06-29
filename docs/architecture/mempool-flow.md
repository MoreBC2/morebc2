# Mempool flow

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page maps the reviewed BitcoinII Core mempool architecture from `src/txmempool.h`, `src/txmempool.cpp`, and reviewed validation flow.

It is intentionally partial. It focuses on mempool structure, ancestor and descendant tracking, reorg repair behavior, and the first reviewed mempool functions.

## What the mempool stores

`CTxMemPool` stores transactions that are valid according to the current best chain and may be included in a future block.

Transactions seen by the node are not automatically added. The source comments list examples of transactions that are not added, including low-fee transactions, non-standard transactions, and transactions that conflict with existing mempool entries without satisfying replacement rules.

## Main indexed structure

`mapTx` is a Boost multi-index container with indexes for:

```text
txid
wtxid
descendant feerate
entry time
ancestor feerate
```

This lets BitcoinII Core query and sort mempool transactions for different purposes, including relay, mining, eviction, and dependency tracking.

## Parent and child tracking

The mempool tracks:

- Direct parents: in-mempool transactions spent by a transaction.
- Direct children: in-mempool transactions that spend a transaction.
- Ancestor size, fee, count, and sigop totals.
- Descendant size, fee, and count totals.

These cached values allow the node to enforce limits without repeatedly walking the full mempool graph.

## Normal add flow

A simplified normal add path is:

```text
AcceptToMemoryPool / MemPoolAccept
  -> validation and policy checks
  -> CTxMemPool::addUnchecked
       -> insert into mapTx
       -> update mapNextTx spends
       -> update parent links
       -> update ancestor state
       -> update descendant state
       -> update counters and randomized storage
```

`addUnchecked` is named that way because validation is expected to happen before it is called.

## Normal remove flow

A simplified remove path is:

```text
removeRecursive / removeForBlock / removeForReorg
  -> determine entries to remove
  -> UpdateForRemoveFromMempool
       -> update ancestor and descendant state
       -> sever parent and child links
  -> removeUnchecked
       -> remove spends from mapNextTx
       -> update size, fee, memory, counters
       -> emit removal notifications when appropriate
```

## Reorg repair flow

Reorg handling is special because transactions from disconnected blocks may be re-added while descendants are already present in the mempool.

The reviewed flow is:

```text
DisconnectTip
  -> disconnected transaction pool receives old-chain block transactions

ConnectTip
  -> remove transactions confirmed by new-chain blocks
  -> remove matching entries from disconnected transaction pool

MaybeUpdateMempoolForReorg
  -> drain disconnected transaction pool
  -> re-add eligible non-coinbase transactions
  -> UpdateTransactionsFromBlock
  -> removeForReorg
  -> LimitMempoolSize
```

## Why `UpdateTransactionsFromBlock` matters

During reorg processing, normal mempool assumptions can be temporarily false.

A re-added transaction may already have children in the mempool. Until parent and child links are repaired, some mempool graph-walking functions are not generally safe to use.

`UpdateTransactionsFromBlock` repairs this state by:

- Finding in-mempool children through `mapNextTx`.
- Updating parent and child links.
- Updating descendant and ancestor accounting.
- Removing descendants that exceed ancestor limits.

## Consistency and locking

The source comments document two major guarantees:

- Locking both `cs_main` and `mempool.cs` gives a mempool view consistent with the current chain tip and fully populated after reorg processing.
- Locking only `mempool.cs` gives a mempool view consistent with some chain active since `cs_main` was last locked.

Adding transactions and changing the chain tip require both locks until consistency is restored.

## What is not fully reviewed yet

- Mempool expiry.
- Rolling minimum fee behavior.
- Full eviction policy.
- Replacement policy.
- Package relay and package acceptance behavior.
- Persistence behavior.
- Fee estimation interaction.

## Related pages

- [Source atlas: txmempool](../developers/source-atlas/txmempool.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Disconnected transactions](../developers/source-atlas/disconnected-transactions.md)
- [Block validation flow](block-validation-flow.md)
- [Reorganizations](../encyclopedia/reorganizations.md)

## Sources

- `src/txmempool.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/txmempool.h
- `src/txmempool.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/txmempool.cpp
- `src/validation.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/validation.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass mempool architecture map. It should be expanded after deeper review of mempool policy and transaction acceptance.
