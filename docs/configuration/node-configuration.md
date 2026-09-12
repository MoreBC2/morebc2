# Node configuration

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page documents BitcoinII Core `v31.1.0` node-operation configuration using release-pinned source/defaults plus the September Windows runtime evidence.

It distinguishes current defaults from tested behavior and from production recommendations.

## Current node-operation options

The generated `v31.1.0` configuration includes node/state options such as:

| Option | Current purpose | Evidence |
|---|---|---|
| `datadir` | Select data directory | Source + runtime-tested |
| `blocksdir` | Select block-file directory | Source-observed |
| `debuglogfile` | Select debug log location | Source + runtime log observed |
| `daemon` | Run daemon in background | Source-observed; not used in Sept Qt test |
| `daemonwait` | Wait for daemon initialization | Source-observed |
| `reindex` | Rebuild block index/chainstate and active indexes from block files | Source-observed |
| `reindex-chainstate` | Rebuild chainstate from block files | Source-observed |
| `txindex` | Maintain full transaction index | Source + default/runtime observed |
| `txospenderindex` | Maintain transaction-output spender index | Source-observed |
| `blockfilterindex` | Maintain compact block-filter index | Source-observed |
| `coinstatsindex` | Maintain coinstats index | Source-observed |
| `prune` | Delete old block files according to pruning mode/target | Source + default/runtime observed |
| `dbcache` | Set database-cache limit | Source-observed |
| `maxmempool` | Set maximum mempool memory | Source + runtime value observed |
| `mempoolexpiry` | Set mempool transaction age limit | Source-observed |
| `persistmempool` | Save/load mempool state | Source-observed |
| `blocksonly` | Reject transactions received from ordinary network peers | Source-observed |
| `disablewallet` | Do not load wallet functionality / wallet RPC | Source-observed |

A source-observed option is not automatically a recommended production setting.

## Mainnet P2P configuration

Current BitcoinII `v31.1.0` chain parameters set the mainnet default P2P port to:

```text
8338
```

The generated example configuration still contains inherited text saying `-port` defaults to `8333`. That statement is stale for current BitcoinII mainnet.

The September Windows runtime directly confirmed:

- listener on `0.0.0.0:8338`;
- outbound peers using BitcoinII protocol version `70016`;
- four outbound full-relay peers on the first run;
- six outbound full-relay peers after restart;
- header acquisition and advancing block validation.

For current BC2 instructions, **8338** is the source- and runtime-backed mainnet P2P default unless an operator explicitly overrides `-port`.

## Connection options

Current configuration exposes options including:

| Option | Purpose | Current evidence |
|---|---|---|
| `listen` | Accept inbound P2P connections when enabled | Source-observed |
| `addnode` | Maintain connection attempts to specified node(s) | Source-observed |
| `connect` | Restrict automatic connections to specified node(s); `-noconnect` disables them | Source + isolated regtest behavior |
| `dns` | Allow DNS lookup for peer-related options | Source-observed |
| `dnsseed` | Query DNS seeds when address supply is low | Source + connected mainnet / disabled regtest evidence |
| `fixedseeds` | Permit compiled fixed-seed fallback | Source-observed |
| `bind` | Bind P2P listener to a given local address | Source-observed |
| `externalip` | Advertise a specified public address | Source-observed |
| `discover` | Discover local/public addresses under supported conditions | Source-observed |
| `onlynet` | Restrict automatic outbound connections by network type | Source-observed |
| `networkactive` | Enable/disable P2P network activity | Source + RPC-observed |
| proxy/onion/I2P options | Route selected transports through configured services | Source-observed |

### Connected-mainnet test

The September mainnet test used normal networking and obtained outbound IPv4 peers automatically.

### Fully isolated regtest test

The separate PSBT test deliberately used:

```text
-listen=0
-connect=0
-dnsseed=0
```

`getnetworkinfo` reported zero connections and `getpeerinfo` returned no peers. The transaction remained local to the isolated regtest mempool.

That gives MoreBC2 current runtime evidence for both ordinary outbound connectivity and deliberate network isolation.

## Pruning

Current `v31.1.0` generated config describes:

```text
prune=0   -> pruning disabled
prune=1   -> manual pruning allowed through RPC
prune>=550 -> automatic target size in MiB
```

Important current boundaries:

- pruning defaults to disabled;
- pruning is incompatible with `txindex`;
- returning from pruned operation can require redownloading the blockchain;
- old wallet rescans can fail if required historical block data is no longer present locally;
- a pruned node may be perfectly valid for some workloads while unsuitable for others.

The September mainnet runtime deliberately left pruning at default and directly observed:

```text
pruned = false
```

MoreBC2 has **not** yet run a current v31 pruning migration/recovery test, so no production prune target is recommended here.

## Indexing

Current v31 source establishes `DEFAULT_TXINDEX = false`.

The generated config also exposes optional block-filter, coinstats, and transaction-output-spender indexes.

The September runtime deliberately left optional indexes disabled and observed:

```json
{}
```

from `getindexinfo`.

For services:

- do not assume `getrawtransaction` can retrieve arbitrary historical transactions without appropriate local data/index context;
- enable only the indexes the service actually requires;
- test initial build/rebuild time and disk use in the intended environment;
- do not combine pruning with `txindex` because current startup validation rejects that combination.

## Reindex options

`reindex` and `reindex-chainstate` are state-changing recovery/maintenance operations.

They should not be presented as casual troubleshooting toggles:

- `reindex` rebuilds block-index/chainstate state from local block files and rebuilds active optional indexes;
- `reindex-chainstate` rebuilds chainstate from local block files;
- behavior depends on what block files remain available locally;
- pruning changes what historical data remains available.

MoreBC2 has not yet executed these v31 workflows in the current test environment.

## Wallet configuration boundary

Current Core exposes wallet startup controls including `-disablewallet` and wallet-loading options.

Current MoreBC2 runtime evidence establishes only bounded behavior:

- a fresh mainnet disposable SQLite descriptor wallet could be created;
- after restart it remained in `listwalletdir` but was not automatically loaded in that test;
- explicit `loadwallet` succeeded;
- a separate isolated regtest disposable wallet completed funding, PSBT signing/finalization, acceptance, and local mempool submission.

No existing wallet was opened or modified.

Do not assume external-signer compatibility from these results. Current mainnet replay protection changes signature hashing after height `57750`, and the source explicitly guards external-signer paths that cannot represent BC2's replay domain.

## Mempool defaults observed at runtime

The September mainnet test observed a loaded mempool with values including:

- `maxmempool = 300000000` bytes;
- `fullrbf = true`;
- `permitbaremultisig = false`;
- `maxdatacarriersize = 83`;
- `maxtapscriptsize = 3600`;
- minimum relay/mempool fee fields at their then-current values.

Those are dated runtime observations for `v31.1.0`, not immutable network consensus constants. Mempool policy can differ from consensus and can change by release/configuration.

## Safe experimental pattern

For configuration testing, MoreBC2's preferred pattern is:

- use a brand-new disposable `-datadir`;
- choose a loopback RPC port known to be free;
- do not point tests at an existing wallet/data directory;
- explicitly disable networking when public communication is not needed;
- inspect the runtime log to confirm the selected data directory/config;
- stop through supported RPC and verify clean process exit.

This pattern was used successfully in both September v31 tests.

## What remains open

- Current Linux/macOS runtime configuration.
- Inbound public-node/firewall/NAT qualification.
- Pruning enable/disable/recovery testing.
- Optional-index initial build and rebuild testing.
- `reindex` and `reindex-chainstate` runtime qualification.
- Long-duration mempool persistence behavior.
- Wallet backup/restore/rescan under pruning.
- Production exchange/explorer node profiles.

## Related pages

- [Configuration overview](configuration-overview.md)
- [RPC configuration](rpc-configuration.md)
- [Node startup](../architecture/node-startup.md)
- [Peer communication model](../architecture/peer-communication-model.md)
- [RPC overview](../developers/rpc-overview.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` generated config/startup/index source plus September Windows mainnet and isolated regtest runtime records  
**Notes:** Current P2P, default pruning/index posture, outbound peer discovery, deliberate network isolation, disposable wallet behavior, and restart behavior have direct bounded runtime evidence. Pruning migrations, index builds/rebuilds, inbound operation, reindex workflows, production service profiles, and cross-platform behavior remain untested or partial.
