# BitcoinII repository map

**Category:** Developer guide  
**Status:** Reviewed / Navigation  
**Last reviewed:** 2026-09-12

## Summary

This page maps the parts of the BitcoinII Core repository that MoreBC2 currently uses for technical documentation and integration evidence.

It is a navigation map, not a claim that the entire repository has been audited. Current claims should prefer release-pinned BitcoinII Core `v31.1.0` source and the corresponding [Source Atlas](source-atlas/README.md) entry.

## High-value current paths

| Area | Important reviewed paths | Current MoreBC2 use |
|---|---|---|
| Chain identity / consensus parameters | `src/kernel/chainparams.cpp`, `src/consensus/params.h` | Genesis, network identity, ports, checkpoints, deployment heights, ShockWave/replay/data-restriction activations |
| Proof of work | `src/pow.cpp`, `src/pow.h` | ShockWave, target validation, historical/current difficulty boundary |
| Header sync | `src/headerssync.*`, `src/net_processing.cpp` | Fork-aware ShockWave history and header validation |
| Block / chain validation | `src/validation.*` | Header/block acceptance, best-chain selection, reorgs, UTXO/script validation, v31 activation paths |
| Transaction consensus | `src/consensus/tx_check.*`, `tx_verify.*`, `bitcoinII_data.h` | Structural transaction checks and BitcoinII-specific post-activation data rules |
| Script/signing | `src/script/interpreter.*`, `src/script/sign.cpp` | Script verification, replay-domain signature hashing, witness/Taproot context |
| Mining/templates | `src/node/miner.*`, `mini_miner.*`, `src/rpc/mining.cpp` | Template assembly, candidate-time/`nBits` coupling, mining RPC |
| Mempool | `src/txmempool.*`, `src/kernel/mempool_entry.h`, validation mempool paths | Admission, local state, reorg handling, replay-domain activation boundary |
| Networking | `src/protocol.*`, `src/net.*`, `src/net_processing.*`, `src/addrman*`, `src/banman*` | P2P identity, peer lifecycle, relay, address/ban state |
| Blockchain/network RPC | `src/rpc/blockchain.cpp`, `src/rpc/net.cpp` | Operator/service status and control surfaces |
| Raw transaction / PSBT RPC | `src/rpc/rawtransaction.cpp`, PSBT/node/wallet signing paths | Transaction decode/sign/finalize, replay-domain integration |
| Wallet lifecycle | `src/wallet/init.cpp`, `load.*`, `context.*`, `wallet.*` | Wallet startup/load/persistence |
| Wallet RPC | `src/wallet/rpc/*` reviewed groups | Creation/status, balance, spend/PSBT, backup/import, encryption, history/rescan |
| Block storage | `src/node/blockstorage.*` | Block/undo storage, pruning/reindex context |
| Build system | `CMakeLists.txt`, `src/CMakeLists.txt`, build docs | Source-backed build requirements/options; not yet a successful MoreBC2 source build |

## Current v31-specific feature map

### ShockWave

Primary paths:

- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/node/miner.cpp`
- `src/headerssync.*`
- contextual header validation in `src/validation.cpp`

Mainnet activation: height `57750`.

### Replay protection

Primary paths:

- `src/consensus/params.h`
- `src/script/interpreter.*`
- `src/script/sign.cpp`
- `src/validation.cpp`
- `src/psbt.*`
- `src/node/psbt.*`
- `src/rpc/rawtransaction.cpp`
- wallet signing/PSBT paths.

Mainnet activation: height `57750`; domain `0x01324342`.

### Consensus data restrictions

Primary paths:

- `src/kernel/chainparams.cpp`
- `src/consensus/bitcoinII_data.h`
- `src/validation.cpp`
- associated current tests.

Mainnet activation: height `57750`.

### Fork-aware header sync

Primary paths:

- `src/headerssync.h`
- `src/headerssync.cpp`
- `src/net_processing.cpp`
- `src/pow.cpp`

The current implementation preserves bounded synthetic history so alternate branches can be validated with production ShockWave next-work logic.

## Runtime-covered paths

September `v31.1.0` release-binary testing now provides bounded evidence for:

- startup/shutdown/restart;
- mainnet P2P `8338`, protocol `70016`, outbound discovery, header acquisition;
- loopback cookie RPC with server mode;
- selected blockchain/network/mempool status RPCs;
- fresh descriptor-wallet creation/reload;
- disposable regtest address generation and `getbalances`;
- PSBT funding/signing/finalization;
- transaction decoding, `testmempoolaccept`, local-only `sendrawtransaction`, mempool entry inspection;
- isolated `generatetoaddress` local block generation.

That does not turn adjacent source paths into runtime verification. In particular, mainnet replay activation, controlled ShockWave vectors, data-restriction activation, external signing, public transaction broadcast, GBT mining, and pool Stratum shares remain separate tests.

## Source-only / structural coverage

The Source Atlas also retains detailed first-pass maps of:

- addrman and ban/discouragement handling;
- block storage and disconnected-transaction helpers;
- mempool-entry and txmempool internals;
- validation-interface callbacks;
- peer handshake/relay/send-loop/eviction paths;
- wallet backup/encryption/history paths.

Those pages remain useful as implementation navigation even where MoreBC2 has no dedicated runtime fixture.

## Release and build boundary

The current release target is BitcoinII Core `v31.1.0` / tag target commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`.

MoreBC2 has independently matched the Windows Qt archive hash used for runtime testing to the recorded GitHub release digest. That is artifact-integrity evidence, not reproducible-build proof.

A successful BitcoinII source build/test-suite run has not yet been completed by MoreBC2.

## Related pages

- [Source tree guide](source-tree.md)
- [Source Atlas](source-atlas/README.md)
- [Developer reading order](reading-order.md)
- [Build system](build-system.md)
- [Testing guide](testing.md)
- [Release verification](release-verification.md)

## Verification

**Status:** Reviewed / Navigation  
**Primary evidence:** BitcoinII Core `v31.1.0` release-pinned source reviews, current Source Atlas, and September 2026 runtime records  
**Notes:** The map is current for documented v31 feature paths and evidence boundaries. Unlisted files/directories are not implied to have been audited.
