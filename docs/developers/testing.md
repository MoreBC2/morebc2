# Testing guide

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page distinguishes two different kinds of evidence:

1. the BitcoinII Core source test framework that MoreBC2 has reviewed; and
2. the bounded release-binary runtime validations MoreBC2 has actually executed.

MoreBC2 has **not** yet built BitcoinII Core from source in a clean environment and run the full unit/functional suite. That remains true. However, it is no longer correct to say MoreBC2 has performed no local runtime testing: current `v31.1.0` Windows node/RPC and isolated wallet/PSBT tests now exist.

## Source test framework

Reviewed test-related paths include:

- `src/test/CMakeLists.txt`
- `src/test/util/CMakeLists.txt`
- `src/wallet/test/CMakeLists.txt`
- `cmake/tests.cmake`
- `test/functional/test_runner.py`

The CMake tree builds `test_bitcoinII` when tests are enabled and registers discovered Boost test suites with CTest. The source tree includes broad coverage for consensus, serialization, chainstate, mempool, mining, networking, policy/RBF, proof of work, RPC, scripts, validation, wallet behavior, PSBTs, and related utilities.

Python functional testing is organized through `test/functional/test_runner.py`, with parallel jobs, filtering/exclusions, fail-fast, coverage, cleanup controls, and generated test configuration.

These statements describe source structure. They do not claim MoreBC2 has executed the entire suite.

## v31-specific test review

The September v31 source audit checked replay-protection-related paths and found no dedicated replay-specific unit or functional test in the searched `src/test`, `src/wallet/test`, and `test/functional` areas. Generic PSBT/wallet coverage exists, but generic coverage is not the same as a BC2 replay-domain activation test.

See:

- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [v31 wallet, PSBT, RPC, mempool, and mining regression audit — 2026-09-02](../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)

## MoreBC2 runtime testing completed

### Windows v31 node/RPC

A fresh disposable mainnet data directory was used to start BitcoinII Core `v31.1.0`, inspect node/network/blockchain/mempool state through loopback RPC, observe peer connectivity and partial synchronization, exercise a disposable wallet subset, and stop cleanly.

This was a release-binary runtime test, not a source build or full test-suite run.

### Windows v31 isolated PSBT lifecycle

A separate fresh regtest data directory and disposable descriptor wallet were used with zero peers. The test generated local funds, created a funded PSBT, signed it, finalized it, decoded the transaction, passed `testmempoolaccept`, and submitted it only to the local regtest mempool.

The test did not touch existing wallets and did not broadcast to a public network.

### Replay-protection boundary

The runtime PSBT test establishes ordinary wallet/PSBT behavior in the documented isolated environment. Mainnet replay protection remains source-confirmed at height `57750` with fork/domain id `0x01324342`; regtest leaves that activation disabled as shipped, so the activation switch itself was not forced or runtime-tested.

## What remains unexecuted

MoreBC2 has not yet documented a clean source-build run of:

- the complete `test_bitcoinII` suite;
- the complete functional test suite;
- GUI tests;
- fuzz targets;
- benchmark targets;
- replay-protection activation-specific tests;
- ShockWave candidate-time/difficulty regression tests;
- cross-platform build/test parity.

Do not convert source-located tests into “passed” tests without a dated execution record.

## Recommended next test work

Highest-value developer test work is:

1. reproduce a clean source build at release tag `v31.1.0`;
2. run the default unit/CTest suite and record failures/skips;
3. run a bounded functional-test subset covering RPC, wallet/PSBT, mempool, and mining;
4. add or locate deterministic replay-domain activation vectors/tests;
5. exercise ShockWave candidate-time and required-work behavior in an isolated fixture;
6. repeat the safe build/test path on another platform or independent environment.

## Test-record standard

For every claimed execution, record:

- date;
- operating system and architecture;
- source tag/commit or release binary identity;
- exact test command/procedure;
- network and data-directory isolation;
- wallet state where relevant;
- result, failures, and skips;
- whether public networking or funds were involved.

## Related pages

- [Build system guide](build-system.md)
- [Local development environment](local-development.md)
- [Verification standards](verification-standards.md)
- [Command testing status](../verification/command-testing.md)
- [Source atlas](source-atlas/README.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current BitcoinII Core test/build structure, v31 source regression audit, and September 11 v31 runtime validation records  
**Notes:** The source test framework is reviewed but not fully executed by MoreBC2. Release-binary runtime testing is now documented separately so it is neither ignored nor misrepresented as a source-build test pass.