# Block primitives

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Source files

Pinned/current review scope:

- `v31.1.0/src/primitives/block.h`
- `v31.1.0/src/primitives/block.cpp`

## Purpose

These files define BitcoinII Core block-header and block data structures and the block-header hash call path.

## Current reviewed structure

`CBlockHeader` carries the familiar fields:

- `nVersion`
- `hashPrevBlock`
- `hashMerkleRoot`
- `nTime`
- `nBits`
- `nNonce`

`CBlock` extends the header structure with the block transaction vector and related block state/helpers.

`CBlockHeader::GetHash()` uses the `HashWriter` path documented in [`hash.h`](hash-h.md), yielding the double-SHA256 block-header hash used by BitcoinII proof of work.

## v31 boundary

The primitive header layout remains structurally Bitcoin-like in the reviewed `v31.1.0` source. Current BitcoinII-specific mining behavior is introduced in the logic that calculates and validates the header's required `nBits`, not by adding a different block-header field layout.

In particular:

- ShockWave determines required work from height `57750`;
- candidate `nTime` can affect required `nBits`;
- `CheckProofOfWork` verifies the resulting header hash/target relationship;
- fork-aware header sync validates alternate branches with sufficient ShockWave history.

Therefore a familiar Bitcoin-style header layout does not imply Bitcoin-style 2016-block-only difficulty behavior.

## Serialization boundary

This page is a structural source map. It does not attempt to reproduce every serialization template/operator or prove compatibility with arbitrary third-party Bitcoin block libraries.

Third-party tooling must also honor BC2 network identity, current difficulty rules, validation rules, and transaction/signature differences.

## Related pages

- [Hash helpers](hash-h.md)
- [pow.cpp](pow-cpp.md)
- [ShockWave v31](shockwave-v31.md)
- [Block acceptance](block-acceptance.md)
- [Network specifications](../../documentation/network-specifications.md)
- [Mining overview](../../mining/mining-overview.md)

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` block primitives and current v31 PoW/template reviews  
**Notes:** Header/block structure and hash call path are current. This page does not claim exhaustive serialization or third-party compatibility testing.
