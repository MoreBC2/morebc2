# BitcoinII source tree guide

**Category:** Developer guide  
**Status:** Reviewed / Navigation  
**Last reviewed:** 2026-09-12

## Summary

This guide maps the BitcoinII Core areas already covered by MoreBC2. It is a navigation aid, not a claim that every file in each directory has been audited.

Current technical claims should use BitcoinII Core `v31.1.0` release-pinned source where possible. The [Source Atlas](source-atlas/README.md) records file/feature-level evidence and runtime boundaries.

## `src/` — node/validation/network core

Reviewed or partially reviewed areas include:

- `src/init.cpp` — startup orchestration;
- `src/pow.cpp` — proof-of-work and ShockWave;
- `src/validation.cpp` / `validation.h` — headers, blocks, mempool, best-chain activation and v31 validation hooks;
- `src/validationinterface.*` — validation notifications;
- `src/txmempool.*` — mempool storage/state;
- `src/hash.h` — hashing helpers;
- `src/protocol.*` — P2P protocol primitives;
- `src/net.*` / `src/net_processing.*` — connection/peer processing;
- `src/addrman*` / `src/banman*` — address and ban/discouragement state.

Important v31-specific paths cross these broad areas: ShockWave, replay protection, data restrictions, and fork-aware header sync.

## `src/node/`

Reviewed areas include:

- `blockstorage.*` — block/undo storage, pruning/reindex support;
- `miner.*` — candidate block-template assembly;
- `mini_miner.*` — fee/ordering simulation;
- current node/interface helpers referenced by v31 RPC/PSBT/header-sync reviews.

The key mining-specific v31 rule is candidate-time / `nBits` coupling under ShockWave.

## `src/rpc/`

Source Atlas coverage includes:

- mining RPC;
- blockchain/chainstate RPC;
- network RPC;
- raw transaction / PSBT RPC;
- mempool / transaction-broadcast RPC.

Current runtime evidence exists for selected node/status, network, wallet/PSBT, mempool, raw-transaction, and local-generation methods. Presence in source alone is not runtime verification.

## `src/wallet/`

Reviewed paths include:

- startup/load/context;
- wallet management/status;
- backup/import;
- spend/funding/PSBT;
- encryption/passphrase;
- balances/UTXOs;
- transaction history/rescan.

September `v31.1.0` runtime evidence covers disposable descriptor-wallet creation/reload, address generation, `getbalances`, PSBT funding/signing/finalization, and local regtest mempool submission. Backup/restore, encryption, rescan/history/reorg, and external-signer behavior remain separate gaps.

## `src/kernel/`

Reviewed files include:

- `chainparams.cpp` — mainnet identity, genesis, deployments, network constants and release snapshots;
- `mempool_entry.h` — mempool-entry metadata;
- `disconnected_transactions.*` — temporary reorg transaction handling.

## `src/consensus/`

Reviewed areas include:

- amount/money-range definitions;
- transaction context-free and input/finality/sequence helpers;
- v31 BitcoinII data restrictions;
- consensus parameters used by ShockWave/replay protection.

Generic transaction helper structure must not be mistaken for the whole current BC2 transaction-validation model.

## `src/script/`

Reviewed interpreter/signing paths include:

- script flags and execution contexts;
- ECDSA/Schnorr transaction signature checking;
- witness/Taproot/Tapscript handling;
- v31 replay-protection signature-domain propagation.

Mandatory-versus-policy flag mapping remains a separate detailed task.

## `src/primitives/`

Reviewed block primitives establish the current Bitcoin-style block-header field structure and double-SHA256 hash call path. Current BC2 mining differences occur in required-work calculation/validation rather than a different header field layout.

## Header sync

`src/headerssync.*` is now a first-class v31 review area because ShockWave needs rolling target/MTP history while validating peer-supplied competing branches.

See [Fork-aware header synchronization](source-atlas/headers-sync-v31.md).

## Build/test/release areas

Partially reviewed:

- top-level and `src/` CMake configuration;
- Unix build documentation;
- selected current test files identified by feature reviews;
- GitHub release metadata/artifacts;
- MoreBC2's own CI/deployment workflows.

MoreBC2 has **not** yet completed a clean BitcoinII source build or full upstream test-suite execution. Release-binary runtime validation must remain distinct from source-build verification.

## Configuration/documentation surfaces

Reviewed examples/docs include:

- `share/examples/bitcoinII.conf`;
- JSON-RPC documentation;
- generated daemon/CLI/Qt manual pages.

The generated example config contains inherited wording that can be stale for BC2—for example, a mainnet P2P `8333` comment despite current chain parameters/runtime using `8338`. Release-pinned code and observed current runtime control where they conflict.

## Areas still outside detailed coverage

Not every file in these areas has been mapped:

- additional RPC/wallet files;
- Qt GUI internals;
- full unit/functional/fuzz test suites;
- `depends/` / packaging internals;
- `contrib/`;
- broader CMake/toolchain details;
- all CI/release-engineering paths.

## Expansion rule

When extending this guide, record:

- exact release/ref;
- files/directories reviewed;
- what was source-confirmed;
- what was runtime-tested;
- BitcoinII-specific divergence or uncertainty;
- related Source Atlas page(s);
- unresolved tests/questions.

## Related pages

- [Developer index](README.md)
- [Source Atlas](source-atlas/README.md)
- [Repository map](repository-map.md)
- [Source review guide](source-review-guide.md)
- [Testing guide](testing.md)

## Verification

**Status:** Reviewed / Navigation  
**Primary evidence:** Current Source Atlas coverage, BitcoinII Core `v31.1.0`, and September 2026 runtime records  
**Notes:** This guide now reflects current v31 coverage and explicitly separates reviewed files from unreviewed directory breadth and source review from runtime/build evidence.
