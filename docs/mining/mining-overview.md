# Mining overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

BitcoinII (BC2) uses proof-of-work mining. Miners search for a block header hash that satisfies the current network target.

BitcoinII Core `v31.1.0` keeps the 10-minute target block spacing and double-SHA256 block-header hashing path, but the network's current difficulty behavior is now governed by **ShockWave** after mainnet height `57750`.

## Current source-backed mining behavior

Reviewed `v31.1.0` source shows:

- Target block spacing: 10 minutes.
- Block header hashing path: double-SHA256 via `HashWriter::GetHash()`.
- ShockWave activation height: `57750`.
- Post-activation difficulty: adjusted per block by ShockWave.
- ShockWave rolling baseline: 25 blocks / 24 intervals using MedianTimePast.
- Fast-hashrate response: separate six-interval tightening sensor.
- Final per-block difficulty bounds: `+/-4x`.
- Emergency stall-recovery logic and post-recovery stabilization are part of the current consensus implementation.
- Mainnet does not use testnet-style minimum-difficulty blocks.

The old 14-day / 2016-block retarget parameters remain in chain parameters for historical and inherited-consensus purposes. They must not be presented as the current post-57750 mining difficulty schedule.

## Candidate block templates

MoreBC2 has reviewed a first pass of `src/node/miner.*` and `src/node/mini_miner.*`.

Reviewed behavior includes:

- `BlockAssembler` creates candidate block templates.
- `CBlockTemplate` stores the candidate block plus fee, operation-cost, and coinbase commitment data.
- `CreateNewBlock` builds a candidate block, selects eligible mempool transactions, constructs the coinbase transaction, fills header fields, and can run block-validity checks before returning a template.
- Transaction selection uses ancestor-aware package fee scoring.
- Packages are checked against block weight and operation-cost limits.
- Selected packages are ordered with ancestors before descendants.

## Mining RPC layer

MoreBC2 has reviewed the mining RPC surface, including:

- `getblocktemplate`
- `submitblock`
- `submitheader`
- `getmininginfo`
- `getnetworkhashps`
- `prioritisetransaction`
- `getprioritisedtransactions`

`v31.1.0` release notes also identify associated mining, mempool, RPC, validation, wallet, and PSBT updates. MoreBC2 has not yet completed a release-specific behavioral regression audit for every mining RPC, so tested examples remain a separate verification task.

## Mining command testing status

Track command testing in [Command testing status](../verification/command-testing.md).

Mining-related command forms that still need current-release records include:

- `bitcoinII-cli getmininginfo`
- `bitcoinII-cli getblocktemplate '{"rules":["segwit"]}'`
- `bitcoinII-cli getnetworkhashps`

Advanced submission commands should not be published as normal user examples without a dedicated safe workflow.

## What this page does not claim

This page does not claim:

- that any specific pool is recommended;
- that any specific miner software is official;
- that any hashrate estimate is current;
- that mining is profitable;
- that every mining RPC has been locally re-tested on `v31.1.0`.

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/node/miner.*`
- `src/rpc/mining.cpp`
- [Command testing status](../verification/command-testing.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Consensus-level mining behavior is refreshed for `v31.1.0`. Pool/software recommendations, profitability, live hashrate, subsidy calculation, and release-specific command testing remain open.