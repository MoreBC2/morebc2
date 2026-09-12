# Transaction consensus files

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core transaction-consensus helpers centered on:

- `src/consensus/tx_check.cpp`
- `src/consensus/tx_check.h`
- `src/consensus/tx_verify.cpp`
- `src/consensus/tx_verify.h`

These files cover context-independent transaction checks, finality/sequence-lock helpers, operation-count accounting, and UTXO-input/value checks.

The broad structure remains useful under BitcoinII Core `v31.1.0`, but current BC2 consensus behavior cannot be understood from these files alone. The v31 replay-protection and data-restriction changes are wired through separate consensus/script/validation paths documented elsewhere in the Source Atlas.

## File roles

### `tx_check.*`

`CheckTransaction` performs context-independent transaction checking without chain or mempool state.

Reviewed checks include:

- non-empty inputs and outputs;
- transaction size/weight bounds;
- output values within `MoneyRange`;
- total output value within range;
- duplicate-input rejection;
- coinbase scriptSig length bounds;
- rejection of null previous outputs in non-coinbase transactions.

### `tx_verify.*`

These helpers require more context and cover areas such as:

- transaction finality;
- relative sequence locks;
- signature-operation cost accounting;
- UTXO/input availability and value checks.

`Consensus::CheckTxInputs` does not itself modify the UTXO set and does not execute scripts.

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

Reviewed context-independent behavior includes:

- inputs/outputs must exist;
- scaled serialized size cannot exceed the block-weight limit;
- output values and output total must stay within monetary bounds;
- duplicate inputs are invalid;
- coinbase scriptSig length is constrained;
- non-coinbase transactions cannot contain null previous outputs.

These checks are structural transaction validity. They do not establish that inputs exist, signatures are valid, sequence locks are satisfied for a particular block, or BitcoinII-specific post-activation data rules are satisfied.

## Finality and sequence locks

`IsFinalTx` evaluates `nLockTime` against block height/time and input sequence finality.

The sequence-lock helpers implement BIP68-style relative height/time constraints where enabled. Time-based relative locks use MedianTimePast context.

The headers/source mark relevant finality/sequence-lock helpers as consensus-critical; exact applicability still depends on the higher-level caller and activation context.

## Operation-cost accounting

Reviewed helpers compute legacy, P2SH, and witness-related signature-operation costs according to the active script flags and spent-output context.

These helpers feed higher-level validation and block-template accounting. They should not be confused with the BitcoinII v31 data-restriction rules, which are separate checks.

## `Consensus::CheckTxInputs`

Reviewed input checks include:

- all referenced inputs are available;
- coinbase maturity;
- input values and totals remain in range;
- input total covers output total;
- fee is non-negative and in range.

The function returns the calculated fee to its caller but does not update the UTXO set or execute scripts.

## v31 BitcoinII-specific boundary

The old June wording said no BitcoinII-specific transaction-consensus behavior had been identified. That was too broad when read as a statement about the full transaction-validation stack.

For `v31.1.0` the correct distinction is:

- these particular `tx_check` / `tx_verify` helpers remain structurally Bitcoin-style in the reviewed areas;
- **replay protection** changes signature-hash/validation context from mainnet height `57750` through consensus params, script interpreter, precomputed transaction data, wallet/RPC/PSBT and mempool/block-validation paths;
- **consensus data restrictions** activate at height `57750` through `src/consensus/bitcoinII_data.h` and `validation.cpp`, adding explicit output/Taproot-witness restrictions during block connection;
- higher-level `validation.cpp` determines when these generic helpers and the BitcoinII-specific checks are applied.

Therefore, successful generic `CheckTransaction` or `CheckTxInputs` logic is not sufficient to establish full post-v31 BC2 transaction validity.

## Runtime boundary

The September 11 isolated regtest PSBT test exercised a complete disposable transaction through funding, signing, finalization, `testmempoolaccept`, and local-only `sendrawtransaction`.

That gives bounded runtime evidence for an ordinary v31 transaction path, but it did not trigger mainnet replay protection or the mainnet height-`57750` data-restriction activation.

## Relationship to higher-level validation

These helpers sit below:

- block connection and best-chain activation;
- mempool admission;
- package policy;
- script verification;
- v31 data-restriction checks;
- replay-domain signature verification.

See [validation.cpp](validation-cpp.md), [Script interpreter](script-interpreter.md), [Replay protection](replay-protection-v31.md), and [Data restrictions](data-restrictions-v31.md).

## Consensus versus policy

Do not infer that every check reached through a mempool path is a consensus rule. Mempool acceptance layers additional policy on top of transaction and script consensus checks.

Likewise, a transaction rejected by local policy may still be consensus-valid if included in a valid block, while a post-activation BitcoinII consensus violation cannot be made valid merely by bypassing mempool policy.

## Related pages

- [validation.cpp](validation-cpp.md)
- [Script interpreter](script-interpreter.md)
- [Mempool accept](mempool-accept.md)
- [Replay protection v31](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Consensus model](../../architecture/consensus-model.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

- Complete release-pinned caller mapping from block, mempool, and package paths into these helpers.
- Map mandatory-consensus versus policy script flags by caller.
- Compare these particular helper files against the upstream baseline if a detailed delta document becomes useful.
- Execute/link the relevant v31 unit and functional tests.

## Primary sources

Pinned/current `v31.1.0` review scope:

- `src/consensus/tx_check.cpp`
- `src/consensus/tx_check.h`
- `src/consensus/tx_verify.cpp`
- `src/consensus/tx_verify.h`
- `src/consensus/amount.h`
- `src/consensus/bitcoinII_data.h`
- `src/validation.cpp`
- `src/script/interpreter.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` transaction-helper review plus the v31 replay/data-restriction source traces and September 11 isolated transaction runtime record  
**Notes:** The generic helper roles are current and bounded. BitcoinII-specific v31 transaction validity depends on additional validation/script paths and should not be inferred from these helpers alone.
