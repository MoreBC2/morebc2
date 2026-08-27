# Proof-of-work

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

Proof-of-work is a consensus mechanism where miners search for a block header hash that satisfies a difficulty target.

## What it does

Proof-of-work helps a blockchain decide which blocks are valid and which chain has the most accumulated work.

A miner repeatedly changes block data, commonly including a nonce, until the block header hash is below the required target.

## Why it matters

Proof-of-work affects:

- Network security.
- Mining competition.
- Block production.
- Difficulty adjustment.
- Reorganization risk.

## BitcoinII-specific notes

Current source-backed BitcoinII notes are documented in:

- [Consensus overview](../documentation/consensus-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Mining overview](../mining/mining-overview.md)

Those pages currently record a double-SHA256 block header hashing path and Bitcoin-style difficulty retargeting based on checked source files.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/pow.cpp
- `src/primitives/block.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/primitives/block.cpp
- `src/hash.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/hash.h

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** General proof-of-work explanation is background. BitcoinII-specific notes link to source-backed drafts.
