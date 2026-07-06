# APIs

**Category:** Ecosystem
**Status:** Draft
**Last reviewed:** 2026-07-06

## Summary

This page tracks BitcoinII (BC2) public API resources such as explorer APIs, service APIs, and community-hosted data endpoints.

No API should be listed as active, synced, reliable, or recommended until it has been directly checked and dated with clear limits.

Use [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md) before adding or promoting API listings.

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
**Status:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical / Do not recommend
**Official:** Yes / No / Unknown
**Base URL:**
**Documentation URL:**
**Maintainer:** Unknown unless public
**Last checked:** YYYY-MM-DD
**Evidence level:** E1-E8
**Supports:** Blocks / transactions / addresses / mempool / stats / other
**Authentication:** None / API key / Unknown
**Rate limits:** Unknown unless documented
**What was checked:**
**What was not checked:**
**Notes:**
```

## Observed public APIs

### BitcoinII Explorer API

**Category:** Explorer  
**Status:** Partially checked / Needs comparison  
**Official:** Page claims official explorer; not independently verified  
**Base URL:** `https://bitcoinii.ddns.net/explorer/api/`  
**Documentation URL:** Not found  
**Maintainer:** Unknown  
**Last checked:** 2026-07-06  
**Evidence level:** E4 direct harmless GET checks; not E8 synced/reliable service evidence  
**Supports:** Tip, block lookup, transaction lookup, address lookup, mempool summary  
**Authentication:** None observed for checked GET endpoints  
**Rate limits:** Unknown

**Endpoints observed:**

| Endpoint shape | Method | Result summary | Status |
|---|---|---|---|
| `/explorer/api/blocks/tip` | GET | Returned JSON; tip hash observed as `0000000000000000230effe4c66d34cc5a97064e0860f462df9920ac4ba96f83`. | Partial |
| `/explorer/api/block/<hash>` | GET | Returned JSON for a public block hash. | Partial |
| `/explorer/api/tx/<txid>` | GET | Returned JSON for a public transaction ID. | Partial |
| `/explorer/api/address/<address>` | GET | Returned JSON for a public address. | Partial |
| `/explorer/api/mempool/summary` | GET | Returned JSON. | Partial |

**API docs checked:**

| URL path | Result |
|---|---|
| `/explorer/api-docs` | 404 |
| `/explorer/api-doc` | 404 |
| `/explorer/docs` | 404 |
| `/explorer/rest` | 404 |

**What was not checked:**

- Endpoint response schemas were not stabilized into public documentation.
- No local node comparison was performed.
- No sync claim was made.
- No POST/search submission was performed.
- No authentication, rate-limit, or long-term availability claim was checked.

**Notes:**

These public API observations are useful for future explorer documentation, but they should not be used as a sole exchange/service source of truth.

### MiningPoolStats BitcoinII data endpoints

**Category:** Mining/network statistics  
**Status:** Observed / Related / Needs comparison  
**Official:** No  
**Base URL:** `https://data.miningpoolstats.stream/data/`  
**Documentation URL:** Not found  
**Maintainer:** MiningPoolStats  
**Last checked:** 2026-07-06  
**Evidence level:** E4 public page/data endpoint observation; not E8 synced/reliable service evidence  
**Supports:** Mining/network stats and price/history data endpoints  
**Authentication:** None observed for checked public JS endpoints  
**Rate limits:** Unknown

**Observed related page:** `https://miningpoolstats.stream/bitcoinii`

**Endpoints observed:**

- `https://data.miningpoolstats.stream/data/bitcoinii.js?...`
- `https://data.miningpoolstats.stream/data/price/bitcoinii.js?...`
- `https://data.miningpoolstats.stream/data/history/bitcoinii.js?...`

**Observed data:**

- Page title identified `Bitcoin II (BC2) SHA-256 | Mining Pools`.
- Visible/data endpoint height was `57,398` during the check.
- Page linked to `https://bitcoinii.ddns.net/explorer`.

**What was not checked:**

- No pool payout correctness.
- No pool sync status.
- No mining account or payout behavior.
- No endpoint stability or formal API documentation.
- No claim that height is reliable enough to call any explorer synced.

## Broken or unresolved API candidates

| Candidate URL | Date checked | Result | Status |
|---|---|---|---|
| `https://bitcoinii.ddns.net/api` | 2026-07-06 | `502 Bad Gateway` | Broken / Needs Review |
| `https://bitcoinii.ddns.net/explorer/api` | 2026-07-06 | `404 Not Found` | Needs Review |
| `https://chainz.cryptoid.info/bc2/api.dws?q=getblockcount` | 2026-07-06 | `404 Not Found` | Unrelated / Broken |

## Endpoint test format

For each checked endpoint, record:

```md
#### Endpoint: `GET /example`

**Date checked:** YYYY-MM-DD
**Checked by:**
**Base URL:**
**Request method:** GET / POST / other
**Request:**
**Response status:**
**Expected result:**
**Actual result summary:**
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

- Any listed API is synced.
- Any listed API is official without a separate official source.
- Any API is reliable enough for exchange use.
- Any endpoint can replace running a local node.
- MiningPoolStats is a general block explorer.
- Public API endpoint availability proves long-term service reliability.

## Planned checks

- Recheck the BitcoinII Explorer API and record exact response fields before writing endpoint examples.
- Compare explorer/API height and tip against a local BitcoinII node or another reliable source before any sync claim.
- Locate formal API documentation if it exists.
- Check whether response fields are stable enough to document.
- Add direct check dates and evidence levels to any future examples.

## Related pages

- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Explorers](explorers.md)
- [Explorer resources](../documentation/explorer-resources.md)
- [Exchange integration](../exchange/README.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [RPC overview](../developers/rpc-overview.md)
- [Command testing status](../verification/command-testing.md)
- [Open questions backlog](../verification/open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Ecosystem direct check plan, existing API framework, and Codex explorer/API recon report from 2026-07-06
**Notes:** This page records first public API observations. It does not verify sync status, official status, long-term reliability, or exchange suitability.
