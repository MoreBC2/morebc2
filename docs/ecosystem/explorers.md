# Explorers

**Category:** Documentation
**Status:** Reviewed / Time-sensitive
**Last reviewed:** 2026-09-12

## Summary

This page tracks BitcoinII (BC2) block explorers and the evidence currently available for their public interfaces.

Explorer links should be checked directly before they are represented as active. The canonical current protocol-level evidence is [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

Public explorers are useful for observation, support, and cross-checking, but none should be treated as the sole source of truth for exchange/custody operations without independent node infrastructure and an explicit reliability model.

## Current checked explorers

### Official BitcoinII Explorer

**Status:** Active, dated check  
**Official:** Yes — page explicitly identifies itself as the Official BitcoinII Explorer  
**URL:** `https://bitcoinii.ddns.net/explorer/`  
**Observed capabilities:** Blocks / transactions / addresses / distinct public API / mempool / mining / supply / UTXO statistics / halving data  
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
- `/api/price` existed but returned application-level `success:false` because exchange-rate requests were disabled in server configuration;
- `/api/price/marketcap` returned HTTP 500;
- `/api/mining/miner-summary` existed but required parameters such as `since` or a height range;
- deliberately invalid POSTs to `/api/tx`, `/api/tx/send`, and `/api/broadcast` returned HTTP 403, so no public transaction-submission endpoint was established on this explorer.

### `explorer.bitcoin-ii.org`

**Status:** Active, dated check  
**Official:** No — project-linked by domain, while the service presentation identifies it as independently run/community-funded  
**Infrastructure note:** Footer identifies CapsPool.io infrastructure  
**URL:** `https://explorer.bitcoin-ii.org`  
**Observed capabilities:** Mempool-style blocks / transactions / mempool / fees / mining / price-like feeds / rich list / WebSocket; `POST /api/tx` route present but valid broadcast unverified  
**Last checked:** 2026-09-11

Direct checks observed a working Mempool-style REST API, a WebSocket `init` response, and `POST /api/tx` rejecting deliberately invalid transaction data `00` with HTTP 400.

That 400 response establishes route presence/rejection behavior only. It does **not** establish successful valid BC2 broadcast or network propagation.

The older Electrum candidate `explorer.bitcoin-ii.org:5008` timed out again and should not be represented as a currently working Electrum endpoint.

### `bc2mempool.com`

**Status:** Active, dated check / Supplemental  
**Official:** No official-project designation established  
**URL:** `https://bc2mempool.com`  
**Observed capabilities:** Mempool-style blocks / transactions / mempool / fees / mining / price-like feeds / rich list / WebSocket; `POST /api/tx` route present but valid broadcast unverified  
**Last checked:** 2026-09-11

Direct checks observed a working Mempool-style REST API, current tip data, a WebSocket `init` response, and `POST /api/tx` rejecting deliberately invalid transaction data `00` with HTTP 400.

That is route/rejection evidence, not successful valid-transaction broadcast evidence.

### `bc2.live`

**Status:** Active, dated check / Supplemental  
**Official:** No official-project designation established  
**URL:** `https://bc2.live`  
**Observed capabilities:** Mempool-style blocks / transactions / mempool / fees / mining / price-like feeds / rich list / WebSocket; `POST /api/tx` route present but valid broadcast unverified  
**Last checked:** 2026-09-11

Direct checks observed a working Mempool-style REST API, current tip data, a WebSocket `init` response, and `POST /api/tx` rejecting deliberately invalid transaction data `00` with HTTP 400.

Again, this is not proof that a valid BC2 transaction can be broadcast through the service.

## Mempool-style route family

The following route family was directly observed across `explorer.bitcoin-ii.org`, `bc2mempool.com`, and `bc2.live` during the September checks:

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

`/api/v1/services` returned HTTP 404 on the tested hosts and should not be represented as an active current route.

## Same-time comparison

During the 2026-09-11 multi-explorer comparison, these three services reported the same tip:

| Service | Height | Tip hash |
|---|---:|---|
| Official BitcoinII Explorer | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `explorer.bitcoin-ii.org` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `bc2.live` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |

`bc2mempool.com` reported the same height/hash during the immediately preceding focused probe.

This establishes point-in-time agreement only. It does not establish permanent synchronization or service independence.

## Redundancy interpretation

The Official BitcoinII Explorer exposes a materially different API shape and server behavior from the three Mempool-style services.

`explorer.bitcoin-ii.org`, `bc2mempool.com`, and `bc2.live` showed closely aligned routes, schemas, mempool/fee values, block data, WebSocket behavior, and invalid-broadcast rejection behavior.

That similarity does not prove they share a literal backend, server, database, network, or operator. It also does not establish independent redundancy. Do not count those three hostnames as three independent node/API providers without separate operator/backend evidence.

## Electrum relationship

Electrum is a separate protocol service and should not be inferred from an explorer hostname.

Current read-only observations from 2026-09-11:

| Endpoint | Result |
|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; `server.version` returned ElectrumX `1.18.0`, protocol `1.4` |
| `ssl://infra1.bitcoin-ii.org:50009` | TLS 1.3; hostname validation succeeded; same ElectrumX/protocol response |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out again |

The observed TLS certificate for `infra1.bitcoin-ii.org` reported expiry `2026-11-20` in the client environment.

These checks establish read-only reachability only. They do not establish wallet compatibility, address/scripthash-history correctness, signing/spending behavior, or successful Electrum transaction broadcast.

## Broadcast evidence boundary

As of the current evidence set:

- no valid BC2 transaction has been successfully broadcast through any of the public explorer/API services above in a MoreBC2 test;
- malformed `00` payload rejection on the three Mempool-style `/api/tx` routes proves route presence and rejection only;
- HTTP 403 on the Official Explorer candidate routes did not establish a public submission route;
- the separate v31 disposable-regtest `sendrawtransaction` test was local-only on a zero-peer node and is not public-broadcast evidence.

This distinction matters for wallet and exchange integrations. A route should not be relied on for withdrawals until successful valid submission and propagation behavior has been tested in an appropriate disposable environment.

## Historical and unresolved candidates

The following entries are retained as historical observations and should not override newer dated checks:

| Candidate URL | Historical result | Current interpretation |
|---|---|---|
| `https://bitcoiniiexplorer.org` | DNS resolution failed in July 2026 | Historical unresolved metadata-linked domain; not the current working explorer URL. |
| `https://chainz.cryptoid.info/bc2/` | Redirected to Chainz main index | Not established as a BC2 explorer. |
| `https://explorer.bitcoin-ii.com` | DNS failed | Broken historical candidate. |
| `https://explorer.bitcoinii.org` | Connection failed | Broken historical candidate. |
| `https://blockexplorer.bitcoin-ii.org` | DNS failed | Broken historical candidate. |

## Service-provider guidance

For exchange, custody, and other critical integrations:

- operate a service-controlled BitcoinII Core node for authoritative deposit/withdrawal state;
- use public explorers as supplemental observations and cross-checks;
- distinguish live-tip routes from statistics endpoints that may lag or cache;
- do not infer independent redundancy from hostname count;
- qualify a valid transaction-submission path before depending on it;
- monitor confirmation depth together with chainwork and reorg conditions rather than treating confirmations as deterministic finality.

## What remains unverified

- Long-term uptime, latency, rate limits, and SLA behavior.
- Backend/operator independence among the Mempool-style hostnames.
- Successful broadcast of a valid BC2 transaction through any public explorer/API.
- Successful Electrum transaction broadcast.
- Third-party wallet compatibility with the Electrum service.
- Custody-grade suitability.
- Broad transaction/address edge-case coverage.

## Related pages

- [Explorer resources](../documentation/explorer-resources.md)
- [APIs](apis.md)
- [Public endpoints](../api/public-endpoints.md)
- [Electrum](../api/electrum.md)
- [Infrastructure service directory](../infrastructure/service-directory.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Windows v31 PSBT/replay validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Verification evidence index](../verification/verification-index.md)

## Verification

**Status:** Reviewed / Time-sensitive  
**Primary evidence:** Direct public explorer/API/WebSocket/Electrum checks from 2026-09-11 plus the bounded September v31 local-transaction record  
**Notes:** Current hierarchy, route behavior, same-tip comparison, Electrum endpoint state, redundancy cautions, and public-broadcast evidence boundaries are synchronized. Permanent synchronization, independent redundancy, successful valid public broadcast, wallet compatibility, and production custody suitability remain unverified.
