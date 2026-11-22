# BitcoinII timeline

**Category:** History  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-11-22

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

### 2025-07-02 — early public BitcoinII launch discussion and mining

The earliest dated public BitcoinTalk post located for this review is the original developer's [`I kinda screwed up…` announcement](https://bitcointalk.org/index.php?topic=5548481.0), posted **2025-07-02 at 00:07:57 in the forum's displayed time**. It introduced BitcoinII by name, linked the original `BitcoinII-Dev/BitcoinII` source and binaries, and described the network as already bootstrapped and mineable. Forum discussion later that day includes miners describing block discovery and the developer [thanking public miners](https://bitcointalk.org/index.php?topic=5548489.0).

This is evidence of public launch discussion and mining **by July 2**, not independent proof of the exact network launch instant. It also does not supersede the December 2024 genesis-header time documented above. Original 2025 claims of unchanged Bitcoin-style difficulty adjustment must be read as **historical**, not current post-ShockWave consensus.

### 2025-07-03 — formal BitcoinII launch announcement

In the developer's [`BitcoinII (BC2) Official Launch Announcement`](https://bitcointalk.org/index.php?topic=5548676.0), dated **2025-07-03 at 22:13:44 in the forum's displayed time**, the developer explicitly announced live mainnet after approximately 36 hours of miner/node activity. The post records the project's original rationale, the difference between a new blockchain and a fork of Bitcoin's existing ledger, the original repository, and early MinerPool/Telegram community links.

This was a **formal announcement**, not the first dated public mention and not a source for unchanged current v31 technical behavior.

### 2025-07-23 — early BC2 pool announcement

A [NitroPool post in the launch thread](https://bitcointalk.org/index.php?topic=5548676.0) announced BC2 mining support with PROP and SOLO options. This is evidence of the pool operator's dated **announcement**, not independent validation of July 2025 shares/payouts or present-day service availability.

### 2025-07-28 — legacy `v0.27.0` Genesis Release observation

The earlier `BitcoinII-Dev/BitcoinII` repository release history recorded `v0.27.0` with the title `Genesis Release` and release-note wording describing the genesis source-code release.

This is **legacy repository history**. The current canonical source/release path used by MoreBC2 is `Bitcoin-II/BitcoinII-Core`.

### 2025-08-04 — BitcoinII Core v29 and organization-repository announcement

In [launch-thread post #7](https://bitcointalk.org/index.php?topic=5548676.0), the original developer stated that BitcoinII Core `v29.0.0` had been released from the newly formed `Bitcoin-II/BitcoinII-Core` organization repository. The same dated post linked the project website, a historical explorer, and a contemporary pool directory.

This establishes the **public announcement date and historical repository path**. The old explorer and the stated 2025 mining-pool total are historical references, not evidence of present-day availability. The current canonical repository and release baseline remain [BitcoinII Core](https://github.com/Bitcoin-II/BitcoinII-Core) and `v31.1.0` for MoreBC2's current documentation.

### 2025-10-06 — CoinEx announces BC2/USDT trading

CoinEx's [dated listing notice](https://coinex-announcement.zendesk.com/hc/en-us/articles/41890315584916-CoinEx-Will-List-BC2-BitcoinII-on-Oct-6-2025) specified October 6, 2025 as the BC2/USDT spot-market opening, with scheduled deposits and withdrawals from 10:00 UTC and trading at 10:30 UTC. This documents the exchange's **announcement and advertised timetable**, not independently tested execution or historical wallet uptime.

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

- whether there are earlier durable public records than the July 2 BitcoinTalk posts;
- first independently confirmed website and explorer operation dates;
- fuller early mining-pool chronology beyond the cited 2025 operator announcements;
- wider exchange-listing and historical wallet-availability chronology beyond the CoinEx notice;
- wallet milestones;
- repository/organization migration metadata and GitHub change history beyond the dated maintainer announcement;
- major community events supported by durable dated sources.

These should be added only when the date and source can be stated cleanly.

## Sources

Current canonical/release-pinned sources:

- BitcoinII Core repository: https://github.com/Bitcoin-II/BitcoinII-Core
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- BitcoinII Core releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases

Dated public launch/community and listing primary sources:

- First located public developer post (July 2, 2025): https://bitcointalk.org/index.php?topic=5548481.0
- Early public-mining follow-up (July 2, 2025): https://bitcointalk.org/index.php?topic=5548489.0
- Formal launch and subsequent developer/pool posts (July 3–August 4, 2025): https://bitcointalk.org/index.php?topic=5548676.0
- CoinEx listing notice (October 6, 2025): https://coinex-announcement.zendesk.com/hc/en-us/articles/41890315584916-CoinEx-Will-List-BC2-BitcoinII-on-Oct-6-2025

Legacy provenance retained for the `v0.27.x` observations:

- historical repository: https://github.com/BitcoinII-Dev/BitcoinII
- historical releases: https://github.com/BitcoinII-Dev/BitcoinII/releases

MoreBC2 evidence:

- [Windows v31.1.0 node/RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT/replay validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Current BitcoinII Core release metadata and `v31.1.0` chain parameters, preserved legacy release observations, dated July–August 2025 BitcoinTalk developer/community posts, the October 6 CoinEx listing announcement, and MoreBC2 verification records  
**Notes:** Focused 2025 primary-source additions checked 2026-11-22; the documented launch discussion is not the same as the genesis timestamp or a precise mainnet activation instant. All historical service claims remain date-scoped. The broader ecosystem/community chronology remains incomplete.
