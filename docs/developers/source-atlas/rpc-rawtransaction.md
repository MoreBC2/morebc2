# Raw transaction RPC

**Category:** Documentation
**Status:** Source-reviewed / Runtime-tested partial
**Last reviewed:** 2026-09-12

## Summary

This page covers node-level raw transaction and PSBT RPC behavior centered on `src/rpc/rawtransaction.cpp`.

The command inventory remains broadly Bitcoin-style, but BitcoinII Core `v31.1.0` adds a material signing rule: transaction signing/finalization paths derive the replay-protection signature-hash domain for the **next block**.

## Command surface

Reviewed commands include:

- `getrawtransaction`
- `createrawtransaction`
- `decoderawtransaction`
- `decodescript`
- `combinerawtransaction`
- `signrawtransactionwithkey`
- `decodepsbt`
- `combinepsbt`
- `finalizepsbt`
- `createpsbt`
- `converttopsbt`
- `utxoupdatepsbt`
- `descriptorprocesspsbt`
- `joinpsbts`
- `analyzepsbt`

Read-only lookup/decoding behavior remains structurally consistent with the earlier MoreBC2 review.

## v31 next-block sighash domain

`src/rpc/rawtransaction.cpp` defines a next-block fork-id helper that derives:

```text
SighashForkId(active_height + 1)
```

That matters at the activation boundary: a transaction intended for block `57750` must use the post-activation BC2 domain even when the current tip is still one block below activation.

Mainnet uses fork/domain id `0x01324342` from height `57750`.

The domain propagates through relevant raw-transaction signing and PSBT precompute/finalization/analysis paths. A third-party service can therefore understand Bitcoin transaction/PSBT serialization while still being signing-incompatible with post-activation BitcoinII.

## Read-only versus signing-sensitive behavior

Replay protection does not make ordinary decoding or lookup inherently signing-sensitive. The material compatibility boundary is in workflows that create or verify signatures, finalize/extract signed PSBTs, or analyze signing completeness using BC2 signature semantics.

## Runtime evidence — 2026-09-11

MoreBC2's isolated v31 regtest PSBT test directly exercised raw/PSBT helpers including:

- `decodepsbt`;
- `finalizepsbt`;
- `decoderawtransaction`;
- `testmempoolaccept`;
- local-only `sendrawtransaction`.

The PSBT was created and signed by a fresh disposable BitcoinII Core wallet, finalized successfully, decoded successfully, accepted by `testmempoolaccept`, and submitted only to a zero-peer local regtest mempool.

This establishes a working ordinary v31 raw-transaction/PSBT extraction and local-acceptance path under the documented environment. It is not a public broadcast test and does not runtime-exercise mainnet replay activation.

See [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## Remaining verification work

- deterministic pre/post-fork signature vectors;
- explicit-key raw signing across the replay boundary;
- raw-RPC versus wallet-signing digest equivalence tests;
- third-party raw transaction/PSBT library compatibility;
- public-network valid transaction broadcast.

## Service guidance

Do not infer signing compatibility from address/script/PSBT format compatibility alone. Services that sign withdrawals should use current BitcoinII Core signing paths or independently implement and test the BC2 replay-domain rules.

## Related pages

- [Replay protection v31](replay-protection-v31.md)
- [Wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [RPC overview](../rpc-overview.md)
- [Wallet compatibility](../../compatibility/wallets.md)
- [v31 PSBT runtime record](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Sources

Pinned BitcoinII Core `v31.1.0` paths include `src/rpc/rawtransaction.cpp`, `src/rpc/rawtransaction_util.cpp`, `src/psbt.cpp`, `src/node/psbt.cpp`, `src/script/sign.cpp`, and `src/script/interpreter.cpp`.

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` plus the 2026-09-11 isolated PSBT/raw-transaction runtime record  
**Notes:** Next-block replay-domain propagation is source-backed. Ordinary PSBT finalization/decoding/local acceptance was runtime-tested; activation-boundary signing, third-party signing, and public broadcast remain open.