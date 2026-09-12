# BitcoinII Network Specifications

**Category:** Documentation
**Status:** Source-reviewed / Operational verification incomplete
**Last reviewed:** 2026-09-12

## Summary

This page records BitcoinII mainnet values checked against the current BitcoinII Core `v31.1.0` release and source.

Values should not be copied from community chat, explorer pages, or third-party listings unless clearly labeled and later verified against primary sources.

## Current release baseline

- Current documented release: `v31.1.0`
- Published: `2026-08-29T02:39:30Z`
- Canonical repository: https://github.com/Bitcoin-II/BitcoinII-Core
- Canonical release page: https://github.com/Bitcoin-II/BitcoinII-Core/releases

## Supply and units

- Ticker / formatted currency unit: `BC2`
- `COIN = 100000000`
- `MAX_MONEY = 21000000 * COIN`
- Subsidy halving interval: `210000` blocks

## Block timing and current difficulty behavior

- Target block spacing: `10 * 60` seconds (10 minutes)
- Historical/inherited target timespan: `14 * 24 * 60 * 60` seconds
- Historical Bitcoin-style adjustment interval: 2016 blocks
- Current post-activation difficulty algorithm: **ShockWave per block**
- ShockWave activation height: `57750`

The 14-day / 2016-block values remain in chain parameters for inherited and historical behavior. They are **not** the current post-57750 mainnet difficulty-adjustment schedule.

Reviewed `v31.1.0/src/pow.cpp` documents a 25-block / 24-interval rolling baseline, a six-interval fast-response sensor, true `+/-4x` final per-block bounds, timestamp-consistency handling, emergency stall recovery, and post-recovery stabilization.

## v31.1.0 activation heights

| Rule | Height/value |
|---|---|
| Data restrictions | `57750` |
| ShockWave | `57750` |
| Replay protection | `57750` |
| Replay-protection fork ID | `0x01324342` |

Earlier deployment parameters remain:

| Rule/deployment | Height or value |
|---|---|
| BIP34 | `250` |
| BIP65 | `260` |
| BIP66 | `270` |
| CSV | `280` |
| SegWit | `290` |
| Taproot deployment bit | `2` |
| Taproot minimum activation height | `300` |

## Proof-of-work

- `powLimit = 00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff`
- Block-header hashing path: double-SHA256 via `HashWriter::GetHash()`
- Mainnet minimum-difficulty blocks: disabled
- Retargeting: enabled

## Network identity

- Message start bytes: `0x42 0x49 0x49 0x21`
- Default P2P port: `8338`
- Prune-after height: `200000`
- Assumed blockchain size hint: `10`
- Assumed chain-state size hint: `10`

### Generated configuration caution

The release-generated example configuration contains inherited Bitcoin wording that describes the default P2P `-port` as `8333`.

BitcoinII's release-pinned mainnet chain parameters set `nDefaultPort = 8338`.

For BC2 network documentation, `8338` is the authoritative v31.1.0 mainnet P2P default. The `8333` example-config comment should be treated as inherited documentation drift.

### RPC ports

BitcoinII Core v31.1.0 consistently documents the following JSON-RPC defaults:

- Mainnet: `8332`
- Testnet: `18332`
- Testnet4: `48332`
- Signet: `38332`
- Regtest: `18443`

The RPC port is operator-configurable.

A dated MoreBC2 v29.1.0 Windows/mainnet test used `127.0.0.1:8337`. That value is preserved as historical configured-runtime evidence and is not the documented v31.1.0 mainnet default.

**Evidence status:** default values are **Source-confirmed**; fresh MoreBC2 v31.1.0 runtime behavior remains **Runtime-unverified**.

## Genesis block

- Timestamp text: `BBC News 12/04/2024 French government collapses in no-confidence vote`
- Time: `1734019071`
- Nonce: `1597163478`
- Bits: `0x1d00ffff`
- Version: `1`
- Reward: `50 * COIN`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`

## Chain work and assume-valid

The following are moving release-specific chain-data fields from `v31.1.0` source:

- Minimum chain work: `0000000000000000000000000000000000000000000000959028194ff1139272`
- Default assume-valid hash: `00000000000000067e82c9cebc8b58e70f0be31908598d3240a4ecbaa527682e`

Do not reuse these without a release/version label.

## DNS seeds

`v31.1.0` mainnet chain parameters explicitly list:

- `dnsseed.bitcoin-ii.org.`

Earlier MoreBC2 material also recorded `bitcoinII.ddns.net.` from older source. That second seed should be treated as historical until re-confirmed in the current release path.

## Address prefixes

- Base58 P2PKH prefix: `0`
- Base58 P2SH prefix: `5`
- Base58 secret-key prefix: `128`
- Extended public key: `04 88 B2 1E`
- Extended secret key: `04 88 AD E4`
- Bech32 HRP: `bc`

Because these encodings are Bitcoin-like, current documentation should pair them with the fact that BC2 now has explicit replay protection from height `57750`.

## Current interpretation

The safest current wording is:

> BitcoinII is a native proof-of-work blockchain with 10-minute target spacing, double-SHA256 block-header hashing, and ShockWave per-block difficulty adjustment active from mainnet height 57750.

## Open items

- Fresh v31.1.0 runtime confirmation of documented RPC behavior.
- Recommended exchange deposit/withdrawal confirmation policy.
- Detailed replay-protection transaction-path review.
- Detailed consensus data-restriction review.
- Live-chain verification of soft-fork/deployment state.
- Maintainer-preferred `double-SHA256` vs `SHA-256d` wording.

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `v31.1.0/src/primitives/block.cpp`
- `v31.1.0/src/hash.h`
- `v31.1.0/src/consensus/amount.h`
- `v31.1.0/src/policy/feerate.h`
- `v31.1.0/share/examples/bitcoinII.conf`
- `v31.1.0/doc/JSON-RPC-interface.md`

## Verification

**Status:** Source-reviewed / Operational verification incomplete
**Primary sources checked:** BitcoinII Core v31.1.0 release-pinned chain parameters, consensus/difficulty source, amount/fee unit definitions, generated configuration, and RPC documentation.
**Notes:** Current-facing release, ticker, network, activation, difficulty, RPC-default, and P2P-port wording has been refreshed for `v31.1.0`. Fresh runtime behavior, live deployment state, and several operational recommendations remain intentionally unresolved.
