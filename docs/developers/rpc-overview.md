# RPC overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

BitcoinII Core includes JSON-RPC functionality for command-line tools, wallets, exchanges, explorers, and other services.

This page is a safe starting point only. RPC command examples should not be marked Verified until they are tested against a running BitcoinII Core node.

## What RPC is used for

RPC can be used to:

- Query node status.
- Query network status.
- Query wallet status.
- Generate deposit addresses.
- Inspect transactions.
- Broadcast withdrawals.
- Monitor blocks and confirmations.

## Verified configuration notes

The generated example configuration file includes RPC settings for:

- `rpcallowip`
- `rpcauth`
- `rpcbind`
- `rpccookiefile`
- `rpcpassword`
- `rpcport`
- `rpcthreads`
- `rpcuser`
- `rpcwhitelist`
- `server`

The generated example config lists default RPC ports as:

- Mainnet: `8332`
- Testnet: `18332`
- Signet: `38332`
- Regtest: `18443`

The same file warns not to expose the RPC server to untrusted networks such as the public internet.

## Commands to test later

These commands are common for Bitcoin-style node operation, but they still need to be tested against BitcoinII Core before being moved into verified examples:

```bash
bitcoinII-cli getblockchaininfo
bitcoinII-cli getnetworkinfo
bitcoinII-cli getwalletinfo
bitcoinII-cli getnewaddress
bitcoinII-cli listtransactions
bitcoinII-cli gettransaction <txid>
bitcoinII-cli sendtoaddress <address> <amount>
```

## Exchange/service-provider caution

Service providers should not expose RPC publicly. RPC access should be firewalled, authenticated, and restricted to trusted systems.

## Open items

- Test common RPC commands against a synced BitcoinII Core node.
- Confirm binary names for each platform and release asset.
- Confirm configuration file paths by operating system.
- Confirm wallet loading behavior.
- Confirm whether any BitcoinII-specific RPC differences exist.

## Sources

- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf
- `doc/JSON-RPC-interface.md`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/doc/JSON-RPC-interface.md

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Port and config-option notes are source-backed. Command examples are placeholders until tested.
