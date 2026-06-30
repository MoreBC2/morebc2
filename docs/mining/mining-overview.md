# Mining overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

BitcoinII (BC2) uses proof-of-work mining. Miners search for a block header hash that satisfies the current network difficulty target.

This page documents only source-backed general mining behavior and leaves pool/software recommendations for later verification.

Mining command examples are not verified until local test records exist.

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

MoreBC2 has reviewed a first pass of `src/node/miner.*` and `src/node/mini_miner.*`.

Reviewed behavior includes:

- `BlockAssembler` creates candidate block templates.
- `CBlockTemplate` stores the candidate block plus fee, operation-cost, and coinbase commitment data.
- `CreateNewBlock` adds a dummy coinbase first, selects mempool transactions when available, builds the final coinbase transaction, fills header fields, and can run `TestBlockValidity` before returning the template.
- Transaction selection uses ancestor-aware package fee scoring.
- Packages are checked against block weight and operation-cost limits.
- Package transactions are checked for finality against the candidate block height and locktime cutoff.
- Selected packages are ordered so ancestors appear before descendants.
- `MiniMiner` is a helper/simulation path for fee and ordering calculations, not actual block production.

## Mining RPC layer

MoreBC2 has reviewed a first pass of `src/rpc/mining.cpp`.

Reviewed behavior includes:

- `getblocktemplate` exposes candidate block template data for clients that request required rules such as `segwit`.
- `getblocktemplate` supports proposal mode for checking proposed block data.
- `getblocktemplate` checks peer connection and initial sync state on non-test chains before serving templates.
- `getblocktemplate` can long-poll for tip or mempool updates.
- `submitblock` decodes and submits a full block to validation.
- `submitheader` decodes and submits a block header as a candidate chain tip.
- `getmininginfo` returns chain, target, difficulty, next-block, mempool, and warning data.
- `getnetworkhashps` estimates network hash rate from chain work over observed time.
- `prioritisetransaction` and `getprioritisedtransactions` expose fee-delta behavior used by template selection.
- Hidden generation helpers exist for controlled local/test paths.

The reviewed file notes that mining RPCs follow GBT/BIP22 in using satoshi amounts, unlike wallet RPCs that use BC2 values.

## Mining command testing status

Track command testing in [Command testing status](../verification/command-testing.md).

Mining-related command forms that still need records include:

- `bitcoinII-cli getmininginfo`
- `bitcoinII-cli getblocktemplate '{"rules":["segwit"]}'`
- `bitcoinII-cli getnetworkhashps`

Advanced submission commands should not be published as normal user examples until a dedicated safe workflow exists:

- `bitcoinII-cli submitblock <hex>`
- `bitcoinII-cli submitheader <hex>`

## What this page does not claim

This page does not claim:

- That BitcoinII uses Dark Gravity Wave.
- That any specific pool is recommended.
- That any specific miner software is official.
- That any hashrate estimate is current.
- That mining is profitable.
- That any mining RPC command has been run and tested by MoreBC2.

## Mining topics to document later

- Solo mining.
- Pool mining.
- Mining software.
- Hardware notes.
- Expected confirmations for mined blocks.
- Orphan/reorg basics.
- Pool list.
- Hashrate and difficulty explainer.
- Block subsidy schedule from source.
- Tested RPC command examples.

## Open items

- Verify current mining software options.
- Verify active mining pools.
- Verify pool fee models.
- Verify current block reward calculation from source.
- Verify whether maintainers prefer `double-SHA256` or `SHA-256d` wording.
- Test mining RPC commands before publishing examples as verified.
- Decide which mining RPCs belong in user docs versus developer docs.

## Sources

- `src/pow.cpp`
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/kernel/chainparams.cpp`
- `src/node/miner.h`
- `src/node/miner.cpp`
- `src/node/mini_miner.h`
- `src/node/mini_miner.cpp`
- `src/rpc/mining.cpp`
- [Command testing status](../verification/command-testing.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Consensus-level mining behavior, candidate-template assembly, and mining RPC paths have first-pass source review. Miner software, pools, hashrate, profitability, command testing, and subsidy schedule are not yet verified.
