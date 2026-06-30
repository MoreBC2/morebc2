# Life of a reorganization

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page explains the reviewed BitcoinII chain reorganization lifecycle at a high level.

A reorganization happens when the node switches from one active chain branch to another usable branch with more work.

## Simplified lifecycle

```text
Competing chain appears
  -> node finds most-work candidate
  -> fork point is found
  -> old active blocks disconnect
  -> undo data restores previous UTXO state
  -> new branch blocks connect
  -> eligible old-chain transactions are reconsidered for mempool
  -> active tip changes
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

## Step 3: Fork point

`ActivateBestChainStep` finds the fork point between the current active chain and the candidate chain.

The fork point is the last shared block before the two branches diverge.

## Step 4: Disconnect old active blocks

If the active tip is past the fork point, the node disconnects active blocks until it reaches the fork point.

Reviewed `DisconnectTip` behavior includes:

- Reading the current tip block from disk.
- Creating a coins-view cache.
- Calling `DisconnectBlock`.
- Moving the active chain tip backward.
- Adding disconnected block transactions to the disconnected-transaction pool when available.
- Emitting `BlockDisconnected` signals.

## Step 5: Roll back UTXO effects

Reviewed `DisconnectBlock` behavior includes:

- Reading undo data from disk.
- Walking transactions in reverse order.
- Spending outputs created by the disconnected block.
- Restoring spent inputs from undo data.
- Moving the coins view best block backward.
- Returning clean, unclean, or failed disconnect status.

Undo data is what allows the node to reverse a previously connected block.

## Step 6: Hold disconnected transactions

Transactions from disconnected blocks may still be valid on the new chain.

Reviewed `DisconnectedBlockTransactions` behavior includes:

- Temporarily storing transactions from disconnected blocks.
- Keeping a queue with memory limits.
- Removing entries when they are confirmed again in newly connected blocks.
- Providing the transaction list for later mempool reprocessing.

## Step 7: Connect the new branch

After reaching the fork point, `ActivateBestChainStep` connects blocks from the candidate branch.

Reviewed behavior includes:

- Building a list of blocks to connect.
- Calling `ConnectTip` for each block.
- Calling `ConnectBlock` through `ConnectTip`.
- Marking chains invalid if block connection fails due to consensus invalidity.

## Step 8: Reprocess old-chain transactions

After disconnection/reconnection, reviewed `MaybeUpdateMempoolForReorg` behavior includes:

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

## Step 9: New active tip

After successful connection, the active chain tip points to the candidate branch.

Reviewed paths emit or call:

- `UpdateTip`
- `BlockDisconnected`
- `BlockConnected`
- `UpdatedBlockTip`

## Why reorgs matter

Reorgs are a normal part of Nakamoto-style proof-of-work consensus.

They are the mechanism by which nodes converge on the most-work valid chain when multiple competing branches exist.

## User-facing meaning

During a reorg:

- A transaction that was confirmed can become unconfirmed.
- A transaction may return to the mempool if it is still valid.
- A transaction may be confirmed again on the new branch.
- A transaction may disappear from the mempool if it becomes invalid under the new active chain.

## What is not fully reviewed yet

- P2P conditions that cause competing branches to be learned.
- Wallet-specific reorg handling.
- Index-specific reorg behavior.
- Full validation-interface callback ordering.
- Deep mempool policy beyond reviewed reorg processing.

## Related pages

- [Block validation flow](block-validation-flow.md)
- [Life of a block](life-of-a-block.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Disconnected transactions](../developers/source-atlas/disconnected-transactions.md)
- [Mempool flow](mempool-flow.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This explainer is based on reviewed validation, disconnection, disconnected-transaction, mempool-reorg, and best-chain activation code paths. Wallet/index/P2P reorg behavior still needs review.
