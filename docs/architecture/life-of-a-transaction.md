# Life of a transaction

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page explains the reviewed BitcoinII transaction lifecycle at a high level.

It is an explainer page, not a complete source audit. Technical claims should remain tied to reviewed source-atlas pages.

## Simplified lifecycle

```text
Wallet / caller
  -> creates or prepares transaction
  -> optional dry-run acceptance check
  -> broadcasts transaction
  -> mempool acceptance
  -> local mempool storage
  -> relay to peers
  -> candidate block assembler selects transaction
  -> transaction appears in a block
  -> block is accepted and connected
  -> transaction becomes confirmed
  -> later confirmations build on top
```

## Step 1: Transaction creation

A wallet or external caller creates a transaction that spends one or more previous outputs and creates new outputs.

Reviewed paths now include:

- Wallet spend and PSBT RPCs for wallet-backed construction, funding, signing, and sending.
- Raw transaction RPCs for non-wallet transaction creation, decoding, explicit-key signing, and PSBT workflows.

MoreBC2 has reviewed major wallet and raw transaction RPC surfaces, but lower-level wallet internals and GUI transaction construction still need deeper source review.

## Step 2: Optional dry-run acceptance check

Reviewed mempool RPC behavior includes `testmempoolaccept`, which tests whether one or more raw transactions would be accepted by local mempool rules without submitting them.

This is useful for future service documentation, but examples remain untested.

Important distinction:

- `testmempoolaccept` is a dry-run acceptance check.
- `sendrawtransaction` is a live broadcast path.

## Step 3: Broadcast path

The reviewed `node::BroadcastTransaction` path can be called by RPC or wallet code.

Reviewed behavior includes:

- Checking whether the transaction is already confirmed in the active chain.
- Checking whether a transaction with the same txid is already in the mempool.
- Optionally running test acceptance first when a maximum transaction fee is specified.
- Calling `ProcessTransaction` for mempool submission.
- Adding the transaction to the unbroadcast set when relay is requested.
- Optionally waiting for validation-interface callbacks.
- Relaying the transaction through peer manager when relay is requested.

Reviewed mempool RPC behavior also covers `sendrawtransaction`, package submission, and mempool inspection commands.

## Step 4: Mempool acceptance

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

## Step 5: Mempool storage

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
- Unbroadcast state where applicable.

These structures let the node relay, sort, evict, inspect, and later remove transactions efficiently.

Reviewed RPC commands expose parts of this state through `getrawmempool`, `getmempoolentry`, `getmempoolancestors`, `getmempooldescendants`, `gettxspendingprevout`, and `getmempoolinfo`.

## Step 6: Relay

The reviewed broadcast path relays through peer manager when relay is requested.

The first-pass P2P transaction relay source slice now documents:

- transaction relay setup from handshake
- transaction inventory announcements
- txid versus wtxid relay behavior
- transaction relay being skipped during initial block download
- full `tx` message handling
- interaction with the transaction download manager
- valid and invalid transaction post-processing
- orphan transaction reconsideration
- related `mempool`, bloom filter, `feefilter`, and `notfound` behavior

This still does not mean network propagation is guaranteed. Relay behavior remains policy-bound, peer-dependent, and not locally tested by MoreBC2.

## Step 7: Mining and block inclusion

A candidate block assembler may select transactions from the mempool for inclusion in a candidate block.

MoreBC2 has reviewed first-pass candidate-template assembly and mining RPC paths. The reviewed template path uses mempool package selection and fee/ancestor/descendant data, but external mining software and live pool behavior remain separate ecosystem questions.

## Step 8: Block acceptance

Once a transaction appears in a block, the block follows the reviewed block lifecycle:

```text
ProcessNewBlock
  -> AcceptBlockHeader
  -> AcceptBlock
  -> ReceivedBlockTransactions
  -> ActivateBestChain
  -> ConnectBlock
```

During `ConnectBlock`, transaction inputs are checked against the UTXO set, input verification checks run when required, fees are accumulated, and the coinbase payout is checked against fees plus subsidy.

## Step 9: Confirmation

When the block containing the transaction becomes part of the active best chain, the transaction becomes confirmed.

Additional blocks built on top of that block increase the transaction's confirmation depth.

Wallet transaction-history RPCs such as `listsinceblock` and `gettransaction` can surface confirmation and reorg-related wallet history, but service examples still need local testing.

## Step 10: Reorg behavior

During a reorganization, a confirmed transaction can become unconfirmed again if its block is disconnected from the active chain.

Reviewed reorg behavior includes:

- Transactions from disconnected blocks can be held in `DisconnectedBlockTransactions`.
- Eligible non-coinbase transactions can be reconsidered for mempool re-addition.
- Transactions confirmed again in the new branch are removed from the disconnected pool.
- Transactions that are invalid, non-final, or spending immature coinbase outputs after the reorg can be removed.

## What is not fully reviewed yet

- Lower-level wallet transaction construction internals.
- Transaction request scheduling and send-loop behavior.
- Fee estimation.
- Replacement policy in full detail.
- Tested service-safe examples for transaction lookup, dry-run checks, and broadcast.

## Related pages

- [Mempool flow](mempool-flow.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Source atlas: wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet transaction history RPC](../developers/source-atlas/wallet-transactions-rpc.md)
- [Source atlas: raw transaction RPC](../developers/source-atlas/rpc-rawtransaction.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)
- [Source atlas: mempool accept](../developers/source-atlas/mempool-accept.md)
- [Source atlas: txmempool](../developers/source-atlas/txmempool.md)
- [Source atlas: net processing transaction relay](../developers/source-atlas/net-processing-transaction-relay.md)
- [Source atlas: block template assembly](../developers/source-atlas/miner.md)
- [Source atlas: block lifecycle](../developers/source-atlas/block-acceptance.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This explainer is built from reviewed wallet RPC, raw transaction RPC, mempool RPC, mempool acceptance, transaction acceptance, P2P transaction relay, block-template, block acceptance, and reorg notes. Lower-level wallet internals, transaction send-loop behavior, fee estimation, and tested service examples still need deeper review.
