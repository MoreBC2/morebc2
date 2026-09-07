# Build system guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-07

## Summary

This page documents what MoreBC2 has reviewed about how BitcoinII Core is built.

It is still a Draft because commands have not yet been run in a clean environment for MoreBC2. Source-backed build options are documented here, but commands are not marked verified until tested.

## Build system

BitcoinII Core uses CMake.

The top-level `CMakeLists.txt` requires CMake 3.22 or newer and explicitly blocks in-source builds.

The project is declared as `BitcoinIICore`, with C++ enabled and C++20 required.

Reviewed metadata from the top-level CMake file includes:

- `CLIENT_NAME`: `BitcoinII Core`
- Version fields in the current documentation baseline: `31.1.0`
- Release flag: `CLIENT_VERSION_IS_RELEASE=true`
- Homepage URL: `https://Bitcoin-II.org/`

## Primary source files reviewed

Reviewed build files include:

- `CMakeLists.txt`
- `src/CMakeLists.txt`
- `doc/build-unix.md`
- `cmake/module/FindLibevent.cmake`

This is a first-pass review, not a complete build-system audit.

## Top-level build options

Reviewed top-level options include:

| Option | Reviewed default | Purpose |
|---|---:|---|
| `BUILD_DAEMON` | ON | Build `bitcoinIId`. |
| `BUILD_GUI` | OFF | Build `bitcoinII-qt`. |
| `BUILD_CLI` | ON | Build `bitcoinII-cli`. |
| `BUILD_TESTS` | ON | Build `test_bitcoinII`. |
| `BUILD_TX` | Follows `BUILD_TESTS` | Build `bitcoinII-tx`. |
| `BUILD_UTIL` | Follows `BUILD_TESTS` | Build `bitcoinII-util`. |
| `BUILD_UTIL_CHAINSTATE` | OFF | Build experimental `bitcoinII-chainstate`. |
| `BUILD_KERNEL_LIB` | Follows `BUILD_UTIL_CHAINSTATE` | Build experimental `bitcoinIIkernel`. |
| `ENABLE_WALLET` | ON | Enable wallet support. |
| `WITH_SQLITE` | Follows `ENABLE_WALLET` | Enable SQLite descriptor-wallet support. |
| `WITH_BDB` | OFF | Enable Berkeley DB legacy-wallet support. |
| `WITH_ZMQ` | OFF | Enable ZMQ notifications. |
| `BUILD_GUI_TESTS` | Depends on GUI and tests | Build GUI tests. |
| `BUILD_BENCH` | OFF | Build benchmark executable. |
| `BUILD_FUZZ_BINARY` | OFF | Build fuzz binary. |
| `BUILD_FOR_FUZZING` | OFF | Build for fuzzing and disable most other targets. |
| `INSTALL_MAN` | ON | Install man pages. |

## Executables and libraries

Reviewed configure-summary output lists these executable targets:

- `bitcoinIId`
- `bitcoinII-node` when multiprocess daemon mode is enabled
- `bitcoinII-qt`
- `bitcoinII-gui` when multiprocess GUI mode is enabled
- `bitcoinII-cli`
- `bitcoinII-tx`
- `bitcoinII-util`
- `bitcoinII-wallet`
- `bitcoinII-chainstate` experimental

Reviewed library and target structure from `src/CMakeLists.txt` includes:

- `bitcoinII_consensus`
- `bitcoinII_common`
- `bitcoinII_node`
- `bitcoinII_cli`
- optional wallet subtree
- optional GUI subtree
- optional kernel library subtree
- test, benchmark, and fuzz subdirectories depending on build options

## Dependency notes

Reviewed dependency behavior includes:

- CMake 3.22 or newer is required.
- C++20 is required.
- Threads are required.
- Libevent 2.1.8 or newer is required when daemon, GUI, CLI, tests, benchmark, or fuzz binary targets are enabled.
- Boost headers are used.
- SQLite is required when `WITH_SQLITE` is enabled.
- Berkeley DB 4.8 is required when `WITH_BDB` is enabled.
- ZeroMQ 4.0.0 or newer is required when `WITH_ZMQ` is enabled.
- Qt 5.11.3 or newer is required when `BUILD_GUI` is enabled.
- QRencode is required when QR support is enabled.
- USDT support requires the USDT package when enabled.
- Multiprocess builds require libmultiprocess packages.

`FindLibevent.cmake` supports both CMake package config discovery and pkg-config fallback.

## Unix build notes reviewed

The upstream Unix build document gives this basic build shape:

```bash
cmake -B build
cmake --build build
cmake --install build
```

MoreBC2 has read this instruction from source documentation, but has not yet run it. It should not be marked verified until tested in a clean environment.

The same document lists common Ubuntu/Debian build requirements:

```bash
sudo apt-get install build-essential cmake pkgconf python3
sudo apt-get install libevent-dev libboost-dev
sudo apt install libsqlite3-dev
```

GUI builds additionally require Qt-related packages and `-DBUILD_GUI=ON`.

Disable-wallet mode is documented with:

```bash
cmake -B build -DENABLE_WALLET=OFF
```

Again: these are source-documented commands, not MoreBC2-tested commands yet.

## Windows and macOS notes

The top-level CMake file contains Windows-specific handling for MSVC and MinGW.

Reviewed Windows behavior includes:

- MSVC runtime-library configuration.
- Unicode compile definitions.
- MSVC compile options.
- MinGW compile definitions.
- MinGW static-linking attempt.
- Subsystem-version linker flags.

Reviewed macOS behavior includes:

- Cross-compile handling for install-name behavior.
- Darwin-specific linker flags.
- macOS deployment helper target inclusion.

This page does not yet provide tested Windows or macOS build instructions.

## Hardening, warnings, and fuzzing

Reviewed build behavior includes:

- Optional executable hardening through `ENABLE_HARDENING`.
- Optional warnings-as-errors through `WERROR`.
- Optional ccache through `WITH_CCACHE`.
- Sanitizer flag handling through `SANITIZERS`.
- Fuzzing mode that disables most normal targets and enables fuzz binary behavior.

## Relationship to local development

Use [Local development environment](local-development.md) to record actual command test results.

This page documents what the build system appears to support from source review. The local-development page records what MoreBC2 has actually run.

## What this page does not claim

This page does not claim:

- That any build command has been successfully run by MoreBC2.
- That all targets compile on all platforms.
- That release binaries are reproducible.
- That release binaries are signed or checksummed.
- That package dependency lists are complete for every distro.

Those require separate testing or release verification.

## Open items

- Run a clean Linux daemon/CLI build.
- Run a clean Linux no-wallet build.
- Run unit tests after a successful build.
- Review Windows build documentation.
- Review macOS build documentation.
- Review `depends/` behavior.
- Review CI build workflows.
- Review release packaging and artifact creation.
- Verify checksum/signature workflow.

## Sources

- `CMakeLists.txt`
- `src/CMakeLists.txt`
- `doc/build-unix.md`
- `cmake/module/FindLibevent.cmake`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Build metadata was synchronized to the `v31.1.0` baseline. This page remains a first-pass source-backed map, and commands remain unverified until run in a clean environment.
