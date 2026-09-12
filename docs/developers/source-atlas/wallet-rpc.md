# Wallet RPC

**Category:** Documentation
**Status:** Source-reviewed / Runtime-tested partial
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core wallet-management and address RPC behavior centered on `src/wallet/rpc/wallet.cpp` and `src/wallet/rpc/addresses.cpp`.

The command surface is broader than MoreBC2's runtime coverage. Current `v31.1.0` testing now establishes a bounded subset, so this page should no longer say that no wallet RPC examples have been executed.

## Source-reviewed command groups

Reviewed wallet RPC areas include:

- wallet information/listing: `getwalletinfo`, `listwalletdir`, `listwallets`;
- loading/unloading: `loadwallet`, `unloadwallet`;
- creation/flags/migration: `createwallet`, `setwalletflag`, `upgradewallet`, `migratewallet`;
- address handling: `getnewaddress`, `getrawchangeaddress`, labels/groupings, multisig;
- backup/import/rescan;
- balances/coins;
- encryption/passphrase;
- spend/funding/PSBT;
- transaction history;
- message signing and related wallet functions.

The specialized atlas pages cover backup/import, spend/PSBT, encryption, coins/balances, and transaction history in more detail.

## v31 runtime evidence

The September 11 Windows tests used only fresh disposable wallet/data-directory state.

Current directly exercised wallet-management/address calls include:

- `listwallets`;
- `listwalletdir`;
- `createwallet`;
- `getwalletinfo`;
- `getnewaddress`;
- `getbalances` in the isolated PSBT test.

The disposable descriptor wallet was successfully created and used to receive locally generated regtest funds and complete a PSBT lifecycle. The earlier v31 node/RPC test also exercised safe disposable-wallet creation/inspection and restart/reload behavior under its documented environment.

No existing user wallet or production data directory was opened, copied, rescanned, imported, unlocked, inspected, or spent from.

See:

- [Windows v31.1.0 node and RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Replay-protection boundary

Wallet creation/address management is not itself proof of safe third-party signing. Mainnet v31 replay protection changes the signature-hash domain from activation height `57750`, and current BitcoinII Core wallet/PSBT signing paths carry that domain internally.

External signer and third-party wallet compatibility remain separate tests.

See [Wallet spend and PSBT RPC](wallet-spend-rpc.md) and [Replay protection](replay-protection-v31.md).

## Still source-only or unverified here

MoreBC2 has not yet published direct runtime coverage for every command in this group. Important open areas include:

- backup/restore and import workflows;
- encryption/passphrase lifecycle;
- migration/upgrade paths;
- rescans and transaction-history edge cases;
- multisig and message-signing workflows;
- external-signer wallets;
- broad direct-send and fee-bump behavior;
- cross-platform wallet behavior.

Do not present those as tested merely because the RPCs exist in source.

## Related pages

- [Wallet startup](wallet-startup.md)
- [Wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [Wallet backup/import RPC](wallet-backup-import-rpc.md)
- [Wallet encryption RPC](wallet-encryption-rpc.md)
- [Wallet coins and balances RPC](wallet-coins-rpc.md)
- [Wallet transaction history RPC](wallet-transactions-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Wallet compatibility](../../compatibility/wallets.md)

## Sources

Current source baseline: BitcoinII Core `v31.1.0`, including `src/wallet/rpc/wallet.cpp`, `src/wallet/rpc/addresses.cpp`, and related wallet implementation paths.

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` plus September 11 disposable-wallet runtime records  
**Notes:** Core wallet creation/listing/info/address behavior now has bounded runtime evidence. The wider wallet RPC surface remains source-reviewed unless a dated test record says otherwise.