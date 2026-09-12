# RPC overview

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII Core exposes Bitcoin-style JSON-RPC for node, chain, network, mempool, wallet, mining, raw-transaction, and PSBT workflows.

MoreBC2 now has direct BitcoinII Core `v31.1.0` runtime evidence for a useful read-only node/RPC subset and an isolated disposable-wallet PSBT lifecycle. That supersedes the older posture that only the July `v29.1.0` read-only smoke test had been exercised.

Canonical current runtime records:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [API read-only examples](../api/read-only-examples.md)

Historical v29 tests remain useful only as version-scoped evidence.

## RPC configuration and ports

Current chain-parameter RPC defaults are:

| Network | RPC port |
|---|---:|
| mainnet | `8332` |
| testnet3 | `18332` |
| signet | `38332` |
| regtest | `18443` |
| testnet4 | `48332` |

A historical MoreBC2 v29 mainnet test used configured loopback RPC on `8337`; that was not a universal BitcoinII mainnet default.

The September 11 v31 tests intentionally selected alternate loopback-only ports because local port occupancy/isolation mattered to the test. Those test ports are not network defaults either.

BitcoinII Qt requires RPC/server mode to be enabled when used as an RPC server. Do not expose RPC to untrusted networks.

## Current v31 runtime-tested node/RPC subset

The September 11 Windows v31 node/RPC validation directly exercised harmless node/status calls including:

- `getnetworkinfo`
- `getblockchaininfo`
- `getmempoolinfo`
- `getpeerinfo`
- `getnettotals`
- `uptime`
- `getchaintips`
- `getindexinfo`

The test used a fresh disposable data directory, loopback-only RPC with random-cookie authentication, and did not touch an existing wallet or data directory. It also confirmed clean shutdown behavior under the documented test conditions.

This is platform- and environment-bounded evidence, not proof that every RPC behaves identically on every platform or node configuration.

## Current v31 wallet and PSBT runtime subset

A separate isolated regtest test exercised a newly created disposable descriptor wallet and the following transaction/PSBT path:

- `listwallets`
- `listwalletdir`
- `createwallet`
- `getwalletinfo`
- `getnewaddress`
- `generatetoaddress`
- `getbalances`
- `walletcreatefundedpsbt`
- `decodepsbt`
- `walletprocesspsbt`
- `finalizepsbt`
- `decoderawtransaction`
- `testmempoolaccept`
- `sendrawtransaction`
- `getmempoolentry`
- `getmempoolinfo`

`sendrawtransaction` was used only against the zero-peer isolated regtest node and placed the transaction in the local mempool. It was **not** a public-network broadcast test.

No existing user wallet was opened, copied, rescanned, imported, unlocked, inspected, or spent from.

## v31 replay-protection boundary

Mainnet `v31.1.0` activates BC2 replay protection at height `57750` with fork/domain id `0x01324342`.

Release-pinned source shows that wallet, PSBT, raw-transaction signing/finalization, mempool validation, block validation, and signature-hash paths carry the BC2 replay domain. External signers that cannot represent this domain are not safely assumed compatible.

The isolated regtest PSBT lifecycle did not runtime-exercise the mainnet activation switch because regtest leaves replay protection disabled as shipped. Treat replay-domain activation as source-confirmed, not regtest-runtime-confirmed.

See [Replay protection source atlas](source-atlas/replay-protection-v31.md).

## Source-reviewed RPC groups

MoreBC2 maintains source maps for:

- [Mining RPC](source-atlas/rpc-mining.md)
- [Blockchain RPC](source-atlas/rpc-blockchain.md)
- [Network RPC](source-atlas/rpc-network.md)
- [Raw transaction RPC](source-atlas/rpc-rawtransaction.md)
- [Mempool and broadcast RPC](source-atlas/rpc-mempool.md)
- [Wallet RPC](source-atlas/wallet-rpc.md)

These pages establish source-observed command surfaces and implementation structure. A source-reviewed command is not automatically a locally tested command.

## Important service-facing RPCs

Current source review confirms the presence of integration-relevant methods including:

- `getrawtransaction`
- `sendrawtransaction`
- `testmempoolaccept`
- `signrawtransactionwithwallet`
- `walletcreatefundedpsbt`
- `walletprocesspsbt`
- `finalizepsbt`

Whether a service should use a particular method depends on its custody model, indexing configuration, pruning state, replay-protection handling, and operational controls.

## Index and pruning caveats

Current source/runtime evidence keeps these boundaries important:

- `txindex` is not enabled by default;
- pruning is not enabled by default;
- pruning and transaction-index choices affect historical lookup/service workflows;
- wallet rescans/imports can depend on local block availability;
- service integrations should test the exact node/index/pruning configuration they intend to operate.

## Safe interpretation

Use this wording when summarizing current RPC evidence:

> BitcoinII Core v31.1.0 has current MoreBC2 runtime coverage for a bounded node/status RPC subset and an isolated disposable-wallet PSBT lifecycle. Additional RPCs are source-observed unless a dated test record says otherwise. Public transaction broadcast, external-signer compatibility, full-index service behavior, and cross-platform parity remain separate verification tasks.

## Related pages

- [API documentation](../api/README.md)
- [Bitcoin Core RPC compatibility](../compatibility/bitcoin-core-rpc.md)
- [Wallet compatibility](../compatibility/wallets.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Exchange integration](../exchange/README.md)
- [Command testing status](../verification/command-testing.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source plus September 11 Windows node/RPC and PSBT runtime records  
**Notes:** Current runtime evidence now replaces the old v29-only testing posture. Source-only commands remain labeled as such, and public broadcast/mainnet replay activation/external signing are not overstated.