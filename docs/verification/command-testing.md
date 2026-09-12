# Command testing status

**Category:** Verification  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This page tracks which BitcoinII Core command/RPC examples MoreBC2 has actually exercised and which remain source-observed or untested.

The strongest current evidence is now the September 11 `v31.1.0` Windows mainnet node/RPC record plus the separate isolated zero-peer regtest wallet/PSBT/mempool record. Older `v29.1.0` command tests remain historical evidence for that release.

A command appearing in source or help text is **not** the same as a locally tested command. A command tested on regtest is not automatically proof of mainnet/public-network behavior.

## Status labels

| Label | Meaning |
|---|---|
| Source-observed | Present in reviewed source/help but not executed in the stated environment. |
| Locally tested | Executed in a dated, version-scoped test record. |
| Context-verified | Locally tested and suitable to document for the exact stated context. |
| Needs recheck | Earlier evidence exists but a materially different release/environment now matters. |
| Advanced / do not copy blindly | State-changing, sensitive, or context-heavy command that should not appear as casual instructions. |

## Current `v31.1.0` Windows mainnet node/RPC evidence

Record: [Windows v31.1.0 node and RPC validation — 2026-09-11](windows-v31-node-rpc-validation-2026-09-11.md).

Environment:

- Windows 11 x86_64;
- BitcoinII Core `v31.1.0` Windows Qt artifact;
- fresh disposable mainnet data directory;
- Qt `server=1` mode;
- random-cookie JSON-RPC bound to loopback;
- operator-selected RPC port `28332` because `8332` was already in use by an unrelated process;
- no existing BitcoinII wallet/datadir opened or inspected.

There was no matching v31 CLI executable in the tested artifact, so RPCs were sent directly over loopback HTTP JSON-RPC using the disposable cookie.

### Node / network commands executed

| RPC/action | Status | Evidence boundary |
|---|---|---|
| `getnetworkinfo` | Locally tested v31 mainnet | Confirmed version `310100`, subversion `/BitcoinII:31.1.0/`, protocol `70016`, network-active state and outbound peers. |
| `getblockchaininfo` | Locally tested v31 mainnet | Observed mainnet advancing IBD, current headers, `pruned=false`. |
| `getmempoolinfo` | Locally tested v31 mainnet | Mempool/status fields returned during IBD. |
| `getpeerinfo` | Locally tested v31 mainnet | Public record intentionally summarizes/redacts peer addresses. |
| `getnettotals` | Locally tested v31 mainnet | Read-only traffic summary returned. |
| `uptime` | Locally tested v31 mainnet | Returned process uptime. |
| `getchaintips` | Locally tested v31 mainnet | Showed headers-only tip and active validated tip during IBD. |
| `getindexinfo` | Locally tested v31 mainnet | Returned `{}`, establishing no optional indexes enabled in this test. |
| `listwallets` | Locally tested v31 mainnet | Empty before creation; empty again after restart until explicit load. |
| `listwalletdir` | Locally tested v31 mainnet | Empty before creation; showed only the disposable wallet after restart. |
| `createwallet` | Locally tested v31 mainnet | Created only `morebc2-disposable-v31`; zero transactions. |
| wallet-scoped `getwalletinfo` | Locally tested v31 mainnet | SQLite descriptor wallet; zero transactions; not scanning. |
| `loadwallet` | Locally tested v31 mainnet | Explicit reload after restart succeeded; wallet remained zero-transaction. |
| `stop` | Locally tested v31 mainnet | Clean shutdown twice; cookie/listener removed. |
| restart with same disposable datadir | Locally tested v31 mainnet | Chain state retained; outbound reconnection resumed. |

The mainnet test intentionally **did not** call address-generation, signing, transaction, PSBT, send, import, rescan, backup, encryption, pruning-mutation, peer-mutation, or mining-template RPCs.

## Current `v31.1.0` isolated regtest wallet/PSBT evidence

Record: [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](windows-v31-psbt-replay-validation-2026-09-11.md).

Environment:

- fresh isolated regtest state;
- zero peers;
- fresh disposable wallet/test funds only;
- no existing user wallet, keys, funds, datadir, imports, or public-network broadcast.

### Commands executed

| RPC | Status | Evidence boundary |
|---|---|---|
| `createwallet` | Locally tested v31 regtest | Disposable wallet only. |
| `getwalletinfo` | Locally tested v31 regtest | Verified disposable wallet state. |
| `getnewaddress` | Locally tested v31 regtest | Disposable wallet address only. |
| `generatetoaddress` | Locally tested v31 regtest | Generated isolated regtest blocks/funds. This is **not** mainnet mining/pool evidence. |
| `getbalances` | Locally tested v31 regtest | Confirmed disposable balance state. |
| `walletcreatefundedpsbt` | Locally tested v31 regtest | Constructed funded PSBT. |
| `decodepsbt` | Locally tested v31 regtest | Inspected PSBT structure. |
| `walletprocesspsbt` | Locally tested v31 regtest | Signed/processed with disposable wallet. |
| `finalizepsbt` | Locally tested v31 regtest | Produced final transaction. |
| `decoderawtransaction` | Locally tested v31 regtest | Decoded final transaction. |
| `testmempoolaccept` | Locally tested v31 regtest | Returned allowed for the disposable transaction. |
| `sendrawtransaction` | Locally tested v31 regtest | Submitted only to a zero-peer local regtest mempool. **Not public broadcast evidence.** |
| `getmempoolentry` | Locally tested v31 regtest | Confirmed local mempool entry. |
| `getmempoolinfo` | Locally tested v31 regtest | Confirmed local mempool state. |

The successful transaction was local-only. No peer propagation occurred because the test node had zero peers.

Regtest also leaves mainnet replay activation disabled as shipped, so ordinary signing success here does not independently exercise the mainnet `0x01324342` replay domain.

## Current mining/template command status

| RPC | Current status | Notes |
|---|---|---|
| `generatetoaddress` | Locally tested v31 regtest | Used only for disposable regtest funding. |
| `getmininginfo` | Source-observed | Not executed in the current v31 records. |
| `getnetworkhashps` | Source-observed | Not executed in the current v31 records. |
| `getblocktemplate` | Source-observed | Current ShockWave-aware source path reviewed; runtime command still untested. |
| `submitblock` | Advanced / source-observed | Keep out of ordinary instructions until a dedicated safe workflow exists. |
| `submitheader` | Advanced / source-observed | Same boundary as `submitblock`. |

Core mining RPC is separate from public pool Stratum. MoreBC2 has not yet performed a current BC2 Stratum subscribe/authorize/share test.

## Current wallet/recovery/security command gaps

These remain useful candidates for **disposable-only** testing where needed:

| RPC/workflow | Current status | Notes |
|---|---|---|
| `backupwallet` | Source-observed | No end-to-end current v31 backup/restore record. |
| `restorewallet` | Source-observed | Needs disposable backup fixture. |
| `walletpassphrase` / encryption workflow | Source-observed | Sensitive; only disposable encrypted wallet. |
| `walletlock` | Source-observed | Same disposable-only boundary. |
| `rescanblockchain` | Source-observed | Needs explicit chain/wallet fixture and timing notes. |
| `listtransactions` / `gettransaction` | Source-observed for broader history behavior | No dedicated current wallet-history runtime fixture recorded. |
| external/hardware signer workflow | Source-reviewed only | Requires BC2 replay-domain support; not runtime qualified. |

## Current network/operator command gaps

| RPC | Current status | Notes |
|---|---|---|
| `getnodeaddresses` | Source-observed | Raw output can expose network addresses. |
| `getaddrmaninfo` | Source-observed | Operator/developer-oriented. |
| `ping` | Source-observed | Low risk but changes transient peer state. |
| `setnetworkactive` | Advanced | Alters node network state. |
| `addnode` / `disconnectnode` | Advanced | Alters peer state. |
| `setban` / `clearbanned` | Advanced | Alters ban state. |
| pruning mutation RPC/workflow | Untested current v31 | Current mainnet test observed pruning disabled only. |

These should not be added to beginner copy/paste docs merely because they exist.

## Raw transaction / service lookup gaps

| RPC | Current status | Notes |
|---|---|---|
| `getrawtransaction` | Source-observed | Historical lookup semantics depend on mempool/blockhash/`txindex`; no current service-style runtime example recorded. |
| `decodescript` | Source-observed | Harmless fixture could be used later. |
| `analyzepsbt` | Source-observed | PSBT workflow exists, but this exact command was not part of the recorded current sequence. |
| `createpsbt` | Source-observed | Current test used `walletcreatefundedpsbt`. |
| `signrawtransactionwithwallet` | Source-reviewed | Source path is replay-domain aware; no dedicated current runtime equivalence test. |
| `signrawtransactionwithkey` | Advanced | Explicit private-key material; avoid ordinary docs. |
| `getrawmempool true` | Source-observed | No dedicated current public/mainnet record. |
| `submitpackage` | Advanced / source-observed | Keep out of ordinary instructions until needed/tested. |

## Historical v29 evidence

The earlier Windows `v29.1.0` records remain valid for their exact environments, including the July read-only RPC smoke test and August node-operator/peer-discovery work.

Do **not** use the historical configured `8337` or test override `28337` as current mainnet RPC defaults. Current v31 source default is `8332`; current runtime used the operator-selected test override `28332` because `8332` was occupied.

Historical records should remain linked for provenance, not silently rewritten into v31 evidence.

## Publishing rule

A command example should state or link:

- BitcoinII release/ref;
- network;
- platform/environment;
- wallet/node state where relevant;
- whether it was source-observed or actually executed;
- whether the action is read-only, state-changing, sensitive, or local-only.

Examples that move funds, expose keys, alter peers, mutate chain/index state, or submit blocks need stronger context than ordinary status commands.

## Next useful command tests

The highest-value remaining command-level tests are:

1. `getmininginfo`, `getnetworkhashps`, and a safe `getblocktemplate` current-release record;
2. a disposable wallet backup/restore workflow;
3. a disposable encrypted-wallet lock/unlock workflow;
4. `signrawtransactionwithwallet` equivalence against the tested wallet/PSBT path;
5. a controlled `getrawtransaction` lookup matrix covering mempool/blockhash/`txindex` assumptions;
6. optional index/pruning operator workflows if production integration guidance needs them.

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** September 11 v31 node/RPC and PSBT runtime records, current Developers/Source Atlas mining/wallet/RPC reviews, and preserved historical v29 command records  
**Notes:** Current command classification now reflects actual v31 execution. Remaining Partial status is command-specific; it is not accurate to describe all wallet/PSBT/mempool commands as untested anymore.
