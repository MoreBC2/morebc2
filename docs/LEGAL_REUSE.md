# Legal and reuse posture

**Category:** Project maintenance
**Status:** Licensing package implemented; owner review required
**Last reviewed:** 2026-09-08

## Summary

MoreBC2 now has a path-scoped licensing package. Original MoreBC2 documentation is licensed under CC BY 4.0; original MoreBC2 software, site tooling, configuration, tests, and rights-cleared assets are licensed under MIT. Third-party material is excluded from those grants and remains under its applicable terms.

See the repository [`LICENSE`](https://github.com/MoreBC2/morebc2/blob/main/LICENSE), [`NOTICE`](https://github.com/MoreBC2/morebc2/blob/main/NOTICE), and [`THIRD_PARTY_NOTICES.md`](https://github.com/MoreBC2/morebc2/blob/main/THIRD_PARTY_NOTICES.md). These files implement the licensing structure; this page records remaining risk and review items and is not legal advice.

## Separate works and rights

MoreBC2 documentation and BitcoinII Core source code are separate works. A license applying to BitcoinII Core does not automatically license MoreBC2 documentation.

The licensing map distinguishes among:

- original MoreBC2 prose and code;
- quoted or adapted source material;
- algorithms or explanations derived from third-party implementations;
- screenshots, diagrams, logos, and branding;
- generated evidence inventories and captured metadata; and
- contributor submissions.

## Remaining owner decisions

Before changing repository visibility, the owner still needs to:

1. Confirm that contributors had authority to license their original contributions under the applicable repository license.
2. Review the treatment of mixed/source-derived material and unresolved provenance items in the completed audit.
3. Generate and review dependency notices against the actual artifact that will be distributed.
4. Approve the controlled publication sequence in [`SECURITY.md`](https://github.com/MoreBC2/morebc2/blob/main/SECURITY.md), including immediate post-visibility enablement and verification of Private Vulnerability Reporting before active announcement or promotion.
5. Have the final package reviewed by an appropriately qualified person if legal certainty is needed.

## Attribution findings

Current documentation cites BitcoinII Core and upstream concepts extensively. The provenance audit and `THIRD_PARTY_NOTICES.md` record the BitcoinII Core, Bitcoin Core, Dark Gravity Wave / Dash / Darkcoin, ShockWave, service, dependency, and asset boundaries identified so far.

Source links are useful provenance, but links alone may not satisfy applicable license or attribution obligations. The owner should review copied snippets, quotations, algorithms, images, logos, and generated artifacts before public release.

## Related pages

- [Contributing guide](../CONTRIBUTING.md)
- [Project status](../PROJECT_STATUS.md)
- [Repository audit](AUDIT.md)
- [Owner review handoff](REVIEW_HANDOFF.md)
- [Open questions](verification/open-questions.md)

## Verification

**Status:** Owner review required
**Primary sources checked:** Repository root file inventory and current project documentation
**Notes:** This is a project risk record, not legal advice. The repository licensing package is implemented, but owner review and the remaining items above are still required before publication.
