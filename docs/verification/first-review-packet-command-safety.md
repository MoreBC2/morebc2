# First review packet: command safety

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This is a ready-to-send packet for the first narrow private review assignment.

It asks a reviewer to check command-safety wording only. It does not ask the reviewer to run commands, rewrite pages broadly, or mark anything checked.

## Reviewer goal

Check whether command examples and command-like guidance are clearly labeled as untested unless a local test record exists.

The reviewer should flag anything that looks like beginner copy/paste guidance when it is only source-observed, illustrative, or planned.

## Pages to review

Primary pages:

- `docs/verification/command-smoke-test-plan.md`
- `docs/verification/command-testing.md`
- `docs/verification/command-example-scan.md`
- `docs/developers/rpc-overview.md`
- `STYLE_CONVENTIONS.md`

Secondary pages if time allows:

- `docs/nodes/node-guide.md`
- `docs/wallets/wallet-guide.md`
- `docs/mining/mining-overview.md`
- `docs/configuration/configuration-overview.md`
- `docs/configuration/rpc-configuration.md`

## Review rules

Please review only the assigned pages.

Do not:

- run commands,
- add new command examples,
- mark anything locally tested,
- promote pages to Verified,
- rewrite broad sections,
- add wallet movement, private-key, passphrase, live transaction, or production setup instructions.

## What to flag

Flag any command or command-like example that:

- sounds locally tested without a dated test record,
- could affect funds,
- could expose secrets,
- could change live peer/network behavior,
- could submit live transactions or blocks,
- could change wallet encryption or recovery state,
- could be mistaken for beginner copy/paste guidance,
- belongs in a later test phase or `Do not publish` group.

## Expected feedback format

Use this format:

```md
### Command safety review feedback

**Reviewer:**
**Date:**
**Pages reviewed:**

#### Finding 1

**Page:**
**Section or line:**
**Concern type:** untested / sensitive / state-changing / unclear / should move later / should not publish
**Current wording:**
**Suggested fix:**
**Severity:** blocker / medium / minor

#### Finding 2

...

### Overall recommendation

Ready for next review / Needs fixes first
```

## Copy/paste assignment note

```md
Please review only the assigned command-safety pages. Do not run commands and do not rewrite broadly.

Goal: flag any command example or command-like wording that sounds locally tested, beginner-ready, or safe to copy/paste without a dated test record.

Please especially flag anything involving funds, wallet secrets, wallet encryption, live transaction submission, block submission, peer-list changes, manual peer changes, network-active toggles, production data directories, or public RPC exposure.

Please use the feedback format in `docs/verification/first-review-packet-command-safety.md`.
```

## Success criteria

This review is successful if it produces one of these outcomes:

- no blockers found and the reviewer says command labels are clear enough for private review,
- specific command examples are flagged for softer wording,
- specific examples are moved to a later phase or marked not suitable for publication,
- unclear command status labels are identified.

## Related pages

- [Private review assignments](private-review-assignments.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Command testing status](command-testing.md)
- [Command example scan](command-example-scan.md)
- [Stale wording scan](stale-wording-scan.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Private review assignments, command smoke-test plan, command testing status, command example scan, stale wording scan
**Notes:** This packet sets up the first narrow private-review assignment. It is not a completed review.
