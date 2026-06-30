# Mining

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This section is for BitcoinII (BC2) mining resources.

Mining pages should distinguish source-backed protocol behavior from live ecosystem observations such as pools, software, payout policies, hashrate notes, and profitability claims.

## Current pages

- [Mining overview](mining-overview.md)
- [Ecosystem mining pools](../ecosystem/mining-pools.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)

## Source-backed anchors

Mining-related source review currently includes:

- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)
- [Source atlas: block template assembly](../developers/source-atlas/miner.md)
- [Source atlas: mining RPC](../developers/source-atlas/rpc-mining.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)

These pages are source-observed unless they explicitly say a command or external service was tested.

## Planned pages

- Mining software
- Pool list with direct checks
- Solo mining notes
- Hardware considerations
- Difficulty and hashrate explainers
- Payout and confirmation basics
- Mining troubleshooting
- Tested mining RPC examples

## Rules

- Mining information can become outdated quickly.
- Pool lists, software links, and hashrate notes should include review dates.
- Do not list a pool as active without direct checking.
- Do not imply profitability or future value.
- Separate source-backed protocol behavior from live mining ecosystem status.
- Keep `getblocktemplate`, `submitblock`, and other mining RPC examples marked untested until run locally.
- Do not claim Dark Gravity Wave or any non-reviewed difficulty system for BitcoinII unless source review proves it.

## Related pages

- [RPC overview](../developers/rpc-overview.md)
- [Mempool flow](../architecture/mempool-flow.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Documentation coverage](../documentation-coverage.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation polish plan](../POLISH_PLAN.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Protocol-level proof-of-work, difficulty retargeting, candidate-template assembly, and mining RPC behavior have source-backed anchors. Live mining pools, software, payout policies, and hashrate data still need direct current checks.
