# Mempool flow

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page maps the reviewed BitcoinII Core mempool architecture from `src/txmempool.h`, `src/txmempool.cpp`, reviewed validation flow, and reviewed mempool RPC behavior.

It is intentionally partial. It focuses on mempool structure, ancestor and descendant tracking, transaction acceptance, reorg repair behavior, reviewed mempool functions, and RPC surfaces that expose or affect mempool state.

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

Reviewed mempool RPC behavior can expose parts of this relationship through ancestor, descendant, entry, and raw-mempool commands.

## Transaction acceptance flow

A simplified single-transaction acceptance path is:

```text
AcceptSingleTransaction
  -> PreChecks
       -> CheckTransaction
       -> standardness and finality checks
       -> duplicate and conflict checks
       -> input lookup
       -> sequence lock checks
       -> CheckTxInputs
       -> fee and ancestor/descendant policy checks
  -> ReplacementChecks, if replacement applies
  -> PolicyScriptChecks
  -> ConsensusScriptChecks
  -> Finalize
       -> remove conflicts
       -> addUnchecked
       -> LimitMempoolSize, unless bypassed/package submission
  -> TransactionAddedToMempool notification
```

## Dry-run acceptance and live submission

Reviewed mempool RPC behavior adds two important user/service-facing surfaces:

- `testmempoolaccept` can test whether raw transactions would pass local mempool checks without submitting them.
- `sendrawtransaction` submits a signed raw transaction toward local acceptance and relay.

This distinction matters for documentation safety. Dry-run examples and live submission examples should stay separate until both are tested locally.

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

## Package acceptance flow

Package acceptance has a separate reviewed path:

```text
AcceptPackage
  -> package shape checks
  -> require one child with all unconfirmed parents
  -> verify child inputs are package parents or confirmed UTXOs
  -> de-duplicate package transactions already in mempool
  -> AcceptSubPackage
       -> AcceptSingleTransaction, for one transaction
       -> AcceptMultipleTransactions, for more than one transaction
            -> package v3 checks
            -> package feerate checks when enabled
            -> PackageMempoolChecks
            -> PolicyScriptChecks for each transaction
            -> SubmitPackage
                 -> ConsensusScriptChecks
                 -> Finalize each transaction
```

Reviewed mempool RPC behavior also includes experimental package submission. Package policy needs deeper review before MoreBC2 makes service-provider recommendations.

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

## Mempool inspection and persistence RPCs

Reviewed mempool RPC behavior includes commands for:

- Listing raw mempool entries.
- Reading a single mempool entry.
- Reading ancestors or descendants.
- Checking whether supplied prevouts are spent by mempool transactions.
- Reading mempool summary state.
- Saving or importing mempool state.
- Hidden orphan-transaction inspection.

Mempool persistence and orphan/package commands should remain advanced documentation topics until tested and reviewed more deeply.

## Consistency and locking

The source comments document two major guarantees:

- Locking both `cs_main` and `mempool.cs` gives a mempool view consistent with the current chain tip and fully populated after reorg processing.
- Locking only `mempool.cs` gives a mempool view consistent with some chain active since `cs_main` was last locked.

Adding transactions and changing the chain tip require both locks until consistency is restored.

## What is not fully reviewed yet

- Public `AcceptToMemoryPool` wrappers and caller paths.
- Replacement-policy helper functions.
- Full package policy behavior.
- Fee estimation interaction.
- Functional tests for mempool acceptance.
- Tested RPC examples for dry-run acceptance, live submission, and mempool inspection.

## Related pages

- [Source atlas: mempool accept](../developers/source-atlas/mempool-accept.md)
- [Source atlas: txmempool](../developers/source-atlas/txmempool.md)
- [Mempool entry](../developers/source-atlas/mempool-entry.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)
- [Source atlas: raw transaction RPC](../developers/source-atlas/rpc-rawtransaction.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Disconnected transactions](../developers/source-atlas/disconnected-transactions.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Reorganizations](../encyclopedia/reorganizations.md)

## Sources

- `src/validation.cpp`
- `src/txmempool.h`
- `src/txmempool.cpp`
- `src/kernel/mempool_entry.h`
- `src/rpc/mempool.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass mempool architecture, transaction-acceptance, and mempool-RPC map. It should be expanded after deeper review of public caller paths, replacement policy, tests, and local RPC examples.
