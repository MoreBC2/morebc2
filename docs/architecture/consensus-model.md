# Consensus model

**Category:** Architecture
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page explains how MoreBC2 currently frames BitcoinII consensus at a high level.

It is not a complete consensus specification. It connects release-pinned source review with the current BitcoinII Core `v31.1.0` architecture and keeps consensus distinct from mempool policy, wallet behavior, and exchange/service policy.

## Core idea

Consensus rules are the rules fully validating nodes must apply consistently when deciding which blocks and transactions are valid.

Mempool policy is different. Policy controls what a local node accepts, keeps, relays, or mines before confirmation. A transaction may be consensus-valid in a block while still failing local mempool policy.

Exchange confirmation settings are different again. They are operational risk policy, not protocol finality.

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
  -> height-appropriate BC2 signature-hash domain
  -> input/script verification checks pass

Mempool policy layer
  -> next-block replay-protection domain
  -> standardness and relay rules
  -> ancestor/descendant limits
  -> replacement and package checks

Chain selection / synchronization
  -> valid blocks only
  -> most accumulated work among usable candidates
  -> active chain may reorganize
  -> alternate ShockWave-era branches use branch-specific history
```

## Difficulty and chain work

`CheckProofOfWork` validates the proof-of-work target.

For pre-activation history, BitcoinII used the inherited Bitcoin-style retarget path. Beginning at mainnet height `57750`, `GetNextWorkRequired` uses **ShockWave** for each next-block work requirement.

The current ShockWave review documents a recent-history MTP baseline, a shorter-horizon timing controller, per-block bounds, timestamp safeguards, and emergency stall recovery. Exact behavior remains defined by the release-pinned implementation.

ShockWave changes required work; it does not replace accumulated-work chain selection. The active chain is still selected from valid usable candidates by accumulated chain work.

## v31.1.0 BitcoinII-specific consensus anchors

Mainnet `v31.1.0` activates these BitcoinII-specific rules at height `57750`:

- ShockWave difficulty adjustment;
- consensus-level data restrictions;
- BC2 replay protection.

The replay-protection fork/domain id is `0x01324342`.

## BitcoinII data restrictions

The current v31 data-restriction review traces the post-activation rules into `src/consensus/bitcoinII_data.h` and validation paths.

The reviewed rules cover:

- OP_RETURN output count;
- OP_RETURN size;
- actual `OP_13` opcodes in OP_RETURN scripts;
- bare multisig outputs;
- Taproot annex data;
- oversized script-path tapscripts;
- semantic Ordinals inscription envelopes.

These are consensus checks after activation, not merely relay-policy preferences. MoreBC2 should not broaden them into a claim that every conceivable arbitrary-data protocol is impossible.

## Replay protection

Replay protection is implemented as a signature-hash domain, not an address-format change and not an extra transaction field.

Below activation, the selected fork id is zero and historical BitcoinII digest behavior is retained. At and above activation, the configured BC2 domain participates in signature hashing.

The domain is threaded through:

- mempool validation for the next block height;
- block/script validation for the relevant block height;
- script-validation cache separation;
- raw-transaction signing;
- wallet signing;
- PSBT precomputation/finalization;
- external-signer safety handling.

The mempool is cleared immediately before activation so transactions accepted only under the legacy domain are not carried across the boundary.

## UTXO and block consensus

BitcoinII continues to use a Bitcoin-style UTXO model.

When a block is connected, spent outputs are consumed and new outputs are added. Undo data permits those changes to be reversed during a reorganization before a replacement branch is connected.

Current block validation therefore combines inherited UTXO/transaction structure with current BitcoinII-specific activation rules.

## Fork-aware header synchronization

The current v31 header-sync review narrows the release-note phrase `fork-aware header synchronization` to a concrete source-backed path.

For ShockWave-era branches, the synchronization logic maintains branch-specific recent history so candidate `nBits` can be checked with production `GetNextWorkRequired()` using the candidate branch's own target and median-time-past context.

Header synchronization does not choose the active chain. Normal validation and accumulated-work selection still perform that role.

## Consensus vs policy vs service policy

These should remain separate:

- **Consensus:** whether a block/transaction is valid.
- **Mempool policy:** whether a node will currently accept/relay an unconfirmed transaction.
- **Wallet policy:** how a wallet constructs, funds, signs, or displays transactions.
- **Exchange/service policy:** confirmations, chainwork thresholds, value limits, operational review, and other risk controls.

MoreBC2's current exchange guidance uses a provisional 50-confirmation baseline for ordinary deposits because that threshold is observed in active exchange configurations. That is an operational recommendation, **not** a consensus rule or proof of irreversible finality.

## Runtime evidence boundary

The September 11 Windows mainnet test exercised current `v31.1.0` startup, peer/header acquisition, partial block validation, RPC, restart, and shutdown. It did not complete initial block download or independently cross the `57750` activation boundary during the test.

The separate September 11 disposable regtest wallet test exercised an ordinary v31 PSBT/signing/mempool flow. Regtest leaves replay protection disabled as shipped, so that test does not runtime-prove the mainnet replay-domain switch.

## What remains open

- Controlled pre/post-activation replay-protection digest vectors.
- Controlled data-restriction activation-boundary vectors.
- Live or synthetic competing-branch header-sync scenarios.
- Deep reorganization simulation across current v31 behavior.
- Full mandatory-versus-policy script-flag classification for the current release.
- Source-build and full test-suite reproduction.

## Related pages

- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)
- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` release-pinned ShockWave, replay-protection, data-restriction, header-sync, validation, wallet/PSBT, and chain-selection reviews plus bounded September runtime records  
**Notes:** Current consensus framing is synchronized to v31. Runtime activation-boundary vectors, deep reorg tests, complete script-flag classification, and source-build/test-suite reproduction remain open.
