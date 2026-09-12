# Node startup

**Category:** Architecture
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page explains the BitcoinII Core startup path at a high level and now incorporates the September 11 BitcoinII Core `v31.1.0` Windows runtime validation.

Startup prepares configuration, chainstate, block-index state, optional indexes, wallet clients, RPC, mempool state, network components, peer management, and shutdown wiring before normal node operation.

## Simplified startup lifecycle

```text
Process begins
  -> context and argument setup
  -> parameter interaction
  -> sanity checks and directory locks
  -> AppInitMain
      -> logging / scheduler / validation signals
      -> wallet interfaces
      -> RPC registration and warmup
      -> network objects prepared
      -> chainstate and block index loaded
      -> peer manager created
      -> optional indexes initialized
      -> wallets loaded
      -> pruning / block import / mempool load
      -> active tip or genesis becomes available
      -> normal node services start
      -> RPC warmup finishes
```

## Configuration and parameter interaction

Reviewed startup behavior includes checks and interactions around:

- pruning and indexing;
- DNS seeding and networking options;
- bind/listen behavior;
- file descriptors and connection limits;
- logging;
- mining/block settings;
- wallet startup options;
- chainstate, block-manager, and mempool configuration.

Current mainnet source parameters use P2P port `8338`. Current mainnet RPC source/default is `8332`, but RPC is operator-configurable.

## Directory isolation and safety

BitcoinII Core uses data-directory locking to prevent multiple processes from independently writing the same data directory.

MoreBC2's September runtime validation went further operationally: every test launch explicitly selected a new disposable data directory, and no existing BitcoinII data directory or wallet was opened, copied, imported, rescanned, unlocked, inspected, or spent from.

## RPC registration and warmup

Core RPC commands are registered during startup. When server mode is enabled, the HTTP/RPC service starts in warmup and becomes fully available once initialization reaches the appropriate state.

The September v31 runtime test directly exercised cookie-authenticated RPC on loopback. The test used explicit port `28332` because local port `8332` was already occupied by unrelated software; `28332` is therefore a **test override**, not the BitcoinII mainnet default.

## Network preparation

Startup prepares network state such as:

- address manager;
- ban/discouragement state;
- connection manager;
- peer-manager options;
- proxy/onion/I2P settings where configured;
- reachable-network state;
- bind/listen configuration;
- seed/connect behavior;
- transaction-relay and fee-estimator state where applicable.

The architecture ordering remains important: local chain/block state is prepared before the node settles into ordinary network operation.

## Chainstate and block-index loading

Startup constructs and loads chainstate and block-manager state, verifies the loaded chainstate, and prepares the active-chain view.

Initial startup, reindex, or incomplete local state may require additional block/header acquisition before the node is fully synchronized.

## Indexes and wallets

Optional indexes are initialized according to configuration.

In the September runtime test, `getindexinfo` returned `{}`, consistent with no optional index being enabled. `txindex`, block-filter indexing, and coin-statistics indexing were deliberately left at default/off for the test.

The same test created a disposable SQLite descriptor wallet. On restart, the wallet remained present in `listwalletdir` but was not automatically loaded; an explicit `loadwallet` succeeded.

That is useful current wallet-startup evidence, but it does not establish every wallet startup option or migration path.

## Mempool load and final startup

The startup path loads or initializes mempool state, starts remaining background work, completes service startup, and eventually finishes RPC warmup.

The September mainnet test observed `getmempoolinfo.loaded = true` and a functioning RPC server while the node was still in initial block download.

A node can therefore be operational for local status/RPC purposes before it has completed full historical validation.

## September 11 v31.1.0 runtime result

The isolated Windows 11 test directly established that BitcoinII Core `v31.1.0` could:

- start successfully in Qt server mode;
- report runtime version `310100`, subversion `/BitcoinII:31.1.0/`, protocol `70016`;
- listen for P2P on `0.0.0.0:8338`;
- establish four outbound peers on the first run;
- acquire the current header chain and advance block validation during IBD;
- answer current status/network/mempool/chain RPCs;
- create one new zero-transaction disposable descriptor wallet;
- stop cleanly;
- restart against the same disposable data directory;
- reconnect with six outbound peers;
- retain local chain state;
- explicitly reload the same disposable wallet;
- stop cleanly a second time with the RPC cookie removed and listener gone.

The test intentionally ended before initial block download completed. It did not create, sign, submit, or broadcast a transaction.

## Runtime boundary

This evidence is meaningful for Windows v31 startup architecture, but it does not prove:

- Linux or macOS startup behavior;
- a source-built binary path;
- full initial-block-download completion;
- every startup flag;
- inbound peer connectivity;
- long-duration node stability;
- production wallet safety.

The separate September 11 regtest PSBT test provides transaction/wallet runtime evidence under a different isolated environment.

## Related pages

- [Architecture overview](architecture-overview.md)
- [Peer communication model](peer-communication-model.md)
- [Mempool flow](mempool-flow.md)
- [Source atlas: init.cpp](../developers/source-atlas/init-cpp.md)
- [Source atlas: wallet startup](../developers/source-atlas/wallet-startup.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Configuration](../configuration/README.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 startup/source reviews plus the September 11 Windows v31.1.0 startup, RPC, peer, disposable-wallet, restart, and shutdown validation  
**Notes:** Windows release-binary startup now has direct bounded runtime evidence. Cross-platform startup, source-build reproduction, full IBD, inbound networking, every option path, and long-duration operation remain partial or untested.
