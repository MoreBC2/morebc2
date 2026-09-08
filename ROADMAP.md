# MoreBC2 roadmap

**Status:** Active project roadmap
**Last reviewed:** 2026-09-08

This roadmap organizes MoreBC2 work. It is not the BitcoinII protocol or software roadmap.

## Current stage — owner public-release review

The documentation foundation and Starlight site exist, current-facing BitcoinII material has been refreshed to the `v31.1.0` baseline, and a path-scoped licensing and third-party notice package is present. Repository visibility must remain unchanged until privacy treatment, remaining third-party/contributor-authority review, security reporting, and owner approval in [project status](PROJECT_STATUS.md) and the [repository audit](docs/AUDIT.md) are resolved.

## Release-readiness priorities

1. Owner review of the proposed public-facing scope and project description.
2. Owner review of the implemented repository licensing map, contributor authority, notices, and remaining content-specific boundaries.
3. Privacy decision for exact historical records containing personal, machine-specific paths.
4. Artifact-specific dependency notice review for the material actually distributed.
5. Strongly encouraged independent review of high-impact `v31.1.0` consensus and operator-facing claims as a public-review and quality task, not a visibility blocker by itself.
6. Fresh external-link and service checks immediately before publication.

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
