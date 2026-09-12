# BitcoinII Exchange Integration Package

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page is a working exchange and infrastructure integration package for BitcoinII (BC2).

It should only include confirmed values. Anything not yet confirmed is listed under **Needs verification**.

Evidence labels used on this page:

- **Source-confirmed** — established from the release-pinned BitcoinII Core source, canonical release metadata, or another project-controlled source.
- **Publicly observed** — observed from a public BitcoinII service at a dated point in time; this is not an uptime or reliability guarantee.
- **Runtime-unverified** — present in source or documentation but not yet independently exercised by MoreBC2 against BitcoinII Core v31.1.0.

## Project identity

- Project name: BitcoinII
- Ticker: `BC2` — **Source-confirmed**
- Core software: BitcoinII Core
- Public website: https://bitcoin-ii.org/
- Current release page: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- Canonical public reference-implementation repository: https://github.com/Bitcoin-II/BitcoinII-Core
- Current documented release: `v31.1.0`

`BC2` is used directly by the v31.1.0 source as the formatted currency unit, including `CURRENCY_UNIT = "BC2"` in `src/policy/feerate.h`.

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
- Documented v31.1.0 mainnet RPC default: 8332
- Message start bytes: `0x42 0x49 0x49 0x21`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Genesis merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`
- Mainnet DNS seed in `v31.1.0` chain parameters:
  - `dnsseed.bitcoin-ii.org.`

The older `bitcoinII.ddns.net.` seed reference is not retained here as a current v31.1.0 chain-parameter fact.

### P2P configuration caution

`v31.1.0/src/kernel/chainparams.cpp` sets the authoritative BC2 mainnet P2P default to `8338`.

The generated example configuration contains inherited Bitcoin wording that describes the default `-port` as `8333`. That comment conflicts with BC2's release-pinned chain parameters and must not be used as the BC2 mainnet network-port authority.

For BitcoinII mainnet documentation, use `8338`.

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

## RPC configuration evidence

BitcoinII Core v31.1.0 consistently documents the default mainnet JSON-RPC port as `8332`.

Release-pinned evidence includes:

- `doc/man/bitcoinII-cli.1`
- `doc/man/bitcoinII-d.1`
- `doc/man/bitcoinII-qt.1`
- `share/examples/bitcoinII.conf`
- RPC client option handling in source

Documented defaults are:

- Mainnet: `8332`
- Testnet: `18332`
- Testnet4: `48332`
- Signet: `38332`
- Regtest: `18443`

The port remains operator-configurable.

The dated 2026-07-10 MoreBC2 test used BitcoinII Core v29.1.0 on Windows with RPC at `127.0.0.1:8337`. That is preserved as historical configuration evidence and should not be described as an alternative v31.1.0 default.

BitcoinII's JSON-RPC documentation states that the headless daemon has its JSON-RPC API enabled by default, while the Qt GUI does not expose the RPC server by default unless server mode is enabled.

**Evidence status:** default-port/configuration behavior is **Source-confirmed**. Fresh v31.1.0 startup and command execution remain **Runtime-unverified** by MoreBC2.

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

GitHub currently exposes SHA-256 digest metadata for six uploaded v31.1.0 release assets:

- `BitcoinII-v31.1-Linux-CLI.tar.gz` — `78a88df783c2e15d09ea73c05065f7477cad34086b6e995991f7adeae781603f`
- `BitcoinII-v31.1-Linux-Qt.tar.gz` — `745f6fc1cf7132357ca1ee09ea9c02873aac98cae92a6067ee3a26e8e5fd09ac`
- `BitcoinII-v31.1-Win64-CLI.zip` — `74e052791cbd5183b1876693e5d99f474fb4165b795ba45d8f3c966bd5a7d687`
- `BitcoinII-v31.1-Win64-Qt.zip` — `f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d`
- `BitcoinII-Core-v31.1-x86_64-apple.zip` — `ec44c2472c3501b2f853393a797cf5a8bdfa2292f375630c772723218ce3b7a8`
- `BitcoinII-Core-v31.1-arm64.zip` — `e41f5dc4fc16277883aa12b9f92dc2043cb38fc355eed01da619ba5f7bf43acc`

The `v31.1.0` tag is a lightweight Git tag pointing to commit:

`8daaf7b12e71d3646eed787f040bf2899a69dc1c`

GitHub reports that target commit as cryptographically verified with a valid signature.

This is useful release-authentication evidence, but it is not equivalent to a separately signed release checksum manifest, a detached signature over each binary, or reproducible-build proof.

## Transaction and PSBT facilities

BitcoinII Core v31.1.0 source contains the expected Bitcoin-style transaction and PSBT facilities, including paths for:

- `getrawtransaction`
- `sendrawtransaction`
- `walletcreatefundedpsbt`
- `walletprocesspsbt`
- `finalizepsbt`
- raw transaction construction and wallet signing

These facilities are therefore **Source-confirmed as present in v31.1.0**.

MoreBC2 has not yet independently exercised the full v31.1.0 construction-signing-broadcast lifecycle. Production behavior remains **Runtime-unverified**.

## Public explorer hierarchy

Current public-facing explorer infrastructure should be described as follows:

1. `https://bitcoinii.ddns.net/explorer/` — **Official BitcoinII Explorer**
2. `https://explorer.bitcoin-ii.org` — project-linked explorer hosted under the BitcoinII domain, but explicitly independently run and community-funded; its footer identifies infrastructure by CapsPool.io
3. `https://bc2mempool.com` — supplemental public explorer/API service
4. `https://bc2.live` — supplemental public explorer/frontend

`bc2.live` must not be counted as an independent redundancy provider merely because it uses a different hostname; backend independence has not been established.

Public explorer reachability is **Publicly observed**, not a custody-grade availability guarantee.

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
- `src/policy/feerate.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/policy/feerate.h
- `share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/share/examples/bitcoinII.conf
- `doc/JSON-RPC-interface.md`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/doc/JSON-RPC-interface.md
- README: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/README.md
- [Project identity source check - 2026-07-10](../verification/project-identity-source-check-2026-07-10.md)
- [Local node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)

## Needs verification

- Current recommended confirmation count under v31.1.0 / ShockWave.
- Current maintainer or technical/security contact process.
- Whether release checksums are published in a standalone signed manifest in addition to GitHub asset digest metadata.
- Independent download/hash verification of the current v31.1.0 binaries.
- Reproducible-build evidence, if available.
- Fresh v31.1.0 RPC runtime behavior and command outputs.
- Tested v31.1.0 deposit and withdrawal workflows.
- Replay-protection transaction test vectors.
- Current Electrum protocol reachability and wallet-facing behavior.
- Transaction-broadcast behavior through public services.
- Recommended custody architecture and confirmation policy.

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 release metadata, release-pinned source and generated documentation, plus previously recorded MoreBC2 local RPC evidence and dated public-service observations.
**Notes:** Source-confirmed network constants, ticker, RPC defaults, release metadata, transaction/PSBT presence, and explorer classification were refreshed on 2026-09-12. The package remains Draft and should not yet be represented as a complete production exchange runbook; confirmation policy, v31.1.0 runtime tests, technical contact process, release-binary authentication, and operational deposit/withdrawal workflows remain unresolved.
