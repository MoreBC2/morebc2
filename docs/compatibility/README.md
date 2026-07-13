# BitcoinII compatibility

**Category:** Compatibility
**Status:** Draft / Evidence-linked summary
**Last reviewed:** 2026-07-13

## Summary

This section summarizes BitcoinII / BC2 compatibility observations already recorded in MoreBC2.

It is not a research pass, not a certification page, and not a guarantee of drop-in compatibility with Bitcoin Core, mempool.space, Electrum wallets, or third-party wallets.

Canonical evidence and related summaries:

- [Verification evidence index](../verification/verification-index.md)
- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [API documentation](../api/README.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Ecosystem wallets](../ecosystem/wallets.md)

## Pages

- [Bitcoin Core RPC compatibility](bitcoin-core-rpc.md)
- [REST API compatibility](rest-api.md)
- [Electrum compatibility](electrum.md)
- [Wallet compatibility](wallets.md)
- [mempool.space compatibility](mempool-space.md)
- [Known breakpoints](known-breakpoints.md)

## Evidence labels

Use narrow labels:

- **Observed** - seen in a dated public service, source, or metadata record.
- **Locally Tested** - exercised against the documented local BitcoinII Core environment.
- **Source Reviewed** - reviewed in BitcoinII Core source or source-tree documentation.
- **Unknown** - not established by current MoreBC2 evidence.
- **Needs Testing** - plausible or important, but not exercised in a dated record.
- **Roadmap** - future direction or planned work, not current compatibility evidence.

## Current compatibility posture

Current evidence supports limited compatibility statements:

- Some Bitcoin Core-style RPC commands are source-reviewed, and nine read-only RPC commands were locally tested on BitcoinII Core `v29.1.0`.
- Several REST endpoints on `bc2mempool.com` behaved like familiar `mempool.space` paths in a narrow public smoke test.
- Two `infra1.bitcoin-ii.org` Electrum endpoints accepted standard read-only Electrum calls in a narrow smoke test.
- Wallet compatibility with BlueWallet, Cake Wallet, Komodo Wallet, and other third-party wallets is not established.

Current evidence does not support broad claims of full compatibility.

## Verification

**Status:** Draft / Evidence-linked summary  
**Primary sources checked:** Existing MoreBC2 records linked above  
**Notes:** This section summarizes committed evidence. It does not add new compatibility testing.
