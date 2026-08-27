# `src/hash.h`

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-30

## Purpose

`hash.h` defines hashing helpers used by BitcoinII Core.

For MoreBC2, this file is currently important because it verifies the double-SHA256 hashing path used through `HashWriter::GetHash()`.

## Why it matters

This file helps verify:

- The double-SHA256 helper behavior.
- The SHA-256 + RIPEMD-160 helper behavior.
- The `HashWriter` behavior used by block header hashing.

## Behavior already documented from this file

MoreBC2 currently cites this file for:

- `CHash256` being described in comments as Bitcoin's 256-bit hash, double SHA-256.
- `HashWriter::GetHash()` finalizing SHA-256 once, resetting, writing the first result, and finalizing SHA-256 again.
- `HashWriter::GetSHA256()` producing a single SHA-256 hash.

## Related MoreBC2 pages

- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Mining overview](../../mining/mining-overview.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)
- [Block primitives](block-primitives.md)

## Open questions

- Confirm maintainer-preferred public wording: `double-SHA256`, `SHA-256d`, or another phrase.
- Confirm whether any BitcoinII-specific hashing changes exist elsewhere.
- Confirm whether `v29.1.0` differs from current `main` for this file before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/hash.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/hash.h

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes
**Notes:** Hashing helper behavior has been checked from source, but this page should be reviewed against `v29.1.0` and current `main` before being marked Verified.
