# What is BitcoinII?

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-09-02

## Summary

BitcoinII (BC2) is a peer-to-peer proof-of-work cryptocurrency network. BitcoinII Core is the reference software used to connect to the BitcoinII peer-to-peer network, download and validate blocks and transactions, and optionally provide wallet and graphical user interface functionality.

This page is intentionally factual and narrow. It does not make price, investment, or roadmap claims.

## Current release baseline

The current documented BitcoinII Core release is `v31.1.0`, published on 2026-08-29.

Its release notes identify these consensus-level changes:

- ShockWave per-block difficulty adjustment;
- consensus-level Ordinals, inscriptions, and Runes mitigation;
- BC2 transaction replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

## Relationship to Bitcoin Core

BitcoinII source headers identify Bitcoin Core lineage, while BitcoinII now also contains BitcoinII-specific consensus behavior.

Current documentation should therefore distinguish between inherited Bitcoin-style architecture and rules that are specific to modern BitcoinII releases.

## Source-backed current notes

- Target block spacing: 10 minutes.
- Current difficulty adjustment: ShockWave per block from mainnet height `57750`.
- Historical pre-57750 difficulty: inherited Bitcoin-style 2016-block retarget path.
- Subsidy halving interval: 210,000 blocks.
- Block-header hash path: double-SHA256 via `HashWriter::GetHash()`.
- Mainnet P2P port: `8338`.
- ShockWave, data restrictions, and replay protection activate at height `57750`.
- Replay-protection fork ID: `0x01324342`.
- Bitcoin-like Base58 and Bech32 address encodings remain present.
- Explicit replay protection should be mentioned when discussing those Bitcoin-like address encodings.

## RPC note

Inherited/generated example configuration shows mainnet RPC port `8332`.

A dated historical BitcoinII Core `v29.1.0` Windows/mainnet test used `127.0.0.1:8337`. Neither observation proves a universal `v31.1.0` runtime port. Operators must verify the exact release and active configuration.

## What this page does not claim

This page does not claim:

- a recommended exchange confirmation count;
- that every v31 wallet/RPC path has been locally re-tested;
- that a specific future feature is guaranteed;
- that market price or future value can be predicted.

## Where to go next

- [Network specifications](network-specifications.md)
- [Consensus overview](consensus-overview.md)
- [Releases](releases.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Exchange integration package](../exchange/integration-package.md)
- [Verification queue](../verification/README.md)

## Open items

- Confirm strongest official source for ticker `BC2`.
- Confirm official technical/security contact process.
- Complete independent `v31.1.0` release-artifact authentication work.
- Complete detailed source review of replay protection, data restrictions, and fork-aware header synchronization.

## Sources

- Current canonical repository: https://github.com/Bitcoin-II/BitcoinII-Core
- Current release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/kernel/chainparams.cpp`
- `v31.1.0/src/pow.cpp`
- `v31.1.0/src/primitives/block.cpp`
- `v31.1.0/src/hash.h`

## Verification

**Status:** Needs Review
**Primary sources checked:** Partially
**Notes:** Current-facing release and consensus summary is refreshed for `v31.1.0`. Detailed review and runtime testing remain version-scoped where stated.