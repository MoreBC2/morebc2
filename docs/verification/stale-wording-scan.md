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

| Date | Search term / concern | Files checked | Issues found | Fix commit | Notes |
|---|---|---|---|---|---|
| 2026-06-30 | official / public-ready wording | `README.md`, `docs/README.md`, `PROJECT_STATUS.md`, `CONTRIBUTING.md`, `docs/REVIEW_HANDOFF.md`, `docs/LEGAL_REUSE.md` | No blocking issue found after recent wording updates | Earlier commits in review-prep pass | Current wording says MoreBC2 is not official and not public-ready. |
| 2026-06-30 | command tested / source-reviewed distinction | `README.md`, `docs/README.md`, `CONTRIBUTING.md`, `docs/verification/README.md` | No blocking issue found in orientation pages | Earlier commits in command-labeling pass | Orientation pages point readers to command-test status and warn source-reviewed does not mean locally tested. |
| 2026-06-30 | license / reuse assumptions | `README.md`, `docs/README.md`, `docs/LEGAL_REUSE.md`, `docs/REVIEW_HANDOFF.md` | No blocking issue found after legal/reuse note | Earlier legal/reuse commit | Current docs say private-review only until license decision. |
| 2026-06-30 | active ecosystem/API claims | `docs/ecosystem/README.md`, `docs/ecosystem/apis.md`, `docs/documentation/explorer-resources.md` | No blocking issue found in framework pages | Earlier API framework commit | Framework pages avoid listing live services as active. |
| 2026-06-30 | exchange/service command and confirmation wording | `docs/exchange/deposit-monitoring.md`, `docs/exchange/service-integration-checklist.md` | Deposit-monitoring page needed clearer command-test link and current observed source-link cleanup | `8e7c539` | Deposit commands now labeled as placeholder examples and linked to command-testing status. Source links now use current observed repository path with canonical-path caveat. |
| 2026-06-30 | wallet sensitive-command wording | `docs/wallets/wallet-guide.md` | No blocking issue found | No change | Wallet guide already labels wallet commands as untested and cautions sensitive/state-changing commands. |
| 2026-06-30 | mining pool/software and DGW wording | `docs/mining/mining-overview.md` | No blocking issue found | No change | Mining overview explicitly avoids DGW, pool, miner software, profitability, and tested-command claims. |
| 2026-06-30 | ecosystem active/official/recommended wording | `docs/ecosystem/explorers.md`, `docs/ecosystem/mining-pools.md`, `docs/ecosystem/exchanges.md`, `docs/ecosystem/wallets.md` | Wallet ecosystem page had stale release path and stale release-process link | `c109759` | Wallet listing now distinguishes current observed release URL from legacy/redirected URL and links release verification pages. Other ecosystem listing pages remained conservative. |
| 2026-06-30 | node/config/RPC source-link path check | `docs/nodes/node-guide.md`, `docs/configuration/configuration-overview.md`, `docs/configuration/rpc-configuration.md` | Older repository source links found and updated | `8e4a749`, `062686f`, `b1272f8` | Links now use current observed repository path and include canonical-path caveats. |
| 2026-06-30 | old repository path search | repository search for `BitcoinII-Dev/BitcoinII` | No remaining matches returned by repository search after updates | No further change | This does not prove every external link is perfect, but the known old path no longer appears in search results. |

## Still to scan

The orientation, exchange, wallet, mining, ecosystem framework/listing, node, configuration, and RPC configuration pages are in decent shape after this pass.

Still scan next:

- Source Atlas pages with `Reviewed` status.
- Developer workflow pages for outdated release or command wording.
- Any remaining command blocks found by repository search.

## Known acceptable uses

Some terms are acceptable in limited contexts:

- `Verified` in evidence/status definitions.
- `official` when saying MoreBC2 is **not** official.
- `active` when describing an active chain or active tip in consensus architecture.
- `safe` when saying a workflow is **not** yet safe to publish or needs testing.
- `public launch` in readiness/blocker pages.

## Next actions

1. Continue command-example scan across remaining command blocks.
2. Scan Source Atlas pages with `Reviewed` status for overconfident labels or stale source-ref wording.
3. Scan developer workflow pages for stale command/release wording.
4. Update documentation coverage after each scan batch.

## Related pages

- [Private review handoff](../REVIEW_HANDOFF.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Command example scan](command-example-scan.md)
- [Command testing status](command-testing.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 review workflow, coverage dashboard, targeted orientation/exchange/wallet/mining/ecosystem pages, node/configuration pages, and old-path repository search
**Notes:** This page now records targeted stale-wording passes through the main private-review orientation, user/service-facing framework pages, and known old repository path checks. Source Atlas and developer workflow pages still need scanning before private review.
