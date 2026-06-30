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
- Build, decode, and analyze raw transactions and PSBTs.

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
- [Raw transaction RPC](source-atlas/rpc-rawtransaction.md): `src/rpc/rawtransaction.cpp`
- [Wallet RPC](source-atlas/wallet-rpc.md): wallet startup/address/backup/spend/encryption/coin/history RPC files

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

## Raw transaction RPC group

Reviewed raw transaction RPC commands include:

- `getrawtransaction`
- `createrawtransaction`
- `decoderawtransaction`
- `decodescript`
- `combinerawtransaction`
- `signrawtransactionwithkey`
- `decodepsbt`
- `combinepsbt`
- `finalizepsbt`
- `createpsbt`
- `converttopsbt`
- `utxoupdatepsbt`
- `descriptorprocesspsbt`
- `joinpsbts`
- `analyzepsbt`

Raw transaction commands are advanced tools for non-wallet transaction lookup, unsigned transaction construction, explicit-key signing, script decoding, and PSBT workflows. They need tested examples before appearing in service or user guides.

## Wallet RPC group

Reviewed wallet RPC commands include:

- `getwalletinfo`
- `listwalletdir`
- `listwallets`
- `loadwallet`
- `unloadwallet`
- `createwallet`
- `setwalletflag`
- `sethdseed`
- `upgradewallet`
- `migratewallet`
- `simulaterawtransaction`
- `getnewaddress`
- `getrawchangeaddress`
- `setlabel`
- `listaddressgroupings`
- `addmultisigaddress`
- `backupwallet`
- `restorewallet`
- `sendtoaddress`
- `sendmany`
- `send`
- `sendall`
- `walletpassphrase`
- `walletlock`
- `getbalance`
- `getbalances`
- `listunspent`
- `listtransactions`
- `listsinceblock`
- `gettransaction`
- `rescanblockchain`

The reviewed wallet registration and file-specific passes now cover major wallet command groups. Examples still need local testing before being recommended.

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
bitcoinII-cli listwallets
bitcoinII-cli listwalletdir
bitcoinII-cli getrawtransaction <txid> 1
bitcoinII-cli decoderawtransaction <hex>
bitcoinII-cli analyzepsbt <psbt>
```

## Exchange/service-provider caution

Service providers should not expose RPC publicly. RPC access should be firewalled, authenticated, and restricted to trusted systems.

For service docs, MoreBC2 should distinguish:

- Read-only status commands.
- Block and transaction lookup commands.
- Address/deposit commands.
- Wallet commands that can create addresses.
- Wallet commands that expose keys, sign transactions, or move funds.
- Raw transaction and PSBT commands for advanced construction/signing workflows.
- Maintenance commands that can affect node state.
- Hidden/testing commands that should not appear in normal operator guides.

## Open items

- Test common RPC commands against a synced BitcoinII Core node.
- Confirm binary names for each platform and release asset.
- Confirm configuration file paths by operating system.
- Confirm wallet loading behavior.
- Review mempool and transaction-broadcast RPC files.
- Review network RPC files.
- Confirm whether any BitcoinII-specific RPC differences exist beyond naming and visible strings.

## Sources

- `share/examples/bitcoinII.conf`
- `doc/JSON-RPC-interface.md`
- `src/rpc/mining.cpp`
- `src/rpc/blockchain.cpp`
- `src/rpc/rawtransaction.cpp`
- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`
- `src/wallet/rpc/backup.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/rpc/encrypt.cpp`
- `src/wallet/rpc/coins.cpp`
- `src/wallet/rpc/transactions.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Port and config-option notes are source-backed. Mining, blockchain, raw transaction, and wallet RPC groups have first-pass source review. Command examples are placeholders until tested.
