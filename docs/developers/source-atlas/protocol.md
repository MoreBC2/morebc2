# P2P protocol primitives

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps low-level BitcoinII Core P2P protocol primitives centered on `src/protocol.h` / `src/protocol.cpp` for the current `v31.1.0` documentation baseline.

These files define message names/header shape, service flags, address serialization, and inventory types. They are protocol building blocks rather than a full peer-behavior specification.

MoreBC2 now also has bounded `v31.1.0` runtime evidence for the surrounding network stack: protocol version `70016`, mainnet P2P listener `8338`, automatic outbound peer discovery, current header acquisition, and clean restart. That runtime evidence does not prove every message type or transport branch listed here was exercised.

## Message header

`CMessageHeader` contains:

- message-start bytes;
- fixed-size message type;
- payload size;
- checksum.

Reviewed constants include a 12-byte message-type field and the ordinary payload-size/checksum fields. Message-type validation checks printable command bytes and zero padding after the first null.

Current mainnet message-start bytes are defined in chain parameters as:

```text
42 49 49 21
```

See [chainparams.cpp](chainparams-cpp.md).

## Message names

Reviewed protocol message names include the ordinary version/handshake, address, inventory, block/header, transaction, compact-block, compact-filter, ping/pong, fee-filter, wtxid-relay, and transaction-reconciliation families.

Examples include:

- `version`, `verack`;
- `addr`, `addrv2`, `sendaddrv2`;
- `inv`, `getdata`, `notfound`;
- `getblocks`, `getheaders`, `headers`, `block`;
- `tx`, `wtxidrelay`;
- `ping`, `pong`;
- `sendheaders`, `feefilter`;
- `sendcmpct`, `cmpctblock`, `getblocktxn`, `blocktxn`;
- compact-filter request/response messages;
- `sendtxrcncl`.

Presence in the protocol constants does not establish that every message is negotiated, enabled, or used by every current peer.

## Service flags

Reviewed service flags include:

- `NODE_NETWORK`
- `NODE_BLOOM`
- `NODE_WITNESS`
- `NODE_COMPACT_FILTERS`
- `NODE_NETWORK_LIMITED`
- `NODE_P2P_V2`

Service flags describe advertised capabilities. Runtime interpretation depends on node configuration/state; for example, pruning and enabled indexes can affect what a node can serve.

The September v31 node test observed ordinary outbound mainnet operation, but MoreBC2 did not publish a full service-flag census for every peer or node mode.

## Address serialization

`CAddress` extends service/network-address data with time and service flags and supports the reviewed v1/v2 network/disk serialization forms.

This page does not document address-manager selection/tried/new-table behavior. See [Addrman](addrman.md).

## Inventory types

Reviewed inventory types cover transactions, blocks, witness forms, filtered blocks, compact blocks, and wtxid-aware transaction inventory.

The inventory helpers map type/hash pairs to protocol message concepts and distinguish txid/wtxid forms where applicable.

## Current v31 runtime identity

The September 11 Windows mainnet record directly observed:

- runtime `/BitcoinII:31.1.0/`;
- protocol version `70016`;
- mainnet P2P listener `0.0.0.0:8338`;
- automatic outbound peers without manual peer injection;
- current header acquisition and advancing IBD.

Those observations establish current P2P interoperability for the bounded node environment. They do not show that every listed message, inventory type, service flag, or transport mode was exercised.

## Transport boundary

The source contains BIP324/v2 transport capability concepts and the network stack can report transport state through peer/network diagnostics.

Older MoreBC2 v29 observations included v2 transport on observed peers. The September v31 runtime test was not designed as an exhaustive transport census, so this page does not claim all current BC2 peers use v2 or that every v2 path has been runtime-qualified on v31.

## BitcoinII-specific boundaries

The broad protocol primitive structure remains Bitcoin-like, but current BC2 behavior differs materially elsewhere:

- mainnet network identity/port are BitcoinII-specific;
- ShockWave changes contextual header required-work validation;
- fork-aware header sync carries additional history for post-activation difficulty validation;
- replay protection changes transaction signature-domain semantics;
- consensus data restrictions change valid post-activation transaction/block constructions.

Therefore low-level message compatibility must not be mistaken for full Bitcoin network/transaction compatibility.

## Related pages

- [Network RPC](rpc-network.md)
- [Net connection management](net-connection-management.md)
- [Peer handshake](net-processing-handshake.md)
- [Fork-aware header synchronization](headers-sync-v31.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Produce a dedicated current v31 transport observation only if it can be done without exposing peer-identifying data.
- Map message families to the current `net_processing` paths where deeper operator/integration guidance needs it.
- Keep service-flag behavior configuration-specific rather than universal.

## Primary sources

Pinned/current review scope:

- `v31.1.0/src/protocol.h`
- `v31.1.0/src/protocol.cpp`
- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net.*`
- `v31.1.0/src/netaddress.h`
- `v31.1.0/src/kernel/chainparams.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` protocol/network source plus September 11 bounded P2P runtime evidence  
**Notes:** Protocol primitives and current network identity are synchronized. Ordinary outbound P2P is runtime-observed; exhaustive message/transport/service-flag behavior remains intentionally unclaimed.
