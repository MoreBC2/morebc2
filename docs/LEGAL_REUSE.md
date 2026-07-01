# Legal and reuse posture

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page records the current legal/reuse posture for MoreBC2 before private review.

MoreBC2 does not currently have a repository license file.

Until a license is chosen, treat MoreBC2 as private-review material only.

## Current posture

Current status:

- No `LICENSE` file was found in the MoreBC2 repository during this check.
- MoreBC2 is not ready to be presented as open licensed public documentation.
- Private reviewers may read and comment on the repository if invited.
- Reviewers should not redistribute, mirror, republish, or reuse large portions of MoreBC2 unless the repository owner explicitly allows it.

## Important distinction

MoreBC2 documentation and BitcoinII Core source code are different works.

BitcoinII Core may have its own license inherited from or based on upstream source code.

MoreBC2 still needs its own documentation/repository license decision.

Do not assume BitcoinII Core's software license automatically defines MoreBC2's documentation license.

## Before broader sharing

Before MoreBC2 is shared beyond trusted private review, decide one of these paths:

### Option A: Private review only

Use this if the repo should stay private while the documentation matures.

Recommended note:

```md
This repository is shared for private review only. No public reuse or redistribution is granted until a license is added.
```

### Option B: Open documentation license

Use this if the goal is public community documentation.

Possible license families to consider later:

- Creative Commons documentation license.
- MIT-style documentation/project license.
- Another license chosen by the repository owner after review.

MoreBC2 should not pick a license by accident. The repository owner should decide intentionally.

### Option C: Mixed licensing

Use this if MoreBC2 includes different content types that need different treatment, such as:

- Original documentation.
- Source-code excerpts.
- Screenshots.
- Logos or branding assets.
- Third-party quotes.
- Generated diagrams.

This may require clearer attribution and reuse rules.

## Recommended private-review wording

Until a license is added, use this wording in private-review invitations:

```md
MoreBC2 is shared with you for private review only. Please do not redistribute, mirror, republish, or reuse substantial portions unless Daniel explicitly gives permission or a repository license is added later.
```

## Open items

- Decide whether to add a repository `LICENSE` file before private review.
- Decide whether documentation should use a Creative Commons style license or a software-style license.
- Decide whether logos, screenshots, or third-party materials need separate attribution rules.
- Decide whether contributor submissions need a simple contributor-license statement.
- Decide whether public issues/PRs should be enabled before or after the license decision.

## Related pages

- [Private review handoff](REVIEW_HANDOFF.md)
- [Documentation coverage](documentation-coverage.md)
- [Contributing guide](../CONTRIBUTING.md)
- [Open questions backlog](verification/open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** MoreBC2 repository file check for `LICENSE`
**Notes:** No legal advice is provided here. This page is a project-management note to avoid accidental public-reuse assumptions before a license decision.
