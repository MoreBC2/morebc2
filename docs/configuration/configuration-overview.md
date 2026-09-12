# Configuration overview

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII Core `v31.1.0` can be configured with command-line arguments and `bitcoinII.conf`.

The generated example configuration is:

```text
share/examples/bitcoinII.conf
```

This page now combines release-pinned configuration material with the September 11 Windows runtime tests. It is still not a universal production hardening guide.

## Configuration precedence and scope

Current BitcoinII documentation supports network-specific configuration sections:

```ini
[main]
[test]
[testnet4]
[signet]
[regtest]
```

The current upstream configuration documentation says network-specific options can be placed in those sections or prefixed with the chain name, and network-specific values take precedence over non-network-specific values for that network.

Use `[test]` for testnet3, not `[testnet]`.

Options such as peer/network, RPC, and wallet settings may have network-specific behavior. Do not assume a value written once applies identically across every chain.

## Configuration file and data directory

The generated file says:

- lines beginning with `#` are comments;
- the default config filename is `bitcoinII.conf`;
- a config can be placed under the selected data directory;
- `-datadir` can explicitly select a different data directory;
- `-conf` can select a different configuration file;
- runtime-generated `settings.json` is separate from `bitcoinII.conf` and is not intended to be hand-edited as a replacement for normal config.

MoreBC2's September tests intentionally used **new disposable data directories** rather than any existing BitcoinII directory. That is now the preferred pattern for experiments and validation work.

## Directly tested v31 mainnet configuration

The September 11 Windows mainnet test used a fresh disposable data directory and this narrow RPC configuration:

```ini
server=1
rpcport=28332
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Important interpretation:

- `server=1` enabled JSON-RPC for the Qt process;
- `28332` was an explicit test override because local `8332` was already occupied by unrelated software;
- RPC was loopback-only;
- random-cookie authentication was used;
- no production wallet or data directory was touched.

The node started successfully, answered current v31 RPC, discovered peers, acquired headers, advanced block validation, created a disposable wallet, shut down cleanly, restarted with retained chain state, reloaded the disposable wallet, and shut down cleanly again.

## Directly tested isolated regtest configuration

The September 11 PSBT test used an isolated disposable regtest node with networking deliberately disabled:

```text
-regtest
-server
-rpcport=29443
-rpcbind=127.0.0.1
-rpcallowip=127.0.0.1
-listen=0
-connect=0
-dnsseed=0
```

That test had zero peers and was used only for a disposable local wallet/PSBT/mempool workflow. It is a useful example of how configuration can deliberately isolate a test environment, not a recommended production setup.

## Current network ports

### P2P

BitcoinII `v31.1.0` mainnet chain parameters set:

```text
P2P default = 8338
```

The generated example config still says the default `-port` is `8333`. That inherited text is stale for BitcoinII mainnet.

The September mainnet runtime directly observed BitcoinII listening on `0.0.0.0:8338` and using that port for peers. Current BC2 documentation should therefore use **8338** for mainnet P2P unless the operator explicitly overrides it.

### JSON-RPC

Current v31 documentation consistently gives:

| Network | Default RPC port |
|---|---:|
| mainnet | `8332` |
| testnet3 | `18332` |
| testnet4 | `48332` |
| signet | `38332` |
| regtest | `18443` |

These are defaults, not mandatory values. Operators can select a different `rpcport`.

## Pruning and indexing

Current configuration/source establishes:

- `prune=0` by default;
- `txindex=0` by default;
- block-filter and coin-statistics indexes are also optional;
- pruning is incompatible with `txindex`;
- enabling or disabling indexes can require rebuild/reindex work depending on the change;
- returning from pruned operation can require redownloading block data.

The September Windows mainnet test deliberately left pruning and optional indexes at defaults and observed:

```text
pruned = false
getindexinfo = {}
```

That is a runtime match to the current default posture, not a recommendation that every service should run without indexes.

## Wallet-related configuration

Current configuration exposes wallet controls such as `-disablewallet` and wallet-loading options.

MoreBC2's current runtime evidence is deliberately narrow:

- mainnet test: one fresh disposable SQLite descriptor wallet was created;
- after restart it remained present on disk but was not automatically loaded in that test;
- explicit `loadwallet` succeeded;
- regtest test: a separate fresh disposable wallet completed a PSBT lifecycle.

No existing wallet was opened, imported, rescanned, unlocked, copied, or spent from.

Pruned-node operators should also remember that rescans and wallet recovery can depend on having the required historical block data locally.

## Node connectivity configuration

Current source/config includes options such as:

- `listen`;
- `addnode`;
- `connect`;
- `dns`;
- `dnsseed`;
- `fixedseeds`;
- `bind`;
- `externalip`;
- `onlynet`;
- proxy/onion/I2P-related settings;
- `networkactive`.

The September mainnet test used ordinary networking and directly obtained outbound IPv4 peers. The regtest PSBT test used `listen=0`, `connect=0`, and `dnsseed=0` and directly observed zero peers.

Those two tests show both connected-mainnet and deliberately isolated configurations under v31, but they do not establish inbound reachability or every transport/proxy path.

## RPC security boundary

Do not expose BitcoinII Core RPC directly to the public internet.

For local administration, MoreBC2's tested v31 pattern is loopback binding plus cookie authentication. Production services may require a different trusted-network architecture, reverse proxy, firewall, RPC whitelist, or `rpcauth` strategy, but those should be designed and tested rather than copied blindly.

## Source/default vs runtime vs recommendation

Keep these evidence classes separate:

| Type | Example |
|---|---|
| Source/default | mainnet RPC default `8332` |
| Runtime observation | September test RPC on `127.0.0.1:28332` |
| Source/runtime agreement | mainnet P2P `8338` |
| Operator recommendation | keep RPC off untrusted networks |
| Unverified production pattern | exchange-facing remote RPC architecture |

This prevents a test override from being mistaken for a protocol default and prevents a source default from being mistaken for a hardened deployment recommendation.

## Current open items

- Cross-platform path verification for Linux and macOS.
- Production service hardening examples.
- Runtime tests for `rpcauth` and RPC whitelist combinations.
- Controlled pruning enable/disable and reindex workflows.
- Runtime qualification of optional indexes.
- Inbound public-node/firewall testing.
- Wallet backup/restore/rescan configuration under current v31.
- External signer configuration with BC2 replay protection.

## Sources and related evidence

- BitcoinII Core `v31.1.0` `share/examples/bitcoinII.conf`
- BitcoinII Core `v31.1.0` `doc/bitcoinII-conf.md`
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Node configuration](node-configuration.md)
- [RPC configuration](rpc-configuration.md)
- [RPC overview](../developers/rpc-overview.md)
- [Node startup](../architecture/node-startup.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` generated/configuration documentation plus current Windows mainnet and isolated regtest runtime records  
**Notes:** Basic v31 config-file selection, server mode, loopback RPC, peer connectivity, isolated networking, wallet creation/load behavior, pruning defaults, and optional-index defaults now have direct bounded runtime evidence where stated. Production hardening, cross-platform paths, pruning/index migration workflows, and alternate authentication patterns remain partial.
