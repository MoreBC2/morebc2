# BitcoinII Consensus Overview

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-29

## Summary

This page summarizes consensus behavior that has been checked against public BitcoinII source code.

It is intentionally narrow. If a value is not checked against source or official release materials, it should remain out of this page or be listed as an open item.

## Verified from source

### Block interval and retargeting

BitcoinII mainnet is configured for:

- 10-minute target block spacing.
- 14-day target retarget timespan.
- 2016-block difficulty adjustment interval.

`src/pow.cpp` shows that difficulty changes only at the configured adjustment interval. On mainnet, blocks between adjustment intervals keep the previous `nBits` value.

### Difficulty adjustment calculation

`GetNextWorkRequired()` checks whether the next block height falls on the configured difficulty adjustment interval.

If it does not, and min-difficulty blocks are not allowed, the previous block's `nBits` value is reused.

At an adjustment interval, the function finds the first block in the adjustment window and calls `CalculateNextWorkRequired()`.

### Difficulty adjustment limits

`CalculateNextWorkRequired()` limits the actual timespan used for retargeting:

- Minimum actual timespan: target timespan divided by 4.
- Maximum actual timespan: target timespan multiplied by 4.

It then scales the old target by actual timespan divided by target timespan and caps the result at `powLimit`.

This means a single retarget step is bounded in either direction.

### Difficulty transition checks

`PermittedDifficultyTransition()` checks whether an observed transition is within permitted bounds.

Source-backed behavior:

- If min-difficulty blocks are allowed, it returns true.
- At adjustment heights, it checks the new target against the 1/4x to 4x permitted range.
- Away from adjustment heights, it rejects changes where `old_nbits` and `new_nbits` differ.

### Proof-of-work target checks

`CheckProofOfWork()` verifies that a block hash satisfies the target encoded by `nBits`.

Source-backed behavior:

- It rejects negative targets.
- It rejects zero targets.
- It rejects overflowed targets.
- It rejects targets above `powLimit`.
- It rejects hashes greater than the target.

### No Dark Gravity Wave claim

This page does **not** claim that BitcoinII implements Dark Gravity Wave.

Based on the checked source path, the current verified description is Bitcoin-style 2016-block retargeting.

### Block header hashing

`CBlockHeader::GetHash()` uses `HashWriter::GetHash()`.

`HashWriter::GetHash()` performs SHA-256, then SHA-256 again over the first result. The source comments describe this as double-SHA256.

### Monetary units

`src/consensus/amount.h` defines:

- `COIN = 100000000`
- `MAX_MONEY = 21000000 * COIN`

The source comments call `MAX_MONEY` a consensus-critical money-range sanity check rather than a direct statement that the total supply equals that number at all times.

## Open items

- Confirm preferred public wording for the mining algorithm: `double-SHA256`, `SHA-256d`, or another maintainer-preferred phrase.
- Verify current block subsidy schedule from the subsidy calculation code, not just halving interval.
- Verify activation status and behavior for SegWit/Taproot from chain state or release notes.
- Confirm any BitcoinII-specific consensus changes outside `chainparams`, `pow`, `block`, `hash`, and `amount` files.
- Review validation code to document where proof-of-work checks are called.

## Sources

- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp
- `src/primitives/block.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/primitives/block.cpp
- `src/hash.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/hash.h
- `src/consensus/amount.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/consensus/amount.h

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes
**Notes:** This page should be reviewed against the currently running release before being marked Verified.
