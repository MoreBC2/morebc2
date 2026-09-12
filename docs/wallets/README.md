# Wallets

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This section is the user-facing starting point for BitcoinII (BC2) wallet documentation.

Wallet documentation is intentionally conservative. A wallet being project-linked, open source, listed in an app store, or able to reach a BC2 API/Electrum service does not by itself establish safe signing, correct recovery, replay-protection compatibility, or production readiness.

The strongest current MoreBC2 wallet evidence is for the BitcoinII Core `v31.1.0` wallet in isolated disposable environments. Third-party wallet and hardware/external-signer compatibility remain largely unverified.

## Current pages

- [Wallet guide](wallet-guide.md)

## Current evidence state

### BitcoinII Core wallet

**Status:** Locally tested partial / Source reviewed  
**Current release:** `v31.1.0`

Current MoreBC2 evidence includes:

- isolated Windows `v31.1.0` startup with a fresh disposable mainnet datadir;
- creation and inspection of a fresh SQLite descriptor wallet;
- clean stop/restart and explicit wallet reload;
- isolated regtest address generation and local-only mining to a disposable wallet;
- `getbalances`;
- `walletcreatefundedpsbt`;
- `walletprocesspsbt`;
- `decodepsbt`;
- `finalizepsbt`;
- `decoderawtransaction`;
- `testmempoolaccept`;
- local-only `sendrawtransaction` with zero peers.

See:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Wallet compatibility](../compatibility/wallets.md)

This evidence is meaningful but bounded. It does not certify every wallet workflow, every platform, long-duration use, mainnet spending, backup/recovery, or third-party signer support.

### Replay-protection boundary

BitcoinII Core `v31.1.0` activates BC2 replay protection on mainnet at height `57750` with fork/domain id `0x01324342`.

Release-pinned source shows wallet, PSBT, raw-transaction, mempool, block-validation, and signature-hash paths carrying the replay domain. This matters for wallet compatibility: software that merely understands Bitcoin-like addresses or ordinary Bitcoin sighash behavior must not be assumed compatible with BC2.

External-signer compatibility after activation remains unverified. The current source explicitly contains a post-fork external-signer limitation when the signer cannot receive replay-domain-aware sighash semantics.

### Third-party wallets

Current third-party wallet observations are tracked in [Ecosystem wallets](../ecosystem/wallets.md).

Current evidence does **not** establish general wallet compatibility for:

- Genesis Wallet;
- the Google Play `Bitcoin ii (BC2) Wallet` listing;
- `Bitcoin-II/wallet-bc2`;
- Tangem native BC2 support;
- BlueWallet;
- Cake Wallet;
- Komodo Wallet;
- general-purpose Bitcoin hardware wallets or external signers.

Tangem currently recognizes BC2 as an asset but states that the BitcoinII network is temporarily unsupported. That should not be presented as working native wallet support.

## Source-backed anchors

Wallet-related source review includes:

- [Source atlas: wallet startup](../developers/source-atlas/wallet-startup.md)
- [Source atlas: wallet RPC](../developers/source-atlas/wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](../developers/source-atlas/wallet-backup-import-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet encryption RPC](../developers/source-atlas/wallet-encryption-rpc.md)
- [Source atlas: wallet coins and balances RPC](../developers/source-atlas/wallet-coins-rpc.md)
- [Source atlas: wallet transaction history RPC](../developers/source-atlas/wallet-transactions-rpc.md)
- [Replay-protection source trace](../developers/source-atlas/replay-protection-v31.md)
- [RPC overview](../developers/rpc-overview.md)

Source review and runtime testing are separate evidence classes. A source-observed command is not treated as runtime-tested unless a dated local record says it was exercised.

## Documentation priorities

The next wallet work should focus on evidence-backed user workflows rather than adding broad unsupported compatibility claims:

- Windows Core-wallet installation/startup guidance against `v31.1.0`;
- backup and restore testing with disposable wallets;
- wallet encryption/unlock/relock testing with disposable wallets;
- transaction-history/rescan testing;
- recovery behavior and platform-specific wallet locations;
- external-signer/hardware-wallet compatibility;
- third-party wallet transaction and recovery testing;
- release-authentication improvements before stronger download guidance.

## Rules

- Link to project-controlled release sources rather than re-hosting wallet binaries unless there is a deliberate, reviewed reason to do otherwise.
- Do not call a third-party wallet compatible merely because it supports Bitcoin-style addresses, Electrum, PSBT, or secp256k1.
- Treat BC2 replay-domain behavior as a wallet-signing requirement after the v31 activation boundary.
- Do not mark backup, restore, encryption, recovery, import/export, or mainnet-spending procedures verified until directly tested in a disposable environment.
- Include operating system, release version, wallet type, network, and isolation details when documenting runtime tests.
- Never publish private keys, seed phrases, wallet files, RPC cookies, or authentication material.
- Separate BitcoinII Core wallet evidence from third-party wallet/provider claims.
- Keep wallet-moving, private-key, passphrase, broadcast, import, and export commands out of beginner docs unless strongly caveated and backed by test evidence.

## Related pages

- [Wallet guide](wallet-guide.md)
- [Wallet compatibility](../compatibility/wallets.md)
- [Ecosystem wallets](../ecosystem/wallets.md)
- [Release verification guide](../developers/release-verification.md)
- [Releases](../releases/README.md)
- [RPC overview](../developers/rpc-overview.md)
- [Configuration](../configuration/README.md)
- [Known unknowns](../verification/known-unknowns.md)
- [Open questions backlog](../verification/open-questions.md)

## Audit record

| Page | Reviewed | Result |
|---|---|---|
| `README.md` | 2026-09-12 | Updated for current `v31.1.0` disposable-wallet, PSBT, replay-protection, and third-party compatibility evidence. |
| `wallet-guide.md` | 2026-09-12 | Updated from source-review-first guidance to current source + runtime evidence, with remaining wallet workflow gaps preserved. |

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source/release; 2026-09-11 Windows node/wallet and PSBT validation records; current compatibility and ecosystem wallet records  
**Notes:** BitcoinII Core has current bounded runtime wallet evidence. Backup/recovery, encryption, broad platform behavior, hardware/external signing, and third-party wallet compatibility remain incomplete or unverified.