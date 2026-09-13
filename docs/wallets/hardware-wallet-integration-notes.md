---
description: "BitcoinII (BC2) v31.1.0 notes for Tangem and other hardware-wallet engineers, covering signing, PSBT, nodes, APIs, and test boundaries."
---
# BitcoinII (BC2) hardware-wallet integration notes

**Category:** Wallets / Integration
**Status:** Reviewed / Integration-readiness summary
**Last reviewed:** 2026-09-12

## Purpose and current status

This page gives wallet and integration engineers a concise, evidence-linked starting point for BitcoinII (BC2). BitcoinII is a native, Bitcoin-derived UTXO network. BitcoinII Core `v31.1.0` is the current MoreBC2 technical baseline.

This is an integration-readiness brief, not a compatibility claim. MoreBC2 has not tested a hardware wallet or external signer with BC2. [Tangem's current public BitcoinII asset page](https://tangem.com/en/cryptocurrencies/bitcoinii/) states that the BitcoinII network is temporarily not supported; nothing on this page implies Tangem support, approval, a relationship, or a planned listing.

## Release and source baseline

| Item | Current reference |
|---|---|
| Core release | [`v31.1.0`](https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0) |
| Release-pinned source | [`v31.1.0` source tree](https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0) |
| Recorded tag target | [`8daaf7b12e71d3646eed787f040bf2899a69dc1c`](https://github.com/Bitcoin-II/BitcoinII-Core/commit/8daaf7b12e71d3646eed787f040bf2899a69dc1c) |
| MoreBC2 release evidence | [BitcoinII Core v31.1.0 release assets](../releases/v31.1.0-assets.md) |

The tag, commit, six release assets, and GitHub-reported asset digests have been recorded. MoreBC2 independently matched the Windows Qt archive digest used in its September runtime work. A maintainer-signed checksum manifest, detached signatures over the release binaries, a documented BitcoinII release-signing-key trust path, and reproducible binary-to-source proof remain unestablished.

## Chain, keys, and addresses

BitcoinII retains a Bitcoin-style UTXO transaction model and Bitcoin-like script, wallet, raw-transaction, and PSBT concepts. Current reviewed signing paths include ECDSA signature-hash construction and public-key verification, plus Schnorr/Taproot handling where applicable.

A device's support for secp256k1/ECDSA, Bitcoin-format transactions, or generic PSBT is necessary context, but it is not proof of BC2 compatibility. The BC2-specific replay domain described below changes the digest that must be signed.

Current mainnet address and key encodings are:

| Encoding | Value |
|---|---|
| Base58 P2PKH prefix | `0` |
| Base58 P2SH prefix | `5` |
| Base58 secret-key prefix | `128` |
| Extended public key | `04 88 B2 1E` |
| Extended secret key | `04 88 AD E4` |
| Bech32 human-readable part | `bc` |

BitcoinII Core `v31.1.0` can generate Bech32 addresses, and MoreBC2 used fresh Bech32 addresses in its isolated regtest PSBT test. Because these encodings overlap with Bitcoin conventions, address parsing alone cannot identify safe BC2 signing behavior. See [BitcoinII v31.1.0 network specifications](../documentation/network-specifications.md).

## Transaction and PSBT workflow

BitcoinII Core exposes familiar transaction and PSBT operations, including:

1. select UTXOs and construct/fund a transaction or PSBT;
2. inspect the PSBT and obtain the consensus-selected next-block replay domain;
3. calculate each input's BC2-aware signature digest;
4. sign, insert signatures, finalize, and extract the transaction;
5. validate with the intended node configuration;
6. submit through a qualified broadcast path and monitor propagation/confirmation.

MoreBC2 directly exercised a bounded `v31.1.0` workflow on Windows using a fresh descriptor wallet, disposable regtest funds, zero peers, and loopback-only RPC. The test covered `walletcreatefundedpsbt`, `decodepsbt`, `walletprocesspsbt`, `finalizepsbt`, `decoderawtransaction`, `testmempoolaccept`, and local-only `sendrawtransaction`. The transaction reached only the isolated node's local mempool.

That test establishes the ordinary Core PSBT lifecycle under its recorded regtest conditions. It does not establish hardware-wallet compatibility, public relay, or runtime activation of mainnet replay protection. See the [full v31.1.0 PSBT runtime record](../verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## Replay protection: the critical signer difference

Mainnet replay protection activates at height `57750` with fork/domain id:

```text
0x01324342
```

The domain is an input to signature-hash calculation; it is not a normal serialized transaction field. Current `v31.1.0` source threads it through wallet, raw-transaction, PSBT, mempool, block-validation, legacy/witness-v0 ECDSA, and Schnorr/Taproot signature-hash paths.

Wallet and mempool logic select the domain for the **next block height**. The validation cache separates results by domain, and the mempool is cleared at the activation boundary so legacy-domain results are not carried into the post-activation context.

The external-signer consequence is explicit: a generic signer cannot be assumed safe after activation if the host cannot give it BC2 replay-domain-aware digest semantics. A syntactically valid PSBT or well-formed ECDSA signature may still be unusable on current BC2 mainnet if it was produced over the ordinary Bitcoin digest.

The shipped regtest parameters leave this replay domain disabled, so the isolated runtime test did not exercise the mainnet switch. The behavior is release-source-confirmed; an independent pre/post-activation test vector and hardware-device execution remain open. See [BitcoinII v31 replay protection](../developers/source-atlas/replay-protection-v31.md) and [wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md).

## Node and RPC requirements

A production wallet integration should qualify its own BitcoinII Core `v31.1.0` node profile rather than treating a public explorer as consensus authority.

Relevant defaults and design points include:

- mainnet P2P port `8338`;
- documented mainnet JSON-RPC default `8332`, which is operator-configurable;
- `server=1` when the Qt application is used as an RPC server;
- loopback or a trusted private network, authentication, firewalling, and least privilege—never unauthenticated public RPC;
- an explicit decision on pruning and optional indexes, because transaction lookup, rescans, and historical access depend on retained data and index configuration;
- node health, peer count, chain tip, cumulative chainwork, mempool, reorganization handling, fee selection, UTXO lookup, change, and broadcast monitoring.

MoreBC2 has bounded Windows evidence for fresh-node startup, outbound peer discovery, advancing initial block download, cookie-authenticated loopback RPC, disposable-wallet create/reload, and clean restart. Full IBD, long-duration operation, production index/pruning profiles, inbound connectivity, and cross-platform parity remain open. See the [BitcoinII node and RPC guide](../nodes/node-guide.md) and [RPC configuration](../configuration/rpc-configuration.md).

## Public API, explorer, and Electrum hierarchy

Current dated MoreBC2 observations distinguish:

- the **Official BitcoinII Explorer** at `https://bitcoinii.ddns.net/explorer/`, with its own observed API shape;
- `explorer.bitcoin-ii.org`, a project-linked hostname whose service presentation describes independent/community-funded operation and identifies CapsPool.io infrastructure;
- supplemental Mempool-style services at `bc2mempool.com` and `bc2.live`;
- read-only Electrum reachability at `infra1.bitcoin-ii.org:50008` (TCP) and `:50009` (TLS) during the September 11 test.

The three Mempool-style hosts showed closely aligned routes, schemas, responses, and rejection behavior. That does not prove a shared backend, but it also does not prove provider or backend independence. Electrum reachability likewise does not prove history correctness, wallet compatibility, spending behavior, or transaction broadcast.

[Tangem's public network-integration overview](https://tangem.com/en/blog/post/integrating-network-tokens/) says its review considers architecture, signature algorithms, node/service APIs, documentation, libraries, unique network behavior, transaction construction, and testing. It also says Tangem uses at least two different node providers for each network for reliability. Applied to the current BC2 evidence, that is a due-diligence target—not a claim that the listed BC2 hostnames already satisfy Tangem's independence or production-reliability requirements.

An integration team should identify operators and infrastructure boundaries, qualify at least two genuinely independent data/relay paths if its reliability policy requires them, and operate its own node where appropriate. See [BitcoinII explorer resources](../documentation/explorer-resources.md), [public endpoints](../api/public-endpoints.md), and [Electrum](../api/electrum.md).

## Broadcast evidence boundary

Successful valid public transaction broadcast is not currently established by MoreBC2.

- The Mempool-style services accepted `POST /api/tx` and returned HTTP 400 for deliberately malformed payload `00`. This proves route presence and invalid-data rejection only.
- Candidate routes on the Official BitcoinII Explorer returned HTTP 403 to invalid probes; no public submission route was established there.
- The isolated regtest `sendrawtransaction` call proved local mempool admission with zero peers. It did not prove mainnet submission, peer relay, explorer ingestion, or confirmation.

Before production use, qualify at least one complete path with a controlled valid BC2 transaction, verify node acceptance and peer propagation, observe it independently, test failure/retry/idempotency behavior, and document fallback routing. Do not use real funds until signing and relay behavior have passed the integration team's security process.

## Minimum integration test plan

1. Pin the exact Core source/release and independently verify every artifact used.
2. Derive and validate P2PKH, P2SH, native SegWit, change, and any intended Taproot addresses against Core-generated vectors.
3. Build deterministic unsigned-transaction and PSBT fixtures covering multiple inputs, change, fee selection, dust, RBF/sequence behavior, and malformed data.
4. Produce byte-for-byte signature-digest vectors for legacy, witness-v0, and any supported Taproot paths with replay domain `0x01324342`.
5. Compare device signatures and finalized transactions with BitcoinII Core, including negative tests using an ordinary Bitcoin digest.
6. Exercise the mainnet-active domain safely or create a controlled source-identical activation fixture; the shipped regtest defaults are insufficient for this specific switch.
7. Qualify UTXO, balance, fee, tip, reorg, and history behavior against the exact production node/index profile.
8. Prove valid submission, peer relay, independent observation, confirmation tracking, reorg recovery, and rebroadcast/failover behavior.
9. Establish provider ownership/backend independence, monitoring, rate limits, uptime expectations, and incident procedures.
10. Complete mobile, firmware/card, recovery, security, and user-acceptance testing before any support claim.

## Known unknowns

- No hardware wallet or external signer has been runtime-tested by MoreBC2.
- No independent mainnet replay-domain signature vector is currently published by MoreBC2.
- Derivation-path expectations and account-discovery behavior still require product-specific agreement and testing.
- Successful valid public API or Electrum broadcast remains unverified.
- Public-service backend/operator independence and long-term reliability are not fully proven.
- Full v31 IBD, long-duration node operation, production pruning/index profiles, and broad platform parity remain unverified.
- Release binary publisher authentication and reproducible-build proof remain incomplete.

## Independence statement

MoreBC2 is an independent, community-maintained documentation project. It does not represent BitcoinII, the BitcoinII Core maintainers, Tangem, or any listed infrastructure provider. This page does not announce or imply support, approval, partnership, listing, commercial terms, a listing fee, or any requirement to purchase co-branded wallets.

## Verification

**Status:** Reviewed / Integration-readiness summary  
**Primary evidence:** BitcoinII Core `v31.1.0` release-pinned source, MoreBC2's September 11 node/PSBT/infrastructure records, and the linked current public Tangem pages  
**Notes:** Core signing/PSBT/replay behavior is source-backed and the ordinary isolated PSBT lifecycle is runtime-tested. Hardware signing, the active mainnet replay-domain path, valid public broadcast, and independent provider redundancy remain unverified.
