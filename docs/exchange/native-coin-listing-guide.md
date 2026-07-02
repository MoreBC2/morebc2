# Native Coin Exchange Listing Guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This page explains how exchange listing work differs for a native blockchain coin such as BitcoinII (BC2), compared with a token issued on another chain.

BC2 should be described as a native blockchain coin unless an official source says otherwise. A native coin normally requires the exchange or service provider to integrate and maintain blockchain-specific infrastructure, not only add a contract address.

## Native coin versus token

A token listing often depends on an existing supported network such as Ethereum, BNB Smart Chain, Solana, or another token platform. The exchange may already operate the base-chain wallet infrastructure.

A native coin listing can require the exchange to:

- Review the source repository and release history.
- Build or deploy the coin daemon.
- Run one or more full nodes.
- Configure P2P networking, wallet, and RPC access.
- Test deposits and withdrawals.
- Choose and monitor confirmation requirements.
- Monitor chain health, forks, wallet status, and node synchronization.
- Apply wallet updates after upstream releases.

This makes native coin listings more technical and usually slower than token listings.

## Practical implication for BC2

When researching exchanges, do not treat every token listing page as a good BC2 target.

A stronger BC2 target is an exchange that already supports:

- Independent blockchain coins.
- Proof-of-work coins.
- Full-node wallet integrations.
- Coin daemon maintenance.
- Block explorers and deposit confirmation policies.

A weaker BC2 target is an exchange focused mostly on smart-contract tokens, launchpads, presales, or newly issued contract assets.

## Minimum exchange-facing package

Before submitting to exchanges, prepare one canonical package with:

- Project name and ticker.
- Official website.
- Official source repository.
- Release page.
- Current release version and release-verification status.
- License.
- Block explorer.
- Wallet/daemon setup notes.
- RPC integration notes.
- Deposit and withdrawal testing notes.
- Confirmation policy or clearly labeled draft risk model.
- Seed nodes and network parameters.
- Supply and emission summary.
- Branding assets.
- Technical contact process.
- Security contact or responsible-disclosure process.
- Community links.

Use [BitcoinII Exchange Integration Package](integration-package.md) as the BC2-specific anchor.

## Listing research rules

When adding an exchange to this repository:

- Prefer official listing pages, helpdesk pages, or exchange documentation.
- Mark public fees as `Public` only when the exchange states them directly.
- Mark fee claims from agencies, blogs, social posts, or community reports as `Unconfirmed third-party report`.
- Do not imply an exchange supports BC2 just because it supports tokens.
- Do not list an exchange as active or safe without current direct checking.
- Record the date checked.
- Record whether the page specifically mentions native coins, mainnets, wallets, block explorers, or integration.

## Good first target profile

A good early BC2 listing target likely has:

- Public listing instructions.
- Clear support for native assets or coins.
- Published technical requirements.
- Realistic listing fee or no public fee.
- Low enough barrier for community coins.
- Visible wallet-support process.
- Existing market data reporting to aggregators.

## Higher-risk target profile

Be more cautious when an exchange:

- Has no public listing path.
- Requires payment before review without clear refund terms.
- Uses only Telegram sales contacts.
- Lists mostly contract tokens and does not mention native integrations.
- Has poor public security or withdrawal reputation.
- Has stale or broken support pages.
- Has recent seizure, shutdown, insolvency, or withdrawal-freeze reports.

## Initial exchange categories

### Native-coin friendly / likely first-pass targets

These exchanges should be researched first because public information suggests they may be more compatible with native coin projects:

- XeggeX.
- FreiExchange / FreiXLite.
- NonKYC.io.
- CoinEx.
- XT.COM.

### Broader mid-tier targets

These may be useful but likely require stronger documentation, compliance review, community evidence, or negotiation:

- BitMart.
- LBank.
- Gate.
- KuCoin.
- Bitget.

## Sources checked

- XeggeX listing page, checked 2026-07-02: https://xeggex.com/listing
- FreiExchange add-coin FAQ, checked 2026-07-02: https://helpdesk.freiexchange.com/kb/faq.php?id=3
- CoinEx listing application page, checked 2026-07-02: https://www.coinex.com/en/apply/create
- XT.COM listing page, checked 2026-07-02: https://www.xt.com/en/listing
- LBank listing page, checked 2026-07-02: https://www.lbank.com/listing
- BitMart listing helpdesk page, checked 2026-07-02: https://bitmart.zendesk.com/hc/en-us/articles/360001865554-Get-Listed-on-BitMart
- Bitget listing application page, checked 2026-07-02: https://www.bitget.com/events/application-for-listing

## Verification

**Status:** Draft
**Primary sources checked:** Official exchange listing/helpdesk pages listed above.
**Notes:** This page is a framework for native coin listing research. It does not verify that any exchange will list BC2, that any private fee quote is current, or that BC2 currently satisfies each exchange's requirements.