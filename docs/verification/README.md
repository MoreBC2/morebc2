# Verification queue

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This section tracks claims, values, links, examples, review packets, and verification tasks that are not ready to become verified documentation.

Use this section when something is important but not ready to become verified documentation.

Verification pages should help MoreBC2 keep uncertainty visible instead of hiding it inside confident-sounding docs.

## Main verification pages

- [Open questions backlog](open-questions.md)
- [Known unknowns](known-unknowns.md)
- [Private review readiness](private-review-readiness.md)
- [Narrow private review assignments](private-review-assignments.md)
- [First review packet: command safety](first-review-packet-command-safety.md)
- [First review packet: release verification wording](first-review-packet-release-wording.md)
- [Codex task prompts](codex-task-prompts.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Stale wording scan](stale-wording-scan.md)
- [Command example scan](command-example-scan.md)
- [Command testing status](command-testing.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Release source comparison notes](release-source-comparison.md)
- [Network release comparison](network-release-comparison.md)
- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Ecosystem direct check plan](ecosystem-direct-check-plan.md)
- [Network test coverage map](network-test-coverage-map.md)
- [Network test run plan](network-test-run-plan.md)
- [Documentation coverage](../documentation-coverage.md)

## How to use this queue

1. Write the claim or question clearly.
2. List possible sources.
3. Assign a current evidence level.
4. Decide whether it blocks private review, public launch, or only future polish.
5. Move verified results into the correct documentation page.
6. Leave a note explaining what changed.

For private review planning, use [Private review readiness](private-review-readiness.md), [Narrow private review assignments](private-review-assignments.md), and the first review packets.

For review notes, use [Review feedback buckets](review-feedback-buckets.md) to keep feedback narrow and actionable.

For local-agent or Codex work, use [Codex task prompts](codex-task-prompts.md). These prompts are for tasks that need a real checkout, stronger grep, local tooling, API metadata, or simulated review.

For stale wording or overconfident language, use [Stale wording scan](stale-wording-scan.md).

For command examples, also use [Command example scan](command-example-scan.md), [Command testing status](command-testing.md), the [Command smoke-test plan](command-smoke-test-plan.md), and the command-safety review packet.

For release checks, also update [Release source comparison notes](release-source-comparison.md), [Network release comparison](network-release-comparison.md), [Release asset inventory attempt](release-asset-inventory-attempt.md), [Release artifact checklist](release-artifact-checklist.md), and the release wording review packet.

For ecosystem checks, use [Ecosystem direct check plan](ecosystem-direct-check-plan.md) before updating explorer, API, pool, exchange, wallet, or resource pages.

For developer test planning, update [Network test coverage map](network-test-coverage-map.md) or [Network test run plan](network-test-run-plan.md).

## Open verification items

### Canonical BitcoinII repository path

**Question:** Which GitHub path should MoreBC2 treat as the canonical public BitcoinII repository path?

**Current evidence:** Current release review observes `Bitcoin-II/BitcoinII-Core`, while older paths may redirect elsewhere.

**Needed source:** Maintainer confirmation or stable official project link.

**Status:** Needs Review

### Official ticker source

**Question:** What is the strongest primary source confirming `BC2` as the ticker?

**Current evidence:** Source-code comments and UI strings refer to BC2 units, and community usage is BC2.

**Needed source:** Official website, README, release note, or maintainer statement.

**Status:** Needs Review

### First private review packets

**Question:** Which parts can be opened first for narrow private review?

**Current evidence:** Command-safety and release-wording packets now exist with review rules, page lists, feedback format, and copy/paste assignment notes.

**Needed source:** Actual reviewer feedback.

**Status:** Ready for narrow review

### Local-agent / Codex tasks

**Question:** Which tasks should be handed to Codex or another local repo agent?

**Current evidence:** Codex prompts now exist for stale-wording grep, command-shaped example audit, release asset inventory capture, Markdown link checking, and packet dry run.

**Needed source:** Codex/local-agent output or patches.

**Status:** Framework

### Release verification model

**Question:** How should users verify BitcoinII release downloads?

**Current evidence:** Release verification docs separate release-page observation, source comparison, workflow artifact observation, checksum/manifest evidence, signature evidence, trusted-key evidence, local hash calculation, and binary verification. Current release assets still need direct inventory and checking.

**Needed source:** Release assets, checksum files, signed tags, trusted keys, or maintainer statement.

**Status:** Needs Review

### Release asset inventory

**Question:** What exact assets are attached to `v29.1.0`?

**Current evidence:** The release asset inventory attempt records that the rendered page showed 12 assets, but full names, sizes, and URLs have not been captured.

**Needed source:** GitHub API metadata, authenticated GitHub release page, maintainer-provided list, or manual capture with names/sizes/URLs.

**Status:** Needs Review

### Ecosystem direct checks

**Question:** How should MoreBC2 check explorers, APIs, pools, exchanges, wallets, and community resources before making active-service claims?

**Current evidence:** The ecosystem direct check plan defines required fields, status labels, evidence rules, and per-resource check templates.

**Needed source:** Actual dated direct checks for each ecosystem resource.

**Status:** Framework

### Network release comparison

**Question:** Do the reviewed network/P2P source files differ between `v29.1.0` and current observed `main`?

**Current evidence:** The network release comparison records that the reviewed network/P2P files did not appear in the GitHub changed-file list when comparing `v29.1.0` to `main`; selected blob-SHA spot checks for key files also matched across both refs.

**Needed source:** Reviewer confirmation and any remaining optional header-file spot checks.

**Status:** Partial

### Network test coverage

**Question:** Which existing test files appear to cover the reviewed network/P2P source areas?

**Current evidence:** The network test coverage map identifies observed unit and functional test files for addrman, banman, net, netbase, address relay, addrv2 relay, invalid messages, sendheaders, compact blocks, transaction download, permissions, tx-reconciliation signaling, network RPC, peer eviction, and address-response caching.

**Needed source:** Full test-file review and local test execution records.

**Status:** Partial

### Network test execution plan

**Question:** Which network tests should MoreBC2 run first when a BitcoinII build/test environment is available?

**Current evidence:** The network test run plan defines a staged execution plan for focused unit tests, `rpc_net.py`, address relay tests, peer-message tests, block/header tests, transaction-sharing tests, and peer eviction tests.

**Needed source:** Actual local test command records.

**Status:** Framework

### Recommended exchange confirmations

**Question:** What confirmation count should exchanges use for deposits and withdrawals?

**Needed source:** Maintainer recommendation, exchange integration note, or community-reviewed risk model.

**Status:** Needs Review

### Technical contact process

**Question:** How should exchanges, explorers, pools, or wallet developers contact BitcoinII maintainers for integration support?

**Needed source:** Official website, repository contact info, maintainer statement, or project-maintained contact page.

**Status:** Needs Review

### Current explorer list

**Question:** Which explorers should MoreBC2 list as active and reliable?

**Needed source:** Direct explorer checks and community review.

**Status:** Needs Review

### Current mining pool list

**Question:** Which pools should MoreBC2 list as active?

**Needed source:** Direct pool checks and community review.

**Status:** Needs Review

### Command test records

**Question:** Which command examples have local test records?

**Needed source:** Local command records with environment details.

**Current next step:** Use the command smoke-test plan to test harmless local commands first.

**Status:** Needs Review

## Rules

- Do not move an item out of verification until the evidence is strong enough for the target page.
- Keep current facts, historical facts, research ideas, and discussion proposals separate.
- Record the source type used: source code, release artifact, official website, archive, maintainer statement, local test, or current direct check.
- Command examples should remain unverified until run locally with environment details.
- Release artifact claims should remain unverified until assets and hashes are checked directly.
- Ecosystem claims should remain unverified until checked directly and dated.
- Developer test-suite plans should remain separate from user-facing command smoke tests.

## Notes

The backlog page is now the preferred place to add larger cross-project verification questions. This README keeps the highest-priority legacy queue visible.

Items in this queue should not be treated as verified documentation until moved to the proper page with sources.

## Verification

**Status:** Draft
**Primary sources checked:** Current verification section structure, private review readiness checklist, narrow assignment cards, first review packets, Codex task prompts, command smoke-test plan, release verification cleanup, release asset inventory attempt, ecosystem direct check plan, network release comparison, selected network file blob-SHA spot checks, network test coverage map, and network test run plan
**Notes:** This section README tracks verification workflow, private-review readiness, narrow assignments, first review packets, local-agent prompts, feedback buckets, stale-wording scan, command-example scan, command-test tracking, release-check tracking, release asset inventory, ecosystem direct-check planning, command smoke-test planning, network release comparison, network test coverage mapping, network test execution planning, and priority unknowns. It does not verify BitcoinII protocol behavior.
