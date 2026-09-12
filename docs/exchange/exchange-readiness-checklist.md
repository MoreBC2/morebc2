# Exchange Readiness Checklist

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This checklist tracks how ready the current BitcoinII (BC2) documentation package is for exchange and service-provider review.

It is intentionally conservative. A strong source fact can be marked ready while the overall integration package remains Draft because production custody, contact, authorization, or compliance work is incomplete.

## Readiness levels

- **Ready / source-confirmed:** Current stable fact is backed by release-pinned or project-controlled source.
- **Current-dated observed/tested:** Directly observed or locally exercised on the stated date; not a permanent reliability guarantee.
- **Draft / provisional:** Substantive guidance exists but still needs operator, maintainer, or production review.
- **Needs verification:** Relevant information exists or is expected, but the current fact/path has not been established strongly enough.
- **Missing / not established:** MoreBC2 does not currently have the required material.
- **Not applicable:** Does not apply to BC2.

## 1. Project identity

| Item | Status | Notes |
|---|---|---|
| Project name | Ready / source-confirmed | Current project and source usage: BitcoinII. |
| Ticker | Ready / source-confirmed | `BC2` is used by BitcoinII Core v31.1.0 source/UI references. |
| Official website | Current-dated observed | `https://bitcoin-ii.org/` is current project web presence. Some technical website copy is older than v31, so release-pinned source remains the protocol authority. |
| Official source repository | Ready / current-dated | `Bitcoin-II/BitcoinII-Core` is the canonical public reference implementation used by MoreBC2; recheck before a submission. |
| License / source-use status | Reviewed with caveat | General repository licensing is documented, but `v31.1.0/src/pow.cpp` contains separate terms for original ShockWave material. Use the integration-package licensing note rather than calling all v31 source simply MIT. |
| Logo package | Needs verification | Confirm current project-controlled PNG/SVG assets and reuse terms before a final packet. |
| Short project description | Draft | Neutral source-backed language exists in current docs/template. |
| Long project description | Draft | Can be assembled from current integration docs; avoid stale pre-v31 technical claims. |
| Public contact email | Needs verification | Do not infer a canonical project contact solely from a commit author address. |
| Technical/security contact process | Missing / not established | Canonical exchange/security contact process remains an important blocker. |
| Applicant authority | Per-exchange requirement | Some exchanges require an official-team applicant or project permission. MoreBC2 is an independent documentation project. |

## 2. Chain and network facts

| Item | Status | Notes |
|---|---|---|
| Mainnet genesis | Ready / source-confirmed | Genesis hash and merkle root are release-pinned. |
| Consensus / PoW | Ready / source-confirmed | SHA-256 Proof of Work. |
| Block-header hash path | Ready / source-confirmed | Double-SHA256 path documented from current source. |
| Target block spacing | Ready / source-confirmed | 10 minutes. |
| Difficulty adjustment | Ready / source-confirmed | ShockWave per block from mainnet height `57,750`; do not use the historical 2016-block retarget as current behavior. |
| Subsidy / halving | Ready / source-confirmed | 210,000-block halving interval. |
| Maximum supply | Ready / source-confirmed | `21,000,000 * COIN`. |
| Address formats | Ready / source-confirmed | P2PKH `0`, P2SH `5`, Bech32 `bc`; Bitcoin-like overlap requires replay-protection awareness. |
| Replay protection | Ready / source-confirmed | Mainnet activation height `57,750`, domain/fork ID `0x01324342`; external signer compatibility remains separately test-bound. |
| Mainnet P2P port | Ready / source-confirmed | `8338`. |
| Mainnet RPC default | Ready / source-confirmed | `8332`, operator-configurable. |
| DNS seed | Ready as source value | `dnsseed.bitcoin-ii.org.` is release-pinned; operational DNS/peer behavior should still be rechecked for a live deployment. |

## 3. Explorer and public infrastructure

| Item | Status | Notes |
|---|---|---|
| Official explorer URL | Current-dated observed | `https://bitcoinii.ddns.net/explorer/` was directly checked in the 2026-09-11 infrastructure probe. |
| Project-linked explorer | Current-dated observed | `https://explorer.bitcoin-ii.org` is reachable and independently run/community-funded. |
| Explorer shows current blocks | Current-dated observed | Compared public explorers agreed on the same tip during the 2026-09-11 check. |
| Transaction lookup | Current-dated observed | Public transaction/block lookup surfaces are documented and directly checked. |
| Address lookup | Current-dated observed | Current project-linked explorer exposes address lookup; recheck at submission time. |
| REST/WebSocket fallback | Current-dated observed | Official explorer API plus multiple Mempool-style REST/WebSocket surfaces were tested. Backend/operator independence is not fully established. |
| Electrum reachability | Current-dated observed | `infra1.bitcoin-ii.org` TCP/TLS read-only `server.version` check passed on 2026-09-11. Wallet compatibility/broadcast remains unverified. |
| Uptime / custody-grade reliability | Needs verification | Point-in-time reachability is not long-term availability evidence. |
| Dedicated network status page | Partial | Public explorers expose useful network/mining data; no custody-grade status/SLA is established. |

## 4. Releases and software artifacts

| Item | Status | Notes |
|---|---|---|
| Current release identified | Ready / current-dated | BitcoinII Core `v31.1.0`, published 2026-08-29. Recheck immediately before submission. |
| Release files available | Ready / current-dated | Six Linux/Windows/macOS assets recorded. |
| SHA-256 digest metadata | Ready / current-dated | GitHub exposes SHA-256 asset digest metadata for all six recorded assets. |
| Tag / commit provenance | Partial / current-dated | `v31.1.0` is a lightweight tag pointing to commit `8daaf7b...`; GitHub reports the target commit cryptographically verified. |
| Standalone signed checksum manifest | Missing / not established | Do not imply GitHub asset metadata is a maintainer-signed manifest. |
| Detached binary signatures | Missing / not established | Not established by MoreBC2. |
| Release signing-key process | Missing / not established | No canonical procedure established. |
| Independent binary hashing | Partial | MoreBC2 has bounded download/hash evidence, but complete independent authentication of every current asset remains open. |
| Reproducible builds | Missing / not established | No reproducible-build proof established. |
| Build instructions | Draft | Source/build material exists; exchange-focused build procedure still needs current operational review. |
| Upgrade procedure | Draft / incomplete | Current-release upgrade/maintenance runbook still needs production-focused documentation. |
| Known release issues | Draft | Current release caveats are spread across verification/integration docs; a concise operator-facing known-issues section would help. |

## 5. Node and RPC integration

| Item | Status | Notes |
|---|---|---|
| Windows v31 node startup/RPC | Current-dated tested | Isolated Qt server-mode startup, cookie-authenticated loopback RPC, peers, initial sync, restart, and clean shutdown passed on 2026-09-11. |
| Headless Linux daemon deployment | Needs verification | Source/docs exist; current MoreBC2 production-like daemon deployment is not yet recorded. |
| Configuration example | Draft / source-reviewed | Defaults and security caveats are documented; final service config should be deployment-specific. |
| Sync expectations | Partial | Bounded initial-sync evidence exists; full-sync duration/storage and long-duration operation remain unverified. |
| Indexing / pruning | Draft / source-confirmed constraints | Defaults are documented (`txindex=0`, pruning off); production indexing recommendation remains architecture-dependent. |
| Wallet backup/recovery | Draft / incomplete | Needs reviewed production custody procedure. |
| RPC authentication | Current-dated tested / bounded | Cookie-authenticated loopback RPC passed in the isolated Windows v31 test. Production credential/network design remains operator-specific. |
| Firewall / private-network guidance | Draft | Current docs correctly warn against public RPC exposure; deployment examples can be improved. |
| Monitoring guidance | Draft / substantive | Height, peers, tip age, difficulty/work, chainwork, and reorg signals are identified; concrete alert thresholds remain open. |

## 6. Deposits and transaction operations

| Item | Status | Notes |
|---|---|---|
| Address-generation architecture | Draft / incomplete | Need final wallet-based vs non-wallet custody design and operator examples. |
| Deposit monitoring method | Draft / substantive | Current guide covers detection/inclusion/reorg states, wallet-vs-non-wallet considerations, and chainwork-aware risk. Concrete implementation examples remain open. |
| Normal confirmation recommendation | Draft / provisional | **50 confirmations** is the current MoreBC2 normal-deposit baseline, grounded in 2026-09-12 direct exchange evidence. Not a protocol rule or finality guarantee. |
| Large/unusual deposit policy | Draft | Longer/manual holds are recommended when transaction value, chainwork, network health, or account risk warrants it; exact thresholds are operator-specific. |
| Reorg handling | Draft / substantive | Rollback/hold behavior is documented; concrete alert thresholds and incident playbook remain open. |
| PSBT transaction flow | Current-dated tested / bounded | Fresh isolated v31.1.0 regtest create/fund/sign/finalize/decode/mempool/local-submit workflow passed on 2026-09-11. |
| Public valid-transaction broadcast | Needs verification | Invalid public submissions were intentionally rejected; successful valid public BC2 broadcast has not been tested. |
| Replay-protection path | Source-confirmed / bounded runtime | Current source paths are traced; regtest does not exercise mainnet activation domain switch. External signers remain unverified. |
| Failed transaction recovery | Missing / incomplete | Operator-facing support/retry procedure needed. |
| Custody architecture | Missing / not established | MoreBC2 should not prescribe a universal hot/cold design without a reviewed operator model. |

See [Deposit monitoring](deposit-monitoring.md) and [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md).

## 7. RPC documentation package

| Item | Status | Notes |
|---|---|---|
| Read-only RPC documentation | Draft / current-dated runtime evidence | Current node/network commands have bounded v31 runtime evidence. |
| Blockchain RPC list | Draft / source-reviewed | Useful monitoring paths are mapped. |
| Wallet RPC list | Draft / source-reviewed | Risky/state-changing commands should remain clearly separated. |
| Raw transaction / PSBT RPC | Draft / source-reviewed + bounded runtime | Source presence and isolated PSBT workflow are established. |
| Mempool/broadcast RPC | Draft / source-reviewed + bounded runtime | Local mempool/submission path tested; public valid broadcast remains open. |
| Exchange-facing command examples | Draft / incomplete | Need concise, tested operator examples with prerequisites and expected outputs. |
| Error/recovery examples | Missing / incomplete | Useful next step for production integration docs. |

## 8. Security and trust package

| Item | Status | Notes |
|---|---|---|
| Responsible disclosure / security contact | Missing / not established | Important exchange-facing blocker. |
| Known vulnerability list | Needs verification | Do not imply a formal vulnerability program unless documented. |
| Dependency/update policy | Needs verification | Project process not yet packaged for exchanges. |
| Release verification statement | Draft / substantive | Current evidence and limits are documented accurately. |
| Third-party audit evidence | Missing / not established | State none established rather than imply an audit. |
| False-claim review | Draft / active | Current exchange docs explicitly distinguish source facts, dated observations, and provisional guidance. |

## 9. Community and market evidence

| Item | Status | Notes |
|---|---|---|
| Official X/Twitter link | Current-dated link present | Official website exposes an X link; verify destination immediately before submission. |
| Discord link | Current-dated link present | Official website exposes Discord; verify invite immediately before submission. |
| Telegram | Needs verification | Do not invent an official group if one is not project-controlled. |
| Reddit / community forums | Needs verification | Useful as community evidence only when role/status is described accurately. |
| Community size snapshot | Missing / not current | Record date/source if an exchange requests it. |
| Existing exchanges/services | Current-dated observed | CoinEx, NonKYC, NestEx, and Biconomy have direct current evidence at varying levels. |
| Exchange confirmation evidence | Current-dated observed | CoinEx 2/6; NonKYC 50; NestEx 50; Biconomy count unresolved as of 2026-09-12. |
| Market-data aggregators | Needs verification | Recheck immediately before a listing packet. |

## 10. Submission workflow

| Item | Status | Notes |
|---|---|---|
| Exchange target matrix | Current-dated draft | Refreshed 2026-09-12 with existing venues separated from prospective targets and dead targets removed. |
| Listing packet template | Current-dated draft | Refreshed 2026-09-12 with stable BC2 facts, evidence links, confirmation guidance, and applicant-authority wording. |
| Applicant-authority check | Required per exchange | XeggeX and high-barrier venues make this an explicit pre-submission check. |
| Submission tracker | Missing | Track date, submitter, authority, exchange, response, and requested changes. |
| Standard cover note | Draft | Authorized-representative and independent-contributor variants now exist in the packet template. |
| Technical follow-up template | Missing / incomplete | Useful after first exchange response. |
| Review owner / authorized submitter | Needs assignment | Do not infer that an independent MoreBC2 contributor can satisfy project-owner requirements. |
| Legal/KYC/audit packet | Per-exchange / not established | Required only where the target exchange asks for it; technical documentation cannot substitute for it. |

## Blocking issues before a high-confidence exchange submission

The technical documentation is substantially stronger than the original checklist suggested. Remaining blockers or submission-time requirements are now more specific:

- canonical technical/security contact process;
- required project-team authorization or authorized submitter, where applicable;
- legal/KYC/audit material for exchanges that require it;
- production custody architecture and deposit/withdrawal procedures;
- concrete cumulative-chainwork thresholds and reorganization incident handling;
- stronger release-binary authentication if the exchange requires signed or reproducible artifacts;
- current branding assets and submission-time community/market snapshots;
- target-specific recheck of listing fees, application path, regional availability, and requirements.

The current official release, core network parameters, dated public explorer evidence, bounded v31 node/RPC evidence, and provisional confirmation baseline are **not** wholly missing anymore and should not be described that way.

## Verification

**Status:** Draft
**Primary sources checked:** BitcoinII Core v31.1.0 source/release metadata, current MoreBC2 v31.1.0 runtime records, 2026-09-11 public-infrastructure evidence, 2026-09-12 exchange-confirmation evidence, and refreshed 2026-09-12 listing-requirement research
**Notes:** Full checklist audit completed 2026-09-12. Many foundational technical items advanced from generic Draft/Needs verification to source-confirmed or current-dated tested/observed. Production custody, contact, chainwork thresholds, applicant authority, and exchange-specific compliance remain the principal unresolved areas.