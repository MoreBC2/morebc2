# Third-party provenance audit

**Category:** Project maintenance
**Status:** Owner/legal review required
**Audit date:** 2026-09-07
**Repository baseline:** `7060907437d6b10f5eb449f383004a8fb6ec94e3`

## Purpose and limits

This document inventories tracked material that may not be wholly original MoreBC2-authored content. It is intended to support, not make, the owner's licensing and attribution decisions.

This audit:

- reviewed all 226 files tracked at the baseline commit, including 206 Markdown files and 20 code, configuration, data, and asset files;
- reviewed relevant Git history where it could identify how an asset or site file entered the repository;
- distinguishes technical facts and names from protectable expression;
- does not conclude that a citation alone satisfies a license or attribution obligation;
- does not select a license or grant permission to reuse any material; and
- is not legal advice.

The classifications below describe apparent provenance, not a legal conclusion. “Adapted” means the MoreBC2 expression closely follows or reorganizes an identified upstream implementation or document. It does not mean that every fact, identifier, command, or short phrase is copyrightable.

## Executive summary

The audit records **13 grouped findings**. The repository contains no tracked screenshots, photographs, raster images, font files, release binaries, archives, `node_modules`, or other vendored dependency directory. The only tracked standalone visual asset is `public/favicon.svg`.

The most important unresolved issue is the documentation of ShockWave. BitcoinII Core `v31.1.0/src/pow.cpp` expressly separates inherited MIT-licensed Bitcoin Core and Dash/Darkcoin material from original ShockWave implementation material under proprietary source-review terms. MoreBC2 contains detailed source-derived descriptions of that implementation. Pure technical facts may be described independently, but the owner should not place closely adapted proprietary expression under a blanket documentation license without reviewing derivation and permission.

The source-atlas material also closely maps MIT-licensed BitcoinII Core and Bitcoin Core code structure. Where those pages reproduce or adapt substantial expression rather than merely report facts and identifiers, the applicable copyright and MIT notice should be preserved.

The npm lockfile records 561 dependency package entries. Dependencies are referenced through the package manager and are not vendored in this repository. Their licenses should not be replaced by a MoreBC2 repository-level software license, and the notices actually distributed in a built site should be assessed from the release artifact rather than by copying every lockfile entry into a root notice.

## Detailed findings

### P-01 — BitcoinII Core source-atlas and architecture summaries

1. **Repository path and range:** `docs/developers/source-atlas/*.md` (43 tracked pages; representative examples: `block-acceptance.md:57-195`, `mempool-entry.md:31-170`, `txmempool.md:39-318`, and `validation-cpp.md:25-401`); related synthesized flows in `docs/architecture/*.md` (representative examples: `block-validation-flow.md:29-128`, `life-of-a-block.md:15-223`, and `mempool-flow.md:23-190`).
2. **Material type:** Detailed descriptions of source layout, function names, call order, constants, and behavior; original diagrams assembled from upstream implementation review.
3. **Apparent upstream/rightsholder:** BitcoinII Core developers, with inherited Bitcoin Core contributors where the reviewed BitcoinII files retain Bitcoin Core code.
4. **Upstream source:** The individual pages identify source paths and links. Canonical repository: https://github.com/Bitcoin-II/BitcoinII-Core ; repository license: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/COPYING
5. **Apparent upstream license:** Generally MIT according to BitcoinII Core `COPYING` and applicable file headers, except file-specific terms such as the mixed terms in `src/pow.cpp` addressed in P-03.
6. **Apparent relationship:** **Adapted** where prose and flows closely map implementation structure; **purely factual/reference-only** for bare identifiers, values, and independently expressed behavior.
7. **Recommended treatment:** **Attribution notice recommended** for the source-atlas collection; **upstream license notice should be preserved** if any passage is determined to copy or adapt a substantial portion of MIT-licensed source expression. Do not label all technical facts as third-party content.
8. **Confidence:** High that the pages were produced from source review; medium on whether any individual passage reaches the threshold of a derivative or substantial portion.
9. **Uncertainty:** A line-by-line copyright comparison against every upstream file was outside this repository inventory. Owner/legal review should set a repeatable threshold for source-derived prose.

### P-02 — Bitcoin Core lineage and inherited behavior

1. **Repository path and range:** `docs/documentation/project-overview.md:21-33`; `docs/documentation/what-is-bitcoinii.md:25-31`; `docs/developers/source-atlas/disconnected-transactions.md:15-20`; `docs/developers/source-atlas/mempool-entry.md:13-18`; `docs/developers/source-atlas/txmempool.md:13-15`; `docs/developers/source-atlas/validation-cpp.md:13-15`; and inherited-behavior discussions throughout the source atlas.
2. **Material type:** Lineage statements, short paraphrases of the BitcoinII Core README/file headers, and descriptions of inherited Bitcoin Core behavior.
3. **Apparent upstream/rightsholder:** Bitcoin Core developers and Bitcoin developers; BitcoinII Core developers for the fork-specific presentation.
4. **Upstream source:** https://github.com/bitcoin/bitcoin/tree/v27.0 and https://github.com/bitcoin/bitcoin/blob/v27.0/COPYING ; BitcoinII lineage source cited by MoreBC2: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
5. **Apparent upstream license:** MIT for Bitcoin Core. BitcoinII Core states that it was forked from Bitcoin Core `0.27.0` and retains applicable notices.
6. **Apparent relationship:** Mostly **purely factual/reference-only**; potentially **adapted** where a page follows inherited code organization or README wording closely.
7. **Recommended treatment:** **Attribution notice recommended** naming Bitcoin Core lineage. **Upstream license notice should be preserved** for any substantial copied/adapted source material.
8. **Confidence:** High for lineage and MIT license; medium for the expression-level relationship of each page.
9. **Uncertainty:** BitcoinII Core includes work after the stated fork point. A root notice should not imply that every current BitcoinII behavior is authored by, or identical to, Bitcoin Core.

### P-03 — ShockWave implementation-derived documentation under separate terms

1. **Repository path and range:** `docs/developers/source-atlas/shockwave-v31.md:9-89`; `docs/developers/source-atlas/pow-cpp.md:9-60,94-96`; `docs/encyclopedia/difficulty-adjustment.md:11-45`; `docs/exchange/integration-package.md:23-27,29-60`; and `docs/exchange/operator-guide.md:73-75`.
2. **Material type:** Detailed explanatory prose and feature lists derived from review of the ShockWave implementation and its source comments; summaries of its proprietary notice.
3. **Apparent upstream/rightsholder:** KvantaMechanic and the BitcoinII Core developers, as stated in the `v31.1.0/src/pow.cpp` header.
4. **Upstream source:** https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
5. **Apparent upstream license:** Mixed. The file says inherited Bitcoin Core and Dash/Darkcoin portions remain under applicable MIT terms, while original 2026 ShockWave implementation material is proprietary and available only under stated review/evaluation permissions. It expressly says that those permissions are not an open-source license.
6. **Apparent relationship:** **Adapted** from implementation and source comments, mixed with **purely factual/reference-only** statements about activation, constants, and observed behavior.
7. **Recommended treatment:** **Exclude from MoreBC2 repository-level license** any expression that is copied from or derivative of proprietary ShockWave material unless permission is confirmed; **owner/legal review needed** to distinguish independent factual explanation from protected implementation expression; retain a conspicuous source and rights note.
8. **Confidence:** High that the detailed pages were source-derived and that the upstream file states proprietary terms; unresolved at the expression-by-expression legal level.
9. **Uncertainty:** The repository history does not establish independent authorship for every explanatory phrase or permission to relicense adapted ShockWave expression under CC BY 4.0. This finding does not suggest that technical facts, interoperability observations, or ordinary use of BitcoinII Core are prohibited.

### P-04 — Dark Gravity Wave v3 lineage

1. **Repository path and range:** `docs/developers/source-atlas/pow-cpp.md:94-96`; `docs/encyclopedia/difficulty-adjustment.md:41-45`; plus the lineage reflected in `docs/developers/source-atlas/shockwave-v31.md:85-89` and `docs/exchange/integration-package.md:23-27`.
2. **Material type:** Algorithm lineage and derivation statements.
3. **Apparent upstream/rightsholder:** Dark Gravity Wave v3/Darkcoin/Dash contributors; the BitcoinII `pow.cpp` header credits the Dash Core / Darkcoin developers and states that the rolling baseline derives in part from DGW v3 concepts and code.
4. **Upstream source:** BitcoinII's explicit lineage statement: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp ; Dash repository: https://github.com/dashpay/dash ; Dash license: https://github.com/dashpay/dash/blob/master/COPYING
5. **Apparent upstream license:** MIT for the inherited Dash/Darkcoin portions according to the BitcoinII file header and Dash repository. The exact historical DGW v3 source commit incorporated into BitcoinII has not been identified.
6. **Apparent relationship:** **Adapted** at the BitcoinII implementation level; MoreBC2's lineage statement is primarily **purely factual/reference-only**.
7. **Recommended treatment:** **Attribution notice recommended** naming Dark Gravity Wave v3 and Dash/Darkcoin contributors; **upstream license notice should be preserved** for substantial copied/adapted DGW code expression. Keep ShockWave and DGW attribution distinct.
8. **Confidence:** High for the stated lineage and MIT characterization; medium for original author and exact source revision.
9. **Uncertainty:** Do not guess the precise DGW v3 commit, original author allocation, or copied line set until the BitcoinII source history is traced.

### P-05 — BitcoinII/Bitcoin Core-style configuration excerpts

1. **Repository path and range:** `docs/configuration/configuration-overview.md:27-32`; `docs/configuration/rpc-configuration.md:23-69`; `docs/compatibility/bitcoin-core-rpc.md:44-53`; `docs/verification/local-node-inspection-2026-07-10.md:48-53`; `docs/verification/local-rpc-enablement-plan.md:39-44`; `docs/verification/windows-node-operator-test-2026-08-27.md:53-60`; and `docs/nodes/node-guide.md:76-96`.
2. **Material type:** Short configuration examples, option names, and summaries of generated/example configuration documentation.
3. **Apparent upstream/rightsholder:** BitcoinII Core and inherited Bitcoin Core configuration material; some bounded examples are MoreBC2 test configurations.
4. **Upstream source:** https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/share/examples/bitcoinII.conf and historical/current links recorded in the cited MoreBC2 pages.
5. **Apparent upstream license:** MIT at repository level; file-specific provenance should be checked before reproducing long comments.
6. **Apparent relationship:** Short option/value blocks are largely **purely factual/reference-only**; option descriptions may be **adapted** from generated upstream comments.
7. **Recommended treatment:** **Source citation sufficient** for short factual examples; **attribution notice recommended** if longer comments or documentation wording are retained or added. Preserve historical test configurations as MoreBC2 evidence.
8. **Confidence:** High for source and test provenance; medium on whether any short descriptions closely reproduce upstream wording.
9. **Uncertainty:** The audit did not find a substantial verbatim upstream configuration block, but did not perform a character-level comparison against every upstream version.

### P-06 — BitcoinII releases, source metadata, hashes, and GitHub attestations

1. **Repository path and range:** `docs/releases/*`; `docs/verification/release-artifact-authentication-2026-08-27.md:15-175`; `docs/verification/network-release-comparison.md`; `docs/nodes/node-guide.md:25-51`; and similar release/hash records.
2. **Material type:** Release names, filenames, byte sizes, checksums, commit/tag identifiers, timestamps, API metadata, and signature-verification results.
3. **Apparent upstream/rightsholder:** BitcoinII Core release publisher and GitHub as metadata/hosting/signature service; MoreBC2 for independently computed hashes and observations.
4. **Upstream source:** https://github.com/Bitcoin-II/BitcoinII-Core/releases and the specific release/API links preserved in each evidence record.
5. **Apparent upstream license:** License is generally not the controlling concept for bare facts, identifiers, and independently computed hashes. Any copied release-note prose remains subject to its source's terms, which are not separately stated on the release pages reviewed here.
6. **Apparent relationship:** Predominantly **purely factual/reference-only** and **generated from third-party input**.
7. **Recommended treatment:** **Source citation sufficient** for metadata and hashes; use **owner/legal review needed** before reproducing substantial release-note prose. Do not imply GitHub owns BitcoinII materials or that hosting metadata authenticates binaries.
8. **Confidence:** High for classification of the recorded fields; medium for the rights status of any short release-description wording.
9. **Uncertainty:** GitHub terms and release-page rights were not treated as a content license. No BitcoinII publisher notice covering release prose was located in this audit.

### P-07 — Public API, explorer, Electrum, and market-data observations

1. **Repository path and range:** `docs/verification/public-api-electrum-smoke-test-2026-07-12.md:12-118`; `docs/api/rest.md:15-85`; `docs/api/electrum.md:15-82`; `docs/api/mempool-space-compatibility.md:9-93`; `docs/ecosystem/apis.md:99-227`; and `docs/api/public-endpoints.md:15-56`.
2. **Material type:** Endpoint names, response-shape summaries, small observed values, interoperability comparisons, and generated/test observations from third-party services.
3. **Apparent upstream/rightsholder:** Operators of `bc2mempool.com`, `bc2.live`, BitcoinII Electrum infrastructure, MiningPoolStats, and mempool.space where compatibility terminology is used.
4. **Upstream source:** The live endpoint URLs and dated evidence pages above; mempool.space project: https://github.com/mempool/mempool
5. **Apparent upstream license:** Unresolved for each service's hosted data and API terms. The mempool project has its own repository notices, but that does not automatically license third-party service output.
6. **Apparent relationship:** **Generated from third-party input** and **purely factual/reference-only**. The repository says the full rich-list response was not copied.
7. **Recommended treatment:** **Source citation sufficient** for bounded factual observations; **owner/legal review needed** before redistributing substantial response bodies, datasets, schemas, or service documentation. Keep dates and non-endorsement boundaries.
8. **Confidence:** High for the observed-data classification; low on service-specific reuse rights because terms were not established.
9. **Uncertainty:** API accessibility does not establish permission to republish datasets or branded UI content. No substantial response dump is tracked now.

### P-08 — Third-party service and product names

1. **Repository path and range:** `docs/ecosystem/exchanges.md:37-201`; `docs/ecosystem/mining-pools.md:38-98`; `docs/exchange/exchange-listing-targets.md:30-36`; `docs/exchange/native-coin-listing-guide.md:108-130`; `docs/compatibility/wallets.md:49-71`; and API/compatibility pages referring to Electrum, ElectrumX, mempool.space, GitHub, CoinEx, NonKYC, MiningPoolStats, CoinPaprika, CoinCodex, LiveCoinWatch, CoinGecko, BlueWallet, Cake Wallet, and Komodo Wallet.
2. **Material type:** Names and word marks used to identify third-party projects, services, exchanges, explorers, pools, and wallets. No third-party logo files were found.
3. **Apparent upstream/rightsholder:** The respective project and service operators.
4. **Upstream source:** Official/service URLs are recorded adjacent to the names in the cited pages.
5. **Apparent upstream license:** Not applicable or unresolved for trademarks; an open-source software license does not grant trademark rights by default.
6. **Apparent relationship:** **Visual/branding** only in the sense of referential word-mark use; otherwise **purely factual/reference-only**. No visual brand assets are tracked.
7. **Recommended treatment:** **No special notice likely needed** for accurate nominative references, but an owner-approved trademark/non-affiliation statement is prudent; **owner/legal review needed** for any future logo use or presentation that may suggest endorsement.
8. **Confidence:** High that present use is textual and referential; legal treatment remains jurisdiction- and context-dependent.
9. **Uncertainty:** This audit does not determine trademark ownership, registration, or service-specific brand guidelines.

### P-09 — MoreBC2 favicon with unresolved authorship record

1. **Repository path and asset:** `public/favicon.svg` (entire four-line asset).
2. **Material type:** Original-appearing vector icon: a geometric “M” on a rounded square.
3. **Apparent upstream/rightsholder:** Unknown. Git history shows it entered in commit `4ffafd45670ae1557853251df30f7c34f9d3440f` with the Starlight site scaffold, but the file contains no author, source, or license metadata.
4. **Upstream source:** None identifiable from the file or repository history.
5. **Apparent upstream license:** Unresolved.
6. **Apparent relationship:** **Visual/branding**; it appears customized for MoreBC2, but originality and rights cannot be inferred from appearance or filename.
7. **Recommended treatment:** **Owner/legal review needed**. Obtain an owner authorship/commission/source confirmation before including it under a repository license; otherwise replace it later with a rights-cleared asset. Do not infer that Starlight owns it merely because it arrived in the scaffold commit.
8. **Confidence:** High that provenance is undocumented; low on actual authorship.
9. **Uncertainty:** No evidence in tracked history identifies whether it was hand-authored, generated, adapted, or supplied by a third party.

### P-10 — Astro/Starlight site integration and scaffold-shaped configuration

1. **Repository path and range:** `astro.config.mjs:1-61`; `src/content.config.ts:1-7`; `src/pages/404.astro:1-34`; `src/styles/morebc2.css:1-87`; `tsconfig.json`; and the six `scripts/*.mjs` files. These files first arrived, or were developed, through the site-scaffold history culminating in commit `4ffafd45670ae1557853251df30f7c34f9d3440f`.
2. **Material type:** Site integration code, API-shaped configuration, custom adapter/check scripts, CSS, and an error page.
3. **Apparent upstream/rightsholder:** MoreBC2 for project-specific implementation; Astro and Starlight contributors for APIs, framework packages, and any starter-derived conventions.
4. **Upstream source:** https://github.com/withastro/astro and https://github.com/withastro/starlight
5. **Apparent upstream license:** MIT for Astro and Starlight according to their repositories/package metadata. TypeScript, a development dependency, is Apache-2.0.
6. **Apparent relationship:** Mostly original project-specific software; common setup fragments may be **adapted** from framework documentation or starter conventions. No framework copyright header or obvious substantial verbatim template was found.
7. **Recommended treatment:** **Source citation sufficient** for ordinary API use; **upstream license notice should be preserved** if a substantial starter/template portion is identified. Record Astro/Starlight as dependencies, not co-owners of all MoreBC2 tooling.
8. **Confidence:** Medium-high based on code review and Git history.
9. **Uncertainty:** Commit history does not identify whether every initial scaffold fragment was written from scratch or copied from an example. The favicon is separately unresolved in P-09.

### P-11 — npm dependency graph and package-manager metadata

1. **Repository path and range:** `package.json:1-27`; `package-lock.json` (entire generated lockfile; direct package entries begin at `package-lock.json:20`, `:617`, `:2975`, and `:7287`).
2. **Material type:** Package declarations and npm-generated dependency metadata, including names, versions, registry URLs, integrity values, funding URLs, and SPDX-like license fields.
3. **Apparent upstream/rightsholder:** The maintainers of Astro, Starlight, TypeScript, and 557 other transitive/package-specific entries; npm registry metadata providers.
4. **Upstream source:** Registry URLs embedded in `package-lock.json`; direct-project repositories include https://github.com/withastro/astro , https://github.com/withastro/starlight , and https://github.com/microsoft/TypeScript .
5. **Apparent upstream license:** Direct packages: Astro MIT, Starlight MIT, `@astrojs/check` MIT, TypeScript Apache-2.0. Lockfile declarations include MIT, Apache-2.0, LGPL-3.0-or-later, MPL-2.0, ISC, BSD, CC0, Python-2.0, 0BSD, BlueOak, and combined expressions. These fields are inventory leads, not a substitute for package license texts.
6. **Apparent relationship:** `package-lock.json` is **generated from third-party input**. Dependency code is package-managed and is not tracked or vendored in this repository.
7. **Recommended treatment:** **Upstream license notice should be preserved** in any distributed build to the extent required by the packages actually included. Do not reproduce all 561 dependency records mechanically in a root notice; generate/review a release-artifact bill of materials and license bundle instead. Do not relicense dependencies under MoreBC2's software license.
8. **Confidence:** High for tracked/non-vendored status and declared license fields; medium for what a production build embeds.
9. **Uncertainty:** The built `dist` directory is ignored and was not a baseline tracked artifact. Transitive `sharp`/libvips packages declare LGPL combinations and Lightning CSS packages declare MPL-2.0; whether their code is shipped to browsers, used only at build time, or included in a distributed server/tool bundle must be established from the intended release artifact.

### P-12 — GitHub Actions workflow dependencies

1. **Repository path and range:** `.github/workflows/site-check.yml:1-38`, especially `actions/checkout@v4` and `actions/setup-node@v4`.
2. **Material type:** References to reusable GitHub Actions.
3. **Apparent upstream/rightsholder:** GitHub/actions contributors.
4. **Upstream source:** https://github.com/actions/checkout and https://github.com/actions/setup-node
5. **Apparent upstream license:** MIT according to the respective action repositories.
6. **Apparent relationship:** Dependency references; no action source is vendored.
7. **Recommended treatment:** **No special notice likely needed** in MoreBC2 documentation for workflow references alone. Preserve upstream licenses if action code is ever vendored or redistributed.
8. **Confidence:** High.
9. **Uncertainty:** Marketplace/action terms and supply-chain policy are operational questions separate from repository content licensing.

### P-13 — Generated immutable-evidence link inventory

1. **Repository path and range:** `docs/verification/immutable-evidence-link-inventory.json:1-end`; generator `scripts/inventory-immutable-evidence.mjs:1-288`.
2. **Material type:** Generated structured artifact containing upstream repository paths, short surrounding MoreBC2 context, Git object identifiers, and comparison/classification results.
3. **Apparent upstream/rightsholder:** MoreBC2 for the generator, selection, classifications, and MoreBC2 context; BitcoinII Core/GitHub for referenced paths and repository metadata.
4. **Upstream source:** `source_repository` identifies `Bitcoin-II/BitcoinII-Core`; individual records point to upstream paths and immutable commits.
5. **Apparent upstream license:** BitcoinII Core MIT generally, with file-specific exceptions such as `src/pow.cpp`; bare repository metadata and hashes are primarily factual.
6. **Apparent relationship:** **Generated from third-party input**, combined with original MoreBC2 annotations. It does not embed upstream source files.
7. **Recommended treatment:** **Source citation sufficient** for factual paths, refs, and hashes; state the generator and input provenance in a future notice. **Owner/legal review needed** only if future generations embed substantial upstream text rather than the current short references/context.
8. **Confidence:** High, based on the generator and JSON schema.
9. **Uncertainty:** The inventory preserves short MoreBC2 context strings and upstream metadata, not a legal determination of rights in every referenced file.

## Items reviewed but not treated as third-party findings

- Protocol constants, hashes, block heights, ports, filenames, API route names, function identifiers, and command names were treated as factual/reference material unless accompanied by substantial copied expression.
- Short shell, PowerShell, RPC, and configuration examples were not presumed copied merely because they use standard commands or upstream option names.
- Historical `v29.1.0` verification records were preserved as dated MoreBC2 observations. Their age does not make them third-party content and this audit does not rewrite them.
- No tracked screenshot, photograph, raster image, font, release archive, executable, shared library, source map, or vendored dependency directory was found.
- No third-party logo asset was found. Textual project and service names are covered by P-08.
- The repository's simple `public/_headers`, `public/robots.txt`, `.gitignore`, and issue/PR templates contain ordinary project configuration or prompts; no substantial third-party expression was identified.

## Proposed attribution structure

The owner could implement the following separation after resolving the open rights questions. This is a structure proposal, not a license selection.

### Original MoreBC2 documentation

- Define the documentation scope by path, normally repository Markdown authored for MoreBC2.
- State the chosen documentation license only after confirming contributor authority.
- Carve out quoted, adapted, generated, and otherwise identified third-party material.
- Point to `THIRD_PARTY_NOTICES.md` for P-01 through P-08 and P-13.

### Original MoreBC2 software and site tooling

- Define the software scope: project-specific `scripts/`, `src/`, and configuration files.
- State the chosen software license only after confirming authorship of scaffold-era contributions and the favicon disposition.
- Clarify that dependencies keep their own licenses.

### BitcoinII Core-derived material

- Identify BitcoinII Core, its canonical repository/tag, applicable copyright holders, and the MIT `COPYING` notice for MIT-covered portions.
- Enumerate MoreBC2 files or sections that closely map BitcoinII implementation structure.
- Separately identify file-specific exceptions, especially ShockWave in `src/pow.cpp`.

### Bitcoin Core-derived material

- Credit Bitcoin Core developers and Bitcoin developers.
- Preserve the MIT copyright and permission notice where substantial source expression is copied or adapted.
- Avoid implying that all BitcoinII-specific behavior belongs to Bitcoin Core.

### Dark Gravity Wave-derived material

- Credit Dark Gravity Wave v3 and Dash/Darkcoin contributors based on the BitcoinII source header.
- Link the identified source lineage and applicable MIT notice.
- Mark the exact historical source revision and author allocation unresolved until traced.

### Third-party assets and branding

- Resolve `public/favicon.svg` authorship before licensing it.
- List any future logos, screenshots, icons, or datasets individually with source, owner, license/permission, modifications, and exclusions.
- Include a neutral trademark/non-affiliation statement if approved by the owner.

### npm and framework dependencies

- Keep `package.json`/`package-lock.json` as dependency records.
- Generate an artifact-specific dependency/license inventory for whatever is actually distributed.
- Preserve package license and notice files in accordance with each package; do not claim dependencies are covered by the MoreBC2 software license.
- Treat build-only dependencies differently from code/assets included in the published site or downloadable tooling.

## Compatibility with the contemplated licensing plan

The contemplated structure—CC BY 4.0 for original documentation and MIT for original MoreBC2 software—does not appear inherently incompatible with the repository's original material. It must, however, be scoped so it does not purport to relicense third-party material.

The following require resolution before applying that structure:

1. **ShockWave:** Closely adapted expression from proprietary ShockWave implementation material may not be relicensable under CC BY 4.0 without permission. Independently written factual descriptions may be different, but that distinction requires owner/legal review.
2. **MIT-derived source expression:** Substantial copied/adapted BitcoinII Core, Bitcoin Core, or DGW/Dash expression must retain the applicable copyright and MIT permission notice. A CC BY label should clearly exclude those portions or be accompanied by a compatible, accurate notice structure.
3. **Favicon:** Rights are unresolved. Do not include it in a blanket license until provenance is confirmed.
4. **Service data:** Current records are bounded factual observations, not substantial datasets. Future redistribution of API bodies, market data, screenshots, or schemas requires service-specific review.
5. **Dependencies:** Package dependencies remain under their own licenses. Distribution obligations depend on the produced artifact, not solely on the lockfile.

No tracked material was conclusively identified as incompatible with the contemplated plan if the plan is limited to original MoreBC2 work and the exclusions/notices above are implemented. P-03 presents a concrete potential conflict, and P-09 remains an unresolved rights gap.

## Recommended contents for a future `NOTICE`

A concise project-facing `NOTICE` could contain:

- MoreBC2 project identity and owner-approved copyright statement;
- a clear path-based split between original documentation and original software/tooling;
- a statement that third-party material and dependencies retain their own terms;
- top-level acknowledgements of BitcoinII Core, Bitcoin Core, and Dark Gravity Wave/Dash lineage;
- an explicit ShockWave file-specific rights boundary, without paraphrasing it as an open-source license;
- a pointer to `THIRD_PARTY_NOTICES.md` for detailed notices and exclusions;
- a trademark/non-affiliation statement approved by the owner; and
- the provenance/status of the favicon or a statement excluding it from the repository licenses.

## Recommended contents for a future `THIRD_PARTY_NOTICES.md`

The detailed notices file could contain one section per provenance family:

1. BitcoinII Core MIT-covered source-derived material, with repository/tag, affected MoreBC2 paths, copyright notice, MIT text, and modifications/summary status.
2. Bitcoin Core-derived material, with the Bitcoin Core `v27.0` source reference and preserved MIT notice.
3. Dark Gravity Wave v3/Dash/Darkcoin-derived material, with exact revision and author attribution once established, plus MIT notice.
4. ShockWave proprietary source-review material, quoting or linking the controlling file notice only after legal review and listing excluded MoreBC2 passages or obtained permission.
5. Third-party data/API observations, identifying source services, dates, and whether only facts or any redistributable payload is included.
6. Assets and branding, including the favicon resolution and any future screenshots/logos with explicit permissions.
7. Distributed npm/framework components, generated from the actual release artifact and containing required license texts/notices rather than an unreviewed dump of every lockfile entry.

## Owner/legal decisions still required

- Decide whether the detailed ShockWave pages are independently expressed factual documentation, adapted proprietary expression, or a mixture requiring edits, permission, or exclusion.
- Trace the exact Dark Gravity Wave v3 revision and attribution chain used by BitcoinII if a precise software-derived notice is desired.
- Confirm authorship and licensing authority for `public/favicon.svg` and scaffold-era contributions.
- Establish a policy for when source-atlas prose requires preservation of an upstream MIT notice.
- Decide whether and how to state trademark/non-affiliation language.
- Generate and review notices against the actual site/release artifact, especially for LGPL/MPL/transitive dependencies.
- Confirm that each contributor had authority to license their MoreBC2 contributions under the owner's selected structure.

## Readiness conclusion

The repository now has enough provenance information for the owner to design a licensing structure, but it is **not yet ready for the owner to finalize and apply that structure without additional decisions**. The ShockWave expression boundary and favicon authorship are the clearest blockers. Exact DGW provenance, MIT-notice thresholds for source-derived prose, contributor authority, and artifact-specific dependency notices also need resolution.
