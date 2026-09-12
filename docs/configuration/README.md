# Configuration

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This section documents BitcoinII Core configuration concepts and current `v31.1.0` behavior.

Configuration claims are separated into:

- release-pinned source/defaults;
- directly observed September 2026 runtime behavior;
- operator recommendations that still need environment-specific testing.

The current configuration baseline is BitcoinII Core `v31.1.0`.

## Current pages

- [Configuration overview](configuration-overview.md)
- [RPC configuration](rpc-configuration.md)
- [Node configuration](node-configuration.md)

## Current evidence baseline

The strongest current configuration evidence is:

- the `v31.1.0` generated `share/examples/bitcoinII.conf`;
- release-pinned startup/network/index/wallet source;
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md);
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md);
- [RPC overview](../developers/rpc-overview.md);
- [Node startup](../architecture/node-startup.md).

The September mainnet test used a fresh disposable data directory, Qt in server mode, loopback-only cookie RPC, default P2P behavior, default pruning/index settings, a disposable wallet, clean shutdown, and restart. The separate regtest test exercised a disposable wallet/PSBT lifecycle with all networking disabled.

## Important current configuration facts

### Mainnet P2P port

BitcoinII `v31.1.0` chain parameters set the mainnet P2P default to:

```text
8338
```

The generated example configuration still contains inherited wording showing `8333` for the default `-port`. That is documentation drift. For current BitcoinII mainnet, use the release-pinned chain parameter and current runtime evidence: **8338**.

The September Windows mainnet test directly observed BitcoinII listening on `0.0.0.0:8338` and establishing outbound peers.

### RPC defaults

Current `v31.1.0` documentation/source consistently gives these JSON-RPC defaults:

| Network | Default RPC port |
|---|---:|
| mainnet | `8332` |
| testnet3 | `18332` |
| testnet4 | `48332` |
| signet | `38332` |
| regtest | `18443` |

RPC ports are operator-configurable. MoreBC2's September tests deliberately used alternate loopback ports for isolation and to avoid a local port conflict; those test ports are not defaults.

### Qt server mode

BitcoinII Qt must have server/RPC mode enabled when it is being used as a JSON-RPC server. The September mainnet test used:

```ini
server=1
```

with loopback-only RPC settings and random-cookie authentication.

### Pruning and indexes

Current source/defaults establish:

- pruning defaults to disabled (`prune=0`);
- `txindex` defaults to disabled;
- pruning is incompatible with `txindex`;
- optional indexes should be enabled only for a workflow that needs them.

The September mainnet runtime matched those defaults: `pruned = false` and `getindexinfo = {}`.

### Wallet configuration

Wallet loading and node operation are separate configuration concerns.

The September mainnet test created only a fresh disposable SQLite descriptor wallet. After node restart the wallet remained on disk but was not automatically loaded in that test; explicit `loadwallet` succeeded.

The separate isolated regtest test exercised wallet creation and PSBT signing only with a fresh disposable wallet. Existing wallets were never opened or modified.

Do not infer third-party wallet or external-signer compatibility from ordinary Core wallet configuration. Current BC2 replay-protection signing behavior is a separate compatibility requirement.

## Network-specific sections

Current v31 configuration documentation supports network-specific sections including:

```ini
[main]
[test]
[testnet4]
[signet]
[regtest]
```

Network-specific values take precedence over non-network-specific values for that chain. Do not assume an option written outside a section applies identically to every network; check the current option documentation.

## Safety rules

- Do not expose BitcoinII Core RPC directly to the public internet.
- Prefer loopback RPC unless a specific trusted-network architecture has been designed and reviewed.
- Keep `rpcbind`, `rpcallowip`, authentication, firewalling, and service permissions aligned.
- Treat `datadir`, wallet paths, pruning, and reindex operations as state-sensitive options.
- Never reuse a production wallet/data directory for an experiment.
- Separate source defaults from recommended production settings.
- Record BitcoinII version, network, platform, relevant config, and date for runtime claims.
- Do not copy the generated example config's stale mainnet P2P `8333` wording into current BC2 instructions.

## 2026-09-12 audit record

The full Configuration section was reviewed against current v31 source/defaults and the September runtime evidence.

Key repairs include:

- replacing the old v29-centered RPC-port discussion with current v31 defaults;
- documenting the `8333` generated-config / `8338` chain-parameter discrepancy;
- adding direct v31 evidence for Qt `server=1`, loopback cookie RPC, peer discovery, and restart;
- adding source/runtime-backed pruning and indexing defaults;
- adding current network-specific section names, including `testnet4`;
- adding wallet-loading and disposable-wallet evidence without generalizing to third-party signing;
- removing the old claim that local configuration behavior had not yet been tested.

## Related pages

- [Node guide](../nodes/node-guide.md)
- [RPC overview](../developers/rpc-overview.md)
- [Node startup](../architecture/node-startup.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Network specifications](../documentation/network-specifications.md)
- [Compatibility](../compatibility/README.md)
- [Command testing status](../verification/command-testing.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` generated configuration/source plus September 11 Windows mainnet node/RPC and isolated regtest wallet/PSBT evidence  
**Notes:** Current node/RPC configuration has meaningful Windows runtime coverage. Cross-platform paths, production service hardening, alternate RPC authentication patterns, pruning workflows, optional-index rebuilds, inbound-node operation, and third-party signer behavior remain partial or untested.
