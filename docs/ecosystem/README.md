# Ecosystem index

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-13

## Summary

This section tracks BitcoinII (BC2) ecosystem resources such as wallets, explorers, mining pools, exchanges, resources, services, APIs, and community projects.

This section is broader ecosystem and community context. Current API behavior belongs in [API documentation](../api/README.md), live service status belongs in [Infrastructure](../infrastructure/README.md), compatibility interpretation belongs in [Compatibility](../compatibility/README.md), and canonical evidence summaries belong in the [verification evidence index](../verification/verification-index.md).

Nothing should be listed as active until it has been directly checked and dated. Some dated explorer, API, WebSocket, Electrum, exchange-page, and mining-statistics observations now exist, but they do not establish reliability, official ownership/status, wallet support, account-gated exchange operation, or service-provider suitability.

Ecosystem pages are time-sensitive. Every listing should include a review date, status, evidence level, and notes about what was and was not checked.

Use [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md) before adding or promoting any ecosystem listing.

## Current pages

- [Wallets](wallets.md)
- [Explorers](explorers.md)
- [APIs](apis.md)
- [Mining pools](mining-pools.md)
- [Exchanges](exchanges.md)
- [Resources](resources.md)

## Resource categories

- Wallets
- Explorers
- APIs
- Mining pools
- Exchanges
- Mining software
- Libraries
- Community resources
- Merchants
- Educational resources

## Status labels

Use these labels consistently with the ecosystem check plan:

| Label | Meaning |
|---|---|
| Needs Review | No current direct check recorded. |
| Observed | Page or service was reachable, but function was not fully tested. |
| Partially checked | Some function was checked, but important gaps remain. |
| Active, dated check | Direct check supports active status on a specific date. |
| Unreachable | Direct check failed on a specific date. |
| Historical / legacy | Mentioned for history only, not current availability. |
| Do not recommend | Evidence suggests users should not be directed there. |

Avoid `Verified` for ecosystem services unless MoreBC2 later adopts a repeatable ecosystem verification policy.

## Listing format

```md
### Name

**Category:** Wallet / Explorer / API / Pool / Exchange / Resource / Other
**Status:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical / Do not recommend
**Official:** Yes / No / Unknown
**URL:**
**Maintainer:** Unknown unless public
**Last checked:** YYYY-MM-DD
**Evidence level:** E1-E8
**What was checked:**
**What was not checked:**
**Notes:**
```

## Pages still to create

- `community-projects.md`
- `merchants.md`
- `mining-software.md`
- `libraries.md`

## Rules

- Do not list a service as active without checking it directly and dating the check.
- Do not call a service official unless an official source says so.
- Record last checked dates.
- Mark uncertain listings as Needs Review.
- Market data and exchange data are time-sensitive.
- Separate current ecosystem status from historical listings.
- Prefer direct checks over copied community lists.
- Link relevant service-integration docs for services that need node/RPC behavior.
- Do not imply a public API can replace running a local node for critical service workflows.
- Do not recommend downloads until release/download verification is separately handled.

## Related pages

- [API documentation](../api/README.md)
- [Infrastructure directory](../infrastructure/README.md)
- [Compatibility](../compatibility/README.md)
- [Verification evidence index](../verification/verification-index.md)
- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Exchange integration](../exchange/README.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Mining README](../mining/README.md)
- [RPC overview](../developers/rpc-overview.md)
- [Explorer resources](../documentation/explorer-resources.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation polish plan](../POLISH_PLAN.md)
- [History](../history/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** Ecosystem framework pages, ecosystem direct check plan, verification evidence index, API section, Infrastructure section, and Compatibility section
**Notes:** This is an ecosystem overview. Dated observations exist for some public services, but specific ecosystem listings still need direct verification and periodic refresh before being described as active, reliable, official, supported, or recommended.
