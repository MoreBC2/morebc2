# Consensus model

**Category:** Architecture
**Status:** Draft
**Last reviewed:** 2026-09-02

## Summary

This page explains how MoreBC2 currently frames BitcoinII consensus at a high level.

It is not a complete consensus specification. It connects source-backed documentation already reviewed in MoreBC2 with the current BitcoinII Core `v31.1.0` consensus model.

## Core idea

Consensus rules are the rules every fully validating node must apply the same way to agree on which blocks and transactions are valid.

Mempool policy is different. Policy rules affect what a local node accepts, keeps, relays, or mines before confirmation. A transaction may be consensus-valid in a block but still fail local mempool policy.

## Simplified model

```text
Block header rules
  -> proof-of-work
  -> previous-block link
  -> ShockWave next-work requirement after height 57750
  -> timestamp/context rules

Block body rules
  -> merkle root
  -> coinbase placement
  -> block size/weight limits
  -> transaction structure checks
  -> BitcoinII data restrictions after height 57750

Transaction input rules
  -> referenced outputs exist
  -> values are in range
  -> inputs are spendable
  -> replay-protection rules where applicable
  -> input verification checks pass

Mempool policy layer
  -> standardness and relay rules
  -> ancestor/descendant limits
  -> replacement and package checks

Chain selection / synchronization
  -> valid blocks only
  -> most accumulated work among usable candidates
  -> active chain may reorganize
  -> v31.1.0 includes fork-aware header synchronization
```

## Header consensus and difficulty

`CheckProofOfWork` validates the proof-of-work target.

For pre-activation history, BitcoinII used the inherited Bitcoin-style retarget path. Beginning at mainnet height `57750`, `GetNextWorkRequired` uses **ShockWave** for the next-block work requirement.

Current ShockWave source includes a 25-block / 24-interval rolling baseline, a six-interval fast-response sensor, per-block `+/-4x` final bounds, timestamp-consistency controls, emergency stall recovery, and post-recovery stabilization.

Current MoreBC2 documentation must not describe BitcoinII mainnet as using only 2016-block retargeting.

## v31.1.0 BitcoinII-specific consensus anchors

Mainnet chain parameters set these BitcoinII-specific activations at height `57750`:

- ShockWave difficulty adjustment;
- consensus-level data restrictions;
- BC2 replay protection.

The replay-protection fork ID is `0x01324342`.

The `v31.1.0` release also identifies fork-aware header synchronization and associated wallet, mining, mempool, RPC, validation, and PSBT updates.

## Block consensus

Reviewed block-level validation includes:

- context-free block checks;
- contextual block checks;
- full block acceptance;
- best-chain activation;
- block connection;
- undo-data writing for later disconnection.

A block must pass structural and contextual checks before it can safely move toward active-chain connection.

The new v31 data-restriction path still needs a dedicated MoreBC2 source slice before this page attempts a detailed rule-by-rule description.

## Transaction consensus

Existing reviewed transaction layers include:

- context-independent shape and value checks;
- finality and sequence locks;
- UTXO-input checks;
- script execution and signature checks;
- coinbase maturity and fee accounting.

BitcoinII replay protection is now an additional current consensus consideration. MoreBC2 has confirmed its activation and fork ID from chain parameters but has not yet completed a full transaction-path explanation.

## UTXO model

BitcoinII continues to use a Bitcoin-style UTXO model.

When a block is connected, spent outputs are consumed and new outputs are added. During a reorganization, disconnected-block effects are reversed using undo data before the replacement branch is connected.

## Chain selection and reorganizations

The reviewed best-chain path selects a usable most-work candidate and connects or disconnects blocks as required.

A node does not switch to an invalid branch solely because it appears to contain more work.

Reorganizations can make previously confirmed transactions unconfirmed again, which remains relevant to exchange confirmation policy even with ShockWave's faster response to hashrate changes.

## Fork-aware header synchronization

`v31.1.0` explicitly adds fork-aware header synchronization. This should be treated as current node/architecture behavior, while detailed message-flow and edge-case documentation remains a separate source-review task.

## Consensus vs policy

Policy remains distinct from consensus. Reviewed policy/service surfaces include mempool prechecks, replacement/package checks, ancestor/descendant limits, dry-run acceptance, and transaction broadcast RPCs.

The `v31.1.0` release notes identify mempool/RPC/validation updates, so older detailed pages should be treated as first-pass source reviews until release-specific caller behavior is rechecked.

## What is not fully reviewed yet

- Detailed replay-protection transaction path.
- Detailed data-restriction validation path.
- Fork-aware header synchronization internals.
- Full mandatory vs policy script-flag separation under `v31.1.0`.
- Release-specific regression review of wallet/mempool/RPC/PSBT changes.
- Current production confirmation-policy recommendations.

## Related pages

- [Consensus overview](../documentation/consensus-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Mining overview](../mining/mining-overview.md)
- [Source atlas: pow.cpp](../developers/source-atlas/pow-cpp.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a reorganization](life-of-a-reorg.md)

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- `v31.1.0/src/kernel/chainparams.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/kernel/chainparams.cpp
- `v31.1.0/src/pow.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/v31.1.0/src/pow.cpp

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** High-level current consensus framing is refreshed for `v31.1.0`; detailed review of the new BitcoinII-specific validation and synchronization paths remains open.