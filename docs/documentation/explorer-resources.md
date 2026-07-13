# Explorer resources

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-13

## Summary

Block explorers help users inspect BitcoinII (BC2) blocks, transactions, addresses, and network status.

This page is an overview. Dated explorer and public API observations now exist, including same-time local-node comparisons, but they do not establish permanent sync, reliability, official operation, or service-provider suitability.

For current service status, see [Infrastructure](../infrastructure/README.md). For API-specific summaries, see [API documentation](../api/README.md). For compatibility limits, see [Compatibility](../compatibility/README.md). For canonical evidence, see the [verification evidence index](../verification/verification-index.md).

## What explorers are useful for

Explorers can help verify:

- Current block height.
- Block hashes.
- Transaction IDs.
- Address activity.
- Confirmation counts.
- Mempool state, if supported.
- Network difficulty, if supported.
- Public API availability, if supported.

## Explorer data caution

Explorer data is useful, but it should not override source code for consensus rules.

Use explorer data for live observations. Use source code for implementation details.

For exchanges and services, a public explorer should not replace a service's own BitcoinII Core node for critical deposit, withdrawal, or custody workflows.

A page that is reachable is not necessarily reliable. A same-time local-node/API match is a dated point-in-time result, not proof of permanent sync. A public official-status claim should stay separate from independent confirmation of ownership or operation.

## Explorer listing format

Each explorer should be listed like this:

```md
### Explorer name

**Status:** Active / Needs Review / Offline / Historical
**URL:** 
**Official:** Yes / No / Unknown
**Last checked:** YYYY-MM-DD
**Supports:** Blocks / transactions / addresses / API / mempool
**API documentation:** URL or Unknown
**Evidence level:** E1-E8
**Notes:** 
```

## API check format

If an explorer exposes a public API, summarize current API behavior in [API documentation](../api/README.md), summarize service status in [Infrastructure](../infrastructure/README.md), and keep dated evidence in Verification records.

At minimum, check whether the API can provide:

- Latest height.
- Block lookup by height or hash.
- Transaction lookup by txid.
- Address lookup, if supported.
- Mempool lookup, if supported.
- Sync or health status, if supported.

## Current evidence and open items

Observed evidence now includes dated explorer/API checks and same-time node/API comparisons. Remaining open items include:

- Recheck current explorers on a deliberate schedule before publication.
- Confirm official ownership/operator status where relevant.
- Check explorer uptime and long-term sync behavior.
- Keep example block, transaction, and address lookups linked to dated records.
- Avoid recommending any public explorer as a sole source of truth for service-provider workflows.

## Related pages

- [Ecosystem explorers](../ecosystem/explorers.md)
- [Ecosystem APIs](../ecosystem/apis.md)
- [API documentation](../api/README.md)
- [Infrastructure directory](../infrastructure/README.md)
- [Compatibility](../compatibility/README.md)
- [Verification evidence index](../verification/verification-index.md)
- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [Exchange integration](../exchange/README.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [RPC overview](../developers/rpc-overview.md)
- [Open questions backlog](../verification/open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Verification evidence index, local node inspection, public API/Electrum smoke test, Infrastructure section, API section, and ecosystem explorer/API pages
**Notes:** Dated explorer and API observations exist, but this page does not verify permanent sync, reliability, official status, wallet compatibility, broadcast behavior, or service-provider suitability.
