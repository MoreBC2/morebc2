# Release source comparison notes

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page records MoreBC2's first comparison between the latest observed BitcoinII Core release tag and the current `main` branch.

It is not a full release verification record. It does not verify release binaries, release assets, checksum files, or signatures.

## Compared refs

Repository checked:

- `Bitcoin-II/BitcoinII-Core`

Refs compared:

- Base: `v29.1.0`
- Head: `main`

Observed result:

- `main` is ahead of `v29.1.0` by 15 commits.
- `main` is behind `v29.1.0` by 0 commits.
- The merge-base commit is `3f2a352467750425ec28abe3505a5db5bbc5fa35`, matching the observed `v29.1.0` release commit.

Files changed after `v29.1.0` in the comparison:

- `.github/workflows/ci.yml`
- `.github/workflows/macos-arm64-v29-dmg.yml`
- `README.md`
- `ci/test/03_test_script.sh`
- `src/kernel/chainparams.cpp`
- `test/functional/test_framework/blocktools.py`

## Why this matters

MoreBC2 has reviewed many source files from `main`.

If public release users run `v29.1.0`, MoreBC2 should avoid silently treating post-release `main` changes as release behavior.

The most important finding from this first comparison is that `src/kernel/chainparams.cpp` changed after the release tag. That means release-facing network/specification pages need to identify whether a value came from the current release tag or from `main`.

## `v29.1.0` chain parameter spot check

A first spot check of `src/kernel/chainparams.cpp` at `v29.1.0` confirmed these mainnet values:

| Field | `v29.1.0` observed value |
|---|---|
| Chain type | `MAIN` |
| Subsidy halving interval | `210000` |
| BIP34 height | `250` |
| BIP65 height | `260` |
| BIP66 height | `270` |
| CSV height | `280` |
| SegWit height | `290` |
| Minimum BIP9 warning height | `2306` |
| PoW target timespan | `14 * 24 * 60 * 60` |
| PoW target spacing | `10 * 60` |
| Mainnet min-difficulty blocks | `false` |
| Mainnet no-retargeting | `false` |
| Rule-change activation threshold | `1815` |
| Miner confirmation window | `2016` |
| Taproot bit | `2` |
| Taproot start time | `1734019071` |
| Taproot timeout | `18942120000` |
| Taproot minimum activation height | `300` |
| Message start | `0x42 0x49 0x49 0x21` |
| Default P2P port | `8338` |
| Prune-after height | `200000` |
| Genesis time | `1734019071` |
| Genesis nonce | `1597163478` |
| Genesis bits | `0x1d00ffff` |
| Genesis version | `1` |
| Genesis reward | `50 * COIN` |
| Genesis hash | `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb` |
| Genesis merkle root | `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49` |
| DNS seeds | `dnsseed.bitcoin-ii.org.`, `bitcoinII.ddns.net.` |
| Base58 pubkey prefix | `0` |
| Base58 script prefix | `5` |
| Secret key prefix | `128` |
| Extended public key prefix | `04 88 B2 1E` |
| Extended secret key prefix | `04 88 AD E4` |
| Bech32 HRP | `bc` |

## `v29.1.0` PoW spot check

A first spot check of `src/pow.cpp` at `v29.1.0` confirmed:

- Difficulty changes only at the difficulty-adjustment interval.
- Non-adjustment heights return the previous block's bits on mainnet.
- Adjustment uses the first block time from the interval and the last block time.
- Actual timespan is bounded to one quarter through four times the target timespan.
- The new target is bounded by the PoW limit.
- Mainnet settings from chain parameters make min-difficulty exceptions false and no-retargeting false.

This supports the existing MoreBC2 statement that BitcoinII mainnet uses Bitcoin-style 2016-block retargeting unless future source review proves a different release behavior.

## Release-vs-main caution

The following values should be treated carefully because `src/kernel/chainparams.cpp` changed after `v29.1.0`:

- Checkpoint list.
- Assume-valid hash/comment.
- Minimum chain work.
- AssumeUTXO data.
- Chain transaction statistics.
- Any source-atlas notes that quote these moving chain-data fields.

Static chain identity values such as message start, port, genesis hash, genesis merkle root, address prefixes, bech32 HRP, and PoW timing were spot-checked at `v29.1.0`, but they should still be reviewed if a newer release becomes the target.

## What was not checked

This pass did not check:

- Release binary assets.
- SHA256 hashes of downloaded artifacts.
- Checksum manifests.
- Detached signature files.
- Release signing keys.
- Tag signature status beyond connector-observed ref metadata.
- Full source diff content after `v29.1.0`.
- Whether a newer release exists after this review date.

## Next steps

- Fetch or otherwise record the complete `v29.1.0` asset list.
- Check whether checksum manifests exist for `v29.1.0`.
- Check whether those manifests are signed.
- Identify release keys or maintainer-approved verification steps.
- Decide whether network specification pages should quote release-tag values, `main` values, or both.
- Add a table to relevant Source Atlas pages noting whether a value is from `main`, `v29.1.0`, or both.

## Sources

- `Bitcoin-II/BitcoinII-Core` comparison: `v29.1.0...main`
- `src/kernel/chainparams.cpp` at `v29.1.0`
- `src/kernel/chainparams.cpp` at `main`
- `src/pow.cpp` at `v29.1.0`
- [BitcoinII releases](../documentation/releases.md)
- [Release verification guide](../developers/release-verification.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page records source-ref comparison and selected file spot checks only. It does not verify release artifacts.
