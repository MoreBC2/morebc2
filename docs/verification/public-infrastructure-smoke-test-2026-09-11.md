# Public infrastructure smoke test — 2026-09-11

**Category:** Verification
**Status:** Directly observed / Dated
**Test date:** 2026-09-11 (America/New_York)
**Scope:** Public explorer, REST, WebSocket, Electrum, and broadcast-route behavior

## Summary

This record captures fresh public-infrastructure checks for BitcoinII / BC2 performed from a Windows PowerShell client on 2026-09-11.

The checks did **not** access BitcoinII Core locally, a BitcoinII datadir, a wallet, private keys, or real funds. The only transaction-submission probes sent the deliberately invalid payload `00`; no valid transaction was created or broadcast.

Two complementary probes were run:

1. a focused `bc2mempool.com` + Electrum probe;
2. a multi-explorer comparison covering the Official BitcoinII Explorer, `explorer.bitcoin-ii.org`, and `bc2.live`.

At the comparison point, all three explorer services reported mainnet height `58968` and the same best-block hash:

`0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`

This is point-in-time agreement, not a permanent uptime, synchronization, or independence guarantee.

## 1. `bc2mempool.com`

### Frontend and REST

The following returned HTTP 200 with parseable/current-looking responses:

- `/`
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
- `/api/block/{tip-hash}`
- `/api/block/{tip-hash}/txids`
- `/api/block/{tip-hash}/txs`
- `/api/v1/block/{tip-hash}`
- `/api/block-height/{tip-height}`

Observed tip during the focused probe:

- height: `58968`
- hash: `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`

`/api/v1/services` returned HTTP 404. It should not be documented as an available current route.

### WebSocket

`wss://bc2mempool.com/api/v1/ws` accepted a WebSocket connection and an `{"action":"init"}` message, then returned an explorer-state payload containing mempool information.

**Status:** directly observed working.

### Public transaction-submission route

`POST https://bc2mempool.com/api/tx` with body `00` returned HTTP 400.

This is evidence that the route exists, accepts POST requests, and passes submitted data into transaction decoding/validation far enough to reject deliberately invalid transaction data.

It is **not** evidence that MoreBC2 successfully broadcast a valid BC2 transaction.

## 2. Official BitcoinII Explorer

Endpoint:

`https://bitcoinii.ddns.net/explorer/`

The frontend returned HTTP 200.

### Tip and API version

The following were directly observed:

- `/api/blocks/tip` — HTTP 200
- reported height: `58968`
- reported hash: `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`
- `/api/version` — `2.0.0`

### Working API routes observed

The following returned successful HTTP responses during the probe:

- `/api/blockchain/coins`
- `/api/blockchain/utxo-set`
- `/api/blockchain/next-halving`
- `/api/mempool/summary`
- `/api/mempool/fees`
- `/api/mining/hashrate`
- `/api/mining/diff-adj-estimate`
- `/api/mining/next-block`
- `/api/mining/miner-summary`
- `/api/price`
- `/api/block/{hash}`
- `/api/block/header/{hash}`
- `/api/block/{height}`
- `/api/block/header/{height}`

Important response-level qualifications:

- `/api/mempool/count` returned HTTP 404.
- `/api/price` returned HTTP 200 but its JSON body reported `success:false` because exchange-rate requests were disabled in server configuration. Treat the route as present but price functionality as disabled at the time of the test.
- `/api/price/marketcap` returned HTTP 500.
- `/api/mining/miner-summary` returned HTTP 200 with an application-level error requesting `since` or height-range parameters. The route exists, but the bare request is incomplete rather than a successful miner-analysis query.
- `/api/blockchain/utxo-set` reported a statistics snapshot at height `58958` while the live tip was `58968`. Treat this as a potentially lagged/cached statistics snapshot, not as the explorer tip authority.

### Broadcast-route candidates

The following deliberately invalid POST probes returned HTTP 403:

- `/api/tx`
- `/api/tx/send`
- `/api/broadcast`

No tested candidate established a public transaction-submission endpoint on the Official BitcoinII Explorer.

## 3. `explorer.bitcoin-ii.org`

This service is project-linked by hostname but identifies itself as independently run/community-funded, with CapsPool.io infrastructure.

The frontend returned HTTP 200.

The following Mempool-style endpoints were directly observed working:

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

`/api/v1/services` returned HTTP 404.

`wss://explorer.bitcoin-ii.org/api/v1/ws` accepted a connection and returned an explorer-state payload after the `init` message.

`POST https://explorer.bitcoin-ii.org/api/tx` with deliberately invalid body `00` returned HTTP 400, establishing route existence/rejection behavior but not successful valid-transaction broadcast.

The older Electrum TCP candidate `explorer.bitcoin-ii.org:5008` was also re-tested separately and timed out again. It should not be represented as a currently working Electrum endpoint.

## 4. `bc2.live`

The frontend returned HTTP 200.

The following Mempool-style endpoints were directly observed working:

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

`/api/v1/services` returned HTTP 404.

`wss://bc2.live/api/v1/ws` accepted a connection and returned an explorer-state payload after the `init` message.

`POST https://bc2.live/api/tx` with deliberately invalid body `00` returned HTTP 400, establishing route existence/rejection behavior but not successful valid-transaction broadcast.

## 5. Cross-explorer comparison

At the comparison point, these three services reported the same height and same best-block hash:

| Service | Height | Best block hash |
|---|---:|---|
| Official BitcoinII Explorer | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `explorer.bitcoin-ii.org` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `bc2.live` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |

The Official BitcoinII Explorer exposes a materially different API shape and server behavior from the Mempool-style services.

`explorer.bitcoin-ii.org`, `bc2.live`, and the separately tested `bc2mempool.com` showed closely aligned Mempool-style routes, response schemas, fee/mempool values, block data, WebSocket behavior, and invalid-broadcast rejection behavior.

That similarity is evidence that these hostnames should **not** automatically be counted as three independent redundancy providers. It does not, by itself, prove that they share a literal server, node, database, network, or operator. Backend/operator independence remains unverified.

## 6. Electrum

Fresh read-only Electrum checks against `infra1.bitcoin-ii.org` succeeded:

| Endpoint | Result |
|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; `server.version` returned `ElectrumX 1.18.0`, protocol `1.4`. |
| `ssl://infra1.bitcoin-ii.org:50009` | Connected over TLS 1.3; hostname certificate validation succeeded; `server.version` returned `ElectrumX 1.18.0`, protocol `1.4`. |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out after 8 seconds. |

The TLS certificate observed for `infra1.bitcoin-ii.org` was valid for that hostname and reported an expiry date of 2026-11-20 in the client environment.

These checks establish read-only protocol reachability only. They do not establish broad wallet compatibility, spending behavior, or Electrum transaction-broadcast compatibility.

## What this record verifies

This dated test directly supports the following claims:

- all four public explorer/frontends tested were reachable;
- the Official BitcoinII Explorer exposes a working v2.0.0 public API with the route-level qualifications above;
- `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` expose working Mempool-style public REST APIs;
- Mempool-style WebSocket endpoints worked on all three tested hosts;
- public `/api/tx` submission routes exist on `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` and reject deliberately invalid transaction data;
- the main Electrum TCP/TLS endpoints at `infra1.bitcoin-ii.org` were reachable and responded to `server.version`;
- the older `explorer.bitcoin-ii.org:5008` Electrum candidate remained unreachable;
- the three compared explorer services agreed on the same chain tip during the comparison window.

## What this record does not verify

This record does **not** establish:

- successful broadcast of a valid BC2 transaction through any public service;
- wallet compatibility with the Electrum server;
- long-term uptime or an SLA;
- backend/operator independence among the Mempool-style hostnames;
- custody-grade reliability;
- transaction/address lookup behavior for every edge case;
- current behavior outside the test window.

## Historical relationship

This record supplements rather than rewrites:

- [Public API, WebSocket, and Electrum smoke test — 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)

The July record remains valid as dated historical evidence. This September record is the newer point-in-time protocol check.

## Verification

**Status:** Directly observed / Dated
**Evidence type:** Direct network checks from a Windows PowerShell client
**BitcoinII chain state observed:** mainnet height `58968`, best hash `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`
**Notes:** No local BitcoinII wallet/node state was accessed. Broadcast probes used deliberately invalid transaction data only.