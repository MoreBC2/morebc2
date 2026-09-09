# MoreBC2 roadmap

**Status:** Active project roadmap
**Last reviewed:** 2026-09-08

This roadmap organizes MoreBC2 work. It is not the BitcoinII protocol or software roadmap.

## Current stage — public source repository

The documentation foundation and Starlight site exist, current-facing BitcoinII material has been refreshed to the `v31.1.0` baseline, a path-scoped licensing and third-party notice package is present, the repository history has been cleaned of the identified personal-path disclosure, and the source repository is public. GitHub Private Vulnerability Reporting is enabled and verified. Production-site publication, indexing, releases, and other generated artifacts remain separate future decisions.

## Current priorities

1. Before newly distributing a built site, downloadable release, or other generated artifact, review artifact-specific dependency notices for that exact material; this is not a blocker for the source-only repository visibility change.
2. Strongly encouraged independent review of high-impact `v31.1.0` consensus and operator-facing claims as a public-review and quality task, not a visibility blocker by itself.

## Technical evidence priorities

- Add new, explicitly version-scoped `v31.1.0` runtime and RPC test records.
- Independently authenticate current release assets if a trusted verification path becomes available.
- Review replay protection, data restrictions, fork-aware synchronization, wallet, mempool, mining, RPC, validation, and PSBT paths in more depth.
- Keep exchange confirmation policy and other unsupported operational recommendations unresolved until evidence exists.
- Preserve `v29.1.0` evidence as historical material; never relabel it as current testing.

## Documentation and tooling priorities

- Keep the README, project status, coverage dashboard, evidence index, and known-unknowns page synchronized.
- Keep issue and pull-request templates conservative about verification.
- Run the documented npm/site checks on every relevant change.
- Maintain current source links and date-sensitive ecosystem observations.
- Retain archived private-review coordination pages as project history, outside normal reader-facing site navigation.

## Future work

- Expand developer, architecture, node, wallet, mining, API, and integration material as evidence permits.
- Add diagrams or examples only when they improve understanding and do not overstate verification.
- Revisit website indexing, production URL, custom domain, and deployment only through a separate owner-approved change.
- Develop a sustainable maintainer and review model after public contribution terms are clear.

## Completion rule

No roadmap item changes a page to Verified by itself. Verification requires the evidence and review described in [EVIDENCE_SCALE.md](EVIDENCE_SCALE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
