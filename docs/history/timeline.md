# BitcoinII timeline

**Category:** History  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This timeline preserves dated BitcoinII (BC2) milestones that MoreBC2 can tie to source, release metadata, or preserved historical repository observations.

It is intentionally incomplete. Absence from this page does not mean an event did not happen; it means MoreBC2 has not yet added it with evidence strong enough for the historical record.

## 2024

### 2024-12-04 — date embedded in the genesis timestamp message

Current BitcoinII Core source constructs the genesis coinbase with this text:

> BBC News 12/04/2024 French government collapses in no-confidence vote

The `12/04/2024` date belongs to the newspaper-style timestamp text. It should **not** be confused with the actual block-header time encoded for the genesis block.

### 2024-12-12 — mainnet genesis block time in current source

Current `v31.1.0` mainnet chain parameters call `CreateGenesisBlock` with Unix time `1734019071`, corresponding to **2024-12-12 15:57:51 UTC**.

The same release-pinned source asserts:

- genesis hash `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`;
- merkle root `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`.

See [Network specifications](../documentation/network-specifications.md) for the current source-backed network values.

## 2025

### 2025-07-28 — legacy `v0.27.0` Genesis Release observation

The earlier `BitcoinII-Dev/BitcoinII` repository release history recorded `v0.27.0` with the title `Genesis Release` and release-note wording describing the genesis source-code release.

This is **legacy repository history**. The current canonical source/release path used by MoreBC2 is `Bitcoin-II/BitcoinII-Core`.

### 2025-11-27 — BitcoinII Core `v29.1.0`

The current BitcoinII Core repository reports `v29.1.0` as published on **2025-11-27**.

MoreBC2 later performed version-scoped Windows/runtime and release-integrity work against `v29.1.0`. Those dated records remain historical evidence and are not relabeled as `v31.1.0` testing.

### 2025-11-29 — legacy `v0.27.1` observation

The earlier `BitcoinII-Dev/BitcoinII` repository release history recorded `v0.27.1` with release-note wording about DNS seeds and chain transaction data.

As with `v0.27.0`, this entry is preserved as legacy repository history rather than a statement about the current release line.

## 2026

### 2026-08-29 — BitcoinII Core `v31.1.0`

The current BitcoinII Core repository reports `v31.1.0` as published on **2026-08-29**.

Its release notes identify consensus-level changes including:

- ShockWave per-block difficulty adjustment;
- consensus mitigation for Ordinals / inscriptions / Runes-style data;
- BC2 transaction replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

Current MoreBC2 technical documentation uses `v31.1.0` as its baseline.

### 2026-09-06 — macOS assets added to the `v31.1.0` release

GitHub release metadata shows two macOS archives added on **2026-09-06**:

- `BitcoinII-Core-v31.1-arm64.zip`
- `BitcoinII-Core-v31.1-x86_64-apple.zip`

This is a release-record update, not a new protocol version.

### 2026-09-11 — MoreBC2 current-release runtime verification milestone

MoreBC2 completed two isolated `v31.1.0` runtime records:

- a Windows mainnet Qt/server-mode node and RPC validation;
- a separate zero-peer regtest wallet/PSBT/mempool lifecycle.

These are MoreBC2 verification milestones, not BitcoinII protocol release events. They are included here because they materially changed the documentation project's evidence baseline.

## Open timeline research

Useful historical work still includes:

- first public BitcoinII announcement date;
- first public website and explorer dates;
- early mining-pool chronology;
- exchange-listing chronology;
- wallet milestones;
- repository/organization migration history;
- major community events supported by durable dated sources.

These should be added only when the date and source can be stated cleanly.

## Sources

Current canonical/release-pinned sources:

- BitcoinII Core repository: https://github.com/Bitcoin-II/BitcoinII-Core
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- BitcoinII Core releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases

Legacy provenance retained for the `v0.27.x` observations:

- historical repository: https://github.com/BitcoinII-Dev/BitcoinII
- historical releases: https://github.com/BitcoinII-Dev/BitcoinII/releases

MoreBC2 evidence:

- [Windows v31.1.0 node/RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT/replay validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Current BitcoinII Core release metadata and `v31.1.0` chain parameters, plus preserved legacy release observations and MoreBC2 dated verification records  
**Notes:** The recorded milestones are evidence-scoped. The broader ecosystem/community chronology remains incomplete.
