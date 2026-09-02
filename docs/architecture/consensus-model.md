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

Transaction input/signature rules
  -> referenced outputs exist
  -> values are in range
  -> inputs are spendable
  -> post-activation BC2 signature-hash domain
  -> input verification checks pass

Mempool policy layer
  -> next-block replay-protection domain
  -> standardness and relay rules
  -> ancestor/descendant limits
  -> replacement and package checks

Chain selection / synchronization
  -> valid blocks only
  -> most accumulated work among usable candidates
  -> active chain may reorganize
  -> alternate header branches reproduce branch-specific ShockWave history
```

## Header consensus and difficulty

`CheckProofOfWork` validates the proof-of-work target.

For pre-activation history, BitcoinII used the inherited Bitcoin-style retarget path. Beginning at mainnet height `57750`, `GetNextWorkRequired` uses **ShockWave** for the next-block work requirement.

The dedicated [ShockWave v31 source review](../developers/source-atlas/shockwave-v31.md) now documents the 25-block / 24-interval MTP rolling baseline, six-interval short-horizon controller, explicit per-block bounds, timestamp moderation, emergency recovery, mining interaction, and header-sync history requirements.

Current MoreBC2 documentation must not describe BitcoinII mainnet as using only 2016-block retargeting.

## v31.1.0 BitcoinII-specific consensus anchors

Mainnet chain parameters set these BitcoinII-specific activations at height `57750`:

- ShockWave difficulty adjustment;
- consensus-level data restrictions;
- BC2 replay protection.

The replay-protection fork ID is `0x01324342`.

## BitcoinII data restrictions

The [v31 data-restriction review](../developers/source-atlas/data-restrictions-v31.md) traces the post-activation consensus rules into `src/consensus/bitcoinII_data.h` and `validation.cpp`.

The reviewed rules explicitly cover:

- OP_RETURN output count;
- OP_RETURN size;
- actual `OP_13` opcodes in OP_RETURN scripts;
- bare multisig outputs;
- Taproot annex data;
- oversized script-path tapscripts;
- semantic Ordinals inscription envelopes.

These are consensus checks after activation, not merely relay-policy preferences. MoreBC2 should avoid broadening this into a claim that every conceivable arbitrary-data protocol is impossible.

## Replay protection

The [v31 replay-protection review](../developers/source-atlas/replay-protection-v31.md) confirms that the fork id is a signature-hash domain rather than an address-format change.

Below activation, the selected fork id is zero and legacy BitcoinII digests are preserved. At and above activation, the configured BC2 domain is included in signature hashing.

The domain is threaded through:

- mempool validation for the next block height;
- script-validation cache keys;
- raw-transaction signing;
- wallet signing;
- PSBT precomputation/finalization;
- external-signer safety handling.

The mempool is cleared immediately before activation so legacy-domain transactions are not carried across the boundary.

## Block consensus

Reviewed block-level validation includes context-free block checks, contextual block checks, full block acceptance, best-chain activation, block connection, and undo-data writing for later disconnection.

After height `57750`, BitcoinII-specific output and Taproot witness restrictions are added to the block-connection path.

## UTXO model

BitcoinII continues to use a Bitcoin-style UTXO model.

When a block is connected, spent outputs are consumed and new outputs are added. During a reorganization, disconnected-block effects are reversed using undo data before the replacement branch is connected.

## Chain selection and reorganizations

The reviewed best-chain path selects a usable most-work candidate and connects or disconnects blocks as required.

A node does not switch to an invalid branch solely because it appears to contain more work.

Reorganizations can make previously confirmed transactions unconfirmed again, which remains relevant to exchange confirmation policy even with ShockWave's faster response to hashrate changes.

## Fork-aware header synchronization

The [v31 header-sync review](../developers/source-atlas/headers-sync-v31.md) narrows the release-note phrase "fork-aware header synchronization" to a source-backed implementation path.

The existing PRESYNC/REDOWNLOAD anti-DoS framework is rooted at the candidate branch's known fork point. For ShockWave-era branches, `HeadersSyncState` maintains a private 35-index synthetic history so candidate `nBits` can be checked with production `GetNextWorkRequired()` using that branch's own target and MTP history.

Header sync does not itself choose the active chain; normal validation and most-work chain selection still perform that role.

## Consensus vs policy

Policy remains distinct from consensus. Reviewed policy/service surfaces include mempool prechecks, replacement/package checks, ancestor/descendant limits, dry-run acceptance, and transaction broadcast RPCs.

Replay protection crosses this boundary in a deliberate way: mempool admission uses the consensus domain for the **next block** so activation cannot leave the mempool populated with signatures valid only under the old domain.

## What is not fully reviewed yet

- Local execution of the located v31 consensus/header-sync tests.
- Controlled replay-protection digest/test vectors.
- Controlled data-restriction activation-boundary tests.
- Live competing-branch/header-sync scenarios.
- Full mandatory vs policy script-flag separation under `v31.1.0`.
- Release-specific regression review outside the four audited v31 feature paths.
- Current production confirmation-policy recommendations.

## Related pages

- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)
- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
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
- Canonical `v31.1.0` source: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Draft
**Primary sources checked:** Partially, with dedicated `v31.1.0` source-path reviews for ShockWave, replay protection, data restrictions, and ShockWave-aware header synchronization
**Notes:** Current high-level consensus framing now links to dedicated source reviews. Runtime and test execution remain explicitly separate evidence tasks.