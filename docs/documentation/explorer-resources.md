# Explorer resources

**Category:** Documentation
**Status:** Reviewed / Time-sensitive
**Last reviewed:** 2026-09-12

## Summary

Block explorers help users inspect BitcoinII (BC2) blocks, transactions, addresses, mempool state, and network statistics.

This page records the current explorer hierarchy and the evidence boundary around those services. It does not treat a public explorer as a substitute for an operator's own BitcoinII Core node in custody-critical workflows.

For route-level API behavior, see [Public endpoints](../api/public-endpoints.md). For Electrum details, see [Electrum](../api/electrum.md). For service role/status wording, see [Infrastructure](../infrastructure/README.md). The canonical dated evidence is [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

## Current explorer hierarchy

| Service | Current role | Evidence class | Last directly checked |
|---|---|---|---|
| `https://bitcoinii.ddns.net/explorer/` | **Official BitcoinII Explorer** | Direct explorer/API check | 2026-09-11 |
| `https://explorer.bitcoin-ii.org` | Project-linked hostname; independently run/community-funded according to the service presentation; CapsPool.io infrastructure identified in the footer | Direct explorer/API/WebSocket check | 2026-09-11 |
| `https://bc2mempool.com` | Supplemental public explorer/API service | Direct explorer/API/WebSocket check | 2026-09-11 |
| `https://bc2.live` | Supplemental public explorer/frontend | Direct explorer/API/WebSocket check | 2026-09-11 |

Project linkage by hostname must not be rewritten as project operation unless stronger operator evidence exists.

## Official BitcoinII Explorer

The Official BitcoinII Explorer exposes a materially different public API shape from the three Mempool-style services. During the September smoke test it reported API version `2.0.0`.

Directly observed working areas included:

- tip and block lookups;
- block/header lookup by hash and height;
- supply and UTXO statistics;
- next-halving data;
- mempool summary and fee information;
- mining hashrate, difficulty-estimate, and next-block information.

Important route-level qualifications from the same test:

- `/api/mempool/count` returned HTTP 404;
- `/api/price` returned HTTP 200 but application-level `success:false` because exchange-rate requests were disabled in the server configuration;
- `/api/price/marketcap` returned HTTP 500;
- `/api/mining/miner-summary` was present, but a bare request required `since` or a height range;
- `/api/blockchain/utxo-set` returned a statistics snapshot at height `58958` while live tip was `58968`, so it should be treated as potentially cached/lagged statistics rather than tip authority;
- deliberately invalid POST probes to `/api/tx`, `/api/tx/send`, and `/api/broadcast` returned HTTP 403, so MoreBC2 did **not** establish a public transaction-submission endpoint there.

## Mempool-style explorer services

`explorer.bitcoin-ii.org`, `bc2mempool.com`, and `bc2.live` exposed closely aligned Mempool-style REST and WebSocket behavior during the September 11 checks.

Observed route families included current tip, recent blocks, mempool, fees, difficulty adjustment, mining hashrate, prices, rich-list data, and block/transaction lookups. `/api/v1/services` returned HTTP 404 on the tested hosts and should not be documented as an active current route.

Each of the three hosts also accepted a WebSocket connection at `wss://HOST/api/v1/ws`; an `init` request returned explorer-state data during the dated test.

## Broadcast evidence — use exact wording

Public transaction submission remains **unverified for a valid BC2 transaction**.

| Service | Probe/result | What it establishes | What it does not establish |
|---|---|---|---|
| Official BitcoinII Explorer | Invalid POSTs to `/api/tx`, `/api/tx/send`, `/api/broadcast` returned 403 | Tested candidate routes did not establish a public submission endpoint | Successful valid broadcast |
| `explorer.bitcoin-ii.org` | `POST /api/tx` with payload `00` returned 400 | Route exists, accepts POST, and rejects malformed transaction data | Successful valid broadcast or propagation |
| `bc2mempool.com` | `POST /api/tx` with payload `00` returned 400 | Route exists, accepts POST, and rejects malformed transaction data | Successful valid broadcast or propagation |
| `bc2.live` | `POST /api/tx` with payload `00` returned 400 | Route exists, accepts POST, and rejects malformed transaction data | Successful valid broadcast or propagation |

Do not shorten the Mempool-style result to “broadcast works” or even “transaction submission works.” The evidence class is **route present / invalid payload rejected**.

The separate September 11 disposable regtest test successfully used local BitcoinII Core `sendrawtransaction`, but that node had zero peers. It proves local v31 mempool submission in that isolated environment, not public explorer/API broadcast.

## Same-tip comparison

At the September 11 multi-explorer comparison point, these services reported the same mainnet tip:

| Service | Height | Best-block hash |
|---|---:|---|
| Official BitcoinII Explorer | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `explorer.bitcoin-ii.org` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |
| `bc2.live` | `58968` | `0000000000000000fb4d304134d055212b16595626526fce3bce6637aff882cd` |

`bc2mempool.com` reported the same height/hash during the immediately preceding focused probe.

This is useful point-in-time agreement. It is not proof of permanent synchronization, long-term availability, common ownership, or independent backends.

## Independence and redundancy caution

The Official BitcoinII Explorer presents a materially different API surface and server behavior from the Mempool-style services.

By contrast, `explorer.bitcoin-ii.org`, `bc2mempool.com`, and `bc2.live` showed closely aligned routes, response schemas, fee/mempool values, block data, WebSocket behavior, and malformed-broadcast rejection behavior.

MoreBC2 therefore does **not** count those three hostnames automatically as three independent redundancy providers.

That similarity also does **not** prove they share one literal server, node, database, network, or operator. Backend/operator independence remains unverified and should be established separately if redundancy claims matter operationally.

## Electrum relationship

Current read-only Electrum observations are separate from the explorer HTTP APIs.

| Endpoint | September 11 result | Boundary |
|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; `server.version` returned ElectrumX `1.18.0`, protocol `1.4` | Read-only protocol reachability only |
| `ssl://infra1.bitcoin-ii.org:50009` | TLS 1.3 connection; hostname validation succeeded; same ElectrumX/protocol response | Read-only protocol/TLS reachability only |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out again | Do not publish as a working current endpoint |

The TLS certificate observed for `infra1.bitcoin-ii.org` reported expiry `2026-11-20` in the test client. That is dated certificate evidence, not an uptime guarantee.

Electrum reachability does not establish wallet compatibility, address/scripthash-history correctness, signing safety, spending behavior, or successful Electrum transaction broadcast.

## What explorers are useful for

Explorers are appropriate for:

- checking a current tip height/hash;
- looking up known blocks and transactions;
- inspecting address activity where supported;
- checking confirmation depth;
- observing public mempool, fee, mining, supply, or price-like service data with the route's stated limitations;
- cross-checking an operator's own node observations.

They are weaker evidence for:

- consensus rules;
- release-specific signing semantics;
- long-term service reliability or SLA behavior;
- backend/operator independence;
- custody safety;
- protocol finality;
- a successful transaction-broadcast path unless a valid transaction is actually tested.

## Service-provider guidance

For exchanges and custody services:

- use a service-controlled BitcoinII Core node as the critical source of deposit/withdrawal state;
- use public explorers as supplemental cross-checks, not the sole source of truth;
- monitor cumulative chainwork and reorg conditions rather than treating a public confirmation count as irreversible finality;
- treat cached/lagged statistics endpoints separately from tip authority;
- do not assume several hostnames equal several independent infrastructure providers;
- qualify and test a real broadcast path before relying on a public API for withdrawals.

## Related pages

- [Ecosystem explorers](../ecosystem/explorers.md)
- [Ecosystem APIs](../ecosystem/apis.md)
- [Public endpoints](../api/public-endpoints.md)
- [Electrum](../api/electrum.md)
- [Infrastructure service directory](../infrastructure/service-directory.md)
- [Compatibility](../compatibility/README.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Windows v31 PSBT/replay validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Verification evidence index](../verification/verification-index.md)

## Verification

**Status:** Reviewed / Time-sensitive  
**Primary sources checked:** September 11 direct explorer/REST/WebSocket/Electrum evidence, current API/Infrastructure/Ecosystem pages, and September v31 local transaction evidence  
**Notes:** Current service roles, route behavior, Electrum reachability, same-tip observations, and broadcast boundaries are synchronized. Permanent uptime, backend/operator independence, wallet compatibility, custody suitability, and successful valid public transaction broadcast remain unverified.
