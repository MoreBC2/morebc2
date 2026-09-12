# `MemPoolAccept` in `src/validation.cpp`

**Category:** Documentation
**Status:** Source-reviewed / Runtime-tested partial
**Last reviewed:** 2026-09-12

## Purpose

`MemPoolAccept` is the BitcoinII Core path for deciding whether transactions may enter the mempool.

Most acceptance architecture remains inherited Bitcoin-style policy/consensus plumbing. BitcoinII Core `v31.1.0` adds replay-protection behavior that materially affects signature validation at the next-block boundary.

## Main flow

The reviewed high-level path remains:

```text
AcceptSingleTransaction
  -> PreChecks
  -> ReplacementChecks, when needed
  -> PolicyScriptChecks
  -> ConsensusScriptChecks
  -> Finalize, unless test-accept
  -> TransactionAddedToMempool notification
```

Package handling builds on the related multiple/package acceptance paths and ancestor/descendant and package-feerate checks.

## v31 next-block replay domain

During mempool acceptance, v31 sets the precomputed transaction's sighash fork id from the consensus domain for `active_chain_height + 1`.

That means a transaction submitted immediately before activation must already be valid under the signature domain required by the block in which it could next be mined.

Mainnet replay protection activates at height `57750` with fork/domain id `0x01324342`.

## Activation-boundary mempool clear

Release-pinned source also clears legacy-domain mempool state at the activation transition so transactions accepted under the old signature domain are not carried into the new domain.

For historical/operator interpretation, a mempool reset at that boundary is intentional protocol behavior, not by itself evidence of corruption or node failure.

## Validation-cache separation

The v31 script-validation cache key incorporates the sighash fork id. A signature-valid result from one replay domain must not be reused as proof of validity under another domain.

## Existing acceptance behavior that remains structurally useful

Earlier MoreBC2 review remains broadly useful for:

- context-free transaction checks;
- standardness policy;
- finality and sequence locks;
- coin/input lookup;
- fee/minimum-relay policy;
- ancestor/descendant limits;
- replacement policy;
- package validation;
- policy versus consensus script checks;
- mempool insertion/trimming;
- reorg re-addition through normal acceptance paths.

## Runtime evidence — 2026-09-11

The isolated v31 regtest PSBT test produced a fully signed disposable transaction and exercised:

- `testmempoolaccept`, which returned `allowed = true`;
- `sendrawtransaction`, which inserted the transaction into the zero-peer local regtest mempool;
- `getmempoolentry`, which confirmed the entry;
- `getmempoolinfo`, which showed the local mempool state.

This is direct evidence that the ordinary local acceptance path worked for the documented v31 transaction/environment.

It is **not** an activation-boundary replay-domain test. Regtest leaves replay protection disabled as shipped, and MoreBC2 did not alter consensus parameters to force the switch.

See [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## Remaining activation tests

Useful follow-up work remains:

- legacy-domain signature submitted immediately before activation;
- post-fork-domain signature submitted before activation for the activation block;
- mempool contents across activation;
- validation-cache separation across domain changes;
- raw-RPC and wallet-produced signatures compared across the same boundary.

## Service implication

A service that pre-validates withdrawals using Bitcoin-derived signature logic must use the same BC2 replay-domain context as the node. A cached “signature valid” result cannot safely be treated as height/domain-independent across activation.

## Related pages

- [Replay protection v31](replay-protection-v31.md)
- [Mempool flow](../../architecture/mempool-flow.md)
- [Mempool source](txmempool.md)
- [Validation.cpp](validation-cpp.md)
- [v31 PSBT runtime record](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Sources

Pinned BitcoinII Core `v31.1.0` paths include `src/validation.cpp`, consensus params, script interpreter, node transaction, and txmempool files.

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` plus the 2026-09-11 isolated mempool acceptance record  
**Notes:** Next-block fork-domain validation, activation clearing, and cache separation are source-backed. Ordinary local mempool acceptance was runtime-tested; the replay activation boundary remains runtime-unverified.