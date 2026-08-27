# Verification evidence index

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-08-27

## Purpose

This page is the quickest way to see what MoreBC2 has directly observed, locally tested, source-reviewed, or left unresolved.

Status terms on this page are deliberately narrow:

- **Locally tested** means a command or behavior was actually exercised in a documented local environment.
- **Directly observed** means a current public page, API, release, repository, or service was checked and dated.
- **Source-reviewed** means relevant source or project-controlled metadata was reviewed.
- **Partial** means useful evidence exists but one or more important claims remain open.
- **Unavailable / planned** means the evidence path does not currently exist but may be added later.

This index does not make MoreBC2 public-ready and does not convert Draft pages into verified instructions.

For Verification section navigation, use the [Verification README](README.md). Older pages such as [Verification index](index.md) and [Verification dashboard](dashboard.md) are retained for path stability and historical context, but this page is the canonical evidence summary.

## Current evidence snapshot

| Area | Status | Evidence | Remaining limit |
|---|---|---|---|
| Canonical public implementation | Source-reviewed | `Bitcoin-II/BitcoinII-Core` is described by project-controlled GitHub metadata as the canonical reference implementation. See [project identity source check](project-identity-source-check-2026-07-10.md). | Maintainer confirmation remains useful if ownership or repository structure changes. |
| Project name and ticker | Strong partial | Project-controlled source/UI/repository material uses BitcoinII and `BC2`. | A simple explicit maintainer statement would be the cleanest primary ticker source. |
| Current release metadata | Directly observed / integrity recorded | `v29.1.0` release metadata, 10 uploaded assets, two generated source archives, local hashes, tag target, and bounded commit-signature result were recorded. All uploaded-asset sizes and hashes matched GitHub metadata. | Local hashes and GitHub metadata do not authenticate publisher intent or binary provenance. |
| Release binary signatures | Unavailable / planned | No publisher checksum manifest, detached release signature, signed annotated tag, trusted BitcoinII release-key path, or public release-specific build attestation was found for `v29.1.0`. The project maintainer has told the repository owner that releases/signatures are on the roadmap but are not implemented yet. | Treat the local hashes as integrity fingerprints and the maintainer statement as roadmap context, not published cryptographic authenticity evidence. |
| Local BitcoinII node | Locally tested | BitcoinII Core `v29.1.0` GUI inspection and a separate wallet-disabled CLI route were tested on Windows mainnet. The CLI test covered isolated startup, advancing initial sync, five read-only RPC calls, clean shutdown, and restart. See the [Windows operator test](windows-node-operator-test-2026-08-27.md). | Full sync, automatic peer discovery, other platforms, wallet behavior, and universal port behavior remain unresolved. |
| Local-only RPC setup | Locally tested | RPC bound to `127.0.0.1:8337`; no public or LAN bind was observed. Cookie authentication was used without publishing credentials. | Configuration behavior should be rechecked on future releases. |
| Explorer tip comparison | Directly compared | Local node and `bitcoinii.ddns.net` explorer matched at height `57,420` on 2026-07-10. Local node and `bc2mempool.com` REST matched at height `57,437` within a fraction of a second on 2026-07-12. | These are dated point-in-time agreements, not permanent reliability or official-status claims. |
| Read-only RPC commands | Locally tested | Nine commands passed: `getblockcount`, `getbestblockhash`, `getblockchaininfo`, `getnetworkinfo`, `getconnectioncount`, `getpeerinfo`, `getmempoolinfo`, `getdifficulty`, and `uptime`. See [RPC smoke test](read-only-rpc-smoke-test-2026-07-10.md). | `getpeerinfo` and some network output require redaction before publication. Live values are examples only. |
| Explorer/API availability | Directly observed / tested | `bc2mempool.com` and `bc2.live` loaded; public REST endpoints worked for tip, blocks, transactions, address summaries, mempool, fees, mining analytics, prices, and rich-list data. See [public API/Electrum smoke test](public-api-electrum-smoke-test-2026-07-12.md). | Long-term reliability, complete schemas, UTXO paths, broadcast behavior, and full mempool.space compatibility remain unverified. |
| WebSocket | Directly tested / partial | `wss://bc2mempool.com/api/v1/ws` completed a handshake and returned an initial explorer-state event after `{"action":"init"}`. | Only one brief initialization exchange was checked; full schemas, reconnect behavior, and long sessions remain unverified. |
| Electrum services | Directly tested / partial | `infra1.bitcoin-ii.org` TCP `50008` and SSL `50009` accepted standard read-only Electrum calls; TLS hostname validation passed; returned header matched local/REST tip. | Wallet compatibility is not established. `explorer.bitcoin-ii.org:5008` timed out in the check. |
| Exchange listings | Directly observed / partial | Direct public pages were observed for NonKYC and CoinEx; NestEx remained unconfirmed. | Account-gated deposits, withdrawals, trading, liquidity, region availability, and reliability were not tested. |
| Mining/network statistics | Directly observed / partial | MiningPoolStats BitcoinII page was observed and matched the explorer height during the check. | This does not verify individual mining pools, payout behavior, fees, or reliability. |
| Network/P2P source posture | Strong partial | Source Atlas entries, release comparison, selected blob checks, test coverage map, and test-run plan exist. | Full runtime test execution and broader live-network behavior remain open. |
| Command-safety wording | Reviewed for narrow private use | Command-shaped examples were audited and key state-changing warnings were added. | Outside reviewer confirmation is still needed before broad publication. |
| License and public reuse | Blocked | Private-review posture is documented. | Final MoreBC2 license and public contribution workflow are undecided. |
| Outside technical review | Not started | Narrow review packets and assignment lanes exist. | At least one independent reviewer should check core claims before public launch. |

## Evidence records

### Local runtime evidence

- [Windows node-operator test — 2026-08-27](windows-node-operator-test-2026-08-27.md)
- [Local BitcoinII node inspection — 2026-07-10](local-node-inspection-2026-07-10.md)
- [Local RPC enablement plan](local-rpc-enablement-plan.md)
- [Read-only RPC smoke test — 2026-07-10](read-only-rpc-smoke-test-2026-07-10.md)
- [Command testing status](command-testing.md)

### Release evidence

- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Release-artifact authentication — 2026-08-27](release-artifact-authentication-2026-08-27.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release source comparison](release-source-comparison.md)
- [Network release comparison](network-release-comparison.md)

### Ecosystem evidence

- [Public API, WebSocket, and Electrum smoke test — 2026-07-12](public-api-electrum-smoke-test-2026-07-12.md)
- [Explorers](../ecosystem/explorers.md)
- [APIs](../ecosystem/apis.md)
- [Exchanges](../ecosystem/exchanges.md)
- [Mining pools](../ecosystem/mining-pools.md)
- [Ecosystem direct check plan](ecosystem-direct-check-plan.md)

### Project identity and review evidence

- [Project identity source check — 2026-07-10](project-identity-source-check-2026-07-10.md)
- [Private review readiness](private-review-readiness.md)
- [Open questions backlog](open-questions.md)
- [Known unknowns](known-unknowns.md)

## Current interpretation

MoreBC2 now contains original, dated operational evidence rather than only planning frameworks. The strongest current evidence includes the tested Windows command-line node route, the earlier Windows mainnet RPC record, two same-time local-node/explorer/API tip matches, the nine-command smoke test, the public REST/WebSocket/Electrum smoke test, and the dated release/ecosystem observations.

The project is ready for narrow invite-only review. It is not ready for broad public launch because license, outside review, public contribution workflow, release-authentication infrastructure, wallet compatibility, broadcast behavior, and several service/operational questions remain unresolved.

## Update rule

When new evidence is added:

1. Link the dated record here.
2. Use the narrowest accurate status.
3. Keep maintainer conversation notes distinct from public primary sources.
4. Never upgrade a release or service to verified solely because it is expected or planned.
5. Re-date live-service claims when they are checked again.

## Verification

**Status:** Draft
**Primary sources checked:** MoreBC2 dated local node/RPC records, public API/WebSocket/Electrum smoke-test record, release inventory and verification records, ecosystem direct-check records, project identity source check, and private-review readiness documents
**Notes:** This is an evidence navigation page and status summary. It does not itself independently reproduce every linked check.
