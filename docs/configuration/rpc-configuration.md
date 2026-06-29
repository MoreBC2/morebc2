# RPC configuration

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

BitcoinII Core includes JSON-RPC configuration options for command-line tools, wallets, exchanges, explorers, and service integrations.

This page documents options observed in the generated example configuration file.

## Security warning

The generated example config warns not to expose the RPC server to untrusted networks such as the public internet.

MoreBC2 repeats that warning clearly:

Do not expose BitcoinII Core RPC directly to the public internet.

## RPC options observed in generated config

| Option | Purpose from generated config | Status |
|---|---|---|
| `rpcallowip` | Allows JSON-RPC connections from specified IP ranges | Draft |
| `rpcauth` | Username and HMAC-SHA-256 hashed password authentication | Draft |
| `rpcbind` | Bind address for JSON-RPC connections | Draft |
| `rpccookiefile` | Location of the RPC auth cookie | Draft |
| `rpcpassword` | Password for JSON-RPC connections | Draft |
| `rpcport` | JSON-RPC listening port | Draft |
| `rpcthreads` | Number of RPC service threads | Draft |
| `rpcuser` | Username for JSON-RPC connections | Draft |
| `rpcwhitelist` | RPC method whitelist for a specific user | Draft |
| `rpcwhitelistdefault` | Default behavior for RPC whitelisting | Draft |
| `server` | Accept command line and JSON-RPC commands | Draft |

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

## Open items

- Test RPC auth setup with BitcoinII Core.
- Confirm whether `rpcuser`/`rpcpassword` is still acceptable for simple local setups.
- Confirm best-practice exchange RPC setup.
- Confirm whether RPC whitelist examples should be included.
- Confirm `bitcoinII-cli` command examples against a running node.

## Sources

- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf
- `doc/JSON-RPC-interface.md`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/doc/JSON-RPC-interface.md

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** Options and default ports are source-backed from the generated config. Operational examples still need testing.
