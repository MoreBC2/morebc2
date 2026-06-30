# Wallet guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page is the starting point for BitcoinII (BC2) wallet documentation.

It does not yet provide step-by-step installation instructions because those should be tested on each supported platform before being marked verified.

## What is source-reviewed today

MoreBC2 has reviewed a first pass of wallet startup and lifecycle files:

- `src/wallet/init.cpp`
- `src/wallet/load.h`
- `src/wallet/load.cpp`
- `src/wallet/context.h`
- `src/wallet/context.cpp`
- startup-adjacent parts of `src/wallet/wallet.h`

Reviewed behavior includes:

- Wallet support can be compiled into the node.
- `-disablewallet` disables wallet loading and wallet RPC calls.
- `-wallet=<path>` can be used multiple times to load existing wallets at startup.
- `-walletdir=<dir>` sets the wallet directory.
- Wallet directory validation requires an existing absolute directory when explicitly provided.
- Configured wallet databases are verified before loading.
- Missing configured wallet paths are warned and skipped.
- Wallet loading creates `CWallet` objects, notifies load listeners, and adds wallets to wallet context.
- Wallet startup calls post-initialization processing and schedules periodic flush/compaction and transaction resend behavior.
- Wallet shutdown helpers flush, close, remove, and wait for wallet deletion.

## Wallet options observed from source

Reviewed wallet options include:

- address type and change type options
- wallet path and wallet directory options
- fee-related options
- keypool option
- transaction confirmation target option
- wallet broadcast option
- wallet notification command option
- RBF option
- partial-spend-avoidance option
- zero-confirmation change spending option
- database/debug options depending on build configuration

These options are source-observed but not locally tested by MoreBC2 yet.

## Defaults observed from source

Reviewed startup-adjacent wallet defaults include:

- Default address type: `BECH32`.
- Default transaction confirmation target: 6 blocks.
- Default wallet RBF: true.
- Default wallet broadcast: true.
- Default wallet disabled: false.
- Default fallback fee: zero.
- Default pay transaction fee: zero.

These defaults should still be checked against a running release before being used in user-facing examples.

## Safe wallet principles

These are general cryptocurrency wallet safety principles:

- Download wallet software from official project release sources.
- Verify downloads when checksums or signatures are available.
- Back up wallet data before sending funds.
- Do not expose private keys or wallet files.
- Do not run unknown wallet binaries from unofficial links.
- Keep a small test balance when trying a new wallet setup.

## Release verification note

MoreBC2 has not yet confirmed the complete BitcoinII release verification model.

Before this guide is marked Verified, MoreBC2 needs to document whether releases provide:

- SHA256 checksums.
- Checksum manifest files.
- Detached signatures.
- Signed tags.
- Reproducible builds.

## Platform guides to create

- Windows wallet guide.
- Linux wallet guide.
- macOS wallet guide.
- CLI-only wallet guide.
- Backup and restore guide.
- Troubleshooting sync issues.

## Open items

- Confirm official download path.
- Confirm release-verification workflow.
- Confirm wallet data directory by operating system.
- Confirm backup file names and restore process.
- Confirm wallet encryption workflow.
- Review wallet RPC files.
- Review wallet database format behavior.
- Confirm whether GUI and CLI wallets differ in user-facing behavior.

## Sources

- `src/wallet/init.cpp`
- `src/wallet/load.h`
- `src/wallet/load.cpp`
- `src/wallet/context.h`
- `src/wallet/context.cpp`
- `src/wallet/wallet.h`
- [Source atlas: wallet startup](../developers/source-atlas/wallet-startup.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page now includes first-pass source-reviewed wallet startup notes. Platform-specific wallet instructions, wallet RPCs, backups, restores, and release verification still need testing or deeper review before publication as verified docs.
