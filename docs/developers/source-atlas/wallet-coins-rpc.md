# Wallet coins and balances RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/wallet/rpc/coins.cpp`

This file contains wallet RPC behavior for received amounts, wallet balances, manual output selection state, locked outputs, and listing available wallet outputs.

This is not a tested command guide. Examples should not be marked verified until they are run against BitcoinII Core with a temporary wallet.

## Why this file matters

Coin and balance RPCs are core building blocks for:

- Wallet status pages.
- Exchange and service balance monitoring.
- Deposit accounting.
- Manual coin/output selection.
- Troubleshooting why funds are or are not available for spending.

## Commands reviewed

Reviewed commands include:

- `getreceivedbyaddress`
- `getreceivedbylabel`
- `getbalance`
- `getunconfirmedbalance`
- `getbalances`
- `lockunspent`
- `listlockunspent`
- `listunspent`

## Received amount helpers

`GetReceived` is the common helper for `getreceivedbyaddress` and `getreceivedbylabel`.

Reviewed behavior includes:

- Looking up either one destination or all destinations for a label.
- Requiring wallet-owned output scripts.
- Applying minimum confirmation depth.
- Excluding immature coinbase outputs unless requested.
- Summing matching outputs from wallet transactions.

## Balance commands

Reviewed balance commands include:

- `getbalance`
- `getbalances`
- `getunconfirmedbalance`

Reviewed behavior includes:

- Syncing wallet results to the current chain view before returning values.
- Respecting minimum confirmation settings where supported.
- Optionally including watch-only balances where supported.
- Respecting avoid-reuse wallet behavior when enabled.
- Separating trusted, untrusted pending, and immature balance categories in `getbalances`.
- Marking `getunconfirmedbalance` as deprecated in favor of the relevant `getbalances` field.

## Output lock commands

Reviewed output lock commands include:

- `lockunspent`
- `listlockunspent`

Reviewed behavior includes:

- Temporarily marking wallet outputs as unavailable for automatic selection.
- Supporting persistent locks when requested.
- Validating transaction IDs and output indexes.
- Rejecting unknown, already-spent, already-locked, or not-locked outputs depending on action.
- Returning currently locked outputs through `listlockunspent`.

## listunspent

`listunspent` returns available wallet outputs filtered by confirmation range, optional addresses, safety handling, and query options.

Reviewed behavior includes:

- Minimum and maximum confirmation filters.
- Optional address filters with duplicate-address rejection.
- `include_unsafe` handling.
- Query options for minimum amount, maximum amount, maximum count, minimum sum amount, and immature coinbase inclusion.
- Output fields such as transaction id, output index, address, label, output script, amount, confirmations, mempool ancestry data, spendable/solvable flags, descriptor data, parent descriptors, reused flag when applicable, and safe flag.

## Documentation implications

MoreBC2 should distinguish:

- Balance reporting commands.
- Deposit/received-amount commands.
- Output listing commands.
- Manual output-selection commands.

Service docs should be careful with balance commands because wallet balance and exchange accounting balance are not always the same thing. Confirmation depth, watch-only state, immature coinbase outputs, and avoid-reuse behavior can change what a command reports.

## Relationship to other pages

Related pages:

- [Source atlas: wallet RPC](wallet-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [RPC overview](../rpc-overview.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)
- [Service integration checklist](../../exchange/service-integration-checklist.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and amount strings in wallet RPC help text.

No upstream comparison has been completed, so this page does not claim whether coins/balance RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which balance and UTXO examples can be tested safely on a temporary wallet?
- Which commands belong in service docs versus advanced wallet docs?
- How should immature coinbase outputs be explained for miners?
- How should watch-only and avoid-reuse behavior be explained to non-developers?
- Which output-selection workflows map to GUI coin-control behavior?
- Confirm whether `v29.1.0` differs from current `main` for this file before upgrading status.

## Sources

- Current observed `main` `src/wallet/rpc/coins.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/coins.cpp
- Current observed `main` `src/wallet/receive.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/receive.h
- Current observed `main` `src/wallet/spend.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/spend.h
- Current observed `main` `src/wallet/coincontrol.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/coincontrol.h
- Current observed `main` `src/wallet/wallet.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/wallet.h

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass wallet coins/balances RPC review. Commands have not been run. Public examples, exchange/service recommendations, GUI mapping, upstream comparison, and release-versus-main comparison remain open.
