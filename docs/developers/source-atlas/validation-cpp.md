# `src/validation.cpp`

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Purpose

`src/validation.cpp` is one of BitcoinII Core's central consensus/chainstate files. It connects header and block validation, UTXO state, script checks, mempool admission/reorg handling, block storage, best-chain activation, and validation notifications.

The older Source Atlas review correctly mapped the inherited Bitcoin-style flow, but its June status predates the material BitcoinII Core `v31.1.0` changes. Current review must additionally account for:

- ShockWave contextual next-work validation;
- height-`57750` consensus data restrictions;
- height-`57750` replay-protection domain selection;
- next-block replay-domain mempool handling;
- validation-cache separation by sighash fork id.

## High-level block path

```text
ProcessNewBlock
  -> CheckBlock
  -> AcceptBlock
      -> AcceptBlockHeader
          -> CheckBlockHeader
          -> ContextualCheckBlockHeader
      -> CheckBlock
      -> ContextualCheckBlock
      -> save block data
      -> ReceivedBlockTransactions
  -> ActivateBestChain
      -> FindMostWorkChain
      -> ActivateBestChainStep
          -> DisconnectTip / DisconnectBlock, if needed
          -> ConnectTip / ConnectBlock
```

The implementation also contains background-chainstate, pruning, disk-flush, locking, callback, and anti-DoS paths omitted from this simplified map.

## Header validation

### `CheckBlockHeader`

The reviewed path validates proof of work against the header's claimed target through `CheckProofOfWork`.

### `ContextualCheckBlockHeader`

Contextual checks include:

- `nBits` must match `GetNextWorkRequired(...)`;
- checkpoint/context restrictions where enabled;
- header time must exceed prior MedianTimePast;
- future-time bounds;
- version/deployment context.

For current mainnet, `GetNextWorkRequired()` uses ShockWave from block height `57750`, and the candidate header itself matters because candidate time can affect required work.

See [ShockWave v31](shockwave-v31.md).

## Context-free and contextual block checks

The reviewed `CheckBlock` / `ContextualCheckBlock` structure covers:

- proof of work;
- merkle root and mutation checks;
- signet solution where applicable;
- block size/weight;
- coinbase placement;
- context-independent transaction checks;
- transaction finality;
- witness commitment/context;
- coinbase height commitment;
- legacy/signature-operation limits.

These phases precede the UTXO- and script-dependent work in `ConnectBlock`.

## `ConnectBlock`

Reviewed structural responsibilities include:

- ensuring the coins view is based on the expected previous block;
- handling genesis specially;
- applying BIP30/sequence-lock context;
- checking non-coinbase inputs through consensus input helpers;
- fee/range accounting;
- signature-operation cost accounting;
- running input script checks where required;
- applying UTXO changes;
- checking coinbase value against subsidy plus fees;
- writing undo data;
- advancing the coins-view best-block state.

### v31 consensus data restrictions

Mainnet `nDataRestrictionsHeight = 57750`.

At/above activation, `validation.cpp` applies BitcoinII-specific output and Taproot-witness checks during block connection through the dedicated BitcoinII consensus-data helpers.

The currently reviewed rules include specific restrictions on OP_RETURN construction, bare multisig, Taproot annex/tapscript surfaces, and recognized Ordinals inscription envelopes. These are block-consensus checks, not merely relay policy.

See [Consensus data restrictions](data-restrictions-v31.md).

### v31 replay-protection script domain

Mainnet `nReplayProtectionHeight = 57750` with fork/domain id `0x01324342`.

Block/script validation uses the consensus-selected signature-hash domain. The script-validation cache also commits the fork id into its key so a result checked under one domain cannot be reused under another.

See [Replay protection](replay-protection-v31.md) and [Script interpreter](script-interpreter.md).

## Mempool acceptance in validation

The broader `MemPoolAccept` architecture remains Bitcoin-style but v31 adds material next-block-domain behavior.

During mempool validation, precomputed transaction data uses:

```text
SighashForkId(active_chain_height + 1)
```

so a transaction admitted immediately before replay activation must already validate for the domain of the block in which it could next be mined.

The v31 code also clears legacy-domain mempool state at the activation transition and separates validation-cache results by fork id.

The September 11 isolated regtest PSBT test directly exercised ordinary `testmempoolaccept`, local `sendrawtransaction`, `getmempoolentry`, and `getmempoolinfo` behavior. It did not runtime-trigger the mainnet replay-domain transition.

See [Mempool accept](mempool-accept.md).

## Reorganization path

Reviewed reorg anchors remain:

- `DisconnectBlock` rolls UTXO effects backward using undo data;
- `DisconnectTip` moves the active tip backward and queues disconnected transactions where applicable;
- `MaybeUpdateMempoolForReorg` attempts to restore eligible transactions and removes transactions that are invalid, non-final, or immature on the new chain;
- `ConnectTip` / `ConnectBlock` apply the selected branch;
- validation notifications inform wallets/indexes/UI subscribers of state changes.

A simplified path is:

```text
ActivateBestChainStep
  -> find fork point
  -> DisconnectTip until fork point
      -> DisconnectBlock
  -> ConnectTip new branch blocks
      -> ConnectBlock
  -> MaybeUpdateMempoolForReorg
```

## Best-chain selection

`FindMostWorkChain` selects usable candidate chains according to accumulated work while rejecting failed or unavailable candidates.

ShockWave changes the required target/work represented by each post-activation block; it does not replace the accumulated-chainwork selection model.

This distinction is why a confirmation count is an operational risk threshold rather than protocol finality.

## Validation notifications

Reviewed paths interact with notifications including:

- `BlockChecked`
- `BlockConnected`
- `BlockDisconnected`
- `UpdatedBlockTip`
- header-tip updates
- mempool transaction notifications in the transaction-acceptance path.

Exact callback order and subscriber behavior should be traced per use case rather than generalized from this overview.

## Runtime evidence — September 2026

Two current runtime records now matter when reading this page:

1. The Windows `v31.1.0` mainnet node test acquired current headers, advanced block validation during bounded IBD, maintained outbound peers, stopped cleanly, and restarted retained disposable chain state.
2. The isolated zero-peer `v31.1.0` regtest PSBT test produced a signed disposable transaction, passed `testmempoolaccept`, inserted it into the local mempool with `sendrawtransaction`, and confirmed the mempool entry.

Those tests establish ordinary current-release validation/mempool behavior in their bounded environments. They do **not** independently reproduce the three mainnet height-`57750` activation transitions.

## Important v31 correction to the old atlas wording

The earlier open question asking whether BitcoinII-specific validation behavior existed beyond naming/parameters is now resolved: **yes**.

Release-pinned v31 review identifies BitcoinII-specific consensus/validation behavior for ShockWave, data restrictions, replay-protection signature domains, mempool activation handling, and validation-cache separation.

Generic upstream Bitcoin structure remains useful for understanding the surrounding pipeline, but it is not the complete current BC2 behavior.

## Related pages

- [Block acceptance pipeline](block-acceptance.md)
- [Mempool accept](mempool-accept.md)
- [ShockWave v31](shockwave-v31.md)
- [Replay protection v31](replay-protection-v31.md)
- [Consensus data restrictions](data-restrictions-v31.md)
- [Script interpreter](script-interpreter.md)
- [Disconnected transactions](disconnected-transactions.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

- Execute controlled mainnet-equivalent activation-boundary vectors for replay/data restrictions/ShockWave.
- Complete release-pinned test mapping for the affected validation helpers.
- Trace exact callback ordering for selected wallet/index subscribers.
- Complete a full isolated mainnet IBD record if operationally useful.
- Continue deeper policy/package review where operator recommendations depend on it.

## Primary sources

Pinned/current `v31.1.0` scope includes:

- `src/validation.cpp`
- `src/validation.h`
- `src/pow.cpp`
- `src/consensus/params.h`
- `src/consensus/bitcoinII_data.h`
- `src/script/interpreter.cpp`
- `src/txmempool.cpp`
- `src/kernel/disconnected_transactions.*`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` source reviews plus September 11 bounded node and disposable-transaction runtime records  
**Notes:** The page now reflects the material v31 BitcoinII-specific validation behavior. Controlled activation vectors, exhaustive callback/test mapping, and full IBD remain open.
