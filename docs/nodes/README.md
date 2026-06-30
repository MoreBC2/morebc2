# Nodes

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This section is for BitcoinII (BC2) node operation resources.

Node pages should help readers run, configure, and troubleshoot BitcoinII Core without overstating untested commands or stale network details.

## Current pages

- [Node guide](node-guide.md)

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

## Rules

- Node configuration values should be verified against current BitcoinII source code or official documentation before being marked verified.
- Tested commands should include operating system, BitcoinII version or commit, command used, and date tested.
- Do not recommend exposing RPC publicly.
- Mark live peer, seed, and sync observations with dates.
- Separate protocol defaults from local operator choices.

## Related pages

- [Network specifications](../documentation/network-specifications.md)
- [Configuration](../configuration/README.md)
- [Node configuration](../configuration/node-configuration.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Open questions backlog](../verification/open-questions.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** Some node parameters have source-backed anchors, but operational guides need local testing before being treated as verified.
