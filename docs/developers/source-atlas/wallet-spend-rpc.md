# Wallet spend and PSBT RPC

**Category:** Documentation
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Summary

This page covers BitcoinII wallet spend/funding/PSBT behavior centered on `src/wallet/rpc/spend.cpp` and the signing helpers it calls.

The broad wallet RPC structure remains Bitcoin-style, but BitcoinII Core `v31.1.0` adds an important BitcoinII-specific requirement: wallet and PSBT signing must use the replay-protection signature-hash domain selected for the **next block**.

This is not a user command guide. Spend-related commands can move funds or prepare fund-moving transactions.

## Main command groups

Reviewed command families include:

- direct sends: `sendtoaddress`, `sendmany`, `send`, `sendall`;
- fee/funding: `settxfee`, `fundrawtransaction`, `walletcreatefundedpsbt`;
- fee bumping: `bumpfee`, `psbtbumpfee`;
- signing/PSBT: `signrawtransactionwithwallet`, `walletprocesspsbt`;
- PSBT finalization/extraction paths used by wallet RPC.

Existing fee, funding, coin-selection, replaceability, change-output, and wallet-unlock behavior remains structurally useful from the earlier review.

## v31 replay-protection integration

Mainnet replay protection activates at height `57750` with fork id `0x01324342`.

`CWallet::GetSighashForkId()` obtains the replay domain appropriate for transactions targeting the next block. Below activation the domain is zero; at/after activation it is the BC2 fork id.

Wallet signing passes this value into transaction-signing helpers rather than relying on generic Bitcoin signature hashes.

`DescriptorScriptPubKeyMan::SignTransaction` passes `m_storage.GetSighashForkId()` into the signing path.

## PSBT behavior in v31

The fork id propagates through PSBT handling:

- `PrecomputePSBTData(..., sighash_fork_id)` stores it in `PrecomputedTransactionData`;
- wallet PSBT processing calls that helper with `GetSighashForkId()`;
- wallet spend RPC passes the domain into `FinalizeAndExtractPSBT`;
- signature creation/checking receives the same domain through signing helpers.

A PSBT can therefore be syntactically valid and still be unusable on post-activation BitcoinII if a third-party signer computes legacy Bitcoin-style signature hashes.

## External signer boundary

The v31 external-signer path explicitly warns that it cannot safely sign BitcoinII post-fork transactions without replay-protection sighash support.

MoreBC2 should not describe a hardware/external signer as compatible merely because it supports Bitcoin-format addresses or PSBT generally.

## Operational implication

For services and exchanges, the safe default is to use current BitcoinII Core wallet/signing/PSBT code or independently reproduce the BC2 replay-domain rules exactly.

The compatibility boundary is signature-digest behavior, not address encoding.

## What remains structurally unchanged

This pass did not identify a BitcoinII-specific rewrite of the ordinary wallet RPC concepts around:

- recipient construction;
- fee-rate options;
- funding and coin-control options;
- change handling;
- opt-in replacement;
- fee bumping;
- wallet locking/private-key availability;
- send-all selection mechanics.

Those earlier descriptions remain useful as structural documentation.

## Runtime status

MoreBC2 has **not** yet executed a v31 wallet/PSBT regression suite.

Still needed:

- disposable-wallet PSBT create/process/finalize tests;
- raw-transaction versus wallet-signing digest equivalence;
- external/hardware signer tests;
- deterministic pre/post-fork signature vectors.

## Related pages

- [Replay protection v31](replay-protection-v31.md)
- [v31 wallet/mempool/mining regression audit](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Raw transaction RPC](rpc-rawtransaction.md)
- [Wallet RPC](wallet-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Service integration checklist](../../exchange/service-integration-checklist.md)

## Sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/wallet/rpc/spend.cpp`
- `src/wallet/wallet.h`
- `src/wallet/wallet.cpp`
- `src/wallet/scriptpubkeyman.h`
- `src/wallet/scriptpubkeyman.cpp`
- `src/wallet/external_signer_scriptpubkeyman.cpp`
- `src/psbt.h`
- `src/psbt.cpp`
- `src/script/sign.cpp`
- `src/interfaces/chain.h`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** BitcoinII Core `v31.1.0`
**Notes:** Wallet/PSBT replay-domain propagation is source-backed. Commands and third-party signer compatibility have not yet been runtime-tested by MoreBC2.