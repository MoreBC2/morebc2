# Mining pools

**Category:** Ecosystem
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page tracks currently observable BitcoinII (BC2) mining-pool resources.

A public pool page, API, or stratum configuration does not prove payout reliability, solvency, block-template correctness, share accounting, DDoS resilience, or long-term uptime. Current entries are dated observations, not endorsements.

## 1Miner.Net

**Status:** Active public BC2 pool pages / Partial regional service status  
**Official:** No BitcoinII-project designation established  
**Modes observed:** PPLNS and SOLO  
**Algorithm:** `Sha256D`  
**Fee:** `1%` shown on both BC2 connect pages  
**Minimum payout:** `0.01 BC2` shown  
**Last checked:** 2026-09-12

Observed BC2 PPLNS connection family:

- `1miner.net:4331` through `:4334`
- `eu1.1miner.net:4331` through `:4334`
- `sgp.1miner.net:4331` through `:4334`

Observed BC2 SOLO connection family:

- `1miner.net:4431` through `:4434`
- `eu1.1miner.net:4431` through `:4434`
- `sgp.1miner.net:4431` through `:4434`

The public status/connect pages showed the US-TX endpoint operational while EU-FR and SGP were reported unreachable during the dated check window. Treat regional availability as time-sensitive.

The pool pages also advertise NiceHash/MiningRigRentals compatibility. MoreBC2 did not test rental-service connectivity, share acceptance, payouts, or block attribution in this audit.

Sources:

- https://1miner.net/pool/bc21/connect
- https://1miner.net/pool/bc22/connect
- https://1miner.net/status

## CapsPool.io

**Status:** Active public BC2 pool page / Configuration observed  
**Official:** No BitcoinII-project designation established  
**Modes observed:** SOLO and PPS  
**Algorithm:** SHA-256 / SHA-256d  
**Last checked:** 2026-09-12

The public CapsPool page currently exposes BC2 mining configuration including:

- SOLO pool, `1%` fee;
- PPS pool, `1%` fee with hourly payout language;
- general ASIC stratum `stratum.capspool.io:3333`;
- rental/high-difficulty endpoint `:4334`;
- Bitaxe endpoint `:3337`;
- PPS endpoint `:3335`;
- EU hostname with the same documented port family.

The page also displays BC2 network/pool statistics and recent-block areas.

MoreBC2 did not independently connect a miner, submit shares, verify PPS accounting, verify payout timing, or validate every advertised stratum endpoint in this audit.

Source:

- https://capspool.io/

## BCMonster

**Status:** Active public API/documentation with explicit BC2 support  
**Official:** No BitcoinII-project designation established  
**Algorithm:** `sha256` / BC2 supported by name and ticker  
**Last checked:** 2026-09-12

BCMonster's public API documentation explicitly lists:

- Bitcoin II
- coin name `bitcoinii`
- ticker `bc2`

The API documentation exposes pool-level statistics endpoints such as `/api/mps/{coin}` and `/api/v1/pool_info/{coin}`, including documented fields for hashrate, workers, fee, minimum payout, network difficulty, height, last block, and stratum host/port.

This establishes current public BC2 support in BCMonster's service/API documentation. It does not establish payout reliability, share accounting, or current miner connectivity without a direct mining test.

Source:

- https://bcmonster.com/api.html

## MiningPoolStats

**Status:** Active aggregator / Discovery and cross-check resource  
**Official:** No  
**URL:** https://miningpoolstats.stream/bitcoinii  
**Coin:** Bitcoin II (BC2) / SHA-256  
**Last checked:** 2026-09-12

The BitcoinII project website currently links MiningPoolStats as the place to view available BC2 pools. MiningPoolStats is useful for discovering pool candidates and comparing public statistics.

It is an aggregator, not evidence that every listed pool is reachable, synced, paying correctly, or independently operated. Pool-specific claims should be checked against the pool itself.

## Other historical/current candidates

Older BitcoinII announcements and public ecosystem material mention additional pools, including MinorPool, Coin-Miners, Zpool, Crypto-Éire, AxeHub, and others. The current official explorer has also attributed recent blocks to multiple pool labels.

Those references are useful discovery evidence but are not enough by themselves for MoreBC2 to publish full connection/payout details. Add detailed entries only after a direct current pool check.

## What this audit establishes

As of 2026-09-12, MoreBC2 can support these narrow statements:

- 1Miner.Net publishes current BC2 PPLNS and SOLO configuration pages.
- CapsPool publishes current BC2 SOLO and PPS configuration.
- BCMonster's current API documentation explicitly supports BC2.
- MiningPoolStats remains a project-linked pool-discovery aggregator.

This audit does **not** establish which pool is safest, most profitable, most reliable, most decentralized, or best for any miner.

## Recheck checklist

For a future active-pool recheck, capture:

- site/API reachability;
- explicit BC2 listing;
- algorithm;
- payout model;
- fee;
- minimum payout;
- stratum hostname/port;
- region status;
- visible recent activity/block history;
- whether a direct stratum handshake/share test was actually performed;
- what payout behavior remains untested.

Do not infer payout reliability from a dashboard or marketing statement.

## Related pages

- [Mining overview](../mining/mining-overview.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Ecosystem index](README.md)
- [Known unknowns](../verification/known-unknowns.md)

## Verification

**Status:** Reviewed / Partial
**Primary sources checked:** Current 1Miner.Net BC2 PPLNS/SOLO and status pages; current CapsPool BC2 page; current BCMonster API documentation; current BitcoinII project website/MiningPoolStats linkage; preserved historical pool references
**Notes:** Pool existence/configuration is directly observed where stated. Miner connectivity, share accounting, payout correctness, and long-term reliability remain unverified unless a future dated test explicitly covers them.