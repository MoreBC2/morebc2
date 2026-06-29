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
       -> ConnectBlock during chain connection path
```

This diagram is intentionally simplified. MoreBC2 still needs deeper review of `ActivateBestChain`, chain selection, and reorganization handling.

## Related MoreBC2 pages

- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Checkpoints](../../documentation/checkpoints.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)

## Open questions

- Review `validation.h` for public declarations and comments.
- Review `ActivateBestChain` in detail.
- Review chain selection and reorganization code paths.
- Confirm whether any BitcoinII-specific validation behavior differs from Bitcoin Core beyond visible naming and parameter changes.
- Decide whether validation should be split into separate atlas pages later.

## Sources

- `src/validation.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/validation.cpp
- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a partial source audit of validation flow anchors and `ConnectBlock`. It should not be treated as a complete validation review yet.
