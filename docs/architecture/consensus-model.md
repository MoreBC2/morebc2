# Consensus model

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page explains how MoreBC2 currently frames BitcoinII consensus at a high level.

It is not a complete consensus specification. It is a reader guide that connects source-backed documentation already reviewed in MoreBC2.

## Core idea

Consensus rules are the rules every fully validating node must apply the same way to agree on which blocks and transactions are valid.

Mempool policy is different. Policy rules affect what a local node accepts, keeps, relays, or mines before confirmation. A transaction may be consensus-valid in a block but still fail local mempool policy.

## Simplified model

```text
Block header rules
  -> proof-of-work
  -> previous-block link
  -> difficulty target
  -> timestamp/context rules

Block body rules
  -> merkle root
  -> coinbase placement
  -> block size/weight limits
  -> transaction structure checks

Transaction input rules
  -> referenced outputs exist
  -> values are in range
  -> inputs are spendable
  -> fees are non-negative
  -> input verification checks pass when required

Mempool policy layer
  -> standardness and relay rules
  -> ancestor/descendant limits
  -> replacement and package checks
  -> dry-run acceptance and live submission surfaces

Chain selection
  -> valid blocks only
  -> most accumulated work among usable candidates
  -> active chain may reorganize
```

## Consensus vs policy

### Consensus

Consensus decides whether a block or transaction is valid as part of the chain.

Reviewed examples include:

- Proof-of-work target checks.
- Difficulty retarget checks.
- Block merkle root checks.
- Coinbase placement rules.
- Context-independent transaction checks.
- Transaction finality and sequence-lock helpers.
- Transaction input checks during block connection.
- Script engine first-pass behavior.
- Coinbase payout not exceeding subsidy plus fees.
- UTXO updates during block connection.

### Policy

Policy decides whether an unconfirmed transaction is acceptable to a local node before it appears in a block.

Reviewed examples include:

- Mempool prechecks.
- Replacement checks.
- Package mempool checks.
- Policy script checks.
- Ancestor and descendant limits.
- Mempool size limiting and expiry.
- Dry-run acceptance behavior exposed through mempool RPC.

Policy can be stricter than consensus.

## Header consensus

Reviewed header-related behavior includes:

- `CheckProofOfWork` rejects invalid proof-of-work targets.
- `GetNextWorkRequired` and `CalculateNextWorkRequired` define the reviewed difficulty retarget path.
- `AcceptBlockHeader` checks proof-of-work, previous-header availability, invalid-parent state, difficulty, timestamp context, checkpoints when enabled, and version conditions after relevant deployments.

MoreBC2 currently documents BitcoinII as using Bitcoin-style 2016-block retargeting based on reviewed `src/pow.cpp` and `chainparams.cpp` notes.

MoreBC2 does not currently document Dark Gravity Wave as implemented.

## Block consensus

Reviewed block-level validation includes:

- Context-free block checks through `CheckBlock`.
- Contextual block checks through `ContextualCheckBlock`.
- Full block acceptance through `AcceptBlock`.
- Best-chain activation through `ActivateBestChain`.
- Block connection through `ConnectBlock`.
- Undo-data writing for later disconnection.

A block must pass both structural checks and contextual checks before it can safely move toward active-chain connection.

## Transaction consensus layers

Reviewed transaction consensus helpers are split into two broad groups.

### Context-independent transaction checks

`CheckTransaction` checks transaction shape without depending on chain or mempool state.

Reviewed checks include:

- Non-empty inputs and outputs.
- Size limit against maximum block weight.
- Output value ranges.
- Total output value range.
- Duplicate input rejection.
- Coinbase scriptSig length.
- Null previous-output rejection for non-coinbase transactions.

### Context-dependent transaction checks

`tx_verify` helpers cover finality, sequence locks, operation-count accounting, and UTXO-input checks.

Reviewed checks include:

- `IsFinalTx` locktime behavior.
- BIP68-style sequence-lock calculation and evaluation.
- Operation-cost accounting helpers.
- `Consensus::CheckTxInputs` input availability, coinbase maturity, input value ranges, input/output value comparison, and fee calculation.

MoreBC2 now has a first-pass script-engine source review, but full mandatory-vs-policy flag mapping remains open.

## Transaction consensus inside blocks

The reviewed `ConnectBlock` path checks transaction effects against the UTXO view.

Reviewed behavior includes:

- Input checks through `Consensus::CheckTxInputs`.
- Money range and fee checks.
- Sequence-lock checks.
- Input verification checks when enabled.
- Operation-count accounting.
- Undo data creation.
- Updating the coins view.
- Checking that the coinbase output value does not exceed fees plus subsidy.

This is where transactions move from being merely included in a block object to changing the active UTXO set.

## UTXO model

BitcoinII follows a Bitcoin-style UTXO model.

The active chain determines which outputs are unspent.

When a block is connected:

- Spent outputs are consumed.
- New outputs are added.
- The coins view moves forward.

When a block is disconnected during a reorganization:

- Outputs created by the disconnected block are removed.
- Previously spent outputs are restored from undo data.
- The coins view moves backward.

## Mempool policy and service surfaces

Reviewed mempool and RPC work now gives MoreBC2 a clearer boundary between consensus, policy, and service-facing commands.

Relevant reviewed surfaces include:

- `testmempoolaccept` for dry-run mempool acceptance.
- `sendrawtransaction` for live transaction submission.
- `getrawmempool`, `getmempoolentry`, ancestor/descendant queries, and mempool summary RPCs for inspection.
- Package acceptance and experimental package submission notes.

These are policy/service surfaces, not consensus definitions. Public examples remain untested until local command records exist.

## Chain selection

The reviewed best-chain path selects a usable most-work candidate and then connects or disconnects blocks to make that candidate active.

Reviewed behavior includes:

- `FindMostWorkChain` selecting a candidate.
- Finding the fork point.
- Disconnecting old active blocks when needed.
- Connecting candidate branch blocks.
- Updating the active tip.

The node does not switch to an invalid branch just because it has more apparent work. Candidate usability and validation status matter.

## Reorganizations

Reorganizations are part of the consensus model because they are how a node switches active branches.

A reorg can make previously confirmed transactions unconfirmed again.

Reviewed behavior includes:

- Disconnection through `DisconnectTip` and `DisconnectBlock`.
- Temporary storage of transactions from disconnected blocks.
- Reconnection of the new branch.
- Reconsideration of eligible disconnected transactions for mempool entry.
- Wallet transaction-history RPC surfaces that can expose some wallet-visible reorg effects.

## Soft-fork deployment notes

MoreBC2 has documented some activation heights and deployment parameters from `chainparams.cpp`, including BIP-related heights and Taproot deployment parameters.

However, live-chain activation state and release-branch matching still need verification.

Do not treat the presence of a parameter in source as a complete deployment-status explanation unless the relevant validation path and live network state have been reviewed.

## What is not fully reviewed yet

- Full mandatory vs policy script-flag separation.
- Deployment state transitions in depth.
- Full checkpoint behavior beyond current reviewed notes.
- Full pruning failure and recovery behavior.
- Release-branch matching against documented `main` source values.
- Upstream comparison for transaction consensus helpers.
- Tested examples for policy and RPC behavior.

## Related pages

- [Consensus overview](../documentation/consensus-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Mempool flow](mempool-flow.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)
- [Source atlas: transaction consensus files](../developers/source-atlas/transaction-consensus.md)
- [Source atlas: script engine](../developers/source-atlas/script-interpreter.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page summarizes reviewed consensus-adjacent material from chain parameters, proof-of-work, transaction consensus helpers, script first-pass review, validation, block connection, mempool policy, RPC service surfaces, and reorg documentation. It is not a complete consensus specification.
