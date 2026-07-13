# Wallet compatibility

**Category:** Compatibility
**Status:** Draft / Unknown for third-party wallets
**Last reviewed:** 2026-07-13

## Summary

MoreBC2 currently has source-reviewed BitcoinII Core wallet documentation and read-only Electrum infrastructure observations.

It does not have a committed third-party wallet compatibility test record.

Canonical evidence:

- [Wallet guide](../wallets/wallet-guide.md)
- [Wallets section](../wallets/README.md)
- [Ecosystem wallets](../ecosystem/wallets.md)
- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [API Electrum page](../api/electrum.md)

## BitcoinII Core wallet

Status: **Source Reviewed / Needs Testing**

MoreBC2 has reviewed source for BitcoinII Core wallet startup and major wallet RPC groups. The wallet guide records source-observed behavior for:

- wallet startup and loading,
- wallet RPC registration,
- address-management commands,
- backup/import commands,
- spend and PSBT commands,
- encryption commands,
- coin and balance commands,
- transaction-history commands.

Those source-reviewed notes do not make wallet command examples locally tested.

## Third-party wallets

Status: **Unknown / Needs Testing**

The committed repository does not establish compatibility for:

- BlueWallet,
- Cake Wallet,
- Komodo Wallet,
- other third-party mobile, desktop, hardware, or web wallets.

The committed Electrum smoke test explicitly says Electrum connectivity does not prove compatibility with those wallets.

## BlueWallet

Status: **Unknown / Not established by committed evidence**

MoreBC2 has no committed record showing that BlueWallet can define a BitcoinII/BC2 network, accept the observed BC2 Electrum infrastructure, recognize the BitcoinII genesis hash, parse BC2 addresses, display balances/history correctly, or avoid BTC-vs-BC2 labeling problems.

Do not recommend BlueWallet as BC2-compatible from current MoreBC2 evidence.

## Cake Wallet

Status: **Unknown / Not established by committed evidence**

MoreBC2 has no committed record showing that Cake Wallet can define a BitcoinII/BC2 network, connect to the observed BC2 Electrum infrastructure for BC2, parse BC2 addresses/history, or display units safely.

Do not recommend Cake Wallet as BC2-compatible from current MoreBC2 evidence.

## Komodo Wallet

Status: **Unknown / Not established by committed evidence**

MoreBC2 has no committed record showing that Komodo Wallet can define a BitcoinII/BC2 network, connect to the observed BC2 Electrum infrastructure for BC2, parse BC2 addresses/history, or display units safely.

Do not recommend Komodo Wallet as BC2-compatible from current MoreBC2 evidence.

## Watch-only limitations

The committed Electrum smoke test did not test:

- wallet-history methods,
- address-history methods,
- public address watch-only setup,
- xpub import,
- fee display,
- transaction construction,
- transaction broadcast,
- ticker or unit labeling.

Watch-only compatibility remains **Unknown / Needs Testing**.

## Verification

**Status:** Draft / Unknown for third-party wallets  
**Primary sources checked:** Existing wallet source-review docs and public API/Electrum smoke-test record linked above  
**Notes:** This page summarizes current wallet compatibility boundaries. It does not recommend unsupported wallets.
