# Script interpreter

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page covers a first-pass review of:

- `src/script/interpreter.cpp`
- `src/script/interpreter.h`

These files implement BitcoinII Core script evaluation helpers, script verification flags, script execution versions, witness program handling, Taproot/Tapscript helpers, and transaction signature-checking interfaces.

This is a first-pass map, not a complete script semantics specification.

## Why this file matters

Script validation is where spending conditions are evaluated.

Higher-level validation code can confirm that a transaction has available inputs and sane values, but script validation decides whether the provided spending data satisfies the script conditions attached to the outputs being spent.

Because script behavior is consensus-sensitive, MoreBC2 should keep this page conservative and avoid simplifying it into user-facing wallet advice.

## Key symbols reviewed

- `SCRIPT_VERIFY_*` flags
- `SigVersion`
- `PrecomputedTransactionData`
- `ScriptExecutionData`
- `BaseSignatureChecker`
- `GenericTransactionSignatureChecker`
- `CheckSignatureEncoding`
- `EvalScript`
- `VerifyScript`
- `VerifyWitnessProgram`
- `ExecuteWitnessScript`
- `SignatureHash`
- `SignatureHashSchnorr`
- `CountWitnessSigOps`
- `FindAndDelete`
- Taproot helper functions

## Script verification flags

`interpreter.h` defines script verification flags such as:

- P2SH evaluation.
- Strict encoding.
- DER signature rules.
- Low-S signature rule.
- Null dummy rule.
- Push-only scriptSig rule.
- Minimal data rule.
- Clean stack rule.
- CHECKLOCKTIMEVERIFY.
- CHECKSEQUENCEVERIFY.
- Witness support.
- Taproot and Tapscript support.
- Discouragement flags for upgradeable script features.

Important note:

Some flags are consensus-relevant in specific contexts, while others are policy or standardness-related. The comments explicitly say some discouragement flags should not be mandatory block-validation flags.

MoreBC2 should not label every `SCRIPT_VERIFY_*` flag as consensus without checking the caller context.

## Script versions

`SigVersion` identifies the script execution/signature context:

- `BASE`
- `WITNESS_V0`
- `TAPROOT`
- `TAPSCRIPT`

This matters because the same operation can have different rules depending on the script version.

Examples from review:

- Taproot key path spending has no script execution path.
- Tapscript has separate handling for Schnorr checks, validation weight, OP_SUCCESS behavior, and cleanstack-like behavior.
- Witness v0 and base script evaluation differ in several rules and hashing paths.

## Signature-checking interface

`BaseSignatureChecker` defines virtual hooks for checking:

- ECDSA signatures.
- Schnorr signatures.
- Locktime conditions.
- Sequence conditions.

`GenericTransactionSignatureChecker` implements transaction-aware versions using the transaction, input index, amount, optional precomputed data, and missing-data behavior.

Reviewed behavior includes:

- ECDSA checks construct a signature hash and verify it against the public key.
- Schnorr checks require Taproot/Tapscript context and use BIP341/BIP342-style hashing helpers.
- CHECKLOCKTIMEVERIFY comparison requires matching height-vs-time locktime type.
- CHECKSEQUENCEVERIFY requires transaction version at least 2 and compares sequence type and value after masking bits with consensus meaning.

## `EvalScript`

`EvalScript` is the script stack-machine evaluator.

Reviewed behavior includes:

- Script is evaluated as a stack machine without loops.
- Push sizes are checked.
- Disabled opcodes are rejected.
- Opcode count limits apply to base and witness v0 script versions.
- Conditional execution is tracked through `ConditionStack`.
- `OP_CODESEPARATOR` can be rejected under `SCRIPT_VERIFY_CONST_SCRIPTCODE` in base scripts.
- Minimal push checks are enforced when `SCRIPT_VERIFY_MINIMALDATA` is set.
- CHECKLOCKTIMEVERIFY and CHECKSEQUENCEVERIFY rely on the checker interface when their flags are enabled.
- CHECKSIG, CHECKSIGVERIFY, CHECKMULTISIG, and CHECKMULTISIGVERIFY use signature checking helpers.
- OP_CHECKSIGADD is only available in Tapscript.
- Tapscript rejects CHECKMULTISIG.
- Stack and altstack combined size is limited.
- Unbalanced conditionals fail script evaluation.

## Signature encoding and public key checks

Reviewed helpers include:

- `IsValidSignatureEncoding`
- `IsLowDERSignature`
- `IsDefinedHashtypeSignature`
- `CheckSignatureEncoding`
- `CheckPubKeyEncoding`

Reviewed behavior includes DER-shape checks, Low-S checks, hash type checks, and public-key encoding checks depending on flags and script version.

The source comments identify DER signature encoding as consensus-critical since BIP66.

## Witness and Taproot paths

`VerifyWitnessProgram` handles witness programs.

Reviewed behavior includes:

- Witness v0 P2WSH verifies the SHA256 hash of the witness script before executing it.
- Witness v0 P2WPKH builds an implied P2PKH-style execution script.
- Witness v1 Taproot key path uses Schnorr checking when Taproot verification is enabled.
- Taproot script path verifies control block size, computes Tapleaf hash, checks the Taproot commitment, and executes Tapscript for the Tapscript leaf version.
- Unknown or future witness/Taproot forms can be accepted for soft-fork compatibility unless discouragement flags are set.

## `VerifyScript`

`VerifyScript` is the high-level script verification entry point reviewed here.

Reviewed behavior includes:

- Optional push-only scriptSig check.
- Sequential evaluation of scriptSig and scriptPubKey on the same stack.
- P2SH stack-copy behavior.
- Final stack truth check.
- Bare witness program handling when witness verification is enabled.
- P2SH redeemScript evaluation.
- P2SH-wrapped witness program handling.
- CLEANSTACK check when enabled.
- Unexpected witness-data check when witness verification is enabled.

## Witness operation counting

`CountWitnessSigOps` returns zero when witness verification is disabled.

When witness verification is enabled, it can count witness v0 keyhash and scripthash operation costs, including P2SH-wrapped witness programs.

Future witness versions currently return zero in the reviewed helper.

## Relationship to validation and mempool pages

Script verification is called from higher-level validation paths.

MoreBC2 already documents that block connection and mempool acceptance can run script checks, but this page anchors the lower-level interpreter side.

Related higher-level pages:

- [Consensus model](../../architecture/consensus-model.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Source atlas: validation.cpp](validation-cpp.md)
- [Source atlas: mempool accept](mempool-accept.md)
- [Source atlas: transaction consensus files](transaction-consensus.md)

## BitcoinII-specific notes

This first-pass review did not identify BitcoinII-specific script-interpreter behavior beyond project naming, comments, and header guards.

The reviewed file structure appears Bitcoin-style, but no upstream comparison has been completed.

## Open questions

- Which script verification flags are used in mandatory block validation in the current BitcoinII source?
- Which script verification flags are only policy or standardness rules?
- Which exact caller paths pass script flags during block connection and mempool acceptance?
- Does BitcoinII differ from upstream Bitcoin Core in script interpreter behavior?
- Should MoreBC2 create separate encyclopedia pages for script, P2SH, SegWit, Taproot, and Tapscript?
- Which script tests are inherited and which are BitcoinII-specific?

## Sources

- `src/script/interpreter.cpp`
- `src/script/interpreter.h`
- `src/script/script_error.h`
- `src/consensus/tx_verify.cpp`
- `src/validation.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass interpreter map. It is not a complete opcode-by-opcode specification and does not yet map every caller or mandatory-vs-policy flag combination.
