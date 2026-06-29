# BitcoinII Network Specifications

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-29

## Summary

This page records BitcoinII mainnet values that have been checked against current public source code.

Values should not be copied here from Discord, memory, explorer pages, or third-party listings unless they are clearly labeled and later verified against primary sources.

## Mainnet values checked from source

Source file checked: `src/kernel/chainparams.cpp`

### Chain type

- Mainnet chain type: `ChainType::MAIN`

### Subsidy and block timing

- Subsidy halving interval: `210000` blocks
- Target block spacing: `10 * 60` seconds, meaning 10 minutes
- Target retarget timespan: `14 * 24 * 60 * 60` seconds, meaning 14 days
- Miner confirmation window: `2016` blocks
- Rule-change activation threshold: `1815` blocks, noted in source as 90% of 2016

### Proof-of-work / difficulty flags

- `fPowAllowMinDifficultyBlocks = false`
- `fPowNoRetargeting = false`

### Network identity

- Message start bytes: `0x42 0x49 0x49 0x21`
- Default P2P port: `8338`

### Genesis block

- Genesis timestamp text: `BBC News 12/04/2024 French government collapses in no-confidence vote`
- Genesis time: `1734019071`
- Genesis nonce: `1597163478`
- Genesis bits: `0x1d00ffff`
- Genesis version: `1`
- Genesis reward: `50 * COIN`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Genesis merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`

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

Based on the checked source values, BitcoinII mainnet currently appears to use Bitcoin-like 10-minute block spacing, a 2016-block retarget window, and a 210,000-block subsidy halving interval.

This page does **not** claim that BitcoinII currently uses Dark Gravity Wave.

## Open items

These still need verification before the page can be marked Verified:

- Exact proof-of-work hash algorithm name from source.
- Whether wallet/RPC ports differ from P2P port and where those are defined.
- Current release version tied to these parameters.
- Current recommended exchange deposit confirmation count.
- Current recommended withdrawal confirmation count.
- Whether any later branch or release changes these values.

## Sources

- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp
- Public release page: https://github.com/BitcoinII-Dev/BitcoinII/releases

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes
**Notes:** This page records source-code values only. It should be reviewed by someone running the current BitcoinII Core release before being marked Verified.
