# Mining pools

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-07-06

## Summary

This page tracks BitcoinII (BC2) mining pool resources.

Pool links, fee models, payout rules, and activity should be checked directly before a pool is listed as active.

Use [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md) before adding or promoting pool listings.

## Listing format

```md
### Pool name

**Status:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical / Do not recommend
**Official:** Yes / No / Unknown
**URL:**
**Coin listed as:** BitcoinII / BC2 / Other / Unknown
**Algorithm:** Unknown unless verified
**Fee model:** Unknown unless verified
**Payout model:** Unknown unless verified
**Minimum payout:** Unknown unless verified
**Stratum host/port:** Unknown unless verified
**Last checked:** YYYY-MM-DD
**Evidence level:** E4/E8
**What was checked:**
**What was not checked:**
**Notes:**
```

## Observed mining/stat resources

### MiningPoolStats BitcoinII page

**Status:** Observed / Related / Needs comparison  
**Official:** No  
**URL:** `https://miningpoolstats.stream/bitcoinii`  
**Coin listed as:** `Bitcoin II (BC2)`  
**Algorithm:** `SHA-256` observed in page title  
**Fee model:** Not checked  
**Payout model:** Not checked  
**Minimum payout:** Not checked  
**Stratum host/port:** Not checked  
**Last checked:** 2026-07-06  
**Evidence level:** E4 public page/data endpoint observation; not E8 pool reliability/sync evidence

**What was checked:**

- Main MiningPoolStats BitcoinII page loaded.
- Page title identified `Bitcoin II (BC2) SHA-256 | Mining Pools`.
- Public data endpoint for `bitcoinii` was observed.
- Public price endpoint for `bitcoinii` was observed.
- Visible/data endpoint height was `57,398` during the check.
- Page linked to `https://bitcoinii.ddns.net/explorer`.

**What was not checked:**

- Pool payout correctness.
- Pool sync status.
- Pool fee and payout-rule details.
- Mining account or payout behavior.
- Stratum host/port details.
- Whether data endpoints are documented or stable.
- Whether the reported height is reliable enough to call any explorer synced.

**Notes:**

MiningPoolStats is a related mining/network stats resource, not a general block explorer. Do not treat it as proof of pool payout reliability or explorer sync.

## Current status

MoreBC2 has observed one related public BitcoinII mining/statistics page, but has not yet verified active BitcoinII mining pools, fee models, payout rules, stratum details, or payout reliability.

## What to check

For each pool, verify:

- Site loads.
- BC2 or BitcoinII is listed directly by the pool.
- Algorithm is shown, if visible.
- Pool appears synced, if status is visible.
- Recent activity is visible, if the pool displays it.
- Fee model is documented.
- Payout model is documented.
- Payout threshold is documented.
- Connection information is documented.
- Last checked date is recorded.

Do not claim profitability, safety, or payout reliability without direct dated evidence.

## Open items

- Verify current pool list beyond MiningPoolStats aggregation.
- Add active dated-check entries only after direct checks.
- Add configuration examples only after testing.
- Add mining software compatibility notes only after verification.
- Compare pool-reported height/status against explorer and/or local node data before any sync claim.

## Related pages

- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Mining overview](../mining/mining-overview.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Verification queue](../verification/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** Ecosystem direct check plan, existing mining-pool framework, and Codex explorer/API recon report from 2026-07-06
**Notes:** One related mining/statistics resource is observed. No pool is listed as active or reliable because fee, payout, stratum, sync, and payout behavior checks have not been completed.
