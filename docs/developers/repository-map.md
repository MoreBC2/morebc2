# BitcoinII repository map

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page maps the BitcoinII Core repository at a high level so new contributors can find important areas of the codebase.

This is not a full source audit. It is a navigation aid that should be expanded as more files are reviewed.

## Core files already referenced by MoreBC2

| File | Current MoreBC2 use | Evidence |
|---|---|---|
| `README.md` | Project description, license, wallet/node overview | E3 |
| `src/init.cpp` | Startup orchestration, chainstate loading, RPC warmup, index/wallet loading, final startup handoff | E1 partial |
| `src/kernel/chainparams.cpp` | Mainnet parameters, genesis block, DNS seeds, address prefixes | E1 |
| `src/pow.cpp` | Difficulty adjustment and proof-of-work target checks | E1 |
| `src/consensus/tx_check.*` | Context-independent transaction checks | E1 |
| `src/consensus/tx_verify.*` | Finality, sequence locks, operation-cost helpers, input checks | E1 |
| `src/script/interpreter.*` | Script engine, script flags, witness/Taproot paths, script verification entry points | E1 partial |
| `src/validation.cpp` | Block validation, block connection, reorgs, mempool acceptance paths | E1 partial |
| `src/validation.h` | Validation declarations and public validation interfaces | E1 partial |
| `src/validationinterface.*` | Validation and mempool notification interface | E1 partial |
| `src/node/blockstorage.*` | Block index database, block and undo files, pruning, reindex, import | E1 partial |
| `src/node/miner.*` | Candidate block-template assembly and mempool package selection | E1 partial |
| `src/node/mini_miner.*` | Fee and ordering simulation helper | E1 partial |
| `src/protocol.h` / `src/protocol.cpp` | Message names, message headers, service flags, address serialization, inventory helpers | E1 partial |
| `src/net_processing.h` / `src/net_processing.cpp` | Peer handshake, address sharing, block/header sharing, transaction sharing, peer health checks | E1 partial |
| `src/rpc/net.cpp` | Network RPC, peer status, ban-list, address-manager, manual peer commands | E1 partial |
| `src/rpc/mining.cpp` | Mining RPC, candidate template, block/header submission, mining status | E1 partial |
| `src/rpc/blockchain.cpp` | Blockchain RPC, block lookup, pruning, UTXO scans, chainstate status | E1 partial |
| `src/rpc/rawtransaction.cpp` | Raw transaction lookup, decode, unsigned construction, explicit-key signing, and PSBT RPCs | E1 partial |
| `src/rpc/mempool.cpp` | Transaction broadcast, mempool acceptance testing, mempool inspection, persistence, orphan, and package RPCs | E1 partial |
| `src/wallet/init.cpp` | Wallet options, parameter interaction, wallet loader construction | E1 partial |
| `src/wallet/load.*` | Wallet verification, loading, start, flush, stop, unload | E1 partial |
| `src/wallet/context.*` | Shared wallet context and wallet list state | E1 partial |
| `src/wallet/wallet.h` | Wallet declarations, startup-adjacent defaults, chain notification hooks | E1 partial |
| `src/wallet/rpc/wallet.cpp` | Wallet RPC registration, management, creation, loading, migration, status | E1 partial |
| `src/wallet/rpc/addresses.cpp` | Address, change-address, label, grouping, and multisig wallet RPCs | E1 partial |
| `src/wallet/rpc/backup.cpp` | Wallet backup, restore, import, descriptor import, export, and rescan-related RPCs | E1 partial |
| `src/wallet/rpc/spend.cpp` | Wallet send, funding, fee setting, fee bumping, signing, and PSBT RPCs | E1 partial |
| `src/wallet/rpc/encrypt.cpp` | Wallet timed access, relock, access-phrase update, and first-time encryption RPCs | E1 partial |
| `src/wallet/rpc/coins.cpp` | Received amount, balance, output-state, and available-output RPCs | E1 partial |
| `src/wallet/rpc/transactions.cpp` | Wallet transaction listing, single-transaction lookup, polling, abandon, rescan, and abort-rescan RPCs | E1 partial |
| `src/txmempool.cpp` | Mempool storage, removal, expiry, prioritization, checking | E1 partial |
| `src/txmempool.h` | Mempool structure, indexes, ancestor/descendant tracking | E1 partial |
| `src/kernel/mempool_entry.h` | Mempool entry metadata and lockpoint data | E1 |
| `src/kernel/disconnected_transactions.*` | Temporary transaction holding during reorg processing | E1 |
| `src/primitives/block.cpp` | Block header hash path | E1 |
| `src/primitives/block.h` | Block header fields and block structure | E1 |
| `src/hash.h` | Double-SHA256 hashing behavior | E1 |
| `src/consensus/amount.h` | `COIN` and `MAX_MONEY` definitions | E1 |
| `share/examples/bitcoinII.conf` | Configuration and RPC defaults | E1/E3 |
| `doc/JSON-RPC-interface.md` | JSON-RPC background | E3 |
| `doc/man/bitcoinIId.1` | Daemon manual page | E3 |
| `doc/man/bitcoinII-cli.1` | CLI manual page | E3 |
| `doc/man/bitcoinII-qt.1` | GUI manual page | E3 |

## Repository areas

### Startup and node lifecycle

Reviewed or partially reviewed:

- `src/init.cpp`
- wallet loader interaction from `src/wallet/init.cpp`

Related MoreBC2 pages:

- [Node startup](../architecture/node-startup.md)
- [Source atlas: startup initialization](source-atlas/init-cpp.md)
- [Source atlas: wallet startup](source-atlas/wallet-startup.md)

Open questions:

- Which executable entry points call the reviewed startup helpers in daemon and GUI mode?
- Which startup commands have been locally tested?
- Which shutdown paths should be mapped next?
- Which wallet GUI startup paths differ from daemon startup?

### Consensus, validation, and script engine

Reviewed or partially reviewed:

- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/consensus/tx_check.*`
- `src/consensus/tx_verify.*`
- `src/script/interpreter.*`
- `src/validation.cpp`
- `src/validation.h`
- `src/validationinterface.*`
- `src/node/blockstorage.*`
- `src/consensus/amount.h`

Related MoreBC2 pages:

- [Consensus model](../architecture/consensus-model.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Source atlas: transaction consensus files](source-atlas/transaction-consensus.md)
- [Source atlas: script engine](source-atlas/script-interpreter.md)
- [Source atlas: validation interface](source-atlas/validation-interface.md)
- [Source atlas: block storage](source-atlas/block-storage.md)

Questions:

- Which script flags are mandatory consensus vs policy in each caller context?
- Which validation-interface subscribers are active in wallet, index, and UI paths?
- Which storage failure paths matter most for operator troubleshooting?
- Which consensus constants are BitcoinII-specific beyond already reviewed chain parameters?
- Which tests cover transaction, script, storage, and notification behavior?

### Peer and network behavior

Reviewed or partially reviewed:

- `src/protocol.h`
- `src/protocol.cpp`
- `src/net_processing.h`
- `src/net_processing.cpp`
- `src/rpc/net.cpp`

Related MoreBC2 pages:

- [Source atlas: protocol primitives](source-atlas/protocol.md)
- [Source atlas: network RPC](source-atlas/rpc-network.md)
- [Source atlas: peer handshake](source-atlas/net-processing-handshake.md)
- [Source atlas: address sharing](source-atlas/net-processing-address-relay.md)
- [Source atlas: block and header sharing](source-atlas/net-processing-block-relay.md)
- [Source atlas: transaction sharing](source-atlas/net-processing-transaction-relay.md)
- [Source atlas: peer health and stale-tip checks](source-atlas/net-processing-peer-eviction.md)
- [Architecture overview](../architecture/architecture-overview.md)
- [Life of a transaction](../architecture/life-of-a-transaction.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Mempool flow](../architecture/mempool-flow.md)
- [Network specifications](../documentation/network-specifications.md)

Questions:

- Which send-loop behavior should be reviewed next?
- Which lower-level connection-management behavior in `src/net.cpp` should become user-facing node documentation?
- Which banman behavior needs a separate review?
- Which DNS seed and addrman paths should be connected to startup and node-operation docs?
- Which P2P details differ, if any, between current `main` and `v29.1.0`?
- Which network details should stay developer-only rather than appearing in service-provider guides?

### Wallet startup and lifecycle

Reviewed or partially reviewed:

- `src/wallet/init.cpp`
- `src/wallet/load.h`
- `src/wallet/load.cpp`
- `src/wallet/context.h`
- `src/wallet/context.cpp`
- startup-adjacent parts of `src/wallet/wallet.h`

Related MoreBC2 pages:

- [Source atlas: wallet startup](source-atlas/wallet-startup.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Node startup](../architecture/node-startup.md)

Questions:

- Which wallet database formats are enabled in current releases?
- Which backup and restore workflows can be tested safely?
- Which wallet notification paths should be mapped to validation-interface events?
- Which GUI wallet flows differ from CLI/daemon behavior?

### Wallet RPC

Reviewed or partially reviewed:

- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`
- `src/wallet/rpc/backup.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/rpc/encrypt.cpp`
- `src/wallet/rpc/coins.cpp`
- `src/wallet/rpc/transactions.cpp`

Related MoreBC2 pages:

- [Source atlas: wallet RPC](source-atlas/wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](source-atlas/wallet-backup-import-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet encryption RPC](source-atlas/wallet-encryption-rpc.md)
- [Source atlas: wallet coins and balances RPC](source-atlas/wallet-coins-rpc.md)
- [Source atlas: wallet transaction history RPC](source-atlas/wallet-transactions-rpc.md)
- [Source atlas: wallet startup](source-atlas/wallet-startup.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [RPC overview](rpc-overview.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)

Questions:

- Which wallet RPC examples can be safely tested locally?
- Which address, balance, history, and status commands belong in service docs?
- Which recovery commands need separate advanced pages?
- Which wallet send and PSBT workflows need separate advanced pages?
- Which wallet access-state workflows need separate advanced pages?
- Which descriptor-vs-legacy behaviors need user-facing explanation?
- Which build flags affect wallet RPC availability?

### Mempool and transaction policy

Reviewed or partially reviewed:

- `src/txmempool.cpp`
- `src/txmempool.h`
- `src/kernel/mempool_entry.h`
- Mempool acceptance portions of `src/validation.cpp`
- Transaction-sharing portions of `src/net_processing.cpp`

Related MoreBC2 pages:

- [Mempool flow](../architecture/mempool-flow.md)
- [Life of a transaction](../architecture/life-of-a-transaction.md)
- [Source atlas: mempool accept](source-atlas/mempool-accept.md)
- [Source atlas: mempool source](source-atlas/txmempool.md)
- [Source atlas: mempool and transaction broadcast RPC](source-atlas/rpc-mempool.md)
- [Source atlas: transaction sharing](source-atlas/net-processing-transaction-relay.md)

Questions:

- What replacement-policy details still need review?
- Which mempool defaults should be documented for operators?
- Which package acceptance behaviors need deeper explanation?
- Which transaction-sharing send-loop behavior needs a separate page?
- Which RPCs expose mempool/package acceptance state?

### Block storage, pruning, and reindex

Reviewed or partially reviewed:

- `src/node/blockstorage.h`
- `src/node/blockstorage.cpp`

Related MoreBC2 pages:

- [Source atlas: block storage](source-atlas/block-storage.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Node startup](../architecture/node-startup.md)

Questions:

- Which operator-facing pruning behavior should move into node docs?
- Which undo-read paths should be documented with disconnect/reorg follow-up work?
- Which reindex and import behavior should be included in user troubleshooting docs?

### Candidate block templates

Reviewed or partially reviewed:

- `src/node/miner.h`
- `src/node/miner.cpp`
- `src/node/mini_miner.h`
- `src/node/mini_miner.cpp`

Related MoreBC2 pages:

- [Source atlas: block template assembly](source-atlas/miner.md)
- [Mining overview](../mining/mining-overview.md)
- [Mempool flow](../architecture/mempool-flow.md)
- [Life of a block](../architecture/life-of-a-block.md)

Questions:

- Where exactly is the subsidy calculation implemented?
- Which external operation docs can be verified from primary sources?
- Which tests cover candidate block assembly and package selection?

### RPC groups

Reviewed or partially reviewed:

- `src/rpc/mining.cpp`
- `src/rpc/blockchain.cpp`
- `src/rpc/net.cpp`
- `src/rpc/rawtransaction.cpp`
- `src/rpc/mempool.cpp`
- `src/wallet/rpc/*` reviewed groups

Related MoreBC2 pages:

- [RPC overview](rpc-overview.md)
- [Source atlas: mining RPC](source-atlas/rpc-mining.md)
- [Source atlas: blockchain RPC](source-atlas/rpc-blockchain.md)
- [Source atlas: network RPC](source-atlas/rpc-network.md)
- [Source atlas: raw transaction RPC](source-atlas/rpc-rawtransaction.md)
- [Source atlas: mempool and transaction broadcast RPC](source-atlas/rpc-mempool.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)

Questions:

- Which RPC examples can be safely tested locally?
- Which commands should be included in exchange/service docs?
- Which commands belong only in advanced or developer docs?
- Which commands are affected by pruning, indexing, wallet availability, or network state?

### Build, release, and tests

Likely files/directories to continue reviewing:

- `depends/`
- `cmake/`
- `contrib/`
- `.github/workflows/`
- `doc/`
- `test/`
- `src/test/`
- `src/wallet/test/`

Related MoreBC2 pages:

- [Build system guide](build-system.md)
- [Testing guide](testing.md)
- [Release process guide](release-process.md)
- [Release verification guide](release-verification.md)
- [Release source comparison](../verification/release-source-comparison.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)

Questions:

- Which build systems are supported?
- Which platforms have release assets?
- What release verification material exists?
- Are checksums, signatures, or signed tags published?
- Which tests are inherited from Bitcoin Core?
- Are there BitcoinII-specific tests?
- Which tests can contributors run locally?

## Rules for expanding this map

- Do not assume a file's purpose from its name alone.
- Confirm by reading file headers, function names, comments, or documentation.
- Add source links and reviewed dates.
- Mark uncertain areas as Needs Review.
- Link new reviewed files to the Source Atlas and documentation coverage dashboard.

## Sources

- BitcoinII source repository currently reviewed through MoreBC2 source-atlas entries.
- Files already cited in MoreBC2 core docs.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This map was refreshed after adding network Source Atlas slices for protocol primitives, network RPC, peer handshake, address sharing, block/header sharing, transaction sharing, and peer health/stale-tip checks. Target lists are not claims of implementation details until reviewed.
