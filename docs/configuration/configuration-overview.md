# Configuration overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-01

## Summary

BitcoinII Core can be configured with command-line options and a configuration file.

The generated example configuration file is `share/examples/bitcoinII.conf`.

This page is source-observed from configuration material. It is not a tested platform setup guide yet.

## What the generated config says

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

## Command and config testing status

MoreBC2 has not yet tested platform-specific configuration examples or startup commands.

Track future tests in [Command testing status](../verification/command-testing.md).

Configuration examples should include:

- Operating system.
- BitcoinII Core release, branch, or commit.
- Network mode.
- Data directory location.
- Config file path.
- Command used to start the node.
- Relevant command output or log result.

Do not treat future config snippets as verified until they include this context.

## Production caution

Configuration examples for exchanges, explorers, pools, or other services should be tested before publication as verified.

Do not expose BitcoinII Core RPC directly to the public internet.

Separate source-observed defaults from recommended operator settings.

## Open items

- Confirm data directory paths for Windows, Linux, and macOS.
- Confirm command-line override behavior.
- Confirm wallet-specific config examples.
- Confirm platform-specific service setup.
- Add tested configuration records for local node startup.
- Confirm release binary names before writing copy/paste command examples.
- Confirm canonical repository/source path before public-link polish.

## Sources

- `share/examples/bitcoinII.conf` in the current observed repository: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/share/examples/bitcoinII.conf
- [Command testing status](../verification/command-testing.md)
- [RPC configuration](rpc-configuration.md)
- [Node configuration](node-configuration.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** General config-file behavior is source-observed from the generated example config. Platform-specific instructions, startup commands, service setup examples, and release binary names still need testing. Source links use the current observed repository path, but canonical repository status still needs confirmation.
