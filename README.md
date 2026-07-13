# MoreBC2

Community documentation and resources for the BitcoinII (BC2) ecosystem.

MoreBC2 is not intended to replace the official BitcoinII website, repositories, releases, or developer communications. It exists to preserve, organize, and explain publicly verifiable information so that users, miners, developers, exchanges, and infrastructure providers can find what they need faster.

> MoreBC2 is not the source of truth. It is a map to the source of truth.

## Mission

Preserve, organize, and expand publicly verifiable knowledge about the BitcoinII ecosystem.

## Current status

This repository is in private foundation-building mode and is near invite-only review preparation.

The project has meaningful first-pass source-backed coverage across BitcoinII Core architecture, chain parameters, proof of work, validation, block storage, mempool behavior, wallet RPC groups, mining RPC, blockchain RPC, raw transaction RPC, and mempool/broadcast RPC.

It is still not ready for broad public launch because command examples, release artifacts, ecosystem listings, and some service-provider recommendations still need direct verification.

Start here if you are reviewing the project structure:

- [Project status](PROJECT_STATUS.md)
- [Docs index](docs/README.md)
- [API documentation](docs/api/README.md)
- [Infrastructure directory](docs/infrastructure/README.md)
- [Releases](docs/releases/README.md)
- [Compatibility](docs/compatibility/README.md)
- [Private review handoff](docs/REVIEW_HANDOFF.md)
- [Legal and reuse posture](docs/LEGAL_REUSE.md)
- [Repository audit](docs/AUDIT.md)
- [Documentation coverage](docs/documentation-coverage.md)
- [Documentation polish plan](docs/POLISH_PLAN.md)
- [Roadmap](ROADMAP.md)

## Private reviewer start flow

For a narrow private review, use this order:

1. [README](README.md)
2. [Docs index](docs/README.md)
3. [Project status](PROJECT_STATUS.md)
4. [Private review handoff](docs/REVIEW_HANDOFF.md)
5. [Legal and reuse posture](docs/LEGAL_REUSE.md)
6. [Documentation coverage](docs/documentation-coverage.md)
7. [Known unknowns](docs/verification/known-unknowns.md)
8. [Open questions backlog](docs/verification/open-questions.md)
9. One assigned review target

Reviewers should keep feedback narrow. Do not rewrite broad sections, mark pages Verified, add live ecosystem claims, or promote command examples unless the evidence and test records are present.

## Start reading

For a general reader:

- [Docs index](docs/README.md)
- [What is BitcoinII?](docs/documentation/what-is-bitcoinii.md)
- [Wallet guide](docs/wallets/wallet-guide.md)
- [Mining overview](docs/mining/mining-overview.md)

For a technical reviewer:

- [Architecture](docs/architecture/README.md)
- [Developer reading order](docs/developers/reading-order.md)
- [Repository map](docs/developers/repository-map.md)
- [Source tree guide](docs/developers/source-tree.md)
- [Source Atlas](docs/developers/source-atlas/README.md)
- [RPC overview](docs/developers/rpc-overview.md)
- [API documentation](docs/api/README.md)
- [Infrastructure directory](docs/infrastructure/README.md)
- [Releases](docs/releases/README.md)
- [Compatibility](docs/compatibility/README.md)
- [Verification router](docs/verification/README.md)
- [Verification evidence index](docs/verification/verification-index.md)

## Current source-backed highlights

MoreBC2 currently has first-pass source review for:

- Mainnet chain parameters and genesis data.
- Proof-of-work and Bitcoin-style difficulty retargeting.
- Transaction consensus helper files.
- Script engine behavior.
- Block validation, block lifecycle, and reorg paths.
- Mempool acceptance and mempool storage.
- Block storage, pruning, reindex, and import paths.
- Candidate block-template assembly.
- Mining, blockchain, raw transaction, mempool/broadcast, and wallet RPC groups.
- Wallet startup, address, backup/import, spend/PSBT, encryption, balance, and transaction-history RPC behavior.

All of this remains Draft/Partial unless the relevant page says it is Verified.

## Important caution

Source-reviewed does not always mean locally tested.

Many pages describe behavior observed in BitcoinII Core source files. Command examples should not be treated as verified instructions unless the page explicitly says the command was run against a local BitcoinII Core node.

Wallet-moving, private-key, passphrase, broadcast, and import/export commands should be treated especially carefully.

## Contributor and editorial docs

- [Founding principles](FOUNDING_PRINCIPLES.md)
- [Documentation philosophy](DOCUMENTATION_PHILOSOPHY.md)
- [Contributing guide](CONTRIBUTING.md)
- [Editorial style guide](STYLE_GUIDE.md)
- [Style conventions](STYLE_CONVENTIONS.md)
- [Writing checklist](WRITING_CHECKLIST.md)
- [Evidence scale](EVIDENCE_SCALE.md)
- [Source registry](SOURCE_REGISTRY.md)
- [Documentation taxonomy](DOCUMENTATION_TAXONOMY.md)
- [Glossary](GLOSSARY.md)
- [Governance](GOVERNANCE.md)

## Content model

MoreBC2 separates information into clearly labeled categories:

- **Documentation** — how BitcoinII works today, based on current source code, releases, and official project resources.
- **Architecture** — source-backed conceptual explanations of how BitcoinII Core components and flows fit together.
- **Developers** — Source Atlas, build notes, RPC notes, and developer-focused resources.
- **API** — evidence-linked REST, WebSocket, Electrum, public-endpoint, and read-only example summaries.
- **Infrastructure** — observed public service directory and status wording policy.
- **Releases** — evidence-linked release asset, source archive, authentication-gap, and roadmap summaries.
- **Compatibility** — evidence-linked RPC, REST, Electrum, wallet, mempool.space, and integration-breakpoint summaries.
- **News** — factual updates about things that happened.
- **Research** — technical explainers, comparisons, and analysis that may be relevant to BitcoinII but are not necessarily implemented.
- **Discussion** — community ideas, proposals, and opinions.
- **History** — past events, milestones, and archived context.
- **Ecosystem** — wallets, explorers, exchanges, pools, tools, and community resources, listed only after direct checking.
- **Verification** — open questions, known unknowns, and claims that need checking.

## Core editorial rule

Document reality. Explore possibilities. Clearly separate the two.

For example, if a difficulty adjustment algorithm such as Dark Gravity Wave is discussed by community members but is not implemented in BitcoinII, it belongs in Research or Discussion, not Documentation.

## Repository structure

```text
morebc2/
├── docs/
│   ├── architecture/
│   ├── documentation/
│   ├── developers/
│   ├── configuration/
│   ├── encyclopedia/
│   ├── ecosystem/
│   ├── exchange/
│   ├── verification/
│   ├── news/
│   ├── research/
│   ├── discussion/
│   ├── history/
│   ├── mining/
│   ├── wallets/
│   ├── nodes/
│   └── site/
├── templates/
├── assets/
├── branding/
├── .github/
└── README.md
```

## Launch readiness

MoreBC2 should stay private while the final review-prep pass is completed.

Invite-only review should come before public launch.

Public launch should wait until:

- Top-level navigation is polished.
- Known unknowns are centralized.
- License and contribution workflow are settled.
- Release verification has been checked against actual releases.
- Ecosystem claims are checked against current direct sources.
- At least one outside reviewer has checked core technical claims.

## Project phrase

**Preserving the knowledge. Strengthening the ecosystem.**
