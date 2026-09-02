# Nodes

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This section is for BitcoinII (BC2) node operation resources.

The current release baseline is BitcoinII Core `v31.1.0`.

Existing local node tests in MoreBC2 were performed on `v29.1.0` and remain useful **historical, version-scoped evidence**. They must not be presented as proof that every startup, RPC, peer-discovery, wallet, or synchronization behavior is unchanged in `v31.1.0`.

## Current pages

- [Windows node guide](node-guide.md) — contains bounded historical `v29.1.0` local test evidence plus operator guidance that should be checked against the current release before production use.

## v31.1.0 node-relevant changes

Current release notes identify:

- ShockWave per-block difficulty adjustment;
- consensus-level data restrictions;
- BC2 replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

Fork-aware header synchronization is particularly relevant to node sync/recovery documentation and should be treated as current behavior even though MoreBC2 has not yet completed a dedicated v31 runtime test record.

## Source-backed anchors

- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)
- [Source atlas: startup initialization](../developers/source-atlas/init-cpp.md)
- [Source atlas: validation interface](../developers/source-atlas/validation-interface.md)
- [RPC overview](../developers/rpc-overview.md)

## Historical local evidence

The dated Windows records for `v29.1.0` remain preserved because they accurately describe what was tested at the time, including startup, initial sync, local-only RPC, shutdown/restart, and peer discovery.

They should not be silently rewritten to say `v31.1.0`.

## Planned current-release verification

- Fresh Windows `v31.1.0` startup/sync record
- Linux node path
- Current RPC behavior
- Current peer/header synchronization behavior
- Current disk/memory/sync expectations
- Upgrade notes from pre-v31 nodes
- Pruning/reindex/recovery checks

## Rules

- Always label tested commands with OS, BitcoinII version/ref, date, and network.
- Do not recommend exposing RPC publicly.
- Separate protocol defaults from local operator choices.
- Treat live peer and service observations as dated.
- Do not convert historical `v29.1.0` test evidence into v31 evidence without re-testing.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source plus existing dated node records
**Notes:** The node section now distinguishes current-release facts from historical local `v29.1.0` evidence. Dedicated v31 runtime testing remains open.