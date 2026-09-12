# mempool.space compatibility

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII currently has several public services with `mempool.space`-like REST and WebSocket behavior, but MoreBC2 does not treat them as complete drop-in replacements.

Current evidence: [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

The three Mempool-style hosts directly checked were:

- `https://bc2mempool.com`
- `https://explorer.bitcoin-ii.org`
- `https://bc2.live`

The Official BitcoinII Explorer at `https://bitcoinii.ddns.net/explorer/` exposes a materially different API and should not be grouped into this compatibility class.

## Current observed similarities

On all three Mempool-style hosts, the September check observed working route families for:

- chain tip height and hash,
- recent blocks,
- mempool summary and recent transactions,
- recommended fees,
- difficulty adjustment,
- mining hashrate,
- prices,
- rich-list data,
- block lookup,
- block transaction IDs and transaction objects,
- block hash by height.

The following representative paths were directly observed:

- `/api/v1/blocks/tip/height`
- `/api/v1/blocks/tip/hash`
- `/api/v1/blocks`
- `/api/mempool`
- `/api/mempool/recent`
- `/api/v1/fees/recommended`
- `/api/v1/difficulty-adjustment`
- `/api/v1/mining/hashrate/3d`
- `/api/v1/prices`
- `/api/block/{hash}`
- `/api/block/{hash}/txids`
- `/api/block/{hash}/txs`
- `/api/block-height/{height}`

## WebSocket similarity

Each host exposed:

```text
wss://HOST/api/v1/ws
```

An `{"action":"init"}` request returned explorer-state data in the dated check.

This establishes endpoint and initialization behavior only; it does not establish complete event-schema or subscription compatibility with upstream `mempool.space`.

## Transaction-submission route

Each tested Mempool-style service exposed:

```text
POST /api/tx
```

Sending deliberately invalid transaction payload `00` returned HTTP 400 on all three hosts.

This proves route presence and malformed-transaction rejection behavior. It does **not** prove successful broadcast of a valid BC2 transaction.

## Known gaps and differences

Current or historical checked gaps include:

- `/api/v1/services` returned HTTP 404 on all three services in the September check.
- Historical address UTXO probes at `/api/address/{address}/utxo` and `/api/address/{address}/utxos` returned 404 on `bc2mempool.com`; those paths were not promoted to current supported endpoints.
- `/api/v1` should not be assumed to provide a useful generic base response.
- BC2-specific/service-specific fields and analytics exist and should not be assumed to match upstream `mempool.space` schemas exactly.
- Full response-schema parity is not established.
- Long-term WebSocket behavior, reconnect behavior, and all subscription message types remain unverified.

## Redundancy caution

`bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` showed closely aligned routes, schemas, values, WebSocket behavior, and invalid-broadcast rejection behavior.

That does not prove they use one backend, but it also does not establish backend/operator independence. Do not count three hostnames as three independent providers without separate evidence.

## Safe conclusion

Current evidence supports saying:

> The three tested BC2 Mempool-style services expose a substantial set of mempool.space-like REST and WebSocket behaviors, with BC2-specific extensions and known gaps.

Current evidence does not support saying:

> The services are fully mempool.space-compatible or interchangeable with upstream mempool.space.

## Verification

**Status:** Draft / Observed partial  
**Primary source checked:** [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)  
**Notes:** September testing supersedes the older July service snapshot for current route wording. Full schema parity, valid transaction broadcast, long-term service behavior, and independent redundancy remain unverified.