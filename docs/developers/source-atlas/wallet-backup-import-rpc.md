# Wallet backup and import RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/wallet/rpc/backup.cpp`

This file contains wallet backup, restore, import, descriptor import, dump, and rescan-related wallet RPC behavior.

This is not a user command guide. These commands can affect wallet state or expose sensitive wallet material, so examples should not be published as verified until they are tested and reviewed carefully.

## Why this file matters

Backup and import workflows are high-impact wallet documentation areas.

For MoreBC2, this file matters because it touches:

- Wallet recovery.
- Legacy wallet import paths.
- Descriptor wallet import paths.
- Chain rescans after imports.
- Pruned-node limitations.
- Wallet dump and backup behavior.
- Restoring a wallet from backup.

## Key helper behavior reviewed

Reviewed helper behavior includes:

- Dump-string encoding and decoding helpers.
- Address lookup for legacy keys during wallet dumps.
- `RescanWallet` wrapper around wallet rescanning from a timestamp.
- Pruned-block checks before import rescans.
- Import request processing for legacy and descriptor workflows.
- Descriptor timestamp/range checks.
- Warnings when provided import data is incomplete, inconsistent, or extra.

## Legacy import RPCs reviewed

Reviewed legacy import commands include:

- `importprivkey`
- `importaddress`
- `importpubkey`
- `importwallet`
- `importmulti`

Observed behavior includes:

- Legacy import paths require a legacy script manager.
- Importing key material requires private-key support when key material is included.
- Imports commonly support a rescan option.
- Rescans are blocked or limited when required block data is pruned.
- Only one wallet rescan can run at a time.
- Importing data can make wallet balances and history incomplete until rescanning finishes.
- `getwalletinfo` is referenced as the way to check scanning progress.

## Descriptor import RPCs reviewed

Reviewed descriptor command behavior includes:

- `importdescriptors` requires a descriptor wallet.
- Descriptor imports require timestamps.
- The string `now` can be used for outputs known to have no prior chain history.
- Timestamp zero requests a full chain scan.
- Ranged descriptors require range handling.
- Active descriptors must be ranged.
- Internal descriptors and ranged descriptors have label restrictions.
- Multipath descriptor handling can mark the second path as internal when exactly two elements are provided.
- Block filter indexes can make descriptor rescans faster when available.

## Dump and export commands reviewed

Reviewed commands include:

- `dumpprivkey`
- `dumpwallet`
- `listdescriptors`

`dumpprivkey` is legacy-wallet-only and returns sensitive key material for a wallet address after wallet unlock and address/key checks.

`dumpwallet` writes wallet key material and related metadata to a server-side file and refuses to overwrite an existing file.

`listdescriptors` reports descriptor wallet descriptors. MoreBC2 has not yet reviewed this command deeply enough for user-facing examples.

These commands should be handled as advanced/sensitive commands in public docs.

## Backup and restore commands reviewed

Reviewed commands include:

- `backupwallet`
- `restorewallet`

`backupwallet` syncs the wallet to the current chain view, locks the wallet, and calls the wallet backup path with the requested destination.

`restorewallet` loads a wallet from a backup file under a requested wallet name and can update persistent startup loading behavior.

The reviewed restore help text notes that descriptor-wallet rescans can be faster when block filters are available.

## Rescan and chain-data concerns

Reviewed behavior shows rescans are central to import and restore workflows.

Important source-observed concerns include:

- Imports with old timestamps may take a long time.
- Pruned nodes may lack block data needed for some rescans.
- Rescan failures can leave wallet history incomplete until corrected.
- Some rescan errors may point to pruned data, background chainstate sync, or local data issues.

## Documentation implications

MoreBC2 should not merge all wallet commands into one simple user guide.

Future wallet docs should separate:

- Basic wallet status and receiving commands.
- Normal backup commands.
- Restore and recovery workflows.
- Legacy import workflows.
- Descriptor import workflows.
- Advanced sensitive commands.

Commands that reveal key material or import key material should be documented with strong warnings and tested examples only.

## Relationship to other pages

Related pages:

- [Source atlas: wallet RPC](wallet-rpc.md)
- [Source atlas: wallet startup](wallet-startup.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [RPC overview](../rpc-overview.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming in wallet RPC strings and examples.

No upstream comparison has been completed, so this page does not claim whether backup/import RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which backup and restore examples can be tested safely on a temporary wallet?
- Which import commands should appear only in advanced documentation?
- How should descriptor wallets and legacy wallets be explained to non-developers?
- Which rescan failure cases should be documented for operators?
- Which platform path examples are accurate for BitcoinII releases?
- Which commands should be avoided entirely in exchange/service guides?
- Confirm whether the `v31.1.0` release baseline differs from subsequent `main` changes for this file before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/wallet/rpc/backup.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/backup.cpp
- Current observed `main` `src/wallet/rpc/wallet.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/wallet.cpp
- Current observed `main` `src/wallet/wallet.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/wallet.h
- Current observed `main` `src/wallet/load.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/load.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass backup/import/restore RPC review. Commands have not been run. Public examples, platform paths, exact recovery workflows, upstream comparison, and release-versus-main comparison remain open.
