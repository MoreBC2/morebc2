# Command testing status

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-10

## Summary

This page tracks BitcoinII Core command examples that need local testing before MoreBC2 treats them as verified instructions.

A command can be source-observed without being tested. Source-observed means MoreBC2 reviewed source code or generated help text that describes the command. Tested means the command was actually run in a documented environment.

Use the [command smoke-test plan](command-smoke-test-plan.md) for the safe local test order. The first read-only node-status batch was completed on 2026-07-10; see [BitcoinII read-only RPC smoke test — 2026-07-10](read-only-rpc-smoke-test-2026-07-10.md).

A separate wallet-disabled Windows command-line route was exercised on 2026-08-27 through startup, advancing initial sync, five read-only calls, clean RPC shutdown, and restart; see the [Windows node-operator test](windows-node-operator-test-2026-08-27.md).

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

| Label | Meaning |
|---|---|
| Source-observed | The command appears in reviewed source, docs, help text, or config material. |
| Placeholder | The command is shown as a future example shape, not as a tested command. |
| Locally tested | The command was run and a test record exists. |
| Verified | The command was tested, reviewed, and is safe to present for the documented context. |
| Needs recheck | The command was tested before, but release, platform, or network assumptions changed. |
| Do not publish | The command is too sensitive, risky, confusing, or context-dependent for normal docs. |

## Read-only commands locally tested on 2026-07-10

Environment: Windows, BitcoinII Core v29.1.0, mainnet, pruned node, localhost-only RPC at `127.0.0.1:8337`.

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getblockcount` | Locally tested | Succeeded. Harmless read-only example; output is time-dependent. |
| `bitcoinII-cli getbestblockhash` | Locally tested | Succeeded. Harmless read-only example; output is time-dependent. |
| `bitcoinII-cli getblockchaininfo` | Locally tested | Succeeded. Suitable with example-output labeling and node-state context. |
| `bitcoinII-cli getnetworkinfo` | Locally tested | Succeeded. Omit or redact local/public address fields before publication. |
| `bitcoinII-cli getconnectioncount` | Locally tested | Succeeded. Harmless read-only example. |
| `bitcoinII-cli getpeerinfo` | Locally tested | Succeeded. Raw output exposes peer/local addresses and session identifiers; publish only summarized/redacted output. |
| `bitcoinII-cli getmempoolinfo` | Locally tested | Succeeded. Harmless read-only example; output is time-dependent. |
| `bitcoinII-cli getdifficulty` | Locally tested | Succeeded. Harmless read-only example; output is time-dependent. |
| `bitcoinII-cli uptime` | Locally tested | Succeeded. Harmless read-only example. |

The local record also observed:

- `version=290100`
- `subversion=/Satoshi:29.1.0/`
- `protocolversion=70016`
- `chain=main`
- `initialblockdownload=false`
- `pruned=true`
- 10 outbound peers and 0 inbound peers at test time
- P2P v2 transport on all observed peers

## Node lifecycle commands locally tested on 2026-08-27

Environment: 64-bit Windows, BitcoinII Core `v29.1.0`, mainnet, unpruned isolated data directory, wallet disabled, outbound-only P2P, cookie RPC at the explicit loopback override `127.0.0.1:28337`.

| Command or action | Current status | Notes |
|---|---|---|
| `bitcoinIId.exe -datadir=<data-directory>` | Locally tested | Started from the CLI release through PowerShell `Start-Process`; the selected config and log paths were confirmed. |
| `bitcoinII-cli.exe -datadir=<data-directory> -rpcport=28337 getblockchaininfo` | Locally tested | Returned mainnet initial-sync fields while block validation advanced. |
| `bitcoinII-cli.exe -datadir=<data-directory> -rpcport=28337 getnetworkinfo` | Locally tested | Confirmed `v29.1.0`, network-active state, and connection counts. |
| `bitcoinII-cli.exe -datadir=<data-directory> -rpcport=28337 getconnectioncount` | Locally tested | Returned outbound connection counts without publishing peer addresses. |
| `bitcoinII-cli.exe -datadir=<data-directory> -rpcport=28337 getblockcount` | Locally tested | Height increased during initial sync. |
| `bitcoinII-cli.exe -datadir=<data-directory> -rpcport=28337 getbestblockhash` | Locally tested | Returned the current validated-tip hash. |
| `bitcoinII-cli.exe -datadir=<data-directory> -rpcport=28337 stop` | Locally tested | Returned the stopping acknowledgement; the process exited and the log recorded clean shutdown. |
| Restart with the same data directory | Locally tested | Reopened retained chain state and accepted RPC before a second clean shutdown. |

The explicit `28337` value is a test override, not a default. Full synchronization was not reached, and the page remains Draft.

## Remaining untested command inventory

### Basic node and chain status

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getmininginfo` | Placeholder | Needs node command record. Keep separate from mining-control commands. |

### Network and peer status commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getnettotals` | Placeholder | Read-only traffic summary candidate. Needs local node record. |
| `bitcoinII-cli getnodeaddresses` | Placeholder | Address-manager output depends on node state and peer discovery. Raw output may expose network addresses. |
| `bitcoinII-cli getaddrmaninfo` | Placeholder | Address-manager summary; keep developer/operator-focused until tested. |
| `bitcoinII-cli ping` | Placeholder | Sends peer ping requests and changes transient peer state. Needs a dedicated low-risk operator test. |
| `bitcoinII-cli setnetworkactive true` | Do not publish | Changes network-active state. Keep out of beginner docs until a dedicated operator workflow exists. |
| `bitcoinII-cli addnode ...` | Do not publish | Changes manual peer state. Needs careful operator context. |
| `bitcoinII-cli disconnectnode ...` | Do not publish | Disconnects peers. Operator-only after testing. |
| `bitcoinII-cli setban ...` | Do not publish | Alters ban list. Operator-only after testing and banman review. |
| `bitcoinII-cli clearbanned` | Do not publish | Alters ban list. Operator-only after testing and banman review. |

### Wallet status and address commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getwalletinfo` | Placeholder | Phase 2 candidate after temporary wallet setup. |
| `bitcoinII-cli listwallets` | Placeholder | Phase 2 candidate after wallet-enabled node setup. |
| `bitcoinII-cli listwalletdir` | Placeholder | Needs wallet-directory path notes. |
| `bitcoinII-cli getnewaddress` | Placeholder | Creates an address in a wallet; test only with a temporary/disposable wallet. |
| `bitcoinII-cli gettransaction <txid>` | Placeholder | Needs wallet transaction fixture. |
| `bitcoinII-cli listtransactions` | Placeholder | Needs temporary-wallet or regtest record. |

### Wallet movement and recovery commands

These commands should not appear in beginner docs until they are tested, caveated, and placed in the right context.

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli sendtoaddress <address> <amount>` | Placeholder | Moves wallet funds; test only with temporary/regtest funds. |
| `bitcoinII-cli backupwallet <destination>` | Placeholder | Needs temporary-wallet backup record. |
| `bitcoinII-cli restorewallet <wallet_name> <backup_file>` | Placeholder | Needs temporary-wallet restore record. |
| `bitcoinII-cli walletpassphrase ...` | Placeholder | Sensitive workflow; test only on disposable wallet. |
| `bitcoinII-cli walletlock` | Placeholder | Needs disposable encrypted-wallet record. |
| `bitcoinII-cli rescanblockchain` | Placeholder | Needs wallet and chain-state notes. |

### Mining and template commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getblocktemplate '{"rules":["segwit"]}'` | Placeholder | Needs local node record and context. Do after basic node checks. |
| `bitcoinII-cli submitblock <hex>` | Do not publish | Advanced/live path; avoid normal docs until dedicated safe workflow exists. |
| `bitcoinII-cli submitheader <hex>` | Do not publish | Advanced/live path; avoid normal docs until dedicated safe workflow exists. |

### Raw transaction and PSBT commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli getrawtransaction <txid> 1` | Placeholder | Needs txindex/blockhash/pruned-node context. |
| `bitcoinII-cli decoderawtransaction <hex>` | Placeholder | Phase 3 candidate with harmless fixture. |
| `bitcoinII-cli decodescript <hex>` | Placeholder | Phase 3 candidate with harmless fixture. |
| `bitcoinII-cli analyzepsbt <psbt>` | Placeholder | Needs harmless PSBT fixture. |
| `bitcoinII-cli createpsbt ...` | Placeholder | Needs regtest fixture. |
| `bitcoinII-cli finalizepsbt <psbt>` | Placeholder | Needs harmless PSBT fixture. |
| `bitcoinII-cli signrawtransactionwithkey ...` | Do not publish | Handles supplied private key material; avoid normal docs. |

### Mempool and transaction-sharing commands

| Command | Current status | Notes |
|---|---|---|
| `bitcoinII-cli testmempoolaccept '["signedhex"]'` | Placeholder | Phase 3 candidate only after a harmless fixture exists. |
| `bitcoinII-cli sendrawtransaction <hex>` | Placeholder | Live submission path; keep out of early smoke tests except regtest-only plan. |
| `bitcoinII-cli getrawmempool true` | Placeholder | Needs a local node record and privacy review of returned transaction IDs. |
| `bitcoinII-cli getmempoolentry <txid>` | Placeholder | Needs a mempool fixture. |
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
- Network status commands can move into node/operator docs.
- Wallet commands can move into wallet docs.
- Read-only service commands can move into exchange/service docs.
- Raw transaction and PSBT examples can move into developer docs.
- Advanced or risky commands should stay in advanced pages only.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 RPC, wallet, node, mining, configuration pages, command smoke-test plan, first-pass network RPC source review, and the local read-only RPC smoke-test record from 2026-07-10
**Notes:** Nine read-only node/network RPC commands now have a local Windows mainnet test record for BitcoinII Core v29.1.0. This is not cross-platform or cross-version verification, and raw peer/network outputs still require privacy review.
