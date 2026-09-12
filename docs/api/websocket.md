# WebSocket API

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 has current WebSocket reachability evidence for all three tested Mempool-style BitcoinII services.

Primary evidence: [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

## Current observed endpoints

| Endpoint | Status at 2026-09-11 check |
|---|---|
| `wss://bc2mempool.com/api/v1/ws` | Connected; `init` returned explorer-state data. |
| `wss://explorer.bitcoin-ii.org/api/v1/ws` | Connected; `init` returned explorer-state data. |
| `wss://bc2.live/api/v1/ws` | Connected; `init` returned explorer-state data. |

The initialization message used was:

```json
{"action":"init"}
```

The returned state included mempool/explorer information. The test was intentionally bounded and did not attempt to catalog every event type or subscription mode.

## What the current evidence establishes

The September check supports saying that:

- all three WebSocket URLs accepted connections during the test window;
- the same minimal `init` action produced an explorer-state response on each service;
- the route family is actively implemented on all three tested hosts.

## What remains unverified

The current evidence does not establish:

- complete event schemas,
- long-running connection stability,
- reconnect/backoff behavior,
- all supported subscription actions,
- ordering or delivery guarantees,
- behavior under load,
- schema parity with upstream `mempool.space`,
- wallet/application compatibility,
- backend/operator independence among the three hosts.

## Redundancy caution

The three WebSocket services showed closely aligned behavior, just as their REST surfaces did.

That similarity does not prove a shared backend, but it also does not establish three independent providers. Do not treat the three hostnames as independent production redundancy without separate infrastructure evidence.

## Safe wording

Use:

- "WebSocket connection observed"
- "`init` explorer-state response observed"
- "schema coverage incomplete"
- "dated service observation"

Do not use:

- "production-ready WebSocket API"
- "complete mempool.space WebSocket compatibility"
- "independent redundant WebSocket providers"
- "all event types documented"

## Verification

**Status:** Draft / Observed partial  
**Primary source checked:** [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)  
**Notes:** September testing expands the older single-host July evidence to all three current Mempool-style services. Full schema, subscription, reconnect, load, and independence behavior remain unverified.