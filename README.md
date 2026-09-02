# MoreBC2

**Status:** Needs Review

Community documentation and resources for the BitcoinII (BC2) ecosystem.

MoreBC2 is not intended to replace the official BitcoinII website, repositories, releases, or developer communications. It exists to preserve, organize, and explain publicly verifiable information so that users, miners, developers, exchanges, and infrastructure providers can find what they need faster.

> MoreBC2 is not the source of truth. It is a map to the source of truth.

## Mission

Preserve, organize, and expand publicly verifiable knowledge about the BitcoinII ecosystem.

## Current BitcoinII baseline

Current-facing technical documentation is being maintained against **BitcoinII Core `v31.1.0`**, published on 2026-08-29.

Key current source-backed changes represented in MoreBC2 include:

- ShockWave per-block difficulty adjustment from mainnet height `57750`;
- consensus-level data restrictions from height `57750`;
- BC2 replay protection from height `57750` with fork ID `0x01324342`;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT changes identified by the `v31.1.0` release.

Older `v29.1.0` local tests and verification records remain preserved as **historical, version-scoped evidence**. They are not silently relabeled as current-release tests.

## Current project status

The project has substantial source-backed coverage across BitcoinII Core architecture, chain parameters, proof of work, validation, block storage, mempool behavior, wallet RPC groups, mining RPC, blockchain RPC, raw transaction RPC, and service integration.

Some operational evidence remains version- or date-specific. Sensitive, unsupported, account-gated, wallet-moving, release-authentication, and long-term service-reliability claims remain explicitly bounded.

Start here:

- [Project status](PROJECT_STATUS.md)
- [Docs index](docs/README.md)
- [What is BitcoinII?](docs/documentation/what-is-bitcoinii.md)
- [Network specifications](docs/documentation/network-specifications.md)
- [Consensus overview](docs/documentation/consensus-overview.md)
- [Releases](docs/releases/README.md)
- [Mining overview](docs/mining/mining-overview.md)
- [Exchange integration package](docs/exchange/integration-package.md)
- [Verification evidence index](docs/verification/verification-index.md)
- [Known unknowns](docs/verification/known-unknowns.md)

## Current source-backed highlights

MoreBC2 currently documents:

- Mainnet chain identity and genesis data.
- 10-minute target block spacing.
- Double-SHA256 block-header hashing.
- ShockWave per-block difficulty adjustment after height `57750`.
- Historical pre-ShockWave Bitcoin-style retarget behavior.
- v31 replay-protection and data-restriction activation anchors.
- Transaction consensus helper files and script-engine behavior.
- Block validation, lifecycle, chain selection, and reorganization paths.
- Mempool acceptance and storage.
- Candidate block-template assembly and mining RPC surfaces.
- Wallet, blockchain, raw-transaction, mempool/broadcast, and network RPC groups.
- Exchange/operator integration boundaries.

All coverage remains Draft/Partial unless the relevant page says otherwise.

## Important caution

Source-reviewed does not always mean locally tested.

Many pages describe behavior observed in BitcoinII Core source. Command examples should not be treated as verified instructions unless the page explicitly says the command was run against a specific BitcoinII Core version and environment.

In particular, existing dated `v29.1.0` Windows/node/RPC records are historical evidence. Current `v31.1.0` runtime coverage should be added through new test records rather than rewriting those historical files.

## Documentation model

MoreBC2 separates information into clearly labeled categories:

- **Documentation** — how BitcoinII works today, based on current source code, releases, and official project resources.
- **Architecture** — source-backed conceptual explanations of BitcoinII Core components and flows.
- **Developers** — Source Atlas, build notes, RPC notes, and developer-focused resources.
- **API / Infrastructure** — public endpoint and service observations with evidence boundaries.
- **Releases** — current release metadata plus version-scoped historical verification evidence.
- **Compatibility** — integration assumptions and known breakpoints.
- **Exchange** — service-provider integration documentation.
- **Research / Discussion** — analysis and ideas clearly separated from implemented behavior.
- **History** — past events and archived context.
- **Ecosystem** — wallets, explorers, exchanges, pools, tools, and community resources.
- **Verification** — open questions, known unknowns, dated evidence, and claims needing checks.

## Core editorial rule

Document reality. Explore possibilities. Clearly separate the two.

Current example: BitcoinII now implements **ShockWave**. Historical MoreBC2 language saying current mainnet uses only Bitcoin-style 2016-block retargeting is obsolete and should remain only where it is explicitly describing pre-activation history or a dated older-source review.

## Repository

The canonical private repository is `MoreBC2/morebc2` in the MoreBC2 GitHub organization.

## Project phrase

**Preserving the knowledge. Strengthening the ecosystem.**
