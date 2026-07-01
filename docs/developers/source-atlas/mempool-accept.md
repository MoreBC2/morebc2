# `MemPoolAccept` in `src/validation.cpp`

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Purpose

`MemPoolAccept` is the BitcoinII Core validation path for deciding whether transactions may enter the mempool.

This is separate from block validation. A transaction can be valid under consensus rules but still be rejected from the mempool for policy reasons.

## Why it matters

Mempool acceptance affects:

- Transaction relay.
- Local wallet broadcast behavior.
- Replacement policy.
- Package submission.
- Fee filtering.
- Input checks before unconfirmed transactions are stored.
- Reorg transaction re-addition.

## Main reviewed entry points

Reviewed methods and wrappers include:

- `AcceptToMemoryPool`
- `ProcessNewPackage`
- `ChainstateManager::ProcessTransaction` declaration
- `node::BroadcastTransaction`
- `AcceptSingleTransaction`
- `AcceptMultipleTransactions`
- `AcceptSubPackage`
- `AcceptPackage`
- `PreChecks`
- `ReplacementChecks`
- `PackageMempoolChecks`
- `PolicyScriptChecks`
- `ConsensusScriptChecks`
- `Finalize`
- `SubmitPackage`
- `CleanupTemporaryCoins`

## Public-facing wrappers and caller paths

### `AcceptToMemoryPool`

Reviewed behavior:

- Requires `cs_main` to be held.
- Gets chain parameters from the active chainstate's chain manager.
- Requires the active chainstate to have a mempool.
- Builds `ATMPArgs::SingleAccept`.
- Calls `MemPoolAccept(...).AcceptSingleTransaction(...)`.
- If the result is not valid, uncaches coins added during validation to prevent memory DoS through invalid transactions.
- Emits a mempool rejection tracepoint.
- Calls `FlushStateToDisk` with periodic mode after validation so the coins cache remains within limits.
- Returns a `MempoolAcceptResult`.

### `ProcessNewPackage`

Reviewed behavior:

- Requires `cs_main` to be held.
- Requires the package to be non-empty and contain non-null transactions.
- Builds package acceptance arguments based on whether this is test acceptance or real submission.
- For test acceptance, uses `ATMPArgs::PackageTestAccept` and calls `AcceptMultipleTransactions`.
- For real submission, uses `ATMPArgs::PackageChildWithParents` and calls `AcceptPackage`.
- Uncaches coins for transactions not submitted to the mempool when test-accept is used or package validation is invalid.
- Calls `FlushStateToDisk` with periodic mode after validation.
- Returns a `PackageMempoolAcceptResult`.

### `ChainstateManager::ProcessTransaction`

Reviewed declaration:

- Public method on `ChainstateManager`.
- Attempts to add a transaction to the memory pool.
- Takes a transaction reference and a `test_accept` flag.
- Returns `MempoolAcceptResult`.

The exact implementation location still needs a follow-up source search because the declaration is clear in `validation.h`, while this pass focused on the wrapper and caller paths around it.

### `node::BroadcastTransaction`

Reviewed behavior:

- Can be called by RPC or by the wallet.
- Requires chain manager, mempool, and peer manager to be initialized.
- Checks whether the transaction is already confirmed in the active chain and returns `ALREADY_IN_CHAIN` if so.
- Checks whether a transaction with the same txid is already in the mempool and, if found, uses the mempool transaction's witness transaction ID for possible reannouncement.
- If `max_tx_fee` is set, first calls `ProcessTransaction(..., test_accept=true)` and rejects if the transaction would exceed the maximum fee.
- Calls `ProcessTransaction(..., test_accept=false)` to submit the transaction to the mempool.
- Adds the txid to the mempool's unbroadcast set when relay is requested.
- Optionally waits for validation-interface events so wallet/RPC users do not see stale wallet state immediately after broadcast.
- Relays the transaction through peer manager when relay is requested.

## `MempoolAcceptResult`

Reviewed result types:

- `VALID` — fully validated and valid.
- `INVALID` — invalid or rejected.
- `MEMPOOL_ENTRY` — already in the mempool.
- `DIFFERENT_WITNESS` — same txid but different witness transaction already exists in the mempool.

Reviewed result fields include:

- Validation state.
- Replaced transactions.
- Virtual size.
- Base fees.
- Effective feerate.
- Witness transaction IDs used for fee calculations.
- Other wtxid for same-txid/different-witness results.

## `PackageMempoolAcceptResult`

Reviewed behavior:

- Stores package-level validation state.
- Stores a map from wtxid to finished `MempoolAcceptResult`.
- Some transaction results may be missing if validation stopped early.
- Package-wide errors can return an empty result map.

## `ATMPArgs`

Reviewed behavior:

`ATMPArgs` carries transaction-acceptance settings including:

- Chain parameters.
- Accept time.
- Whether mempool limits may be bypassed.
- Coins to uncache if acceptance fails.
- Whether this is test-only acceptance.
- Whether replacement is allowed.
- Whether the transaction is part of a package submission.
- Whether package feerates are used.

The reviewed code includes helpers for single-transaction acceptance, package test acceptance, child-with-parents package acceptance, and single-transaction acceptance inside package handling.

## `Workspace`

`Workspace` stores intermediate state for one transaction during mempool acceptance.

Reviewed fields include:

- Direct mempool conflicts.
- Conflict iterators.
- All entries that would be replaced.
- Mempool ancestors.
- Constructed `CTxMemPoolEntry`.
- Replaced transaction references.
- Virtual size.
- Base fees.
- Modified fees.
- Conflicting fees and size.
- Package feerate.
- Transaction reference and txid.
- Validation state.
- Precomputed transaction data for input checks.

## `PreChecks`

`PreChecks` runs policy checks before expensive input checks.

Reviewed behavior:

- Calls `CheckTransaction`.
- Rejects coinbase transactions submitted as loose transactions.
- Applies standardness checks when standard transactions are required.
- Rejects transactions smaller than the minimum standard non-witness size.
- Requires locktime-finality for the next block.
- Rejects exact duplicates already in the mempool.
- Rejects same-txid/different-wtxid conflicts already in the mempool.
- Detects conflicts with in-memory transactions.
- Applies replacement permission checks.
- Looks up transaction inputs through the mempool-backed coins view.
- Rejects already-known or missing/spent inputs.
- Calculates BIP68 lock points at the current tip.
- Requires sequence locks to be satisfied for the next block.
- Calls `Consensus::CheckTxInputs` using next-block height.
- Applies input standardness and witness standardness checks when required.
- Calculates operation cost.
- Applies fee deltas from `PrioritiseTransaction`.
- Tracks whether the transaction spends a coinbase output.
- Constructs a `CTxMemPoolEntry`.
- Rejects transactions over standard operation-cost limits.
- Enforces minimum relay fee except for allowed bypass cases.
- Enforces mempool minimum fee when package-feerate logic does not apply.
- Calculates mempool ancestors and applies ancestor/descendant limits.
- Applies single-transaction v3 checks.
- Rejects transactions that spend outputs they would replace.

## `ReplacementChecks`

`ReplacementChecks` handles replacement-policy checks when a transaction conflicts with existing mempool entries.

Reviewed behavior:

- Requires the replacement to have a higher feerate than its direct conflicts.
- Finds all conflicting entries including descendants.
- Enforces no-new-unconfirmed-inputs replacement behavior.
- Sums fees and size of conflicting entries.
- Requires the replacement to pay enough fees for replacement and relay.

## `PackageMempoolChecks`

Reviewed behavior:

- Requires package transactions not already in the mempool.
- Calls `CTxMemPool::CheckPackageLimits`.
- Returns a package-wide policy error if package mempool limits are exceeded.

## `PolicyScriptChecks`

Reviewed behavior:

- Runs after cheaper policy checks.
- Uses `STANDARD_SCRIPT_VERIFY_FLAGS`.
- Calls `CheckInputScripts`.
- Detects the witness-stripped case for transactions that fail standard witness checks but may otherwise be valid.

## `ConsensusScriptChecks`

Reviewed behavior:

- Re-runs input checks using current block script flags.
- Uses `GetBlockScriptFlags` from the active chain tip.
- Uses `CheckInputsFromMempoolAndCache`.
- Treats failure after policy input success as a serious internal bug path.

## `Finalize`

Reviewed behavior:

- Removes conflicting transactions from the mempool.
- Records replaced transactions.
- Adds the accepted transaction with `m_pool.addUnchecked`.
- Applies mempool size limiting unless this is package submission or bypass-limits mode.
- Returns reconsiderable fee failure if the transaction is trimmed after insertion because the mempool is full.

## `AcceptSingleTransaction`

Reviewed high-level flow:

```text
AcceptSingleTransaction
  -> PreChecks
  -> ReplacementChecks, if replacement applies
  -> PolicyScriptChecks
  -> ConsensusScriptChecks
  -> Finalize, unless test-accept
  -> TransactionAddedToMempool notification
```

## `SubmitPackage`

Reviewed behavior:

- Assumes transactions have already been successfully validated as a package.
- Runs consensus input checks for each transaction.
- Recalculates mempool ancestors after prior package transactions have been submitted.
- Calls `Finalize` for each transaction.
- Builds success results with effective feerate information.
- Emits `TransactionAddedToMempool` notifications.

## `AcceptMultipleTransactions`

Reviewed behavior from this pass:

- Runs package-aware validation for multiple transactions.
- Performs package v3 checks.
- Calculates total package virtual size and modified fees.
- Uses aggregate package feerate when package feerates are enabled.
- Applies package ancestor/descendant limits when more than one transaction is being evaluated.
- Runs policy input checks for each workspace.
- Supports test-accept results without insertion.
- Calls `SubmitPackage` after successful validation.

## `AcceptSubPackage`

Reviewed behavior:

- Calls `AcceptMultipleTransactions` for subpackages larger than one transaction.
- Calls `AcceptSingleTransaction` with adjusted package arguments for one-transaction subpackages.
- Calls `CleanupTemporaryCoins` after evaluation.

## `AcceptPackage`

Reviewed behavior from this pass:

- Requires the package to be well-formed and sorted.
- Requires the package to be one child with all unconfirmed parents.
- Checks that child inputs refer either to prior package transactions or confirmed UTXOs.
- De-duplicates package transactions already in the mempool.
- Handles same-txid/different-wtxid package cases by using the mempool transaction in the result path.
- Builds a set of transactions for package evaluation.
- Uses subpackage evaluation for package acceptance.

## `CleanupTemporaryCoins`

Reviewed behavior:

- Removes temporary package coins from the mempool-backed view.
- Removes cached mempool coins that may have changed because of submission or replacement.
- Keeps confirmed coins because the chainstate has not changed while `cs_main` is held.

## `CheckInputScripts`

Reviewed behavior relevant to mempool acceptance:

- Returns true for coinbase transactions.
- Checks the input execution cache first.
- Initializes spent-output data for signature checking when needed.
- Runs per-input checks.
- Distinguishes some non-mandatory standard-check failures from mandatory consensus failures.
- Caches successful full input checks when requested.

## Relationship to mempool and reorg docs

Mempool acceptance uses the mempool structures documented in:

- `CTxMemPool`
- `CTxMemPoolEntry`
- `CCoinsViewMemPool`

During reorg processing, `MaybeUpdateMempoolForReorg` re-adds eligible transactions from blocks that left the active chain through `AcceptToMemoryPool`, which uses this acceptance pipeline.

## BitcoinII-specific notes

This reviewed code shows BitcoinII naming and fork metadata. This pass has not identified BitcoinII-specific transaction acceptance behavior beyond inherited Bitcoin Core-derived logic and configured parameters.

## Related MoreBC2 pages

- [Mempool flow](../../architecture/mempool-flow.md)
- [Mempool source](txmempool.md)
- [Mempool entry](mempool-entry.md)
- [Source atlas: validation.cpp](validation-cpp.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)

## Open questions

- Locate and review the exact `ChainstateManager::ProcessTransaction` implementation body.
- Review package acceptance code in a second pass to capture full subpackage behavior.
- Review replacement-policy helper functions and policy documentation.
- Review functional tests for mempool acceptance.
- Review RPC caller paths such as `testmempoolaccept` and transaction broadcast RPCs.
- Confirm whether `v29.1.0` differs from current `main` for these paths before upgrading status.

## Sources

- Current observed `main` `src/validation.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.cpp
- Current observed `main` `src/validation.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.h
- Current observed `main` `src/node/transaction.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/transaction.cpp
- Current observed `main` `src/txmempool.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/txmempool.h
- Current observed `main` `src/txmempool.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/txmempool.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a transaction acceptance audit with public wrapper and broadcast caller notes. Replacement policy, RPC paths, tests, exact `ProcessTransaction` implementation, and release-versus-main comparison still need separate review.
