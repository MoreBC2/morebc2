# Explorer resources

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

Block explorers help users inspect BitcoinII (BC2) blocks, transactions, addresses, and network status.

This page is a framework until active explorers are verified directly.

## What explorers are useful for

Explorers can help verify:

- Current block height.
- Block hashes.
- Transaction IDs.
- Address activity.
- Confirmation counts.
- Mempool state, if supported.
- Network difficulty, if supported.

## Explorer data caution

Explorer data is useful, but it should not override source code for consensus rules.

Use explorer data for live observations. Use source code for implementation details.

## Explorer listing format

Each explorer should be listed like this:

```md
### Explorer name

**Status:** Active / Needs Review / Offline / Historical
**URL:** 
**Last checked:** YYYY-MM-DD
**Supports:** Blocks / transactions / addresses / API / mempool
**Notes:** 
```

## Open items

- Verify current active BitcoinII explorers.
- Check whether explorers expose public APIs.
- Check explorer uptime and sync status.
- Add example block lookup.
- Add example transaction lookup.
- Add example address lookup.

## Verification

**Status:** Draft
**Primary sources checked:** No
**Notes:** No explorer has been added yet because active explorer links need direct verification.
