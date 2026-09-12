# Net connection management

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Runtime-corroborated structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps lower-level BitcoinII Core peer connection management in `src/net.h` / `src/net.cpp` for the current `v31.1.0` baseline.

The older page was source-only. MoreBC2 now has bounded current-release runtime evidence for mainnet listening, automatic outbound connection establishment, peer-count growth, header acquisition, and clean reconnect after restart. That does not mean every socket, seed, transport, inbound, eviction, or failure branch has been tested.

## Main responsibilities

Reviewed `net.*` behavior covers areas such as:

- listen/outbound connection setup;
- socket send/receive handling;
- local address discovery/advertisement;
- transport selection/state;
- inbound admission hooks;
- DNS/seed-node/address-fetch paths;
- connection timeout/cleanup/reconnect behavior;
- connection-count and network-reachability helpers.

Peer message semantics live primarily in `net_processing`; addrman and BanMan are separate state managers.

## Current network constants / defaults

Source-review of connection-layer defaults includes ordinary limits/timeouts such as outbound slots, feeler/block-relay roles, listen state, peer connect timeout, DNS/fixed-seed enablement, and v2 transport support.

These are local node defaults/limits, not promises that a live node will always maintain a fixed number of peers.

Current BitcoinII mainnet identity comes from chain parameters:

- P2P default port: `8338`;
- message start: `42 49 49 21`.

The generated example-config comment mentioning `8333` is inherited/stale and must not override current chain parameters or runtime observation.

## Outbound connection creation

Reviewed source handles target selection/resolution, duplicate/local checks, proxy/direct/I2P paths, connection type, transport selection, permissions, node ids/nonces/network groups, and addrman attempt state.

The September 11 Windows `v31.1.0` test provides current runtime corroboration:

- P2P listener on `0.0.0.0:8338`;
- 4 outbound peers during the initial bounded run;
- 6 outbound peers after restart;
- no manual peer injection required;
- current header acquisition and advancing IBD.

That proves ordinary outbound connection establishment worked in the test environment, not which exact discovery source produced each peer.

## Inbound admission

Source-reviewed inbound gates include ban/discouragement state, slot pressure/eviction, permissions, node/transport construction, and message-processing initialization.

MoreBC2 has **not** run a dedicated inbound-connectivity test on `v31.1.0`. Current runtime evidence is outbound-only.

## Local address behavior

Reviewed helpers select listen/local addresses according to configuration, reachability, peer network, discovery state, and address quality. Unroutable or cross-network-inappropriate addresses are not blindly advertised.

The September runtime record does not establish public inbound reachability or a full local-address-advertisement census.

## Connection timeout / cleanup

Reviewed lower-level logic handles initial handshake/connect timeouts, send/receive inactivity, transport-state failure, socket cleanup, outbound grants, and delayed deletion of disconnected node objects.

The current runtime test observed successful clean node shutdown/restart, but did not intentionally trigger timeout/reconnect edge cases.

## V1 / V2 transport boundary

Source contains both legacy v1 and BIP324-style v2 transport state, including incoming fallback/detection and selected outgoing retry behavior.

Older v29 MoreBC2 observations saw v2 transport on observed peers. The September v31 test was not an exhaustive transport audit; MoreBC2 therefore does not claim every current peer used v2 or every v2 failure/fallback path was exercised.

## DNS / seed context

Current `v31.1.0` chain parameters explicitly list:

- `dnsseed.bitcoin-ii.org.`

Addrman, seed nodes/fixed seeds, DNS seeding, and address-fetch paths can all contribute to discovery depending on local state/configuration.

The successful outbound runtime test does not identify exactly which seed/discovery source supplied each peer, and source presence does not prove seed availability at a particular moment.

See [Addrman](addrman.md).

## Security / RPC boundary

P2P connection management is separate from JSON-RPC administration. MoreBC2's v31 RPC test used loopback binding/cookie auth; exposing RPC publicly is not required for P2P operation and is not recommended as a normal node setup pattern.

Peer-changing RPCs should remain advanced/operator material.

## Related pages

- [Protocol primitives](protocol.md)
- [Network RPC](rpc-network.md)
- [Addrman](addrman.md)
- [BanMan](banman.md)
- [Peer handshake](net-processing-handshake.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Dedicated inbound-P2P test.
- Privacy-safe current v31 transport observation.
- Controlled timeout/reconnect/failure tests.
- Deeper fixed-seed/DNS-source attribution only if operator guidance needs it.
- Relevant network test execution after a clean source build.

## Primary sources

- `v31.1.0/src/net.h`
- `v31.1.0/src/net.cpp`
- related `v31.1.0` protocol/net-processing/addrman/BanMan paths

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Runtime-corroborated structural  
**Primary evidence:** BitcoinII Core `v31.1.0` connection-management source plus September 11 bounded outbound-P2P runtime evidence  
**Notes:** Ordinary current-release outbound connectivity is observed. Inbound, transport census, seed-source attribution, and failure-path coverage remain unverified.
