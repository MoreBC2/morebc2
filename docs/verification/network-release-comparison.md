# Network release comparison

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page records the first release-versus-main comparison for the network and peer-communication source files recently reviewed by MoreBC2.

It compares the latest observed release tag:

- `v29.1.0`

against current observed:

- `main`

This is not a binary verification record and not a live-network test. It only records a GitHub source comparison result.

## Comparison performed

Compared:

```text
Bitcoin-II/BitcoinII-Core
base: v29.1.0
head: main
```

Observed compare result:

- `main` is ahead of `v29.1.0`
- ahead by: `15` commits
- behind by: `0` commits
- merge-base commit: `3f2a352467750425ec28abe3505a5db5bbc5fa35`
- base commit: `3f2a352467750425ec28abe3505a5db5bbc5fa35`

## Files changed between `v29.1.0` and `main`

The compare result listed these changed files:

| File | Status | Notes |
|---|---|---|
| `.github/workflows/ci.yml` | modified | CI workflow change. |
| `.github/workflows/macos-arm64-v29-dmg.yml` | added | macOS arm64 DMG workflow. |
| `README.md` | modified | README content change. |
| `ci/test/03_test_script.sh` | modified | CI test script change. |
| `src/kernel/chainparams.cpp` | modified | Chain-data related source changes already tracked separately. |
| `test/functional/test_framework/blocktools.py` | modified | Functional test framework helper change. |

## Network/P2P files checked against the compare list

The following network and peer-communication files have first-pass MoreBC2 Source Atlas coverage and did **not** appear in the changed-file list between `v29.1.0` and `main`:

| Source file | MoreBC2 page | Compare observation |
|---|---|---|
| `src/protocol.h` | [P2P protocol primitives](../developers/source-atlas/protocol.md) | No changed-file entry in compare result. |
| `src/protocol.cpp` | [P2P protocol primitives](../developers/source-atlas/protocol.md) | No changed-file entry in compare result. |
| `src/net.h` | [Net connection management](../developers/source-atlas/net-connection-management.md) | No changed-file entry in compare result. |
| `src/net.cpp` | [Net connection management](../developers/source-atlas/net-connection-management.md) | No changed-file entry in compare result. |
| `src/net_processing.h` | Reviewed through net-processing pages | No changed-file entry in compare result. |
| `src/net_processing.cpp` | Reviewed through net-processing pages | No changed-file entry in compare result. |
| `src/addrman.h` | [Addrman](../developers/source-atlas/addrman.md) | No changed-file entry in compare result. |
| `src/addrman.cpp` | [Addrman](../developers/source-atlas/addrman.md) | No changed-file entry in compare result. |
| `src/addrman_impl.h` | [Addrman](../developers/source-atlas/addrman.md) | No changed-file entry in compare result. |
| `src/banman.h` | [Banman](../developers/source-atlas/banman.md) | No changed-file entry in compare result. |
| `src/banman.cpp` | [Banman](../developers/source-atlas/banman.md) | No changed-file entry in compare result. |
| `src/chainparamsseeds.h` | [Addrman](../developers/source-atlas/addrman.md) | No changed-file entry in compare result. |
| `src/rpc/net.cpp` | [Network RPC](../developers/source-atlas/rpc-network.md) | No changed-file entry in compare result. |

## Current interpretation

Based on the GitHub compare result, the reviewed network/P2P source files appear unchanged between `v29.1.0` and current observed `main`.

That means the recent MoreBC2 network Source Atlas pages are still Draft and untested, but their reviewed source files are not currently showing as `main`-only changes relative to `v29.1.0` in this compare.

Safe wording:

```text
The reviewed network/P2P source files did not appear in the changed-file list when comparing `v29.1.0` to current observed `main`; MoreBC2 still treats those pages as Draft until local tests, release artifact checks, and reviewer review are completed.
```

## Important caveats

This comparison does **not** prove:

- release binaries match source
- release assets are verified
- runtime network behavior was tested
- peers, seeds, explorers, pools, or exchanges are live
- every network edge case has been reviewed
- every caller path has been reviewed
- upstream Bitcoin Core comparison has been completed

It only records the observed source-file changed list from GitHub compare.

## Relationship to chain parameters

`src/kernel/chainparams.cpp` **does** appear in the changed-file list between `v29.1.0` and `main`.

MoreBC2 already treats chain-data fields from that file as version-sensitive. Do not mix `v29.1.0` and `main` chain-data values without labeling the source version.

## Follow-up checks

Recommended next checks:

1. Spot-fetch a few key network files at `v29.1.0` and `main` to confirm identical blob content if needed.
2. Compare upstream Bitcoin Core versions for inherited behavior.
3. Review test coverage for addrman, banman, net, net_processing, protocol, and network RPC.
4. Run safe local network-status command smoke tests when a BitcoinII node environment is available.
5. Keep release binary verification separate from source comparison.

## Related pages

- [Release source comparison](release-source-comparison.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Documentation coverage](../documentation-coverage.md)
- [Open questions backlog](open-questions.md)
- [Peer communication model](../architecture/peer-communication-model.md)
- [Source atlas index](../developers/source-atlas/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** GitHub compare result for `Bitcoin-II/BitcoinII-Core` from `v29.1.0` to `main`
**Notes:** This page records a source comparison only. It is not release artifact verification, not binary verification, not command testing, and not live-network testing.
