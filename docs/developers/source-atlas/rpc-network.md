# Network RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-01

## Summary

This page covers a first-pass review of:

- `src/rpc/net.cpp`

This file exposes peer, connection, address-manager, ban-list, network-activity, and network-status commands through JSON-RPC.

This is not a tested command guide. Commands and examples should not be marked verified until they are run against BitcoinII Core in a documented local environment.

## Why this file matters

Network RPCs are useful for:

- Checking whether a node has peers.
- Inspecting peer connection details.
- Reading P2P network status.
- Checking reachable network/proxy state.
- Managing manually added peers.
- Reviewing address-manager state.
- Toggling local P2P activity.
- Troubleshooting node connectivity.

These commands matter for node operators, exchanges, explorers, pools, and anyone diagnosing sync or peer issues.

## Registered commands reviewed

`RegisterNetRPCCommands()` registers these commands under the `network` category:

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

Reviewed hidden commands include:

- `addconnection`
- `addpeeraddress`
- `sendmsgtopeer`
- `getrawaddrman`

## Read-only status commands

Reviewed read-only status commands include:

- `getconnectioncount`
- `getpeerinfo`
- `getnettotals`
- `getnetworkinfo`
- `getaddednodeinfo`
- `getnodeaddresses`
- `getaddrmaninfo`
- `listbanned`

Observed behavior includes:

- Reading total peer counts from connection manager state.
- Returning peer details such as address, services, relay state, bytes in/out, ping data, block/header sync data, permissions, connection type, transport type, and per-message byte totals.
- Returning total network bytes in/out and upload-target state.
- Returning local version, protocol version, service flags, relay fee fields, connection counts, reachable networks, proxy settings, local addresses, and warnings.
- Returning manually added node information.
- Returning known peer addresses filtered by count and optional network.
- Returning address-manager counts by network.
- Returning manually banned address or subnet entries.

These are the safest candidates for future node-operation examples after local testing.

## Commands that change peer or network state

Reviewed state-changing commands include:

- `ping`
- `addnode`
- `disconnectnode`
- `setban`
- `clearbanned`
- `setnetworkactive`

Observed behavior includes:

- `ping` asks the peer manager to send ping messages during later message handling.
- `addnode` can add, remove, or try a manual peer connection, with optional v2 transport handling.
- `disconnectnode` disconnects a peer by address or node id.
- `setban` adds or removes a manual ban entry for an address or subnet and may disconnect matching peers.
- `clearbanned` clears the manual ban list.
- `setnetworkactive` enables or disables P2P network activity through connection manager state.

These should be documented carefully because they can change node behavior even though they do not move funds.

## Testing-only and experimental commands

Reviewed hidden/testing commands include:

- `addconnection`
- `addpeeraddress`
- `sendmsgtopeer`
- `getrawaddrman`

Observed behavior includes:

- `addconnection` is restricted to regtest mode and opens a specified outbound connection type.
- `addpeeraddress` adds a potential peer address to the address manager table and is marked testing-only in help text.
- `sendmsgtopeer` sends a supplied P2P message body to a peer and is marked testing-only in help text.
- `getrawaddrman` is marked experimental and returns detailed address-manager table entries.

These should not be used in beginner node docs.

## Network and transport notes

Reviewed help text describes connection types including:

- outbound full relay
- block-relay-only
- inbound
- manual
- addr-fetch
- feeler

Reviewed help text also describes transport protocol types:

- detecting
- v1 plaintext transport
- v2 BIP324 encrypted transport

MoreBC2 has not yet reviewed the lower-level P2P implementation deeply enough to explain transport behavior beyond the RPC help text.

## Documentation implications

MoreBC2 should separate future network command documentation into:

- Read-only node status checks.
- Manual peer management.
- Ban-list management.
- Network activity controls.
- Address-manager diagnostics.
- Regtest/testing-only commands.

For first command smoke tests, `getnetworkinfo`, `getconnectioncount`, `getpeerinfo`, `getnettotals`, and `getmempoolinfo` are better candidates than peer-changing commands.

## Relationship to other pages

Related pages:

- [RPC overview](../rpc-overview.md)
- [Node guide](../../nodes/node-guide.md)
- [Node startup](../../architecture/node-startup.md)
- [Command smoke-test plan](../../verification/command-smoke-test-plan.md)
- [Command testing status](../../verification/command-testing.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming in RPC help text and examples.

No upstream comparison has been completed, so this page does not claim whether network RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which network RPC commands should be included in the first local smoke-test record?
- Which network RPCs should appear in normal node-operator docs?
- Which peer-changing commands should remain advanced-only?
- Which hidden/testing commands should be left out of public docs entirely?
- How should v2 transport and BIP324 be explained for BitcoinII users?
- Which lower-level P2P files should be reviewed next?
- Confirm whether `v29.1.0` differs from current `main` for this file before upgrading status.

## Sources

- Current observed `main` `src/rpc/net.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/rpc/net.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- Current observed `main` `src/net.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net.h
- Current observed `main` `src/netbase.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/netbase.h
- Current observed `main` `src/protocol.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/protocol.h

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass network RPC review. Commands have not been run. Public examples, node-operator recommendations, lower-level P2P behavior, upstream comparison, and release-versus-main comparison remain open.
