# Block storage

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core block-index persistence, block/undo files, pruning bookkeeping, raw block reads, reindex/import support, and related storage state centered on `src/node/blockstorage.*`.

The broad storage architecture remains Bitcoin-style in the reviewed `v31.1.0` baseline. September runtime evidence now adds a bounded current-release observation: the disposable Windows mainnet node started unpruned with no optional indexes, retained chain state across clean shutdown/restart, and continued IBD. That does not qualify pruning/reindex failure paths or assumeutxo/snapshot storage workflows.

## Key reviewed roles

The block-storage layer covers:

- block-index database persistence;
- serialized block (`blk`) and undo (`rev`) files;
- block-file cursor/statistics bookkeeping;
- proof-of-work checks while loading stored block/index data;
- prune state and file unlinking;
- reindex/import state;
- support for validation/reorg paths that require block and undo data.

Important classes/helpers include `kernel::BlockTreeDB`, `node::BlockManager`, `BlockfileCursor`, block/undo read/write helpers, prune helpers, and `ImportBlocks`.

## Block index loading

Reviewed storage/index load behavior reconstructs in-memory block-index entries from disk, including previous pointers, height, file positions, header fields, status, and transaction counts, then derives chain work and related indexes/state.

This storage layer supplies data to validation; it does not independently decide the active chain. Best-chain selection remains in validation/chainstate logic and is based on accumulated valid work.

## Block and undo files

Reviewed behavior includes:

- selecting block-file positions;
- serializing message-start bytes, size, and block payload;
- reading/deserializing blocks and checking proof of work / expected hash where applicable;
- writing undo data with previous-block context/checksum;
- retaining undo positions/status so chainstate can disconnect blocks during reorgs.

Undo data is operationally important for reorganization handling and must not be described as optional history if a node still needs it for its retained reorg window.

## Pruning

Source review covers both automatic and manual prune bookkeeping: eligible old block/undo files can be selected, block-index availability flags updated, persistent prune state recorded, and files unlinked.

Important current configuration boundary:

- pruning is disabled by default in current MoreBC2 v31 evidence;
- `txindex` is also disabled by default;
- pruning and `txindex` are incompatible in the current node configuration path;
- changing from a pruned state back to a full historical block store requires reindex/redownload behavior according to the reviewed source/configuration guidance.

The September 11 v31 node test observed `pruned=false` and no optional indexes. It did **not** execute manual pruning or a pruned-node reindex/recovery cycle.

## Reindex and import

`ImportBlocks` and related state support reindex and external block-file import paths. The reviewed structure includes ordered block-file scanning, persistent reindex state, block import, and best-chain activation afterward.

MoreBC2 has not runtime-qualified `-reindex`, `-reindex-chainstate`, `-loadblock`, corrupted-index recovery, or prune-to-unpruned recovery on `v31.1.0`.

## v31 consensus boundary

Storage is not where ShockWave, replay protection, or data restrictions are defined. Stored blocks/headers/undo state are consumed by validation paths that enforce those current rules.

A block being present on disk does not imply it is active or consensus-valid. Likewise, a stored alternate branch can exist while best-chain selection remains determined by valid accumulated chain work.

## Runtime evidence — 2026-09-11

The isolated Windows `v31.1.0` mainnet test observed:

- fresh disposable chain/data state;
- unpruned default state;
- no optional indexes enabled;
- advancing block validation during IBD;
- clean shutdown;
- restart using retained disposable chain state.

This is current-release corroboration of ordinary storage persistence. It is not a stress, corruption-recovery, pruning, or reindex test.

## Related pages

- [Block acceptance](block-acceptance.md)
- [validation.cpp](validation-cpp.md)
- [Disconnected transactions](disconnected-transactions.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)
- [Node configuration](../../configuration/node-configuration.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Release-pinned review/testing of `ReadBlockUndo` failure behavior.
- Disposable prune/reindex/recovery vectors.
- Corrupt/missing block-index/file operator recovery guidance.
- Assumeutxo/snapshot storage qualification if MoreBC2 later documents that workflow.
- Relevant unit/functional test execution after a clean v31 source build.

## Primary sources

Pinned/current review scope:

- `v31.1.0/src/node/blockstorage.h`
- `v31.1.0/src/node/blockstorage.cpp`
- `v31.1.0/src/validation.cpp`
- `v31.1.0/src/undo.h`
- `v31.1.0/src/flatfile.h`
- `v31.1.0/src/kernel/blockmanager_opts.h`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` block-storage source plus bounded September 11 persistent disposable-node runtime evidence  
**Notes:** Ordinary storage structure and retained-state restart behavior are current. Pruning, reindex, corruption recovery, and snapshot storage remain untested.
