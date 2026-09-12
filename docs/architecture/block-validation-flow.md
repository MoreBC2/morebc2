# Block validation flow

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page maps the BitcoinII Core block-validation flow around header acceptance, block checks, UTXO connection/disconnection, best-chain activation, and reorganization handling.

The current release baseline is BitcoinII Core `v31.1.0`. The broad Bitcoin-style validation pipeline remains useful, but current BitcoinII validation must include ShockWave difficulty, consensus data restrictions, replay-protection signature domains, and fork-aware header synchronization.

## Simplified validation flow

```text
ProcessNewBlock
  -> CheckBlock
  -> AcceptBlock
       -> AcceptBlockHeader
            -> CheckBlockHeader
            -> ContextualCheckBlockHeader
                 -> current next-work / difficulty check
                 -> timestamp / contextual checks
       -> CheckBlock
       -> ContextualCheckBlock
       -> SaveBlockToDisk
       -> ReceivedBlockTransactions
  -> NotifyHeaderTip
  -> ActivateBestChain
       -> FindMostWorkChain
       -> ActivateBestChainStep
            -> DisconnectTip, if needed
            -> ConnectTip
                 -> ConnectBlock
                      -> input / script / consensus checks
                      -> v31 replay-domain checks where signatures are verified
                      -> v31 consensus data restrictions after activation
                      -> UTXO updates and undo-data handling
```

## Difficulty and ShockWave

`ContextualCheckBlockHeader` checks the candidate header's `nBits` against `GetNextWorkRequired`.

For historical pre-`57750` BitcoinII mainnet, that path used the inherited Bitcoin-style retarget behavior. Beginning at mainnet height `57750`, the production next-work calculation uses **ShockWave**.

Current source review establishes that ShockWave is per-block and candidate-time-aware. Mining/template code and header validation must derive work from the actual candidate context; current BitcoinII should not be described as reusing a fixed target until a 2016-block boundary.

See [ShockWave v31](../developers/source-atlas/shockwave-v31.md).

## Header acceptance and fork-aware synchronization

The durable header-validation architecture includes:

- duplicate-header checks;
- previous-header availability;
- invalid-parent rejection;
- proof-of-work checking;
- contextual difficulty/timestamp checks;
- accepted-header insertion into the block index.

The dedicated v31 header-sync review establishes that ShockWave-era competing branches need their own recent target and median-time-past history when validating candidate difficulty. The synchronization path therefore maintains branch-specific synthetic history and calls production `GetNextWorkRequired()` against that branch context.

Header synchronization does **not** choose the active chain. Normal validation and accumulated-work chain selection still perform that role.

See [Fork-aware header synchronization v31](../developers/source-atlas/headers-sync-v31.md).

## Block body and consensus data restrictions

`CheckBlock` and `ContextualCheckBlock` cover structural and contextual checks such as:

- merkle-root consistency;
- size/weight limits;
- coinbase placement;
- transaction structure;
- finality and witness-related context.

From mainnet height `57750`, BitcoinII adds consensus-level data restrictions. The current v31 source review traces those rules through `src/consensus/bitcoinII_data.h` and validation paths.

The reviewed restrictions cover OP_RETURN count/size, actual `OP_13` opcodes in OP_RETURN scripts, bare multisig outputs, Taproot annex data, oversized script-path tapscripts, and semantic Ordinals inscription envelopes.

These are consensus rules after activation, not merely relay-policy preferences. They should not be generalized into a claim that every conceivable data-embedding method is impossible.

See [Consensus data restrictions v31](../developers/source-atlas/data-restrictions-v31.md).

## Replay-protection signature validation

Mainnet replay protection activates at height `57750` with fork/domain id `0x01324342`.

The fork id is a signature-hash domain, not a transaction field or address-format change. Current source review establishes that validation supplies the height-appropriate domain to signature checking and includes it in the script-validation cache key so a result from one domain cannot be reused under another.

Block connection selects the domain using the block's own height. Mempool admission separately uses the domain for the **next block height**, which protects the activation boundary before a transaction is mined.

See [Replay protection v31](../developers/source-atlas/replay-protection-v31.md).

## UTXO connection and disconnection

The reviewed architecture includes:

- `ConnectBlock` applying validated block effects to the coins view;
- input and fee checks;
- script verification under the relevant consensus context;
- undo data for spent non-coinbase inputs;
- coins-view updates;
- subsidy/coinbase-value checks;
- `DisconnectBlock` reversing UTXO effects;
- `DisconnectTip` moving the active chain backward during a reorganization.

These mechanics remain central under v31. BitcoinII-specific activation rules add validation context; they do not replace the UTXO model.

## Best-chain activation

The node selects a usable chain with the greatest accumulated work, not simply the greatest height or the branch with the easiest recent blocks.

The reviewed path includes:

- selecting a candidate through `FindMostWorkChain`;
- locating the fork point;
- disconnecting the old branch when required;
- connecting replacement blocks;
- repairing mempool state after reorganization;
- updating the active tip.

ShockWave changes how each post-activation block's required work is calculated. It does not replace accumulated-work chain selection and does not create deterministic finality.

## Runtime boundary

The September 11 Windows `v31.1.0` mainnet test directly exercised startup, peer/header acquisition, partial block validation, RPC, restart, and shutdown. It did **not** complete initial block download or independently exercise a block at the `57750` activation boundary.

The September 11 isolated regtest PSBT test exercised ordinary transaction signing, `testmempoolaccept`, and local mempool submission, but regtest leaves the replay-protection domain disabled as shipped.

Accordingly, current v31 activation behavior on this page remains principally release-pinned source evidence rather than activation-boundary runtime proof.

## Related pages

- [Consensus model](consensus-model.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Mempool flow](mempool-flow.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)
- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
- [Source atlas: validation.cpp](../developers/source-atlas/validation-cpp.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` validation, ShockWave, replay-protection, data-restriction, and header-sync source reviews plus bounded September runtime evidence  
**Notes:** The current architecture path and principal v31 consensus additions are mapped. Full activation-boundary runtime vectors, full-sync runtime validation, deep invalid-block test coverage, and exhaustive script-flag classification remain open.
