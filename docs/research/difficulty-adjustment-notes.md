# Difficulty Adjustment Notes

**Category:** Research
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page tracks research questions around BitcoinII difficulty adjustment, including how the current ShockWave implementation differs from earlier behavior and from related algorithms.

## Current BitcoinII status

BitcoinII Core `v31.1.0` verifies that BitcoinII now uses **ShockWave** for per-block difficulty adjustment beginning at mainnet height `57750`.

The current source no longer supports describing present-day BitcoinII mainnet as using only Bitcoin-style 2016-block retargeting.

ShockWave uses a rolling baseline derived in part from Dark Gravity Wave v3 concepts/code, but adds BitcoinII-specific rapid response, overshoot control, timestamp uncertainty handling, emergency stall recovery, and stabilization logic.

Accordingly:

- `ShockWave` is the correct current algorithm name.
- `Dark Gravity Wave` alone is incomplete wording for the current BitcoinII implementation.
- The inherited 2016-block retarget remains historically relevant before ShockWave activation.

## Research questions

- How does ShockWave behave under abrupt rental/mining hashrate spikes?
- How quickly does difficulty recover after hashrate leaves?
- How often does emergency stall recovery activate under real network conditions?
- How do raw timestamps and MedianTimePast interact in edge cases?
- What tests cover aggressive tightening, overshoot reset, and recovery refill?
- How did live block timing change after activation at height `57750`?
- How does ShockWave compare empirically with DGWv3 and other per-block algorithms without implying code equivalence?

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** Current implementation identity and activation are source-backed. This page remains Research because empirical network-performance questions are still open.