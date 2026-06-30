# Life of a block

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page explains the reviewed BitcoinII block lifecycle at a high level.

It connects block header validation, full block checks, disk storage, block-index updates, best-chain activation, UTXO connection, and notifications.

## Simplified lifecycle

```text
Miner / peer / disk import
  -> block arrives at node
  -> header is checked
  -> full block is checked
  -> contextual checks run
  -> block data is stored
  -> block index is updated
  -> best-chain candidate is selected
  -> block is connected if it belongs on best chain
  -> UTXO set is updated
  -> active tip changes
```

## Step 1: Block creation

A miner constructs a candidate block and searches for proof-of-work.

MoreBC2 has not yet audited the miner/block-template source, so this page does not describe block construction in detail.

## Step 2: Block arrival

A block may arrive from:

- Network peers.
- Disk import.
- Reindex.
- Local mining submission.

The reviewed general full-block entry point is `ProcessNewBlock`.

## Step 3: Header checks

Headers are handled through `AcceptBlockHeader`.

Reviewed header checks include:

- Proof-of-work check through `CheckProofOfWork`.
- Previous-header lookup.
- Invalid-parent checks.
- Difficulty check through `GetNextWorkRequired`.
- Timestamp checks.
- Checkpoint restrictions when checkpoints are enabled.
- Version checks after relevant deployments are active.

## Step 4: Context-free block checks

`CheckBlock` runs checks that do not require UTXO state.

Reviewed checks include:

- Header proof-of-work path.
- Merkle root check.
- Duplicate-transaction merkle malleability check.
- Block size and weight limits.
- First transaction must be coinbase.
- Later transactions must not be coinbase.
- Per-transaction context-free checks.
- Legacy sigops limit.

## Step 5: Contextual block checks

`ContextualCheckBlock` runs checks that depend on chain context but not the UTXO set.

Reviewed checks include:

- Transaction finality against the next block.
- Coinbase height commitment after activation.
- Witness commitment validation when SegWit is active.
- Final block weight check after witness commitment validation.

## Step 6: Storage and block index update

`AcceptBlock` handles full-block acceptance for storage.

Reviewed behavior includes:

- Calling `AcceptBlockHeader` first.
- Avoiding duplicate block-data processing.
- Running `CheckBlock` and `ContextualCheckBlock`.
- Saving valid block data to disk.
- Calling `ReceivedBlockTransactions`.

`ReceivedBlockTransactions` records block-data status, file position, and transaction count, then makes eligible blocks candidates for chain connection.

## Step 7: Best-chain selection

`ActivateBestChain` and related functions choose the best usable chain.

Reviewed behavior includes:

- Selecting a most-work candidate through `FindMostWorkChain`.
- Finding the fork point between active chain and candidate chain.
- Disconnecting old active blocks if needed.
- Connecting candidate blocks with `ConnectTip`.

## Step 8: UTXO connection

`ConnectTip` calls `ConnectBlock`.

Reviewed `ConnectBlock` behavior includes:

- Checking the coins-view best block.
- Checking transaction inputs with `Consensus::CheckTxInputs`.
- Building undo data.
- Accumulating fees.
- Checking sequence locks.
- Counting sigop cost.
- Running input script checks when enabled.
- Updating the coins view.
- Checking that coinbase output value does not exceed fees plus subsidy.
- Setting the coins view best block to the connected block.

## Step 9: Tip update and notifications

When a block is connected as the active tip, reviewed paths call or emit:

- `UpdateTip`
- `BlockConnected`
- `UpdatedBlockTip`
- Header-tip notifications

Wallets, indexes, RPC observers, and other validation-interface clients can depend on these notifications.

## Step 10: Confirmations

A block on the active best chain confirms its included transactions.

Every later block built on top of that block increases the confirmation depth of the earlier block and its transactions.

## Reorg note

A block can later be disconnected if a competing higher-work chain becomes active.

That is covered in [Life of a reorganization](life-of-a-reorg.md).

## What is not fully reviewed yet

- Mining/block-template construction.
- Network block relay caller paths.
- Block storage internals.
- Pruning internals.
- Validation-interface callback ordering.
- Local block submission path.

## Related pages

- [Block validation flow](block-validation-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This explainer is based on reviewed block acceptance, validation, best-chain activation, and UTXO connection notes. Mining, P2P, storage, and pruning internals need deeper review.
