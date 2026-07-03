# Architecture

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

The architecture section explains how BitcoinII Core components fit together at a conceptual level.

Architecture pages should stay conservative. If a relationship has not been verified from source code, documentation, or tested behavior, mark it as an open question.

## Current pages

- [Architecture overview](architecture-overview.md)
- [Node startup](node-startup.md)
- [Consensus model](consensus-model.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Block validation flow](block-validation-flow.md)
- [Mempool flow](mempool-flow.md)
- [Peer communication model](peer-communication-model.md)

## P2P Source Atlas support

Peer communication now has a Draft architecture model and first-pass Source Atlas support for:

- [P2P protocol primitives](../developers/source-atlas/protocol.md)
- [Network RPC](../developers/source-atlas/rpc-network.md)
- [Address manager](../developers/source-atlas/addrman.md)
- [Peer list management](../developers/source-atlas/banman.md)
- [Net connection management](../developers/source-atlas/net-connection-management.md)
- [Net processing handshake](../developers/source-atlas/net-processing-handshake.md)
- [Net processing address relay](../developers/source-atlas/net-processing-address-relay.md)
- [Net processing block and header relay](../developers/source-atlas/net-processing-block-relay.md)
- [Net processing transaction relay](../developers/source-atlas/net-processing-transaction-relay.md)
- [Net processing peer health and stale-tip checks](../developers/source-atlas/net-processing-peer-eviction.md)
- [Net processing send loop](../developers/source-atlas/net-processing-send-loop.md)

These pages are source-observed first-pass reviews, not live-network tests or final protocol specifications.

## Planned pages

- Node lifecycle
- RPC flow
- Wallet flow
- Mining flow

## Rules

- Explain concepts in plain language.
- Link back to source files where possible.
- Do not invent internal behavior.
- Mark unverified relationships as Needs Review.
- Separate inherited Bitcoin Core architecture from BitcoinII-specific verified changes.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This section is being created as a framework for source-backed architecture documentation. P2P behavior now has Source Atlas support through address-manager review and a Draft architecture model, but live testing and release comparison remain pending.
