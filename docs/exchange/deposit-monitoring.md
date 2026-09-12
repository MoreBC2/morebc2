# Deposit monitoring

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page is a draft framework for BitcoinII (BC2) deposit monitoring for exchanges and service providers.

It now includes a provisional confirmation-policy baseline derived from current exchange evidence. It is still not a complete production runbook: deposit RPC examples, wallet-vs-non-wallet monitoring, and reorganization procedures need further operational testing.

## Goals

A deposit-monitoring guide should explain:

- How a service tracks its own deposit addresses.
- How incoming transactions are detected.
- How block inclusion is checked.
- How confirmation counts are calculated.
- How accumulated chainwork is tracked after a deposit.
- How chain reorganizations are handled.
- When a service may choose to credit a user account.

## Source-backed anchors

Current source-backed values relevant to this topic:

- Target block spacing: 10 minutes.
- Current post-height-`57750` difficulty adjustment: ShockWave per block.
- Historical pre-activation behavior: inherited Bitcoin-style 2016-block retargeting.
- Mainnet P2P port: `8338`.
- Mainnet RPC default in v31.1.0 documentation/source: `8332`; operator-configurable.
- Block header hash path: double-SHA256 via `HashWriter::GetHash()`.
- Chain selection is based on accumulated chainwork rather than block count alone.

These anchors inform service policy, but none of them defines a mandatory exchange confirmation count.

## Provisional confirmation policy

Current direct exchange evidence recorded on 2026-09-12 shows:

- CoinEx: `safe_confirmations = 2`, `irreversible_confirmations = 6`.
- NonKYC: `confirmsRequired = 50`; a separate `securityConfirmsRequired = 20` field exists but its public semantics were not established.
- NestEx: the BC2 backend record explicitly reports `conf = 50`.
- Biconomy: BC2 is listed, but its current BC2 confirmation count is not publicly exposed.

See [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md).

Based on that evidence, MoreBC2 currently uses **50 confirmations as a provisional normal-deposit baseline for exchange integration guidance**.

This is **not**:

- a BitcoinII consensus rule;
- a maintainer-mandated value;
- proof that a 50-confirmation transaction has a fixed reorganization probability; or
- a guarantee that current exchanges will retain the same settings.

At the 10-minute target spacing, 50 blocks corresponds to about 8 hours 20 minutes in an idealized steady schedule. Actual wall-clock time can differ materially because blocks do not arrive on a perfect schedule and ShockWave adjusts required work per block.

CoinEx's `irreversible_confirmations = 6` field must not be described as cryptographic irreversibility. It is an exchange policy label.

MoreBC2 does **not** currently recommend automatically treating 100 confirmations as a universal second-stage requirement. A service that wants a more conservative tier should justify it from transaction value, current chain conditions, and its own risk model.

## Confirmation count is not enough by itself

Because BC2 follows the most-work chain and ShockWave changes required work block by block, equal block counts can represent unequal accumulated work.

A production deposit monitor should therefore consider both a minimum confirmation count and current chain-health signals, including:

- cumulative chainwork added after the deposit's parent block;
- tip age and continuing forward progress;
- current difficulty / observed work rate;
- peer and node health;
- unexpected competing-tip or reorganization activity;
- deposit value and account risk.

For large, unusual, or otherwise higher-risk deposits, a service may hold longer or require manual review even after the normal 50-confirmation baseline is reached.

No fixed confirmation count can make a Proof-of-Work payment safe against an adversary that can sustain majority chainwork indefinitely.

## Deposit-monitoring flow

A production implementation should distinguish at least these states:

1. Transaction detected but not mined.
2. Transaction included in a block on the current best-work chain.
3. Confirmation count increasing while the block remains on the best-work chain.
4. Normal credit threshold reached.
5. Additional risk checks passed or a manual hold applied.
6. Transaction removed from the best-work chain because of a reorganization.

Services should persist the deposit transaction ID, inclusion block hash and height, and enough chain state to detect if the original inclusion block is no longer on the active best-work chain.

## Commands to test / document

Common Bitcoin-style RPCs relevant to a deposit-monitoring implementation include:

```bash
bitcoinII-cli getblockchaininfo
bitcoinII-cli getnetworkinfo
bitcoinII-cli getrawtransaction <txid> true
bitcoinII-cli getblock <blockhash>
bitcoinII-cli getblockhash <height>
```

Wallet-scoped RPCs such as `gettransaction` and `listtransactions` may be appropriate when the exchange uses BitcoinII Core wallet ownership to track deposit addresses, but they should not be presented as the only architecture.

`getrawtransaction` behavior depends on whether the transaction is in the mempool, a block hash is supplied, or `txindex` is enabled. Exchanges using non-wallet address tracking should verify their exact indexing design rather than assume full historical transaction lookup is available by default.

State-changing wallet commands such as `getnewaddress` should remain outside generic copy/paste monitoring examples unless the surrounding wallet procedure is explicitly documented.

## Chain reorganization handling

If an inclusion block is disconnected from the active best-work chain, the service should immediately recompute the deposit's state rather than continuing to increment a stored confirmation counter.

Operationally, the monitor should be prepared to:

- move a credited-but-not-finalized internal deposit back into a hold state;
- wait for the transaction to reappear in the active chain, if it does;
- treat a replacement/conflicting spend as a separate risk event;
- escalate unusual or deep reorganizations for manual review;
- compare current chainwork and tip state rather than relying only on height.

MoreBC2 has not yet published empirical BC2 reorganization-depth statistics or a production incident playbook. The 50-confirmation baseline should therefore remain explicitly provisional and risk-based.

## Open items

- Complete current-release deposit-related RPC examples against an isolated v31.1.0 node.
- Confirm the preferred wallet address-generation architecture for custodial services.
- Document wallet-based versus non-wallet deposit scanning in more detail.
- Confirm production `txindex` recommendations for non-wallet monitoring designs.
- Add concrete reorganization-handling examples and alert thresholds.
- Add a chainwork calculation example suitable for exchange monitoring.
- Periodically recheck public exchange confirmation settings.

## Related pages

- [Exchange operator guide](operator-guide.md)
- [Exchange integration package](integration-package.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)
- [RPC overview](../developers/rpc-overview.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Command testing status](../verification/command-testing.md)
- [Known unknowns](../verification/known-unknowns.md)

## Sources

The release-pinned source links below support the current `v31.1.0` baseline.

- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp
- `v31.1.0/share/examples/bitcoinII.conf`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/share/examples/bitcoinII.conf
- Exchange-policy evidence: [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 release-pinned source plus current-dated public exchange API evidence
**Notes:** The page now carries a provisional 50-confirmation normal-deposit baseline because two independently queried BC2 venues explicitly use 50. That value remains operational guidance rather than a protocol rule. Deposit-monitoring RPC architecture, chainwork examples, and production reorganization procedures still need additional testing and review.