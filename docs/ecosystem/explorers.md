# Explorers

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-10

## Summary

This page tracks BitcoinII (BC2) block explorers.

Explorer links should be checked directly before they are listed as active.

Use [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md) before adding or promoting explorer listings.

## Listing format

```md
### Explorer name

**Status:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical / Do not recommend
**Official:** Yes / No / Unknown
**URL:**
**Supports:** Blocks / Transactions / Addresses / API / Mempool / Other
**Last checked:** YYYY-MM-DD
**Evidence level:** E4/E8
**What was checked:**
**What was not checked:**
**Notes:**
```

## Current checked explorers

### BitcoinII Explorer

**Status:** Active, dated check / Same-time local comparison passed  
**Official:** Claimed by page text, not independently verified  
**URL:** `https://bitcoinii.ddns.net/explorer/`  
**Supports:** Blocks / transactions / addresses / public GET API / mempool summary  
**Last checked:** 2026-07-10  
**Evidence level:** E6 dated direct public API check plus same-time local-node height/hash comparison; not permanent reliability evidence

**What was checked:**

- HTTPS explorer pages loaded during the earlier direct check.
- Page title and visible UI identified the site as `BitcoinII Explorer`.
- Visible page text said `Official Explorer for the BitcoinII network`; this claim was observed but not independently verified.
- Public block, transaction, address, tip, and mempool views/endpoints were observed.
- On 2026-07-10, the explorer tip endpoint returned height `57420` and hash `0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596`.
- A local BitcoinII Core v29.1.0 mainnet node returned the same height and best-block hash approximately eight seconds earlier.

**Same-time comparison:**

| Source | Timestamp | Height | Tip hash |
|---|---|---:|---|
| Local BitcoinII node RPC | `2026-07-10T20:46:08.8662219-04:00` | `57420` | `0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596` |
| Explorer tip API | `2026-07-10T20:46:16.9332436-04:00` | `57420` | `0000000000000000130acb08cd609dc86dc72e2312a3112028617da3895bd596` |

**What was not checked:**

- No POST search submission.
- No transaction submission.
- No account-only features.
- No independent verification that the explorer is official.
- No long-term uptime, rate-limit, latency, or reliability testing.
- No claim that the explorer will remain synced after the dated comparison.

**Notes:**

The same-time comparison supports that the explorer and local node agreed at that moment. It does not establish permanent synchronization or suitability as the only source of truth for an exchange or custody service.

The working explorer URL is `https://bitcoinii.ddns.net/explorer/`. The explorer page canonical/open-graph metadata referenced `https://bitcoiniiexplorer.org`, but that domain did not resolve during the 2026-07-06 check.

See [Local BitcoinII node inspection — 2026-07-10](../verification/local-node-inspection-2026-07-10.md).

## Broken, unresolved, or unrelated candidates

| Candidate URL | Date checked | Result | Status |
|---|---|---|---|
| `https://bitcoiniiexplorer.org` | 2026-07-06 | DNS resolution failed. Referenced by explorer metadata. | Broken / Needs Review |
| `https://explorer.bitcoin-ii.org` | 2026-07-06 | SSL/TLS trust failure. | Broken / Needs Review |
| `http://explorer.bitcoin-ii.org` | 2026-07-06 | Failed through same TLS trust problem. | Broken / Needs Review |
| `https://chainz.cryptoid.info/bc2/` | 2026-07-06 | Redirected/loaded Chainz main index, not a BC2 explorer page. | Unrelated / Redirected |
| `https://chainz.cryptoid.info/bc2/api.dws?q=getblockcount` | 2026-07-06 | `404 Not Found`. | Unrelated / Broken |
| `https://explorer.bitcoin-ii.com` | 2026-07-06 | DNS failed. | Broken |
| `https://explorer.bitcoinii.org` | 2026-07-06 | Connection failed. | Broken |
| `https://blockexplorer.bitcoin-ii.org` | 2026-07-06 | DNS failed. | Broken |

## Current status

MoreBC2 has one BitcoinII/BC2 explorer with a successful dated direct check and same-time local-node height/hash comparison.

It can be described as reachable and matching a local node at the recorded time. It should not be described as permanently synced, officially maintained, highly available, or sufficient as an exchange's only source of truth.

## What to check

For each explorer, verify:

- Site loads.
- Current height is visible, if provided.
- Recent blocks are visible, if provided.
- Block lookup works.
- Transaction lookup works, if supported.
- Address lookup works, if supported.
- Public API exists, if claimed.
- Any sync-status claim is compared against another reliable source or local node output.
- Last checked date is recorded.

## Open items

- Confirm whether `https://bitcoinii.ddns.net/explorer/` is officially maintained.
- Recheck `https://bitcoiniiexplorer.org` because it appears in metadata but did not resolve.
- Repeat same-time comparisons periodically before publishing current-status claims.
- Document exact API response fields only after another stability check.
- Do not recommend the explorer as a sole exchange/service source of truth.

## Related pages

- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Explorer resources](../documentation/explorer-resources.md)
- [APIs](apis.md)
- [Local BitcoinII node inspection — 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Verification queue](../verification/README.md)

## Verification

**Status:** Draft  
**Primary sources checked:** Direct explorer/API observations, successful local BitcoinII RPC calls, and a same-time local/explorer tip comparison from 2026-07-10  
**Notes:** The explorer matched a local node at height `57420` during a dated check. Official status, permanent sync, long-term reliability, and service-provider suitability remain unverified.
