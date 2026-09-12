# Net processing block and header relay

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Runtime-corroborated partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` block/header relay behavior in `src/net_processing.*`.

The broad headers-first/block-download structure remains Bitcoin-style, but current BC2 adds a material v31-specific boundary: peer-supplied ShockWave-era branches must be validated with **fork-aware header synchronization** that preserves enough branch history to reproduce production `GetNextWorkRequired()`.

September mainnet runtime evidence now corroborates ordinary current header acquisition and advancing block validation, but not every compact-block, timeout, alternate-branch, or send-loop branch.

## Header receive path

Reviewed header processing includes:

- basic proof-of-work sanity before deeper acceptance;
- low-work/two-phase headers-sync handling;
- known-chain connection requirements and unconnecting-header behavior;
- passing accepted headers into `ProcessNewBlockHeaders`;
- invalid-header punishment paths where applicable;
- requesting additional headers when a full response suggests more are available;
- updating peer best-known-block/announcement state;
- considering direct block fetch after useful headers arrive.

## v31 fork-aware ShockWave validation

Post-height-`57750`, required `nBits` depends on ShockWave history and candidate time rather than only the previous target.

BitcoinII `v31.1.0` therefore extends per-peer headers sync with bounded synthetic block-index history rooted at the actual branch/fork point. That history is used during PRESYNC and REDOWNLOAD to call the production next-work calculation.

This prevents alternate peer branches from being checked with the active chain's unrelated ShockWave history.

See [Fork-aware header synchronization](headers-sync-v31.md).

## `getheaders` / locator behavior

Reviewed behavior includes:

- locator-size limits;
- no normal response during selected import/reindex states;
- active-chain locator resolution;
- optional stop-hash handling;
- response limits;
- tracking the best header sent to the peer.

A headers response is chain-state information, not proof that every corresponding block body is locally available.

## `getblocks` / inventory behavior

Reviewed source can walk forward from a common active-chain point and queue block inventory subject to response limits, stop hashes, and pruning/data-availability constraints.

Pruned nodes can legitimately be unable to serve old block bodies even if their headers remain known.

## Full block receive

The P2P-facing block path performs preliminary/mutation/work/request bookkeeping and then hands the block into the validation pipeline.

Network receipt is not equivalent to consensus acceptance. `ProcessNewBlock` / validation still determine whether a block can be stored/activated.

See [Block acceptance](block-acceptance.md).

## Compact blocks

Reviewed compact-block behavior includes header processing, previous-header handling, near-tip reconstruction decisions, in-flight/download constraints, fallback to ordinary block requests, and `getblocktxn`/blocktxn handling.

This page is not a complete BIP152 implementation guide and does not claim every compact-block reconstruction path has been runtime-tested on BC2.

## Runtime evidence — 2026-09-11

The isolated Windows `v31.1.0` mainnet node:

- automatically established outbound peers;
- acquired the current header chain;
- advanced block validation during bounded IBD;
- retained state across a clean restart and resumed network operation.

This corroborates ordinary header/block synchronization for the tested environment.

It does **not** isolate:

- a competing ShockWave branch;
- PRESYNC/REDOWNLOAD instrumentation;
- compact-block reconstruction;
- block-download timeout/stalling behavior;
- inbound serving behavior;
- old-block serving from a pruned node.

## Chainwork boundary

Peer relay can announce multiple candidate branches, but active-chain selection remains a validation/chainstate decision based on accumulated valid chain work.

Relay order or first-seen status is not protocol finality.

## Related pages

- [Fork-aware header synchronization](headers-sync-v31.md)
- [ShockWave v31](shockwave-v31.md)
- [Block acceptance](block-acceptance.md)
- [Protocol primitives](protocol.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Controlled alternate-branch ShockWave headers-sync fixture.
- Compact-block reconstruction coverage.
- Block download timeout/stalling runtime tests.
- Inbound/pruned block-serving tests if operator documentation needs them.
- Current test-suite mapping after a clean source build.

## Primary sources

- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net_processing.h`
- `v31.1.0/src/headerssync.*`
- `v31.1.0/src/pow.cpp`
- `v31.1.0/src/validation.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Runtime-corroborated partial  
**Primary evidence:** BitcoinII Core `v31.1.0` relay/header-sync source plus September 11 bounded mainnet header/block synchronization  
**Notes:** Ordinary synchronization is runtime-corroborated; fork-aware alternate branches, compact blocks, stalling and serving edge cases remain source-only or untested.
