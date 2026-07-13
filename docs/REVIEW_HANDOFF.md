# Private review handoff

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-07-13

## Summary

This page explains what MoreBC2 needs before it is opened to new eyes, trusted reviewers, or documentation agents.

It is meant for private review, not public launch.

## Current recommendation

MoreBC2 is now ready for **first narrow invite-only review**.

It is not ready for broad review or public launch.

A trusted reviewer or agent can be useful now only if their task is narrow and clearly framed:

- Check command-safety wording.
- Check release-verification wording.
- Check one source-backed page against one source file.
- Check one P2P wording lane against the reviewed source boundaries.
- Check one network test-plan lane for reproducibility and caveats.
- Check ecosystem pages for unsupported active-service claims.
- Check whether Draft/Partial/Reviewed labels are clear.

Do not ask a reviewer or agent to treat the repository as final public documentation yet.

## What is already in decent shape

- Root and docs indexes have been refreshed.
- Section READMEs have been normalized.
- `CONTRIBUTING.md` defines a private-review workflow.
- Review feedback buckets exist.
- Legal/reuse posture note exists.
- Architecture lifecycle pages have been cross-linked to newer Source Atlas pages.
- Source Atlas has meaningful first-pass coverage across consensus, validation, mempool, storage, wallet, mining, RPC, and peer/network areas.
- Wallet guide has first-pass source-reviewed wallet RPC coverage.
- RPC overview distinguishes source-reviewed command groups from untested examples.
- Command testing tracker exists.
- Command smoke-test plan exists.
- Release source comparison, network release comparison, and release artifact checklist exist.
- Network test coverage map and network test run plan exist.
- API and infrastructure summaries exist for dated REST, WebSocket, Electrum, explorer, mining-statistics, price, rich-list, and exchange-page observations without claiming reliability, official status, wallet support, or service suitability.
- Release asset inventory and release-authentication gap summaries exist.
- Compatibility summaries exist for RPC, REST, Electrum, wallets, mempool.space-style assumptions, and known integration breakpoints.
- Open questions and known unknowns are centralized enough for private review.
- Narrow private-review assignment cards exist.

## Minimum before inviting reviewers

These should be in place before inviting people or agents to review the repo:

### 1. Contribution and review workflow

Status: **Mostly done for private review**

Current anchors:

- [`CONTRIBUTING.md`](../CONTRIBUTING.md)
- [Review feedback buckets](verification/review-feedback-buckets.md)
- [Private review assignments](verification/private-review-assignments.md)

Still needed before public contribution:

- Final public license decision.
- Public pull-request process.
- Issue templates, if issues are opened.

### 2. License / reuse posture

Status: **Documented for private review, not finalized for public launch**

Current anchor:

- [Legal and reuse posture](LEGAL_REUSE.md)

Current rule:

- No repository license file was found during the check.
- Treat MoreBC2 as private-review material only until the owner chooses a license or reuse policy.

Still needed before public launch:

- Final repository license decision.
- Attribution/reuse rules for documentation, screenshots, logos, and third-party material.
- Contributor reuse expectations if public pull requests are accepted.

### 3. Reviewer start page

Status: **Ready for first narrow private review**

Suggested flow:

1. `README.md`
2. `docs/README.md`
3. `PROJECT_STATUS.md`
4. `docs/REVIEW_HANDOFF.md`
5. `docs/verification/private-review-readiness.md`
6. `docs/verification/private-review-assignments.md`
7. `docs/LEGAL_REUSE.md`
8. `docs/documentation-coverage.md`
9. `docs/verification/known-unknowns.md`
10. `docs/verification/open-questions.md`
11. One assigned review target

Still useful:

- Keep reviewer assignments one lane at a time.
- Prefer command and release wording review before technical network review.

### 4. Issue labels or feedback buckets

Status: **Done as a document, not configured in GitHub**

Current anchor:

- [Review feedback buckets](verification/review-feedback-buckets.md)

Suggested buckets include:

- source mismatch
- stale link
- unclear status
- unsupported claim
- missing source
- command not tested
- ecosystem needs direct check
- release verification
- wording/polish
- navigation/cross-link
- open question
- good first review

### 5. Final stale wording scan

Needed:

- Search for old phrases that imply things are more complete than they are.
- Search for command examples that are not linked to command-testing status.
- Search for `Verified` labels and confirm they are deserved.
- Search for ecosystem entries that might imply active/recommended status without a direct check.

Status: **Useful before broader review, but not a blocker for one or two narrow assignments**

## Good first assignments for new agents

Use narrow assignments. Avoid broad requests like "review everything."

### Agent task: Command safety review

Ask the agent to:

- Review `docs/verification/command-smoke-test-plan.md`, `docs/verification/command-testing.md`, and `docs/verification/command-example-scan.md`.
- Review the dated [read-only RPC smoke test](verification/read-only-rpc-smoke-test-2026-07-10.md) and [local node inspection](verification/local-node-inspection-2026-07-10.md).
- Confirm each untested example is clearly labeled.
- Flag any command that should move later or be marked Do not publish.
- Confirm the nine locally tested read-only commands stay limited to their documented Windows/mainnet environment.
- Do not run commands unless a separate task explicitly authorizes a safe test environment.
- Do not mark anything tested.

### Agent task: Release verification wording

Ask the agent to:

- Review `docs/releases/`, `docs/developers/release-verification.md`, `docs/verification/release-source-comparison.md`, `docs/verification/network-release-comparison.md`, `docs/verification/release-artifact-checklist.md`, and `docs/verification/release-asset-inventory-attempt.md`.
- Check that source comparison, GitHub UI verification, binary artifact verification, checksum verification, and live release-asset checks remain separate.
- Treat the captured `v29.1.0` asset inventory as metadata only.
- Check that missing checksum, signature, trusted-key, and binary-authentication gaps are still visible.
- Do not claim release files are verified unless hashes/signatures/assets were checked directly.

### Agent task: Source-backed claim review

Ask the agent to:

- Pick one Source Atlas page.
- Compare it against the source file and ref named in the page.
- Report mismatches only.
- Do not infer behavior outside the reviewed source area.

### Agent task: P2P wording boundary review

Ask the agent to:

- Review one P2P Source Atlas page or the peer communication model.
- Check that it stays inside the reviewed source boundary.
- Flag any live-network, peer-count, seed-reachability, or propagation claim that needs live evidence.
- Do not mark P2P docs Verified.

### Agent task: Network test-plan review

Ask the agent to:

- Review `docs/verification/network-test-coverage-map.md` and `docs/verification/network-test-run-plan.md`.
- Confirm the plan separates observed test files from actual test results.
- Confirm unit tests, functional tests, and user-facing smoke tests stay separate.
- Do not mark tests passed.

### Agent task: Ecosystem review

Ask the agent to:

- Check one explorer, pool, exchange, API, or infrastructure page at a time.
- Start from the [verification evidence index](verification/verification-index.md), [API documentation](api/README.md), [Infrastructure directory](infrastructure/README.md), and dated [public API/Electrum smoke test](verification/public-api-electrum-smoke-test-2026-07-12.md).
- Record URL, date, observed status, and evidence level.
- Do not call anything official unless an official source says so.

### Agent task: Release artifact review

Ask the agent to:

- Review the existing `v29.1.0` release asset inventory and generated source archive notes.
- Check whether the current release-authentication wording clearly separates uploaded assets, generated source archives, Git tag metadata, GitHub commit-signature metadata, checksums, detached signatures, and trusted release keys.
- Do not download or run binaries unless explicitly assigned.
- Do not recapture the asset list unless a separate release-refresh task is assigned.

## Not ready for agents yet

Avoid these assignments until there is a dedicated reason and a tighter test environment:

- Rewriting many pages at once.
- Promoting Draft pages to Verified.
- Adding live ecosystem listings without direct checks.
- Writing install guides with copy/paste commands.
- Writing wallet movement or recovery guides.
- Making public launch claims.
- Changing consensus claims without source review.
- Running tests on production data directories.
- Treating developer functional tests as beginner node guidance.

## Public launch blockers

These do not block private review, but they do block public launch:

- Canonical repository and release path confirmation.
- Release asset verification workflow.
- License/contribution policy finalized.
- At least one outside technical review of core claims.
- Long-term service reliability, official ownership/status, pool behavior, and account-gated exchange operation.
- Additional tested node/wallet/RPC command examples or clear removal of copy/paste examples outside the narrow read-only test set.
- Confirmation policy for exchange/service docs.
- Public website/navigation decision.

## Suggested private-review note

```md
This is a private draft of MoreBC2.

Please review conservatively. Do not assume Draft or Partial pages are final. If you find a claim that needs stronger evidence, mark it as Needs Review instead of strengthening it from memory.

Useful feedback: broken links, stale wording, source mismatches, unclear status labels, missing verification notes, and unsupported claims.

Please do not add live ecosystem listings, install instructions, wallet movement instructions, release-verification claims, test-pass claims, or reuse/publication claims unless you have direct evidence and a test record or permission.
```

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 project status, documentation coverage, verification evidence index, verification queue, private review readiness, private review assignments, contribution guide, feedback buckets, legal/reuse note, command safety plan, local node/RPC records, API/Electrum smoke test, release comparison docs, release asset inventory, Releases section, Compatibility section, Infrastructure section, network comparison docs, and network test planning docs
**Notes:** This page is a handoff checklist for private review. It does not verify BitcoinII protocol behavior or public-launch readiness.
