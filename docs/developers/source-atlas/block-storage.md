# Block storage

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/node/blockstorage.h`
- `src/node/blockstorage.cpp`

These files manage block index persistence, block and undo flat files, pruning bookkeeping, block-file cursors, raw block reads, undo reads/writes, and block import/reindex support.

This page is a storage-path map. It is not a full validation review and does not replace the block lifecycle or validation pages.

## Why this file matters

A BitcoinII node needs more than consensus rules. It also needs durable local storage for:

- Known block headers and block-index metadata.
- Serialized block data.
- Undo data used when disconnecting blocks.
- Block-file statistics.
- Pruning state.
- Reindex state.

The block storage layer connects validation to disk.

## Key symbols reviewed

- `kernel::BlockTreeDB`
- `node::BlockManager`
- `BlockMap`
- `BlockfileCursor`
- `BlockfileType`
- `PruneLockInfo`
- `LoadBlockIndex`
- `LoadBlockIndexDB`
- `WriteBlockIndexDB`
- `AddToBlockIndex`
- `InsertBlockIndex`
- `FindNextBlockPos`
- `WriteBlock`
- `ReadBlock`
- `ReadRawBlock`
- `WriteBlockUndo`
- `ReadBlockUndo`
- `FindFilesToPrune`
- `FindFilesToPruneManual`
- `PruneOneBlockFile`
- `UnlinkPrunedFiles`
- `ImportBlocks`

## BlockTreeDB

`kernel::BlockTreeDB` wraps the block index database stored under `blocks/index/`.

Reviewed database key areas include:

- Block file metadata.
- Block index records.
- Boolean flags.
- Reindex flag.
- Last block file number.

Reviewed methods include reading and writing block-file info, reindex state, flags, and batch-synced dirty block index/file metadata.

## Block index loading

`LoadBlockIndexGuts` loads disk block-index entries into memory.

Reviewed behavior includes:

- Iterating block-index records from the database.
- Constructing or finding in-memory `CBlockIndex` entries.
- Restoring previous-block pointers, height, file positions, header fields, status, and transaction count.
- Checking proof-of-work on loaded block-index entries.

`LoadBlockIndex` then calculates chain work, time max, skip pointers, failure-child state, and chain transaction counts where possible.

## BlockManager role

`BlockManager` maintains the block index map and block/undo file bookkeeping.

The header describes it as maintaining a tree of blocks consulted to determine where the most-work tip is.

Important state includes:

- `m_block_index`
- `m_blocks_unlinked`
- `m_block_tree_db`
- `m_blockfile_info`
- `m_blockfile_cursors`
- `m_dirty_blockindex`
- `m_dirty_fileinfo`
- `m_prune_locks`
- `m_have_pruned`
- `m_blockfiles_indexed`
- `m_importing`

## Block file layout constants

Reviewed constants include:

- Block file pre-allocation chunk: 16 MiB.
- Undo file pre-allocation chunk: 1 MiB.
- Maximum block file size: 128 MiB.
- Block serialization header size: message-start bytes plus serialized block size field.
- Undo-data disk overhead: serialization header plus checksum size.

## Block file cursors

`BlockfileCursor` tracks:

- Current block file number.
- Highest block height in that file whose undo data has been written.

The reviewed comments explain that block files are written in download order, while undo files are written in validation order. The cursor helps decide when block and undo files can be trimmed or finalized.

`BlockfileType` separates normal and assumed chainstate block-file regions when assumeutxo-style state is in use.

## Writing blocks

`WriteBlock` serializes a block to disk.

Reviewed behavior:

- Calculates serialized block size with witness data.
- Calls `FindNextBlockPos` to choose a block-file position.
- Opens the block file.
- Writes message-start bytes and block size.
- Writes the serialized block.
- Returns the block position after the serialization header.

`FindNextBlockPos` handles choosing the correct file, rolling to a new file if needed, updating file statistics, allocating disk space, and setting the pruning check flag when new space is allocated in prune mode.

## Reading blocks

`ReadBlock` opens the block file, deserializes the block, and checks the header proof-of-work.

The index-based overload also checks that the read block hash matches the expected block-index hash.

`ReadRawBlock` reads the raw serialized block payload by seeking backward to the block-storage header, verifying message-start bytes, reading the stored size, and then reading the block bytes.

## Undo data

`WriteBlockUndo` writes undo data used to return local state to the prior chain tip when needed.

Reviewed behavior includes:

- Finding or allocating undo-file position.
- Writing message-start bytes and undo size.
- Writing undo data.
- Writing a checksum based on the previous block hash and undo data.
- Updating the block index with undo position and `BLOCK_HAVE_UNDO`.

`ReadBlockUndo` is declared in the header and should receive a deeper follow-up review alongside reorg internals.

## Pruning

Pruning removes old block and undo files while preserving enough data for current operation.

Reviewed pruning behavior includes:

- Manual prune height selection.
- Automatic pruning based on configured prune target.
- Minimum prune range checks from chain manager.
- Avoiding files outside the allowable prune range.
- Removing block and undo file references together.
- Updating block-index status flags by unsetting data and undo availability.
- Recording pruned state in database flags.
- Physically unlinking selected `blk` and `rev` files.

The header notes that changing back from pruned mode to unpruned requires reindexing and redownloading the blockchain.

## Reindex and block import

`ImportBlocks` handles reindex and `-loadblock=` import paths.

Reviewed behavior includes:

- Setting an importing flag while import is active.
- Reindexing block files in order when block files are not indexed.
- Loading external block files.
- Clearing the reindex flag when reindexing finishes.
- Retrying genesis load after reindex.
- Calling best-chain activation after block import/reindex work.

## Relationship to validation and reorg pages

Block storage is not the same as block validation.

Validation decides whether a block can become active.

Block storage provides the durable data that validation and reorg handling need, including serialized blocks and undo data.

Related pages:

- [Life of a block](../../architecture/life-of-a-block.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Source atlas: validation.cpp](validation-cpp.md)
- [Source atlas: block lifecycle](block-acceptance.md)
- [Source atlas: validation interface](validation-interface.md)

## BitcoinII-specific notes

This first-pass review did not identify BitcoinII-specific block-storage behavior beyond project naming, headers, and comments.

The reviewed file structure appears Bitcoin-style, but no upstream comparison has been completed.

## Open questions

- Does BitcoinII differ from upstream Bitcoin Core in block storage, pruning, or reindex behavior?
- Which `ReadBlockUndo` paths should be documented together with reorg follow-up work?
- Which operator-facing pruning behaviors should be moved into node operation docs?
- Which block-storage failures should be explained for troubleshooting users?
- How should assumeutxo-related storage behavior be explained, if at all, for BitcoinII readers?
- Which tests cover block storage and pruning behavior?
- Confirm whether `v29.1.0` differs from current `main` for these files before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/node/blockstorage.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/blockstorage.h
- Current observed `main` `src/node/blockstorage.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/blockstorage.cpp
- Current observed `main` `src/validation.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.cpp
- Current observed `main` `src/undo.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/undo.h
- Current observed `main` `src/flatfile.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/flatfile.h
- Current observed `main` `src/kernel/blockmanager_opts.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/blockmanager_opts.h

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass block-storage review. Full pruning flow, undo-read behavior, failure recovery, tests, upstream comparison, and release-versus-main comparison remain open.
