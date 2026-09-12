# Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11

**Category:** Verification
**Status:** Directly observed PSBT runtime / Source-confirmed replay protection
**Test date:** 2026-09-11 (America/New_York)
**Scope:** Isolated BitcoinII Core v31.1.0 regtest PSBT lifecycle, local mempool submission, and release-pinned replay-protection trace

## Summary

BitcoinII Core `v31.1.0` completed a PSBT lifecycle on Windows using a newly created disposable regtest data directory and wallet. The wallet generated and matured local-only regtest funds, created a funded PSBT, signed it, finalized it into a valid transaction, decoded both the PSBT and transaction, passed `testmempoolaccept`, and submitted the transaction only to the isolated local regtest mempool. The node had zero peers and was launched with listening, automatic connections, and DNS seeding disabled.

The submitted transaction spent one disposable 50 BC2 regtest coinbase output, sent 1 BC2 to a new disposable destination, returned `48.99999859` BC2 as change, and paid `0.00000141` BC2 in fees. Its txid was `9c2c504586ee34af24861b24cf2b4c57ea5f2bf81fd31bcb7534f0a875af4ad2`. The node stopped cleanly; the RPC cookie was removed and no listener remained.

Replay protection is source-confirmed at mainnet height `57750` with fork/domain id `0x01324342`. The release's regtest parameters do not override the disabled defaults, so replay-domain activation cannot be meaningfully exercised on regtest as shipped. No consensus parameter or binary was modified to force activation. Runtime claims in this record therefore distinguish ordinary PSBT/raw-transaction behavior from the release-pinned source trace of mainnet replay protection.

## Environment and exact artifact

| Field | Observed value |
|---|---|
| Host | Windows 11, x86_64 |
| Network | Local BitcoinII regtest only |
| Executable | `<user>\Desktop\BitcoinII-v31.1-Win64-Qt\bitcoinII-qt.exe` |
| File metadata | `31.1.0` |
| Runtime identity | `getnetworkinfo.version = 310100`; `subversion = /BitcoinII:31.1.0/`; protocol `70016` |
| Executable size | `42,903,572` bytes |
| Executable SHA-256 | `8b918df903377565a9d7fa59d2d2dc087ed77155c858b2a0abcdee03f0423db5` |
| Source tag | `v31.1.0` |
| Source commit | `8daaf7b12e71d3646eed787f040bf2899a69dc1c` |
| Successful audit directory | `<user>\Documents\Codex\2026-09-11\referenced-chatgpt-conversation-this-is-an-2\work\bc2-v31-psbt-replay-validation-20260911-03` |
| Wallet | Newly created `morebc2-v31-psbt-disposable`; SQLite descriptor wallet |
| RPC | Random-cookie authentication on `127.0.0.1:29443` |

The executable hash matches the independently repeated v31.1 Windows artifact hash in the earlier node/RPC validation. This is byte-integrity evidence, not publisher authentication or a reproducible-build proof.

## Isolation and safety statement

The successful run started with a path that did not exist. The script refused to reuse an existing path or an occupied RPC port. Every launch explicitly named the disposable data directory and selected `-regtest`. The successful run also used:

```text
-listen=0
-connect=0
-dnsseed=0
-rpcbind=127.0.0.1
-rpcallowip=127.0.0.1
```

Before wallet creation, `listwallets` returned an empty array and `listwalletdir` returned no entries. Only the newly created disposable wallet was loaded or queried. No existing BitcoinII wallet or data directory was opened, copied, rescanned, imported, unlocked, inspected, or spent from. No private key, seed phrase, wallet backup, RPC cookie, or authorization header was printed or included in this report.

`getnetworkinfo` reported zero connections, and `getpeerinfo` returned no peers. `sendrawtransaction` was called only on the loopback RPC endpoint of the local regtest node. No public mainnet, testnet, testnet4, signet, explorer, Electrum server, or transaction-broadcast endpoint was used.

## Launch and RPC sequence

The v31 release did not include a matching CLI executable, so RPC was sent directly over HTTP to loopback using the random cookie held only in memory. The launch shape was:

```powershell
Start-Process '<v31-root>\bitcoinII-qt.exe' -WindowStyle Hidden -ArgumentList @(
  '-datadir=<new-audit-root>\datadir',
  '-regtest', '-server',
  '-rpcport=29443', '-rpcbind=127.0.0.1', '-rpcallowip=127.0.0.1',
  '-listen=0', '-connect=0', '-dnsseed=0',
  '-nosplash', '-min'
)
```

After startup, the following RPC sequence ran against either `/` or the explicitly named disposable-wallet endpoint:

```text
uptime
getnetworkinfo
getblockchaininfo
getpeerinfo
listwallets
listwalletdir
createwallet "morebc2-v31-psbt-disposable"
getwalletinfo
getnewaddress "mining" "bech32"
generatetoaddress 101 <disposable-mining-address>
getblockchaininfo
getbalances
getnewaddress "psbt-destination" "bech32"
walletcreatefundedpsbt [] {<disposable-destination>:1.0} 0 {"fee_rate":1.0} true
decodepsbt <funded-psbt>
walletprocesspsbt <funded-psbt> true "ALL" true
decodepsbt <signed-psbt>
finalizepsbt <signed-psbt> true
decoderawtransaction <final-transaction-hex>
testmempoolaccept [<final-transaction-hex>]
sendrawtransaction <final-transaction-hex>
getmempoolentry <txid>
getmempoolinfo
stop
```

## PSBT lifecycle results

| Check | Result | Observation |
|---|---|---|
| Fresh chain and wallet | PASS | Regtest height began at 0; no wallet was present before creation |
| Local funds | PASS | 101 blocks generated locally; height `101`; trusted mature balance `50.0` BC2 |
| `walletcreatefundedpsbt` | PASS | PSBT v0; one input; two outputs; fee `0.00000141` BC2; change position `1` |
| `decodepsbt` | PASS | 50 BC2 witness-v0 coinbase input identified; 1 BC2 destination and `48.99999859` BC2 change |
| `walletprocesspsbt` | PASS | `complete = true` using only the disposable wallet |
| `finalizepsbt` | PASS | `complete = true`; raw transaction produced |
| `decoderawtransaction` | PASS | One input, two outputs; 222 bytes, 141 vbytes, weight 561 |
| `testmempoolaccept` | PASS | `allowed = true`; vsize `141`; base fee `0.00000141` BC2 |
| `sendrawtransaction` | PASS | Returned the same txid as the decoded transaction |
| Local mempool | PASS | Entry present; mempool size `1`; unbroadcast count `1` |
| Public-network safety | PASS | Zero peers and local loopback/regtest submission only |
| Shutdown | PASS | Exit code `0`; `Shutdown done`; cookie absent; listener absent |

Transaction detail:

| Field | Value |
|---|---|
| Input | `52eafd74fd7b0d0d85fa4d77645285f4bc075ea3806646465b27429c59101ea0:0` |
| Input amount/type | `50.0` BC2, disposable regtest coinbase, witness-v0 keyhash |
| Destination output | `1.0` BC2, witness-v0 keyhash |
| Change output | `48.99999859` BC2, witness-v0 keyhash |
| Fee | `0.00000141` BC2 |
| Effective fee rate | `0.00001000` BC2/kvB (`1` sat/vB) |
| Txid | `9c2c504586ee34af24861b24cf2b4c57ea5f2bf81fd31bcb7534f0a875af4ad2` |
| Wtxid | `d39c89f2e0dfd30b9ed8c9b3bc2228d81aa910e91cf299c77ad7edc401ddf68d` |

The full PSBT and raw transaction are retained in the local audit evidence but are not reproduced here. They contain only disposable regtest material, but omitting them keeps the public record focused and avoids publishing unnecessary key-origin metadata.

## Replay-protection source trace

The trace below is pinned to BitcoinII Core commit [`8daaf7b12e71d3646eed787f040bf2899a69dc1c`](https://github.com/Bitcoin-II/BitcoinII-Core/commit/8daaf7b12e71d3646eed787f040bf2899a69dc1c), the commit resolved by tag `v31.1.0` during this validation.

### Activation and domain selection

- Mainnet sets `nReplayProtectionHeight = 57750` and `nReplayProtectionForkId = 0x01324342U` in [`src/kernel/chainparams.cpp`, lines 99–100](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/kernel/chainparams.cpp#L99-L100).
- `Consensus::Params` defaults replay activation to the maximum integer height and the fork id to zero; `SighashForkId(height)` returns the configured fork id only at or above activation in [`src/consensus/params.h`, lines 125–132](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/consensus/params.h#L125-L132).
- The regtest constructor does not override those replay defaults. Testnet4, by contrast, contains a height-`119` replay setting at [`src/kernel/chainparams.cpp`, lines 340–341](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/kernel/chainparams.cpp#L340-L341). Testnet4 is a public test network and was not used for transaction submission here.

The byte value `0x01324342` is serialized as the replay domain; the comment identifies it as `"BC2"` plus replay-domain version 1. It is not a transaction field.

### Signing and signature-hash path

1. The node chain interface returns the consensus-selected domain through `getSighashForkId(height)` in [`src/node/interfaces.cpp`, lines 554–556](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/node/interfaces.cpp#L554-L556).
2. `CWallet::GetSighashForkId()` asks for the next-block height in [`src/wallet/wallet.h`, lines 523–528](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/wallet/wallet.h#L523-L528).
3. Wallet PSBT processing passes that domain into `PrecomputePSBTData` in [`src/wallet/wallet.cpp`, line 2214](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/wallet/wallet.cpp#L2214). Wallet spend RPC finalization/extraction also supplies it in [`src/wallet/rpc/spend.cpp`, line 128](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/wallet/rpc/spend.cpp#L128).
4. `PrecomputePSBTData` stores the domain in `PrecomputedTransactionData::m_sighash_fork_id` in [`src/psbt.cpp`, lines 385–399](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/psbt.cpp#L385-L399), and `FinalizePSBT` / `FinalizeAndExtractPSBT` reuse it in [`src/psbt.cpp`, lines 552–572](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/psbt.cpp#L552-L572).
5. `SignatureHash` resolves the domain from the precomputed data and appends non-zero `sighash_fork_id` after the ordinary sighash type before hashing for legacy and witness-v0 signatures in [`src/script/interpreter.cpp`, lines 1610–1704](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/script/interpreter.cpp#L1610-L1704). The ECDSA checker consumes that digest through `GenericTransactionSignatureChecker` at [`src/script/interpreter.cpp`, line 1738](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/script/interpreter.cpp#L1738).
6. Schnorr/Taproot hashing similarly appends the non-zero domain in [`src/script/interpreter.cpp`, lines 1483–1520](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/script/interpreter.cpp#L1483-L1520).

Raw-transaction RPC uses `NextBlockSighashForkId()` in [`src/rpc/rawtransaction.cpp`, lines 58–62](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/rpc/rawtransaction.cpp#L58-L62), including PSBT precomputation, raw signing, and PSBT extraction paths at lines `196`, `779`, and `1608`.

### Validation and activation boundary

- Mempool policy and consensus script checks calculate the domain for `active height + 1`, so admission immediately before activation targets the activation block's signature domain: [`src/validation.cpp`, lines 1454–1504](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/validation.cpp#L1454-L1504).
- The script execution cache key includes `m_sighash_fork_id`, preventing reuse across domains: [`src/validation.cpp`, lines 2407–2414](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/validation.cpp#L2407-L2414).
- Block connection selects the domain using the block's own height before preparing transaction checks: [`src/validation.cpp`, lines 2853–2857](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/validation.cpp#L2853-L2857).
- After connecting the block immediately before activation, the node clears the mempool of legacy-domain transactions: [`src/validation.cpp`, lines 3482–3498](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/validation.cpp#L3482-L3498).
- External-signer wallets explicitly fail post-fork signing when the external signer cannot be given replay-domain-aware sighash semantics: [`src/wallet/external_signer_scriptpubkeyman.cpp`, lines 81–90](https://github.com/Bitcoin-II/BitcoinII-Core/blob/8daaf7b12e71d3646eed787f040bf2899a69dc1c/src/wallet/external_signer_scriptpubkeyman.cpp#L81-L90).

## Test coverage review

A release-tag search for `replay protection`, `replay_protection`, `SighashForkId`, and `sighash_fork_id` across `src/test`, `src/wallet/test`, and `test/functional` found no replay-specific unit or functional test. Generic PSBT coverage exists in `src/wallet/test/psbt_wallet_tests.cpp`, `test/functional/rpc_psbt.py`, and related files, but it does not name or directly assert the BC2 replay domain.

Those generic suites were not run because the locally available headless daemon, CLI, and test binaries identify as `v29.1.0`, while the v31.1.0 release artifact available for this work is Qt-only. Substituting v29 test executables would not be valid v31 evidence. The live v31 Qt RPC sequence above directly covered the requested PSBT methods instead.

## Replay runtime limitation and bounded probe

An exploratory restart of the same disposable regtest chain advanced it from height `101` to `118` and attempted an activation-boundary comparison. A transaction signed at height `117` remained acceptable at height `118`. Source inspection then established why: height `119` belongs to the Testnet4 constructor, not regtest; regtest retains the default disabled replay height/fork id.

The probe stopped at that assertion, the disposable node performed a clean shutdown, and no public network was contacted. The observation is not evidence against mainnet replay protection. It is evidence that regtest-as-shipped cannot demonstrate the domain switch. No source, consensus setting, or executable was changed to manufacture a runtime result.

## Evidence classification

| Classification | What this record establishes |
|---|---|
| **Source-confirmed replay-protection behavior** | Mainnet activation at `57750`; fork/domain id `0x01324342`; next-block wallet/mempool selection; PSBT precomputation/finalization; legacy, witness-v0, and Schnorr sighash domain inclusion; validation-cache separation; activation-boundary mempool clearing; block-height validation path |
| **Runtime-confirmed PSBT/raw-transaction behavior** | Fresh v31.1.0 regtest wallet funding, `walletcreatefundedpsbt`, two `decodepsbt` calls, `walletprocesspsbt`, `finalizepsbt`, `decoderawtransaction`, accepted `testmempoolaccept`, local-only `sendrawtransaction`, mempool entry, and clean shutdown |
| **Still runtime-unverified on mainnet** | An independently constructed pre/post-activation signature vector; mainnet rejection of a legacy-domain signature; mainnet acceptance of a BC2-domain signature; hardware/external-signer support; third-party library compatibility; valid public-network transaction broadcast |

## Pass/fail table

| Check | Result | Boundary |
|---|---|---|
| Exact v31.1.0 binary identity | PASS | File metadata, repeated SHA-256, and runtime RPC agree |
| Brand-new disposable regtest path | PASS | Successful directory did not exist before launch |
| Brand-new disposable wallet | PASS | Empty wallet listings before creation; only named wallet used |
| Mature local-only funds | PASS | 101 regtest blocks; 50 BC2 mature balance |
| Required PSBT/RPC lifecycle | PASS | Every requested method returned successfully |
| Final transaction validity | PASS | Finalized, decoded, and accepted by local mempool |
| Local `sendrawtransaction` | PASS | Returned expected txid; mempool contained one unbroadcast entry |
| Mainnet replay source trace | PASS / SOURCE | Exact v31.1.0 files/functions/lines traced |
| Replay-specific upstream tests | NOT FOUND | No named replay test in release-tag unit/functional trees |
| Replay activation on regtest | NOT APPLICABLE | Regtest does not override disabled defaults |
| Mainnet replay runtime | NOT RUN | Intentionally excluded for safety and lack of disposable mainnet funds/vector |
| Existing wallet/datadir isolation | PASS | Explicit fresh path; no existing wallet path queried or loaded |
| No public broadcast | PASS | Regtest, zero peers, loopback RPC only |
| Final shutdown | PASS | Process exited; cookie removed; no RPC listener; `Shutdown done` |

## Deviations and limitations

1. The first launch attempt used a broader defensive argument set but produced no cookie and no files; it timed out and left no process or listener. A second fresh directory was used rather than reusing it.
2. The second attempt reached RPC and created only the named disposable wallet, then stopped on a double-slash wallet-endpoint URL error in the audit harness. It shut down cleanly. The successful run used a third never-before-used directory.
3. The replay-boundary probe initially interpreted Testnet4's height `119` as regtest. Runtime acceptance prompted the constructor-level source check that corrected this. The report preserves that limitation instead of upgrading the result.
4. Full PSBT and transaction encodings remain only in the local audit directory. No secret material is included in the report.
5. Binary authenticity and reproducible equivalence to commit `8daaf7b...` remain unverified even though the file hash matches the recorded release bytes.

## Remaining unverified items

- A deterministic pre-/post-fork digest vector generated by an independent implementation.
- Runtime rejection of a legacy-domain signature and acceptance of a BC2-domain signature at mainnet height `57750`.
- Successful v31 replay-domain signing through a hardware or external signer.
- Third-party wallet, exchange, SDK, and signing-library support for `0x01324342`.
- A maintainer-authenticated binary checksum/signature and reproducible build comparison.
- Any valid transaction broadcast to a public BitcoinII network; deliberately not attempted.

## Final safety state

The successful disposable audit directory remains intact. The two bounded failed-attempt directories also remain separate and stopped. At final verification, port `29443` had no listener, the successful regtest cookie was absent, and the debug log ended with `Shutdown done`. The pre-existing BitcoinII Qt process and every existing user wallet/data directory were left untouched.

## Related evidence

- [Windows v31.1.0 node and RPC validation — 2026-09-11](windows-v31-node-rpc-validation-2026-09-11.md)
- [BitcoinII v31 replay protection source atlas](../developers/source-atlas/replay-protection-v31.md)
- [v31.1.0 release asset record](../releases/v31.1.0-assets.md)
- [Verification evidence index](verification-index.md)

## Verification

**Status:** Directly observed PSBT runtime / Source-confirmed replay protection
**Primary evidence:** Local v31.1.0 Qt runtime and cookie-authenticated RPC output; retained disposable regtest data/log/evidence; exact `v31.1.0` source tag resolved to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`
**Notes:** PSBT construction, wallet signing, finalization, decoding, local mempool acceptance/submission, and shutdown are runtime-observed. Mainnet replay-domain behavior is source-confirmed, not runtime-confirmed.
