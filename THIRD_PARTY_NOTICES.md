# Third-party notices

This file identifies important third-party provenance and license boundaries in MoreBC2. It supplements the repository [licensing map](LICENSE) and the project-facing [NOTICE](NOTICE). It does not replace an upstream license, grant rights in third-party material, or provide legal advice.

Technical facts, ordinary identifiers, hashes, heights, constants, and independently written explanations are not listed as third-party copyrighted expression merely because they concern another project. Source-derived expression, code, notices, service data, and branding remain subject to the terms that apply to them.

## BitcoinII Core

MoreBC2 documents and cites [BitcoinII Core](https://github.com/Bitcoin-II/BitcoinII-Core), principally using the `v31.1.0` source baseline for current-facing documentation. Source-atlas and architecture pages describe upstream functions, code organization, behavior, and lineage. Some passages may closely map MIT-covered implementation structure; other passages are independently authored factual descriptions.

BitcoinII Core’s repository-level [`v31.1.0` `COPYING` file](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/COPYING) contains the MIT permission notice and identifies:

- `Copyright (c) 2009-2026 The Bitcoin Core developers`
- `Copyright (c) 2009-2026 Bitcoin Developers`

Individual BitcoinII Core source files may carry additional copyright holders or file-specific terms. Source-derived material remains under the applicable upstream terms and notices; it is not relicensed under CC BY 4.0 or the MoreBC2 MIT license. The BitcoinII Core `COPYING` file does not override the separate ShockWave terms in `src/pow.cpp`.

## Bitcoin Core

BitcoinII Core states that it was forked from Bitcoin Core `0.27.0`, and MoreBC2 describes inherited behavior and structure where relevant. Bitcoin Core source is distributed under the MIT License; see the [Bitcoin Core `v27.0` source](https://github.com/bitcoin/bitcoin/tree/v27.0) and [`COPYING`](https://github.com/bitcoin/bitcoin/blob/v27.0/COPYING).

Substantial copied or adapted Bitcoin Core source expression must retain its applicable copyright and MIT permission notice. Lineage does not mean that all current BitcoinII behavior was authored by Bitcoin Core contributors or remains identical to Bitcoin Core.

## Dark Gravity Wave / Dash / Darkcoin

BitcoinII Core `v31.1.0/src/pow.cpp` attributes inherited portions and concepts to Dark Gravity Wave v3 and Dash / Darkcoin contributors. It describes those inherited portions as remaining under their applicable MIT terms. The [Dash source repository](https://github.com/dashpay/dash) and its [`COPYING` file](https://github.com/dashpay/dash/blob/master/COPYING) provide the current upstream project reference.

The exact historical Dark Gravity Wave v3 source revision, copied line set, and original-author allocation used in BitcoinII have not been established by the MoreBC2 provenance audit. This notice therefore does not invent a commit or more precise allocation. Any substantial copied or adapted DGW, Dash, or Darkcoin source expression must preserve its actual upstream copyright and MIT notice once identified.

## ShockWave

MoreBC2 contains independently authored factual and explanatory documentation about ShockWave. The identified current-facing passages were reviewed and reworked to avoid reproducing the proprietary feature catalogue, source comments, implementation structure, or other proprietary expression from the upstream implementation. Source citations are retained.

The controlling upstream reference is [BitcoinII Core `v31.1.0/src/pow.cpp`](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp). That file identifies inherited Bitcoin Core and Dash / Darkcoin portions as subject to applicable MIT terms and states separate proprietary source-review terms for original ShockWave implementation material.

Upstream ShockWave source code, comments, implementation structure, and proprietary notice are not licensed by MoreBC2. Controlling rights remain with the applicable upstream rightsholders under the terms stated in the upstream source. MoreBC2’s licenses do not grant permission to copy, implement, redistribute, port, or create derivative works from proprietary ShockWave implementation material. Consult the upstream file rather than this summary to determine the permissions its rightsholders provide.

## Third-party services, data, names, and branding

MoreBC2 refers to exchanges, explorers, mining pools, APIs, wallets, infrastructure providers, GitHub, and other projects or services. Ordinary factual observations and references identifying those services do not imply MoreBC2 ownership, affiliation, sponsorship, endorsement, or official status.

Third-party API responses, datasets, schemas, screenshots, service documentation, logos, visual branding, and other expressive material remain subject to their applicable rightsholders’ terms. The current tracked repository contains bounded factual observations and source links rather than a general license to redistribute those third-party materials. Any future substantial capture or redistribution requires service-specific review.

## npm and framework dependencies

The tracked repository declares dependencies through `package.json` and npm-generated `package-lock.json`; it does not vendor `node_modules` or a third-party dependency source tree. Package-manager metadata does not relicense dependency code under the MoreBC2 MIT license.

Direct framework and tooling families include:

- [Astro](https://github.com/withastro/astro) — MIT;
- [Starlight](https://github.com/withastro/starlight) — MIT;
- [`@astrojs/check`](https://github.com/withastro/astro) — MIT; and
- [TypeScript](https://github.com/microsoft/TypeScript) — Apache License 2.0.

Those references summarize direct package metadata; the packages’ own files and repositories control. Transitive packages retain their own licenses. The lockfile contains 561 package entries, but the built site does not necessarily distribute every listed package. License and notice obligations must be evaluated against the actual artifact that is published or distributed. A reviewed artifact-specific dependency license bundle has not yet been generated.

## Assets

The current `public/favicon.svg` is an original MoreBC2 project asset independently created from basic SVG geometry specifically for this repository. No third-party artwork, logo, font, image, downloaded SVG, or source asset was used. It is included in the MoreBC2 MIT-licensed software/tooling/asset scope.

The prior favicon with unresolved provenance was removed and is not the current asset. Any future third-party logo, screenshot, icon, font, image, or dataset must be recorded separately with its source and applicable terms.

## Detailed audit

See [`docs/THIRD_PARTY_PROVENANCE_AUDIT.md`](docs/THIRD_PARTY_PROVENANCE_AUDIT.md) for the repository-wide inventory, confidence levels, uncertainties, and the focused ShockWave and favicon rights-clearance records.
