# Documentation

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This section contains current, evidence-linked documentation about BitcoinII (BC2).

Current-facing technical pages use BitcoinII Core `v31.1.0` as the baseline unless a page explicitly preserves older version-scoped evidence. Current implementation claims should prefer release-pinned source; runtime claims should point to dated tests; live ecosystem claims should point to dated direct observations.

## Current pages

- [What is BitcoinII?](what-is-bitcoinii.md)
- [Project overview](project-overview.md)
- [Network specifications](network-specifications.md)
- [Consensus overview](consensus-overview.md)
- [Checkpoints](checkpoints.md)
- [Releases](releases.md)
- [Explorer resources](explorer-resources.md)

## Current v31 anchors

The current documentation baseline includes:

- ticker / formatted currency unit `BC2` and atom `sat2` from current source;
- 10-minute target spacing and double-SHA256 block-header hashing;
- ShockWave per-block difficulty adjustment from mainnet height `57750`;
- consensus-level data restrictions from height `57750`;
- BC2 replay protection from height `57750` using fork/domain id `0x01324342`;
- fork-aware header synchronization;
- mainnet P2P default `8338` and documented mainnet RPC default `8332`;
- current checkpoint data through height `57752`;
- current `v31.1.0` release metadata and six uploaded release assets.

BitcoinII's public website remains useful for project-controlled links and user-facing resources, but release-pinned source takes precedence for current protocol details when website prose is older or contradictory.

## Runtime evidence now available

Current documentation can rely on bounded `v31.1.0` runtime evidence that did not exist when this section was first drafted:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md): isolated mainnet startup, cookie-authenticated RPC, current P2P port, outbound peers, header/block synchronization, disposable wallet creation/reload, restart, and clean shutdown;
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md): complete disposable regtest PSBT lifecycle, `testmempoolaccept`, and local-only mempool submission, with replay protection traced separately in release-pinned source;
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md): current explorer, REST, WebSocket, and Electrum observations.

Those records are deliberately bounded. They do not certify every platform, wallet, signer, service, or consensus activation boundary.

## Related sections

- [Architecture](../architecture/README.md) — component and lifecycle maps.
- [Wallets](../wallets/README.md) — wallet evidence and safe user guidance.
- [Nodes](../nodes/README.md) — node-operation guidance.
- [Mining](../mining/README.md) — current mining and ShockWave behavior.
- [API](../api/README.md) — public API, WebSocket, Electrum, and read-only RPC evidence.
- [Compatibility](../compatibility/README.md) — known integration boundaries and breakpoints.
- [Releases](../releases/README.md) — release provenance and authentication boundaries.
- [Exchange integration](../exchange/README.md) — service-provider integration guidance.
- [Source Atlas](../developers/source-atlas/README.md) — release-pinned implementation mapping.
- [Verification](../verification/README.md) — dated evidence, open questions, and test records.

## Evidence rules

- Do not mix current behavior with speculation, proposals, or historical-only material without labeling the boundary.
- Do not infer current BitcoinII behavior from Bitcoin similarity when `v31.1.0` contains BitcoinII-specific consensus or signing changes.
- Do not treat source review as runtime proof.
- Do not treat one bounded runtime test as cross-platform certification.
- Do not present public-service reachability as uptime, independence, or an SLA.
- Do not present a finite confirmation count as protocol finality.
- Keep exchange/service policy separate from BitcoinII consensus.
- Keep third-party wallet claims separate from MoreBC2 testing.

## 2026-09-12 audit record

All seven content pages in this section were reviewed against the current v31 source reviews, September wallet/node/PSBT evidence, compatibility findings, architecture audit, release provenance work, and public-infrastructure evidence.

The principal repairs were:

- removing stale claims that v31 runtime behavior was still untested;
- completing current ticker/unit sourcing;
- updating checkpoints through height `57752`;
- replacing pre-review consensus TODOs with the current ShockWave/replay/data-restriction/header-sync findings;
- updating the release page from four to six current assets and separating verified source-commit provenance from binary authentication;
- replacing July explorer evidence with the September service hierarchy and endpoint observations;
- tightening wording around RPC defaults, replay protection, third-party wallets, public broadcast, and confirmation/finality claims.

## Site publication boundary

These pages are published through the MoreBC2 documentation site, but a successful MoreBC2 build/deploy proves only that the documentation rendered and deployed correctly. It does not independently verify BitcoinII protocol or ecosystem claims.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` release-pinned source/release metadata, MoreBC2 September 2026 node/RPC/PSBT/public-infrastructure evidence, current architecture/compatibility/wallet evidence, and current source registry  
**Notes:** The section is current for the principal v31 technical and release facts. Full source-build reproduction, full test-suite execution, activation-boundary runtime vectors, public valid-transaction broadcast, external-signer compatibility, and long-term service reliability remain outside the present evidence.
