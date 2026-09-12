# Ecosystem index

**Category:** Documentation
**Status:** Reviewed / Time-sensitive directory
**Last reviewed:** 2026-09-12

## Summary

This section tracks BitcoinII (BC2) ecosystem resources such as wallets, explorers, mining pools, exchanges, APIs, dashboards, and community-hosted infrastructure.

Ecosystem pages are intentionally time-sensitive. A service being reachable once does not establish long-term uptime, independence, custody suitability, payout reliability, wallet safety, or an SLA.

Current API behavior belongs in [API documentation](../api/README.md), live service status belongs in [Infrastructure](../infrastructure/README.md), compatibility interpretation belongs in [Compatibility](../compatibility/README.md), and canonical test records belong in the [verification evidence index](../verification/verification-index.md).

## Current pages

- [Wallets](wallets.md)
- [Explorers](explorers.md)
- [APIs](apis.md)
- [Mining pools](mining-pools.md)
- [Exchanges](exchanges.md)
- [Resources](resources.md)

## Ecosystem audit — 2026-09-12

| Page | Audit state | Current note |
|---|---|---|
| `README.md` | Refreshed | Removed stale planning language and synchronized section-wide evidence rules. |
| `wallets.md` | Refreshed | Updated for BitcoinII Core `v31.1.0`, current wallet projects, Tangem's unsupported status, and unresolved official-label conflicts. |
| `explorers.md` | Reviewed / current | September 11 direct explorer/API checks remain the current dated evidence. |
| `apis.md` | Reviewed / current | September 11 public API/WebSocket/Electrum observations remain current and properly bounded. |
| `mining-pools.md` | Refreshed | Added current direct public observations for 1Miner.Net, CapsPool, and BCMonster; retained MiningPoolStats as an aggregator. |
| `exchanges.md` | Reviewed / current | September 12 CoinEx, NonKYC, NestEx, and Biconomy evidence remains current. |
| `resources.md` | Refreshed | Replaced the empty framework with a dated directory of current project and ecosystem resources. |

A page can remain **Draft** or **Partial** after review. Those labels describe evidence maturity, not whether the page was skipped.

## Evidence labels

Use narrow, claim-appropriate labels:

| Label | Meaning |
|---|---|
| Needs Review | No adequate current direct check recorded. |
| Observed | Page, repository, API, or service was directly observed, but functional behavior was not fully exercised. |
| Partially checked | Some important behavior was checked, but material gaps remain. |
| Active, dated check | Direct current evidence supports availability on a specific date. |
| Locally tested | Behavior was exercised in a documented local test environment. |
| Unreachable | A direct check failed on a specific date. |
| Historical / legacy | Retained for history; not evidence of current availability. |
| Do not recommend / unsupported | Current evidence says users should not be directed there for the stated use. |

Avoid broad `Verified` labels for third-party ecosystem services unless the verification scope is explicit and repeatable.

## Listing format

```md
### Name

**Category:** Wallet / Explorer / API / Pool / Exchange / Resource / Other
**Status:** Needs Review / Observed / Partially checked / Active, dated check / Unreachable / Historical / Unsupported
**Official:** Yes / No / Unknown / Conflicting public labels
**URL:**
**Maintainer:** Unknown unless public
**Last checked:** YYYY-MM-DD
**Evidence:**
**What was checked:**
**What was not checked:**
**Notes:**
```

## Current section rules

- Prefer direct service, repository, app-store, or project-controlled sources over aggregators.
- Date every operational observation.
- Separate listing existence from actual function.
- Do not call a service official merely because it uses a project-like name or domain.
- When project-controlled sources disagree about official status, preserve the disagreement instead of choosing one silently.
- Do not infer independent redundancy from multiple hostnames.
- Do not infer wallet compatibility from Electrum or API reachability alone.
- Do not infer payout reliability from a mining-pool dashboard or public stats endpoint.
- Do not infer exchange safety from deposit/withdraw status.
- Public APIs are useful for observation and cross-checking but should not replace an operator's own node for critical custody workflows.
- Release/download links must remain bounded by the current release-authentication evidence.

## Future additions

Separate pages for community projects, merchants, mining software, or libraries should be created only when there is enough directly checked material to justify maintaining a dedicated time-sensitive directory. Until then, relevant entries can live in [Resources](resources.md) or the most specific existing ecosystem page.

## Related pages

- [API documentation](../api/README.md)
- [Infrastructure directory](../infrastructure/README.md)
- [Compatibility](../compatibility/README.md)
- [Verification evidence index](../verification/verification-index.md)
- [Ecosystem direct check plan](../verification/ecosystem-direct-check-plan.md)
- [Exchange integration](../exchange/README.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Mining overview](../mining/mining-overview.md)
- [Known unknowns](../verification/known-unknowns.md)

## Verification

**Status:** Reviewed / Time-sensitive directory
**Primary sources checked:** Current ecosystem pages; 2026-09-11 public-infrastructure evidence; 2026-09-12 exchange evidence; current BitcoinII project website/repositories; current wallet and mining-service public sources
**Notes:** This index records the audit state of the ecosystem section. Individual services remain subject to their page-specific evidence boundaries and recheck dates.