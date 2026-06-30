# BitcoinII repository map

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

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
| `src/rpc/mining.cpp` | Mining RPC, candidate template, block/header submission, mining status | E1 partial |
| `src/rpc/blockchain.cpp` | Blockchain RPC, block lookup, pruning, UTXO scans, chainstate status | E1 partial |
| `src/wallet/init.cpp` | Wallet options, parameter interaction, wallet loader construction | E1 partial |
| `src/wallet/load.*` | Wallet verification, loading, start, flush, stop, unload | E1 partial |
| `src/wallet/context.*` | Shared wallet context and wallet list state | E1 partial |
| `src/wallet/wallet.h` | Wallet declarations, startup-adjacent defaults, chain notification hooks | E1 partial |
| `src/wallet/rpc/wallet.cpp` | Wallet RPC registration, management, creation, loading, migration, status | E1 partial |
| `src/wallet/rpc/addresses.cpp` | Address, change-address, label, grouping, and multisig wallet RPCs | E1 partial |
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

Related MoreBC2 pages:

- [Source atlas: wallet RPC](source-atlas/wallet-rpc.md)
- [Source atlas: wallet startup](source-atlas/wallet-startup.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [RPC overview](rpc-overview.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)

Questions:

- Which wallet RPC examples can be safely tested locally?
- Which address and status commands belong in service docs?
- Which wallet command groups need separate advanced pages?
- Which descriptor-vs-legacy behaviors need user-facing explanation?
- Which build flags affect wallet RPC availability?

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

### Mining RPC

Reviewed or partially reviewed:

- `src/rpc/mining.cpp`

Related MoreBC2 pages:

- [Source atlas: mining RPC](source-atlas/rpc-mining.md)
- [Source atlas: block template assembly](source-atlas/miner.md)
- [Mining overview](../mining/mining-overview.md)
- [RPC overview](rpc-overview.md)

Questions:

- Which mining RPC examples can be safely tested locally?
- Which mining RPCs belong in user docs versus developer docs?
- Which external tools actually use `getblocktemplate` with BitcoinII today?
- How should satoshi-vs-BC2 units be highlighted in service docs?

### Blockchain RPC

Reviewed or partially reviewed:

- `src/rpc/blockchain.cpp`

Related MoreBC2 pages:

- [Source atlas: blockchain RPC](source-atlas/rpc-blockchain.md)
- [RPC overview](rpc-overview.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)

Questions:

- Which blockchain RPC examples can be safely tested locally?
- Which commands should be included in exchange/service docs?
- Which pruning and block-data errors should become operator troubleshooting notes?
- Which scan commands belong in normal docs versus advanced recovery docs?

### Validation notifications

Reviewed or partially reviewed:

- `src/validationinterface.h`
- `src/validationinterface.cpp`

Related MoreBC2 pages:

- [Source atlas: validation interface](source-atlas/validation-interface.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Mempool flow](../architecture/mempool-flow.md)

Questions:

- Which wallet and index paths subscribe to validation notifications?
- Which callback ordering details should appear in lifecycle pages?
- Which callbacks are user-visible through wallet balance or index update behavior?

### Mempool and transaction policy

Reviewed or partially reviewed:

- `src/txmempool.cpp`
- `src/txmempool.h`
- `src/kernel/mempool_entry.h`
- Mempool acceptance portions of `src/validation.cpp`

Related MoreBC2 pages:

- [Mempool flow](../architecture/mempool-flow.md)
- [Life of a transaction](../architecture/life-of-a-transaction.md)
- [Source atlas: mempool accept](source-atlas/mempool-accept.md)
- [Source atlas: mempool source](source-atlas/txmempool.md)

Questions:

- What replacement-policy details still need review?
- Which mempool defaults should be documented for operators?
- Which package acceptance behaviors need deeper explanation?

### Networking

Likely files/directories to review:

- `src/net.cpp`
- `src/net.h`
- `src/net_processing.cpp`
- `src/net_processing.h`
- `src/protocol.cpp`
- `src/protocol.h`

Questions:

- Where are peer-to-peer messages defined?
- Where are peer connection settings handled?
- Where are DNS seeds consumed during startup?
- How do blocks and transactions move from peers into validation?

### RPC

Reviewed or partially reviewed:

- `src/rpc/mining.cpp`
- `src/rpc/blockchain.cpp`
- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`

Likely files/directories to review next:

- other `src/rpc/` files
- `src/bitcoinII-cli.cpp`
- remaining `src/wallet/rpc/` files

Questions:

- Which RPC commands are available?
- Are any commands BitcoinII-specific?
- Which commands are safest to document for exchanges?
- Which examples have been tested locally?

### Wallet

Reviewed or partially reviewed:

- `src/wallet/init.cpp`
- `src/wallet/load.*`
- `src/wallet/context.*`
- startup-adjacent parts of `src/wallet/wallet.h`
- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`

Likely files/directories to review next:

- other `src/wallet/` files
- remaining `src/wallet/rpc/` files
- `src/qt/` wallet paths

Questions:

- Which wallet behavior should be documented for users and exchanges?
- What backup and restore guidance is source-backed or tested?
- Which wallet RPCs are safest for service documentation?

### Build and release

Likely files/directories to review:

- `depends/`
- `cmake/`
- `contrib/`
- `.github/workflows/`
- `doc/`

Questions:

- Which build systems are supported?
- Which platforms have release assets?
- What release verification material exists?
- Are checksums, signatures, or signed tags published?

### Tests

Likely files/directories to review:

- `test/`
- `src/test/`
- `src/wallet/test/`

Questions:

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
**Notes:** This map includes verified files already reviewed plus likely next review targets. Target lists are not claims of implementation details until reviewed.
