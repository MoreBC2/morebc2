# Exchange operator guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This guide is for exchanges and service providers considering BitcoinII (BC2) integration.

It is not complete and should not be used as a final production runbook yet. It records current source-backed information, current-dated exchange evidence, and unresolved operational work.

## Operator goals

An exchange integration should document:

- How to run BitcoinII Core safely.
- How to verify release downloads.
- How to configure RPC safely.
- How to generate deposit addresses.
- How to monitor deposits.
- How to process withdrawals.
- How many confirmations to require and how to layer chain-health checks around that threshold.
- How to handle maintenance and upgrades.
- How to recover from reindex/rescan or wallet issues.

## Current source-backed technical anchors

| Topic | Current known value/status | Source |
|---|---|---|
| Project name | BitcoinII | README / repository |
| Ticker | `BC2` — source-confirmed | v31.1.0 `src/policy/feerate.h` and BitcoinII UI/source references |
| Current release | `v31.1.0`, published 2026-08-29 | canonical GitHub release page |
| Mainnet P2P port | `8338` | `v31.1.0` `chainparams.cpp` |
| Mainnet RPC port | `8332` documented v31.1.0 default; operator-configurable | v31.1.0 man pages, example configuration, and RPC source |
| Target block spacing | 10 minutes | `v31.1.0` `chainparams.cpp` |
| Difficulty adjustment | ShockWave per-block adjustment from height `57,750` | `v31.1.0` `chainparams.cpp` / `pow.cpp` |
| Replay protection | Active from height `57,750`; fork/domain ID `0x01324342` | `v31.1.0` `chainparams.cpp` |
| Data restrictions | Consensus-level mitigation active from height `57,750` | `v31.1.0` `chainparams.cpp` and release notes |
| Block header hash path | double-SHA256 via `HashWriter::GetHash()` | `block.cpp` / `hash.h` |
| Official explorer | `https://bitcoinii.ddns.net/explorer/` | current public explorer |
| Project-linked explorer | `https://explorer.bitcoin-ii.org` | independently run/community-funded; CapsPool infrastructure |
| Release page | GitHub releases | canonical release page |

## ShockWave operational note

From mainnet height `57,750`, BitcoinII no longer relies on the historical Bitcoin-style 2016-block difficulty interval as its active difficulty-adjustment behavior. Required work is recalculated for each block from recent chain data, and candidate header time can affect the calculation when the chain has been stalled long enough to meet the source-defined threshold.

The target block spacing remains 10 minutes.

Exchange monitoring should therefore avoid assumptions that difficulty can remain fixed for an entire 2016-block period. Height, tip age, observed difficulty, peer state, chainwork, and chain progress should be monitored continuously.

## Replay-protection note

BitcoinII v31.1.0 activates BC2 transaction replay protection at height `57,750`.

BC2 retains Bitcoin-like address encodings, including P2PKH prefix `0`, P2SH prefix `5`, and Bech32 HRP `bc`. Operators should not treat address-format overlap as evidence that cross-chain replay handling is unnecessary. Integration testing should explicitly verify v31.1.0 replay-protection behavior before production deposits and withdrawals are enabled.

## RPC security

BitcoinII Core RPC should not be exposed to untrusted networks.

BitcoinII Core v31.1.0 consistently documents `8332` as the default mainnet JSON-RPC port. The port is configurable.

A dated MoreBC2 v29.1.0 Windows test used `127.0.0.1:8337`; that value is historical configuration evidence only and is not the v31.1.0 documented default.

The v31 JSON-RPC documentation states that the headless daemon enables its RPC API by default, while the Qt GUI requires server mode for network RPC access.

Fresh MoreBC2 v31.1.0 Windows validation has now exercised isolated loopback cookie-authenticated RPC and read-only node/network commands. That does not turn a test setup into a production architecture.

Use firewall rules, private networking, strong authentication, least-privilege access, and operational separation between hot-wallet systems and public-facing infrastructure.

## Release verification

BitcoinII Core v31.1.0 was published on 2026-08-29.

GitHub currently exposes six release binaries across Linux, Windows, and macOS, with SHA-256 digest metadata.

The lightweight `v31.1.0` tag points to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`, which GitHub reports as cryptographically verified.

This strengthens release provenance compared with digest metadata alone, but MoreBC2 does not currently claim:

- a separately signed checksum manifest;
- detached signatures for each release binary;
- a documented BitcoinII release-signing-key procedure; or
- reproducible-build proof.

## Licensing note

BitcoinII Core's `v31.1.0/src/pow.cpp` notice distinguishes MIT-covered inherited material from original ShockWave implementation material under separate, non-open-source terms.

This guide states operational facts and does not grant rights in that implementation or its comments. The source-file notice controls their use; MoreBC2 does not interpret it as prohibiting normal BC2 node operation or exchange integration.

## Deposit handling

### Provisional confirmation baseline

Current exchange evidence recorded on 2026-09-12 shows:

- CoinEx: `2` safe confirmations and `6` confirmations at its exchange-defined `irreversible` stage.
- NonKYC: `50` required confirmations.
- NestEx: explicit BC2 backend value `conf = 50`.
- Biconomy: confirmation count not publicly verified.

See [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md).

MoreBC2 therefore currently uses **50 confirmations as a provisional normal-deposit baseline** for exchange integration guidance.

This is not a consensus rule, a maintainer mandate, or a claim of mathematical finality. CoinEx's use of the label `irreversible` must not be repeated as a protocol guarantee.

At the 10-minute target spacing, 50 blocks is about 8 hours 20 minutes under an idealized steady schedule. Actual elapsed time will vary.

Operators should not rely on block count alone. BC2 selects the best chain by accumulated work, while ShockWave can change required work per block. A production policy should combine the minimum count with chainwork, tip age, current difficulty/work rate, peer/node health, reorganization signals, deposit value, and account risk.

For large or unusual deposits, hold longer or require manual review when the risk model calls for it. MoreBC2 does not currently promote `100` confirmations as a universal automatic second tier.

No finite confirmation count protects against an adversary that can sustain majority chainwork indefinitely.

### Deposit workflow still needing production validation

- Address-generation architecture.
- Wallet-based versus non-wallet scanning.
- Production `txindex` policy where relevant.
- Handling chain reorganizations and orphaned blocks.
- Replay-protection behavior in production-like deposit/withdrawal flows.
- Chainwork-based alert thresholds and examples.

See [Deposit monitoring](deposit-monitoring.md) for the current workflow model.

## Withdrawal handling

MoreBC2 does not currently define a separate universal withdrawal-confirmation count. An exchange may allow withdrawals after credited deposits only when its own fraud, custody, liquidity, and chain-risk controls are satisfied.

Still needing production validation:

- Fee handling.
- Hot-wallet controls.
- Withdrawal batching behavior, if used.
- Transaction broadcast monitoring.
- Failure/retry behavior.
- Manual review procedure.
- Policy for withdrawing recently credited deposits during abnormal chain conditions.

## Maintenance handling

Needs additional production-focused documentation for:

- v31.1.0 upgrade process.
- Wallet backup process.
- Reindex process.
- Rescan process.
- Node monitoring.
- Disk/memory expectations.
- Behavior and alerting around prolonged tip stalls, reorganizations, or rapid difficulty changes.

## Open items

- Confirm current technical/security contact process.
- Add a chainwork-based monitoring example around the provisional 50-confirmation baseline.
- Complete production-like deposit/withdrawal flow testing using an isolated environment.
- Produce replay-protection transaction vectors for external/third-party signers.
- Test transaction broadcast without relying on production custody wallets.
- Confirm whether a standalone signed checksum manifest or formal release-key workflow exists.
- Periodically recheck exchange confirmation settings because they are operational policy, not protocol constants.

## Related pages

- [Exchange integration package](integration-package.md)
- [Deposit monitoring](deposit-monitoring.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Node configuration](../configuration/node-configuration.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Known unknowns](../verification/known-unknowns.md)

## Sources

- Canonical BitcoinII repository: https://github.com/Bitcoin-II/BitcoinII-Core
- BitcoinII releases: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- v31.1.0 release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `src/hash.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/hash.h
- `src/policy/feerate.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/policy/feerate.h
- `share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/share/examples/bitcoinII.conf
- `doc/JSON-RPC-interface.md`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/doc/JSON-RPC-interface.md
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 release metadata and release-pinned source, current MoreBC2 v31.1.0 runtime records, and current-dated exchange API evidence
**Notes:** The guide now includes a provisional 50-confirmation normal-deposit baseline grounded in current exchange observations. It remains a draft because confirmation guidance still needs chainwork examples and community/maintainer review, while production deposit/withdrawal architecture, custody controls, and technical contact process remain incomplete.