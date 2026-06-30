# Nodes

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This section is for BitcoinII (BC2) node operation resources.

Node pages should help readers run, configure, and troubleshoot BitcoinII Core without overstating untested commands, stale peer/network details, or unverified release behavior.

## Current pages

- [Node guide](node-guide.md)

## Source-backed anchors

Node-related source review currently includes:

- [Network specifications](../documentation/network-specifications.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Source atlas: startup initialization](../developers/source-atlas/init-cpp.md)
- [Source atlas: block storage](../developers/source-atlas/block-storage.md)
- [Source atlas: validation interface](../developers/source-atlas/validation-interface.md)
- [Source atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)
- [Source atlas: mempool and transaction broadcast RPC](../developers/source-atlas/rpc-mempool.md)
- [RPC overview](../developers/rpc-overview.md)

These pages are source-observed unless they explicitly say a command was run locally.

## Planned pages

- Running a full node
- Configuration file examples
- Network ports
- Syncing from scratch
- Backups
- Troubleshooting
- Seed nodes
- Initial block download notes
- Pruning notes
- Reindex/import notes
- Tested node command examples

## Rules

- Node configuration values should be verified against current BitcoinII source code or official documentation before being marked verified.
- Tested commands should include operating system, BitcoinII version or commit, command used, date tested, and whether the node was mainnet/testnet/regtest.
- Do not recommend exposing RPC publicly.
- Mark live peer, seed, and sync observations with dates.
- Separate protocol defaults from local operator choices.
- Keep pruning, reindex, import, and mempool persistence guidance clearly marked as advanced until tested.

## Related pages

- [Configuration](../configuration/README.md)
- [Node configuration](../configuration/node-configuration.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Architecture: node startup](../architecture/node-startup.md)
- [Architecture: life of a block](../architecture/life-of-a-block.md)
- [Documentation coverage](../documentation-coverage.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation polish plan](../POLISH_PLAN.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Some node parameters, startup behavior, storage behavior, and RPC behavior have source-backed anchors. Operational guides need local testing before being treated as verified.
