# Public endpoints

**Category:** Developer platform
**Status:** Draft / Evidence-linked directory
**Last reviewed:** 2026-09-12

## Summary

This page lists public BitcoinII / BC2 infrastructure relevant to wallets, exchanges, explorers, and service providers.

Current service classification:

- **Official BitcoinII Explorer:** `https://bitcoinii.ddns.net/explorer/`
- **Project-linked, independently operated explorer:** `https://explorer.bitcoin-ii.org`
- **Supplemental public services:** `https://bc2mempool.com` and `https://bc2.live`

The newest protocol-level evidence is [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

A dated successful check does not establish permanent uptime, backend independence, or suitability as the sole source of truth for custody infrastructure.

## Explorer and REST

| Endpoint | Classification | Purpose | Current status | Last checked | Known limitations |
|---|---|---|---|---|---|
| `https://bitcoinii.ddns.net/explorer/` | **Official BitcoinII Explorer** | Primary designated explorer with its own public API surface | Reachable; tip/API/blockchain/mining/mempool/block routes directly observed | 2026-09-11 | No SLA implied. Some documented/likely routes are disabled or unavailable; see dated record. |
| `https://explorer.bitcoin-ii.org` | **Project-linked, independently operated explorer** | Mempool-style explorer/API hosted under the BitcoinII domain | Reachable; REST, WebSocket, and invalid-broadcast rejection directly observed | 2026-09-11 | Service identifies itself as independently run/community-funded with CapsPool.io infrastructure. Backend independence from other Mempool-style hosts is not established. |
| `https://bc2mempool.com` | **Supplemental public service** | Mempool-style explorer/API | Reachable; REST, WebSocket, and invalid-broadcast rejection directly observed | 2026-09-11 | Ownership/backend independence/long-term availability not established. |
| `https://bc2.live` | **Supplemental public service** | Mempool-style explorer/API | Reachable; REST, WebSocket, and invalid-broadcast rejection directly observed | 2026-09-11 | Backend independence from other Mempool-style hosts is not established. |

### Infrastructure interpretation

`bitcoinii.ddns.net/explorer/` is the **Official BitcoinII Explorer** and should be the primary project-designated explorer reference in integration documentation.

`explorer.bitcoin-ii.org` is project-linked because it is hosted under the BitcoinII domain, but the service itself states that it is independently run and community-funded, with infrastructure by CapsPool.io. It should therefore not be described as project-operated.

`bc2mempool.com` and `bc2.live` are supplemental services.

The 2026-09-11 comparison found the Official BitcoinII Explorer, `explorer.bitcoin-ii.org`, and `bc2.live` at height `58968` with the same best-block hash. Separately, `bc2mempool.com` reported the same tip during the immediately preceding focused probe.

The Official BitcoinII Explorer exposes a materially different API shape from the Mempool-style services. By contrast, `explorer.bitcoin-ii.org`, `bc2mempool.com`, and `bc2.live` showed closely aligned Mempool-style routes, response schemas, mempool/fee values, block data, WebSocket behavior, and invalid-broadcast rejection behavior.

Those similarities do **not** prove that the three Mempool-style hostnames share one literal backend, but they also do not establish independent redundancy. Do not count them as three independent node/API providers without separate operator/backend evidence.

## Official BitcoinII Explorer API

Base:

`https://bitcoinii.ddns.net/explorer`

Directly observed on 2026-09-11:

| Route | Result | Notes |
|---|---|---|
| `/api/blocks/tip` | Working | Returned height `58968` and matching best-block hash during the test. |
| `/api/version` | Working | Returned API version `2.0.0`. |
| `/api/blockchain/coins` | Working | Supply response observed. |
| `/api/blockchain/utxo-set` | Working with qualification | Returned a statistics snapshot at height `58958` while live tip was `58968`; may lag/cached. |
| `/api/blockchain/next-halving` | Working | Next-halving response observed. |
| `/api/mempool/summary` | Working | Mempool state returned. |
| `/api/mempool/fees` | Working | Fee estimates returned. |
| `/api/mempool/count` | Unavailable in test | HTTP 404. |
| `/api/mining/hashrate` | Working | Multi-window hashrate response observed. |
| `/api/mining/diff-adj-estimate` | Working | Difficulty estimate returned. |
| `/api/mining/next-block` | Working | Estimated next-block data returned. |
| `/api/mining/miner-summary` | Route present | Bare request returned an application-level error requiring `since` or start/end heights. |
| `/api/price` | Route present but functionality disabled | HTTP 200 with `success:false`; server configuration reported exchange-rate requests disabled. |
| `/api/price/marketcap` | Failed in test | HTTP 500. |
| `/api/block/{hash}` | Working | Current block by hash returned. |
| `/api/block/header/{hash}` | Working | Current block/header data returned. |
| `/api/block/{height}` | Working | Current block by height returned. |
| `/api/block/header/{height}` | Working | Current block/header data returned. |

### Official explorer broadcast candidates

Deliberately invalid POST probes to these candidate routes returned HTTP 403:

- `/api/tx`
- `/api/tx/send`
- `/api/broadcast`

No tested route established a public transaction-submission endpoint on the Official BitcoinII Explorer.

## Mempool-style REST services

The following route family was directly observed working on `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` during the 2026-09-11 checks:

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

`/api/v1/services` returned HTTP 404 on the tested Mempool-style services and should not be treated as an active route.

## WebSocket

| Endpoint | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|
| `wss://bc2mempool.com/api/v1/ws` | Connected; `init` request returned explorer-state data | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Full schema, reconnect behavior, and long sessions not verified. |
| `wss://explorer.bitcoin-ii.org/api/v1/ws` | Connected; `init` request returned explorer-state data | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Backend independence from other Mempool-style services not established. |
| `wss://bc2.live/api/v1/ws` | Connected; `init` request returned explorer-state data | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Backend independence from other Mempool-style services not established. |

## Public transaction-submission routes

The following endpoints accepted POST requests and returned HTTP 400 when sent deliberately invalid transaction payload `00`:

- `https://bc2mempool.com/api/tx`
- `https://explorer.bitcoin-ii.org/api/tx`
- `https://bc2.live/api/tx`

This proves route existence/rejection behavior only. MoreBC2 has **not** tested successful broadcast of a valid BC2 transaction through these public services.

## Electrum

| Endpoint | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Read-only `server.version` succeeded; ElectrumX `1.18.0`, protocol `1.4` | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Wallet compatibility and spending behavior not established. |
| `ssl://infra1.bitcoin-ii.org:50009` | TLS 1.3 connection and hostname validation succeeded; `server.version` returned ElectrumX `1.18.0`, protocol `1.4` | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Wallet compatibility and Electrum broadcast behavior not established. |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out again | 2026-09-11 | [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) | Should not be represented as a currently working Electrum service. |

## Local RPC historical reference

Local RPC is not a public endpoint. The entry below is retained as historical MoreBC2 evidence and must not be confused with the v31.1.0 documented default.

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `127.0.0.1:8337` | Historical configured BitcoinII Core v29.1.0 JSON-RPC endpoint | Locally tested with cookie authentication | 2026-07-10 | [Local node inspection](../verification/local-node-inspection-2026-07-10.md), [RPC smoke test](../verification/read-only-rpc-smoke-test-2026-07-10.md) | This was a configured v29.1.0 Windows environment. BitcoinII Core v31.1.0 documents mainnet RPC port `8332` as its default. |

## Verification

**Status:** Draft / Evidence-linked directory  
**Primary evidence:** [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md), plus preserved historical records  
**Notes:** Current REST, WebSocket, Electrum, and invalid-broadcast rejection behavior was directly re-tested on 2026-09-11. Successful valid-transaction broadcast, long-term uptime, custody-grade reliability, wallet compatibility, and independent backend/operator redundancy remain unverified.