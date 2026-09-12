# Developers

**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

This section is the developer-focused entry point for BitcoinII (BC2) source review, runtime evidence, build/test guidance, release verification, RPC behavior, and integration-facing implementation notes.

Current technical work should use BitcoinII Core `v31.1.0` as the release baseline unless a page is explicitly historical.

## Start here

- [Developer reading order](reading-order.md)
- [Verification standards workflow](verification-standards.md)
- [Source review guide](source-review-guide.md)
- [Source atlas](source-atlas/README.md)
- [Repository map](repository-map.md)
- [Source tree guide](source-tree.md)
- [RPC overview](rpc-overview.md)
- [API documentation](../api/README.md)
- [Compatibility](../compatibility/README.md)
- [Releases](../releases/README.md)
- [Infrastructure directory](../infrastructure/README.md)

## Developer workflow guides

- [Local development environment](local-development.md)
- [Build system guide](build-system.md)
- [Testing guide](testing.md)
- [Release process guide](release-process.md)
- [Release verification guide](release-verification.md)

## Current v31 evidence anchors

Developer-facing claims should prefer these current records where applicable:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [v31 wallet, PSBT, RPC, mempool, and mining source regression audit — 2026-09-02](../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [v31.1.0 release assets](../releases/v31.1.0-assets.md)

The September 11 runtime records supersede older statements that wallet/PSBT behavior had never been exercised locally. They do not convert source-only build, cross-platform, external-signer, or public-broadcast claims into tested claims.

## 2026-09-12 audit record

The developer section was reviewed as a coordinated pass against the current `v31.1.0` source/release baseline and September runtime evidence.

| Area | Audit result |
|---|---|
| Developer index | Refreshed for current evidence and section boundaries |
| Reading order | Refreshed to put v31-specific consensus/signing material ahead of inherited structural pages |
| RPC overview | Repaired to replace the old v29-only runtime posture with current v31 evidence |
| Release process / verification | Repaired for six v31 assets and current tag/commit provenance evidence |
| Verification standards | Synchronized with the current claim-specific Evidence Scale |
| Testing guide | Updated to distinguish source test-suite review from the runtime validation MoreBC2 has actually performed |
| Local development | Updated to distinguish release-binary runtime testing from an unverified source-build workflow |
| Source review guide | Refreshed for release-pinned v31 review and current-vs-historical discipline |
| Build system | Reviewed; current v31/CMake description remains useful, source-build commands remain unexecuted |
| Repository map / source tree | Reviewed as navigation aids; broad structure remains useful, while v31-specific behavior is delegated to release-pinned atlas pages |
| Source atlas | Reviewed against the existing v31 regression audit and current v31-specific entries; older structural entries remain bounded source-review pages rather than universal compatibility claims |

## Source-backed architecture pages

- [Life of a transaction](../architecture/life-of-a-transaction.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Mempool flow](../architecture/mempool-flow.md)

## Section boundaries

Source Atlas is the implementation-review area. API, Compatibility, Infrastructure, Wallets, Exchange Integration, and Releases should link back to dated source/runtime evidence instead of duplicating long technical traces.

Do not treat an inherited Bitcoin-like code path as proof of third-party compatibility. In particular, v31 replay protection and ShockWave create BitcoinII-specific signing, mempool, mining, and difficulty boundaries.

## Verification rule

Developer documentation should cite release-pinned source, official release evidence, or dated runtime tests whenever possible. Commands should not be marked tested until they were actually executed in a documented environment, and a successful release-binary runtime test must not be described as a successful source build.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source/release evidence and MoreBC2 September 2026 runtime records  
**Notes:** The section is current for the principal v31 consensus, RPC, wallet/PSBT, release, and evidence-boundary changes. Source-build reproduction, full test-suite execution, cross-platform runtime coverage, external signing, and some older file-by-file atlas entries remain intentionally partial.