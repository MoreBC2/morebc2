# Validation interface

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Summary

`src/validationinterface.h` / `validationinterface.cpp` define the notification layer used by validation and mempool code to tell wallets, indexes, UI, and other subscribers about chain/mempool events.

This is **not** consensus validation itself. Current v31-specific consensus rules are enforced in validation/script/PoW paths; the validation interface transports resulting state changes to subscribers.

## Subscriber model

`CValidationInterface` is the subscriber base class. Reviewed implementation state tracks registered subscribers and queued callbacks with lifetime protection so subscribers are not destroyed while callbacks are executing.

For a single subscriber, events are delivered in generated order with effectively serialized callback semantics. Ordering should not be assumed across different subscribers.

## Reviewed events

Current reviewed event methods include:

- `UpdatedBlockTip`
- `ActiveTipChange`
- `TransactionAddedToMempool`
- `TransactionRemovedFromMempool`
- `MempoolTransactionsRemovedForBlock`
- `BlockConnected`
- `BlockDisconnected`
- `ChainStateFlushed`
- `BlockChecked`
- `NewPoWValidBlock`

## Tip and block events

`UpdatedBlockTip` can coalesce multiple connected blocks into a final tip notification; consumers needing each block use `BlockConnected`.

`BlockDisconnected` reports blocks leaving the active chain. Wallet/index consumers can use this to update confirmation/conflict state after a reorg.

`BlockChecked` exposes block validation result state, while `NewPoWValidBlock` occurs earlier in the relevant path and should not be treated as proof that every later block-connection check has finished.

## Mempool events

Reviewed interfaces distinguish:

- transaction admission;
- transaction removal for policy/reorg/conflict/replacement-style reasons;
- transactions removed because they were included in a connected block.

This distinction matters for wallets/services that maintain their own derived state.

## Queue model

Many notifications are queued through the validation task runner, while selected events are delivered synchronously in their current path.

Queue helpers include:

- `FlushBackgroundCallbacks`
- `CallbacksPending`
- `CallFunctionInValidationInterfaceQueue`
- `SyncWithValidationInterfaceQueue`

Callers must avoid deadlocking by waiting on callbacks while holding locks those callbacks may need.

## v31-specific boundary

The notification mechanism remains structurally Bitcoin-style in the reviewed current source. BitcoinII-specific v31 behavior reaches subscribers through the events produced by current validation state, including:

- ShockWave-valid block/header progression;
- replay-domain-aware mempool/block transaction acceptance;
- consensus data-restriction rejection before invalid blocks can become active;
- reorg events driven by accumulated-chainwork best-chain selection.

The interface itself does not independently implement those consensus rules.

## Runtime boundary

The September `v31.1.0` node and disposable-wallet tests necessarily exercised portions of the live validation/wallet/mempool notification ecosystem while startup, IBD, wallet loading, local mempool insertion, and clean shutdown occurred.

However, MoreBC2 did not instrument subscriber callback order or prove every event listed above fired in those tests. Runtime records should therefore not be cited as direct callback-order verification.

## Related pages

- [validation.cpp](validation-cpp.md)
- [Block acceptance](block-acceptance.md)
- [Mempool accept](mempool-accept.md)
- [Wallet startup](wallet-startup.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Life of a reorganization](../../architecture/life-of-a-reorg.md)

## Open work

- Map current wallet/index/UI subscriber registrations where that affects user-facing behavior.
- Trace callback order for a narrow reorg/wallet fixture before documenting it as runtime fact.
- Execute relevant unit/functional tests after a clean v31 source build.

## Primary sources

- `v31.1.0/src/validationinterface.h`
- `v31.1.0/src/validationinterface.cpp`
- `v31.1.0/src/validation.cpp`
- related mempool/wallet subscriber paths

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` validation-interface source and current validation architecture review  
**Notes:** Event types, queue/subscriber model, and major semantics are source-mapped. Exact subscriber registration and runtime callback ordering remain intentionally unclaimed.
