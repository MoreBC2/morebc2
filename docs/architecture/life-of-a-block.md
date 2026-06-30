# Life of a block

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page explains the reviewed BitcoinII block lifecycle at a high level.

It connects block header validation, full block checks, disk storage, block-index updates, best-chain activation, UTXO connection, undo-data creation, and validation notifications.

## Simplified lifecycle

```text
Miner / peer / disk import
  -> block arrives at node
  -> header is checked
  -> full block is checked
  -> contextual checks run
  -> block data is stored in blk files
  -> block index and file metadata are updated
  -> best-chain candidate is selected
  -> block is connected if it belongs on best chain
  -> undo data is written for disconnect safety
  -> UTXO set is updated
  -> active tip changes
  -> validation notifications are emitted
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
- Operation-count limit checks.

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

## Step 7: Block storage details

The reviewed block-storage layer writes serialized blocks to `blk` files and tracks their positions through block-index metadata.

Reviewed storage behavior includes:

- `BlockManager::WriteBlock` choosing a flat-file position.
- Writing message-start bytes and serialized block size before the block payload.
- Writing the block with witness data.
- Updating block-file statistics and dirty-file metadata.
- Maintaining block-file cursors.
- Supporting reindex and imported block files through `ImportBlocks`.

The block-storage layer is not the same as validation. It gives validation durable data to read later.

## Step 8: Best-chain selection

`ActivateBestChain` and related functions choose the best usable chain.

Reviewed behavior includes:

- Selecting a most-work candidate through `FindMostWorkChain`.
- Finding the fork point between active chain and candidate chain.
- Disconnecting old active blocks if needed.
- Connecting candidate blocks with `ConnectTip`.

## Step 9: UTXO connection

`ConnectTip` calls `ConnectBlock`.

Reviewed `ConnectBlock` behavior includes:

- Checking the coins-view best block.
- Checking transaction inputs with `Consensus::CheckTxInputs`.
- Building undo data.
- Accumulating fees.
- Checking sequence locks.
- Counting operation cost.
- Running input verification checks when enabled.
- Updating the coins view.
- Checking that coinbase output value does not exceed fees plus subsidy.
- Setting the coins view best block to the connected block.

## Step 10: Undo data

When a block is connected, the node records undo data so the block can later be disconnected if a reorganization happens.

Reviewed storage behavior includes:

- Writing undo data to `rev` files.
- Writing message-start bytes and undo-data size.
- Writing a checksum based on the previous block hash and undo data.
- Updating the block index with undo position and undo-availability status.

Undo data is what lets the node reverse a connected block without guessing how the UTXO set used to look.

## Step 11: Tip update and notifications

When a block is connected as the active tip, reviewed paths call or emit:

- `UpdateTip`
- `BlockConnected`
- `UpdatedBlockTip`
- Header-tip notifications

The validation-interface layer delivers block, chain, and mempool events to subscribers such as wallets, indexes, and other observers.

Important ordering caveat:

A single subscriber receives callbacks in generated order, but no ordering should be assumed across different subscribers.

## Step 12: Confirmations

A block on the active best chain confirms its included transactions.

Every later block built on top of that block increases the confirmation depth of the earlier block and its transactions.

## Reorg note

A block can later be disconnected if a competing higher-work chain becomes active.

That is covered in [Life of a reorganization](life-of-a-reorg.md).

## What is not fully reviewed yet

- Mining/block-template construction.
- Network block relay caller paths.
- Local block submission path.
- Full undo-read behavior.
- Full pruning failure and recovery behavior.
- Wallet/index subscriber behavior after notifications.

## Related pages

- [Block validation flow](block-validation-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)
- [Source atlas: block storage](../developers/source-atlas/block-storage.md)
- [Source atlas: validation interface](../developers/source-atlas/validation-interface.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This explainer is based on reviewed block acceptance, validation, best-chain activation, UTXO connection, block-storage, undo-writing, and validation-interface notes. Mining, P2P, local submission, and wallet/index subscriber behavior need deeper review.
