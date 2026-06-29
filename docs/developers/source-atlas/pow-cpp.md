# `src/pow.cpp`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-29

## Purpose

`pow.cpp` contains proof-of-work difficulty logic.

For MoreBC2, this file is the current source-backed reference for BitcoinII difficulty retarget behavior.

## Why it matters

This file helps verify:

- When difficulty changes.
- How the next work requirement is calculated.
- Whether retargeting is disabled.
- Whether minimum-difficulty blocks are allowed.
- How difficulty transition limits are enforced.
- How proof-of-work target checks are performed.

## Behavior already documented from this file

MoreBC2 currently cites this file for:

- Difficulty changes only at the configured adjustment interval.
- Mainnet non-adjustment blocks return the previous block's `nBits`.
- Retargeting uses actual timespan over the adjustment window.
- Retargeting is bounded between one quarter and four times the target timespan.
- Mainnet has `fPowAllowMinDifficultyBlocks = false`.
- Mainnet has `fPowNoRetargeting = false`.

## Important clarification

This file review does **not** support a claim that BitcoinII uses Dark Gravity Wave.

Current source-backed wording is Bitcoin-style 2016-block retargeting.

## Related MoreBC2 pages

- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Mining overview](../../mining/mining-overview.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)

## Open questions

- Confirm whether any release branch differs from `main` for difficulty behavior.
- Confirm maintainer-preferred wording: `Bitcoin-style retargeting`, `2016-block retargeting`, or another phrase.
- Confirm whether any BitcoinII-specific tests cover this behavior.

## Sources

- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes
**Notes:** Behavior has been checked from source, but this page should be reviewed against the current release branch before being marked Verified.
