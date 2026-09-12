# Bitcoin Core RPC compatibility

**Category:** Compatibility
**Status:** Reviewed / Locally tested partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII Core exposes a substantial Bitcoin Core-style JSON-RPC interface, but MoreBC2 has not established complete Bitcoin Core RPC compatibility.

Current compatibility evidence is stronger than the earlier v29 read-only record because BitcoinII Core `v31.1.0` has now been exercised in isolated Windows mainnet and regtest environments.

Canonical evidence:

- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [RPC overview](../developers/rpc-overview.md)
- [Read-only examples](../api/read-only-examples.md)
- [RPC configuration](../configuration/rpc-configuration.md)

## Current v31.1.0 node/RPC coverage

The 2026-09-11 Windows mainnet validation exercised BitcoinII Core `v31.1.0` with random-cookie authentication over loopback RPC and a newly created disposable data directory.

Observed calls included:

- `getnetworkinfo`
- `getblockchaininfo`
- `getmempoolinfo`
- `getpeerinfo`
- `getnettotals`
- `uptime`
- `getchaintips`
- `getindexinfo`
- `listwallets`
- `listwalletdir`
- `createwallet`
- `getwalletinfo`
- `loadwallet`
- `stop`

The runtime reported version `310100`, subversion `/BitcoinII:31.1.0/`, and protocol version `70016`.

The test intentionally used `127.0.0.1:28332` because local port `8332` was already occupied by unrelated software. That test port is not a BitcoinII network default.

## Current v31.1.0 PSBT/raw-transaction coverage

A separate isolated regtest validation exercised a deeper wallet and raw-transaction workflow with zero peers:

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

The PSBT was funded, signed, finalized, accepted by `testmempoolaccept`, and submitted only to the isolated local regtest mempool. No public-network transaction broadcast was performed.

## Historical v29 evidence

The earlier 2026-07-10 Windows `v29.1.0` record remains valid as historical evidence for the nine read-only commands it tested. It should not be used as the primary current compatibility statement when v31 coverage exists.

## Source-reviewed scope

MoreBC2 also has release-pinned source review covering blockchain, network, mining, raw-transaction, mempool, wallet, PSBT, and related RPC paths.

Source review does not prove runtime equivalence with Bitcoin Core and does not replace workflow testing.

## Compatibility boundaries

Do not claim:

- complete Bitcoin Core RPC compatibility;
- identical argument validation, error codes, response schemas, or defaults for every method;
- cross-platform equivalence;
- production-wallet or custody safety from isolated tests;
- successful public-network transaction broadcast;
- external-signer compatibility after replay-protection activation;
- that an operator should use the historical `8337` RPC port or the test-only `28332` port as a default.

Safe wording:

> BitcoinII Core v31.1.0 exposes Bitcoin Core-style JSON-RPC, with current MoreBC2 runtime coverage spanning node, network, blockchain, mempool, wallet, PSBT, raw-transaction, and shutdown workflows in bounded isolated tests. Full Bitcoin Core RPC equivalence has not been established.

## Verification

**Status:** Reviewed / Locally tested partial  
**Primary sources checked:** 2026-09-11 v31.1.0 Windows node/RPC and PSBT validation records plus release-pinned RPC source review  
**Notes:** Compatibility is established only for the documented calls and test conditions, not the entire Bitcoin Core RPC surface.
