# Verification standards workflow

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page explains how MoreBC2 contributors should verify claims before treating them as reliable documentation.

It turns the root [Evidence Scale](../../EVIDENCE_SCALE.md) into a practical workflow.

## Core rule

Do not document what seems likely.

Document what can be checked.

If something cannot be checked yet, mark it clearly and move it to the verification queue.

## Evidence levels

MoreBC2 uses the root evidence scale:

- **E1 — Source Code Verified**
- **E2 — Release Verified**
- **E3 — Official Documentation Verified**
- **E4 — Live Network / Explorer Verified**
- **E5 — Tested Locally**
- **E6 — Developer Statement**
- **E7 — Community Discussion**
- **E8 — Third-Party Summary**

A page may contain claims with different evidence levels.

For example:

- A port number from source code may be E1.
- A current explorer status may be E4.
- A future feature mentioned in chat may be E7.

Do not average those together. Label the page honestly.

## Status labels

Use these page-level labels:

### Draft

The page is early work.

Use when:

- Structure exists.
- Some claims may be sourced.
- The page is not ready for outside reliance.

### Needs Review

The page is useful but still needs targeted checking.

Use when:

- Most content is written.
- Important claims are not fully checked.
- Source links may be missing or stale.

### Verified

The page has been checked against strong sources.

Use only when:

- Important claims have source links.
- Time-sensitive claims have review dates.
- Unverified claims have been removed or clearly labeled.
- A second reviewer would likely be able to retrace the evidence.

### Historical

The page describes past information.

Use when:

- The content may be true for a past date.
- It should not be assumed to describe the current network or software.

### Superseded

The page has been replaced by a newer page or newer source.

Use when:

- Keeping the page is useful for history.
- Readers should not treat it as current guidance.

## Claim review workflow

For each important claim, ask:

1. What exactly is the claim?
2. Is it current behavior, history, research, or discussion?
3. What is the strongest source available?
4. Is the source primary or secondary?
5. Is the claim time-sensitive?
6. Does the page clearly state the review date?
7. Would another contributor be able to re-check it?
8. Is the claim in the correct section?

## Source priority

Prefer sources in this order:

1. Current BitcoinII source code.
2. Official release notes, release assets, tags, or checksums.
3. Official BitcoinII website or repository documentation.
4. Running node output or public explorer data.
5. Local testing.
6. Public developer statements.
7. Community discussion.
8. Third-party summaries.

Community discussion can be useful, but it must not be presented as implementation.

## Source-code verification

For source-code claims, record:

- File path.
- Function, class, constant, or call path.
- Branch or commit when practical.
- What was checked.
- What remains unchecked.

Good wording:

> `src/pow.cpp` defines the reviewed difficulty retarget path through `GetNextWorkRequired` and `CalculateNextWorkRequired`.

Bad wording:

> BitcoinII has the best difficulty algorithm.

## Release verification

For release claims, record:

- Version.
- Release URL or tag.
- Asset name.
- Checksum/signature availability.
- Date checked.
- Whether the release matches the source branch being documented.

If checksum or signature verification is not available or not yet checked, say so.

## Live network verification

For explorer or node-output claims, record:

- Tool or explorer used.
- Date checked.
- Block height or sample data where useful.
- Whether the observation may change.

Do not treat live observations as permanent.

## Local testing verification

For tested commands, record:

- Operating system.
- BitcoinII version or commit.
- Command used.
- Expected output.
- Actual result.
- Date tested.

Commands should not be marked verified if they have not been run.

## Developer or community statements

Developer statements can explain intent, context, or history.

They do not override source code.

Community statements can identify questions worth checking.

They do not prove implementation.

## When to use the verification queue

Use the verification queue when:

- A claim matters but lacks strong evidence.
- A source link is missing.
- A value might be stale.
- A page makes a claim that needs live checking.
- A contributor cannot finish verification in one pass.

Use:

- [Verification queue](../verification/README.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation coverage](../documentation-coverage.md)

## Minimum verification block

Every substantial page should end with:

```md
## Verification

**Status:** Draft / Needs Review / Verified / Historical / Superseded
**Primary sources checked:** Yes / No / Partially
**Notes:** Short explanation of what was checked and what remains open.
```

Use more detailed source lists when the page makes technical claims.

## Upgrade rules

A page can move from Draft to Needs Review when:

- It has a clear structure.
- It avoids unsupported claims.
- Major claims have at least some source path.

A page can move from Needs Review to Verified when:

- Important claims have primary sources.
- Open questions are moved to the backlog.
- Time-sensitive claims have current review dates.
- The page has been checked for category drift.

## Downgrade rules

Downgrade a page when:

- Sources become stale.
- A release changes behavior.
- A claim was based on discussion, not implementation.
- A page mixes research or proposals into documentation.

## Verification

**Status:** Draft
**Primary sources checked:** MoreBC2 evidence scale, style guide, contributor rules
**Notes:** This is a workflow guide for contributors. It should be updated after the first outside review cycle.
