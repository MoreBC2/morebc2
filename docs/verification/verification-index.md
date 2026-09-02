# Verification evidence index

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-02

## Purpose

This page is the quickest way to see what MoreBC2 has directly observed, locally tested, source-reviewed, or left unresolved.

Evidence is version-scoped. A dated `v29.1.0` test remains valid evidence for that environment, but it does not become `v31.1.0` evidence unless the workflow is re-tested.

## Current evidence snapshot

| Area | Status | Evidence | Remaining limit |
|---|---|---|---|
| Canonical public implementation | Source-reviewed | `Bitcoin-II/BitcoinII-Core` remains the canonical current source/release path used by MoreBC2. | Periodic path/ownership recheck remains useful. |
| Current release metadata | Directly observed | BitcoinII Core `v31.1.0`, published 2026-08-29; four uploaded Linux/Windows CLI/Qt assets and GitHub-reported SHA-256 digests recorded. | Independent current-release authentication has not yet been completed. |
| Historical v29 release audit | Integrity recorded / historical | `v29.1.0` 2026-08-27 audit independently hashed 10 uploaded assets and two generated source archives. | Applies to `v29.1.0` only. |
| Current release binary signatures | Unresolved | No current trusted BitcoinII release-key/checksum/signature path has been established by MoreBC2. | GitHub digest metadata is not a maintainer-signed manifest. |
| Current consensus identity | Source-reviewed partial | `v31.1.0` documents ShockWave, data restrictions, replay protection, and fork-aware header synchronization; mainnet activation anchors at height `57750` are recorded. | Detailed new validation/synchronization caller paths remain open. |
| Current difficulty model | Source-reviewed | ShockWave per-block difficulty after height `57750`; 10-minute target spacing remains. | Empirical network-performance analysis remains open. |
| Replay protection | Source-reviewed partial | Activation height `57750`; fork ID `0x01324342`. | Detailed transaction/wallet/service path review remains open. |
| Data restrictions | Source-reviewed partial | Activation height `57750`; release describes Ordinals/inscriptions/Runes mitigation. | Detailed rule boundary/testing remains open. |
| Local BitcoinII node | Locally tested / historical | `v29.1.0` Windows GUI/CLI startup, sync, RPC, shutdown/restart, and peer-discovery records exist. | Dedicated `v31.1.0` runtime record needed. |
| Read-only RPC commands | Locally tested / historical | Nine read-only RPC commands passed in the dated `v29.1.0` Windows environment. | Re-test representative commands on `v31.1.0` before calling them current-runtime evidence. |
| Explorer/API/Electrum | Directly observed / dated | July 2026 records exist for explorer, REST, WebSocket, and Electrum surfaces. | Reachability and compatibility can become stale; recheck before current recommendations. |
| Exchange integration docs | Current-facing source review | v31.1.0 integration/operator docs include ShockWave, replay protection, data restrictions, current release assets, and explicit unresolved confirmation policy. | Current service/operator runtime testing and confirmation policy remain open. |
| Third-party wallet/service compatibility | Partial / unresolved | Earlier protocol/source observations exist. | Current v31 workflow testing remains needed. |

## Current release evidence

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

- [Public API, WebSocket, and Electrum smoke test — 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)
- [Explorers](../ecosystem/explorers.md)
- [APIs](../ecosystem/apis.md)
- [Exchanges](../ecosystem/exchanges.md)
- [Mining pools](../ecosystem/mining-pools.md)

These are dated observations, not permanent reliability claims.

## Current priorities

1. Independently authenticate/hash current `v31.1.0` assets.
2. Produce a fresh `v31.1.0` node/RPC runtime record.
3. Map replay-protection transaction behavior in detail.
4. Map data-restriction validation behavior in detail.
5. Review fork-aware header synchronization internals/runtime behavior.
6. Recheck active ecosystem/service claims before recommendation or public launch.

## Update rule

When new evidence is added:

1. Link the dated record here.
2. Name the BitcoinII version/ref and environment.
3. Use the narrowest accurate status.
4. Do not upgrade historical evidence into current evidence by wording alone.
5. Re-date live-service claims when they are checked again.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors plus MoreBC2 dated historical evidence
**Notes:** This is an evidence navigation page; it does not independently reproduce every linked check.