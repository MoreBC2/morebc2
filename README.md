# MoreBC2

**Status:** Public-release readiness review; owner approval required

MoreBC2 is independently maintained, source-backed documentation for the BitcoinII (BC2) ecosystem. It helps users, node operators, miners, developers, exchanges, and infrastructure providers find technical context and the evidence behind it.

MoreBC2 is **not** the official BitcoinII website, reference implementation, release channel, or source of truth. When this repository and a canonical BitcoinII source disagree, treat the difference as unresolved until it is investigated.

> MoreBC2 is not the source of truth. It is a map to the source of truth.

## Current BitcoinII baseline

Current-facing technical documentation targets **BitcoinII Core `v31.1.0`**, published on 2026-08-29.

The documented mainnet activation at height `57750` includes:

- ShockWave per-block difficulty adjustment;
- replay protection;
- consensus-level data restrictions; and
- fork-aware header-synchronization-related behavior.

The detailed implementation pages remain conservatively labeled where source review or runtime coverage is incomplete. In particular, source review does not by itself establish live-network or runtime behavior.

## Evidence boundaries

MoreBC2 distinguishes source review, direct observation, local testing, historical evidence, maintainer statements, and unresolved claims.

- Current `v31.1.0` source and release metadata support the present documentation baseline.
- Dated `v29.1.0` Windows, node, RPC, peer-discovery, and release-integrity records are intentionally preserved as **historical, version-scoped evidence**.
- Those `v29.1.0` records are not current runtime verification and must not be globally rewritten as `v31.1.0` tests.
- Current `v31.1.0` runtime coverage, independent release authentication, confirmation policy, and several ecosystem claims remain incomplete.

See the [verification evidence index](docs/verification/verification-index.md), [known unknowns](docs/verification/known-unknowns.md), and [v31 currentness audit](docs/verification/v31-currentness-audit-2026-09-02.md).

## Start here

- [What is BitcoinII?](docs/documentation/what-is-bitcoinii.md)
- [Project status](PROJECT_STATUS.md)
- [Documentation index](docs/README.md)
- [Network specifications](docs/documentation/network-specifications.md)
- [Consensus overview](docs/documentation/consensus-overview.md)
- [Node guide](docs/nodes/node-guide.md)
- [Mining overview](docs/mining/mining-overview.md)
- [Release evidence](docs/releases/README.md)
- [Exchange integration](docs/exchange/integration-package.md)
- [Roadmap](ROADMAP.md)

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Keep claims tied to evidence, preserve uncertainty labels, and never promote Draft, Partial, Needs Review, or Source Reviewed material to Verified without the required record.

The repository currently has **no `LICENSE` file**. The owner must choose and add an appropriate license before public release; do not assume permission to reuse repository content in the meantime. See [legal and reuse posture](docs/LEGAL_REUSE.md).

## Site and tooling validation

The documentation site is generated with Astro and Starlight. From a clean checkout with Node.js 22.12 or newer:

```sh
npm ci
npm run check
npm run build
npm run check:windows-node-docs
```

`npm run check` prepares generated site content, runs Astro validation, and runs the site-adapter tests. `npm run build` also checks the rendered site output. The Windows-node documentation check protects the exact, version-scoped historical command records.

The current site configuration remains a non-indexed review deployment. Publishing or deployment changes require a separate owner decision and are outside this readiness pass.

## Editorial rule

Document reality. Explore possibilities. Clearly separate the two.

Historical Bitcoin-style 2016-block retarget descriptions apply to pre-ShockWave behavior. Current post-height-57750 documentation should describe ShockWave and should leave any unverified operational conclusions unresolved.

## Project phrase

**Preserving the knowledge. Strengthening the ecosystem.**
