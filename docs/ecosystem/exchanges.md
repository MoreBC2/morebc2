# Exchanges

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-06

## Summary

This page tracks public BitcoinII (BC2) exchange listings and exchange-integration opportunities.

Exchange data is time-sensitive and should be checked directly before publication.

Use [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md) before adding or promoting exchange listings.

## Listing format

```md
### Exchange name

**Status:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical / Delisted / Application discussed / Do not recommend
**Official:** No, unless confirmed by BitcoinII maintainers
**URL:**
**Pairs:** Unknown unless verified
**Deposits enabled:** Unknown unless verified
**Withdrawals enabled:** Unknown unless verified
**Trading enabled:** Unknown unless verified
**Region/KYC restrictions:** Unknown unless visible
**Last checked:** YYYY-MM-DD
**Evidence level:** E8 unless verified directly
**What was checked:**
**What was not checked:**
**Notes:**
```

## Direct exchange-source observations

### NonKYC

**Status:** Partially checked / Public direct exchange-source observation  
**Official:** No, unless confirmed by BitcoinII maintainers  
**URL:** `https://nonkyc.io/market/BC2_USDT` and `https://nonkyc.io/asset/BC2`  
**Pairs:** `BC2/USDT` observed on market page; `BC2/USDT` and `BC2/BTC` observed on asset page  
**Deposits enabled:** Public asset page displayed `Deposits: Active` during check; no deposit was attempted  
**Withdrawals enabled:** Public asset page displayed `Withdraws: Active` during check; no withdrawal was attempted  
**Trading enabled:** Public market/order UI visible; trade action requires login/signup and was not tested  
**Region/KYC restrictions:** No specific region/KYC warning observed in fetched page text  
**Last checked:** 2026-07-06  
**Evidence level:** E4/E6 direct public-page observation; not E8 account/service verification

**What was checked:**

- Public market page loaded.
- Public asset page loaded.
- Pages clearly identified `BitcoinII` / `BC2`.
- Direct exchange pages showed `BC2/USDT` and asset-page market/liquidity-pool references including `BC2/BTC`.
- Public asset page displayed deposit and withdrawal status text.

**What was not checked:**

- No account login.
- No order placement.
- No trade execution.
- No deposit.
- No withdrawal.
- No wallet/address generation.
- No region/KYC/account-specific checks.

**Notes:**

Deposit and withdrawal status is recorded only as public page text observed on 2026-07-06. It is not proof that a user in any specific region can deposit or withdraw.

### CoinEx

**Status:** Partially checked / Public direct exchange-source observation  
**Official:** No, unless confirmed by BitcoinII maintainers  
**URL:** `https://www.coinex.com/en/exchange/BC2-USDT` and `https://www.coinex.com/en/info/BC2`  
**Pairs:** `BC2/USDT` indicated by public market page title; detailed rows limited by rendered/static-text visibility  
**Deposits enabled:** Not publicly confirmed from inspected text  
**Withdrawals enabled:** Not publicly confirmed from inspected text  
**Trading enabled:** Public navigation/actions visible; actual trading was not tested  
**Region/KYC restrictions:** Risk/disclaimer text visible on info page; no specific region/KYC warning extracted from fetched page text  
**Last checked:** 2026-07-06  
**Evidence level:** E4 direct public-page observation; not E8 account/service verification

**What was checked:**

- Public market page loaded through browser inspection, though local shell request could not connect.
- Public market page title indicated `BC2/USDT`.
- Public info page loaded and clearly identified `BitcoinII` / `BC2`.
- Info page included `Deposit` and `Trade` actions.
- Info page included project-style information such as PoW and links to website/source/explorer.

**What was not checked:**

- No account login.
- No order placement.
- No trade execution.
- No deposit.
- No withdrawal.
- No account-gated wallet or status checks.
- No confirmation that deposits or withdrawals are open.

**Notes:**

CoinEx has public BC2 pages, but market details and status fields were limited by JavaScript-rendered/static-text visibility during this check.

### NestEx candidate

**Status:** Needs Review / Not confirmed from direct page  
**Official:** No  
**URL:** `https://nestex.com/market/BC2_USDT`  
**Pairs:** Not confirmed from direct page  
**Deposits enabled:** Not visible  
**Withdrawals enabled:** Not visible  
**Trading enabled:** Not confirmed  
**Region/KYC restrictions:** Not visible  
**Last checked:** 2026-07-06  
**Evidence level:** E2/E4 candidate observation only

**What was checked:**

- Direct market URL only loaded a small redirect shell from the check environment.
- `/lander` returned forbidden from the check environment.
- Third-party aggregators listed NestEx as a candidate.

**What was not checked:**

- No direct market content confirmed.
- No account login.
- No trade, deposit, withdrawal, region, or KYC checks.

**Notes:**

Do not list NestEx as a confirmed direct exchange listing until its public direct market page can be checked.

## Third-party aggregator observations

Aggregators are useful discovery sources, but they should not be treated as proof that deposits, withdrawals, liquidity, or trading are currently available on an exchange source.

| Resource | Date checked | Result | Status |
|---|---|---|---|
| CoinPaprika `bc2-bitcoin-ii` | 2026-07-06 | Loaded and identified BitcoinII/BC2. Named NonKYC.io and NestEx and indicated exchange/market count. | Third-party discovery source |
| CoinCodex `bitcoinii` | 2026-07-06 | Loaded and identified BitcoinII/BC2. Listed `BC2/USDT`, NonKyc.io, and CoinEx. | Third-party discovery source |
| LiveCoinWatch `BitcoinII-BC2` | 2026-07-06 | Loaded and identified BitcoinII/BC2. Listed `BC2/USDT`, `BC2/BTC`, NonKYC Exchange, CoinEx, and NestEx. | Third-party discovery source |
| CoinMarketCap `bitcoinii` | 2026-07-06 | Loaded and identified BitcoinII/BC2, but market rows were not visible in fetched static text. | Third-party discovery source / limited extraction |
| CoinGecko `bitcoinii` | 2026-07-06 | Blocked with 403 from check environment. | Not checked |

## Current status

MoreBC2 has direct public-page observations for NonKYC and CoinEx, but no exchange has been evaluated as safe, recommended, liquid, operationally reliable, or available to any specific user or region.

Public deposit/withdrawal text was observed only for NonKYC's asset page, and no deposit or withdrawal was attempted.

## What to check

For each exchange, verify:

- Exchange website loads.
- BC2 or BitcoinII is listed directly by the exchange.
- Trading pair exists.
- Trading appears enabled, if visible.
- Deposits status is visible, if available.
- Withdrawals status is visible, if available.
- Volume/market information is current and dated.
- KYC or regional restrictions are visible, if available.
- Last checked date is recorded.

A trading pair alone does not prove deposits or withdrawals are open.

Do not claim a current listing from a third-party price aggregator alone.

## Exchange applications

If an exchange listing is only being discussed or applied for, list it as:

**Status:** Application discussed

Do not list it as active.

## Open items

- Recheck NonKYC deposit/withdrawal status from public pages before any publication.
- Recheck CoinEx public market/status with a method that can inspect rendered market data.
- Confirm or reject NestEx only after direct public market content can be reached.
- Verify current exchange listings from direct exchange pages, not aggregators alone.
- Verify whether deposits and withdrawals are open without making a deposit or withdrawal.
- Add exchange-specific region/KYC notes only after direct review.

## Related pages

- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Exchange integration package](../exchange/integration-package.md)
- [Exchange operator guide](../exchange/operator-guide.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)
- [Known unknowns](../verification/known-unknowns.md)

## Verification

**Status:** Draft
**Primary sources checked:** Ecosystem direct check plan, existing exchange framework, and Codex public exchange listing check from 2026-07-06
**Notes:** Direct public-page observations are recorded for NonKYC and CoinEx. NestEx remains unconfirmed from direct public page access. Aggregators are treated as discovery sources only. No exchange is recommended, tested through an account, or verified for user-specific availability.
