# Net processing send loop

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` `PeerManagerImpl::SendMessages` and nearby send-loop helpers.

The send loop coordinates what an established peer should receive/request next: pings, address relay, headers sync, block announcements/download requests, transaction inventory/download requests, mempool responses, and fee filters. Timing, peer permissions/state, inventory knowledge, filters, and download windows all affect behavior.

It should not be used to promise instant propagation after local submission.

## Entry / handshake gates

Reviewed behavior includes:

- peer-state lookup;
- discouragement/disconnect handling before ordinary sends;
- sending a local version to outbound peers where needed;
- stopping ordinary send-loop work until the version handshake completes;
- early return for peers already marked for disconnect;
- address-fetch timeout handling.

## Periodic peer messages

After handshake, the send loop can handle:

- ping/keepalive and timeout logic;
- address sharing;
- `sendheaders` signaling;
- fee-filter updates later in the cycle.

These mechanisms are peer/state dependent rather than unconditional broadcasts.

## Header sync / block announcements

Reviewed behavior can start headers sync for eligible peers and can announce blocks using:

- headers;
- high-bandwidth compact blocks in selected near-tip cases;
- inventory fallback.

Current BC2's downstream header validation must satisfy ShockWave/fork-aware next-work rules; the send loop does not override consensus validation.

## Transaction announcements

Transaction inventory is sent only for peers with transaction-relay state and is filtered by factors such as:

- announcement timing/trickle state;
- already-known inventory;
- local mempool presence;
- peer fee filter;
- bloom relevance where applicable;
- txid/wtxid relay negotiation.

Local mempool acceptance therefore does not guarantee immediate announcement to every peer.

## Mempool responses

BIP35-style mempool request responses are also filtered by relay negotiation, fee filters, bloom state, and local mempool contents.

They are snapshots of what the local node chooses to announce under current peer policy, not a network-global mempool view.

## Download health / requests

Reviewed send-loop logic also handles:

- block download stalling/timeout checks;
- headers-sync timeout handling;
- peer usefulness/eviction checks;
- selecting/requesting blocks subject to download windows/in-flight state;
- selecting/requesting transactions through the transaction download manager;
- batching/flushing `getdata` inventory.

## Runtime boundary

September `v31.1.0` runtime evidence observed successful outbound peer connections, current header acquisition, advancing IBD, and clean restart.

That necessarily exercised ordinary live send/receive scheduling to some degree, but MoreBC2 did **not** instrument this function or prove specific inventory trickle, compact-block, timeout, fee-filter, or transaction-request branches fired.

The September regtest `sendrawtransaction` test used **zero peers**, so it provides no transaction send-loop/propagation evidence.

## Broadcast boundary

A local RPC submission can succeed without proving public relay. Public explorer routes rejecting malformed transaction data likewise do not prove a valid transaction would propagate.

The correct evidence chain distinguishes:

- local mempool acceptance;
- P2P announcement/request/relay;
- peer mempool acceptance;
- block inclusion;
- confirmations / accumulated work.

## Related pages

- [Peer handshake](net-processing-handshake.md)
- [Address relay](net-processing-address-relay.md)
- [Block/header relay](net-processing-block-relay.md)
- [Transaction relay](net-processing-transaction-relay.md)
- [Peer health / eviction](net-processing-peer-eviction.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Life of a transaction](../../architecture/life-of-a-transaction.md)

## Open work

- Instrument selected send-loop behavior only in a disposable/privacy-safe fixture if needed.
- Keep compact-block/download-manager detail separate from ordinary node setup docs.
- Perform valid public broadcast testing only with explicit disposable scope if that evidence becomes necessary.

## Primary sources

- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net_processing.h`
- current connection/mempool/relay helpers

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` send-loop source plus bounded ordinary mainnet P2P runtime context  
**Notes:** Send-loop structure is current. Exact message scheduling/propagation branches remain uninstrumented; zero-peer local transaction submission is not relay evidence.
