# Disconnected transactions

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Source files

- `v31.1.0/src/kernel/disconnected_transactions.h`
- `v31.1.0/src/kernel/disconnected_transactions.cpp`
- related reorg handling in `v31.1.0/src/validation.cpp`

## Purpose

`DisconnectedBlockTransactions` temporarily holds transactions removed from the active chain during a reorganization so eligible transactions can later be reconsidered for the mempool.

It is an intermediate reorg structure, not a permanent wallet/history database and not a final statement that every disconnected transaction will be reaccepted.

## Memory and ordering

The reviewed structure caps disconnected-transaction memory at:

```text
20,000,000 bytes
```

Transactions are queued in an order chosen so later re-add processing can preserve dependency relationships. If memory exceeds the cap, entries are evicted and callers can remove affected descendants from mempool state as needed.

## Key reviewed operations

- `AddTransactionsFromBlock` adds transactions from a disconnected block and enforces the memory cap.
- `removeForBlock` removes queued transactions that become confirmed again on the newly connected branch.
- `take` transfers the remaining queue for later reorg processing and clears internal state.
- `clear` resets the holding structure.
- destructor assertions require the structure to be drained/cleared correctly.

## Current reorg flow

The current reviewed v31 validation path now resolves an older open question from this page:

```text
DisconnectTip
  -> AddTransactionsFromBlock
  -> possible memory-limit eviction handling

ConnectTip
  -> removeForBlock for transactions confirmed on the new branch

MaybeUpdateMempoolForReorg
  -> take remaining disconnected transactions
  -> attempt reacceptance in dependency-safe order
  -> remove transactions/descendants that cannot be restored
  -> refresh descendant state
  -> remove transactions no longer final or spending immature coinbase outputs
  -> re-limit mempool size
```

So the queue is only a temporary bridge. Final mempool state is determined by current-chain validity/policy when the reorg settles.

## v31 replay-protection boundary

Reorg/mempool reacceptance ultimately flows through current BitcoinII transaction validation. From mainnet height `57750`, replay-domain-aware signature validation matters for any transaction being considered for the next block.

The disconnected-transaction container itself does not calculate signature hashes; the relevant current-domain checks happen in validation/mempool acceptance.

See [Mempool accept](mempool-accept.md) and [Replay protection v31](replay-protection-v31.md).

## Chainwork boundary

A reorganization is driven by best-valid-chain selection according to accumulated chain work. This holding structure reacts to blocks leaving/entering the active chain; it does not choose the winning branch.

## Runtime boundary

MoreBC2 has not created an intentional `v31.1.0` reorg fixture that observes this queue directly. September mainnet and regtest tests did not force a competing branch/reorg.

Current behavior on this page is source-confirmed rather than runtime-instrumented.

## Related pages

- [validation.cpp](validation-cpp.md)
- [Mempool accept](mempool-accept.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)

## Open work

- Build an isolated deterministic reorg fixture if direct runtime qualification becomes useful.
- Record transaction re-add/removal behavior across that fixture.
- Map relevant unit/functional tests after a clean v31 source build.

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` disconnected-transaction helpers plus current v31 reorg/mempool validation review  
**Notes:** The holding queue and its place in `MaybeUpdateMempoolForReorg` are source-mapped. Direct runtime reorg instrumentation remains open.
