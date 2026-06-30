# Developer glossary

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page defines developer-facing terms used throughout MoreBC2 architecture and Source Atlas pages.

The root [Glossary](../../GLOSSARY.md) gives short general definitions. This page is more technical and should grow as source review expands.

## Rules

- Keep definitions neutral.
- Add BitcoinII-specific values only when verified.
- Link to Source Atlas pages where a term is implemented.
- Do not turn glossary entries into long articles.
- Move deeper explanations into encyclopedia or architecture pages.

## Active chain

The branch of the blockchain that the node currently treats as its best valid chain.

Related:

- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Block validation flow](../architecture/block-validation-flow.md)

## Ancestor

In mempool context, an unconfirmed transaction that a later unconfirmed transaction depends on.

Related:

- [Mempool flow](../architecture/mempool-flow.md)
- [Source atlas: txmempool](../developers/source-atlas/txmempool.md)

## Best chain

The valid chain selected by accumulated work and validation state.

A node may know about multiple branches, but only one is active at a time.

## Block file

A disk file that stores serialized block data.

MoreBC2 has not yet reviewed block-storage internals in depth.

## Block index

The node's internal index of known block headers and related metadata.

The block index helps track known branches, validation status, work, and disk positions.

Related:

- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)

## Block lifecycle

The full path a block follows from arrival or creation through header checks, full-block checks, storage, best-chain selection, connection, and notifications.

Related:

- [Life of a block](../architecture/life-of-a-block.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)

## Chainstate

The node's current view of the active chain and spendable coin state.

In Bitcoin-style codebases, chainstate is closely tied to the UTXO set and block validation.

## CheckBlock

A validation function that checks block properties that do not require UTXO state.

Reviewed examples include merkle root checks, coinbase placement, block limits, and context-free transaction checks.

Related:

- [Block validation flow](../architecture/block-validation-flow.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)

## Coin

An internal representation of an unspent transaction output plus metadata such as height and coinbase status.

Related:

- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)

## Coinbase transaction

The first transaction in a block. It creates the block subsidy and collects transaction fees.

Coinbase outputs normally require maturity before they can be spent.

## Coins view

An abstraction over UTXO data.

Coins views can be layered, cached, and updated during validation.

## ConnectBlock

The validation path that applies a block to the current UTXO view.

Reviewed behavior includes transaction input checks, script checks, fee accounting, undo data creation, coinbase payout checks, and UTXO updates.

Related:

- [Block validation flow](../architecture/block-validation-flow.md)
- [Life of a block](../architecture/life-of-a-block.md)

## ConnectTip

The path that connects one block as the next active-chain tip, calling `ConnectBlock` and updating related state when successful.

## Consensus rule

A rule that determines whether a block or transaction is valid.

Consensus rules must not be confused with mempool policy.

## Contextual check

A validation check that depends on chain context, such as height, median time, activation state, or previous block state.

## Descendant

In mempool context, an unconfirmed transaction that depends on an earlier unconfirmed transaction.

Related:

- [Mempool flow](../architecture/mempool-flow.md)

## Difficulty target

The threshold a block hash must be below to satisfy proof-of-work.

Related:

- [Proof-of-work](proof-of-work.md)
- [Difficulty adjustment](difficulty-adjustment.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)

## DisconnectBlock

The validation path that reverses the UTXO effects of a previously connected block using undo data.

Related:

- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)

## Disconnected transaction pool

A temporary pool used during reorganization handling to hold transactions from disconnected blocks so eligible transactions can be reconsidered for mempool entry.

Related:

- [Source atlas: disconnected transactions](../developers/source-atlas/disconnected-transactions.md)

## Finality

Whether a transaction is valid for inclusion at a particular block height or time under locktime rules.

## Fork point

The last common block shared by the current active chain and a competing branch during a reorganization.

## LockPoints

Mempool metadata used to track sequence-lock validity for a transaction.

Related:

- [Source atlas: mempool entry](../developers/source-atlas/mempool-entry.md)

## Mempool policy

Local node rules for accepting, keeping, and relaying unconfirmed transactions.

Policy can be stricter than consensus.

Related:

- [Mempool flow](../architecture/mempool-flow.md)
- [Source atlas: mempool accept](../developers/source-atlas/mempool-accept.md)

## Most-work chain

The candidate chain with the greatest accumulated proof-of-work that is usable by the node.

Most-work selection still depends on validity and available block data.

## Outpoint

A reference to a specific previous transaction output, usually made from a transaction ID and output index.

Transactions spend outpoints.

## Package acceptance

Mempool acceptance of multiple related transactions together rather than one independent transaction at a time.

Related:

- [Source atlas: mempool accept](../developers/source-atlas/mempool-accept.md)

## Policy rule

A local rule that affects mempool acceptance, relay, mining selection, or standardness without necessarily making a transaction consensus-invalid in a block.

## Pruning

Deleting old block data from disk while preserving enough validated state for node operation.

MoreBC2 has not yet reviewed BitcoinII pruning internals in depth.

## Reorganization

A switch from one active chain branch to another usable branch with more accumulated work.

Related:

- [Reorganizations](reorganizations.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)

## Script flags

Flags that control script validation behavior.

Some may be mandatory consensus checks, while others may be policy checks depending on context.

MoreBC2 still needs deeper script-source review.

## Sequence locks

Relative locktime rules that can prevent a transaction from being valid until certain height or time conditions are met.

## Source Atlas

MoreBC2's file-by-file companion to the BitcoinII Core codebase.

Related:

- [Source atlas index](../developers/source-atlas/README.md)

## Tip

The current end block of a chain branch.

The active tip is the tip of the active chain.

## Undo data

Data stored so a node can reverse the UTXO changes made by a connected block during a reorganization or rollback.

Related:

- [Life of a reorganization](../architecture/life-of-a-reorg.md)

## Unbroadcast transaction

A locally accepted transaction that the node tracks for relay until it is believed to have been announced successfully.

Related:

- [Life of a transaction](../architecture/life-of-a-transaction.md)

## UTXO set

The set of all currently unspent transaction outputs.

Bitcoin-style chains use the UTXO set to determine what can be spent.

## Validation interface

A callback system used to notify other components about validation events such as block connection, disconnection, or tip updates.

MoreBC2 has not yet reviewed validation-interface internals in depth.

## Verification

**Status:** Draft
**Primary sources checked:** Existing MoreBC2 architecture and Source Atlas pages
**Notes:** This glossary is a framework. Entries should be expanded and linked as additional source files are reviewed.
