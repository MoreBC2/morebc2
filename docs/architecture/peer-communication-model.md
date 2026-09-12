# Peer communication model

**Category:** Architecture
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page gives a high-level model of BitcoinII Core peer communication using current Source Atlas coverage plus the September 11 BitcoinII Core `v31.1.0` Windows runtime evidence.

It is not a complete wire-protocol specification and does not claim packet-level coverage of every peer-message edge case.

## Simplified model

```text
Node startup
  -> address / seed / connection state prepared
  -> listening sockets, if enabled
  -> outbound connection attempts, if enabled
  -> peer object / transport setup
  -> version / feature negotiation
  -> address sharing
  -> header / block sharing
  -> transaction sharing
  -> periodic send loop
  -> peer health / stale-tip / cleanup logic
```

## Connection management

Lower-level connection management is handled in the network layer.

Reviewed behavior includes:

- local address and listen-port handling;
- inbound/outbound connection setup;
- V1/V2 transport support;
- socket send/receive loops;
- inactivity and handshake timeouts;
- DNS seed / seed-node paths;
- peer cleanup and reconnection behavior.

Current mainnet source parameters use P2P port `8338`.

## Address manager and seeds

Address-manager state stores and scores candidate peer addresses and persists peer knowledge across restarts.

A configured DNS seed or stored address is discovery input, not proof that a peer is currently reachable.

Current v31 mainnet source explicitly includes `dnsseed.bitcoin-ii.org.` as a DNS seed. Older seed observations should remain version-labeled if retained elsewhere.

## Protocol and handshake

Reviewed protocol/handshake behavior includes:

- `version` / `verack` negotiation;
- common protocol-version selection;
- service flags;
- wtxid-relay negotiation;
- `sendaddrv2` handling;
- compact-block signaling;
- transaction-reconciliation signaling;
- early unsupported-message handling;
- peer permission and capability state.

Handshake success does not guarantee that a peer is useful for every purpose. Service flags, permissions, download state, chain knowledge, and later health checks still matter.

## Current v31 runtime observation

The September 11 isolated Windows mainnet test directly established current outbound peer operation:

- BitcoinII runtime protocol version `70016`;
- local service names included `NETWORK`, `WITNESS`, `NETWORK_LIMITED`, and `P2P_V2`;
- P2P listener on `0.0.0.0:8338`;
- first run: four outbound full-relay IPv4 peers;
- restart: six outbound full-relay IPv4 peers;
- observed peer subversion `/BitcoinII:31.1.0/`;
- current header chain acquired to height `58970` during the bounded test window;
- no inbound peers were observed in that test.

Peer addresses were intentionally omitted from the public record.

This is real runtime evidence that current v31 peer discovery/connection/header acquisition worked in that environment. It is not an uptime guarantee, an inbound-connectivity test, or packet-level protocol certification.

## Header and block sharing

Source review covers received-header processing, header/block requests, full-block receive paths, compact-block structure, block announcements, and send-loop download logic.

Current v31 adds an important BitcoinII-specific constraint: ShockWave-era competing branches need branch-specific recent target and median-time-past history when checking candidate difficulty.

The fork-aware header-sync path therefore maintains synthetic branch history and evaluates candidate `nBits` using production `GetNextWorkRequired()`.

Header synchronization remains separate from active-chain selection. The node still uses validation and accumulated-work rules to decide which usable branch becomes active.

See [Fork-aware header synchronization v31](../developers/source-atlas/headers-sync-v31.md).

## Transaction sharing

Transaction relay is connected to, but distinct from, local mempool acceptance.

Reviewed behavior includes:

- transaction inventory announcements;
- txid/wtxid relay behavior;
- full transaction-message handling;
- transaction download-manager interaction;
- orphan/package reconsideration;
- fee-filter and mempool request behavior;
- transaction request/announcement work in the send loop.

Important boundaries:

- local mempool acceptance does not guarantee network propagation;
- peer relay does not guarantee block inclusion;
- a transaction can be valid locally yet rejected by a remote peer's policy;
- MoreBC2's successful September `sendrawtransaction` test used a zero-peer regtest node and therefore did not test public relay.

## Address sharing and peer discovery

Reviewed address-sharing behavior includes known-address filtering, `addr` / `addrv2`, rate limits, reachability checks, and insertion into address-manager state.

MoreBC2 should not convert any discovered or configured address into a current reachability claim without a dated direct check.

## Peer health and cleanup

Reviewed peer-management behavior includes:

- explicit peer-list and discouragement state;
- selected misbehavior paths;
- stale-tip checks;
- extra outbound peer handling;
- ping timeout / keepalive behavior;
- disconnect cleanup;
- limited early-failure V2-to-V1 reconnect behavior.

These are heuristics and safety mechanisms, not proof that the node always chooses the globally best peers or that all denial-of-service risks are eliminated.

## Runtime boundary

Current evidence does **not** yet establish:

- inbound reachability from the public internet;
- long-duration peer stability;
- packet capture of handshake/message sequences;
- live competing-branch/header-sync behavior;
- broad transaction propagation from a current v31 wallet;
- geographic/backend diversity of the observed peer set;
- every P2P transport edge case.

## Related pages

- [Architecture overview](architecture-overview.md)
- [Node startup](node-startup.md)
- [Life of a block](life-of-a-block.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Mempool flow](mempool-flow.md)
- [P2P protocol primitives](../developers/source-atlas/protocol.md)
- [Net connection management](../developers/source-atlas/net-connection-management.md)
- [Net processing handshake](../developers/source-atlas/net-processing-handshake.md)
- [Net processing block/header relay](../developers/source-atlas/net-processing-block-relay.md)
- [Net processing transaction relay](../developers/source-atlas/net-processing-transaction-relay.md)
- [Net processing send loop](../developers/source-atlas/net-processing-send-loop.md)
- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 P2P/network/header-sync source reviews plus the September 11 Windows mainnet peer/header acquisition runtime record  
**Notes:** Outbound peer discovery/connection and current header acquisition have bounded v31 runtime evidence. Inbound connectivity, long-duration stability, packet-level coverage, live fork scenarios, and public transaction propagation remain unverified.
