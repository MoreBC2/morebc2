# Known unknowns

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page lists the highest-level things MoreBC2 does not know yet.

A known unknown is not a failure. It is an invitation to verify.

For the full working list, use the [open questions backlog](open-questions.md) and [verification queue](README.md).

## Highest-priority known unknowns

### Canonical public repository path

MoreBC2 currently observes `Bitcoin-II/BitcoinII-Core` for current source and release work, while older paths may redirect elsewhere.

**Needed:** Stable maintainer-confirmed canonical source and release path.

**Blocks:** Public launch.

### Official ticker source

BC2 is used throughout the ecosystem, but MoreBC2 still needs the strongest official source confirming ticker usage.

**Needed:** Official website, README, release note, source UI/help text, exchange listing, or maintainer statement.

**Blocks:** Public launch.

### Release verification model

MoreBC2 has release-page observations, source comparison notes, a network release comparison, a release asset inventory attempt, and an artifact checklist.

It still has not confirmed the full `v29.1.0` asset list, checksum/manifest files, detached signatures, trusted release keys, independently calculated hashes, or binary-to-source verification.

**Needed:** Complete asset inventory, checksum/signature/key review, local hash records, and maintainer confirmation if necessary.

**Blocks:** Public launch.

### Full release asset inventory

The rendered release page previously showed 12 assets for `v29.1.0`, but MoreBC2 has not captured the full asset names, sizes, or URLs.

**Needed:** GitHub API metadata, authenticated GitHub release page, maintainer-provided list, or manual capture.

**Blocks:** Public launch.

### Exchange confirmation recommendation

MoreBC2 has not confirmed recommended deposit or withdrawal confirmation counts for exchanges.

**Needed:** Maintainer recommendation or community-reviewed exchange risk guidance.

**Blocks:** Public launch.

### Technical contact process

MoreBC2 has not confirmed the preferred contact process for exchanges, explorers, pools, or wallet developers.

**Needed:** Official contact page, repository guidance, or maintainer statement.

**Blocks:** Public launch.

### Active ecosystem resources

MoreBC2 now has an ecosystem direct-check plan and refreshed templates, but it has not performed dated direct checks for active explorers, APIs, pools, exchanges, wallets, or community resources.

**Needed:** Direct checks with URL, date, observed status, what was checked, what was not checked, and evidence level.

**Blocks:** Public launch.

### Untested command examples

MoreBC2 has many source-observed command notes, but most examples have not been run locally.

**Needed:** Local command records with environment details.

**Blocks:** Private review if labeling is unclear; public launch for user-facing guides.

### Developer test execution

MoreBC2 has a network test coverage map and network test run plan, but it has not run the mapped tests.

**Needed:** Actual local test command records with environment, ref, command, result, and notes.

**Blocks:** Public claims that behavior has been tested.

### Architecture and Source Atlas link drift

The Source Atlas has grown quickly. Architecture pages, glossaries, and dashboards can drift after new pages are added.

**Needed:** Periodic cross-link, terminology, and dashboard synchronization passes.

**Blocks:** Private review if navigation/status becomes confusing.

## Rule

Do not fill unknowns from memory.

When an unknown is resolved, move the result to the correct documentation page and leave a note in the verification index or backlog.

## Verification

**Status:** Draft
**Primary sources checked:** Open questions backlog, verification queue, current coverage dashboard, release asset inventory attempt, ecosystem direct-check plan, network test run plan
**Notes:** This page is a short executive list. The detailed backlog is `open-questions.md`.
