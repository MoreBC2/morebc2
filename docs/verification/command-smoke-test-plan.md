# Command smoke-test plan

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-01

## Summary

This page defines a conservative first command smoke-test plan for BitcoinII Core.

It does not record that any command has been tested yet. It defines the order, environment expectations, and safety boundaries for future testing.

## Goal

The goal is to move a small number of harmless command examples from placeholder/source-observed status toward local test records.

The first pass should prove that a BitcoinII binary can:

- Start with a disposable data directory.
- Answer basic local status RPCs.
- Create or load a temporary wallet only when wallet testing is explicitly intended.
- Shut down cleanly.
- Produce enough environment details for repeatable documentation.

## Hard safety boundaries

Do not include these in the first smoke-test pass:

- Mainnet spend commands.
- Live transaction broadcast commands.
- Private-key dump/import commands.
- Real wallet passphrases.
- Restore tests using real backups.
- Public RPC exposure.
- Production data directories.
- Pruning/reindex/import tests on a real node.
- Block/header submission on a public network.

All first-pass tests should use a disposable directory and a clearly documented chain mode.

## Required test record fields

Each test record should include:

- Date tested.
- Tester name or handle.
- Operating system and version.
- CPU architecture.
- BitcoinII source or release used.
- Binary names used.
- Full command run.
- Chain mode.
- Data directory path type, not private local secrets.
- Whether wallet support was enabled.
- Expected result.
- Actual result.
- Pass/fail status.
- Notes and relevant non-sensitive output.

## Phase 0: environment record only

Before testing commands, record:

- Source repository or release source.
- Tag or commit.
- Whether binaries came from a release asset or local build.
- Whether binary verification was completed.
- Operating system.
- Whether the test uses daemon/CLI, GUI, or both.

If binary verification has not been completed, say so clearly.

## Phase 1: node-only harmless local checks

These should be the first candidates after a disposable node starts:

| Candidate command | Purpose | Risk level | Status before test |
|---|---|---|---|
| `getblockchaininfo` | Confirm chain status RPC works | Low | Placeholder |
| `getnetworkinfo` | Confirm node/network status RPC works | Low | Placeholder |
| `getmempoolinfo` | Confirm mempool status RPC works | Low | Placeholder |
| `getmininginfo` | Confirm mining status output shape | Low | Placeholder |
| `getbestblockhash` | Confirm active tip hash lookup works | Low | Placeholder |
| `getblockcount` | Confirm active height lookup works | Low | Placeholder |

These commands should be run only against a local node with local RPC authentication.

## Phase 2: temporary wallet checks

Only run these after creating a disposable wallet in a disposable data directory.

| Candidate command | Purpose | Risk level | Status before test |
|---|---|---|---|
| `listwallets` | Confirm loaded wallet list output | Low | Placeholder |
| `getwalletinfo` | Confirm wallet status output | Low | Placeholder |
| `getnewaddress` | Confirm address generation works in a temporary wallet | Medium | Placeholder |
| `getbalances` | Confirm balance output shape | Low | Placeholder |
| `listunspent` | Confirm output listing shape | Low | Placeholder |

`getnewaddress` changes wallet state by creating a receiving address, so it should be tested only in a temporary wallet.

## Phase 3: dry-run transaction checks

Only run after Phase 1 and Phase 2 are documented.

| Candidate command | Purpose | Risk level | Status before test |
|---|---|---|---|
| `testmempoolaccept` | Confirm dry-run mempool acceptance output shape | Medium | Placeholder |
| `decoderawtransaction` | Confirm decode behavior on known fixture transaction | Low | Placeholder |
| `decodescript` | Confirm script decode behavior on known fixture script | Low | Placeholder |

Do not use live broadcast in this phase.

## Commands to keep out of early testing

Do not include these until there is a separate disposable-wallet or regtest plan:

- `sendtoaddress`
- `sendmany`
- `send`
- `sendall`
- `sendrawtransaction`
- `submitblock`
- `submitheader`
- `walletpassphrase`
- `walletpassphrasechange`
- `encryptwallet`
- `backupwallet`
- `restorewallet`
- `dumpprivkey`
- `dumpwallet`
- `importprivkey`
- `importwallet`
- `rescanblockchain`
- `pruneblockchain`
- `invalidateblock`
- `reconsiderblock`

Some of these can eventually be tested safely, but they need dedicated disposable setups and stronger notes.

## Suggested first test record template

```md
### Test record: getblockchaininfo

**Date tested:** YYYY-MM-DD
**Tester:** handle
**OS:** Example OS and version
**Architecture:** x86_64 / arm64 / other
**BitcoinII version/source:** release tag, commit, or binary source
**Binary verification:** completed / not completed / not applicable
**Chain mode:** main / testnet / signet / regtest / unknown
**Data directory:** disposable / existing / other
**Wallet enabled:** yes / no
**Command:** `bitcoinII-cli -datadir=<disposable-dir> getblockchaininfo`
**Expected result:** JSON chain status output
**Actual result:** summary only, no secrets
**Status:** Pass / Fail / Needs recheck
**Notes:** relevant non-sensitive notes
```

## Promotion rule

A command should move from Placeholder to Locally tested only when a test record exists.

A command should move from Locally tested to Verified only after another environment or reviewer reproduces it, or after an agreed verification standard is met.

## Related pages

- [Command testing status](command-testing.md)
- [Command example scan](command-example-scan.md)
- [Stale wording scan](stale-wording-scan.md)
- [RPC overview](../developers/rpc-overview.md)
- [Local development](../developers/local-development.md)

## Verification

**Status:** Draft
**Primary sources checked:** MoreBC2 command trackers and source-atlas RPC inventory pages
**Notes:** This plan intentionally avoids live broadcast, real-wallet, private-key, restore, pruning, reindex, and block-submission tests. It is a planning page, not evidence that commands work.
