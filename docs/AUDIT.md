# Repository public-release readiness audit

**Category:** Project maintenance
**Status:** Owner review required
**Last reviewed:** 2026-09-08
**Audit baseline:** BitcoinII Core `v31.1.0`

## Assessment

MoreBC2 has a strong documentation structure, unusually careful evidence labels, a functioning Astro/Starlight validation path, and current-facing BitcoinII documentation aligned to the `v31.1.0` baseline. The repository is ready for owner review but is **not ready for a visibility change**.

The path-scoped licensing and third-party notice package is implemented, and the current tree’s unnecessary personal local-user path component has been minimally redacted. A root security policy now provides a public route for ordinary issues and warns against public disclosure of sensitive reports, but no verified private intake route is available while the repository remains private. Remaining pre-transition blockers are owner review of contributor authority and residual provenance questions, repository acceptance, and owner approval. Immediately after the visibility change, Private Vulnerability Reporting must be enabled and verified before the repository is actively announced, promoted, or treated as publication-complete. Current release runtime, artifact-authentication, and independent technical-review gaps must remain visible but do not need invented answers.

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

Dated `v29.1.0` verification records preserve the release, date, platform, network, commands, results, and observations recorded. Three current-tree records now replace only the personal Windows username component with `<user>` and carry an explicit privacy annotation. They are therefore not byte-identical to their original committed versions, which remain in Git history. Higher-level current-facing pages continue to label them historical and do not convert them into `v31.1.0` verification.

## Public-release blockers

### Legal and attribution

- `LICENSE`, canonical CC BY 4.0 and MIT texts, `NOTICE`, and `THIRD_PARTY_NOTICES.md` now implement the owner-directed path-scoped model.
- The owner must still confirm contributor authority, the notice treatment of mixed/source-derived material, and the remaining provenance uncertainties recorded in `docs/THIRD_PARTY_PROVENANCE_AUDIT.md`.
- An artifact-specific dependency license inventory must be generated and reviewed for the actual site or other artifact distributed.

### Privacy and security

- A 2026-09-08 current-tree scan covered Windows user-profile, Desktop, AppData, and slash/escape variants; personal emails, phone and street-address patterns; private-device hostname patterns; and common account, token, password, and private-key patterns. It found 30 personal-path occurrences across five files: 28 path occurrences in three historical records, one audit reference, and one test guard. All 30 identifying occurrences were removed or minimally replaced; historical paths retain their useful structure as `C:\Users\<user>\...`. No credential or secret value was found. `C:\bcli` was retained because it does not identify a person.
- The immutable-evidence link inventory records upstream links and hashes rather than content hashes for the three changed local records, so no integrity hash or generated inventory metadata required updating.
- The original personal path remains in prior Git commits. This task cleans only the current public tree and does not claim to erase or rewrite repository history.
- [`SECURITY.md`](https://github.com/MoreBC2/morebc2/blob/main/SECURITY.md) now distinguishes ordinary public documentation issues, sensitive MoreBC2 reports, and upstream or third-party vulnerabilities. The policy does not present MoreBC2 as the BitcoinII Core security authority.
- On 2026-09-08, an authenticated GitHub REST check made with repository administrator access returned `404` for the private-vulnerability-reporting endpoint while repository metadata confirmed `private` visibility. [GitHub documents Private Vulnerability Reporting as a public-repository feature](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository). It was therefore not enabled or available in the repository's current private state. As part of the controlled publication operation, the owner should change visibility, immediately enable and verify Private Vulnerability Reporting, and update `SECURITY.md` with the working route. If that cannot be completed, publication remains incomplete and active promotion must wait for another verified private intake route.
- Live peer/network outputs are described as requiring redaction. Common private-key and service-token patterns were not found in the tracked current tree or a patch-history scan of 694 reachable commits (excluding dependency-lock diffs), but this is not a substitute for owner review or a dedicated secret-scanning tool.

### Owner approval

- The owner must review and explicitly approve publication after the blockers above are resolved.

## Important public-review and quality tasks

- Independent technical review of the most consequential current-facing claims is strongly encouraged. Its absence alone is not a visibility blocker once the licensing, third-party rights and attribution, security-reporting, and owner-approval blockers are resolved.
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
