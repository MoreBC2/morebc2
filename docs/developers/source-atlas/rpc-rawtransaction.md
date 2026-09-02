# Raw transaction RPC

**Category:** Documentation
**Status:** Source-reviewed partial
**Last reviewed:** 2026-09-02

## Summary

This page covers node-level raw transaction and PSBT RPC behavior centered on `src/rpc/rawtransaction.cpp`.

The command inventory remains broadly Bitcoin-style, but BitcoinII Core `v31.1.0` adds a material BitcoinII-specific signing rule: transaction signing/finalization paths derive the replay-protection signature-hash domain for the **next block**.

This is not a tested command guide.

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

`src/rpc/rawtransaction.cpp` defines `NextBlockSighashForkId`.

The helper locks chain state, reads the active-chain height, and asks consensus for:

```text
SighashForkId(active_height + 1)
```

That choice matters at the activation boundary. A transaction signed while the current tip is immediately below replay-protection activation must already use the domain required by the block in which it could next be mined.

Mainnet uses fork id `0x01324342` from height `57750`.

## Signing and PSBT implications

The selected fork id is passed into relevant signing/PSBT helpers rather than relying on generic Bitcoin sighashes.

Reviewed v31 propagation includes:

- explicit-key raw transaction signing;
- raw-transaction signing helpers in `rpc/rawtransaction_util.cpp`;
- PSBT precomputation and finalization;
- PSBT analysis paths that accept the replay domain;
- signature creation/checking through the common signing/interpreter stack.

A third-party service can therefore support Bitcoin raw-transaction/PSBT formats while still being incompatible with post-activation BitcoinII if it does not implement the BC2 signature domain.

## Read-only versus signing-sensitive commands

The replay-domain change does not make ordinary transaction decoding or lookup inherently BC2-specific.

The material compatibility boundary is in commands/workflows that:

- create signatures;
- verify signatures;
- finalize/extract signed PSBTs;
- analyze signing completeness using BC2 signature semantics.

## Existing behavior that remains useful

The earlier MoreBC2 descriptions remain structurally useful for:

- raw transaction construction;
- transaction/script decoding;
- transaction lookup and txindex limitations;
- combining partially signed raw transactions;
- PSBT create/decode/combine/join/update workflows;
- descriptor-assisted PSBT processing.

## Service guidance

Do not assume Bitcoin library compatibility from address/script compatibility alone.

Services that sign withdrawals should either use current BitcoinII Core RPC/wallet paths or independently implement and test BC2's replay-domain rules.

## Runtime status

MoreBC2 has not yet executed v31 raw-transaction signing vectors.

Still needed:

- deterministic pre/post-fork signature vectors;
- raw-RPC versus wallet-signing equivalence tests;
- PSBT finalization tests on a disposable environment;
- third-party raw transaction library compatibility review.

## Related pages

- [Replay protection v31](replay-protection-v31.md)
- [Wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [v31 wallet/mempool/mining regression audit](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [RPC overview](../rpc-overview.md)

## Sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/rpc/rawtransaction.cpp`
- `src/rpc/rawtransaction_util.cpp`
- `src/psbt.cpp`
- `src/node/psbt.cpp`
- `src/script/sign.cpp`
- `src/script/interpreter.cpp`
- `src/consensus/params.h`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed partial
**Primary sources checked:** BitcoinII Core `v31.1.0`
**Notes:** Next-block replay-domain selection and propagation are source-backed. Runtime signing examples remain unverified by MoreBC2.