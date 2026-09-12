# Native Coin Exchange Listing Guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page explains how exchange listing work differs for a native blockchain coin such as BitcoinII (BC2), compared with a token issued on another chain.

BC2 is a native Proof-of-Work blockchain coin. A native listing normally requires the exchange or service provider to integrate and maintain chain-specific infrastructure, not only add a contract address.

## Native coin versus token

A token listing can reuse an exchange's existing wallet infrastructure for Ethereum, BNB Smart Chain, Solana, or another supported base chain.

A native coin listing can require the exchange to:

- review the source repository and release history;
- build or deploy the coin daemon;
- run one or more full nodes;
- configure P2P networking, wallet, and RPC access;
- test deposits and withdrawals;
- choose and monitor confirmation requirements;
- monitor chain health, reorganizations, wallet status, node synchronization, and cumulative chainwork;
- apply wallet updates after upstream releases.

For BC2, v31-era integration also needs awareness of ShockWave per-block difficulty behavior and replay protection.

## BC2 already has native-exchange integration precedent

BC2 is not starting from zero. Current-dated MoreBC2 evidence records existing listings on CoinEx, NonKYC, NestEx, and Biconomy.

Operational evidence differs by venue:

- CoinEx publicly exposed `2` safe / `6` exchange-defined `irreversible` confirmation settings.
- NonKYC publicly exposed `confirmsRequired = 50`.
- NestEx's backend explicitly exposed `conf = 50`.
- Biconomy's listing is confirmed, but its current BC2 confirmation count and withdrawal status were not publicly verified.

See [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md).

These listings are useful as evidence that multiple exchanges have integrated BC2 as a native asset. They are not endorsements or proof of exchange safety, liquidity, or long-term wallet reliability.

## Applicant authority matters

MoreBC2 is an independent documentation project. It should not claim to be the BitcoinII team or submit an application as an official representative without authorization.

This is not merely a wording preference:

- XeggeX explicitly requires the applicant to be part of the official asset team or to have specific permission from that team.
- KuCoin's current process requests project-owner details, legal-entity material, security/audit documentation, and KYC information for core project members.

The correct role for MoreBC2 is to make the technical packet strong enough that an authorized BitcoinII representative can submit it, or to provide the packet to an exchange when the exchange accepts independent integration information.

## Minimum exchange-facing package

Before outreach, prepare one canonical package containing:

- project name and source-confirmed ticker;
- official website and canonical source repository;
- current release version and release-verification status;
- licensing status and any important source-license caveats;
- current explorer and infrastructure links;
- source-backed network parameters;
- wallet/daemon and RPC integration notes;
- deposit and withdrawal workflow notes;
- replay-protection and upgrade notes;
- confirmation policy clearly labeled as operator guidance rather than protocol finality;
- supply and emission summary;
- branding assets;
- technical/security contact process;
- current community links;
- explicit applicant relationship to the BitcoinII project.

Use [BitcoinII Exchange Integration Package](integration-package.md), [Exchange operator guide](operator-guide.md), and [Deposit monitoring](deposit-monitoring.md) as the BC2 technical anchors.

## Current confirmation-policy position

MoreBC2 currently uses **50 confirmations as a provisional normal-deposit baseline**, grounded in direct 2026-09-12 exchange observations.

That number is not a consensus rule and should not be presented as mathematical finality. Because BC2 selects the best-work chain and ShockWave changes required work per block, an operator should also monitor accumulated chainwork and current chain health. Large or unusual deposits may justify longer or manual holds.

See [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md).

## Listing research rules

When adding or refreshing an exchange target:

- prefer official listing pages, helpdesks, and exchange documentation;
- mark public fees as confirmed only when the exchange itself publishes them;
- do not infer native support from token support;
- record whether the exchange asks for daemon, explorer, source, mainnet, wallet, or security information;
- record project-team authorization, legal-entity, and KYC requirements;
- distinguish an existing BC2 venue from a prospective target;
- check current deposit/withdrawal status separately from listing status;
- record the check date;
- do not describe an exchange as safe or recommended solely because it lists BC2.

## Current target categories

### Native-focused prospective targets

Current public evidence makes these the most relevant first-pass research candidates:

- **StakeCube** — publishes a native asset/coin listing option and a $1,000 fee.
- **XeggeX** — explicitly supports native assets, publishes a $5,000 integration fee and liquidity requirement, and requires official-team status or team permission.
- **FreiExchange / FreiXLite** — current Add Coin form remains live; its older FAQ says it supports coins rather than common contract-token formats and states no listing fee.
- **SafeTrade** — current status/listing material demonstrates ongoing native/PoW chain integrations, though a public listing-fee/application path was not established in this review.
- **XT.COM** — current listing page advertises integration with 240+ mainnets and a technical/compliance review process.

See [Exchange Listing Target Matrix](exchange-listing-targets.md) for current details and caveats.

### Higher-barrier prospective targets

These have public listing paths but may require substantially more compliance, project-owner, legal, security, or business material:

- BitMart.
- LBank.
- Bitget.
- Gate / Gate US, depending on jurisdiction.
- KuCoin.

KuCoin is especially high-barrier for an independent community submission because its current process asks for legal-entity documents, legal opinion, third-party code/security review material, and KYC for core project members.

### Do not target

- **TradeOgre** — reported dismantled and seized by Canadian law enforcement in September 2025.
- **Exbitron** — its own site states that the exchange is shutting down permanently.

Other older candidate names should not be promoted without a current primary-source service and listing check.

## Sources checked on 2026-09-12

- XeggeX listing page: https://xeggex.com/listing
- StakeCube listing page: https://stakecube.net/listing
- FreiExchange current Add Coin form: https://helpdesk.freiexchange.com/open.php
- FreiExchange older listing FAQ: https://helpdesk.freiexchange.com/kb/faq.php?id=3
- SafeTrade status page: https://safetrade.com/status
- SafeTrade recent native/PoW listing example: https://support.safetrade.com/hc/en-us/articles/48550294413581-Parano1d-NOID-has-been-listed-on-SafeTrade
- XT.COM listing page: https://www.xt.com/en/listing
- BitMart listing helpdesk: https://bitmart.zendesk.com/hc/en-us/articles/360001865554-Get-Listed-on-BitMart
- LBank listing page: https://www.lbank.com/listing
- Bitget listing page: https://www.bitget.com/events/application-for-listing
- Gate US listing page: https://www.gate.com/en-us/listing
- KuCoin listing help: https://www.kucoin.com/support/26125293810713
- Exbitron shutdown notice: https://app.exbitron.com/

## Verification

**Status:** Draft
**Primary sources checked:** Current official exchange listing/helpdesk/status pages plus current MoreBC2 BC2 exchange evidence
**Notes:** Refreshed on 2026-09-12. The guide now distinguishes existing BC2 venues from prospective targets, records applicant-authority constraints, and links the provisional 50-confirmation baseline. It does not claim that any prospective exchange will accept BC2 or that a listed exchange is safe, liquid, or available in every jurisdiction.