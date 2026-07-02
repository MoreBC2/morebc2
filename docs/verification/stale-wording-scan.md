# Stale wording scan

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-02

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
- Release files are verified without direct review.
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
| 2026-06-30 | old repository path search | repository search for `BitcoinII-Dev/BitcoinII` | No remaining matches returned by repository search after updates | No further change | This does not prove every external link is perfect, but the known old path no longer appeared in search results at that time. |
| 2026-06-30 | developer workflow wording | `docs/developers/local-development.md`, `docs/developers/build-system.md`, `docs/developers/testing.md`, `docs/developers/release-verification.md`, `docs/developers/release-process.md` | Release-process page had stale release list and old release path | `a5aaf58` | Developer workflow pages keep build, test, and release-check examples unverified. Release-process page now points to current observed release path and release tracking pages. |
| 2026-06-30 | Source Atlas chain parameters and PoW wording | `docs/developers/source-atlas/chainparams-cpp.md`, `docs/developers/source-atlas/pow-cpp.md` | Chainparams had stale BIP9 warning height and stale chain-data snapshot values; PoW needed current source links and release-comparison note | `df138fa`, `72b0e75` | Chainparams now labels snapshot-style fields by source version and records `v29.1.0` values. PoW now links current observed source and keeps DGW unsupported. |
| 2026-06-30 | Source Atlas mempool helper pages | `docs/developers/source-atlas/disconnected-transactions.md`, `docs/developers/source-atlas/mempool-entry.md` | Both pages had old source links; mempool-entry first edit was blocked, then completed with softened wording | `433ac2a`, `ef84bd0` | Source links now use current observed repository path. Both pages keep Draft status and add release-versus-main comparison as an open item. |
| 2026-06-30 | Source Atlas transaction and block lifecycle pages | `docs/developers/source-atlas/transaction-consensus.md`, `docs/developers/source-atlas/block-acceptance.md` | Both pages had source lists without current observed repository links and lacked release-versus-main open items | `07b96c6`, `3ba46fc` | Source links now use current observed repository path. Both pages keep Draft status and add release-versus-main comparison as an open item. |
| 2026-06-30 | Source Atlas validation interface and block storage pages | `docs/developers/source-atlas/validation-interface.md`, `docs/developers/source-atlas/block-storage.md` | Both pages had plain source lists and lacked release-versus-main open items; validation-interface first edit was blocked, then completed with softer event wording | `91a5e00`, `5a2344d` | Source links now use current observed repository path. Both pages keep Draft status and add release-versus-main comparison as an open item. |
| 2026-07-01 | Source Atlas remaining source-link cleanup | `docs/developers/source-atlas/*` targeted pages | Known old source path and stale BIP9 value searches returned no results after targeted cleanup | Recent Source Atlas cleanup commits | Updated remaining wallet, RPC, startup, mempool, miner, hash, and block primitive pages with current observed source links and release-versus-main open items. |
| 2026-07-02 | Status-label and too-strong verified wording | `docs/documentation/releases.md`, `docs/developers/release-verification.md`, `docs/documentation/project-overview.md`, `docs/documentation/what-is-bitcoinii.md`, `docs/verification/dashboard.md`, `EVIDENCE_SCALE.md`, `docs/mining/mining-overview.md`, `docs/documentation/checkpoints.md` | Several headings and labels sounded stronger than the evidence supported | Multiple 2026-07-02 cleanup commits | Reworded headings from verified/current-style claims to source-backed or observed wording. Release pages now avoid inferring exact release year from partial rendered timestamp. |
| 2026-07-02 | Command/example safety audit follow-up | `docs/developers/rpc-overview.md`, `docs/configuration/configuration-overview.md`, `STYLE_CONVENTIONS.md` | No high-priority unsafe examples found; several headings/examples needed clearer untested/source-observed framing | `45b2d436`, `2b9678f`, `7cae416` | RPC/config headings now avoid Verified wording. Style conventions now say illustrative commands are untested unless a test record exists. |
| 2026-07-02 | Release page recheck wording | `docs/documentation/releases.md`, `docs/developers/release-verification.md` | Release page showed v29.1.0 with GitHub Latest marker, but visible timestamp lacked year and asset names/checksums/signatures were incomplete | `2ad1838`, `0a2e384` | Current release-page observations are recorded without inferring exact year. Binary/release artifact verification remains incomplete. |
| 2026-07-02 | Network/P2P first-pass navigation | `docs/developers/source-atlas/README.md`, `docs/documentation-coverage.md`, `docs/architecture/*`, `docs/developers/reading-order.md`, `docs/developers/repository-map.md`, `docs/developers/source-tree.md` | New P2P source slices needed to be visible without implying live-network testing or final protocol specification | Recent network navigation commits | Navigation now links source-observed slices for protocol primitives, network RPC, handshake, address sharing, block/header sharing, transaction sharing, and peer health/stale-tip checks. Caveats remain around send-loop, lower-level `net.cpp`, banman, release comparison, and live tests. |
| 2026-07-02 | Network specifications stale values and old path | `docs/documentation/network-specifications.md` | Page still had old repository path and stale chain-data/BIP9 values | `24dbf62` | Updated source links to `Bitcoin-II/BitcoinII-Core`, corrected `MinBIP9WarningHeight` to `2306`, updated moving chain-data values, added P2P Source Atlas links, and kept Needs Review status. |

## Still to scan

The main orientation, service-facing, developer workflow, Source Atlas source-link cleanup, status-label cleanup, network-navigation refresh, and network-specification cleanup passes are now in decent shape.

Still scan next:

- Remaining command-shaped examples across the repo.
- Ecosystem pages that require live checks.
- Release asset pages when artifact data is available.
- Remaining old-path references with a fresh repository-wide search.

## Known acceptable uses

Some terms are acceptable in limited contexts:

- `Verified` in evidence/status definitions.
- `official` when saying MoreBC2 is **not** official.
- `active` when describing an active chain or active tip in consensus architecture.
- `safe` when saying a workflow is **not** yet safe to publish or needs testing.
- `public launch` in readiness/blocker pages.

## Next actions

1. Scan remaining command-shaped examples.
2. Re-run old-path and stale-value searches after the latest cleanup.
3. Continue release artifact verification when artifact data is available.
4. Continue ecosystem checks when live service review is requested.

## Related pages

- [Private review handoff](../REVIEW_HANDOFF.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Command example scan](command-example-scan.md)
- [Command testing status](command-testing.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 review workflow, coverage dashboard, targeted orientation/exchange/wallet/mining/ecosystem pages, node/configuration pages, old-path repository search, developer workflow pages, Source Atlas source-ref scan, recent network Source Atlas/navigation pages, and network specifications page
**Notes:** This page now records targeted stale-wording passes through the main private-review orientation, user/service-facing framework pages, known old repository path checks, developer workflow pages, Source Atlas source-ref checks, release/status-label cleanup, network navigation cleanup, and network specification cleanup. Remaining work should focus on command-shaped examples, fresh old-path searches, release asset details, and live ecosystem checks.
