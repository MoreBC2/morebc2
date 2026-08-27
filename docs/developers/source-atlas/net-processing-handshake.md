# Net processing handshake

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of the peer handshake and early feature-negotiation portions of:

- `src/net_processing.cpp`
- `src/net_processing.h`

This is a focused slice of `net_processing`, not a full review of block relay, transaction relay, address relay, or peer eviction behavior.

## Why this file area matters

`net_processing` is where BitcoinII Core handles many P2P messages after the lower-level network layer receives them.

The handshake path matters because it determines:

- whether a peer has sent a valid first `version` message
- whether the peer's protocol version is acceptable
- which services the peer advertises
- whether transaction relay is enabled for the peer
- whether feature messages such as `wtxidrelay`, `sendaddrv2`, compact-block signaling, and transaction-reconciliation signaling are accepted
- when a peer is treated as successfully connected

## Header-level notes

`src/net_processing.h` defines `PeerManager`, its options, default limits, state stats, and the public `ProcessMessage` method used for message processing and fuzz testing.

Observed defaults and options include:

- transaction reconciliation disabled by default
- maximum orphan transaction count
- block reconstruction extra transaction count
- peer bloom filters disabled by default
- peer block filters disabled by default
- compact-block in-flight limit
- max headers result value
- blocksonly / incoming transaction ignore option
- message capture option
- deterministic RNG test option

This page does not fully document those settings outside the handshake context.

## Handshake flow observed

The reviewed `ProcessMessage` section handles `version` first.

Observed behavior includes:

- If a peer sends a redundant `version` message after already having a version, it is ignored.
- The `version` message is parsed for protocol version, service flags, timestamp, address information, nonce, subversion string, starting height, and relay preference.
- Negative timestamps are normalized to zero.
- For non-inbound peers, advertised services can update address-manager service information.
- Peers expected to provide desirable services can be disconnected if they do not offer the expected services.
- Peers below `MIN_PEER_PROTO_VERSION` are disconnected.
- Inbound self-connections are detected with the incoming nonce check and disconnected.
- Inbound peers can cause the local node to respond with its own version message.
- The common protocol version is set to the lower of the peer version and local `PROTOCOL_VERSION`.
- The peer's advertised service flags, local address, subversion string, and starting height are recorded.

## Feature negotiation observed

During or around the handshake, reviewed behavior includes:

- `wtxidrelay` can be announced when the common version supports it.
- `sendaddrv2` can be sent when the common version is high enough for BIP155-style address relay.
- transaction reconciliation can be signaled when enabled and when relay conditions allow it.
- `verack` is sent after the local node processes the peer's version path.
- preferred-download state can be set after the version path evaluates connection type, permissions, address-fetch state, and block-serving capability.
- outbound peers can initialize address relay and may receive one `getaddr` request to help populate address manager state.
- non-inbound successful connections can update address-manager success state.
- feeler connections disconnect after completing the version path.

## Pre-verack behavior observed

After the `version` path:

- Messages received before any version message are rejected as non-version messages before version handshake.
- Duplicate `verack` messages are ignored after successful connection.
- `verack` completion can log a successful connection.
- Peers supporting compact blocks can receive `sendcmpct` with version 2 and low-bandwidth preference.
- Transaction-reconciliation state can be cleared if required negotiation messages did not arrive.
- Transaction download manager connection state is initialized.
- `fSuccessfullyConnected` is set after `verack` processing.

Some feature-negotiation messages are only valid before successful connection:

- `wtxidrelay` after `verack` causes disconnect.
- `sendaddrv2` after `verack` causes disconnect.
- `sendtxrcncl` after `verack` causes disconnect.

Unsupported messages before `verack` are ignored with a debug log.

## Boundaries

This page does not claim:

- that a specific peer policy is ideal or recommended
- that P2P behavior has been tested live
- that BitcoinII differs from upstream Bitcoin Core in this area
- that every handshake branch has been reviewed
- that block relay, transaction relay, address relay, or peer eviction behavior is fully documented

This is source-observed documentation for the reviewed handshake slice only.

## Documentation implications

MoreBC2 can use this page to support cautious explanations of:

- version/verack handshake basics
- why source-reviewed protocol message names are not enough to prove runtime behavior
- why feature-negotiation messages need timing rules
- why peer status in RPC output should not be confused with user-ready operating guidance

## Related pages

- [P2P protocol primitives](protocol.md)
- [Network RPC](rpc-network.md)
- [Node startup](../../architecture/node-startup.md)
- [RPC overview](../rpc-overview.md)
- [Network specifications](../../documentation/network-specifications.md)

## Open questions

- Compare this handshake slice between current `main` and `v29.1.0`.
- Review the rest of `net_processing.cpp` in smaller slices.
- Document address relay separately.
- Document block/header relay separately.
- Document transaction relay separately.
- Confirm which P2P options should be surfaced in user-facing node docs.
- Confirm whether any BitcoinII-specific behavior exists here beyond naming and visible comments.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- Current observed `main` `src/protocol.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/protocol.h
- [P2P protocol primitives](protocol.md)
- [Network RPC](rpc-network.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of the handshake and early feature-negotiation paths in `net_processing`. Runtime tests, release comparison, upstream comparison, and the rest of `net_processing` remain open.
