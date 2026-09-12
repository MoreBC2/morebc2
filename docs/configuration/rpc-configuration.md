# RPC configuration

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII Core `v31.1.0` exposes JSON-RPC for node, chain, network, mempool, wallet, mining, raw-transaction, and PSBT workflows.

This page documents current RPC configuration using release-pinned source/defaults plus the September 11 Windows runtime evidence. Historical v29 RPC observations remain version-scoped and are no longer the current baseline.

## Security warning

Do not expose BitcoinII Core RPC directly to the public internet.

The `v31.1.0` generated configuration explicitly warns against exposing the RPC server to untrusted networks.

For local administration, MoreBC2's currently tested pattern is:

- `server=1` when using Qt as an RPC server;
- RPC bound to loopback;
- `rpcallowip` restricted to loopback;
- random-cookie authentication;
- a disposable data directory for testing.

A production exchange/explorer architecture may use different authentication/network controls, but those should be designed and tested rather than copied from a generic example.

## Current v31 RPC defaults

BitcoinII Core `v31.1.0` documentation consistently gives these JSON-RPC defaults:

| Network | Default RPC port |
|---|---:|
| mainnet | `8332` |
| testnet3 | `18332` |
| testnet4 | `48332` |
| signet | `38332` |
| regtest | `18443` |

These are defaults, not protocol constants. `rpcport` is operator-configurable.

The old MoreBC2 v29 observation of mainnet RPC on `8337` remains valid only as historical configured-runtime evidence for that test environment. It must not be presented as the current v31 mainnet default.

## Current v31 mainnet runtime configuration

The September 11 Windows mainnet test used:

```ini
server=1
rpcport=28332
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Why `28332`?

Local `8332` was already occupied by unrelated software, so the test deliberately selected a free loopback-only port.

That makes `28332` a **test override**, not a BitcoinII default.

The test directly established that the v31 Qt process could:

- start in server mode;
- create and use a random RPC cookie in the disposable data directory;
- answer direct HTTP JSON-RPC on loopback;
- expose wallet-scoped RPC on `/wallet/<walletname>`;
- stop cleanly through the `stop` RPC;
- remove the cookie and listener on shutdown;
- restart successfully against the same disposable chain state.

## Current isolated regtest RPC configuration

The separate September PSBT test used:

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

The node had zero peers. All wallet, PSBT, `testmempoolaccept`, and `sendrawtransaction` calls remained local to the isolated regtest node.

Again, `29443` was a test-selected port, not the regtest default (`18443`).

## RPC options in current source/config

Current v31 configuration exposes options including:

| Option | Purpose | Current evidence |
|---|---|---|
| `server` | Enable command-line/JSON-RPC server behavior | Source + Qt runtime-tested |
| `rpcallowip` | Permit RPC connections from specified source ranges | Source + loopback runtime-tested |
| `rpcbind` | Bind RPC listener to specified local address/port | Source + loopback runtime-tested |
| `rpcport` | Select RPC listening port | Source + override runtime-tested |
| `rpcauth` | Username + HMAC-SHA-256 hashed password authentication | Source-observed |
| `rpccookiefile` | Select cookie-auth file location | Source; default-cookie path runtime-observed |
| `rpcuser` / `rpcpassword` | Username/password RPC authentication | Source-observed; not recommended here as a tested production pattern |
| `rpcthreads` | Set RPC service thread count | Source-observed |
| `rpcwhitelist` | Restrict RPC methods per user | Source-observed |
| `rpcwhitelistdefault` | Control default whitelist behavior | Source-observed |
| `rest` | Enable public REST interface on the same HTTP service/port | Source-observed; not enabled in local node test |

The source also points to the canonical `share/rpcauth` helper for generating `rpcauth` entries.

## Binding and access-control relationship

`rpcbind` and `rpcallowip` solve different parts of the problem:

- `rpcbind` controls where the server listens locally;
- `rpcallowip` controls which source addresses are allowed;
- authentication controls who can successfully invoke RPC;
- host firewall/network design provides another security boundary.

Do not make RPC public merely by widening `rpcbind` and `rpcallowip`. A reachable authenticated RPC server still exposes powerful node and wallet operations.

## Authentication evidence

### Random-cookie authentication — runtime-tested

Both September v31 tests used the random RPC cookie created inside the disposable data directory.

The cookie was read only into memory to form an HTTP Basic authorization header. Its value was never printed or published.

This is the strongest current MoreBC2 RPC-authentication evidence.

### `rpcauth` — source-observed

The generated config describes `rpcauth` as a username plus HMAC-SHA-256 hashed-password entry and points to `share/rpcauth`.

MoreBC2 has not yet completed a current v31 runtime test of `rpcauth`.

### `rpcuser` / `rpcpassword` — source-observed

These options remain in current source/configuration, but MoreBC2 has not promoted them as the preferred current deployment pattern. If documented later, they should be clearly scoped and tested.

## Runtime-tested RPC subset

The September mainnet test exercised node/status methods including:

- `getnetworkinfo`;
- `getblockchaininfo`;
- `getmempoolinfo`;
- `getpeerinfo`;
- `getnettotals`;
- `uptime`;
- `getchaintips`;
- `getindexinfo`;
- `listwallets`;
- `listwalletdir`;
- `createwallet`;
- `getwalletinfo`;
- `loadwallet`;
- `stop`.

The isolated regtest test additionally exercised:

- `getnewaddress`;
- `generatetoaddress`;
- `getbalances`;
- `walletcreatefundedpsbt`;
- `decodepsbt`;
- `walletprocesspsbt`;
- `finalizepsbt`;
- `decoderawtransaction`;
- `testmempoolaccept`;
- `sendrawtransaction`;
- `getmempoolentry`.

The regtest `sendrawtransaction` result was local-mempool submission only. It does not prove public-network broadcast.

## Wallet-scoped RPC

The September mainnet test directly used the wallet endpoint form:

```text
/wallet/morebc2-disposable-v31
```

for `getwalletinfo`.

Wallet RPC should therefore be documented as wallet-context-sensitive where required. A loaded wallet name and its exact runtime state matter.

After restart, the disposable wallet remained visible through `listwalletdir` but was not loaded until an explicit `loadwallet` call succeeded in that test.

## Pruning/index implications for RPC

RPC capability depends on node configuration.

Current evidence establishes:

- `txindex` defaults off;
- pruning defaults off;
- pruning and `txindex` are incompatible;
- historical transaction lookup can depend on local block/index availability;
- wallet rescans/import workflows can depend on retained block data;
- service integrations should test the exact pruning/index configuration they intend to operate.

The September mainnet test observed:

```text
pruned = false
getindexinfo = {}
```

so its RPC results should not be generalized to pruned/indexed service nodes without separate testing.

## Qt vs daemon/CLI evidence

The locally available artifact used for the September v31 runtime test was the Windows Qt package. That local package did not provide the matching headless daemon/CLI used in the older v29 test, so RPC was sent directly over HTTP using the cookie.

This does **not** mean the v31 release lacks CLI artifacts; the release inventory includes separate Windows CLI and Qt assets. It only describes the artifact available in the tested environment.

## Safe local example

This narrow pattern is directly grounded in the September v31 Windows test:

```ini
server=1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcport=<free-local-port>
```

Use a free local port appropriate to the environment. Do not copy `28332` merely because MoreBC2 used it in one test.

The preferred authentication for this tested local pattern is the automatically generated cookie in the selected data directory.

## What remains open

- Current v31 `rpcauth` runtime qualification.
- RPC whitelist behavior and least-privilege examples.
- Production exchange/explorer trusted-network patterns.
- TLS/reverse-proxy guidance, if a deployment requires remote administration.
- Cross-platform RPC behavior.
- REST enablement/security behavior on a local node.
- CLI-to-v31-node testing using the matching current CLI artifact.
- External signer and third-party wallet RPC behavior under BC2 replay protection.

## Related pages

- [Configuration overview](configuration-overview.md)
- [Node configuration](node-configuration.md)
- [RPC overview](../developers/rpc-overview.md)
- [API read-only examples](../api/read-only-examples.md)
- [Bitcoin Core RPC compatibility](../compatibility/bitcoin-core-rpc.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` generated configuration/RPC documentation plus September 11 Windows mainnet and isolated regtest RPC records  
**Notes:** Current default ports, Qt server mode, loopback binding, cookie authentication, port overrides, wallet-scoped RPC, clean shutdown, and a meaningful node/wallet RPC subset have direct current evidence. `rpcauth`, whitelists, remote production patterns, REST operation, matching v31 CLI usage, and cross-platform behavior remain partial or untested.
