# BitcoinII Exchange Integration Package

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-08-27

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
- Mainnet RPC port shown by inherited/generated example configuration: 8332
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

## RPC evidence and unresolved default

Inherited/generated example configuration lists:

- Mainnet RPC port: `8332`
- Testnet RPC port: `18332`
- Signet RPC port: `38332`
- Regtest RPC port: `18443`

It also warns not to expose the RPC server to untrusted networks such as the public internet.

Separate local evidence dated 2026-07-10 configured and observed BitcoinII Core `v29.1.0` on Windows mainnet at `127.0.0.1:8337`. That test does not prove that `8337` is universal across releases, platforms, or deployments, and the generated `8332` material does not prove the `v29.1.0` runtime value. An exchange must verify its exact release source and active node configuration before integration; this package does not currently prescribe a universal RPC port.

## Release information checked

Current documented release on the canonical release page:

- `v29.1.0`
- GitHub API `published_at` recorded by MoreBC2: `2025-11-27T04:22:39Z`
- Release note recorded by MoreBC2: mandatory release with updated seed server and blockchain checkpoints; previous v29 releases deprecated

Legacy releases observed on a redirected older repository path:

- `v0.27.1`
- `v0.27.0`

Those legacy observations are historical evidence, not the current operational release path. Release-page/API metadata does not authenticate binaries, checksums, signatures, or trusted keys.

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

- GitHub releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/pow.cpp
- `src/primitives/block.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/primitives/block.cpp
- `src/hash.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/hash.h
- `src/consensus/amount.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/consensus/amount.h
- `share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/share/examples/bitcoinII.conf
- README: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/README.md
- [Project identity source check - 2026-07-10](../verification/project-identity-source-check-2026-07-10.md)
- [Local node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)

## Needs verification

- Official ticker confirmation from primary source beyond source-code unit references.
- Current recommended confirmation count.
- Current maintainer or technical contact process.
- Whether release checksums are signed or only displayed on GitHub.
- Release- and environment-specific RPC port behavior beyond the one local `v29.1.0` Windows/mainnet test.
- Whether maintainers prefer `double-SHA256` or `SHA-256d` wording in public integration docs.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Canonical-source, current-release, and RPC wording were factually synchronized on 2026-08-27. The package remains Draft and should not be sent to exchanges as complete; operational setup, release authentication, confirmation policy, and state-changing workflows remain unresolved.
