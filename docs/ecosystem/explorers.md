# Explorers

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-04

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

## Current status

MoreBC2 has not yet verified active BitcoinII explorers.

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

- Verify current explorer list.
- Add active dated-check entries only after direct checks.
- Add API notes if available.
- Add examples for block, transaction, and address lookups only after harmless public examples are chosen.

## Related pages

- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Explorer resources](../documentation/explorer-resources.md)
- [APIs](apis.md)
- [Verification queue](../verification/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** Ecosystem direct check plan and existing explorer framework
**Notes:** No explorer is listed as active yet because direct checks have not been completed.
