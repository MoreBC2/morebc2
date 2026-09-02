# Proof-of-work

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

Proof-of-work is a consensus mechanism where miners search for a block-header hash that satisfies the network's current target.

BitcoinII (BC2) uses double-SHA256 block-header hashing and targets 10-minute blocks.

## Current BitcoinII-specific behavior

BitcoinII Core `v31.1.0` uses **ShockWave** for per-block difficulty adjustment beginning at mainnet height `57750`.

That means proof-of-work remains the same broad security model — miners must satisfy the target encoded by `nBits` — while the method used to calculate the next block's target changed from the historical Bitcoin-style retarget path to ShockWave.

Current source-backed notes:

- Block-header hash path: double-SHA256 via `HashWriter::GetHash()`.
- Target block spacing: 10 minutes.
- ShockWave activation: height `57750`.
- Difficulty after activation: recalculated per block.
- `CheckProofOfWork()` rejects malformed, over-limit, or insufficient-work targets.

## Historical note

Before ShockWave activation, BitcoinII used the inherited Bitcoin-style 2016-block retarget path. That remains relevant to earlier chain history but should not be described as the current mainnet difficulty model.

## Why it matters

Proof-of-work affects:

- network security;
- mining competition;
- block production;
- difficulty adjustment;
- chain selection;
- reorganization risk.

## Related pages

- [Consensus overview](../documentation/consensus-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Mining overview](../mining/mining-overview.md)
- [Difficulty adjustment](difficulty-adjustment.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `v31.1.0/src/primitives/block.cpp`
- `v31.1.0/src/hash.h`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Current BitcoinII-specific PoW and difficulty wording is refreshed for `v31.1.0`; this remains a high-level explainer rather than a complete consensus specification.