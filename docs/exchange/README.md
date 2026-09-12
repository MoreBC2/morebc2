# Exchange integration

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This section is for centralized exchanges, swap services, wallets, explorers, payment processors, and other infrastructure providers that want to integrate BitcoinII (BC2).

The goal is to create a clear integration package that reduces back-and-forth and helps service providers quickly find the technical information they need.

The section now includes a current-dated exchange confirmation evidence record and a **provisional 50-confirmation normal-deposit baseline**. That value is MoreBC2 operational guidance, not a BitcoinII consensus rule or maintainer mandate.

This section is still a draft and should not be represented as a complete production exchange runbook until custody architecture, production deposit/withdrawal procedures, technical contact process, chainwork thresholds, and remaining release-authentication work are reviewed.

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
- For large or unusual deposits, combine the minimum count with chainwork, current tip/network health, transaction value, account risk, and manual review where appropriate.

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

## Draft checklist

- Project name: BitcoinII.
- Ticker: BC2.
- Official website.
- Official repositories.
- Current wallet release.
- Source code.
- License.
- Network parameters.
- Block explorer links.
- RPC documentation.
- Provisional deposit confirmation baseline and evidence record.
- Chainwork / reorganization risk handling.
- Daemon setup notes.
- Wallet backup notes.
- Branding assets.
- Technical contact process.
- Known exchanges and services.
- Integration test procedure.

## Rules

- Treat BC2 as a native coin, not a token, unless official sources say otherwise.
- Confirmation counts must be source-backed exchange observations or clearly labeled MoreBC2 risk guidance.
- Do not list a service as active without direct current checking.
- Do not present untested RPC commands as production instructions.
- Clearly separate read-only RPC commands from wallet-moving, broadcast, import/export, private-key, and passphrase commands.
- Do not recommend exposing RPC publicly.
- Keep release-verification status visible.
- Keep technical-contact status visible until confirmed from official or maintainer sources.
- Treat third-party listing-fee estimates as unconfirmed unless the exchange publishes the fee directly.
- Recheck exchange confirmation settings periodically; they are operational policy and can change without a protocol release.

## Related pages

- [Known unknowns](../verification/known-unknowns.md)
- [Verification evidence index](../verification/verification-index.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation coverage](../documentation-coverage.md)
- [Documentation polish plan](../POLISH_PLAN.md)
- [Ecosystem index](../ecosystem/README.md)

## Verification

**Status:** Draft
**Primary sources checked:** Current v31.1.0 source/runtime evidence plus direct current exchange API observations
**Notes:** The exchange section now has an evidence-backed provisional 50-confirmation normal-deposit baseline. Production custody design, chainwork thresholds, technical contact process, complete release authentication, and production deposit/withdrawal procedures remain open.