# Disconnected transactions

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Source files

- `src/kernel/disconnected_transactions.h`
- `src/kernel/disconnected_transactions.cpp`

## Purpose

`DisconnectedBlockTransactions` temporarily stores transactions from blocks that leave the active chain during a reorganization.

Its job is to preserve transactions that may need to be reconsidered for the mempool after the reorg finishes, while avoiding expensive mempool re-acceptance during every intermediate step.

## File header notes

The reviewed files state that BitcoinII was forked from Bitcoin Core version `0.27.0` and is distributed under the MIT software license.

## Why it matters

During a reorg, transactions from the old active chain may become unconfirmed.

Some of those transactions may still be valid and useful to keep in the mempool. Others may be confirmed again in the new chain or may no longer be valid.

`DisconnectedBlockTransactions` provides the temporary holding area used between block handling and final mempool reprocessing.

## Memory limit

The header defines:

```cpp
MAX_DISCONNECTED_TX_POOL_BYTES = 20'000'000
```

This caps the memory used for disconnected transaction processing.

## Queue ordering

The source comments describe the queue order:

- The front of the list should contain the most recently confirmed transactions.
- Transactions are added while blocks leave the active chain.
- If memory usage grows too large, trimming removes entries from the front.
- Remaining transactions can later be re-added from the back toward the front without missing inputs.

## Key data structures

Reviewed members:

- `cachedInnerUsage` — cached dynamic memory usage for transaction references.
- `m_max_mem_usage` — maximum allowed memory usage.
- `queuedTx` — ordered list of transactions being held for later review.
- `iters_by_txid` — lookup map from transaction ID to list iterator.

## Reviewed behavior

### Destructor

The destructor asserts that:

- `queuedTx` is empty.
- `iters_by_txid` is empty.
- `cachedInnerUsage` is zero.

The source comment explains that failing to drain this structure before destruction is considered a logic bug.

### `LimitMemoryUsage`

Reviewed behavior:

- While memory usage exceeds the configured maximum, evict entries from the front of the queue.
- Subtract evicted transaction memory usage.
- Remove evicted transactions from the txid lookup map.
- Return the evicted transactions so callers can handle them.

### `DynamicMemoryUsage`

Reviewed behavior:

- Returns cached transaction memory usage plus dynamic usage of the lookup map and transaction list.

### `AddTransactionsFromBlock`

Reviewed behavior:

- Reserves txid lookup capacity.
- Iterates through the block's transactions in reverse order.
- Appends each transaction to the holding queue.
- Adds each transaction to the txid lookup map.
- Asserts that callers do not pass duplicate transaction IDs.
- Updates cached memory usage.
- Calls `LimitMemoryUsage` and returns any evicted transactions.

### `removeForBlock`

Reviewed behavior:

- Does nothing if the queue is empty.
- For each transaction in a newly connected block, removes matching entries from the holding queue.
- Updates cached memory usage and the txid lookup map.

### `clear`

Reviewed behavior:

- Clears memory usage accounting.
- Clears the txid lookup map.
- Clears the queue.

### `take`

Reviewed behavior:

- Moves out the queued transaction list.
- Clears the internal data structures.
- Returns the moved transaction list.

## Relationship to reorg flow

Reviewed validation flow shows:

```text
DisconnectTip
  -> AddTransactionsFromBlock
  -> evicted transactions may be removed from mempool recursively

ConnectTip
  -> removeForBlock

After chain switch handling
  -> MaybeUpdateMempoolForReorg, still needs deeper review
```

## Related MoreBC2 pages

- [Source atlas: validation.cpp](validation-cpp.md)
- [Block validation flow](../../architecture/block-validation-flow.md)
- [Reorganizations](../../encyclopedia/reorganizations.md)

## Open questions

- Review `MaybeUpdateMempoolForReorg` in detail.
- Confirm exact mempool re-add order after `take()`.
- Confirm whether any BitcoinII-specific behavior differs from inherited Bitcoin Core behavior.
- Decide whether disconnected transaction handling belongs in a separate reorg architecture page.
- Confirm whether the `v31.1.0` release baseline differs from subsequent `main` changes for these files before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/kernel/disconnected_transactions.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/disconnected_transactions.h
- Current observed `main` `src/kernel/disconnected_transactions.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/disconnected_transactions.cpp
- Current observed `main` `src/validation.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/validation.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** This page documents the disconnected-transaction holding structure. Final mempool re-add behavior and release-versus-main comparison still need review.
