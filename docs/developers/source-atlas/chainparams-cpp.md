# `src/kernel/chainparams.cpp`

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Purpose

`src/kernel/chainparams.cpp` defines BitcoinII chain-specific identity and consensus parameters. It is the primary release-pinned source for mainnet network identity, genesis data, deployment heights, proof-of-work parameters, checkpoints, address encodings, DNS seeds, minimum-chain-work, and assume-valid snapshots.

This page uses BitcoinII Core `v31.1.0` as the current release baseline.

## Mainnet identity

Current `v31.1.0` mainnet source sets:

- chain type: `ChainType::MAIN`;
- message-start bytes: `0x42 0x49 0x49 0x21`;
- default P2P port: `8338`;
- prune-after height: `200000`;
- assumed blockchain size hint: `10`;
- assumed chain-state size hint: `10`.

The September 11 Windows `v31.1.0` node test directly observed the mainnet listener on `8338` and successful outbound peer discovery. That runtime result reinforces the chain-parameter value and also exposes why the generated example configuration's inherited `8333` wording must not be treated as authoritative for current BC2 mainnet.

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

The `2016` miner-confirmation window is a deployment parameter. It must not be confused with the current post-activation difficulty-adjustment schedule.

## BitcoinII-specific v31 activations

Mainnet `v31.1.0` sets:

| Rule | Height/value |
|---|---|
| Data restrictions | `57750` |
| ShockWave | `57750` |
| Replay protection | `57750` |
| Replay-protection fork/domain id | `0x01324342` |

These three height-`57750` changes are independent feature paths even though they share an activation height.

See [Data restrictions](data-restrictions-v31.md), [ShockWave](shockwave-v31.md), and [Replay protection](replay-protection-v31.md).

## Proof-of-work parameters

| Parameter | Value |
|---|---|
| `powLimit` | `00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff` |
| Historical/inherited target timespan | `14 * 24 * 60 * 60` seconds |
| Target spacing | `10 * 60` seconds |
| Allow minimum-difficulty blocks | `false` |
| No retargeting | `false` |

The 14-day/2016-block values remain relevant to historical pre-ShockWave behavior and inherited helpers. Current mainnet difficulty at and after height `57750` is governed by ShockWave in `src/pow.cpp`.

## Chain work and assume-valid

These are release-specific snapshots and must always be labeled by source version.

For `v31.1.0`:

- `nMinimumChainWork = 0000000000000000000000000000000000000000000000959028194ff1139272`
- `defaultAssumeValid = 00000000000000067e82c9cebc8b58e70f0be31908598d3240a4ecbaa527682e`

The source comment associates the assume-valid hash with height `33000`.

These values are startup/synchronization aids, not a replacement for BitcoinII's accumulated-work chain-selection rule.

## DNS seed

Current `v31.1.0` mainnet source explicitly lists:

- `dnsseed.bitcoin-ii.org.`

Older MoreBC2 material recorded `bitcoinII.ddns.net.` from an earlier source version. Treat that older seed as historical unless re-established by current release-pinned/project-controlled evidence.

## Address encodings

| Encoding | Value |
|---|---|
| Base58 P2PKH prefix | `0` |
| Base58 P2SH prefix | `5` |
| Base58 secret-key prefix | `128` |
| Extended public key | `04 88 B2 1E` |
| Extended secret key | `04 88 AD E4` |
| Bech32 HRP | `bc` |

These Bitcoin-like encodings do **not** establish Bitcoin signing compatibility. From height `57750`, BC2 signing/verification paths use the BC2 replay-protection domain where applicable.

## Checkpoints

The current `v31.1.0` mainnet checkpoint table contains **23 entries** and extends through:

- height `57752`;
- hash `000000000000000013ceffe797280c57f75a5b9f1d9e70c3503584058c322576`.

Checkpoint tables are release-specific snapshots, not dynamic finality rules. See [Checkpoints](../../documentation/checkpoints.md).

## Runtime boundary

The September 11 Windows runtime record directly confirmed a bounded subset of chain-parameter consequences, including:

- chain `main`;
- runtime version `310100` / `/BitcoinII:31.1.0/`;
- protocol `70016`;
- P2P listener `8338`;
- successful outbound peer discovery;
- current mainnet header acquisition.

It did not independently runtime-trigger the height-`57750` replay/data-restriction/ShockWave activation transitions.

## Related pages

- [Network specifications](../../documentation/network-specifications.md)
- [Consensus overview](../../documentation/consensus-overview.md)
- [Checkpoints](../../documentation/checkpoints.md)
- [pow.cpp](pow-cpp.md)
- [ShockWave](shockwave-v31.md)
- [Replay protection](replay-protection-v31.md)
- [Data restrictions](data-restrictions-v31.md)
- [Windows v31 node/RPC validation](../../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Primary sources

- `v31.1.0/src/kernel/chainparams.cpp`
- `v31.1.0/src/consensus/params.h`
- `v31.1.0/src/pow.cpp`
- BitcoinII Core `v31.1.0` release

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` release-pinned chain parameters plus September 11 bounded Windows mainnet runtime evidence  
**Notes:** Current mainnet identity, activation values, proof-of-work parameters, address encodings, DNS seed, chain snapshots, and the 23-entry checkpoint table are synchronized. Non-mainnet parameter sets and controlled activation-boundary vectors remain separate work.
