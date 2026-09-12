# APIs

**Category:** Ecosystem
**Status:** Reviewed / Time-sensitive
**Last reviewed:** 2026-09-12

## Summary

This page tracks BitcoinII (BC2) public API resources relevant to explorers, wallets, integrations, and service operators.

No API should be treated as permanently active, independently redundant, custody-grade, or reliable merely because a dated probe passed.

The canonical current protocol-level evidence is [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md). The first-class endpoint directory lives at [Public endpoints](../api/public-endpoints.md), and the dedicated Electrum record lives at [Electrum](../api/electrum.md).

## Evidence classes used here

Public service observations should be described with the narrowest supported claim:

- **Working GET/read route** — a dated request returned the expected class of data.
- **Working WebSocket handshake/init** — a dated connection accepted the tested init flow and returned explorer-state data.
- **Route present / invalid payload rejected** — a POST endpoint accepted the method and rejected deliberately malformed transaction bytes; this is not successful broadcast evidence.
- **Read-only Electrum reachability** — `server.version` and TLS behavior were observed; this is not wallet or spending compatibility.
- **Same-time comparison** — services agreed during one test window; this is not an uptime, independence, or SLA claim.

## Current public explorer/API hierarchy

| Service | Classification | API family | Last checked |
|---|---|---|---|
| `https://bitcoinii.ddns.net/explorer/` | **Official BitcoinII Explorer** | Distinct explorer API, version `2.0.0` in test | 2026-09-11 |
| `https://explorer.bitcoin-ii.org` | Project-linked, independently operated according to service presentation; CapsPool.io infrastructure noted in footer | Mempool-style REST + WebSocket | 2026-09-11 |
| `https://bc2mempool.com` | Supplemental public service | Mempool-style REST + WebSocket | 2026-09-11 |
| `https://bc2.live` | Supplemental public service | Mempool-style REST + WebSocket | 2026-09-11 |

Project linkage by hostname should not be converted into a claim of project operation without stronger operator evidence.

## Official BitcoinII Explorer API

**Base URL:** `https://bitcoinii.ddns.net/explorer/api/`  
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
- `/mining/miner-summary` — route present; bare request requires parameters
- `/price` — route present; exchange-rate functionality disabled at test time
- `/block/{hash}`
- `/block/header/{hash}`
- `/block/{height}`
- `/block/header/{height}`

Observed qualifications:

- `/mempool/count` returned HTTP 404;
- `/price` returned HTTP 200 with application-level `success:false` because rate requests were disabled in server configuration;
- `/price/marketcap` returned HTTP 500;
- `/blockchain/utxo-set` returned a statistics snapshot at height `58958` while live tip was `58968`, so treat it as potentially lagged/cached statistics rather than tip authority;
- candidate broadcast routes `/tx`, `/tx/send`, and `/broadcast` returned HTTP 403 for deliberately invalid POST probes. No public transaction-submission endpoint was established for this API.

## Mempool-style public APIs

The following services exposed closely aligned Mempool-style API behavior during the September 11 checks:

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

`/api/v1/services` returned HTTP 404 on the tested Mempool-style services and should not be treated as an active current route.

Each host also exposed `wss://HOST/api/v1/ws`; an `init` message returned explorer-state data during the dated checks. Full schema stability, reconnect behavior, long sessions, and load behavior remain unverified.

## Public transaction-submission evidence

Each tested Mempool-style host exposed `POST /api/tx`. MoreBC2 sent only deliberately invalid transaction payload `00` and observed HTTP 400 from:

- `https://bc2mempool.com/api/tx`
- `https://explorer.bitcoin-ii.org/api/tx`
- `https://bc2.live/api/tx`

This establishes that those routes exist, accept POST, and reject malformed transaction data. It does **not** establish successful valid BC2 broadcast, network propagation, withdrawal suitability, or consistent error semantics for valid-but-policy-rejected transactions.

The Official BitcoinII Explorer candidate submission routes returned 403 and did not establish a public broadcast endpoint.

The separate September v31 disposable-regtest test successfully called local BitcoinII Core `sendrawtransaction`, but the test node had zero peers. That is local mempool-submission evidence only and must not be cited as public API broadcast evidence.

## Current tip comparison

During the multi-explorer comparison, the Official BitcoinII Explorer, `explorer.bitcoin-ii.org`, and `bc2.live` all reported:

- height `58968`
- best hash `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`

`bc2mempool.com` reported the same tip during the immediately preceding focused probe.

This is point-in-time agreement, not permanent synchronization evidence.

## Redundancy and service-independence caution

The Official BitcoinII Explorer presents a materially different API shape from the Mempool-style services.

The three Mempool-style hostnames returned closely aligned route behavior, response schemas, block/mempool values, fee values, WebSocket state, and invalid-broadcast rejection behavior.

That does not prove they share a single backend, server, node, database, network, or operator. It also does not establish backend/operator independence. Do not count three hostnames as three independent API providers without separate evidence.

A useful redundancy assessment should distinguish at least operator, backend node, database, hosting/network, and failure-domain independence.

## Electrum service

Electrum is a separate protocol service, not proof of an explorer HTTP API capability.

Fresh read-only checks on 2026-09-11 observed:

| Endpoint | Result | Evidence boundary |
|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | `server.version` returned ElectrumX `1.18.0`, protocol `1.4` | Read-only protocol reachability |
| `ssl://infra1.bitcoin-ii.org:50009` | TLS 1.3 connected; hostname validation succeeded; same server/protocol response | Read-only protocol/TLS reachability |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out again | Not a working current endpoint in MoreBC2 evidence |

The TLS certificate observed for `infra1.bitcoin-ii.org` reported expiry `2026-11-20` in the client environment.

No current MoreBC2 record establishes wallet-history correctness, address/scripthash-history correctness, third-party wallet compatibility, transaction construction, signing, spending, or successful Electrum transaction broadcast.

## Price, rich-list, and analytics boundaries

The tested Mempool-style services exposed `/api/v1/prices`, `/bc2-price.json`, `/richlist.json`, difficulty adjustment, and mining-hashrate data. The Official Explorer exposed its own mining and price-related routes.

These should be treated as service-provided analytics. Current MoreBC2 evidence does not establish their oracle suitability, data-source independence, update methodology, schema stability, or appropriateness for accounting/trading decisions.

The Official Explorer `/price` route specifically reported exchange-rate functionality disabled at the September test time.

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

## Service-integration guidance

Public explorer APIs are useful for observations, support, and cross-checks, but they should not replace a service provider's own BitcoinII Core node for critical deposit, withdrawal, or custody workflows.

For exchanges and services, documentation and implementation should distinguish:

- authoritative node state from public observation endpoints;
- live-tip routes from cached or lagged statistics;
- route presence from proven valid transaction submission;
- hostname count from independent failure domains;
- read-only Electrum reachability from wallet compatibility;
- confirmation depth from deterministic finality.

## What not to claim yet

Do not claim that:

- any public API has permanent uptime or an SLA;
- the three Mempool-style hostnames necessarily represent three independent backends;
- similarity proves one shared backend;
- a public explorer/API can replace an operator's own Core node;
- a valid BC2 transaction has been successfully broadcast through the tested public `/api/tx` routes;
- local zero-peer regtest `sendrawtransaction` proves public broadcast;
- read-only Electrum reachability proves wallet compatibility or spending behavior;
- current endpoint availability proves long-term service reliability.

## Related pages

- [Explorer resources](../documentation/explorer-resources.md)
- [Explorers](explorers.md)
- [Public endpoints](../api/public-endpoints.md)
- [Electrum](../api/electrum.md)
- [Infrastructure service directory](../infrastructure/service-directory.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Windows v31 PSBT/replay validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Verification evidence index](../verification/verification-index.md)
- [Compatibility](../compatibility/README.md)
- [Exchange integration](../exchange/README.md)

## Verification

**Status:** Reviewed / Time-sensitive  
**Primary evidence:** Direct public API/WebSocket/Electrum checks from 2026-09-11 plus the bounded September v31 local-transaction record  
**Notes:** Current public API hierarchy, route evidence classes, Electrum endpoint state, same-tip observations, service-independence cautions, and broadcast boundaries are synchronized. Long-term reliability, provider independence, wallet compatibility, successful valid public broadcast, and custody-grade suitability remain unverified.
