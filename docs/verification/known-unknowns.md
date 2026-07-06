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

MoreBC2 has release-page observations, API metadata, uploaded asset inventory, generated source archive metadata, source comparison notes, network release comparison, a release asset inventory page, and an artifact checklist.

Known current release findings for `v29.1.0`:

- GitHub API reports 10 uploaded platform assets.
- Two GitHub-generated source archives were captured separately.
- The earlier 12-item rendered-page observation is reconciled as likely 10 uploaded assets plus 2 generated source archive links.
- No uploaded asset name appears to be a checksum manifest or detached signature file.
- Obvious public GitHub `guix.sigs` and detached-signature repository paths were not found.
- The `v29.1.0` tag appears lightweight and points directly to a GitHub-reported verified commit.
- MoreBC2 has not independently verified the commit signature.
- MoreBC2 has not downloaded release files, calculated independent hashes, verified signatures, or identified trusted release keys.

**Needed:** Official checksum/signature/key guidance, local hash records, independent signature checks if artifacts exist, and maintainer confirmation if necessary.

**Blocks:** Public launch.

### Release trust path

The source tree contains Bitcoin Core-style release-process and verification-helper material, but MoreBC2 has not confirmed that the current BitcoinII `v29.1.0` release followed that process.

**Needed:** Maintainer-documented release verification process, signed checksum manifest, trusted keys, signed annotated tags, reproducible-build evidence, or another project-approved release trust path.

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

MoreBC2 has many source-observed command notes. Codex performed a command-shaped example audit and found no blocker for first narrow private review, but most examples have not been run locally.

**Needed:** Local command records with environment details. A stronger local repository-wide grep is still needed before public launch.

**Blocks:** Public launch for user-facing guides.

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
**Primary sources checked:** Open questions backlog, verification queue, current coverage dashboard, release asset inventory attempt, release verification guide, ecosystem direct-check plan, network test run plan
**Notes:** This page is a short executive list. The detailed backlog is `open-questions.md`.
