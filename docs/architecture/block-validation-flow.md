# Block validation flow

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page maps the reviewed BitcoinII Core block-validation path from `src/validation.cpp`.

It is intentionally partial. The reviewed path now covers header acceptance, context-free block checks, contextual block checks, UTXO-dependent connection checks in `ConnectBlock`, disk storage, and best-chain activation entry points. It does not yet fully document chain selection or reorganization handling.

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
       -> ConnectBlock during chain connection path
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

## Storage and activation path reviewed

### `AcceptBlock`

Reviewed behavior:

- Calls `AcceptBlockHeader`.
- Skips already-known block data.
- Applies anti-DoS logic for unrequested blocks.
- Calls `CheckBlock` and `ContextualCheckBlock`.
- Saves valid block data to disk.
- Calls `ReceivedBlockTransactions`.
- Flushes state to disk with `FlushStateMode::NONE`.

### `ActivateBestChain`

`ProcessNewBlock` calls `ActivateBestChain` after `AcceptBlock` succeeds.

The internals of `ActivateBestChain` still need deeper review before MoreBC2 documents chain selection or reorganization behavior in detail.

## What is not fully reviewed yet

- `ActivateBestChain`
- Chain selection logic
- Reorganization handling
- UTXO disconnection
- Mempool transaction removal during block connection

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
**Notes:** This is a partial flow map based on reviewed validation code. It should be expanded after deeper review of best-chain activation and reorganization handling.
