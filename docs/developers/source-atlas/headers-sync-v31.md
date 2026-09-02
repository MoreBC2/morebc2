# BitcoinII v31 fork-aware header synchronization

**Category:** Developer / Source Atlas
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Purpose

This page documents the `v31.1.0` header-sync path relevant to the release-note phrase "fork-aware header synchronization."

## Existing two-phase model

BitcoinII inherits the DoS-resistant headers-sync design that downloads a peer's candidate header chain in two phases when sufficient work is not yet established:

1. **PRESYNC** — validate proof-of-work/chainwork while storing compact commitments rather than permanently retaining an untrusted low-work chain.
2. **REDOWNLOAD** — once sufficient work is demonstrated, download the chain again, verify commitments, and release headers for normal acceptance.

The design is intended to resist memory exhaustion from low-work header spam without preventing reorganization to a legitimate higher-work branch.

## v31 ShockWave requirement

The important BitcoinII-specific problem is that ShockWave-era `nBits` cannot be validated from only the previous target. Exact required work depends on a rolling historical window and MedianTimePast.

`v31.1.0` therefore gives `HeadersSyncState` private rolling `CBlockIndex` histories for both PRESYNC and REDOWNLOAD.

The implementation keeps:

- 25 prior targets used by the ShockWave rolling baseline;
- 10 additional predecessor blocks needed to reproduce the oldest sample's MedianTimePast;
- 35 temporary indexes total.

These indexes remain private to the peer sync state and are never inserted into the global block index simply because a peer supplied them.

## Exact difficulty validation

`ValidateShockWaveHeader()` checks that:

- temporary history exists;
- synthetic history height matches the expected next height;
- candidate time is greater than the previous MedianTimePast;
- candidate `nBits` exactly equals the result of production `GetNextWorkRequired()`.

This means PRESYNC and REDOWNLOAD reproduce the same ShockWave difficulty calculation used during ordinary contextual header validation rather than using an approximation.

## Branch handling

The sync object is rooted at `m_chain_start`, documented as the best-known fork point from which the peer's supplied branch builds.

Temporary ShockWave history is initialized from that real fork point and enough of its ancestors to reproduce the rolling/MTP state. As peer headers advance, validated headers are appended to the bounded synthetic history.

This is the source-backed sense in which the v31 header-sync path is fork-aware: candidate branches are evaluated from their actual known fork point with branch-specific rolling difficulty history instead of assuming the active-chain tip's ShockWave history applies to every competing branch.

## Failure/recovery behavior

The header sync aborts/finalizes its per-peer state when required history is missing, the synthetic height diverges, MTP ordering fails, a header's required work is wrong, or other sync validation fails.

`Finalize()` clears commitments, redownload buffers, and both temporary ShockWave histories so stale state is not reused.

The normal headers-sync two-phase commitment/redownload mechanism remains responsible for deciding when a sufficiently high-work branch can be released for full processing.

## Upstream tests found

The `v31.1.0` source tree includes:

- `src/test/headers_sync_chainwork_tests.cpp`;
- `src/test/fuzz/headerssync.cpp`.

These exercise `HeadersSyncState` and its chainwork/header processing surfaces. MoreBC2 has located them but has not yet executed the current release test suite or mapped every ShockWave-specific branch to an individual assertion.

## What this page does not claim

- It does not claim header sync itself chooses the active chain; normal block-index/chainstate validation and most-work selection still do that.
- It does not claim every reorg scenario has been locally tested by MoreBC2.
- It does not claim the release-note phrase represents a wholly new header-sync subsystem; the major BitcoinII-specific v31 addition reviewed here is exact ShockWave validation for alternate header branches within the existing anti-DoS sync framework.

## Primary sources

Pinned to `v31.1.0`:

- `src/headerssync.h`
- `src/headerssync.cpp`
- `src/net_processing.cpp`
- `src/pow.cpp`
- `src/test/headers_sync_chainwork_tests.cpp`
- `src/test/fuzz/headerssync.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** Yes, `v31.1.0`
**Notes:** The two-phase sync model, fork-point anchoring, bounded ShockWave history and exact nBits validation are source-backed. Detailed test-to-helper mapping and live competing-branch scenarios remain open.