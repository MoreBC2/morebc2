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

MoreBC2 has also reviewed a first pass of wallet RPC registration and address-management files:

- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`
- `src/wallet/rpc/backup.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/rpc/encrypt.cpp`
- `src/wallet/rpc/coins.cpp`
- `src/wallet/rpc/transactions.cpp`

Reviewed startup behavior includes:

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

## Wallet RPC behavior observed from source

Reviewed wallet RPC behavior includes:

- `getwalletinfo` returns wallet state including name, version, database format, balances, transaction count, keypool data, fee setting, scanning status, descriptor status, external-signer status, blank-wallet status, birth time, and last processed block.
- `listwalletdir` lists wallets in the wallet directory.
- `listwallets` lists currently loaded wallets.
- `loadwallet` loads an existing wallet and can update persistent startup loading behavior.
- `unloadwallet` unloads a wallet after checking endpoint/argument consistency and active rescan state.
- `createwallet` creates and loads a new wallet.
- `setwalletflag` can change mutable wallet flags such as `avoid_reuse`.
- `getnewaddress` creates a new receiving address and can attach a label.
- `getrawchangeaddress` creates a new change address for raw-transaction workflows, not normal receiving use.
- `setlabel` updates the wallet address book.
- `listaddressgroupings` reports address groupings tied together by transaction history.
- `addmultisigaddress` is legacy-wallet-only and requires a new wallet backup.

Wallet backup/import RPC behavior reviewed so far includes:

- `backupwallet` backs up the loaded wallet to a requested destination.
- `restorewallet` restores and loads a wallet from a backup file under a requested wallet name.
- Legacy import commands can trigger rescans and can be limited by pruned block data.
- Descriptor import commands require timestamps and can scan from those timestamps.
- `dumpwallet` and `dumpprivkey` are legacy-wallet-only and should be treated as advanced/sensitive commands.

Wallet spend and PSBT behavior reviewed so far includes:

- Wallet send commands require careful treatment because they can move wallet funds.
- Funding commands can add wallet inputs, choose change handling, and apply fee options.
- PSBT commands can create, update, sign, and finalize partially signed transactions.
- Fee-bump commands target eligible replaceable wallet transactions.
- Some reviewed fee-rate options use atom-per-vbyte units while older options used BC2-per-kvB units.

Wallet encryption behavior reviewed so far includes:

- The temporary wallet unlock command supports a timeout for signing-related commands.
- The wallet credential update command changes the access phrase for an encrypted wallet.
- The wallet relock command clears decrypted key material from memory.
- The first-time encryption command returns a warning that a new backup should be made with `backupwallet`.

Wallet coin and balance behavior reviewed so far includes:

- `getreceivedbyaddress` and `getreceivedbylabel` total received outputs with confirmation and coinbase-maturity controls.
- `getbalance` returns spendable wallet balance according to wallet spendability rules.
- `getbalances` separates trusted, untrusted pending, immature, and watch-only balance categories when applicable.
- `lockunspent` and `listlockunspent` manage manual output selection state.
- `listunspent` lists wallet outputs with confirmation, address, safety, amount, descriptor, and reuse-related fields.

Wallet transaction-history behavior reviewed so far includes:

- `listtransactions` lists recent wallet transaction entries with paging and optional label/watch-only filters.
- `listsinceblock` supports service-style polling from a block reference and can include reorg-removed wallet transactions when available.
- `gettransaction` returns details for a single in-wallet transaction and can include decoded transaction data.
- `abandontransaction` marks eligible in-wallet transactions as abandoned when they are not included in a block and not in the mempool.
- `rescanblockchain` scans local chain data for wallet-related transactions and has limits around pruned or unavailable block data.
- `abortrescan` requests cancellation of an active wallet rescan.

Wallet RPC examples remain untested until run against a local BitcoinII Core node.

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

Reviewed wallet RPC behavior also shows `createwallet` defaults to descriptor wallets when the `descriptors` argument is not overridden.

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
- Test wallet encryption workflow on a temporary wallet.
- Test transaction-history and rescan examples on a temporary wallet.
- Review wallet database format behavior.
- Confirm whether GUI and CLI wallets differ in user-facing behavior.
- Test safe wallet RPC examples locally before publishing them as verified.

## Sources

- `src/wallet/init.cpp`
- `src/wallet/load.h`
- `src/wallet/load.cpp`
- `src/wallet/context.h`
- `src/wallet/context.cpp`
- `src/wallet/wallet.h`
- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`
- `src/wallet/rpc/backup.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/rpc/encrypt.cpp`
- `src/wallet/rpc/coins.cpp`
- `src/wallet/rpc/transactions.cpp`
- [Source atlas: wallet startup](../developers/source-atlas/wallet-startup.md)
- [Source atlas: wallet RPC](../developers/source-atlas/wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](../developers/source-atlas/wallet-backup-import-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet encryption RPC](../developers/source-atlas/wallet-encryption-rpc.md)
- [Source atlas: wallet coins and balances RPC](../developers/source-atlas/wallet-coins-rpc.md)
- [Source atlas: wallet transaction history RPC](../developers/source-atlas/wallet-transactions-rpc.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page now includes first-pass source-reviewed wallet startup, wallet RPC, backup/import, spend/PSBT, encryption, coin/balance, and transaction-history notes. Platform-specific wallet instructions, release verification, and command testing remain open.
