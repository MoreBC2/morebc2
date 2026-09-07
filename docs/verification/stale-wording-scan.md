# Stale wording scan

**Category:** Verification
**Status:** Archived project-management history
**Last reviewed:** 2026-07-04

> Archived: this is a dated scan log. Its recorded findings are historical and its former readiness recommendations are not current.

## Summary

This page tracks stale wording scans before invite-only review.

The scan is meant to catch wording that sounds more complete, official, tested, active, or verified than the current evidence supports.

This page is a checklist and scan record. It is not BitcoinII protocol documentation.

## Scan goals

Before private review, search for wording that may imply:

- MoreBC2 is official BitcoinII documentation.
- Draft pages are complete.
- Source-reviewed commands are locally tested.
- Ecosystem resources are active without direct checks.
- Release files are verified without direct review.
- Source values from `main` automatically match the current release tag.
- Public APIs can replace running a local node for service workflows.
- BitcoinII uses unverified consensus behavior.

## Terms and phrases to scan

| Search term | Why it matters | Desired handling |
|---|---|---|
| `Verified` | Could be overused or too strong | Confirm each use is a status label, evidence level, or explicitly justified. |
| `official` | Could imply project endorsement | Only use with source evidence or when saying MoreBC2 is not official. |
| `active` | Could imply live ecosystem status | Require direct check and date when used for services. |
| `recommended` | Could imply endorsement | Use only with evidence or clear planning context. |
| `safe` | Could imply security guarantee | Prefer specific tested context or caution wording. |
| `tested` | Could imply local command record | Require command or review record. |
| `production` | Could imply deploy-ready guidance | Keep Draft unless tested and reviewed. |
| `exchange-grade` | Strong service claim | Use only for standards, not current status unless checked. |
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
| 2026-06-30 | exchange/service command and confirmation wording | `docs/exchange/deposit-monitoring.md`, `docs/exchange/service-integration-checklist.md` | Deposit-monitoring page needed clearer command-test link and current observed source-link cleanup | `8e7c539` | Deposit commands now labeled as placeholder examples and linked to command-testing status. |
| 2026-06-30 | wallet sensitive-command wording | `docs/wallets/wallet-guide.md` | No blocking issue found | No change | Wallet guide already labels wallet commands as untested and cautions sensitive/state-changing commands. |
| 2026-06-30 | mining pool/software and DGW wording | `docs/mining/mining-overview.md` | No blocking issue found | No change | Mining overview explicitly avoids DGW, pool, miner software, profitability, and tested-command claims. |
| 2026-06-30 | ecosystem active/official/recommended wording | `docs/ecosystem/explorers.md`, `docs/ecosystem/mining-pools.md`, `docs/ecosystem/exchanges.md`, `docs/ecosystem/wallets.md` | Wallet ecosystem page had stale release path and stale release-process link | `c109759` | Wallet listing now distinguishes current observed release URL from legacy/redirected URL and links release verification pages. |
| 2026-06-30 | node/config/RPC source-link path check | `docs/nodes/node-guide.md`, `docs/configuration/configuration-overview.md`, `docs/configuration/rpc-configuration.md` | Older repository source links found and updated | `8e4a749`, `062686f`, `b1272f8` | Links now use current observed repository path and include canonical-path caveats. |
| 2026-06-30 | old repository path search | repository search for `BitcoinII-Dev/BitcoinII` | No remaining matches returned by repository search after updates | No further change | Search results are useful but not as strong as a local grep. |
| 2026-06-30 | developer workflow wording | `docs/developers/local-development.md`, `docs/developers/build-system.md`, `docs/developers/testing.md`, `docs/developers/release-verification.md`, `docs/developers/release-process.md` | Release-process page had stale release list and old release path | `a5aaf58` | Developer workflow pages keep build, test, and release-check examples unverified. |
| 2026-06-30 | Source Atlas chain parameters and PoW wording | `docs/developers/source-atlas/chainparams-cpp.md`, `docs/developers/source-atlas/pow-cpp.md` | Chainparams had stale BIP9 warning height and stale chain-data snapshot values; PoW needed current source links and release-comparison note | `df138fa`, `72b0e75` | Chainparams now labels snapshot-style fields by source version and records `v29.1.0` values. PoW now links current observed source and keeps DGW unsupported. |
| 2026-07-01 | Source Atlas cleanup | targeted Source Atlas pages | Known old source path and stale BIP9 value searches returned no results after targeted cleanup | Recent Source Atlas cleanup commits | Updated wallet, RPC, startup, mempool, miner, hash, and block primitive pages with current observed source links and release-versus-main open items. |
| 2026-07-02 | Status-label and too-strong verified wording | release, project overview, what-is, dashboard, evidence, mining, checkpoint docs | Several headings and labels sounded stronger than evidence supported | Multiple cleanup commits | Reworded headings from verified/current-style claims to source-backed or observed wording. |
| 2026-07-02 | Command/example safety audit follow-up | `docs/developers/rpc-overview.md`, `docs/configuration/configuration-overview.md`, `STYLE_CONVENTIONS.md` | No high-priority unsafe examples found; several headings/examples needed clearer untested/source-observed framing | `45b2d436`, `2b9678f`, `7cae416` | RPC/config headings now avoid Verified wording. Style conventions now say illustrative commands are untested unless a test record exists. |
| 2026-07-02 | Release page recheck wording | `docs/documentation/releases.md`, `docs/developers/release-verification.md` | Release page showed v29.1.0 with GitHub Latest marker, but visible timestamp lacked year and asset names/checksums/signatures were incomplete | `2ad1838`, `0a2e384` | Current release-page observations are recorded without inferring exact year. Binary/release artifact verification remains incomplete. |
| 2026-07-02 | Network/P2P first-pass navigation | Source Atlas, coverage, architecture, reading-order, repo-map, source-tree pages | New network source slices needed to be visible without implying live testing or final protocol specification | Recent network navigation commits | Navigation now links source-observed slices and keeps caveats around release comparison and live tests. |
| 2026-07-02 | Network specifications stale values and old path | `docs/documentation/network-specifications.md` | Page still had old repository path and stale chain-data/BIP9 values | `24dbf62` | Updated source links, corrected `MinBIP9WarningHeight`, updated moving chain-data values, added network Source Atlas links, and kept Needs Review status. |
| 2026-07-04 | Release and ecosystem framework catch-up | `docs/documentation-coverage.md`, `PROJECT_STATUS.md`, `docs/verification/known-unknowns.md`, `docs/verification/open-questions.md`, `docs/verification/README.md`, ecosystem pages, release docs | Dashboards needed synchronization after latest release inventory and ecosystem direct-check planning work | `ccbd224`, `21484d2`, `46ad5d9`, `1714923` | Coverage, status, known unknowns, and open questions now point toward actual blockers instead of more broad framework deepening. |
| 2026-07-04 | Targeted repository search attempt | searches for `active`, `official`, `tested`, `Verified`, `BitcoinII-Dev/BitcoinII`, and combined release/status terms | GitHub search returned no matches for those targeted terms in the repo search interface | No content fix from search | Treat this as a weak scan only. A local grep or more reliable code search is still recommended before broad review. |
| 2026-08-27 | Canonical-source, release, and RPC factual synchronization | source registry; reader-critical documentation, node, exchange, developer, and verification/status pages; local full-checkout search | 46 legacy-repository-path occurrences included stale operational links, historical evidence, and search/audit records; exchange material still documented an older release and presented generated RPC material without the dated runtime distinction | `docs/factual-synchronization` working branch | Operational links now use `Bitcoin-II/BitcoinII-Core`; `v29.1.0` is the current documented release; 12 legacy-path occurrences remain only as explicitly historical, redirected, archived-audit, or search-needle context; RPC wording separates inherited/generated `8332`, the local `v29.1.0` Windows/mainnet `8337` observation, and unresolved universal behavior. No page status label was changed. |

## Still to scan

The main orientation, service-facing, developer workflow, Source Atlas source-link cleanup, status-label cleanup, network-navigation refresh, network-specification cleanup, release cleanup, and ecosystem framework cleanup passes are now in decent shape.

Still scan next:

- Remaining command-shaped examples across the repo.
- Release asset pages once full artifact data is captured.
- Ecosystem pages after live checks begin.
- Remaining old-path references with a stronger local grep or export-based search.

## Known acceptable uses

Some terms are acceptable in limited contexts:

- `Verified` in evidence/status definitions.
- `official` when saying MoreBC2 is **not** official.
- `active` when describing an active chain or active tip in architecture, or in ecosystem-check labels with dated evidence.
- `safe` when saying a workflow is **not** yet safe to publish or needs testing.
- `public launch` in readiness/blocker pages.

## Next actions

1. Run a stronger local grep or repository export search when available.
2. Start the first narrow private-review assignment.
3. Continue release asset inventory when artifact data is available.
4. Continue ecosystem checks when live service review is requested.

## Related pages

- [Private review handoff](../REVIEW_HANDOFF.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Command example scan](command-example-scan.md)
- [Command testing status](command-testing.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Ecosystem direct check plan](ecosystem-direct-check-plan.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 review workflow, coverage dashboard, targeted orientation/exchange/wallet/mining/ecosystem pages, release docs, ecosystem direct-check framework, node/configuration pages, repository search attempts, developer workflow pages, Source Atlas source-ref scan, recent network Source Atlas/navigation pages, and network specifications page
**Notes:** This page records targeted stale-wording passes. The latest catch-up scan used GitHub repository search and should be followed later by a stronger local grep or repository export search.
