# Service directory

**Category:** Infrastructure
**Status:** Draft / Evidence-linked directory
**Last reviewed:** 2026-09-12

## Summary

This directory lists public BitcoinII / BC2 services that have dated MoreBC2 evidence.

Do not read this page as an endorsement, uptime guarantee, official-status claim, independent-redundancy claim, or custody recommendation. The linked verification records remain canonical.

The strongest current public-service record is [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

## Explorer/front-end services

| Service | Classification | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bitcoinii.ddns.net/explorer/` | **Official BitcoinII Explorer** | Reachable; own API surface directly observed | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | No SLA or custody suitability implied; some API functions were unavailable or application-disabled. |
| `https://explorer.bitcoin-ii.org` | **Project-linked, independently operated explorer** | Reachable; Mempool-style REST/WebSocket and invalid-broadcast rejection observed | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Service identifies itself as independently run/community-funded with CapsPool.io infrastructure. Backend independence from the other Mempool-style hosts is not established. |
| `https://bc2mempool.com` | **Supplemental public service** | Reachable; Mempool-style REST/WebSocket and invalid-broadcast rejection observed | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Ownership, backend independence, long-term uptime, and custody suitability not established. |
| `https://bc2.live` | **Supplemental public service** | Reachable; Mempool-style REST/WebSocket and invalid-broadcast rejection observed | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Backend independence from the other Mempool-style hosts not established. |

At the 2026-09-11 comparison point, the Official BitcoinII Explorer, `explorer.bitcoin-ii.org`, and `bc2.live` all reported height `58968` and best hash `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`. `bc2mempool.com` reported the same tip during the immediately preceding focused probe. This is point-in-time agreement, not permanent synchronization evidence.

## Official BitcoinII Explorer API

Base: `https://bitcoinii.ddns.net/explorer`

| Route/capability | Current status | Last checked | Notes |
|---|---|---|---|
| `/api/blocks/tip` | Working | 2026-09-11 | Returned height `58968` and the comparison tip hash. |
| `/api/version` | Working | 2026-09-11 | Returned API version `2.0.0`. |
| `/api/blockchain/coins` | Working | 2026-09-11 | Supply response observed. |
| `/api/blockchain/utxo-set` | Working with qualification | 2026-09-11 | Snapshot height `58958` while live tip was `58968`; treat as potentially cached/lagged statistics. |
| `/api/blockchain/next-halving` | Working | 2026-09-11 | Halving data returned. |
| `/api/mempool/summary` | Working | 2026-09-11 | Mempool state returned. |
| `/api/mempool/fees` | Working | 2026-09-11 | Fee response returned. |
| `/api/mempool/count` | Unavailable in test | 2026-09-11 | HTTP 404. |
| `/api/mining/hashrate` | Working | 2026-09-11 | Multi-window hashrate response observed. |
| `/api/mining/diff-adj-estimate` | Working | 2026-09-11 | Difficulty estimate returned. |
| `/api/mining/next-block` | Working | 2026-09-11 | Next-block estimate returned. |
| `/api/mining/miner-summary` | Route present | 2026-09-11 | Bare request required `since` or a height range. |
| `/api/price` | Route present; functionality disabled | 2026-09-11 | HTTP 200 with application-level `success:false`; server configuration reported exchange-rate requests disabled. |
| `/api/price/marketcap` | Failed in test | 2026-09-11 | HTTP 500. |
| block/header lookup by hash and height | Working | 2026-09-11 | Current block/header responses observed. |

Invalid POST probes to `/api/tx`, `/api/tx/send`, and `/api/broadcast` returned HTTP 403. No public transaction-submission route was established for the Official BitcoinII Explorer.

## Mempool-style REST services

The following hosts exposed closely aligned Mempool-style behavior during the 2026-09-11 checks:

- `https://bc2mempool.com`
- `https://explorer.bitcoin-ii.org`
- `https://bc2.live`

Directly observed working route family:

- `/api/v1/blocks/tip/height`
- `/api/v1/blocks/tip/hash`
- `/api/v1/blocks`
- `/api/mempool`
- `/api/mempool/recent`
- `/api/v1/fees/recommended`
- `/api/v1/difficulty-adjustment`
- `/api/v1/mining/hashrate/3d`
- `/api/v1/prices`
- `/bc2-price.json`
- `/richlist.json`
- `/api/block/{hash}`
- `/api/block/{hash}/txids`
- `/api/block/{hash}/txs`
- `/api/block-height/{height}`

`/api/v1/services` returned HTTP 404 on the tested Mempool-style hosts.

Because these hosts showed closely aligned routes, schemas, fee/mempool values, block data, WebSocket behavior, and invalid-broadcast rejection, MoreBC2 does **not** count them as three proven independent redundancy providers.

## WebSocket

| Service | Current status | Last checked | Known limitations |
|---|---|---|---|
| `wss://bc2mempool.com/api/v1/ws` | Connected; `init` returned explorer-state data | 2026-09-11 | Full schema, reconnect behavior, long sessions, and load behavior not established. |
| `wss://explorer.bitcoin-ii.org/api/v1/ws` | Connected; `init` returned explorer-state data | 2026-09-11 | Backend independence not established. |
| `wss://bc2.live/api/v1/ws` | Connected; `init` returned explorer-state data | 2026-09-11 | Backend independence not established. |

## Public transaction-submission routes

These Mempool-style endpoints accepted POST requests and returned HTTP 400 for deliberately invalid transaction payload `00`:

- `https://bc2mempool.com/api/tx`
- `https://explorer.bitcoin-ii.org/api/tx`
- `https://bc2.live/api/tx`

This proves route existence and rejection behavior only. MoreBC2 has **not** tested successful broadcast of a valid BC2 transaction through any of them.

## Electrum

| Service | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; `server.version` returned ElectrumX `1.18.0`, protocol `1.4` | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Wallet compatibility, transaction broadcast, long sessions, and broader method coverage not established. |
| `ssl://infra1.bitcoin-ii.org:50009` | TLS 1.3 connected; hostname validation passed; `server.version` succeeded | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Wallet compatibility and Electrum broadcast behavior not established. |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out again | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Should not be represented as a working current Electrum endpoint. |

The TLS certificate observed for `infra1.bitcoin-ii.org` was valid for that hostname and reported expiry `2026-11-20` in the client environment. That is dated certificate evidence, not a future uptime guarantee.

## Mining and network-stat resources

| Service | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://miningpoolstats.stream/bitcoinii` | Mining/network statistics | Historical observation / needs fresh recheck | 2026-07-06 | [Mining pools](../ecosystem/mining-pools.md) | Does not prove pool payout reliability, pool sync, fee rules, or stratum details. |
| `https://data.miningpoolstats.stream/data/...` | MiningPoolStats data endpoints | Historical observation / needs fresh recheck | 2026-07-06 | [APIs](../ecosystem/apis.md) | Endpoint stability and documentation not established. |
| Mempool-style `/api/v1/mining/hashrate/3d` | Mining analytics | Working on tested Mempool-style services | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Schema stability and methodology not fully established. |
| Official explorer `/api/mining/hashrate` | Mining analytics | Working | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Treat as service-provided analytics, not an independent consensus source. |

## Price and rich-list feeds

| Service | Current status | Last checked | Known limitations |
|---|---|---|---|
| Mempool-style `/api/v1/prices` | Working on tested Mempool-style services | 2026-09-11 | Data source/update interval/oracle suitability not established. |
| Mempool-style `/bc2-price.json` | Working on tested Mempool-style services | 2026-09-11 | Do not treat as an authoritative price oracle. |
| Mempool-style `/richlist.json` | Working on tested Mempool-style services | 2026-09-11 | Schema stability and analytical methodology not guaranteed. |
| Official explorer `/api/price` | Route present but exchange-rate functionality disabled | 2026-09-11 | Application returned `success:false`; do not advertise as a working price feed at that check time. |

## Project-controlled references

| Service | Purpose | Current status | Last checked | Known limitations |
|---|---|---|---|---|
| `https://bitcoin-ii.org/` | Project website | Project-controlled reference observed | 2026-09-12 audit | Some documentation linked from the site can lag current `v31.1.0` behavior; use current Core source for consensus authority. |
| `https://github.com/Bitcoin-II/BitcoinII-Core` | Canonical public reference implementation | Current Core source/release reference | 2026-09-12 audit | Repository ownership/maintainer structure can change; release authenticity has separate unresolved boundaries. |
| `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0` | Current release metadata/assets | Current release reference | 2026-09-12 audit | GitHub asset digests recorded; no maintainer-authenticated checksum manifest/trusted release-signing path established. |
| `https://github.com/Bitcoin-II` | Project GitHub organization | Current organization reference | 2026-09-12 audit | Organization membership/contact structure is not a technical service guarantee. |

Community links such as Discord, Telegram, and Reddit remain useful contact/community paths but are not treated as infrastructure health signals or dedicated security contacts unless a project-controlled source explicitly establishes that role.

## Verification

**Status:** Draft / Evidence-linked directory  
**Primary evidence:** [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md), [Public endpoints](../api/public-endpoints.md), and linked ecosystem records  
**Notes:** Current public explorer/API/WebSocket/Electrum behavior was rechecked in September 2026. Successful valid-transaction broadcast, long-term uptime, SLA behavior, custody-grade reliability, wallet compatibility, and backend/operator independence remain unverified.
