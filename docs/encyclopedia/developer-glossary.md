# Developer glossary

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

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

Related:

- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Block file cursor

Bookkeeping used by the block-storage layer to track the current block file and related undo-file progress.

Related:

- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Block index

The node's internal index of known block headers and related metadata.

The block index helps track known branches, validation status, work, and disk positions.

Related:

- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Block lifecycle

The full path a block follows from arrival or creation through header checks, full-block checks, storage, best-chain selection, connection, and notifications.

Related:

- [Life of a block](../architecture/life-of-a-block.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)

## BlockTreeDB

The block index database wrapper used for block metadata, block-file metadata, flags, and reindex state.

Related:

- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Chainstate

The node's current view of the active chain and spendable coin state.

In Bitcoin-style codebases, chainstate is closely tied to the UTXO set and block validation.

## CheckBlock

A validation function that checks block properties that do not require UTXO state.

Reviewed examples include merkle root checks, coinbase placement, block limits, and context-free transaction checks.

Related:

- [Block validation flow](../architecture/block-validation-flow.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)

## CheckTransaction

A context-independent transaction check helper.

Reviewed behavior includes non-empty inputs and outputs, output value range checks, duplicate input rejection, coinbase scriptSig size checks, and null previous-output rejection for non-coinbase transactions.

Related:

- [Source atlas: transaction consensus files](../developers/source-atlas/transaction-consensus.md)

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

Reviewed behavior includes transaction input checks, input verification checks, fee accounting, undo data creation, coinbase payout checks, and UTXO updates.

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

The validation path that restores the UTXO view to the previous block using undo data.

Related:

- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)

## Disconnected transaction pool

A temporary pool used during reorganization handling to hold transactions from disconnected blocks so eligible transactions can be reconsidered for mempool entry.

Related:

- [Source atlas: disconnected transactions](../developers/source-atlas/disconnected-transactions.md)

## Finality

Whether a transaction is valid for inclusion at a particular block height or time under locktime rules.

Related:

- [Source atlas: transaction consensus files](../developers/source-atlas/transaction-consensus.md)

## Flat file

A sequential disk file used to store block or undo data.

Related:

- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

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

Related:

- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Reindex

A local process that rebuilds block-index state from stored block files.

Related:

- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Reorganization

A switch from one active chain branch to another usable branch with more accumulated work.

Related:

- [Reorganizations](reorganizations.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)

## Script flags

Flags that control transaction input verification behavior.

Some may be mandatory consensus checks, while others may be policy checks depending on caller context.

Related:

- [Source atlas: script engine](../developers/source-atlas/script-interpreter.md)

## Sequence locks

Relative locktime rules that can prevent a transaction from being valid until certain height or time conditions are met.

Related:

- [Source atlas: transaction consensus files](../developers/source-atlas/transaction-consensus.md)

## Source Atlas

MoreBC2's file-by-file companion to the BitcoinII Core codebase.

Related:

- [Source atlas index](../developers/source-atlas/README.md)

## Tip

The current end block of a chain branch.

The active tip is the tip of the active chain.

## Undo data

Data stored so a node can return the UTXO view to an earlier state during a reorganization.

Related:

- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Undo file

A disk file that stores undo data for connected blocks.

Related:

- [Source atlas: block storage](../developers/source-atlas/block-storage.md)

## Unbroadcast transaction

A locally accepted transaction that the node tracks for relay until it is believed to have been announced successfully.

Related:

- [Life of a transaction](../architecture/life-of-a-transaction.md)

## UTXO set

The set of all currently unspent transaction outputs.

Bitcoin-style chains use the UTXO set to determine what can be spent.

## Validation interface

A callback system used to notify other components about validation events such as block connection, block rollback, mempool changes, or tip updates.

Related:

- [Source atlas: validation interface](../developers/source-atlas/validation-interface.md)

## Verification

**Status:** Draft
**Primary sources checked:** Existing MoreBC2 architecture and Source Atlas pages
**Notes:** This glossary is a framework. Entries should be expanded and linked as additional source files are reviewed.
