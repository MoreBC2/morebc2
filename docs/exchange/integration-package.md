# BitcoinII Exchange Integration Package

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page is a working exchange and infrastructure integration package for BitcoinII (BC2).

It should only include confirmed values. Anything not yet confirmed is listed under **Needs verification**.

## Project identity

- Project name: BitcoinII
- Common ticker: BC2
- Core software: BitcoinII Core
- Public website: https://bitcoin-ii.org/
- Public release page: https://github.com/BitcoinII-Dev/BitcoinII/releases
- Public source repository path shown by project resources: https://github.com/BitcoinII-Dev/BitcoinII
- License: MIT

## Mainnet technical values checked from source

- Target block spacing: 10 minutes
- Retarget timespan: 14 days
- Miner confirmation window: 2016 blocks
- Subsidy halving interval: 210,000 blocks
- Difficulty adjustment: Bitcoin-style 2016-block retargeting, bounded to 1/4x through 4x timespan adjustment
- Block header hashing path: double-SHA256 via `HashWriter::GetHash()`
- `COIN`: 100,000,000 base units
- `MAX_MONEY`: `21000000 * COIN`
- Default P2P port: 8338
- Default RPC port from generated example config: 8332
- Message start bytes: `0x42 0x49 0x49 0x21`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Genesis merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`
- DNS seeds:
  - `dnsseed.bitcoin-ii.org.`
  - `bitcoinII.ddns.net.`

## Address information checked from source

- Base58 public key address prefix: `0`
- Base58 script address prefix: `5`
- Base58 secret key prefix: `128`
- Extended public key prefix: `04 88 B2 1E`
- Extended secret key prefix: `04 88 AD E4`
- Bech32 HRP: `bc`

## RPC information checked from generated config

The generated example configuration lists:

- Mainnet RPC port: `8332`
- Testnet RPC port: `18332`
- Signet RPC port: `38332`
- Regtest RPC port: `18443`

It also warns not to expose the RPC server to untrusted networks such as the public internet.

## Release information checked

Latest release observed on GitHub:

- `v0.27.1`
- Date shown: 2025-11-29
- Release note shown: `Update DNS seeds and chain transaction data`

Earlier release observed:

- `v0.27.0`
- Release title: `Genesis Release`
- Date shown: 2025-07-28

## Suggested exchange integration sections still to build

### 1. Wallet/daemon setup

Needs verified instructions for:

- Linux daemon setup
- Windows wallet setup
- macOS wallet setup
- Configuration file location
- RPC username/password setup
- Data directory location
- Startup flags

### 2. RPC examples

Needs tested examples for:

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
- Reorg-risk notes
- Address generation
- Deposit monitoring
- Handling stuck or orphaned transactions

### 4. Withdrawals

Needs exchange-specific guidance for:

- Recommended withdrawal confirmations
- Fee estimation
- Hot/cold wallet practices
- Rescan/reindex recovery notes

### 5. Release verification

Needs a clear statement on whether BitcoinII releases provide:

- Inline SHA256 values
- A checksum manifest file
- Detached signatures
- GitHub verified commits/tags
- Reproducible builds

Do not claim stronger release verification than currently exists.

## Sources

- GitHub releases: https://github.com/BitcoinII-Dev/BitcoinII/releases
- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp
- `src/primitives/block.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/primitives/block.cpp
- `src/hash.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/hash.h
- `src/consensus/amount.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/consensus/amount.h
- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf
- README: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/README.md

## Needs verification

- Official ticker confirmation from primary source beyond source-code unit references.
- Current recommended confirmation count.
- Current maintainer or technical contact process.
- Whether release checksums are signed or only displayed on GitHub.
- Whether exchanges should use `BitcoinII-Dev/BitcoinII` as the canonical repo path.
- Whether maintainers prefer `double-SHA256` or `SHA-256d` wording in public integration docs.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This package now has more verified source-backed values, but it should not be sent to exchanges as complete yet.
