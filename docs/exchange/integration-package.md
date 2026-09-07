# BitcoinII Exchange Integration Package

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-07

## Summary

This page is a working exchange and infrastructure integration package for BitcoinII (BC2).

It should only include confirmed values. Anything not yet confirmed is listed under **Needs verification**.

## Project identity

- Project name: BitcoinII
- Common ticker: BC2
- Core software: BitcoinII Core
- Public website: https://bitcoin-ii.org/
- Current release page: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- Canonical public reference-implementation repository: https://github.com/Bitcoin-II/BitcoinII-Core
- Current documented release: `v31.1.0`

### Licensing note

The notice in BitcoinII Core `v31.1.0/src/pow.cpp` applies MIT terms to identified Bitcoin Core and Dash/Darkcoin portions but not to original ShockWave implementation material. The latter is governed by separate, non-open-source terms stated in that file.

This package does not reproduce or license the ShockWave implementation. It records facts relevant to integrating with BitcoinII; the upstream notice remains controlling for use of the source and does not state that ordinary node operation or exchange integration is prohibited.

## Mainnet technical values checked from v31.1.0 source

- Target block spacing: 10 minutes
- Subsidy halving interval: 210,000 blocks
- Difficulty adjustment: ShockWave per-block difficulty adjustment from mainnet height `57,750`
- ShockWave rolling baseline: 25 blocks / 24 intervals using MedianTimePast-based history
- Per-block final difficulty adjustment bounds: true `+/-4x`
- Emergency stall-recovery logic: enabled as part of ShockWave
- Block header hashing path: double-SHA256 via `HashWriter::GetHash()`
- `COIN`: 100,000,000 base units
- `MAX_MONEY`: `21000000 * COIN`
- Default P2P port: 8338
- Mainnet RPC port shown by inherited/generated example configuration: 8332
- Message start bytes: `0x42 0x49 0x49 0x21`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Genesis merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`
- Mainnet DNS seed in `v31.1.0` chain parameters:
  - `dnsseed.bitcoin-ii.org.`

The older `bitcoinII.ddns.net.` seed reference is not retained here as a current v31.1.0 chain-parameter fact.

## v31.1.0 consensus activation at height 57,750

BitcoinII Core v31.1.0 sets the following mainnet activation heights to `57,750`:

- ShockWave per-block difficulty adjustment
- Consensus-level data restrictions for Ordinals, inscriptions, and Runes mitigation
- BC2 transaction replay protection

The replay-protection fork/domain identifier in v31.1.0 is `0x01324342`.

The v31.1.0 release also includes fork-aware header synchronization and associated wallet, mining, mempool, RPC, validation, and PSBT updates.

## Address information checked from v31.1.0 source

- Base58 public key address prefix: `0`
- Base58 script address prefix: `5`
- Base58 secret key prefix: `128`
- Extended public key prefix: `04 88 B2 1E`
- Extended secret key prefix: `04 88 AD E4`
- Bech32 HRP: `bc`

Because these address-format values overlap Bitcoin conventions, exchange integrators should account for BC2's v31 replay-protection behavior rather than assuming address-format separation alone prevents cross-chain replay risk.

## RPC evidence and unresolved default

Inherited/generated example configuration lists:

- Mainnet RPC port: `8332`
- Testnet RPC port: `18332`
- Signet RPC port: `38332`
- Regtest RPC port: `18443`

It also warns not to expose the RPC server to untrusted networks such as the public internet.

Separate local evidence dated 2026-07-10 configured and observed BitcoinII Core `v29.1.0` on Windows mainnet at `127.0.0.1:8337`. That test does not prove that `8337` is universal across releases, platforms, or deployments, and it predates v31.1.0. An exchange must verify its exact v31.1.0 node configuration before integration; this package does not prescribe a universal RPC port.

## Release information checked

Current release on the canonical release page:

- `v31.1.0`
- Published: `2026-08-29T02:39:30Z`
- Release note highlights:
  - ShockWave per-block difficulty adjustment
  - consensus-level Ordinals, inscriptions, and Runes mitigation
  - BC2 transaction replay protection
  - fork-aware header synchronization
  - associated wallet, mining, mempool, RPC, validation, and PSBT updates

GitHub currently exposes SHA-256 digests for the uploaded v31.1.0 release assets, including:

- `BitcoinII-v31.1-Linux-CLI.tar.gz` — `78a88df783c2e15d09ea73c05065f7477cad34086b6e995991f7adeae781603f`
- `BitcoinII-v31.1-Linux-Qt.tar.gz` — `745f6fc1cf7132357ca1ee09ea9c02873aac98cae92a6067ee3a26e8e5fd09ac`
- `BitcoinII-v31.1-Win64-CLI.zip` — `74e052791cbd5183b1876693e5d99f474fb4165b795ba45d8f3c966bd5a7d687`
- `BitcoinII-v31.1-Win64-Qt.zip` — `f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d`

These GitHub-provided digests support repeat-download integrity checking. This page does not claim that the release currently has a separately signed checksum manifest, trusted release-signing key, or reproducible-build proof.

## Suggested exchange integration sections still to build

### 1. Wallet/daemon setup

Needs verified v31.1.0 instructions for:

- Linux daemon setup
- Windows wallet setup
- macOS wallet availability/status
- Configuration file location
- RPC username/password setup
- Data directory location
- Startup flags

### 2. RPC examples

Needs tested v31.1.0 examples for:

- `getblockchaininfo`
- `getnetworkinfo`
- `getwalletinfo`
- `getnewaddress`
- `gettransaction`
- `sendtoaddress`
- `listtransactions`

### 3. Deposits

Needs exchange-specific guidance for:

- Recommended minimum confirmations
- Reorg-risk notes under current ShockWave behavior
- Address generation
- Deposit monitoring
- Replay-protection considerations
- Handling stuck or orphaned transactions

### 4. Withdrawals

Needs exchange-specific guidance for:

- Recommended withdrawal confirmations
- Fee estimation
- Hot/cold wallet practices
- Rescan/reindex recovery notes

### 5. Release verification

Needs a clear maintained statement on whether BitcoinII releases provide:

- GitHub asset digests
- A standalone checksum manifest
- Detached signatures
- GitHub verified commits/tags
- Reproducible builds

Do not claim stronger release verification than currently exists.

## Sources

- GitHub releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- v31.1.0 release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `src/primitives/block.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/primitives/block.cpp
- `src/hash.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/hash.h
- `src/consensus/amount.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/consensus/amount.h
- `share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/share/examples/bitcoinII.conf
- README: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/README.md
- [Project identity source check - 2026-07-10](../verification/project-identity-source-check-2026-07-10.md)
- [Local node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)

## Needs verification

- Official ticker confirmation from primary source beyond source-code unit references.
- Current recommended confirmation count under v31.1.0 / ShockWave.
- Current maintainer or technical contact process.
- Whether release checksums are published in a standalone signed manifest in addition to GitHub asset digests.
- Release- and environment-specific RPC port behavior on v31.1.0.
- Tested v31.1.0 deposit and withdrawal workflows.
- Current explorer and market-service status before any listing submission.

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 release metadata, `v31.1.0` `src/kernel/chainparams.cpp`, and `v31.1.0` `src/pow.cpp`, plus previously recorded MoreBC2 local RPC evidence.
**Notes:** Consensus, current-release, network-constant, replay-protection, data-restriction, and ShockWave wording were refreshed on 2026-09-02. The package remains Draft and should not yet be represented as a complete production exchange runbook; confirmation policy, v31.1.0 state-changing RPC tests, technical contact process, and operational setup remain unresolved.
