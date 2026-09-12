# BitcoinII compatibility

**Category:** Compatibility
**Status:** Reviewed / Evidence-linked summary
**Last reviewed:** 2026-09-12

## Summary

This section summarizes BitcoinII / BC2 compatibility evidence already recorded in MoreBC2.

It is not a certification page and does not claim drop-in compatibility with Bitcoin Core, mempool.space, Electrum wallets, or third-party wallets. Compatibility claims are intentionally scoped to the exact interface, version, service, and workflow that was observed or tested.

Current evidence anchors:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Verification evidence index](../verification/verification-index.md)
- [API documentation](../api/README.md)
- [Wallet guide](../wallets/wallet-guide.md)

Older July and August records remain useful historical evidence for the versions and services they tested, but current-facing compatibility wording should prefer the September v31.1.0 and public-infrastructure records where they overlap.

## Pages

- [Bitcoin Core RPC compatibility](bitcoin-core-rpc.md)
- [REST API compatibility](rest-api.md)
- [Electrum compatibility](electrum.md)
- [Wallet compatibility](wallets.md)
- [mempool.space compatibility](mempool-space.md)
- [Known breakpoints](known-breakpoints.md)

## Evidence labels

Use narrow labels:

- **Directly observed** — seen in a dated public service or runtime record.
- **Locally tested** — exercised in the documented isolated BitcoinII Core environment.
- **Source reviewed** — traced in release-pinned BitcoinII Core source.
- **Unknown** — not established by current MoreBC2 evidence.
- **Needs testing** — plausible or important, but not exercised in a dated record.

## Current compatibility posture

Current evidence supports these limited statements:

- BitcoinII Core `v31.1.0` exposes a substantial Bitcoin Core-style JSON-RPC surface. Current Windows tests exercised node, network, blockchain, mempool, wallet, PSBT, raw-transaction, and shutdown workflows in bounded isolated environments.
- A complete PSBT lifecycle was successfully exercised on isolated `v31.1.0` regtest, including funding, signing, finalization, decoding, mempool acceptance, and local-only submission.
- `infra1.bitcoin-ii.org` currently responds as ElectrumX `1.18.0` over both TCP and TLS for the tested read-only protocol calls. That does not prove wallet compatibility.
- `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` expose closely aligned mempool.space-style REST/WebSocket surfaces. Similarity does not establish complete schema parity or independent infrastructure.
- The Official BitcoinII Explorer exposes a materially different API shape and should not be treated as interchangeable with the mempool-style services.
- Third-party wallet compatibility remains largely unverified.

Current evidence does **not** support a broad claim of full Bitcoin Core, mempool.space, Electrum-wallet, or third-party-wallet compatibility.

## Verification

**Status:** Reviewed / Evidence-linked summary  
**Primary sources checked:** Current v31.1.0 runtime/PSBT records and 2026-09-11 public-infrastructure record  
**Notes:** This page summarizes committed compatibility evidence. It does not broaden the tested scope beyond those records.
