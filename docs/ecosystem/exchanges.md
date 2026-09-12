# Exchanges

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page tracks public BitcoinII (BC2) exchange listings and current exchange-integration observations.

Exchange data is time-sensitive. A public trading pair does not prove that deposits, withdrawals, liquidity, or user-specific access are currently available.

For current confirmation-count evidence, see [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md).

## Current direct exchange-source observations

### CoinEx

**Status:** Active public BC2 listing / direct API status checked  
**Official:** No, unless confirmed by BitcoinII maintainers  
**Public market:** `BC2/USDT`  
**Deposits enabled:** `true` in public deposit/withdraw configuration API on 2026-09-12  
**Withdrawals enabled:** `true` in public deposit/withdraw configuration API on 2026-09-12  
**Trading enabled:** Public BC2/USDT market exists; account trade execution was not tested  
**Confirmation policy:** `safe_confirmations = 2`; `irreversible_confirmations = 6`  
**Last checked:** 2026-09-12  
**Evidence level:** Direct public exchange API / exchange page observation

Direct configuration query:

```text
GET https://api.coinex.com/v2/assets/deposit-withdraw-config?ccy=BC2
```

Important interpretation:

CoinEx's `irreversible_confirmations` is an exchange policy field. MoreBC2 does not describe six BC2 confirmations as cryptographically irreversible.

Sources:

- https://docs.coinex.com/api/v2/assets/deposit-withdrawal/http/list-all-deposit-withdrawal-config
- https://coinex-announcement.zendesk.com/hc/en-us/articles/41890315584916-CoinEx-Will-List-BC2-BitcoinII-on-Oct-6-2025
- https://www.coinex.com/en/orderbook/bc2-usdt

### NonKYC

**Status:** Active public BC2 listing / direct API status checked  
**Official:** No, unless confirmed by BitcoinII maintainers  
**Pairs:** `BC2/USDT` and `BC2/BTC` publicly associated with the asset  
**Deposits enabled:** `depositActive = true` on 2026-09-12  
**Withdrawals enabled:** `withdrawalActive = true` on 2026-09-12  
**Trading enabled:** Public BC2 market pages exist; account trade execution was not tested  
**Confirmation policy:** `confirmsRequired = 50`; separate `securityConfirmsRequired = 20` field has unresolved public semantics  
**Last checked:** 2026-09-12  
**Evidence level:** Direct public exchange API observation

Direct asset query:

```text
GET https://api.nonkyc.io/api/v2/asset/getbyticker/BC2
```

Caution:

The same public record contained descriptive fields that do not match current BC2 technical facts, including `isProofOfWork = false`, and it contained `Upcoming fork` notes that may be stale. MoreBC2 therefore treats the operational status/confirmation fields as useful current exchange evidence without treating every descriptive field as protocol authority.

The meaning of `securityConfirmsRequired = 20` has not been established from public documentation and must not be equated with CoinEx's second-stage confirmation field.

### NestEx

**Status:** Active public BC2 listing / direct backend status checked  
**Official:** No, unless confirmed by BitcoinII maintainers  
**Public spot page:** `https://trade.nestex.one/spot/BC2`  
**Deposits enabled:** `candeposit = true` in public coin API on 2026-09-12  
**Withdrawals enabled:** `canwithdraw = true` in public coin API on 2026-09-12  
**Trading enabled:** `spottrade = true` in public coin API; account trade execution was not tested  
**Confirmation policy:** explicit BC2 backend `conf = 50`  
**Decimals:** `8`  
**Last checked:** 2026-09-12  
**Evidence level:** Direct public exchange backend/API observation

Direct coin query:

```text
GET https://api.nestex.one/v1/coins
```

NestEx's Wallet Status frontend uses `50` as a fallback display when an asset has no explicit confirmation value. That fallback alone would not prove BC2's configured count. The `/v1/coins` backend response resolves the ambiguity because the BC2 object itself explicitly returns `conf = 50`.

Other public evidence observed during the same review included a BC2 liquidity endpoint and proof-of-reserves pages showing BC2 wallet infrastructure. Those observations do not constitute a recommendation or a liquidity-quality guarantee.

Sources:

- https://api.nestex.one/v1/coins
- https://trade.nestex.one/wallet-status
- https://trade.nestex.one/spot/BC2
- https://trade.nestex.one/proof-of-reserves

### Biconomy

**Status:** BC2 listing confirmed / current wallet policy only partially visible publicly  
**Official:** No, unless confirmed by BitcoinII maintainers  
**BC2 listing metadata:** Publicly retrievable  
**Deposits enabled:** Current status not independently verified from a public wallet-status endpoint  
**Withdrawals enabled:** Current status not independently verified  
**Trading enabled:** BC2 listing/trading material remains public; current account trading was not tested  
**Confirmation policy:** Not publicly verified  
**Last checked:** 2026-09-12  
**Evidence level:** Direct public Biconomy metadata and frontend/API review; wallet-specific configuration unresolved

Biconomy's public BC2 metadata endpoint:

```text
GET https://openapi.biconomy.com/api/v1/assetIntro/BC2
```

The record identifies `BC2` / `BitcoinII` but does not expose deposit confirmation count or present wallet-status fields.

Biconomy's public frontend contains a deposit warning parameterized with `min_confirmation`, showing that the platform uses a per-deposit confirmation value. Its public `/api/v1/chains-config` endpoint did not expose BC2-specific confirmation data during the 2026-09-12 check. Wallet-specific per-asset routes appear to require authenticated user context.

#### January 2026 wallet-upgrade incident

Biconomy announced the BC2 spot listing in January 2026 and initially announced deposits and withdrawals as available.

Shortly after launch, a community report stated that BC2 deposits were temporarily closed for a **Wallet Upgrade**. A later community follow-up reported deposits operational again and included a successful small test deposit.

MoreBC2 records this only as a dated wallet-service interruption. It does not infer the underlying technical cause, does not connect the event to later chain conditions without evidence, and does not treat it as proof of current deposit or withdrawal status.

Sources:

- https://biconomy.zendesk.com/hc/en-us/articles/53895465558553-Biconomy-com-New-Listing-Bitcoin-II-BC2-for-Spot-Trading
- https://openapi.biconomy.com/api/v1/assetIntro/BC2
- https://openapi.biconomy.com/api/v1/chains-config
- https://www.reddit.com/r/BitcoinII/comments/1q3pjmv/re_biconomy_deposits_closed/

## Confirmation-policy comparison

| Exchange | Current verified BC2 confirmation evidence |
|---|---|
| CoinEx | `2` safe / `6` exchange-defined `irreversible` |
| NonKYC | `50` deposit confirmations; separate `securityConfirmsRequired = 20` meaning unresolved |
| NestEx | explicit BC2 backend `conf = 50` |
| Biconomy | not publicly verified |

Two independently queried BC2 venues currently use 50 confirmations. This supports MoreBC2's **provisional 50-confirmation normal-deposit baseline**, but it does not create a network rule or fixed finality guarantee.

See [Deposit monitoring](../exchange/deposit-monitoring.md) for the current operational guidance.

## What has not been verified

For all venues above unless explicitly stated otherwise:

- No user account was logged into during the public checks recorded here.
- No order was placed.
- No deposit was sent.
- No withdrawal was performed.
- No exchange is being represented as safe, reliable, liquid, or recommended.
- Region/KYC/account-specific availability was not established.
- Public status can change after the dated check.

## Third-party aggregators

Aggregators remain useful for discovering possible markets, but they should not be treated as proof that deposits, withdrawals, liquidity, or trading are currently operational.

Direct exchange sources should take precedence whenever available.

## Update rules

For each exchange recheck:

- Record the date.
- Prefer direct exchange APIs and pages over aggregators.
- Separate listing existence from deposit, withdrawal, trading, liquidity, and account availability.
- Record confirmation settings exactly as the exchange exposes them.
- Preserve exchange-specific terminology without turning it into a protocol claim.
- Do not infer a disabled/enabled wallet state from a historical incident.

## Related pages

- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)
- [Exchange integration package](../exchange/integration-package.md)
- [Exchange operator guide](../exchange/operator-guide.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)
- [Known unknowns](../verification/known-unknowns.md)

## Verification

**Status:** Draft
**Primary sources checked:** Direct public CoinEx, NonKYC, NestEx, and Biconomy APIs/pages plus current exchange documentation and dated community evidence where explicitly labeled
**Notes:** CoinEx, NonKYC, and NestEx now have direct current BC2 confirmation/status observations. Biconomy's listing is confirmed, but its current wallet availability and BC2 confirmation count remain publicly unresolved. No exchange is recommended or account-tested by this record.