# Reorganizations

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

A blockchain reorganization happens when a node switches from one valid chain tip to another valid chain tip with more accumulated work.

## What it means

If two competing blocks are found near the same time, different nodes may briefly disagree about the best chain tip.

When one branch gains more accumulated work, nodes following the shorter branch may switch to the longer-work branch. This is called a reorganization.

## Why it matters

Reorganizations can affect:

- Transaction confirmation status.
- Explorer views.
- Service-provider accounting.
- Mining pool accounting.
- Risk decisions for exchanges and payment processors.

## BitcoinII-specific notes

MoreBC2 has not yet documented BitcoinII-specific reorganization frequency or service-provider confirmation recommendations.

Current source-backed pages document block timing and difficulty behavior, but not operational reorganization policy.

## Related pages

- [Consensus overview](../documentation/consensus-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)
- [Known unknowns](../verification/known-unknowns.md)

## Open items

- Review BitcoinII validation and chain-selection code.
- Document relevant validation source files.
- Confirm recommended confirmation count for services.
- Add example explanation after source review.

## Verification

**Status:** Draft
**Primary sources checked:** No
**Notes:** General explanation only. BitcoinII-specific chain-selection behavior still needs source review.
