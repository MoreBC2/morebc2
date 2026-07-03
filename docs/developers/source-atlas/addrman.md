# Addrman

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page covers a first-pass review of address manager behavior in:

- `src/addrman.h`
- `src/addrman.cpp`
- `src/addrman_impl.h`
- selected fixed-seed and DNS-seed caller context from `src/kernel/chainparams.cpp`, `src/chainparamsseeds.h`, and `src/net.cpp`

This is a focused Source Atlas slice. It is not a complete review of every peer-discovery path, every lower-level network thread, every addrman test, or live network behavior.

## Why this area matters

Addrman is the node's peer-address manager. It stores addresses learned from peers, seed paths, and successful connections, then selects candidate peers for future outbound connections.

For MoreBC2, addrman matters because node and service documentation should not imply that DNS seeds, fixed seeds, address gossip, or peer selection are simple static lists. The source shows an address database with randomized bucketing, new/tried tables, quality checks, service-bit updates, collision handling, and disk serialization.

## Design goals observed

The source comments describe addrman as a stochastic address manager.

Observed design goals include:

- keeping address tables in memory
- asynchronously dumping the table to `peers.dat`
- making it harder for a localized attacker to fill the entire table
- organizing addresses into buckets
- using a random 256-bit key for bucket selection
- supporting optional consistency checks through `-checkaddrman`

## New and tried tables observed

The reviewed source separates peer addresses into two broad groups:

- `new` entries: addresses that have not been successfully connected to by this node
- `tried` entries: addresses known to be accessible from prior successful connection handling

Observed bucket structure includes:

- 1024 new buckets
- 256 tried buckets
- 64 entries per bucket
- up to 8 new-bucket references per address
- tried entries with multiplicity 1

The source comments describe new buckets as based partly on the source address group and the target address group. Tried buckets are based on the target address group. Bucket placement uses hashing with the addrman key.

## Address quality and selection observed

Reviewed quality/selection behavior includes:

- very recent attempts are not treated as terrible
- timestamps too far in the future are terrible
- very old addresses can be terrible
- never-successful entries with repeated attempts can become terrible
- entries with many failures after an old success can become terrible
- recently attempted addresses get much lower selection chance
- each failed attempt lowers selection chance, bounded so selection does not become impossible forever
- selection can be limited to new entries or selected networks
- selection chooses a new or tried bucket, then a position, then uses chance-based filtering

This supports cautious docs: peer selection is probabilistic and quality-weighted, not deterministic.

## Add path observed

`AddrMan::Add()` attempts to add one or more addresses to the new table.

Observed behavior includes:

- unroutable addresses are rejected
- self-announcement source records avoid the time penalty
- existing entries can update timestamp and service bits
- tried entries are not updated through the new-entry add path
- existing new entries can gain more bucket references, up to the maximum reference count
- additional references become harder as refcount increases
- occupied bucket positions can be overwritten only in selected cases, such as terrible existing entries or existing entries with multiple references while the new candidate has none

## Good path observed

`AddrMan::Good()` marks an address as successfully reachable and can move it toward the tried table.

Observed behavior includes:

- last success and last try are updated
- attempt count is reset
- `nTime` is not updated in this path to avoid leaking information about currently connected peers
- already-tried entries do not move again
- new entries can move into a tried bucket
- when the target tried slot is occupied, the candidate can be placed into a tried-collision set instead of evicting immediately

This behavior is connected to feeler connections and collision resolution.

## Attempt and connected paths observed

Reviewed behavior includes:

- `Attempt()` records a connection attempt time
- counted failures can increment attempt count when appropriate
- `Connected()` updates the address time with a 20-minute update interval
- the `addrman.h` comments note that `net_processing` calls `Connected()` on disconnect rather than immediately on connect, to avoid leaking information about currently connected peers

## Tried collision behavior observed

Reviewed collision behavior includes:

- a small set of tried collisions is stored
- `SelectTriedCollision()` randomly selects an old tried entry associated with a collision for testing
- `ResolveCollisions()` can remove stale collision candidates
- recent successful old entries are protected from replacement
- old entries recently attempted get a short window to prove reachability
- if collision testing cannot resolve within a reasonable window, the new entry can replace the old tried entry

This supports cautious wording around feeler connections and tried-table maintenance.

## GetAddr behavior observed

`GetAddr()` returns randomly selected addresses, optionally by network and quality filter.

Observed behavior includes:

- maximum returned count can be limited by absolute count and percentage
- returned addresses are selected from a randomized ordering
- low-quality addresses can be skipped when filtering is enabled
- network-specific filtering is available

This does not prove any returned peer is currently online.

## Serialization behavior observed

Reviewed serialization behavior includes:

- addrman serializes a compact structure rather than raw internal maps
- serialized data includes format version, compatible version, key, new/tried counts, bucket count marker, new addresses, tried addresses, new bucket entries, and asmap checksum
- current file format is `V4_MULTIPORT`
- deserialization validates counts and compatible format ranges
- entries can be re-bucketed if bucket count or asmap checksum changes
- invalid or collision-lost entries can be dropped during load
- a consistency check can reject corrupted data

This supports documenting `peers.dat` as addrman state, not as a simple peer list.

## Consistency checks observed

Reviewed behavior includes:

- consistency checks are optional and controlled by a ratio
- consistency checks verify map/vector counts, new/tried status, reference counts, tried bucket placement, new bucket placement, random positions, key presence, and per-network counts
- a nonzero check failure can trigger assertion behavior

This should remain developer-facing unless tied to a tested troubleshooting procedure.

## Fixed-seed and DNS-seed context observed

Fixed-seed data is visible in:

- `src/chainparamsseeds.h`
- `src/kernel/chainparams.cpp`

Observed fixed-seed context includes:

- fixed seed arrays are autogenerated by `contrib/seeds/generate-seeds.py`
- each fixed seed line contains a BIP155 serialized network/address/port tuple
- mainnet `vFixedSeeds` is populated from `chainparams_seed_main`
- the observed mainnet array contains three serialized entries

Observed DNS-seed context from chain parameters includes:

- `dnsseed.bitcoin-ii.org.`
- `bitcoinII.ddns.net.`

This page does not claim those seeds are currently reachable. Live reachability is an ecosystem/network check, not a source-only fact.

## Relationship to lower-level connection management

The lower-level connection-management page reviewed seed-node, DNS-seed, and address-fetch behavior in `src/net.cpp`.

Addrman connects to that behavior because:

- DNS/fixed/address-fetch paths can provide addresses
- address gossip can add addresses
- successful connection handling can update addrman state
- outbound connection selection can use addrman entries
- tried collisions can produce feeler-style test candidates

This page does not fully review every caller or every network thread.

## Boundaries

This page does not claim:

- that any stored address is currently reachable
- that DNS seeds are currently reachable
- that fixed seeds are currently reachable
- that peer discovery has been live tested by MoreBC2
- that release behavior exactly matches current `main`
- that every addrman caller has been reviewed
- that every addrman test has been reviewed
- that BitcoinII differs from upstream Bitcoin Core here

This is source-observed documentation for the reviewed addrman slice only.

## Documentation implications

MoreBC2 can use this page to support cautious explanations of:

- why peer discovery is probabilistic
- why `peers.dat` should not be described as a plain static peer list
- why DNS seeds and fixed seeds should be described as source-observed seed mechanisms, not live availability claims
- why returned addresses from `getaddr`-adjacent behavior are not guaranteed live peers
- why peer selection can prefer quality and recent reachability without guaranteeing success
- why addrman details should mostly stay developer/operator-facing

## Related pages

- [Net connection management](net-connection-management.md)
- [Net processing address relay](net-processing-address-relay.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Node guide](../../nodes/node-guide.md)

## Open questions

- Review `src/net.cpp` addrman caller paths more completely.
- Review fixed-seed fallback behavior in more detail.
- Review addrman test coverage.
- Compare current `main` addrman behavior with `v29.1.0`.
- Decide what, if anything, belongs in beginner node troubleshooting docs.
- Run live DNS/fixed-seed reachability checks separately if needed.

## Sources

- Current observed `main` `src/addrman.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/addrman.h
- Current observed `main` `src/addrman.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/addrman.cpp
- Current observed `main` `src/addrman_impl.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/addrman_impl.h
- Current observed `main` `src/chainparamsseeds.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/chainparamsseeds.h
- Current observed `main` `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp
- Current observed `main` `src/net.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass focused review of addrman and selected seed context. Runtime tests, release comparison, live seed reachability, full caller review, fixed-seed fallback details, and addrman test coverage remain open.
