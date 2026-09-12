# Explorers

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page tracks BitcoinII (BC2) block explorers.

Explorer links should be checked directly before they are listed as active. Current protocol-level evidence is recorded in [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

Public explorers are useful for observation and support, but none should be treated as the sole source of truth for exchange/custody operations without independent node infrastructure and an explicit reliability model.

## Current checked explorers

### Official BitcoinII Explorer

**Status:** Active, dated check  
**Official:** Yes — page explicitly identifies itself as the Official BitcoinII Explorer  
**URL:** `https://bitcoinii.ddns.net/explorer/`  
**Supports:** Blocks / transactions / addresses / public API / mempool / mining / supply / UTXO statistics / halving data  
**Last checked:** 2026-09-11

Direct checks observed:

- frontend HTTP 200;
- `/api/blocks/tip` returned height `58968` and best hash `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`;
- `/api/version` returned `2.0.0`;
- block and block-header lookup by both hash and height worked;
- supply, next-halving, mempool summary/fees, hashrate, difficulty estimate, and next-block routes responded;
- `/api/blockchain/utxo-set` returned a statistics snapshot at height `58958`, ten blocks behind the live tip, so that endpoint should be treated as a potentially lagged/cached statistics source rather than tip authority.

Observed route qualifications:

- `/api/mempool/count` returned 404;
- `/api/price` existed but returned an application-level `success:false` because exchange rates were disabled in server configuration;
- `/api/price/marketcap` returned HTTP 500;
- `/api/mining/miner-summary` existed but required query parameters such as `since` or a height range;
- tested broadcast candidates returned HTTP 403, so no public transaction-submission route was established on this explorer.

### `explorer.bitcoin-ii.org`

**Status:** Active, dated check  
**Official:** No — project-linked by domain, but the service identifies itself as independently run/community-funded  
**Infrastructure note:** Footer identifies CapsPool.io infrastructure  
**URL:** `https://explorer.bitcoin-ii.org`  
**Supports:** Blocks / transactions / mempool / fees / mining / price feeds / rich list / WebSocket / public transaction-submission route  
**Last checked:** 2026-09-11

Direct checks observed a working Mempool-style REST API, WebSocket `init` response, and `/api/tx` route that accepted POST and rejected deliberately invalid transaction data with HTTP 400.

The older Electrum candidate `explorer.bitcoin-ii.org:5008` timed out again and should not be represented as a currently working Electrum endpoint.

### `bc2mempool.com`

**Status:** Active, dated check / Supplemental  
**Official:** No official-project designation established  
**URL:** `https://bc2mempool.com`  
**Supports:** Blocks / transactions / mempool / fees / mining / price feeds / rich list / WebSocket / public transaction-submission route  
**Last checked:** 2026-09-11

Direct checks observed a working Mempool-style REST API, current tip data, WebSocket `init` response, and `/api/tx` route that accepted POST and rejected deliberately invalid transaction data with HTTP 400.

### `bc2.live`

**Status:** Active, dated check / Supplemental  
**Official:** No official-project designation established  
**URL:** `https://bc2.live`  
**Supports:** Blocks / transactions / mempool / fees / mining / price feeds / rich list / WebSocket / public transaction-submission route  
**Last checked:** 2026-09-11

Direct checks observed a working Mempool-style REST API, current tip data, WebSocket `init` response, and `/api/tx` route that accepted POST and rejected deliberately invalid transaction data with HTTP 400.

## Same-time comparison

During the 2026-09-11 multi-explorer comparison, these three services reported the same tip:

| Service | Height | Tip hash |
|---|---:|---|
| Official BitcoinII Explorer | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `explorer.bitcoin-ii.org` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `bc2.live` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |

`bc2mempool.com` reported the same height/hash during the immediately preceding focused probe.

This establishes point-in-time agreement only.

## Redundancy interpretation

The Official BitcoinII Explorer exposes a materially different API shape and server behavior from the three Mempool-style services.

`explorer.bitcoin-ii.org`, `bc2mempool.com`, and `bc2.live` showed closely aligned routes, schemas, mempool/fee values, block data, WebSocket behavior, and invalid-broadcast rejection behavior.

That similarity does not prove they share a literal backend, but it also does not establish independent redundancy. Do not count those three hostnames as three independent node/API providers without separate operator/backend evidence.

## Historical and unresolved candidates

The following entries are retained as historical observations and should not override newer dated checks:

| Candidate URL | Historical result | Current interpretation |
|---|---|---|
| `https://bitcoiniiexplorer.org` | DNS resolution failed in July 2026 | Historical unresolved metadata-linked domain; not the current working explorer URL. |
| `https://chainz.cryptoid.info/bc2/` | Redirected to Chainz main index | Not established as a BC2 explorer. |
| `https://explorer.bitcoin-ii.com` | DNS failed | Broken historical candidate. |
| `https://explorer.bitcoinii.org` | Connection failed | Broken historical candidate. |
| `https://blockexplorer.bitcoin-ii.org` | DNS failed | Broken historical candidate. |

## What remains unverified

- Long-term uptime, latency, rate limits, and SLA behavior.
- Backend/operator independence among the Mempool-style hostnames.
- Successful broadcast of a valid BC2 transaction through any public explorer/API.
- Custody-grade suitability.
- Broad transaction/address edge-case coverage.

## Related pages

- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Public endpoints](../api/public-endpoints.md)
- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [APIs](apis.md)
- [Verification evidence index](../verification/verification-index.md)

## Verification

**Status:** Draft  
**Primary evidence:** Direct public explorer/API checks from 2026-09-11 plus preserved historical records  
**Notes:** Current reachability, route behavior, and same-time tip agreement are dated observations. They do not establish permanent synchronization, independent redundancy, or production custody suitability.