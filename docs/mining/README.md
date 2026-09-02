# Mining

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This section is for BitcoinII (BC2) mining resources.

Current-facing mining documentation uses BitcoinII Core `v31.1.0` as the release baseline. BitcoinII targets 10-minute blocks and uses **ShockWave per-block difficulty adjustment from mainnet height `57750`**.

Mining pages should distinguish source-backed protocol behavior from live ecosystem observations such as pools, software, payout policies, hashrate, and profitability.

## Current pages

- [Mining overview](mining-overview.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)
- [Ecosystem mining pools](../ecosystem/mining-pools.md)

## Current protocol anchors

Current source-backed mining facts include:

- target block spacing: 10 minutes;
- double-SHA256 block-header hashing path;
- ShockWave activation at height `57750`;
- per-block post-activation difficulty adjustment;
- historical pre-57750 Bitcoin-style retarget behavior;
- candidate block-template and mining RPC surfaces described in first-pass Source Atlas work.

The `v31.1.0` release also identifies associated mining, mempool, RPC, validation, wallet, and PSBT updates. Older detailed mining/RPC pages should not be called current-runtime tested unless they have a release-specific record.

## Rules

- Mining information can become outdated quickly.
- Pool lists, software links, and hashrate notes should include review dates.
- Do not list a pool as active without direct checking.
- Do not imply profitability or future value.
- Separate source-backed protocol behavior from live mining ecosystem status.
- Keep advanced/state-changing mining RPC examples marked untested until safely exercised.
- Describe the current algorithm as **ShockWave**; do not describe current mainnet as using only the old 2016-block retarget path.
- Dark Gravity Wave may be discussed as part of ShockWave's lineage/baseline context, but it is not the complete current algorithm name.

## Planned verification

- Fresh `v31.1.0` mining RPC smoke checks.
- Current network hashrate/difficulty observations with dates.
- Direct current pool checks.
- Deeper v31 mining-source regression review beyond ShockWave.

## Related pages

- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [RPC overview](../developers/rpc-overview.md)
- [Open questions backlog](../verification/open-questions.md)
- [v31 currentness audit](../verification/v31-currentness-audit-2026-09-02.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/difficulty anchors plus existing MoreBC2 mining source reviews
**Notes:** Current consensus-level mining wording is refreshed for v31. Live pools, profitability, and release-specific runtime RPC behavior remain separately verifiable.