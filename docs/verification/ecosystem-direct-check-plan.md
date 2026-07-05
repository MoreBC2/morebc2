# Ecosystem direct check plan

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-04

## Summary

This page defines how MoreBC2 should check BitcoinII ecosystem resources before making active-service claims.

It is a plan only. It does not claim any explorer, API, pool, exchange, wallet, or community resource is active, recommended, official, synced, reliable, or safe.

## Why this exists

MoreBC2 has framework pages for ecosystem resources, but current service status changes over time.

Any claim about an active explorer, API, mining pool, exchange listing, wallet download, or community resource needs dated direct evidence.

## Evidence rule

Do not list a service as active unless the page records:

- URL checked
- date checked
- who checked it
- what was observed
- whether the check was direct or indirect
- whether deposits/withdrawals, sync, APIs, or downloads were actually tested
- what remains unknown

## Status labels

Use these labels consistently:

| Label | Meaning |
|---|---|
| Needs Review | No current direct check recorded. |
| Observed | Page or service was reachable, but function was not fully tested. |
| Partially checked | Some function was checked, but important gaps remain. |
| Active, dated check | Direct check supports active status on a specific date. |
| Unreachable | Direct check failed on a specific date. |
| Historical / legacy | Mentioned for history only, not current availability. |
| Do not recommend | Evidence suggests users should not be directed there. |

Avoid `Verified` for ecosystem services unless there is a clear evidence policy and repeatable check record.

## Explorer check fields

For an explorer, record:

| Field | Required? |
|---|---|
| Explorer name | Yes |
| URL | Yes |
| Date checked | Yes |
| Page reachable | Yes |
| Current height shown | If visible |
| Best block hash shown | If visible |
| Recent blocks visible | If visible |
| Transaction lookup tested | Optional, only with harmless public txid |
| Address lookup tested | Optional, only with public address |
| API endpoint tested | If claiming API support |
| Comparison source | If claiming synced status |
| Notes/gaps | Always |

Do not claim synced unless compared against another reliable source or local node output.

## API check fields

For an API, record:

| Field | Required? |
|---|---|
| API name | Yes |
| Base URL | Yes |
| Date checked | Yes |
| Endpoint tested | Yes |
| Request method | Yes |
| Response status | Yes |
| Example response summarized | Yes, without sensitive data |
| Rate limits/auth requirements | If visible |
| Docs URL | If available |
| Notes/gaps | Always |

Do not publish raw API keys, tokens, private endpoints, or personal account data.

## Mining pool check fields

For a mining pool, record:

| Field | Required? |
|---|---|
| Pool name | Yes |
| URL | Yes |
| Date checked | Yes |
| Coin listed as BitcoinII/BC2 | Yes |
| Algorithm shown | If visible |
| Pool fee | If visible |
| Payout model | If visible |
| Minimum payout | If visible |
| Stratum host/port | If visible |
| Pool height/hashrate/miners | If visible |
| Last block found | If visible |
| Withdrawal/payout status | Only if directly checked or documented |
| Notes/gaps | Always |

Do not claim profitability, safety, or payout reliability without direct evidence.

## Exchange check fields

For an exchange, record:

| Field | Required? |
|---|---|
| Exchange name | Yes |
| URL | Yes |
| Date checked | Yes |
| Pair(s) listed | If visible |
| Deposits open | If directly visible |
| Withdrawals open | If directly visible |
| Trading enabled | If directly visible |
| KYC/region restrictions | If visible |
| Listing source | Direct exchange page preferred |
| Notes/gaps | Always |

Do not claim a current listing from a third-party price aggregator alone.

Do not recommend an exchange unless deposits, withdrawals, region constraints, and basic risk notes are checked and dated.

## Wallet/resource check fields

For wallets, downloads, or community resources, record:

| Field | Required? |
|---|---|
| Resource name | Yes |
| URL | Yes |
| Date checked | Yes |
| Maintainer/source | If visible |
| Version | If visible |
| Download type | If visible |
| Checksum/signature available | If visible |
| Compatibility claim | If visible |
| Last update | If visible |
| Notes/gaps | Always |

Do not tell users to download or run software from a resource until release/download verification is separately handled.

## Suggested check record template

```md
### Ecosystem check: resource name

**Date checked:** YYYY-MM-DD
**Checker:**
**Resource type:** explorer / API / pool / exchange / wallet / community
**URL:**
**Directly reachable:** yes / no / partial
**Observed status:**
**Evidence level:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical
**What was tested:**
**What was not tested:**
**Screenshots or archived evidence:** optional
**Notes:**
```

## First-pass order

Recommended order:

1. Explorers and APIs.
2. Mining pools.
3. Exchange listing pages.
4. Wallet/download resources.
5. Community resources.

Explorers/APIs should come first because they can help with later chain-height, transaction, and service checks.

## What not to do

Do not:

- call a service official without an official source,
- list a service as active from memory,
- rely only on old screenshots or community posts,
- infer deposits or withdrawals are open from a trading pair,
- publish account-specific data,
- recommend downloads before release/download verification,
- mix historical listings with current listings.

## Related pages

- [Ecosystem README](../ecosystem/README.md)
- [Ecosystem APIs](../ecosystem/apis.md)
- [Ecosystem explorers](../ecosystem/explorers.md)
- [Ecosystem mining pools](../ecosystem/mining-pools.md)
- [Ecosystem exchanges](../ecosystem/exchanges.md)
- [Ecosystem wallets](../ecosystem/wallets.md)
- [Explorer resources](../documentation/explorer-resources.md)
- [Open questions backlog](open-questions.md)
- [Documentation coverage](../documentation-coverage.md)

## Verification

**Status:** Draft
**Primary sources checked:** Existing MoreBC2 ecosystem framework pages and verification backlog
**Notes:** This is a check plan only. No live ecosystem service is verified by this page.
