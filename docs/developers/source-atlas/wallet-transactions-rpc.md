# Wallet transaction history RPC

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-only partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` wallet transaction-history and rescan behavior centered on `src/wallet/rpc/transactions.cpp`.

The September disposable-wallet tests did not create a durable wallet-history/reorg/rescan fixture. These methods therefore remain source-reviewed even though adjacent wallet creation, balance, PSBT, and local mempool behavior now have current runtime evidence.

## Commands reviewed

- `listreceivedbyaddress`
- `listreceivedbylabel`
- `listtransactions`
- `listsinceblock`
- `gettransaction`
- `abandontransaction`
- `rescanblockchain`
- `abortrescan`

## Shared wallet transaction state

Source-reviewed transaction JSON/history helpers can expose information such as:

- confirmation count;
- coinbase/generated state;
- confirmed block hash/height/index/time;
- trusted state for unconfirmed wallet transactions;
- txid/wtxid;
- wallet and mempool conflicts;
- receive time and wallet metadata;
- replaceability state;
- sent/received effects and fee information.

These are wallet interpretations of transactions, not a substitute for an exchange's own customer ledger.

## `listtransactions`

Reviewed behavior includes pagination/count/skip, optional incoming-label filtering, watch-only handling, wallet ordering, sent/received entries, and coinbase categories such as orphan/immature/generate according to wallet/chain state.

MoreBC2 has not yet published a current v31 runtime fixture showing these categories.

## `listsinceblock`

This method is especially relevant to service polling because source review includes:

- common-ancestor handling when the supplied block is no longer active;
- target-confirmation context for the returned `lastblock`;
- optional removed-transaction handling for reorg cases;
- optional watch-only/change/label behavior;
- pruning limitations for some removed-transaction reconstruction.

The current exchange/deposit guidance should not treat `listsinceblock` as a production-recommended polling strategy until it is tested against an intentional reorg/pruned-node fixture.

## `gettransaction`

Source review shows detailed in-wallet transaction reporting, including wallet effects, common transaction metadata, raw transaction data, and last-processed block context where applicable.

It is wallet-scoped; a transaction merely existing on chain does not mean `gettransaction` will treat it as a wallet transaction.

## Rescan behavior

`rescanblockchain` / `abortrescan` operate on wallet history discovery using local chain data.

Source-backed cautions include:

- start/stop height validation;
- one active rescan reservation per wallet;
- wallet access-state requirements where applicable;
- failures when required historical blocks are unavailable;
- pruned-node limitations;
- background-chainstate/assumeutxo considerations;
- potentially long execution for old timestamps or large ranges.

The September v31 tests deliberately did **not** rescan an existing or disposable mainnet wallet.

## `abandontransaction`

This is a wallet-local state-changing operation for eligible transactions and descendants when they are not confirmed/in the mempool according to the reviewed path.

It should remain advanced documentation until tested with a fully disposable transaction fixture.

## Current runtime context

Current v31 wallet evidence establishes:

- fresh descriptor-wallet creation and explicit reload;
- disposable address generation;
- generated regtest funds;
- `getbalances`;
- PSBT funding/signing/finalization;
- local mempool acceptance/submission.

It does **not** establish history pagination, reorg removed-entry semantics, rescan behavior, abandon behavior, or pruned-wallet recovery.

## Reorg and confirmation boundary

Wallet confirmation/history state can change after a reorganization. Service operators should combine wallet transaction state with an operator-controlled Core view of the active chain, accumulated chain work, and their own deposit policy.

No finite confirmation count is protocol finality, and a wallet's displayed confirmation count is not itself an exchange risk model.

See [Life of a reorganization](../../architecture/life-of-a-reorg.md) and [Deposit monitoring](../../exchange/deposit-monitoring.md).

## Replay protection

History/listing RPCs do not themselves create new signatures. If a workflow proceeds from a listed transaction/UTXO into spending, the signing path must use BC2's active replay-protection domain from mainnet height `57750`.

## Documentation rules

- Keep wallet history distinct from customer accounting ledgers.
- Label pruning/index/rescan prerequisites explicitly.
- Do not recommend `listsinceblock` or rescan workflows as production patterns until the intended failure/reorg cases are tested.
- Never use an existing user wallet for abandon/rescan experiments.
- Use synthetic/regtest or otherwise disposable fixtures for reorg-history testing.

## Related pages

- [Wallet RPC](wallet-rpc.md)
- [Wallet coins and balances](wallet-coins-rpc.md)
- [Wallet backup/import RPC](wallet-backup-import-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)

## Open work

- Create a disposable v31 history fixture with confirmed and unconfirmed transactions.
- Exercise `listtransactions` and `gettransaction` against that fixture.
- Build an isolated reorg fixture before qualifying `listsinceblock` removed-entry semantics.
- Test `rescanblockchain` on disposable descriptor-wallet state with explicit pruning/index conditions.
- Keep `abandontransaction` advanced-only until its state transitions are directly observed.

## Primary sources

Pinned/current review scope includes:

- `v31.1.0/src/wallet/rpc/transactions.cpp`
- `v31.1.0/src/wallet/wallet.*`
- `v31.1.0/src/wallet/receive.*`
- related wallet coins/backup source.

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-only partial  
**Primary evidence:** BitcoinII Core `v31.1.0` wallet transaction/history source plus adjacent September wallet runtime records  
**Notes:** History, reorg, rescan, abandon, and pruned-wallet behavior remain untested. The page now explicitly separates those gaps from the wallet/PSBT behavior MoreBC2 has actually exercised.
