# Wallet transaction history RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/wallet/rpc/transactions.cpp`

This file contains wallet RPC behavior for listing received amounts, listing wallet transaction history, reading one in-wallet transaction, marking eligible wallet transactions with a local abandoned state, rescanning wallet history, and requesting active rescans to stop.

This is not a tested command guide. Examples should not be marked verified until they are run against BitcoinII Core with a temporary wallet.

## Why this file matters

Wallet transaction-history RPCs are important for:

- Wallet transaction lists.
- Deposit-history views.
- Service reconciliation.
- Reorg-aware wallet monitoring.
- Troubleshooting missing wallet transactions.
- Rescan and recovery workflows.

## Commands reviewed

Reviewed commands include:

- `listreceivedbyaddress`
- `listreceivedbylabel`
- `listtransactions`
- `listsinceblock`
- `gettransaction`
- `abandontransaction`
- `rescanblockchain`
- `abortrescan`

## Shared transaction JSON behavior

Reviewed helper behavior includes:

- Adding confirmation count.
- Marking generated coinbase transactions.
- Adding confirmed block hash, height, index, and block time when confirmed.
- Adding trusted status when not confirmed.
- Adding transaction id and witness transaction id.
- Listing wallet conflicts and mempool conflicts.
- Adding received time and wallet map-value metadata.
- Adding BIP125 replaceability state.

## Transaction listing behavior

Reviewed `ListTransactions` behavior includes:

- Splitting wallet transaction effects into sent and received entries.
- Reporting sent outputs with negative amounts and fee when available.
- Reporting received outputs with positive amounts.
- Including labels from the address book where available.
- Including watch-only involvement when applicable.
- Categorizing coinbase wallet outputs as orphan, immature, or generate depending on chain state and maturity.
- Categorizing ordinary received outputs as receive.
- Supporting incoming label filtering.
- Optionally including change outputs in selected flows.

## Received-by-address and received-by-label

Reviewed commands include:

- `listreceivedbyaddress`
- `listreceivedbylabel`

Observed behavior includes:

- Minimum confirmation filtering.
- Optional inclusion of empty addresses or labels.
- Optional watch-only inclusion.
- Optional immature coinbase inclusion.
- Optional address filtering for the address-based command.
- Excluding change addresses from received-by-address reporting.

## listtransactions

`listtransactions` returns recent wallet transaction entries.

Reviewed behavior includes:

- Optional label filter for incoming transactions.
- `*` to disable label filtering.
- Count and skip arguments.
- Optional watch-only inclusion.
- Negative count and skip rejection.
- Ordering from the wallet transaction order index.
- Returning oldest-to-newest within the requested page after walking recent transactions.

## listsinceblock

`listsinceblock` returns wallet transactions after a given block reference, or all wallet transactions if no block is provided.

Reviewed behavior includes:

- Using the common ancestor when the provided block is no longer in the active chain.
- Optional target-confirmations value for the `lastblock` field.
- Optional watch-only inclusion.
- Optional removed-transaction reporting for reorg-related cases.
- Optional change-output inclusion.
- Optional label filtering.
- Returning a `lastblock` hash suitable for later polling.

The source warns removed-transaction reporting is not guaranteed to work on pruned nodes.

## gettransaction

`gettransaction` returns detailed information for a single in-wallet transaction.

Reviewed behavior includes:

- Requiring the txid to belong to the wallet.
- Optional watch-only inclusion.
- Optional verbose decoded transaction output.
- Reporting net amount and fee when applicable.
- Adding common wallet transaction metadata.
- Adding detailed sent/received entries.
- Adding raw transaction hex.
- Appending last processed block information.

## Local transaction state and rescan behavior

Reviewed commands include:

- `abandontransaction`
- `rescanblockchain`
- `abortrescan`

`abandontransaction` marks eligible in-wallet transactions with abandoned state, including in-wallet descendants, when they are not in a block and not in the mempool.

`rescanblockchain` scans local chain data for wallet-related transactions between requested heights. Reviewed behavior includes start/stop height validation, wallet unlock requirement, one-rescan-at-a-time reservation, unavailable-block checks, pruned-data errors, assumeutxo background-sync handling, and local-data fallback errors.

`abortrescan` requests cancellation of an active wallet rescan and returns whether the request was made.

## Documentation implications

MoreBC2 should separate transaction-history documentation into:

- Basic wallet history commands.
- Service polling commands.
- Reorg-aware monitoring.
- Rescan and recovery commands.
- Advanced transaction-state commands.

Service docs should be especially careful with `listsinceblock` because `lastblock`, target confirmations, reorg handling, and pruned-node behavior matter for reliable deposit monitoring.

## Relationship to other pages

Related pages:

- [Source atlas: wallet RPC](wallet-rpc.md)
- [Source atlas: wallet coins and balances RPC](wallet-coins-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [RPC overview](../rpc-overview.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and amount strings in wallet RPC help text.

No upstream comparison has been completed, so this page does not claim whether transaction-history RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which transaction-history examples can be tested safely on a temporary wallet?
- Should `listsinceblock` become the preferred service polling example after testing?
- How should pruned-node limitations be documented for wallet rescans and service monitoring?
- How should reorg-related removed transactions be explained for exchange/service operators?
- Which GUI transaction-history paths map to these RPC helpers?
- Confirm whether the `v31.1.0` release baseline differs from subsequent `main` changes for this file before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/wallet/rpc/transactions.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/transactions.cpp
- Current observed `main` `src/wallet/wallet.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/wallet.h
- Current observed `main` `src/wallet/receive.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/receive.h
- Current observed `main` `src/wallet/rpc/coins.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/coins.cpp
- Current observed `main` `src/wallet/rpc/backup.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/backup.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass wallet transaction-history/rescan RPC review. Commands have not been run. Public examples, service recommendations, GUI mapping, upstream comparison, and release-versus-main comparison remain open.
