# REST API

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-07-12

## Summary

MoreBC2 has a dated read-only smoke test for public BitcoinII REST endpoints served from `https://bc2mempool.com`.

The strongest current record is [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md). That record is the canonical evidence for this page.

## Observed base and documentation URLs

| Resource | Observation | Evidence |
|---|---|---|
| `https://bc2mempool.com` | Explorer shell loaded during the 2026-07-12 smoke test. | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |
| `https://bc2.live` | Explorer shell loaded during the 2026-07-12 smoke test; shared backend was not assumed. | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |
| `https://bc2mempool.com/docs/api/rest` | HTTP 200 was observed, but static fetch returned the SPA shell rather than readable documentation body. | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |
| `https://bc2mempool.com/api/v1` | Base path returned 404; concrete endpoints worked. | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |

## Observed endpoint groups

The 2026-07-12 smoke test observed working public GET responses for:

- chain tip height and hash,
- recent blocks,
- block lookup,
- block transaction IDs and transaction objects,
- block hash by height,
- transaction lookup,
- address summary,
- address transaction list,
- mempool summary,
- recent mempool transactions,
- fee recommendations,
- difficulty adjustment data,
- mining hashrate data,
- price data,
- rich-list data.

See the endpoint table in [the public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) for the exact paths and classifications.

## Same-time comparison

The local BitcoinII Core node and `bc2mempool.com` REST tip matched at check time on 2026-07-12:

- height: `57437`
- tip hash: `00000000000000002b51511b79086a542c77992d82f34b7253b01de0e82b951a`

This was a point-in-time comparison, not a permanent sync or reliability claim. See [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md).

## Known limitations

Observed limitations from the dated smoke test:

- `/api/v1` base path returned 404.
- Address UTXO paths checked as `/api/address/{address}/utxo` and `/api/address/{address}/utxos` returned 404.
- `/api/v1/services` timed out.
- REST documentation was not captured as readable static documentation from the fetch used in the test.
- Complete schemas were not stabilized into a formal MoreBC2 reference.
- Transaction broadcast behavior was not tested.
- Long-term uptime, rate limits, and reliability were not tested.

## Safe wording

Use:

- "Observed public GET endpoints"
- "mempool.space-like in tested shapes"
- "same-time local-node comparison"
- "not a permanent reliability claim"

Do not use:

- "fully compatible"
- "drop-in replacement"
- "official API"
- "reliable for exchange custody"
- "broadcast tested"

## Verification

**Status:** Draft / Observed partial  
**Primary sources checked:** [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)  
**Notes:** This page summarizes a dated smoke test. It does not independently retest the API.
