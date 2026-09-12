# Life of a block

**Category:** Architecture
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page explains the current BitcoinII block lifecycle at a high level: candidate construction, header and block validation, storage, best-chain activation, UTXO connection, undo data, notifications, confirmations, and possible later disconnection during a reorganization.

The current release baseline is BitcoinII Core `v31.1.0`.

## Simplified lifecycle

```text
Candidate block / peer / disk import
  -> block arrives at node
  -> header is checked
       -> proof of work
       -> ShockWave next-work requirement where active
       -> contextual header checks
  -> full block checks run
  -> contextual and BitcoinII-specific consensus checks run
  -> block data is stored
  -> block index metadata is updated
  -> candidate chain is evaluated by accumulated work
  -> block is connected if it belongs on the active best-work chain
  -> UTXO state changes and undo data is recorded
  -> active tip changes
  -> validation notifications are emitted
```

## Step 1: Candidate block creation

A candidate block is assembled from chain state, mempool contents, fee/package information, and coinbase output information.

Current v31 mining review establishes an important BitcoinII-specific rule: **candidate time can affect required work under ShockWave**. If candidate `nTime` changes, mining/template code must obtain the corresponding `nBits` through the production next-work calculation rather than assume difficulty stays fixed between long retarget intervals.

See [Source atlas: block template assembly](../developers/source-atlas/miner.md) and [ShockWave v31](../developers/source-atlas/shockwave-v31.md).

## Step 2: Block arrival

A block may arrive from:

- network peers;
- disk import;
- reindex;
- local block submission.

The general full-block entry path remains centered on `ProcessNewBlock`. P2P block/header relay is a separate transport path from validation itself.

## Step 3: Header checks

Headers are accepted through the validation/header-index path.

Current checks include proof of work, previous-header context, difficulty, timestamps, and other contextual rules.

For post-`57750` mainnet blocks, the difficulty requirement comes from ShockWave. Competing ShockWave-era header branches must carry their own recent timing/target history so candidate difficulty can be evaluated against the correct branch context.

See [Fork-aware header synchronization v31](../developers/source-atlas/headers-sync-v31.md).

## Step 4: Context-free and contextual block checks

The block-validation path checks structural and contextual properties such as:

- merkle-root consistency;
- size/weight limits;
- coinbase placement;
- transaction structure;
- finality and witness-related rules;
- other release-specific consensus conditions.

From mainnet height `57750`, BitcoinII adds consensus-level data restrictions. The current source review covers OP_RETURN count/size, actual `OP_13` opcodes in OP_RETURN scripts, bare multisig, Taproot annex data, oversized script-path tapscripts, and semantic Ordinals inscription envelopes.

See [Consensus data restrictions v31](../developers/source-atlas/data-restrictions-v31.md).

## Step 5: Signature and input validation

During full block connection, transaction inputs are checked against the UTXO set and scripts/signatures are verified under the consensus context for that block.

From height `57750`, BC2 replay protection supplies the configured signature-hash domain `0x01324342` to the relevant signing/verification path. The domain is contextual; it is not serialized as a normal transaction field.

See [Replay protection v31](../developers/source-atlas/replay-protection-v31.md).

## Step 6: Storage and block-index update

Accepted block data is written to block storage and associated with block-index metadata. The storage layer records file positions and availability state so validation can later retrieve blocks and undo data.

Storage is not itself consensus validation. It persists data used by validation and chainstate.

## Step 7: Best-chain selection

`ActivateBestChain` and related logic evaluate usable candidates by **accumulated work**.

ShockWave determines required work for each post-activation block, but it does not replace best-work chain selection. Height alone is not the deciding rule, and a branch is not selected merely because its recent difficulty is lower or because it has more headers.

## Step 8: UTXO connection

When a block becomes part of the active chain, the connection path:

- checks referenced inputs and spendability;
- verifies scripts/signatures under current consensus rules;
- accumulates fees;
- applies sequence/finality constraints where relevant;
- updates the coins view;
- checks the coinbase amount against subsidy plus fees;
- advances the coins-view best block.

## Step 9: Undo data

When spent outputs are removed from the active UTXO set, the node stores enough undo information to restore them if the block is later disconnected.

Undo data is fundamental to safe chain reorganization. It lets the node reverse previously connected state rather than reconstructing old UTXO contents by guesswork.

## Step 10: Tip update and notifications

After successful connection, validation and chainstate paths update the active tip and emit notifications consumed by wallets, indexes, UI components, and other subscribers.

Subscriber callbacks should not be treated as a universal total ordering across all consumers.

## Step 11: Confirmations

A transaction becomes confirmed when its containing block is on the active best-work chain. Additional active-chain blocks increase its confirmation depth.

A confirmation count is an operational measure, not cryptographic finality. A later competing chain with more accumulated work can still disconnect previously confirmed blocks.

For exchange/deposit operations, MoreBC2 therefore treats confirmation count together with chainwork, value, and network health rather than describing any finite count as irreversible.

## Step 12: Reorganization possibility

A connected block can later be disconnected if a competing valid branch becomes the best-work chain.

That lifecycle is covered in [Life of a reorganization](life-of-a-reorg.md).

## Runtime evidence boundary

The September 11 Windows `v31.1.0` mainnet test directly observed current header acquisition and partial block validation during initial synchronization, then a clean restart against retained chain state. It did not complete initial block download or independently exercise a post-activation mainnet block lifecycle from candidate creation through connection.

Accordingly, the complete lifecycle remains primarily source-backed, with bounded runtime support for startup/synchronization behavior.

## Related pages

- [Block validation flow](block-validation-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)
- [Source atlas: block storage](../developers/source-atlas/block-storage.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Source atlas: block template assembly](../developers/source-atlas/miner.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)
- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 block-validation, mining, storage, chain-selection, ShockWave, replay-protection, data-restriction, and header-sync reviews plus bounded September mainnet runtime evidence  
**Notes:** The lifecycle is current at the architecture level. Full-sync runtime coverage, controlled post-activation block vectors, deep compact-block behavior, pruning failure recovery, and exhaustive subscriber behavior remain open.
