# Difficulty adjustment

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

Difficulty adjustment is the consensus process that changes the proof-of-work target so blocks are found near the intended rate as network hashrate changes.

BitcoinII (BC2) targets 10-minute blocks. Since mainnet height `57750`, current BitcoinII Core uses the **ShockWave** per-block difficulty-adjustment algorithm rather than the older Bitcoin-style 2016-block-only retarget path.

## Current BitcoinII behavior

BitcoinII Core `v31.1.0` activates ShockWave at mainnet height `57750` through `nShockWaveActivationHeight`.

Current reviewed source shows that ShockWave:

- calculates the next work requirement on a per-block basis after activation;
- uses a 25-block / 24-interval rolling baseline based on MedianTimePast;
- includes a short six-interval fast-hashrate sensor;
- applies true `+/-4x` per-block final difficulty-adjustment bounds;
- includes timestamp-consistency handling and trusted-history guards;
- includes emergency stall recovery with deterministic easing rules;
- includes recovery and post-recovery stabilization behavior;
- uses integer-only consensus arithmetic.

The configured target block spacing remains 10 minutes.

## Historical behavior

Before ShockWave activation, BitcoinII used the inherited Bitcoin-style retarget model based on:

- 10-minute target spacing;
- 14-day target timespan;
- a 2016-block adjustment interval;
- 1/4x to 4x timespan bounds at retarget boundaries.

Those parameters remain present in chain parameters because they are still relevant to pre-activation history and inherited consensus helpers. They should not be described as the current post-57750 mainnet difficulty algorithm.

## Dark Gravity Wave relationship

ShockWave is a BitcoinII-specific algorithm. Its rolling baseline is derived in part from concepts and code originating in Dark Gravity Wave v3, while the current implementation adds separate BitcoinII mechanisms for rapid hashrate response, overshoot control, timestamp uncertainty, emergency recovery, and stabilization.

Accordingly, MoreBC2 should describe the current algorithm as **ShockWave**, not simply as Dark Gravity Wave.

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