# Script interpreter

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core script evaluation centered on:

- `src/script/interpreter.cpp`
- `src/script/interpreter.h`

The broad interpreter remains Bitcoin-style, but the old statement that no BitcoinII-specific interpreter behavior had been identified is no longer current. BitcoinII Core `v31.1.0` threads the BC2 replay-protection signature-hash domain through the interpreter/signature-checking path from mainnet height `57750`.

This remains an implementation map, not a complete opcode-by-opcode consensus specification.

## Why this file matters

Higher-level validation determines whether inputs exist, values are sane, and a transaction is otherwise eligible. Script validation decides whether the spending data actually satisfies the output conditions being spent.

For BC2 integration work, this layer is also where the replay-protection signing domain becomes cryptographically meaningful. Bitcoin-like address formats and script templates do not by themselves imply Bitcoin signature compatibility.

## Key symbols reviewed

- `SCRIPT_VERIFY_*` flags
- `SigVersion`
- `PrecomputedTransactionData`
- `ScriptExecutionData`
- `BaseSignatureChecker`
- `GenericTransactionSignatureChecker`
- `EvalScript`
- `VerifyScript`
- `VerifyWitnessProgram`
- `ExecuteWitnessScript`
- `SignatureHash`
- `SignatureHashSchnorr`
- signature/pubkey encoding helpers
- witness/Taproot helpers

## Script verification flags

`interpreter.h` defines verification flags covering areas such as:

- P2SH;
- signature/public-key encoding;
- DER and Low-S rules;
- NULLDUMMY;
- push-only/minimal-data behavior;
- clean stack;
- CHECKLOCKTIMEVERIFY;
- CHECKSEQUENCEVERIFY;
- witness;
- Taproot/Tapscript;
- discouragement flags for upgradeable script forms.

Caller context matters. Some flags are consensus-mandatory in particular block-validation contexts while others are policy or relay restrictions. Do not classify every `SCRIPT_VERIFY_*` flag as a universal consensus rule merely because it lives in the interpreter.

## Script/signature versions

`SigVersion` identifies execution/signature contexts including:

- `BASE`
- `WITNESS_V0`
- `TAPROOT`
- `TAPSCRIPT`

Rules and signature hashing differ by context. Examples include separate Tapscript/Schnorr handling, witness-v0 hashing, Taproot key-path validation, and Tapscript-specific opcode behavior.

## v31 replay-protection domain

Mainnet `v31.1.0` activates replay protection at height `57750` with fork/domain id:

```text
0x01324342
```

`Consensus::Params::SighashForkId(height)` selects zero before activation and the BC2 domain at/after activation.

The domain is not serialized as a normal transaction field. Instead, it is supplied to signature-hash/precomputation/checker paths.

Release-pinned review establishes that:

- legacy signature-hash serialization includes the ordinary sighash type and incorporates the BC2 domain when non-zero;
- `PrecomputedTransactionData` carries `m_sighash_fork_id`;
- transaction-aware signature checking receives the same domain context;
- wallet, raw-transaction RPC, PSBT, mempool, and block-validation paths are wired to the appropriate domain.

A signature valid under the legacy domain therefore must not be assumed valid under the post-activation domain.

See [Replay protection v31](replay-protection-v31.md).

## Signature-checking interface

`BaseSignatureChecker` defines hooks for ECDSA, Schnorr, locktime, and sequence checks. `GenericTransactionSignatureChecker` provides transaction-aware implementations using transaction/input/amount/precomputed context.

Reviewed structure includes:

- ECDSA signature-hash construction and public-key verification;
- Schnorr verification in Taproot/Tapscript contexts;
- locktime type/value checks;
- sequence-version/type/value checks;
- replay-domain context through precomputed/signature-hash state in v31.

## `EvalScript`

`EvalScript` implements the stack-machine evaluator.

Reviewed behavior includes:

- push-size and stack limits;
- disabled-opcode rejection;
- conditional execution tracking;
- opcode-count behavior where applicable;
- minimal-push checks when enabled;
- CHECKLOCKTIMEVERIFY and CHECKSEQUENCEVERIFY through the checker interface;
- CHECKSIG/CHECKMULTISIG families;
- Tapscript-specific CHECKSIGADD behavior;
- Tapscript rejection of CHECKMULTISIG;
- failure on unbalanced conditionals.

Exact opcode semantics remain defined by the release-pinned source and tests.

## Signature encoding and public-key checks

Reviewed helpers cover DER shape, Low-S, defined sighash types, signature encoding, and public-key encoding. Which checks apply depends on script version and verification flags.

BIP66-era DER behavior is consensus-critical in the applicable validation context; other checks may be policy/context-dependent.

## Witness and Taproot paths

`VerifyWitnessProgram` handles witness program validation.

Reviewed structure includes:

- witness-v0 P2WSH commitment checking before script execution;
- witness-v0 P2WPKH implied execution script;
- Taproot key-path Schnorr checking when enabled;
- Taproot script-path control-block/commitment checks and Tapscript execution;
- forward-compatible handling of unknown witness/Taproot forms subject to discouragement-policy flags.

Separately, BitcoinII `v31.1.0` consensus data restrictions add specific post-height-`57750` Taproot witness restrictions in the block-connection path. Those rules are documented in [Consensus data restrictions](data-restrictions-v31.md); they should not be confused with generic interpreter semantics.

## `VerifyScript`

The high-level reviewed flow includes:

- optional push-only scriptSig enforcement;
- scriptSig then scriptPubKey evaluation;
- P2SH redeem-script handling;
- witness program handling;
- P2SH-wrapped witness handling;
- clean-stack checking when enabled;
- unexpected-witness-data checks in the applicable context.

## Runtime boundary

The September 11 isolated `v31.1.0` regtest PSBT test exercised a complete disposable signing/finalization/local-mempool lifecycle. That is evidence that ordinary v31 signing and script validation worked for that controlled transaction.

It did **not** runtime-exercise the mainnet replay-domain switch because regtest leaves the replay fork id at zero as shipped.

Mainnet replay-domain behavior on this page is source-confirmed, not independently demonstrated with pre/post-fork transaction vectors.

## Related pages

- [Replay protection v31](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Transaction consensus files](transaction-consensus.md)
- [validation.cpp](validation-cpp.md)
- [Mempool accept](mempool-accept.md)
- [Wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

- Map the exact mandatory-vs-policy flag set at each current caller.
- Run or link the relevant v31 script/interpreter unit and functional tests.
- Generate independent pre/post-replay-domain signature vectors.
- Test external/hardware signers that claim BC2 support.

## Primary sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/script/interpreter.cpp`
- `src/script/interpreter.h`
- `src/script/sign.cpp`
- `src/script/script_error.h`
- `src/consensus/params.h`
- `src/consensus/tx_verify.cpp`
- `src/validation.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` interpreter/signing source, replay-protection source trace, and September 11 disposable regtest signing record  
**Notes:** The page now reflects BC2's v31 replay-domain behavior. Generic script structure and the ordinary regtest signing path are established; complete flag/caller mapping, activation-boundary vectors, and third-party signer compatibility remain open.
