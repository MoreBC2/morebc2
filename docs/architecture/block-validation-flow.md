# Block validation flow

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page maps the broad BitcoinII Core block-validation flow around header acceptance, block checks, UTXO connection/disconnection, best-chain activation, and reorganization handling.

The structural flow remains useful, but the earlier detailed review predates BitcoinII Core `v31.1.0`. Current release notes identify new or changed consensus/validation behavior, so this page now distinguishes the durable architecture from v31-specific paths that still need dedicated review.

## Current v31.1.0 boundary

BitcoinII Core `v31.1.0` adds or identifies:

- ShockWave per-block difficulty adjustment;
- consensus-level data restrictions;
- BC2 replay protection;
- fork-aware header synchronization;
- associated validation, mempool, wallet, RPC, mining, and PSBT updates.

Mainnet activates ShockWave, data restrictions, and replay protection at height `57750`.

The broad validation pipeline below still shows where header/block/chainstate work occurs, but MoreBC2 has **not yet remapped every v31-specific check into this flow**.

## Simplified validation flow

```text
ProcessNewBlock
  -> CheckBlock
  -> AcceptBlock
       -> AcceptBlockHeader
            -> CheckBlockHeader
            -> ContextualCheckBlockHeader
                 -> next-work / difficulty check
                 -> timestamp / contextual checks
                 -> v31 header-path behavior where applicable
       -> CheckBlock
       -> ContextualCheckBlock
            -> context-dependent transaction/block rules
            -> v31 data/replay-related checks where implemented
       -> SaveBlockToDisk
       -> ReceivedBlockTransactions
  -> NotifyHeaderTip
  -> ActivateBestChain
       -> FindMostWorkChain
       -> ActivateBestChainStep
            -> DisconnectTip, if needed
            -> ConnectTip
                 -> ConnectBlock
```

## Difficulty check

`ContextualCheckBlockHeader` checks the candidate header's difficulty bits against `GetNextWorkRequired`.

For historical pre-57750 BitcoinII mainnet, that path used the inherited Bitcoin-style retarget behavior.

Beginning at mainnet height `57750`, `GetNextWorkRequired` uses **ShockWave** for the next-block work requirement. Current documentation should therefore not interpret this validation step as a 2016-block-only difficulty check.

See:

- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)

## Header acceptance and synchronization

The durable reviewed architecture includes:

- duplicate-header checks;
- previous-header availability;
- invalid-parent rejection;
- proof-of-work checking;
- contextual header checks;
- adding accepted headers to the block index.

`v31.1.0` additionally identifies **fork-aware header synchronization**. MoreBC2 still needs a dedicated v31 source/runtime review showing exactly how the new synchronization behavior interacts with competing branches and recovery scenarios.

## Block body checks

The existing review covers structural checks such as:

- merkle root;
- size/weight limits;
- coinbase placement;
- transaction structure;
- contextual finality and witness-related checks.

`v31.1.0` activates BitcoinII-specific consensus data restrictions at height `57750`. Their exact validation location and boundary behavior should be documented in a dedicated current-release source slice rather than inferred from this older broad flow map.

## Transaction and replay-protection checks

Existing connection/transaction reviews cover UTXO input checks, sequence locks, script verification, fees, operation limits, and coins-view updates.

BC2 replay protection is now a current consensus consideration from height `57750`, with fork ID `0x01324342`.

MoreBC2 has confirmed those activation anchors, but this page does not yet claim a complete replay-protection transaction-path map.

## UTXO connection and disconnection

The durable reviewed architecture includes:

- `ConnectBlock` applying validated block effects to the coins view;
- undo data for non-coinbase inputs;
- fee/subsidy checks;
- `DisconnectBlock` reversing UTXO effects;
- `DisconnectTip` moving the active chain backward;
- reorg handling and reconsideration of eligible disconnected transactions.

These concepts remain part of current BitcoinII architecture, while v31-specific validation changes still need release-targeted spot checks.

## Best-chain activation and reorganizations

The existing flow covers:

- selecting a usable most-work candidate;
- finding the fork point;
- disconnecting the old branch;
- connecting the replacement branch;
- updating the mempool after reorgs;
- updating the active tip.

ShockWave changes how required work is calculated after height `57750`; it does not eliminate normal accumulated-work chain selection or the possibility of reorganizations.

## Historical review note

Earlier versions of this page contained detailed function-by-function notes based on a pre-v31 source snapshot. Those notes remain useful background in repository history, but the current-facing page now avoids presenting that older snapshot as a complete `v31.1.0` validation specification.

## Current review priorities

1. Map the replay-protection transaction/validation path.
2. Map the consensus data-restriction path.
3. Map fork-aware header synchronization.
4. Re-check validation/mempool caller paths changed in `v31.1.0`.
5. Add safe current-release test records where practical.

## Related pages

- [Consensus overview](../documentation/consensus-overview.md)
- [Consensus model](consensus-model.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Reorganizations](../encyclopedia/reorganizations.md)
- [v31 currentness audit](../verification/v31-currentness-audit-2026-09-02.md)

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `src/validation.cpp` current-release review remains a follow-up item

## Verification

**Status:** Draft
**Primary sources checked:** Current v31 release/activation/difficulty anchors plus existing MoreBC2 validation architecture review
**Notes:** This page is a current architecture boundary, not a complete v31-specific function-by-function validation audit.