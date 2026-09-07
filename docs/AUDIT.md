# Repository public-release readiness audit

**Category:** Project maintenance
**Status:** Owner review required
**Last reviewed:** 2026-09-07
**Audit baseline:** BitcoinII Core `v31.1.0`

## Assessment

MoreBC2 has a strong documentation structure, unusually careful evidence labels, a functioning Astro/Starlight validation path, and current-facing BitcoinII documentation aligned to the `v31.1.0` baseline. The repository is ready for owner review but is **not ready for a visibility change**.

The primary blockers are licensing, treatment of personal environment details in exact historical evidence, incomplete third-party rights and attribution review, lack of a public security-reporting path, and owner approval. Current release runtime, artifact-authentication, and independent technical-review gaps must remain visible but do not need invented answers.

## Scope reviewed

The audit covered root project documents, GitHub ownership/workflow/templates, all documentation sections, verification and release records, package metadata, Astro/Starlight configuration, scripts, and GitHub Actions.

Searches covered obsolete private-review framing, release and difficulty wording, v29/v31 context, TODO-style markers, machine-specific paths, personal identifiers, common credential patterns, endpoints, generated files, links, stale dates, conflicting status claims, verification overstatement, and licensing/attribution gaps.

## Current-facing technical posture

- Current documentation baseline: BitcoinII Core `v31.1.0`.
- Mainnet activation height `57750`: ShockWave per-block difficulty adjustment, replay protection, consensus-level data restrictions, and fork-aware header-synchronization-related behavior.
- Pre-activation Bitcoin-style 2016-block retarget material is historical/inherited context, not the current post-activation schedule.
- Current source review is not presented as equivalent to runtime testing.
- Fresh `v31.1.0` runtime verification and independent release authentication remain unresolved.

## Historical evidence preserved

Dated `v29.1.0` verification records are intentionally unchanged. They remain evidence for the exact release, date, platform, network, commands, and observations recorded. Higher-level current-facing pages label them historical and do not convert them into `v31.1.0` verification.

## Public-release blockers

### Legal and attribution

- No `LICENSE` file exists. The owner must choose the license; this audit does not do so.
- A complete third-party attribution and notice inventory is not present.
- Branding, screenshots, copied excerpts, adapted code/algorithm explanations, and generated evidence artifacts need a rights/provenance review.

### Privacy and security

- Exact historical `v29.1.0` records contain the Windows username `Dan` and absolute paths under `C:\Users\Dan`, the Desktop, AppData, and `C:\bcli`. They contain no credential values found by this audit, but they disclose a personal/machine environment. Because the records must remain exact, the owner must decide whether that disclosure is acceptable or whether a separately documented preservation/redaction strategy is required before publication.
- No public, BitcoinII-specific security reporting contact or documented process is established.
- Live peer/network outputs are described as requiring redaction. Common private-key and service-token patterns were not found in the tracked current tree or a patch-history scan of 694 reachable commits (excluding dependency-lock diffs), but this is not a substitute for owner review or a dedicated secret-scanning tool.

### Owner approval

- The owner must review and explicitly approve publication after the blockers above are resolved.

## Important public-review and quality tasks

- Independent technical review of the most consequential current-facing claims is strongly encouraged. Its absence alone is not a visibility blocker once the licensing, privacy, third-party rights and attribution, security-reporting, and owner-approval blockers are resolved.
- Date-sensitive external services and external links should be rechecked immediately before publication.
- Repository team handles in CODEOWNERS must be confirmed to exist and be appropriate; the file itself cannot guarantee enforcement.

## Non-blocking unresolved technical work

- Fresh version-scoped `v31.1.0` node/RPC/runtime evidence.
- Independent current-release asset hashes, trusted signing-key guidance, and reproducibility evidence.
- Deeper regression review for wallet, mempool, mining, RPC, validation, PSBT, replay protection, data restrictions, and header synchronization.
- Evidence-based exchange confirmation policy.
- Broader live-network and cross-platform checks.

These gaps must stay labeled. They must not be converted to Verified merely to prepare the repository for release.

## Presentation changes in this pass

- Reworked the README for a first-time external maintainer: purpose, non-official status, audience, current baseline, evidence boundaries, contribution path, validation commands, roadmap, and evidence navigation are now visible quickly.
- Replaced active private-foundation and invite-only-review framing in root status, roadmap, contribution, governance, legal, and ownership documents.
- Converted the old review handoff to an owner public-release review checklist.
- Marked legacy private-review coordination and polish pages as archived project-management history outside normal reader-facing navigation.
- Tightened issue templates so Source Reviewed cannot be silently treated as runtime Verified.
- Kept site deployment/indexing settings unchanged.

## Generated and temporary material

Build outputs, dependency directories, editor settings, logs, environment files, caches, and generated Starlight content are ignored. The tracked immutable-evidence JSON is a deliberate generated audit artifact, not stray build output. No unexpected generated build directory was found tracked in the current tree.

## Link posture

The site build validates internal content routing and rendered output. A network-enabled 2026-09-07 scan requested 160 distinct external URLs. Eleven returned DNS/connection failures, HTTP 404, or HTTP 502; each was already used in explicit broken-link, failed-check, base-path, or historical release-download context rather than presented as a healthy current service. Six additional URLs rejected automated access with an access-control response.

External links and services remain date-sensitive. Repeat the scan immediately before publication and review each current recommendation manually; an automated HTTP response alone does not establish ownership, safety, or reliability.

## Recommended repository metadata

**Description:** Independently maintained, source-backed documentation and verification records for BitcoinII (BC2), with explicit evidence and uncertainty boundaries.

**Topics:** `bitcoinii`, `bc2`, `documentation`, `cryptocurrency`, `blockchain`, `proof-of-work`, `astro`, `starlight`

These are recommendations only. This audit does not change GitHub settings.

## Verification

**Status:** Owner review required
**Primary sources checked:** Current repository tree, tracked project documents, scripts, workflows, and cited version-scoped evidence
**Notes:** Passing repository checks verifies documentation tooling, not BitcoinII software or live-network behavior.
