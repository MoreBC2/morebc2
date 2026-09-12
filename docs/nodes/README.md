# Nodes

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This section documents BitcoinII (BC2) node operation using BitcoinII Core `v31.1.0` as the current release baseline.

MoreBC2 now has direct Windows `v31.1.0` runtime evidence for isolated mainnet startup, loopback RPC, outbound peer discovery, header/block synchronization during initial block download, default pruning/index state, disposable-wallet creation/reload, clean shutdown, and restart.

Older `v29.1.0` node records remain useful historical evidence and should not be rewritten as though they were v31 tests.

## Current pages

- [Tested Windows v31 node guide](node-guide.md) — a bounded Windows route based on the September 11 `v31.1.0` mainnet validation.

## Current v31 runtime baseline

The September 11 Windows mainnet test directly established that BitcoinII Core `v31.1.0` could:

- start from a fresh disposable data directory in Qt server mode;
- report runtime version `310100`, subversion `/BitcoinII:31.1.0/`, and protocol `70016`;
- expose cookie-authenticated JSON-RPC on loopback;
- listen for BitcoinII mainnet P2P on `8338`;
- discover outbound peers without manual peer scaffolding;
- acquire the then-current header chain and advance block validation during IBD;
- report pruning disabled and no optional indexes enabled under the test defaults;
- create one fresh disposable SQLite descriptor wallet;
- stop cleanly;
- restart against retained chain state;
- reconnect normally;
- find the disposable wallet on disk and reload it explicitly;
- stop cleanly again.

The bounded test did **not** complete initial block download, test inbound public reachability, run for long-duration uptime, or use an existing production wallet.

See [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md).

## P2P and peer discovery

Current `v31.1.0` chain parameters set BitcoinII mainnet P2P to:

```text
8338
```

This matters because the generated example configuration still contains inherited `8333` wording for the generic `-port` comment. Current BitcoinII documentation should use the release-pinned chain parameter and dated runtime evidence rather than copying that stale generated comment.

The September test directly observed:

- first run: 4 outbound full-relay IPv4 peers;
- restart: 6 outbound full-relay IPv4 peers;
- peer protocol version `70016`;
- peer subversion `/BitcoinII:31.1.0/`;
- current header acquisition during the test window.

That is point-in-time evidence, not a guarantee that every future startup will find peers immediately.

## RPC

Current v31 source/docs use these default JSON-RPC ports:

| Network | Default RPC port |
|---|---:|
| mainnet | `8332` |
| testnet3 | `18332` |
| testnet4 | `48332` |
| signet | `38332` |
| regtest | `18443` |

The September mainnet test used explicit loopback port `28332` because local `8332` was already occupied by unrelated software. The separate isolated regtest wallet/PSBT test used `29443`.

Those are test overrides, not BitcoinII defaults.

BitcoinII Qt requires server/RPC mode to be enabled when used as a JSON-RPC server. MoreBC2's tested route used `server=1`, loopback binding, and random-cookie authentication.

Do not expose BitcoinII Core RPC directly to the public internet.

## Pruning and indexing

Current source/defaults and the September runtime agree on these points:

- pruning defaults to disabled (`prune=0`);
- `txindex` defaults to disabled;
- pruning is incompatible with `txindex`;
- optional indexes should be chosen for the intended service workflow rather than enabled blindly.

The September mainnet test observed:

```text
pruned = false
getindexinfo = {}
```

That means no optional index was active in that test.

A wallet, exchange, explorer, pool, or archival service may need different storage/index choices. MoreBC2 has not yet published a single production profile that should be copied across all operators.

## Wallet boundary

Node operation and wallet operation should be treated as separate concerns.

The September mainnet node test created only one new disposable wallet. It did not open, copy, rescan, import, unlock, inspect, or spend from an existing wallet.

After restart, that disposable wallet remained present in `listwalletdir` but was not automatically loaded in the observed test; explicit `loadwallet` succeeded.

A separate isolated regtest test exercised the current v31 wallet/PSBT path and local-only transaction submission. That test had zero peers and did not broadcast to the public network.

Current BC2 replay protection also means Bitcoin-like wallet/signing structure must not be interpreted as proof of third-party or external-signer compatibility.

See [Wallet guide](../wallets/wallet-guide.md) and [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## v31 node-relevant consensus changes

The current release includes BitcoinII-specific rules relevant to node validation and synchronization:

- ShockWave per-block difficulty adjustment from mainnet height `57750`;
- consensus-level data restrictions from height `57750`;
- BC2 replay protection from height `57750`;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT changes.

Nodes should be treated as current BitcoinII validators, not as generic Bitcoin nodes with only renamed branding.

## Historical v29 records

The dated Windows `v29.1.0` records remain preserved as historical evidence for that release, including the earlier CLI-based startup, DNS-bootstrap, RPC, shutdown, and restart work.

They remain useful for release history and behavior comparison. They are no longer the primary operational baseline for this section.

## What remains open

- Full v31 initial-block-download completion and measured sync duration.
- Long-duration Windows uptime/stability.
- Linux and macOS node-runtime validation.
- Public inbound-node reachability and firewall/NAT guidance.
- Controlled pruning workflow and recovery testing.
- Optional-index enable/rebuild testing.
- Upgrade testing from a real pre-v31 data directory.
- Controlled v31 reorg/fork synchronization testing.
- Production service profiles for exchanges, explorers, pools, and archival nodes.
- Public-network transaction broadcast from a current disposable wallet.

## Rules

- Always label runtime evidence with OS, BitcoinII version/ref, date, and network.
- Do not expose RPC to untrusted networks.
- Separate P2P ports from RPC ports.
- Separate protocol/source defaults from operator-selected overrides.
- Do not copy the generated config's stale mainnet `8333` P2P wording into current instructions.
- Treat live peer counts and chain heights as dated observations.
- Never use an existing wallet or data directory for an experimental procedure.
- Do not generalize local wallet/PSBT success into third-party signer compatibility.
- Do not call a node fully synchronized until IBD is complete and validated blocks have caught up appropriately.

## Related pages

- [Tested Windows v31 node guide](node-guide.md)
- [Configuration](../configuration/README.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Node startup architecture](../architecture/node-startup.md)
- [Peer communication model](../architecture/peer-communication-model.md)
- [Network specifications](../documentation/network-specifications.md)
- [RPC overview](../developers/rpc-overview.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source/release configuration plus September 11 Windows mainnet node/RPC and isolated regtest wallet/PSBT evidence  
**Notes:** Windows v31 startup, outbound peer discovery, bounded IBD, loopback RPC, default pruning/index state, disposable wallet creation/reload, shutdown, and restart now have direct evidence. Full sync, inbound operation, pruning/index rebuilds, cross-platform parity, upgrade paths, and long-duration production use remain open.
