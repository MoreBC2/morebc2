# Service directory

**Category:** Infrastructure
**Status:** Draft / Evidence-linked directory
**Last reviewed:** 2026-07-12

## Summary

This directory lists public BitcoinII / BC2 services already present in MoreBC2 evidence records.

Do not read this page as an endorsement, uptime guarantee, official-status claim, or custody recommendation. The linked verification records remain canonical.

## Explorers

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bc2mempool.com` | Explorer frontend | Observed reachable | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Reliability, official status, ownership, and long-term sync not established. |
| `https://bc2.live` | Explorer alias/frontend | Observed reachable | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Shared backend with `bc2mempool.com` not assumed. |
| `https://bitcoinii.ddns.net/explorer/` | Explorer frontend and API | Same-time local comparison passed in dated check | 2026-07-10 | [Local node inspection](../verification/local-node-inspection-2026-07-10.md), [Explorers](../ecosystem/explorers.md) | Permanent sync, official operation, and service suitability not established. |

## REST API

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bc2mempool.com/api/v1/...` | Public REST endpoints | Observed partial | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Concrete endpoints worked; base path returned 404; full schemas and reliability not established. |
| `https://bitcoinii.ddns.net/explorer/api/...` | Explorer API | Observed partial / same-time comparison for tip endpoint | 2026-07-10 | [Local node inspection](../verification/local-node-inspection-2026-07-10.md), [APIs](../ecosystem/apis.md) | Earlier 2026-07-06 checks were partial; do not use as sole service-provider source of truth. |

## WebSocket

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `wss://bc2mempool.com/api/v1/ws` | Explorer/WebSocket updates | Handshake observed; initial event observed | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Full schemas, reconnect behavior, and long sessions not established. |

## Electrum

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Electrum TCP | Read-only calls succeeded | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Wallet compatibility not established. |
| `ssl://infra1.bitcoin-ii.org:50009` | Electrum SSL | Read-only calls succeeded; TLS hostname validation passed | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Spending, wallet compatibility, and broadcast behavior not established. |
| `tcp://explorer.bitcoin-ii.org:5008` | Electrum TCP candidate | Timed out | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | No protocol result from the check. |

## Mining statistics

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://miningpoolstats.stream/bitcoinii` | Mining/network statistics | Observed related resource | 2026-07-06 | [Mining pools](../ecosystem/mining-pools.md), [APIs](../ecosystem/apis.md) | Does not prove pool payout reliability, pool sync, fee rules, or stratum details. |
| `https://data.miningpoolstats.stream/data/...` | MiningPoolStats data endpoints | Observed related endpoints | 2026-07-06 | [APIs](../ecosystem/apis.md) | Endpoint stability and documentation not established by MoreBC2. |
| `https://bc2mempool.com/api/v1/mining/hashrate/3d` | Mining analytics | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Analytics schema and long-term behavior not established. |

## Price feeds

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bc2mempool.com/api/v1/prices` | BC2 price data | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Source, update interval, and suitability for pricing decisions need review before reuse. |
| `https://bc2mempool.com/bc2-price.json` | BC2 price feed | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Do not treat as authoritative price oracle. |
| `https://data.miningpoolstats.stream/data/price/bitcoinii.js?...` | MiningPoolStats price data | Observed related endpoint | 2026-07-06 | [APIs](../ecosystem/apis.md) | Documentation, rate limits, and source behavior not established. |

## Rich-list feeds

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bc2mempool.com/richlist.json` | Rich-list and supply-style data | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Full rich-list data should not be copied into normal docs; schema stability not established. |

## Official websites

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://Bitcoin-II.org` | Project website linked by GitHub organization and canonical repository | Source-reviewed / project-controlled link observed | 2026-07-10 | [Project identity source check](../verification/project-identity-source-check-2026-07-10.md) | Dedicated technical/security contact guidance remains unresolved. |

## GitHub

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://github.com/Bitcoin-II/BitcoinII-Core` | Canonical public reference implementation | Source-reviewed | 2026-07-10 | [Project identity source check](../verification/project-identity-source-check-2026-07-10.md) | Maintainer structure and future repository ownership can change. |
| `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0` | Current release metadata and uploaded-asset inventory source | Directly observed partial | 2026-09-02 | [v31.1.0 asset record](../releases/v31.1.0-assets.md) | GitHub-reported digests are recorded, but independent authentication, publisher signatures, and a trusted-key path are not established. |
| `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v29.1.0` | Historical release metadata and artifact-audit source | Historical evidence | 2026-08-27 | [Historical authentication record](../verification/release-artifact-authentication-2026-08-27.md) | This evidence applies only to `v29.1.0` and is not current-release authentication. |
| `https://github.com/Bitcoin-II` | Project GitHub organization | Source-reviewed | 2026-07-10 | [Project identity source check](../verification/project-identity-source-check-2026-07-10.md) | No public members were listed in the recorded check. |

## Discord

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| Discord invitation linked from the Bitcoin-II GitHub organization | Public community/contact path | Source-reviewed as linked from project-controlled profile | 2026-07-10 | [Project identity source check](../verification/project-identity-source-check-2026-07-10.md) | Exact invite target, moderation, and technical-support status are not established in this directory. |

## Telegram

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `BitcoinIIOrganization` | Public community/contact path | Source-reviewed as linked from project-controlled profile | 2026-07-10 | [Project identity source check](../verification/project-identity-source-check-2026-07-10.md) | Not established as a dedicated technical or security contact. |

## Reddit

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `r/BitcoinII` | Public community/contact path | Source-reviewed as linked from project-controlled profile | 2026-07-10 | [Project identity source check](../verification/project-identity-source-check-2026-07-10.md) | Not established as a dedicated technical or security contact. |

## Verification

**Status:** Draft / Evidence-linked directory  
**Primary sources checked:** Existing MoreBC2 verification and ecosystem records linked throughout this page  
**Notes:** This page summarizes committed records. It does not independently recheck these services.
