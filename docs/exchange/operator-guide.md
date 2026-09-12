# Exchange operator guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This guide is for exchanges and service providers considering BitcoinII (BC2) integration.

It is not complete and should not be used as final listing documentation yet. It records known source-backed information and clearly lists what still needs verification.

## Operator goals

An exchange integration should eventually document:

- How to run BitcoinII Core safely.
- How to verify release downloads.
- How to configure RPC safely.
- How to generate deposit addresses.
- How to monitor deposits.
- How to process withdrawals.
- How many confirmations to require.
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

Exchange monitoring should therefore avoid assumptions that difficulty can remain fixed for an entire 2016-block period. Height, tip age, observed difficulty, peer state, and chain progress should be monitored continuously.

## Replay-protection note

BitcoinII v31.1.0 activates BC2 transaction replay protection at height `57,750`.

BC2 retains Bitcoin-like address encodings, including P2PKH prefix `0`, P2SH prefix `5`, and Bech32 HRP `bc`. Operators should not treat address-format overlap as evidence that cross-chain replay handling is unnecessary. Integration testing should explicitly verify v31.1.0 replay-protection behavior before production deposits and withdrawals are enabled.

## RPC security

BitcoinII Core RPC should not be exposed to untrusted networks.

BitcoinII Core v31.1.0 consistently documents `8332` as the default mainnet JSON-RPC port. The port is configurable.

A dated MoreBC2 v29.1.0 Windows test used `127.0.0.1:8337`; that value is historical configuration evidence only and is not the v31.1.0 documented default.

The v31 JSON-RPC documentation states that the headless daemon enables its RPC API by default, while the Qt GUI requires server mode for network RPC access.

The default/configuration model is **Source-confirmed**. Actual v31.1.0 startup and RPC command execution remain **Runtime-unverified** by MoreBC2.

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

Needs verification before publication:

- Recommended minimum confirmations under current ShockWave behavior.
- Reorg-risk guidance.
- Address generation flow.
- Deposit scanning method.
- Replay-protection behavior in tested production-like flows.
- Handling chain reorganizations.
- Handling orphaned blocks.

## Withdrawal handling

Needs verification before publication:

- Fee handling.
- Hot-wallet controls.
- Withdrawal batching behavior, if used.
- Transaction broadcast monitoring.
- Failure/retry behavior.
- Manual review procedure.

## Maintenance handling

Needs verification before publication:

- v31.1.0 upgrade process.
- Wallet backup process.
- Reindex process.
- Rescan process.
- Node monitoring.
- Disk/memory expectations.
- Behavior and alerting around prolonged tip stalls or rapid difficulty changes.

## Open items

- Confirm current technical/security contact process.
- Establish a confirmation-count recommendation or reviewed risk model.
- Independently exercise v31.1.0 RPC examples.
- Test v31.1.0 deposit/withdrawal flows using an isolated test environment.
- Produce replay-protection transaction vectors.
- Freshly re-test Electrum TCP/TLS behavior.
- Test transaction broadcast without relying on production custody wallets.
- Confirm whether a standalone signed checksum manifest or formal release-key workflow exists.

## Related pages

- [Exchange integration package](integration-package.md)
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
- [Project identity source check - 2026-07-10](../verification/project-identity-source-check-2026-07-10.md)
- [Local node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 release metadata, release-pinned source and generated documentation, plus scoped pre-v31 MoreBC2 local RPC evidence and current public explorer observations.
**Notes:** Current-release, ticker, RPC-default, ShockWave, replay-protection, data-restriction, release-authentication, licensing, and explorer-hierarchy wording were refreshed on 2026-09-12. The guide remains a draft integration framework until v31.1.0 state-changing RPC and deposit/withdrawal workflows are tested and a confirmation policy is established.
