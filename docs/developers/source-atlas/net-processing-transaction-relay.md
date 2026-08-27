# Net processing transaction relay

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of transaction relay behavior in:

- `src/net_processing.cpp`
- `src/net_processing.h`

This is a focused slice of `net_processing`, not a complete review of mempool policy, wallet sending, raw transaction RPC, package relay, peer eviction, or block relay.

## Why this area matters

Transaction relay is the P2P-facing path where peers announce, request, send, accept, reject, and re-announce transactions.

For MoreBC2, this matters because wallet, exchange, and service documentation should keep a clear boundary between:

- wallet commands that create or submit transactions
- RPC dry-run checks
- local mempool acceptance
- P2P transaction relay
- final confirmation in blocks

## Transaction-relay setup from handshake

The handshake review showed that transaction relay state is not automatically enabled for every peer.

Observed setup rules include:

- transaction relay state is not initialized for outbound block-relay-only connections
- transaction relay state is not initialized for outbound feeler connections
- transaction relay state depends on the peer's relay preference or local `NODE_BLOOM` offering
- peers can use txid or wtxid announcement behavior depending on `wtxidrelay` negotiation
- transaction reconciliation signaling is only considered when enabled and when transaction-relay conditions allow it

## INV handling for transaction announcements

The reviewed `inv` path handles both block inventory and transaction inventory.

Observed transaction behavior includes:

- inventory messages larger than `MAX_INV_SZ` trigger misbehavior handling
- if incoming transaction announcements should be rejected, a peer sending transaction inventory can be disconnected
- `wtxidrelay` setting controls whether txid or wtxid inventory is accepted from a peer
- accepted transaction inventory is converted into a generic transaction identifier
- the transaction is marked known for that peer
- during initial block download, transaction announcements are not added to the transaction download manager
- outside initial block download, transaction announcements are added through the transaction download manager
- unknown inventory types are logged rather than treated as known behavior

This page does not fully review transaction request scheduling or the send-loop logic that decides when to fetch announced transactions.

## TX message handling

The reviewed `tx` path handles full transactions sent by peers.

Observed behavior includes:

- transactions received when incoming transactions are rejected can disconnect the peer
- transactions received during initial block download are ignored early because the node may not have enough context to validate them
- the transaction is read with witness-aware serialization
- both txid and wtxid are calculated
- the hash recorded as known for the peer depends on the peer's `wtxidrelay` setting
- the transaction download manager decides whether the transaction should be validated immediately, deferred, or linked to a package path
- force-relay permission can trigger additional relay behavior for transactions already in the mempool
- ordinary transaction validation is passed to chainstate transaction processing
- valid results go through `ProcessValidTx`
- invalid results go through `ProcessInvalidTx`, which can return a package to evaluate
- package results are processed with `ProcessPackageResult`

## Valid transaction handling observed

`ProcessValidTx` performs post-acceptance handling after a transaction is accepted by mempool processing.

Observed behavior includes:

- notifying the transaction download manager that a transaction was accepted
- logging accepted transaction details
- relaying the accepted transaction through `RelayTransaction`
- adding replaced transactions to the extra transaction buffer used for compact block reconstruction

This page does not document every mempool policy rule. It only records the net-processing side after mempool acceptance.

## Invalid transaction handling observed

`ProcessInvalidTx` records the rejected transaction result and interacts with the transaction download manager.

Observed behavior includes:

- logging rejection details
- asking the transaction download manager to record the mempool-rejected transaction
- optionally adding small rejected/replaced/orphan-adjacent transactions to compact-block extra transaction storage
- marking unique parents as known for the peer when appropriate
- calling transaction-related peer punishment logic for validation results that warrant it
- returning a package candidate when the transaction download manager indicates one should be evaluated

## Orphan transaction reconsideration observed

`ProcessOrphanTx` reviews orphan transactions selected by the transaction download manager for reconsideration.

Observed behavior includes:

- processing reconsidered orphan transactions through chainstate transaction processing
- routing valid orphan transactions through `ProcessValidTx`
- routing invalid non-missing-input orphan results through `ProcessInvalidTx`
- leaving missing-input cases for later reconsideration paths

This is only a first-pass description. MoreBC2 should keep deeper orphan/package behavior tied to existing mempool pages until a fuller review exists.

## Related transaction messages observed

The reviewed section also includes related transaction-relay controls:

- `mempool` requests are only processed when the node advertises bloom support or the peer has mempool permission.
- `mempool` requests can be rejected when outbound bandwidth limits are reached.
- `filterload`, `filteradd`, and `filterclear` are tied to bloom-service behavior and can disconnect peers when bloom services were not offered.
- `feefilter` updates the peer's received fee filter when the amount is within money range.
- `notfound` messages can inform the transaction download manager about transaction inventory that a peer could not provide.

## Boundaries

This page does not claim:

- that wallet-created transactions will relay successfully
- that any specific fee level is sufficient
- that mempool policy is fully documented here
- that package relay is fully reviewed
- that P2P relay equals confirmation
- that transaction relay has been tested live
- that BitcoinII differs from upstream Bitcoin Core here
- that release behavior exactly matches current `main`

This is source-observed documentation for the reviewed transaction-relay slice only.

## Documentation implications

MoreBC2 can use this page to support cautious explanations of:

- transaction announcement versus transaction validation
- txid versus wtxid relay distinction
- why transaction relay is skipped during initial block download
- why a transaction can be accepted locally but still need block confirmation
- why wallet/RPC sending docs should not imply guaranteed network propagation
- why transaction relay behavior belongs in developer/service docs, not beginner command recipes

## Related pages

- [Mempool and transaction broadcast RPC](rpc-mempool.md)
- [Raw transaction RPC](rpc-rawtransaction.md)
- [Mempool accept](mempool-accept.md)
- [Mempool source](txmempool.md)
- [Life of a transaction](../../architecture/life-of-a-transaction.md)
- [Net processing handshake](net-processing-handshake.md)
- [Net processing block and header relay](net-processing-block-relay.md)

## Open questions

- Review transaction request scheduling and send-loop behavior.
- Review transaction reconciliation behavior more deeply.
- Review package/orphan transaction relay paths more deeply.
- Compare this slice between current `main` and `v29.1.0`.
- Confirm which transaction-relay details belong in service-provider docs.
- Confirm whether any BitcoinII-specific behavior exists here beyond naming and visible comments.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- [Mempool and transaction broadcast RPC](rpc-mempool.md)
- [Mempool accept](mempool-accept.md)
- [Life of a transaction](../../architecture/life-of-a-transaction.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of transaction relay paths in `net_processing`. Runtime tests, release comparison, upstream comparison, send-loop behavior, transaction reconciliation, package relay, and deeper mempool policy remain open.
