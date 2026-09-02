# `MemPoolAccept` in `src/validation.cpp`

**Category:** Documentation
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Purpose

`MemPoolAccept` is the BitcoinII Core path for deciding whether transactions may enter the mempool.

Most of the acceptance architecture remains inherited Bitcoin-style policy/consensus plumbing. BitcoinII Core `v31.1.0`, however, adds replay-protection behavior that materially affects signature validation at the next-block boundary.

## Main flow

The previously reviewed high-level path remains useful:

```text
AcceptSingleTransaction
  -> PreChecks
  -> ReplacementChecks, when needed
  -> PolicyScriptChecks
  -> ConsensusScriptChecks
  -> Finalize, unless test-accept
  -> TransactionAddedToMempool notification
```

Package handling still builds on `AcceptMultipleTransactions`, `AcceptPackage`, `AcceptSubPackage`, `SubmitPackage`, and related ancestor/descendant and package-feerate checks.

## v31 next-block replay domain

During mempool acceptance, `validation.cpp` sets:

```text
ws.m_precomputed_txdata.m_sighash_fork_id =
    consensus.SighashForkId(active_chain_height + 1)
```

This means mempool signatures are validated for the **next block's** signature domain.

At the activation boundary, the current tip can still be below height `57750` while a submitted transaction must already be valid under the post-activation fork id `0x01324342` because the transaction could be mined in block `57750`.

That behavior closes a boundary case where a legacy-domain transaction could otherwise enter the mempool immediately before activation and become invalid when mined.

## Activation-boundary mempool clear

When chain connection reaches the point where the next block height equals `nReplayProtectionHeight`, BitcoinII clears the mempool before replay-protection activation.

This deliberately removes transactions accepted under the old signature domain before the new domain becomes mandatory.

For historical/operator interpretation, a mempool reset at that activation boundary was intentional v31 protocol behavior, not by itself evidence of corruption or a node failure.

## Validation-cache separation

The v31 script-validation cache key includes `txdata.m_sighash_fork_id`.

That prevents a script result verified under one replay domain from being reused under another domain.

This is an important correctness change because transaction bytes alone do not identify the signature-hash domain: the fork id is contextual consensus data.

## Existing acceptance behavior that remains structurally useful

The earlier MoreBC2 review remains broadly applicable to:

- context-free transaction checks;
- standardness policy;
- finality and sequence locks;
- coin/input lookup;
- fee and minimum-relay policy;
- ancestor/descendant limits;
- replacement policy;
- package validation;
- policy versus consensus script checks;
- mempool insertion and trimming;
- reorg re-addition through the normal acceptance path.

This pass did not identify a BitcoinII-specific rewrite of the ordinary package-feerate or ancestor-scoring model.

## Why this matters for services

A service that pre-validates withdrawals or deposits using a Bitcoin-derived transaction checker must use the same BC2 replay-domain context as the node.

A locally cached "signature valid" result cannot safely be treated as height-independent across the activation domain.

## Runtime status

MoreBC2 has not yet executed an isolated activation-boundary mempool test on v31.

Useful follow-up tests:

- legacy-domain signature submitted before activation;
- post-fork-domain signature submitted before activation for the activation block;
- mempool contents across activation;
- validation-cache separation across fork-id changes;
- raw-RPC and wallet-produced transactions through the same mempool path.

## Related pages

- [Replay protection v31](replay-protection-v31.md)
- [v31 wallet/mempool/mining regression audit](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Mempool source](txmempool.md)
- [Validation.cpp](validation-cpp.md)

## Sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/validation.cpp`
- `src/validation.h`
- `src/consensus/params.h`
- `src/script/interpreter.h`
- `src/script/interpreter.cpp`
- `src/node/transaction.cpp`
- `src/txmempool.cpp`
- `src/txmempool.h`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** BitcoinII Core `v31.1.0`
**Notes:** Next-block fork-domain validation, activation-boundary mempool clearing and validation-cache separation are source-backed. Runtime boundary vectors remain open.