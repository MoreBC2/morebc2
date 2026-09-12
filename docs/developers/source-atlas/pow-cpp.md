# `src/pow.cpp`

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Purpose

`src/pow.cpp` contains BitcoinII proof-of-work target validation and the current `v31.1.0` **ShockWave** difficulty-adjustment implementation.

This page records externally important source behavior and links to the deeper [ShockWave v31](shockwave-v31.md) review. Exact consensus behavior remains defined by the release-pinned implementation.

## Current file-header licensing note

The notice in `v31.1.0/src/pow.cpp` places inherited Bitcoin Core and Dash/Darkcoin portions under their applicable MIT terms and gives original ShockWave implementation material separate terms that are not an open-source license.

MoreBC2 reports technical facts from review of that file. It does not reproduce or relicense the ShockWave implementation or source comments; the upstream notice controls rights in that material.

## Activation

`IsShockWaveEnabledForNextBlock()` applies ShockWave when the candidate/next height is greater than or equal to `params.nShockWaveActivationHeight`.

Mainnet `v31.1.0` sets:

```text
nShockWaveActivationHeight = 57750
```

Therefore block height `57750` is the first mainnet block whose required work is determined by ShockWave.

## Production next-work path

`GetNextWorkRequired()` remains the production entry point used to obtain a candidate block's required `nBits`.

Before activation it can use the inherited historical difficulty path. At and after activation it dispatches to ShockWave using recent chain state plus the candidate header.

That candidate-header input is operationally important because candidate time can affect the post-activation result.

## ShockWave calculation scope

Current release-pinned review establishes these externally useful properties:

- a longer rolling sample of 25 block indexes / 24 completed timing intervals;
- MedianTimePast-based timing endpoints for the longer sample;
- a separate short-horizon view of the six most recent completed intervals;
- normal next-target movement bounded relative to the preceding target, subject to `powLimit`;
- recent-header timestamp consistency checks;
- candidate-time emergency stall recovery;
- future-time allowance accounted for before emergency easing begins;
- recovery eligibility after 30 minutes of adjusted stall time, followed by additional source-defined easing steps at five-minute intervals;
- post-event stabilization while the sampling window advances.

This page intentionally summarizes behavior rather than reproducing the implementation's detailed internal rule catalogue.

## Candidate-time / mining implication

Current `src/node/miner.cpp` recalculates required work when candidate time changes:

```text
GetNextWorkRequired(previous_block, candidate_header, consensus_params)
```

A miner, pool, proxy, or template implementation that rolls `nTime` while retaining stale `nBits` can therefore construct an invalid BC2 candidate after ShockWave activation.

This is one of the main reasons generic Bitcoin/SHA-256d mining compatibility should not be assumed without BC2-specific qualification.

See [Block-template assembly](miner.md) and [Mining RPC](rpc-mining.md).

## Historical pre-ShockWave path

BitcoinII retains inherited target-timespan and difficulty-interval parameters relevant to pre-activation history and inherited helpers:

- target spacing: 10 minutes;
- target timespan: 14 days;
- historical adjustment interval: 2016 blocks.

Those values are **not** the current post-`57750` mainnet difficulty schedule.

## Proof-of-work target checks

`CheckProofOfWork()` continues to validate the compact target and reject invalid or insufficient proof of work.

Reviewed behavior includes rejecting:

- negative targets;
- zero targets;
- overflowed targets;
- targets above `powLimit`;
- hashes greater than the claimed target.

## Chain selection boundary

ShockWave changes how the required target for each new block is calculated. It does **not** replace BitcoinII's accumulated-work chain-selection model.

Competing chain candidates are still evaluated through accumulated chain work in the validation/chain-selection path. Confirmation count is therefore not a separate protocol-finality rule; reorganization risk is fundamentally work-based.

See [Life of a reorganization](../../architecture/life-of-a-reorg.md).

## Dark Gravity Wave relationship

The `src/pow.cpp` notice attributes part of ShockWave's rolling calculation to Dark Gravity Wave v3 concepts/code. That lineage does not make the complete BitcoinII algorithm identical to DGW.

Current documentation should use the name **ShockWave** for BitcoinII's post-activation algorithm.

## Header-sync interaction

ShockWave requires more recent history than a single previous header target. BitcoinII `v31.1.0` therefore carries bounded synthetic block-index history through its fork-aware header-sync path so header synchronization can call the production next-work logic.

See [Fork-aware header synchronization](headers-sync-v31.md).

## Runtime boundary

MoreBC2 has current v31 node runtime evidence and isolated local block generation through `generatetoaddress`, but it has **not** yet executed controlled ShockWave vectors that vary candidate time and compare resulting `nBits` across normal, rapid-hashrate, and emergency-stall cases.

Activation thresholds and algorithm behavior on this page are source-confirmed rather than independently reproduced consensus test vectors.

## Related pages

- [ShockWave v31](shockwave-v31.md)
- [Block-template assembly](miner.md)
- [Mining RPC](rpc-mining.md)
- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Mining overview](../../mining/mining-overview.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)

## Primary sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/pow.cpp`
- `src/pow.h`
- `src/kernel/chainparams.cpp`
- `src/consensus/params.h`
- `src/node/miner.cpp`
- `src/headerssync.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` ShockWave, chain-parameter, miner, and header-sync paths  
**Notes:** Activation, broad controller structure, target validation, candidate-time coupling, emergency timing, and historical/current difficulty boundary are source-backed. Independent controlled ShockWave runtime vectors remain open.
