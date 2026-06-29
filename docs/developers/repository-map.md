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
| `src/kernel/chainparams.cpp` | Mainnet parameters, genesis block, DNS seeds, address prefixes | E1 |
| `src/pow.cpp` | Difficulty adjustment and proof-of-work target checks | E1 |
| `src/primitives/block.cpp` | Block header hash path | E1 |
| `src/primitives/block.h` | Block header fields and block structure | E1 |
| `src/hash.h` | Double-SHA256 hashing behavior | E1 |
| `src/consensus/amount.h` | `COIN` and `MAX_MONEY` definitions | E1 |
| `share/examples/bitcoinII.conf` | Configuration and RPC defaults | E1/E3 |
| `doc/JSON-RPC-interface.md` | JSON-RPC background | E3 |
| `doc/man/bitcoinIId.1` | Daemon manual page | E3 |
| `doc/man/bitcoinII-cli.1` | CLI manual page | E3 |
| `doc/man/bitcoinII-qt.1` | GUI manual page | E3 |

## Areas to map next

### Consensus and validation

Likely files/directories to review:

- `src/validation.cpp`
- `src/validation.h`
- `src/consensus/`
- `src/kernel/`

Questions:

- Where is block validation implemented?
- Where is chain selection implemented?
- Which consensus constants are BitcoinII-specific?

### Networking

Likely files/directories to review:

- `src/net.cpp`
- `src/net.h`
- `src/protocol.cpp`
- `src/protocol.h`

Questions:

- Where are peer-to-peer messages defined?
- Where are peer connection settings handled?
- Where are DNS seeds consumed during startup?

### RPC

Likely files/directories to review:

- `src/rpc/`
- `src/bitcoinII-cli.cpp`

Questions:

- Which RPC commands are available?
- Are any commands BitcoinII-specific?
- Which commands are safest to document for exchanges?

### Wallet

Likely files/directories to review:

- `src/wallet/`
- `src/qt/`

Questions:

- Where is wallet loading handled?
- Where is address generation handled?
- Which wallet behavior should be documented for users and exchanges?

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

## Sources

- BitcoinII repository: https://github.com/BitcoinII-Dev/BitcoinII
- Files already cited in MoreBC2 core docs.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This map includes verified files already reviewed plus likely next review targets. Target lists are not claims of implementation details until reviewed.
