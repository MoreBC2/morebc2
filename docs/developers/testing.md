# Testing guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page will document BitcoinII Core test organization and how contributors can run tests.

It is currently a framework because test commands need to be run and confirmed before being marked verified.

## Test areas to review

Likely areas to inspect:

- `test/`
- `src/test/`
- `src/wallet/test/`
- Functional test documentation.
- Fuzz test documentation.
- Unit test build targets.

## Testing documentation goals

This page should eventually answer:

- Which tests exist?
- Which tests are inherited from Bitcoin Core?
- Which tests are BitcoinII-specific?
- How are unit tests run?
- How are functional tests run?
- How are fuzz tests run?
- What environment is required?
- What tests should contributors run before opening a PR?

## Commands to avoid until tested

Do not publish test commands as verified until they are run successfully against BitcoinII Core.

## Open items

- Inspect test directories.
- Identify test runner commands.
- Identify any BitcoinII-specific tests.
- Run basic tests locally or in CI.
- Document expected runtime and common failures.

## Sources

- BitcoinII repository: https://github.com/BitcoinII-Dev/BitcoinII

## Verification

**Status:** Draft
**Primary sources checked:** No
**Notes:** This page is a testing framework only. It should be expanded after the test tree is reviewed.
