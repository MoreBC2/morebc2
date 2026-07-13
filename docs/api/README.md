# BitcoinII API documentation

**Category:** Developer platform
**Status:** Draft / Evidence-linked summary
**Last reviewed:** 2026-07-12

## Summary

This section collects BitcoinII / BC2 developer-platform notes for public APIs and read-only examples.

The pages here summarize dated MoreBC2 verification records. They are not independent service guarantees, not complete API specifications, and not a replacement for running a BitcoinII Core node for critical infrastructure.

Primary evidence records:

- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [Verification evidence index](../verification/verification-index.md)

Release-asset and authentication-gap observations are tracked outside this API section in [Release asset inventory attempt](../verification/release-asset-inventory-attempt.md) and the [Verification evidence index](../verification/verification-index.md).

## Current API areas

- [REST API](rest.md) - observed public GET endpoints and known limitations.
- [WebSocket](websocket.md) - observed connection behavior and event-shape limits.
- [Electrum](electrum.md) - observed read-only Electrum methods and wallet-compatibility cautions.
- [Public endpoints](public-endpoints.md) - service-oriented endpoint list with evidence links.
- [Read-only examples](read-only-examples.md) - locally tested RPC examples and safe-publication notes.
- [mempool.space compatibility](mempool-space-compatibility.md) - what looked similar, what differed, and what remains untested.

## Evidence language

Use narrow labels:

- **Locally Tested** - exercised against a documented local BitcoinII Core node.
- **Observed** - seen from a public page, endpoint, or service during a dated check.
- **Same-time comparison** - compared against another source during the recorded check window.
- **Not yet verified** - not tested or not enough evidence to document as supported.
- **Known limitation** - a specific gap or failed endpoint recorded in evidence.
- **Roadmap** - maintainer or project direction, not current evidence.

## Current boundaries

Observed public API availability does not prove reliability.

A same-time chain-tip match does not prove permanent synchronization.

Electrum read-only method success does not prove wallet compatibility.

REST endpoint similarity does not prove full `mempool.space` drop-in compatibility.

No transaction broadcast endpoint is documented here as tested.

## Verification

**Status:** Draft / Evidence-linked summary  
**Primary sources checked:** Existing MoreBC2 verification records linked above  
**Notes:** This index summarizes committed evidence records. It does not add new verification.
