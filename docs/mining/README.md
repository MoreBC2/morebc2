# Mining

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This section documents BitcoinII (BC2) proof-of-work mining using BitcoinII Core `v31.1.0` as the current protocol baseline and dated public observations for pools, Stratum endpoints, payout policies, and network telemetry.

Current mainnet uses double-SHA256 block-header proof of work, targets 10-minute blocks, and uses **ShockWave per-block difficulty adjustment from height `57750`**. Pool connection details, payout modes, endpoint availability, hashrate, and fees are operational service data rather than consensus rules and must stay date-qualified.

The Mining section currently contains two first-class pages:

- [Mining overview](mining-overview.md) — current v31 mining behavior, block-template implications, pool/Stratum boundaries, payout evidence, and operating cautions.
- this section index.

Supporting material lives in [Ecosystem mining pools](../ecosystem/mining-pools.md), [ShockWave v31](../developers/source-atlas/shockwave-v31.md), [block-template assembly](../developers/source-atlas/miner.md), [difficulty adjustment](../encyclopedia/difficulty-adjustment.md), and [proof-of-work](../encyclopedia/proof-of-work.md).

## Current protocol anchors

Release-pinned/source-reviewed evidence supports these current mining facts:

- block-header proof of work uses double-SHA256;
- target block spacing remains 10 minutes;
- subsidy halving interval remains `210000` blocks;
- ShockWave activates at mainnet height `57750` and determines required work per block after activation;
- the normal ShockWave path uses 25 sampled blocks / 24 completed intervals plus a shorter six-interval response path;
- normal next-target movement is bounded relative to the preceding block, subject to `powLimit`;
- emergency stall recovery can make candidate header time relevant to required work;
- `GetNextWorkRequired()` remains the production consensus entry point for next-block difficulty;
- block-template code recalculates `nBits` when candidate time changes, because time and required work are no longer safely treated as independent between 2016-block boundaries;
- chain selection remains based on accumulated chain work.

The inherited 14-day / 2016-block parameters remain relevant to pre-`57750` history and inherited helpers. They are **not** the current post-activation mainnet difficulty schedule.

## Current public mining ecosystem snapshot

The current pool audit from 2026-09-12 establishes only dated public configuration and service observations.

| Service | Observed BC2 mode(s) | Published fee / payout information | Stratum/configuration evidence | Operational boundary |
|---|---|---|---|---|
| 1Miner.Net | PPLNS, SOLO | `1%`; minimum payout `0.01 BC2` shown on the checked BC2 pages | PPLNS ports `4331`-`4334`; SOLO ports `4431`-`4434`; US/EU/SGP host families published | US-TX was reported operational while EU-FR and SGP were unreachable during the dated check. No MoreBC2 share or payout test. |
| CapsPool.io | SOLO, PPS | `1%` shown for both; PPS page uses hourly-payout language | General ASIC `:3333`, rental/high-difficulty `:4334`, Bitaxe `:3337`, PPS `:3335`; EU hostname family also published | Configuration observed only. No MoreBC2 share-submission, PPS-accounting, payout-timing, or full endpoint test. |
| BCMonster | Pool support documented | API documentation exposes fee/minimum-payout fields | BC2 is explicitly listed by name/ticker and API documentation exposes stratum host/port fields | Public support/documentation evidence only; direct miner connectivity and payout behavior untested. |
| MiningPoolStats | Aggregator/discovery | Not treated as a pool payout authority | Project website links it as a pool-discovery resource | Listing or statistics do not prove a listed pool is synced, reachable, solvent, or paying correctly. |

See [Ecosystem mining pools](../ecosystem/mining-pools.md) for the dated service records and source links.

## Stratum boundary

BitcoinII Core mining RPC and pool Stratum are separate interfaces.

Core exposes/source-defines mining and block-template RPCs such as `getblocktemplate`, `submitblock`, `submitheader`, `getmininginfo`, and `getnetworkhashps`. Public pools separately advertise Stratum hostnames and ports for mining hardware or rental services.

MoreBC2 has **not** yet performed a current BC2 Stratum subscribe/authorize/share-submission test against the pool endpoints listed above. A published hostname/port therefore proves configuration disclosure, not successful handshake, accepted shares, correct difficulty assignment, block-template correctness, or payout accounting.

Do not infer BC2 pool compatibility merely because hardware or software supports SHA-256d generally. Post-activation block-template handling must remain correct for BitcoinII's current candidate-time / ShockWave `nBits` behavior.

## Payout boundary

Pool payout models are operator policies, not BitcoinII consensus rules.

Current public evidence shows PPLNS and SOLO at 1Miner.Net and SOLO/PPS at CapsPool. Those labels and published fees/minimums describe what the services advertise; MoreBC2 has not independently verified share accounting, payout calculations, payout timing, solvency, orphan handling, block attribution, or withdrawal reliability.

The network's block subsidy and transaction fees are distinct from a pool's miner payout policy. At the current pre-first-halving chain height, the inherited `210000`-block subsidy schedule remains before its first halving; pool operators may still distribute block income according to their own advertised accounting model and fees.

## Current operational telemetry

The 2026-09-11 public-infrastructure check observed working mining-stat endpoints on both the Official BitcoinII Explorer and the tested Mempool-style services, including official-explorer hashrate/difficulty/next-block responses and Mempool-style hashrate/difficulty-adjustment responses.

These are useful dated observations, not independent consensus sources or profitability guarantees. Public hashrate estimates depend on service methodology and observed chain history.

## Mining RPC and runtime status

Mining/template source has been reviewed against `v31.1.0`, including the candidate-time difficulty recalculation added for ShockWave.

However, the September v31 Windows node and PSBT runtime records did **not** exercise `getmininginfo`, `getnetworkhashps`, `getblocktemplate`, `submitblock`, or public mining workflows. Those commands remain source-reviewed / not yet release-specific runtime verified unless a later dated record says otherwise.

Advanced block-submission examples should remain out of beginner documentation until a dedicated isolated workflow exists.

## Documentation rules

- Use **ShockWave** for current post-`57750` difficulty behavior; do not describe current mainnet as 2016-block-only retargeting.
- Keep protocol/source claims separate from pool and market observations.
- Date pool, Stratum, fee, minimum-payout, regional-status, and hashrate claims.
- A pool dashboard or configuration page does not prove share acceptance or payout reliability.
- A Stratum hostname/port does not prove successful connection or compatibility.
- Do not present public service hashrate as an exact independent measurement of total network work.
- Do not claim profitability or future value.
- Do not recommend a pool merely because it is listed or reachable.
- Distinguish pool share difficulty from the network proof-of-work target.
- Do not publish state-changing mining RPC examples as tested unless a dated isolated test record exists.

## 2026-09-12 section audit

Both files in `docs/mining/` were reviewed against:

- BitcoinII Core `v31.1.0` ShockWave and mining/template source review;
- the v31 wallet/mempool/mining regression audit;
- the September 12 pool audit;
- September 11 public mining/API observations;
- current network specifications and halving constants.

The main repairs were to add the current pool/Stratum/payout evidence, remove the implication that direct pool checks were still merely planned, document the Core-RPC-versus-Stratum boundary, add candidate-time / `nBits` operational implications, and keep payout/accounting claims bounded to what pool pages actually establish.

## Related pages

- [Mining overview](mining-overview.md)
- [Ecosystem mining pools](../ecosystem/mining-pools.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Block-template assembly](../developers/source-atlas/miner.md)
- [Mining RPC source atlas](../developers/source-atlas/rpc-mining.md)
- [Network specifications](../documentation/network-specifications.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [v31 wallet/mempool/mining regression audit — 2026-09-02](../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Command testing status](../verification/command-testing.md)

## Verification

**Status:** Reviewed / Partial  
**Primary evidence:** BitcoinII Core `v31.1.0` release-pinned mining/difficulty source reviews, September 2026 pool audit, public-infrastructure observations, and current network specifications  
**Notes:** Current consensus/mining-template behavior and public pool configuration are documented. Direct BC2 Stratum handshake/share testing, pool payout verification, mining-RPC runtime regression, profitability, and long-term pool reliability remain unverified.
