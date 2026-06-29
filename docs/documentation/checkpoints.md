# Checkpoints

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

BitcoinII Core mainnet chain parameters include checkpoint data.

This page exists so checkpoint-related information can be documented in one place instead of being copied into every network or consensus page.

## Source location

Checkpoint data is defined in:

- `src/kernel/chainparams.cpp`

## What is currently verified

The reviewed source shows mainnet checkpoint data for multiple heights, including early rule activation heights and later chain heights.

Examples visible in the reviewed source range include:

- `50`
- `250`
- `260`
- `270`
- `280`
- `290`
- `425`
- `500`
- `750`
- `1000`
- `1250`
- `1500`
- `1750`
- `1900`
- `2000`
- `2016`
- `10000`
- `15000`
- `20000`
- `25000`
- `30000`

## Why checkpoints matter

Checkpoints can help node software recognize known historical chain points.

MoreBC2 should be careful not to overstate what checkpoints do. A full explanation should be based on source-code review of how BitcoinII Core uses checkpoint data.

## Open items

- Review the full checkpoint table without truncation.
- Decide whether to list every checkpoint hash.
- Review how checkpoint data is used elsewhere in source.
- Confirm whether checkpoints differ across release branches.
- Confirm whether checkpoint data should be included in exchange documentation.

## Related pages

- [Network specifications](network-specifications.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Verification queue](../verification/README.md)

## Sources

- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page records the existence and visible examples of checkpoint data. The full table still needs a complete review.
