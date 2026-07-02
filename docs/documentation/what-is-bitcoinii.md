# What is BitcoinII?

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-07-01

## Summary

BitcoinII (BC2) is a peer-to-peer cryptocurrency network. BitcoinII Core is the reference software used to connect to the BitcoinII peer-to-peer network, download and validate blocks and transactions, and optionally provide wallet and graphical user interface functionality.

This page is intentionally factual and narrow. It does not make price claims, investment claims, or roadmap claims.

## What BitcoinII Core does

The public BitcoinII repository README describes BitcoinII Core as software that:

- Connects to the BitcoinII peer-to-peer network.
- Downloads blocks and transactions.
- Fully validates blocks and transactions.
- Includes wallet functionality.
- Can optionally build a graphical user interface.

## Relationship to Bitcoin Core

The BitcoinII source headers state that the project was forked from Bitcoin Core version `0.27.0`.

The repository README describes BitcoinII as a “Sister Chain” that currently follows Bitcoin development and upgrade paths unless Bitcoin development ceases.

## Source-backed notes currently under review

The current MoreBC2 technical drafts have source-backed notes for:

- 10-minute target block spacing.
- 14-day target retarget timespan.
- 2016-block difficulty adjustment interval.
- 210,000-block subsidy halving interval.
- Double-SHA256 block header hashing path.
- Mainnet P2P port `8338`.
- Mainnet RPC port `8332` from the generated example config.
- Genesis block hash and merkle root.
- Address prefix values.

## What this page does not claim

This page does not claim:

- That BitcoinII uses Dark Gravity Wave.
- That a particular exchange confirmation count is recommended.
- That a specific future feature is planned or guaranteed.
- That market price or future value can be predicted.

## Where to go next

- [Network specifications](network-specifications.md)
- [Consensus overview](consensus-overview.md)
- [Releases](releases.md)
- [Exchange integration package](../exchange/integration-package.md)
- [Verification queue](../verification/README.md)

## Open items

- Confirm the strongest official source for ticker `BC2`.
- Confirm the canonical long-term GitHub organization or repository path.
- Confirm official community links and maintainer contact process.
- Confirm release verification model.

## Sources

- Current observed README: `Bitcoin-II/BitcoinII-Core` `README.md`
- Current observed chain parameters source: `Bitcoin-II/BitcoinII-Core` `src/kernel/chainparams.cpp`
- Current observed difficulty source: `Bitcoin-II/BitcoinII-Core` `src/pow.cpp`
- Current observed block primitive source: `Bitcoin-II/BitcoinII-Core` `src/primitives/block.cpp`
- Current observed hash source: `Bitcoin-II/BitcoinII-Core` `src/hash.h`
- Current observed example config: `Bitcoin-II/BitcoinII-Core` `share/examples/bitcoinII.conf`

## Verification

**Status:** Needs Review
**Primary sources checked:** Partially
**Notes:** This page should be reviewed after the source registry confirms canonical links and official public contact channels.
