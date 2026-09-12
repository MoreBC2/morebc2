# Wallet startup and context

**Category:** Documentation
**Status:** Source-reviewed / Runtime-tested partial
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core wallet startup/lifecycle behavior centered on `src/wallet/init.cpp`, `src/wallet/load.*`, `src/wallet/context.*`, and startup-adjacent wallet declarations.

It is not a complete wallet internals audit, but current `v31.1.0` testing now provides bounded runtime evidence for fresh disposable wallet creation/loading/reload behavior in addition to the source review.

## Source-reviewed lifecycle

The reviewed path covers:

- whether wallet support is compiled/enabled;
- `-disablewallet`, `-wallet`, and `-walletdir` handling;
- wallet path/database verification;
- wallet loading and addition to wallet context;
- startup/post-init processing;
- periodic wallet flush/maintenance behavior;
- stop, flush, unload, and deletion coordination.

Important reviewed symbols include `WalletInit`, `WalletContext`, `VerifyWallets`, `LoadWallets`, `StartWallets`, `FlushWallets`, `StopWallets`, `UnloadWallets`, `LoadWallet`, `CreateWallet`, and related context helpers.

## Wallet options

Source review includes options for wallet paths/directories, address/change type, fee configuration, confirmation targets, wallet broadcast/notification, RBF, keypool behavior, partial-spend avoidance, zero-confirmation change spending, and database/debug behavior where enabled.

The existence/default of an option in source is not the same as a MoreBC2 runtime test of every option.

## v31 runtime evidence

On 2026-09-11 MoreBC2 used fresh disposable BitcoinII Core `v31.1.0` data directories and wallets on Windows.

The tests established, within their documented environments, that:

- the fresh test state did not expose existing wallets before wallet creation;
- a new disposable descriptor wallet could be created and loaded;
- wallet information and address generation worked;
- the node/wallet could be stopped cleanly;
- the earlier node/RPC validation exercised safe wallet restart/reload behavior;
- the isolated regtest wallet could proceed through local funding and a complete PSBT lifecycle.

The tests deliberately did not open, copy, rescan, import, unlock, inspect, or spend from an existing user wallet or data directory.

See:

- [Windows v31.1.0 node and RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## What remains unverified

- every startup option and interaction;
- custom wallet-directory edge cases;
- legacy/Berkeley DB wallet behavior under v31;
- migration and recovery failure paths;
- encryption/passphrase startup interactions;
- long-duration flush/maintenance behavior;
- cross-platform startup parity;
- external-signer wallet startup/signing compatibility.

## Safety boundary

Wallet startup tests for documentation should use a fresh explicitly named data directory and disposable wallet. Existing user wallets should not be used merely to prove a command or startup path.

## Related pages

- [Wallet RPC](wallet-rpc.md)
- [Wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Wallet compatibility](../../compatibility/wallets.md)
- [Local development](../local-development.md)

## Sources

Current source baseline: BitcoinII Core `v31.1.0`, including `src/wallet/init.cpp`, `src/wallet/load.*`, `src/wallet/context.*`, and startup-adjacent wallet implementation.

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` plus September 11 disposable-wallet runtime records  
**Notes:** Core disposable wallet creation/loading/reload behavior has bounded runtime evidence. Broader startup options, legacy-wallet paths, failure modes, and cross-platform behavior remain partial.