# Net processing peer eviction and stale-tip checks

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` peer discouragement, stale-tip checks, extra-outbound eviction, chain-sync usefulness checks, and ping timeout behavior in `src/net_processing.*`.

These mechanisms manage local peer quality/connection slots. They do not define BitcoinII consensus and should not be simplified into “bad peers are always banned.”

## Discouragement / disconnect

Reviewed behavior distinguishes ordinary peers from selected manual, local, or `NoBan`-permission peers. Peers marked for misbehavior may be disconnected/discouraged, but exceptions and connection type matter.

Discouragement is separate from the explicit BanMan ban list. See [BanMan](banman.md).

## Chain-sync usefulness

Outbound/block-relay peers can be monitored for whether they demonstrate chain work comparable to the active tip. Source-reviewed timeout logic can give a lagging peer an additional `getheaders` opportunity before disconnecting it.

This is chainwork-based peer usefulness logic, not a guarantee that the node always has the globally best peer set.

## Extra outbound eviction

Reviewed logic can remove extra block-relay/full-relay peers according to connection type, age, recent useful block announcements, protection status, network diversity, and blocks-in-flight state.

Peer counts are therefore expected to change over time even during healthy operation.

## Stale-tip behavior

Scheduled stale-tip checks can permit an extra outbound attempt when the local tip appears stale and ordinary network/import/addrman conditions allow it. The extra-peer attempt can later be cleared when conditions change.

## Ping / timeout handling

Reviewed peer-health logic sends pings for keepalive/latency purposes and can disconnect peers when an outstanding ping exceeds timeout conditions.

Matching `pong` messages update ping state/latency; malformed/unsolicited/mismatched responses are handled separately.

## Runtime boundary

The September `v31.1.0` mainnet test observed a healthy bounded session with multiple outbound peers, current header acquisition, and successful restart. It did not intentionally create stale-tip, ping-timeout, misbehavior, or extra-peer-eviction conditions.

These peer-health branches remain source-confirmed rather than directly runtime-qualified.

## BitcoinII-specific boundary

The peer-health machinery is structurally Bitcoin-style in the current review. BitcoinII-specific current chain usefulness ultimately depends on BC2's valid accumulated work, including ShockWave-determined block targets.

A peer advertising/serving an invalid post-v31 branch does not become useful merely because its protocol messages are well formed.

## Related pages

- [BanMan](banman.md)
- [Network RPC](rpc-network.md)
- [Net connection management](net-connection-management.md)
- [Block/header relay](net-processing-block-relay.md)
- [Peer communication model](../../architecture/peer-communication-model.md)

## Open work

- Dedicated stale-tip/timeout/eviction runtime fixtures only if operator guidance needs them.
- Keep manual/permissioned-peer behavior distinct from ordinary peer policy.
- Map test coverage after a clean v31 source build.

## Primary sources

- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net_processing.h`
- current BanMan/connection-management paths

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` peer-health source plus bounded ordinary outbound runtime context  
**Notes:** Peer-health/eviction structure is current; intentional stale-tip, timeout, misbehavior and eviction scenarios remain untested.
