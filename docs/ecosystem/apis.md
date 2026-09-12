# APIs

**Category:** Ecosystem
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page tracks BitcoinII (BC2) public API resources such as explorer APIs, service APIs, and community-hosted data endpoints.

No API should be treated as permanently active, independently redundant, custody-grade, or reliable merely because a dated probe passed.

Current protocol-level evidence is recorded in [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md). First-class endpoint inventory lives under [Public endpoints](../api/public-endpoints.md).

## Current public API surfaces

### Official BitcoinII Explorer API

**Category:** Explorer  
**Status:** Active, dated check / Distinct API surface  
**Official:** Yes — explorer page explicitly identifies itself as the Official BitcoinII Explorer  
**Base URL:** `https://bitcoinii.ddns.net/explorer/api/`  
**Last checked:** 2026-09-11  
**Authentication:** None observed for checked GET endpoints  
**Rate limits:** Not established

Directly observed working/current routes included:

- `/blocks/tip`
- `/version`
- `/blockchain/coins`
- `/blockchain/utxo-set`
- `/blockchain/next-halving`
- `/mempool/summary`
- `/mempool/fees`
- `/mining/hashrate`
- `/mining/diff-adj-estimate`
- `/mining/next-block`
- `/mining/miner-summary` (route present; bare request requires parameters)
- `/price` (route present, but exchange-rate functionality disabled at test time)
- `/block/{hash}`
- `/block/header/{hash}`
- `/block/{height}`
- `/block/header/{height}`

Observed qualifications:

- `/mempool/count` returned HTTP 404.
- `/price` returned HTTP 200 with an application-level `success:false` because rate requests were disabled in server configuration.
- `/price/marketcap` returned HTTP 500.
- `/blockchain/utxo-set` returned a statistics snapshot at height `58958` while the live tip was `58968`; treat it as a potentially lagged/cached statistics endpoint, not tip authority.
- Candidate broadcast routes `/tx`, `/tx/send`, and `/broadcast` returned HTTP 403. No public transaction-submission route was established for this API.

The API reported version `2.0.0` during the test.

### Mempool-style public APIs

The following services exposed closely aligned Mempool-style API behavior during the 2026-09-11 checks:

- `https://bc2mempool.com`
- `https://explorer.bitcoin-ii.org`
- `https://bc2.live`

Observed working route family:

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

`/api/v1/services` returned HTTP 404 on the tested Mempool-style services.

Each tested Mempool-style host also exposed `wss://HOST/api/v1/ws`; an `init` message received explorer-state data during the dated checks.

Each tested Mempool-style host exposed `POST /api/tx`; deliberately invalid transaction payload `00` was accepted as a POST and rejected with HTTP 400. This establishes route presence/rejection behavior only, not successful valid-transaction broadcast.

## Current tip comparison

During the multi-explorer check, the Official BitcoinII Explorer, `explorer.bitcoin-ii.org`, and `bc2.live` all reported:

- height `58968`
- best hash `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`

`bc2mempool.com` reported the same tip during the immediately preceding focused probe.

This is point-in-time agreement, not permanent synchronization evidence.

## Redundancy caution

The Official BitcoinII Explorer presents a materially different API shape from the Mempool-style services.

The three Mempool-style hostnames returned closely aligned route behavior, response schemas, block/mempool values, fee values, WebSocket state, and invalid-broadcast rejection behavior.

That does not prove they share a single backend, but it also does not establish backend/operator independence. Do not count three hostnames as three independent API providers without separate evidence.

## Electrum service

Fresh read-only protocol checks on 2026-09-11 observed:

- `tcp://infra1.bitcoin-ii.org:50008` — `server.version` returned ElectrumX `1.18.0`, protocol `1.4`.
- `ssl://infra1.bitcoin-ii.org:50009` — TLS 1.3 connection succeeded with hostname validation; `server.version` returned ElectrumX `1.18.0`, protocol `1.4`.
- `tcp://explorer.bitcoin-ii.org:5008` — timed out again and should not be represented as a working current Electrum endpoint.

These checks establish read-only protocol reachability only. Wallet compatibility, spending behavior, and Electrum transaction broadcast remain unverified.

## Other observed API resources

### MiningPoolStats BitcoinII data endpoints

**Category:** Mining/network statistics  
**Status:** Historical observation / Needs current recheck  
**Official:** No  
**Base URL:** `https://data.miningpoolstats.stream/data/`  
**Last checked:** 2026-07-06

Historical related endpoints included:

- `https://data.miningpoolstats.stream/data/bitcoinii.js?...`
- `https://data.miningpoolstats.stream/data/price/bitcoinii.js?...`
- `https://data.miningpoolstats.stream/data/history/bitcoinii.js?...`

These observations are retained as ecosystem context only and were not part of the 2026-09-11 infrastructure probe.

## Service-integration caution

Public explorer APIs are useful for observations, support, and cross-checks, but they should not replace a service provider's own BitcoinII Core node for critical deposit, withdrawal, or custody workflows.

For exchanges and services, documentation should distinguish:

- useful public observation endpoints;
- endpoints appropriate for monitoring;
- endpoints that are not safe as the only source of truth;
- endpoints whose data may be cached or lagged;
- public transaction-submission routes whose successful valid-transaction behavior has not yet been tested;
- providers whose backend/operator independence has not been established.

## What not to claim yet

Do not claim that:

- any public API has permanent uptime or an SLA;
- three Mempool-style hostnames necessarily represent three independent backends;
- a public explorer/API can replace an operator's own node;
- a valid BC2 transaction has been successfully broadcast through the tested public `/api/tx` routes;
- read-only Electrum reachability proves wallet compatibility;
- current endpoint availability proves long-term service reliability.

## Related pages

- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Public endpoints](../api/public-endpoints.md)
- [Explorers](explorers.md)
- [Verification evidence index](../verification/verification-index.md)
- [Public API, WebSocket, and Electrum smoke test — 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [Infrastructure directory](../infrastructure/README.md)
- [Compatibility](../compatibility/README.md)
- [Exchange integration](../exchange/README.md)

## Verification

**Status:** Draft
**Primary evidence:** Direct public API/WebSocket/Electrum checks from 2026-09-11 plus preserved historical ecosystem observations
**Notes:** Current route reachability and protocol behavior are dated observations. Long-term reliability, backend independence, wallet compatibility, successful valid-transaction broadcast, and exchange/custody suitability remain unverified.