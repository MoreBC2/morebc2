# BitcoinII Consensus Overview

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-09-02

## Summary

This page summarizes BitcoinII consensus behavior that has been checked against public source code and the current BitcoinII Core `v31.1.0` release.

It is intentionally conservative and is not a complete consensus specification.

## Current v31.1.0 consensus changes

BitcoinII Core `v31.1.0` release notes identify these consensus-level changes:

- ShockWave per-block difficulty adjustment;
- consensus-level Ordinals, inscriptions, and Runes mitigation;
- BC2 transaction replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

Mainnet chain parameters activate the principal new consensus rules at height `57750`:

- `nDataRestrictionsHeight = 57750`
- `nShockWaveActivationHeight = 57750`
- `nReplayProtectionHeight = 57750`
- `nReplayProtectionForkId = 0x01324342`

## Block interval and difficulty

BitcoinII mainnet remains configured for 10-minute target block spacing.

The old Bitcoin-style 14-day / 2016-block retarget model describes the pre-ShockWave historical path. Since height `57750`, current mainnet difficulty is calculated **per block** by ShockWave.

Reviewed ShockWave source includes:

- a 25-block / 24-interval MedianTimePast rolling baseline;
- a six-interval fast-hashrate sensor;
- true `+/-4x` final per-block adjustment bounds;
- timestamp-consistency and trusted-history guards;
- emergency stall recovery;
- recovery-regime reset and post-recovery stabilization;
- integer-only consensus arithmetic.

The inherited `nPowTargetTimespan` and 2016-block deployment-window parameters remain present in chain parameters, but should not be described as the current post-57750 difficulty-adjustment schedule.

## Proof-of-work target checks

`CheckProofOfWork()` continues to verify that a block hash satisfies the target encoded by `nBits` and rejects negative, zero, overflowed, over-limit, or insufficient-work targets.

The block-header hash path remains double-SHA256 through `HashWriter::GetHash()`.

## Replay protection

BitcoinII now has explicit BC2 replay protection beginning at height `57750` with a BitcoinII-specific replay-domain fork ID.

This is especially relevant because BitcoinII retains Bitcoin-like address encodings. MoreBC2 should therefore avoid implying that matching address prefixes mean cross-chain replay behavior is unchanged.

A full transaction-format and wallet-UX explanation of the replay mechanism remains a separate source-review task.

## Consensus-level data restrictions

`v31.1.0` activates BitcoinII-specific data restrictions at height `57750`. Release notes describe this as mitigation for Ordinals, inscriptions, and Runes.

MoreBC2 should describe this as a consensus change without overstating its scope until the complete validation and policy paths have been mapped.

## Header synchronization

The `v31.1.0` release includes fork-aware header synchronization. This belongs in current node and architecture documentation because header-processing behavior can affect recovery and synchronization around competing branches.

## Monetary units and money range

`src/consensus/amount.h` defines:

- `COIN = 100000000`
- `MAX_MONEY = 21000000 * COIN`

The subsidy halving interval remains `210000` blocks.

## Existing consensus areas retained from earlier review

MoreBC2 has also reviewed first-pass source anchors for:

- context-independent transaction checks;
- transaction finality and sequence locks;
- UTXO-input checks;
- script execution and verification helpers;
- block validation and connection;
- reorganization handling;
- mempool-policy boundaries.

Those sections are not invalidated merely because v31 changed other consensus paths, but release-specific caller changes still need spot-checking where the `v31.1.0` release notes identify validation, mempool, wallet, RPC, or PSBT changes.

## Open items

- Map the replay-protection transaction path in detail.
- Map the consensus-level data-restriction validation path in detail.
- Review fork-aware header synchronization caller behavior.
- Re-check mandatory block-validation flags vs mempool policy under `v31.1.0`.
- Verify current block subsidy calculation from code, not only the halving interval.
- Confirm maintainer-preferred public wording for the PoW hash function (`double-SHA256` vs `SHA-256d`).

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/consensus/amount.h`
- `src/consensus/tx_check.*`
- `src/consensus/tx_verify.*`
- `src/script/interpreter.*`
- `src/validation.cpp`

## Verification

**Status:** Needs Review
**Primary sources checked:** Partially
**Notes:** Current-facing consensus and difficulty wording is refreshed for `v31.1.0`. Detailed review of the new replay-protection, data-restriction, fork-aware synchronization, and associated validation/RPC paths remains open.