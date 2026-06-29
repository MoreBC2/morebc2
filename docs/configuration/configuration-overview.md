# Configuration overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

BitcoinII Core can be configured with command-line options and a configuration file.

The generated example configuration file is `share/examples/bitcoinII.conf`.

## What is verified from the generated config

The generated example config states that:

- Lines beginning with `#` are comments.
- The file can be copied to the data directory.
- Options can be uncommented and changed.
- The default config file name is `bitcoinII.conf`.
- Some options can be scoped by network section.

The generated config includes network sections:

```ini
[main]
[test]
[signet]
[regtest]
```

It also notes that if not specified under a network section, options such as `addnode`, `connect`, `port`, `bind`, `rpcport`, `rpcbind`, and `wallet` only apply to mainnet.

## Configuration areas

MoreBC2 separates configuration docs into:

- Node operation options.
- RPC options.
- Wallet options.
- Network selection options.
- Indexing and pruning options.
- Debugging options.

## Production caution

Configuration examples for exchanges, explorers, pools, or other services should be tested before publication as verified.

## Open items

- Confirm data directory paths for Windows, Linux, and macOS.
- Confirm command-line override behavior.
- Confirm wallet-specific config examples.
- Confirm platform-specific service setup.

## Sources

- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** General config-file behavior is based on the generated example config. Platform-specific instructions still need testing.
