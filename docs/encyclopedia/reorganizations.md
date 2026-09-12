# Reorganizations

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

A blockchain reorganization happens when a node switches from its current active branch to another valid, usable branch with greater accumulated work.

In BitcoinII (BC2), ShockWave changes the required work for post-activation blocks, but **best-chain selection remains based on accumulated chainwork**. ShockWave does not eliminate reorganizations and does not create deterministic finality.

## What a reorganization means

A node can know about more than one valid branch at the same time.

The active branch can change when another candidate becomes the valid usable branch with greater accumulated work. When that happens, the node identifies the fork point, disconnects blocks from the old active branch, restores prior UTXO state using undo data, and connects blocks from the replacement branch.

A simple model is:

```text
competing branch appears
  -> headers / blocks are validated
  -> candidate chainwork is compared
  -> greater-work usable branch wins
  -> old active blocks disconnect to fork point
  -> replacement blocks connect
  -> mempool / wallet / index state is repaired
  -> new active tip becomes visible
```

See [Life of a reorganization](../architecture/life-of-a-reorg.md) for the implementation-oriented walkthrough.

## Height is not the deciding rule

A branch is not selected merely because it has:

- more headers;
- greater block height;
- a newer timestamp;
- lower recent difficulty.

The node still requires a valid usable candidate and compares accumulated work.

This distinction matters especially after ShockWave activation because required work can change block by block.

## ShockWave-era branch validation

Current BitcoinII Core `v31.1.0` activates ShockWave at mainnet height `57750`.

For competing ShockWave-era header branches, current source review shows fork-aware header synchronization preserving branch-specific recent target and MedianTimePast history so candidate difficulty can be checked against the correct branch context.

That header-sync logic helps validate branch-specific required work. It does **not** itself select the active chain.

Related:

- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Fork-aware header synchronization](../developers/source-atlas/headers-sync-v31.md)

## What happens to transactions

When an old active block is disconnected, non-coinbase transactions from that block may be reconsidered under the replacement-chain context.

A transaction can:

- become unconfirmed;
- return to the mempool if it is still valid and policy-acceptable;
- confirm again in the replacement branch;
- disappear from the active chain if it conflicts with replacement-chain state;
- fail current mempool rules even if it had previously been confirmed.

Current v31 source also matters because mempool signature checks use the replay-protection domain for the **next block height**.

## Undo data

BitcoinII Core stores undo information for connected blocks so UTXO changes can be reversed during a reorganization.

Undo handling is one reason reorganization behavior depends on local block/undo availability and why pruning is an operational consideration for node design.

See [Block storage](../developers/source-atlas/block-storage.md).

## Confirmations can go backward

A confirmation count is only valid relative to the current active chain.

If a transaction's inclusion block is disconnected:

- its confirmation count can drop suddenly;
- it can become zero-confirmation / unconfirmed;
- later confirmation depth must be recomputed from the replacement active chain.

That is why MoreBC2 does not describe any finite number of confirmations as mathematically or cryptographically irreversible.

See [Confirmations](confirmations.md).

## Current exchange / service implication

MoreBC2 currently uses **50 confirmations as a provisional baseline for ordinary BC2 exchange deposits**, based on two independently queried venues that explicitly use 50.

That number is:

- an operational baseline;
- not a BitcoinII consensus parameter;
- not a guarantee against deep reorganizations;
- not evidence that every exchange uses the same policy.

For larger or unusual deposits, services should consider cumulative chainwork, tip age, current network/node health, competing-tip activity, and manual review rather than rely only on raw block count.

See [Deposit monitoring](../exchange/deposit-monitoring.md).

## Example

Suppose a transaction is included in block `H` and later reaches 12 confirmations.

If the node then learns of a competing valid branch that forks below `H` and becomes the greater-work usable chain, the node can disconnect the branch containing `H`.

The transaction's old 12-confirmation state no longer applies. The transaction must be evaluated against the replacement chain:

- if it is mined again, it receives a new active-chain confirmation count;
- if it remains valid but unmined, it may return to the mempool;
- if it conflicts with replacement-chain spends, it may no longer be acceptable.

The exact reorganization depth does not by itself tell the entire security story because the work represented by those blocks can differ.

## Reorganization frequency versus reorganization possibility

Source review proves that the software supports chain reorganizations and selects by accumulated work. It does **not** tell us how often BC2 reorganizations occur in practice.

MoreBC2 has not yet published a reliable empirical dataset for:

- reorganization frequency;
- reorganization depth distribution;
- stale-block rate;
- observed competing-tip frequency;
- historical deep-reorg incidents under current ShockWave behavior.

Those would require a separate longitudinal monitoring study rather than inference from source code alone.

## Runtime evidence boundary

The September 11 v31 Windows mainnet test observed current peer/header acquisition and partial block synchronization, but it did **not** intentionally create or observe a controlled reorganization.

Current MoreBC2 evidence therefore supports:

- reorganization and best-work mechanics from release-pinned source review;
- bounded normal current-node synchronization behavior from runtime testing;
- operational confirmation guidance from dated exchange evidence.

Controlled v31 reorg simulation remains open.

## Related pages

- [Confirmations](confirmations.md)
- [Proof-of-work](proof-of-work.md)
- [Difficulty adjustment](difficulty-adjustment.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Disconnected transactions](../developers/source-atlas/disconnected-transactions.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 chain-selection, validation, undo/disconnection, mempool-repair, ShockWave, replay-protection, and fork-aware header-sync reviews plus September 2026 runtime and exchange-policy evidence  
**Notes:** BitcoinII-specific reorganization mechanics are now source-backed. Controlled current-release reorg simulation and empirical reorganization-frequency/depth statistics remain unverified.
