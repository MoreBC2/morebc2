# Network test coverage map

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page maps currently observed BitcoinII Core test files that appear relevant to MoreBC2's first-pass network and peer-communication Source Atlas work.

This is not a record that MoreBC2 ran these tests. It is a source-tree mapping only.

## Why this exists

MoreBC2 now has first-pass Source Atlas pages for:

- protocol primitives
- network RPC
- lower-level connection management
- address manager
- peer list management
- net-processing handshake
- address sharing
- block/header sharing
- transaction sharing
- peer health and stale-tip checks
- send-loop behavior

The next verification step is to understand what upstream/current test files already exist before recommending local smoke tests or deeper reviewer assignments.

## Unit test files observed

| Test file | Relevant reviewed area | Observed coverage hints |
|---|---|---|
| `src/test/addrman_tests.cpp` | Address manager | Includes `addrdb.h`, `addrman.h`, `addrman_impl.h`, and setup helpers. Observed tests include `addrman_simple` and `addrman_ports`, including empty addrman behavior, `Add`, deduplication, multiple address add behavior, and port-related behavior. |
| `src/test/banman_tests.cpp` | Peer list management | Includes `banman.h`; observed test checks ban-list file parsing, drops invalid entries, drops unknown version entries, and keeps a valid subnet entry. |
| `src/test/net_tests.cpp` | Lower-level network and address behavior | Includes `net.h`, `net_processing.h`, `netaddress.h`, and `netbase.h`. Observed tests include listen-port selection, `CNode` connection-type helpers, inbound/outbound flags, connected network type, CNetAddr basics, special address parsing, and serialization behavior. |
| `src/test/netbase_tests.cpp` | Network address/base helpers | Includes `net_permissions.h`, `netaddress.h`, `netbase.h`, `netgroup.h`, and `protocol.h`. Observed tests cover network classification, address properties, internal addresses, host/port splitting, and permission-adjacent helpers. |

## Functional test files observed

| Test file | Relevant reviewed area | Observed coverage hints |
|---|---|---|
| `test/functional/p2p_addr_relay.py` | Address relay and addrman interaction | Test docstring says it tests addr relay. Observed code uses `msg_addr`, `msg_getaddr`, address receiver behavior, relay token behavior, and address-content checks. |
| `test/functional/p2p_addrv2_relay.py` | ADDRV2 relay and negotiation | Test docstring says it tests addrv2 relay. Observed code checks disconnection when `sendaddrv2` is sent after verack, creates addrv2 messages, and checks addrv2 message content is relayed and added to addrman. |
| `test/functional/p2p_invalid_messages.py` | Protocol parsing and invalid-message handling | Test docstring says it tests node responses to invalid network messages. Observed run list includes duplicate version, magic bytes, checksum, message size, message type, addrv2 edge cases, oversized inv/getdata/headers, invalid proof-of-work headers, noncontinuous headers, and resource-exhaustion cases. |
| `test/functional/p2p_sendheaders.py` | Header announcements and block/header sharing | Test docstring describes behavior of headers messages to announce blocks, including null/non-null locators, sendheaders behavior, large reorg behavior, direct fetch behavior, and headers that do not connect. |
| `test/functional/p2p_compactblocks.py` | Compact block behavior | Test docstring says it tests compact blocks. Observed imports include compact-block message classes, `sendcmpct`, `cmpctblock`, `getblocktxn`, `blocktxn`, `getheaders`, headers, inv, and block/tx messages. |
| `test/functional/p2p_tx_download.py` | Transaction download and transaction sharing | Test docstring says it tests transaction download behavior. Observed code uses txid/wtxid inventory, `getdata`, notfound, tx messages, peer delays, request-in-flight constants, and multiple peer connection types. |
| `test/functional/p2p_permissions.py` | Peer permissions and whitelisting | Test docstring says it tests P2P permission messages and checks permissions are correctly calculated and applied. Observed code covers whitelist/whitebind permission combinations including relay, noban, mempool, download, bloomfilter, and forcerelay. |
| `test/functional/p2p_sendtxrcncl.py` | Transaction reconciliation negotiation | Test docstring says it tests `SENDTXRCNCL`. Observed code checks sending to inbound peers, ordering before verack, version/wtxidrelay gating, and tx reconciliation behavior. |

## Coverage relationship to Source Atlas pages

| MoreBC2 page | Relevant observed tests | Current confidence |
|---|---|---|
| [Addrman](../developers/source-atlas/addrman.md) | `src/test/addrman_tests.cpp`, `test/functional/p2p_addr_relay.py`, `test/functional/p2p_addrv2_relay.py` | Tests exist, but MoreBC2 has not run them locally. |
| [Banman](../developers/source-atlas/banman.md) | `src/test/banman_tests.cpp`, `test/functional/p2p_permissions.py` | Tests exist, but coverage appears narrower for BanMan than addrman. MoreBC2 has not run them locally. |
| [Net connection management](../developers/source-atlas/net-connection-management.md) | `src/test/net_tests.cpp`, `src/test/netbase_tests.cpp`, `test/functional/p2p_invalid_messages.py`, `test/functional/p2p_permissions.py` | Tests exist for selected helpers and invalid-message behavior; lower-level socket-loop coverage still needs deeper mapping. |
| [P2P protocol primitives](../developers/source-atlas/protocol.md) | `src/test/net_tests.cpp`, `src/test/netbase_tests.cpp`, `test/functional/p2p_invalid_messages.py` | Tests exist for address serialization and invalid message handling; protocol-message coverage needs fuller review. |
| [Net processing handshake](../developers/source-atlas/net-processing-handshake.md) | `test/functional/p2p_invalid_messages.py`, `test/functional/p2p_sendtxrcncl.py`, `test/functional/p2p_permissions.py` | Tests exist for duplicate version, pre-verack behavior, tx reconciliation signaling, and permissions. MoreBC2 has not run them locally. |
| [Net processing address relay](../developers/source-atlas/net-processing-address-relay.md) | `test/functional/p2p_addr_relay.py`, `test/functional/p2p_addrv2_relay.py` | Directly relevant functional tests exist. MoreBC2 has not run them locally. |
| [Net processing block and header relay](../developers/source-atlas/net-processing-block-relay.md) | `test/functional/p2p_sendheaders.py`, `test/functional/p2p_compactblocks.py`, `test/functional/p2p_invalid_messages.py` | Directly relevant functional tests exist for header announcements, compact blocks, and invalid header/message cases. |
| [Net processing transaction relay](../developers/source-atlas/net-processing-transaction-relay.md) | `test/functional/p2p_tx_download.py`, `test/functional/p2p_sendtxrcncl.py`, `test/functional/p2p_permissions.py` | Directly relevant functional tests exist for transaction download, tx reconciliation signaling, and permissions. |
| [Net processing peer eviction and stale-tip checks](../developers/source-atlas/net-processing-peer-eviction.md) | `test/functional/p2p_permissions.py`; additional eviction/stale-tip tests still need search | Coverage likely exists but is not fully mapped. Needs deeper targeted search. |
| [Net processing send loop](../developers/source-atlas/net-processing-send-loop.md) | `test/functional/p2p_sendheaders.py`, `test/functional/p2p_tx_download.py`, `test/functional/p2p_compactblocks.py`, `test/functional/p2p_addr_relay.py` | Relevant behavior is exercised across several functional tests, but send-loop coverage is indirect and not locally run by MoreBC2. |
| [Network RPC](../developers/source-atlas/rpc-network.md) | `src/test/net_tests.cpp`; RPC-specific functional tests still need search | Network status command testing remains separate from source-test coverage. |

## What this map does not prove

This page does not prove:

- that MoreBC2 ran any tests
- that all relevant tests passed for BitcoinII `v29.1.0`
- that release binaries match source
- that live network behavior matches test behavior
- that every peer-communication branch has test coverage
- that test coverage is BitcoinII-specific rather than inherited from Bitcoin Core
- that all relevant tests have been found

It only records observed test files and likely relevance.

## Recommended next steps

1. Review the full contents of each listed test file.
2. Search for additional peer eviction, stale-tip, DNS seed, addrman, net-processing, and network RPC tests.
3. Compare key test files between `v29.1.0` and `main` if test docs will mention release behavior.
4. Add a local test command plan for a small subset of network tests.
5. Keep user-facing command smoke tests separate from developer test-suite execution.

## Related pages

- [Network release comparison](network-release-comparison.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Command testing status](command-testing.md)
- [Documentation coverage](../documentation-coverage.md)
- [Open questions backlog](open-questions.md)
- [Source atlas index](../developers/source-atlas/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is an observed test-file mapping only. The tests have not been run by MoreBC2, and this page should not be used as pass/fail evidence.
