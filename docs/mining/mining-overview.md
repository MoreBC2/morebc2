# Mining overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

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

## What this page does not claim

This page does not claim:

- That BitcoinII uses Dark Gravity Wave.
- That any specific pool is recommended.
- That any specific miner software is official.
- That any hashrate estimate is current.
- That mining is profitable.

## Mining topics to document later

- Solo mining.
- Pool mining.
- Mining software.
- Hardware notes.
- Expected confirmations for mined blocks.
- Orphan/reorg basics.
- Pool list.
- Hashrate and difficulty explainer.

## Open items

- Verify current mining software options.
- Verify active mining pools.
- Verify pool fee models.
- Verify current block reward calculation from source.
- Verify whether maintainers prefer `double-SHA256` or `SHA-256d` wording.
- Test mining setup instructions before publishing them as verified.

## Sources

- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp
- `src/primitives/block.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/primitives/block.cpp
- `src/hash.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/hash.h
- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** Consensus-level mining behavior is source-backed. Miner software, pools, hashrate, and profitability are not yet verified.
