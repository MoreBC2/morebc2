# Confirmations

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

A transaction has confirmations when it is included in a block and additional blocks are built after that block.

## What it means

A transaction included in the latest block has one confirmation.

Each new block added after that increases the confirmation count by one.

## Why it matters

Confirmations are used by wallets, exchanges, and services to estimate how deeply a transaction is buried in the active chain.

More confirmations generally mean a transaction is harder to reverse through a chain reorganization, but the exact policy depends on the service and network conditions.

## BitcoinII-specific notes

MoreBC2 has not yet verified a recommended BitcoinII confirmation count for exchanges or service providers.

Current source-backed pages document BitcoinII target block spacing as 10 minutes, but confirmation policy is an operational recommendation that still needs review.

## Related pages

- [Network specifications](../documentation/network-specifications.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)
- [Known unknowns](../verification/known-unknowns.md)

## Open items

- Confirm recommended confirmation counts for exchanges and services.
- Document whether different use cases need different confirmation policies.
- Review current explorer behavior for confirmation display.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** General explanation only. BitcoinII-specific confirmation recommendations remain unverified.
