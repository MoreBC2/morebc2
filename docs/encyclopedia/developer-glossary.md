# Developer glossary

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This page defines developer-facing terms used throughout MoreBC2 architecture, Source Atlas, wallet, node, mining, and integration documentation.

The root [Glossary](../../GLOSSARY.md) gives shorter general definitions. This page adds implementation-oriented meaning and the BitcoinII-specific distinctions that matter for current `v31.1.0` work.

## Rules

- Keep definitions short enough to remain a glossary.
- Prefer release-pinned `v31.1.0` behavior for current BitcoinII-specific values.
- Distinguish consensus, mempool policy, wallet behavior, RPC behavior, and service policy.
- Do not use a Bitcoin-derived term to imply compatibility where v31 introduces a BC2-specific boundary.
- Link deeper behavior to Architecture or Source Atlas instead of reproducing those pages here.

## Accumulated chainwork

The cumulative proof-of-work represented by a chain branch.

BitcoinII best-chain selection compares accumulated work among valid usable candidates rather than simply choosing the greatest block height.

Related:

- [Reorganizations](reorganizations.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)

## Activation height

A block height at which a new consensus or protocol rule begins to apply.

Current BitcoinII mainnet `v31.1.0` uses height `57750` for ShockWave, replay protection, and consensus data restrictions.

## Active chain

The branch the node currently treats as its best valid usable chain.

A node may know about multiple competing branches while only one is active.

## Active tip

The final block of the current active chain.

A reorganization can move the active tip backward to a fork point and then forward along a different branch.

## Ancestor

In mempool context, an unconfirmed transaction that another unconfirmed transaction depends on.

Ancestor relationships affect package accounting, policy limits, mining selection, and eviction behavior.

## Best-work chain

A convenient documentation term for the valid usable chain selected by accumulated chainwork.

Height alone is not the selection rule.

## Block file

A flat file containing serialized block data on local disk.

Related:

- [Block storage](../developers/source-atlas/block-storage.md)

## Block file cursor

Bookkeeping used by the block-storage layer to track where new block or undo records should be written.

## Block header

The compact block metadata containing the version, previous-block hash, merkle root, timestamp, compact difficulty target (`nBits`), and nonce.

Proof of work is performed over the serialized header.

## Block index

The node's internal index of known block headers and related metadata such as height, chainwork, validation status, and disk positions.

The block index can contain branches that are not currently active.

## Block lifecycle

The path a block follows through header checks, full-block checks, storage, candidate-chain consideration, connection to chainstate, notifications, and possible later disconnection.

Related:

- [Life of a block](../architecture/life-of-a-block.md)
- [Block acceptance](../developers/source-atlas/block-acceptance.md)

## Block subsidy

The newly created amount permitted in a block's coinbase transaction before transaction fees are added.

BitcoinII retains a `210000`-block halving interval in current chain parameters.

## Broadcast

Sending transaction or block information toward peers.

Local acceptance is not the same as successful public broadcast. MoreBC2's September v31 `sendrawtransaction` test used a zero-peer regtest node and therefore proved only local mempool submission.

## `BroadcastTransaction`

A Core-side transaction-broadcast helper that can drive local acceptance and, when relay conditions permit, peer announcement.

Its existence in source does not by itself establish successful public propagation.

## Candidate block

A block template under construction for possible mining.

Under current BitcoinII ShockWave rules, candidate header time can affect required `nBits`.

## Candidate time

The `nTime` value placed in a candidate block header.

In post-`57750` BitcoinII, changing candidate time can change the required target because the production next-work calculation can use candidate time in ShockWave's stall-recovery path.

Related:

- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Block-template assembly](../developers/source-atlas/miner.md)

## Chainstate

The node's validated view of the active chain and spendable coin state.

Chainstate is closely tied to the UTXO set and block connection/disconnection.

## `CheckBlock`

A validation path for block properties that can be checked without applying the block to the UTXO state.

Examples include merkle-root, coinbase-placement, structural, and block-limit checks.

## `CheckProofOfWork`

The proof-of-work validation helper that checks whether a compact target is valid and whether the candidate hash satisfies it.

Current reviewed behavior rejects negative, zero, overflowed, over-`powLimit`, or insufficient-work targets.

## `CheckTransaction`

A context-independent transaction structure check.

Examples include non-empty inputs/outputs, value-range checks, duplicate-input rejection, and coinbase/non-coinbase previous-output rules.

## Chain reorganization

A switch from the current active branch to another valid usable branch with greater accumulated work.

See [Reorganizations](reorganizations.md).

## Coinbase transaction

The first transaction in a block. It creates the block subsidy and collects transaction fees.

Coinbase outputs are subject to maturity before ordinary spending.

## Coins view

An abstraction over UTXO state used during validation and chainstate operations.

Views can be layered and cached.

## Confirmation

One unit of active-chain burial depth for a transaction.

A transaction in the current active tip has one confirmation; each later active-chain block increases the count.

Confirmation count is not deterministic finality.

## Consensus rule

A rule that determines whether a block or transaction is valid to fully validating nodes.

Consensus rules are distinct from mempool policy, wallet behavior, RPC permissions, or exchange settings.

## Consensus data restrictions

BitcoinII-specific v31 consensus rules active from mainnet height `57750` that restrict selected data-carrying constructions.

Current Source Atlas coverage includes OP_RETURN count/size, actual `OP_13` opcodes in OP_RETURN scripts, bare multisig, Taproot annex data, oversized script-path tapscripts, and semantic Ordinals inscription envelopes.

Related:

- [Consensus data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)

## Contextual check

A validation check whose result depends on chain context such as height, previous block, median time, activation state, or current consensus parameters.

ShockWave difficulty validation is contextual because next required work depends on recent branch history and candidate context.

## `ConnectBlock`

The validation path that applies a valid block to the UTXO view.

It performs input/script checks in the appropriate consensus context, applies UTXO changes, records undo information, and checks reward accounting.

## `ConnectTip`

The chainstate operation that connects one block as the next active tip after validation succeeds.

## Descendant

In mempool context, an unconfirmed transaction that depends directly or indirectly on another unconfirmed transaction.

## Descriptor wallet

A wallet whose address/script derivation is represented by output descriptors.

The September Windows v31 disposable wallets used by MoreBC2 were SQLite descriptor wallets.

## Difficulty

A human-facing expression of how restrictive the proof-of-work target is.

Higher difficulty corresponds to a lower target and more expected hashing work.

## Difficulty target

The numeric threshold a valid block-header hash must be less than or equal to.

The compact encoding is stored in the header's `nBits` field.

## Disconnected transaction pool

Temporary storage used during a reorganization to hold transactions from disconnected blocks so eligible transactions can be reconsidered for mempool admission.

Related:

- [Disconnected transactions](../developers/source-atlas/disconnected-transactions.md)

## `DisconnectBlock`

The validation path that reverses a connected block's UTXO effects using undo data.

## `DisconnectTip`

The chainstate operation that removes the current active-tip block during reorganization or rollback handling.

## Dry-run acceptance

Checking whether a transaction would pass local mempool acceptance without inserting it.

`testmempoolaccept` is the principal RPC example. MoreBC2 exercised it successfully on the disposable v31 regtest transaction.

## Economic finality

An informal risk concept describing confidence that a confirmed transaction will remain in the active chain.

BitcoinII proof of work does not provide absolute economic finality at a fixed confirmation count. Exchange labels such as `irreversible_confirmations` are service-policy terminology, not a protocol guarantee.

See [Confirmations](confirmations.md).

## External signer

A signing device or process separate from the wallet process, such as hardware-wallet integration.

Current BitcoinII v31 source explicitly recognizes a replay-protection limitation: a signer that cannot produce the BC2 replay-domain-aware signature hash cannot safely sign post-activation transactions merely because it supports ordinary Bitcoin semantics.

## `finalizepsbt`

An RPC that attempts to finalize a PSBT into complete script/witness data and, when complete, can produce the final transaction hex.

MoreBC2 exercised this successfully in the isolated v31 regtest PSBT lifecycle.

## Fork point

The last common block shared by the old active branch and a competing branch during a reorganization.

## Fork/domain ID

A value used to separate signature-hash domains for replay protection.

BitcoinII mainnet v31 activates domain id `0x01324342` from height `57750`.

The domain participates in signature hashing; it is not a normal serialized transaction field or an address-prefix change.

## Fork-aware header synchronization

BitcoinII v31 header-sync behavior that preserves enough branch-specific recent history to evaluate ShockWave difficulty for competing header branches using the production next-work path.

Header synchronization does not itself select the active chain.

Related:

- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)

## `getblocktemplate`

A Core mining RPC used to obtain candidate-block/template information for compatible mining infrastructure.

It is source-reviewed in MoreBC2 but has not yet been exercised in the current v31 runtime records.

## `getindexinfo`

An RPC that reports optional index state.

The September isolated Windows v31 node returned `{}`, consistent with no optional index enabled in that test.

## `GetNextWorkRequired`

The production consensus entry point for obtaining the required target / `nBits` for the next candidate block.

After mainnet height `57750`, it dispatches to ShockWave.

## Initial block download (IBD)

The node state while it is still catching up to the chain and has not yet reached normal synced operation.

A node can answer many RPCs and have active peers while still in IBD.

## `LockPoints`

Mempool metadata used to cache information relevant to sequence-lock validity.

## Mempool

A node-local collection of accepted unconfirmed transactions.

There is no single global mempool shared by all nodes.

## Mempool entry

The node's metadata record for one mempool transaction, including fee/size/dependency/accounting information used by policy, relay, mining, replacement, and eviction logic.

## Mempool policy

Local rules for accepting, keeping, relaying, replacing, packaging, or mining unconfirmed transactions.

Policy can be stricter than consensus.

## Most-work candidate

A valid usable chain candidate with the greatest accumulated chainwork among the candidates the node can currently activate.

## `nBits`

The compact block-header encoding of the proof-of-work target.

Under ShockWave, a template implementation must not assume `nBits` remains valid after changing candidate `nTime`.

## `nTime`

The block-header timestamp field.

Current BitcoinII ShockWave uses recent timing context and can use candidate time in its stalled-chain recovery path.

## Outpoint

A reference to a specific previous transaction output, normally identified by transaction ID plus output index.

Transactions spend outpoints.

## Package acceptance

Mempool evaluation of a group of related transactions together rather than as unrelated single transactions.

Package policy remains distinct from consensus validity.

## P2P

Peer-to-peer communication between BitcoinII nodes.

Current mainnet v31 source/runtime uses P2P port `8338`; the September Windows runtime observed protocol version `70016` and working outbound synchronization in the bounded test environment.

## Policy rule

A local rule affecting mempool acceptance, standardness, relay, replacement, mining selection, or resource limits without necessarily making the transaction invalid in a block.

## Proof-of-work target

See [Difficulty target](#difficulty-target).

## Pruning

Deleting older local block data while preserving enough validated chainstate for supported node operation.

Current v31 defaults observed by MoreBC2 had pruning disabled (`pruned = false`). Pruning and `txindex` are incompatible in current source/configuration.

## PSBT

Partially Signed Bitcoin Transaction, a format for coordinating transaction construction, metadata, signing, and finalization.

Bitcoin-style PSBT structure does not by itself prove BC2 post-activation signing compatibility because signatures must use the correct replay domain.

## Raw transaction RPC

RPC commands for transaction lookup, decoding, construction, signing, PSBT handling, mempool dry runs, and submission outside a wallet's high-level send interface.

## Reindex

A local process that rebuilds block-index / validation state from block data according to the selected reindex mode.

It is an operator action, not a normal troubleshooting toggle to use casually.

## Reorganization

See [Chain reorganization](#chain-reorganization).

## Replay protection

A mechanism that separates signature validity between domains/chains so a signature valid in one domain is not automatically valid in another.

BitcoinII v31 mainnet activates replay protection at height `57750` with domain id `0x01324342`.

Related:

- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)

## Replay-domain cache separation

Current v31 script-validation caching includes the replay/fork domain so a verification result from one signature domain cannot be reused as though it applied to another.

## sat2

The current BitcoinII source display term for the base unit: `1 BC2 = 100,000,000 sat2`.

## Script flags

Flags controlling script-verification behavior.

Whether a particular flag is consensus-mandatory, policy-only, or caller-specific depends on context; documentation should not classify the entire flag set as one category.

## Sequence locks

Relative locktime constraints that can defer transaction validity until specified height or time conditions are met.

## ShockWave

BitcoinII's current per-block difficulty-adjustment algorithm, active on mainnet from height `57750` in `v31.1.0`.

It uses recent chain timing/target history, includes bounded normal adjustment and stall-recovery behavior, and makes candidate-time handling important to mining/template software.

Related:

- [Difficulty adjustment](difficulty-adjustment.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)

## Signature-hash domain

Context incorporated into the digest that is actually signed or verified.

In BC2 v31, the replay-protection fork/domain id changes post-activation signature hashing without changing ordinary address encoding.

## Source Atlas

MoreBC2's file-by-file and feature-path companion to the BitcoinII Core source tree.

Current-release claims should prefer release-pinned v31 pages when they overlap older inherited structural reviews.

## Stratum

A mining-pool protocol/interface used by mining software to receive work and submit shares.

Pool Stratum is separate from BitcoinII Core's mining RPC interface. A published Stratum hostname/port does not prove successful subscribe/authorize/share submission or payout behavior.

## `submitblock`

A mining RPC that submits a candidate block into node validation.

The command is source-reviewed but not yet exercised in MoreBC2's current v31 runtime records.

## `testmempoolaccept`

A dry-run RPC that evaluates whether signed raw transactions would pass local mempool acceptance without inserting them.

The September v31 isolated regtest transaction returned `allowed = true`.

## Transaction finality (locktime sense)

A consensus/policy term for whether a transaction satisfies absolute locktime conditions for a given height/time context.

This is **not** the same concept as economic irreversibility after confirmations.

## Transaction relay

P2P announcement/request/transmission of unconfirmed transactions between nodes.

Local mempool acceptance is necessary for ordinary relay paths but does not guarantee broad network propagation.

## `txindex`

An optional transaction index that enables broader historical transaction lookup by transaction ID.

Current v31 default is off. It should not be assumed available in service designs unless explicitly enabled and operationally planned.

## Undo data

Data recorded so the node can restore spent UTXOs when disconnecting a block.

Undo data is central to safe reorganization handling.

## Undo file

A flat file containing serialized block-undo records.

## Unbroadcast transaction

A locally accepted transaction the node still tracks for relay because successful announcement has not yet been established.

An unbroadcast transaction is not necessarily invalid; it reflects relay state.

## UTXO

Unspent transaction output: a spendable output that has not yet been consumed by a later transaction.

## UTXO set

The current set of unspent transaction outputs represented by chainstate.

## Validation interface

The callback/event layer through which validation and mempool code notify wallets, indexes, UI components, and other subscribers about tip, block, and transaction events.

Subscriber ordering guarantees are scoped; the interface should not be treated as a universal cross-subscriber total order.

## Wallet load state

Whether a wallet directory exists versus whether that wallet is currently loaded into the running node.

In the September v31 Windows test, the disposable wallet remained present after restart, appeared in `listwalletdir`, was not automatically loaded, and then loaded successfully through explicit `loadwallet`.

## Wallet transaction history RPC

Wallet RPC behavior for inspecting wallet transactions, listing activity, polling since a block, abandoning eligible transactions, and rescanning.

Current MoreBC2 coverage is mostly source review; the September runtime test did not qualify the full history/rescan surface.

## `walletcreatefundedpsbt`

A wallet RPC that funds a PSBT using wallet coins while applying fee/change/funding logic.

MoreBC2 exercised it successfully with the disposable v31 regtest wallet.

## `walletprocesspsbt`

A wallet RPC that can update and sign PSBT inputs using wallet information.

MoreBC2 exercised it successfully in the isolated v31 regtest lifecycle.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current MoreBC2 v31 Architecture / Source Atlas pages, September 2026 node and PSBT runtime records, current Mining documentation, and the reviewed root glossary  
**Notes:** The glossary is synchronized to the current v31 evidence boundary. Definitions are explanatory and intentionally shorter than their linked implementation pages. Empirical reorg behavior, full source-build/test-suite qualification, external signing, advanced mining RPC, and several operator workflows remain partial rather than silently inferred.
