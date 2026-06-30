# RPC configuration

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

BitcoinII Core includes JSON-RPC configuration options for command-line tools, wallets, exchanges, explorers, and service integrations.

This page documents options observed in the generated example configuration file.

It does not yet provide a verified production RPC setup. Operational examples need local testing and security review.

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

## Default RPC ports observed in generated config

| Network | RPC port |
|---|---:|
| Mainnet | `8332` |
| Testnet | `18332` |
| Signet | `38332` |
| Regtest | `18443` |

## Authentication notes

The generated config describes `rpcauth` as using a username and HMAC-SHA-256 hashed password format.

It also notes that a canonical Python script is included in `share/rpcauth`.

Authentication examples are not locally tested yet and should not be copied into production instructions until tested.

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

- Test RPC auth setup with BitcoinII Core.
- Confirm whether `rpcuser`/`rpcpassword` is still acceptable for simple local setups.
- Confirm best-practice exchange RPC setup.
- Confirm whether RPC whitelist examples should be included.
- Confirm `bitcoinII-cli` command examples against a running node.
- Add tested records for local-only RPC setup before publishing copy/paste examples.

## Sources

- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf
- `doc/JSON-RPC-interface.md`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/doc/JSON-RPC-interface.md
- [Command testing status](../verification/command-testing.md)
- [RPC overview](../developers/rpc-overview.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Options and default ports are source-backed from the generated config. Authentication setup, CLI command examples, production RPC patterns, and whitelist examples still need testing and review.
