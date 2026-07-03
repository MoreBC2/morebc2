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

This is not a binary verification record and not a live-network test. It records a GitHub source comparison result plus a small blob-SHA spot check.

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

## Blob-SHA spot checks

After the compare-list review, MoreBC2 spot-fetched selected key files at both refs and compared the returned blob SHA values.

| File | `v29.1.0` blob SHA | `main` blob SHA | Result |
|---|---|---|---|
| `src/net_processing.cpp` | `80f2eef285aaff993b97f97b497590b7f0c917c5` | `80f2eef285aaff993b97f97b497590b7f0c917c5` | Match |
| `src/net.cpp` | `2a1af20568bf472660c93922d0ca06168d9a2eae` | `2a1af20568bf472660c93922d0ca06168d9a2eae` | Match |
| `src/addrman.cpp` | `1f36dd009086a9206e5adf2803f7f8dd0a1812bb` | `1f36dd009086a9206e5adf2803f7f8dd0a1812bb` | Match |
| `src/banman.cpp` | `54d01b850249816d17f3609c63259003fe35d813` | `54d01b850249816d17f3609c63259003fe35d813` | Match |
| `src/rpc/net.cpp` | `3cf33455e8021c99919bd403ae1f59d8aad5cd6a` | `3cf33455e8021c99919bd403ae1f59d8aad5cd6a` | Match |
| `src/protocol.cpp` | `dc06575c9dc2cb2b8d60cc3afbe5cfa708d50ecc` | `dc06575c9dc2cb2b8d60cc3afbe5cfa708d50ecc` | Match |

This is a spot check, not a complete file-by-file proof. However, it strengthens the compare-list finding for the highest-value reviewed network source files.

## Current interpretation

Based on the GitHub compare result and the selected blob-SHA spot checks, the reviewed network/P2P source files appear unchanged between `v29.1.0` and current observed `main`.

That means the recent MoreBC2 network Source Atlas pages are still Draft and untested, but their reviewed source files are not currently showing as `main`-only changes relative to `v29.1.0` in this comparison work.

Safe wording:

```text
The reviewed network/P2P source files did not appear in the changed-file list when comparing `v29.1.0` to current observed `main`; selected blob-SHA spot checks also matched for key network files. MoreBC2 still treats those pages as Draft until local tests, release artifact checks, and reviewer review are completed.
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

It only records the observed source-file changed list from GitHub compare and selected blob-SHA spot checks.

## Relationship to chain parameters

`src/kernel/chainparams.cpp` **does** appear in the changed-file list between `v29.1.0` and `main`.

MoreBC2 already treats chain-data fields from that file as version-sensitive. Do not mix `v29.1.0` and `main` chain-data values without labeling the source version.

## Follow-up checks

Recommended next checks:

1. Spot-fetch remaining network header files if desired.
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
**Primary sources checked:** GitHub compare result for `Bitcoin-II/BitcoinII-Core` from `v29.1.0` to `main`; selected `fetch_file` blob-SHA spot checks for network files at `v29.1.0` and `main`
**Notes:** This page records a source comparison and selected blob-SHA spot checks only. It is not release artifact verification, not binary verification, not command testing, and not live-network testing.
