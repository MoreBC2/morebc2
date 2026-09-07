# P2P protocol primitives

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-01

## Summary

This page covers a first-pass review of:

- `src/protocol.h`
- `src/protocol.cpp`

These files define low-level P2P protocol message names, message-header shape, service flags, address serialization helpers, inventory types, and inventory-string behavior.

This page is not a full P2P behavior review. It maps protocol primitives that are used by networking, peer processing, RPC output, and diagnostics.

## Why these files matter

Protocol primitives affect:

- How P2P messages are named and identified.
- How message headers are shaped.
- How node service capabilities are represented.
- How addresses are serialized in v1/v2 formats.
- How inventory announcements identify transactions, blocks, compact blocks, witness data, and wtxid relay items.
- How RPC output turns service flags and inventory types into human-readable strings.

## Message header reviewed

`CMessageHeader` contains:

- message-start characters
- message type
- payload size
- checksum

Reviewed constants include:

- `MESSAGE_TYPE_SIZE = 12`
- `MESSAGE_SIZE_SIZE = 4`
- `CHECKSUM_SIZE = 4`
- computed offsets for size and checksum
- computed header size

Reviewed behavior includes:

- Constructing a header from message-start characters, message type, and payload size.
- Copying the message type into the fixed-size message-type field.
- Asserting if the supplied message type is longer than the fixed field.
- Returning the message type as a string up to the first null byte.
- Checking that message type bytes are printable ASCII and that bytes after the first null are zero.

## P2P message names reviewed

Reviewed `NetMsgType` names include:

- `version`
- `verack`
- `addr`
- `addrv2`
- `sendaddrv2`
- `inv`
- `getdata`
- `merkleblock`
- `getblocks`
- `getheaders`
- `tx`
- `headers`
- `block`
- `getaddr`
- `mempool`
- `ping`
- `pong`
- `notfound`
- `filterload`
- `filteradd`
- `filterclear`
- `sendheaders`
- `feefilter`
- `sendcmpct`
- `cmpctblock`
- `getblocktxn`
- `blocktxn`
- `getcfilters`
- `cfilter`
- `getcfheaders`
- `cfheaders`
- `getcfcheckpt`
- `cfcheckpt`
- `wtxidrelay`
- `sendtxrcncl`

`ALL_NET_MESSAGE_TYPES` records the known message types in the same order as the declarations.

## Service flags reviewed

Reviewed service flags include:

- `NODE_NONE`
- `NODE_NETWORK`
- `NODE_BLOOM`
- `NODE_WITNESS`
- `NODE_COMPACT_FILTERS`
- `NODE_NETWORK_LIMITED`
- `NODE_P2P_V2`

Observed notes include:

- `NODE_NETWORK` indicates a node can serve the complete block chain and is unset by pruned/light clients.
- `NODE_WITNESS` indicates witness-capable block and transaction serving.
- `NODE_COMPACT_FILTERS` is tied to basic block filter serving.
- `NODE_NETWORK_LIMITED` indicates serving only a recent block window.
- `NODE_P2P_V2` indicates BIP324 transport support.
- `SeedsServiceFlags()` returns `NODE_NETWORK | NODE_WITNESS`.
- `MayHaveUsefulAddressDB()` returns true for `NODE_NETWORK` or `NODE_NETWORK_LIMITED`.
- `serviceFlagsToStr()` returns human-readable service names and preserves unknown flags as `UNKNOWN[...]` strings.

## Address serialization reviewed

`CAddress` extends `CService` with peer metadata.

Reviewed behavior includes:

- Address time.
- Service flags.
- V1 and V2 network serialization modes.
- V1 and V2 disk serialization modes.
- Disk format version handling for v2 address serialization.
- V2 CompactSize service-flag serialization.
- V1 fixed-width service-flag serialization.

This page does not fully document address-manager behavior; see future `addrman` and network-processing reviews for that.

## Inventory types reviewed

Reviewed inventory and getdata types include:

- `MSG_TX`
- `MSG_BLOCK`
- `MSG_WTX`
- `MSG_FILTERED_BLOCK`
- `MSG_CMPCT_BLOCK`
- `MSG_WITNESS_BLOCK`
- `MSG_WITNESS_TX`

Reviewed constants include:

- `MSG_WITNESS_FLAG`
- `MSG_TYPE_MASK`

Reviewed `CInv` behavior includes:

- storing an inventory type and hash
- ordering inventory entries by type and hash
- converting inventory type to message type string
- using `witness-` prefix for witness-flagged inventory types
- representing unknown inventory types as hex type plus hash in `ToString()`
- converting transaction inventory to `GenTxid` as txid or wtxid depending on type

## Documentation implications

MoreBC2 should use this page as a low-level anchor for:

- protocol message names
- service flag explanations
- address relay terminology
- inventory terminology
- network RPC field explanations
- future peer-processing review

This page should not be used to claim that a feature is enabled or reachable on the live network unless another source confirms runtime behavior.

## Relationship to other pages

Related pages:

- [Network RPC](rpc-network.md)
- [Node startup](../../architecture/node-startup.md)
- [Network specifications](../../documentation/network-specifications.md)
- [RPC overview](../rpc-overview.md)
- [Command smoke-test plan](../../verification/command-smoke-test-plan.md)

## BitcoinII-specific notes

The reviewed files show BitcoinII naming, header guards, and comments.

The protocol structure appears Bitcoin-style, but no upstream comparison has been completed. This page does not claim whether BitcoinII-specific P2P behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which protocol message types are actually reachable under current BitcoinII startup defaults?
- Which service flags are advertised by default on full, pruned, and wallet-only setups?
- How should BIP324/v2 transport be explained in user-facing docs?
- Which address relay and address-manager files should be reviewed next?
- Which `net_processing` paths use each protocol message type?
- Confirm whether the `v31.1.0` release baseline differs from subsequent `main` changes for these files before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/protocol.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/protocol.h
- Current observed `main` `src/protocol.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/protocol.cpp
- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net.h
- Current observed `main` `src/netaddress.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/netaddress.h

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass protocol primitive review. Runtime defaults, live-network behavior, lower-level peer-processing paths, upstream comparison, and release-versus-main comparison remain open.
