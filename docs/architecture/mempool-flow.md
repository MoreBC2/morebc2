# Mempool flow

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page maps the BitcoinII Core mempool architecture from transaction acceptance through storage, relay, package handling, reorg repair, and inspection.

The current release baseline is BitcoinII Core `v31.1.0`. The main BitcoinII-specific change relevant here is replay-protection context: mempool signature validation uses the signature-hash domain for the **next block height**.

## What the mempool stores

`CTxMemPool` stores unconfirmed transactions accepted under the node's current chain and policy context.

Transactions are not added merely because they are structurally valid. Policy, fees, conflicts, dependency limits, script checks, and consensus context can all affect admission.

## Main indexed structure

The mempool tracks transactions and relationships needed for:

- txid/wtxid lookup;
- parent/child dependency tracking;
- ancestor/descendant accounting;
- fee/package ordering;
- entry time and eviction;
- relay and mining selection;
- replacement/conflict handling;
- unbroadcast state and inspection.

## Single-transaction acceptance

A simplified path remains:

```text
AcceptSingleTransaction
  -> PreChecks
  -> ReplacementChecks, when applicable
  -> PolicyScriptChecks
  -> ConsensusScriptChecks
  -> Finalize
       -> remove conflicts when appropriate
       -> addUnchecked
       -> size/eviction handling
  -> TransactionAddedToMempool notification
```

## v31 replay-protection context

Current `v31.1.0` source review establishes that mempool signature checks use:

```text
SighashForkId(active_chain_height + 1)
```

That matters at the activation boundary. If the current tip is immediately below replay-protection activation, a transaction being admitted must already be valid for the block in which it could next be mined.

The script-validation cache also includes the fork/domain id so a signature result verified under one domain cannot be reused under another.

Immediately before the replay-protection boundary, BitcoinII clears the mempool so legacy-domain transactions are not carried across activation.

See [Mempool acceptance](../developers/source-atlas/mempool-accept.md) and [Replay protection v31](../developers/source-atlas/replay-protection-v31.md).

## Dry-run acceptance and live local submission

The two important RPC surfaces are:

- `testmempoolaccept` — dry-run acceptance without insertion;
- `sendrawtransaction` — local submission, which may then be relayed if networking and relay conditions permit.

The September 11 isolated `v31.1.0` regtest test directly exercised both:

- `testmempoolaccept` returned `allowed = true` for the finalized disposable transaction;
- `sendrawtransaction` inserted the same transaction into the local zero-peer regtest mempool;
- `getmempoolentry` confirmed the entry;
- `getmempoolinfo` reported one transaction and one unbroadcast transaction.

This is current local runtime evidence. Because the node had zero peers, it is not public-broadcast evidence.

## Mainnet runtime observation

The separate September 11 isolated mainnet node test called `getmempoolinfo` during initial block download.

Observed values included:

- `loaded = true`;
- `size = 0` at that moment;
- `fullrbf = true`;
- `permitbaremultisig = false`;
- `maxdatacarriersize = 83`;
- `maxtapscriptsize = 3600`;
- current relay/minimum-fee fields.

Those values describe that exact runtime observation. They are not long-term mempool statistics or universal service guarantees.

## Normal add/remove relationships

Accepted transactions are inserted only after validation/policy checks. The mempool then updates spend relationships, parent/child links, ancestor/descendant accounting, fees, and memory counters.

Removal paths update those relationships before entries are discarded for reasons such as block inclusion, conflict replacement, eviction, expiry, reorg cleanup, or explicit state changes.

## Package handling

Package acceptance builds on the same transaction acceptance machinery while applying package-shape, dependency, ancestor/descendant, and feerate rules.

Current MoreBC2 source review treats package behavior as structurally understood but not fully runtime-qualified. Package RPCs and edge cases remain advanced integration topics.

## P2P relay relationship

The mempool and P2P relay paths overlap but are not the same thing.

Important boundaries:

- local mempool acceptance does not guarantee broad network propagation;
- peer relay does not guarantee block inclusion;
- public REST route handling does not prove successful valid transaction broadcast;
- block inclusion and confirmations are separate lifecycle stages.

The September local regtest transaction never left the loopback node.

## Reorg repair

During a reorganization, transactions from disconnected blocks can be reconsidered for mempool admission.

The reviewed repair path stages disconnected transactions, connects replacement blocks, re-adds eligible old-branch transactions through normal acceptance, repairs parent/child accounting, removes newly invalid entries, and reapplies mempool limits.

Under v31, re-added transactions are evaluated against the new active-chain context, including the next-block replay-protection domain.

## Consistency and locking

The source documents stronger consistency when chainstate and mempool locks are held together. Chain-tip changes and transaction additions require coordinated state until mempool/chain consistency is restored.

This architecture detail matters most to internal code and service developers working close to node state; ordinary RPC consumers should rely on supported RPC snapshots rather than infer lock state.

## What remains open

- Controlled replay-protection activation-boundary mempool vectors.
- Full package-policy runtime testing.
- Replacement-policy edge cases.
- Fee-estimation behavior.
- Public-network transaction propagation testing.
- Reorg-driven mempool repair in a controlled current-release scenario.

## Related pages

- [Life of a transaction](life-of-a-transaction.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Block validation flow](block-validation-flow.md)
- [Mempool acceptance](../developers/source-atlas/mempool-accept.md)
- [Mempool source](../developers/source-atlas/txmempool.md)
- [Mempool entry](../developers/source-atlas/mempool-entry.md)
- [Mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` mempool/validation/replay-protection source reviews plus September 11 mainnet mempool inspection and isolated regtest acceptance/submission evidence  
**Notes:** Ordinary local v31 mempool acceptance now has bounded runtime coverage. Activation-boundary behavior, package/replacement edge cases, reorg repair, fee estimation, and public propagation remain partial or untested.
