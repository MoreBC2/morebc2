# Exchange Listing Target Matrix

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page tracks prospective exchange-listing targets for BitcoinII (BC2), with emphasis on native-chain integration rather than generic token-listing volume.

It also separates exchanges that already list BC2 from exchanges that are still prospective targets.

This is a research and prioritization document, not an endorsement of any exchange and not authorization to submit on behalf of the BitcoinII project.

## Applicant-authority rule

MoreBC2 is an independent documentation project and should not imply that it represents BitcoinII maintainers or the project team.

Some exchanges explicitly require the applicant to be part of the official asset team or to have permission from that team. XeggeX states this directly. Other exchanges request project-owner, legal-entity, or core-team information.

Where an exchange requires project-team authority, MoreBC2 can prepare technical documentation and a listing packet, but the actual application should be submitted by an authorized project representative or with documented permission.

## Current BC2 venues — reference, not targets

Current-dated exchange evidence is maintained in [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md) and [Exchanges](../ecosystem/exchanges.md).

| Exchange | Current MoreBC2 evidence | Target status |
|---|---|---|
| CoinEx | BC2 listing active; public API reported deposits/withdrawals enabled and `2` / `6` staged confirmation settings on 2026-09-12. | Already listed — use as integration-policy reference. |
| NonKYC | BC2 listing active; public asset API reported deposits/withdrawals active and `confirmsRequired = 50`. | Already listed — use as integration-policy reference. |
| NestEx | BC2 backend record reported trading, deposits, and withdrawals enabled with `conf = 50`. | Already listed — use as integration-policy reference. |
| Biconomy | BC2 listing confirmed. Current confirmation count and withdrawal availability were not publicly verified. | Already listed — status evidence remains partial. |

## Prospective target matrix

Priority is a working research order based on visible native-chain fit, cost/barrier, and the quality of the public listing path. It is not a recommendation to deposit, trade, or pay a listing fee.

| Priority | Exchange | Native-chain signal | Public path / fee | Current BC2 fit | Important caveat | Source checked |
|---:|---|---|---|---|---|---|
| 1 | StakeCube | Strong | Public native-asset listing page; **$1,000** native coin fee | Strong first-pass candidate | Exchange may decline; current page says fee/options can change. | https://stakecube.net/listing |
| 2 | XeggeX | Strong | Public listing page; **$5,000** integration fee plus **$400 TVL per spot market** | Strong technical fit | Applicant must be official team or have specific team permission. Native integration estimate is 7–14 days. | https://xeggex.com/listing |
| 3 | FreiExchange / FreiXLite | Strong | Current helpdesk exposes an Add Coin form; older FAQ states no listing fee, donations accepted | Strong low-cost/native candidate | No-fee statement is from an old FAQ. Current form says integration can take roughly 1 day to 1 month; old FAQ says 6–8 weeks. Do not promise a timeframe. | https://helpdesk.freiexchange.com/open.php ; https://helpdesk.freiexchange.com/kb/faq.php?id=3 |
| 4 | SafeTrade | Strong operational signal | No public fee/application route established in this review | Worth direct contact/research | Current status page shows many native networks and per-coin confirmation settings; recent 2026 listings include independent PoW/L1 projects. Listing terms still need direct confirmation. | https://safetrade.com/status ; https://support.safetrade.com/hc/en-us/articles/48550294413581-Parano1d-NOID-has-been-listed-on-SafeTrade |
| 5 | XT.COM | Moderate-to-strong | Public application; negotiated/tiered payment model | Plausible target | Page advertises integration with 240+ mainnets and security/compliance/technical screening; actual BC2 acceptance and price require application. | https://www.xt.com/en/listing |
| 6 | BitMart | Moderate | Public application/helpdesk contact; fee not published in checked source | Plausible target | Public helpdesk is brief; native-chain requirements require direct follow-up. | https://bitmart.zendesk.com/hc/en-us/articles/360001865554-Get-Listed-on-BitMart |
| 7 | LBank | Unclear / token-focused public page | Public token-listing application; fee not published in checked source | Secondary target | Native-coin wallet integration is not established by the public listing page. | https://www.lbank.com/listing |
| 8 | Bitget | Unclear / asset-listing process | Public application; page states no listing/application/evaluation charges | Stretch target | Legal, compliance, technical-security, ecosystem, and issuer review create a higher maturity barrier. Native BC2 integration still needs confirmation. | https://www.bitget.com/events/application-for-listing |
| 9 | Gate | Regional / broad digital-asset process | Gate US public application; fee not established | Stretch target | Current page is explicitly Gate US and includes technical, legal/compliance, market due diligence and ongoing monitoring. Native-coin process and regional availability need direct confirmation. | https://www.gate.com/en-us/listing |
| 10 | KuCoin | High-barrier public process | AssetsHub listing application; fee not established in checked source | Long-term stretch target | Current help requires project-owner details, legal entity records, legal opinion, whitepaper, third-party security review/audit material, and KYC for at least three core project members. This is not an appropriate unauthorised community submission. | https://www.kucoin.com/support/26125293810713 ; https://www.kucoin.com/listing |

## Removed or excluded candidates

### TradeOgre — exclude

TradeOgre is not a current target. Canadian law enforcement reported that the platform was dismantled and its assets seized in September 2025. Do not present it as an active listing option.

Reference: https://globalnews.ca/news/11434722/rcmp-record-cryptocurrency-seizure/

### Exbitron — exclude

Exbitron's own site states that it is shutting down permanently and instructs users to withdraw funds. It is not a listing target.

Reference: https://app.exbitron.com/

### Graviex — unverified

No sufficiently current primary-source listing path was established in the 2026-09-12 review. Do not promote it to the active target matrix until a current official service and listing route are directly verified.

## Research rules

- Prefer official exchange listing pages, helpdesks, and documentation.
- Treat a published fee as current only when it comes directly from the exchange and recheck it before payment.
- Do not infer native-chain support from a token-listing page alone.
- Do not confuse an existing BC2 venue with a new listing target.
- Record applicant/team authorization requirements.
- Recheck withdrawal/deposit status separately from listing status.
- Do not equate an exchange listing with safety, solvency, liquidity, legal availability, or endorsement.
- Avoid third-party listing agencies unless an exchange itself identifies them as authorized.

## Information to collect before outreach

For a prospective native-coin listing, capture:

- official application URL and contact path;
- whether an authorized project representative is required;
- native coin / PoW support;
- required explorer, source repository, binaries, daemon instructions, and RPC information;
- security-review requirements;
- public listing fee and refund rules, if any;
- liquidity or market-making requirements;
- expected integration/review timeframe, if officially stated;
- legal/KYC/project-owner requirements;
- last checked date.

## Verification

**Status:** Draft
**Primary sources checked:** Current official listing/helpdesk/status pages for XeggeX, StakeCube, FreiExchange, SafeTrade, XT.COM, BitMart, LBank, Bitget, Gate, KuCoin, and Exbitron; current MoreBC2 BC2 exchange evidence; reliable reporting of the TradeOgre law-enforcement seizure
**Notes:** Matrix refreshed on 2026-09-12. CoinEx and NonKYC were removed as targets because BC2 is already listed there; NestEx and Biconomy are also recorded as existing venues. StakeCube and SafeTrade were promoted from follow-up research. TradeOgre and Exbitron were removed from consideration. All prospective fees, requirements, and service status should be rechecked immediately before outreach.