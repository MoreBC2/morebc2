# Wallet encryption RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/wallet/rpc/encrypt.cpp`

This file contains wallet RPC behavior for temporarily unlocking an encrypted wallet, changing the passphrase, locking the wallet, and first-time wallet encryption.

This is not a user command guide. Encryption and passphrase commands are high-impact wallet operations and examples should not be marked verified until tested on a temporary wallet.

## Why this file matters

Wallet encryption behavior affects:

- Whether private-key operations are available.
- How long a wallet remains unlocked for signing-related commands.
- How passphrase changes are handled.
- When the wallet is locked again.
- What backup warnings users must see after first-time encryption.

## Commands reviewed

Reviewed commands include:

- `walletpassphrase`
- `walletpassphrasechange`
- `walletlock`
- `encryptwallet`

## walletpassphrase

`walletpassphrase` stores the wallet decryption key in memory for a requested timeout.

Reviewed behavior includes:

- Requiring the wallet to already be encrypted.
- Rejecting negative timeout values.
- Clamping very large timeouts.
- Rejecting empty passphrases.
- Attempting to unlock the wallet.
- Returning a specific null-character warning path for certain passphrase mismatch cases.
- Topping up the keypool after unlock.
- Recording a relock time.
- Scheduling a later wallet lock event without holding the wallet mutex.
- Letting a newer unlock call supersede an older scheduled lock event.

## walletpassphrasechange

`walletpassphrasechange` changes the passphrase on an encrypted wallet.

Reviewed behavior includes:

- Requiring the wallet to already be encrypted.
- Refusing to run while a passphrase-dependent rescan is active.
- Rejecting empty old or new passphrases.
- Attempting the passphrase change under wallet locks.
- Returning a specific null-character warning path for certain old-passphrase mismatch cases.

## walletlock

`walletlock` removes the decryption key from memory and clears the relock time.

Reviewed behavior includes:

- Requiring the wallet to already be encrypted.
- Refusing to run while a passphrase-dependent rescan is active.
- Locking the wallet under wallet/relock locks.
- Setting the relock time back to zero.

## encryptwallet

`encryptwallet` performs first-time encryption on a wallet.

Reviewed behavior includes:

- Rejecting wallets that do not contain private keys.
- Rejecting already encrypted wallets.
- Refusing to run while a passphrase-dependent rescan is active.
- Rejecting empty passphrases.
- Calling the wallet encryption path.
- Returning a message that the keypool was flushed, a new HD seed was generated, and a new backup should be made with `backupwallet`.

## Documentation implications

MoreBC2 wallet docs should keep encryption commands separate from basic receive/status docs.

Future user-facing encryption docs should clearly separate:

- First-time wallet encryption.
- Temporary unlock for signing-related commands.
- Manual relock.
- Passphrase change.
- Backup required after encryption.

Examples should use a temporary wallet first and should not encourage users to paste real wallet passphrases into shared logs, screenshots, or support channels.

## Relationship to other pages

Related pages:

- [Source atlas: wallet RPC](wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](wallet-backup-import-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [RPC overview](../rpc-overview.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and examples in the wallet RPC help text.

No upstream comparison has been completed, so this page does not claim whether encryption RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which encryption examples can be tested safely on a temporary wallet?
- How should the backup-after-encryption warning be presented in user docs?
- Which GUI flows map to these RPC commands?
- Which wallet database formats or wallet types affect encryption behavior?
- Which support warnings should be added around passphrase handling?
- Confirm whether the `v31.1.0` release baseline differs from subsequent `main` changes for this file before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/wallet/rpc/encrypt.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/encrypt.cpp
- Current observed `main` `src/wallet/wallet.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/wallet.h
- Current observed `main` `src/wallet/rpc/backup.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/backup.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass encryption/passphrase RPC review. Commands have not been run. Public examples, GUI mapping, backup workflow, upstream comparison, and release-versus-main comparison remain open.
