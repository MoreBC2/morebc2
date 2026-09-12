# REST API compatibility

**Category:** Compatibility
**Status:** Reviewed / Observed partial
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 has current public REST observations for several BitcoinII services. The public API landscape is not one uniform interface: three services expose closely aligned mempool.space-style routes, while the Official BitcoinII Explorer exposes a materially different API shape.

Current evidence does not establish complete REST schema parity, long-term service guarantees, or custody-grade interchangeability.

Canonical evidence:

- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [REST API](../api/rest.md)
- [Public endpoints](../api/public-endpoints.md)
- [mempool.space compatibility](../api/mempool-space-compatibility.md)

## Mempool-style services

Current checks observed working REST surfaces on:

- `bc2mempool.com`
- `explorer.bitcoin-ii.org`
- `bc2.live`

Working categories included tip data, recent blocks, block lookup, mempool data, fee recommendations, mining/difficulty data, price/rich-list feeds, and block-transaction routes.

All three also exposed `/api/tx` POST routes that rejected deliberately invalid transaction data with HTTP 400. That proves route presence and rejection behavior, not successful valid-transaction broadcast.

## Official BitcoinII Explorer

The Official BitcoinII Explorer at `https://bitcoinii.ddns.net/explorer/` exposes a separate API family. Current successful routes included:

- `/api/blocks/tip`
- `/api/version`
- `/api/blockchain/coins`
- `/api/blockchain/utxo-set`
- `/api/blockchain/next-halving`
- `/api/mempool/summary`
- `/api/mempool/fees`
- `/api/mining/hashrate`
- `/api/mining/diff-adj-estimate`
- `/api/mining/next-block`
- block and block-header lookup by hash or height.

Important qualifications from the same test:

- `/api/mempool/count` returned 404;
- `/api/price` existed but reported `success:false` because exchange-rate requests were disabled;
- `/api/price/marketcap` returned HTTP 500;
- `/api/mining/miner-summary` required additional query parameters;
- tested broadcast-route candidates returned HTTP 403, so no public transaction-submission route was established on that service.

## Compatibility boundaries

Current evidence does not establish:

- complete schemas for every endpoint;
- stable rate limits or SLAs;
- identical aliases across services;
- successful valid transaction broadcast;
- backend/operator independence among the mempool-style hostnames;
- interchangeability between the Official Explorer API and mempool-style APIs;
- exchange/custody suitability from public API behavior alone.

Developers should integrate against the exact service and endpoint family they intend to use rather than assuming one BC2 explorer API can substitute for another.

## Verification

**Status:** Reviewed / Observed partial  
**Primary sources checked:** 2026-09-11 public-infrastructure smoke test and current API documentation  
**Notes:** This page records current interface-level observations. It does not claim permanent service behavior or complete REST compatibility.
