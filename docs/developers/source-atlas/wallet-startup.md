# Wallet startup and context

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/wallet/init.cpp`
- `src/wallet/load.h`
- `src/wallet/load.cpp`
- `src/wallet/context.h`
- `src/wallet/context.cpp`
- the top-level declarations and startup-adjacent parts of `src/wallet/wallet.h`

This is a wallet startup and lifecycle map. It is not a full wallet internals audit.

## Why this file group matters

Wallet documentation needs to separate:

- Whether wallet support is compiled in.
- Whether wallet loading is disabled at runtime.
- Which wallet files are verified at startup.
- Which wallets are loaded and attached to the chain interface.
- How wallets are started, flushed, stopped, and unloaded.
- How wallet state relates to chain events.

These files define the first part of that lifecycle.

## Key symbols reviewed

- `WalletInit`
- `WalletInit::HasWalletSupport`
- `WalletInit::AddWalletOptions`
- `WalletInit::ParameterInteraction`
- `WalletInit::Construct`
- `WalletContext`
- `VerifyWallets`
- `LoadWallets`
- `StartWallets`
- `FlushWallets`
- `StopWallets`
- `UnloadWallets`
- `CWallet`
- `AddWallet`
- `RemoveWallet`
- `GetWallets`
- `LoadWallet`
- `CreateWallet`
- `RestoreWallet`
- `NotifyWalletLoaded`

## Wallet initialization interface

`src/wallet/init.cpp` defines a `WalletInit` implementation of `WalletInitInterface`.

Reviewed behavior includes:

- `HasWalletSupport()` returns true when this wallet component is compiled in.
- `AddWalletOptions()` registers wallet-related startup and runtime options.
- `ParameterInteraction()` handles option interactions before wallet construction.
- `Construct()` adds the wallet loader to node chain clients unless wallet loading is disabled.

## Wallet options reviewed

Reviewed wallet options include:

- `-disablewallet`
- `-wallet=<path>`
- `-walletdir=<dir>`
- `-addresstype`
- `-changetype`
- `-fallbackfee`
- `-discardfee`
- `-mintxfee`
- `-paytxfee`
- `-txconfirmtarget`
- `-walletbroadcast`
- `-walletnotify`
- `-walletrbf`
- `-keypool`
- `-avoidpartialspends`
- `-spendzeroconfchange`
- debug/test database and wallet options depending on build configuration

This page does not claim these options have been tested locally.

## Parameter interactions

Reviewed parameter interaction behavior includes:

- If `-disablewallet` is set, configured `-wallet` entries are ignored and wallet setup returns early.
- If `-blocksonly` is set, the wallet attempts to soft-set `-walletbroadcast=0`.
- When Berkeley DB support is enabled, the Berkeley DB runtime/compile-time compatibility check can fail wallet initialization.

## Wallet construction path

Reviewed `WalletInit::Construct` behavior includes:

- Reading node arguments.
- Returning early when `-disablewallet` is enabled.
- Creating a wallet loader through the node init interface.
- Storing the wallet loader in `node.wallet_loader`.
- Adding the wallet loader to `node.chain_clients`.

This connects wallet startup into the broader node startup lifecycle.

## WalletContext

`WalletContext` stores shared wallet state.

Reviewed fields include:

- Chain interface pointer.
- Scheduler pointer.
- ArgsManager pointer.
- Wallet mutex.
- Opened wallet list.
- Wallet-load event list.

The reviewed header warns that wallet context locking must not be taken after locking a wallet mutex because that can create inconsistent lock ordering and deadlock risk.

## VerifyWallets

`VerifyWallets` validates wallet startup settings and wallet database availability before loading.

Reviewed behavior includes:

- Validating `-walletdir` exists.
- Requiring `-walletdir` to be a directory.
- Requiring `-walletdir` to be absolute when explicitly provided.
- Canonicalizing and storing the wallet directory path.
- Including the unnamed top-level wallet for backwards compatibility when applicable.
- Detecting duplicate wallet paths.
- Verifying configured wallet databases when they exist.
- Warning and skipping missing configured wallet paths.
- Failing initialization on database errors other than missing configured paths.

## LoadWallets

`LoadWallets` opens wallet databases and constructs wallet objects after verification.

Reviewed behavior includes:

- Iterating wallet settings.
- Ignoring duplicate wallet names within the load loop.
- Reading database options.
- Creating a wallet database handle.
- Skipping missing wallet databases.
- Calling `CWallet::Create`.
- Emitting warnings from wallet creation.
- Reporting initialization errors when creation fails.
- Calling `NotifyWalletLoaded`.
- Calling `AddWallet`.

## Start, flush, stop, and unload

Reviewed wallet lifecycle helpers include:

- `StartWallets()` calls `postInitProcess()` for each loaded wallet.
- `StartWallets()` schedules periodic wallet database compaction when enabled.
- `StartWallets()` schedules wallet transaction resend behavior.
- `FlushWallets()` flushes loaded wallets.
- `StopWallets()` closes loaded wallets.
- `UnloadWallets()` removes wallets from context and waits for deletion.

## CWallet startup-adjacent structure

The reviewed top-level wallet header shows that `CWallet`:

- Maintains wallet transactions and balances.
- Can create new transactions.
- Implements chain event handling.
- Stores a chain interface pointer.
- Tracks wallet name and database handle.
- Tracks last processed block hash and height.
- Holds script managers for external and internal outputs.
- Maintains an address book.
- Tracks locked coins.
- Has a registered chain-event handler.

`AttachChain` is declared as the static path that catches a wallet up to chain state, scans new blocks, updates the best-block locator and processed-block fields, and registers for chain events.

## Defaults observed in wallet header

Reviewed wallet defaults include:

- Default address type: `BECH32`.
- Default `-paytxfee`: zero.
- Default fallback fee: zero.
- Default discard fee: 10000 satoshis per kvB.
- Default transaction minimum fee: 1000 satoshis per kvB.
- Default transaction confirmation target: 6 blocks.
- Default wallet RBF: true.
- Default wallet broadcast: true.
- Default disable wallet: false.
- Default wallet cross-chain: false.
- Default maximum transaction fee: `COIN / 10`.

These are source-observed defaults, not tested runtime behavior.

## Relationship to other pages

Related pages:

- [Node startup](../../architecture/node-startup.md)
- [RPC overview](../rpc-overview.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Source atlas: validation interface](validation-interface.md)
- [Source atlas: blockchain RPC](rpc-blockchain.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and header guards.

No upstream comparison has been completed, so this page does not claim whether wallet startup behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which wallet RPC files expose create/load/backup/send behavior?
- Which wallet creation defaults are user-facing in BitcoinII releases?
- Which wallet database formats are enabled in current release builds?
- How should legacy Berkeley DB versus SQLite descriptor-wallet behavior be documented?
- Which backup and restore instructions can be tested safely?
- Which wallet event paths should be mapped to validation-interface events?
- Which GUI wallet flows differ from daemon/CLI flows?
- Confirm whether `v29.1.0` differs from current `main` for these files before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/wallet/init.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/init.cpp
- Current observed `main` `src/wallet/load.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/load.h
- Current observed `main` `src/wallet/load.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/load.cpp
- Current observed `main` `src/wallet/context.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/context.h
- Current observed `main` `src/wallet/context.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/context.cpp
- Current observed `main` `src/wallet/wallet.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/wallet.h

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass wallet startup and lifecycle review. Wallet internals, wallet RPCs, database format details, GUI behavior, tested commands, backup/restore workflows, and release-versus-main comparison remain open.
