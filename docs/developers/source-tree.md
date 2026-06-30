# BitcoinII source tree guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page explains the BitcoinII Core source tree at a high level.

The guide should be expanded only as directories and files are directly reviewed.

## Reviewed or partially reviewed areas

### `src/`

Currently reviewed or partially reviewed files:

- `src/init.cpp`
- `src/pow.cpp`
- `src/validation.cpp`
- `src/validation.h`
- `src/txmempool.cpp`
- `src/txmempool.h`
- `src/hash.h`

Known use from review:

- Startup orchestration.
- Proof-of-work and difficulty retargeting.
- Block validation and best-chain activation.
- Block connection and disconnection.
- Mempool acceptance paths.
- Mempool storage and indexing.
- Hash helper paths.

Related pages:

- [Source atlas](source-atlas/README.md)
- [Node startup](../architecture/node-startup.md)
- [Consensus model](../architecture/consensus-model.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Mempool flow](../architecture/mempool-flow.md)

### `src/kernel/`

Currently reviewed files:

- `src/kernel/chainparams.cpp`
- `src/kernel/mempool_entry.h`
- `src/kernel/disconnected_transactions.*`

Known use from review:

- Mainnet chain parameters.
- Genesis block construction/checks.
- DNS seed list.
- Address prefixes.
- Consensus deployment heights and parameters visible in chain parameters.
- Mempool entry metadata.
- Disconnected transaction handling during reorg processing.

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

Still needed:

- `src/consensus/tx_check.*`
- `src/consensus/tx_verify.*`
- Related script validation paths.

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

- `src/net.*`
- `src/net_processing.*`
- `src/protocol.*`
- `src/rpc/`
- `src/wallet/`
- `src/qt/`
- `src/node/miner.*`
- `src/validationinterface.*`
- `test/`
- `src/test/`
- `src/wallet/test/`
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

- BitcoinII source repository currently reviewed through MoreBC2 source-atlas entries.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This guide is intentionally conservative and only gives detailed notes for files already reviewed.
