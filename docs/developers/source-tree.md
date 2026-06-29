# BitcoinII source tree guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page explains the BitcoinII Core source tree at a high level.

The guide should be expanded only as directories and files are directly reviewed.

## Reviewed or partially reviewed areas

### `src/kernel/`

Currently reviewed file:

- `src/kernel/chainparams.cpp`

Known use from review:

- Mainnet chain parameters.
- Genesis block construction/checks.
- DNS seed list.
- Address prefixes.
- Consensus deployment heights and parameters visible in chain parameters.

### `src/`

Currently reviewed file:

- `src/pow.cpp`

Known use from review:

- Difficulty retargeting.
- Proof-of-work target checks.
- Permitted difficulty transition checks.

### `src/primitives/`

Currently reviewed files:

- `src/primitives/block.h`
- `src/primitives/block.cpp`

Known use from review:

- Block header fields.
- Block serialization shape.
- Block header hash call path.

### `src/consensus/`

Currently reviewed file:

- `src/consensus/amount.h`

Known use from review:

- `COIN` definition.
- `MAX_MONEY` sanity check.
- `MoneyRange()` helper.

### `share/examples/`

Currently reviewed file:

- `share/examples/bitcoinII.conf`

Known use from review:

- Generated configuration reference.
- RPC options.
- RPC port defaults.
- Node operation options.

### `doc/`

Partially reviewed files:

- `doc/JSON-RPC-interface.md`
- `doc/man/bitcoinIId.1`
- `doc/man/bitcoinII-cli.1`
- `doc/man/bitcoinII-qt.1`

Known use from review:

- RPC documentation entry points.
- Generated manual pages for daemon, CLI, and GUI.

## Areas not yet reviewed

These areas should be mapped later:

- `src/validation.*`
- `src/net.*`
- `src/protocol.*`
- `src/rpc/`
- `src/wallet/`
- `src/qt/`
- `test/`
- `src/test/`
- `depends/`
- `contrib/`
- `cmake/`
- `.github/`

## Expansion standard

When adding a directory to this guide, include:

- Directory path.
- Files reviewed.
- What was verified.
- Related MoreBC2 pages.
- Open questions.
- Date reviewed.

## Sources

- BitcoinII repository: https://github.com/BitcoinII-Dev/BitcoinII

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This guide is intentionally conservative and only gives detailed notes for files already reviewed.
