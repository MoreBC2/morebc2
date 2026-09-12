# History

**Category:** History  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This section preserves dated BitcoinII (BC2) history without turning old observations into current operational documentation.

Historical material is useful for understanding releases, repository lineage, protocol milestones, service changes, and documentation provenance. It must remain clearly separated from current network status and from MoreBC2's current `v31.1.0` technical baseline.

## Current pages

`docs/history/` contains **2 Markdown pages**:

- [BitcoinII timeline](timeline.md)
- this section index.

## Current historical anchors

The strongest currently recorded anchors include:

- the genesis timestamp text and mainnet genesis parameters in current BitcoinII Core source;
- legacy `v0.27.x` release observations from the earlier `BitcoinII-Dev/BitcoinII` repository;
- the `v29.1.0` BitcoinII Core release published in November 2025;
- the `v31.1.0` BitcoinII Core release published 2026-08-29;
- the September 2026 addition of the two macOS `v31.1.0` release assets.

The timeline does not treat an old repository, explorer, pool, exchange, wallet, or configuration value as current merely because it was once observed.

## Evidence rules

- Date historical claims whenever the source supports a date.
- Prefer release pages, release-pinned source, repository history, archived official material, and dated direct observations.
- Label legacy repository paths as historical rather than canonical-current.
- Do not rewrite dated evidence records to newer release versions.
- Current service availability belongs in Ecosystem/Infrastructure with a fresh check date.
- Current protocol behavior belongs in Documentation / Architecture / Source Atlas.
- Historical milestones should not imply endorsement, continuity of operation, or current compatibility.
- When a historical source conflicts with current source, preserve both with their time/version context instead of silently merging them.

## 2026-09-12 section audit

Both History pages were reviewed against the current BitcoinII Core repository/release path and MoreBC2's completed v31 release/source audits.

The main repairs were to:

- distinguish the **2024-12-04 newspaper date embedded in the genesis message** from the actual genesis block timestamp encoded in current source;
- add the current `v29.1.0` and `v31.1.0` release milestones;
- preserve the old `v0.27.x` entries as legacy-repository history rather than presenting the legacy repository as the current release source;
- make the current/history boundary explicit.

## Related pages

- [BitcoinII timeline](timeline.md)
- [Current releases](../releases/README.md)
- [Network specifications](../documentation/network-specifications.md)
- [Project overview](../documentation/project-overview.md)
- [Ecosystem](../ecosystem/README.md)
- [Verification evidence index](../verification/verification-index.md)
- [Source registry](../../SOURCE_REGISTRY.md)

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Current BitcoinII Core `v31.1.0` source/release metadata, current release documentation, and preserved legacy release observations  
**Notes:** The existing timeline is now version-scoped and current enough for the recorded milestones. A comprehensive first-website, first-explorer, first-pool, exchange-listing, and community-event chronology still requires separate dated-source research.
