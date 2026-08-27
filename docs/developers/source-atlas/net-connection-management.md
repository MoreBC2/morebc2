# Net connection management

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of lower-level peer connection management in:

- `src/net.h`
- `src/net.cpp`

This is a focused Source Atlas slice. It is not a complete review of every socket path, every transport state, every addrman path, banman behavior, P2P message processing, or live node behavior.

## Why this area matters

Earlier MoreBC2 pages reviewed `net_processing` behavior: handshake, address sharing, block/header sharing, transaction sharing, peer health checks, and the send loop.

`src/net.*` is lower-level. It owns much of the connection machinery beneath that peer-processing layer:

- listening and outbound connection setup
- socket send/receive handling
- local address discovery and self-advertising helpers
- transport selection and wire-byte parsing
- inbound admission and eviction hooks
- DNS seed and seed-node connection paths
- node cleanup and reconnection handling

For MoreBC2, this helps keep node/operator documentation honest: peer behavior is not only consensus logic or RPC output. It also depends on sockets, connection type, permissions, local configuration, peer state, network reachability, and address-manager state.

## Important defaults and limits observed in `net.h`

Observed constants include:

- `TIMEOUT_INTERVAL = 20 minutes`
- `FEELER_INTERVAL = 2 minutes`
- `EXTRA_BLOCK_RELAY_ONLY_PEER_INTERVAL = 5 minutes`
- `MAX_PROTOCOL_MESSAGE_LENGTH = 4,000,000 bytes`
- `MAX_OUTBOUND_FULL_RELAY_CONNECTIONS = 8`
- `MAX_ADDNODE_CONNECTIONS = 8`
- `MAX_BLOCK_RELAY_ONLY_CONNECTIONS = 2`
- `MAX_FEELER_CONNECTIONS = 1`
- `DEFAULT_LISTEN = true`
- `DEFAULT_MAX_PEER_CONNECTIONS = 125`
- `DEFAULT_BLOCKSONLY = false`
- `DEFAULT_PEER_CONNECT_TIMEOUT = 60`
- `DEFAULT_FORCEDNSSEED = false`
- `DEFAULT_DNSSEED = true`
- `DEFAULT_FIXEDSEEDS = true`
- `DEFAULT_MAXRECEIVEBUFFER = 5 * 1000`
- `DEFAULT_MAXSENDBUFFER = 1 * 1000`
- `DEFAULT_V2_TRANSPORT = true`

These are source-observed defaults and limits. They are not claims that a live node will always have a specific number of peers.

## Local address behavior observed

Reviewed local-address helpers include:

- `GetListenPort`
- `GetLocalAddrForPeer`
- `AddLocal`
- `RemoveLocal`
- `SeenLocal`
- `IsLocal`
- `GetLocalAddress`

Observed behavior includes:

- listen port selection checks `-bind`, selected `-whitebind`, `-port`, then the chain default port
- local address selection depends on listening state, reachability, peer network, and local address score
- privacy-network addresses are not advertised to other networks, and other-network addresses are not advertised to privacy-network peers
- peer-reported local address can sometimes be used when discovery is enabled and the address is routable
- unroutable addresses are not advertised
- `AddLocal` rejects unroutable addresses, non-manual addresses when discovery is disabled, and addresses on unreachable networks

## Outbound connection creation observed

`CConnman::ConnectNode` handles creating a new outbound node object after selecting or resolving a target.

Observed behavior includes:

- inbound connection type is not accepted through this path
- local addresses are not connected to through the normal no-destination path
- existing connections to the same service can prevent duplicate connection attempts
- destination strings can be resolved to one or more services
- resolved destinations are shuffled before attempts
- proxy, direct, and I2P paths are handled separately
- addrman attempt state is updated when an actual address connection was attempted and the failure was not a proxy connection failure
- manual connections can receive outbound whitelist permission checks
- each created node gets a node id, deterministic local nonce, keyed network group, bind address, connection type, receive buffer size, and transport setting
- new outbound connections add entropy from the node id

This page does not claim that every outbound attempt succeeds or that address selection is fully reviewed.

## Inbound connection admission observed

The reviewed inbound acceptance path shows several gates before an inbound node is accepted.

Observed behavior includes:

- banned peers can be dropped before node creation
- discouraged peers can be dropped when inbound slots are nearly full unless the peer has appropriate permission
- when inbound slots are full, the node can try to evict an existing connection before accepting the new one
- inbound nodes receive a node id, local nonce, keyed network group, bind address, inbound connection type, inbound-onion flag, permission flags, receive buffer size, and transport setting
- V2 transport can be used when local services signal `NODE_P2P_V2`, with fallback behavior available for incoming V1 peers
- accepted inbound nodes are initialized through message-processing setup and added to the node list

Banman and eviction selection internals are still separate open items.

## Node cleanup and reconnection observed

`CConnman::DisconnectNodes` handles disconnect cleanup.

Observed behavior includes:

- if the network is not active, connected nodes are marked for disconnect
- nodes marked for disconnect are removed from the active node list
- some V2 connection failures can be scheduled for V1 reconnect through transport state
- outbound grants are released during cleanup
- sockets and I2P sessions are reset through node disconnect cleanup
- network connection counts are adjusted for manual or full outbound connections
- disconnected nodes remain in a disconnected pool until references are released
- fully unused disconnected nodes are deleted later

This supports cautious operator wording around peer counts changing over time.

## Inactivity and timeout checks observed

Reviewed inactivity logic includes:

- checks do not run until the peer has been connected longer than the peer connection timeout
- peers that never sent or never received within the initial timeout can be disconnected
- send timeout and receive timeout compare against `TIMEOUT_INTERVAL`
- peers that have not completed the version or transport handshake can time out
- V2 transport detecting state has a distinct handshake timeout log path

This is lower-level timeout handling and is separate from block-download stalling logic in `net_processing`.

## Socket wait and connected-node servicing observed

Reviewed socket-handling behavior includes:

- listening sockets are waited for receive readiness
- connected peers are waited for receive and/or send readiness depending on pause state and pending bytes
- send readiness considers both bytes already available from transport and queued messages that could become sendable
- the socket handler waits briefly when no sockets are ready
- connected sockets are serviced before listening sockets are accepted
- receive, send, and socket error events are considered per node

## Wire-byte receive behavior observed

`CNode::ReceiveMsgBytes` routes raw bytes into the active transport.

Observed behavior includes:

- last receive time and received byte counters are updated
- bytes are fed to the transport until consumed
- serious transport errors cause disconnect by returning false
- complete transport messages are converted into `CNetMessage` objects
- deserialization failures can reject a message without disconnecting the peer
- receive byte accounting is kept by message type, with unknown types counted under a generic bucket
- complete messages are pushed to the node receive queue

## V1 transport behavior observed

Reviewed V1 transport behavior includes:

- parsing header bytes before payload bytes
- checking message-start bytes against chain parameters
- rejecting messages larger than protocol limits
- calculating and checking message checksum
- checking message type validity
- resetting receive state after each completed message
- serializing V1 headers with message start, message type, length, and checksum for sending
- sending header bytes before payload bytes
- shrinking sent payload memory after a message is fully sent

## V2 transport behavior observed

Reviewed V2 transport behavior includes:

- sender and receiver state machines for BIP324-style transport
- incoming peers can detect V1 prefix and fall back to V1 behavior
- outgoing V2 peers can later be retried with V1 under limited early-failure conditions
- V2 state does not report V2 session information until after version packet verification
- V2 message type encoding can use short IDs for known message names or long encoding for other names
- packet size is bounded by message type encoding plus protocol message limits
- bad packet length, missing garbage terminator, decrypt failure, or invalid message type can reject or terminate transport processing

This page does not fully audit BIP324 cryptographic details.

## Socket send behavior observed

`CConnman::SocketSendData` handles moving queued messages into the transport and writing bytes to the socket.

Observed behavior includes:

- queued serialized messages are handed to the transport when possible
- V2 transport can block message setting until the transport is ready
- send bytes are obtained from the transport
- socket send uses nonblocking behavior
- partial sends stop further sending for that pass
- non-transient socket send errors disconnect the peer
- sent byte counts and per-message accounting are updated
- send pause state is set when queue and transport memory exceed the send buffer limit
- sent messages are erased from the node send queue

## DNS seed and seed-node behavior observed

Reviewed seed-related behavior includes:

- DNS seed querying is delayed based on whether addrman has many known peers
- only a few DNS seeds are queried at once unless forced or addrman is empty
- seed-node attempts can be tried before falling back to DNS seed logic
- DNS seed querying can pause while the network is inactive
- DNS seed responses are capped per seed before adding to addrman
- if DNS seed lookup does not return usable subdomain results, an address-fetch connection can be queued
- address-fetch processing opens an `ADDR_FETCH` connection when an outbound grant is available

This page does not fully review addrman internals or fixed-seed handling.

## Connection counts and extra-peer helpers observed

Reviewed helpers include:

- `GetFullOutboundConnCount`
- `GetExtraFullOutboundCount`
- `GetExtraBlockRelayCount`
- `GetReachableEmptyNetworks`
- `MaybePickPreferredNetwork`
- `SetTryNewOutboundPeer`
- `StartExtraBlockRelayPeers`

Observed behavior includes:

- full outbound connection count only includes successfully connected full outbound peers
- extra full outbound and extra block-relay counts ignore peers marked for disconnect and peers that have not completed handshake
- reachable empty networks can be detected from addrman and reachability state
- preferred network selection can pick a reachable network with known addresses but no current manual/full outbound connection
- extra outbound peer and extra block-relay flags are used by higher-level peer-management behavior

## Boundaries

This page does not claim:

- that every socket/thread path in `src/net.cpp` has been reviewed
- that addrman behavior is fully reviewed
- that banman behavior is fully reviewed
- that DNS seeds are currently reachable
- that fixed seeds are currently useful
- that live peer counts match defaults
- that V2 transport has been tested locally
- that BitcoinII differs from upstream Bitcoin Core here
- that release behavior exactly matches current `main`
- that any connection behavior has been live tested by MoreBC2

This is source-observed documentation for the reviewed lower-level network slice only.

## Documentation implications

MoreBC2 can use this page to support cautious explanations of:

- why peer counts can fluctuate
- why local address advertisement is conditional
- why peer discovery can involve addrman, seed nodes, DNS seeds, and address-fetch connections
- why network-active state affects connection cleanup and DNS seeding
- why V2 transport support should be documented as source-observed, not locally tested
- why manual peer and ban-list commands need operator-only treatment until tested

## Related pages

- [P2P protocol primitives](protocol.md)
- [Network RPC](rpc-network.md)
- [Net processing handshake](net-processing-handshake.md)
- [Net processing address relay](net-processing-address-relay.md)
- [Net processing block and header relay](net-processing-block-relay.md)
- [Net processing transaction relay](net-processing-transaction-relay.md)
- [Net processing peer eviction and stale-tip checks](net-processing-peer-eviction.md)
- [Net processing send loop](net-processing-send-loop.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Node guide](../../nodes/node-guide.md)

## Open questions

- Review full `ThreadOpenConnections` behavior in more detail.
- Review fixed-seed fallback behavior in more detail.
- Review addrman internals separately.
- Review banman behavior separately.
- Review socket handler loops and receive/send edge cases more deeply.
- Compare this slice between current `main` and `v29.1.0`.
- Confirm which lower-level connection details belong in user-facing node docs.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/net.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net.h
- Current observed `main` `src/net.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net.cpp
- [Network RPC](rpc-network.md)
- [Net processing send loop](net-processing-send-loop.md)
- [Net processing peer eviction and stale-tip checks](net-processing-peer-eviction.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of lower-level network connection management in `src/net.h` and `src/net.cpp`. Runtime tests, release comparison, upstream comparison, full addrman review, full banman review, full fixed-seed review, and deeper socket-loop review remain open.
