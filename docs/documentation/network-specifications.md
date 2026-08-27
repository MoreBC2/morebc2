# BitcoinII Network Specifications

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-08-27

## Summary

This page records BitcoinII mainnet values that have been checked against current public source code.

Values should not be copied here from Discord, memory, explorer pages, or third-party listings unless they are clearly labeled and later verified against primary sources.

This page is still **Needs Review** because some values are moving chain-data fields and because MoreBC2 has not compared every value against the current release branch. A separate dated local `v29.1.0` Windows/mainnet RPC test exists, but it is not proof of every network value or platform.

## Source files checked

Current observed `main` source files checked:

- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/consensus/amount.h`
- `src/protocol.h`
- `src/protocol.cpp`
- `src/net_processing.h`
- `src/net_processing.cpp`
- `src/rpc/net.cpp`
- `share/examples/bitcoinII.conf`

## Mainnet values checked from source

### Chain type

- Mainnet chain type: `ChainType::MAIN`

### Supply and units

- `COIN = 100000000`, meaning 1 BC2 is represented as 100,000,000 base units in source.
- `MAX_MONEY = 21000000 * COIN`, a consensus-critical money-range sanity check.

### Subsidy and block timing

- Subsidy halving interval: `210000` blocks
- Target block spacing: `10 * 60` seconds, meaning 10 minutes
- Target retarget timespan: `14 * 24 * 60 * 60` seconds, meaning 14 days
- Miner confirmation window: `2016` blocks
- Rule-change activation threshold: `1815` blocks, noted in source as 90% of 2016

### Activation heights visible in chain parameters

The mainnet chain parameters include these values on current observed `main`:

| Rule/deployment | Height or value |
|---|---|
| BIP34 height | `250` |
| BIP65 height | `260` |
| BIP66 height | `270` |
| CSV height | `280` |
| SegWit height | `290` |
| Taproot deployment bit | `2` |
| Taproot start time | `1734019071` |
| Taproot timeout | `18942120000` |
| Taproot minimum activation height | `300` |
| Minimum BIP9 warning height | `2306` |

These values are recorded from chain parameters only. MoreBC2 still needs a separate review of activation behavior and current live-chain status before explaining them in user-facing detail.

## Proof-of-work and difficulty behavior

`src/pow.cpp` shows Bitcoin-style retarget behavior:

- Difficulty only changes when `(pindexLast->nHeight + 1) % params.DifficultyAdjustmentInterval() == 0`.
- Non-adjustment blocks return the previous block's `nBits` on mainnet.
- Retargeting uses the actual timespan between the first and last block in the adjustment window.
- The adjustment step is bounded to one quarter or four times the target timespan.
- The new target is bounded by `powLimit`.
- `fPowAllowMinDifficultyBlocks = false` on mainnet.
- `fPowNoRetargeting = false` on mainnet.

This page does **not** claim that BitcoinII currently uses Dark Gravity Wave.

### Proof-of-work limit

- `powLimit = 00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff`

### Proof-of-work hash path

`CBlockHeader::GetHash()` returns `(HashWriter{} << *this).GetHash()`.

`HashWriter::GetHash()` finalizes SHA-256 once, resets, writes that first SHA-256 output, and finalizes SHA-256 again. The source comments describe this as double-SHA256.

Because of that, the source-backed wording for now is:

- Block header hashing path: double-SHA256 via `HashWriter::GetHash()`.

## Network identity

- Message start bytes: `0x42 0x49 0x49 0x21`
- Default P2P port: `8338`
- Mainnet RPC port shown by inherited/generated example configuration: `8332`
- Testnet RPC port from generated example config: `18332`
- Signet RPC port from generated example config: `38332`
- Regtest RPC port from generated example config: `18443`
- Prune-after height: `200000`
- Assumed blockchain size hint: `10`
- Assumed chain state size hint: `10`

The generated `8332` value is source-observed configuration material, not a universally verified BitcoinII runtime default. In a dated local Windows/mainnet test, BitcoinII Core `v29.1.0` was configured and observed on `127.0.0.1:8337`. MoreBC2 has not established whether `8337` is universal across platforms, configurations, or releases; verify the release-specific source and active node configuration before operational use. See [RPC configuration](../configuration/rpc-configuration.md) and the [2026-07-10 local node inspection](../verification/local-node-inspection-2026-07-10.md).

## P2P behavior now source-atlas linked

MoreBC2 now has first-pass source slices for network and peer behavior.

Current reviewed P2P anchors include:

- [P2P protocol primitives](../developers/source-atlas/protocol.md)
- [Network RPC](../developers/source-atlas/rpc-network.md)
- [Peer handshake](../developers/source-atlas/net-processing-handshake.md)
- [Address sharing](../developers/source-atlas/net-processing-address-relay.md)
- [Block and header sharing](../developers/source-atlas/net-processing-block-relay.md)
- [Transaction sharing](../developers/source-atlas/net-processing-transaction-relay.md)
- [Peer health and stale-tip checks](../developers/source-atlas/net-processing-peer-eviction.md)

These pages are source-observed first-pass reviews. They are not live-network tests, service guarantees, or final protocol specifications.

## Genesis block

- Genesis timestamp text: `BBC News 12/04/2024 French government collapses in no-confidence vote`
- Genesis time: `1734019071`
- Genesis nonce: `1597163478`
- Genesis bits: `0x1d00ffff`
- Genesis version: `1`
- Genesis reward: `50 * COIN`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Genesis merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`

## Chain work and assume-valid

The following are moving chain-data fields and must be labeled by source version:

| Field | Current observed `main` value | Notes |
|---|---|---|
| Minimum chain work | `0x0000000000000000000000000000000000000000000000959028194ff1139272` | Current observed `main`; compare against releases before reuse. |
| Default assume-valid hash | `0x00000000000000067e82c9cebc8b58e70f0be31908598d3240a4ecbaa527682e` | Source comment associates this with height `33000`. |

Older values from earlier source snapshots should not be mixed into current docs without version labels.

## DNS seeds

- `dnsseed.bitcoin-ii.org.`
- `bitcoinII.ddns.net.`

## Address prefixes

- Base58 public key address prefix: `0`
- Base58 script address prefix: `5`
- Base58 secret key prefix: `128`
- Extended public key prefix: `04 88 B2 1E`
- Extended secret key prefix: `04 88 AD E4`
- Bech32 human-readable part: `bc`

## Current interpretation

Based on the checked source values, BitcoinII mainnet currently appears to use Bitcoin-like 10-minute block spacing, a 2016-block retarget window, a 210,000-block subsidy halving interval, and double-SHA256 block header hashing.

The safest public wording remains:

```text
BitcoinII is a native blockchain coin with Bitcoin-style block timing and difficulty retargeting parameters observed in current source review.
```

Avoid stronger wording until current release, live-chain status, and maintainer-preferred terminology are confirmed.

## Open items

These still need verification before the page can be marked Verified:

- Complete comparison of these parameters against the current documented release, `v29.1.0`.
- Current recommended exchange deposit confirmation count.
- Current recommended withdrawal confirmation count.
- Whether any later branch or release changes these values.
- Whether the phrase `SHA-256d` or `double-SHA256` is preferred by the BitcoinII maintainers for public docs.
- Whether checkpoint data should remain separate from this page.
- Current live-chain activation state for listed soft-fork heights.
- Full send-loop behavior.
- Lower-level `src/net.cpp` connection management.
- Banman behavior.
- DNS seed and addrman caller paths.

## Sources

- Current observed `main` `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/kernel/chainparams.cpp
- Current observed `main` `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/pow.cpp
- Current observed `main` `src/primitives/block.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/primitives/block.cpp
- Current observed `main` `src/hash.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/hash.h
- Current observed `main` `src/consensus/amount.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/consensus/amount.h
- Current observed `main` `src/protocol.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/protocol.h
- Current observed `main` `src/protocol.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/protocol.cpp
- Current observed `main` `src/net_processing.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.h
- Current observed `main` `src/net_processing.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/net_processing.cpp
- Current observed `main` `src/rpc/net.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/rpc/net.cpp
- Current observed `main` `share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/share/examples/bitcoinII.conf
- Public release page: https://github.com/Bitcoin-II/BitcoinII-Core/releases

## Verification

**Status:** Needs Review
**Primary sources checked:** Partially
**Notes:** This page records source-code values and links first-pass network Source Atlas coverage. RPC wording was synchronized on 2026-08-27 with the dated local `v29.1.0` evidence while preserving unresolved cross-platform/default behavior. The page should still be reviewed against the current release branch and maintainer-preferred public terminology before being marked Verified.
