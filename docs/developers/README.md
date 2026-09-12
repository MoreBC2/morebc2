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
- [Mining overview](../mining/mining-overview.md)
- [v31.1.0 release assets](../releases/v31.1.0-assets.md)

The September runtime records supersede older statements that current v31 wallet/PSBT or node/RPC behavior had never been exercised locally. They do not convert source-only build, advanced mining, full P2P, backup/recovery, external-signer, or public-broadcast claims into tested claims.

## 2026-09-12 full Developers / Source Atlas audit

The complete developer documentation surface contains **55 Markdown pages** in scope:

- **12** pages directly under `docs/developers/`;
- **43** pages in `docs/developers/source-atlas/`, including the atlas index.

All 55 pages were included in the coordinated audit. Pages that already matched the current v31 evidence were intentionally left unchanged rather than rewritten for churn.

The final pass repaired the pages that still carried stale June/July or pre-v31 wording, including the mining RPC material that triggered this follow-up. Across the pass, the principal corrections were:

- current `v31.1.0` release/source framing instead of mutable-`main` or v29 assumptions;
- ShockWave-aware proof-of-work, contextual-header, block-template, mining-RPC, and chainwork wording;
- replay-domain-aware signing, PSBT, mempool, script, validation-cache, and external-signer boundaries;
- consensus data-restriction and activation-height coverage at `57750`;
- current mainnet P2P `8338`, protocol/runtime evidence, peer discovery, and node/RPC observations;
- exact distinction between local zero-peer `sendrawtransaction` evidence and public broadcast;
- current wallet runtime coverage without overstating backup/restore, encryption, history/rescan, or hardware/external signing;
- updated block acceptance, validation, reorg, mempool, network-relay, storage, and startup status wording;
- current build-system framing that distinguishes release-binary runtime validation from an unexecuted clean source build;
- current source-tree and repository-map navigation synchronized to the v31-specific atlas pages.

## Mining RPC status after this audit

The mining RPC page now uses command-specific evidence instead of the old blanket "commands have not been run" posture.

The isolated September v31 regtest workflow exercised `generatetoaddress` while creating disposable spendable outputs for PSBT testing. It did **not** establish runtime coverage for `getmininginfo`, `getnetworkhashps`, `getblocktemplate`, `submitblock`, or `submitheader`.

Those remaining commands stay source-reviewed until a dedicated current-release mining-RPC test exists. Pool Stratum subscribe/authorize/share submission, block attribution, and payout behavior are separate operational tests and are not inferred from Core RPC support.

## Current BitcoinII-specific boundaries

Developer documentation must not infer complete Bitcoin compatibility from inherited structure.

Current v31-specific boundaries include:

- **ShockWave** per-block difficulty from mainnet height `57750`;
- candidate-time-dependent `nBits` recalculation in mining/template paths;
- **replay protection** from height `57750` with fork/domain id `0x01324342`;
- next-block replay-domain handling in mempool acceptance;
- replay-domain-aware wallet, raw-transaction, PSBT, script, validation, and cache paths;
- consensus data restrictions from height `57750`;
- fork-aware header synchronization that can reproduce the ShockWave history needed for exact header validation;
- accumulated chainwork as the best-chain selection basis.

Address-format or API similarity alone therefore does not prove signing, wallet, exchange, miner, pool, or external-signer compatibility.

## Runtime versus source evidence

Current direct runtime evidence includes a bounded Windows v31 node/RPC test and a separate isolated zero-peer regtest wallet/PSBT/mempool lifecycle.

That evidence supports the exact commands and behaviors recorded in those reports. It does not prove:

- successful clean source compilation;
- full upstream unit/functional/fuzz test execution;
- Linux/macOS runtime parity;
- every networking/relay branch;
- public-mainnet transaction propagation;
- backup/restore, encryption, or rescan workflows;
- external/hardware signing;
- advanced block submission or pool Stratum behavior.

Partial status on those areas reflects the evidence boundary, not an unaudited page.

## Audit result by area

| Area | Audit result |
|---|---|
| Developer index | Completed and synchronized to the full 55-page audit |
| Reading order | Current; v31-specific consensus/signing material prioritized |
| RPC overview | Current v31 runtime/source split retained |
| Mining RPC | Repaired for ShockWave, current command registration, and actual `generatetoaddress` runtime evidence |
| Blockchain / network RPC | Repaired to recognize the bounded September node/RPC runtime subset |
| Wallet RPC family | Current runtime/source boundaries synchronized; high-impact recovery/encryption paths remain source-only |
| Validation / script / transaction consensus | Repaired around replay protection and current BitcoinII-specific consensus behavior |
| Mempool | Repaired around next-block replay domain, activation clearing, cache separation, and local runtime evidence |
| Mining / PoW / templates | Repaired around ShockWave and candidate-time / `nBits` coupling |
| Networking / relay | Repaired to incorporate current v31 peer/runtime evidence without pretending every P2P branch was tested |
| Startup / storage / node structure | Repaired to incorporate current v31 node, pruning/index, and shutdown observations where applicable |
| Build system | Current v31/CMake map retained; source-build commands remain unexecuted |
| Repository map / source tree | Rebuilt as current v31 navigation aids |
| Release process / verification | Current six-asset and tag/commit provenance evidence retained |
| Verification standards / testing / local development | Current evidence-class and runtime/source distinctions retained |
| Source Atlas index | Completed with the final full-atlas audit record and current evidence boundaries |

## Source-backed architecture pages

- [Life of a transaction](../architecture/life-of-a-transaction.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Mempool flow](../architecture/mempool-flow.md)

## Section boundaries

Source Atlas is the implementation-review area. API, Compatibility, Infrastructure, Wallets, Exchange Integration, Releases, Nodes, and Mining should link back to dated source/runtime evidence instead of duplicating long technical traces.

Public explorer/API evidence is not a substitute for local Core consensus state, and local zero-peer transaction submission is not evidence of public propagation.

## Verification rule

Developer documentation should cite release-pinned source, official release evidence, or dated runtime tests whenever possible. Commands should not be marked tested until they were actually executed in a documented environment, and a successful release-binary runtime test must not be described as a successful source build.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source/release evidence, MoreBC2 September 2026 runtime records, current wallet/compatibility/node/mining audits, and current release/infrastructure evidence  
**Notes:** All 55 Developers / Source Atlas pages were included in the audit. Remaining partial labels describe genuine evidence gaps—clean source builds/test-suite execution, cross-platform parity, some lower-level P2P behavior, backup/recovery/encryption/rescan runtime testing, public broadcast, advanced mining RPC, Stratum/payout behavior, and external/hardware signing—not skipped documentation.