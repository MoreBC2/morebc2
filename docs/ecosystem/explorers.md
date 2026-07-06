# Explorers

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-06

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

**Status:** Partially checked / Needs comparison  
**Official:** Claimed by page text, not independently verified  
**URL:** `https://bitcoinii.ddns.net/explorer/`  
**Supports:** Blocks / transactions / addresses / public GET API / mempool summary  
**Last checked:** 2026-07-06  
**Evidence level:** E4 direct public-page/API observation; not E8 synced/reliable service evidence

**What was checked:**

- HTTPS page loaded.
- Page title and visible UI identified the site as `BitcoinII Explorer`.
- Visible page text said `Official Explorer for the BitcoinII network`; this claim was observed but not independently verified.
- Visible height was `57,398` during the check.
- Tip hash from API was `0000000000000000230effe4c66d34cc5a97064e0860f462df9920ac4ba96f83`.
- Recent block list was visible for heights `57,398` through `57,389`.
- A public transaction page loaded.
- A public address page loaded.
- Harmless GET API endpoints returned JSON for tip, block, transaction, address, and mempool summary.

**What was not checked:**

- No POST search submission.
- No transaction submission.
- No account-only features.
- No local node comparison.
- No independent verification that the explorer is official.
- No claim that the explorer is synced.

**Notes:**

The working explorer URL was `https://bitcoinii.ddns.net/explorer/`. The explorer page canonical/open-graph metadata referenced `https://bitcoiniiexplorer.org`, but that domain did not resolve during the 2026-07-06 check.

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

MoreBC2 has one partially checked general BitcoinII/BC2 explorer candidate. It should not be called synced until compared against a local node or another reliable source.

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

Do not claim an explorer is synced unless there is a comparison source.

## Open items

- Compare explorer height and tip against a local BitcoinII node or another reliable source before calling it synced.
- Confirm whether `https://bitcoinii.ddns.net/explorer/` is officially maintained.
- Recheck `https://bitcoiniiexplorer.org` because it appears in metadata but did not resolve.
- Add API notes if endpoint shapes remain stable after another dated check.
- Add examples for block, transaction, and address lookups only after harmless public examples are chosen and documented.

## Related pages

- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Explorer resources](../documentation/explorer-resources.md)
- [APIs](apis.md)
- [Verification queue](../verification/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** Ecosystem direct check plan, existing explorer framework, and Codex explorer/API recon report from 2026-07-06
**Notes:** One explorer is listed as partially checked from direct public-page/API observation. MoreBC2 has not verified that it is synced, official, reliable, or suitable as a service-provider source of truth.
