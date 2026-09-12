# Block template assembly

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Summary

This page covers candidate block assembly centered on BitcoinII Core `v31.1.0` `src/node/miner.cpp` / `miner.h` and MiniMiner helpers.

The broad Bitcoin-style `BlockAssembler` package-selection structure remains useful, but current BC2 has an important v31-specific rule: **candidate block time can affect required work under ShockWave**, so template code must recalculate `nBits` when time changes.

## Main template flow

The reviewed `CreateNewBlock` structure remains:

1. reset block-assembly counters;
2. create a template and dummy coinbase;
3. choose next height/chain context;
4. compute version and time/locktime context;
5. select eligible mempool transactions;
6. construct the real coinbase/reward;
7. generate commitments;
8. fill previous hash, candidate time, required work and nonce;
9. optionally run block-validity checks;
10. return the candidate template.

`BlockAssembler` tracks weight, operation cost, fees, selected transactions, and target height. Ancestor-aware package selection remains the reviewed transaction-selection model.

## v31 candidate-time / difficulty coupling

`UpdateTime` can change a candidate header timestamp. Under ShockWave, that can change required work.

Current mining code therefore recalculates:

```text
pblock->nBits = GetNextWorkRequired(pindexPrev, pblock, consensusParams)
```

when candidate time changes in the relevant path.

`CreateNewBlock` likewise obtains candidate difficulty through the production `GetNextWorkRequired()` path.

A miner, pool, proxy, or template implementation that rewrites `nTime` while retaining stale `nBits` can construct an invalid candidate.

## Transaction/package selection

The v31 regression pass did not identify a BC2-specific rewrite of the surrounding package-selection machinery for:

- ancestor-aware feerate ordering;
- package assembly;
- block weight / operation-cost limits;
- fee minimums;
- ancestor-before-descendant ordering;
- MiniMiner fee/ordering simulation.

That structural review should not be interpreted as proof of byte-for-byte upstream equivalence.

## MiniMiner

`MiniMiner` is a local simulation/helper for fee and transaction ordering calculations. It is not a proof-of-work miner or a block producer.

No ShockWave-specific change to its fee-selection role was identified in the current regression review.

## Core RPC / Stratum boundary

Core block-template assembly is exposed to mining infrastructure through RPC surfaces such as `getblocktemplate`. Public mining pools separately expose Stratum endpoints to miners.

MoreBC2 has current public configuration evidence for BC2 pool endpoints, but no current end-to-end Stratum subscribe/authorize/share-submission qualification. Pool software therefore should not be considered BC2-compatible merely because it supports Bitcoin-style SHA-256d work.

See [Mining RPC](rpc-mining.md) and [Mining overview](../../mining/mining-overview.md).

## Runtime status

The September 11 isolated `v31.1.0` regtest test successfully used `generatetoaddress` to create disposable test funds, establishing one local generation path.

That test did **not** run `getblocktemplate`, did not vary candidate time to observe ShockWave `nBits` changes, and did not submit mining work to a public pool or mainnet.

Useful future vectors remain:

- generate templates across normal and stall-recovery candidate times;
- compare template `bits` with direct production next-work calculation;
- exercise stale-time refresh behavior;
- qualify pool/proxy software that mutates candidate time.

## Operational implication

External mining infrastructure should consume current BitcoinII Core template output or reproduce v31 candidate-time/difficulty behavior exactly.

The old model “reuse tip difficulty until a 2016-block retarget boundary” is not valid for post-`57750` BitcoinII mainnet.

## Related pages

- [ShockWave v31](shockwave-v31.md)
- [pow.cpp](pow-cpp.md)
- [Mining RPC](rpc-mining.md)
- [Mining overview](../../mining/mining-overview.md)
- [v31 mining regression audit](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Windows v31 PSBT/regtest validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Primary sources

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

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` template/mining source plus September 11 isolated local-generation runtime evidence  
**Notes:** Candidate-time-triggered work recalculation is source-backed and local regtest generation is runtime-observed. Controlled GBT/ShockWave vectors and public Stratum mining remain open.
