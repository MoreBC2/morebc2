# Net processing send loop

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of the peer send loop in:

- `src/net_processing.cpp`
- `src/net_processing.h`

The main reviewed function is `PeerManagerImpl::SendMessages`.

This is a focused slice of `net_processing`, not a complete review of lower-level socket handling, lower-level connection management in `src/net.cpp`, banman, addrman internals, mempool policy, wallet sending, or full block validation.

## Why this area matters

Earlier MoreBC2 pages reviewed peer message receive paths, transaction relay paths, block/header relay paths, and peer health checks.

The send loop ties many of those pieces together. It decides what this node is ready to send to a peer during periodic message processing.

For MoreBC2, this matters because user and service docs should not imply that a local node instantly announces every transaction, block, address, or state change. The source shows timing, peer state, permissions, filters, inventory queues, and download windows all affect behavior.

## Send loop entry conditions observed

`SendMessages` starts with several gating checks.

Observed behavior includes:

- peer state is looked up by node id
- peer discouragement/disconnect handling runs before other send-loop behavior
- outbound peers can receive the local version message if it has not been sent yet
- after that, the send loop does not continue until the version handshake is complete
- if the peer is already marked for disconnect, the send loop returns early
- address-fetch connections can time out after an address-broadcast interval window

## Keepalive and early peer messages observed

After handshake gating, the send loop can handle early periodic messages.

Observed behavior includes:

- ping/keepalive and ping timeout handling through `MaybeSendPing`
- address sharing through `MaybeSendAddr`
- sendheaders signaling through `MaybeSendSendHeaders`

The ping behavior is also summarized in the peer-eviction/stale-tip page. Address sharing is summarized in the address-relay page.

## Initial headers sync observed

Inside the chain lock, the send loop can start headers synchronization.

Observed behavior includes:

- best header is initialized from the active tip when missing
- the code decides whether to sync blocks and headers from the peer based on preferred-download state, service capability, address-fetch status, inbound/outbound context, and whether other download peers exist
- headers sync can start for a peer that can serve blocks when blocks are not being loaded from disk
- the node may request headers from a point before the current best known header so the peer can return a non-empty response
- a successful getheaders request marks sync started and sets a headers-sync timeout

This is source-observed send-loop behavior only. It does not prove live sync quality or peer availability.

## Block announcement sending observed

The send loop tries to announce blocks using headers when possible.

Observed behavior includes:

- queued block announcements can be sent as headers when the peer prefers headers and the headers connect to what the peer is known to have
- if the peer requested high-bandwidth compact blocks and only one block is being announced, the node can send a compact block message instead
- if a cached compact-block message for the most recent block exists, it can be reused
- otherwise, the block can be read and a compact-block message constructed
- if headers cannot be used, the code falls back to inventory announcements
- after the send attempt, the block header relay queue is cleared

This connects to the block/header relay page, but the full compact-block reconstruction behavior remains outside this page.

## Inventory sending observed

The send loop builds inventory messages for blocks and transactions.

Observed block inventory behavior includes:

- queued block inventory entries are added as `MSG_BLOCK`
- inventory messages are flushed when they reach `MAX_INV_SZ`
- the block inventory queue is cleared after use

Observed transaction inventory behavior includes:

- transaction inventory only runs when the peer has transaction-relay state
- periodic transaction announcements are controlled by the next inventory send time
- peers with `NoBan` permission can bypass normal trickle timing
- inbound and outbound peers use different timing paths for the next inventory send
- if a peer has requested no transaction relay, pending transaction inventory can be cleared

## Mempool request response observed

The send loop can respond to a BIP35-style mempool request.

Observed behavior includes:

- the node collects mempool transaction info
- the request flag is cleared after handling
- fee-filter state can prevent sending transactions below the peer's requested feerate
- bloom filters can further limit relevance for peers using bloom filtering
- txid or wtxid inventory is used depending on peer relay negotiation
- known-inventory tracking is updated for sent entries
- inventory messages are flushed at the size limit

This is not a guarantee that service peers will receive every transaction in a mempool. It depends on peer state, filters, timing, and local mempool contents.

## Transaction announcement selection observed

For periodic transaction announcements, the send loop chooses from pending transaction inventory.

Observed behavior includes:

- pending inventory candidates are collected from the transaction relay state
- candidates are sorted using mempool depth/score behavior for privacy and priority reasons
- announcement count is bounded by broadcast target and broadcast maximum rules
- known inventory is skipped
- transactions no longer in the mempool are skipped
- transactions below the peer's fee filter are skipped
- bloom-filter relevance can skip transactions
- sent inventory is recorded in the known filter
- the mempool sequence is recorded so later getdata responses can be handled against recent announcements

This page intentionally avoids turning this into user-facing fee or propagation advice.

## Stalling and timeout checks observed

The send loop also performs block-download health checks.

Observed behavior includes:

- a peer can be disconnected if it is stalling block download beyond the current stalling timeout
- the stalling timeout can be temporarily increased to avoid disconnecting multiple peers when the local node may be bandwidth-constrained
- block download timeout checks consider validated in-flight blocks and the number of other peers downloading blocks
- headers sync timeout can disconnect a peer when it is the only sync peer and other preferred-download peers are available
- peers with `NoBan` permission are handled differently for headers sync timeout
- once the node is caught up, headers sync timeout can be disabled for that peer
- outbound peer chain usefulness is checked through `ConsiderEviction`

These checks connect to the peer-eviction/stale-tip page.

## Block getdata sending observed

The send loop can request blocks from peers.

Observed behavior includes:

- block getdata requests depend on peer service capability, sync/download state, initial block download state, limited-peer state, and current in-flight limits
- next blocks to download are selected by download logic
- snapshot/background sync can influence which historical blocks are requested
- each requested block is recorded with `BlockRequested`
- if another peer is preventing the download window from moving, that peer can be marked as a staller
- block requests are sent as getdata inventory entries with fetch flags

This page does not fully review block download selection internals.

## Transaction getdata sending observed

The send loop can request announced transactions.

Observed behavior includes:

- transaction requests are gathered from the transaction download manager
- requested items are sent as `MSG_WTX` or `MSG_TX` depending on whether the requested identifier is wtxid-based
- getdata messages are flushed at the maximum getdata size
- remaining getdata entries are sent before leaving the chain-locked section

This connects to the transaction-relay page, but deeper transaction download manager behavior remains open.

## Fee-filter sending observed

After releasing the chain lock, the send loop can send fee-filter updates through `MaybeSendFeefilter`.

Observed behavior includes:

- fee-filter updates depend on local mempool minimum relay feerate and current filter state
- the filter sent to peers is rounded
- updates are scheduled with randomized timing
- large filter changes can pull the next update sooner

## Boundaries

This page does not claim:

- that every local transaction is announced immediately
- that peer propagation is guaranteed
- that a peer will always receive block announcements as headers
- that compact-block behavior is fully reviewed
- that block download selection is fully reviewed
- that transaction download manager behavior is fully reviewed
- that lower-level socket or connection code is reviewed here
- that banman or addrman internals are reviewed here
- that BitcoinII differs from upstream Bitcoin Core here
- that release behavior exactly matches current `main`
- that any send-loop behavior has been live tested

This is source-observed documentation for the reviewed send-loop slice only.

## Documentation implications

MoreBC2 can use this page to support cautious explanations of:

- why relay is delayed and peer-dependent
- why inventory is filtered by peer state, known inventory, fee filters, and bloom filters
- why block announcements can use headers, compact blocks, or inventory fallback
- why transaction announcement is different from transaction confirmation
- why peer-health and timeout behavior can affect sync and download behavior
- why command docs should not promise instant propagation after a local submission

## Related pages

- [P2P protocol primitives](protocol.md)
- [Network RPC](rpc-network.md)
- [Net processing handshake](net-processing-handshake.md)
- [Net processing address relay](net-processing-address-relay.md)
- [Net processing block and header relay](net-processing-block-relay.md)
- [Net processing transaction relay](net-processing-transaction-relay.md)
- [Net processing peer eviction and stale-tip checks](net-processing-peer-eviction.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Life of a transaction](../../architecture/life-of-a-transaction.md)
- [Life of a block](../../architecture/life-of-a-block.md)

## Open questions

- Review lower-level connection management in `src/net.cpp`.
- Review banman behavior separately.
- Review addrman and DNS seed caller paths separately.
- Review transaction download manager behavior more deeply.
- Review block download selection and compact-block reconstruction in more detail.
- Compare this slice between current `main` and `v29.1.0`.
- Confirm which send-loop details should stay developer-only.

## Sources

- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- [Net processing block and header relay](net-processing-block-relay.md)
- [Net processing transaction relay](net-processing-transaction-relay.md)
- [Net processing peer eviction and stale-tip checks](net-processing-peer-eviction.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of `PeerManagerImpl::SendMessages` and immediately related send-loop helpers. Runtime tests, release comparison, upstream comparison, lower-level net connection review, banman review, addrman/DNS seed review, compact-block reconstruction details, and deeper transaction download manager behavior remain open.
