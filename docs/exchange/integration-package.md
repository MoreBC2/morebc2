# BitcoinII Exchange Integration Package

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page is a working exchange and infrastructure integration package for BitcoinII (BC2).

It should only include confirmed values or explicitly labeled provisional guidance. Anything not yet confirmed is listed under **Needs verification**.

Evidence labels used on this page:

- **Source-confirmed** — established from the release-pinned BitcoinII Core source, canonical release metadata, or another project-controlled source.
- **Publicly observed** — observed from a public BitcoinII or exchange service at a dated point in time; this is not an uptime or reliability guarantee.
- **Locally tested** — independently exercised by MoreBC2 in a deliberately isolated environment.
- **Provisional guidance** — an operational recommendation grounded in current evidence but not a BitcoinII consensus rule or maintainer mandate.
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

Fresh isolated Windows validation on 2026-09-11 exercised BitcoinII Core v31.1.0 Qt server mode, cookie-authenticated loopback RPC, peer discovery, initial mainnet sync, clean shutdown/restart, and selected read-only RPCs.

**Evidence status:** default-port/configuration behavior is **Source-confirmed**; the bounded Windows workflow is **Locally tested**. Production daemon deployment and long-duration operation remain outside that test.

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

These facilities are **Source-confirmed as present in v31.1.0**.

A fresh isolated regtest workflow on 2026-09-11 successfully created, funded, signed, finalized, decoded, mempool-tested, and locally submitted a PSBT transaction. Public-network broadcast, external signers, and replay-domain activation remain separately bounded.

## Public explorer hierarchy

Current public-facing explorer infrastructure should be described as follows:

1. `https://bitcoinii.ddns.net/explorer/` — **Official BitcoinII Explorer**
2. `https://explorer.bitcoin-ii.org` — project-linked explorer hosted under the BitcoinII domain, but explicitly independently run and community-funded; its footer identifies infrastructure by CapsPool.io
3. `https://bc2mempool.com` — supplemental public explorer/API service
4. `https://bc2.live` — supplemental public explorer/frontend

`bc2.live` must not be counted as an independent redundancy provider merely because it uses a different hostname; backend independence has not been established.

Public explorer reachability is **Publicly observed**, not a custody-grade availability guarantee.

## Exchange confirmation evidence and provisional policy

Current direct exchange evidence recorded on 2026-09-12:

| Exchange | Observed BC2 setting | Current interpretation |
|---|---|---|
| CoinEx | `safe_confirmations = 2`; `irreversible_confirmations = 6` | Aggressive staged exchange policy. `irreversible` is CoinEx terminology, not protocol finality. |
| NonKYC | `confirmsRequired = 50`; `securityConfirmsRequired = 20` | `50` is the clearest deposit threshold. The separate security field's public semantics are unresolved. |
| NestEx | explicit BC2 backend `conf = 50` | Confirms that BC2 itself, not only the frontend fallback, is configured for 50. |
| Biconomy | count not publicly exposed | Listing confirmed; present withdrawal status and confirmation count remain unverified. |

See [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md).

### Provisional MoreBC2 baseline

MoreBC2 currently uses **50 confirmations as a provisional normal-deposit baseline** for exchange integration guidance.

Why:

- two independently queried active BC2 venues explicitly use 50;
- CoinEx's 2/6 policy demonstrates that exchange risk tolerance varies materially;
- BC2 selects the best chain by accumulated work, while ShockWave can change required work from block to block.

This value is operational guidance, not a protocol rule or mathematical finality claim.

At the 10-minute target spacing, 50 blocks is approximately 8 hours 20 minutes under an idealized steady schedule. Real elapsed time can differ.

For large or unusual deposits, operators should layer additional chainwork, tip-health, network-work, peer-health, reorganization, account-risk, and transaction-value checks around the minimum count. Longer holds or manual review may be appropriate.

MoreBC2 does not currently recommend an automatic universal 100-confirmation second tier. A stricter tier should be justified by the operator's risk model and current chain conditions.

No finite confirmation count protects against an adversary that can sustain majority chainwork indefinitely.

## Exchange integration sections still to complete

### 1. Wallet/daemon setup

Needs production-focused instructions for:

- Linux daemon setup
- Windows wallet setup
- macOS wallet availability/status
- Configuration file location
- RPC authentication setup
- Data directory location
- Startup flags

### 2. RPC examples

Current-release read-only node/RPC behavior has been exercised in an isolated Windows environment, but exchange-facing examples still need to be assembled into a concise operator flow for:

- `getblockchaininfo`
- `getnetworkinfo`
- `getrawtransaction`
- `getblock`
- `getblockhash`
- wallet-scoped commands where the custody design actually uses BitcoinII Core wallet tracking

### 3. Deposits

Current guidance now includes:

- provisional 50-confirmation normal-deposit baseline;
- current exchange-policy evidence;
- requirement to consider cumulative chainwork and live chain health;
- explicit warning that exchange labels such as `irreversible` are not protocol finality.

Still needed:

- address-generation architecture;
- wallet-based versus non-wallet scanning;
- production `txindex` guidance;
- concrete chainwork calculation examples;
- reorganization incident procedures and alert thresholds.

### 4. Withdrawals

Needs exchange-specific guidance for:

- fee estimation;
- hot/cold wallet practices;
- recent-deposit withdrawal holds during abnormal chain conditions;
- transaction-broadcast monitoring;
- retry/failure handling.

MoreBC2 does not currently define a separate universal withdrawal-confirmation count.

### 5. Release verification

Needs a clear maintained statement on whether BitcoinII releases provide:

- GitHub asset digests;
- a standalone checksum manifest;
- detached signatures;
- GitHub verified commits/tags;
- reproducible builds.

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
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)

## Needs verification

- Community or maintainer review of the provisional 50-confirmation normal-deposit baseline.
- A concrete cumulative-chainwork monitoring example and operational thresholds.
- Current maintainer or technical/security contact process.
- Whether release checksums are published in a standalone signed manifest in addition to GitHub asset digest metadata.
- Independent download/hash verification of all current v31.1.0 binaries.
- Reproducible-build evidence, if available.
- Production-focused deposit and withdrawal workflows.
- External-signer replay-protection vectors.
- Current Electrum wallet-facing behavior.
- Successful valid transaction broadcast through public services, if that proof becomes necessary.
- Recommended custody architecture.
- Periodic rechecks of exchange confirmation and wallet-status settings.

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 release metadata, release-pinned source and generated documentation, fresh MoreBC2 v31.1.0 isolated runtime records, current public infrastructure observations, and current-dated exchange API evidence
**Notes:** The package now includes a provisional evidence-based 50-confirmation normal-deposit baseline. It should still not be represented as a complete production exchange runbook because chainwork thresholds, production custody architecture, technical contact process, complete binary authentication, and production deposit/withdrawal procedures remain unresolved.