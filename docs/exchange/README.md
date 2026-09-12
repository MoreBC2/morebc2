# Exchange integration

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This section is for centralized exchanges, swap services, wallets, explorers, payment processors, and other infrastructure providers that want to integrate BitcoinII (BC2).

The goal is to provide a source-backed technical package while keeping exchange policy, public-service observations, and unresolved operational work clearly separated.

The section now includes current v31.1.0 runtime evidence, a current-dated exchange confirmation evidence record, a **provisional 50-confirmation normal-deposit baseline**, and refreshed listing/readiness material.

That baseline is MoreBC2 operational guidance, not a BitcoinII consensus rule or maintainer mandate.

The section remains Draft because production custody architecture, deposit/withdrawal procedures, a canonical technical/security contact process, concrete chainwork thresholds, and some release-authentication work remain unresolved.

## Exchange-folder audit — 2026-09-12

Every page in `docs/exchange/` was reviewed against the current v31.1.0 documentation/evidence set and the current exchange research available on 2026-09-12.

| Page | Audit state | Current note |
|---|---|---|
| [Deposit monitoring](deposit-monitoring.md) | Reviewed / current draft | Current confirmation evidence and provisional 50-confirmation baseline are integrated; chainwork calculation examples and production reorg procedures remain open. |
| [Exchange listing target matrix](exchange-listing-targets.md) | Refreshed 2026-09-12 | Existing BC2 venues are separated from prospective targets; StakeCube/SafeTrade and current applicant-authority requirements were added; TradeOgre/Exbitron were removed from consideration. |
| [Exchange readiness checklist](exchange-readiness-checklist.md) | Refreshed 2026-09-12 | Stale generic `Draft` / `Needs verification` statuses were replaced with source-confirmed, current-dated tested/observed, provisional, and genuinely unresolved states. |
| [Exchange integration package](integration-package.md) | Reviewed / current draft | Current v31 source/runtime, release, replay, explorer, and confirmation-policy evidence is represented; production custody/contact/release-authentication gaps remain visible. |
| [Exchange listing packet template](listing-packet-template.md) | Refreshed 2026-09-12 | Stable BC2 facts are prefilled; applicant authority, release-authentication caveats, confirmation guidance, and independent-contributor wording are explicit. |
| [Native coin exchange listing guide](native-coin-listing-guide.md) | Refreshed 2026-09-12 | Existing BC2 integration precedent, current target categories, authorization limits, and provisional confirmation guidance are incorporated. |
| [Exchange operator guide](operator-guide.md) | Reviewed / current draft | Current v31 operational anchors and confirmation/chainwork guidance are represented; production withdrawal/custody procedures remain incomplete. |
| [Service integration checklist](service-integration-checklist.md) | Reviewed / current draft | Checklist reflects current v31 evidence, replay considerations, 50-confirmation provisional baseline, and chainwork-aware risk controls. |
| [Why native coins get rejected](why-native-coins-get-rejected.md) | Refreshed 2026-09-12 | BC2 readiness snapshot now reflects what has actually been resolved and adds applicant-authority/legal-compliance failure modes. |
| `README.md` | Refreshed 2026-09-12 | Section status, rules, page map, and this audit record are current. |

A reviewed page can remain **Draft**. “Draft” means unresolved production or policy work remains; it does not mean the page was skipped or is stale.

## Current pages

### BC2 integration package

- [Exchange integration package](integration-package.md)
- [Exchange operator guide](operator-guide.md)
- [Deposit monitoring](deposit-monitoring.md)
- [Service integration checklist](service-integration-checklist.md)

### Current exchange evidence

- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)
- [Exchange listings and status observations](../ecosystem/exchanges.md)

### Listing readiness and exchange research

- [Native coin exchange listing guide](native-coin-listing-guide.md)
- [Exchange listing target matrix](exchange-listing-targets.md)
- [Exchange readiness checklist](exchange-readiness-checklist.md)
- [Exchange listing packet template](listing-packet-template.md)
- [Why native coins get rejected by exchanges](why-native-coins-get-rejected.md)

## Current confirmation-policy position

Direct exchange evidence recorded on 2026-09-12 shows:

- CoinEx: `2` safe confirmations / `6` exchange-defined `irreversible` confirmations.
- NonKYC: `50` required confirmations.
- NestEx: explicit BC2 backend setting `conf = 50`.
- Biconomy: BC2 listing confirmed, but current confirmation count and withdrawal availability are not publicly verified.

MoreBC2 therefore currently uses **50 confirmations as a provisional normal-deposit baseline**.

Rules for presenting that number:

- Do not call it a protocol rule.
- Do not call 50 confirmations mathematically final.
- Do not repeat CoinEx's `irreversible` terminology as cryptographic finality.
- Do not automatically promote `100` confirmations as a universal second tier without a separate risk justification.
- For large or unusual deposits, combine the minimum count with cumulative chainwork, current tip/network health, transaction value, account risk, and manual review where appropriate.

## Applicant-authority rule

MoreBC2 is an independent documentation project. It must not imply that it is the BitcoinII project team or that an independent contributor has authority to submit an official listing application.

Some current exchange processes explicitly require official-team status, team permission, project-owner information, legal-entity material, or core-team KYC.

MoreBC2 can prepare and maintain the technical packet. Where an exchange requires official authority, the final submission should come from an authorized BitcoinII representative or be made with documented permission.

## Source-backed anchors

- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [RPC overview](../developers/rpc-overview.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Node configuration](../configuration/node-configuration.md)
- [Source atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)
- [Source atlas: raw transaction RPC](../developers/source-atlas/rpc-rawtransaction.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)
- [Source atlas: wallet RPC](../developers/source-atlas/wallet-rpc.md)
- [Confirmations](../encyclopedia/confirmations.md)
- [Reorganizations](../encyclopedia/reorganizations.md)

## Current section-level blockers

The exchange section no longer treats basic identity, ticker, v31 network parameters, current release identification, current explorer reachability, bounded v31 node/RPC testing, or confirmation guidance as wholly unknown.

The principal remaining gaps are:

- canonical technical/security contact process;
- production custody architecture and deposit/withdrawal runbook;
- concrete cumulative-chainwork thresholds and reorganization incident procedure;
- stronger release-binary authentication where signed/reproducible evidence is required;
- external/third-party signer compatibility;
- current branding/community assets required by a specific submission;
- applicant authorization, legal, KYC, and audit material where required by a target exchange.

## Rules

- Treat BC2 as a native coin, not a token.
- Use current release-pinned source for protocol facts; do not copy stale pre-v31 website/whitepaper claims into current integration guidance.
- Confirmation counts must be direct exchange observations or clearly labeled MoreBC2 risk guidance.
- Do not list a service as active without a current direct check.
- Do not present point-in-time service reachability as an uptime or custody-grade reliability guarantee.
- Do not present untested RPC commands as production instructions.
- Clearly separate read-only RPC commands from wallet-moving, broadcast, import/export, private-key, and passphrase commands.
- Do not recommend exposing RPC publicly.
- Keep release-verification limitations visible.
- Keep technical-contact status visible until confirmed from an official or maintainer-approved source.
- Do not submit as an official project representative without the authority required by that exchange.
- Treat third-party listing-fee estimates as unconfirmed unless the exchange itself publishes the fee.
- Recheck exchange fees, requirements, confirmation settings, and wallet status immediately before outreach because they can change without a protocol release.

## Related pages

- [Known unknowns](../verification/known-unknowns.md)
- [Verification evidence index](../verification/verification-index.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation coverage](../documentation-coverage.md)
- [Documentation polish plan](../POLISH_PLAN.md)
- [Ecosystem index](../ecosystem/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 source/release metadata, current MoreBC2 v31.1.0 runtime records, 2026-09-11 public-infrastructure evidence, 2026-09-12 exchange-confirmation evidence, and refreshed 2026-09-12 exchange-listing requirement research
**Notes:** Full `docs/exchange/` audit completed on 2026-09-12. All ten pages were reviewed; stale listing/readiness/template/rejection material was refreshed while already-current operational pages were retained with their unresolved boundaries intact.