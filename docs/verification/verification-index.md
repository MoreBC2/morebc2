# Verification evidence index

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-12

## Purpose

This page is the quickest way to see what MoreBC2 has directly observed, locally tested, source-reviewed, or left unresolved.

Evidence is version-scoped. A dated `v29.1.0` test remains valid evidence for that environment, but it does not become `v31.1.0` evidence unless the workflow is re-tested.

## Current evidence snapshot

| Area | Status | Evidence | Remaining limit |
|---|---|---|---|
| Canonical public implementation | Source-reviewed | `Bitcoin-II/BitcoinII-Core` remains the canonical current source/release path used by MoreBC2. | Periodic path/ownership recheck remains useful. |
| Current release metadata | Directly observed | BitcoinII Core `v31.1.0`, published 2026-08-29; six Linux/Windows/macOS release assets and GitHub-reported SHA-256 digests recorded. The lightweight tag points to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`, which GitHub reports as verified. | Independent binary hashing, signed-manifest/release-key discovery, and reproducibility remain open. |
| Historical v29 release audit | Integrity recorded / historical | `v29.1.0` 2026-08-27 audit independently hashed 10 uploaded assets and two generated source archives. | Applies to `v29.1.0` only. |
| Current release binary signatures | Partially resolved | Verified target-commit evidence exists, but no maintainer-signed binary checksum/signature path has been established by MoreBC2. | Commit verification is not binary authentication or reproducible-build proof. |
| Current consensus identity | Source-reviewed partial | `v31.1.0` documents ShockWave, data restrictions, replay protection, and fork-aware header synchronization; mainnet activation anchors at height `57750` are recorded. | Detailed new validation/synchronization caller paths remain open. |
| Current difficulty model | Source-reviewed | ShockWave per-block difficulty after height `57750`; 10-minute target spacing remains. | Empirical network-performance analysis remains open. |
| Replay protection | Source-reviewed partial | Activation height `57750`; fork ID `0x01324342`. | Detailed transaction/wallet/service path review remains open. |
| Data restrictions | Source-reviewed partial | Activation height `57750`; release describes Ordinals/inscriptions/Runes mitigation. | Detailed rule boundary/testing remains open. |
| Local BitcoinII node | Locally tested / current-dated | Isolated Windows `v31.1.0` Qt-server startup, mainnet peer discovery, initial sync, cookie RPC, shutdown, and restart passed on 2026-09-11. | Full sync, long-duration operation, optional indexes/pruning, and a v31 headless-daemon path remain unverified. |
| Read-only RPC commands | Locally tested / current-dated | The requested v31.1.0 node/network RPC set passed through direct cookie-authenticated loopback JSON-RPC; one newly created zero-transaction disposable wallet was isolated and inspected. | Transaction, signing, PSBT, broadcast, fee-estimation, wallet security, and production workflows remain untested. |
| Explorer/API/WebSocket | Directly observed / current-dated | 2026-09-11 checks verified the Official BitcoinII Explorer API plus Mempool-style REST/WebSocket surfaces on `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live`; compared explorers agreed on the same tip. | Long-term uptime, custody-grade reliability, and backend/operator independence remain unverified. |
| Electrum | Directly observed / current-dated | `infra1.bitcoin-ii.org:50008` TCP and `:50009` TLS answered `server.version` as ElectrumX `1.18.0`, protocol `1.4`; TLS hostname validation succeeded. | Wallet compatibility, spending, and Electrum broadcast behavior remain unverified. |
| Public transaction submission | Route presence observed | `/api/tx` on three Mempool-style services accepted POST and rejected deliberately invalid transaction payloads with HTTP 400. | Successful valid-BC2 transaction broadcast has not been tested. |
| Exchange integration docs | Current-facing source review | v31.1.0 integration/operator docs include ShockWave, replay protection, data restrictions, current release assets, current explorer hierarchy, and explicit unresolved confirmation policy. | Current node/wallet runtime testing and confirmation policy remain open. |
| Third-party wallet/service compatibility | Partial / unresolved | Source review and current Electrum reachability evidence exist. | Current v31 wallet/service workflow testing remains needed. |

## Current release evidence

- [Windows v31.1.0 node and RPC validation — 2026-09-11](windows-v31-node-rpc-validation-2026-09-11.md)
- [v31.1.0 release asset record](../releases/v31.1.0-assets.md)
- [BitcoinII release documentation](../documentation/releases.md)
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Source atlas: chainparams.cpp](../developers/source-atlas/chainparams-cpp.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)

## Historical runtime and release evidence

These records are intentionally preserved with their original version/date:

- [Windows node-operator test — 2026-08-27](windows-node-operator-test-2026-08-27.md)
- [Windows fresh-node peer discovery test — 2026-08-28](windows-peer-discovery-test-2026-08-28.md)
- [Local BitcoinII node inspection — 2026-07-10](local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test — 2026-07-10](read-only-rpc-smoke-test-2026-07-10.md)
- [Release-artifact authentication — 2026-08-27](release-artifact-authentication-2026-08-27.md)

Do not rewrite those files to substitute `v31.1.0`; create new evidence records when re-testing occurs.

## Ecosystem evidence

- [Public infrastructure smoke test — 2026-09-11](public-infrastructure-smoke-test-2026-09-11.md)
- [Public API, WebSocket, and Electrum smoke test — 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)
- [Public endpoints](../api/public-endpoints.md)
- [Explorers](../ecosystem/explorers.md)
- [APIs](../ecosystem/apis.md)
- [Exchanges](../ecosystem/exchanges.md)
- [Mining pools](../ecosystem/mining-pools.md)

These are dated observations, not permanent reliability claims.

## Current priorities

1. Independently authenticate the current `v31.1.0` assets beyond the repeat-byte Windows Qt hash recorded in the new runtime test.
2. Complete a fresh `v31.1.0` initial sync and exercise optional index/pruning configurations where needed.
3. Map replay-protection transaction behavior in detail.
4. Map data-restriction validation behavior in detail.
5. Review fork-aware header synchronization internals/runtime behavior.
6. Establish backend/operator independence where infrastructure redundancy is claimed.
7. Test valid-transaction behavior only in a deliberately isolated, safe integration workflow if that evidence becomes necessary.

## Update rule

When new evidence is added:

1. Link the dated record here.
2. Name the BitcoinII version/ref and environment.
3. Use the narrowest accurate status.
4. Do not upgrade historical evidence into current evidence by wording alone.
5. Re-date live-service claims when they are checked again.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors plus MoreBC2 dated historical evidence, the 2026-09-11 public-infrastructure probe, and the 2026-09-11 isolated Windows v31 node/RPC runtime record
**Notes:** This is an evidence navigation page; it does not independently reproduce every linked check.
