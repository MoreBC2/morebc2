# Mempool and transaction broadcast RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/rpc/mempool.cpp`

This file contains RPC behavior for raw transaction broadcast, mempool acceptance testing, mempool inspection, mempool persistence, orphan-transaction inspection, and package submission.

This is not a tested command guide. Examples should not be marked verified until they are run against BitcoinII Core in a safe local environment.

## Why this file matters

Mempool RPCs are important for:

- Broadcasting signed transactions.
- Testing whether a transaction would be accepted before broadcast.
- Inspecting mempool entries and fee state.
- Understanding unconfirmed parent/child relationships.
- Monitoring local mempool health.
- Saving or importing mempool state.
- Package submission and package acceptance diagnostics.

These commands are especially important for exchanges, explorers, wallets, and services that need predictable transaction-handling behavior.

## Registered commands reviewed

`RegisterMempoolRPCCommands()` registers these commands:

Raw-transaction category:

- `sendrawtransaction`
- `testmempoolaccept`
- `submitpackage`

Blockchain category:

- `getmempoolancestors`
- `getmempooldescendants`
- `getmempoolentry`
- `gettxspendingprevout`
- `getmempoolinfo`
- `getrawmempool`
- `importmempool`
- `savemempool`

Hidden category:

- `getorphantxs`

## Transaction broadcast

Reviewed command:

- `sendrawtransaction`

Observed behavior includes:

- Decoding a signed raw transaction from hex.
- Checking fee-rate sanity through the `maxfeerate` argument.
- Checking provably unspendable outputs against `maxburnamount`.
- Calling `BroadcastTransaction` with relay enabled and callback waiting enabled.
- Returning the transaction hash on success.
- Warning in help text that manual rebroadcast can degrade privacy by leaking transaction origin.

Public docs should be careful with `sendrawtransaction`: it is a live broadcast command, not a dry-run command.

## Acceptance testing

Reviewed command:

- `testmempoolaccept`

Observed behavior includes:

- Accepting one or more raw transactions.
- Enforcing package-count bounds.
- Requiring parent transactions to come before children for multi-transaction inputs.
- Running consensus and mempool policy checks without submitting transactions.
- Returning txid, wtxid, allowed status, virtual size, fees, effective feerate, included wtxids for effective-feerate calculations, and rejection fields where applicable.
- Leaving later results blank when an earlier fee sanity failure makes the remaining package context inappropriate.

This is a strong candidate for future service/testing documentation after examples are run locally.

## Mempool inspection

Reviewed commands include:

- `getrawmempool`
- `getmempoolentry`
- `getmempoolancestors`
- `getmempooldescendants`
- `gettxspendingprevout`
- `getmempoolinfo`

Observed behavior includes:

- Listing all transaction ids in the mempool.
- Optional verbose entry data for mempool transactions.
- Optional mempool sequence values in non-verbose `getrawmempool` output.
- Entry fields for virtual size, weight, entry time, entry height, ancestor/descendant counts and sizes, witness transaction id, fee views, dependencies, child transactions, BIP125 replaceability, and unbroadcast status.
- Ancestor and descendant lookup for transactions already in the mempool.
- Prevout-spend lookup for supplied transaction outputs.
- Mempool summary information including loaded state, count, total virtual bytes, memory usage, total fee, maximum mempool size, minimum mempool fee, minimum relay fee, incremental relay fee, unbroadcast count, and full-RBF reporting.

## Mempool persistence

Reviewed commands include:

- `savemempool`
- `importmempool`

Observed behavior includes:

- `savemempool` writes the current mempool to the configured mempool file path after the mempool load attempt has completed.
- `importmempool` loads a mempool file after initial block download is complete.
- Import options include current-time handling, fee-delta metadata, and unbroadcast-set metadata.
- The reviewed help text warns that importing untrusted files or metadata can be dangerous or undesirable.

These commands should be documented as advanced operator tools, not normal wallet/user commands.

## Orphan and package behavior

Reviewed commands include:

- `getorphantxs`
- `submitpackage`

`getorphantxs` is hidden and experimental. It reports orphanage transaction ids or verbose orphan details, with optional raw hex at higher verbosity.

`submitpackage` is experimental. Observed behavior includes:

- Accepting a package of raw transactions.
- Requiring package topology shaped as a child with its unconfirmed parents and the child last.
- Rejecting package sizes outside source-defined bounds.
- Applying fee-rate and burn-output sanity checks.
- Calling package acceptance with submission enabled.
- Broadcasting transactions that are accepted or already present in the mempool.
- Returning package-level messages, per-transaction results keyed by wtxid, fee details, errors, and replaced transaction ids.

## Relationship to other pages

Related pages:

- [Source atlas: raw transaction RPC](rpc-rawtransaction.md)
- [Source atlas: mempool source](txmempool.md)
- [Source atlas: mempool accept](mempool-accept.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Life of a transaction](../../architecture/life-of-a-transaction.md)
- [RPC overview](../rpc-overview.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)

## Documentation implications

MoreBC2 should separate future mempool RPC documentation into:

- Dry-run acceptance checks.
- Live broadcast commands.
- Read-only mempool inspection.
- Mempool persistence/import tools.
- Experimental orphan/package commands.
- Service-safe examples after local testing.

Exchange and service docs should prefer tested dry-run and read-only workflows before documenting live broadcast workflows.

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and amount strings in RPC help text.

No upstream comparison has been completed, so this page does not claim whether mempool RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which `testmempoolaccept` examples can be tested safely on regtest?
- Which `sendrawtransaction` examples can be tested without risking mainnet funds?
- Which mempool inspection commands belong in exchange/service documentation?
- How should package submission be described while it is marked experimental?
- How should mempool persistence warnings be worded for operators?
- Which policy defaults should be linked from the mempool RPC docs?

## Sources

- `src/rpc/mempool.cpp`
- `src/txmempool.h`
- `src/txmempool.cpp`
- `src/kernel/mempool_entry.h`
- `src/validation.cpp`
- `src/rpc/rawtransaction.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass mempool and transaction-broadcast RPC review. Commands have not been run. Public examples, service recommendations, package policy details, and upstream comparison remain open.
