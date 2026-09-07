# Narrow private review assignments

**Category:** Verification
**Status:** Archived project-management history
**Last reviewed:** 2026-07-02

> Archived: these assignment cards document the earlier invite-only review phase. Use the current [owner review handoff](../REVIEW_HANDOFF.md) for release-readiness work.

## Summary

This page contains ready-to-copy assignment cards for trusted private reviewers or agents.

Each assignment is intentionally narrow. Reviewers should not rewrite the repository broadly, upgrade status labels without evidence, or treat Draft pages as verified.

## General reviewer rules

Send these rules with every assignment:

```text
Please review only the assigned page(s). Do not rewrite broadly.

Please flag:

- claims that sound stronger than the evidence,
- missing source/version labels,
- command examples that look tested but are not,
- public-launch wording that should stay private-review-only,
- anything that should move to Open Questions instead of docs.

Please do not mark anything Verified unless the assigned evidence standard is met.
```

## Assignment 1: Chain parameter source check

**Goal:** Check whether chain-parameter documentation is accurately labeled by source version.

**Pages to review:**

- `docs/developers/source-atlas/chainparams-cpp.md`
- `docs/documentation/network-specifications.md`
- `docs/documentation/checkpoints.md`
- `docs/verification/release-source-comparison.md`

**Reviewer should check:**

- Are static chain identity values clearly distinguished from moving chain-data snapshot values?
- Are `main` and `v29.1.0` values separated where needed?
- Does any page imply source values are release-stable without evidence?
- Are checkpoint, assume-valid, assumeUTXO, chainTxData, and minimum-chain-work labels cautious enough?

**Reviewer should not do:**

- Do not rewrite broad explanations.
- Do not change consensus claims unless source evidence is provided.
- Do not mark downstream pages Verified.

**Expected output:**

- List of specific lines or sections that need correction.
- Any source/version labels that should be added.
- Any claims that should move to Open Questions.

## Assignment 2: Command safety review

**Goal:** Confirm command examples are safely labeled and staged.

**Pages to review:**

- `docs/verification/command-smoke-test-plan.md`
- `docs/verification/command-testing.md`
- `docs/verification/command-example-scan.md`
- `docs/developers/rpc-overview.md`

**Reviewer should check:**

- Are commands clearly marked Placeholder, Source-observed, Locally tested, Verified, Needs recheck, or Do not publish?
- Are spend, live submission, private-key, passphrase, restore, rescan, pruning, reindex, and block-submission commands kept out of beginner workflows?
- Is the Phase 1/2/3 smoke-test order conservative enough?
- Does any command block look like copy/paste tested guidance?

**Reviewer should not do:**

- Do not run commands unless explicitly assigned a test environment.
- Do not add real wallet examples.
- Do not move any command to Locally tested without a test record.

**Expected output:**

- Commands that should move to a later phase.
- Commands that should move to Do not publish.
- Any wording that sounds tested but is only planned.

## Assignment 3: Release verification wording

**Goal:** Make sure release docs do not imply binary verification is complete.

**Pages to review:**

- `docs/developers/release-verification.md`
- `docs/developers/release-process.md`
- `docs/verification/release-source-comparison.md`
- `docs/verification/release-artifact-checklist.md`
- `docs/documentation/releases.md`

**Reviewer should check:**

- Do the docs distinguish signed tag/source checks from binary artifact verification?
- Are current observed release notes clearly separated from legacy release paths?
- Does any page imply checksums/signatures were verified when they were not?
- Are future test-record templates clear?

**Reviewer should not do:**

- Do not claim release files are verified unless hashes/signatures/assets were checked directly.
- Do not infer maintainer intent from old release process docs.
- Do not treat GitHub verified commit UI as binary verification.

**Expected output:**

- Any wording that overstates release safety.
- Missing artifact/checksum/signature caveats.
- Exact pages that should be softened.

## Assignment 4: RPC source-review spot check

**Goal:** Spot check RPC inventory pages for command names, risk grouping, and overclaiming.

**Pages to review:**

Choose one lane only:

- `docs/developers/source-atlas/rpc-network.md`
- `docs/developers/source-atlas/rpc-blockchain.md`
- `docs/developers/source-atlas/rpc-mining.md`
- `docs/developers/source-atlas/rpc-mempool.md`
- `docs/developers/source-atlas/rpc-rawtransaction.md`
- `docs/developers/source-atlas/wallet-rpc.md`

Also review:

- `docs/developers/rpc-overview.md`
- `docs/verification/command-testing.md`

**Reviewer should check:**

- Are command names accurate for the reviewed source file?
- Are read-only, state-changing, sensitive, hidden, and advanced commands separated clearly?
- Are commands still marked untested unless a test record exists?
- Does the Source Atlas page avoid becoming a user guide?

**Reviewer should not do:**

- Do not test commands unless separately assigned.
- Do not add beginner copy/paste command blocks.
- Do not merge high-risk commands into normal user docs.

**Expected output:**

- Command name corrections.
- Risk grouping corrections.
- Any command examples that should be moved or softened.

## Assignment 5: Ecosystem active-claim scan

**Goal:** Make sure ecosystem pages do not list unverified services as active.

**Pages to review:**

- `docs/ecosystem/README.md`
- `docs/ecosystem/apis.md`
- `docs/ecosystem/explorers.md`
- `docs/ecosystem/mining-pools.md`
- `docs/ecosystem/exchanges.md`
- `docs/ecosystem/wallets.md`
- `docs/ecosystem/resources.md`
- `docs/documentation/explorer-resources.md`

**Reviewer should check:**

- Does any page say active, reliable, recommended, official, or supported without dated direct evidence?
- Are framework pages clearly labeled as framework or Needs Review?
- Are current observations separated from historical/legacy notes?
- Are API/explorer/pool/exchange checks still marked pending where direct checks are missing?

**Reviewer should not do:**

- Do not add live service listings without direct dated checks.
- Do not treat community mentions as official sources.
- Do not recommend services unless evidence is documented.

**Expected output:**

- Any active-service wording to soften.
- Any pages that need date/source fields before listing a service.
- Any legacy/current confusion.

## Assignment 6: P2P wording boundary check

**Goal:** Ensure peer-communication pages only claim what the reviewed files support.

**Pages to review:**

- `docs/architecture/peer-communication-model.md`
- `docs/developers/source-atlas/addrman.md`
- `docs/developers/source-atlas/banman.md`
- `docs/developers/source-atlas/net-connection-management.md`
- `docs/developers/source-atlas/protocol.md`
- `docs/developers/source-atlas/rpc-network.md`
- `docs/developers/source-atlas/net-processing-handshake.md`
- `docs/developers/source-atlas/net-processing-address-relay.md`
- `docs/developers/source-atlas/net-processing-block-relay.md`
- `docs/developers/source-atlas/net-processing-transaction-relay.md`
- `docs/developers/source-atlas/net-processing-peer-eviction.md`
- `docs/developers/source-atlas/net-processing-send-loop.md`
- `docs/documentation/network-specifications.md`

**Reviewer should check:**

- Does each page stay inside its reviewed source boundary?
- Are live-node, service, seed, and peer-count claims avoided unless directly checked?
- Are release-vs-main notes consistent with `docs/verification/network-release-comparison.md`?
- Are source-reviewed behaviors still Draft unless tested or reviewed by a trusted reviewer?
- Are protocol, connection, address-manager, peer-list, and peer-processing layers kept separate enough?

**Reviewer should not do:**

- Do not infer live behavior from source names alone.
- Do not collapse all P2P behavior into one broad claim.
- Do not mark P2P docs Verified.
- Do not add beginner node instructions from developer Source Atlas notes.

**Expected output:**

- Any wording that crosses source-review boundaries.
- Any runtime behavior claim that needs source support or live test evidence.
- Any missing caveats or open questions.

## Assignment 7: Network test-plan review

**Goal:** Check whether the network test coverage map and run plan are clear, cautious, and reproducible.

**Pages to review:**

- `docs/verification/network-test-coverage-map.md`
- `docs/verification/network-test-run-plan.md`
- `docs/verification/network-release-comparison.md`
- `docs/verification/command-smoke-test-plan.md`
- `docs/verification/command-testing.md`

**Reviewer should check:**

- Does the coverage map avoid claiming tests were run?
- Are unit tests, functional tests, and user-facing command smoke tests clearly separated?
- Does the run plan collect enough environment details for future test records?
- Are state-changing developer test cases kept separate from beginner command guidance?
- Are remaining weak spots, such as stale-tip-specific coverage and seed reachability, still visible?

**Reviewer should not do:**

- Do not mark tests passed unless actual command output is provided.
- Do not convert developer test-run planning into user instructions.
- Do not remove caveats around release binaries or live network behavior.

**Expected output:**

- Missing fields needed before a future test run.
- Any plan step that sounds like a completed result.
- Any test category that should be postponed or separated.

## Assignment 8: Private-review workflow check

**Goal:** Make sure the private-review workflow itself is understandable and constrained.

**Pages to review:**

- `README.md`
- `PROJECT_STATUS.md`
- `docs/README.md`
- `docs/REVIEW_HANDOFF.md`
- `docs/verification/private-review-readiness.md`
- `docs/verification/private-review-assignments.md`
- `CONTRIBUTING.md`
- `docs/LEGAL_REUSE.md`

**Reviewer should check:**

- Is it obvious that the repo is private-review only right now?
- Is it obvious that public launch is blocked?
- Are review assignments narrow enough?
- Are license/reuse caveats visible enough?
- Is there any wording that invites broad rewrites or unsupported status upgrades?

**Reviewer should not do:**

- Do not propose public launch wording.
- Do not remove private-review caveats.
- Do not assume a license decision.

**Expected output:**

- Confusing workflow wording.
- Missing private-review caveats.
- Suggestions to make assignments narrower.

## First recommended invitations

Start with only one or two assignments:

1. Command safety review.
2. Release verification wording.

These are lower-risk than asking someone to validate consensus or peer behavior, and they directly reduce the chance that readers misunderstand Draft pages as ready instructions.

## Second-wave invitations

After the first two reviews, use one narrow network assignment at a time:

1. P2P wording boundary check.
2. Network test-plan review.

These should remain review-only unless a dedicated local test environment is explicitly assigned.

## Related pages

- [Private review readiness](private-review-readiness.md)
- [Private review handoff](../REVIEW_HANDOFF.md)
- [Review feedback buckets](review-feedback-buckets.md)
- [Command smoke-test plan](command-smoke-test-plan.md)
- [Network release comparison](network-release-comparison.md)
- [Network test coverage map](network-test-coverage-map.md)
- [Network test run plan](network-test-run-plan.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Private review readiness checklist, review handoff, coverage dashboard, command and release verification pages, network release comparison, network test coverage map, network test run plan, ecosystem framework pages, Source Atlas index
**Notes:** These assignments are designed for narrow private review. They are not proof that the assigned pages are correct.
