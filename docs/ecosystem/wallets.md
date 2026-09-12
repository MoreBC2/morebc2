# Wallets

**Category:** Ecosystem
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page tracks BitcoinII (BC2) wallet resources and their current evidence state.

A wallet being listed, open source, project-linked, or able to reach an Electrum/API service does not by itself establish safe transaction signing, replay-protection compatibility, recovery correctness, or production readiness.

For compatibility interpretation, see [Wallet compatibility](../compatibility/wallets.md). For release provenance, see [Releases](../releases/README.md).

## BitcoinII Core wallet

**Status:** Active release / Locally tested partial  
**Official:** Yes — linked by the BitcoinII project website and maintained in the Bitcoin-II organization  
**Type:** Full-node wallet / Qt and CLI  
**Current release:** `v31.1.0`  
**Release:** https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0  
**Last checked:** 2026-09-12

Current MoreBC2 evidence includes:

- source review of the current wallet/RPC implementation;
- isolated Windows `v31.1.0` startup and disposable-wallet testing;
- isolated `v31.1.0` regtest PSBT lifecycle testing;
- `walletcreatefundedpsbt`, wallet signing, PSBT finalization, `testmempoolaccept`, and local-only `sendrawtransaction` in the documented disposable environment.

This is much stronger than the older source-only wallet evidence, but it is still bounded. MoreBC2 has not established every wallet workflow, every platform, long-duration use, hardware-signer compatibility, or a fully authenticated/reproducible release-binary path.

See:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [BitcoinII Core v31.1.0 release assets](../releases/v31.1.0-assets.md)

## Genesis Wallet

**Status:** Observed / Early-access third-party wallet; runtime compatibility not tested by MoreBC2  
**Official:** **Conflicting public labels**  
**Type:** Android / React Native / Electrum-based  
**Source:** https://github.com/GenesisWalletOrg/GenesisWallet  
**Website:** https://genesiswallet.org/  
**Observed version:** `0.1.0 Beta` in the repository README  
**Last checked:** 2026-09-12

The current Genesis Wallet repository describes the project as open source, community built, BC2-native, Android-focused, and **independent / not affiliated with the BitcoinII Organization**. It also labels the software early access and says iOS support is not yet available.

At the same time, the current BitcoinII project website describes Genesis Wallet as the **official Android wallet**.

MoreBC2 does not silently resolve that disagreement. Until the maintainers reconcile the two public descriptions, this page records the official-status label as conflicting.

MoreBC2 has not performed a wallet-level transaction, recovery, replay-protection, Electrum-history, fee, or security test against Genesis Wallet under `v31.1.0`.

## Bitcoin ii (BC2) Wallet — Google Play

**Status:** Observed third-party mobile wallet / Not tested by MoreBC2  
**Official:** Unknown  
**Type:** Android mobile wallet  
**Publisher:** Second Chance Digital, LLC  
**Store:** Google Play  
**Last observed update:** 2026-08-29  
**Last checked:** 2026-09-12

The Google Play listing describes the app as a non-custodial BitcoinII wallet supporting BC2 send/receive, multiple wallets, QR handling, transaction history, fee-aware sending, BIP39-derived keys, and device-level authorization.

Those are publisher claims, not MoreBC2 test results. MoreBC2 has not audited its source, key handling, replay-protection behavior, recovery path, backend dependencies, transaction construction, or network compatibility.

Do not treat store availability as a security endorsement or compatibility guarantee.

## `Bitcoin-II/wallet-bc2`

**Status:** Observed source project / Runtime and security behavior not tested by MoreBC2  
**Official:** Hosted in the Bitcoin-II GitHub organization; current recommendation status not established  
**Type:** Web-based wallet source  
**Source:** https://github.com/Bitcoin-II/wallet-bc2  
**Last checked:** 2026-09-12

The repository describes a web wallet with client-side key generation/import/signing, HD/WIF/HEX handling, BC2 send/receive, UTXO handling, and a reverse-proxied BC2-node backend. It also documents on-chain encrypted messaging and multiple address types.

The repository's presence in the Bitcoin-II organization is direct evidence of project-org hosting. It does **not** by itself establish that the wallet is the preferred current wallet, production hardened, v31 replay-protection compatible in every signing path, or independently security reviewed.

MoreBC2 has not run or security-audited this wallet.

## Tangem

**Status:** Asset recognized / Native BitcoinII network temporarily unsupported  
**Official:** Third-party hardware-wallet provider  
**Asset page:** https://tangem.com/en/cryptocurrencies/bitcoinii/  
**Last checked:** 2026-09-12

Tangem exposes a BitcoinII (BC2) asset-information page, but the page currently states that Tangem support for BitcoinII networks is **temporarily not supported**.

That means MoreBC2 should not list Tangem as a currently working native BC2 wallet. A marketplace/info page is not the same thing as implemented network support.

See the exchange/integration material for the separate integration-requirements discussion.

## Third-party wallet boundary

MoreBC2 currently does **not** have committed compatibility evidence establishing BC2 support for BlueWallet, Cake Wallet, Komodo Wallet, or general-purpose Bitcoin hardware wallets.

Bitcoin-like address formats and signing primitives are insufficient evidence after the v31 replay-protection changes. External signers must be checked against BC2's current signing domain and transaction flow rather than assumed compatible from Bitcoin heritage.

## What remains unverified

- Genesis Wallet transaction/recovery/replay-protection behavior under v31.
- Google Play BC2 wallet source/security/backend behavior.
- `wallet-bc2` runtime and security behavior.
- Hardware-wallet/external-signer support.
- iOS-native BC2 wallet support.
- Long-duration Electrum wallet behavior and address-history correctness.
- Cross-wallet seed/import recovery compatibility.

## Related pages

- [Wallet compatibility](../compatibility/wallets.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Releases](../releases/README.md)
- [Release verification guide](../developers/release-verification.md)
- [Known unknowns](../verification/known-unknowns.md)
- [Ecosystem index](README.md)

## Verification

**Status:** Reviewed / Partial
**Primary sources checked:** BitcoinII project website; BitcoinII Core `v31.1.0` release/source and MoreBC2 runtime records; Genesis Wallet repository; `Bitcoin-II/wallet-bc2`; current Google Play BC2 wallet listing; Tangem BC2 asset page
**Notes:** BitcoinII Core has current bounded runtime evidence. Other wallet entries are observations unless explicitly stated otherwise. Conflicting public official-status labels are preserved rather than silently reconciled.