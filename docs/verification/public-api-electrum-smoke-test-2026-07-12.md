# BitcoinII public API, WebSocket, and Electrum smoke test — 2026-07-12

**Category:** Verification record  
**Status:** Partial / Directly tested  
**Date checked:** 2026-07-12  
**Timezone:** America/New_York

## Summary

A narrow read-only smoke test checked the public BitcoinII explorer, REST API, WebSocket endpoint, and advertised Electrum services. The local BitcoinII Core node and REST tip matched at check time. No wallet access, transaction broadcast, POST submission, credentials, private keys, account-gated services, fuzzing, or load testing were used.

## Services checked

| Service | Endpoint | Result |
|---|---|---|
| Explorer | `https://bc2mempool.com` | HTTP 200; BitcoinII explorer shell loaded |
| Explorer alias | `https://bc2.live` | HTTP 200; same visible shell observed, shared backend not assumed |
| REST docs | `https://bc2mempool.com/docs/api/rest` | HTTP 200; static fetch returned SPA shell rather than readable docs body |
| REST base | `https://bc2mempool.com/api/v1` | 404; concrete endpoints worked |
| WebSocket | `wss://bc2mempool.com/api/v1/ws` | Handshake succeeded; initial explorer-state event received after `{"action":"init"}` |
| Electrum TCP | `infra1.bitcoin-ii.org:50008` | Connected; read-only calls succeeded |
| Electrum SSL | `infra1.bitcoin-ii.org:50009` | Connected; valid TLS 1.3 certificate for hostname; read-only calls succeeded |
| Electrum TCP | `explorer.bitcoin-ii.org:5008` | DNS resolved; TCP timed out |

## REST endpoint results

Successful public responses exposed permissive CORS (`Access-Control-Allow-Origin: *`) on the checked endpoints.

| Endpoint | Result | Classification |
|---|---|---|
| `/api/v1/blocks/tip/height` | Returned scalar tip height | mempool.space-compatible/similar |
| `/api/v1/blocks/tip/hash` | Returned tip hash | mempool.space-compatible/similar |
| `/api/v1/blocks` | Returned recent block array with additional `extras` fields | Similar, with extensions |
| `/api/block/{hash}` | Returned block details | Compatible/similar |
| `/api/v1/block/{hash}` | Returned same block shape as an alias | Similar alias |
| `/api/block/{hash}/txids` | Returned transaction ID array | Compatible |
| `/api/block/{hash}/txs` | Returned transaction objects | Compatible/similar |
| `/api/block-height/{height}` | Returned block hash | Compatible/similar |
| `/api/tx/{txid}` | Returned mempool-style transaction object | Compatible/similar |
| `/api/address/{address}` | Returned chain/mempool stats plus BC2 `electrum` field | Similar, BC2 extension |
| `/api/address/{address}/txs` | Returned address transaction array | Compatible/similar |
| `/api/address/{address}/utxo` | 404 | Unavailable in this check |
| `/api/address/{address}/utxos` | 404 | Unavailable in this check |
| `/api/mempool` | Returned count, vsize, total fee, and histogram | Compatible/similar |
| `/api/mempool/recent` | Returned recent mempool transaction summaries | Compatible/similar |
| `/api/v1/fees/recommended` | Returned standard recommended-fee fields | Compatible/similar |
| `/api/v1/difficulty-adjustment` | Returned retarget/progress fields | Analytics extension |
| `/api/v1/mining/hashrate/3d` | Returned hashrate and difficulty series/current values | Analytics extension |
| `/api/v1/prices` | Returned BC2 prices in multiple fiat currencies | BC2-specific extension |
| `/bc2-price.json` | Returned BC2 market fields including source and update time | BC2-specific extension |
| `/richlist.json` | Returned supply/address counts and a rich-list array | BC2-specific extension |
| `/api/v1/services` | Timed out | Unavailable in this check |

The rich-list response reported `total_addresses=233936`, `addresses_with_balance=5869`, and `total_supply=287152536663595`. The full list was not copied into this record.

## Same-time local-node comparison

Local node timestamp: `2026-07-12T18:04:07.9182933-04:00`  
REST timestamp: `2026-07-12T18:04:08.1566057-04:00`

| Source | Height | Best block hash |
|---|---:|---|
| Local BitcoinII Core node | `57437` | `00000000000000002b51511b79086a542c77992d82f34b7253b01de0e82b951a` |
| `bc2mempool.com` REST API | `57437` | `00000000000000002b51511b79086a542c77992d82f34b7253b01de0e82b951a` |

Result: the local node and REST API matched at check time. This is a dated point-in-time agreement, not proof of permanent sync or reliability.

## WebSocket result

The WebSocket handshake to `wss://bc2mempool.com/api/v1/ws` succeeded. After sending the documented-style initialization message `{"action":"init"}`, a text event was received beginning with explorer-state fields including `mempoolInfo` and `blocks`. The connection was then closed cleanly.

The first frame was large, and full-message JSON validity and all event schemas were not established from this single smoke test.

## Electrum results

Only these read-only methods were used:

- `server.version`
- `server.features`
- `blockchain.headers.subscribe`

| Endpoint | Result |
|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | `ElectrumX 1.18.0`; protocol `1.4`, maximum `1.4.3`; genesis hash matched BitcoinII; header height `57437`; header hash matched local/REST tip |
| `ssl://infra1.bitcoin-ii.org:50009` | Same server/protocol/genesis/header result; TLS 1.3 certificate validation and hostname match succeeded |
| `tcp://explorer.bitcoin-ii.org:5008` | Connection timed out; no protocol result |

Observed genesis hash:

```text
0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb
```

## Compatibility interpretation

This smoke test supports describing many REST paths as **mempool.space-like** or **compatible in the tested shape**. It does not establish universal drop-in compatibility.

Potential compatibility breaks remain:

- address UTXO paths tested here returned 404,
- the `/api/v1` base path returned 404,
- aliases are not guaranteed for every endpoint,
- fee units should be documented explicitly,
- BC2 network identifiers, genesis hash, address prefixes, and units differ from Bitcoin,
- transaction broadcast behavior was not tested,
- WebSocket schemas were only minimally checked,
- Electrum connectivity does not prove wallet compatibility.

## Supported claims

This record supports that, at check time:

- `bc2mempool.com` and `bc2.live` were reachable,
- public GET endpoints worked for chain tip, blocks, transactions, address summaries, mempool, fees, mining analytics, price, and rich-list data,
- the REST tip matched a local BitcoinII Core node,
- the WebSocket handshake succeeded and returned initial explorer state,
- the `infra1.bitcoin-ii.org` Electrum TCP and SSL services accepted standard read-only calls,
- the SSL certificate validated for the advertised hostname.

## Claims not established

This record does not establish:

- permanent reliability or permanent sync,
- full mempool.space drop-in compatibility,
- compatibility with BlueWallet, Cake Wallet, Komodo, or other wallets,
- transaction-broadcast correctness,
- UTXO endpoint compatibility,
- behavior under load or repeated reconnects,
- common backend ownership for `bc2.live` and `bc2mempool.com`,
- official governance or maintainer status.

## Documentation cautions

- Describe successful endpoints as observed and dated.
- Do not paste full rich-list responses into normal documentation.
- Do not recommend public explorer APIs as the sole source of truth for custody or exchange workflows.
- Keep transaction broadcast, wallet compatibility, long-term service reliability, and complete API compatibility marked unverified.

## Verification

**Status:** Partial / Directly tested  
**Primary evidence:** Codex read-only public-service smoke-test report, local BitcoinII Core RPC comparison, public REST responses, WebSocket handshake, and Electrum read-only responses from 2026-07-12  
**Notes:** This was a narrow availability and compatibility smoke test, not a security audit, load test, wallet test, or broadcast test.