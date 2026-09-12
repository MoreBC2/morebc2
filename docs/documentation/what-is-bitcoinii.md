# What is BitcoinII?

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII (BC2) is a peer-to-peer proof-of-work cryptocurrency network. BitcoinII Core is the current public reference implementation used to connect to the network, validate blocks and transactions, and optionally provide wallet and graphical-interface functionality.

Current-facing MoreBC2 documentation uses BitcoinII Core `v31.1.0` as the baseline.

## Current identity and units

Current BitcoinII Core source defines:

- formatted currency unit / ticker: `BC2`;
- atomic unit label: `sat2`;
- `COIN = 100000000`;
- maximum money range: `21000000 * COIN`;
- subsidy halving interval: `210000` blocks.

## Relationship to Bitcoin Core

BitcoinII retains substantial Bitcoin Core lineage and Bitcoin-like architecture, transaction structures, address encodings, RPC concepts, wallet concepts, and proof-of-work structure.

Modern BitcoinII is not simply an unchanged Bitcoin clone. Current `v31.1.0` adds BitcoinII-specific consensus/signing behavior that integrations must account for.

## Current v31.1.0 behavior

Current source and release material establish:

- target block spacing: 10 minutes;
- block-header hashing: double-SHA256;
- current difficulty adjustment: ShockWave per block from mainnet height `57750`;
- consensus data restrictions from height `57750`;
- replay protection from height `57750`;
- replay-protection fork/domain id: `0x01324342`;
- fork-aware header synchronization;
- mainnet P2P default: `8338`;
- documented mainnet JSON-RPC default: `8332`, operator-configurable.

The inherited 14-day / 2016-block retarget parameters describe historical/pre-ShockWave behavior and must not be presented as the current post-`57750` difficulty schedule.

## Replay protection and Bitcoin-like addresses

BitcoinII still uses Bitcoin-like Base58/Bech32 encodings, including Bech32 HRP `bc`.

That similarity does **not** mean ordinary Bitcoin signing semantics remain sufficient.

Current BC2 replay protection changes the signature-hash domain after mainnet height `57750`. Wallets, PSBT tooling, raw-transaction code, and external signers therefore need BC2-aware signing behavior even when address or transaction formats look familiar.

## Current runtime evidence

MoreBC2 now has bounded `v31.1.0` runtime evidence from September 11, 2026.

An isolated Windows mainnet test directly observed:

- BitcoinII runtime version `31.1.0` / protocol `70016`;
- P2P listener on `8338`;
- outbound peer discovery and connection;
- current header acquisition and advancing block validation during initial block download;
- cookie-authenticated loopback RPC using an explicit test port override;
- creation/reload of a disposable descriptor wallet;
- clean shutdown and restart.

A separate isolated regtest test directly exercised:

- local disposable funds;
- `walletcreatefundedpsbt`;
- `walletprocesspsbt`;
- PSBT decoding/finalization;
- raw transaction decoding;
- `testmempoolaccept`;
- local-only `sendrawtransaction` and mempool entry.

That regtest test had zero peers and did not broadcast to the public BitcoinII network.

## Wallet and integration boundary

BitcoinII Core wallet functionality now has meaningful bounded runtime evidence, but MoreBC2 does **not** infer compatibility for third-party wallets or hardware/external signers from that alone.

Current wallet evidence includes separate observations for Genesis Wallet, a Google Play BC2 wallet, `Bitcoin-II/wallet-bc2`, and Tangem's current BitcoinII asset page. Their support, security, and official-status claims differ and should be read in the dedicated wallet sections.

Tangem's current public BitcoinII asset page states that the BitcoinII network is temporarily unsupported, so it should not be presented as working native BC2 support today.

## Explorer and public-service boundary

Current public explorer/API/Electrum observations exist, but public-service reachability is not protocol authority or custody-grade verification.

MoreBC2 distinguishes:

- the Official BitcoinII Explorer;
- the project-linked but independently operated `explorer.bitcoin-ii.org`;
- supplemental Mempool-style services such as `bc2mempool.com` and `bc2.live`;
- the current Electrum service at `infra1.bitcoin-ii.org`.

A valid public transaction-broadcast path has not yet been established by MoreBC2.

## Confirmation and finality boundary

BitcoinII uses accumulated-work chain selection and remains reorganization-capable.

A confirmation count is therefore an operational risk measure, not deterministic finality. MoreBC2's provisional 50-confirmation baseline for ordinary exchange deposits is service guidance informed by observed exchange settings, not a consensus parameter.

## What this page does not claim

This page does not claim:

- that every `v31.1.0` path has been runtime-tested;
- that every third-party wallet/signing implementation is compatible;
- that a public explorer/API is an independent or permanent source of truth;
- that any finite confirmation count guarantees irreversibility;
- that release binaries have reproducible-build proof or a maintainer-signed checksum manifest;
- that market price or future value can be predicted.

## Where to go next

- [Project overview](project-overview.md)
- [Network specifications](network-specifications.md)
- [Consensus overview](consensus-overview.md)
- [Releases](releases.md)
- [Architecture](../architecture/README.md)
- [Compatibility](../compatibility/README.md)
- [Wallets](../wallets/README.md)
- [Explorer resources](explorer-resources.md)
- [Exchange integration](../exchange/README.md)
- [Verification evidence](../verification/verification-index.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` release/source material, September 11 node/RPC and PSBT runtime evidence, current compatibility/architecture/wallet/public-infrastructure records  
**Notes:** The principal current identity, network, consensus, wallet-runtime, and integration boundaries are synchronized. Activation-boundary runtime vectors, external-signer compatibility, full public broadcast, complete source-build reproduction, and long-term service reliability remain outside the current evidence.
