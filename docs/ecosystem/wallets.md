# Wallets

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-13

## Summary

This page tracks BitcoinII (BC2) wallet resources in the ecosystem.

Nothing should be marked active, official, or recommended until directly verified.

Use [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md) and release-verification pages before promoting wallet/download listings.

## Listing format

```md
### Wallet name

**Status:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical / Do not recommend
**Official:** Yes / No / Unknown
**Type:** GUI / CLI / Full node / Mobile / Web / Hardware / Other
**URL:**
**Source:**
**Version:** Unknown unless verified
**Download type:** Unknown unless verified
**Checksum/signature available:** Unknown unless verified
**Last checked:** YYYY-MM-DD
**Evidence level:** E1-E8
**What was checked:**
**What was not checked:**
**Notes:**
```

## Current known wallet source

### BitcoinII Core wallet

**Status:** Needs Review
**Official:** Needs confirmation from canonical project source
**Type:** Full node wallet / GUI and CLI components
**Current observed release URL:** https://github.com/Bitcoin-II/BitcoinII-Core/releases
**Legacy/redirected release URL:** https://github.com/BitcoinII-Dev/BitcoinII/releases
**Source:** Current release-page observations and source-reviewed wallet files
**Last checked:** 2026-07-04
**Evidence level:** E2/E3
**What was checked:** Source-reviewed wallet RPC groups, current observed release path, and current release asset inventory metadata.
**What was not checked:** Downloaded binary hashes, checksum manifests, signatures, trusted keys, platform-specific wallet installation, wallet backup/recovery/spending workflows, or third-party wallet support.
**Notes:** MoreBC2 currently observes `Bitcoin-II/BitcoinII-Core` as the active public release path, while older release links may redirect elsewhere. BitcoinII Core source includes wallet functionality and reviewed wallet RPC groups, and the v29.1.0 release asset inventory has been captured as metadata. This is not wallet compatibility testing, binary authentication, or a recommendation to download or use a wallet.

## Open items

- Confirm official wallet download source.
- Confirm canonical repository and release path.
- Confirm release verification workflow.
- Confirm platform-specific wallet installation and behavior.
- Confirm whether any third-party wallets exist.
- Confirm whether any web/mobile/hardware wallet support exists.

## Related pages

- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Release verification guide](../developers/release-verification.md)
- [Releases](../releases/README.md)
- [Wallet compatibility](../compatibility/wallets.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [Release asset inventory attempt](../verification/release-asset-inventory-attempt.md)
- [Known unknowns](../verification/known-unknowns.md)

## Verification

**Status:** Draft
**Primary sources checked:** Ecosystem direct check plan, current release-page observations, release-verification docs, and source-reviewed wallet files
**Notes:** This ecosystem page is intentionally conservative. The current observed release path and release asset inventory metadata have been recorded, but wallet download authentication, wallet compatibility, third-party wallet support, and wallet workflows still need direct review before public use.
