# Mining overview

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

BitcoinII (BC2) uses proof-of-work mining. Miners search for a block-header hash below the target encoded by the candidate block's `nBits` value.

BitcoinII Core `v31.1.0` keeps double-SHA256 block-header hashing and a 10-minute target spacing, but current mainnet difficulty is governed by **ShockWave** from height `57750`. That changes an important mining assumption inherited from ordinary Bitcoin-style 2016-block retargeting: under ShockWave, candidate header time can affect the next required target, so template software must not update time while blindly retaining stale `nBits`.

This page separates three evidence layers:

1. release-pinned consensus/template behavior;
2. source-reviewed Core mining RPC behavior;
3. dated public pool, Stratum, payout, and operational observations.

## Current v31 proof-of-work behavior

Reviewed `v31.1.0` source establishes:

- target block spacing: 10 minutes;
- block-header hashing path: double-SHA256;
- mainnet minimum-difficulty blocks: disabled;
- ShockWave activation height: `57750`;
- post-activation difficulty: calculated for each candidate block through `GetNextWorkRequired()`;
- normal rolling baseline: 25 sampled blocks / 24 completed intervals using MedianTimePast endpoints;
- additional short-horizon response using the six most recent completed intervals;
- normal target movement bounded relative to the preceding target, subject to `powLimit`;
- timestamp safeguards that prevent inappropriate easing from future-skewed header time;
- emergency stall recovery that becomes eligible after 30 minutes of adjusted stall time and can reduce difficulty further in five-minute steps under the source-defined limits;
- chain selection remains based on accumulated chain work.

The inherited 14-day / 2016-block parameters remain in chain parameters for historical pre-activation behavior and inherited helpers. They are not the current post-`57750` mainnet schedule.

See [ShockWave v31](../developers/source-atlas/shockwave-v31.md) and [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md) for the source-reviewed detail and its evidence boundary.

## Candidate block templates under ShockWave

`BlockAssembler` remains the central candidate-template builder. The current reviewed structure still covers:

- selecting the next height and previous block;
- ancestor-aware mempool package selection;
- block weight and operation-cost limits;
- coinbase construction and reward accounting;
- commitments, transaction ordering, header fields, and optional validity checks.

The important v31 mining change is **candidate-time / difficulty coupling**.

When `UpdateTime` changes a candidate block's timestamp, current mining code recalculates:

```text
nBits = GetNextWorkRequired(previous_block, candidate_header, consensus_params)
```

because ShockWave's timestamp-aware and emergency-recovery paths can make required work depend on that actual candidate header.

Operationally, a miner, pool, proxy, or block-template implementation that rewrites `nTime` while assuming the previous `nBits` remains valid can produce an invalid candidate. Bitcoin-derived mining software therefore should not be called BC2-compatible solely because it understands SHA-256d or Bitcoin-style block headers.

See [Block-template assembly](../developers/source-atlas/miner.md) and the [v31 mining regression audit](../verification/v31-wallet-mempool-mining-regression-2026-09-02.md).

## Core mining RPC versus pool Stratum

These are different layers.

### BitcoinII Core mining/template RPC

Source-reviewed mining RPC surfaces include:

- `getblocktemplate`
- `submitblock`
- `submitheader`
- `getmininginfo`
- `getnetworkhashps`
- `prioritisetransaction`
- `getprioritisedtransactions`

`getblocktemplate` is the Core-side interface for constructing/serving BIP22/BIP23-style work to compatible mining infrastructure. `submitblock` and `submitheader` feed completed block/header data into validation.

Current MoreBC2 evidence for these commands is source review, not a complete `v31.1.0` runtime mining regression. The September Windows v31 node test did not execute these mining RPCs. `submitblock` and `submitheader` should remain advanced/operator-only documentation until a dedicated isolated workflow is recorded.

### Pool Stratum

Public pools expose separate Stratum services for miners. The September 12 ecosystem audit recorded published BC2 hostnames/ports, but MoreBC2 did **not** perform a current BC2 Stratum subscribe/authorize/share-submission test.

A documented endpoint therefore means **configuration observed**, not:

- handshake verified;
- miner authorized;
- correct share difficulty assigned;
- shares accepted;
- current block templates validated;
- found blocks attributed correctly;
- payouts verified.

Pool share difficulty should also not be confused with the network proof-of-work target. A pool can ask miners to submit easier accounting shares while only hashes satisfying the network target can produce a valid BC2 block.

## Current pool and Stratum observations

The table below summarizes the 2026-09-12 pool audit. It is operational evidence, not an endorsement.

| Service | Mode(s) observed | Published connection/configuration | Published fee / payout information | Current evidence boundary |
|---|---|---|---|---|
| **1Miner.Net** | PPLNS, SOLO | PPLNS: `1miner.net:4331`-`:4334`; SOLO: `1miner.net:4431`-`:4434`; EU and SGP host families published with the same port ranges | `1%` fee; minimum payout `0.01 BC2` shown on checked BC2 pages | US-TX reported operational; EU-FR and SGP reported unreachable during the check. No MoreBC2 share/payout test. |
| **CapsPool.io** | SOLO, PPS | General ASIC `stratum.capspool.io:3333`; rental/high-difficulty `:4334`; Bitaxe `:3337`; PPS `:3335`; EU hostname family published | `1%` shown for SOLO and PPS; PPS page uses hourly-payout language | Configuration only. No direct share submission, payout timing, PPS accounting, or full endpoint validation. |
| **BCMonster** | BC2 support documented | Public API documentation explicitly lists Bitcoin II / `bitcoinii` / `bc2` and documents pool-info fields including stratum host/port | API schema includes fee/minimum-payout fields | Support/API documentation evidence only; current miner connectivity and payout behavior untested. |
| **MiningPoolStats** | Aggregator | Pool-discovery/statistics resource linked by the BitcoinII project website | Not treated as a payout authority | Useful for discovery/cross-checking only; does not prove a listed pool is reachable, synced, solvent, or paying correctly. |

Older public material names additional candidate pools. MoreBC2 should not promote detailed connection or payout data for those candidates without a fresh direct check.

See [Ecosystem mining pools](../ecosystem/mining-pools.md) for source links and the detailed recheck checklist.

## Pool payout models and what is actually verified

Current public evidence includes these pool-side labels:

- **PPLNS** at 1Miner.Net;
- **SOLO** at 1Miner.Net and CapsPool;
- **PPS** at CapsPool.

At a high level, these labels describe different operator accounting models: PPLNS generally allocates rewards according to qualifying recent shares, SOLO generally ties a miner's payout to a block found through that miner's work, and PPS generally pays according to accepted shares rather than waiting for each individual block outcome. Exact windows, formulas, maturity rules, stale-share treatment, orphan handling, reserves, payout cadence, and fee accounting are pool-specific.

MoreBC2 has **not** independently verified those implementation details for the listed pools unless a pool page explicitly stated them and the documentation repeats only that narrow published claim.

For the current evidence set:

- 1Miner.Net publishes `1%` fees and `0.01 BC2` minimum payout on its checked BC2 PPLNS/SOLO pages;
- CapsPool publishes `1%` SOLO/PPS fees and hourly-payout language for PPS;
- no MoreBC2 test establishes payout correctness, solvency, actual payout latency, share-ledger accuracy, or block-attribution accuracy for either service.

Pool payout policy is not a consensus rule. The network block subsidy and transaction fees are separate from how an operator distributes mining income to participating miners.

## Block subsidy versus pool payout

Current chain parameters preserve a subsidy halving interval of `210000` blocks. The present chain height is still before the first scheduled halving, so the base block subsidy remains in the pre-halving phase. Pool operators can deduct advertised fees or apply their own payout-accounting model before miner payouts.

Do not use a pool's displayed earnings estimate as a statement of BitcoinII consensus reward, and do not use the consensus subsidy as a promise of what an individual pool participant will receive.

## Current mining telemetry

The September 11 public-infrastructure smoke test directly observed working mining-related public API routes:

- Official BitcoinII Explorer: mining hashrate, difficulty-adjustment estimate, next-block data, and a miner-summary route that required parameters;
- Mempool-style explorer services: `.../mining/hashrate/3d` and difficulty-adjustment data.

These observations can support dated network monitoring and cross-checks. They do not make a public explorer an authoritative consensus source, prove provider independence, or establish the methodology/accuracy of each hashrate estimate.

For an operator, local Core chain state remains the stronger basis for critical decisions; public mining telemetry is supplementary.

## Mining hardware/software compatibility

The current public pool evidence includes operator-advertised hardware/service categories such as a dedicated Bitaxe endpoint at CapsPool and NiceHash/MiningRigRentals compatibility claims at 1Miner.Net.

MoreBC2 has not directly validated those compatibility claims in this audit. Do not convert them into a blanket statement that any Bitcoin/SHA-256 ASIC, proxy, firmware, rental service, or Stratum client is BC2-compatible.

The critical v31 compatibility question is not hashing alone. Any software involved in template construction or mutation must preserve BitcoinII's current required-work behavior, including candidate-time-triggered `nBits` recalculation where applicable.

## Operational checklist for a future direct pool test

A useful BC2 pool qualification should record, in a disposable mining setup:

- pool hostname, region, and port;
- protocol/connection mode actually used;
- subscribe/authorize result;
- extranonce/share-difficulty behavior if exposed;
- clean job receipt and job updates;
- accepted and rejected share behavior;
- whether candidate/template time handling is compatible with current ShockWave rules;
- pool-reported versus locally observed worker hashrate;
- block attribution if a block is found;
- payout model, fee, minimum, maturity, and actual payout timing;
- re-connect/failover behavior;
- date, miner software/version, and hardware used.

Until such a record exists, public pool pages remain configuration/operations evidence rather than end-to-end mining verification.

## Mining command testing status

The following useful read-only/template commands remain candidates for a current v31 runtime record:

- `bitcoinII-cli getmininginfo`
- `bitcoinII-cli getnetworkhashps`
- `bitcoinII-cli getblocktemplate '{"rules":["segwit"]}'`

`submitblock` and `submitheader` should stay out of ordinary user instructions until tested in a dedicated safe environment.

Track command evidence in [Command testing status](../verification/command-testing.md).

## What this page does not claim

This page does not claim:

- that any pool is recommended, safest, most decentralized, most profitable, or most reliable;
- that a published Stratum endpoint has been successfully mined against by MoreBC2;
- that any pool's payout accounting or solvency has been independently verified;
- that every SHA-256d miner or Bitcoin-compatible Stratum implementation safely supports current BC2;
- that public hashrate estimates are exact or independent;
- that mining is profitable;
- that every mining RPC has been runtime-tested on `v31.1.0`.

## Related pages

- [Mining section](README.md)
- [Ecosystem mining pools](../ecosystem/mining-pools.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Block-template assembly](../developers/source-atlas/miner.md)
- [Mining RPC source atlas](../developers/source-atlas/rpc-mining.md)
- [Network specifications](../documentation/network-specifications.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [v31 wallet/mempool/mining regression audit — 2026-09-02](../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Command testing status](../verification/command-testing.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` mining/PoW/template source reviews, September 2026 pool audit, current network specifications, and September public-infrastructure observations  
**Notes:** Current consensus and template behavior, pool configuration, published Stratum endpoints, advertised payout modes/fees, and dated operational status are documented. Direct pool Stratum/share testing, payout verification, complete v31 mining-RPC runtime testing, broad miner compatibility, profitability, and long-term pool reliability remain unverified.
