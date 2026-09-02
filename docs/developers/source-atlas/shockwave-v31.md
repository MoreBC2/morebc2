# BitcoinII v31 ShockWave difficulty adjustment

**Category:** Developer / Source Atlas
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Purpose

This page records the BitcoinII Core `v31.1.0` ShockWave difficulty-adjustment path at a level deeper than the general `pow.cpp` overview.

## Activation boundary

Mainnet sets:

```text
nShockWaveActivationHeight = 57750
```

`IsShockWaveEnabledForNextBlock` treats block `H` as the first ShockWave block when `H` equals the configured activation height. Blocks before activation continue through the preserved Bitcoin-style difficulty path.

## Production entry point

`GetNextWorkRequired()` remains the consensus entry point used to determine a candidate block's required `nBits`.

Before activation it dispatches to the historical Bitcoin retarget behavior. At and after activation it dispatches to ShockWave using the previous block index plus the candidate header, which matters because candidate time can affect emergency stall recovery.

Mining code recalculates required work when candidate time changes so block-template `nBits` stays aligned with ShockWave.

## Rolling baseline

The normal controller uses:

- 25 sampled blocks;
- 24 completed intervals;
- MedianTimePast timing;
- an arithmetic mean of sampled targets;
- an ordinary 1/4x-to-4x window-timespan governor;
- explicit final per-block target bounds relative to the immediately previous block.

The final bound means normal next-block target cannot become more than four times harder or four times easier than the previous target, subject to `powLimit`.

## Short-horizon response

The implementation also contains a six-interval raw-timestamp controller intended to react faster than the 25-block rolling baseline when observed work changes sharply.

Source comments identify mechanisms including:

- difficulty-normalized short-interval tightening;
- aggressive-ratchet continuation for unmistakably fast blocks;
- overshoot-regime reset after a real stall;
- newest-block tightening/easing vetoes;
- trusted-history handling when raw timestamps and MTP disagree.

MoreBC2 should describe these as source-observed mechanisms rather than trying to reduce ShockWave to one moving-average formula.

## Timestamp handling

ShockWave uses both MedianTimePast and raw header timestamps.

The code projects the MTP clock toward the effective tip and compares it with recent raw timestamps. Raw timing that is materially ahead of the projected MTP clock loses authority for easing/moderation decisions.

This is designed so timestamp disagreement may delay easier work but cannot manufacture easier work.

## Emergency stall recovery

The source defines:

- stall trigger: 30 minutes;
- recovery step: 5 minutes;
- emergency reductions: 25% difficulty reduction for each five-minute recovery step once recovery becomes available;
- Bitcoin Core `MAX_FUTURE_BLOCK_TIME` retained as the timestamp uncertainty budget.

The full future-time allowance is subtracted before candidate time can justify emergency easing.

After an emergency block, the algorithm enters a recovery/refill regime while MTP history becomes clean again. During this period, post-recovery raw intervals are bounded and the code retains immediate per-block authority rather than trusting stale pre-recovery history.

## Header-sync interaction

ShockWave cannot be validated in header pre-synchronization from only the previous header's target. The rolling calculation needs historical targets and MTP state.

BitcoinII therefore extends `HeadersSyncState` with a bounded synthetic `CBlockIndex` history. The header-sync code retains 25 rolling targets plus 10 additional predecessors needed for the oldest sampled block's MTP, for a total 35-entry history.

That temporary history is used in both PRESYNC and REDOWNLOAD to call the same production `GetNextWorkRequired()` logic used by contextual block-header validation.

## Licensing boundary

The `pow.cpp` header states that inherited Bitcoin Core and Dash/Darkcoin portions retain their applicable MIT terms, while original ShockWave implementation material is under separate proprietary source-review/reuse terms.

The source expressly permits review, audit, compilation, execution and testing for the stated review/evaluation purposes, but does not grant reuse/deployment rights for ShockWave in another blockchain/product/service without permission.

## What remains open

- Map each internal ShockWave helper to specific unit/functional tests.
- Execute the available upstream tests against a clean `v31.1.0` build.
- Produce empirical network examples showing response to abrupt hashrate entry/exit.
- Document exact emergency-recovery target progression with controlled test vectors.

## Primary sources

Pinned to `v31.1.0`:

- `src/pow.cpp`
- `src/pow.h`
- `src/kernel/chainparams.cpp`
- `src/consensus/params.h`
- `src/node/miner.cpp`
- `src/headerssync.h`
- `src/headerssync.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** Yes, `v31.1.0`
**Notes:** Activation, core controller structure, emergency timing constants, production entry point, miner interaction and headers-sync history are source-backed. Test execution and empirical behavior remain open.