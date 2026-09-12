# `src/kernel/mempool_entry.h`

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Purpose

`src/kernel/mempool_entry.h` defines the per-transaction metadata stored by BitcoinII Core's mempool, principally through `CTxMemPoolEntry`.

The reviewed `v31.1.0` structure remains broadly Bitcoin-style. BitcoinII-specific replay-protection behavior is applied during admission/script validation and cache separation rather than by adding a replay-domain field to `CTxMemPoolEntry` itself.

## What an entry tracks

Reviewed entry state includes:

- transaction reference;
- direct mempool parents/children;
- original and modified fee;
- transaction weight and memory usage;
- local entry time and chain height at admission;
- whether the transaction spends coinbase output;
- signature-operation cost;
- cached sequence-lock `LockPoints`;
- ancestor/descendant counts, sizes, and modified-fee totals;
- entry sequence / relay-recency state.

These cached values support policy, mining/template selection, graph operations, replacement/eviction behavior, and reorg repair.

## `LockPoints`

`LockPoints` caches height, MedianTimePast-related time, and the highest relevant input block used for relative-locktime evaluation.

After a reorg, cached lock points can remain usable only when the new active chain still has the relevant ancestry; otherwise higher-level mempool/reorg logic repairs or removes affected entries.

## Ancestor/descendant accounting

`CTxMemPoolEntry` caches package-level state used by ancestor-aware policy and mining selection.

This is relevant to current block-template assembly, which still uses ancestor-aware package scoring in the reviewed v31 path. ShockWave changes required block work, not this per-entry fee/graph data structure.

See [Block-template assembly](miner.md).

## Modified fee and local policy

The entry keeps original fee and a local modified-fee value used by prioritization/template policy. Local fee deltas do not rewrite the transaction or alter BitcoinII consensus validity.

## Notification helper structs

The header also defines transaction-info structures used for mempool notifications/removals/additions, carrying fields such as transaction reference, fee, virtual size, admission height, and package/current-chain-state context.

## v31 replay boundary

Mempool admission on current BitcoinII validates signatures for the **next block's** replay domain and clears legacy-domain state at the activation boundary. Validation-cache keys are also separated by fork id.

Those behaviors live in the surrounding validation/script paths. A `CTxMemPoolEntry` existing in memory should therefore be understood as state produced after the relevant admission checks, not as the implementation of replay protection itself.

See [Mempool accept](mempool-accept.md) and [Replay protection v31](replay-protection-v31.md).

## Runtime boundary

The September 11 isolated `v31.1.0` regtest PSBT test successfully inserted a disposable signed transaction into the local mempool and confirmed it with `getmempoolentry`.

That runtime result corroborates ordinary current-release entry creation/inspection in the documented zero-peer environment. It did not instrument every internal field or the mainnet replay activation transition.

## Related pages

- [Mempool accept](mempool-accept.md)
- [Mempool source](txmempool.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Block-template assembly](miner.md)
- [Disconnected transactions](disconnected-transactions.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

- Map replacement/eviction and fee-estimator consumers in more detail if operator guidance needs them.
- Build a deterministic package fixture if ancestor/descendant behavior needs direct runtime examples.
- Keep the current regtest mempool observation distinct from mainnet replay-boundary testing.

## Primary sources

- `v31.1.0/src/kernel/mempool_entry.h`
- `v31.1.0/src/txmempool.h`
- `v31.1.0/src/txmempool.cpp`
- `v31.1.0/src/validation.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` mempool entry/source review plus September 11 local-mempool runtime evidence  
**Notes:** Entry structure is current and ordinary entry creation was runtime-corroborated. Full internal-field instrumentation, package/replacement tests, and mainnet replay-boundary behavior remain separate work.
