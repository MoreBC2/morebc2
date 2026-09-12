# Site planning and deployment history

**Category:** Project maintenance  
**Status:** Reviewed / Historical planning collection  
**Last reviewed:** 2026-09-12

## Summary

This directory contains planning material created before the MoreBC2 public documentation site was implemented.

The old wording that described a **future** public website is no longer current. MoreBC2 now has:

- a public source repository;
- an Astro/Starlight static documentation site generated from repository Markdown;
- Cloudflare Pages production deployment;
- automated type/content checks;
- generated-site link/output checks;
- a Windows node-documentation guard;
- generated-output private-path scanning;
- live `robots.txt` / indexing-policy verification after production deployment.

The historical planning files remain useful for project history, but they should not be treated as the current site specification.

## Current production model

Repository Markdown remains the editable source of record.

The production deployment workflow builds the site from `main`, deploys the generated output to the Cloudflare Pages project `morebc2`, and verifies that the canonical site is reachable/indexable according to the workflow's policy checks.

The repository also has a separate Cloudflare GitHub App preview deployment. Preview success/failure is distinct from the production GitHub Actions deployment and should not be confused with production state.

## What the original plan got right

The implemented site retains the core principles from the early planning material:

- static documentation generated from Markdown;
- reviewable changes in Git history;
- fast/mobile-friendly pages;
- built-in search/index generation;
- evidence/status labels kept with the content;
- separation between Documentation, Architecture, Verification, Research, Discussion, History, and ecosystem material;
- source links and verification blocks retained in generated pages.

## Historical planning files

The other files in `docs/site/` are retained as planning artifacts:

- `announcement-draft.md`
- `content-inventory.md`
- `homepage-draft.md`
- `launch-checklist.md`
- `navigation-map.md`

They may contain assumptions or launch tasks that were superseded by the implemented Astro/Starlight + Cloudflare setup. When project state conflicts with those drafts, use the current repository configuration/workflows and current project-status pages.

## Current source of truth for site state

Use:

- [Project status](../../PROJECT_STATUS.md)
- [Documentation index](../README.md)
- [Documentation coverage](../documentation-coverage.md)
- [Repository audit](../AUDIT.md)
- `.github/workflows/site-check.yml`
- `.github/workflows/deploy-pages.yml`
- current Astro/Starlight configuration and build scripts.

## Deployment evidence boundary

A green site build/deploy establishes that the documentation pipeline succeeded for that commit. It does **not** prove that every BitcoinII technical claim is correct, that every public service is permanently available, or that every operational workflow is production-ready.

Technical evidence remains governed by the [Verification evidence index](../verification/verification-index.md).

## 2026-09-12 maintenance result

This index was repaired specifically to remove the obsolete “future public website” framing after repeated successful production deployments.

The historical planning documents are intentionally preserved rather than rewritten as though they had always described the current implementation.

## Verification

**Status:** Reviewed / Historical planning collection  
**Primary evidence checked:** Current repository/project status and repeatedly successful GitHub Actions/Cloudflare production deployment workflow  
**Notes:** This is project-maintenance documentation, not BitcoinII protocol evidence.
