# Wallet backup and import RPC

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-only partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps wallet backup, restore, import, descriptor, dump, and rescan behavior centered on `src/wallet/rpc/backup.cpp` for BitcoinII Core `v31.1.0`.

Current MoreBC2 wallet runtime evidence does **not** include an end-to-end backup/restore, import, or rescan test. The September disposable-wallet work established wallet creation/load persistence and a PSBT spend path, but deliberately did not copy, import, restore, rescan, unlock, or otherwise manipulate any existing user wallet.

This page therefore remains source-backed rather than runtime-qualified.

## Why this file matters

These RPCs cover high-impact recovery/state workflows:

- wallet backup and restore;
- legacy key/address import;
- descriptor import;
- chain rescans;
- wallet dump/export;
- pruned-node limitations;
- recovery after wallet or descriptor changes.

Mistakes can expose private material or create incomplete wallet history, so public examples require more care than ordinary read-only RPCs.

## Legacy import paths

Source-reviewed legacy commands include:

- `importprivkey`
- `importaddress`
- `importpubkey`
- `importwallet`
- `importmulti`

Reviewed behavior includes legacy-script-manager requirements, private-key support where needed, optional rescans, and limitations when historical block data required for rescanning is unavailable.

These commands were not exercised in the September v31 disposable-wallet tests.

## Descriptor imports

`importdescriptors` is the descriptor-wallet import path.

Reviewed constraints include:

- descriptor-wallet requirement;
- timestamp requirement;
- `now` for entries known to have no earlier chain history;
- timestamp zero for full-history scan intent;
- ranged-descriptor range handling;
- active-descriptor/range rules;
- internal/label restrictions;
- optional benefit from block-filter indexes during rescans.

Descriptor support in the disposable v31 wallet does not itself prove descriptor-import/recovery behavior. Those are separate workflows.

## Backup and restore

Source-reviewed commands include:

- `backupwallet`
- `restorewallet`

The reviewed code synchronizes/locks wallet state around backup and routes restore through wallet-loading logic under the requested wallet name.

MoreBC2 has not yet performed a disposable `backupwallet` -> remove/unload -> `restorewallet` -> balance/address/history verification cycle on v31.

Until that exists, MoreBC2 should not label backup/restore as end-to-end runtime verified.

## Dump/export boundary

Source-reviewed surfaces include:

- `dumpprivkey`
- `dumpwallet`
- `listdescriptors`

Private-key/dump operations expose highly sensitive material. They should remain advanced-only and should not be used against an existing user wallet for documentation testing.

A future qualification should use a newly created disposable wallet with no real funds and should ensure resulting sensitive artifacts are destroyed after the test.

## Rescan boundary

Rescans can be required after imports/restores and depend on locally available chain data.

Important source-backed cautions include:

- old timestamps can require long scans;
- pruned nodes may lack required historical blocks;
- incomplete/failed rescans can leave wallet history incomplete;
- background chainstate/index availability can affect recovery workflows.

The September v31 mainnet node test did not run a wallet rescan.

## Current wallet runtime context

What MoreBC2 **has** established on `v31.1.0`:

- a fresh disposable SQLite descriptor wallet can be created;
- it persists in the wallet directory;
- it can be explicitly reloaded after restart;
- an isolated regtest disposable wallet can generate an address, receive generated test funds, create/process/finalize a PSBT, and submit that transaction to its zero-peer local mempool.

Those results make a future disposable backup/restore test practical, but they do not substitute for it.

## Replay-protection relevance

Backup/import itself is storage/recovery behavior. Any restored/imported wallet that later signs post-activation mainnet transactions must still produce signatures using BC2's replay-protection domain from height `57750`.

Recovery success therefore has two distinct questions:

1. did the wallet recover the intended keys/descriptors/history/state?;
2. can the recovered wallet sign valid current BC2 transactions under the active replay domain?

## Documentation policy

- Never test these workflows on an existing user wallet.
- Do not publish private-key/dump output.
- Treat backup creation as incomplete assurance until restore has also been tested.
- Record wallet type, version, network, pruning/index state, rescan behavior, and exact recovery result.
- Distinguish descriptor and legacy-wallet workflows.
- Do not claim pruning-safe recovery without testing the relevant historical-data path.

## Related pages

- [Wallet RPC](wallet-rpc.md)
- [Wallet startup](wallet-startup.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Replay protection v31](replay-protection-v31.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

Highest-value next test:

1. create a brand-new disposable v31 wallet;
2. create known disposable addresses/state;
3. back it up;
4. unload/remove only the disposable test state;
5. restore under a separate disposable wallet name;
6. verify descriptors/addresses/balance/history expectations;
7. record rescan/pruning/index requirements;
8. destroy the disposable artifacts.

Legacy imports, sensitive key dumps, encrypted-wallet recovery, and cross-platform paths should remain separate tests.

## Primary sources

Pinned/current review scope includes:

- `v31.1.0/src/wallet/rpc/backup.cpp`
- `v31.1.0/src/wallet/rpc/wallet.cpp`
- `v31.1.0/src/wallet/wallet.*`
- `v31.1.0/src/wallet/load.*`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-only partial  
**Primary evidence:** BitcoinII Core `v31.1.0` wallet backup/import source plus current wallet runtime records for adjacent wallet lifecycle behavior  
**Notes:** Backup/restore/import/rescan behavior remains source-backed. No existing user wallet was used, and no end-to-end disposable recovery test has yet been completed.
