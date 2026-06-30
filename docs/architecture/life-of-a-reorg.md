# Life of a reorganization

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page explains the reviewed BitcoinII chain reorganization lifecycle at a high level.

A reorganization happens when the node switches from one active chain branch to another usable branch with more work.

The reviewed path connects candidate selection, old-branch rollback, stored undo data, disconnected-transaction handling, new-branch connection, mempool repair, storage state, and validation notifications.

## Simplified lifecycle

```text
Competing chain appears
  -> node finds most-work candidate
  -> fork point is found
  -> old active blocks roll back
  -> undo data restores previous UTXO state
  -> disconnected transactions are held temporarily
  -> new branch blocks connect
  -> storage state supports the switch
  -> eligible old-branch transactions are reconsidered for mempool
  -> active tip changes
  -> validation notifications are emitted
```

## Step 1: Competing chain appears

A node may learn about a competing branch through headers and blocks.

The branch does not become active merely because it exists. It must be usable and have enough work to become the best-chain candidate.

## Step 2: Candidate selection

Reviewed `FindMostWorkChain` behavior includes:

- Selecting a candidate tip from `setBlockIndexCandidates`.
- Preferring the candidate with the most work.
- Rejecting candidate chains with failed blocks.
- Rejecting candidate chains missing required block data.
- Returning a usable candidate when one is found.

Block storage matters here because candidate chains may be known by header but unusable if required block data is not locally available.

## Step 3: Fork point

`ActivateBestChainStep` finds the fork point between the current active chain and the candidate chain.

The fork point is the last shared block before the two branches diverge.

## Step 4: Roll back old active blocks

If the active tip is past the fork point, the node rolls back active blocks until it reaches the fork point.

Reviewed `DisconnectTip` behavior includes:

- Reading the current tip block from disk.
- Creating a coins-view cache.
- Calling `DisconnectBlock`.
- Moving the active chain tip backward.
- Adding disconnected block transactions to the disconnected-transaction pool when available.
- Emitting `BlockDisconnected` signals.

## Step 5: Restore earlier UTXO state

Reviewed `DisconnectBlock` behavior includes:

- Reading undo data from disk.
- Walking transactions in reverse order.
- Removing outputs created by the rolled-back block.
- Restoring previously spent inputs from undo data.
- Moving the coins view best block backward.
- Returning clean, unclean, or failed status.

Undo data is what allows the node to reverse a previously connected block.

## Step 6: Storage support during reorgs

The reviewed block-storage layer supports reorg handling by keeping:

- Serialized block data in `blk` files.
- Undo data in `rev` files.
- Block-index metadata with file positions and availability flags.
- Pruning state that can affect whether older block data is still available.

During rollback, validation needs block and undo data from storage.

## Step 7: Hold disconnected transactions

Transactions from disconnected blocks may still be valid on the new chain.

Reviewed `DisconnectedBlockTransactions` behavior includes:

- Temporarily storing transactions from disconnected blocks.
- Keeping a queue with memory limits.
- Removing entries when they are included again in newly connected blocks.
- Providing the transaction list for later mempool reprocessing.

## Step 8: Connect the new branch

After reaching the fork point, `ActivateBestChainStep` connects blocks from the candidate branch.

Reviewed behavior includes:

- Building a list of blocks to connect.
- Calling `ConnectTip` for each block.
- Calling `ConnectBlock` through `ConnectTip`.
- Marking chains invalid if block connection fails due to consensus invalidity.

When new branch blocks connect, they may remove transactions from the disconnected-transaction pool if those transactions are included again.

## Step 9: Reprocess old-branch transactions

After rollback and reconnection, reviewed `MaybeUpdateMempoolForReorg` behavior includes:

- Draining the disconnected transaction pool.
- Processing transactions in reverse queue order so earlier previously-confirmed transactions are considered first.
- Skipping coinbase transactions.
- Attempting to re-add eligible transactions through mempool acceptance.
- Removing failed resurrected transactions and descendants.
- Updating descendants of successfully re-added transactions.
- Removing transactions that are no longer final.
- Recalculating invalidated lock points when possible.
- Removing transactions that spend immature coinbase outputs.
- Re-limiting mempool size.

## Step 10: New active tip

After successful connection, the active chain tip points to the candidate branch.

Reviewed paths emit or call:

- `UpdateTip`
- `BlockDisconnected`
- `BlockConnected`
- `UpdatedBlockTip`

## Step 11: Notification handoff

The validation-interface layer delivers reorg-related block and mempool events to subscribers.

Reviewed relevant callback types include:

- `BlockDisconnected`
- `BlockConnected`
- `UpdatedBlockTip`
- `TransactionAddedToMempool`
- `TransactionRemovedFromMempool`
- `MempoolTransactionsRemovedForBlock`

Wallets, indexes, UI layers, and services may depend on these notifications, but MoreBC2 has not yet reviewed the subscriber call sites.

Important ordering caveat:

A single subscriber receives callbacks in generated order, but no ordering should be assumed across different subscribers.

## Why reorgs matter

Reorgs are a normal part of Nakamoto-style proof-of-work consensus.

They are the mechanism by which nodes converge on the most-work valid chain when multiple competing branches exist.

## User-facing meaning

During a reorg:

- A transaction that was confirmed can become unconfirmed.
- A transaction may return to the mempool if it is still valid.
- A transaction may be confirmed again on the new branch.
- A transaction may leave the mempool if it is no longer valid under the new active chain.
- Wallet or explorer display may update after validation-interface subscribers process the relevant callbacks.

## What is not fully reviewed yet

- P2P conditions that cause competing branches to be learned.
- Wallet-specific reorg handling.
- Index-specific reorg behavior.
- Full validation-interface subscriber behavior.
- Full undo-read failure handling.
- Deep mempool policy beyond reviewed reorg processing.

## Related pages

- [Block validation flow](block-validation-flow.md)
- [Life of a block](life-of-a-block.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Source atlas: block storage](../developers/source-atlas/block-storage.md)
- [Source atlas: validation interface](../developers/source-atlas/validation-interface.md)
- [Disconnected transactions](../developers/source-atlas/disconnected-transactions.md)
- [Mempool flow](mempool-flow.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This explainer is based on reviewed validation, rollback, disconnected-transaction, storage, notification, mempool-reorg, and best-chain activation code paths. Wallet/index/P2P reorg behavior still needs review.
