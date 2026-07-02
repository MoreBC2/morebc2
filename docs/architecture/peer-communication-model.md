# Peer communication model

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page gives a high-level model of BitcoinII Core peer communication as currently understood from first-pass Source Atlas reviews.

It is not a final protocol specification and it is not based on live-network testing. It should be read as a cautious architecture map that points back to source-review pages.

## Simplified model

```text
Local node startup
  -> network component setup
  -> listening sockets, if enabled
  -> outbound connection attempts, if enabled
  -> peer object creation
  -> transport setup
  -> version / feature negotiation
  -> address sharing
  -> block/header sharing
  -> transaction sharing
  -> periodic send loop
  -> peer health checks and cleanup
```

## Layer 1: lower-level connection management

Lower-level connection management is handled in `src/net.h` and `src/net.cpp`.

Reviewed behavior includes:

- local address discovery and advertisement helpers
- listen-port selection
- outbound connection creation
- inbound connection admission
- node cleanup after disconnect
- inactivity and handshake timeout checks
- socket wait and service loops
- raw byte receive handling
- V1 and V2 transport handling
- socket send handling
- DNS seed and seed-node connection paths
- connection-count helper functions

Important boundary:

This layer moves bytes, manages connections, and creates node objects. It does not itself decide every high-level peer-message rule.

Related:

- [Source atlas: net connection management](../developers/source-atlas/net-connection-management.md)
- [Source atlas: network RPC](../developers/source-atlas/rpc-network.md)

## Layer 2: P2P protocol primitives

Protocol primitives define the shape and names of peer messages and related identifiers.

Reviewed behavior includes:

- message headers
- message names
- service flags
- address serialization
- inventory helpers
- transaction inventory id handling

Important boundary:

Protocol primitives define what can be represented. They do not by themselves explain when a node chooses to send or request something.

Related:

- [Source atlas: P2P protocol primitives](../developers/source-atlas/protocol.md)

## Layer 3: handshake and feature negotiation

The peer handshake and early feature negotiation are handled in `src/net_processing.cpp`.

Reviewed behavior includes:

- version handling
- duplicate version handling
- peer protocol minimum checks
- service flag handling
- self-connection nonce checks
- inbound version response
- common version selection
- wtxid-relay negotiation
- sendaddrv2 negotiation
- transaction reconciliation signaling
- verack handling
- compact-block signaling
- pre-verack unsupported-message handling

Important boundary:

Handshake success does not mean a peer is useful for every purpose. Later peer state, service flags, permissions, and download logic still matter.

Related:

- [Source atlas: net processing handshake](../developers/source-atlas/net-processing-handshake.md)

## Layer 4: address sharing and peer discovery

Address sharing is one way nodes learn about other peers.

Reviewed behavior includes:

- address relay setup
- known-address filtering
- address compatibility checks
- `addr` / `addrv2` handling
- rate limiting
- reachable-network checks
- address-manager insertion
- address-fetch connection behavior

Lower-level seed behavior also exists in `src/net.cpp`, including seed-node and DNS-seed paths. Deeper addrman and fixed-seed behavior still needs separate review.

Important boundary:

MoreBC2 should not claim that a configured seed or discovered address is currently live without a direct check.

Related:

- [Source atlas: net connection management](../developers/source-atlas/net-connection-management.md)
- [Source atlas: net processing address relay](../developers/source-atlas/net-processing-address-relay.md)
- [Network specifications](../documentation/network-specifications.md)

## Layer 5: block and header sharing

Block and header peer behavior is reviewed in `net_processing` slices.

Reviewed behavior includes:

- received header processing
- `getheaders` handling
- `getblocks` handling
- full block receive path
- compact-block receive structure
- `getblocktxn` handling
- block announcement by headers, compact-block message, or inventory fallback
- block getdata request creation in the send loop
- block-download stalling and timeout checks

Important boundary:

Network sharing is not validation itself. Header and block validity are handled through validation and chainstate code.

Related:

- [Life of a block](life-of-a-block.md)
- [Block validation flow](block-validation-flow.md)
- [Source atlas: net processing block and header relay](../developers/source-atlas/net-processing-block-relay.md)
- [Source atlas: net processing send loop](../developers/source-atlas/net-processing-send-loop.md)

## Layer 6: transaction sharing

Transaction sharing is related to mempool state, but they are not the same thing.

Reviewed behavior includes:

- transaction relay setup from handshake
- txid versus wtxid inventory behavior
- incoming transaction inventory handling
- full transaction message handling
- transaction download-manager interaction
- valid and invalid transaction post-processing
- orphan transaction reconsideration
- mempool request response behavior
- fee-filter and bloom-filter effects
- transaction inventory selection in the send loop
- transaction getdata request creation in the send loop

Important boundaries:

- Local mempool acceptance does not guarantee broad network propagation.
- Peer sharing does not guarantee block inclusion.
- Block inclusion and confirmations are separate lifecycle stages.

Related:

- [Life of a transaction](life-of-a-transaction.md)
- [Mempool flow](mempool-flow.md)
- [Source atlas: net processing transaction relay](../developers/source-atlas/net-processing-transaction-relay.md)
- [Source atlas: net processing send loop](../developers/source-atlas/net-processing-send-loop.md)

## Layer 7: peer health and cleanup

Reviewed peer-health behavior includes:

- discouragement and disconnect handling
- manual-peer and permission exceptions
- outbound peer usefulness checks
- extra outbound peer behavior
- stale-tip checks
- ping timeout and keepalive behavior
- connection cleanup after disconnect
- V2-to-V1 reconnect handling in limited early-failure cases

Important boundary:

Peer health logic is not a guarantee that the node always selects the best possible peers. It is a set of source-observed rules and heuristics.

Related:

- [Source atlas: net processing peer eviction and stale-tip checks](../developers/source-atlas/net-processing-peer-eviction.md)
- [Source atlas: net connection management](../developers/source-atlas/net-connection-management.md)

## What remains open

Still needing deeper review:

- Ban-list/discouragement internals.
- Addrman internals.
- Fixed-seed fallback behavior.
- Release-versus-main comparison.
- Live-network command testing.
- Which details belong in beginner node docs versus developer-only docs.

## What this page does not claim

This page does not claim:

- that peer behavior has been live tested by MoreBC2
- that current `main` exactly matches the latest release branch
- that every network edge case has been reviewed
- that DNS seeds, fixed seeds, explorers, or services are currently live
- that transaction sharing guarantees confirmation
- that peer count or propagation behavior is guaranteed

## Related pages

- [Architecture overview](architecture-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Node guide](../nodes/node-guide.md)
- [Source atlas index](../developers/source-atlas/README.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page summarizes first-pass Source Atlas network slices. It should be updated after ban-list/discouragement internals, addrman/fixed-seed behavior, release-versus-main comparison, and live-network command testing are completed.
