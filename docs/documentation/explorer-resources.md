# Explorer resources

**Category:** Documentation
**Status:** Reviewed / Time-sensitive
**Last reviewed:** 2026-09-12

## Summary

Block explorers help users inspect BitcoinII (BC2) blocks, transactions, addresses, mempool state, and network statistics.

This page records the current explorer hierarchy and the evidence boundary around those services. It does not treat a public explorer as a substitute for an operator's own BitcoinII Core node in custody-critical workflows.

For route-level API behavior, see [API documentation](../api/README.md). For service role/status wording, see [Infrastructure](../infrastructure/README.md). For dated evidence, see [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

## Current explorer hierarchy

### Official BitcoinII Explorer

**URL:** https://bitcoinii.ddns.net/explorer/  
**Role:** Official BitcoinII Explorer  
**Last directly checked:** 2026-09-11

The service exposes a distinct public API shape from the Mempool-style services and reported API version `2.0.0` during the September smoke test.

Observed working areas included tip/block lookups, supply/UTXO statistics, mempool summary/fees, mining statistics, next-block information, and block/header lookups.

Important qualifications from the same test:

- `/api/mempool/count` returned 404;
- `/api/price` existed but reported exchange-rate functionality disabled in the server configuration;
- `/api/price/marketcap` returned 500;
- the UTXO statistics snapshot was 10 blocks behind the live tip at the observation point;
- tested broadcast-route candidates returned 403, so MoreBC2 did **not** establish a working public valid-transaction submission endpoint there.

### `explorer.bitcoin-ii.org`

**URL:** https://explorer.bitcoin-ii.org  
**Role:** Project-linked hostname; independently run/community-funded according to the service presentation; CapsPool.io infrastructure identified in the footer  
**Last directly checked:** 2026-09-11

The service exposed Mempool-style REST and WebSocket behavior during the September test.

Project linkage by domain should not be rewritten as project operation unless stronger operator evidence exists.

### `bc2mempool.com`

**URL:** https://bc2mempool.com  
**Role:** Supplemental public explorer/API service  
**Last directly checked:** 2026-09-11

The service exposed current-looking Mempool-style REST responses and a working WebSocket endpoint during the September test.

`POST /api/tx` with deliberately invalid payload `00` returned HTTP 400. That proves route existence/rejection behavior, **not** successful valid BC2 broadcast.

### `bc2.live`

**URL:** https://bc2.live  
**Role:** Supplemental public explorer/frontend  
**Last directly checked:** 2026-09-11

The service showed closely aligned Mempool-style REST/WebSocket behavior with `bc2mempool.com` and `explorer.bitcoin-ii.org` during the same comparison window.

## Same-tip comparison

At the September 11 comparison point, the Official BitcoinII Explorer, `explorer.bitcoin-ii.org`, and `bc2.live` all reported:

- height `58968`;
- best-block hash `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd`.

This is useful point-in-time agreement. It is not proof of permanent synchronization, long-term availability, or independent backends.

## Independence caution

`bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` showed closely aligned Mempool-style routes, schemas, fee/mempool values, block data, WebSocket behavior, and malformed-broadcast rejection behavior.

MoreBC2 therefore should **not** count those three hostnames automatically as three independent redundancy providers.

The evidence also does **not** prove they share one literal server, node, database, network, or operator. Backend/operator independence remains unverified.

## Electrum relationship

Fresh read-only Electrum checks on 2026-09-11 succeeded at:

- `infra1.bitcoin-ii.org:50008` — TCP;
- `infra1.bitcoin-ii.org:50009` — TLS 1.3 with hostname validation.

The older `explorer.bitcoin-ii.org:5008` candidate timed out again.

Electrum reachability is useful infrastructure evidence but does not establish wallet compatibility, signing safety, spending behavior, or transaction-broadcast compatibility.

## What explorers are useful for

Explorers are appropriate for:

- checking current tip height/hash;
- looking up known blocks and transactions;
- inspecting address activity where supported;
- checking confirmation depth;
- observing public mempool/fee/mining statistics;
- cross-checking a service operator's own node observations.

They are weaker evidence for:

- consensus rules;
- release-specific signing semantics;
- long-term service reliability;
- operator independence;
- custody safety;
- protocol finality.

## Service-provider guidance

For exchanges and custody services:

- use a service-controlled BitcoinII Core node as the critical source of deposit/withdrawal state;
- use public explorers as supplemental cross-checks;
- monitor cumulative chainwork and reorg conditions rather than treating a public confirmation count as irreversible finality;
- do not rely on one public explorer/API as the sole operational dependency.

## Related pages

- [Ecosystem explorers](../ecosystem/explorers.md)
- [Ecosystem APIs](../ecosystem/apis.md)
- [API documentation](../api/README.md)
- [Infrastructure directory](../infrastructure/README.md)
- [Compatibility](../compatibility/README.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Verification evidence index](../verification/verification-index.md)

## Verification

**Status:** Reviewed / Time-sensitive  
**Primary sources checked:** September 11 direct explorer/REST/WebSocket/Electrum test, current Infrastructure/API/Ecosystem pages, and current Source Registry  
**Notes:** Current service roles and dated behavior are documented. Permanent uptime, backend/operator independence, wallet compatibility, custody suitability, and successful valid public transaction broadcast remain unverified.
