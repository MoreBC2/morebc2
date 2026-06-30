# Node startup

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page explains the reviewed BitcoinII Core startup path at a high level.

Startup is the sequence that prepares configuration, local databases, validation state, optional indexes, wallet clients, RPC service state, and network components before normal node operation begins.

## Simplified startup lifecycle

```text
Process begins
  -> context and argument setup
  -> parameter interaction
  -> sanity checks and directory locks
  -> AppInitMain
      -> logging, PID file, scheduler
      -> validation signals
      -> wallet interfaces
      -> RPC registration / warmup
      -> network objects prepared
      -> chainstate and block index loaded
      -> peer manager created
      -> indexes initialized
      -> wallets loaded
      -> pruning / block import / mempool load
      -> wait for active tip or genesis connection
      -> node services enter normal operation
```

## What startup is responsible for

Startup is responsible for ordering.

The reviewed `src/init.cpp` path prepares local block and UTXO state before the node moves into normal peer operation. This keeps startup from depending on incomplete local validation state.

## Step 1: Context and shutdown wiring

`InitContext` attaches global arguments and shutdown signaling into `NodeContext`.

This gives later startup code a common place to access runtime arguments, shutdown handling, and notification wakeups.

## Step 2: Parameter interaction

Before the node fully starts, options are checked and some user-facing arguments are converted into internal configuration.

Reviewed checks include:

- Prune mode incompatibility with `-txindex`.
- Prune mode incompatibility with `-reindex-chainstate`.
- `-forcednsseed` incompatibility with `-dnsseed=0`.
- Bind option restrictions when listening is disabled.
- File descriptor checks and connection-count trimming.
- Logging category and level setup.
- Mining/block option sanity checks for block fee and weight options.
- Wallet parameter interaction.
- Restricting `-test` options to regtest.
- Early option application for chainstate, block manager, and mempool settings.

## Step 3: Sanity checks and directory locks

Startup runs sanity checks before full initialization proceeds.

Reviewed behavior includes kernel sanity checks, ECC sanity checks, directory lock probing, and later directory lock acquisition after daemonization.

Directory locks help prevent two processes from using the same data directory at the same time.

## Step 4: Application initialization

`AppInitMain` begins by creating the PID file, starting logging, creating the scheduler, and scheduling background maintenance tasks.

Reviewed scheduled tasks include periodic entropy gathering and periodic disk-space checks.

Startup then creates validation signals and wallet interfaces.

## Step 5: RPC registration and warmup

The reviewed startup path registers core RPC commands regardless of whether external RPC calls are enabled, because the GUI console may still use them.

If `-server` is enabled, the RPC/HTTP server starts in warmup mode.

Warmup mode means the server can exist before it is ready to process normal calls.

RPC warmup is finished only near the end of startup, after the active tip and chainstate view are ready.

## Step 6: Network component preparation

Startup prepares network-related objects before normal peer operation begins.

Reviewed setup includes:

- Loading ASMAP data if configured.
- Creating netgroup manager.
- Loading address manager.
- Creating ban manager.
- Creating connection manager.
- Building peer manager options.
- Preparing fee estimator when transaction relay is enabled.
- Processing proxy, onion, I2P, reachable-network, user-agent, bind, whitelist, seed, and connect settings.

The important architecture point is ordering:

```text
Prepare network objects.
Load chain/block state.
Enter normal peer operation after local state is ready.
```

## Step 7: Chainstate and block index loading

The reviewed `InitAndLoadChainstate` path constructs the mempool, chainstate options, block manager options, chainstate manager, and chainstate load options.

Then startup calls:

```text
LoadChainstate
  -> VerifyLoadedChainstate
```

When this succeeds, the block index and chainstate are considered loaded.

If loading fails in a way that can be retried, GUI users may be prompted to retry with reindexing.

## Step 8: Peer manager, indexes, and wallets

After chainstate loading, startup creates the peer manager and registers it with validation signals.

Then it initializes optional indexes such as the transaction index, block filter indexes, and coin stats index.

Wallet clients are loaded after index initialization.

## Step 9: Pruning, block import, and mempool loading

Reviewed behavior includes:

- Initial blockstore pruning when pruning is enabled and block files are indexed.
- Setting service flags when appropriate for non-pruned operation.
- Disk-space checks before block import.
- Block notification command handling when configured.
- Starting the `initload` background thread.

The background thread performs block import, optional stop-after-import handling, index background sync, and mempool loading from disk.

## Step 10: Wait for active tip or genesis

Before the node finishes startup, it waits until a tip block is available or shutdown is requested.

The source comments identify cases where the tip may need to be established during startup, including first startup with an empty data directory, reindex, and reindex-chainstate.

## Step 11: Finish startup

Near the end of startup, the reviewed path prepares final connection options, starts normal node services, finishes RPC warmup, emits a done-loading message, starts wallet/client hooks, schedules banlist dumping, starts peer-manager scheduled tasks, and runs startup notification when supported.

At that point, startup has handed off to normal node operation.

## What is not fully reviewed yet

- GUI-specific entry path.
- Daemon executable entry path.
- Shutdown path.
- Block storage internals.
- Wallet internals.
- Net-processing internals.
- Exact startup behavior under every command-line option.
- Local command testing on a BitcoinII binary.

## Related pages

- [Source atlas: init.cpp](../developers/source-atlas/init-cpp.md)
- [Architecture overview](architecture-overview.md)
- [Life of a block](life-of-a-block.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Mempool flow](mempool-flow.md)
- [Node guide](../nodes/node-guide.md)
- [Configuration](../configuration/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This architecture page is based on a first-pass review of `src/init.cpp`, especially `AppInitMain`, `InitAndLoadChainstate`, parameter interaction, chainstate loading, mempool loading, index initialization, and final startup handoff. It should not be treated as a full review of every startup path.
