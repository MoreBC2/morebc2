# Life of a reorganization

**Category:** Architecture
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page explains the BitcoinII chain-reorganization lifecycle at a high level.

A reorganization happens when the node switches from the current active branch to another valid, usable branch with greater accumulated work.

ShockWave changes how required work is calculated for post-activation blocks, but it does not replace accumulated-work chain selection and does not eliminate reorg risk.

## Simplified lifecycle

```text
Competing branch becomes known
  -> headers/blocks are validated in branch context
  -> node finds usable most-work candidate
  -> fork point is found
  -> old active blocks are disconnected
  -> undo data restores previous UTXO state
  -> disconnected transactions are held temporarily
  -> replacement branch blocks connect
  -> eligible old-branch transactions are reconsidered
  -> mempool is repaired under the new active-chain context
  -> active tip changes
  -> wallets/indexes/services observe the new state
```

## Step 1: Competing branch appears

A node may learn about a competing branch through headers and blocks.

For ShockWave-era branches, current v31 header synchronization preserves branch-specific recent target and median-time-past context so candidate difficulty can be evaluated against that branch rather than the active chain's history.

Learning about a branch does not make it active. It still must pass validation and become the best usable accumulated-work candidate.

## Step 2: Candidate selection

The best-chain path evaluates candidates by accumulated chain work.

A branch is not selected merely because it has:

- more headers;
- greater height;
- a lower recent difficulty;
- a newer timestamp.

It must remain valid and usable and beat the active chain on the node's accumulated-work selection rules.

## Step 3: Fork point

The node identifies the last common block shared by the active chain and the candidate branch.

Blocks above that point on the old branch must be disconnected before replacement-branch blocks can become active.

## Step 4: Disconnect old active blocks

The disconnect path reads active blocks and undo information, reverses UTXO effects, moves the active tip backward, and stages eligible disconnected transactions for later reconsideration.

Reorg handling depends on required block and undo data being available locally. Pruning and missing historical data therefore matter operationally.

## Step 5: Restore UTXO state

Undo data restores outputs spent by the disconnected block while removing outputs that block had created.

This brings the coins view back to the fork-point state before replacement blocks are connected.

## Step 6: Hold disconnected transactions

Non-coinbase transactions from disconnected blocks may still be valid on the replacement branch.

BitcoinII Core temporarily tracks them so they can either:

- be confirmed again in replacement blocks;
- return to the mempool if still valid and policy-acceptable;
- be dropped if they conflict with the new chain or fail current rules.

## Step 7: Connect the replacement branch

Replacement blocks are connected through the ordinary current validation path.

For current v31 mainnet this means that block/header difficulty, replay-protection signature domains, and consensus data restrictions are evaluated according to the candidate block's height and branch context.

A reorg does not bypass BitcoinII-specific activation rules.

## Step 8: Reprocess old-branch transactions

After disconnection/reconnection, mempool repair reconsideres eligible transactions from the old branch.

The reviewed path includes:

- skipping coinbase transactions;
- attempting re-addition through the normal acceptance path;
- removing transactions that are no longer valid or final;
- repairing ancestor/descendant relationships;
- removing transactions spending immature coinbase outputs;
- reapplying mempool size limits.

Current v31 source also matters here because mempool signature checks use the replay-protection domain for the **next block height**.

## Step 9: New active tip and notifications

After successful replacement-branch connection, the node updates the active tip and emits block/mempool notifications consumed by wallets, indexes, UI components, and other subscribers.

Wallet or service state can therefore change after a reorg even when the underlying transaction bytes did not change.

## User and service meaning

During a reorg:

- a confirmed transaction can become unconfirmed;
- a transaction can return to the mempool if still valid;
- a transaction can confirm again on the replacement branch;
- a transaction can disappear if it conflicts with the new chain or fails current acceptance rules;
- confirmation depth can decrease suddenly.

This is why no finite confirmation count should be described as cryptographically irreversible.

## Exchange/deposit interpretation

MoreBC2's current exchange guidance uses a provisional **50-confirmation baseline for ordinary deposits**, supported by observed active exchange settings.

That number is operational policy, not a consensus parameter. Higher-value or unusual deposits should consider cumulative chainwork since the deposit's parent block, network health, and manual review rather than blindly replacing the baseline with another universal confirmation count.

See [Deposit monitoring](../exchange/deposit-monitoring.md).

## Runtime evidence boundary

MoreBC2 has current source coverage for best-chain activation, disconnection, undo handling, disconnected transactions, mempool repair, ShockWave, replay protection, and fork-aware header synchronization.

The September 11 mainnet runtime test observed normal current peer/header acquisition and partial block synchronization but did not intentionally create or observe a controlled reorganization. Deep current-release reorg behavior therefore remains source-backed rather than directly reproduced by MoreBC2.

## What remains open

- Controlled v31 competing-branch/reorg simulation.
- Reorg behavior spanning activation boundaries.
- Wallet-specific reorg behavior below the reviewed RPC surface.
- Index-specific reorg behavior.
- Full pruning/undo failure scenarios.
- End-to-end exchange deposit handling under a simulated reorg.

## Related pages

- [Block validation flow](block-validation-flow.md)
- [Life of a block](life-of-a-block.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Mempool flow](mempool-flow.md)
- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Disconnected transactions](../developers/source-atlas/disconnected-transactions.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 chain-selection, validation, undo/disconnection, mempool-reorg, ShockWave, replay-protection, and header-sync reviews plus September runtime evidence  
**Notes:** The architecture is current, but MoreBC2 has not yet reproduced a controlled v31 reorganization or activation-boundary reorg scenario.
