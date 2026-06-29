# Block validation flow

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page maps the reviewed BitcoinII Core block-validation path from `src/validation.cpp`.

It is intentionally partial. The reviewed path now covers header acceptance, context-free block checks, contextual block checks, UTXO-dependent connection checks in `ConnectBlock`, UTXO rollback in `DisconnectBlock`, best-chain candidate selection, chain activation steps, disk storage, and tip notification paths. It does not yet fully document disconnected-transaction handling or mempool re-add policy.

## Simplified reviewed flow

```text
ProcessNewBlock
  -> CheckBlock
  -> AcceptBlock
       -> AcceptBlockHeader
            -> CheckBlockHeader
            -> ContextualCheckBlockHeader
       -> CheckBlock
       -> ContextualCheckBlock
       -> SaveBlockToDisk
       -> ReceivedBlockTransactions
  -> NotifyHeaderTip
  -> ActivateBestChain
       -> FindMostWorkChain
       -> ActivateBestChainStep
            -> DisconnectTip, if needed
            -> ConnectTip
                 -> ConnectBlock
```

## Simplified reviewed reorg flow

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
            -> update disconnected-transaction pool
            -> move active chain tip backward
       -> ConnectTip new branch blocks
       -> MaybeUpdateMempoolForReorg after disconnections
```

## Entry point reviewed

### `ProcessNewBlock`

`ProcessNewBlock` is a reviewed full-block processing entry point.

Reviewed behavior:

- Acquires `cs_main` before `CheckBlock` because `CBlock::fChecked` can cause data races.
- Calls `CheckBlock`.
- Calls `AcceptBlock` if `CheckBlock` succeeds.
- Signals failed block checks when validation fails.
- Calls `NotifyHeaderTip`.
- Calls `ActivateBestChain` after accepting the block.

## Header path reviewed

### `AcceptBlockHeader`

Reviewed behavior:

- Checks for duplicate headers.
- Calls `CheckBlockHeader` for non-genesis headers.
- Requires the previous block to be known.
- Rejects headers building on invalid previous blocks.
- Calls `ContextualCheckBlockHeader`.
- Checks ancestry against known failed blocks.
- Requires anti-DoS proof-of-work validation before adding a new header.
- Adds accepted headers to the block index.

### `CheckBlockHeader`

Reviewed behavior:

- Calls `CheckProofOfWork` when proof-of-work checking is enabled.
- Rejects the header if proof-of-work fails.

### `ContextualCheckBlockHeader`

Reviewed behavior:

- Checks difficulty bits against `GetNextWorkRequired`.
- Checks checkpoint restrictions when enabled.
- Checks median-time-past timestamp rule.
- Rejects timestamps too far in the future.
- Rejects outdated block versions after relevant deployments are active.

## Block body path reviewed

### `CheckBlock`

Reviewed behavior:

- Calls `CheckBlockHeader`.
- Checks signet block solution when signet applies.
- Checks merkle root.
- Checks size and weight limits.
- Requires exactly one coinbase transaction at the beginning.
- Calls `CheckTransaction` for each transaction.
- Checks legacy sigops limit.

### `ContextualCheckBlock`

Reviewed behavior:

- Applies context-dependent block checks that do not use the UTXO set.
- Checks finality for all transactions.
- Enforces coinbase height after the relevant deployment is active.
- Checks witness commitments when SegWit is active.
- Checks block weight after witness commitment validation.

## UTXO connection path reviewed

### `ConnectBlock`

`ConnectBlock` applies a block's effects to the UTXO set represented by a coins view and performs UTXO-dependent validation checks.

Reviewed behavior:

- Re-runs `CheckBlock` before connecting the block.
- Verifies the coins view best block equals the previous block hash.
- Special-cases the genesis block.
- Applies assumed-valid script-check behavior when applicable.
- Enforces BIP30 duplicate-output protection where applicable.
- Enables BIP68 sequence locks when CSV is active.
- Gets script verification flags with `GetBlockScriptFlags`.
- Builds undo data for non-coinbase transactions.
- Checks non-coinbase transaction inputs with `Consensus::CheckTxInputs`.
- Accumulates fees and checks fee range with `MoneyRange`.
- Checks BIP68 sequence locks using previous output heights.
- Counts transaction signature operation cost.
- Runs input script checks when script checking is enabled.
- Updates the coins view with `UpdateCoins`.
- Checks that the coinbase does not pay more than fees plus subsidy.
- Waits for queued script checks.
- Writes undo data when not in just-check mode.
- Raises block validity to `BLOCK_VALID_SCRIPTS` when appropriate.
- Sets the coins view best block to the connected block hash.

## UTXO disconnection path reviewed

### `ApplyTxInUndo`

`ApplyTxInUndo` restores one spent output from undo data.

Reviewed behavior:

- Marks the disconnect unclean if restoring would overwrite an existing unspent output.
- Recovers older undo metadata from an alternate output when possible.
- Fails if required undo metadata cannot be recovered.
- Adds the restored coin back to the coins view.

### `DisconnectBlock`

`DisconnectBlock` rolls back a block's UTXO effects.

Reviewed behavior:

- Reads block undo data from disk.
- Fails on missing or inconsistent undo data.
- Walks transactions in reverse order.
- Spends outputs created by the disconnected block.
- Checks that removed outputs match block transaction outputs, height, and coinbase status.
- Restores non-coinbase inputs from undo data with `ApplyTxInUndo`.
- Sets the coins view best block to the disconnected block's parent hash.
- Returns `DISCONNECT_OK`, `DISCONNECT_UNCLEAN`, or `DISCONNECT_FAILED`.

### `DisconnectTip`

`DisconnectTip` rolls the active chain tip backward by one block.

Reviewed behavior:

- Reads the current tip block from disk.
- Creates a coins-view cache over the current coins tip.
- Verifies that the coins view best block is the tip being disconnected.
- Calls `DisconnectBlock` to roll back the tip's UTXO effects.
- Flushes the coins-view cache.
- Moves prune locks backward when needed.
- Flushes state to disk if needed.
- Adds disconnected transactions to the disconnected-transaction pool when available.
- Moves the active chain tip back to the disconnected block's parent.
- Calls `UpdateTip`.
- Emits `BlockDisconnected` signals.

## Best-chain activation path reviewed

### `FindMostWorkChain`

Reviewed behavior:

- Chooses the highest-work candidate from `setBlockIndexCandidates`.
- Walks backward toward the active chain.
- Rejects chains with failed ancestors.
- Rejects chains missing required block data.
- Returns a usable most-work candidate when one is found.

### `ActivateBestChainStep`

Reviewed behavior:

- Finds the fork point between the current active chain and the most-work candidate.
- Disconnects blocks until the current tip reaches that fork point.
- Builds a list of blocks to connect toward the candidate tip.
- Connects blocks with `ConnectTip`.
- Marks invalid chains when a connected block fails consensus validation.
- Updates the mempool after blocks are disconnected.
- Checks fork-warning conditions.

### `ConnectTip`

Reviewed behavior:

- Reads the block from disk unless a cached block is available.
- Calls `ConnectBlock` with a coins-view cache.
- Flushes the cache after successful connection.
- Flushes chainstate to disk if needed.
- Removes confirmed transactions from the mempool.
- Sets the active chain tip to the new block.
- Calls `UpdateTip`.
- Records the connected block in `connectTrace`.

### `ActivateBestChain`

Reviewed behavior:

- Uses a chainstate mutex so only one activation runs at a time.
- Calls `FindMostWorkChain` and `ActivateBestChainStep`.
- Emits `BlockConnected` signals.
- Emits tip-update notifications when the active tip changes.
- Handles initial-block-download exit behavior.
- Checks the block index after activation.
- Periodically flushes state to disk.

## Storage path reviewed

### `AcceptBlock`

Reviewed behavior:

- Calls `AcceptBlockHeader`.
- Skips already-known block data.
- Applies anti-DoS logic for unrequested blocks.
- Calls `CheckBlock` and `ContextualCheckBlock`.
- Saves valid block data to disk.
- Calls `ReceivedBlockTransactions`.
- Flushes state to disk with `FlushStateMode::NONE`.

## What is not fully reviewed yet

- `MaybeUpdateMempoolForReorg`
- Full mempool re-add policy for disconnected transactions
- `DisconnectedBlockTransactions` implementation details

## Related pages

- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Checkpoints](../documentation/checkpoints.md)
- [Reorganizations](../encyclopedia/reorganizations.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)

## Sources

- `src/validation.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/validation.cpp
- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a partial flow map based on reviewed validation code. It should be expanded after deeper review of disconnected transaction handling and mempool reorganization behavior.
