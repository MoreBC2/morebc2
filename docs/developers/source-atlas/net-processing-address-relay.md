# Net processing address relay

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of address relay and peer-discovery behavior in:

- `src/net_processing.cpp`
- `src/net_processing.h`

This is a focused slice of `net_processing`, not a full review of block relay, transaction relay, peer eviction, or network connection management.

## Why this area matters

Address relay is how a node learns about other reachable peers and shares peer addresses with others.

For MoreBC2, this matters because node and service documentation should avoid vague claims like “the node finds peers automatically” unless the source-reviewed path and its limits are documented carefully.

## Constants and limits observed

The reviewed source defines several address-relay-related limits and timers, including:

- `AVG_LOCAL_ADDRESS_BROADCAST_INTERVAL`: average local address broadcast delay
- `AVG_ADDRESS_BROADCAST_INTERVAL`: average peer address broadcast delay
- `ROTATE_ADDR_RELAY_DEST_INTERVAL`: delay for rotating address relay destinations
- `MAX_PCT_ADDR_TO_SEND`: maximum percentage of address manager entries returned for a `getaddr` response
- `MAX_ADDR_TO_SEND`: maximum address records in an `addr` message
- `MAX_ADDR_RATE_PER_SECOND`: average rate limit for address processing
- `MAX_ADDR_PROCESSING_TOKEN_BUCKET`: soft token-bucket limit for address processing

These values should be treated as source-observed implementation details, not user-tunable recommendations.

## Address relay setup observed

`PeerManagerImpl` declares `SetupAddressRelay`, which checks whether address relay is permitted for a peer and, when allowed, initializes address-known tracking and marks address relay enabled.

Related helpers include:

- `AddAddressKnown`, which records addresses already known for a peer.
- `PushAddress`, which queues an address for possible relay to a peer.
- `IsAddrCompatible`, which checks whether a peer can receive an address format. The reviewed code notes that peers without BIP155 / `addrv2` support cannot receive address types requiring ADDRv2 encoding.

`PushAddress` checks validity, duplicate-known status, and address-format compatibility before queuing an address. If the send queue is already at `MAX_ADDR_TO_SEND`, it replaces a random existing queued address rather than growing the queue indefinitely.

## Handshake relationship observed

The handshake slice already showed that outbound peers can initialize address relay after version handling.

Observed behavior includes:

- after a successful version path, outbound peers can attempt address relay setup
- if setup permits it, the node can send a one-time `getaddr` request
- this one-time request is used to help populate or update address manager state
- block-relay-only peer handling is treated carefully so address relay is not automatically assumed for every connection type

## ADDR and ADDRV2 processing observed

After a peer is successfully connected, the reviewed `ProcessMessage` section handles `addr` and `addrv2` messages together.

Observed behavior includes:

- `addrv2` selects v2 network serialization parameters; `addr` uses v1 serialization parameters.
- received address records are read into a vector of `CAddress` entries.
- if `SetupAddressRelay` does not allow relay for the peer, the message is ignored.
- messages with more than `MAX_ADDR_TO_SEND` address records trigger misbehavior handling.
- address processing uses a token bucket and can rate-limit non-permissioned peers.
- addresses are shuffled before processing.
- addresses without useful service flags can be skipped.
- timestamps that are missing, very old, or too far in the future are normalized.
- each processed address is added to the peer's known-address filter.
- banned or discouraged addresses are remembered as received but not processed further.
- recent routable addresses from small unsolicited announcements can be relayed to a limited number of other nodes.
- only addresses reachable by the local node's reachable-network set are stored for address manager insertion.
- processed and rate-limited counters are tracked on the peer.
- accepted reachable addresses are added to address manager with the sending peer as source.
- addr-fetch connections can disconnect after receiving multiple addresses.

## GETADDR relationship observed

The reviewed handshake path can send `getaddr` to eligible outbound peers after address relay setup.

The reviewed address message path also allows a `getaddr` request to temporarily raise address-processing capacity for the expected response.

This page does not yet document the full `getaddr` response-sending path. That should be reviewed separately with `SendMessages` and related address-send logic.

## Documentation implications

MoreBC2 can cautiously say:

- address relay exists in the reviewed source
- ADDR and ADDRV2 are both handled
- BIP155-style address compatibility is considered
- address processing has size checks and rate-limiting behavior
- address manager storage is filtered by reachability and service usefulness

MoreBC2 should not yet claim:

- exact live peer-discovery effectiveness
- that any specific seed, peer, or service is currently reliable
- that every address-relay branch has been reviewed
- that `getaddr` response behavior is fully documented
- that this behavior differs from upstream Bitcoin Core

## Related pages

- [P2P protocol primitives](protocol.md)
- [Net processing handshake](net-processing-handshake.md)
- [Network RPC](rpc-network.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Node guide](../../nodes/node-guide.md)

## Open questions

- Review `SendMessages` address-send behavior.
- Review local-address broadcast behavior.
- Review address relay destination rotation.
- Review `getaddr` response construction.
- Compare address relay behavior between the `v31.1.0` baseline and subsequent `main` changes.
- Confirm which address-relay details belong in user-facing node docs.
- Confirm whether any BitcoinII-specific behavior exists here beyond naming and visible comments.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- Current observed `main` `src/protocol.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/protocol.h
- [P2P protocol primitives](protocol.md)
- [Net processing handshake](net-processing-handshake.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of address relay and peer-discovery-adjacent paths in `net_processing`. Runtime tests, release comparison, upstream comparison, full `getaddr` response behavior, and the rest of `net_processing` remain open.
