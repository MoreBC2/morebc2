# Release asset inventory attempt

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page records the current attempt status for capturing the full `v29.1.0` release asset inventory.

It is not a completed asset inventory and not a binary verification record.

## Target

Target release:

- Repository path observed: `Bitcoin-II/BitcoinII-Core`
- Release tag observed: `v29.1.0`
- Release title observed: `BitcoinII Core v29.1.0`
- Release page path observed: `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v29.1.0`

## Current inventory status

| Item | Status | Notes |
|---|---|---|
| Release page path | Partial | Public path observed during earlier release-page recheck. Canonical status still needs confirmation. |
| Release title | Partial | `BitcoinII Core v29.1.0` observed. |
| Latest marker | Partial | GitHub `Latest` marker observed during earlier recheck. |
| Asset count | Partial | Rendered page showed 12 assets. |
| Full asset names | Needs Review | Not captured yet. |
| Asset sizes | Needs Review | Not captured yet. |
| Asset URLs | Needs Review | Not captured yet. |
| Checksum manifest | Needs Review | Not confirmed. |
| Signature file | Needs Review | Not confirmed. |
| Trusted release key source | Needs Review | Not confirmed. |
| Downloaded files | Not done | MoreBC2 has not downloaded release assets. |
| Calculated hashes | Not done | MoreBC2 has not calculated SHA256 hashes for release assets. |
| Signature checks | Not done | MoreBC2 has not checked detached signatures. |

## Attempt notes

The earlier unauthenticated rendered GitHub release page review showed a 12-asset count but did not expose the full asset names in the captured material.

A complete inventory still needs a method that can capture the release asset list directly, such as:

- GitHub API release metadata,
- authenticated GitHub release page view,
- maintainer-provided asset list,
- or a manual browser capture with names, sizes, and URLs recorded.

## Required inventory fields

When the full asset inventory is captured, record:

| Field | Required |
|---|---|
| Asset name | Yes |
| Asset size | Yes |
| Browser/API URL captured | Yes |
| Platform | Yes, if inferable from name or release metadata |
| Type | GUI, CLI, source archive, checksum, signature, other |
| Checksum file relationship | Yes, if a checksum file exists |
| Signature relationship | Yes, if a signature file exists |
| Notes | Always |

## Draft inventory table

| Asset name | Size | Platform | Type | URL captured | Notes |
|---|---:|---|---|---|---|
| TBD | TBD | TBD | TBD | No | Full asset list still needs capture. |

## What to avoid

Do not:

- infer current `v29.1.0` asset names from legacy release asset names,
- treat the 12-asset count as a complete inventory,
- treat a workflow artifact as a release asset unless it is attached to the release page,
- claim checksum or signature files exist until they are observed,
- download or run binaries as part of inventory capture unless explicitly assigned,
- mark release assets verified from inventory alone.

## Next steps

1. Capture the full release asset list for `v29.1.0`.
2. Update [Release artifact checklist](release-artifact-checklist.md) with asset names, sizes, and URLs.
3. Identify whether checksum and signature files are present.
4. Record trusted key-source gaps separately.
5. Only after inventory is complete, decide whether a safe hash-check pass should be run.

## Related pages

- [BitcoinII releases](../documentation/releases.md)
- [Release verification guide](../developers/release-verification.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release source comparison notes](release-source-comparison.md)
- [Open questions backlog](open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Existing release-page observations and release artifact checklist
**Notes:** This page records the inventory gap and the method needed to close it. It does not verify assets, hashes, signatures, or release authenticity.
