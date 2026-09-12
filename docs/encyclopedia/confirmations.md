# Confirmations

**Category:** Documentation  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

A transaction gains confirmations after it is included in a block on the active best-work chain.

A transaction in the current active tip has one confirmation. Each later active-chain block built on top increases the count by one.

Confirmations are a useful settlement-depth signal, but they are **not absolute finality**. Under proof of work, a competing valid branch with greater accumulated chainwork can still reorganize previously confirmed blocks.

## Confirmation count

At a high level:

```text
transaction enters active-chain block -> 1 confirmation
one later active-chain block          -> 2 confirmations
two later active-chain blocks         -> 3 confirmations
...
```

The count only has meaning while the transaction's inclusion block remains on the active best-work chain. If a reorganization disconnects that block, the confirmation count must be recomputed from the new active chain.

## Why confirmations matter

Wallets, exchanges, merchants, and other services use confirmation depth as one input when deciding how much confidence to place in a transaction.

More confirmations generally mean an attacker or competing branch would need to replace more accumulated work to remove the transaction from the active chain. But block count alone does not fully describe that work, especially on a chain such as current BitcoinII where required work can change every block.

## BitcoinII and accumulated chainwork

BitcoinII Core selects among usable valid chain candidates by **accumulated chainwork**, not by height or confirmation count alone.

Current mainnet uses ShockWave difficulty adjustment from height `57750`. Because required work can change per block, two spans containing the same number of blocks can represent different amounts of cumulative work.

For operational monitoring, MoreBC2 therefore treats confirmation count and cumulative chainwork as related but distinct signals.

See [Life of a reorganization](../architecture/life-of-a-reorg.md) and [Deposit monitoring](../exchange/deposit-monitoring.md).

## Current exchange-policy evidence

MoreBC2's 2026-09-12 public exchange check found these current BC2 settings:

| Venue | Observed setting | Interpretation boundary |
|---|---:|---|
| CoinEx | `safe_confirmations = 2` | Exchange policy field, not a protocol rule |
| CoinEx | `irreversible_confirmations = 6` | Exchange terminology only; **not** cryptographic irreversibility |
| NonKYC | `confirmsRequired = 50` | Explicit current deposit-confirmation setting |
| NonKYC | `securityConfirmsRequired = 20` | Field observed, but public semantics were not established |
| NestEx | `conf = 50` | Explicit current BC2 backend confirmation setting |
| Biconomy | not publicly established | BC2 listing exists, but the exact current count was not exposed in the checked public data |

Based on two independently queried venues explicitly using 50, MoreBC2 currently uses **50 confirmations as a provisional baseline for ordinary exchange deposits**.

That is an operational recommendation, not BitcoinII consensus.

## What 50 confirmations means in time

BitcoinII targets 10-minute blocks.

At exactly the target cadence:

```text
50 blocks × 10 minutes = 500 minutes ≈ 8 hours 20 minutes
```

That is only an idealized time conversion. Actual blocks do not arrive on a perfect schedule, and ShockWave adjusts required work in response to recent timing conditions.

A service should count blocks / inspect active-chain state rather than assume a fixed wall-clock delay guarantees a fixed confirmation count.

## No finite count is absolute finality

BitcoinII does not gain deterministic or cryptographic finality at 6, 50, 100, or any other finite confirmation count.

A sufficiently strong competing branch can still cause a reorganization if it becomes the valid usable chain with greater accumulated work.

This is why MoreBC2 avoids phrases such as:

- "fully irreversible after X confirmations";
- "100% final after X blocks";
- "guaranteed safe after X confirmations."

A venue may use words such as `irreversible` internally, but those labels are service policy terminology rather than a consensus property.

## Risk-based service policy

For normal exchange deposits, MoreBC2 currently uses 50 as a provisional baseline. A production service can still apply a longer hold or manual review based on factors such as:

- unusually high transaction value;
- abnormal tip age or stalled progress;
- unexpected competing-tip / reorganization activity;
- poor peer or node health;
- unusual changes in observed work rate;
- insufficient cumulative chainwork after the inclusion point;
- account-specific fraud or operational risk.

MoreBC2 does **not** currently recommend replacing the 50 baseline with a universal second number such as 100 for every transaction. Higher-risk treatment should be justified by the service's risk model and current chain conditions.

## Wallet versus exchange use

A wallet may display a transaction as confirmed after one block while an exchange waits for many more blocks before crediting a customer balance.

Both can be internally consistent because they answer different questions:

- **wallet confirmation state:** is the transaction currently in the active chain, and how deep is it?
- **service settlement policy:** when is the service willing to take economic risk on that transaction?

The second question is operator policy, not consensus.

## Current evidence boundary

Current MoreBC2 evidence supports:

- best-work / chainwork-based chain selection from release-pinned source review;
- current ShockWave per-block difficulty behavior;
- current exchange confirmation settings from dated public APIs;
- the provisional 50-confirmation exchange baseline derived from that evidence.

MoreBC2 has **not** yet published:

- empirical BC2 reorganization-depth/frequency statistics;
- a calibrated probability table for reversal at each confirmation depth under ShockWave;
- a production incident history sufficient to convert the provisional baseline into a formal risk model.

Classic Nakamoto-style catch-up formulas can be educational, but they should not be presented as an exact BC2 risk model under current ShockWave conditions without additional assumptions and validation.

## Related pages

- [Reorganizations](reorganizations.md)
- [Proof-of-work](proof-of-work.md)
- [Difficulty adjustment](difficulty-adjustment.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)
- [Consensus overview](../documentation/consensus-overview.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 chain-selection / ShockWave documentation plus dated CoinEx, NonKYC, NestEx, and Biconomy public evidence recorded by MoreBC2 on 2026-09-12  
**Notes:** The concept explanation and current operational baseline are evidence-backed. The 50-confirmation baseline remains provisional service guidance rather than a consensus or finality rule, and empirical BC2 reversal-risk calibration remains open.
