# Net processing peer eviction and stale-tip checks

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of peer discouragement, outbound peer eviction, stale-tip checks, and ping timeout behavior in:

- `src/net_processing.cpp`
- `src/net_processing.h`

This is a focused slice of `net_processing`, not a complete review of network connection management, ban-list policy, address manager behavior, transaction relay, or block relay.

## Why this area matters

Peer eviction and stale-tip checks are part of how a node tries to stay connected to useful peers without letting bad or unhelpful peers consume connection slots forever.

For MoreBC2, this matters because operator docs should avoid oversimplified claims like “bad peers are banned” or “the node will always find a better peer.” The source shows multiple exceptions, permissions, timers, and connection-type rules.

## Scheduled task relationship observed

`PeerManagerImpl::StartScheduledTasks` schedules `CheckForStaleTipAndEvictPeers` at the extra-peer check interval.

Observed behavior includes:

- stale-tip checking and peer eviction are combined into a scheduled function
- the scheduled cadence uses the faster extra-peer check interval
- the code asserts that the extra-peer check interval is less than the stale-tip interval
- initial broadcast reattempt is scheduled separately

## Discouragement and disconnect behavior observed

`MaybeDiscourageAndDisconnect` handles peers marked for discouragement.

Observed behavior includes:

- if the peer is not marked for discouragement, nothing happens
- peers with `NoBan` permission are not disconnected or discouraged for bad behavior by this path
- manually connected peers are not disconnected or discouraged for bad behavior by this path
- local peers can be disconnected without discouraging the whole local address
- ordinary peers can be disconnected and the shared address can be discouraged through banman when available
- connection manager can disconnect nodes by address in the ordinary case

This page uses “discourage” because that is the source-level action name. It should not be presented as a permanent ban without checking banman behavior separately.

## Message-processing relationship observed

`ProcessMessages` sits around individual message handling.

Observed behavior includes:

- outbound peers must have had the local version message sent before incoming messages are processed
- pending getdata requests are processed before polling the next message
- orphan transaction work can be processed before new message polling
- processing stops early if the peer is already marked for disconnect
- if the send buffer is paused, the node does not poll another message from that peer
- message capture can record incoming messages when enabled
- exceptions during message processing are caught and logged
- extra work can be scheduled when getdata work remains or transaction download manager work remains

This page does not fully document the message scheduler or lower-level networking loop.

## Chain-sync eviction checks observed

`ConsiderEviction` checks outbound or block-relay peers that are not protected from disconnection.

Observed behavior includes:

- outbound peers that have started sync can be watched for whether they announce a chain with enough work
- if the peer's best-known block has at least as much work as the active tip, an existing timeout can be cleared
- if the peer appears behind, a timeout can be set based on the current tip and `CHAIN_SYNC_TIMEOUT`
- after a timeout, the node can send one `getheaders` request to give the peer a chance to show progress
- after the extra response window, the peer can be disconnected if it still has not shown sufficient work

This is chain-work based peer usefulness checking, not a user-facing guarantee that the node always picks the best possible peer.

## Extra outbound peer eviction observed

`EvictExtraOutboundPeers` handles extra block-relay-only and extra outbound full-relay peers.

Observed block-relay-only behavior includes:

- if extra block-relay-only peers exist, the node chooses among the youngest peers
- recent block contribution can affect which peer is selected for disconnection
- peers can be kept if they have not been connected long enough or have blocks in flight

Observed full-outbound behavior includes:

- if extra outbound full-relay peers exist, one can be chosen for disconnection
- candidates are outbound full-relay peers not already marked for disconnect
- protected peers are skipped
- the code protects the only connection on a network when no other manual/full outbound connection exists on that network
- among candidates, the peer least recently announcing a new block can be selected, with a tie-break using newer node id
- selected peers can be kept if they have not been connected long enough or have blocks in flight
- after disconnecting an extra peer, the node can stop trying new outbound peers until stale-tip logic asks again

## Stale-tip check observed

`CheckForStaleTipAndEvictPeers` performs the scheduled stale-tip and eviction pass.

Observed behavior includes:

- it first calls `EvictExtraOutboundPeers`
- at stale-tip check time, the node can allow trying an extra outbound peer when:
  - blocks are not being loaded/imported
  - the network is active
  - addrman outgoing connections are enabled
  - the tip may be stale
- if conditions no longer apply while an extra outbound peer is being tried, the extra-peer attempt flag can be cleared
- once direct fetching is possible and initial sync is not marked finished, extra block-relay peers can be started and initial sync can be marked finished

## Ping timeout and keepalive behavior observed

`MaybeSendPing` handles ping sending and timeout checks.

Observed behavior includes:

- if inactivity checks are active and an outstanding ping exceeds the timeout interval, the peer can be disconnected
- user-queued ping requests can trigger a ping
- pings can also be sent automatically as latency probes and keepalives
- ping nonces are generated nonzero for peers supporting nonce-bearing ping messages
- older peers can receive ping without a nonce

The message receive path also handles `ping` and `pong`:

- nonce-bearing `ping` messages can receive a matching `pong`
- matching `pong` responses can clear outstanding ping state and record latency
- nonce mismatches, unsolicited pongs, zero nonce, and short payloads are logged as problems

## Boundaries

This page does not claim:

- that all bad behavior leads to banning
- that manual or NoBan peers are treated the same as ordinary peers
- that peer eviction has been tested live
- that banman behavior is fully documented here
- that lower-level `net.cpp` connection management is fully reviewed
- that BitcoinII differs from upstream Bitcoin Core here
- that release behavior exactly matches current `main`

This is source-observed documentation for the reviewed peer-eviction and stale-tip slice only.

## Documentation implications

MoreBC2 can use this page to support cautious explanations of:

- why peer connection counts can change over time
- why stale-tip detection can trigger extra outbound attempts
- why bad-peer handling has exceptions
- why block-relay-only peers can be temporary
- why peer health is separate from wallet balance, confirmations, or exchange deposit status
- why user-facing node docs should avoid strong guarantees about peer selection

## Related pages

- [Net processing handshake](net-processing-handshake.md)
- [Net processing block and header relay](net-processing-block-relay.md)
- [Net processing transaction relay](net-processing-transaction-relay.md)
- [Network RPC](rpc-network.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Node guide](../../nodes/node-guide.md)

## Open questions

- Review banman behavior separately.
- Review lower-level connection management in `src/net.cpp`.
- Review send-loop behavior related to pings, inventory, and queued messages.
- Compare this slice between current `main` and `v29.1.0`.
- Confirm which peer-health details belong in user-facing node docs.
- Confirm whether any BitcoinII-specific behavior exists here beyond naming and visible comments.

## Sources

- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- [Net processing handshake](net-processing-handshake.md)
- [Net processing block and header relay](net-processing-block-relay.md)
- [Net processing transaction relay](net-processing-transaction-relay.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of peer discouragement, outbound peer eviction, stale-tip checks, and ping timeout behavior in `net_processing`. Runtime tests, release comparison, upstream comparison, banman review, lower-level net connection review, and full send-loop behavior remain open.
