# RPC overview

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

BitcoinII Core includes JSON-RPC functionality for command-line tools, wallets, exchanges, explorers, and other services.

This page is a safe starting point only. RPC command examples should not be marked Verified until they are tested against a running BitcoinII Core node.

## What RPC is used for

RPC can be used to:

- Query node status.
- Query chain and block status.
- Query mining/template status.
- Query wallet status.
- Generate deposit addresses.
- Inspect transactions.
- Broadcast withdrawals.
- Monitor blocks and confirmations.
- Inspect UTXO state.
- Manage pruning and block-data workflows.

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

## Source-reviewed RPC groups

MoreBC2 has reviewed first-pass source maps for these RPC files:

- [Mining RPC](source-atlas/rpc-mining.md): `src/rpc/mining.cpp`
- [Blockchain RPC](source-atlas/rpc-blockchain.md): `src/rpc/blockchain.cpp`

These reviews document command groups and behavior from source, but do not mark command examples as tested.

## Mining RPC group

Reviewed mining RPC commands include:

- `getnetworkhashps`
- `getmininginfo`
- `getblocktemplate`
- `submitblock`
- `submitheader`
- `prioritisetransaction`
- `getprioritisedtransactions`

Important note: the reviewed mining RPC file says mining RPCs follow GBT/BIP22 in using satoshi amounts, unlike wallet RPCs that use BC2 values.

## Blockchain RPC group

Reviewed blockchain RPC commands include:

- `getblockchaininfo`
- `getbestblockhash`
- `getblockcount`
- `getblock`
- `getblockhash`
- `getblockheader`
- `getchaintips`
- `getdifficulty`
- `getdeploymentinfo`
- `gettxout`
- `gettxoutsetinfo`
- `pruneblockchain`
- `verifychain`
- `scantxoutset`
- `scanblocks`
- `getdescriptoractivity`
- `getblockfilter`
- `dumptxoutset`
- `loadtxoutset`
- `getchainstates`

Some commands are powerful, slow, experimental, or intended for advanced workflows. They should be documented carefully and tested before being recommended.

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

Additional reviewed commands that should be tested before examples are published:

```bash
bitcoinII-cli getblockcount
bitcoinII-cli getbestblockhash
bitcoinII-cli getmininginfo
bitcoinII-cli getdifficulty
bitcoinII-cli getblocktemplate '{"rules":["segwit"]}'
```

## Exchange/service-provider caution

Service providers should not expose RPC publicly. RPC access should be firewalled, authenticated, and restricted to trusted systems.

For service docs, MoreBC2 should distinguish:

- Read-only status commands.
- Block and transaction lookup commands.
- Wallet commands that can create addresses or move funds.
- Maintenance commands that can affect node state.
- Hidden/testing commands that should not appear in normal operator guides.

## Open items

- Test common RPC commands against a synced BitcoinII Core node.
- Confirm binary names for each platform and release asset.
- Confirm configuration file paths by operating system.
- Confirm wallet loading behavior.
- Review wallet RPC files.
- Review network RPC files.
- Review raw transaction RPC files.
- Confirm whether any BitcoinII-specific RPC differences exist beyond naming and visible strings.

## Sources

- `share/examples/bitcoinII.conf`
- `doc/JSON-RPC-interface.md`
- `src/rpc/mining.cpp`
- `src/rpc/blockchain.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Port and config-option notes are source-backed. Mining and blockchain RPC groups have first-pass source review. Command examples are placeholders until tested.
