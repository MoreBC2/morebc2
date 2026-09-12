# `src/txmempool.h` and `src/txmempool.cpp`

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Purpose

These files define BitcoinII Core's in-memory transaction pool: transaction storage, indexes, graph relationships, fee/prioritization state, eviction/expiry, and reorg repair.

The reviewed `v31.1.0` container/graph structure remains broadly Bitcoin-style. Current BitcoinII-specific replay behavior is applied by the surrounding admission/validation path and activation handling, not by replacing the basic `CTxMemPool` data structure.

## Core structure

`CTxMemPool` tracks transactions that passed the node's current admission rules and may be candidates for future blocks.

Reviewed multi-index/order state includes:

- txid / wtxid lookup;
- entry-time ordering;
- ancestor/descendant feerate ordering;
- parent/child graph state;
- modified-fee/prioritization state;
- spent-prevout lookup;
- local memory/accounting state.

See [`mempool_entry.h`](mempool-entry.md) for per-transaction cached metadata.

## Ancestor / descendant handling

The mempool tracks direct links plus cached package-level counts/sizes/fees. Reviewed helpers calculate ancestor/descendant limits, update graph state when transactions are added/removed, and repair cached relationships after reorg-related readdition.

This structure supports the ancestor-aware transaction selection used by block-template assembly.

## Reorg handling

Current reviewed flow includes:

```text
DisconnectTip
  -> DisconnectedBlockTransactions::AddTransactionsFromBlock

ConnectTip
  -> mempool.removeForBlock
  -> disconnected queue removes transactions confirmed again

MaybeUpdateMempoolForReorg
  -> reaccept eligible disconnected transactions
  -> UpdateTransactionsFromBlock
  -> remove transactions invalid/non-final/immature on new chain
  -> LimitMempoolSize
```

The mempool can therefore be temporarily in a special reorg-update state while higher-level validation restores consistency.

## Admission boundary and v31 replay protection

The old wording that no BitcoinII-specific mempool behavior had been identified was too broad.

The correct v31 distinction is:

- `txmempool.*` remains structurally Bitcoin-style in the reviewed container/graph operations;
- `validation.cpp` / `MemPoolAccept` validates transactions using the **next block's** BC2 replay domain;
- at the mainnet replay activation transition, legacy-domain mempool state is cleared;
- script-validation cache keys include the sighash fork id;
- the accepted transaction is then represented in the ordinary mempool structures documented here.

See [Mempool accept](mempool-accept.md) and [Replay protection v31](replay-protection-v31.md).

## Policy versus consensus

The mempool applies local policy in addition to consensus-validity checks. Examples in the reviewed architecture include fee limits, standardness, graph/package constraints, expiry, rolling minimum fee, and replacement-related state.

A policy-rejected transaction is not automatically consensus-invalid, while a transaction violating current BC2 consensus rules cannot be made block-valid by bypassing mempool policy.

## Runtime evidence — 2026-09-11

The isolated zero-peer `v31.1.0` regtest PSBT test exercised:

- `testmempoolaccept` -> allowed;
- local-only `sendrawtransaction`;
- `getmempoolentry`;
- `getmempoolinfo`.

That confirms ordinary current-release local mempool insertion/inspection for the disposable transaction. It did not test mainnet replay activation, package limits, replacement, eviction, persistence, or a reorg.

## Mining relationship

Block-template assembly consumes mempool/package state for transaction selection. ShockWave changes the candidate block's required work; it does not replace the ancestor/descendant fee/graph machinery reviewed here.

Local `prioritisetransaction` fee deltas likewise affect template policy, not transaction consensus.

## Related pages

- [Mempool entry](mempool-entry.md)
- [Mempool accept](mempool-accept.md)
- [Mempool RPC](rpc-mempool.md)
- [Disconnected transactions](disconnected-transactions.md)
- [Block-template assembly](miner.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

- Runtime-test package/replacement/eviction behavior with disposable fixtures where useful.
- Review current mempool persistence defaults/path if operator docs need it.
- Create an isolated reorg fixture for direct graph-repair observation.
- Keep replay activation testing separate from ordinary regtest mempool coverage.

## Primary sources

- `v31.1.0/src/txmempool.h`
- `v31.1.0/src/txmempool.cpp`
- `v31.1.0/src/kernel/mempool_entry.h`
- `v31.1.0/src/validation.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` mempool/validation source plus September 11 isolated local-mempool runtime record  
**Notes:** Container/graph structure and ordinary local insertion are current. Replay activation, packages, replacement, eviction, persistence, and reorg runtime scenarios remain separate work.
