# Deposit monitoring

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page is a draft framework for BitcoinII (BC2) deposit-monitoring documentation for exchanges and service providers.

It is not final operational guidance. Confirmation counts, command examples, and chain-reorganization handling still need review.

## Goals

A deposit-monitoring guide should eventually explain:

- How a service tracks its own deposit addresses.
- How incoming transactions are detected.
- How block inclusion is checked.
- How confirmation counts are calculated.
- How chain reorganizations are handled.
- When a service may choose to credit a user account.

## Source-backed anchors

Current source-backed values relevant to this topic:

- Target block spacing: 10 minutes.
- Difficulty adjustment interval: 2016 blocks.
- Mainnet P2P port: `8338`.
- Mainnet RPC port from generated config: `8332`.
- Block header hash path: double-SHA256 via `HashWriter::GetHash()`.

## Confirmation policy

MoreBC2 has not yet verified a recommended BitcoinII confirmation count for exchanges.

Until that is reviewed, this page should not state a final confirmation policy.

## Commands to test later

Common Bitcoin-style RPC commands that may be relevant include:

```bash
bitcoinII-cli getblockchaininfo
bitcoinII-cli getnetworkinfo
bitcoinII-cli getwalletinfo
bitcoinII-cli getnewaddress
bitcoinII-cli listtransactions
bitcoinII-cli gettransaction <txid>
bitcoinII-cli getblock <blockhash>
bitcoinII-cli getblockhash <height>
```

These commands need to be tested against a running BitcoinII Core node before being marked verified.

## Chain reorganization handling

Deposit documentation should explain how a service responds if a transaction's confirmation state changes because of a chain reorganization.

MoreBC2 has not yet documented BitcoinII-specific reorganization risk or recommended confirmation thresholds.

## Open items

- Confirm recommended deposit confirmation count.
- Test deposit-related RPC commands.
- Confirm wallet address behavior.
- Confirm whether `txindex` is needed for non-wallet transaction lookups.
- Confirm explorer/API backup methods.
- Document reorganization-handling examples.

## Related pages

- [Exchange operator guide](operator-guide.md)
- [Exchange integration package](integration-package.md)
- [RPC overview](../developers/rpc-overview.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Known unknowns](../verification/known-unknowns.md)

## Sources

- `src/kernel/chainparams.cpp`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/src/kernel/chainparams.cpp
- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a framework. Command examples and confirmation policy need testing/review before use in production documentation.
