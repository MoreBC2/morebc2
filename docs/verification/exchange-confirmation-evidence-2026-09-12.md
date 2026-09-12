# Exchange confirmation evidence — 2026-09-12

**Category:** Verification
**Status:** Current-dated evidence record
**Last reviewed:** 2026-09-12

## Purpose

This record captures directly observed BitcoinII (BC2) deposit-confirmation settings from current exchange APIs and public exchange infrastructure.

It is evidence for MoreBC2's exchange-integration documentation. It is **not** a BitcoinII consensus rule, a maintainer recommendation, or a guarantee that an exchange will keep the same policy.

## Evidence summary

| Venue | Current evidence | Deposit / withdrawal status | Interpretation |
|---|---|---|---|
| CoinEx | `safe_confirmations = 2`; `irreversible_confirmations = 6` | Public API reported deposits and withdrawals enabled | CoinEx credits after its safe threshold and uses its own `irreversible` threshold for later availability. The word `irreversible` is an exchange label, not mathematical finality. |
| NonKYC | `confirmsRequired = 50`; `securityConfirmsRequired = 20` | Public asset API reported deposits and withdrawals active | `50` is the clearest deposit-confirmation setting. The public meaning of `securityConfirmsRequired = 20` was not established and must not be equated with CoinEx's `irreversible_confirmations`. |
| NestEx | BC2 record contains `conf = 50` | Public coin API reported deposits and withdrawals enabled | The explicit backend value resolves the site's frontend fallback ambiguity: BC2 itself is configured for 50 confirmations. |
| Biconomy | Confirmation count not publicly exposed | Current withdrawal availability not independently verified | BC2 listing metadata remains public, but the wallet-specific confirmation setting appears to be behind authenticated wallet metadata. |

## CoinEx

Direct public API query:

```text
GET https://api.coinex.com/v2/assets/deposit-withdraw-config?ccy=BC2
```

Observed BC2 values on 2026-09-12:

- `safe_confirmations`: `2`
- `irreversible_confirmations`: `6`
- deposit enabled: `true`
- withdrawal enabled: `true`

CoinEx documents a staged confirmation model in which an asset can be credited before reaching the exchange's later `irreversible` threshold.

For MoreBC2 documentation, **do not describe six confirmations as making a BC2 transaction cryptographically irreversible**. It is CoinEx's operational label and policy threshold.

Sources:

- CoinEx API documentation: https://docs.coinex.com/api/v2/assets/deposit-withdrawal/http/list-all-deposit-withdrawal-config
- CoinEx BC2 listing announcement: https://coinex-announcement.zendesk.com/hc/en-us/articles/41890315584916-CoinEx-Will-List-BC2-BitcoinII-on-Oct-6-2025

## NonKYC

Direct public API query:

```text
GET https://api.nonkyc.io/api/v2/asset/getbyticker/BC2
```

Observed BC2 values on 2026-09-12 included:

- `confirmsRequired`: `50`
- `securityConfirmsRequired`: `20`
- `depositActive`: `true`
- `withdrawalActive`: `true`
- `noSweep`: `true`

The same record contained some descriptive metadata that does not match current BC2 technical facts, including `isProofOfWork = false`, even though BC2 is Proof of Work. It also contained `Upcoming fork` notes that may be stale.

Accordingly, MoreBC2 treats the live operational fields as useful current exchange evidence while **not** treating every descriptive field in the record as protocol authority.

The public semantics of `securityConfirmsRequired = 20` were not established. Because it is lower than `confirmsRequired = 50`, it must not be interpreted as a second-stage finality threshold without documentation from NonKYC.

Source:

- NonKYC public API base used by its public client: https://api.nonkyc.io/api/v2

## NestEx

Direct public API query:

```text
GET https://api.nestex.one/v1/coins
```

The BC2 record observed on 2026-09-12 reported:

- ticker: `BC2`
- name: `Bitcoin II`
- `candeposit`: `true`
- `canwithdraw`: `true`
- `conf`: `50`
- `decimals`: `8`
- `spottrade`: `true`

NestEx's frontend displays a default of `50` when no explicit confirmation value is supplied, so the frontend alone would not prove BC2's configured value. The backend `/v1/coins` response resolves that ambiguity because the BC2 object itself explicitly returns `conf = 50`.

Sources:

- NestEx public coin API: https://api.nestex.one/v1/coins
- NestEx wallet-status page: https://trade.nestex.one/wallet-status

## Biconomy

Biconomy announced a BC2 spot listing in January 2026 and initially announced deposits and withdrawals as available.

Public BC2 listing metadata remains retrievable from:

```text
GET https://openapi.biconomy.com/api/v1/assetIntro/BC2
```

That public record identifies `BC2` / `BitcoinII`, but it does not include a confirmation count or current wallet-status fields.

Biconomy's public frontend code shows that its deposit warning is parameterized with a `min_confirmation` value. The same frontend exposes a public `/chains-config` endpoint, but a 2026-09-12 query did not return BC2-specific confirmation data. The per-asset wallet metadata paths appear to require authenticated user context.

### January 2026 wallet-upgrade incident

Shortly after the BC2 listing, a community report stated that Biconomy deposits were temporarily closed for a **Wallet Upgrade**. A later community follow-up reported that deposits were operational again and included a successful small test deposit.

This is useful as a dated service-status incident only. MoreBC2 does **not** infer the technical cause, does not connect it to later chain behavior without evidence, and does not treat the incident as proof of present deposit or withdrawal status.

Current evidence status:

- BC2 listing: confirmed from Biconomy's public metadata and listing material.
- Present withdrawal availability: **not independently verified**.
- BC2 deposit confirmation count: **not publicly verified**.

Sources:

- Biconomy BC2 listing announcement: https://biconomy.zendesk.com/hc/en-us/articles/53895465558553-Biconomy-com-New-Listing-Bitcoin-II-BC2-for-Spot-Trading
- Biconomy public BC2 metadata: https://openapi.biconomy.com/api/v1/assetIntro/BC2
- Biconomy public chain configuration: https://openapi.biconomy.com/api/v1/chains-config
- Community wallet-upgrade report: https://www.reddit.com/r/BitcoinII/comments/1q3pjmv/re_biconomy_deposits_closed/

## What the exchange evidence supports

Two independently queried current BC2 venues — NonKYC and NestEx — explicitly use **50 confirmations**. CoinEx uses a materially more aggressive **2 / 6** staged policy.

This makes `50` a defensible evidence-based reference point for a **provisional MoreBC2 exchange baseline**, but it does not prove that 50 confirmations corresponds to a fixed reorganization probability under all network conditions.

A robust service policy should combine a minimum confirmation count with current chain health and transaction risk. Relevant operational signals include:

- cumulative chainwork added after the deposit's parent block;
- current tip age and forward progress;
- observed difficulty / network work rate;
- peer and node health;
- deposit value and account risk;
- unusual reorganization or competing-tip activity.

For large or unusual deposits, an exchange may reasonably hold longer or require manual review even after the normal minimum confirmation threshold is reached.

No fixed confirmation count can make a Proof-of-Work payment safe against an adversary that can sustain majority chainwork indefinitely.

## MoreBC2 documentation position

For current exchange-integration documentation:

- Use **50 confirmations** as a **provisional normal-deposit baseline**, clearly labeled as MoreBC2 guidance rather than a consensus or maintainer rule.
- Do not automatically promote `100` confirmations as a universal second-stage requirement without a separate risk justification.
- Treat CoinEx's `2 / 6` policy as evidence of one exchange's risk tolerance, not as a network-safety recommendation.
- Keep large-value and unusual deposits eligible for dynamic or manual holds based on chainwork and current network conditions.
- Recheck exchange API values periodically because operational policies can change without a protocol release.

## Verification

**Status:** Current-dated evidence record
**Primary sources checked:** Direct public exchange APIs / frontend infrastructure for CoinEx, NonKYC, NestEx, and Biconomy; current exchange documentation and listing material where available
**Notes:** This record establishes current observed exchange policy values, not a universal BitcoinII finality rule. Biconomy's current withdrawal status and BC2 confirmation count remain unresolved.