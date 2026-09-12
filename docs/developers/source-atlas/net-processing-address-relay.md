# Net processing address relay

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps address-relay and peer-discovery-adjacent behavior in BitcoinII Core `v31.1.0` `src/net_processing.*`.

The reviewed source supports both legacy `addr` and BIP155-style `addrv2` handling, rate/size limits, per-peer known-address tracking, reachability/service filtering, and insertion into addrman. It is not proof that every received address is live or that any particular seed/provider is reliable.

## Relay setup

Reviewed helpers establish whether address relay is permitted for a peer and track addresses already known by that peer.

Addresses queued for relay are checked for validity/compatibility and bounded so queues do not grow without limit. Peers without ADDRv2 capability cannot receive address types that require the newer encoding.

## `addr` / `addrv2` processing

Reviewed behavior includes:

- selecting the appropriate address serialization format;
- rejecting oversized address messages through misbehavior handling;
- rate limiting ordinary peers with token-bucket-style accounting;
- shuffling received records before processing;
- filtering by useful services/reachability;
- normalizing implausible timestamps;
- avoiding further use of banned/discouraged addresses;
- adding accepted addresses to addrman with the sending peer as source;
- limited relay of recent/routable small announcements to other peers.

## Handshake / `getaddr` relationship

Eligible outbound peers can initialize address relay after handshake and may receive a one-time `getaddr` request to help populate addrman state.

Connection type matters; address relay is not assumed for every peer class.

## Current runtime boundary

The September 11 `v31.1.0` mainnet node automatically discovered and connected to outbound peers, which corroborates that the overall discovery/connection ecosystem was functional in the documented environment.

MoreBC2 did **not** instrument individual `addr`/`addrv2` messages, `getaddr` responses, relay destination rotation, or source attribution for each discovered peer.

## Current seed boundary

Current v31 mainnet source lists `dnsseed.bitcoin-ii.org.`. Addresses may also arise from fixed seeds, addrman persistence, peer relay, or other connection-manager paths.

A working connection does not establish which mechanism supplied that peer.

## Privacy boundary

Address-relay state contains network addresses. Public test records should summarize behavior without exposing unnecessary peer-identifying information.

## Related pages

- [Addrman](addrman.md)
- [Peer handshake](net-processing-handshake.md)
- [Net connection management](net-connection-management.md)
- [Protocol primitives](protocol.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Trace `SendMessages`/`getaddr` response construction if deeper documentation is needed.
- Instrument address relay only in a privacy-safe disposable environment.
- Keep live seed/peer reachability as dated operational evidence, separate from source behavior.

## Primary sources

- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net_processing.h`
- `v31.1.0/src/protocol.h`
- current addrman/connection-management paths

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` address-relay source plus bounded automatic-peer-discovery runtime corroboration  
**Notes:** Address-relay rules are source-mapped; individual live relay messages, response construction, and peer-source attribution remain uninstrumented.
