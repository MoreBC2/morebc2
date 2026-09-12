# Proof-of-work

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

Proof of work is the consensus mechanism BitcoinII (BC2) uses to select valid blocks and measure accumulated work across chain branches.

Miners search for a block-header hash that satisfies the target encoded in the header's `nBits` field. BitcoinII Core `v31.1.0` uses double-SHA256 block-header hashing and targets 10-minute blocks.

Current mainnet difficulty is governed by **ShockWave per block from height `57750`**.

## Block-header proof of work

A BitcoinII block header includes fields such as:

- version;
- previous-block hash;
- merkle root;
- timestamp (`nTime`);
- compact target (`nBits`);
- nonce.

The serialized header is hashed through the Bitcoin-style double-SHA256 path. A valid proof-of-work hash must be less than or equal to the target represented by `nBits`.

Current source review traces the hashing path through the block/hash primitives and `HashWriter::GetHash()`.

## Target and difficulty

The **target** is the numeric threshold the block hash must satisfy.

Difficulty is a human-facing way to describe how restrictive that target is:

- lower target -> more expected hashing work -> higher difficulty;
- higher target -> less expected hashing work -> lower difficulty.

`CheckProofOfWork()` validates that the compact target is structurally valid, does not exceed `powLimit`, and is actually satisfied by the candidate hash.

Reviewed rejection cases include negative, zero, overflowed, over-limit, and insufficient-work targets.

## Current BitcoinII difficulty behavior

BitcoinII Core `v31.1.0` activates ShockWave at mainnet height `57750`.

After activation:

- the next required target is recalculated per block;
- recent timing/target history influences the result;
- candidate header time can matter in stalled-chain recovery;
- mining/template code must obtain the correct current `nBits` through the production next-work path.

Before activation, historical chain validation uses the inherited Bitcoin-style retarget path.

See [Difficulty adjustment](difficulty-adjustment.md) and [ShockWave v31](../developers/source-atlas/shockwave-v31.md).

## Candidate-time implication for miners

Current v31 mining code recalculates required work when candidate time changes.

That means a miner, pool, proxy, or template implementation that merely understands SHA-256d or Bitcoin-style headers is not automatically BC2-compatible. If it rolls `nTime` but retains stale `nBits`, it can construct an invalid post-activation candidate.

This is a protocol-compatibility issue, not merely a pool policy issue.

See [Mining overview](../mining/mining-overview.md).

## Chainwork

Each valid block contributes work according to its proof-of-work target. A chain's cumulative work is represented by accumulated **chainwork**.

BitcoinII best-chain selection uses accumulated work among valid usable candidates, not block count alone.

This distinction is especially important under per-block difficulty adjustment: two branches with the same number of blocks can represent different total work.

## Proof of work and reorganizations

A competing branch can replace the active branch if it is valid, usable, and becomes the greater-work candidate according to chain-selection rules.

ShockWave changes how much work individual post-activation blocks require, but it does not introduce deterministic finality or eliminate reorganizations.

A confirmed transaction can therefore later become unconfirmed if its containing block is disconnected during a reorganization.

See [Reorganizations](reorganizations.md) and [Confirmations](confirmations.md).

## Proof of work versus confirmation policy

BitcoinII consensus does not define a mandatory exchange confirmation count.

MoreBC2 currently uses **50 confirmations as a provisional normal-deposit baseline** because two independently queried BC2 venues explicitly use 50. That is operational risk guidance, not part of proof-of-work consensus.

Services should consider chainwork and network health in addition to raw confirmation count for higher-risk deposits.

## Mining pools and share difficulty

Pool **share difficulty** is an accounting/worker-management threshold chosen by the pool and should not be confused with the network proof-of-work target.

A miner can submit many pool shares that are useful for accounting without any of them satisfying the actual BC2 network target required to produce a valid block.

Likewise, a published Stratum endpoint or payout mode does not prove full BC2 mining compatibility. Current post-activation template handling must preserve BitcoinII's candidate-time / `nBits` rules.

## Current runtime evidence

MoreBC2's September 2026 evidence includes:

- a working v31 Windows mainnet node with real outbound peers and advancing synchronization;
- isolated regtest block generation through `generatetoaddress` to fund a disposable PSBT workflow;
- source review of current ShockWave and mining/template behavior.

What MoreBC2 has **not** yet independently reproduced includes:

- controlled ShockWave target vectors;
- post-activation candidate-time / `nBits` mutation tests;
- `getblocktemplate` runtime qualification;
- `submitblock` / `submitheader` runtime qualification;
- live BC2 pool Stratum share submission and block attribution.

## Historical note

Before ShockWave activation, BitcoinII used the inherited Bitcoin-style 2016-block retarget path with a 10-minute target spacing and 14-day target timespan.

Those historical parameters remain relevant to earlier chain history and inherited helpers, but they are not the current post-`57750` mainnet difficulty schedule.

## Related pages

- [Difficulty adjustment](difficulty-adjustment.md)
- [Confirmations](confirmations.md)
- [Reorganizations](reorganizations.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Mining overview](../mining/mining-overview.md)
- [`src/pow.cpp` Source Atlas](../developers/source-atlas/pow-cpp.md)
- [Block-template assembly](../developers/source-atlas/miner.md)

## Sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/pow.cpp`
- `src/pow.h`
- `src/kernel/chainparams.cpp`
- `src/primitives/block.cpp`
- `src/hash.h`
- `src/node/miner.cpp`
- validation / chain-selection paths documented in MoreBC2 Source Atlas

Canonical release/tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 proof-of-work, ShockWave, block/hash primitive, miner/template, and chain-selection reviews plus bounded September 2026 runtime evidence  
**Notes:** Current PoW, chainwork, ShockWave, and mining-template boundaries are source-backed. Controlled post-activation difficulty vectors and live pool/template qualification remain open.
