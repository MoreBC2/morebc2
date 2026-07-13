# Public endpoints

**Category:** Developer platform
**Status:** Draft / Evidence-linked directory
**Last reviewed:** 2026-07-12

## Summary

This page lists public BitcoinII / BC2 endpoints that appear in committed MoreBC2 evidence records.

It is a navigation aid. The dated verification records remain canonical.

## Explorer and REST

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bc2mempool.com` | Explorer frontend | Observed reachable | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Reliability, ownership, and long-term sync not established. |
| `https://bc2.live` | Explorer alias/frontend | Observed reachable | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Shared backend with `bc2mempool.com` not assumed. |
| `https://bc2mempool.com/api/v1` | REST namespace | Base path returned 404; concrete endpoints worked | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Do not treat base-path success as documented. |
| `https://bc2mempool.com/docs/api/rest` | REST documentation page | HTTP 200 observed; static fetch returned SPA shell | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Readable docs body was not captured in the smoke test. |
| `https://bitcoinii.ddns.net/explorer/` | Legacy/earlier observed explorer frontend | Same-time local comparison passed in dated check | 2026-07-10 | [Local node inspection](../verification/local-node-inspection-2026-07-10.md), [Explorers](../ecosystem/explorers.md) | Permanent sync, reliability, and official operation not established. |

## WebSocket

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `wss://bc2mempool.com/api/v1/ws` | Explorer/WebSocket updates | Handshake observed; initial explorer-state event received | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Full schema, reconnect behavior, and long sessions not verified. |

## Electrum

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Electrum TCP | Read-only calls succeeded | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Wallet compatibility not established. |
| `ssl://infra1.bitcoin-ii.org:50009` | Electrum SSL | Read-only calls succeeded; TLS hostname validation passed | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Wallet compatibility and spending/broadcast behavior not established. |
| `tcp://explorer.bitcoin-ii.org:5008` | Electrum TCP candidate | Timed out | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | No protocol result from the check. |

## Public JSON feeds

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `https://bc2mempool.com/bc2-price.json` | BC2 price data | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Price source and update behavior should be checked before reuse. |
| `https://bc2mempool.com/richlist.json` | Rich-list/supply data | Observed JSON response | 2026-07-12 | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) | Full rich list should not be copied into normal docs; schema stability not established. |

## Local RPC reference

Local RPC is not a public endpoint, but it is the strongest local comparison source currently recorded by MoreBC2.

| Endpoint | Purpose | Current status | Last checked | Evidence source | Known limitations |
|---|---|---|---|---|---|
| `127.0.0.1:8337` | Local BitcoinII Core JSON-RPC | Locally tested with cookie authentication | 2026-07-10 | [Local node inspection](../verification/local-node-inspection-2026-07-10.md), [RPC smoke test](../verification/read-only-rpc-smoke-test-2026-07-10.md) | One Windows mainnet environment; not cross-platform proof. |

## Verification

**Status:** Draft / Evidence-linked directory  
**Primary sources checked:** Existing MoreBC2 verification records linked above  
**Notes:** This page lists endpoints already present in committed records. It does not perform new service checks.
