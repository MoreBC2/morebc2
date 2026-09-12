# MoreBC2

**Status:** Public source repository and deployed documentation site
**Last reviewed:** 2026-09-12

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

Release-pinned source remains the technical authority for current protocol behavior. Older website, whitepaper, community, or historical documentation should not silently override newer v31 source.

## Evidence boundaries

MoreBC2 distinguishes source review, direct public observation, local testing, historical evidence, service policy, maintainer statements, and unresolved claims.

Current evidence now includes:

- BitcoinII Core `v31.1.0` source and release metadata;
- isolated Windows `v31.1.0` node/RPC validation from 2026-09-11;
- isolated `v31.1.0` regtest PSBT runtime validation plus a release-pinned replay-protection trace from 2026-09-11;
- public explorer/API/WebSocket/Electrum checks from 2026-09-11;
- direct exchange-confirmation evidence from 2026-09-12;
- current v31 release-asset digest/tag/commit provenance records.

Historical `v29.1.0` test records are intentionally preserved as historical, version-scoped evidence. They must not be rewritten as v31 testing.

Current release evidence does **not** establish a maintainer-signed checksum manifest, detached signatures for every binary, a documented release-signing-key procedure, or reproducible-build proof. Current runtime evidence is also bounded by its documented test environment and must not be generalized into complete production custody verification.

See the [verification evidence index](docs/verification/verification-index.md), [known unknowns](docs/verification/known-unknowns.md), and [project status](PROJECT_STATUS.md).

## Exchange guidance

Current direct exchange observations show materially different BC2 risk policies. NonKYC and NestEx each expose a 50-confirmation setting, while CoinEx exposes `2` safe / `6` exchange-defined `irreversible` confirmations.

MoreBC2 therefore currently uses **50 confirmations as a provisional normal-deposit baseline** in its exchange-integration documentation. That is MoreBC2 operational guidance, not a BitcoinII consensus rule, maintainer mandate, or mathematical-finality guarantee.

See [Exchange confirmation evidence — 2026-09-12](docs/verification/exchange-confirmation-evidence-2026-09-12.md).

## Start here

- [What is BitcoinII?](docs/documentation/what-is-bitcoinii.md)
- [Project status](PROJECT_STATUS.md)
- [Documentation index](docs/README.md)
- [Network specifications](docs/documentation/network-specifications.md)
- [Consensus overview](docs/documentation/consensus-overview.md)
- [Node guide](docs/nodes/node-guide.md)
- [Mining overview](docs/mining/mining-overview.md)
- [Release evidence](docs/releases/README.md)
- [Exchange integration](docs/exchange/README.md)
- [Roadmap](ROADMAP.md)

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Keep claims tied to claim-appropriate evidence, preserve uncertainty labels, and never promote Draft, Partial, Needs Review, or source-only material to Verified without the required record.

Useful project-reference pages include:

- [Evidence scale](EVIDENCE_SCALE.md)
- [Source registry](SOURCE_REGISTRY.md)
- [Glossary](GLOSSARY.md)
- [Governance](GOVERNANCE.md)
- [Writing checklist](WRITING_CHECKLIST.md)

## Security reporting

Use public GitHub issues for ordinary, non-sensitive documentation problems. Do not publish secrets, exploit details, personal information, private keys, seed phrases, or other sensitive security information in an issue.

See [SECURITY.md](https://github.com/MoreBC2/morebc2/blob/main/SECURITY.md) for scope, the upstream boundary, and the verified private-reporting route.

## Licensing

Original MoreBC2 documentation is licensed under CC BY 4.0. Original MoreBC2 software, site tooling, configuration, tests, and rights-cleared project assets are licensed under MIT. Third-party material remains under its own terms.

See [LICENSE](https://github.com/MoreBC2/morebc2/blob/main/LICENSE), [NOTICE](https://github.com/MoreBC2/morebc2/blob/main/NOTICE), and [THIRD_PARTY_NOTICES.md](https://github.com/MoreBC2/morebc2/blob/main/THIRD_PARTY_NOTICES.md).

## Site and tooling validation

The documentation site is generated with Astro and Starlight. The repository currently declares Node.js `>=22.12.0`.

From a clean checkout:

```sh
npm ci
npm run check
npm run build
npm run check:windows-node-docs
```

`npm run check` prepares generated site content, runs Astro validation, and runs the site-adapter tests. `npm run build` also audits generated site output and internal links.

The production deployment workflow additionally checks Windows-node documentation assumptions, scans generated output for blocked private-path variants, deploys the `main` build to Cloudflare Pages, and verifies the live site's indexing policy.

The public site is currently deployed at:

- https://morebc2.pages.dev/

A successful deployment proves that those automated checks passed for that commit and that the site was published. It does **not** make every factual claim on the site Verified.

## Editorial rule

Document reality. Explore possibilities. Clearly separate the two.

Historical Bitcoin-style 2016-block retarget descriptions apply only to pre-ShockWave behavior. Current post-height-`57750` documentation should describe ShockWave and leave unsupported operational conclusions unresolved.

## Project phrase

**Preserving the knowledge. Strengthening the ecosystem.**
