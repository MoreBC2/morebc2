# Stale wording scan

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page tracks the final stale wording scan before invite-only review.

The scan is meant to catch wording that sounds more complete, official, tested, active, or verified than the current evidence supports.

This page is a checklist and scan record. It is not BitcoinII protocol documentation.

## Scan goals

Before private review, search for wording that may imply:

- MoreBC2 is official BitcoinII documentation.
- Draft pages are complete.
- Source-reviewed commands are locally tested.
- Ecosystem resources are active without direct checks.
- Release binaries are verified without hashes/signatures.
- Source values from `main` automatically match the current release tag.
- Public APIs can replace running a local node for service workflows.
- BitcoinII uses unverified consensus behavior.

## Terms and phrases to scan

Search for these terms across the repository:

| Search term | Why it matters | Desired handling |
|---|---|---|
| `Verified` | Could be overused or too strong | Confirm each use is a status label, evidence level, or explicitly justified. |
| `official` | Could imply project endorsement | Only use with official source evidence. |
| `active` | Could imply live ecosystem status | Require direct check and date. |
| `recommended` | Could imply endorsement | Use only with evidence or clear context. |
| `safe` | Could imply security guarantee | Prefer specific tested context. |
| `tested` | Could imply local command record | Require command or review record. |
| `production` | Could imply deploy-ready guidance | Keep Draft unless tested and reviewed. |
| `exchange-grade` | Strong service claim | Use only for release/integration standards, not current status unless verified. |
| `public launch` | Avoid implying current readiness | Keep in blocker/readiness context only. |
| `copy/paste` | Command risk | Confirm examples are marked untested unless tested. |
| `active explorer` | Time-sensitive ecosystem claim | Require direct check. |
| `active pool` | Time-sensitive ecosystem claim | Require direct check. |
| `active exchange` | Time-sensitive ecosystem claim | Require direct check. |
| `Dark Gravity Wave` | Known risk of unsupported consensus claim | Keep as not implemented unless source proves otherwise. |

## Review checklist

For each flagged phrase, decide:

- Is the wording accurate for Draft/Partial status?
- Does the page have a verification block?
- Does the claim link to a source, test record, or verification tracker?
- Should the claim be softened?
- Should it move to Research, Discussion, History, or Verification?
- Should an open question be added?

## Initial scan record

This first pass checked the highest-risk orientation and review-policy pages by direct file review.

| Date | Search term / concern | Files checked | Issues found | Fix commit | Notes |
|---|---|---|---|---|---|
| 2026-06-30 | official / public-ready wording | `README.md`, `docs/README.md`, `PROJECT_STATUS.md`, `CONTRIBUTING.md`, `docs/REVIEW_HANDOFF.md`, `docs/LEGAL_REUSE.md` | No blocking issue found after recent wording updates | Earlier commits in review-prep pass | Current wording says MoreBC2 is not official and not public-ready. |
| 2026-06-30 | command tested / source-reviewed distinction | `README.md`, `docs/README.md`, `CONTRIBUTING.md`, `docs/verification/README.md` | No blocking issue found in orientation pages | Earlier commits in command-labeling pass | Orientation pages point readers to command-test status and warn source-reviewed does not mean locally tested. |
| 2026-06-30 | license / reuse assumptions | `README.md`, `docs/README.md`, `docs/LEGAL_REUSE.md`, `docs/REVIEW_HANDOFF.md` | No blocking issue found after legal/reuse note | Earlier legal/reuse commit | Current docs say private-review only until license decision. |
| 2026-06-30 | active ecosystem/API claims | `docs/ecosystem/README.md`, `docs/ecosystem/apis.md`, `docs/documentation/explorer-resources.md` | No blocking issue found in framework pages | Earlier API framework commit | Framework pages avoid listing live services as active. |

## Still to scan

The orientation pages are in decent shape.

Still scan next:

- Source Atlas pages with `Reviewed` status.
- Exchange/service pages for `recommended`, `production`, and confirmation wording.
- Wallet pages for sensitive command wording.
- Mining pages for unverified pool/software wording.
- Ecosystem listing pages for active/recommended language.

## Known acceptable uses

Some terms are acceptable in limited contexts:

- `Verified` in evidence/status definitions.
- `official` when saying MoreBC2 is **not** official.
- `active` when describing an active chain or active tip in consensus architecture.
- `safe` when saying a workflow is **not** yet safe to publish or needs testing.
- `public launch` in readiness/blocker pages.

## Next actions

1. Continue targeted scans in exchange, wallet, mining, and ecosystem pages.
2. Update any overconfident wording.
3. Record fixes in this page.
4. Update documentation coverage after the scan.

## Related pages

- [Private review handoff](../REVIEW_HANDOFF.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Command example scan](command-example-scan.md)
- [Command testing status](command-testing.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 review workflow, coverage dashboard, and initial high-risk orientation pages
**Notes:** This page now records an initial targeted stale-wording pass. More page groups still need scanning before private review.
