# Block acceptance pipeline

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Purpose

This page maps the reviewed BitcoinII Core `v31.1.0` path from incoming header/block data through validation, storage, best-chain selection, block connection, and active-tip updates.

The broad Bitcoin-style pipeline remains intact, but current BC2 adds three material height-`57750` boundaries that must now be considered in the same lifecycle:

- ShockWave next-work calculation;
- consensus data restrictions;
- replay-protection signature validation.

## Main source paths

- `src/validation.cpp`
- `src/validation.h`
- `src/pow.cpp`
- `src/kernel/chainparams.cpp`
- `src/consensus/bitcoinII_data.h`
- `src/script/interpreter.cpp`

## High-level flow

```text
network / disk / caller
  -> ProcessNewBlock or ProcessNewBlockHeaders
      -> AcceptBlockHeader
          -> CheckBlockHeader
          -> ContextualCheckBlockHeader
      -> AcceptBlock
          -> CheckBlock
          -> ContextualCheckBlock
          -> save block data
          -> ReceivedBlockTransactions
      -> ActivateBestChain
          -> FindMostWorkChain
          -> ActivateBestChainStep
              -> disconnect old branch if needed
              -> ConnectTip
                  -> ConnectBlock
          -> update active tip
```

This intentionally omits locking, anti-DoS shortcuts, cached block pointers, pruning/disk details, background-chainstate handling, and callback scheduling.

## Responsibility table

| Function/path | Reviewed responsibility |
|---|---|
| `ProcessNewBlockHeaders` | Processes incoming headers through `AcceptBlockHeader` and updates header-tip state |
| `ProcessNewBlock` | Full-block entry point; context-free check, acceptance/storage, then best-chain activation |
| `AcceptBlockHeader` | Header proof-of-work/context validation and block-index insertion |
| `ContextualCheckBlockHeader` | Required `nBits`, MTP/future-time, checkpoints, version/context checks |
| `AcceptBlock` | Full-block pre-storage checks and data persistence |
| `ReceivedBlockTransactions` | Marks block transaction data present and updates candidate eligibility |
| `FindMostWorkChain` | Selects a usable highest-accumulated-work candidate |
| `ActivateBestChainStep` | Disconnects/reconnects around the fork point toward the most-work candidate |
| `ConnectTip` | Connects one block to the active tip and updates mempool/tip state |
| `ConnectBlock` | UTXO-, script-, and BC2-specific consensus checks while applying block effects |

## Header proof of work and ShockWave

`CheckBlockHeader` verifies the claimed proof of work against the header's target.

`ContextualCheckBlockHeader` requires the header's `nBits` to equal `GetNextWorkRequired(...)` for its actual candidate context.

On current mainnet, block height `57750` and later use ShockWave. Because ShockWave can depend on candidate time, the required target cannot safely be modeled as “reuse the previous block's difficulty until the next 2016-block boundary.”

See [pow.cpp](pow-cpp.md) and [ShockWave v31](shockwave-v31.md).

## Full-block checks before connection

The reviewed pre-connection flow still covers:

- merkle-root and mutation checks;
- size/weight limits;
- coinbase placement;
- context-independent transaction checks;
- transaction finality/context checks;
- witness commitments;
- legacy/signature-operation accounting;
- checkpoint/context rules where enabled.

These checks do not replace the UTXO- and script-dependent work performed during block connection.

## `ConnectBlock`

`ConnectBlock` applies a candidate block's effects to a coins/UTXO view and performs context-dependent consensus validation.

Reviewed structural responsibilities include:

- checking the coins view is based on the expected previous block;
- handling the genesis special case;
- BIP30/sequence-lock context;
- input existence/value/coinbase-maturity checks;
- fee accumulation;
- signature-operation cost accounting;
- script/input verification;
- UTXO updates;
- coinbase reward ceiling versus subsidy plus fees;
- undo-data generation;
- advancing the coins-view best block.

### v31 data restrictions

From mainnet height `57750`, `validation.cpp` also applies BitcoinII-specific consensus data restrictions during block connection.

The release-pinned path checks explicit output and Taproot-witness constructions documented in [Consensus data restrictions](data-restrictions-v31.md). These are consensus checks, not merely mempool policy.

### v31 replay-protection domain

At/after replay activation, script/signature verification uses the BC2 replay-protection domain selected by consensus parameters.

The validation cache also separates results by sighash fork id so validity from one signature domain cannot be reused across another.

See [Replay protection v31](replay-protection-v31.md) and [Script interpreter](script-interpreter.md).

## Best-chain selection and reorganization

`FindMostWorkChain` selects usable candidate chains by accumulated chain work, not by confirmation count alone.

`ActivateBestChainStep` finds the fork point, disconnects active-chain blocks where necessary, connects the selected branch, and reconciles mempool state.

A simplified reorg path is:

```text
FindMostWorkChain
  -> find fork point
  -> DisconnectTip / DisconnectBlock
      -> roll UTXO state backward using undo data
      -> queue disconnected transactions
  -> ConnectTip / ConnectBlock new branch
  -> MaybeUpdateMempoolForReorg
      -> re-add eligible disconnected transactions
      -> remove invalid/non-final/immature descendants
      -> re-limit mempool state
```

ShockWave affects the amount of work represented by valid blocks through their targets, but chain selection still uses accumulated chain work.

## Mempool boundary

Block consensus and mempool policy are not the same thing.

Mempool acceptance adds policy constraints and v31 next-block replay-domain handling. A transaction can be policy-rejected while potentially remaining block-consensus-valid, while a BitcoinII-specific post-activation consensus violation cannot be made valid by bypassing the mempool.

See [Mempool accept](mempool-accept.md).

## Notifications observed

Reviewed validation paths emit or interact with notifications such as:

- `BlockChecked`
- `BlockConnected`
- `BlockDisconnected`
- `UpdatedBlockTip`
- header-tip notifications

Wallets, indexes, UI, and other subscribers consume these interfaces. Exact callback ordering remains a source-level detail and should not be generalized without tracing the relevant subscriber.

## Runtime boundary

The September 11 Windows `v31.1.0` node test observed real mainnet header acquisition and advancing block validation during bounded initial block download, followed by a clean restart.

That is runtime evidence that the current release's ordinary header/block synchronization path operates in the documented environment.

It is **not** a controlled activation-boundary test for ShockWave, replay protection, or data restrictions, and the bounded run did not complete full IBD.

## Related pages

- [validation.cpp](validation-cpp.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)
- [ShockWave v31](shockwave-v31.md)
- [Replay protection v31](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Block storage](block-storage.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Complete a release-pinned review of block-storage/pruning details affected by current Core.
- Trace exact validation-interface callback ordering for selected subscribers.
- Execute controlled v31 activation-boundary vectors for ShockWave, replay protection, and data restrictions.
- Complete a full mainnet IBD record in an isolated environment if operationally useful.

## Primary sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/validation.cpp`
- `src/validation.h`
- `src/pow.cpp`
- `src/kernel/chainparams.cpp`
- `src/consensus/bitcoinII_data.h`
- `src/script/interpreter.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` validation/PoW/data/script paths plus September 11 bounded Windows mainnet synchronization evidence  
**Notes:** The page now includes the material v31 consensus boundaries. Full IBD, controlled activation vectors, and exhaustive callback/storage review remain open.
