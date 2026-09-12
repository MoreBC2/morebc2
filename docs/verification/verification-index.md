# Verification evidence index

**Category:** Verification  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Purpose

This is the canonical current summary of what MoreBC2 has source-reviewed, directly observed, locally exercised, or deliberately left unresolved.

Evidence is version- and environment-scoped. Historical records are preserved as history; current-facing claims use the strongest relevant current evidence.

## Current evidence snapshot

| Area | Current status | Evidence established | Remaining boundary |
|---|---|---|---|
| Canonical implementation | Source-reviewed | `Bitcoin-II/BitcoinII-Core` is the current source/release path used by MoreBC2. | Recheck if upstream organization/repository ownership changes. |
| Current release | Directly observed | `v31.1.0`, published 2026-08-29; six Linux/Windows/macOS assets and GitHub SHA-256 metadata recorded. | Release metadata is mutable; recheck when exact inventory matters. |
| Tag / source provenance | Directly observed | Lightweight `v31.1.0` tag points to `8daaf7b12e71d3646eed787f040bf2899a69dc1c`; GitHub reports target commit verified/valid. | This is not a signed release tag, binary signature, or reproducible-build proof. |
| Current binary integrity | Partial direct verification | MoreBC2 independently hashed `BitcoinII-v31.1-Win64-Qt.zip`; result matched GitHub's `f7b1d164...` digest. Extracted executable was `Authenticode: NotSigned`. | Independent hashes for the other five assets, publisher-signed checksums, release-key path, and reproducibility remain open. |
| Consensus / v31-specific paths | Source-reviewed | ShockWave, replay protection, consensus data restrictions, fork-aware header sync, validation/mempool/signing/template interactions, and height `57750` activation are release-pinned and mapped. | Controlled runtime vectors/activation-boundary tests remain incomplete. |
| Difficulty / ShockWave | Source-reviewed | Post-`57750` per-block ShockWave path, 25-block/24-interval baseline, six-interval response, candidate-time behavior, emergency recovery, and chainwork boundary documented. | Controlled candidate-time vectors and empirical live-network performance remain open. |
| Replay protection | Source-confirmed / runtime-boundary limited | Mainnet activation `57750`, domain `0x01324342`; wallet/raw/PSBT/mempool/block/cache/signing paths traced. | Regtest did not activate mainnet replay domain; external signer/third-party vectors remain open. |
| Data restrictions | Source-reviewed | Height `57750`; output/Taproot witness restrictions and block-connection enforcement path documented in v31 source reviews. | Execute located tests and record activation-boundary vectors. |
| Fork-aware header sync | Source-reviewed | Two-phase sync, fork anchoring, bounded private ShockWave history, and exact work validation are documented. | Competing-branch/recovery runtime scenarios remain unexecuted. |
| Chain selection / reorganizations | Source-reviewed | Valid usable branches compete by accumulated chainwork; disconnect/undo/reconnect/mempool-repair lifecycle mapped. | Controlled v31 reorg simulation and empirical reorg-depth history remain open. |
| Windows v31 node/RPC | Locally tested / current-dated | Isolated Qt server-mode startup, outbound peers, advancing IBD, cookie RPC, selected node/network RPC, disposable wallet, shutdown/restart passed 2026-09-11. | Full sync, long-duration operation, headless-daemon route, optional index/pruning combinations, and production deployment remain open. |
| Wallet / PSBT / local transaction | Locally tested / current-dated | Fresh isolated v31 regtest wallet funded, PSBT-created, signed, finalized, decoded, `testmempoolaccept`-checked, and locally submitted with zero peers. | Public propagation, mainnet replay activation, external signers, backup/restore, encryption, and third-party wallets remain open. |
| Mining RPC | Mixed | `generatetoaddress` was exercised in isolated v31 regtest; mining/template source paths reviewed. | `getmininginfo`, `getnetworkhashps`, `getblocktemplate`, `submitblock`, `submitheader`, and public Stratum share workflows remain untested. |
| Public explorers / APIs | Directly observed / dated | 2026-09-11 Official Explorer plus Mempool-style REST/WebSocket checks; compared services agreed on the sampled tip. | Long-term uptime, custody-grade reliability, and backend/operator independence remain unverified. |
| Electrum | Directly observed / dated | `infra1.bitcoin-ii.org:50008` and TLS `:50009` answered as ElectrumX 1.18.0 / protocol 1.4; TLS hostname validation passed. | Wallet compatibility, history correctness, spending, and Electrum broadcast behavior remain unverified. |
| Public transaction submission | Route behavior observed | Three Mempool-style `/api/tx` routes rejected deliberately invalid `00` payloads with HTTP 400. Official Explorer candidate routes returned 403. | Successful valid BC2 public broadcast/propagation has not been demonstrated. |
| Exchange confirmation policy | Directly observed / provisional | CoinEx `2/6`; NonKYC `50`; NestEx BC2 `50`; Biconomy exact count not public. MoreBC2 uses 50 as provisional normal-deposit guidance. | Maintainer/community review, chainwork example, large-value escalation thresholds, reorg statistics, and periodic rechecks remain open. |
| Pool / Stratum evidence | Public configuration observed | Current pool modes/fees/endpoint families documented for 1Miner, CapsPool and other current sources. | End-to-end subscribe/authorize/share acceptance, payout accounting/reliability, and template compatibility remain untested. |
| Third-party wallet/service compatibility | Partial | Current Core wallet source/runtime evidence and Electrum reachability exist. | External/hardware signer, wallet, and service workflow compatibility remains incomplete. |
| Documentation architecture | Reviewed current | Documentation, Configuration, Nodes, Releases, API/Explorer, Infrastructure, Wallets, Mining, Developers/Source Atlas, Architecture, Ecosystem, Encyclopedia, and Research were audited against current v31 evidence. | Future release/service drift requires maintenance; Reviewed does not equal universal runtime Verified. |
| Site build/deployment | Repeatedly tested | Astro/Starlight content checks, rendered-link checks, Windows-doc guard, private-path scan, production Cloudflare deployment, and live indexing checks have repeatedly passed. | Site deployment validates publication mechanics, not BitcoinII claims. |

## Current v31 runtime records

- [Windows v31.1.0 node and RPC validation — 2026-09-11](windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](windows-v31-psbt-replay-validation-2026-09-11.md)
- [v31 wallet/mempool/mining source regression audit — 2026-09-02](v31-wallet-mempool-mining-regression-2026-09-02.md)

## Current public-service / exchange records

- [Public infrastructure smoke test — 2026-09-11](public-infrastructure-smoke-test-2026-09-11.md)
- [Exchange confirmation evidence — 2026-09-12](exchange-confirmation-evidence-2026-09-12.md)
- [Public API/WebSocket/Electrum smoke test — 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)

These are point-in-time observations, not permanence or independence guarantees.

## Current release/provenance records

- [v31.1.0 release assets](../releases/v31.1.0-assets.md)
- [Authentication status](../releases/authentication-status.md)
- [Release verification guide](../releases/release-verification-guide.md)

Current evidence proves useful integrity/provenance facts but does **not** establish a maintainer-authenticated binary checksum chain or reproducible build.

## Historical evidence preserved

The following remain valuable but version-scoped:

- [Windows node-operator test — 2026-08-27](windows-node-operator-test-2026-08-27.md)
- [Windows fresh-node peer discovery test — 2026-08-28](windows-peer-discovery-test-2026-08-28.md)
- [Local node inspection — 2026-07-10](local-node-inspection-2026-07-10.md)
- [Read-only RPC smoke test — 2026-07-10](read-only-rpc-smoke-test-2026-07-10.md)
- [Release-artifact authentication — 2026-08-27](release-artifact-authentication-2026-08-27.md)

Do not rewrite them to appear current; add a new dated record when a workflow is re-tested.

## Current priorities

1. Complete stronger current-release artifact authentication: remaining independent asset hashes, publisher-signed checksum/key discovery, and reproducibility if available.
2. Run longer/full-sync v31 node coverage and deliberately test optional pruning/index combinations where operationally useful.
3. Produce controlled ShockWave candidate-time / `nBits` vectors and execute/map relevant upstream tests.
4. Produce deterministic replay-domain vectors and qualify external/hardware/third-party signers.
5. Build a worked cumulative-chainwork deposit-monitoring example and a reorganization incident playbook around the provisional 50-confirmation baseline.
6. Qualify selected pool Stratum endpoints end-to-end if mining integration evidence becomes important.
7. Perform safe third-party wallet/Electrum workflow qualification without using existing user wallets or unnecessary real funds.
8. Recheck public exchanges, explorers, APIs, pools, wallets, and release metadata periodically.
9. Establish/maintain a clear upstream technical/security contact path for integration providers.

## Update rule

When new evidence is added:

1. link the dated record here;
2. name the release/ref, platform/network, and environment;
3. use the narrowest accurate status;
4. preserve historical records as historical;
5. re-date live-service claims when rechecked;
6. move resolved source questions out of the active unknown queue;
7. do not convert a successful documentation build into technical verification.

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** BitcoinII Core `v31.1.0` release/source reviews, current MoreBC2 runtime records, current public infrastructure and exchange evidence, completed documentation-section audits, and deployment workflows  
**Notes:** This index is current through the September 12 documentation audit sequence. Partial status reflects real remaining runtime, third-party, operational, and release-authentication work.
