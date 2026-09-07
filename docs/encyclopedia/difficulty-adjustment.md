# Difficulty adjustment

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-07

## Summary

Difficulty adjustment is the consensus process that changes the proof-of-work target so blocks are found near the intended rate as network hashrate changes.

BitcoinII (BC2) targets 10-minute blocks. Since mainnet height `57750`, current BitcoinII Core uses the **ShockWave** per-block difficulty-adjustment algorithm rather than the older Bitcoin-style 2016-block-only retarget path.

## Current BitcoinII behavior

BitcoinII Core `v31.1.0` activates ShockWave at mainnet height `57750` through `nShockWaveActivationHeight`.

For every block at or above that height, the implementation calculates a required target using recent chain history. Its longer sample covers 25 blocks and 24 completed intervals measured with MedianTimePast. A separate calculation uses the latest six completed intervals. The final normal target is limited to a fourfold change in either direction from the previous block's target.

Candidate header time is also an input to a defined stalled-chain path. The source, rather than this overview, remains the authority for the internal conditions and transition logic.

The configured target block spacing remains 10 minutes.

## Historical behavior

Before ShockWave activation, BitcoinII used the inherited Bitcoin-style retarget model based on:

- 10-minute target spacing;
- 14-day target timespan;
- a 2016-block adjustment interval;
- 1/4x to 4x timespan bounds at retarget boundaries.

Those parameters remain present in chain parameters because they are still relevant to pre-activation history and inherited consensus helpers. They should not be described as the current post-57750 mainnet difficulty algorithm.

## Dark Gravity Wave relationship

The BitcoinII source notice attributes part of the rolling calculation to Dark Gravity Wave v3 concepts and code. The complete post-activation implementation is identified by BitcoinII as **ShockWave**, so the names should not be used interchangeably.

Original ShockWave source and comments remain subject to the separate terms stated in `v31.1.0/src/pow.cpp`; this independently written overview does not relicense them.

## Why it matters

Difficulty adjustment affects:

- block timing;
- miner incentives;
- network response to sudden hashrate changes;
- recovery from stalls;
- reorganization and service-provider risk analysis.

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** The current post-activation description is source-backed against BitcoinII Core `v31.1.0`. This page intentionally summarizes the algorithm rather than reproducing implementation details.
