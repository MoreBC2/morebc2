# Wallet guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page is the starting point for BitcoinII (BC2) wallet documentation.

It does not yet provide step-by-step installation instructions because those should be tested on each supported platform before being marked verified.

## What is verified today

The BitcoinII repository README states that BitcoinII Core includes wallet functionality and can optionally build a graphical user interface.

The public GitHub release page lists downloadable release assets for BitcoinII Core.

## Safe wallet principles

These are general cryptocurrency wallet safety principles:

- Download wallet software from official project release sources.
- Verify downloads when checksums or signatures are available.
- Back up wallet data before sending funds.
- Do not expose private keys or wallet files.
- Do not run unknown wallet binaries from unofficial links.
- Keep a small test balance when trying a new wallet setup.

## Release verification note

MoreBC2 has not yet confirmed the complete BitcoinII release verification model.

Before this guide is marked Verified, MoreBC2 needs to document whether releases provide:

- SHA256 checksums.
- Checksum manifest files.
- Detached signatures.
- Signed tags.
- Reproducible builds.

## Platform guides to create

- Windows wallet guide.
- Linux wallet guide.
- macOS wallet guide.
- CLI-only wallet guide.
- Backup and restore guide.
- Troubleshooting sync issues.

## Open items

- Confirm official download path.
- Confirm release-verification workflow.
- Confirm wallet data directory by operating system.
- Confirm backup file names and restore process.
- Confirm wallet encryption workflow.
- Confirm whether GUI and CLI wallets differ in user-facing behavior.

## Sources

- BitcoinII README: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/README.md
- BitcoinII releases: https://github.com/BitcoinII-Dev/BitcoinII/releases

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This page is a framework. Platform-specific wallet instructions need local testing before publication as verified docs.
