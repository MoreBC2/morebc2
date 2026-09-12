# Addrman

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core's address manager (`addrman`) using the current `v31.1.0` baseline.

Addrman stores and selects candidate peer addresses learned from seed paths, peer address relay, and successful connections. It uses randomized new/tried tables, quality weighting, collision handling, and serialized `peers.dat` state rather than a simple static peer list.

The old page also carried stale seed wording: current `v31.1.0` mainnet chain parameters explicitly list **`dnsseed.bitcoin-ii.org.`**. The older `bitcoinII.ddns.net.` value is historical and should not be presented as a current v31 DNS seed without new evidence.

## New and tried tables

Reviewed structure separates addresses into:

- **new** — not yet proven reachable by this node;
- **tried** — promoted after successful connection handling.

The source uses randomized bucket placement keyed by a per-addrman secret to make wholesale table capture harder. Selection remains probabilistic and quality-weighted rather than deterministic.

## Quality and selection

Reviewed selection logic considers factors such as:

- recent attempts;
- last success;
- failure count;
- address age / invalid future timestamps;
- network filters;
- new/tried bucket state.

A stored or returned address is therefore not proof that a peer is currently online.

## Add / success / collision handling

Reviewed behavior includes:

- rejecting unroutable addresses;
- updating timestamp/service metadata under defined conditions;
- allowing an address multiple references in new buckets up to limits;
- promoting successful candidates toward tried state;
- handling tried-slot collisions through a bounded collision set / feeler-style reachability process rather than immediate blind eviction.

## `GetAddr` boundary

Addrman can return randomized candidate addresses subject to count/percentage/network/quality filtering. That output should not be described as a verified live peer list.

## Serialization / `peers.dat`

Addrman serializes compact state including versioning, key, new/tried entries, bucket relationships, and asmap-related context. Load-time checks can reject corrupt/inconsistent state or rebucket entries where format/asmap context changes.

`peers.dat` should therefore be described as serialized address-manager state, not a human-maintained list of known-good nodes.

## Current seed context

For current `v31.1.0` mainnet:

- DNS seed: `dnsseed.bitcoin-ii.org.`
- fixed-seed data remains source-defined separately in `chainparamsseeds.h` / chain parameters.

The older `bitcoinII.ddns.net.` seed recorded in earlier MoreBC2 material is historical unless re-established by a current release or project-controlled source.

Source presence does not prove a seed is reachable at a particular moment.

## Runtime evidence — 2026-09-11

The isolated Windows `v31.1.0` mainnet node successfully discovered outbound peers without manual peer injection:

- 4 outbound peers during the first bounded run;
- 6 after restart.

That provides current-release runtime corroboration that ordinary discovery/address-selection paths can produce working connections in the documented environment.

It does **not** instrument which exact DNS/fixed/addrman source supplied each peer, prove every seed reachable, or qualify addrman collision/eviction behavior.

## Relationship to connection management

Addrman feeds the lower-level outbound connection machinery; peer processing can also add/update addresses and mark successful connectivity.

See [Net connection management](net-connection-management.md), [Address relay](net-processing-address-relay.md), and [Network RPC](rpc-network.md).

## Privacy / operator boundary

Raw address-manager and peer outputs can expose network addresses. MoreBC2's runtime records intentionally avoid publishing identifiable peer lists.

Detailed addrman mutation/testing commands should remain developer/operator-only until a dedicated safe fixture exists.

## Related pages

- [Network RPC](rpc-network.md)
- [Protocol primitives](protocol.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Map current v31 addrman tests/caller paths if deeper operator guidance becomes useful.
- Test corruption/recovery or raw addrman diagnostics only with disposable state.
- Keep live seed reachability as a separate dated network check rather than a source claim.

## Primary sources

Pinned/current review scope:

- `v31.1.0/src/addrman.h`
- `v31.1.0/src/addrman.cpp`
- `v31.1.0/src/addrman_impl.h`
- `v31.1.0/src/chainparamsseeds.h`
- `v31.1.0/src/kernel/chainparams.cpp`
- `v31.1.0/src/net.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` addrman/seed source plus bounded September 11 automatic outbound-peer runtime evidence  
**Notes:** Addrman structure and current DNS-seed wording are synchronized. Exact peer-source attribution, seed reachability, collision behavior, and raw addrman mutation remain untested.
