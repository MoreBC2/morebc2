# mempool.space compatibility

**Category:** Compatibility
**Status:** Draft / Observed partial
**Last reviewed:** 2026-07-13

## Summary

The `bc2mempool.com` REST API showed several mempool.space-like endpoint shapes during the 2026-07-12 smoke test.

This does not establish full mempool.space drop-in compatibility.

Canonical evidence:

- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [API mempool.space compatibility page](../api/mempool-space-compatibility.md)
- [REST API](../api/rest.md)

## Observed similarities

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

## Endpoint differences and gaps

Known differences or failed paths from the smoke test:

- `/api/address/{address}/utxo` returned 404.
- `/api/address/{address}/utxos` returned 404.
- `/api/v1` base path returned 404.
- `/api/v1/services` timed out.
- aliases were not established for every endpoint.
- complete schemas were not established.

## BC2-specific extensions

Observed BC2-specific or service-specific extensions include:

- BC2 `electrum` field in address responses,
- difficulty-adjustment endpoint data,
- mining hashrate endpoint data,
- BC2 price data,
- rich-list data.

## Assumptions developers should not make

Do not assume:

- every mempool.space endpoint exists,
- all aliases behave the same,
- field names and units match exactly,
- UTXO endpoints are compatible,
- transaction broadcast works,
- WebSocket events match mempool.space schemas,
- a Bitcoin wallet/library can use the API without BC2-specific chain handling.

## Verification

**Status:** Draft / Observed partial  
**Primary sources checked:** Existing public API smoke-test and API compatibility summaries linked above  
**Notes:** This page summarizes mempool.space-like observations and known gaps. It does not claim drop-in compatibility.
