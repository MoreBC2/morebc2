# `src/hash.h`

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed structural  
**Last reviewed:** 2026-09-12

## Purpose

`src/hash.h` defines hashing helpers used throughout BitcoinII Core. For current MoreBC2 documentation it is an important source anchor for the double-SHA256 block-header hashing path.

## Current reviewed behavior

Release-pinned/current review establishes:

- `CHash256` implements the double-SHA256 construction used by Bitcoin-style 256-bit hashing helpers;
- `HashWriter::GetHash()` finalizes SHA-256, resets/writes the first digest, and finalizes SHA-256 again;
- `HashWriter::GetSHA256()` exposes a single-SHA256 result;
- `CBlockHeader::GetHash()` routes through `HashWriter::GetHash()`.

Accordingly, MoreBC2 uses **double-SHA256** (or SHA-256d where context makes that abbreviation clear) for BitcoinII block-header proof-of-work wording.

## v31 boundary

BitcoinII Core `v31.1.0` changes current mining behavior through **ShockWave difficulty calculation**, not by replacing the block-header hash function.

The distinction matters:

- hashing answers whether a candidate header hash satisfies its target;
- ShockWave determines the target/`nBits` required for the next candidate block from height `57750`;
- accumulated chain work determines best-chain selection among valid candidates.

Do not describe “SHA-256 compatibility” as proof that generic Bitcoin mining/template software is fully BC2-compatible. Candidate-time/required-work behavior must also be correct.

## Other hashing helpers

The file also contains single-SHA256 and SHA-256/RIPEMD-160-related helpers used elsewhere in Bitcoin-style key/script/data processing. This page does not attempt to enumerate every call site.

## Related pages

- [Block primitives](block-primitives.md)
- [pow.cpp](pow-cpp.md)
- [ShockWave v31](shockwave-v31.md)
- [Mining overview](../../mining/mining-overview.md)
- [Proof-of-work](../../encyclopedia/proof-of-work.md)

## Primary source

- BitcoinII Core `v31.1.0/src/hash.h`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed structural  
**Primary evidence:** BitcoinII Core `v31.1.0` hash and block-primitives paths  
**Notes:** Double-SHA256 block-header hashing is source-confirmed. This page does not claim a runtime benchmark, source-build reproduction, or blanket third-party miner compatibility.
