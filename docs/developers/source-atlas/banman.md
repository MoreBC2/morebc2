# Banman

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of peer ban-list and discouragement handling in:

- `src/banman.h`
- `src/banman.cpp`
- related `src/net_processing.cpp` caller paths
- related `src/net.cpp` inbound admission behavior

This is a focused Source Atlas slice. It is not a complete review of every network-security path, every RPC command, addrman internals, or live node behavior.

## Why this area matters

MoreBC2 already has Source Atlas pages for peer communication, connection management, peer health, and network RPC.

Banman is the part of the node that tracks two related but separate ideas:

- explicit ban-list entries
- probabilistic discouragement of misbehaving peers

This matters for node/operator docs because manual peer, ban-list, and network-active commands should not be treated like harmless read-only status commands.

## Explicit ban-list behavior observed

The source comments describe explicit banning as user-configured through the `setban` RPC.

Observed behavior includes:

- explicit bans can apply to an address or subnet
- explicitly banned addresses/subnets are not accepted as incoming peers
- explicitly banned addresses/subnets are not used for outgoing connections
- explicitly banned addresses/subnets are not gossiped to other peers in address messages
- explicit bans are stored to disk on shutdown and reloaded on startup
- default misbehavior ban time constant is 24 hours, with a note that RPC help should match it
- ban-list dumping interval constant is 15 minutes

This page does not claim the `setban` RPC has been locally tested.

## Discouragement behavior observed

The source comments describe discouragement as separate from explicit banning.

Observed behavior includes:

- misbehaving peers can have their address marked as discouraged
- discouraged peers are still allowed to make incoming connections in some situations
- discouraged peers are preferred for eviction when inbound slots are pressured
- outgoing connections are not made to discouraged addresses
- discouraged addresses are not gossiped to other peers
- discouragement is stored in a rolling bloom filter
- discouraged addresses cannot be listed or individually unmarked through BanMan
- the source comments explicitly say banning/discouragement are not complete denial-of-service protections
- the source comments warn that automatic disconnect or ban behavior can risk network splitting if applied too broadly

This distinction is important: discouragement is not the same thing as a normal user-visible ban-list entry.

## BanMan lifecycle observed

`BanMan` construction and destruction behavior includes:

- constructor loads the ban-list database
- constructor dumps the ban-list after load
- destructor dumps the ban-list
- loading sweeps expired entries after reading from disk
- if the ban-list database cannot be read, the in-memory map is reset and marked dirty
- dump uses a separate static dump mutex
- dump sweeps expired entries before writing
- dump skips disk write if the ban-list is not dirty
- failed disk writes mark the list dirty again

## Explicit ban-list operations observed

Reviewed operations include:

- `Ban(const CNetAddr&)`
- `Ban(const CSubNet&)`
- `Unban(const CNetAddr&)`
- `Unban(const CSubNet&)`
- `ClearBanned()`
- `GetBanned()`
- `IsBanned(const CNetAddr&)`
- `IsBanned(const CSubNet&)`
- `SweepBanned()`
- `DumpBanlist()`

Observed behavior includes:

- address bans are converted to subnet bans internally
- non-positive ban time offset falls back to the default ban time
- `since_unix_epoch` changes whether the provided time is treated as an absolute timestamp or offset
- existing ban entries are only replaced when the new ban lasts longer
- unban returns false when the subnet was not present
- clear/unban/ban operations update the dirty flag and notify the UI when available
- `GetBanned()` sweeps expired entries before returning a copy
- expired or invalid entries are removed during sweep

## Discourage operation observed

`Discourage(const CNetAddr&)` inserts the address bytes into the rolling bloom filter.

Observed behavior includes:

- `IsDiscouraged(const CNetAddr&)` checks the bloom filter
- there is no map-style listing of all discouraged peers
- there is no individual undisourage operation in the reviewed BanMan interface

Because this is a probabilistic filter, docs should avoid describing discouragement as a precise user-managed list.

## Misbehavior trigger path observed

In `net_processing`, each peer has a misbehavior flag:

- `m_should_discourage`

Observed behavior includes:

- `Misbehaving(peer, message)` sets `m_should_discourage = true`
- `MaybePunishNodeForBlock(...)` calls `Misbehaving(...)` for selected block validation results
- `MaybePunishNodeForTx(...)` calls `Misbehaving(...)` for transaction consensus failures
- selected bloom-filter misuse paths call `Misbehaving(...)`
- not all policy or validation failures cause discouragement

Important examples from reviewed paths:

- transaction consensus failure can mark a peer as misbehaving
- many transaction policy/conflict/missing-input style results do not mark a peer as misbehaving
- block consensus, mutated block, invalid header, checkpoint, invalid previous block, and selected missing-prev paths can mark a peer as misbehaving
- compact-block context changes punishment behavior for some invalid block cases
- some cached-invalid behavior only discourages outbound peers in the reviewed logic

This page should not be used as a complete punishment matrix until a line-by-line caller review is finished.

## Disconnect and discourage handling observed

`MaybeDiscourageAndDisconnect(...)` handles the actual action after a peer's misbehavior flag is set.

Observed behavior includes:

- if the peer has no misbehavior flag, nothing happens
- the flag is cleared before action is taken
- peers with `NetPermissionFlags::NoBan` are not disconnected or discouraged through this path
- manually connected peers are not disconnected or discouraged through this path
- local-address peers can be disconnected without discouraging the shared local address
- normal peers can be disconnected and their address discouraged
- if BanMan is available, the address is inserted into discouragement state
- the connection manager is asked to disconnect the node by address

## Inbound admission interaction observed

`src/net.cpp` uses BanMan state during inbound admission.

Observed behavior includes:

- explicitly banned incoming addresses are dropped
- discouraged incoming addresses can be dropped when inbound slots are nearly full and the peer lacks appropriate permission
- discouraged peers can be marked as preferred eviction candidates when accepted
- inbound slot pressure can trigger eviction before accepting a new peer

This connects BanMan to lower-level connection management, but the full eviction algorithm remains outside this page.

## RPC and command implications

Network RPC source review already lists ban-list and manual peer commands as operator-focused.

This page supports keeping these out of beginner smoke tests:

- `setban`
- `listbanned`
- `clearbanned`
- `disconnectnode`
- `addnode`
- `setnetworkactive`

The important distinction is that these commands change network state or peer policy. They are not equivalent to read-only status commands like `getpeerinfo`.

## Boundaries

This page does not claim:

- that any ban-list RPC command has been locally tested
- that BanMan is a complete denial-of-service defense
- that every misbehavior caller has been fully reviewed
- that every peer eviction path has been fully reviewed
- that addrman internals are reviewed here
- that release behavior exactly matches current `main`
- that BitcoinII differs from upstream Bitcoin Core here
- that discouragement is a precise list of all bad peers

This is source-observed documentation for the reviewed BanMan slice only.

## Documentation implications

MoreBC2 can use this page to support cautious explanations of:

- explicit ban-list entries versus probabilistic discouragement
- why some peer-management commands are operator-only
- why discouraged peers may still connect in some situations
- why manual and NoBan peers are treated differently
- why local peers are disconnected without discouraging a shared local address
- why policy differences should not automatically be described as malicious peer behavior

## Related pages

- [Network RPC](rpc-network.md)
- [Net connection management](net-connection-management.md)
- [Net processing peer eviction and stale-tip checks](net-processing-peer-eviction.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Command testing status](../../verification/command-testing.md)

## Open questions

- Review `setban`, `listbanned`, and `clearbanned` RPC implementation details against this page.
- Review test coverage for BanMan and discouragement behavior.
- Review release-versus-main behavior for `src/banman.*`.
- Review addrman interactions separately.
- Decide which operator-facing ban-list details belong in node docs.

## Sources

- Current observed `main` `src/banman.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/banman.h
- Current observed `main` `src/banman.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/banman.cpp
- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of BanMan and selected caller paths. Runtime tests, release comparison, full RPC implementation review, full misbehavior-caller matrix, and addrman interactions remain open.
