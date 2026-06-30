# BitcoinII source tree guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

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
- `src/validationinterface.cpp`
- `src/validationinterface.h`
- `src/txmempool.cpp`
- `src/txmempool.h`
- `src/hash.h`

Known use from review:

- Startup orchestration.
- Proof-of-work and difficulty retargeting.
- Block validation and best-chain activation.
- Block connection and disconnection.
- Validation and mempool event notifications.
- Mempool acceptance paths.
- Mempool storage and indexing.
- Hash helper paths.

Related pages:

- [Source atlas](source-atlas/README.md)
- [Node startup](../architecture/node-startup.md)
- [Consensus model](../architecture/consensus-model.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Mempool flow](../architecture/mempool-flow.md)
- [Source atlas: validation interface](source-atlas/validation-interface.md)

### `src/node/`

Currently reviewed or partially reviewed files:

- `src/node/blockstorage.h`
- `src/node/blockstorage.cpp`
- `src/node/miner.h`
- `src/node/miner.cpp`
- `src/node/mini_miner.h`
- `src/node/mini_miner.cpp`

Known use from review:

- Block index database access.
- Block and undo flat-file handling.
- Block-file cursor bookkeeping.
- Block and raw-block reads.
- Block and undo writes.
- Pruning bookkeeping.
- Reindex and import handling.
- Candidate block-template assembly.
- Mempool package selection for candidate blocks.
- Coinbase construction for candidate blocks.
- Fee and ordering simulation helpers.

Related pages:

- [Source atlas: block storage](source-atlas/block-storage.md)
- [Source atlas: block template assembly](source-atlas/miner.md)
- [Mining overview](../mining/mining-overview.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Node startup](../architecture/node-startup.md)

Still needed:

- Additional node context and chainstate helpers.
- Operator-facing pruning and reindex examples.

### `src/rpc/`

Currently reviewed or partially reviewed files:

- `src/rpc/mining.cpp`

Known use from review:

- Mining status RPCs.
- Candidate block template RPC path.
- Block and header submission RPC paths.
- Transaction prioritization RPC paths.
- Hidden local-generation helper RPCs.

Related pages:

- [Source atlas: mining RPC](source-atlas/rpc-mining.md)
- [Source atlas: block template assembly](source-atlas/miner.md)
- [Mining overview](../mining/mining-overview.md)
- [RPC overview](rpc-overview.md)

Still needed:

- Broader RPC command table.
- RPC wallet files.
- RPC examples tested against a local node.
- Service-safe RPC command recommendations.

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

Currently reviewed or partially reviewed files:

- `src/consensus/amount.h`
- `src/consensus/tx_check.*`
- `src/consensus/tx_verify.*`

Known use from review:

- `COIN` definition.
- `MAX_MONEY` sanity check.
- `MoneyRange()` helper.
- Context-independent transaction checks.
- Transaction finality helpers.
- Sequence-lock helpers.
- UTXO-input checks.
- Operation-cost accounting helpers.

Still needed:

- Caller graph into validation and mempool acceptance.
- Subsidy calculation review.
- Upstream comparison.

### `src/script/`

Currently reviewed or partially reviewed files:

- `src/script/interpreter.h`
- `src/script/interpreter.cpp`

Known use from review:

- Verification flags.
- Execution versions.
- Stack-machine evaluation.
- Signature-checking hooks.
- Locktime and sequence checker hooks.
- P2SH handling.
- Witness program handling.
- Taproot and Tapscript handling.
- Witness operation counting.

Still needed:

- Mandatory-vs-policy flag mapping.
- Caller graph from validation and mempool acceptance.
- Tests.
- Upstream comparison.

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
- other `src/rpc/` files
- `src/wallet/`
- `src/qt/`
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
