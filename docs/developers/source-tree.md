# BitcoinII source tree guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

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
- `src/protocol.h`
- `src/protocol.cpp`
- `src/net.h`
- `src/net.cpp`
- `src/net_processing.h`
- `src/net_processing.cpp`

Known use from review:

- Startup orchestration.
- Proof-of-work and difficulty retargeting.
- Block validation and best-chain activation.
- Block connection and disconnection.
- Validation and mempool event notifications.
- Mempool acceptance paths.
- Mempool storage and indexing.
- Hash helper paths.
- Network message primitives.
- Lower-level connection management.
- Local address discovery and advertisement helpers.
- Socket send/receive handling.
- V1/V2 transport handling.
- DNS seed and seed-node connection paths.
- Peer handshake and early feature negotiation.
- Address sharing.
- Block and header sharing.
- Transaction sharing.
- Peer health and stale-tip checks.
- Peer send-loop behavior.

Related pages:

- [Source atlas](source-atlas/README.md)
- [Node startup](../architecture/node-startup.md)
- [Consensus model](../architecture/consensus-model.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Mempool flow](../architecture/mempool-flow.md)
- [Architecture overview](../architecture/architecture-overview.md)
- [Source atlas: validation interface](source-atlas/validation-interface.md)
- [Source atlas: protocol primitives](source-atlas/protocol.md)
- [Source atlas: net connection management](source-atlas/net-connection-management.md)
- [Source atlas: peer handshake](source-atlas/net-processing-handshake.md)
- [Source atlas: address sharing](source-atlas/net-processing-address-relay.md)
- [Source atlas: block and header sharing](source-atlas/net-processing-block-relay.md)
- [Source atlas: transaction sharing](source-atlas/net-processing-transaction-relay.md)
- [Source atlas: peer health and stale-tip checks](source-atlas/net-processing-peer-eviction.md)
- [Source atlas: send loop](source-atlas/net-processing-send-loop.md)

Still needed:

- Banman behavior.
- Addrman internals and fixed-seed behavior.
- Release-versus-main comparison.

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
- `src/rpc/blockchain.cpp`
- `src/rpc/net.cpp`
- `src/rpc/rawtransaction.cpp`
- `src/rpc/mempool.cpp`

Known use from review:

- Mining status RPCs.
- Candidate block template RPC path.
- Block and header submission RPC paths.
- Transaction prioritization RPC paths.
- Hidden local-generation helper RPCs.
- Blockchain status and chain-tip RPCs.
- Block/header lookup RPCs.
- Pruning and block-data RPCs.
- UTXO set and descriptor scan RPCs.
- Chainstate and deployment status RPCs.
- Network status and peer inspection RPCs.
- Address manager, ban-list, manual peer, and hidden network-test RPCs.
- Raw transaction lookup and decoding RPCs.
- Unsigned transaction construction RPCs.
- Explicit-key signing RPCs.
- PSBT creation, update, joining, finalization, and analysis RPCs.
- Raw transaction broadcast and dry-run acceptance RPCs.
- Mempool entry, ancestor, descendant, prevout-spend, and summary RPCs.
- Mempool save/import, orphan-inspection, and package-submission RPCs.

Related pages:

- [Source atlas: mining RPC](source-atlas/rpc-mining.md)
- [Source atlas: blockchain RPC](source-atlas/rpc-blockchain.md)
- [Source atlas: network RPC](source-atlas/rpc-network.md)
- [Source atlas: raw transaction RPC](source-atlas/rpc-rawtransaction.md)
- [Source atlas: mempool and transaction broadcast RPC](source-atlas/rpc-mempool.md)
- [Source atlas: block template assembly](source-atlas/miner.md)
- [Mining overview](../mining/mining-overview.md)
- [RPC overview](rpc-overview.md)

Still needed:

- Remaining RPC groups.
- Remaining RPC examples tested against a local node.
- Service-safe RPC command recommendations.

### `src/wallet/`

Currently reviewed or partially reviewed files:

- `src/wallet/init.cpp`
- `src/wallet/load.h`
- `src/wallet/load.cpp`
- `src/wallet/context.h`
- `src/wallet/context.cpp`
- startup-adjacent parts of `src/wallet/wallet.h`
- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`
- `src/wallet/rpc/backup.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/rpc/encrypt.cpp`
- `src/wallet/rpc/coins.cpp`
- `src/wallet/rpc/transactions.cpp`

Known use from review:

- Wallet option registration.
- Wallet parameter interactions.
- Runtime wallet-disable handling.
- Wallet loader construction during node startup.
- Wallet directory validation.
- Wallet database verification before loading.
- Wallet object creation and context registration.
- Wallet start, flush, stop, and unload helpers.
- Shared wallet context state.
- Startup-adjacent wallet defaults and declarations.
- Wallet RPC command registration.
- Wallet state, wallet directory, and loaded-wallet status RPCs.
- Wallet create, load, unload, migration, and flag RPCs.
- Address, change-address, label, grouping, and multisig RPCs.
- Wallet backup and restore RPCs.
- Legacy and descriptor import RPCs.
- Wallet export and rescan-adjacent recovery RPCs.
- Wallet send and fee-setting RPCs.
- Funding, fee bumping, signing, and PSBT RPCs.
- Wallet lock-state, timed unlock, credential update, and first-time encryption RPCs.
- Wallet received-amount, balance, output-state, and available-output RPCs.
- Wallet transaction listing, single-transaction lookup, polling, abandon, rescan, and abort-rescan RPCs.

Related pages:

- [Source atlas: wallet startup](source-atlas/wallet-startup.md)
- [Source atlas: wallet RPC](source-atlas/wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](source-atlas/wallet-backup-import-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet encryption RPC](source-atlas/wallet-encryption-rpc.md)
- [Source atlas: wallet coins and balances RPC](source-atlas/wallet-coins-rpc.md)
- [Source atlas: wallet transaction history RPC](source-atlas/wallet-transactions-rpc.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [RPC overview](rpc-overview.md)
- [Node startup](../architecture/node-startup.md)

Still needed:

- Wallet database internals.
- GUI wallet paths.

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

- banman-related files
- deeper addrman and fixed-seed behavior
- other `src/rpc/` files
- other `src/wallet/` files
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
**Notes:** This guide was refreshed after adding first-pass network Source Atlas slices through lower-level connection-management review. It remains conservative and only gives detailed notes for files already reviewed.
