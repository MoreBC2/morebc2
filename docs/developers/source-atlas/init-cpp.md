# `src/init.cpp`

**Category:** Developer / Source Atlas  
**Status:** Source-reviewed / Runtime-corroborated partial  
**Last reviewed:** 2026-09-12

## Summary

`src/init.cpp` coordinates BitcoinII Core process startup and shutdown. It is a major orchestration layer connecting arguments/configuration, logging, scheduler, validation interfaces, wallets, RPC, networking, chainstate, indexes, mempool persistence, block import, and final node start.

The earlier Source Atlas page was source-only. MoreBC2 now has bounded Windows `v31.1.0` runtime evidence for startup, server-mode RPC, outbound P2P, initial sync, disposable wallet persistence/reload, clean shutdown, and restart.

This remains a partial orchestration map rather than a complete option-by-option startup specification.

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

## Simplified startup flow

```text
InitContext
  -> argument / parameter interaction
  -> sanity checks and directory locks
  -> AppInitMain
      -> logging / scheduler / validation events
      -> wallet interfaces
      -> RPC registration and warmup server when enabled
      -> network objects prepared, connections delayed
      -> chainstate and block-index load/verification
      -> peer manager
      -> optional indexes
      -> wallets
      -> pruning/import/mempool persistence paths
      -> wait for usable tip/genesis state
      -> connection manager start
      -> RPC warmup complete
      -> wallet/client start hooks
```

## Parameter interaction

Reviewed startup constraints include interactions such as:

- prune mode versus `txindex`;
- prune mode versus selected reindex/chainstate operations;
- DNS-seed/network-option consistency;
- listen/bind/whitebind restrictions;
- connection/file-descriptor limits;
- logging/fee/block option validation;
- wallet parameter interaction;
- regtest-only testing options.

Current configuration documentation should take precedence over inherited comments in generated config templates when release-pinned chain parameters disagree.

In particular, current BC2 mainnet P2P default is `8338`, despite stale generated example text inherited from Bitcoin that mentions `8333`.

## Chainstate and mempool initialization

`InitAndLoadChainstate` wires mempool, chainstate-manager, block-manager, notification, cache, reindex, prune, check-level, and related options before the node proceeds to normal networking.

This is where configuration choices such as pruning/indexing become concrete startup state rather than merely command-line text.

Current MoreBC2 runtime evidence observed:

- pruning disabled by default in the disposable v31 mainnet test;
- no optional indexes enabled in that test;
- advancing IBD and retained chain state across restart.

Those observations match the current configuration/source defaults but do not qualify every prune/index combination.

## RPC startup boundary

BitcoinII Qt does not act as an RPC server unless server mode is enabled.

The September 11 Windows mainnet test ran `v31.1.0` Qt with `server=1`, loopback-only RPC, and random-cookie authentication. Because local default port `8332` was occupied by unrelated software, MoreBC2 deliberately used `127.0.0.1:28332` as a test override.

That proves current RPC/server startup under the documented override; `28332` is not a BitcoinII network default.

The node removed its RPC listener/cookie during clean shutdown and successfully restarted against retained disposable data.

## Network initialization and final start

The reviewed startup architecture prepares networking objects before opening normal connections and starts the connection manager only after required local chainstate setup.

The current v31 runtime record observed:

- mainnet P2P listener `0.0.0.0:8338`;
- four automatic outbound peers during the first bounded run;
- six outbound peers after restart;
- current header acquisition without manual peer injection.

This is current-release runtime corroboration of the ordinary startup/network handoff. Inbound connectivity and manual peer-management paths remain separate tests.

## Wallet startup boundary

Wallet startup is delegated into wallet interfaces/load paths rather than being defined only by `init.cpp`.

The September v31 mainnet test used a fresh disposable wallet and established:

- SQLite descriptor wallet creation;
- zero transactions in the test wallet;
- wallet presence in the wallet directory after restart;
- no automatic load in that specific restart state;
- successful explicit `loadwallet`;
- no existing user wallet/data directory touched.

See [Wallet startup](wallet-startup.md).

## Shutdown/restart runtime evidence

The bounded Windows v31 test used the documented RPC stop path and observed a clean process exit. Restart reopened retained disposable chain state and restored normal RPC/network operation under the same isolated configuration.

That is stronger than the old “startup commands have not been tested” wording, but it is still Windows/release-binary/environment-specific evidence rather than a cross-platform source-build qualification.

## v31 consensus-feature boundary

`init.cpp` selects/loads the chain configuration and starts the subsystems that later enforce current v31 rules, but it is not itself the complete implementation of:

- ShockWave;
- replay protection;
- consensus data restrictions;
- fork-aware header synchronization.

Use the dedicated release-pinned Source Atlas pages for those behaviors.

## Build/runtime distinction

The successful September tests used the official `v31.1.0` Windows release artifact whose archive digest matched the recorded GitHub release digest.

They do **not** establish that MoreBC2 has successfully built BitcoinII Core from source. Source-build reproduction remains separate work.

## Related pages

- [Node startup](../../architecture/node-startup.md)
- [Node guide](../../nodes/node-guide.md)
- [Configuration](../../configuration/README.md)
- [Wallet startup](wallet-startup.md)
- [Net connection management](net-connection-management.md)
- [chainparams.cpp](chainparams-cpp.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Open work

- Complete source-pinned review of GUI/daemon entry-point differences where useful.
- Run a clean source build separately from release-binary runtime testing.
- Qualify explicit prune/index/reindex startup combinations with disposable data directories.
- Test inbound P2P and selected failure/recovery paths without weakening RPC/network security.
- Continue shutdown-path review beyond the bounded clean-stop record.

## Primary sources

Pinned/current review scope includes:

- `v31.1.0/src/init.cpp`
- `v31.1.0/src/init.h`
- `v31.1.0/src/node/context.h`
- `v31.1.0/src/node/chainstate.h`
- `v31.1.0/src/node/mempool_persist.h`
- `v31.1.0/src/validation.*`
- `v31.1.0/src/kernel/chainparams.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-corroborated partial  
**Primary evidence:** BitcoinII Core startup source plus September 11 Windows `v31.1.0` startup/RPC/P2P/wallet/restart record  
**Notes:** Ordinary current-release startup and clean restart are now runtime-observed in the documented environment. Source-build, cross-platform, inbound-P2P, and broad failure/recovery paths remain open.
