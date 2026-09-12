# Mempool and transaction broadcast RPC

**Category:** Documentation
**Status:** Source-reviewed / Runtime-tested partial
**Last reviewed:** 2026-09-12

## Summary

This page covers mempool and transaction RPC behavior centered on `src/rpc/mempool.cpp`.

Current `v31.1.0` evidence now includes a bounded local runtime test of `testmempoolaccept`, `sendrawtransaction`, `getmempoolentry`, and `getmempoolinfo`. Public-network broadcast remains unverified.

## Source-reviewed command groups

Raw-transaction category:

- `sendrawtransaction`
- `testmempoolaccept`
- `submitpackage`

Blockchain/mempool category:

- `getmempoolancestors`
- `getmempooldescendants`
- `getmempoolentry`
- `gettxspendingprevout`
- `getmempoolinfo`
- `getrawmempool`
- `importmempool`
- `savemempool`

Hidden/experimental source also includes orphan-transaction inspection.

## `testmempoolaccept`

Source review shows this as a dry-run acceptance path that applies transaction/package checks without inserting the transaction into the mempool.

In the September 11 isolated v31 regtest test, `testmempoolaccept` returned `allowed = true` for the fully signed disposable transaction, with the expected vsize and fee information.

## `sendrawtransaction`

Source review shows `sendrawtransaction` as a live local-submission/relay RPC, not a dry run.

In the September 11 test, it was called only against a zero-peer local regtest node. It inserted the disposable transaction into that node's local mempool and returned the expected txid. Because the node had no peers, this was **not** a public-network relay/broadcast test.

Do not cite this test as proof that a public BC2 broadcast endpoint or public peer relay path works.

## Mempool inspection runtime evidence

The same isolated test used:

- `getmempoolentry` to confirm the submitted transaction was present;
- `getmempoolinfo` to confirm the resulting local mempool state.

The earlier September v31 node/RPC validation also exercised `getmempoolinfo` in its bounded mainnet-node environment.

## v31 replay-protection boundary

Mempool acceptance is replay-domain-sensitive in v31. Release-pinned source validates signatures using the domain required for the next block and separates validation-cache results by fork id.

The regtest runtime test did not exercise the mainnet activation switch because regtest leaves replay protection disabled as shipped.

See [MemPoolAccept](mempool-accept.md) and [Replay protection](replay-protection-v31.md).

## Still source-only or unverified

MoreBC2 has not yet published direct runtime coverage for:

- `submitpackage`;
- ancestor/descendant RPC edge cases;
- `gettxspendingprevout`;
- mempool import/save workflows;
- orphan inspection;
- activation-boundary mempool clearing;
- public-network transaction relay/broadcast.

## Related pages

- [MemPoolAccept](mempool-accept.md)
- [Replay protection v31](replay-protection-v31.md)
- [RPC overview](../rpc-overview.md)
- [API documentation](../../api/README.md)
- [v31 PSBT runtime record](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Sources

Current source baseline: BitcoinII Core `v31.1.0`, including `src/rpc/mempool.cpp` and related validation/mempool paths.

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` plus September 11 node/RPC and isolated PSBT/mempool runtime records  
**Notes:** Local acceptance/submission and selected inspection RPCs are runtime-tested in bounded environments. Public broadcast, package behavior, and replay activation-boundary behavior remain unverified.