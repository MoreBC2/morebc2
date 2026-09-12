# Research

**Category:** Research  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

Research is where MoreBC2 explores technical questions that are useful to BitcoinII (BC2) without prematurely turning hypotheses, comparisons, or incomplete observations into documentation claims.

The section should sit between evidence collection and stable documentation:

- **Documentation** states current source-backed or otherwise verified behavior.
- **Architecture** explains current system flows.
- **Verification** records tests, observations, and unresolved evidence gaps.
- **Research** frames questions, comparisons, methodology, and analysis that are not yet mature enough to be treated as established project behavior.

Current protocol research should use BitcoinII Core `v31.1.0` as the implementation baseline unless a page is explicitly historical.

## Current pages

`docs/research/` currently contains **2 Markdown pages**:

- [Difficulty adjustment notes](difficulty-adjustment-notes.md)
- this section index.

The difficulty page is intentionally retained as Research even though the identity and activation of ShockWave are now source-confirmed. Its remaining purpose is empirical analysis: how the algorithm behaves under real or controlled network conditions, not whether current BitcoinII uses ShockWave.

## Current evidence anchors

Research involving current BC2 behavior should defer to the strongest relevant evidence rather than restating stale assumptions.

Useful anchors include:

- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Mining overview](../mining/mining-overview.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [`pow.cpp` Source Atlas](../developers/source-atlas/pow-cpp.md)
- [Fork-aware header synchronization](../developers/source-atlas/headers-sync-v31.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Windows v31.1.0 node/RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)

## Current research boundaries

Some questions that were research topics earlier in the project are no longer open questions.

Current `v31.1.0` source already establishes that:

- ShockWave activates on mainnet at height `57750`;
- post-activation mainnet difficulty is not a 2016-block-only retarget schedule;
- the normal rolling calculation uses 25 block-index entries / 24 completed intervals;
- a shorter six-interval response path also exists;
- candidate header time can affect required work;
- mining/template code recalculates `nBits` when candidate time changes;
- emergency stall recovery is part of the current implementation;
- best-chain selection remains based on accumulated chainwork;
- header synchronization carries branch-specific history so current difficulty rules can be evaluated on competing branches.

Those are documentation/source-review facts now, not speculative research conclusions.

The remaining research questions are empirical or comparative: how often paths activate, how strongly they affect live block timing, how the network responds to abrupt hashrate changes, how candidate-time behavior looks in controlled vectors, and how ShockWave compares with other algorithms without implying implementation equivalence.

## Research evidence model

A useful Research page should make clear which layer each statement belongs to:

- **source-confirmed fact** — release-pinned implementation behavior;
- **runtime observation** — something MoreBC2 directly exercised in a dated environment;
- **public-service observation** — time-sensitive data from an explorer, pool, exchange, or API;
- **derived analysis** — calculations performed from identified data and methodology;
- **hypothesis / open question** — a claim that has not yet been established.

Derived results should identify the input data, time range, calculation method, assumptions, and limitations well enough for another person to reproduce the result.

## Suitable research topics

Good candidates include:

- controlled ShockWave candidate-time / `nBits` vectors;
- live block-interval and difficulty-response studies across defined height windows;
- hashrate-estimate methodology comparisons across public services;
- exchange and wallet integration background where requirements remain provider-specific;
- mining-pool protocol compatibility studies;
- historical/current behavior comparisons across BitcoinII releases;
- reproducible comparisons between ShockWave and other difficulty algorithms that do not imply code equivalence;
- source-build and test-suite investigations that have not yet reached Verification-grade execution evidence.

## Rules

- Research is not a substitute for current Documentation.
- Do not leave already-resolved v31 facts phrased as open questions.
- Do not present a hypothesis, simulation, public dashboard value, or one-time observation as consensus behavior.
- Prefer release-pinned `v31.1.0` source for current implementation claims.
- Keep historical pre-`57750` difficulty behavior clearly separated from current mainnet behavior.
- Date public-service observations.
- State methodology for derived measurements.
- Keep accumulated chainwork separate from raw block count in security/reorg analysis.
- Do not infer miner, wallet, signer, pool, or service compatibility from Bitcoin-like structure alone.
- Do not use research pages to imply roadmap commitments or official BitcoinII positions.
- Move mature verified behavior into Documentation, Architecture, or Source Atlas; move test records into Verification.

## 2026-09-12 section audit

Both Research pages were reviewed against the completed v31 Documentation, Architecture, Mining, Encyclopedia, and Developers / Source Atlas audits.

The main repair was to reframe Research around **remaining empirical questions** instead of repeating implementation uncertainty already resolved by release-pinned source review. The section now explicitly separates source-confirmed ShockWave behavior from unexecuted controlled vectors and from future live-network analysis.

## Related pages

- [Documentation taxonomy](../../DOCUMENTATION_TAXONOMY.md)
- [Evidence scale](../../EVIDENCE_SCALE.md)
- [Source Atlas](../developers/source-atlas/README.md)
- [Encyclopedia](../encyclopedia/README.md)
- [Verification](../verification/README.md)
- [Known unknowns](../verification/known-unknowns.md)
- [Open questions](../verification/open-questions.md)

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Current MoreBC2 v31 documentation, architecture, mining, Source Atlas, and September 2026 verification records  
**Notes:** Section placement and current protocol boundaries are reviewed. Research conclusions remain partial by design until their individual empirical or comparative questions are answered with reproducible evidence.
