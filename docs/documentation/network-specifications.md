# BitcoinII Network Specifications

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-29

## Summary

This page records BitcoinII mainnet values that have been checked against current public source code.

Values should not be copied here from Discord, memory, explorer pages, or third-party listings unless they are clearly labeled and later verified against primary sources.

## Mainnet values checked from source

Source files checked:

- `src/kernel/chainparams.cpp`
- `src/pow.cpp`
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/consensus/amount.h`
- `share/examples/bitcoinII.conf`

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

The mainnet chain parameters include these heights:

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
| Minimum BIP9 warning height | `292` |

These values are recorded from chain parameters only. MoreBC2 still needs a separate review of activation behavior and current live-chain status before explaining them in user-facing detail.

### Proof-of-work and difficulty behavior

`src/pow.cpp` shows Bitcoin-style retarget behavior:

- Difficulty only changes when `(pindexLast->nHeight + 1) % params.DifficultyAdjustmentInterval() == 0`.
- Non-adjustment blocks return the previous block's `nBits` on mainnet.
- Retargeting uses the actual timespan between the first and last block in the adjustment window.
- The adjustment step is bounded to one quarter or four times the target timespan.
- `fPowAllowMinDifficultyBlocks = false` on mainnet.
- `fPowNoRetargeting = false` on mainnet.

This page does **not** claim that BitcoinII currently uses Dark Gravity Wave.

### Proof-of-work hash path

`CBlockHeader::GetHash()` returns `(HashWriter{} << *this).GetHash()`.

`HashWriter::GetHash()` finalizes SHA-256 once, resets, writes that first SHA-256 output, and finalizes SHA-256 again. The source comments describe this as double-SHA256.

Because of that, the verified wording for now is:

- Block header hashing path: double-SHA256 via `HashWriter::GetHash()`.

### Network identity

- Message start bytes: `0x42 0x49 0x49 0x21`
- Default P2P port: `8338`
- Default RPC port from generated example config: `8332`
- Testnet RPC port from generated example config: `18332`
- Signet RPC port from generated example config: `38332`
- Regtest RPC port from generated example config: `18443`
- Prune-after height: `200000`
- Assumed blockchain size hint: `10`
- Assumed chain state size hint: `10`

### Genesis block

- Genesis timestamp text: `BBC News 12/04/2024 French government collapses in no-confidence vote`
- Genesis time: `1734019071`
- Genesis nonce: `1597163478`
- Genesis bits: `0x1d00ffff`
- Genesis version: `1`
- Genesis reward: `50 * COIN`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Genesis merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`

### Chain work and assume-valid

- Minimum chain work: `0x000000000000000000000000000000000000000000000000000001aa01aa01aa`
- Default assume-valid hash: `0x00000000dc956ee0d18f0e8f401c4dc3f248d00ca1c3f8ea0d60c6842b022390`
- Source comment associates the assume-valid hash with height `425`.

### DNS seeds

- `dnsseed.bitcoin-ii.org.`
- `bitcoinII.ddns.net.`

### Address prefixes

- Base58 public key address prefix: `0`
- Base58 script address prefix: `5`
- Base58 secret key prefix: `128`
- Extended public key prefix: `04 88 B2 1E`
- Extended secret key prefix: `04 88 AD E4`
- Bech32 human-readable part: `bc`

## Current interpretation

Based on the checked source values, BitcoinII mainnet currently appears to use Bitcoin-like 10-minute block spacing, a 2016-block retarget window, a 210,000-block subsidy halving interval, and double-SHA256 block header hashing.

## Open items

These still need verification before the page can be marked Verified:

- Current release version tied to these parameters.
- Current recommended exchange deposit confirmation count.
- Current recommended withdrawal confirmation count.
- Whether any later branch or release changes these values.
- Whether the phrase `SHA-256d` or `double-SHA256` is preferred by the BitcoinII maintainers for public docs.
- Whether checkpoint data should be documented on a separate page.
- Current live-chain activation state for listed soft-fork heights.

## Sources

- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp
- `src/primitives/block.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/primitives/block.cpp
- `src/hash.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/hash.h
- `src/consensus/amount.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/consensus/amount.h
- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf
- Public release page: https://github.com/BitcoinII-Dev/BitcoinII/releases

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes
**Notes:** This page records source-code values only. It should be reviewed by someone running the current BitcoinII Core release before being marked Verified.
