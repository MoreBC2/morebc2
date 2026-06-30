# Public website plan

**Category:** Project maintenance
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This section plans the future MoreBC2 public website.

The website should be generated from the repository's Markdown documentation so GitHub remains the source of edits and review history.

This is a planning section only. It does not make BitcoinII technical claims.

## Recommended direction

Use a static documentation site.

Good candidate tools include:

- Astro Starlight
- MkDocs Material
- Docusaurus
- VitePress

## Why static docs

A static documentation site is a good fit because:

- Markdown files remain easy to edit.
- Pull requests can review documentation changes.
- Hosting can be simple and low-cost.
- Pages are fast and search-engine friendly.
- There is no database to maintain.
- The GitHub repository remains the source of truth for MoreBC2 content.

## Website principles

- Fast.
- Searchable.
- Mobile-friendly.
- Easy to contribute to.
- Clear about evidence level and verification status.
- No price hype.
- No unsupported claims.
- Easy links to original sources.
- Clear separation between Documentation, Research, Discussion, History, Ecosystem, and Verification.

## Proposed top-level navigation

- Start here
- Documentation
- Architecture
- Wallets
- Nodes
- Mining
- Developers
- Exchange integration
- Ecosystem
- Encyclopedia
- Research
- Discussion
- History
- Verification
- Contribute

## Homepage goals

The homepage should answer:

- What is MoreBC2?
- What is BitcoinII?
- Where should a newcomer start?
- Where should a developer start?
- Where should an exchange or service provider start?
- What is verified and what still needs review?
- What should not be treated as verified yet?

## Pages needed before public launch

- What is BitcoinII?
- Network specifications
- Consensus overview
- Wallet guide
- Node guide
- Mining overview
- RPC overview
- Exchange integration package
- Source registry
- Evidence scale
- Verification dashboard
- Known unknowns
- Contributing guide
- Project status
- Documentation coverage

## Open website decisions

- Static-site generator choice.
- Hosting target: GitHub Pages, Cloudflare Pages, or another host.
- Custom domain setup.
- Search provider or built-in search.
- Theme and branding.
- Logo and favicon.
- Whether docs should live at `/docs` or the site root.
- How to display Draft/Partial/Reviewed/Verified status on every page.

## Rules

- Do not publish pages as public-ready until their status is clear.
- Do not hide known unknowns from public readers.
- Do not make ecosystem listings look official unless they are verified.
- Keep the repository as the editable source of record.
- Preserve source links and verification blocks when generating the website.

## Related pages

- [Docs index](../README.md)
- [Project status](../../PROJECT_STATUS.md)
- [Repository audit](../AUDIT.md)
- [Documentation coverage](../documentation-coverage.md)
- [Documentation polish plan](../POLISH_PLAN.md)

## Verification

**Status:** Draft
**Primary sources checked:** Not applicable for this planning page
**Notes:** This is a site-planning page, not a BitcoinII technical source.
