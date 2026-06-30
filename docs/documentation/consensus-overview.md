# BitcoinII Consensus Overview

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-29

## Summary

This page summarizes consensus-related behavior that has been checked against public BitcoinII source code.

It is intentionally conservative. If a value or rule has not been checked against source or official release materials, it should remain out of this page or be listed as an open item.

For a higher-level reader path, see [Consensus model](../architecture/consensus-model.md).

## Source-backed areas reviewed so far

MoreBC2 has reviewed first-pass source anchors for:

- Chain parameters.
- Proof-of-work and difficulty adjustment.
- Block header hashing.
- Monetary amount sanity helpers.
- Context-independent transaction checks.
- Transaction finality and sequence-lock helpers.
- UTXO-input checks.
- Transaction unlocking and verification helpers.
- Block validation and connection paths.
- Reorganization handling.

This page still should not be treated as a complete consensus specification.

## Block interval and retargeting

BitcoinII mainnet is configured for:

- 10-minute target block spacing.
- 14-day target retarget timespan.
- 2016-block difficulty adjustment interval.

`src/pow.cpp` shows that difficulty changes only at the configured adjustment interval. On mainnet, blocks between adjustment intervals keep the previous `nBits` value.

## Difficulty adjustment calculation

`GetNextWorkRequired()` checks whether the next block height falls on the configured difficulty adjustment interval.

If it does not, and min-difficulty blocks are not allowed, the previous block's `nBits` value is reused.

At an adjustment interval, the function finds the first block in the adjustment window and calls `CalculateNextWorkRequired()`.

## Difficulty adjustment limits

`CalculateNextWorkRequired()` limits the actual timespan used for retargeting:

- Minimum actual timespan: target timespan divided by 4.
- Maximum actual timespan: target timespan multiplied by 4.

It then scales the old target by actual timespan divided by target timespan and caps the result at `powLimit`.

This means a single retarget step is bounded in either direction.

## Difficulty transition checks

`PermittedDifficultyTransition()` checks whether an observed transition is within permitted bounds.

Source-backed behavior:

- If min-difficulty blocks are allowed, it returns true.
- At adjustment heights, it checks the new target against the 1/4x to 4x permitted range.
- Away from adjustment heights, it rejects changes where `old_nbits` and `new_nbits` differ.

## Proof-of-work target checks

`CheckProofOfWork()` verifies that a block hash satisfies the target encoded by `nBits`.

Source-backed behavior:

- It rejects negative targets.
- It rejects zero targets.
- It rejects overflowed targets.
- It rejects targets above `powLimit`.
- It rejects hashes greater than the target.

## No Dark Gravity Wave claim

This page does **not** claim that BitcoinII implements Dark Gravity Wave.

Based on the checked source path, the current verified description is Bitcoin-style 2016-block retargeting.

## Block header hashing

`CBlockHeader::GetHash()` uses `HashWriter::GetHash()`.

`HashWriter::GetHash()` performs SHA-256, then SHA-256 again over the first result. The source comments describe this as double-SHA256.

## Monetary units and money range

`src/consensus/amount.h` defines:

- `COIN = 100000000`
- `MAX_MONEY = 21000000 * COIN`

The source comments call `MAX_MONEY` a consensus-critical money-range sanity check rather than a direct statement that the total supply equals that number at all times.

## Context-independent transaction checks

`src/consensus/tx_check.*` defines `CheckTransaction`, which checks transaction shape without relying on chain or mempool state.

Reviewed behavior includes:

- Inputs cannot be empty.
- Outputs cannot be empty.
- Size without witness, scaled by witness factor, cannot exceed maximum block weight.
- Output values cannot be negative.
- Output values cannot exceed `MAX_MONEY`.
- Total output value must remain in range.
- Duplicate inputs are rejected.
- Coinbase scriptSig length is bounded.
- Non-coinbase transactions cannot spend null previous outputs.

## Context-dependent transaction checks

`src/consensus/tx_verify.*` defines helpers for finality, sequence locks, operation-cost accounting, and UTXO-input checks.

Reviewed behavior includes:

- `IsFinalTx` handles locktime finality relative to block height or block time.
- Sequence-lock helpers calculate and evaluate BIP68-style relative locks.
- Operation-cost helpers count legacy, P2SH, and witness-related operation costs where applicable.
- `Consensus::CheckTxInputs` checks input availability, coinbase maturity, value ranges, input/output value comparison, and fee calculation.

`Consensus::CheckTxInputs` does not modify the UTXO set and does not perform lower-level unlocking checks by itself.

## Transaction unlocking checks

`src/script/interpreter.*` implements the lower-level engine that evaluates whether transaction-provided data satisfies the conditions on outputs being spent.

Reviewed behavior includes:

- Verification flags.
- Execution versions.
- Stack-machine evaluation.
- Signature-checking hooks.
- Locktime and sequence checker hooks.
- P2SH handling.
- Witness program handling.
- Taproot and Tapscript handling.
- Clean-stack and unexpected-witness checks when enabled.

Important caveat:

Verification flags depend on caller context. MoreBC2 has not yet fully mapped which flags are mandatory block-validation rules and which are mempool policy or standardness rules.

## Open items

- Confirm preferred public wording for the mining algorithm: `double-SHA256`, `SHA-256d`, or another maintainer-preferred phrase.
- Verify current block subsidy schedule from the subsidy calculation code, not just halving interval.
- Verify activation status and behavior for SegWit/Taproot from chain state or release notes.
- Confirm any BitcoinII-specific consensus changes outside reviewed source areas.
- Map mandatory block-validation flags vs mempool policy flags.
- Review caller paths that pass verification flags during block connection and mempool acceptance.
- Compare transaction and unlocking-check files against the upstream Bitcoin Core version BitcoinII forked from.

## Sources

- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/consensus/amount.h`
- `src/consensus/tx_check.*`
- `src/consensus/tx_verify.*`
- `src/script/interpreter.*`
- `src/validation.cpp`

## Verification

**Status:** Needs Review
**Primary sources checked:** Partially
**Notes:** This page has been refreshed after first-pass transaction-helper and unlocking-check reviews. It should still be reviewed against the currently running release and caller paths before being marked Verified.
