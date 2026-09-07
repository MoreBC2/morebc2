# BitcoinII v31 ShockWave difficulty adjustment

**Category:** Developer / Source Atlas
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-07

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

The normal calculation reads 25 block-index entries, which provide 24 time gaps. It obtains its time endpoints through `GetMedianTimePast()` and averages the targets represented by those entries. The elapsed-time input and the final target are each bounded; in normal operation the next target stays between one quarter and four times the preceding target, subject to `powLimit`.

## Short-horizon response

The 25-block calculation is not the algorithm's only input. The code also examines the six most recent completed intervals, taking account of the target assigned to each interval. Depending on that recent evidence, the next target may be constrained or may move more quickly than the longer-window result.

This page does not reproduce the source comments' catalogue or labels for the internal decision rules. Review `src/pow.cpp` for the controlling implementation.

## Timestamp handling

The calculation uses MedianTimePast as well as header timestamps. When recent header time is too far ahead of the implementation's MTP-based comparison value, that header time is not accepted as evidence for reducing the required work.

## Emergency stall recovery

The emergency path becomes eligible only after the code calculates 30 minutes of stall time after accounting for `MAX_FUTURE_BLOCK_TIME`. At that threshold it applies one 25% difficulty reduction; another is applied for every additional five minutes, subject to the implementation's limits.

After a block qualifies for this path, later target calculations use post-event history while the normal MTP sampling window advances beyond the earlier stall. The exact transition rules are implementation details in `src/pow.cpp` and are not restated here.

## Header-sync interaction

ShockWave cannot be validated in header pre-synchronization from only the previous header's target. The rolling calculation needs historical targets and MTP state.

BitcoinII therefore extends `HeadersSyncState` with a bounded synthetic `CBlockIndex` history. The header-sync code retains 25 rolling targets plus 10 additional predecessors needed for the oldest sampled block's MTP, for a total 35-entry history.

That temporary history is used in both PRESYNC and REDOWNLOAD to call the same production `GetNextWorkRequired()` logic used by contextual block-header validation.

## Licensing boundary

The notice at the start of `src/pow.cpp` is controlling for that file. It identifies inherited Bitcoin Core and Dash/Darkcoin portions as MIT-licensed and applies separate, non-open-source terms to original ShockWave implementation material.

MoreBC2's factual account and original explanatory prose do not convey rights in the ShockWave source, its comments, or its implementation. Those upstream materials must be excluded from any future MoreBC2 documentation license; readers must consult the upstream notice for permitted uses.

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
