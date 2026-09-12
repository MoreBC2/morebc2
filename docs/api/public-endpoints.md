# Public endpoints

**Category:** Developer platform
**Status:** Draft / Evidence-linked directory
**Last reviewed:** 2026-09-12

## Summary

This page lists public BitcoinII / BC2 infrastructure relevant to wallets, exchanges, explorers, and service providers.

Current service classification:

- **Official BitcoinII Explorer:** `https://bitcoinii.ddns.net/explorer/`
- **Project-linked, independently operated explorer:** `https://explorer.bitcoin-ii.org`
- **Supplemental public services:** `https://bc2mempool.com` and `https://bc2.live`

Dated verification records remain canonical for specific protocol tests. A current reachability observation does not establish permanent uptime, backend independence, or suitability as the sole source of truth for custody infrastructure.

## Explorer and REST

| Endpoint | Classification | Purpose | Current status | Last checked | Known limitations |
|---|---|---|---|---|---|
| `https://bitcoinii.ddns.net/explorer/` | **Official BitcoinII Explorer** | Primary designated explorer for blocks, transactions, addresses, mempool, mining, UTXO data, and public API access | Reachable; current chain data observed | 2026-09-12 | Official designation does not imply an SLA or make a public explorer sufficient as a sole custody backend. |
| `https://explorer.bitcoin-ii.org` | **Project-linked, independently operated explorer** | Mempool-style explorer hosted under the BitcoinII domain | Reachable; active explorer pages observed | 2026-09-12 | Footer identifies it as independently run/community-funded, with infrastructure by CapsPool.io. |
| `https://bc2mempool.com` | **Supplemental public service** | Alternate explorer and public API surface | Reachable | 2026-09-12 | Ownership, backend independence, long-term uptime, and permanent synchronization are not established. |
| `https://bc2.live` | **Supplemental public service** | Alternate explorer/frontend | Reachable | 2026-09-12 | Backend independence from other services has not been established. |
| `https://bc2mempool.com/api/v1` | Supplemental REST namespace | Public API namespace | Base path returned 404 in the 2026-07-12 test; concrete endpoints worked | 2026-07-12 | Concrete JSON paths require a fresh direct re-test before current production claims. |
| `https://bc2mempool.com/docs/api/rest` | Supplemental API documentation | REST documentation frontend | Reachable | 2026-09-12 | Earlier static fetch returned the SPA shell rather than a captured readable documentation body. |

### Infrastructure interpretation

`bitcoinii.ddns.net/explorer/` is the **Official BitcoinII Explorer** and should be the primary project-designated explorer reference in integration documentation.

`explorer.bitcoin-ii.org` is project-linked because it is hosted under the BitcoinII domain, but the service itself states that it is independently run and community-funded, with infrastructure by CapsPool.io. It should therefore not be described as project-operated.

`bc2mempool.com` and `bc2.live` are supplemental services.

A distinct hostname must not be treated as evidence of an independent backend. Backend/operator independence should be separately established before a service is counted toward infrastructure redundancy.

The protocol-specific records below remain dated observations until directly re-tested. They should not be silently promoted to current verification merely because the corresponding web frontend is reachable.

## WebSocket

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `wss://bc2mempool.com/api/v1/ws` | Supplemental explorer/WebSocket updates | Handshake observed; initial explorer-state event received | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Full schema, reconnect behavior, and long sessions not verified. |

## Electrum

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Electrum TCP | Read-only calls succeeded | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Wallet compatibility not established. |
| `ssl://infra1.bitcoin-ii.org:50009` | Electrum SSL | Read-only calls succeeded; TLS hostname validation passed | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Wallet compatibility and spending/broadcast behavior not established. |
| `tcp://explorer.bitcoin-ii.org:5008` | Electrum TCP candidate | Timed out | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | No protocol result from the check. |

## Public JSON feeds

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bc2mempool.com/bc2-price.json` | Supplemental BC2 price data | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Price source and update behavior should be checked before reuse. |
| `https://bc2mempool.com/richlist.json` | Supplemental rich-list/supply data | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Full rich list should not be copied into normal docs; schema stability not established. |

## Local RPC historical reference

Local RPC is not a public endpoint. The entry below is retained as historical MoreBC2 evidence and must not be confused with the v31.1.0 documented default.

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `127.0.0.1:8337` | Historical configured BitcoinII Core v29.1.0 JSON-RPC endpoint | Locally tested with cookie authentication | 2026-07-10 | [Local node inspection](../verification/local-node-inspection-2026-07-10.md), [RPC smoke test](../verification/read-only-rpc-smoke-test-2026-07-10.md) | This was a configured v29.1.0 Windows environment. BitcoinII Core v31.1.0 documents mainnet RPC port `8332` as its default. |

## Verification

**Status:** Draft / Evidence-linked directory  
**Primary sources checked:** Existing MoreBC2 verification records plus public reachability and operator-label checks from 2026-09-12  
**Notes:** `bitcoinii.ddns.net/explorer/` is classified as the Official BitcoinII Explorer. `explorer.bitcoin-ii.org` is classified as project-linked but independently operated. `bc2mempool.com` and `bc2.live` are classified as supplemental services. Historical protocol checks remain dated; backend independence, uptime guarantees, and custody-grade reliability remain unverified unless explicitly supported by a dated verification record.
