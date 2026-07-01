# Command example scan

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-01

## Summary

This page tracks the final command-example scan before invite-only review.

The purpose is to make sure command examples are not accidentally presented as tested instructions.

This page is a scan checklist and record. It does not verify that any command works.

## Scan goals

Before private review, find command examples that may need clearer labeling, especially examples involving:

- `bitcoinII-cli`
- `bitcoinIId`
- `bitcoinII-qt`
- `bitcoinII.conf`
- `getblockchaininfo`
- `getwalletinfo`
- `getnewaddress`
- `sendtoaddress`
- `getblocktemplate`
- `submitblock`
- `submitheader`
- `getrawtransaction`
- `testmempoolaccept`
- `sendrawtransaction`
- `walletpassphrase`
- `backupwallet`
- `restorewallet`
- `rescanblockchain`

## Required handling

Every command example should be one of the following:

| Status | Required handling |
|---|---|
| Source-observed | Link to source review or RPC overview, and say it is not locally tested. |
| Placeholder | Label clearly as a future test shape, not instructions. |
| Locally tested | Link to a command test record with environment details. |
| Do not publish | Keep out of beginner/user docs and explain why if mentioned. |

## High-risk command categories

These should not appear as beginner copy/paste guidance:

- Wallet movement commands.
- Wallet backup/restore commands without a tested disposable-wallet record.
- Wallet access-state commands.
- Private-key or explicit-key signing commands.
- Raw transaction live submission commands.
- Block/header submission commands.
- Pruning/reindex/import commands without context.
- RPC exposure/authentication examples without a security caveat.

## Pages to scan first

Priority pages:

- `README.md`
- `docs/README.md`
- `docs/developers/rpc-overview.md`
- `docs/verification/command-testing.md`
- `docs/nodes/node-guide.md`
- `docs/wallets/wallet-guide.md`
- `docs/mining/mining-overview.md`
- `docs/configuration/configuration-overview.md`
- `docs/configuration/rpc-configuration.md`
- `docs/exchange/deposit-monitoring.md`
- `docs/exchange/service-integration-checklist.md`

## Scan record

| Date | Search term | Files checked | Issues found | Fix commit | Notes |
|---|---|---|---|---|---|
| 2026-06-30 | `bitcoinII-cli` deposit examples | `docs/exchange/deposit-monitoring.md` | Command block needed clearer placeholder/test-tracker wording | `8e7c539` | Deposit command examples now explicitly say they are placeholder examples and link to command-testing status. |
| 2026-06-30 | wallet command examples | `docs/wallets/wallet-guide.md` | No blocking issue found | No change | Wallet guide lists commands under command-testing status and warns sensitive/state-changing commands stay out of beginner docs until tested. |
| 2026-06-30 | mining command examples | `docs/mining/mining-overview.md` | No blocking issue found | No change | Mining overview links command-testing status and marks block/header submission commands as not for normal user examples. |
| 2026-06-30 | service checklist command wording | `docs/exchange/service-integration-checklist.md` | No blocking issue found | No change | Checklist says required commands must be tested and does not provide copy/paste examples. |
| 2026-06-30 | RPC overview inventory | `docs/developers/rpc-overview.md` | No blocking issue found | No change | RPC overview labels command forms as unverified placeholders and warns not to copy them into user guides as working examples. |
| 2026-06-30 | node command inventory | `docs/nodes/node-guide.md` | No command-labeling issue found; stale source links updated separately | `8e4a749` | Node guide links to command-testing status and warns not to treat listed commands as working instructions. |
| 2026-06-30 | configuration command/setup wording | `docs/configuration/configuration-overview.md`, `docs/configuration/rpc-configuration.md` | No command-labeling issue found; stale source links updated separately | `062686f`, `b1272f8` | Configuration pages say setup/auth examples are untested and link command-testing status. |
| 2026-06-30 | command tracker itself | `docs/verification/command-testing.md` | No blocking issue found | No change | Command tracker correctly labels entries as Placeholder, Source-observed, Locally tested, Verified, Needs recheck, or Do not publish. |
| 2026-06-30 | developer build/test command blocks | `docs/developers/local-development.md`, `docs/developers/build-system.md`, `docs/developers/testing.md` | No blocking issue found | No change | Build and test commands are explicitly described as untested or future record shapes. Local-development page explains test-record workflow rather than verified commands. |
| 2026-06-30 | release checking command wording | `docs/developers/release-verification.md`, `docs/developers/release-process.md` | Release-process page had stale current-release wording and old release path | `a5aaf58` | Release-process page now points to current observed release path and keeps download checking unverified. |
| 2026-07-01 | Source Atlas RPC command inventory | `docs/developers/source-atlas/rpc-mining.md`, `docs/developers/source-atlas/rpc-blockchain.md`, `docs/developers/source-atlas/rpc-rawtransaction.md`, `docs/developers/source-atlas/rpc-mempool.md` | No blocking issue found after cleanup | Recent Source Atlas cleanup commits | RPC Source Atlas pages are source-review inventories, keep Draft status, and state that commands have not been run. Live broadcast and block/header submission remain separated from dry-run or read-only workflows. |
| 2026-07-01 | Source Atlas wallet command inventory | `docs/developers/source-atlas/wallet-rpc.md`, `wallet-backup-import-rpc.md`, `wallet-spend-rpc.md`, `wallet-encryption-rpc.md`, `wallet-coins-rpc.md`, `wallet-transactions-rpc.md` | No blocking issue found after cleanup | Recent wallet Source Atlas cleanup commits | Wallet Source Atlas pages keep commands as source-observed inventories. Spend, key, passphrase, restore, rescan, and encryption examples remain untested and should not become beginner copy/paste guidance. |

## Still to scan

- Any remaining command blocks found by repository search.
- Any new user-facing command examples added after this scan.

## Known acceptable cases

It is acceptable to list command names when:

- The page clearly says commands are untested.
- The command is part of an inventory or source-review list.
- The command links to [Command testing status](command-testing.md).
- The command is marked `Do not publish` for normal docs.

## Next actions

1. Search remaining command terms.
2. Check whether each page clearly labels the command status.
3. Move or soften risky examples if needed.
4. Record any fixes here.
5. Update documentation coverage.

## Related pages

- [Command testing status](command-testing.md)
- [Stale wording scan](stale-wording-scan.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [RPC overview](../developers/rpc-overview.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 command tracker, RPC overview, node, wallet, mining, exchange, configuration, developer workflow pages, and Source Atlas RPC/wallet pages
**Notes:** This page now records command-example scans across the main user/service-facing, developer workflow, and Source Atlas RPC/wallet command inventory pages. Remaining repository-wide command-term searches should still be checked before private review.
