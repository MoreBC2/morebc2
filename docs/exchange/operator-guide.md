# Exchange operator guide

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

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
| Common ticker | BC2, needs stronger primary source | Source/UI references and community usage |
| Mainnet P2P port | `8338` | `chainparams.cpp` |
| Mainnet RPC port | `8332` | generated config |
| Target block spacing | 10 minutes | `chainparams.cpp` |
| Difficulty interval | 2016 blocks | `chainparams.cpp` / `pow.cpp` |
| Block header hash path | double-SHA256 via `HashWriter::GetHash()` | `block.cpp` / `hash.h` |
| Release page | GitHub releases | release page |

## RPC security

BitcoinII Core RPC should not be exposed to untrusted networks.

Use firewall rules, private networking, strong authentication, least-privilege access, and operational separation between hot-wallet systems and public-facing infrastructure.

## Deposit handling

Needs verification before publication:

- Recommended minimum confirmations.
- Reorg-risk guidance.
- Address generation flow.
- Deposit scanning method.
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

- Upgrade process.
- Wallet backup process.
- Reindex process.
- Rescan process.
- Node monitoring.
- Disk/memory expectations.

## Release verification

MoreBC2 has not yet confirmed the complete BitcoinII release verification model.

Do not claim exchange-grade release verification until checksums, signatures, signed tags, or maintainer guidance are reviewed.

## Open items

- Confirm canonical repository path.
- Confirm official ticker source.
- Confirm release verification workflow.
- Confirm recommended confirmation count.
- Confirm technical contact process.
- Test RPC examples.
- Test deposit/withdrawal flows on a safe environment.

## Related pages

- [Exchange integration package](integration-package.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Node configuration](../configuration/node-configuration.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Known unknowns](../verification/known-unknowns.md)

## Sources

- BitcoinII repository: https://github.com/BitcoinII-Dev/BitcoinII
- BitcoinII releases: https://github.com/BitcoinII-Dev/BitcoinII/releases
- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp
- `src/pow.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/pow.cpp
- `src/hash.h`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/hash.h
- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This guide is an integration framework with source-backed anchors. It is not ready to send as final exchange documentation.
