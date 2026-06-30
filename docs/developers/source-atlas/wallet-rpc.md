# Wallet RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`

This page maps wallet RPC command registration, wallet management RPCs, address-generation RPCs, wallet flags, wallet creation/loading/unloading behavior, and the top-level wallet command groups.

It is not a tested wallet command guide. Examples should not be marked verified until they are run against BitcoinII Core.

## Why this file group matters

Wallet RPCs are where user, exchange, and service workflows usually touch wallet functionality.

For MoreBC2, the important distinction is:

- Wallet startup files explain how wallets are loaded.
- Wallet RPC files explain how wallets are managed and queried after startup.
- Spend, backup, encryption, address, and transaction RPC files should be reviewed before publishing user-facing command examples.

## Key files reviewed

- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`

This is a first-pass review, not a complete wallet RPC audit.

## Command registration

`GetWalletRPCCommands()` registers wallet-related RPC commands under the `wallet` category, with `fundrawtransaction` registered under `rawtransactions`.

Reviewed registered command groups include:

- Wallet management.
- Wallet information.
- Wallet loading and unloading.
- Wallet creation and migration.
- Address generation and labeling.
- Backup and import commands.
- Balance and coin commands.
- Encryption and passphrase commands.
- Spend and PSBT commands.
- Message signing.
- Wallet transaction history and rescanning.

## Wallet information and listing commands

Reviewed commands include:

- `getwalletinfo`
- `listwalletdir`
- `listwallets`

`getwalletinfo` returns wallet state such as wallet name, wallet version, database format, balance fields, transaction count, keypool data, pay transaction fee, private-key availability, avoid-reuse flag, scanning state, descriptor status, external-signer status, blank-wallet status, birth time, and last processed block information.

`listwalletdir` lists wallets found in the wallet directory.

`listwallets` lists wallets currently loaded in the wallet context.

## Wallet loading and unloading commands

Reviewed commands include:

- `loadwallet`
- `unloadwallet`

`loadwallet` loads an existing wallet by name or path, can update persistent startup loading behavior, checks whether the wallet is already loaded, and calls the wallet loading path reviewed in the startup atlas entry.

`unloadwallet` unloads a wallet by endpoint wallet or argument, rejects mismatched endpoint/argument names, reserves against active rescans, removes the wallet from context, and waits for wallet deletion.

## Wallet creation and flag commands

Reviewed commands include:

- `createwallet`
- `setwalletflag`

`createwallet` creates and loads a new wallet. Reviewed options include:

- wallet name
- disable private keys
- blank wallet
- passphrase
- avoid reuse
- descriptor wallet flag
- load on startup
- external signer

Reviewed constraints include:

- Descriptor wallets require SQLite support.
- Legacy wallet creation requires deprecated BDB behavior to be enabled.
- Legacy wallet creation requires BDB support.
- External signer wallet creation requires external signer support.
- Empty passphrases generate a warning rather than encrypting the wallet.

`setwalletflag` changes mutable wallet flags. The reviewed mutable flag map currently exposes `avoid_reuse`. Enabling it includes a caveat that rescanning is needed to correctly mark prior used destinations.

## HD seed, upgrade, migration, and simulation commands

Reviewed commands include:

- `sethdseed`
- `upgradewallet`
- `migratewallet`
- `simulaterawtransaction`

`sethdseed` is legacy-wallet-only, requires wallet unlock, can generate or accept a WIF private key as a new HD seed, and can flush/regenerate the keypool. The help text warns that a new backup is needed after setting the HD seed.

`upgradewallet` attempts to upgrade a wallet to a requested or latest version and returns previous/current version and result or error.

`migratewallet` migrates a legacy wallet to descriptor form, creates a backup before migration, may produce additional watch-only or solvables wallets, and warns that the RPC may take a long time.

`simulaterawtransaction` estimates wallet balance change from provided raw transactions without broadcasting them.

## Address RPC commands reviewed

`src/wallet/rpc/addresses.cpp` covers address-facing wallet RPCs.

Reviewed commands include:

- `getnewaddress`
- `getrawchangeaddress`
- `setlabel`
- `listaddressgroupings`
- `addmultisigaddress`

`getnewaddress` creates a new receiving address, optionally assigns a label, and supports address type selection. It checks whether the wallet can provide addresses, rejects unknown address types, and rejects Bech32m for legacy wallets.

`getrawchangeaddress` creates a new change address for raw-transaction workflows, not normal receiving use. It uses change type when configured, otherwise default address type, and has similar address-type checks.

`setlabel` validates an address and updates the address book as receive or send depending on whether the destination is wallet-owned.

`listaddressgroupings` reports groups of addresses whose common ownership has been made public by transaction input/change behavior.

`addmultisigaddress` is legacy-wallet-only and creates a multisig address from required signature count plus addresses or public keys. The reviewed help text says it requires a new wallet backup.

## Registered command inventory from first pass

The reviewed registration table includes these wallet commands:

- `abandontransaction`
- `abortrescan`
- `addmultisigaddress`
- `backupwallet`
- `bumpfee`
- `psbtbumpfee`
- `createwallet`
- `createwalletdescriptor`
- `restorewallet`
- `dumpprivkey`
- `dumpwallet`
- `encryptwallet`
- `getaddressesbylabel`
- `getaddressinfo`
- `getbalance`
- `gethdkeys`
- `getnewaddress`
- `getrawchangeaddress`
- `getreceivedbyaddress`
- `getreceivedbylabel`
- `gettransaction`
- `getunconfirmedbalance`
- `getbalances`
- `getwalletinfo`
- `importaddress`
- `importdescriptors`
- `importmulti`
- `importprivkey`
- `importprunedfunds`
- `importpubkey`
- `importwallet`
- `keypoolrefill`
- `listaddressgroupings`
- `listdescriptors`
- `listlabels`
- `listlockunspent`
- `listreceivedbyaddress`
- `listreceivedbylabel`
- `listsinceblock`
- `listtransactions`
- `listunspent`
- `listwalletdir`
- `listwallets`
- `loadwallet`
- `lockunspent`
- `migratewallet`
- `newkeypool`
- `removeprunedfunds`
- `rescanblockchain`
- `send`
- `sendmany`
- `sendtoaddress`
- `sethdseed`
- `setlabel`
- `settxfee`
- `setwalletflag`
- `signmessage`
- `signrawtransactionwithwallet`
- `simulaterawtransaction`
- `sendall`
- `unloadwallet`
- `upgradewallet`
- `walletcreatefundedpsbt`
- `walletlock`
- `walletpassphrase`
- `walletpassphrasechange`
- `walletprocesspsbt`

`walletdisplayaddress` is registered only when external signer support is enabled.

## Relationship to service documentation

Wallet RPCs are high-impact because some commands can create addresses, reveal private keys, change wallet state, create transactions, sign transactions, or send funds.

MoreBC2 should separate wallet RPCs into at least three future service-doc categories:

- Read-only status commands.
- Address/deposit commands.
- Spend/signing/backup/encryption commands.

Commands that expose keys or move funds should not be mixed casually into basic service guides.

## Relationship to other pages

Related pages:

- [Source atlas: wallet startup](wallet-startup.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [RPC overview](../rpc-overview.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)
- [Service integration checklist](../../exchange/service-integration-checklist.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming in wallet RPC help strings and examples.

No upstream comparison has been completed, so this page does not claim whether wallet RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which wallet RPC command examples can be tested safely against a local wallet?
- Which wallet RPCs should be recommended for exchanges or services?
- Which commands should be hidden from normal user guides because they expose keys or create irreversible wallet changes?
- Which backup and restore command paths should be reviewed next?
- Which spend/signing RPC files should be reviewed next?
- How should descriptor wallets versus legacy wallets be explained for BitcoinII users?
- Which wallet commands behave differently depending on BDB, SQLite, external signer, or descriptor support?

## Sources

- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`
- `src/wallet/init.cpp`
- `src/wallet/load.cpp`
- `src/wallet/wallet.h`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass wallet RPC registration and address-management review. Backup, spend, encryption, transaction, coin, and detailed wallet database behavior still need deeper file-specific review. Commands have not been run.
