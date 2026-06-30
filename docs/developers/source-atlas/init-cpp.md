# src/init.cpp

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

`src/init.cpp` coordinates BitcoinII Core process startup and shutdown.

This file is a major orchestration layer. It touches argument handling, logging, scheduler setup, validation signals, wallet interfaces, RPC registration, network setup, chainstate loading, indexes, mempool loading, background block import, and final node start.

This first-pass review focuses on the startup path around `AppInitMain` and related helper functions. It does not claim complete coverage of every startup option or shutdown path.

## Why this file matters

Startup is where many subsystems become connected:

- Chain parameters are selected before initialization.
- Runtime options are checked and converted into internal options.
- Mempool, chainstate, block manager, peer manager, fee estimator, wallet clients, indexes, RPC server, and connection manager are created or started.
- The node avoids opening actual network connections until block and UTXO state are ready.

Because `src/init.cpp` wires so many components together, it is best read as a high-level dependency and sequencing file rather than a narrow consensus file.

## Key symbols reviewed

- `InitContext`
- `AppInitParameterInteraction`
- `AppInitSanityChecks`
- `AppInitLockDirectories`
- `AppInitInterfaces`
- `CheckHostPortOptions`
- `InitAndLoadChainstate`
- `AppInitMain`
- `StartIndexBackgroundSync`

## Startup flow, simplified

```text
InitContext
  -> argument and parameter interaction
  -> sanity checks and directory locks
  -> AppInitMain
      -> PID/logging/scheduler
      -> validation signals
      -> wallet interface construction
      -> RPC registration and warmup server
      -> wallet database integrity checks
      -> network object setup, but no connections yet
      -> chainstate and block index loading
      -> peer manager creation
      -> index initialization
      -> wallet loading
      -> pruning and block import setup
      -> background import / index sync / mempool load
      -> wait for genesis/tip availability
      -> connection manager start
      -> RPC warmup finished
      -> wallet/client start hooks
```

## Reviewed behavior

### Includes show startup breadth

`src/init.cpp` includes headers for chain parameters, HTTP/RPC, indexes, kernel caches, node context, mempool persistence, mining, peer manager options, policy, networking, scheduler, validation, validation interface, and wallet initialization.

This confirms that startup wiring crosses many subsystems.

### PID file and shutdown signal

The file defines `bitcoinIId.pid` as the default PID filename and includes helper logic for creating and removing that PID file.

`InitContext` attaches global arguments and shutdown signaling into `NodeContext`.

### Parameter interaction and checks

The reviewed parameter interaction path checks and applies many startup options before full node startup.

Examples reviewed include:

- Prune mode incompatibility with `-txindex`.
- Prune mode incompatibility with `-reindex-chainstate`.
- `-forcednsseed` with `-dnsseed=0` incompatibility.
- `-bind` / `-whitebind` restrictions when listening is disabled.
- File descriptor limits and connection-count trimming.
- Logging category and level setup.
- Fee/block option sanity checks.
- Wallet parameter interaction.
- Test-only options being restricted to regtest.
- Dummy option application for chainstate, block manager, and mempool option validation before daemonization completes.

### Directory locks and sanity checks

`AppInitSanityChecks` runs kernel sanity checks, ECC sanity checks, and probes directory locks.

`AppInitLockDirectories` later takes and keeps the directory locks after daemonization.

### Interfaces

`AppInitInterfaces` creates the chain and mining interfaces through `node.init`.

This ties process initialization into the interface layer before later startup work proceeds.

### Chainstate initialization and loading

`InitAndLoadChainstate` creates mempool options, constructs the mempool, creates chainstate and block manager option structures, constructs `ChainstateManager`, prepares chainstate-load options, calls `LoadChainstate`, and then calls `VerifyLoadedChainstate` when loading succeeds.

Reviewed details include:

- Mempool receives validation signals.
- Chainstate options include chain parameters, network data directory, notifications, and validation signals.
- Block manager options include chain parameters, block directory, notifications, and block tree database settings.
- Reindex controls whether block-tree data is wiped.
- Chainstate load options include mempool, chainstate wipe setting, prune mode, `-checkblocks`, and `-checklevel`.

### AppInitMain application setup

`AppInitMain` starts with PID/logging setup, scheduler creation, periodic entropy gathering, periodic disk-space checks, and validation signal construction.

It then constructs wallet interfaces and registers RPC commands before external RPC calls are usable.

The RPC server may start in warmup mode if `-server` is enabled.

### Network initialization is delayed

The reviewed code explicitly states that actual connections cannot be opened until the end of startup because the UTXO/block state is not set up yet and may need reindexing.

Before opening connections, startup creates or prepares network-related objects such as:

- Netgroup manager.
- Address manager.
- Ban manager.
- Connection manager.
- Fee estimator, when transaction relay is not ignored.
- User agent string.
- Reachable network/proxy state.

### Chain loading

The reviewed startup path creates kernel notifications, calculates cache sizes, determines reindex settings, calls `InitAndLoadChainstate`, and handles possible retry with reindex after some failures.

After successful load, it creates the peer manager and registers it with validation signals.

### Indexes, wallets, pruning, import, and mempool load

Reviewed behavior includes:

- Optional txindex creation.
- Optional block filter index initialization.
- Optional coin stats index creation.
- Index `Init()` calls.
- Wallet client `load()` calls.
- Initial blockstore pruning when pruning is enabled and block files are indexed.
- `NODE_NETWORK` service flag setting when not pruned and not background-sync limited.
- Disk-space checks before import.
- `-blocknotify` connection.
- Background `initload` thread calling `ImportBlocks`, optionally stopping after block import, starting index background sync, and loading the mempool from disk.

### Genesis/tip wait and final node start

Before starting the node, the reviewed code waits for a tip block or shutdown request.

Then it records active-chain height and best block time, starts NAT-PMP mapping when configured, builds connection manager options, processes bind/whitebind/seed/connect/network options, starts Tor/I2P-related setup where configured, and finally calls `node.connman->Start`.

After connection manager startup, RPC warmup is finished, wallet/client start hooks run, banlist dumping is scheduled, peer-manager scheduled tasks start, and startup notification runs when supported.

## BitcoinII-specific notes

Reviewed BitcoinII-specific startup notes include:

- The default PID filename is `bitcoinIId.pid`.
- Startup logging text references `bitcoinII` when warning about fragile relative data-directory usage.
- Network defaults, ports, seeds, chain parameters, and assumed sizes are defined elsewhere, especially in `chainparams.cpp`.

This review did not identify a custom BitcoinII-only startup architecture beyond naming and chain-parameter integration, but this should remain open until `init.cpp` is compared against the exact upstream Bitcoin Core version it was forked from.

## Relationship to architecture pages

Use this Source Atlas page when reading:

- [Node startup](../../architecture/node-startup.md)
- [Life of a block](../../architecture/life-of-a-block.md)
- [Life of a transaction](../../architecture/life-of-a-transaction.md)
- [Mempool flow](../../architecture/mempool-flow.md)

## Open questions

- Which parts of `src/init.cpp` differ from the upstream Bitcoin Core version BitcoinII forked from?
- Which exact executable entry points call the reviewed initialization helpers in GUI vs daemon mode?
- Which local startup commands have been tested against a BitcoinII binary?
- How should MoreBC2 explain startup failure modes for normal users?
- What should be documented separately under node-operation guidance rather than architecture?

## Sources

- `src/init.cpp`
- `src/init.h`
- `src/node/context.h`
- `src/node/chainstate.h`
- `src/node/mempool_persist.h`
- `src/validation.h`
- `src/validationinterface.h`
- `src/kernel/chainparams.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass startup-path review centered on `AppInitMain`, `InitAndLoadChainstate`, and nearby helpers. Shutdown, GUI entry points, daemon entry points, block storage internals, net-processing internals, and wallet internals still need deeper review.
