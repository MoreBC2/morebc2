# Difficulty adjustment

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

Difficulty adjustment is the process that changes mining difficulty so blocks are found near a target rate.

## What it does

If blocks are found too quickly, difficulty can increase.

If blocks are found too slowly, difficulty can decrease.

The exact adjustment rules are consensus-critical and must be verified against source code for each blockchain.

## Why it matters

Difficulty adjustment affects:

- Block timing.
- Miner incentives.
- Network stability.
- Response to hashrate changes.
- Exchange and service-provider risk analysis.

## BitcoinII-specific notes

Checked BitcoinII source currently shows Bitcoin-style 2016-block retarget behavior:

- Target spacing: 10 minutes.
- Target timespan: 14 days.
- Adjustment interval: 2016 blocks.
- Retarget bounded between one quarter and four times the target timespan.

This page does **not** claim that BitcoinII uses Dark Gravity Wave.

If Dark Gravity Wave or other algorithms are discussed by community members, those discussions belong in Research or Discussion unless an implementation is verified in source code or official releases.

## Sources

- `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/pow.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** BitcoinII-specific values are source-backed but still marked Draft pending full technical review.
