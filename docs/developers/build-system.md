# Build system guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page will document how BitcoinII Core is built.

It is currently a framework because build commands and platform-specific instructions need to be tested before being marked verified.

## What is known from current review

The BitcoinII repository contains release assets for multiple platforms and includes documentation/manpage files for:

- `bitcoinIId`
- `bitcoinII-cli`
- `bitcoinII-qt`

The source headers reviewed so far state that BitcoinII was forked from Bitcoin Core version `0.27.0`.

## Build areas to review

Likely areas to inspect:

- `depends/`
- `cmake/`
- `contrib/`
- `.github/workflows/`
- `doc/`
- platform-specific release asset names

## Build documentation goals

This page should eventually answer:

- Which build system is used?
- Which platforms are supported?
- Which dependencies are required?
- How is the daemon built?
- How is the CLI built?
- How is the GUI built?
- How are releases produced?
- Are builds reproducible or deterministic?
- Are release binaries signed or checksummed?

## Commands to avoid until tested

Do not publish build commands as verified until they are run successfully in a clean environment.

## Open items

- Verify build system files.
- Verify Linux build instructions.
- Verify Windows build instructions.
- Verify macOS build instructions.
- Verify dependency list.
- Verify release packaging process.
- Verify checksum/signature workflow.

## Sources

- BitcoinII repository: https://github.com/BitcoinII-Dev/BitcoinII
- BitcoinII releases: https://github.com/BitcoinII-Dev/BitcoinII/releases

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page intentionally avoids untested build commands.
