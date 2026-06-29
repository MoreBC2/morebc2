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

### Difficulty adjustment limits

`CalculateNextWorkRequired()` limits the actual timespan used for retargeting:

- Minimum actual timespan: target timespan divided by 4.
- Maximum actual timespan: target timespan multiplied by 4.

This means a single retarget step is bounded in either direction.

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
