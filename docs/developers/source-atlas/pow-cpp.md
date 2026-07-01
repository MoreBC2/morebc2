# `src/pow.cpp`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-30

## Purpose

`pow.cpp` contains proof-of-work difficulty logic.

For MoreBC2, this file is the current source-backed reference for BitcoinII difficulty retarget behavior and proof-of-work target validation.

## File header notes

The file header states that BitcoinII was forked from Bitcoin Core version `0.27.0` and is distributed under the MIT software license.

## Includes worth noting

This file includes:

- `pow.h`
- `arith_uint256.h`
- `chain.h`
- `primitives/block.h`
- `uint256.h`

That means this file works with block headers, block index data, consensus parameters, and compact target representation.

## Why it matters

This file helps verify:

- When difficulty changes.
- How the next work requirement is calculated.
- Whether retargeting is disabled.
- Whether minimum-difficulty blocks are allowed.
- How difficulty transition limits are enforced.
- How proof-of-work target checks are performed.

## Key functions

### `GetNextWorkRequired`

This function decides what compact target value should be required for the next block.

Source-backed behavior:

- It requires a non-null previous block index.
- It calculates the proof-of-work limit from `params.powLimit`.
- It only changes difficulty at the configured difficulty adjustment interval.
- If the next height is not an adjustment interval and min-difficulty blocks are not allowed, it returns the previous block's `nBits`.
- If min-difficulty blocks are allowed, it applies special testnet-style behavior.
- At an adjustment interval, it locates the first block in the adjustment window and calls `CalculateNextWorkRequired`.

### `CalculateNextWorkRequired`

This function calculates the new compact target at a retarget boundary.

Source-backed behavior:

- If `fPowNoRetargeting` is true, it returns the previous block's `nBits`.
- It calculates actual timespan from the last block time minus the first block time.
- It clamps actual timespan to no less than one quarter of target timespan.
- It clamps actual timespan to no more than four times target timespan.
- It scales the old target by actual timespan divided by target timespan.
- It caps the result at `powLimit`.
- It returns the compact representation of the new target.

### `PermittedDifficultyTransition`

This function checks whether an observed difficulty transition is within permitted bounds.

Source-backed behavior:

- If min-difficulty blocks are allowed, it returns true.
- At adjustment heights, it checks the new target against the permitted 1/4x to 4x bounds.
- Away from adjustment heights, it rejects changes where `old_nbits != new_nbits`.

### `CheckProofOfWork`

This function checks whether a block hash satisfies the claimed target.

Source-backed behavior:

- It decodes `nBits` into a target.
- It rejects negative, zero, overflowed, or over-limit targets.
- It rejects hashes greater than the target.
- It returns true only when the hash is within range and satisfies the target.

## BitcoinII mainnet interpretation

Mainnet chain parameters currently set:

- `fPowAllowMinDifficultyBlocks = false`
- `fPowNoRetargeting = false`
- Target spacing: 10 minutes
- Target timespan: 14 days
- Adjustment interval: 2016 blocks

Combining those values with this file's logic supports the current MoreBC2 wording:

> BitcoinII mainnet uses Bitcoin-style 2016-block difficulty retargeting with 1/4x to 4x retarget bounds.

## Release comparison note

MoreBC2 spot-checked `src/pow.cpp` at `v29.1.0`. The observed retarget model matches the current source-reviewed wording: Bitcoin-style 2016-block retargeting with min-difficulty disabled and retargeting enabled for mainnet.

## Important clarification

This file review does **not** support a claim that BitcoinII uses Dark Gravity Wave.

Current source-backed wording is Bitcoin-style 2016-block retargeting.

## Related MoreBC2 pages

- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Mining overview](../../mining/mining-overview.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)
- [Release source comparison notes](../../verification/release-source-comparison.md)

## Open questions

- Confirm maintainer-preferred wording: `Bitcoin-style retargeting`, `2016-block retargeting`, or another phrase.
- Confirm whether any BitcoinII-specific tests cover this behavior.
- Review `pow.h` to document function declarations and comments.
- Review validation code to see exactly where these functions are called during block validation.

## Sources

- Current observed `main`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/pow.cpp
- Current observed `main` chain parameters: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp
- `v29.1.0` proof-of-work source: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/pow.cpp
- [Release source comparison notes](../../verification/release-source-comparison.md)

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes, partially
**Notes:** Behavior has been checked from current source and spot-checked against `v29.1.0`. This page should still remain Needs Review until caller paths and related tests are reviewed.
