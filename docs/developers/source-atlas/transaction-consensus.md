# Transaction consensus files

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page covers a first-pass review of the transaction consensus files:

- `src/consensus/tx_check.cpp`
- `src/consensus/tx_check.h`
- `src/consensus/tx_verify.cpp`
- `src/consensus/tx_verify.h`

These files define context-independent transaction checks, locktime and sequence-lock helpers, operation-count accounting helpers, and UTXO-input checks used during validation.

This page does not cover script interpreter internals.

## Why these files matter

Block validation eventually has to answer two questions about each transaction:

1. Is the transaction structurally valid by itself?
2. Are the transaction's inputs valid against the current UTXO view at the spend height?

The reviewed files help answer those questions.

They sit below higher-level block and mempool validation code. Higher-level code decides when to call these checks and which flags or context apply.

## File roles

### `tx_check.h` / `tx_check.cpp`

`tx_check.h` describes `CheckTransaction` as context-independent transaction checking that can be called outside the BitcoinII server and does not depend on chain or mempool state.

The header also says transaction verification code that depends on server state belongs in `tx_verify.h/cpp` instead.

### `tx_verify.h` / `tx_verify.cpp`

`tx_verify.h` declares transaction validation helpers that need more context, including input availability, sequence locks, finality, and operation-count accounting.

The header explicitly notes that `Consensus::CheckTxInputs` does not modify the UTXO set and does not check scripts.

## Key symbols reviewed

- `CheckTransaction`
- `IsFinalTx`
- `CalculateSequenceLocks`
- `EvaluateSequenceLocks`
- `SequenceLocks`
- `GetLegacySigOpCount`
- `GetP2SHSigOpCount`
- `GetTransactionSigOpCost`
- `Consensus::CheckTxInputs`

## `CheckTransaction`

`CheckTransaction` performs basic context-independent checks.

Reviewed checks include:

- Transaction inputs cannot be empty.
- Transaction outputs cannot be empty.
- Serialized transaction size without witness, scaled by witness factor, cannot exceed maximum block weight.
- Output values cannot be negative.
- Output values cannot exceed `MAX_MONEY`.
- Total output value must remain in `MoneyRange`.
- Duplicate inputs are rejected.
- Coinbase scriptSig length must be between 2 and 100 bytes.
- Non-coinbase transactions cannot have null previous outputs.

The duplicate-input check is especially important because the source comments tie it to avoiding crash or inflation-bug behavior depending on the underlying coins database implementation.

## `IsFinalTx`

`IsFinalTx` checks whether a transaction is final for a given block height and block time.

Reviewed behavior:

- If `nLockTime` is zero, the transaction is final.
- If `nLockTime` is below the relevant block height or block time threshold, the transaction is final.
- If `nLockTime` is not satisfied, the transaction can still be final if all inputs have `nSequence == SEQUENCE_FINAL`.

The header labels this consensus critical.

## Sequence-lock helpers

`CalculateSequenceLocks`, `EvaluateSequenceLocks`, and `SequenceLocks` handle BIP68-style relative lock conditions.

Reviewed behavior includes:

- Sequence-lock enforcement requires transaction version at least 2 and `LOCKTIME_VERIFY_SEQUENCE` flag.
- Inputs with the sequence-lock disable flag are not treated as relative lock-times.
- Height-based and time-based relative locks are handled separately.
- Time-based relative locks use median-time-past logic through the previous block context.
- `EvaluateSequenceLocks` compares calculated height/time requirements against the candidate block.

The header labels `SequenceLocks` consensus critical.

## Operation-count accounting helpers

Reviewed helpers include:

- `GetLegacySigOpCount`
- `GetP2SHSigOpCount`
- `GetTransactionSigOpCost`

Reviewed behavior:

- Legacy operation counts are calculated across transaction inputs and outputs.
- P2SH operation counts are calculated from spent outputs when applicable.
- Coinbase transactions return zero for P2SH operation counting.
- Total transaction operation cost starts with legacy counts scaled by witness factor.
- P2SH counts are added when `SCRIPT_VERIFY_P2SH` is enabled.
- Witness-related counts are calculated for each input against the spent output script and witness data.

## `Consensus::CheckTxInputs`

`Consensus::CheckTxInputs` checks transaction inputs against a `CCoinsViewCache`.

Reviewed checks include:

- All inputs must be available.
- Coinbase spends must satisfy coinbase maturity.
- Input values must be in range.
- Total input value must remain in range.
- Total input value must be at least total output value.
- The transaction fee must be non-negative and in range.
- The calculated fee is returned through the output parameter when successful.

This function does not modify the UTXO set and does not check scripts.

## Relationship to higher-level validation

These files do not decide by themselves whether a block joins the active chain.

Higher-level validation code calls into these helpers during block and transaction validation.

Relevant higher-level pages:

- [Source atlas: validation.cpp](validation-cpp.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Consensus model](../../architecture/consensus-model.md)

## Consensus vs policy notes

The reviewed files contain consensus-critical helpers, but context still matters.

Examples:

- `CheckTransaction` returns `TX_CONSENSUS` for several context-independent invalid forms.
- `IsFinalTx` and `SequenceLocks` are labeled consensus critical in the header.
- `CheckTxInputs` is in the `Consensus` namespace and checks input availability, coinbase maturity, values, and fees.
- Mempool acceptance may call consensus helpers but also applies policy checks elsewhere.

Do not treat mempool policy checks as consensus rules just because they share some helper functions.

## BitcoinII-specific notes

This first-pass review did not identify BitcoinII-specific transaction-consensus behavior in these files beyond project naming and header guards.

The reviewed code appears Bitcoin-style in structure, but no upstream comparison has been completed yet.

## Open questions

- Which parts of these files differ from the upstream Bitcoin Core version BitcoinII forked from?
- Which higher-level validation paths call these helpers in block validation, mempool acceptance, and package acceptance?
- Which script flags are mandatory consensus flags vs policy flags in the current BitcoinII source?
- How should MoreBC2 explain transaction finality and sequence locks for non-developer readers?
- Should operation-count accounting receive its own encyclopedia explainer?

## Sources

- `src/consensus/tx_check.cpp`
- `src/consensus/tx_check.h`
- `src/consensus/tx_verify.cpp`
- `src/consensus/tx_verify.h`
- `src/consensus/amount.h`
- `src/validation.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass review of transaction consensus helper files. Script interpreter internals, caller graph, package acceptance interaction, and upstream comparison remain open.
