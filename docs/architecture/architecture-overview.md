# Architecture overview

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII Core is reference software for participating in the BitcoinII (BC2) network.

This page gives a high-level architecture map and points readers toward focused architecture, Source Atlas, and verification pages. Current-facing architecture uses BitcoinII Core `v31.1.0` as the baseline.

## v31.1.0 architecture boundary

The current release contains BitcoinII-specific behavior that materially affects several major paths:

- ShockWave per-block difficulty adjustment from mainnet height `57750`;
- consensus-level data restrictions from height `57750`;
- BC2 replay protection from height `57750`;
- fork-aware header synchronization;
- wallet, PSBT, mempool, mining, RPC, and validation changes required by those rules.

Detailed current source reviews now exist for all four principal v31 feature paths. Older structural pages remain useful only within their stated scope.

## Conceptual component map

```text
User / service / miner / wallet
      |
      v
CLI / GUI / RPC / wallet interface
      |
      v
BitcoinII Core node
      |
      +-- Startup and configuration
      +-- Chain parameters and activation heights
      +-- RPC server, if enabled
      +-- Wallet / PSBT paths, if enabled
      +-- Peer-to-peer networking
      +-- Address manager and seed state
      +-- Header synchronization
      +-- Mempool and transaction sharing policy
      +-- Block and transaction validation
      +-- Replay/data-restriction consensus checks
      +-- Chainstate and UTXO view
      +-- Block storage and indexes
      +-- Mining / candidate block assembly
      +-- ShockWave next-work calculation
      |
      v
BitcoinII peer-to-peer network
```

## Startup and local runtime

Startup prepares configuration, chainstate, networking, indexes, wallet clients, RPC, mempool state, and shutdown wiring before normal operation.

The September 11 Windows `v31.1.0` runtime test directly established that a fresh isolated mainnet data directory could:

- start in Qt server mode;
- expose cookie-authenticated loopback RPC;
- listen on the current mainnet P2P port `8338`;
- discover outbound peers and acquire the current header chain;
- advance block validation while remaining in initial block download;
- create and later reload a disposable SQLite descriptor wallet;
- restart against retained chain state;
- stop cleanly without touching an existing wallet or data directory.

That is current runtime evidence for the startup architecture. It is not a source-build, full-sync, cross-platform, or production-wallet certification.

## Consensus and validation

Current high-level consensus anchors include:

- BitcoinII chain identity and activation parameters;
- proof-of-work target validation;
- ShockWave per-block next-work calculation after height `57750`;
- transaction consensus and script verification;
- BC2 replay-protection signature domains;
- consensus-level data restrictions;
- block/header validation and accumulated-work chain selection;
- UTXO connection/disconnection and reorganization handling.

See [Consensus model](consensus-model.md), [Block validation flow](block-validation-flow.md), and the v31-specific Source Atlas pages.

## Mempool and transaction acceptance

The current source review covers mempool structure, acceptance, replacement/package behavior, transaction relay, raw-transaction RPC, and reorg interaction.

The important v31 boundary is that mempool signature validation uses the replay-protection domain for the **next block height**, and the script-validation cache includes that domain. The mempool is cleared at the activation boundary so legacy-domain transactions are not carried into the post-fork signing domain.

The September 11 isolated regtest test additionally exercised `testmempoolaccept` and local-only `sendrawtransaction` for a disposable signed transaction. That proves the ordinary v31 PSBT-to-local-mempool path under the documented regtest conditions; it does not exercise the mainnet replay-domain switch or public broadcast.

## Blocks, chainstate, and reorganizations

Current architecture reviews cover:

- header and block acceptance;
- candidate-chain selection by accumulated work;
- block connection/disconnection;
- UTXO updates and undo data;
- reorganization handling;
- block storage and pruning-adjacent paths.

ShockWave changes the required work for each post-activation block, but chain selection still uses accumulated chain work. A faster difficulty response does not create deterministic finality or eliminate reorganizations.

## Fork-aware header synchronization

The current v31 source review documents the release-note phrase `fork-aware header synchronization` more precisely.

For ShockWave-era branches, the header-sync path carries branch-specific synthetic history so candidate difficulty can be evaluated against that branch's own target and median-time-past history using production next-work logic. Header synchronization does not itself select the active chain; normal validation and most-work chain selection still do that.

## Peer-to-peer networking

MoreBC2 has first-pass source coverage for protocol primitives, connection management, address management, DNS/bootstrap paths, handshake, address relay, transaction relay, block/header relay, peer health, and the send loop.

The September 11 runtime test established current outbound peer operation with protocol version `70016`, `/BitcoinII:31.1.0/` peers, four outbound peers during the first run and six after restart. It did not test inbound reachability or trace every message-level edge case.

## Mining and proof of work

Current BitcoinII mainnet targets 10-minute blocks and uses double-SHA256 block-header hashing.

The present difficulty model is **ShockWave per block from height `57750`**, not a 2016-block-only retarget schedule.

Current mining/template source review also establishes that candidate time can change required work under ShockWave. Template code that changes `nTime` must derive current `nBits` through the production next-work path rather than reusing stale difficulty assumptions.

## Wallet, PSBT, and signing

The September 11 isolated regtest test directly exercised:

- wallet creation;
- local funding;
- `walletcreatefundedpsbt`;
- `walletprocesspsbt`;
- PSBT decoding;
- finalization;
- raw transaction decoding;
- `testmempoolaccept`;
- local-only `sendrawtransaction`.

Mainnet replay protection remains source-confirmed rather than runtime-activated in that test because the shipped regtest parameters leave the replay domain disabled. Hardware/external signer compatibility remains unverified.

## Evidence boundary

Architecture claims should be interpreted by evidence type:

- source review explains implementation paths;
- release notes establish release-scoped change descriptions;
- local tests establish what happened in that exact environment;
- public-service checks establish point-in-time service behavior;
- none of those automatically proves third-party compatibility or long-term reliability.

## Related pages

- [Consensus model](consensus-model.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Mempool flow](mempool-flow.md)
- [Peer communication model](peer-communication-model.md)
- [Node startup](node-startup.md)
- [Source Atlas](../developers/source-atlas/README.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` release/source reviews plus September 11 node/RPC and PSBT runtime records  
**Notes:** The high-level architecture is current for the principal v31 changes. Full-sync runtime coverage, activation-boundary vectors, source-build reproduction, external signing, deep reorg simulation, and cross-platform testing remain outside the current evidence.
