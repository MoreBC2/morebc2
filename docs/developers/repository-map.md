# BitcoinII repository map

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

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
| `src/validation.cpp` | Block validation, block connection, reorgs, mempool acceptance paths | E1 partial |
| `src/validation.h` | Validation declarations and public validation interfaces | E1 partial |
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

Related MoreBC2 pages:

- [Node startup](../architecture/node-startup.md)
- [Source atlas: startup initialization](source-atlas/init-cpp.md)

Open questions:

- Which executable entry points call the reviewed startup helpers in daemon and GUI mode?
- Which startup commands have been locally tested?
- Which shutdown paths should be mapped next?

### Consensus and validation

Reviewed or partially reviewed:

- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/validation.cpp`
- `src/validation.h`
- `src/consensus/amount.h`

Likely files/directories to review next:

- `src/consensus/tx_check.*`
- `src/consensus/tx_verify.*`
- `src/script/`

Related MoreBC2 pages:

- [Consensus model](../architecture/consensus-model.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)

Questions:

- Which transaction consensus paths remain undocumented?
- Which script flags are mandatory consensus vs policy?
- Which consensus constants are BitcoinII-specific beyond already reviewed chain parameters?

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

Likely files/directories to review:

- `src/rpc/`
- `src/bitcoinII-cli.cpp`
- `src/wallet/rpc*`

Questions:

- Which RPC commands are available?
- Are any commands BitcoinII-specific?
- Which commands are safest to document for exchanges?
- Which examples have been tested locally?

### Wallet

Likely files/directories to review:

- `src/wallet/`
- `src/qt/`

Questions:

- Where is wallet loading handled beyond the startup interface calls?
- Where is address generation handled?
- Which wallet behavior should be documented for users and exchanges?
- What backup and restore guidance is source-backed or tested?

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
