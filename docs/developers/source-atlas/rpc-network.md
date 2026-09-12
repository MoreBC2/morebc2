# Network RPC

**Category:** Developer / Source Atlas  
**Status:** Source-reviewed / Runtime-tested partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` network RPC behavior centered on `src/rpc/net.cpp`.

The earlier page was source-only. MoreBC2 now has bounded current-release runtime evidence for selected read-only network RPCs plus real outbound P2P peer discovery on mainnet. Peer-changing, ban-list, address-manager mutation, testing-only, and hidden methods remain source-reviewed rather than runtime-qualified.

## Reviewed command surface

Source review includes:

- `getconnectioncount`
- `ping`
- `getpeerinfo`
- `addnode`
- `disconnectnode`
- `getaddednodeinfo`
- `getnettotals`
- `getnetworkinfo`
- `setban`
- `listbanned`
- `clearbanned`
- `setnetworkactive`
- `getnodeaddresses`
- `getaddrmaninfo`

Testing/hidden surfaces include commands such as `addconnection`, `addpeeraddress`, `sendmsgtopeer`, and `getrawaddrman`.

Existence in source is not a recommendation to expose or use a command in production.

## Current v31 runtime evidence

The September 11 isolated Windows mainnet test directly exercised:

- `getnetworkinfo`
- `getpeerinfo`
- `getnettotals`

The same run observed:

- `/BitcoinII:31.1.0/`;
- protocol version `70016`;
- P2P listener on mainnet port `8338`;
- four outbound peers during the first bounded run;
- six outbound peers after restart;
- current header acquisition and advancing IBD;
- clean shutdown/restart.

Raw peer-address output was treated as privacy-sensitive and was not published as a peer list.

See [Windows v31.1.0 node and RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md).

## Read-only status methods

Source-reviewed status methods include:

- `getconnectioncount`
- `getpeerinfo`
- `getnettotals`
- `getnetworkinfo`
- `getaddednodeinfo`
- `getnodeaddresses`
- `getaddrmaninfo`
- `listbanned`

Typical outputs can expose peer addresses, local addresses, proxy configuration, service flags, connection types, byte totals, synchronization state, and other operational metadata.

Even read-only output can be privacy-sensitive. Public documentation should prefer redacted/summarized examples where peer or local-network identifiers are present.

## `getnetworkinfo`

Current v31 runtime evidence establishes this RPC works in the documented loopback-cookie environment and reports release/protocol/network state.

Do not treat time-dependent connection counts, addresses, warnings, or traffic fields from one test as protocol constants.

## `getpeerinfo`

Current v31 runtime evidence establishes peer information was available while the isolated node maintained outbound mainnet connections.

The method can expose addresses/session details. MoreBC2 should publish only the fields necessary for the point being documented, with addresses redacted unless a specific public-peer disclosure is intentional.

## `getnettotals`

Current v31 runtime evidence establishes network traffic totals were available in the bounded node test. Values are local-node/session data, not network-wide totals.

## Commands that change network state

Source-reviewed state-changing commands include:

- `ping`
- `addnode`
- `disconnectnode`
- `setban`
- `clearbanned`
- `setnetworkactive`

These can alter peer/network state even though they do not move wallet funds. They should stay operator/advanced material until a dedicated disposable-node workflow is tested.

The current MoreBC2 v31 node guide intentionally relies on ordinary peer discovery rather than publishing manual-peer manipulation as the normal setup path.

## Address-manager and ban-list boundary

`getnodeaddresses`, `getaddrmaninfo`, `getrawaddrman`, ban-list methods, and address-manager mutation/testing commands operate on local peer-discovery state.

The September v31 test demonstrated successful automatic outbound peer discovery. It did **not** qualify raw addrman mutation, ban manipulation, or manual-peer state transitions.

See [Addrman](addrman.md) and [Banman](banman.md).

## Transport/connection types

Source/help text distinguishes connection types such as outbound full relay, block-relay-only, inbound, manual, addr-fetch, and feeler, and includes v1/v2 transport concepts.

MoreBC2 should not infer that every current BC2 connection uses one transport type from old v29 observations. The September v31 node test established working outbound connectivity, not an exhaustive v31 transport census.

## Security boundary

JSON-RPC should remain loopback/private unless an operator deliberately hardens and exposes it. The current MoreBC2 v31 runtime validation used loopback binding and random-cookie authentication.

Network RPC is an administrative surface; peer-changing/testing methods should not be exposed to untrusted callers.

## Related pages

- [RPC overview](../rpc-overview.md)
- [Protocol primitives](protocol.md)
- [Net connection management](net-connection-management.md)
- [Addrman](addrman.md)
- [Banman](banman.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Node guide](../../nodes/node-guide.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Runtime-test `getconnectioncount`, `getnodeaddresses`, and `getaddrmaninfo` in a current isolated v31 operator fixture if useful.
- Keep manual-peer/ban/network-active changes out of beginner docs until tested safely.
- Add a dedicated v31 transport observation only if it can be collected without exposing peer information.
- Continue release-pinned review where network RPC behavior materially diverges from inherited Bitcoin structure.

## Primary sources

Pinned/current review scope:

- `v31.1.0/src/rpc/net.cpp`
- `v31.1.0/src/net.cpp`
- `v31.1.0/src/net.h`
- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/protocol.*`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary evidence:** BitcoinII Core `v31.1.0` source plus September 11 Windows mainnet network-RPC/P2P runtime evidence  
**Notes:** Selected read-only network RPCs and automatic outbound connectivity are current-release runtime-observed. Peer-changing, addrman/ban mutation, hidden/testing commands, inbound behavior, and exhaustive transport behavior remain unverified.
