# APIs

**Category:** Ecosystem
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page tracks BitcoinII (BC2) public API resources such as explorer APIs, service APIs, and community-hosted data endpoints.

No API should be listed as active or recommended until it has been directly checked and dated.

This page is a framework. It does not list any verified active APIs yet.

## API categories

Potential API categories include:

- Explorer API
- Block lookup API
- Transaction lookup API
- Address lookup API
- Mempool API
- Network statistics API
- Mining pool API
- Exchange market-data API
- Community utility API

## Listing format

```md
### API name

**Category:** Explorer / Pool / Exchange / Community / Other
**Status:** Active / Needs Review / Offline / Historical
**Official:** Yes / No / Unknown
**Base URL:**
**Documentation URL:**
**Maintainer:** Unknown unless public
**Last checked:** YYYY-MM-DD
**Evidence level:** E1-E8
**Supports:** Blocks / transactions / addresses / mempool / stats / other
**Authentication:** None / API key / Unknown
**Rate limits:** Unknown unless documented
**Notes:**
```

## Endpoint test format

For each checked endpoint, record:

```md
#### Endpoint: `GET /example`

**Date checked:** YYYY-MM-DD
**Checked by:**
**Base URL:**
**Request:**
**Expected result:**
**Actual result:**
**Status:** Pass / Fail / Partial
**Notes:**
```

## Recommended endpoint categories to test

Before an explorer or API is useful to service integrators, MoreBC2 should check whether it supports:

- Latest block height.
- Latest block hash.
- Block lookup by height.
- Block lookup by hash.
- Transaction lookup by txid.
- Address lookup.
- Confirmation count display.
- Mempool transaction lookup, if supported.
- Fee or difficulty data, if supported.
- API health or sync status, if supported.

## Service-integration caution

Public explorer APIs are useful for observations, but they should not replace a service provider's own BitcoinII Core node for critical deposit, withdrawal, or custody workflows.

For exchanges and services, API docs should distinguish:

- Useful public observation endpoints.
- Endpoints appropriate for monitoring.
- Endpoints that are not safe as the only source of truth.
- Endpoints that require authentication or have rate limits.
- Endpoints whose data can lag behind the network.

## What not to claim yet

Do not claim yet that:

- Any listed API is active.
- Any API is official.
- Any API is reliable enough for exchange use.
- Any endpoint is synced to current chain height.
- Any API supports mempool data.
- Any API can replace running a local node.

## Planned checks

- Identify active BitcoinII explorers.
- Check whether each explorer has a public API.
- Record each API's documentation URL, if present.
- Test block, transaction, address, and height endpoints.
- Check whether response fields are stable enough to document.
- Add direct check dates and evidence levels.

## Related pages

- [Explorers](explorers.md)
- [Explorer resources](../documentation/explorer-resources.md)
- [Exchange integration](../exchange/README.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [RPC overview](../developers/rpc-overview.md)
- [Command testing status](../verification/command-testing.md)
- [Open questions backlog](../verification/open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** No current API checks completed
**Notes:** This page defines an API listing and endpoint-test framework. It does not verify any live BitcoinII API.
