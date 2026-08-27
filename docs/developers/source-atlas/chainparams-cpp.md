# `src/kernel/chainparams.cpp`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-30

## Purpose

`chainparams.cpp` defines chain-specific parameters for BitcoinII Core.

For MoreBC2, this is currently one of the most important source files because it contains many values needed by users, developers, miners, explorers, and exchanges.

## Review note

Some values in this file are chain identity values. Other values are chain-data snapshots that can be updated over time.

MoreBC2 has started comparing the current observed repository with `v29.1.0`. Identity values such as genesis data, ports, address prefixes, seeds, activation heights, and proof-of-work timing were spot-checked against `v29.1.0`.

Snapshot-style fields should always say which source version they came from:

- `nMinimumChainWork`
- `defaultAssumeValid`
- checkpoints
- AssumeUTXO data
- chain transaction statistics

See [Release source comparison notes](../../verification/release-source-comparison.md).

## Why it matters

This file is used to verify:

- Mainnet chain type.
- Consensus parameter values.
- Genesis block values.
- DNS seeds.
- Address prefixes.
- Default P2P port.
- Deployment heights visible in chain parameters.
- Checkpoint data.
- Assumed chain size and chain state size hints.

## File header notes

The file header states that BitcoinII was forked from Bitcoin Core version `0.27.0` and is distributed under the MIT software license.

## Includes worth noting

The file includes headers for consensus amounts, merkle calculation, consensus parameters, hashing, message-start characters, block primitives, transactions, and chain type utilities.

That makes it a central source for chain identity, genesis construction, and consensus-related network parameters.

## Genesis block construction

The file contains two `CreateGenesisBlock` helpers.

The BitcoinII timestamp string is:

```text
BBC News 12/04/2024 French government collapses in no-confidence vote
```

Mainnet genesis values currently documented from this file:

| Field | Value |
|---|---|
| Time | `1734019071` |
| Nonce | `1597163478` |
| Bits | `0x1d00ffff` |
| Version | `1` |
| Reward | `50 * COIN` |
| Genesis hash | `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb` |
| Merkle root | `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49` |

## Mainnet chain identity

Mainnet is assigned:

- `m_chain_type = ChainType::MAIN`
- Message start bytes: `0x42 0x49 0x49 0x21`
- Default P2P port: `8338`
- Prune-after height: `200000`
- Assumed blockchain size: `10`
- Assumed chain state size: `10`

## Mainnet consensus parameters visible in this file

| Parameter | Value |
|---|---|
| Subsidy halving interval | `210000` |
| BIP34 height | `250` |
| BIP65 height | `260` |
| BIP66 height | `270` |
| CSV height | `280` |
| SegWit height | `290` |
| Miner confirmation window | `2016` |
| Rule change activation threshold | `1815` |
| Taproot deployment bit | `2` |
| Taproot start time | `1734019071` |
| Taproot timeout | `18942120000` |
| Taproot minimum activation height | `300` |
| Minimum BIP9 warning height | `2306` |

## Mainnet proof-of-work parameters visible in this file

| Parameter | Value |
|---|---|
| `powLimit` | `00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff` |
| Target timespan | `14 * 24 * 60 * 60` seconds |
| Target spacing | `10 * 60` seconds |
| Allow min-difficulty blocks | `false` |
| No retargeting | `false` |

## Chain work and assume-valid

These values are chain-data snapshots. They should not be quoted without naming the source version.

For `v29.1.0`, MoreBC2 observed:

- `nMinimumChainWork = 0x00000000000000000000000000000000000000000000000000959028194ff1139272`
- `defaultAssumeValid = 0x00000000000000067e82c9cebc8b58e70f0be31908598d3240a4ecbaa527682e`

The related source comment identifies the assume-valid hash with height `33000` for that observation.

Current `main` may differ after later updates.

## DNS seeds

Mainnet seeds visible in this file:

- `dnsseed.bitcoin-ii.org.`
- `bitcoinII.ddns.net.`

## Address encoding parameters

| Encoding value | Source value |
|---|---|
| Base58 public key address prefix | `0` |
| Base58 script address prefix | `5` |
| Base58 secret key prefix | `128` |
| Extended public key prefix | `04 88 B2 1E` |
| Extended secret key prefix | `04 88 AD E4` |
| Bech32 human-readable part | `bc` |

## Checkpoint data

The file defines mainnet checkpoint data for multiple heights, including early consensus activation heights and later chain heights.

Checkpoint lists should be labeled by source version before being copied into public-facing docs.

## Related MoreBC2 pages

- [Network specifications](../../documentation/network-specifications.md)
- [Consensus overview](../../documentation/consensus-overview.md)
- [What is BitcoinII?](../../documentation/what-is-bitcoinii.md)
- [Exchange integration package](../../exchange/integration-package.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)
- [Release source comparison notes](../../verification/release-source-comparison.md)

## Open questions

- Monitor whether the current canonical `Bitcoin-II/BitcoinII-Core` source or release path changes.
- Confirm whether current `main` differs from `v29.1.0` for snapshot-style chain-data fields.
- Confirm maintainer-preferred public wording for consensus parameters.
- Decide whether checkpoint data deserves a separate reference page.
- Review testnet, signet, and regtest sections separately before documenting non-mainnet values.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp
- `v29.1.0`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/kernel/chainparams.cpp
- [Release source comparison notes](../../verification/release-source-comparison.md)

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes, partially
**Notes:** Mainnet identity and consensus timing values have been checked from source, including a `v29.1.0` spot check. Snapshot-style chain-data fields must remain labeled by source version before being treated as public-ready.
