# Network test run plan

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page turns the network test coverage map into a cautious execution plan.

It is not a test result record. It does not say any tests passed. It only defines a staged way to run a small set of relevant BitcoinII Core unit and functional tests later.

## Why this exists

MoreBC2 has now mapped likely network/P2P test files, but mapping is weaker than running tests.

Before any public-facing page says a behavior is tested, MoreBC2 needs a reproducible record that includes:

- operating system
- BitcoinII source ref or release tag
- build configuration
- exact command
- date run
- pass/fail result
- notes about skipped tests or environment limits

## Scope

This plan focuses on tests connected to the reviewed network Source Atlas pages:

- address manager
- peer list management
- lower-level network behavior
- network RPC
- address sharing
- block/header sharing
- transaction sharing
- peer permissions
- peer eviction
- compact blocks
- invalid peer messages

This plan does not cover wallet tests, mining tests, full functional-test-suite execution, or release binary verification.

## Pre-run requirements

Before running any test commands, record:

| Field | Value |
|---|---|
| Tester | TBD |
| Machine / OS | TBD |
| BitcoinII repo path | TBD |
| BitcoinII ref | TBD |
| Build type | TBD |
| Compiler/toolchain | TBD |
| Test framework command path | TBD |
| Network mode | local/regtest only |
| Date | TBD |

Rules:

- Use a disposable build or working directory.
- Do not use a production data directory.
- Do not use a real wallet.
- Do not connect the test plan to live funds.
- Keep this separate from user-facing RPC smoke tests.
- Treat failures as data, not as something to hide.

## Stage 1: focused unit tests

Goal: run the lowest-risk unit tests first.

Candidate unit-test targets:

| Target area | Test file | Why run it first |
|---|---|---|
| Address manager | `src/test/addrman_tests.cpp` | Directly relevant to addrman Source Atlas page. |
| Peer list management | `src/test/banman_tests.cpp` | Directly relevant to BanMan Source Atlas page. |
| Network helpers | `src/test/net_tests.cpp` | Relevant to connection types, address behavior, and network helper behavior. |
| Network base helpers | `src/test/netbase_tests.cpp` | Relevant to network classification, address parsing, permissions, and protocol-adjacent helpers. |

Command examples are intentionally not marked verified here because the correct invocation depends on the build system and platform.

Record results in this format:

| Date | Ref | OS | Command | Result | Notes |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Not run | TBD |

## Stage 2: network RPC functional test

Goal: test the RPC surface most directly tied to `src/rpc/net.cpp`.

Candidate functional test:

| Test file | Why it matters |
|---|---|
| `test/functional/rpc_net.py` | Observed coverage includes `getconnectioncount`, `getpeerinfo`, `getnettotals`, `getnetworkinfo`, `addnode`, `getaddednodeinfo`, service flags, `getnodeaddresses`, `addpeeraddress`, `sendmsgtopeer`, `getaddrmaninfo`, and `getrawaddrman`. |

Important caution:

This functional test includes state-changing network commands. It is a developer test-suite item, not a recommendation for beginner node operators.

Record results in this format:

| Date | Ref | OS | Command | Result | Notes |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Not run | TBD |

## Stage 3: address relay and address response behavior

Goal: test addr relay, addrv2 relay, and cached address responses.

Candidate functional tests:

| Test file | Why it matters |
|---|---|
| `test/functional/p2p_addr_relay.py` | Address relay behavior and addr-message handling. |
| `test/functional/p2p_addrv2_relay.py` | ADDRV2 negotiation and relay behavior. |
| `test/functional/p2p_getaddr_caching.py` | Cached address responses, repeated addr requests, and addrman population through test RPC paths. |

Record results in this format:

| Date | Ref | OS | Command | Result | Notes |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Not run | TBD |

## Stage 4: peer message and handshake behavior

Goal: test invalid-message handling, permissions, and tx-reconciliation negotiation.

Candidate functional tests:

| Test file | Why it matters |
|---|---|
| `test/functional/p2p_invalid_messages.py` | Invalid peer messages, duplicate version behavior, invalid headers, oversized messages, and resource-exhaustion-adjacent cases. |
| `test/functional/p2p_permissions.py` | Permission calculation and application. |
| `test/functional/p2p_sendtxrcncl.py` | Transaction reconciliation negotiation and ordering constraints. |

Record results in this format:

| Date | Ref | OS | Command | Result | Notes |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Not run | TBD |

## Stage 5: block/header and transaction sharing behavior

Goal: test behavior connected to block/header and transaction-sharing Source Atlas pages.

Candidate functional tests:

| Test file | Why it matters |
|---|---|
| `test/functional/p2p_sendheaders.py` | Header announcements and sendheaders behavior. |
| `test/functional/p2p_compactblocks.py` | Compact block behavior. |
| `test/functional/p2p_tx_download.py` | Transaction download behavior. |

Record results in this format:

| Date | Ref | OS | Command | Result | Notes |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Not run | TBD |

## Stage 6: peer eviction behavior

Goal: test peer eviction behavior that maps to the peer health/stale-tip Source Atlas page.

Candidate functional test:

| Test file | Why it matters |
|---|---|
| `test/functional/p2p_eviction.py` | Observed docstring says it tests node eviction logic. It also documents its own limitation: address/netgroup criteria are not fully testable in the framework because peers connect from the same local address. |

Important caution:

Passing this test would not prove every peer-health, discouragement, or stale-tip behavior. It would only provide a test result for the behavior covered by this functional test.

Record results in this format:

| Date | Ref | OS | Command | Result | Notes |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Not run | TBD |

## Suggested first minimal run

A small first pass should be conservative:

1. Address-manager unit test target.
2. BanMan unit test target.
3. Network helper unit test target.
4. `rpc_net.py` functional test.

Only after that should broader P2P functional tests be run.

## Pass/fail record template

When a test is run, add a dated record like this:

| Date | Ref | OS | Build notes | Command | Result | Notes |
|---|---|---|---|---|---|---|
| YYYY-MM-DD | `v31.1.0` or commit SHA | Windows/Linux/macOS | TBD | `TBD` | Pass/Fail/Skipped | TBD |

Do not summarize a test as passed unless the command was actually run and the output was checked.

## What this page does not claim

This page does not claim:

- any test has been run
- any test has passed
- release binaries match source
- live network behavior matches tests
- source-reviewed behavior is complete
- command examples are user-safe
- developer test-suite commands are suitable for beginners

## Related pages

- [Network test coverage map](network-test-coverage-map.md)
- [Network release comparison](network-release-comparison.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Command testing status](command-testing.md)
- [Documentation coverage](../documentation-coverage.md)
- [Open questions backlog](open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Network test coverage map and observed test-file names
**Notes:** This is a plan only. It should be updated with actual command records only after a suitable local BitcoinII build/test environment exists.
