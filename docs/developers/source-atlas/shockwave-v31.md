# BitcoinII v31 ShockWave difficulty adjustment

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Purpose

This page records BitcoinII Core `v31.1.0` ShockWave difficulty adjustment at a deeper level than the general [`pow.cpp`](pow-cpp.md) atlas page.

## Activation boundary

Mainnet sets:

```text
nShockWaveActivationHeight = 57750
```

Block height `57750` is the first mainnet block whose required work is determined by ShockWave. Earlier history uses the preserved Bitcoin-style difficulty path.

## Production entry point

`GetNextWorkRequired()` remains the consensus entry point for a candidate block's required `nBits`.

At/after activation it dispatches to ShockWave using the previous block index plus the candidate header. Candidate time matters because the algorithm contains timestamp-aware behavior and emergency stall recovery.

Mining/template code therefore recalculates required work when candidate time changes.

## Rolling baseline

The normal calculation reads 25 block-index entries, yielding 24 completed time gaps. It uses MedianTimePast endpoints and target history to produce the longer-window result.

The implementation bounds the result relative to the preceding target; in the normal path, next-target movement is limited to a fourfold change in either direction, subject to `powLimit`.

## Short-horizon response

ShockWave also examines the six most recent completed intervals. This short-horizon path allows the algorithm to respond more quickly to abrupt hashrate changes than the longer window alone.

The release-pinned implementation, not descriptive prose, remains authoritative for the exact internal decision rules.

## Timestamp safeguards

The code compares recent header time with MedianTimePast-derived context and prevents future-skewed timestamps from being used as inappropriate evidence for reducing required work.

## Emergency stall recovery

The emergency path becomes eligible after the code calculates 30 minutes of adjusted stall time after accounting for `MAX_FUTURE_BLOCK_TIME`.

At that threshold, source review shows a 25% difficulty reduction, with additional 25% reductions for each further five-minute step, subject to the implementation's bounds/limits.

The exact transition and post-event stabilization behavior remains defined by `src/pow.cpp`.

## Header-sync interaction

ShockWave cannot be validated from only the previous header's target. The rolling history and MedianTimePast state are needed.

`HeadersSyncState` therefore carries bounded synthetic `CBlockIndex` history for PRESYNC and REDOWNLOAD:

- 25 rolling target entries;
- 10 additional predecessors needed for the oldest sample's MTP context;
- 35 temporary indexes total.

That history is used to call the same production next-work logic used during contextual header validation.

See [Fork-aware header synchronization](headers-sync-v31.md).

## Chain-selection boundary

ShockWave changes the work target required for each new block. It does not replace BitcoinII's accumulated-chainwork best-chain selection.

This distinction matters for reorg/deposit-risk analysis: confirmation count is an operational threshold, while competing valid branches are fundamentally compared by accumulated work.

## Mining/pool implication

A Bitcoin-derived miner/pool/proxy that updates candidate `nTime` while assuming difficulty remains fixed between 2016-block boundaries can create invalid work under current BC2.

The September 12 Mining audit records current public pool/Stratum configuration, but MoreBC2 has not performed an end-to-end BC2 Stratum share test or a controlled template-time ShockWave vector.

See [Block-template assembly](miner.md), [Mining RPC](rpc-mining.md), and [Mining overview](../../mining/mining-overview.md).

## Runtime boundary

The September Windows `v31.1.0` runtime work established current node/header operation and isolated local regtest block generation, but it did not independently force the mainnet ShockWave activation or test candidate-time progression under controlled hashrate/stall scenarios.

ShockWave activation and algorithm details here are source-confirmed, not independently reproduced consensus vectors.

## Licensing boundary

The notice at the start of `src/pow.cpp` controls rights in that file. It identifies inherited Bitcoin Core and Dash/Darkcoin portions under their applicable MIT terms and gives original ShockWave implementation material separate non-open-source terms.

MoreBC2's factual descriptions do not relicense the implementation or its comments.

## Open work

- Map ShockWave helpers to specific current unit/functional tests.
- Execute the relevant upstream tests against a clean `v31.1.0` build.
- Create controlled candidate-time/`nBits` vectors for normal and emergency paths.
- Produce dated empirical examples only where methodology is clear and reproducible.

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

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` ShockWave, miner, chain-parameter, and header-sync paths  
**Notes:** Activation, controller structure, timing inputs, emergency thresholds, mining interaction, and header-sync history are source-backed. Independent controlled ShockWave runtime vectors remain open.
