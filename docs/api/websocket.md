# WebSocket API

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-07-12

## Summary

MoreBC2 has one dated WebSocket smoke test for:

```text
wss://bc2mempool.com/api/v1/ws
```

The canonical evidence is [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md).

## Observed behavior

During the 2026-07-12 smoke test:

- the WebSocket handshake succeeded,
- a minimal initialization message `{"action":"init"}` was sent,
- the server returned an initial explorer-state text event,
- the event began with fields including `mempoolInfo` and `blocks`,
- the connection was closed cleanly after enough evidence was collected.

## Known limitations

This is a narrow availability check only.

The smoke test did not establish:

- complete event schemas,
- long-lived subscription behavior,
- reconnect behavior,
- behavior under load,
- all supported subscription messages,
- wallet or application compatibility,
- whether the same event shapes will remain stable.

The first received frame was large, and full-message JSON validity and all event schemas were not established from the single smoke test.

## Compatibility status

| Capability | Status | Evidence |
|---|---|---|
| WebSocket endpoint reachable | Observed | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |
| Initial explorer-state event | Observed | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |
| Full documented schema | Not yet verified | Smoke test was intentionally narrow |
| Reconnect behavior | Not yet verified | Not tested |
| Broadcast or state-changing behavior | Not tested | Out of scope |

## Safe wording

Use:

- "WebSocket handshake observed"
- "initial explorer-state event observed"
- "schema coverage incomplete"

Do not use:

- "production-ready WebSocket API"
- "complete WebSocket compatibility"
- "all event types documented"
- "wallet compatible"

## Verification

**Status:** Draft / Observed partial  
**Primary sources checked:** [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)  
**Notes:** This page summarizes the committed smoke-test record and does not add new checks.
