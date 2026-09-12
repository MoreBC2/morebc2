# Wallet encryption RPC

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-only partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` wallet encryption/access RPC behavior centered on `src/wallet/rpc/encrypt.cpp`.

The current MoreBC2 disposable-wallet runtime work did **not** encrypt a wallet, unlock one, change a passphrase, or relock an encrypted wallet. These commands therefore remain source-reviewed and deliberately untested in the current evidence set.

## Commands reviewed

- `walletpassphrase`
- `walletpassphrasechange`
- `walletlock`
- `encryptwallet`

## `walletpassphrase`

Source-reviewed behavior includes:

- requires an encrypted wallet;
- rejects invalid/empty passphrase input and negative timeout;
- bounds very large timeout values;
- attempts wallet unlock;
- updates keypool/access state as appropriate;
- records a relock time;
- schedules later wallet locking;
- allows a later unlock request to supersede an earlier scheduled relock.

A timed unlock is sensitive wallet state, not a harmless read-only action.

## `walletpassphrasechange`

Source-reviewed behavior includes:

- requires an already encrypted wallet;
- rejects empty old/new passphrases;
- avoids conflicting passphrase-dependent rescan state;
- attempts the passphrase change under wallet locking.

MoreBC2 has not runtime-tested passphrase change or recovery from an incorrect passphrase on v31.

## `walletlock`

`walletlock` removes wallet decryption access from memory and clears relock-time state in the reviewed path.

It has not been exercised in the current disposable-wallet runtime record.

## `encryptwallet`

Source-reviewed behavior includes:

- rejects wallets without private keys;
- rejects already encrypted wallets;
- rejects empty passphrases;
- avoids conflicting passphrase-dependent rescan state;
- routes through the wallet encryption path;
- returns backup-related guidance after first-time encryption.

The existing source guidance that a new backup is required after encryption is important: encryption is not complete operational assurance unless backup and restore have also been tested for the specific wallet workflow.

## Current runtime boundary

September `v31.1.0` wallet evidence establishes:

- creation of fresh disposable descriptor wallets;
- wallet directory persistence and explicit reload after restart;
- disposable regtest address generation/funding;
- PSBT funding/signing/finalization;
- local mempool acceptance/submission.

It does **not** establish encrypted-wallet behavior.

No existing user wallet was unlocked or encrypted for documentation testing.

## Replay-protection relevance

Wallet encryption controls access to signing keys; replay protection controls the signature digest domain used when those keys sign a transaction.

A wallet can be correctly encrypted/unlocked yet still require BC2's post-height-`57750` replay domain for valid current-mainnet signing. These are separate security/correctness concerns.

See [Replay protection v31](replay-protection-v31.md) and [Wallet spend and PSBT RPC](wallet-spend-rpc.md).

## Documentation safety rules

- Never ask users to paste real wallet passphrases into chat, logs, screenshots, or issue reports.
- Do not test encryption/unlock workflows on an existing user wallet.
- Use a fresh disposable wallet with no real funds.
- Test backup/restore separately before treating encryption as operationally complete.
- Record wallet type, Core version, network, timeout/relock behavior, and restart behavior.
- Keep sensitive commands out of beginner examples until the disposable workflow is verified.

## Related pages

- [Wallet RPC](wallet-rpc.md)
- [Wallet backup/import RPC](wallet-backup-import-rpc.md)
- [Wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

Highest-value safe test:

1. create a new disposable descriptor wallet;
2. create and verify a backup first;
3. encrypt it with a disposable test passphrase;
4. test unlock timeout/relock and manual `walletlock`;
5. test passphrase change;
6. restart/reload and verify expected locked state;
7. restore the disposable backup in a separate test wallet;
8. destroy all disposable test artifacts/passphrases.

## Primary sources

Pinned/current review scope:

- `v31.1.0/src/wallet/rpc/encrypt.cpp`
- `v31.1.0/src/wallet/wallet.*`
- `v31.1.0/src/wallet/rpc/backup.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-only partial  
**Primary evidence:** BitcoinII Core `v31.1.0` wallet-encryption source plus adjacent September disposable-wallet runtime evidence  
**Notes:** Encryption/passphrase/relock behavior remains untested by MoreBC2. The page is current about that limitation and preserves the no-existing-wallet safety boundary.
