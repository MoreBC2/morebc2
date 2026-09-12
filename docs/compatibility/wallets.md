# Wallet compatibility

**Category:** Compatibility
**Status:** Reviewed / Core wallet tested partial; third-party wallets unknown
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 now has direct BitcoinII Core `v31.1.0` wallet/PSBT runtime evidence in addition to source review, but it still does not have a committed third-party wallet compatibility test record.

Canonical evidence:

- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Wallets section](../wallets/README.md)
- [Ecosystem wallets](../ecosystem/wallets.md)
- [Electrum compatibility](electrum.md)

## BitcoinII Core wallet

Status: **Locally tested partial / Source reviewed**

Current `v31.1.0` Windows testing established that a newly created disposable descriptor wallet could be created, inspected, stopped/reloaded, generate addresses, receive locally mined regtest funds, construct a funded PSBT, sign it, finalize it, and submit the resulting transaction to an isolated local regtest mempool.

The successful PSBT workflow exercised:

- wallet creation/loading;
- `getnewaddress`;
- local regtest funding;
- `getbalances`;
- `walletcreatefundedpsbt`;
- `walletprocesspsbt`;
- `decodepsbt`;
- `finalizepsbt`;
- `decoderawtransaction`;
- `testmempoolaccept`;
- local-only `sendrawtransaction`.

This is meaningful wallet compatibility evidence for BitcoinII Core itself. It is not a production-wallet certification and did not use an existing user wallet or public network submission.

## Replay-protection implication for wallets

BitcoinII Core `v31.1.0` activates BC2 replay protection on mainnet at height `57750` with fork/domain id `0x01324342`.

The release-pinned source trace shows wallet, PSBT, raw-transaction, mempool, block-validation, and signature-hash paths carrying the replay domain. Third-party wallets or external signers that assume ordinary Bitcoin sighash behavior may therefore be incompatible even when they understand Bitcoin-like addresses.

External-signer compatibility after activation remains unverified.

## Third-party wallets

Status: **Unknown / Needs Testing**

The repository does not currently establish compatibility for:

- BlueWallet;
- Cake Wallet;
- Komodo Wallet;
- other third-party mobile, desktop, hardware, web, or external-signer wallets.

Read-only Electrum server reachability does not prove that any wallet can safely define the BC2 network, recognize its genesis/domain rules, display units correctly, build replay-protected transactions, or broadcast them successfully.

## Watch-only and Electrum-wallet limitations

Current evidence does not establish:

- third-party address/scripthash history correctness;
- xpub/watch-only import behavior;
- fee display in third-party wallets;
- ticker/network labeling safety;
- third-party transaction construction/signing;
- hardware-wallet signing;
- replay-protection-aware external signing;
- Electrum transaction broadcast.

## Safe wording

> BitcoinII Core v31.1.0 has current MoreBC2 runtime coverage for a disposable wallet and complete isolated PSBT lifecycle. Third-party wallet and hardware/external-signer compatibility remain unverified.

## Verification

**Status:** Reviewed / Core wallet tested partial; third-party wallets unknown  
**Primary sources checked:** 2026-09-11 v31.1.0 node/wallet and PSBT validation records, release-pinned replay-protection trace, and wallet source-review documentation  
**Notes:** Current evidence supports BitcoinII Core wallet workflows under the documented test conditions only. It does not support recommending an untested third-party wallet.
