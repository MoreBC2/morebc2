# Owner public-release review handoff

**Category:** Project maintenance
**Status:** Owner action required
**Last reviewed:** 2026-09-08

## Purpose

This checklist hands the repository to its owner for a decision about further public-release preparation. It does not authorize a visibility change, license selection, deployment change, or external publication.

## Recommended review order

1. [README](../README.md)
2. [Project status](../PROJECT_STATUS.md)
3. [Repository audit](AUDIT.md)
4. [Legal and reuse posture](LEGAL_REUSE.md)
5. [Documentation coverage](documentation-coverage.md)
6. [Verification evidence index](verification/verification-index.md)
7. [Known unknowns](verification/known-unknowns.md)
8. [v31 currentness audit](verification/v31-currentness-audit-2026-09-02.md)
9. [Contribution guide](../CONTRIBUTING.md)
10. [Security reporting policy](https://github.com/MoreBC2/morebc2/blob/main/SECURITY.md)
11. [Roadmap](../ROADMAP.md)

## Owner decisions required

- Review and approve the implemented path-scoped CC BY 4.0 and MIT license set and its third-party exclusions.
- Decide whether exact personal/machine paths in historical evidence are acceptable for publication.
- Approve the third-party attribution and notice approach.
- Approve a controlled publication transition in which GitHub Private Vulnerability Reporting is enabled and verified immediately after the visibility change and before active announcement or promotion.
- Decide whether to populate the empty `reviewers` and `maintainers` teams and move CODEOWNERS back to team handles; until then, the verified organization owner is the effective CODEOWNER.
- Decide whether and when the site should become indexable or move from its review deployment; no deployment change is included here.

## Technical review lanes

Assign narrow reviews rather than asking one reviewer to certify the whole repository:

- v31.1.0 consensus activation and ShockWave wording;
- replay-protection and data-restriction boundaries;
- fork-aware header synchronization;
- node/RPC/operator command safety;
- release metadata and authentication wording;
- wallet, mempool, mining, RPC, validation, and PSBT regression scope;
- exchange confirmation and service-integration claims; and
- external links, services, and ecosystem freshness.

Reviewers should report evidence strength, version, network, platform, date, and whether the result is source review, observation, or runtime testing. Unresolved claims remain unresolved.

## Historical evidence rule

Do not rewrite dated `v29.1.0` records to say `v31.1.0`. Add a new test record for a new release. The current-tree copies of three records minimally replace only the personal local-user path component and visibly disclose that change; their original committed versions remain in Git history.

## Final gate

Before changing visibility, confirm all of the following:

- a license is present and its scope is clear;
- required attribution and notices are present;
- the current-tree personal-path cleanup is complete;
- no secrets or credentials are present in the publishable tree or history;
- the public issue guidance is usable and the owner is prepared to complete the private-reporting transition below;
- all documented repository checks pass;
- date-sensitive links and external services were freshly checked; and
- the owner explicitly approves the visibility change.

Immediately after changing visibility, enable GitHub Private Vulnerability Reporting, verify that its external reporting interface works, and update `SECURITY.md` with the usable instructions and link. Do not actively announce, promote, or treat publication as complete until the route is verified. If it cannot be enabled or verified, establish another verified private intake route before active publication proceeds.

## Important quality task

Independent technical review is strongly encouraged for consequential current-facing claims. It may occur before or during public review, and its absence alone does not block visibility once the actual publication blockers and owner approval are resolved.

## Archived coordination material

Earlier invite-only review packets, assignment cards, feedback buckets, and the original polish plan are retained as project-management history. They are excluded from normal reader-facing site navigation and should not be treated as the current release process.

## Verification

**Status:** Owner action required
**Primary sources checked:** Current project status, audit, legal posture, coverage dashboard, evidence index, and repository workflows
**Notes:** This checklist coordinates owner review. It does not verify BitcoinII behavior or declare the repository ready for public release.
