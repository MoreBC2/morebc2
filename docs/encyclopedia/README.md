# Encyclopedia

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

The encyclopedia section contains short, cross-linked explanations of concepts used throughout MoreBC2. It sits between the root glossary and the deeper architecture / Source Atlas material:

- the root [Glossary](../../GLOSSARY.md) gives short general definitions;
- encyclopedia pages explain concepts and BitcoinII-specific implications;
- architecture pages explain system flows;
- Source Atlas pages trace implementation details into release-pinned source.

Current BitcoinII-specific claims in this section use BitcoinII Core `v31.1.0` as the baseline and defer to dated MoreBC2 runtime or service evidence where relevant.

## Current pages

- [Developer glossary](developer-glossary.md)
- [Confirmations](confirmations.md)
- [Reorganizations](reorganizations.md)
- [Proof-of-work](proof-of-work.md)
- [Difficulty adjustment](difficulty-adjustment.md)

Including this index, `docs/encyclopedia/` contains **6 Markdown pages**.

## Current evidence anchors

Useful current anchors include:

- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Architecture](../architecture/README.md)
- [Source Atlas](../developers/source-atlas/README.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Current BitcoinII concept boundaries

Several encyclopedia concepts now require explicit v31 framing:

- current mainnet difficulty uses **ShockWave per block from height `57750`**, not a 2016-block-only retarget schedule;
- ShockWave changes required work but **does not replace accumulated-chainwork selection**;
- a confirmation count measures burial depth in the active chain but is **not deterministic or cryptographic finality**;
- MoreBC2 currently uses **50 confirmations as a provisional normal-deposit baseline** because two independently queried BC2 venues explicitly use 50, not because BitcoinII consensus requires it;
- mainnet replay protection activates at height `57750` with fork/domain id `0x01324342`, so Bitcoin-like transaction/address structure alone does not prove signer compatibility;
- local zero-peer transaction submission is not evidence of public-network propagation.

## Evidence layers

Encyclopedia pages should distinguish:

- **general concept explanation** — educational definition;
- **release-pinned source evidence** — current implementation / consensus behavior;
- **bounded runtime evidence** — what was actually exercised in a dated environment;
- **public-service evidence** — time-sensitive explorer, exchange, pool, or API observations;
- **operational guidance** — risk policy that is not a consensus rule.

A source-backed consensus statement should not be rewritten as an operational recommendation, and a service setting should not be presented as protocol behavior.

## 2026-09-12 full section audit

All 6 encyclopedia pages were reviewed against the current v31, architecture, mining, exchange-confirmation, wallet/PSBT, and developer evidence.

The principal repairs were:

- replacing the old statement that BitcoinII confirmation guidance was unverified with the current evidence-backed provisional 50-confirmation exchange baseline;
- documenting chainwork as a separate and important settlement/reorg signal;
- replacing the old unreviewed reorganization page with the current v31 best-work / disconnect / reconnect model;
- strengthening proof-of-work and difficulty pages around ShockWave, candidate-time-dependent `nBits`, and the historical/current retarget boundary;
- updating the developer glossary for current v31 terms, especially chainwork, replay protection, ShockWave, PSBT/runtime evidence boundaries, and finality terminology;
- removing stale open items that were already resolved by later architecture and Source Atlas work.

## Rules

- Keep general concepts neutral and concise.
- Add BitcoinII-specific details only when they are source-backed or dated observations.
- Prefer release-pinned `v31.1.0` source for current protocol claims.
- Link implementation detail to Source Atlas instead of reproducing source-review pages here.
- Keep consensus, mempool policy, wallet behavior, service policy, and market/operator observations separate.
- Do not describe any finite confirmation count as absolute or cryptographic finality.
- Do not infer wallet, signer, miner, pool, or service compatibility from Bitcoin-like structure alone.
- Date public-service behavior and treat it as changeable.

## Related pages

- [Root glossary](../../GLOSSARY.md)
- [Developer glossary](developer-glossary.md)
- [Architecture](../architecture/README.md)
- [Source Atlas](../developers/source-atlas/README.md)
- [Documentation coverage](../documentation-coverage.md)
- [Known unknowns](../verification/known-unknowns.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` release-pinned source reviews, current MoreBC2 architecture/developer pages, September 2026 runtime records, and dated exchange-confirmation evidence  
**Notes:** The full encyclopedia section is current for the principal v31 concepts. Empirical BC2 reorganization-frequency statistics, controlled ShockWave vectors, and production settlement-risk calibration remain outside the present evidence.
