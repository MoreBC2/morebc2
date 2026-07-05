# Codex task prompts

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page stores ready-to-run prompts for Codex or another local repo agent.

Use these prompts only when a task needs a real checkout, stronger search, local tooling, API access, or command output that ChatGPT's GitHub connector cannot reliably provide.

Codex should return findings as notes or proposed doc patches. It should not mark docs Verified unless the required evidence standard is met.

## Task 1: repository-wide stale wording grep

### Why Codex is useful

GitHub repository search can miss matches or behave differently from a full local grep. A local checkout can search every Markdown file and produce exact file/line matches.

### Prompt

```text
You are working in the MoreBC2 repository.

Goal: perform a repository-wide stale-wording audit. Do not rewrite broadly.

Search all Markdown and text docs for these terms and phrases, case-insensitive:

- verified
- official
- active
- recommended
- safe
- tested
- production
- public launch
- copy/paste
- active explorer
- active pool
- active exchange
- BitcoinII-Dev/BitcoinII
- KvantaMechanic/BitcoinII
- Dark Gravity Wave
- DGW

For each match, decide whether the use is acceptable or should be softened.

Acceptable examples include:

- definitions of evidence/status labels,
- saying MoreBC2 is not official,
- saying something is not tested,
- saying public launch is blocked,
- saying a service is not active until directly checked.

Output a Markdown report with:

1. command(s) run,
2. summary counts by term,
3. questionable matches with file and line,
4. suggested wording fixes,
5. whether any finding blocks first narrow private review.

Do not change files unless asked. Do not mark anything Verified.
```

## Task 2: command-shaped example audit

### Why Codex is useful

Command examples can be spread across docs, fenced blocks, inline text, and tables. A local grep can catch command-shaped snippets more reliably than manual review.

### Prompt

```text
You are working in the MoreBC2 repository.

Goal: find command-shaped examples that may look copy/paste-ready or locally tested without a test record.

Search Markdown files for fenced code blocks and inline examples containing common command indicators such as:

- bitcoinII-cli
- bitcoin-cli
- bitcoinIId
- bitcoind
- bitcoinII-qt
- getblockchaininfo
- getnetworkinfo
- getpeerinfo
- sendrawtransaction
- submitblock
- importprivkey
- dumpprivkey
- walletpassphrase
- walletlock
- setban
- addnode
- disconnectnode
- setnetworkactive
- reindex
- rescan
- datadir
- rpcuser
- rpcpassword
- rpcallowip
- rpcbind

For each command-shaped example, classify it as:

- read-only / low-risk,
- state-changing,
- wallet-sensitive,
- network-sensitive,
- release/build/test command,
- placeholder/example only,
- should not publish.

Check whether nearby text says the command is untested, source-observed, placeholder, or locally tested.

Output a Markdown report with:

1. command(s) run,
2. file/line matches,
3. risk classification,
4. whether labels are clear,
5. suggested fixes.

Do not run any BitcoinII commands. Do not change files unless asked. Do not mark anything locally tested.
```

## Task 3: release asset inventory capture

### Why Codex is useful

A complete release asset inventory may require GitHub API metadata or an authenticated browser/session. The current docs only record that the rendered page showed 12 assets.

### Prompt

```text
You are helping MoreBC2 capture release asset metadata for BitcoinII Core v29.1.0.

Goal: capture the release asset inventory only. Do not download binaries and do not verify hashes unless separately asked.

Target release:

- Repository: Bitcoin-II/BitcoinII-Core
- Tag: v29.1.0

Use GitHub API metadata if available. Record:

- release title,
- tag,
- target commit,
- created_at / published_at timestamps from API metadata,
- each asset name,
- each asset size,
- browser_download_url,
- content type if available,
- whether any asset appears to be a checksum manifest,
- whether any asset appears to be a signature file.

Update or propose an update to:

- docs/verification/release-asset-inventory-attempt.md
- docs/verification/release-artifact-checklist.md
- docs/documentation/releases.md if timestamp/asset metadata becomes clearer

Do not claim assets are verified. Do not download or run binaries. Do not infer trusted release keys. Do not treat GitHub commit verification as binary verification.

Output a Markdown report and, if asked, a patch.
```

## Task 4: Markdown link check

### Why Codex is useful

A local checkout can inspect relative links and catch broken internal docs links after many new pages were added.

### Prompt

```text
You are working in the MoreBC2 repository.

Goal: check internal Markdown links for broken relative paths.

Search all Markdown files for relative links ending in .md or pointing to local anchors. Check whether linked files exist.

Report:

1. broken file links,
2. questionable anchors if easy to detect,
3. links to old or redirected repository paths,
4. links to docs that moved or were renamed.

Do not rewrite broadly. If fixes are obvious, propose a small patch. Do not change external factual claims.
```

## Task 5: private review packet dry run

### Why Codex is useful

Codex can act as a simulated reviewer and test whether a packet is understandable before it is sent to a person.

### Prompt

```text
You are reviewing MoreBC2 as a narrow private reviewer.

Use only this assignment packet:

- docs/verification/first-review-packet-command-safety.md

Follow its rules exactly. Do not review the whole repository. Do not run commands. Do not rewrite broadly.

Return feedback using the requested format in the packet.

If no blockers are found, say so clearly and list minor suggestions separately.
```

## Related pages

- [First review packet: command safety](first-review-packet-command-safety.md)
- [First review packet: release wording](first-review-packet-release-wording.md)
- [Stale wording scan](stale-wording-scan.md)
- [Command example scan](command-example-scan.md)
- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current verification queue, stale wording scan, command example scan, release asset inventory attempt, private review assignment docs
**Notes:** These are prompts for future local/agent work. They are not completed task results.
