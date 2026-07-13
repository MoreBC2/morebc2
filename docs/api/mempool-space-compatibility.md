# mempool.space compatibility

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-07-12

## Summary

The 2026-07-12 public API smoke test found that several BitcoinII REST responses from `bc2mempool.com` resemble `mempool.space` endpoint shapes.

This page records cautious compatibility wording. It does not claim full drop-in compatibility.

Canonical evidence: [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md).

## Confirmed by current evidence

The following is confirmed only within the dated smoke-test scope:

- public GET endpoints responded for tip, blocks, transactions, address summaries, mempool, fees, mining analytics, prices, and rich-list data,
- several paths used familiar `mempool.space`-style route shapes,
- several response objects were classified as compatible/similar in the smoke test,
- same-time REST tip height and hash matched the local BitcoinII Core node.

## Observed as similar

The smoke test classified these areas as compatible, similar, or similar with extensions:

- chain tip height and hash,
- recent blocks,
- block details,
- block transaction IDs,
- block transaction objects,
- block hash by height,
- transaction lookup,
- address summary,
- address transaction list,
- mempool summary,
- recent mempool transactions,
- recommended fees.

For exact endpoint paths and classifications, use the table in [the public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md).

## BC2-specific extensions

The same record observed BC2-specific or analytics-style endpoints and fields, including:

- a BC2 `electrum` field in address responses,
- difficulty-adjustment data,
- mining hashrate data,
- BC2 price data,
- rich-list data.

These should be documented as BC2-specific or service-specific extensions unless future evidence shows a broader standard.

## Known incompatibilities or gaps

Known limitations from the smoke test:

- `/api/address/{address}/utxo` returned 404.
- `/api/address/{address}/utxos` returned 404.
- `/api/v1` base path returned 404.
- `/api/v1/services` timed out.
- transaction broadcast was not tested.
- complete schema coverage was not established.
- WebSocket event schemas were only minimally observed.
- Electrum success does not prove wallet compatibility.

## Compatibility labels

Use these labels in MoreBC2 docs:

| Label | Meaning |
|---|---|
| Confirmed | Directly shown by a committed dated evidence record. |
| Observed | Seen during a dated check, but not necessarily complete or stable. |
| Likely | Reasonable inference from observed behavior, but not enough to document as confirmed. |
| Untested | Not exercised in MoreBC2 evidence. |
| Unsupported | A checked endpoint or behavior failed or was absent in the evidence record. |

## Safe conclusion

Current evidence supports saying:

> The observed REST API is mempool.space-like in several tested read-only endpoint shapes, with BC2-specific extensions and known gaps.

Current evidence does not support saying:

> The API is fully mempool.space-compatible.

## Verification

**Status:** Draft / Observed partial  
**Primary sources checked:** [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)  
**Notes:** This page summarizes compatibility observations and known gaps from one dated smoke test.
