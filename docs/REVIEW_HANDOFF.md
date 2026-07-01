# Private review handoff

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page explains what MoreBC2 needs before it is opened to new eyes, trusted reviewers, or documentation agents.

It is meant for private review, not public launch.

## Current recommendation

MoreBC2 is closer to invite-only review now that a contribution workflow and feedback-bucket system exist.

It is not ready for broad public launch.

A trusted reviewer or agent can be useful now if their task is narrow and clearly framed:

- Find stale links.
- Check navigation.
- Check terminology consistency.
- Review one source-backed page against one source file.
- Review whether Draft/Partial/Reviewed labels are clear.
- Review open questions and unknowns.

Do not ask a reviewer or agent to treat the repository as final public documentation yet.

## What is already in decent shape

- Root and docs indexes have been refreshed.
- Section READMEs have been normalized.
- `CONTRIBUTING.md` now defines a private-review workflow.
- Review feedback buckets exist.
- Architecture lifecycle pages have been cross-linked to newer Source Atlas pages.
- Source Atlas has meaningful first-pass coverage across consensus, validation, mempool, storage, wallet, mining, raw transaction, and RPC areas.
- Wallet guide has first-pass source-reviewed wallet RPC coverage.
- RPC overview now distinguishes source-reviewed command groups from untested examples.
- Command testing tracker exists.
- Release source comparison and artifact checklist exist.
- Ecosystem/API framework exists without claiming live services are active.
- Open questions and known unknowns are centralized enough for private review.

## Minimum before inviting reviewers

These should be done before inviting people or agents to review the repo:

### 1. Contribution and review workflow

Status: **Mostly done for private review**

Current anchors:

- [`CONTRIBUTING.md`](../CONTRIBUTING.md)
- [Review feedback buckets](verification/review-feedback-buckets.md)

Still needed before public contribution:

- Final public license decision.
- Public pull-request process.
- Issue templates, if issues are opened.

### 2. License / reuse posture

Needed:

- Decide whether MoreBC2 will include a license before sharing.
- If no license is chosen yet, clearly say that the repo is private review only and not open for reuse.
- Separate MoreBC2 documentation license from BitcoinII Core source license if needed.

Status: **Needed before private review**

### 3. Reviewer start page

Status: **Mostly done for private review**

Suggested flow:

1. `README.md`
2. `docs/README.md`
3. `PROJECT_STATUS.md`
4. `docs/REVIEW_HANDOFF.md`
5. `docs/documentation-coverage.md`
6. `docs/verification/known-unknowns.md`
7. `docs/verification/open-questions.md`
8. One assigned review target

Still useful:

- Add this flow to the root README before inviting reviewers.

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

Status: **Needed before private review**

## Good first assignments for new agents

Use narrow assignments. Avoid broad requests like "review everything."

### Agent task: Navigation review

Ask the agent to:

- Start from `README.md` and `docs/README.md`.
- Follow every major section link.
- Identify broken links, confusing loops, and missing next-step links.
- Do not change technical claims.

### Agent task: Source-backed claim review

Ask the agent to:

- Pick one Source Atlas page.
- Compare it against the source file and ref named in the page.
- Report mismatches only.
- Do not infer behavior outside the reviewed lines.

### Agent task: Command example review

Ask the agent to:

- Search for `bitcoinII-cli` and code blocks containing commands.
- Confirm each untested example links to or matches `docs/verification/command-testing.md`.
- Do not mark anything tested.

### Agent task: Ecosystem review

Ask the agent to:

- Check one explorer, pool, exchange, or API at a time.
- Record URL, date, observed status, and evidence level.
- Do not call anything official unless an official source says so.

### Agent task: Release artifact review

Ask the agent to:

- Capture the full `v29.1.0` release asset list.
- Check whether `SHA256SUMS` and `SHA256SUMS.asc` exist.
- Do not download or run binaries unless explicitly assigned.
- Update `docs/verification/release-artifact-checklist.md`.

## Not ready for agents yet

Avoid these assignments until the repo has tighter workflow rules:

- Rewriting many pages at once.
- Promoting Draft pages to Verified.
- Adding live ecosystem listings without direct checks.
- Writing install guides with copy/paste commands.
- Writing wallet movement or recovery guides.
- Making public launch claims.
- Changing consensus claims without source review.

## Public launch blockers

These do not block private review, but they do block public launch:

- Canonical repository and release path confirmation.
- Release asset verification workflow.
- License/contribution policy finalized.
- At least one outside technical review of core claims.
- Direct explorer/API/pool/exchange checks.
- Tested node/wallet/RPC command examples or clear removal of copy/paste examples.
- Confirmation policy for exchange/service docs.
- Public website/navigation decision.

## Suggested private-review note

```md
This is a private draft of MoreBC2.

Please review conservatively. Do not assume Draft or Partial pages are final. If you find a claim that needs stronger evidence, mark it as Needs Review instead of strengthening it from memory.

Useful feedback: broken links, stale wording, source mismatches, unclear status labels, missing verification notes, and unsupported claims.

Please do not add live ecosystem listings, install instructions, wallet movement instructions, or release-verification claims unless you have direct evidence and a test record.
```

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 project status, documentation coverage, verification queue, contribution guide, feedback buckets, and recent polish work
**Notes:** This page is a handoff checklist for private review. It does not verify BitcoinII protocol behavior.
