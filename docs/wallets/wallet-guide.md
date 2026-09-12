# Wallet guide

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This page is the starting point for BitcoinII (BC2) wallet documentation.

MoreBC2 now has direct BitcoinII Core `v31.1.0` wallet runtime evidence in addition to source review. The current evidence is strong enough to document several disposable-wallet and PSBT workflows as tested under controlled conditions, but not strong enough to treat every wallet workflow, platform, or third-party wallet as verified.

Current canonical runtime evidence:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Wallet compatibility](../compatibility/wallets.md)

## BitcoinII Core wallet — current tested scope

### Windows v31.1.0 disposable mainnet wallet

A fresh BitcoinII Core `v31.1.0` Qt node was launched on Windows against a newly created disposable mainnet data directory. No existing BitcoinII wallet or data directory was opened, copied, rescanned, imported, unlocked, inspected, or spent from.

Observed wallet behavior included:

- no wallet present before test creation;
- `createwallet` created a new wallet named `morebc2-disposable-v31`;
- `getwalletinfo` reported a SQLite descriptor wallet with zero transactions;
- the wallet was not automatically loaded after restart;
- `listwalletdir` showed the disposable wallet after restart;
- explicit `loadwallet` succeeded;
- the wallet remained zero-transaction and not scanning after reload.

This established basic create/inspect/persist/reload behavior for a fresh Core wallet under the documented Windows test conditions.

### Windows v31.1.0 isolated regtest PSBT lifecycle

A separate fresh regtest environment used a new wallet named `morebc2-v31-psbt-disposable`, zero peers, disabled automatic networking, and loopback-only RPC.

The test exercised:

- `createwallet`;
- `getwalletinfo`;
- `getnewaddress`;
- local-only `generatetoaddress` funding;
- `getbalances`;
- `walletcreatefundedpsbt`;
- `decodepsbt`;
- `walletprocesspsbt`;
- `finalizepsbt`;
- `decoderawtransaction`;
- `testmempoolaccept`;
- local-only `sendrawtransaction`;
- `getmempoolentry` and `getmempoolinfo`.

The disposable wallet created a funded PSBT, signed it completely, finalized it into a valid transaction, passed local mempool acceptance, and submitted it only to the isolated regtest mempool.

No public BC2 network received the transaction.

## Replay protection and wallet signing

BitcoinII Core `v31.1.0` activates replay protection on mainnet at height `57750` with fork/domain id:

```text
0x01324342
```

Release-pinned source shows this domain flowing through wallet, PSBT, raw-transaction, mempool, block-validation, and signature-hash paths.

This has an important practical implication: **Bitcoin compatibility alone is not enough to prove BC2 wallet compatibility.**

A third-party wallet or external signer can understand BC2's Bitcoin-like address formats and still fail to produce valid post-activation signatures if it does not implement BC2's replay-domain-aware signing behavior.

The current source also explicitly rejects post-fork external-signer use where the signer cannot be given replay-domain-aware sighash semantics.

MoreBC2 has not yet runtime-tested a hardware wallet or other external signer against this behavior.

## Source-reviewed wallet behavior

MoreBC2 has reviewed wallet startup/lifecycle and major wallet RPC groups in the current codebase, including:

- `src/wallet/init.cpp`
- `src/wallet/load.h`
- `src/wallet/load.cpp`
- `src/wallet/context.h`
- `src/wallet/context.cpp`
- `src/wallet/wallet.h`
- `src/wallet/rpc/wallet.cpp`
- `src/wallet/rpc/addresses.cpp`
- `src/wallet/rpc/backup.cpp`
- `src/wallet/rpc/spend.cpp`
- `src/wallet/rpc/encrypt.cpp`
- `src/wallet/rpc/coins.cpp`
- `src/wallet/rpc/transactions.cpp`

Source review supports documentation of available behavior, but source-observed commands remain distinct from runtime-tested workflows.

### Startup and lifecycle behavior observed from source

- Wallet support can be compiled into the node.
- `-disablewallet` disables wallet loading and wallet RPC calls.
- `-wallet=<path>` can be used multiple times to load existing wallets at startup.
- `-walletdir=<dir>` sets the wallet directory.
- Explicit wallet directories are validated.
- Configured wallet databases are verified before loading.
- Missing configured wallet paths are warned and skipped.
- Wallet startup schedules normal post-initialization processing, periodic flush/compaction, and transaction resend behavior.
- Wallet shutdown helpers flush, close, remove, and wait for wallet deletion.

### Wallet RPC behavior observed from source

Reviewed RPC behavior includes:

- `getwalletinfo`
- `listwalletdir`
- `listwallets`
- `loadwallet`
- `unloadwallet`
- `createwallet`
- `setwalletflag`
- `getnewaddress`
- `getrawchangeaddress`
- `setlabel`
- `listaddressgroupings`
- `addmultisigaddress`

Some of these now also have runtime coverage as noted above; others remain source-reviewed only.

## Backup, restore, import, and recovery

Source review establishes that BitcoinII Core includes wallet backup/import/restore RPCs such as:

- `backupwallet`;
- `restorewallet`;
- descriptor import commands;
- legacy import commands;
- `dumpwallet` and `dumpprivkey` for legacy-wallet contexts.

Important boundaries:

- legacy import and rescan behavior can be constrained by pruning or unavailable historical blocks;
- descriptor import behavior depends on timestamps and scan ranges;
- sensitive key-dump/import commands are not appropriate for beginner guidance;
- MoreBC2 has **not yet completed a direct v31 backup-and-restore test** with disposable wallets.

Until that test exists, backup/restore behavior should be described as source-supported, not locally verified end-to-end.

## Encryption and unlock behavior

Source review establishes wallet encryption, temporary unlock, credential change, and relock behavior.

MoreBC2 has not yet completed an isolated `v31.1.0` runtime test of:

- first-time wallet encryption;
- temporary signing unlock;
- wallet relock;
- credential update;
- backup-after-encryption workflow.

Do not publish these as verified procedures yet.

## Coin, balance, and transaction-history behavior

Source review includes:

- `getreceivedbyaddress`;
- `getreceivedbylabel`;
- `getbalance`;
- `getbalances`;
- `lockunspent`;
- `listlockunspent`;
- `listunspent`;
- `listtransactions`;
- `listsinceblock`;
- `gettransaction`;
- `abandontransaction`;
- `rescanblockchain`;
- `abortrescan`.

`getbalances` now has bounded runtime coverage in the isolated regtest PSBT test. The broader transaction-history, rescan, abandon, and UTXO-management workflows remain mostly source-reviewed rather than runtime-tested.

## Spend and PSBT behavior

Current evidence is strongest here.

The September regtest record demonstrates a complete Core-wallet PSBT flow with:

- wallet-selected input;
- change handling;
- explicit fee rate;
- wallet signing;
- PSBT finalization;
- raw transaction decoding;
- mempool acceptance testing;
- local-only transaction submission.

That supports documenting BitcoinII Core's PSBT lifecycle as **locally tested partial** under the recorded environment.

It does **not** establish:

- public-mainnet broadcast testing;
- every script/address type;
- fee estimation under live network conditions;
- multisig or external signer behavior;
- hardware-wallet behavior;
- third-party PSBT interoperability.

## Defaults and options

Source-reviewed startup-adjacent wallet defaults include:

- default address type: `BECH32`;
- default transaction confirmation target: `6` blocks;
- default wallet RBF: `true`;
- default wallet broadcast: `true`;
- default wallet disabled: `false`;
- default fallback fee: `0`;
- default pay transaction fee: `0`;
- descriptor-wallet default for `createwallet` unless overridden.

These are source-derived defaults. Runtime testing should remain the basis for user-facing procedural examples where behavior matters operationally.

## Third-party wallet status

Current third-party wallet observations belong in [Ecosystem wallets](../ecosystem/wallets.md), while compatibility interpretation belongs in [Wallet compatibility](../compatibility/wallets.md).

Current MoreBC2 evidence does not establish safe transaction/recovery compatibility for:

- Genesis Wallet;
- the Google Play `Bitcoin ii (BC2) Wallet` listing;
- `Bitcoin-II/wallet-bc2`;
- BlueWallet;
- Cake Wallet;
- Komodo Wallet;
- general-purpose Bitcoin hardware wallets;
- external-signing workflows.

Tangem currently exposes BC2 asset information but states that native BitcoinII network support is temporarily unsupported. MoreBC2 therefore does not present Tangem as a currently working native BC2 wallet.

Read-only Electrum server reachability also does not prove wallet compatibility, fee correctness, history correctness, signing correctness, replay-protection support, or broadcast compatibility.

## Safe wallet principles

General wallet-safety guidance remains:

- obtain software from project-controlled or otherwise clearly identified sources;
- verify downloads when a trustworthy checksum/signature path exists;
- make backups before exposing meaningful funds to a new setup;
- never publish private keys, seed phrases, wallet files, RPC cookies, or credentials;
- use small disposable/test balances for unfamiliar workflows;
- distinguish source review from runtime-tested behavior;
- do not assume Bitcoin-wallet compatibility after v31 replay protection;
- test recovery, not just backup creation, before treating a backup process as proven.

## Release verification boundary

MoreBC2 has recorded the current `v31.1.0` release assets and GitHub-reported digests, and the Windows artifact hash used in the September tests matched the recorded release archive digest.

However, the current release-authentication path still lacks a maintainer-authenticated checksum manifest/trusted signing-key path and reproducible-build proof. The Windows executable observed in testing was not Authenticode-signed.

This means MoreBC2 can document byte-integrity observations without claiming complete publisher authentication.

See [BitcoinII Core v31.1.0 release assets](../releases/v31.1.0-assets.md) and [Release verification guide](../developers/release-verification.md).

## Next wallet tests worth doing

The highest-value remaining wallet validation work is:

1. disposable-wallet backup + restore;
2. encryption + unlock + relock;
3. transaction-history and rescan workflows;
4. Windows GUI receive/send workflow using only disposable/regtest funds;
5. platform-specific data/wallet directory documentation;
6. external-signer/hardware-wallet replay-protection testing;
7. third-party wallet transaction/recovery tests where practical.

No existing user wallet should be used for these tests.

## Sources

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Wallet compatibility](../compatibility/wallets.md)
- [Ecosystem wallets](../ecosystem/wallets.md)
- [Replay protection source trace](../developers/source-atlas/replay-protection-v31.md)
- [Command testing status](../verification/command-testing.md)
- [Source atlas: wallet startup](../developers/source-atlas/wallet-startup.md)
- [Source atlas: wallet RPC](../developers/source-atlas/wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](../developers/source-atlas/wallet-backup-import-rpc.md)
- [Source atlas: wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md)
- [Source atlas: wallet encryption RPC](../developers/source-atlas/wallet-encryption-rpc.md)
- [Source atlas: wallet coins and balances RPC](../developers/source-atlas/wallet-coins-rpc.md)
- [Source atlas: wallet transaction history RPC](../developers/source-atlas/wallet-transactions-rpc.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source plus the 2026-09-11 Windows node/wallet and isolated PSBT validation records  
**Notes:** BitcoinII Core now has meaningful bounded runtime wallet evidence. Backup/recovery, encryption, broad transaction-history workflows, public-mainnet spending, hardware/external signing, and third-party wallet compatibility remain unverified or incomplete.