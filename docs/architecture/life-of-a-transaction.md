# Life of a transaction

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page explains the reviewed BitcoinII transaction lifecycle at a high level.

It is an explainer page, not a complete source audit. Technical claims should remain tied to reviewed source-atlas pages.

## Simplified lifecycle

```text
Wallet / caller
  -> creates transaction
  -> broadcasts transaction
  -> mempool acceptance
  -> local mempool storage
  -> relay to peers
  -> miner/block assembler selects transaction
  -> transaction appears in a block
  -> block is accepted and connected
  -> transaction becomes confirmed
  -> later confirmations build on top
```

## Step 1: Transaction creation

A wallet or external caller creates a transaction that spends one or more previous outputs and creates new outputs.

MoreBC2 has not yet audited wallet internals, so this page does not document wallet transaction construction in detail.

## Step 2: Broadcast path

The reviewed `node::BroadcastTransaction` path can be called by RPC or wallet code.

Reviewed behavior includes:

- Checking whether the transaction is already confirmed in the active chain.
- Checking whether a transaction with the same txid is already in the mempool.
- Optionally running test acceptance first when a maximum transaction fee is specified.
- Calling `ProcessTransaction` for mempool submission.
- Adding the transaction to the unbroadcast set when relay is requested.
- Optionally waiting for validation-interface callbacks.
- Relaying the transaction through peer manager when relay is requested.

## Step 3: Mempool acceptance

Mempool acceptance is handled through the reviewed `MemPoolAccept` path.

A simplified single-transaction acceptance path is:

```text
AcceptSingleTransaction
  -> PreChecks
  -> ReplacementChecks, if conflicts are being replaced
  -> PolicyScriptChecks
  -> ConsensusScriptChecks
  -> Finalize
  -> TransactionAddedToMempool notification
```

Important distinction:

- Consensus rules decide whether a transaction is valid in a block.
- Mempool policy decides whether a node will keep and relay it before it is mined.

A transaction may be consensus-valid but still rejected from the mempool for policy reasons.

## Step 4: Mempool storage

If accepted, the transaction is stored in `CTxMemPool`.

The mempool tracks:

- Transaction ID and witness transaction ID indexes.
- Direct parents and children.
- Ancestor and descendant accounting.
- Entry time.
- Modified fees.
- Lock points.
- Sigop cost.
- Memory usage.

These structures let the node relay, sort, evict, and later remove transactions efficiently.

## Step 5: Relay

The reviewed broadcast path relays through peer manager when relay is requested.

MoreBC2 has not yet audited the full P2P relay path, so this page does not document peer announcement, inventory, or compact-block behavior in detail.

## Step 6: Mining and block inclusion

A miner or block assembler may select transactions from the mempool for inclusion in a candidate block.

MoreBC2 has not yet audited mining/block-template source in detail. The mempool source does show fee and ancestor/descendant accounting that are relevant to mining selection, but exact block-template behavior remains a future review task.

## Step 7: Block acceptance

Once a transaction appears in a block, the block follows the reviewed block lifecycle:

```text
ProcessNewBlock
  -> AcceptBlockHeader
  -> AcceptBlock
  -> ReceivedBlockTransactions
  -> ActivateBestChain
  -> ConnectBlock
```

During `ConnectBlock`, transaction inputs are checked against the UTXO set, scripts are checked when required, fees are accumulated, and the coinbase payout is checked against fees plus subsidy.

## Step 8: Confirmation

When the block containing the transaction becomes part of the active best chain, the transaction becomes confirmed.

Additional blocks built on top of that block increase the transaction's confirmation depth.

## Step 9: Reorg behavior

During a reorganization, a confirmed transaction can become unconfirmed again if its block is disconnected from the active chain.

Reviewed reorg behavior includes:

- Transactions from disconnected blocks can be held in `DisconnectedBlockTransactions`.
- Eligible non-coinbase transactions can be reconsidered for mempool re-addition.
- Transactions confirmed again in the new branch are removed from the disconnected pool.
- Transactions that are invalid, non-final, or spending immature coinbase outputs after the reorg can be removed.

## What is not fully reviewed yet

- Wallet transaction construction.
- P2P transaction relay internals.
- Mining/block-template transaction selection.
- Fee estimation.
- Replacement policy in full detail.
- RPC transaction submission paths beyond reviewed broadcast notes.

## Related pages

- [Mempool flow](mempool-flow.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Source atlas: mempool accept](../developers/source-atlas/mempool-accept.md)
- [Source atlas: txmempool](../developers/source-atlas/txmempool.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This explainer page is built from reviewed mempool, transaction acceptance, block acceptance, and reorg notes. Wallet, P2P relay, and mining selection still need deeper source review.
