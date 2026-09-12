# MoreBC2 Docs

**Category:** Documentation index  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

This directory holds MoreBC2's public documentation and evidence records for BitcoinII (BC2).

Current-facing technical pages use **BitcoinII Core `v31.1.0`** as the release baseline. Historical `v29.1.0` and older records remain preserved with their original version/date rather than being rewritten as current evidence.

## Start here

For current BitcoinII behavior:

- [What is BitcoinII?](documentation/what-is-bitcoinii.md)
- [Network specifications](documentation/network-specifications.md)
- [Consensus overview](documentation/consensus-overview.md)
- [Node guide](nodes/node-guide.md)
- [Wallet guide](wallets/wallet-guide.md)
- [Mining overview](mining/mining-overview.md)
- [Current releases](releases/README.md)
- [Exchange integration package](exchange/integration-package.md)

For implementation/evidence depth:

- [Architecture](architecture/README.md)
- [Developers / Source Atlas](developers/README.md)
- [Verification evidence index](verification/verification-index.md)
- [Known unknowns](verification/known-unknowns.md)
- [Open questions](verification/open-questions.md)

## Current v31 anchors

The current audit sequence covers the major v31-specific boundaries:

- ShockWave per-block difficulty from mainnet height `57750`;
- replay protection from `57750` using fork/domain id `0x01324342`;
- consensus data restrictions from `57750`;
- fork-aware header synchronization;
- accumulated-chainwork best-chain selection;
- ShockWave-aware mining/template `nBits` recalculation when candidate time changes;
- source/runtime boundaries for wallet, PSBT, mempool, RPC, validation, mining, P2P, and external signing.

Current runtime evidence also includes bounded Windows v31 node/RPC testing and a separate isolated zero-peer regtest wallet/PSBT/mempool lifecycle.

## Section map

- [Documentation](documentation/README.md) — current source-backed BitcoinII behavior.
- [Architecture](architecture/README.md) — current conceptual flows and lifecycle maps.
- [Configuration](configuration/README.md) — current node/RPC/configuration behavior and defaults.
- [Nodes](nodes/README.md) — current Windows node/operator guidance.
- [Wallets](wallets/README.md) — Core wallet and third-party wallet evidence boundaries.
- [Mining](mining/README.md) — v31 mining behavior, pool/Stratum/payout evidence.
- [Developers](developers/README.md) — build/RPC/source-review material and the Source Atlas.
- [Releases](releases/README.md) — current release inventory, integrity, authentication limits.
- [API](api/README.md) — public REST/WebSocket/Electrum surfaces and evidence boundaries.
- [Infrastructure](infrastructure/README.md) — observed public service roles/status policy.
- [Compatibility](compatibility/README.md) — RPC/REST/Electrum/wallet/integration compatibility boundaries.
- [Ecosystem](ecosystem/README.md) — wallets, explorers, pools, exchanges, APIs, and resources.
- [Exchange](exchange/README.md) — service-provider integration and provisional settlement guidance.
- [Encyclopedia](encyclopedia/README.md) — concept explainers synchronized to current v31 evidence.
- [Research](research/README.md) — empirical/comparative questions not yet mature enough for documentation.
- [Discussion](discussion/README.md) — proposals/opinions, explicitly non-implementation.
- [History](history/README.md) — dated historical milestones and provenance.
- [News](news/README.md) — framework for dated factual updates.
- [Verification](verification/README.md) — evidence records, plans, current gaps, and test queues.

## Completed audit sequence — 2026-09-12

The major reader-facing sections above were audited in coordinated passes against the same `v31.1.0`, runtime, release, infrastructure, wallet, exchange, and deployment evidence.

A section marked **Reviewed / Partial** is not “unfinished” merely because it says Partial. Partial means the page accurately exposes remaining evidence gaps such as unexecuted runtime tests, third-party compatibility, or service freshness.

## Evidence rules

- Source review is not automatically runtime testing.
- A local zero-peer transaction submission is not public broadcast evidence.
- Public service reachability is point-in-time evidence, not an SLA.
- Similar public service behavior does not prove backend independence.
- Bitcoin-like address/script/API structure does not prove signer or wallet compatibility.
- Exchange confirmation counts are operational policy, not consensus finality.
- Passing site CI/deployment proves the documentation pipeline worked, not that every technical claim is universally verified.

## Current maintenance tail

The remaining repository work is mostly maintenance rather than broad section reconstruction:

- periodic live-service/exchange/release rechecks;
- targeted runtime tests from the Verification queue;
- stronger release authentication if upstream material becomes available;
- third-party wallet/signer qualification;
- root/site planning-document cleanup as project state evolves;
- independent technical review of consequential claims.

## Project-maintenance pages

- [Project status](../PROJECT_STATUS.md)
- [Documentation coverage](documentation-coverage.md)
- [Repository audit](AUDIT.md)
- [Owner review handoff](REVIEW_HANDOFF.md)
- [Legal/reuse posture](LEGAL_REUSE.md)
- [Third-party provenance audit](THIRD_PARTY_PROVENANCE_AUDIT.md)
- [Archived polish plan](POLISH_PLAN.md)

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Current audited section indexes, `v31.1.0` Source Atlas/Architecture work, September runtime/service/exchange records, and current deployment state  
**Notes:** This index is a navigation/currentness map. It does not independently reproduce the underlying technical tests.
