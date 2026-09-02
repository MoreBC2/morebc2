# Block template assembly

**Category:** Documentation
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Summary

This page covers candidate block assembly centered on `src/node/miner.cpp` / `miner.h` and related MiniMiner helpers.

The broad Bitcoin-style `BlockAssembler` and package-selection structure remains useful in BitcoinII Core `v31.1.0`. The important BitcoinII-specific change is that **candidate block time can now affect required work under ShockWave**, so template code must recalculate `nBits` when time changes.

## Main template flow

The reviewed `CreateNewBlock` structure remains:

1. reset block-assembly counters;
2. create a template and dummy coinbase;
3. lock/read chain state and choose next height;
4. compute block version and time/locktime context;
5. select mempool transactions;
6. construct the real coinbase and reward;
7. generate commitments;
8. fill previous hash, candidate time, difficulty bits and nonce;
9. optionally run block-validity checks;
10. return the template.

`BlockAssembler` still tracks block weight, operation cost, fee totals, selected transactions and target height. Ancestor-aware package selection remains the core transaction-selection model.

## v31 candidate-time / difficulty coupling

Before ShockWave, Bitcoin-style mainnet logic normally allowed code to think of difficulty as fixed between long retarget boundaries.

That assumption is unsafe under current BitcoinII.

`UpdateTime` can change a candidate header's timestamp. In v31, `src/node/miner.cpp` explicitly notes that updating candidate time can change required work under ShockWave and recalculates:

```text
pblock->nBits = GetNextWorkRequired(pindexPrev, pblock, consensusParams)
```

when the candidate time changes (and in the existing min-difficulty cases).

`CreateNewBlock` likewise obtains the candidate difficulty through the production `GetNextWorkRequired()` path.

## Why candidate time matters

ShockWave includes timestamp-aware behavior and emergency stall recovery. As a result, the candidate header itself can participate in determining the required next target.

Mining/template software that changes `nTime` while retaining stale `nBits` can therefore construct an invalid candidate.

This is also why MoreBC2 should not describe current BitcoinII mining as simply "reuse the tip difficulty until a retarget block."

## RPC/server context

The v31 RPC server helper path similarly constructs next-block context by:

1. creating a candidate next header;
2. calling `UpdateTime`;
3. calling `GetNextWorkRequired` using that actual candidate header;
4. building synthetic next-block context from the result.

The same rule applies broadly: code that needs next-block consensus context should derive work from the candidate header, not assume the previous block's compact target remains correct.

## Transaction/package selection

This pass did not identify a BitcoinII-specific rewrite of the normal template-selection machinery around:

- ancestor-aware feerate ordering;
- package assembly;
- weight and operation-cost limits;
- fee minimums;
- ancestor-before-descendant ordering;
- MiniMiner fee/ordering simulation.

Those earlier MoreBC2 descriptions remain structurally useful.

## MiniMiner

`MiniMiner` remains a local simulation/helper for fee and transaction ordering calculations, not a proof-of-work miner or block producer.

No ShockWave-specific rewrite of MiniMiner's fee-selection role was identified in this regression pass.

## Operational implication

External miners/pools consuming block templates should use current BitcoinII Core template/RPC output or independently reproduce v31 candidate-time and difficulty behavior exactly.

A Bitcoin-derived template implementation that assumes time and difficulty are decoupled between 2016-block retargets is not a safe model for post-activation BitcoinII.

## Runtime status

MoreBC2 has not yet executed a controlled template test showing candidate-time changes and resulting ShockWave `nBits` changes.

Useful follow-up work:

- generate templates across normal and stall-recovery candidate times;
- confirm template/RPC `bits` matches direct `GetNextWorkRequired` calculation;
- test stale-time refresh behavior;
- inspect pool/miner software assumptions where Bitcoin-compatible template handling is claimed.

## Related pages

- [ShockWave v31](shockwave-v31.md)
- [v31 wallet/mempool/mining regression audit](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Mining overview](../../mining/mining-overview.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)
- [Mining RPC](rpc-mining.md)

## Sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/node/miner.cpp`
- `src/node/miner.h`
- `src/node/mini_miner.cpp`
- `src/node/mini_miner.h`
- `src/pow.cpp`
- `src/rpc/server_util.cpp`
- `src/validation.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** BitcoinII Core `v31.1.0`
**Notes:** Candidate-time-triggered work recalculation and the template's use of production `GetNextWorkRequired()` are source-backed. Controlled runtime template vectors remain open.