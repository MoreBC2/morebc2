# Wallets

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This section is for BitcoinII (BC2) wallet resources.

Wallet pages should help users find official releases, understand safe backup basics, understand source-observed wallet behavior, and avoid confusing MoreBC2 with an official wallet distributor.

## Current pages

- [Wallet guide](wallet-guide.md)

## Source-backed anchors

Wallet-related source review currently includes:

- [Source atlas: wallet startup](../developers/source-atlas/wallet-startup.md)
- [Source atlas: wallet RPC](../developers/source-atlas/wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](../developers/source-atlas/wallet-backup-import-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet encryption RPC](../developers/source-atlas/wallet-encryption-rpc.md)
- [Source atlas: wallet coins and balances RPC](../developers/source-atlas/wallet-coins-rpc.md)
- [Source atlas: wallet transaction history RPC](../developers/source-atlas/wallet-transactions-rpc.md)
- [RPC overview](../developers/rpc-overview.md)

These pages document behavior observed in source. They do not make wallet command examples verified unless a page explicitly says the command was run locally.

## Planned pages

- Official wallet downloads
- Release verification
- Backup basics
- Sending and receiving
- Troubleshooting sync issues
- Common wallet safety practices
- Wallet recovery notes
- Tested wallet RPC examples
- Wallet database and GUI behavior review

## Rules

- Link users to official wallet releases rather than re-hosting wallet binaries unless there is a deliberate, reviewed reason to do otherwise.
- Do not mark wallet commands or backup procedures verified until tested.
- Include operating system, release version, wallet type, and test environment details when documenting tested behavior.
- Be cautious with seed phrase, private key, passphrase, wallet file, and backup advice.
- Separate BitcoinII Core wallet behavior from third-party wallet behavior.
- Keep wallet-moving, private-key, passphrase, broadcast, import, and export commands out of beginner docs unless clearly caveated.

## Related pages

- [Release process guide](../developers/release-process.md)
- [Release verification guide](../developers/release-verification.md)
- [RPC overview](../developers/rpc-overview.md)
- [Configuration](../configuration/README.md)
- [Exchange integration](../exchange/README.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation polish plan](../POLISH_PLAN.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Wallet startup and major wallet RPC groups have first-pass source review. Wallet documentation still needs release verification, local command testing, platform-specific guidance, wallet database review, and GUI review before being used as final user guidance.
