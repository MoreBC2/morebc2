# mempool.space compatibility

**Category:** Compatibility
**Status:** Reviewed / Observed partial
**Last reviewed:** 2026-09-12

## Summary

Several public BC2 services expose mempool.space-style REST and WebSocket interfaces, but MoreBC2 has not established complete mempool.space drop-in compatibility.

The strongest current evidence comes from the 2026-09-11 public-infrastructure smoke test.

Canonical evidence:

- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [API mempool.space compatibility page](../api/mempool-space-compatibility.md)
- [REST API](../api/rest.md)

## Current mempool-style services observed

The following hosts showed closely aligned mempool.space-style behavior in the September test:

- `https://bc2mempool.com`
- `https://explorer.bitcoin-ii.org`
- `https://bc2.live`

Observed working areas included:

- tip height and hash;
- recent blocks;
- mempool summary and recent transactions;
- recommended fees;
- difficulty-adjustment data;
- mining hashrate data;
- price/rich-list data;
- block lookup;
- block transaction IDs;
- block transaction objects;
- block hash by height;
- WebSocket `init` responses.

The `/api/tx` route on all three hosts accepted POST requests and rejected deliberately invalid transaction data with HTTP 400. That establishes route existence and validation behavior only; it does **not** prove successful valid-transaction broadcast.

## Current differences and gaps

The September recheck established that `/api/v1/services` returns HTTP 404 on the tested mempool-style hosts. It should not be documented as a working current endpoint.

Earlier July checks also found missing address UTXO aliases such as:

- `/api/address/{address}/utxo`
- `/api/address/{address}/utxos`

Those specific gaps were not the focus of the September recheck, so they should remain historical observations unless re-tested directly.

## Similarity is not redundancy

`bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` showed closely aligned routes, schemas, mempool/fee values, block data, WebSocket behavior, and invalid-broadcast rejection behavior.

That similarity is useful compatibility evidence, but it does not prove they run independent backends, nodes, databases, networks, or operators. Do not count three hostnames as three independent redundancy providers without separate evidence.

## Official explorer is different

The Official BitcoinII Explorer at `https://bitcoinii.ddns.net/explorer/` exposes a materially different API shape and server behavior. It should not be described as another interchangeable mempool.space-compatible backend.

## Assumptions developers should not make

Do not assume:

- every mempool.space endpoint or alias exists;
- response schemas and units are identical;
- WebSocket event schemas are complete drop-in matches;
- valid transaction broadcast is verified;
- the three mempool-style hosts are independent infrastructure;
- a Bitcoin wallet/library can use these APIs safely without BC2-specific chain and replay-protection handling.

## Verification

**Status:** Reviewed / Observed partial  
**Primary sources checked:** 2026-09-11 public-infrastructure smoke test plus preserved historical API compatibility records  
**Notes:** Current evidence supports substantial mempool.space-style interface similarity, not complete drop-in compatibility or infrastructure independence.
