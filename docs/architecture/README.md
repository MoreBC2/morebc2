# Architecture

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

The architecture section explains how the major BitcoinII Core components fit together and how current BitcoinII-specific rules affect those flows.

Current-facing architecture documentation uses BitcoinII Core `v31.1.0` as the release baseline. Older Bitcoin-style structure remains useful where the current source still follows it, but current BitcoinII behavior must account for ShockWave, replay protection, consensus data restrictions, and fork-aware header synchronization.

## Current pages

- [Architecture overview](architecture-overview.md)
- [Node startup](node-startup.md)
- [Consensus model](consensus-model.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Block validation flow](block-validation-flow.md)
- [Mempool flow](mempool-flow.md)
- [Peer communication model](peer-communication-model.md)

## Current v31 architecture anchors

The principal BitcoinII-specific architecture changes in the current release are:

- ShockWave per-block difficulty adjustment from mainnet height `57750`;
- consensus-level data restrictions from height `57750`;
- BC2 replay protection from height `57750`, using fork/domain id `0x01324342`;
- fork-aware header synchronization that preserves branch-specific difficulty context;
- wallet, PSBT, mempool, mining, RPC, and validation changes required by those rules.

The current dedicated source reviews are:

- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Consensus data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)
- [Fork-aware header synchronization v31](../developers/source-atlas/headers-sync-v31.md)
- [v31 wallet, PSBT, RPC, mempool, and mining regression audit](../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)

## Runtime evidence that now informs architecture

Architecture pages should distinguish source structure from runtime evidence.

Current bounded runtime evidence includes:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md), which exercised isolated mainnet startup, peer discovery, header/block synchronization, RPC, a disposable wallet, restart, and clean shutdown;
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md), which exercised a complete disposable regtest PSBT lifecycle and local-only mempool submission.

Those tests are meaningful architecture evidence, but they do not prove every code path, platform, activation boundary, or third-party integration.

## P2P Source Atlas support

Peer communication has first-pass Source Atlas coverage for protocol primitives, connection management, address management, handshake, address relay, transaction relay, block/header relay, peer health, and the send loop.

The September 11 v31 runtime test additionally established real outbound peer connections and current header acquisition in the bounded Windows environment. It did not packet-trace every P2P message or test inbound connectivity.

## 2026-09-12 audit record

The full architecture category was reviewed against the current v31 source reviews and September runtime evidence.

Key repairs include:

- replacing statements that v31 startup, wallet, PSBT, or mempool behavior had never been locally exercised;
- integrating replay-protection behavior into transaction, mempool, and validation architecture;
- integrating ShockWave candidate-time/difficulty coupling into block/mining architecture;
- integrating fork-aware header synchronization into peer/header architecture;
- preserving most-work chain selection and reorganization behavior as distinct from difficulty adjustment;
- keeping confirmation-count policy separate from consensus finality.

## Rules

- Explain concepts in plain language.
- Prefer release-pinned source for current implementation claims.
- Link runtime claims to dated test records.
- Do not treat source review as runtime proof.
- Do not treat a bounded runtime test as cross-platform or production certification.
- Separate consensus, mempool policy, wallet behavior, P2P behavior, and service policy.
- Do not infer third-party compatibility from Bitcoin-like structure alone.
- Mark untested activation-boundary or external-signer behavior explicitly.

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source/release material plus MoreBC2 September 2026 node, RPC, wallet, PSBT, mempool, and public-infrastructure evidence  
**Notes:** The category is current for the principal v31 architectural changes. Full source-build reproduction, complete test-suite execution, activation-boundary runtime vectors, inbound-P2P testing, deep reorg simulation, and third-party signer/wallet behavior remain partial or untested.
