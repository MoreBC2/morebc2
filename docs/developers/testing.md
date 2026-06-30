# Testing guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page documents what MoreBC2 has reviewed about BitcoinII Core test organization.

It is still a Draft because MoreBC2 has not yet run the tests in a clean environment. Source-backed test structure is documented here, but commands are not marked verified until tested.

## Primary source files reviewed

Reviewed test-related files include:

- `src/test/CMakeLists.txt`
- `src/test/util/CMakeLists.txt`
- `src/wallet/test/CMakeLists.txt`
- `cmake/tests.cmake`
- `test/functional/test_runner.py`

This is a first-pass review of test organization, not a full test audit.

## Unit test target

The reviewed CMake test tree builds a `test_bitcoinII` executable.

`src/test/CMakeLists.txt` lists many unit/integration-style C++ test source files, including areas such as:

- address manager tests
- amount and serialization tests
- block manager and block filter tests
- coins and chainstate tests
- crypto and hash tests
- mempool tests
- miner and mini-miner tests
- networking tests
- policy and RBF tests
- proof-of-work tests
- RPC tests
- script tests
- transaction validation tests
- validation and validation-interface tests
- versionbits tests

The test target links against:

- `core_interface`
- `test_util`
- `bitcoinII_cli`
- `bitcoinII_node`
- `bitcoinII_consensus`
- `minisketch`
- `secp256k1`
- Boost headers
- `libevent::extra`

## Test data

The reviewed unit-test target includes JSON and raw data sources such as:

- `data/base58_encode_decode.json`
- `data/bip341_wallet_vectors.json`
- `data/blockfilters.json`
- `data/key_io_invalid.json`
- `data/key_io_valid.json`
- `data/script_tests.json`
- `data/sighash.json`
- `data/tx_invalid.json`
- `data/tx_valid.json`
- `data/asmap.raw`

These files should be reviewed separately before making detailed claims about test-vector coverage.

## Test utility library

`src/test/util/CMakeLists.txt` defines a `test_util` static library.

Reviewed utility source areas include helpers for:

- block filters
- coins
- indexes
- JSON
- logging
- mining
- networking
- random data
- script helpers
- common test setup
- strings
- transaction utilities
- mempool helpers
- validation helpers
- wallet test helpers when wallet support is enabled

This is useful because many tests share setup and helper behavior instead of being fully standalone.

## Wallet tests

When `ENABLE_WALLET` is enabled, the reviewed test tree adds `src/wallet/test` sources into `test_bitcoinII`.

Reviewed wallet test areas include:

- wallet database tests
- coin selection tests
- fee bumping tests
- output grouping tests
- wallet initialization tests
- ownership/ismine tests
- PSBT wallet tests
- scriptpubkey manager tests
- spending tests
- wallet crypto tests
- wallet transaction tests
- wallet database tests
- wallet loading tests

MoreBC2 has not yet reviewed the contents of those wallet tests.

## CTest registration

`src/test/CMakeLists.txt` scans test source files for Boost test-suite macros and registers each discovered suite as a CTest test.

The generated command shape is based on:

```text
test_bitcoinII --run_test=<suite> --catch_system_error=no --log_level=test_suite -- DEBUG_LOG_OUT
```

This is source-reviewed behavior. MoreBC2 has not yet run the generated tests.

## Additional CMake tests

`cmake/tests.cmake` adds Python-based tests when the required targets and Python command are available.

Reviewed entries include:

- `util_test_runner`
- `util_rpcauth_test`

These depend on generated test utility scripts in the build tree.

## Functional test runner

The reviewed functional test runner is:

- `test/functional/test_runner.py`

Reviewed behavior includes:

- It runs individual test scripts through subprocesses.
- It sets `REQUIRE_WALLET_TYPE_SET=1`.
- It defines base and extended test-script lists.
- Extended tests are not run by default.
- It checks for free disk space requirements.
- It supports parallel jobs with `--jobs`.
- It supports exclusions, filters, fail-fast behavior, result CSV output, coverage mode, and no-cleanup mode.
- It reads generated configuration from `test/config.ini` relative to the build/test path.
- It exits early if the daemon component is not enabled.

## Functional test categories seen in first pass

The functional test list includes broad coverage areas such as:

- P2P behavior
- mempool behavior
- mining RPCs and block templates
- wallet behavior for legacy and descriptor wallets
- RPC interface behavior
- reindex and pruning
- SegWit and Taproot behavior
- versionbits and activation behavior
- block filters and indexes
- REST and HTTP interfaces
- ZMQ and USDT interfaces
- assumeutxo and chainstate behavior
- startup, shutdown, file locks, and settings

This list appears broad, but MoreBC2 has not yet checked which tests pass against BitcoinII or whether any are BitcoinII-specific beyond naming and path changes.

## Commands to avoid marking verified

Do not mark any of these as verified until actually run:

```bash
ctest --test-dir build
```

```bash
build/src/test/test_bitcoinII
```

```bash
test/functional/test_runner.py
```

They may be source-documented or source-implied, but MoreBC2 still needs a real clean-environment test record.

## Suggested first smoke test path

After a successful build, the first practical MoreBC2 test record should probably include:

1. Run CTest against the build directory.
2. Run the C++ unit test executable directly.
3. Run one small functional test.
4. Record OS, commit, build options, commands, result, and failure output if any.

Use the test-record format from [Local development environment](local-development.md).

## What this page does not claim

This page does not claim:

- That tests pass.
- That all listed tests are BitcoinII-specific.
- That the full test suite is currently maintained.
- That functional tests are safe to run against a real data directory.
- That every listed script is enabled in every build configuration.

## Open items

- Run CTest locally or in CI.
- Run `test_bitcoinII` directly.
- Run a single functional test.
- Review `test/functional/test_framework/`.
- Identify tests that are BitcoinII-specific rather than inherited or renamed.
- Review fuzz test organization.
- Review benchmark targets.
- Document expected runtime and common failures.

## Sources

- `src/test/CMakeLists.txt`
- `src/test/util/CMakeLists.txt`
- `src/wallet/test/CMakeLists.txt`
- `cmake/tests.cmake`
- `test/functional/test_runner.py`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page now contains a first-pass source-backed test-tree map. Commands remain unverified until run in a clean environment.
