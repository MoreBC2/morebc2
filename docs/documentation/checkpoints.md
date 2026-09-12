# Checkpoints

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII Core `v31.1.0` mainnet chain parameters include a hard-coded checkpoint table in `src/kernel/chainparams.cpp`.

This page records the current release-pinned checkpoint set and keeps checkpoint claims separate from stronger ideas such as finality or protection against all reorganizations.

## Current source location

Release-pinned source:

- `Bitcoin-II/BitcoinII-Core`
- tag `v31.1.0`
- `src/kernel/chainparams.cpp`

## Current mainnet checkpoint heights

The `v31.1.0` mainnet checkpoint table contains **23 entries**:

`50`, `250`, `260`, `270`, `280`, `290`, `425`, `500`, `750`, `1000`, `1250`, `1500`, `1750`, `1900`, `2000`, `2016`, `10000`, `15000`, `20000`, `25000`, `30000`, `49000`, `57752`.

The newest checkpoint in the current source is:

- height: `57752`
- block hash: `000000000000000013ceffe797280c57f75a5b9f1d9e70c3503584058c322576`

The checkpoint immediately before that is height `49000`.

## Relationship to v31 activation

The principal v31 BitcoinII-specific mainnet rules activate at height `57750`:

- ShockWave difficulty adjustment;
- consensus data restrictions;
- replay protection.

The current checkpoint at `57752` is therefore just after those activation heights. Its presence should not be interpreted as the activation mechanism itself; the consensus activation heights are separately defined in chain parameters.

## What checkpoints do not mean

MoreBC2 should not describe a checkpoint as:

- deterministic transaction finality;
- a guarantee that a later reorganization is impossible;
- a replacement for proof-of-work or accumulated-chainwork selection;
- an exchange confirmation requirement;
- evidence that every node or third-party service is synchronized to that point.

Checkpoint data is part of the node's historical chain-parameter set. Current chain selection and validation still rely on the release's consensus and accumulated-work rules.

## Versioning caution

Checkpoint tables are release-specific source data.

When BitcoinII Core publishes a newer release, recheck the current table rather than copying the `v31.1.0` list forward. Older MoreBC2 checkpoint lists that stopped at height `30000` were incomplete relative to `v31.1.0`.

## Related pages

- [Network specifications](network-specifications.md)
- [Consensus overview](consensus-overview.md)
- [Architecture consensus model](../architecture/consensus-model.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0`, `src/kernel/chainparams.cpp`  
**Notes:** The current mainnet checkpoint heights and latest checkpoint hash are release-pinned and source-confirmed. This page does not attempt a full internal audit of every checkpoint call site or use checkpoint presence as a finality claim.
