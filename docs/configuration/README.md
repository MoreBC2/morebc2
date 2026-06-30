# Configuration

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This section documents BitcoinII Core configuration concepts and options.

Configuration pages should be based on `share/examples/bitcoinII.conf`, manual pages, source code, or tested behavior.

## Current pages

- [Configuration overview](configuration-overview.md)
- [RPC configuration](rpc-configuration.md)
- [Node configuration](node-configuration.md)

## Source-backed anchors

Configuration documentation should stay aligned with:

- `share/examples/bitcoinII.conf`
- `doc/man/bitcoinIId.1`
- `doc/man/bitcoinII-cli.1`
- `doc/man/bitcoinII-qt.1`
- [RPC overview](../developers/rpc-overview.md)
- [Node startup](../architecture/node-startup.md)
- [Source atlas: startup initialization](../developers/source-atlas/init-cpp.md)
- [Source atlas: blockchain RPC](../developers/source-atlas/rpc-blockchain.md)

## Planned pages

- Full configuration reference.
- Common node configurations.
- Safe local RPC setup.
- Pruned-node configuration notes.
- Wallet configuration notes.
- Regtest/testnet examples.
- Tested command records.

## Rules

- Do not publish untested production examples as verified.
- Do not recommend exposing RPC publicly.
- Mark platform-specific paths as Needs Review until tested.
- Explain what options do before showing examples.
- Separate source-observed defaults from recommended operator settings.
- Include operating system, BitcoinII version or commit, network mode, and date when documenting tested behavior.

## Related pages

- [Node guide](../nodes/node-guide.md)
- [Nodes README](../nodes/README.md)
- [RPC overview](../developers/rpc-overview.md)
- [RPC configuration](rpc-configuration.md)
- [Documentation coverage](../documentation-coverage.md)
- [Open questions backlog](../verification/open-questions.md)
- [Documentation polish plan](../POLISH_PLAN.md)

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This section starts from the generated example configuration file and source-reviewed RPC/startup notes. It still needs local testing and platform-specific verification before becoming fully verified.
