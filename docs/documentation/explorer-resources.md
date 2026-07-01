# Explorer resources

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

Block explorers help users inspect BitcoinII (BC2) blocks, transactions, addresses, and network status.

This page is a framework until active explorers are verified directly.

For API-specific inventory and endpoint testing, see [Ecosystem APIs](../ecosystem/apis.md).

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

If an explorer exposes a public API, add the API to [Ecosystem APIs](../ecosystem/apis.md) and record endpoint checks there.

At minimum, check whether the API can provide:

- Latest height.
- Block lookup by height or hash.
- Transaction lookup by txid.
- Address lookup, if supported.
- Mempool lookup, if supported.
- Sync or health status, if supported.

## Open items

- Verify current active BitcoinII explorers.
- Check whether explorers expose public APIs.
- Check explorer uptime and sync status.
- Add example block lookup.
- Add example transaction lookup.
- Add example address lookup.
- Add API endpoint test records for any explorer APIs.

## Related pages

- [Ecosystem explorers](../ecosystem/explorers.md)
- [Ecosystem APIs](../ecosystem/apis.md)
- [Exchange integration](../exchange/README.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [RPC overview](../developers/rpc-overview.md)
- [Open questions backlog](../verification/open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** No
**Notes:** No explorer has been added yet because active explorer links need direct verification. API endpoint checks should be recorded separately in the ecosystem API framework.
