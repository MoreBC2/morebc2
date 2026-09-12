# REST API

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 now has current September evidence for two distinct public REST families:

1. the **Official BitcoinII Explorer API** at `https://bitcoinii.ddns.net/explorer/`;
2. **Mempool-style APIs** on `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live`.

Primary evidence: [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

These are dated observations, not guarantees of uptime, schema stability, or custody suitability.

## Official BitcoinII Explorer API

Base explorer:

```text
https://bitcoinii.ddns.net/explorer/
```

Observed working routes on 2026-09-11 included:

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
- `/api/mining/miner-summary`
- `/api/price`
- `/api/block/{hash}`
- `/api/block/header/{hash}`
- `/api/block/{height}`
- `/api/block/header/{height}`

The API reported version `2.0.0` during the check.

Important qualifications:

- `/api/mempool/count` returned HTTP 404.
- `/api/blockchain/utxo-set` returned a statistics snapshot at height `58958` while live tip was `58968`; treat it as potentially lagged/cached statistics, not tip authority.
- `/api/mining/miner-summary` existed but a bare request required additional parameters.
- `/api/price` existed but returned application-level `success:false` because exchange-rate requests were disabled at test time.
- `/api/price/marketcap` returned HTTP 500.
- Candidate broadcast routes `/api/tx`, `/api/tx/send`, and `/api/broadcast` returned HTTP 403; no public transaction-submission route was established on this API.

## Mempool-style APIs

The following hosts exposed closely aligned route behavior:

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

`/api/v1/services` returned HTTP 404 on the tested services.

## Public transaction-submission route

All three Mempool-style hosts exposed:

```text
POST /api/tx
```

The deliberately invalid payload `00` returned HTTP 400 on each host.

This establishes route presence and malformed-transaction rejection behavior only. MoreBC2 has **not** successfully broadcast a valid BC2 transaction through these public REST services.

## Same-time comparison

At the 2026-09-11 comparison point, the Official BitcoinII Explorer, `explorer.bitcoin-ii.org`, and `bc2.live` all reported:

- height `58968`
- best hash `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`

`bc2mempool.com` reported the same tip in the immediately preceding focused probe.

This is point-in-time agreement, not permanent synchronization evidence.

## Redundancy and ownership boundary

The Official BitcoinII Explorer exposes a materially different API shape from the three Mempool-style services.

The three Mempool-style hosts showed closely aligned routes, schemas, state, fee/mempool values, WebSocket behavior, and invalid-broadcast rejection behavior. That does not prove a shared backend, but it does not establish independent redundancy either.

For critical infrastructure, operators should run their own BitcoinII Core node and use public APIs as observation/cross-check sources rather than as the sole source of truth.

## Verification

**Status:** Draft / Observed partial  
**Primary source checked:** [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)  
**Notes:** September evidence supersedes the older July REST snapshot for current route wording. Long-term uptime, rate limits, full schemas, valid public broadcast, and independent backend redundancy remain unverified.