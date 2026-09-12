# Difficulty adjustment

**Category:** Documentation  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Summary

Difficulty adjustment is the consensus process that changes the proof-of-work target so block production can respond to changes in effective network hashrate.

BitcoinII (BC2) targets 10-minute blocks. Since mainnet height `57750`, BitcoinII Core `v31.1.0` uses **ShockWave**, a per-block difficulty-adjustment algorithm. Current BitcoinII mainnet should therefore **not** be described as using a 2016-block-only retarget schedule.

## Target, difficulty, and `nBits`

A block header stores the proof-of-work target in compact form as `nBits`.

A valid block-header hash must satisfy that target. Lower targets require more expected work; higher targets require less.

`GetNextWorkRequired()` is the production consensus entry point used to determine the required `nBits` for a candidate block.

Before the ShockWave activation height, BitcoinII can use the historical inherited difficulty path. At and after height `57750`, the production path dispatches to ShockWave.

## ShockWave activation

Current mainnet `v31.1.0` sets:

```text
nShockWaveActivationHeight = 57750
```

That means block `57750` is the first mainnet block whose required work is determined by ShockWave.

## Current ShockWave behavior

The release-pinned source review establishes these externally useful properties:

- difficulty is recalculated for each next block after activation;
- the longer rolling sample uses 25 block indexes / 24 completed timing intervals;
- its timing baseline uses MedianTimePast endpoints;
- a separate short-horizon response examines the six most recent completed intervals;
- normal target movement is bounded relative to the preceding target, subject to `powLimit`;
- recent-header timing consistency checks limit inappropriate easing from timestamp behavior;
- candidate header time is part of the stalled-chain recovery path;
- future-time allowance is accounted for before emergency easing begins;
- emergency recovery becomes eligible after 30 minutes of adjusted stall time and can continue in source-defined five-minute steps;
- the implementation contains stabilization behavior while the recent-history window moves through a large timing event.

The exact consensus behavior is defined by `v31.1.0/src/pow.cpp`; this page intentionally summarizes the algorithm rather than reproducing its implementation.

## Candidate time matters

ShockWave creates an operational requirement that is easy to miss in Bitcoin-derived mining software.

Current `src/node/miner.cpp` recalculates required work when the candidate block time changes:

```text
GetNextWorkRequired(previous_block, candidate_header, consensus_params)
```

A miner, pool, proxy, or template implementation that updates `nTime` while keeping stale `nBits` can therefore construct an invalid BC2 candidate after ShockWave activation.

This is why SHA-256d support or Bitcoin-style block-template support alone does not prove current BC2 mining compatibility.

See [Mining overview](../mining/mining-overview.md) and [Block-template assembly](../developers/source-atlas/miner.md).

## Historical pre-ShockWave behavior

Before height `57750`, BitcoinII used the inherited Bitcoin-style retarget path with:

- target spacing: 10 minutes;
- target timespan: 14 days;
- adjustment interval: 2016 blocks;
- bounded retarget-timespan behavior.

Those parameters remain present because they are still relevant to historical chain validation and inherited helpers. They are **not** the active post-`57750` mainnet schedule.

## Dark Gravity Wave relationship

The `v31.1.0/src/pow.cpp` notice attributes part of the rolling calculation to Dark Gravity Wave v3 concepts/code.

That lineage does not mean the complete BitcoinII algorithm is ordinary DGW. The BitcoinII implementation identifies the post-activation mechanism as **ShockWave**, and MoreBC2 uses that name for current BC2 behavior.

## Difficulty versus chain selection

ShockWave determines the required work for individual next blocks. It does **not** replace BitcoinII's best-chain rule.

Competing valid usable branches are still selected by **accumulated chainwork**.

That distinction matters for confirmations and reorganizations: a raw block count is not the same thing as cumulative proof of work, especially when block targets can vary each block.

See [Reorganizations](reorganizations.md) and [Confirmations](confirmations.md).

## Why difficulty adjustment matters

Difficulty adjustment affects:

- block timing;
- miner and pool template validity;
- response to rapid hashrate changes;
- stalled-chain recovery;
- cumulative chainwork growth;
- service-provider settlement and reorganization analysis.

It should not be used by itself as a profitability forecast or a guarantee of future block timing.

## Runtime evidence boundary

MoreBC2 has current v31 node runtime evidence and isolated local block generation through `generatetoaddress`, but has **not** yet executed controlled ShockWave vectors that vary candidate time and independently reproduce normal, rapid-hashrate, and emergency-stall target outputs.

Accordingly:

- activation and algorithm structure are release-pinned **source-confirmed**;
- the general current node/mining paths have bounded runtime evidence;
- exact ShockWave transition vectors remain unexecuted by MoreBC2.

## Related pages

- [Proof-of-work](proof-of-work.md)
- [Confirmations](confirmations.md)
- [Reorganizations](reorganizations.md)
- [Mining overview](../mining/mining-overview.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [`src/pow.cpp` Source Atlas](../developers/source-atlas/pow-cpp.md)
- [Block-template assembly](../developers/source-atlas/miner.md)
- [Network specifications](../documentation/network-specifications.md)

## Sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/pow.cpp`
- `src/pow.h`
- `src/kernel/chainparams.cpp`
- `src/consensus/params.h`
- `src/node/miner.cpp`
- `src/headerssync.cpp`

Canonical release/tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` ShockWave, chain-parameter, mining/template, and header-sync source reviews  
**Notes:** Current activation, historical/current boundary, broad controller structure, candidate-time coupling, and chain-selection distinction are source-backed. Independent controlled ShockWave runtime vectors remain open.
