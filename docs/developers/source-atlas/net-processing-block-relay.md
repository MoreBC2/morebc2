# Net processing block and header relay

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of block and header relay behavior in:

- `src/net_processing.cpp`
- `src/net_processing.h`

This is a focused slice of `net_processing`, not a complete review of transaction relay, address relay, peer eviction, compact-block reconstruction edge cases, or validation internals.

## Why this area matters

Block and header relay are central to node synchronization and chain following.

For MoreBC2, this area matters because many user-facing ideas depend on it:

- how a node learns about new blocks
- why headers are handled separately from full blocks
- why block download is not just “ask every peer for every block”
- why compact block behavior is separate from ordinary full-block relay
- why service and exchange docs should avoid overconfident sync or confirmation claims

## Constants and limits observed

The reviewed source defines block/header relay limits and timing values, including:

- `HEADERS_DOWNLOAD_TIMEOUT_BASE`
- `HEADERS_DOWNLOAD_TIMEOUT_PER_HEADER`
- `HEADERS_RESPONSE_TIME`
- `MAX_LOCATOR_SZ`
- `MAX_BLOCKS_IN_TRANSIT_PER_PEER`
- `BLOCK_DOWNLOAD_WINDOW`
- `BLOCK_DOWNLOAD_TIMEOUT_BASE`
- `BLOCK_DOWNLOAD_TIMEOUT_PER_PEER`
- `MAX_BLOCKS_TO_ANNOUNCE`
- `MAX_CMPCTBLOCK_DEPTH`
- `MAX_BLOCKTXN_DEPTH`
- compact-block version value `CMPCTBLOCKS_VERSION`

These are source-observed implementation details, not operator recommendations.

## Header processing observed

The reviewed source contains `ProcessHeadersMessage`, which handles received headers.

Observed behavior includes:

- empty headers can clear header-sync state and stop asking that peer for more headers
- received headers are checked for basic proof-of-work sanity before deeper processing
- low-work headers sync has special handling before ordinary header validation
- headers must connect to something already known in the block index, otherwise unconnecting-header handling is used
- when headers connect, the peer's last `getheaders` timestamp can be cleared
- already-known headers that are ancestors of the best header or tip can skip some anti-DoS checks
- trusted peers with `NoBan` permission can bypass some anti-DoS logic
- accepted headers are passed to `ProcessNewBlockHeaders`
- invalid headers can trigger peer punishment through block-related misbehavior handling
- if a full `headers` response suggests more headers may exist, the node can request more with `getheaders`
- peer state is updated after received headers, including best-known block and block announcement timing
- direct block fetching can be considered after processing headers

## Peer state after headers observed

`UpdatePeerStateForReceivedHeaders` updates what the node knows about a peer after headers are received.

Observed behavior includes:

- the peer's block availability is updated from the last received header
- peers in initial block download can be disconnected if their headers chain has insufficient work and they are outbound disconnection candidates
- full outbound peers can be protected from some bad/lagging-chain eviction logic when they appear useful

## GETHEADERS response behavior observed

The reviewed `ProcessMessage` section handles `getheaders`.

Observed behavior includes:

- locators larger than `MAX_LOCATOR_SZ` can cause disconnection
- `getheaders` is ignored during block import or reindexing
- if the active chain has too little work and the peer lacks download permission, the node sends an empty headers response
- a null locator can request the `hashStop` block if it is known and allowed
- ordinary locators are resolved to the next block after the peer's last common block
- responses are built as a vector of block-header-shaped `CBlock` entries because headers serialization needs the transaction-count marker
- responses are limited by `max_headers_result` and `hashStop`
- the peer's best-header-sent state is updated
- the response is sent as a `headers` message

## GETBLOCKS and block inventory behavior observed

The reviewed `getblocks` path:

- checks locator size against `MAX_LOCATOR_SZ`
- activates best chain before responding so responses reflect the current known best chain
- finds the last block the peer has in the main chain
- walks forward from that point and queues block hashes for inventory relay
- respects a batch limit
- stops at `hashStop`
- avoids advertising pruned or likely-unavailable old blocks in prune mode
- sets a continuation block when the response hits the batch limit

This page does not yet fully document the later send-loop behavior that actually drains queued block inventory to the wire.

## Full block receive behavior observed

The reviewed full-block path includes:

- mutation checks before processing a received block
- removal of matching in-flight block requests
- source tracking for received blocks
- an anti-DoS work threshold check from the previous block plus claimed header work
- `ProcessBlock` call with force-processing when the block was requested

This page does not replace the existing block validation flow docs. It only records the P2P-facing entry path before validation takes over.

## Compact block behavior observed

The reviewed compact-block path includes:

- compact blocks are ignored while importing
- compact-block headers are processed before reconstruction work
- missing previous headers can trigger a deeper `getheaders` request when not in initial block download
- low-work compact-block headers can be ignored
- invalid compact-block headers can trigger punishment through block-related misbehavior handling
- peer block availability and last-block-announcement time can be updated
- if the block is already known or pruned, requested blocks may fall back to ordinary `getdata`
- near-tip compact blocks can be selected for reconstruction when in-flight and download limits allow

Compact-block reconstruction has many branches. This page records only the first-pass structure and should not be treated as a full BIP152 implementation guide.

## GETBLOCKTXN behavior observed

The reviewed `getblocktxn` path includes:

- recent block transactions can be served from the most recent block cache
- otherwise, the block index and block data availability are checked
- requests for blocks within `MAX_BLOCKTXN_DEPTH` can receive block transaction responses
- older block transaction requests can fall back to a full block response path

## Boundaries

This page does not claim:

- that a node syncs quickly or reliably in any specific live environment
- that all compact-block branches are fully reviewed
- that all send-loop behavior is documented
- that BitcoinII differs from upstream Bitcoin Core here
- that block validation itself is covered here
- that release behavior exactly matches current `main`

This is source-observed documentation for the reviewed block/header relay slice only.

## Documentation implications

MoreBC2 can use this page to cautiously support explanations of:

- headers-first synchronization
- why header processing precedes block download
- why block locator size matters
- why compact block behavior exists but should not be oversimplified
- why pruned-node behavior can affect what old blocks are served
- why P2P relay behavior is separate from RPC confirmation or wallet history documentation

## Related pages

- [Net processing handshake](net-processing-handshake.md)
- [Net processing address relay](net-processing-address-relay.md)
- [P2P protocol primitives](protocol.md)
- [Block lifecycle](block-acceptance.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Network specifications](../../documentation/network-specifications.md)

## Open questions

- Review block/header send-loop behavior in `SendMessages`.
- Review compact-block reconstruction branches more deeply.
- Review block download timeout and stalling behavior separately.
- Compare this slice between current `main` and `v29.1.0`.
- Confirm which block/header relay details belong in user-facing node docs.
- Confirm whether any BitcoinII-specific behavior exists here beyond naming and visible comments.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- [Net processing handshake](net-processing-handshake.md)
- [Net processing address relay](net-processing-address-relay.md)
- [Block lifecycle](block-acceptance.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of block and header relay paths in `net_processing`. Runtime tests, release comparison, upstream comparison, send-loop behavior, compact-block reconstruction details, and peer-stalling behavior remain open.
