# Mining overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

BitcoinII (BC2) uses proof-of-work mining. Miners search for a block header hash that satisfies the current network difficulty target.

This page documents only source-backed general mining behavior and leaves pool/software recommendations for later verification.

## What is verified from source

Current checked source shows:

- Target block spacing: 10 minutes.
- Difficulty adjustment interval: 2016 blocks.
- Retarget timespan: 14 days.
- Difficulty adjustment bounded between one quarter and four times the target timespan.
- Block header hashing path uses double-SHA256 through `HashWriter::GetHash()`.
- Mainnet does not allow minimum-difficulty blocks.
- Mainnet does retarget difficulty.

## Candidate block templates

MoreBC2 has now reviewed the first pass of `src/node/miner.*` and `src/node/mini_miner.*`.

Reviewed behavior includes:

- `BlockAssembler` creates candidate block templates.
- `CBlockTemplate` stores the candidate block plus fee, operation-cost, and coinbase commitment data.
- `CreateNewBlock` adds a dummy coinbase first, selects mempool transactions when available, builds the final coinbase transaction, fills header fields, and can run `TestBlockValidity` before returning the template.
- Transaction selection uses ancestor-aware package fee scoring.
- Packages are checked against block weight and operation-cost limits.
- Package transactions are checked for finality against the candidate block height and locktime cutoff.
- Selected packages are ordered so ancestors appear before descendants.
- `MiniMiner` is a helper/simulation path for fee and ordering calculations, not actual block production.

This source review does not yet document the RPC path that exposes block templates.

## What this page does not claim

This page does not claim:

- That BitcoinII uses Dark Gravity Wave.
- That any specific pool is recommended.
- That any specific miner software is official.
- That any hashrate estimate is current.
- That mining is profitable.
- That block template RPC behavior has been fully reviewed.

## Mining topics to document later

- Solo mining.
- Pool mining.
- Mining software.
- Hardware notes.
- Expected confirmations for mined blocks.
- Orphan/reorg basics.
- Pool list.
- Hashrate and difficulty explainer.
- Block-template RPC path.
- Block subsidy schedule from source.

## Open items

- Verify current mining software options.
- Verify active mining pools.
- Verify pool fee models.
- Verify current block reward calculation from source.
- Verify whether maintainers prefer `double-SHA256` or `SHA-256d` wording.
- Review `src/rpc/mining.cpp`.
- Test mining setup instructions before publishing them as verified.

## Sources

- `src/pow.cpp`
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/kernel/chainparams.cpp`
- `src/node/miner.h`
- `src/node/miner.cpp`
- `src/node/mini_miner.h`
- `src/node/mini_miner.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Consensus-level mining behavior and candidate-template assembly have first-pass source review. Miner software, pools, hashrate, profitability, block-template RPC, and subsidy schedule are not yet verified.
