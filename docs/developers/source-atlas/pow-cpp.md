# `src/pow.cpp`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-09-02

## Purpose

`src/pow.cpp` contains BitcoinII proof-of-work difficulty logic and proof-of-work target validation.

For BitcoinII Core `v31.1.0`, this file is also the primary source location for the **ShockWave** difficulty-adjustment implementation.

## Current file-header licensing note

The `v31.1.0` file header distinguishes between inherited MIT-licensed Bitcoin Core / Dash-derived portions and original ShockWave implementation code carrying separate proprietary source-review terms.

Those ShockWave terms permit review, interoperability analysis, compilation, execution, and testing for BitcoinII evaluation while restricting reuse or deployment of the proprietary ShockWave implementation in other projects without permission.

This should not be summarized as meaning normal BitcoinII node operation is prohibited.

## Why it matters

This file helps verify:

- when ShockWave becomes active;
- how per-block difficulty is calculated after activation;
- how rapid hashrate changes are detected;
- how timestamp uncertainty is handled;
- how emergency stall recovery works;
- how post-recovery stabilization works;
- how proof-of-work targets are validated.

## Activation

`IsShockWaveEnabledForNextBlock()` applies ShockWave when the next block height is greater than or equal to `params.nShockWaveActivationHeight`.

Mainnet `v31.1.0` chain parameters set:

- `nShockWaveActivationHeight = 57750`

Therefore block `57750` is the first block whose required work is calculated using ShockWave.

## ShockWave source-backed features

The current file header and implementation identify:

- a MedianTimePast-based 25-block / 24-interval rolling baseline;
- a six-interval difficulty-normalized fast tightening sensor;
- true `+/-4x` per-block final difficulty-adjustment bounds;
- aggressive tightening continuation for unmistakably fast blocks;
- overshoot-regime reset behavior after a real post-ratchet stall;
- newest-block tightening and easing guards;
- trusted-history rules when timestamps are uncertain;
- dual raw/MTP timestamp-consistency checks;
- deterministic candidate-time emergency stall recovery;
- 25% emergency difficulty reductions every five minutes once recovery begins;
- deterministic recovery-regime reset after an emergency block;
- immediate per-block authority while the post-recovery history window refills;
- bounded raw interval timing during recovery refill;
- integer-only consensus arithmetic.

## Historical pre-ShockWave path

BitcoinII retains inherited target-timespan and difficulty-interval parameters used by the pre-activation Bitcoin-style retarget path.

Those historical values include:

- target spacing: 10 minutes;
- target timespan: 14 days;
- historical adjustment interval: 2016 blocks.

They remain relevant to earlier chain history and inherited helpers, but they are not the current post-57750 mainnet difficulty schedule.

## Proof-of-work target checks

`CheckProofOfWork()` continues to validate the compact target and reject invalid or insufficient proof of work.

Reviewed behavior includes rejecting:

- negative targets;
- zero targets;
- overflowed targets;
- targets above `powLimit`;
- hashes greater than the claimed target.

## Mainnet interpretation

Current MoreBC2 wording should be:

> BitcoinII mainnet targets 10-minute blocks and uses ShockWave per-block difficulty adjustment from height 57750. Pre-57750 history used the inherited Bitcoin-style retarget path.

Do not describe current BitcoinII mainnet as using only 2016-block retargeting.

## Dark Gravity Wave relationship

ShockWave's rolling baseline is derived in part from Dark Gravity Wave v3 concepts/code, but ShockWave adds separate BitcoinII mechanisms and should be named as its own algorithm in current documentation.

## Related pages

- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Mining overview](../../mining/mining-overview.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)

## Open questions

- Review all ShockWave-specific tests and link them from this atlas page.
- Map exact validation caller paths for the post-activation next-work calculation.
- Add a bounded technical explanation of emergency recovery with worked examples if useful.
- Confirm maintainer-preferred public `double-SHA256` vs `SHA-256d` wording for block hashing.

## Sources

- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes, partially
**Notes:** The page has been refreshed for the current `v31.1.0` ShockWave implementation. Detailed tests and caller-path review remain open.