# Navigation map — archived

**Category:** Project maintenance  
**Status:** Historical planning artifact  
**Last reviewed:** 2026-09-12

> This page described how a future MoreBC2 website might be organized. The site is now implemented and deployed, so this document is retained only as planning history.

## Historical intent

The original map proposed reader paths for:

- newcomers;
- documentation;
- wallets;
- nodes;
- mining;
- developers;
- exchange/service integration;
- ecosystem resources;
- research;
- discussion;
- history;
- verification;
- contributors.

It also emphasized a rule that navigation should not imply authority or verification that the underlying page had not earned.

That principle remains current even though the exact early navigation tree is obsolete.

## Current navigation source of truth

Use the actual Astro/Starlight configuration and generated site, together with:

- [Documentation index](../README.md)
- [Project status](../../PROJECT_STATUS.md)
- [Documentation coverage](../documentation-coverage.md)

The current site already includes the principal reader-facing sections and derives pages from repository Markdown.

## Ongoing navigation rule

Navigation labels should continue to respect evidence boundaries:

- do not call a wallet/explorer/resource “official” without authoritative evidence;
- do not hide Draft/Partial/Reviewed status where it affects interpretation;
- route current technical claims toward Documentation / Architecture / Source Atlas;
- route evidence detail toward Verification;
- keep Research, Discussion, History, and News semantically distinct.

## Verification

**Status:** Historical planning artifact  
**Primary evidence checked:** Current implemented site/navigation and documentation index  
**Notes:** Git history preserves the original proposed navigation tree.
