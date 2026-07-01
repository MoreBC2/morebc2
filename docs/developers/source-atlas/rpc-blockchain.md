# Blockchain RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/rpc/blockchain.cpp`

This file exposes blockchain, block, chainstate, pruning, UTXO, scan, deployment, and validation-adjacent node status commands through JSON-RPC.

This page is not a tested command guide. Commands and examples should not be marked verified until they are run against BitcoinII Core.

## Why this file matters

Blockchain RPC commands are central for:

- Node status checks.
- Exchange deposit monitoring.
- Explorer/index tooling.
- Block and transaction inspection.
- Confirmation checks.
- Pruning and block-data management.
- Chainstate and UTXO inspection.
- Descriptor-based UTXO and block-filter scans.

## Registered commands reviewed

Reviewed command registration places these commands in the `blockchain` RPC category:

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

Reviewed hidden commands include:

- `invalidateblock`
- `reconsiderblock`
- `waitfornewblock`
- `waitforblock`
- `waitforblockheight`
- `syncwithvalidationinterfacequeue`

## Block and chain tip helpers

Reviewed basic chain-tip commands include:

- `getblockcount`
- `getbestblockhash`
- `getdifficulty`
- `getblockhash`

These commands read active chain state under `cs_main` and return height, tip hash, difficulty, or height-to-hash mapping.

## Block header and block JSON helpers

Reviewed helper functions include:

- `GetDifficulty`
- `ComputeNextBlockAndDepth`
- `ParseHashOrHeight`
- `blockheaderToJSON`
- `blockToJSON`

`blockheaderToJSON` returns fields such as hash, confirmations, height, version, merkle root, time, median time, nonce, bits, target, difficulty, chainwork, transaction count, previous block hash, and next block hash when available.

`blockToJSON` extends header JSON with block size, stripped size, weight, and transactions. At higher verbosity it can use undo data to include previous-output information when undo data is available.

## getblock

`getblock` looks up a block by hash, reads raw block data from local storage, and returns either:

- Raw hex when verbosity is zero or false.
- Block JSON with transaction IDs at verbosity one.
- Block JSON with transaction details at higher verbosity.
- Block JSON with previous-output details at the highest reviewed verbosity when undo data can be read.

This command depends on local block availability. It can fail if block data has been pruned or is otherwise unavailable.

## Chain wait and queue sync helpers

Reviewed hidden wait/sync helpers include:

- `waitfornewblock`
- `waitforblock`
- `waitforblockheight`
- `syncwithvalidationinterfacequeue`

The wait helpers use the mining interface tip-wait path. `syncwithvalidationinterfacequeue` waits for the validation-interface queue to catch up to work already queued when the command begins.

## getblockfrompeer

`getblockfrompeer` schedules fetching a block from a specific peer.

Reviewed behavior includes:

- Requiring the block header to be known.
- Rejecting if the block data is already downloaded.
- Avoiding unsafe fetch behavior in prune mode for blocks above the current synced height.
- Scheduling the fetch through peer manager.

## Pruning-related RPC behavior

Reviewed pruning paths include:

- `GetPruneHeight`
- `pruneblockchain`
- pruning fields in `getblockchaininfo`

`GetPruneHeight` searches for the highest pruned block height while avoiding treating the genesis block as pruned only because it lacks undo data.

`pruneblockchain` requires prune mode, checks requested height or timestamp, respects the minimum blocks-to-keep window, calls manual pruning, and returns the last pruned height.

## UTXO set statistics

Reviewed UTXO-stat helpers include:

- `ParseHashType`
- `GetUTXOStats`
- `gettxoutsetinfo`

`gettxoutsetinfo` can report UTXO set statistics at the active tip, and at a specific hash or height when supported by the coin stats index. It supports hash types including `hash_serialized_3`, `muhash`, and `none`.

## Chain status and deployment commands

Reviewed status/deployment commands include:

- `getblockchaininfo`
- `getdeploymentinfo`
- `getchaintips`
- `getchainstates`

`getblockchaininfo` reports chain name, block/header heights, best block hash, bits, target, difficulty, time, median time, verification progress, initial block download status, chain work, disk usage, pruning status, optional signet challenge, and warnings.

`getdeploymentinfo` reports deployment status for consensus changes at the current tip or a requested block hash.

`getchaintips` reports known chain tips, including active, invalid, headers-only, valid-headers, and valid-fork states.

`getchainstates` reports chainstate data, including headers, each chainstate tip, target, difficulty, verification progress, cache sizes, snapshot base hash when applicable, and whether the chainstate is fully validated.

## Descriptor and scan RPCs

Reviewed scan-related commands include:

- `scantxoutset`
- `scanblocks`
- `getdescriptoractivity`

`scantxoutset` scans the UTXO set for descriptor-derived scripts and supports `start`, `abort`, and `status` actions.

`scanblocks` uses block filter indexes to find relevant blocks for descriptor-derived scripts and supports `start`, `abort`, and `status` actions.

`getdescriptoractivity` reports spend and receive activity associated with descriptors for specified blocks, with optional mempool inclusion.

These commands are potentially useful for recovery and service tooling, but examples must be tested before being recommended.

## UTXO snapshot RPCs

Reviewed snapshot-related helpers include:

- `PrepareUTXOSnapshot`
- `WriteUTXOSnapshot`
- `CreateUTXOSnapshot`
- `dumptxoutset`
- `loadtxoutset`

`loadtxoutset` loads a serialized UTXO snapshot and activates a snapshot-based chainstate. Reviewed comments say the snapshot contents are checked by hash, and local services are adjusted while historical block serving is limited during sync.

MoreBC2 has not yet reviewed the full assumeutxo design document or tested snapshot workflows.

## Relationship to other pages

Related pages:

- [RPC overview](../rpc-overview.md)
- [Source atlas: mining RPC](rpc-mining.md)
- [Source atlas: block storage](block-storage.md)
- [Source atlas: validation interface](validation-interface.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming in examples, binary names, and documentation strings.

No upstream comparison has been completed, so this page does not claim whether blockchain RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which blockchain RPC commands should be in exchange/service docs?
- Which commands are safe for public documentation versus developer-only docs?
- Which command examples can be tested against a local BitcoinII node first?
- Which pruning and block-data failures should be documented for operators?
- Which descriptor scan commands are relevant to BitcoinII users without wallet context?
- Does BitcoinII differ from upstream Bitcoin Core in blockchain RPC behavior beyond naming?
- Confirm whether `v29.1.0` differs from current `main` for this file before upgrading status.

## Sources

- Current observed `main` `src/rpc/blockchain.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/rpc/blockchain.cpp
- Current observed `main` `src/rpc/blockchain.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/rpc/blockchain.h
- Current observed `main` `src/rpc/server.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/rpc/server.h
- Current observed `main` `src/node/blockstorage.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/blockstorage.h
- Current observed `main` `src/node/blockstorage.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/blockstorage.cpp
- Current observed `main` `src/validationinterface.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validationinterface.h
- Current observed `main` `src/validationinterface.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validationinterface.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass blockchain RPC review. Commands have not been run; examples, service recommendations, operator guidance, upstream comparison, and release-versus-main comparison remain open.
