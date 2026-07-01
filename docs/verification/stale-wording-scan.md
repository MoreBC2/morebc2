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

## Scan record

Use this table during the actual scan.

| Date | Search term | Files checked | Issues found | Fix commit | Notes |
|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD |

## Known acceptable uses

Some terms are acceptable in limited contexts:

- `Verified` in evidence/status definitions.
- `official` when saying MoreBC2 is **not** official.
- `active` when describing an active chain or active tip in consensus architecture.
- `safe` when saying a workflow is **not** yet safe to publish or needs testing.
- `public launch` in readiness/blocker pages.

## Next actions

1. Run repository searches for the terms above.
2. Update any overconfident wording.
3. Record fixes in this page.
4. Update documentation coverage after the scan.

## Related pages

- [Private review handoff](../REVIEW_HANDOFF.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Command testing status](command-testing.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 review workflow and coverage dashboard
**Notes:** This page defines the stale wording scan checklist. The scan itself still needs to be run and recorded.
