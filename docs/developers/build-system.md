# Build system guide

**Category:** Developer guide  
**Status:** Reviewed / Source-only partial  
**Last reviewed:** 2026-09-12

## Summary

This page documents what MoreBC2 has verified from BitcoinII Core `v31.1.0` build-system source and upstream build documentation.

It deliberately does **not** claim MoreBC2 has successfully built BitcoinII Core from source. September runtime validation used an official `v31.1.0` Windows release artifact; release-binary execution and source-build reproduction are separate evidence classes.

## Build system

BitcoinII Core uses CMake.

The reviewed top-level `CMakeLists.txt`:

- requires CMake 3.22 or newer;
- blocks in-source builds;
- declares the project as `BitcoinIICore`;
- requires C++20;
- carries the `31.1.0` release version metadata in the current baseline.

## Primary source files reviewed

- `CMakeLists.txt`
- `src/CMakeLists.txt`
- `doc/build-unix.md`
- `cmake/module/FindLibevent.cmake`

This is not a complete toolchain/packaging/reproducibility audit.

## Major reviewed build options

| Option | Reviewed default / behavior | Purpose |
|---|---|---|
| `BUILD_DAEMON` | ON | Build daemon |
| `BUILD_GUI` | OFF | Build Qt GUI |
| `BUILD_CLI` | ON | Build CLI |
| `BUILD_TESTS` | ON | Build unit-test executable |
| `ENABLE_WALLET` | ON | Wallet support |
| `WITH_SQLITE` | Follows wallet support | SQLite descriptor wallets |
| `WITH_BDB` | OFF | Berkeley DB legacy-wallet support |
| `WITH_ZMQ` | OFF | ZMQ notifications |
| `BUILD_BENCH` | OFF | Benchmarks |
| `BUILD_FUZZ_BINARY` | OFF | Fuzz binary |
| `BUILD_FOR_FUZZING` | OFF | Fuzz-oriented build mode |
| `INSTALL_MAN` | ON | Install man pages |

Additional target dependencies/options remain defined by the release-pinned CMake files.

## Reviewed target structure

The source defines executable/library targets covering areas such as:

- `bitcoinIId`;
- `bitcoinII-qt` when GUI enabled;
- `bitcoinII-cli`;
- transaction/utility/wallet helpers where enabled;
- consensus/common/node/CLI libraries;
- optional wallet, GUI, kernel, test, benchmark, and fuzz subtrees.

## Dependency notes

Reviewed requirements/options include:

- CMake 3.22+;
- C++20;
- threads;
- Libevent for normal node/CLI/test-style targets;
- Boost headers;
- SQLite when descriptor-wallet support is enabled;
- Berkeley DB when legacy-wallet support is explicitly enabled;
- ZeroMQ when enabled;
- Qt for GUI builds;
- additional optional QR, USDT, multiprocess, sanitizer, hardening, ccache, and fuzzing dependencies/features.

Exact package names remain platform/distribution-specific.

## Source-documented Unix build shape

The upstream source documentation gives a basic shape such as:

```bash
cmake -B build
cmake --build build
cmake --install build
```

and documents package prerequisites plus options such as disabling wallet support.

MoreBC2 has read those commands from source documentation but has **not** yet executed and recorded a clean `v31.1.0` source build. They are source-documented examples, not MoreBC2-tested instructions.

## Windows/macOS boundary

CMake includes Windows/MSVC/MinGW and macOS/Darwin-specific handling, but MoreBC2 has not produced a tested current source-build guide for either platform.

The successful Windows node/wallet tests used the published release binary archive, not a locally compiled executable.

## Release verification boundary

Current release evidence establishes:

- the `v31.1.0` lightweight tag target;
- GitHub verification of the target commit;
- six current binary archives and GitHub-reported digests;
- one independently matched MoreBC2 hash for the Windows Qt archive used in runtime testing.

It does **not** establish:

- a maintainer-signed checksum manifest;
- detached binary signatures;
- a trusted BitcoinII release-signing-key path;
- reproducible build equivalence between source and release binaries.

See [Release verification](release-verification.md).

## What remains open

- Clean Linux daemon/CLI build from the pinned `v31.1.0` source.
- No-wallet build.
- Unit/functional test execution after a successful build.
- Windows/macOS source-build qualification.
- `depends/`, packaging, CI and release-engineering review.
- Reproducible-build comparison against published artifacts.

## Related pages

- [Local development](local-development.md)
- [Testing guide](testing.md)
- [Release process](release-process.md)
- [Release verification](release-verification.md)
- [Source tree](source-tree.md)

## Verification

**Status:** Reviewed / Source-only partial  
**Primary evidence:** BitcoinII Core `v31.1.0` CMake/build documentation plus current release/runtime evidence for boundary comparison  
**Notes:** Build-system structure and documented requirements are source-reviewed. No successful MoreBC2 source build or reproducible-build proof is claimed.
