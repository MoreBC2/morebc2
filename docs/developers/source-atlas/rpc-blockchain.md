# Blockchain RPC

**Category:** Developer / Source Atlas  
**Status:** Source-reviewed / Runtime-tested partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` blockchain/chainstate RPC behavior centered on `src/rpc/blockchain.cpp`.

The earlier page was source-only. MoreBC2 now has bounded Windows `v31.1.0` runtime evidence for selected status methods, while pruning, scans, snapshots, state-changing chain controls, and most historical lookup paths remain source-reviewed only.

## Reviewed command surface

Current source review includes methods such as:

- `getblockchaininfo`
- `getchaintxstats`
- `getblockstats`
- `getbestblockhash`
- `getblockcount`
- `getblock`
- `getblockfrompeer`
- `getblockhash`
- `getblockheader`
- `getchaintips`
- `getdifficulty`
- `getdeploymentinfo`
- `gettxout`
- `gettxoutsetinfo`
- `pruneblockchain`
- `verifychain`
- `preciousblock`
- `scantxoutset`
- `scanblocks`
- `getdescriptoractivity`
- `getblockfilter`
- `dumptxoutset`
- `loadtxoutset`
- `getchainstates`
- index/status helpers including `getindexinfo` through the current RPC surface.

State-changing or advanced methods should not be promoted as tested operator instructions without a dated workflow.

## Runtime-tested v31 subset

The September 11 isolated Windows mainnet validation directly exercised:

- `getblockchaininfo`
- `getchaintips`
- `getindexinfo`

The same runtime record observed advancing initial block download, current header acquisition, `pruned=false`, and no optional indexes enabled (`getindexinfo` returned no active optional index set in that environment).

This is environment-bounded evidence. It does not establish behavior for a fully synchronized, pruned, txindexed, blockfilter-indexed, snapshot-based, or cross-platform node.

See [Windows v31.1.0 node and RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md).

## `getblockchaininfo`

Current source/status output covers fields such as:

- chain;
- blocks and headers;
- best block hash;
- target/difficulty context;
- median time;
- verification progress;
- initial-block-download state;
- chain work;
- disk usage;
- pruning state;
- warnings and network-specific information.

MoreBC2 directly exercised this method during bounded v31 IBD. Time-dependent example values should not be copied as protocol constants.

## Block/header lookup

Reviewed helpers support block/header lookup by hash/height and JSON conversion with fields such as:

- confirmations;
- height;
- version;
- merkle root;
- time / median time;
- nonce;
- `bits` / target / difficulty;
- chain work;
- previous/next hashes where available;
- transaction information according to requested verbosity.

Historical lookup depends on local block/index availability. A pruned node or node without the relevant index can have legitimate lookup limitations.

## Current difficulty interpretation

`getdifficulty` and block/header JSON expose difficulty derived from chain state.

For current BC2, do not pair those RPCs with documentation that says difficulty changes only every 2016 blocks. Mainnet uses ShockWave per block from height `57750`.

See [ShockWave v31](shockwave-v31.md).

## Chain tips and accumulated work

`getchaintips` exposes known tip states, while the underlying validation path selects the active candidate by accumulated chain work.

The September v31 runtime test exercised `getchaintips`; it did not intentionally create a fork/reorg fixture.

Confirmation count is therefore an operational policy input rather than protocol finality.

## Pruning and index boundary

Current source/runtime evidence establishes:

- pruning is not enabled by default;
- `txindex` is not enabled by default;
- pruning and some index/service workflows have compatibility constraints;
- block/undo/history lookups can fail legitimately when required local data is unavailable.

The September v31 test observed the default unpruned/no-optional-index state. It did **not** execute `pruneblockchain`, reindex, txindex, blockfilter, or snapshot workflows.

## UTXO and scan RPCs

Source-reviewed surfaces include:

- `gettxout`
- `gettxoutsetinfo`
- `scantxoutset`
- `scanblocks`
- `getdescriptoractivity`

These can be useful for service/recovery tooling but depend on exact chain/index/node state. MoreBC2 has not yet produced a current v31 runtime guide for these scan paths.

## UTXO snapshot / chainstate RPCs

Source-reviewed snapshot paths include `dumptxoutset`, `loadtxoutset`, and chainstate-status reporting.

MoreBC2 has not runtime-tested assumeutxo/snapshot activation on BC2. Do not describe snapshot loading as operationally verified merely because the RPC exists in source.

## State-changing/advanced boundary

Commands that alter validation state, manual pruning, precious-block preference, invalidation/reconsideration, peer-directed block fetching, or snapshots should remain advanced/operator documentation until a specific safe workflow is tested.

A source-observed command is not a recommendation.

## Service integration implications

For exchanges/custody/indexers:

- use an operator-controlled Core node as the authoritative chain source;
- document pruning/index requirements for every historical lookup used;
- use chain work and tip/fork state alongside confirmation thresholds for deposit risk;
- do not rely on public explorer behavior as a substitute for the node's own chainstate;
- distinguish a missing historical lookup caused by pruning/index configuration from a consensus failure.

## Related pages

- [RPC overview](../rpc-overview.md)
- [Block acceptance pipeline](block-acceptance.md)
- [Block storage](block-storage.md)
- [ShockWave v31](shockwave-v31.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)
- [Node configuration](../../configuration/node-configuration.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Runtime-test `getblock` / `getblockheader` / `getdifficulty` against a current fully synchronized v31 fixture.
- Exercise explicit pruning/index configurations in disposable data directories.
- Qualify UTXO/descriptor scan methods for service/recovery use.
- Test snapshot/assumeutxo behavior only in an isolated environment.

## Primary sources

Pinned/current review scope:

- `v31.1.0/src/rpc/blockchain.cpp`
- `v31.1.0/src/rpc/blockchain.h`
- `v31.1.0/src/validation.cpp`
- `v31.1.0/src/node/blockstorage.*`
- `v31.1.0/src/pow.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary evidence:** BitcoinII Core `v31.1.0` source plus September 11 Windows mainnet node/RPC validation  
**Notes:** Current v31 runtime evidence now covers selected chain/index status RPCs. Historical lookup, pruning/index mutation, scans, snapshots, and advanced chain controls remain source-only or untested.
