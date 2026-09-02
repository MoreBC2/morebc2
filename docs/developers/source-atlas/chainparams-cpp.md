# `src/kernel/chainparams.cpp`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-09-02

## Purpose

`chainparams.cpp` defines chain-specific parameters for BitcoinII Core and is a primary source for chain identity, network constants, activation heights, genesis data, and release-specific chain snapshots.

This page now uses BitcoinII Core `v31.1.0` as the current release baseline.

## Mainnet identity

- Chain type: `ChainType::MAIN`
- Message start bytes: `0x42 0x49 0x49 0x21`
- Default P2P port: `8338`
- Prune-after height: `200000`
- Assumed blockchain size hint: `10`
- Assumed chain-state size hint: `10`

## Genesis block

| Field | Value |
|---|---|
| Timestamp text | `BBC News 12/04/2024 French government collapses in no-confidence vote` |
| Time | `1734019071` |
| Nonce | `1597163478` |
| Bits | `0x1d00ffff` |
| Version | `1` |
| Reward | `50 * COIN` |
| Genesis hash | `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb` |
| Merkle root | `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49` |

## Core consensus parameters

| Parameter | Value |
|---|---|
| Subsidy halving interval | `210000` |
| BIP34 height | `250` |
| BIP65 height | `260` |
| BIP66 height | `270` |
| CSV height | `280` |
| SegWit height | `290` |
| Miner confirmation window | `2016` |
| Rule-change threshold | `1815` |
| Taproot deployment bit | `2` |
| Taproot minimum activation height | `300` |

The 2016-block miner confirmation window is a deployment-window parameter. It should not be confused with the current ShockWave difficulty schedule.

## BitcoinII-specific v31.1.0 activations

Mainnet `v31.1.0` sets:

| Rule | Height/value |
|---|---|
| `nDataRestrictionsHeight` | `57750` |
| `nShockWaveActivationHeight` | `57750` |
| `nReplayProtectionHeight` | `57750` |
| `nReplayProtectionForkId` | `0x01324342` |

These values are central to current BitcoinII documentation and should be paired with the `v31.1.0` release notes and implementation files.

## Proof-of-work parameters

| Parameter | Value |
|---|---|
| `powLimit` | `00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff` |
| Historical/inherited target timespan | `14 * 24 * 60 * 60` seconds |
| Target spacing | `10 * 60` seconds |
| Allow minimum-difficulty blocks | `false` |
| No retargeting | `false` |

The target-timespan value remains in chain parameters, but current mainnet difficulty after height `57750` is governed by ShockWave in `src/pow.cpp`.

## Chain work and assume-valid

These are release-specific chain snapshots and must always be labeled by source version.

For `v31.1.0` MoreBC2 observed:

- `nMinimumChainWork = 0000000000000000000000000000000000000000000000959028194ff1139272`
- `defaultAssumeValid = 00000000000000067e82c9cebc8b58e70f0be31908598d3240a4ecbaa527682e`

The source comment associates the assume-valid hash with height `33000`.

## DNS seeds

The `v31.1.0` mainnet section explicitly lists:

- `dnsseed.bitcoin-ii.org.`

Older MoreBC2 pages recorded `bitcoinII.ddns.net.` from earlier source. Treat that second seed as historical until it is re-confirmed in current release source or another current project-controlled source.

## Address encodings

| Encoding | Value |
|---|---|
| Base58 P2PKH prefix | `0` |
| Base58 P2SH prefix | `5` |
| Base58 secret-key prefix | `128` |
| Extended public key | `04 88 B2 1E` |
| Extended secret key | `04 88 AD E4` |
| Bech32 HRP | `bc` |

Because these are Bitcoin-like encodings, current docs should also mention BC2's explicit replay protection beginning at height `57750`.

## Checkpoints

`v31.1.0` includes checkpoint data through at least height `57752` in the reviewed mainnet section. Checkpoint lists are release-specific snapshots and should not be copied without a version label.

## Related pages

- [Network specifications](../../documentation/network-specifications.md)
- [Consensus overview](../../documentation/consensus-overview.md)
- [Source atlas: pow.cpp](pow-cpp.md)
- [Difficulty adjustment](../../encyclopedia/difficulty-adjustment.md)
- [Exchange integration package](../../exchange/integration-package.md)

## Sources

- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes, partially
**Notes:** Mainnet identity, v31-specific activation values, address encodings, and release-specific chain snapshots have been refreshed against `v31.1.0`. Non-mainnet sections and deeper activation-path behavior remain separate review tasks.