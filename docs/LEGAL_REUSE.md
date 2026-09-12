# Legal and reuse posture

**Category:** Project maintenance  
**Status:** Reviewed / Licensing package implemented  
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 has a path-scoped licensing package. Original MoreBC2 documentation is licensed under CC BY 4.0; original MoreBC2 software, site tooling, configuration, tests, and rights-cleared assets are licensed under MIT. Third-party material is excluded from those grants and remains under its applicable terms.

The repository is now public and the generated documentation site is deployed. Earlier wording that treated repository visibility and initial site publication as future events is obsolete.

See the repository `LICENSE`, `NOTICE`, and `THIRD_PARTY_NOTICES.md`. Those files implement the licensing structure; this page summarizes the project-maintenance posture and is **not legal advice**.

## Separate works and rights

MoreBC2 documentation and BitcoinII Core source code are separate works. A license applying to BitcoinII Core does not automatically license MoreBC2 documentation, and MoreBC2's licenses do not relicense upstream BitcoinII Core material.

The licensing map distinguishes among:

- original MoreBC2 prose and code;
- quoted or adapted source material;
- factual explanations derived from third-party implementations;
- algorithms/source comments subject to upstream terms;
- screenshots, diagrams, logos, and branding;
- generated evidence inventories and captured metadata;
- package-manager dependencies; and
- contributor submissions.

## Current publication state

The tracked source repository and generated documentation site are public/deployed.

That changes the maintenance question from “is it ready to become public?” to “does newly added or redistributed material continue to fit the implemented license/notice structure?”

The current deployment does not eliminate the need for ongoing provenance review. A public artifact may contain third-party dependency output or generated material that is not obvious from the Markdown/source tree alone.

## Current owner/maintainer responsibilities

Ongoing review should cover:

1. contributor authority for newly submitted original material;
2. copied/adapted source passages and whether attribution/license treatment remains correct;
3. new images, logos, screenshots, fonts, code snippets, or other third-party assets;
4. changes to `LICENSE`, `NOTICE`, or `THIRD_PARTY_NOTICES.md` when the repository's material mix changes;
5. dependency/license notices for any newly distributed downloadable build or artifact where required;
6. legal review by an appropriately qualified person if legal certainty is needed.

The current project-maintenance documents are not a substitute for legal advice.

## ShockWave / BitcoinII source boundary

The provenance audit specifically reviewed MoreBC2's ShockWave descriptions after current BitcoinII Core source exposed separate terms for original ShockWave implementation material.

MoreBC2 should continue to:

- report technical facts in independent explanatory prose;
- cite release-pinned upstream source;
- avoid copying/relicensing proprietary source comments or implementation text;
- preserve applicable MIT lineage/attribution where MoreBC2 substantially adapts MIT-licensed source expression;
- review new close paraphrases rather than assuming an existing source link resolves the rights question.

See [Third-party provenance audit](THIRD_PARTY_PROVENANCE_AUDIT.md).

## Site/build artifact boundary

The public documentation site is generated from repository source plus package dependencies.

The repository-level notices describe the source/repository licensing structure. If MoreBC2 later distributes a downloadable site bundle, packaged application, binary, or other generated artifact as a release product, dependency and notice obligations should be reviewed against **that exact artifact**.

Ordinary Cloudflare Pages deployment is project publication infrastructure; it does not make all dependency code MoreBC2-owned or relicense third-party packages.

## Security/privacy boundary

Security reporting and licensing are separate concerns.

GitHub Private Vulnerability Reporting is enabled/verified for MoreBC2, and `SECURITY.md` provides the current reporting route. That does not affect upstream BitcoinII Core ownership/licensing or make MoreBC2 the upstream security authority.

Historical privacy/path cleanup likewise does not rewrite old Git history; the current tree is the relevant publishable state.

## Attribution findings

Current documentation cites BitcoinII Core and upstream concepts extensively. The provenance audit and `THIRD_PARTY_NOTICES.md` record identified BitcoinII Core, Bitcoin Core, Dark Gravity Wave / Dash / Darkcoin, ShockWave, service, dependency, and asset boundaries.

Source links are useful provenance, but links alone may not satisfy every applicable license or attribution obligation. New copied snippets, quotations, algorithms, images, logos, generated artifacts, and substantial adaptations should be reviewed on their own facts.

## Related pages

- [Third-party provenance audit](THIRD_PARTY_PROVENANCE_AUDIT.md)
- [Repository audit](AUDIT.md)
- [Ongoing review handoff](REVIEW_HANDOFF.md)
- [Project status](../PROJECT_STATUS.md)
- [Contributing guide](../CONTRIBUTING.md)
- [Documentation coverage](documentation-coverage.md)

## Verification

**Status:** Reviewed / Licensing package implemented  
**Primary sources checked:** Current public/deployed project state, repository licensing/notice structure, provenance audit, security/publication state, and current project-maintenance documentation  
**Notes:** This is a project risk/reuse record, not legal advice or a warranty that every possible downstream use satisfies every jurisdiction's requirements.
