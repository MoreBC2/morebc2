# BanMan

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps explicit ban-list and peer-discouragement behavior in BitcoinII Core `v31.1.0`, centered on `src/banman.*` and selected `net_processing` / inbound-admission caller paths.

The reviewed architecture distinguishes two separate mechanisms:

- **explicit bans** — user-managed address/subnet entries;
- **discouragement** — automatic probabilistic state used when peers misbehave.

Neither mechanism should be described as a complete denial-of-service defense.

## Explicit bans

Reviewed behavior includes:

- address/subnet bans;
- persistence to disk and reload on startup;
- expiry/sweep behavior;
- default ban duration behavior;
- ban-list dirty/write state;
- user-facing operations corresponding to `setban`, `listbanned`, and `clearbanned`.

Explicitly banned addresses are excluded from ordinary inbound/outbound use in the reviewed paths.

## Discouragement

Reviewed source keeps discouragement separate from the explicit ban map.

Discouraged peers/addresses can be treated less favorably for connection/eviction/address-relay purposes, but discouragement is stored through a rolling probabilistic filter rather than a precise user-listable map.

Docs should therefore not describe discouragement as “the ban list.”

## Misbehavior path

Selected `net_processing` paths can mark a peer for discouragement after certain consensus-invalid block/transaction or protocol misuse results.

Not every policy rejection or ordinary transaction failure is treated as malicious peer behavior. A complete punishment matrix remains beyond this page.

## Permissions / manual peers

Reviewed behavior treats selected permissioned/manual/local peers differently from ordinary peers when applying disconnect/discouragement actions.

This is one reason state-changing network commands should remain operator-level material rather than beginner troubleshooting defaults.

## Current runtime boundary

The September `v31.1.0` node test exercised automatic outbound networking and read-only peer/network RPCs. It did **not** manipulate the ban list, intentionally trigger misbehavior, test peer eviction, or qualify `setban`/`clearbanned` behavior.

Those operations remain source-confirmed rather than runtime-tested.

## RPC safety boundary

Commands such as `setban`, `clearbanned`, `disconnectnode`, `addnode`, and `setnetworkactive` change local network state. MoreBC2 should keep them separate from read-only status examples such as `getnetworkinfo` and `getpeerinfo`.

See [Network RPC](rpc-network.md).

## Related pages

- [Network RPC](rpc-network.md)
- [Addrman](addrman.md)
- [Net connection management](net-connection-management.md)
- [Peer eviction / stale-tip checks](net-processing-peer-eviction.md)
- [Peer communication model](../../architecture/peer-communication-model.md)

## Open work

- Runtime-test ban-list operations only with a disposable node fixture if operator documentation needs them.
- Map current v31 BanMan/discouragement tests.
- Keep automatic discouragement distinct from user-managed bans in all user-facing docs.

## Primary sources

- `v31.1.0/src/banman.h`
- `v31.1.0/src/banman.cpp`
- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` BanMan and selected network caller paths  
**Notes:** Ban/discouragement structure is current. Ban RPC mutation, intentional misbehavior, and eviction runtime scenarios remain untested.
