# Known compatibility breakpoints

**Category:** Compatibility
**Status:** Draft / Risk map
**Last reviewed:** 2026-07-13

## Summary

This page lists compatibility assumptions that can break BitcoinII / BC2 integrations.

The items here are risks and boundaries, not new test results.

Canonical evidence:

- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [Network specifications](../documentation/network-specifications.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [API mempool.space compatibility page](../api/mempool-space-compatibility.md)

## Address assumptions

Risk: Bitcoin tools may assume Bitcoin mainnet address formats, prefixes, or validation rules.

MoreBC2 has source-reviewed address and wallet behavior in BitcoinII Core docs, but third-party address parsing remains untested.

## Genesis assumptions

Risk: Bitcoin tooling may assume Bitcoin's genesis hash.

The Electrum smoke test observed BitcoinII genesis hash:

```text
0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb
```

Tools that cannot configure or validate the BitcoinII genesis hash may misidentify the chain.

## Network identifiers

Risk: Software may hard-code Bitcoin chain names, network magic, ticker symbols, or explorer assumptions.

MoreBC2 has BitcoinII source and project-identity records, but broad third-party network handling remains untested.

## Fee assumptions

Risk: Wallets, services, or APIs may assume Bitcoin fee units or Bitcoin-denominated labels.

MoreBC2 has source-reviewed notes showing different RPC areas can use different units, and the public API smoke test did not establish every fee unit or wallet display behavior.

## Wallet assumptions

Risk: Electrum connectivity may be mistaken for wallet compatibility.

Current evidence does not establish BlueWallet, Cake Wallet, Komodo Wallet, or other third-party wallet compatibility.

## Broadcast assumptions

Risk: Read-only API/RPC success may be mistaken for transaction broadcast compatibility.

The public API/Electrum smoke test did not broadcast transactions. The local RPC smoke test did not run transaction creation or broadcast commands.

## Electrum assumptions

Risk: A server accepting `server.version`, `server.features`, and `blockchain.headers.subscribe` may still fail wallet-history, address-history, fee, subscription, or broadcast workflows.

MoreBC2 has only narrow read-only Electrum evidence.

## UTXO endpoint differences

Risk: mempool.space-style integrations may expect address UTXO endpoints.

The 2026-07-12 smoke test found:

- `/api/address/{address}/utxo` returned 404,
- `/api/address/{address}/utxos` returned 404.

## API version assumptions

Risk: developers may assume `/api/v1` is a valid base path or that every endpoint has a `/api/v1` alias.

The 2026-07-12 smoke test observed `/api/v1` returning 404 while concrete endpoints worked.

## Verification

**Status:** Draft / Risk map  
**Primary sources checked:** Existing compatibility-related records linked above  
**Notes:** This page summarizes known compatibility risks. It does not perform new testing.
