# REST API compatibility

**Category:** Compatibility
**Status:** Draft / Observed partial
**Last reviewed:** 2026-07-13

## Summary

MoreBC2 has a narrow public smoke test for BitcoinII REST endpoints on `bc2mempool.com`.

The evidence supports describing several endpoints as mempool.space-like in tested shapes. It does not establish full REST API compatibility.

Canonical evidence:

- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [REST API](../api/rest.md)
- [mempool.space compatibility](../api/mempool-space-compatibility.md)

## Tested endpoint categories

The smoke test observed public GET responses for:

- chain tip height and hash,
- recent blocks,
- block lookup,
- block transaction IDs,
- block transaction objects,
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

## Observed response shapes

The smoke test classified several responses as compatible/similar or similar with extensions, including:

- tip height and hash,
- block details,
- transaction objects,
- address summaries,
- mempool summaries,
- fee estimates.

Address responses also included a BC2 `electrum` field, which should be treated as a BC2-specific extension unless future evidence establishes a broader standard.

## Unsupported or unavailable paths in the smoke test

The following paths did not behave as working compatibility targets during the dated check:

- `/api/address/{address}/utxo` returned 404.
- `/api/address/{address}/utxos` returned 404.
- `/api/v1` base path returned 404.
- `/api/v1/services` timed out.

## Compatibility limitations

The current evidence does not establish:

- complete schema coverage,
- rate-limit behavior,
- long-term uptime,
- transaction broadcast behavior,
- full mempool.space drop-in compatibility,
- exchange/custody suitability,
- common backend ownership for `bc2.live` and `bc2mempool.com`.

## Verification

**Status:** Draft / Observed partial  
**Primary sources checked:** Existing public API smoke-test records linked above  
**Notes:** This page summarizes REST compatibility observations. It does not retest public services.
