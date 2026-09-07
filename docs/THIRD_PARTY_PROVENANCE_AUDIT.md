# Third-party provenance audit

**Category:** Project maintenance
**Status:** Owner/legal review required
**Audit date:** 2026-09-07
**Repository baseline:** `7060907437d6b10f5eb449f383004a8fb6ec94e3`
**Focused rights-clearance follow-up:** 2026-09-07, starting at `14f8536f0f472f6d545593a067909e36f9be2cd8`

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

BitcoinII Core `v31.1.0/src/pow.cpp` expressly separates inherited MIT-licensed Bitcoin Core and Dash/Darkcoin material from original ShockWave implementation material under proprietary source-review terms. The focused follow-up below reviewed 33 ShockWave passage units and rewrote 15 that closely followed the source comments' expression, structure, or rights notice. The resulting MoreBC2 prose retains technical facts but does not reproduce the proprietary feature catalogue or detailed control-rule explanations. The upstream source, comments, and implementation remain expressly outside any future MoreBC2 documentation license.

The source-atlas material also closely maps MIT-licensed BitcoinII Core and Bitcoin Core code structure. Where those pages reproduce or adapt substantial expression rather than merely report facts and identifiers, the applicable copyright and MIT notice should be preserved.

The npm lockfile records 561 dependency package entries. Dependencies are referenced through the package manager and are not vendored in this repository. Their licenses should not be replaced by a MoreBC2 repository-level software license, and the notices actually distributed in a built site should be assessed from the release artifact rather than by copying every lockfile entry into a root notice.

The favicon's Git history was traced through both the feature branch and the squashed `main` commit. That history does not establish authorship, generation terms, or a third-party source. `public/favicon.svg` must therefore be excluded from the future repository licenses and replaced with a newly created, rights-cleared MoreBC2 asset before public release.

## Focused P-03 and P-09 rights-clearance follow-up

### Review unit and counts

For this follow-up, one “passage unit” means a contiguous paragraph, list, table entry, or closely related paragraph group about ShockWave behavior, lineage, or rights. Headings, source links, verification metadata, and duplicate bare mentions were counted with their surrounding passage rather than as separate units.

The five P-03 files contained **33 relevant passage units**:

| Initial classification | Count | Disposition |
|---|---:|---|
| Independently expressed technical fact | 10 | Retained |
| Ordinary identifier, constant, or name | 5 | Retained |
| Close paraphrase of proprietary ShockWave comments/expression | 7 | Rewritten |
| Copied or near-copied proprietary expression | 4 | Rewritten; source-shaped lists and sentence construction were removed |
| MIT-derived Bitcoin Core/DGW material | 3 | Retained with lineage/source attribution |
| Uncertain | 4 | Rewritten conservatively as an independent rights-boundary statement |
| **Total** | **33** | **15 rewritten; no MoreBC2 passage left for license exclusion** |

The 12 rewritten units are in:

- `docs/developers/source-atlas/shockwave-v31.md`, under **Rolling baseline**, **Short-horizon response**, **Timestamp handling**, **Emergency stall recovery**, and **Licensing boundary**;
- `docs/developers/source-atlas/pow-cpp.md`, under **Current file-header licensing note**, **Why it matters**, **ShockWave calculation scope**, and **Dark Gravity Wave relationship**;
- `docs/encyclopedia/difficulty-adjustment.md`, under **Current BitcoinII behavior** and **Dark Gravity Wave relationship**;
- `docs/exchange/integration-package.md`, under **Licensing note**; and
- `docs/exchange/operator-guide.md`, under **ShockWave operational note** and **Licensing note**.

No MoreBC2 passage is marked for exclusion after those rewrites. This conclusion applies to the reviewed prose, not to BitcoinII Core content reached through citations. Any copied upstream source, source comment, or implementation excerpt added later must be reviewed independently and, where applicable, excluded or carried under its own controlling terms.

### ShockWave disposition

The reviewed MoreBC2 text can be treated as original explanatory documentation subject to source attribution. It now organizes the discussion around observable inputs, thresholds, outputs, activation, and integration consequences rather than following the proprietary comments' feature sequence and terminology.

The following are not being claimed as MoreBC2-licensed material:

- BitcoinII Core `src/pow.cpp` source code;
- comments and the ordered feature catalogue in that file;
- the ShockWave implementation or its internal expressive structure; and
- the proprietary notice itself.

The controlling upstream source remains https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp. Source attribution is retained in all five reviewed documents.

### Favicon trace and disposition

The tracked evidence establishes this sequence:

1. The parent `4a9dcc174dfafeeadf93f763d3d59691ae166564` did not contain a favicon. Its site-planning page, `docs/site/README.md:97-105`, still listed “Logo and favicon” as an open website decision.
2. `public/favicon.svg` first appeared as blob `5a101e1eb6390db694683db92cab2c60624047af` in feature-branch commit `fcda9e78dd8ac051d9db7801a665f0f6b22985b8` (`Harden Starlight site generation and QA`, 2026-08-23).
3. The identical blob entered `main` in squashed commit `4ffafd45670ae1557853251df30f7c34f9d3440f` (`Scaffold MoreBC2 Starlight site preview (#3)`, 2026-08-27), whose parent is `3e51b0d3fc54ff54fb7d31bd97a2e14ec4137a66`.
4. The favicon has no later content change. Searches of tracked files and all available refs found no design source, generator reference, prompt, issue text, attribution, license, or authorship statement tied to the SVG. The local environment did not provide GitHub CLI access to inspect any untracked PR discussion.

The evidence therefore does **not** establish that the favicon was authored specifically for MoreBC2, generated under usable terms, or copied/adapted from a third party. Provenance remains unresolved.

Disposition: **exclude `public/favicon.svg` from both future MoreBC2 repository licenses and replace it with a newly created, rights-cleared MoreBC2 favicon before public release.** No replacement was created in this follow-up because no existing clearly original source asset establishes an unambiguous basis for one.

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

### P-03 — ShockWave implementation-derived documentation under separate terms — resolved by rewrite

1. **Repository path and range:** `docs/developers/source-atlas/shockwave-v31.md:9-70`; `docs/developers/source-atlas/pow-cpp.md:9-81`; `docs/encyclopedia/difficulty-adjustment.md:9-38`; `docs/exchange/integration-package.md:23-60`; and `docs/exchange/operator-guide.md:37-75`.
2. **Material type:** Independently organized factual explanations based on source review, ordinary identifiers/constants, and original summaries of the file-specific rights boundary.
3. **Apparent upstream/rightsholder:** KvantaMechanic and the BitcoinII Core developers, as stated in the `v31.1.0/src/pow.cpp` header.
4. **Upstream source:** https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
5. **Apparent upstream license:** Mixed. The file says inherited Bitcoin Core and Dash/Darkcoin portions remain under applicable MIT terms, while original 2026 ShockWave implementation material is proprietary and available only under stated review/evaluation permissions. It expressly says that those permissions are not an open-source license.
6. **Apparent relationship:** Following the focused review, the retained prose is **purely factual/reference-only**, independently expressed explanation, ordinary identifiers/constants, or attributed MIT-derived lineage. Fifteen close, near-copied, or uncertain passage units were rewritten.
7. **Recommended treatment:** The reviewed MoreBC2 prose may remain within the owner's future documentation-license scope with source attribution. Explicitly exclude upstream ShockWave source, comments, implementation, and notice; the upstream file's terms remain controlling.
8. **Confidence:** High for the expression-level comparison performed against tagged `v31.1.0/src/pow.cpp`; medium on ultimate legal characterization, which only qualified counsel can provide.
9. **Uncertainty:** Future additions could recreate the issue. Do not import the upstream feature catalogue, source comments, or detailed control-rule expression without a new review.

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

### P-09 — MoreBC2 favicon with unresolved authorship record — resolved by exclusion

1. **Repository path and asset:** `public/favicon.svg` (entire four-line asset).
2. **Material type:** Original-appearing vector icon: a geometric “M” on a rounded square.
3. **Apparent upstream/rightsholder:** Unknown. The blob first appeared in feature-branch commit `fcda9e78dd8ac051d9db7801a665f0f6b22985b8` and entered `main` unchanged in squashed commit `4ffafd45670ae1557853251df30f7c34f9d3440f`; neither the file nor available history records an author, source, generator, or license.
4. **Upstream source:** None identifiable from the file or repository history.
5. **Apparent upstream license:** Unresolved.
6. **Apparent relationship:** **Visual/branding**; it appears customized for MoreBC2, but originality and rights cannot be inferred from appearance or filename.
7. **Recommended treatment:** **Exclude from MoreBC2 repository-level license** and replace with a newly created, rights-cleared asset before public release. Do not infer that Starlight owns it merely because it arrived in a scaffold commit.
8. **Confidence:** High that provenance is undocumented; low on actual authorship.
9. **Uncertainty:** No evidence in tracked history identifies whether it was hand-authored, generated, adapted, or supplied by a third party. The exclusion resolves the repository-license scope but not authorship.

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

1. **ShockWave:** The focused follow-up rewrote the 15 close, near-copied, or uncertain passage units as independently organized factual prose and original rights-boundary statements. The future documentation license must expressly exclude upstream ShockWave source, comments, implementation, and notice.
2. **MIT-derived source expression:** Substantial copied/adapted BitcoinII Core, Bitcoin Core, or DGW/Dash expression must retain the applicable copyright and MIT permission notice. A CC BY label should clearly exclude those portions or be accompanied by a compatible, accurate notice structure.
3. **Favicon:** Rights remain unresolved. Exclude `public/favicon.svg` from both repository licenses and replace it with a newly created, rights-cleared asset before publication.
4. **Service data:** Current records are bounded factual observations, not substantial datasets. Future redistribution of API bodies, market data, screenshots, or schemas requires service-specific review.
5. **Dependencies:** Package dependencies remain under their own licenses. Distribution obligations depend on the produced artifact, not solely on the lockfile.

No tracked material was conclusively identified as incompatible with the contemplated plan if the plan is limited to original MoreBC2 work and the exclusions/notices above are implemented. P-03 has been cleared by rewriting the affected MoreBC2 expression and excluding upstream material from the proposed license scope. P-09 has been cleared for licensing-structure purposes by excluding the unresolved asset, but the asset still must be replaced before publication.

## Recommended contents for a future `NOTICE`

A concise project-facing `NOTICE` could contain:

- MoreBC2 project identity and owner-approved copyright statement;
- a clear path-based split between original documentation and original software/tooling;
- a statement that third-party material and dependencies retain their own terms;
- top-level acknowledgements of BitcoinII Core, Bitcoin Core, and Dark Gravity Wave/Dash lineage;
- an explicit ShockWave file-specific rights boundary, without paraphrasing it as an open-source license;
- a pointer to `THIRD_PARTY_NOTICES.md` for detailed notices and exclusions;
- a trademark/non-affiliation statement approved by the owner; and
- a statement excluding the current favicon from the repository licenses until its required replacement is committed.

## Recommended contents for a future `THIRD_PARTY_NOTICES.md`

The detailed notices file could contain one section per provenance family:

1. BitcoinII Core MIT-covered source-derived material, with repository/tag, affected MoreBC2 paths, copyright notice, MIT text, and modifications/summary status.
2. Bitcoin Core-derived material, with the Bitcoin Core `v27.0` source reference and preserved MIT notice.
3. Dark Gravity Wave v3/Dash/Darkcoin-derived material, with exact revision and author attribution once established, plus MIT notice.
4. ShockWave proprietary source-review material, quoting or linking the controlling file notice only after legal review and listing excluded MoreBC2 passages or obtained permission.
5. Third-party data/API observations, identifying source services, dates, and whether only facts or any redistributable payload is included.
6. Assets and branding, recording the current favicon exclusion, its eventual replacement provenance, and any future screenshots/logos with explicit permissions.
7. Distributed npm/framework components, generated from the actual release artifact and containing required license texts/notices rather than an unreviewed dump of every lockfile entry.

## Owner/legal decisions still required

- Trace the exact Dark Gravity Wave v3 revision and attribution chain used by BitcoinII if a precise software-derived notice is desired.
- Replace the excluded `public/favicon.svg` with a newly created, rights-cleared asset and record its author, source, and applicable terms.
- Establish a policy for when source-atlas prose requires preservation of an upstream MIT notice.
- Decide whether and how to state trademark/non-affiliation language.
- Generate and review notices against the actual site/release artifact, especially for LGPL/MPL/transitive dependencies.
- Confirm that each contributor had authority to license their MoreBC2 contributions under the owner's selected structure.

## Readiness conclusion

The two focused licensing-scope blockers now have defined dispositions: P-03 was resolved by rewriting MoreBC2 expression and reserving upstream ShockWave material to its controlling terms; P-09 was resolved by excluding the unresolved favicon from the proposed licenses. The repository is ready for the owner to **draft and apply** a path-scoped CC BY 4.0 plus MIT structure if those exclusions and the third-party notices are implemented accurately. The current favicon must still be replaced before public release, and the remaining notice, contributor-authority, and artifact-specific dependency work identified above still requires owner review.
