# `src/pow.cpp`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-09-07

## Purpose

`src/pow.cpp` contains BitcoinII proof-of-work difficulty logic and proof-of-work target validation.

For BitcoinII Core `v31.1.0`, this file is also the primary source location for the **ShockWave** difficulty-adjustment implementation.

## Current file-header licensing note

The notice in `v31.1.0/src/pow.cpp` places inherited Bitcoin Core and Dash/Darkcoin portions under their applicable MIT terms. It gives original ShockWave implementation material separate terms that are not an open-source license.

This MoreBC2 page reports technical facts from review of that file. It neither reproduces the source license nor grants rights in the ShockWave implementation or source comments. The upstream notice controls use of those materials and is not a restriction stated by MoreBC2 on ordinary BitcoinII node operation.

## Why it matters

Reviewing this file establishes the activation boundary, the inputs to per-block target calculation, and the checks applied to a claimed proof-of-work target. It also establishes that candidate time and recent chain history can select different calculation paths. Precise internal behavior remains defined by the source.

## Activation

`IsShockWaveEnabledForNextBlock()` applies ShockWave when the next block height is greater than or equal to `params.nShockWaveActivationHeight`.

Mainnet `v31.1.0` chain parameters set:

- `nShockWaveActivationHeight = 57750`

At height `57750`, the node begins using ShockWave to determine the block's required `nBits` value.

## ShockWave calculation scope

After activation, the code computes a new target for each block. The calculation considers a 25-block MTP-based history and a shorter six-interval view of header timing. It bounds the resulting target relative to the preceding block and contains a candidate-time path for a sufficiently long chain stall.

Those observations describe inputs, thresholds, and externally relevant results. This page intentionally does not reproduce the source comments' ordered feature list or its detailed explanation of the internal control rules. The implementation remains the authority for those details.

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

The `src/pow.cpp` notice says part of ShockWave's rolling calculation comes from Dark Gravity Wave v3 concepts and code. That lineage does not make the complete BitcoinII algorithm identical to DGW, so current documentation should use the name **ShockWave** and preserve the Dash/Darkcoin attribution.

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
