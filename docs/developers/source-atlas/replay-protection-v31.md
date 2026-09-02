# BitcoinII v31 replay protection

**Category:** Developer / Source Atlas
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Purpose

This page traces the BitcoinII Core `v31.1.0` replay-protection path from consensus parameters through validation, signature hashing, wallet signing, RPC, and PSBT handling.

## Activation

Mainnet `v31.1.0` sets:

- `nReplayProtectionHeight = 57750`
- `nReplayProtectionForkId = 0x01324342U`

`Consensus::Params::SighashForkId(height)` returns `0` below activation and the configured fork id at and above activation.

This means historical blocks retain the legacy BitcoinII signature-hash domain, while transactions intended for blocks at or above height `57750` use the BC2 replay-protection domain.

## What the fork id does

The fork id is not serialized into the transaction itself. It is supplied to signature-hash calculation as an additional domain value.

In `src/script/interpreter.cpp`, legacy signature-hash serialization appends the ordinary sighash type and, when the fork id is non-zero, appends the replay-protection domain before hashing. A zero fork id preserves the historical digest.

The same domain is threaded through SegWit/Taproot-aware signing and checking through `PrecomputedTransactionData::m_sighash_fork_id` and the signature-checker interfaces.

## Validation and mempool path

Mempool admission calculates the replay domain for the **next block height**, not merely the current tip. This is important at the activation boundary: a transaction admitted immediately before height `57750` must already be valid for the post-activation signature domain if it could be mined in the activation block.

`validation.cpp` sets `m_sighash_fork_id` from:

```text
SighashForkId(active_chain_height + 1)
```

The validation cache also commits the fork-id value into its cache key so a script result checked under one signature domain is not reused under another domain.

Immediately before activation, the node clears the mempool when the next block height equals `nReplayProtectionHeight`. This prevents transactions accepted under the legacy signature domain from surviving across the activation boundary.

## Wallet and service path

The chain interface exposes `getSighashForkId(height)` so wallet code can obtain the consensus-selected domain.

Wallet signing targets the next-block domain through `CWallet::GetSighashForkId()` and passes that value into transaction signing and PSBT processing.

Reviewed v31 paths include:

- `src/wallet/scriptpubkeyman.cpp` passing the fork id into transaction signing;
- `src/wallet/wallet.cpp` passing it into `PrecomputePSBTData`;
- wallet spend RPC passing it into PSBT finalization/extraction;
- raw-transaction RPC calculating the next-block fork id for signing;
- `src/psbt.cpp` storing the domain in `PrecomputedTransactionData`;
- node PSBT analysis accepting a fork-id argument;
- external-signer code refusing to treat a post-fork signing flow as safe unless replay-protection sighash support is available.

## Exchange/integration implication

An integrator must use the current BitcoinII Core signing/validation stack or otherwise reproduce the post-activation sighash domain correctly. Bitcoin-compatible address formats alone are not sufficient for transaction-signing compatibility.

The important boundary is **signature digest compatibility**, not address encoding.

## What this review does not yet prove

- No independent MoreBC2 transaction vector has yet been generated showing the pre/post-fork digest difference.
- MoreBC2 has not yet run a disposable-wallet transaction signing test against `v31.1.0`.
- Hardware/external signer compatibility has not been tested.
- Third-party libraries have not been audited for BC2 fork-id support.

## Primary sources

Pinned to `v31.1.0`:

- `src/kernel/chainparams.cpp`
- `src/consensus/params.h`
- `src/validation.cpp`
- `src/script/interpreter.h`
- `src/script/interpreter.cpp`
- `src/script/sign.cpp`
- `src/interfaces/chain.h`
- `src/node/interfaces.cpp`
- `src/rpc/rawtransaction.cpp`
- `src/rpc/rawtransaction_util.cpp`
- `src/psbt.cpp`
- `src/node/psbt.cpp`
- `src/wallet/wallet.h`
- `src/wallet/wallet.cpp`
- `src/wallet/scriptpubkeyman.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/external_signer_scriptpubkeyman.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** Yes, `v31.1.0`
**Notes:** The activation, domain-selection, validation, wallet, RPC, and PSBT paths are source-backed. Runtime vectors and third-party compatibility remain open.