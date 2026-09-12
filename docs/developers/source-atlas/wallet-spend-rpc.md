# Wallet spend and PSBT RPC

**Category:** Documentation
**Status:** Source-reviewed / Runtime-tested partial
**Last reviewed:** 2026-09-12

## Summary

This page covers BitcoinII wallet spend/funding/PSBT behavior centered on `src/wallet/rpc/spend.cpp` and the signing helpers it calls.

The broad wallet RPC structure remains Bitcoin-style, but BitcoinII Core `v31.1.0` adds an important BitcoinII-specific requirement: wallet and PSBT signing must use the replay-protection signature-hash domain selected for the **next block**.

Spend-related commands can move funds. Runtime evidence cited here used only a fresh disposable wallet and isolated regtest environment.

## Main command groups

Reviewed command families include:

- direct sends: `sendtoaddress`, `sendmany`, `send`, `sendall`;
- fee/funding: `settxfee`, `fundrawtransaction`, `walletcreatefundedpsbt`;
- fee bumping: `bumpfee`, `psbtbumpfee`;
- signing/PSBT: `signrawtransactionwithwallet`, `walletprocesspsbt`;
- PSBT finalization/extraction paths used by wallet RPC.

## v31 replay-protection integration

Mainnet replay protection activates at height `57750` with fork/domain id `0x01324342`.

`CWallet::GetSighashForkId()` obtains the domain appropriate for transactions targeting the next block. Wallet signing and PSBT handling propagate that value through signing/precomputation/finalization rather than relying on generic Bitcoin signature hashes.

A PSBT can therefore be syntactically valid while a third-party signer still produces unusable post-activation BC2 signatures if it ignores the BC2 replay domain.

## External signer boundary

The v31 external-signer path explicitly rejects the assumption that a generic external signer can safely sign post-fork BitcoinII without replay-protection sighash support.

MoreBC2 should not describe a hardware/external signer as compatible merely because it supports Bitcoin-format addresses or generic PSBT.

## Runtime evidence — 2026-09-11

MoreBC2 executed a complete bounded PSBT lifecycle using BitcoinII Core `v31.1.0` on Windows with a fresh disposable regtest data directory, zero peers, and a newly created descriptor wallet.

The successful path included:

- `createwallet`;
- `getnewaddress`;
- local `generatetoaddress` funding;
- `getbalances`;
- `walletcreatefundedpsbt`;
- `decodepsbt`;
- `walletprocesspsbt` with `complete = true`;
- `finalizepsbt` with `complete = true`;
- `decoderawtransaction`;
- `testmempoolaccept` with `allowed = true`;
- local-only `sendrawtransaction` into the isolated regtest mempool.

The transaction used only disposable regtest funds. No existing wallet/data directory was opened, copied, rescanned, imported, unlocked, inspected, or spent from, and no public-network broadcast occurred.

See [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## Runtime boundary

The regtest lifecycle proves the documented wallet/PSBT workflow under that isolated environment. It does **not** runtime-prove the mainnet replay-protection activation switch because regtest leaves replay protection disabled as shipped.

The mainnet domain propagation and activation boundary remain release-pinned source evidence.

Still unverified:

- deterministic pre/post-fork signature vectors;
- raw-RPC versus wallet-signing digest equivalence across activation;
- external/hardware signer compatibility;
- public-network transaction broadcast;
- broad direct-send/fee-bump/backup/encryption workflows.

## Operational implication

For services and exchanges, the safe default is to use current BitcoinII Core wallet/signing/PSBT code or independently implement and test BC2's replay-domain rules. The compatibility boundary is signature-digest behavior, not merely address encoding.

## Related pages

- [Replay protection v31](replay-protection-v31.md)
- [Raw transaction RPC](rpc-rawtransaction.md)
- [Wallet RPC](wallet-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Wallet compatibility](../../compatibility/wallets.md)
- [v31 PSBT runtime record](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Sources

Pinned BitcoinII Core `v31.1.0` paths include `src/wallet/rpc/spend.cpp`, wallet/scriptpubkeyman files, `src/psbt.*`, signing/interpreter paths, and the chain interface.

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` plus the 2026-09-11 isolated PSBT runtime record  
**Notes:** Wallet/PSBT replay-domain propagation is source-backed and the ordinary isolated PSBT lifecycle is runtime-tested. Mainnet replay activation and third-party/external signing remain outside the runtime scope.