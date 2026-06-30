# `MemPoolAccept` in `src/validation.cpp`

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

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
- Script checking before unconfirmed transactions are stored.
- Reorg transaction re-addition.

## Main reviewed entry points

Reviewed methods include:

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

The reviewed code includes a `SingleInPackageAccept` helper that adjusts arguments for one transaction inside package handling.

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
- Precomputed transaction data for script checks.

## `PreChecks`

`PreChecks` runs policy checks before expensive script checks.

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
- Calculates sigop cost.
- Applies fee deltas from `PrioritiseTransaction`.
- Tracks whether the transaction spends a coinbase output.
- Constructs a `CTxMemPoolEntry`.
- Rejects transactions over standard sigop-cost limits.
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

- Re-runs script checks using current block script flags.
- Uses `GetBlockScriptFlags` from the active chain tip.
- Uses `CheckInputsFromMempoolAndCache`.
- Treats failure after policy script success as a serious internal bug path.

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
- Runs consensus script checks for each transaction.
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
- Runs policy script checks for each workspace.
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
- Checks the script execution cache first.
- Initializes spent-output data for signature checking when needed.
- Runs per-input script checks.
- Distinguishes some non-mandatory standard-script failures from mandatory consensus failures.
- Caches successful full script checks when requested.

## Relationship to mempool and reorg docs

Mempool acceptance uses the mempool structures documented in:

- `CTxMemPool`
- `CTxMemPoolEntry`
- `CCoinsViewMemPool`

During reorg processing, `MaybeUpdateMempoolForReorg` re-adds eligible disconnected transactions through `AcceptToMemoryPool`, which uses this acceptance pipeline.

## BitcoinII-specific notes

This reviewed code shows BitcoinII naming and fork metadata. This pass has not identified BitcoinII-specific transaction acceptance behavior beyond inherited Bitcoin Core-derived logic and configured parameters.

## Related MoreBC2 pages

- [Mempool flow](../../architecture/mempool-flow.md)
- [Mempool source](txmempool.md)
- [Mempool entry](mempool-entry.md)
- [Source atlas: validation.cpp](validation-cpp.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)

## Open questions

- Review public `AcceptToMemoryPool` wrappers and caller paths.
- Review `validation.h` declarations for transaction acceptance APIs.
- Review package acceptance code in a second pass to capture full subpackage behavior.
- Review replacement-policy helper functions and policy documentation.
- Review functional tests for mempool acceptance.

## Sources

- `src/validation.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/validation.cpp
- `src/validation.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/validation.h
- `src/txmempool.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/txmempool.h
- `src/txmempool.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/txmempool.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass transaction acceptance audit. Replacement policy, public caller paths, and tests still need separate review.
