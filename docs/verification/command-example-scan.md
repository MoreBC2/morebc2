# Command example scan

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-06-30

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
| TBD | TBD | TBD | TBD | TBD | TBD |

## Known acceptable cases

It is acceptable to list command names when:

- The page clearly says commands are untested.
- The command is part of an inventory or source-review list.
- The command links to [Command testing status](command-testing.md).
- The command is marked `Do not publish` for normal docs.

## Next actions

1. Search for command terms.
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
**Primary sources checked:** Current MoreBC2 command tracker, RPC overview, node, wallet, mining, and configuration pages
**Notes:** This page defines the final command-example scan. It does not prove any command works.
