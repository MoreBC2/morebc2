# BitcoinII v31 fork-aware header synchronization

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Purpose

This page documents the BitcoinII Core `v31.1.0` header-sync path behind the release-note phrase **fork-aware header synchronization**.

The principal BitcoinII-specific v31 addition reviewed here is exact ShockWave next-work validation for alternate header branches inside the existing two-phase anti-DoS headers-sync framework.

## Existing two-phase model

BitcoinII inherits a two-phase headers-sync design for peer-supplied candidate chains whose work has not yet been fully established:

1. **PRESYNC** — validate proof of work / chainwork while retaining compact commitments instead of permanently accepting an untrusted low-work header chain.
2. **REDOWNLOAD** — once sufficient work is demonstrated, download the chain again, verify commitments, and release headers into normal processing.

This limits memory exposure to low-work header spam while preserving the ability to consider a legitimate higher-work branch.

## v31 ShockWave requirement

Post-activation `nBits` cannot be validated from only the previous target. ShockWave needs rolling target/timing history and MedianTimePast context.

`v31.1.0` therefore gives `HeadersSyncState` private rolling `CBlockIndex` histories for PRESYNC and REDOWNLOAD.

The reviewed implementation retains:

- 25 prior targets for the rolling ShockWave baseline;
- 10 additional predecessors needed to reproduce the oldest sample's MedianTimePast;
- 35 temporary indexes total.

These temporary indexes are peer-sync state. They are not inserted into the global block index merely because a peer supplied them.

## Exact difficulty validation

`ValidateShockWaveHeader()` checks the required temporary history/context and requires the candidate's `nBits` to equal production `GetNextWorkRequired()` output for that candidate header.

The peer branch is therefore validated against the same ShockWave work calculation used by normal contextual header validation, rather than an approximation based only on the active tip's prior target.

## Fork-point anchoring

The sync object is rooted at its known chain start/fork point. Temporary ShockWave history is built from that branch context and the necessary predecessors.

This is the source-backed meaning of fork-aware in the v31 change: competing branches can be evaluated using their own rolling difficulty history rather than incorrectly borrowing the active branch's ShockWave state.

## Failure/finalization behavior

The sync state can fail/finalize when required history is unavailable, synthetic height/context diverges, timestamp ordering is invalid, required work does not match, or other headers-sync validation fails.

Finalization clears the temporary commitments/buffers/history so stale per-peer state is not reused.

## Relationship to active-chain selection

Headers sync validates and releases acceptable header candidates; it does **not** independently choose protocol finality or replace normal best-chain activation.

The active chain is still selected by the ordinary validation/chainstate path according to accumulated valid chain work.

## Runtime evidence — 2026-09-11

The isolated Windows `v31.1.0` mainnet node successfully acquired current headers from automatically discovered outbound peers and advanced block validation during bounded IBD.

That is useful runtime corroboration that the current release's ordinary header-sync path functions in the documented environment.

It is **not** a controlled proof of the fork-aware alternate-branch logic specifically: MoreBC2 did not create a competing ShockWave branch, force PRESYNC/REDOWNLOAD transitions, or verify the 35-entry synthetic history by instrumentation.

## Tests present upstream

The `v31.1.0` source tree includes headers-sync chainwork tests and a headers-sync fuzz target. MoreBC2 has located those tests but has not yet run the clean current-release test suite or mapped every ShockWave-specific path to an assertion.

## Related pages

- [ShockWave v31](shockwave-v31.md)
- [pow.cpp](pow-cpp.md)
- [Block acceptance pipeline](block-acceptance.md)
- [Peer communication model](../../architecture/peer-communication-model.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Execute current headers-sync tests against a clean `v31.1.0` source build.
- Map each ShockWave-specific headers-sync branch to test coverage.
- Build an isolated competing-branch fixture if deeper runtime qualification becomes worthwhile.
- Keep ordinary successful header acquisition distinct from proof of every fork-aware branch.

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

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` headers-sync/PoW source plus bounded September 11 v31 mainnet header-acquisition runtime evidence  
**Notes:** Fork-point anchoring, bounded ShockWave history, and exact required-work validation are source-backed. Ordinary header synchronization is runtime-corroborated; controlled alternate-branch ShockWave scenarios remain untested.
