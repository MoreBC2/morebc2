# Command testing status

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-01

## Summary

This page tracks BitcoinII Core command examples that need local testing before MoreBC2 treats them as verified instructions.

A command can be source-observed without being tested. Source-observed means MoreBC2 reviewed source code or generated help text that describes the command. Tested means the command was actually run in a documented environment.

Use the [command smoke-test plan](command-smoke-test-plan.md) for the first safe local test order.

## Current rule

No command example in MoreBC2 should be treated as verified unless it has a test record with:

- Date tested.
- Operating system.
- BitcoinII Core version, release, branch, or commit.
- Network mode: mainnet, testnet, signet, or regtest.
- Command entered.
- Expected result.
- Actual result.
- Notes about wallet state, sync state, pruning, or test data.

## Status labels

Use these labels when reviewing command examples:

| Label | Meaning |
|---|---|
| Source-observed | The command appears in reviewed source, docs, help text, or config material. |
| Placeholder | The command is shown as a future example shape, not as a tested command. |
| Locally tested | The command was run and a test record exists. |
| Verified | The command was tested, reviewed, and is safe to present for the documented context. |
| Needs recheck | The command was tested before, but release, platform, or network assumptions changed. |
| Do not publish | The command is too sensitive, risky, confusing, or context-dependent for normal docs. |

## Untested command inventory

These commands have been mentioned in MoreBC2 as common examples or reviewed command surfaces, but they still need local test records before they are used as verified instructions.

The first recommended testing order is documented in the [command smoke-test plan](command-smoke-test-plan.md). Start with harmless node-only commands before wallet, dry-run transaction, or advanced workflows.

### Basic node and chain status

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getblockchaininfo` | Placeholder | Phase 1 smoke-test candidate. Needs disposable/local node record. |
| `bitcoinII-cli getnetworkinfo` | Placeholder | Phase 1 smoke-test candidate. Network RPC source review is still pending. |
| `bitcoinII-cli getblockcount` | Placeholder | Phase 1 smoke-test candidate. Needs basic node command record. |
| `bitcoinII-cli getbestblockhash` | Placeholder | Phase 1 smoke-test candidate. Needs basic node command record. |
| `bitcoinII-cli getdifficulty` | Placeholder | Needs node command record and network context. |

### Wallet status and address commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getwalletinfo` | Placeholder | Phase 2 smoke-test candidate after temporary wallet setup. |
| `bitcoinII-cli listwallets` | Placeholder | Phase 2 smoke-test candidate after wallet-enabled node setup. |
| `bitcoinII-cli listwalletdir` | Placeholder | Needs wallet-directory path notes. |
| `bitcoinII-cli getnewaddress` | Placeholder | Phase 2 smoke-test candidate; creates an address in a temporary wallet. |
| `bitcoinII-cli gettransaction <txid>` | Placeholder | Needs wallet transaction fixture. |
| `bitcoinII-cli listtransactions` | Placeholder | Needs temporary-wallet or regtest record. |

### Wallet movement and recovery commands

These commands should not appear in beginner docs until they are tested, caveated, and placed in the right context.

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli sendtoaddress <address> <amount>` | Placeholder | Moves wallet funds; test only with temporary/regtest funds. Keep out of early smoke tests. |
| `bitcoinII-cli backupwallet <destination>` | Placeholder | Needs temporary-wallet backup record. Keep out of early smoke tests. |
| `bitcoinII-cli restorewallet <wallet_name> <backup_file>` | Placeholder | Needs temporary-wallet restore record. Keep out of early smoke tests. |
| `bitcoinII-cli walletpassphrase ...` | Placeholder | Sensitive workflow; test only on disposable wallet. Keep out of early smoke tests. |
| `bitcoinII-cli walletlock` | Placeholder | Needs disposable encrypted-wallet record. Keep out of early smoke tests. |
| `bitcoinII-cli rescanblockchain` | Placeholder | Needs wallet and chain-state notes. Keep out of early smoke tests. |

### Mining and template commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getmininginfo` | Placeholder | Phase 1 smoke-test candidate. Needs node command record. |
| `bitcoinII-cli getblocktemplate '{"rules":["segwit"]}'` | Placeholder | Needs local node record and context. Do after basic node checks. |
| `bitcoinII-cli submitblock <hex>` | Do not publish | Advanced/live path; avoid normal docs until dedicated safe workflow exists. |
| `bitcoinII-cli submitheader <hex>` | Do not publish | Advanced/live path; avoid normal docs until dedicated safe workflow exists. |

### Raw transaction and PSBT commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getrawtransaction <txid> 1` | Placeholder | Needs txindex/blockhash/pruned-node context. |
| `bitcoinII-cli decoderawtransaction <hex>` | Placeholder | Phase 3 smoke-test candidate with harmless fixture. |
| `bitcoinII-cli decodescript <hex>` | Placeholder | Phase 3 smoke-test candidate with harmless fixture. |
| `bitcoinII-cli analyzepsbt <psbt>` | Placeholder | Needs harmless PSBT fixture. |
| `bitcoinII-cli createpsbt ...` | Placeholder | Needs regtest fixture. |
| `bitcoinII-cli finalizepsbt <psbt>` | Placeholder | Needs harmless PSBT fixture. |
| `bitcoinII-cli signrawtransactionwithkey ...` | Do not publish | Handles supplied private key material; avoid normal docs. |

### Mempool and relay commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli testmempoolaccept '["signedhex"]'` | Placeholder | Phase 3 smoke-test candidate only after harmless fixture exists. |
| `bitcoinII-cli sendrawtransaction <hex>` | Placeholder | Live submission path; keep out of early smoke tests except regtest-only plan. |
| `bitcoinII-cli getrawmempool true` | Placeholder | Needs local node record. |
| `bitcoinII-cli getmempoolinfo` | Placeholder | Phase 1 smoke-test candidate. Needs local node record. |
| `bitcoinII-cli getmempoolentry <txid>` | Placeholder | Needs mempool fixture. |
| `bitcoinII-cli submitpackage ...` | Do not publish | Experimental/advanced; avoid normal docs until deeper review and tests. |

## Test record template

```md
### Command: `bitcoinII-cli example`

**Date tested:** YYYY-MM-DD
**Tester:**
**Operating system:**
**BitcoinII Core version/release/commit:**
**Network mode:** mainnet / testnet / signet / regtest
**Node state:** synced / unsynced / pruned / wallet loaded / wallet disabled
**Command:**

```bash
bitcoinII-cli example
```

**Expected result:**

**Actual result:**

**Pass/fail:**

**Notes:**
```

## Where to put tested examples later

Once a command has a test record:

- Basic node commands can move into node/configuration docs.
- Wallet commands can move into wallet docs.
- Read-only service commands can move into exchange/service docs.
- Raw transaction and PSBT examples can move into developer docs.
- Advanced or risky commands should stay in advanced pages only.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 RPC, wallet, node, mining, configuration pages, and command smoke-test plan
**Notes:** This page is a tracking tool. It does not prove that any listed command works until a test record is added.
