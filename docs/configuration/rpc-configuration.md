# RPC configuration

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-08-27

## Summary

BitcoinII Core includes JSON-RPC configuration options for command-line tools, wallets, exchanges, explorers, and service integrations.

This page documents options observed in the generated example configuration file and notes the dated BitcoinII v29.1.0 local RPC evidence.

It does not provide a verified production RPC setup. A narrow localhost-only read-only RPC setup was locally tested on Windows mainnet, but production patterns, service-provider patterns, authentication variants, and sensitive commands still need security review.

## Security warning

The generated example config warns not to expose the RPC server to untrusted networks such as the public internet.

MoreBC2 repeats that warning clearly:

Do not expose BitcoinII Core RPC directly to the public internet.

## RPC options observed in generated config

| Option | Purpose from generated config | Status |
|---|---|---|
| `rpcallowip` | Allows JSON-RPC connections from specified IP ranges | Source-observed |
| `rpcauth` | Username and HMAC-SHA-256 hashed password authentication | Source-observed |
| `rpcbind` | Bind address for JSON-RPC connections | Source-observed |
| `rpccookiefile` | Location of the RPC auth cookie | Source-observed |
| `rpcpassword` | Password for JSON-RPC connections | Source-observed |
| `rpcport` | JSON-RPC listening port | Source-observed |
| `rpcthreads` | Number of RPC service threads | Source-observed |
| `rpcuser` | Username for JSON-RPC connections | Source-observed |
| `rpcwhitelist` | RPC method whitelist for a specific user | Source-observed |
| `rpcwhitelistdefault` | Default behavior for RPC whitelisting | Source-observed |
| `server` | Accept command line and JSON-RPC commands | Source-observed |

## RPC port evidence

MoreBC2 has two relevant evidence types:

| Evidence | Network | RPC port | Status |
|---|---|---:|---|
| Dated BitcoinII Core `v29.1.0` local test | Mainnet | `8337` | Locally tested on Windows with localhost-only RPC |
| Dated isolated BitcoinII Core `v29.1.0` operator test | Mainnet | `28337` | Explicit localhost-only override because `8337` was already occupied; not a claimed default |
| Generated/example Bitcoin Core-style material | Mainnet | `8332` | Historical/source-observed context; do not treat as the v29.1.0 local-test value |
| Generated/example Bitcoin Core-style material | Testnet | `18332` | Source-observed from generated/example material |
| Generated/example Bitcoin Core-style material | Signet | `38332` | Source-observed from generated/example material |
| Generated/example Bitcoin Core-style material | Regtest | `18443` | Source-observed from generated/example material |

The dated local test configured BitcoinII Core `v29.1.0` with:

```ini
server=1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcport=8337
```

See [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md), [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md), and [Windows node-operator test - 2026-08-27](../verification/windows-node-operator-test-2026-08-27.md).

Do not assume all historical BitcoinII releases used the same RPC port unless a version-specific source or test record supports it. The `28337` observation demonstrates an operator-selected override, not a BitcoinII default.

## Authentication notes

The generated config describes `rpcauth` as using a username and HMAC-SHA-256 hashed password format.

It also notes that a canonical Python script is included in `share/rpcauth`.

Cookie authentication with localhost-only RPC was locally tested for the narrow read-only command smoke test. Other authentication examples are not locally tested yet and should not be copied into production instructions until tested.

## Command testing status

MoreBC2 tracks untested command examples in [Command testing status](../verification/command-testing.md).

Future RPC setup examples should record:

- Operating system.
- BitcoinII Core version, release, branch, or commit.
- Network mode.
- Config file path.
- Authentication method.
- Whether RPC was bound only locally or to a restricted trusted network.
- Exact command tested.
- Expected and actual result.

## Open items

- Test additional RPC auth setup patterns with BitcoinII Core.
- Confirm whether `rpcuser`/`rpcpassword` is still acceptable for simple local setups.
- Confirm best-practice exchange RPC setup.
- Confirm whether RPC whitelist examples should be included.
- Confirm additional `bitcoinII-cli` command examples against a running node.
- Add tested records before publishing copy/paste examples beyond the narrow local-only read-only setup.
- Monitor the canonical repository/source path for future ownership or location changes.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- `share/examples/bitcoinII.conf` in the current observed repository: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/share/examples/bitcoinII.conf
- `doc/JSON-RPC-interface.md` in the current observed repository: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/doc/JSON-RPC-interface.md
- [Command testing status](../verification/command-testing.md)
- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [Windows node-operator test - 2026-08-27](../verification/windows-node-operator-test-2026-08-27.md)
- [RPC overview](../developers/rpc-overview.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Options and inherited/generated port examples are source-observed from generated/example configuration material. BitcoinII Core v29.1.0 mainnet localhost-only RPC was locally tested on `127.0.0.1:8337`; a separate isolated operator test used the explicit override `127.0.0.1:28337`. Additional authentication setup, production RPC patterns, and whitelist examples still need testing and review.
