# `src/validation.cpp`

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Purpose

`validation.cpp` contains major block, transaction, header, and chainstate validation logic for BitcoinII Core.

This page begins the Source Audit II review. It focuses only on the parts of `validation.cpp` reviewed so far.

## File header notes

The file header states that BitcoinII was forked from Bitcoin Core version `0.27.0` and is distributed under the MIT software license.

## Includes worth noting

The file includes validation, consensus, block storage, mempool, policy, proof-of-work, block primitives, transaction primitives, script, chainstate, and notification headers.

This makes it a central implementation file for block validation, transaction validation, mempool handling, chainstate updates, and best-chain activation.

## Reviewed validation flow anchors

### `CheckBlockHeader`

Reviewed behavior:

- Calls `CheckProofOfWork(block.GetHash(), block.nBits, consensusParams)` when proof-of-work checking is enabled.
- Returns `BLOCK_INVALID_HEADER` with reason `high-hash` if proof-of-work fails.
- Otherwise returns true.

### `CheckMerkleRoot`

Reviewed behavior:

- Calculates the block merkle root with `BlockMerkleRoot`.
- Rejects the block as mutated if the header merkle root does not match.
- Rejects duplicate-transaction merkle malleability cases.
- Caches successful merkle-root checking on the block object.

### `CheckWitnessMalleation`

Reviewed behavior:

- If a witness commitment is expected, it checks the coinbase witness reserved value and witness commitment.
- Rejects invalid witness reserved value size.
- Rejects witness merkle commitment mismatch.
- If a witness commitment is not expected, it rejects unexpected witness data.

### `CheckBlock`

Reviewed behavior:

- Performs context-free block validation checks.
- Calls `CheckBlockHeader`.
- Checks signet block solution when signet rules apply.
- Checks merkle root when requested.
- Checks block size and weight limits.
- Requires the first transaction to be coinbase.
- Rejects additional coinbase transactions after the first transaction.
- Calls `CheckTransaction` for every transaction.
- Counts legacy signature operations and rejects blocks over the sigops limit.
- Marks the block as checked when proof-of-work and merkle-root checks were both performed.

### `ContextualCheckBlockHeader`

Reviewed behavior:

- Performs context-dependent header checks using previous block headers.
- Checks that `block.nBits` equals `GetNextWorkRequired(...)`.
- Checks checkpoint restrictions when checkpoints are enabled.
- Rejects timestamps not greater than the previous median time past.
- Rejects timestamps too far in the future.
- Rejects outdated block versions after relevant deployments are active.

### `ContextualCheckBlock`

Reviewed behavior:

- Performs context-dependent block checks that do not use the UTXO set.
- Enforces BIP113 median-time-past locktime behavior when CSV is active.
- Checks that all transactions are final.
- Enforces coinbase height commitment after the relevant deployment is active.
- Validates witness commitments when SegWit is active.
- Checks final block weight after witness commitment validation.

### `ConnectBlock`

Reviewed behavior:

- Applies the effects of a block to the UTXO set represented by a coins view.
- Performs UTXO-dependent validity checks.
- Re-runs `CheckBlock` before connecting the block.
- Verifies that the coins view best block matches the block's previous hash.
- Special-cases the genesis block by setting best block and skipping transaction connection.
- Uses assumed-valid logic to determine whether script checks may be skipped for sufficiently buried assumed-valid history.
- Enforces BIP30 duplicate-transaction-output protection where applicable.
- Enables BIP68 sequence lock checking when CSV is active.
- Gets block script verification flags from `GetBlockScriptFlags`.
- Builds undo data for non-coinbase transactions.
- Calls `Consensus::CheckTxInputs` for non-coinbase transactions.
- Accumulates transaction fees and checks fee range with `MoneyRange`.
- Checks BIP68 sequence locks using previous output heights.
- Counts signature operation cost with `GetTransactionSigOpCost`.
- Runs input script checks with `CheckInputScripts` when script checking is enabled.
- Updates the coins view with `UpdateCoins`.
- Checks the coinbase output value against fees plus block subsidy.
- Waits for queued script checks to complete.
- Writes undo data when not in just-check mode.
- Raises block validity to `BLOCK_VALID_SCRIPTS` when appropriate.
- Sets the coins view best block to the connected block hash.

### `ApplyTxInUndo`

Reviewed behavior:

- Restores a spent coin at a specific previous output.
- Marks the disconnect as unclean if restoring would overwrite an existing unspent output.
- Handles older undo metadata cases by looking up alternate transaction output metadata.
- Returns failed if missing undo metadata cannot be recovered.
- Adds the restored coin back to the coins view.
- Returns `DISCONNECT_OK` or `DISCONNECT_UNCLEAN` depending on whether the restore was clean.

### `DisconnectBlock`

Reviewed behavior:

- Reads block undo data from disk.
- Fails if undo data cannot be read.
- Fails if undo transaction count is inconsistent with the block transaction count.
- Applies BIP30 duplicate-transaction-output exception logic for historical duplicate coinbase cases.
- Walks block transactions in reverse order.
- Spends each output created by the block from the coins view.
- Checks that removed outputs match the transaction outputs, block height, and coinbase status.
- Marks the disconnect as unclean on output mismatch, except for the configured BIP30 exception cases.
- Restores non-coinbase transaction inputs using undo data.
- Fails if transaction undo record sizes do not match transaction input counts.
- Calls `ApplyTxInUndo` for each restored input in reverse input order.
- Sets the coins view best block to the disconnected block's previous block hash.
- Returns `DISCONNECT_OK`, `DISCONNECT_UNCLEAN`, or `DISCONNECT_FAILED`.

### `DisconnectTip`

Reviewed behavior:

- Requires `cs_main` and, when present, the mempool lock.
- Reads the current chain tip block from disk.
- Creates a coins-view cache over the current coins tip.
- Verifies that the coins view best block is the tip being disconnected.
- Calls `DisconnectBlock` to roll back the tip's UTXO effects.
- Flushes the coins-view cache after a successful disconnect.
- Moves prune locks backward when needed so they have a chance to reorg.
- Calls `FlushStateToDisk` with `FlushStateMode::IF_NEEDED`.
- Adds disconnected block transactions to the disconnected-transaction pool when available.
- Removes evicted disconnected transactions and descendants from the mempool when disconnected-pool limits are exceeded.
- Sets the active chain tip to the disconnected block's previous block.
- Calls `UpdateTip` on the previous block.
- Emits `BlockDisconnected` signals so wallets can learn that transactions moved from confirmed to unconfirmed or conflicted.

### `MaybeUpdateMempoolForReorg`

Reviewed behavior:

- Returns immediately if no mempool is attached to the chainstate.
- Requires `cs_main` and the mempool lock.
- Drains the disconnected-transaction pool with `disconnectpool.take()`.
- Iterates disconnected transactions in reverse queue order so earlier previously-confirmed transactions are processed first.
- If re-adding is disabled, removes the transaction and descendants from the mempool using reorg removal reason.
- Skips coinbase transactions.
- Attempts to re-add eligible disconnected transactions to the mempool using `AcceptToMemoryPool` with `bypass_limits=true` and `test_accept=false`.
- Ignores validation errors for resurrected transactions.
- Removes failed resurrected transactions and descendants from the mempool.
- Records successfully re-added transaction hashes for later descendant cleanup.
- Calls `UpdateTransactionsFromBlock` so descendants of re-added transactions have corrected mempool state.
- Removes transactions that are no longer final for the next block on the new chain.
- Recalculates and updates lock points when cached lock points are no longer valid.
- Removes transactions spending immature coinbase outputs after the reorg.
- Calls `removeForReorg` with the finality/maturity filter.
- Calls `LimitMempoolSize` after reorg processing.

### `ConnectTip`

Reviewed behavior:

- Requires the new block index to build on the current chain tip.
- Reads the block from disk unless a cached block pointer is provided.
- Creates a coins-view cache over the current coins tip.
- Calls `ConnectBlock`.
- Emits `BlockChecked` validation signals.
- Flushes the coins-view cache after a successful connection.
- Calls `FlushStateToDisk` with `FlushStateMode::IF_NEEDED`.
- Removes transactions confirmed by the connected block from the mempool.
- Removes confirmed transactions from the disconnected-transaction pool.
- Sets the active chain tip to the new block.
- Calls `UpdateTip`.
- Adds the connected block to `connectTrace`.

### `FindMostWorkChain`

Reviewed behavior:

- Selects the candidate tip with the most work from `setBlockIndexCandidates`.
- Walks backward from that candidate until reaching the active chain.
- Rejects candidate chains with failed blocks.
- Rejects candidate chains missing block data.
- Tracks best invalid chain work when a failed chain has more work.
- Re-adds missing-data descendants to `m_blocks_unlinked`.
- Returns a candidate only when its path is usable.

### `ActivateBestChainStep`

Reviewed behavior:

- Finds the fork point between the current active chain and the most-work candidate.
- Disconnects active blocks until the active tip reaches the fork point.
- Uses `DisconnectTip` during disconnection.
- Updates the mempool after failed disconnect attempts to keep it consistent.
- Treats failure to disconnect during normal operation as fatal.
- Builds a list of new blocks to connect toward the most-work candidate.
- Connects blocks with `ConnectTip`.
- Marks invalid chains when connection fails due to consensus invalidity.
- Updates the mempool after any blocks were disconnected.
- Checks the mempool against the resulting chain tip.
- Checks fork warning conditions.

### `ActivateBestChain`

Reviewed behavior:

- Uses `m_chainstate_mutex` so only one caller executes activation at a time.
- Refuses to operate if the chainstate is disabled.
- Drains/limits the validation-interface queue to avoid callback buildup.
- Locks `cs_main` and the mempool while connecting blocks.
- Calls `FindMostWorkChain` when no cached most-work candidate is available.
- Calls `ActivateBestChainStep` to make progress toward the best candidate.
- Clears the cached candidate when an invalid block is found.
- Emits `BlockConnected` signals from the connect trace.
- Emits `UpdatedBlockTip` and block-tip notifications for active-chain tip changes.
- Handles initial-block-download exit cache rebalancing.
- Stops if the chainstate becomes disabled, such as when background snapshot validation completes.
- Calls `CheckBlockIndex` after activation loop completion.
- Calls `FlushStateToDisk` with `FlushStateMode::PERIODIC`.

### `InvalidateBlock`

Reviewed behavior:

- Does not allow invalidating the genesis block.
- Prevents `ActivateBestChain` from running at the same time by taking the chainstate mutex.
- Disconnects blocks from the active chain when needed.
- Calls `DisconnectTip` while walking back from the current tip.
- Uses `MaybeUpdateMempoolForReorg` after disconnecting blocks.
- Marks disconnected blocks invalid with `BLOCK_FAILED_VALID` or `BLOCK_FAILED_CHILD` as appropriate.
- Updates candidate sets so alternate equal-or-more-work blocks can be considered.
- Records failed blocks in `m_failed_blocks`.
- Calls `InvalidChainFound` for the marked invalid chain.
- Emits block-tip notification if the active chain changed.

### `ResetBlockFailureFlags`

Reviewed behavior:

- Removes invalidity flags from a block and its descendants.
- Removes invalidity flags from ancestors too.
- Re-adds valid candidates when appropriate.
- Clears `m_best_invalid` if it pointed at a reset block.
- Removes reset blocks from `m_failed_blocks`.

### `TryAddBlockIndexCandidate`

Reviewed behavior:

- Adds a block index candidate only if it is not worse than the current tip.
- Always allows the active chainstate to add entries with more work than the tip.
- For background chainstate, only considers blocks toward the snapshot base while not disabled.

### `ReceivedBlockTransactions`

Reviewed behavior:

- Marks a block as having transaction data.
- Records block file position and data position.
- Adds witness-data status when SegWit is active for that block.
- Raises validity to `BLOCK_VALID_TRANSACTIONS`.
- Recursively processes descendant blocks that may now be eligible for candidate consideration.
- Calls `TryAddBlockIndexCandidate` for eligible blocks across chainstates.

### `GetBlockScriptFlags`

Reviewed behavior:

- Starts with P2SH, witness, and taproot verification flags.
- Applies script-flag exceptions from consensus parameters when present.
- Adds DERSIG when that deployment is active.
- Adds CHECKLOCKTIMEVERIFY when CLTV is active.
- Adds CHECKSEQUENCEVERIFY when CSV is active.
- Adds NULLDUMMY when SegWit is active.

### `AcceptBlockHeader`

Reviewed behavior:

- Rejects duplicate known invalid headers.
- Calls `CheckBlockHeader` for non-genesis headers.
- Requires the previous block header to be known.
- Rejects headers building on invalid previous blocks.
- Calls `ContextualCheckBlockHeader`.
- Checks whether the header descends from known failed blocks.
- Requires anti-DoS proof-of-work validation before adding a new block header to the block index.
- Adds valid headers to the block index.

### `ProcessNewBlockHeaders`

Reviewed behavior:

- Processes a vector of headers by calling `AcceptBlockHeader` for each header.
- Calls `CheckBlockIndex()` after each accepted header.
- Notifies header-tip changes after processing.

### `AcceptBlock`

Reviewed behavior:

- Calls `AcceptBlockHeader` first.
- Avoids re-processing blocks that already have data.
- Applies anti-DoS logic for unrequested blocks, including less-work and too-far-ahead blocks.
- Calls `CheckBlock` and `ContextualCheckBlock` before saving a new block.
- Marks invalid block indexes when validation fails.
- Saves valid block data to disk.
- Calls `ReceivedBlockTransactions` after saving.
- Flushes state to disk in `FlushStateMode::NONE`.

### `ProcessNewBlock`

Reviewed behavior:

- Calls `CheckBlock` under `cs_main` because `CBlock::fChecked` can cause data races.
- Calls `AcceptBlock` when `CheckBlock` succeeds.
- Reports failed block checks through validation signals.
- Calls `NotifyHeaderTip`.
- Calls `ActivateBestChain` on the active chainstate.
- Also activates the background chainstate when background sync is in progress.

### `TestBlockValidity`

Reviewed behavior:

- Creates a temporary block index and coin view.
- Calls `ContextualCheckBlockHeader`.
- Calls `CheckBlock`.
- Calls `ContextualCheckBlock`.
- Calls `ConnectBlock`.
- Used as a validity test without directly making the block the active chain tip.

## High-level reviewed block path

Based on the reviewed code, a simplified full-block path is:

```text
ProcessNewBlock
  -> CheckBlock
  -> AcceptBlock
       -> AcceptBlockHeader
            -> CheckBlockHeader
            -> ContextualCheckBlockHeader
       -> CheckBlock
       -> ContextualCheckBlock
       -> save block to disk
       -> ReceivedBlockTransactions
  -> ActivateBestChain
       -> FindMostWorkChain
       -> ActivateBestChainStep
            -> DisconnectTip, if needed
            -> DisconnectBlock
                 -> ApplyTxInUndo
            -> ConnectTip
                 -> ConnectBlock
```

## High-level reviewed reorg path

Based on the reviewed code, a simplified reorganization path is:

```text
ActivateBestChain
  -> FindMostWorkChain
  -> ActivateBestChainStep
       -> find fork point
       -> DisconnectTip until active tip reaches fork point
            -> DisconnectBlock
                 -> spend outputs created by disconnected block
                 -> restore spent inputs from undo data
                 -> move coins view best block backward
       -> ConnectTip new branch blocks
       -> MaybeUpdateMempoolForReorg
            -> drain disconnected transaction pool
            -> re-add eligible non-coinbase transactions
            -> remove invalid/non-final/immature descendants
            -> re-limit mempool size
```

This diagram is intentionally simplified. MoreBC2 still needs a broader mempool policy review before making operator recommendations.

## Related MoreBC2 pages

- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Checkpoints](../../documentation/checkpoints.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)
- [Disconnected transactions](disconnected-transactions.md)

## Open questions

- Review `validation.h` for public declarations and comments.
- Review broader mempool policy before making service-provider recommendations.
- Confirm whether any BitcoinII-specific validation behavior differs from Bitcoin Core beyond visible naming and parameter changes.
- Decide whether validation should be split into separate atlas pages later.

## Sources

- `src/validation.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/validation.cpp
- `src/validation.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/validation.h
- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp
- `src/kernel/disconnected_transactions.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/disconnected_transactions.h
- `src/kernel/disconnected_transactions.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/disconnected_transactions.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a partial source audit of validation flow anchors, `ConnectBlock`, `DisconnectBlock`, best-chain activation, and mempool reorg handling. It should not be treated as a complete mempool policy review yet.
