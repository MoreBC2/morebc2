# Legal and reuse posture

**Category:** Project maintenance
**Status:** Blocking decision required
**Last reviewed:** 2026-09-07

## Summary

MoreBC2 does not currently have a repository `LICENSE` file. That is a blocker for public open-source release.

This audit does not select or recommend a specific license. Until the owner makes and implements the decision, readers and contributors must not assume permission to copy, redistribute, modify, or reuse repository content.

## Separate works and rights

MoreBC2 documentation and BitcoinII Core source code are separate works. A license applying to BitcoinII Core does not automatically license MoreBC2 documentation.

A repository-wide decision may also need to distinguish among:

- original MoreBC2 prose and code;
- quoted or adapted source material;
- algorithms or explanations derived from third-party implementations;
- screenshots, diagrams, logos, and branding;
- generated evidence inventories and captured metadata; and
- contributor submissions.

## Required owner decisions

Before changing repository visibility:

1. Choose and add the repository license or clearly defined license set.
2. Decide whether different content categories need separate terms.
3. Inventory third-party material and record required copyright and license notices.
4. Confirm that branding and logos may be distributed in the intended way.
5. Decide what contributor representation or sign-off is required for provenance and licensing.
6. Have the final files reviewed by an appropriately qualified person if legal certainty is needed.

## Attribution findings

Current documentation cites BitcoinII Core and upstream concepts extensively. The ShockWave documentation explicitly notes derivation in part from Dark Gravity Wave v3 concepts and code, but this repository does not yet contain a complete third-party attribution or notice inventory.

Source links are useful provenance, but links alone may not satisfy applicable license or attribution obligations. The owner should review copied snippets, quotations, algorithms, images, logos, and generated artifacts before public release.

## Related pages

- [Contributing guide](../CONTRIBUTING.md)
- [Project status](../PROJECT_STATUS.md)
- [Repository audit](AUDIT.md)
- [Owner review handoff](REVIEW_HANDOFF.md)
- [Open questions](verification/open-questions.md)

## Verification

**Status:** Blocking decision required
**Primary sources checked:** Repository root file inventory and current project documentation
**Notes:** This is a project risk record, not legal advice, and it deliberately does not choose a license.
