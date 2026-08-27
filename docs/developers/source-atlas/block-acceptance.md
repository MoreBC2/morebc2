# Block acceptance pipeline

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Purpose

This page documents the reviewed BitcoinII Core path for accepting blocks into local node state.

It connects the previously reviewed validation, proof-of-work, chainstate, block index, disk storage, and best-chain activation notes into one source-backed block lifecycle map.

## Main source files

- `src/validation.cpp`
- `src/validation.h`
- `src/pow.cpp`
- `src/kernel/chainparams.cpp`

## High-level flow

```text
Network / disk / caller
    -> ProcessNewBlock or ProcessNewBlockHeaders
        -> AcceptBlockHeader
            -> CheckBlockHeader
            -> ContextualCheckBlockHeader
        -> AcceptBlock
            -> CheckBlock
            -> ContextualCheckBlock
            -> SaveBlockToDisk
            -> ReceivedBlockTransactions
        -> ActivateBestChain
            -> FindMostWorkChain
            -> ActivateBestChainStep
            -> ConnectTip
            -> ConnectBlock
            -> UpdateTip
```

This is simplified. The actual implementation includes locking, cached block pointers, anti-DoS checks, reorg handling, pruning behavior, disk flushing, and validation-interface notifications.

## Responsibility table

| Function | Reviewed responsibility |
|---|---|
| `ProcessNewBlockHeaders` | Processes incoming headers and passes each one to `AcceptBlockHeader` |
| `ProcessNewBlock` | Public full-block processing entry point; checks block, accepts/stores block, then activates best chain |
| `AcceptBlockHeader` | Validates and indexes headers after proof-of-work and contextual header checks |
| `AcceptBlock` | Accepts a full block for storage after block and contextual checks |
| `ReceivedBlockTransactions` | Marks block data as received and makes eligible block indexes candidates for chain connection |
| `FindMostWorkChain` | Selects a usable highest-work candidate chain |
| `ActivateBestChainStep` | Disconnects old tip blocks when needed and connects candidate blocks |
| `ConnectTip` | Connects one block to the active chain tip |
| `ConnectBlock` | Applies block effects to the UTXO set and runs UTXO/script-dependent checks |

## `ProcessNewBlockHeaders`

Reviewed behavior:

- Processes a vector of block headers.
- Calls `AcceptBlockHeader` for each header.
- Calls `CheckBlockIndex()` after accepted headers.
- Notifies header-tip changes after processing.
- Uses `min_pow_checked` to indicate whether anti-DoS proof-of-work checks have already been done by the caller for the headers chain.

## `ProcessNewBlock`

Reviewed behavior:

- Is a public incoming-block processing path.
- Calls `CheckBlock` under `cs_main` because `CBlock::fChecked` can otherwise cause data races.
- Calls `AcceptBlock` if context-free block checks pass.
- Reports failed block checks through validation signals.
- Calls `NotifyHeaderTip`.
- Calls `ActivateBestChain` on the active chainstate.
- Also activates the background chainstate when background sync is in progress.
- Does not guarantee the specific supplied block becomes active; it guarantees the best known valid block is made active if processing succeeds.

## `AcceptBlockHeader`

Reviewed behavior:

- Rejects duplicate known invalid headers.
- Calls `CheckBlockHeader` for non-genesis headers.
- Requires the previous block header to be known.
- Rejects headers that build on invalid previous blocks.
- Calls `ContextualCheckBlockHeader`.
- Checks whether the header descends from known failed blocks.
- Requires anti-DoS proof-of-work validation before adding a new header to permanent block-index memory.
- Adds valid headers to the block index.

## Header checks

### `CheckBlockHeader`

Reviewed behavior:

- Calls `CheckProofOfWork(block.GetHash(), block.nBits, consensusParams)` when proof-of-work checking is enabled.
- Rejects the header with reason `high-hash` if proof-of-work fails.

### `ContextualCheckBlockHeader`

Reviewed behavior:

- Checks that `block.nBits` equals `GetNextWorkRequired(...)`.
- Applies checkpoint restrictions when checkpoints are enabled.
- Rejects timestamps not greater than previous median time past.
- Rejects timestamps too far in the future.
- Rejects outdated block versions after relevant deployments are active.

## `AcceptBlock`

Reviewed behavior:

- Calls `AcceptBlockHeader` first.
- Avoids re-processing blocks that already have data.
- Applies anti-DoS logic for unrequested blocks, including less-work and too-far-ahead blocks.
- Calls `CheckBlock`.
- Calls `ContextualCheckBlock`.
- Marks invalid block indexes when validation fails.
- Saves valid block data to disk.
- Calls `ReceivedBlockTransactions` after saving.
- Flushes state to disk in `FlushStateMode::NONE`.

## Full block checks before storage

### `CheckBlock`

Reviewed behavior:

- Calls `CheckBlockHeader`.
- Checks signet block solution when signet rules apply.
- Checks merkle root when requested.
- Rejects merkle mutation / duplicate-transaction merkle malleability.
- Checks block size and weight limits.
- Requires the first transaction to be coinbase.
- Rejects additional coinbase transactions after the first transaction.
- Calls `CheckTransaction` for every transaction.
- Counts legacy signature operations and rejects blocks over the sigops limit.
- Marks the block as checked when proof-of-work and merkle-root checks were both performed.

### `ContextualCheckBlock`

Reviewed behavior:

- Applies context-dependent block checks that do not use the UTXO set.
- Enforces BIP113 median-time-past locktime behavior when CSV is active.
- Checks that all transactions are final.
- Enforces coinbase height commitment after the relevant deployment is active.
- Validates witness commitments when SegWit is active.
- Checks final block weight after witness commitment validation.

## `ReceivedBlockTransactions`

Reviewed behavior:

- Marks the block as having transaction data.
- Records block file position and data position.
- Adds witness-data status when SegWit is active for that block.
- Raises validity to `BLOCK_VALID_TRANSACTIONS`.
- Marks the block index dirty for persistence.
- Recursively processes descendant blocks that may now be eligible for connection.
- Calls `TryAddBlockIndexCandidate` for eligible blocks across chainstates.
- Stores blocks with valid parents later through `m_blocks_unlinked` if parent transaction data is not yet available.

## `ActivateBestChain`

Reviewed high-level behavior:

- Ensures only one activation loop runs at a time with the chainstate mutex.
- Drains or limits validation-interface callbacks to avoid callback backlog.
- Locks `cs_main` and mempool while connecting blocks.
- Calls `FindMostWorkChain` when no cached candidate is available.
- Calls `ActivateBestChainStep` to move toward the selected candidate.
- Emits `BlockConnected` signals from the connect trace.
- Emits tip-update notifications when the active chain tip changes.
- Handles initial-block-download exit behavior.
- Calls `CheckBlockIndex` after activation loop completion.
- Periodically flushes state to disk.

## `ConnectTip` and `ConnectBlock`

Reviewed behavior:

- `ConnectTip` requires the new block index to build on the current chain tip.
- `ConnectTip` reads the block from disk unless a cached block pointer is available.
- `ConnectTip` calls `ConnectBlock` with a coins-view cache.
- `ConnectBlock` applies UTXO changes and UTXO-dependent validation.
- `ConnectBlock` checks non-coinbase inputs with `Consensus::CheckTxInputs`.
- `ConnectBlock` runs input script checks when script checking is enabled.
- `ConnectBlock` checks that coinbase output value does not exceed fees plus subsidy.
- `ConnectTip` removes confirmed transactions from the mempool.
- `ConnectTip` sets the active chain tip and calls `UpdateTip`.

## Consensus vs policy note

Block acceptance and block connection are consensus-critical paths.

Mempool acceptance is policy-sensitive: transactions can be rejected from the mempool for policy reasons while still being potentially valid if mined in a block.

This page should not mix mempool policy rules with block consensus rules unless the reviewed source path clearly does so.

## Notifications and callbacks observed

Reviewed paths mention or emit:

- `BlockChecked`
- `BlockConnected`
- `BlockDisconnected`
- `UpdatedBlockTip`
- `NotifyHeaderTip`
- `TransactionAddedToMempool` in transaction acceptance, not block acceptance itself

MoreBC2 should keep notification behavior source-backed because callback ordering matters for wallets, RPC, indexes, and external observers.

## Relationship to disk and block index

Reviewed source shows the block acceptance path updates:

- Block index validity flags.
- Block file/data positions.
- Dirty block-index tracking.
- Disk block storage through block save paths.
- Candidate sets used for best-chain selection.

This page does not yet fully document block file allocation, pruning, or block storage internals.

## Related MoreBC2 pages

- [Source atlas: validation.cpp](validation-cpp.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Checkpoints](../../documentation/checkpoints.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)

## Open questions

- Review block storage internals in detail.
- Review pruning behavior and block-file allocation.
- Review validation-interface callback ordering in detail.
- Review net-processing caller paths for incoming network blocks and headers.
- Review disk import and reindex paths more deeply.
- Decide whether this page should later split into network block acceptance and disk/reindex block acceptance.
- Confirm whether `v29.1.0` differs from current `main` for these paths before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/validation.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.cpp
- Current observed `main` `src/validation.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.h
- Current observed `main` `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/pow.cpp
- Current observed `main` `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page consolidates reviewed block acceptance and activation behavior. It should be expanded after reviewing block storage, pruning, net-processing caller paths, validation-interface callbacks, and release-versus-main differences.
