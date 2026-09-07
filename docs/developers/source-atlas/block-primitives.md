# Block primitives

**Category:** Documentation
**Status:** Needs Review
**Last reviewed:** 2026-06-30

## Source files

- `src/primitives/block.h`
- `src/primitives/block.cpp`

## Purpose

The block primitive files define BitcoinII Core block and block-header data structures and related methods.

## Why they matter

These files help verify:

- Block header fields.
- Block serialization shape.
- Block header hashing call path.
- Block string formatting.

## Behavior already documented from these files

MoreBC2 currently cites these files for:

- `CBlockHeader` fields:
  - `nVersion`
  - `hashPrevBlock`
  - `hashMerkleRoot`
  - `nTime`
  - `nBits`
  - `nNonce`
- `CBlockHeader::GetHash()` calling `HashWriter::GetHash()`.
- `CBlock` extending `CBlockHeader` and including transactions.

## Related MoreBC2 pages

- [Consensus overview](../../documentation/consensus-overview.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)
- [Hash helpers](hash-h.md)

## Open questions

- Confirm whether any BitcoinII-specific changes exist in block primitives beyond naming/header changes.
- Confirm whether related serialization behavior should be documented for developers.
- Confirm whether the `v31.1.0` release baseline differs from subsequent `main` changes for these files before upgrading status.

## Sources

The mutable current-upstream `main` links below were re-observed on 2026-08-27 and are intentionally retained to track upstream state. They are not release-pinned evidence.

- Current observed `main` `src/primitives/block.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/primitives/block.h
- Current observed `main` `src/primitives/block.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/primitives/block.cpp

## Verification

**Status:** Needs Review
**Primary sources checked:** Yes
**Notes:** Block structure and hash call path have been checked from source, but this page should be reviewed against the `v31.1.0` release baseline and subsequent `main` changes before being marked Verified.
