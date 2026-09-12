# BitcoinII Consensus Overview

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page summarizes current BitcoinII consensus behavior checked against BitcoinII Core `v31.1.0` source and MoreBC2's current architecture/verification records.

It is intentionally conservative and is not a complete consensus specification.

## Current v31.1.0 consensus changes

The current release introduces or updates four BitcoinII-specific areas that materially affect present-day behavior:

- ShockWave per-block difficulty adjustment;
- consensus-level data restrictions aimed at Ordinals/inscriptions/Runes-style data use;
- BC2 transaction replay protection;
- fork-aware header synchronization.

Mainnet chain parameters activate the principal rules at height `57750`:

- `nDataRestrictionsHeight = 57750`
- `nShockWaveActivationHeight = 57750`
- `nReplayProtectionHeight = 57750`
- `nReplayProtectionForkId = 0x01324342`

## Block timing and ShockWave

BitcoinII mainnet targets 10-minute block spacing.

The inherited 14-day / 2016-block retarget parameters remain in chain parameters for historical/pre-activation behavior, but they are **not** the current post-`57750` mainnet difficulty schedule.

Current `v31.1.0` ShockWave source uses per-block next-work calculation with:

- a 25-block sample / 24 timing intervals;
- median-time-past based timing context;
- a shorter six-interval fast-response controller;
- final per-block adjustment bounds of up to 4x harder or 4x easier;
- newest-block timing safeguards;
- raw/MTP consistency checks;
- emergency stall recovery after prolonged delay;
- deterministic candidate-time handling.

Because candidate time participates in current next-work calculation, mining/template code must not assume `nBits` remains fixed until a 2016-block boundary.

See [ShockWave v31](../developers/source-atlas/shockwave-v31.md).

## Proof of work and chain selection

`CheckProofOfWork()` continues to validate that a block hash satisfies the target encoded by `nBits`, including target-range/overflow checks.

The block-header hashing path remains double-SHA256.

ShockWave changes the required work for each next block. It does **not** replace best-chain selection: valid usable candidate chains are still compared by accumulated chain work.

That distinction matters for reorg/finality language. Faster difficulty response is not deterministic finality.

## Replay protection

Mainnet replay protection begins at height `57750` with fork/domain id `0x01324342`.

The current source trace establishes that the domain is part of signature-hash calculation rather than a normal serialized transaction field or address-format change.

The domain is threaded through:

- wallet signing;
- PSBT precomputation/finalization;
- raw-transaction signing;
- mempool validation using the **next block height**;
- block/script validation using the relevant block height;
- script-validation cache separation;
- external-signer safety handling.

Immediately before activation, the mempool is cleared so legacy-domain transactions are not simply carried across the signing-domain boundary.

This is especially important because BitcoinII retains Bitcoin-like address encodings. Address similarity must not be used to infer signing compatibility.

See [Replay protection v31](../developers/source-atlas/replay-protection-v31.md).

## Consensus-level data restrictions

The current v31 source review traces BitcoinII-specific post-activation restrictions through consensus/validation paths.

Reviewed restrictions cover:

- OP_RETURN output count and size;
- actual `OP_13` opcodes in OP_RETURN scripts;
- bare multisig outputs;
- Taproot annex data;
- oversized script-path tapscripts;
- semantic Ordinals inscription envelopes.

These are consensus checks after activation, not merely local relay policy. MoreBC2 should not broaden that into a claim that every conceivable arbitrary-data technique is impossible.

See [Consensus data restrictions v31](../developers/source-atlas/data-restrictions-v31.md).

## Fork-aware header synchronization

For ShockWave-era competing branches, header synchronization needs the candidate branch's own recent target and median-time-past context when checking next-work requirements.

The current v31 source review traces a branch-specific synthetic-history path that evaluates candidate difficulty with production next-work logic.

Header synchronization does **not** itself select the active chain. Normal validation and accumulated-work chain selection still perform that role.

See [Fork-aware header synchronization v31](../developers/source-atlas/headers-sync-v31.md).

## Monetary rules

Current source defines:

- formatted currency unit: `BC2`;
- atom/minimum formatted unit label: `sat2`;
- `COIN = 100000000`;
- `MAX_MONEY = 21000000 * COIN`;
- subsidy halving interval: `210000` blocks.

The halving interval is source-confirmed. MoreBC2 should still distinguish that from any time estimate for a future halving, which depends on actual block production.

## Consensus vs mempool policy vs service policy

These are different layers:

- **Consensus:** whether a block/transaction is valid.
- **Mempool policy:** whether a node accepts/relays an unconfirmed transaction under current local policy.
- **Wallet behavior:** how software constructs, funds, signs, or displays transactions.
- **Exchange/service policy:** confirmations, chainwork thresholds, withdrawal/deposit limits, and operational review.

MoreBC2's provisional 50-confirmation baseline for ordinary exchange deposits is an operational recommendation informed by active exchange settings. It is **not** a BitcoinII consensus rule and does not create cryptographic finality.

## Runtime evidence boundary

MoreBC2 now has meaningful `v31.1.0` runtime evidence:

- isolated Windows mainnet startup, outbound peers, header/block synchronization, RPC, restart, and disposable-wallet handling;
- a complete isolated regtest PSBT/signing/finalization flow through `testmempoolaccept` and local-only `sendrawtransaction`.

However:

- the mainnet test did not intentionally exercise the `57750` activation boundary;
- the regtest parameters leave replay protection disabled as shipped;
- no controlled competing-branch/reorg or data-restriction activation vector has yet been reproduced.

Accordingly, the v31 activation mechanisms above remain primarily release-pinned source evidence, with bounded runtime support for surrounding node/wallet paths.

## Related pages

- [Network specifications](network-specifications.md)
- [Architecture consensus model](../architecture/consensus-model.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Data restrictions v31](../developers/source-atlas/data-restrictions-v31.md)
- [Header sync v31](../developers/source-atlas/headers-sync-v31.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` chain parameters, ShockWave, replay-protection, data-restriction, header-sync, validation, wallet/PSBT, and chain-selection reviews plus bounded September runtime evidence  
**Notes:** The principal current v31 consensus changes are mapped. Controlled activation-boundary vectors, deep reorg simulation, complete script-flag classification, full source-build reproduction, and full test-suite execution remain open.
