# Mining RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/rpc/mining.cpp`

This file connects mining-related RPC commands to chain state, mempool state, block-template creation, block submission, and mining status output.

This is not a user-facing mining setup guide. Commands and examples should not be marked tested until they are run against BitcoinII Core.

## Why this file matters

The block-template source review explains how candidate blocks are assembled internally.

`src/rpc/mining.cpp` shows how that machinery is exposed through RPC commands such as:

- `getnetworkhashps`
- `getmininginfo`
- `getblocktemplate`
- `submitblock`
- `submitheader`
- `prioritisetransaction`
- `getprioritisedtransactions`
- hidden generation helpers used mostly for testing or controlled local generation paths

## Key symbols reviewed

- `GetNetworkHashPS`
- `getnetworkhashps`
- `GenerateBlock`
- `generateBlocks`
- `getScriptFromDescriptor`
- `generatetodescriptor`
- `generatetoaddress`
- `generateblock`
- `getmininginfo`
- `prioritisetransaction`
- `getprioritisedtransactions`
- `BIP22ValidationResult`
- `getblocktemplate`
- `submitblock_StateCatcher`
- `submitblock`
- `submitheader`
- `RegisterMiningRPCCommands`

## Registered commands

Reviewed command registration places these commands in the `mining` RPC category:

- `getnetworkhashps`
- `getmininginfo`
- `prioritisetransaction`
- `getprioritisedtransactions`
- `getblocktemplate`
- `submitblock`
- `submitheader`

Reviewed hidden commands include:

- `generatetoaddress`
- `generatetodescriptor`
- `generateblock`
- `generate`

The hidden `generate` RPC is replaced by the `-generate` CLI option and throws method-not-found behavior.

## Network hash estimate

`GetNetworkHashPS` estimates network hash rate from chain work over time.

Reviewed behavior includes:

- Validating lookup and height parameters.
- Supporting `lookup = -1` to estimate since the last difficulty change.
- Clamping lookup length to available chain height.
- Calculating work difference between two block indexes.
- Dividing by observed time difference.
- Returning zero when there is not enough usable time span.

## Local block generation helpers

`GenerateBlock` updates the merkle root, increments nonce until proof-of-work succeeds or limits are reached, and can submit the found block through `ProcessNewBlock`.

`generateBlocks` repeatedly calls the mining interface to create new block templates, runs `GenerateBlock`, submits successful blocks, and returns generated block hashes.

`generatetoaddress` and `generatetodescriptor` use those paths after converting an address or descriptor into a coinbase output script.

These commands are useful for controlled local/test generation paths. They should not be presented as proof of practical public mining setup.

## generateblock

`generateblock` creates a block with a caller-supplied ordered transaction list.

Reviewed behavior includes:

- Accepting an address or descriptor output.
- Accepting transactions as raw hex or mempool transaction IDs.
- Requiring transaction IDs to exist in the mempool.
- Creating a template with mempool usage disabled.
- Adding caller-supplied transactions after the coinbase transaction.
- Regenerating coinbase commitments after transaction changes.
- Running `TestBlockValidity` without proof-of-work or merkle-root checks before searching for proof-of-work.
- Returning block hash and optionally block hex when not submitted.

## getmininginfo

`getmininginfo` returns mining-related chain and mempool state.

Reviewed result fields include:

- Current height.
- Last assembled block weight and transaction count when available.
- Current `nBits`.
- Current difficulty.
- Current target.
- Estimated network hash rate.
- Mempool transaction count.
- Chain name.
- Next-block height, bits, difficulty, and target.
- Signet challenge when applicable.
- Warnings.

## Transaction prioritization RPCs

`prioritisetransaction` applies a fee delta for transaction selection into future candidate blocks.

Reviewed behavior includes:

- Accepting a transaction ID.
- Requiring the deprecated dummy argument to be zero or omitted.
- Accepting positive or negative fee deltas in satoshis.
- Rejecting prioritization for certain dust-output transactions under standardness rules.
- Applying the delta through mempool prioritization state.

`getprioritisedtransactions` reports current user-created fee deltas by transaction ID, whether the transaction is in the mempool, and modified fee when available.

## getblocktemplate

`getblocktemplate` is the main reviewed RPC connection to block-template creation.

Reviewed behavior includes:

- Supporting template and proposal modes.
- Requiring client rule support such as `segwit` for normal template mode.
- Requiring `signet` on signet chains.
- Rejecting unsupported modes.
- Checking non-test chains for peer connection and initial sync status before serving templates.
- Supporting long polling through `longpollid`.
- Creating or refreshing a cached block template through the mining interface.
- Updating time and resetting nonce before response construction.
- Returning BIP22/BIP23-style template fields.

Reviewed template response fields include:

- `version`
- `rules`
- `vbavailable`
- `vbrequired`
- `previousblockhash`
- non-coinbase `transactions`
- `coinbaseaux`
- `coinbasevalue`
- `longpollid`
- `target`
- `mintime`
- `mutable`
- `noncerange`
- `sigoplimit`
- `sizelimit`
- optional `weightlimit`
- `curtime`
- `bits`
- `height`
- optional `signet_challenge`
- optional `default_witness_commitment`

## Proposal mode

In proposal mode, `getblocktemplate` accepts proposed block data and checks it without attempting to mine or submit it.

Reviewed behavior includes:

- Decoding block hex.
- Returning duplicate states for already-known blocks.
- Returning inconclusive status if the block is not built on the current tip.
- Running `TestBlockValidity` without proof-of-work but with merkle-root checking.
- Mapping validation results through `BIP22ValidationResult`.

## submitblock

`submitblock` decodes a hex block and submits it to validation.

Reviewed behavior includes:

- Decoding the supplied block hex.
- Updating uncommitted block structures when the previous block index is known.
- Registering a temporary validation event listener to capture `BlockChecked` result for the submitted block.
- Calling `ProcessNewBlock` with force processing and minimum-proof-of-work checked.
- Returning duplicate, inconclusive, null, or BIP22-style validation results depending on outcome.

## submitheader

`submitheader` decodes a hex block header and submits it as a candidate chain tip.

Reviewed behavior includes:

- Decoding the block header.
- Requiring the previous header to already be known.
- Calling `ProcessNewBlockHeaders` with minimum-proof-of-work checked.
- Returning null on success or throwing RPC errors on invalid/error states.

## Amount units note

The reviewed file includes a note that mining RPCs follow GBT/BIP22 in using satoshi amounts, unlike wallet RPCs that use BC2 values.

This matters for exchange/service docs and examples.

## Relationship to other pages

Related pages:

- [Source atlas: block template assembly](miner.md)
- [Mining overview](../../mining/mining-overview.md)
- [RPC overview](../rpc-overview.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Source atlas: validation interface](validation-interface.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and command examples using BitcoinII terminology.

No upstream comparison has been completed, so this page does not claim whether mining RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which examples can be safely tested against BitcoinII Core and documented as verified?
- Which RPCs should be recommended for exchanges or services, and which should remain developer-only?
- Does BitcoinII differ from upstream Bitcoin Core in any mining RPC behavior beyond naming?
- Which public mining software or pool tooling actually uses `getblocktemplate` for BitcoinII today?
- How should satoshi-vs-BC2 amount units be highlighted in service integration docs?
- Should hidden generation RPCs be documented only in developer/testing sections?
- Confirm whether `v29.1.0` differs from current `main` for this file before upgrading status.

## Sources

- Current observed `main` `src/rpc/mining.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/rpc/mining.cpp
- Current observed `main` `src/node/miner.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/miner.h
- Current observed `main` `src/node/miner.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/node/miner.cpp
- Current observed `main` `src/validationinterface.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validationinterface.h
- Current observed `main` `src/validation.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass mining RPC review. Commands have not been run; examples, exact operator guidance, upstream comparison, service integration recommendations, and release-versus-main comparison remain open.
