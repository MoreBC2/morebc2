# `src/kernel/chainparams.cpp`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-29

## Purpose

`chainparams.cpp` defines chain-specific parameters for BitcoinII Core.

For MoreBC2, this is currently one of the most important source files because it contains many values needed by users, developers, miners, explorers, and exchanges.

## Why it matters

This file is used to verify:

- Mainnet chain type.
- Consensus parameter values.
- Genesis block values.
- DNS seeds.
- Address prefixes.
- Default P2P port.
- Deployment heights visible in chain parameters.

## Values already documented from this file

MoreBC2 currently cites this file for:

- Target block spacing.
- Target retarget timespan.
- Miner confirmation window.
- Subsidy halving interval.
- Mainnet P2P port.
- Message start bytes.
- Genesis hash.
- Genesis merkle root.
- DNS seeds.
- Base58 prefixes.
- Bech32 human-readable part.

## Related MoreBC2 pages

- [Network specifications](../../documentation/network-specifications.md)
- [Consensus overview](../../documentation/consensus-overview.md)
- [What is BitcoinII?](../../documentation/what-is-bitcoinii.md)
- [Exchange integration package](../../exchange/integration-package.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)

## Open questions

- Confirm whether this file in the referenced repository path is the canonical source for current public releases.
- Confirm whether any release branch differs from `main` for documented values.
- Confirm maintainer-preferred public wording for consensus parameters.

## Sources

- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes
**Notes:** Important values have been checked from source, but this page should be reviewed against the current release branch before being marked Verified.
