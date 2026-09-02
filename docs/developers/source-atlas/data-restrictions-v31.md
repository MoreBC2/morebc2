# BitcoinII v31 consensus data restrictions

**Category:** Developer / Source Atlas
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Purpose

This page documents the BitcoinII Core `v31.1.0` transaction-data restrictions activated on mainnet at height `57750`.

The release notes describe these broadly as Ordinals, inscriptions, and Runes mitigation. The source is more specific.

## Activation

Mainnet chain parameters set:

```text
nDataRestrictionsHeight = 57750
```

During block connection, `validation.cpp` enables BitcoinII-specific data rules when the block being connected is at or above that height.

These checks are consensus checks. They are not merely mempool policy.

## Output rules

`src/consensus/bitcoinII_data.h` defines output-only checks through `Consensus::CheckBitcoinIIOutputRules`.

Post-activation, a transaction is rejected from a consensus-valid block when it violates any of these rules:

- more than one `OP_RETURN` output;
- an `OP_RETURN` script larger than the BitcoinII consensus allowance;
- an actual `OP_13` opcode inside an `OP_RETURN` script;
- a bare multisig output.

The `OP_13` detector parses script operations. A byte equal to `OP_13` inside pushed data is not treated as an opcode violation.

## Taproot witness rules

For spends of native Taproot outputs, BitcoinII adds witness-level restrictions:

- Taproot annex data is forbidden;
- script-path revealed tapscripts are capped at the BitcoinII consensus limit;
- Ordinals inscription envelopes matching the semantic pattern `OP_FALSE OP_IF <push "ord">` are forbidden.

The Ordinals detector parses script operations instead of scanning raw bytes, reducing false matches inside unrelated pushed data.

Taproot key-path spends remain permitted by this helper.

## Validation path

`src/validation.cpp` contains two wrapper checks:

- `CheckBitcoinIIConsensusOutputs`
- `CheckBitcoinIIConsensusWitness`

When `pindex->nHeight >= nDataRestrictionsHeight`, block connection applies these checks to transactions and returns consensus-invalid block results for violations.

The output violation reasons include dedicated reject strings for OP_RETURN count, OP_RETURN size, OP_13, and bare multisig. Witness violations include Taproot annex, tapscript size, and Ordinals envelope failures.

## Test coverage present upstream

The `v31.1.0` source tree includes:

- `src/test/bitcoinII_data_tests.cpp` for BitcoinII data-rule unit tests;
- `test/functional/feature_bitcoinII_data_consensus.py`;
- `test/functional/feature_bitcoinII_taproot_consensus.py`.

MoreBC2 has identified these tests but has not yet executed them locally.

## What this means for "Runes mitigation"

MoreBC2 should avoid summarizing this as a blanket ban on all arbitrary data.

The source-backed rules target specific transaction constructions and data-carrying surfaces. The current review supports claims about the explicit rules above; it does not support the broader statement that every possible arbitrary-data protocol is impossible on BitcoinII.

## Primary sources

Pinned to `v31.1.0`:

- `src/kernel/chainparams.cpp`
- `src/consensus/params.h`
- `src/consensus/bitcoinII_data.h`
- `src/validation.cpp`
- `src/test/bitcoinII_data_tests.cpp`
- `test/functional/feature_bitcoinII_data_consensus.py`
- `test/functional/feature_bitcoinII_taproot_consensus.py`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** Yes, `v31.1.0`
**Notes:** Rule definitions, activation and validation placement are source-backed. Upstream tests were located but have not been run by MoreBC2.