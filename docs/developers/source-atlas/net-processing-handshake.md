# Net processing handshake

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Runtime-corroborated structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps the peer handshake and early feature-negotiation portion of BitcoinII Core `v31.1.0` `src/net_processing.*`.

The source review covers `version` / `verack`, service/version checks, self-connection handling, relay preferences, and early feature messages such as `wtxidrelay`, `sendaddrv2`, compact-block signaling, and optional transaction-reconciliation negotiation.

September `v31.1.0` runtime evidence now corroborates successful ordinary outbound handshakes because the isolated mainnet node established multiple outbound peers and began current header synchronization. That does not mean every feature-negotiation branch was instrumented.

## Handshake flow

Reviewed `version` processing includes:

- parsing protocol version, services, time, addresses, nonce, subversion, start height, and relay preference;
- rejecting peers below the minimum supported protocol version;
- self-connection detection for inbound connections;
- recording peer services and negotiated common protocol version;
- disconnecting selected outbound peers that fail expected-service requirements;
- sending the local version response for inbound peers where appropriate;
- transitioning toward `verack` and successful-connection state.

Messages arriving before the expected handshake stage can be ignored or cause disconnect according to their timing requirements.

## Early feature negotiation

Source-reviewed early features include:

- `wtxidrelay`;
- `sendaddrv2`;
- compact-block signaling;
- optional transaction reconciliation;
- address-fetch / `getaddr` behavior for selected outbound peers.

Some negotiation messages are only valid before successful connection and are treated differently if received after `verack`.

## Runtime evidence — 2026-09-11

The isolated Windows `v31.1.0` mainnet node observed:

- protocol version `70016`;
- four outbound peers during the first run;
- six outbound peers after restart;
- current header acquisition and advancing IBD;
- no manual peer injection required.

Those facts require successful enough version/verack/peer initialization for normal synchronization to proceed and therefore corroborate the ordinary outbound handshake path.

MoreBC2 did **not** capture or publish every negotiation message, peer address, service-flag combination, or transport handshake detail.

## BitcoinII-specific boundary

The broad version/verack structure remains Bitcoin-style. Current BitcoinII divergence becomes material after/around connection establishment through chain/network identity and validation rules such as:

- mainnet message start / P2P port;
- ShockWave contextual header difficulty;
- fork-aware header synchronization;
- replay-protection transaction signatures;
- consensus data restrictions.

A successful generic Bitcoin-style handshake therefore does not imply full protocol/transaction/mining compatibility.

## Privacy boundary

Peer diagnostics can reveal public/local network addresses and session details. MoreBC2's runtime records summarize peer counts/state without publishing an identifiable peer list.

## Related pages

- [Protocol primitives](protocol.md)
- [Net connection management](net-connection-management.md)
- [Network RPC](rpc-network.md)
- [Fork-aware header synchronization](headers-sync-v31.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Privacy-safe current v31 capture of selected negotiation/transport properties if needed.
- Keep address, block/header, transaction relay and peer-health behavior in their dedicated pages.
- Do not generalize one peer's negotiated features to the entire network.

## Primary sources

- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net_processing.h`
- `v31.1.0/src/protocol.*`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Runtime-corroborated structural  
**Primary evidence:** BitcoinII Core `v31.1.0` handshake source plus September 11 successful outbound-peer/synchronization runtime evidence  
**Notes:** Ordinary outbound handshake success is corroborated. Exact feature-negotiation, inbound, transport, and failure branches remain uninstrumented.
