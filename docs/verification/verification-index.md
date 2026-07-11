# Verification evidence index

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-07-10

## Purpose

This page is the quickest way to see what MoreBC2 has directly observed, locally tested, source-reviewed, or left unresolved.

Status terms on this page are deliberately narrow:

- **Locally tested** means a command or behavior was actually exercised in a documented local environment.
- **Directly observed** means a current public page, API, release, repository, or service was checked and dated.
- **Source-reviewed** means relevant source or project-controlled metadata was reviewed.
- **Partial** means useful evidence exists but one or more important claims remain open.
- **Unavailable / planned** means the evidence path does not currently exist but may be added later.

This index does not make MoreBC2 public-ready and does not convert Draft pages into verified instructions.

## Current evidence snapshot

| Area | Status | Evidence | Remaining limit |
|---|---|---|---|
| Canonical public implementation | Source-reviewed | `Bitcoin-II/BitcoinII-Core` is described by project-controlled GitHub metadata as the canonical reference implementation. See [project identity source check](project-identity-source-check-2026-07-10.md). | Maintainer confirmation remains useful if ownership or repository structure changes. |
| Project name and ticker | Strong partial | Project-controlled source/UI/repository material uses BitcoinII and `BC2`. | A simple explicit maintainer statement would be the cleanest primary ticker source. |
| Current release metadata | Directly observed | `v29.1.0` release metadata, uploaded assets, generated source archives, tag target, and commit-signature metadata were recorded. | Release files were not independently hashed or authenticated. |
| Release binary signatures | Unavailable / planned | No uploaded checksum manifest, detached signature, signed annotated tag, or trusted BitcoinII release-key path was found for `v29.1.0`. The project maintainer has told the repository owner that releases/signatures are on the roadmap but are not implemented yet. | Treat this as maintainer-supplied context, not published cryptographic evidence. Update when public signing material exists. |
| Local BitcoinII node | Locally tested | BitcoinII Core `v29.1.0` GUI node inspected on Windows mainnet with working localhost-only RPC. See [local node inspection](local-node-inspection-2026-07-10.md). | This is one Windows/mainnet environment, not cross-platform proof. |
| Local-only RPC setup | Locally tested | RPC bound to `127.0.0.1:8337`; no public or LAN bind was observed. Cookie authentication was used without publishing credentials. | Configuration behavior should be rechecked on future releases. |
| Explorer tip comparison | Directly compared | Local node and `bitcoinii.ddns.net` explorer matched at height `57,420` and the same tip hash within about eight seconds on 2026-07-10. | This is a dated point-in-time agreement, not a permanent reliability or official-status claim. |
| Read-only RPC commands | Locally tested | Nine commands passed: `getblockcount`, `getbestblockhash`, `getblockchaininfo`, `getnetworkinfo`, `getconnectioncount`, `getpeerinfo`, `getmempoolinfo`, `getdifficulty`, and `uptime`. See [RPC smoke test](read-only-rpc-smoke-test-2026-07-10.md). | `getpeerinfo` and some network output require redaction before publication. Live values are examples only. |
| Explorer/API availability | Directly observed | Public explorer pages and harmless GET endpoints for tip, block, transaction, address, and mempool summary were checked. | Formal API documentation, long-term stability, and official ownership remain unconfirmed. |
| Exchange listings | Directly observed / partial | Direct public pages were observed for NonKYC and CoinEx; NestEx remained unconfirmed. | Account-gated deposits, withdrawals, trading, liquidity, region availability, and reliability were not tested. |
| Mining/network statistics | Directly observed / partial | MiningPoolStats BitcoinII page was observed and matched the explorer height during the check. | This does not verify individual mining pools, payout behavior, fees, or reliability. |
| Network/P2P source posture | Strong partial | Source Atlas entries, release comparison, selected blob checks, test coverage map, and test-run plan exist. | Full runtime test execution and broader live-network behavior remain open. |
| Command-safety wording | Reviewed for narrow private use | Command-shaped examples were audited and key state-changing warnings were added. | Outside reviewer confirmation is still needed before broad publication. |
| License and public reuse | Blocked | Private-review posture is documented. | Final MoreBC2 license and public contribution workflow are undecided. |
| Outside technical review | Not started | Narrow review packets and assignment lanes exist. | At least one independent reviewer should check core claims before public launch. |

## Evidence records

### Local runtime evidence

- [Local BitcoinII node inspection — 2026-07-10](local-node-inspection-2026-07-10.md)
- [Local RPC enablement plan](local-rpc-enablement-plan.md)
- [Read-only RPC smoke test — 2026-07-10](read-only-rpc-smoke-test-2026-07-10.md)
- [Command testing status](command-testing.md)

### Release evidence

- [Release asset inventory attempt](release-asset-inventory-attempt.md)
- [Release artifact checklist](release-artifact-checklist.md)
- [Release source comparison](release-source-comparison.md)
- [Network release comparison](network-release-comparison.md)

### Ecosystem evidence

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

MoreBC2 now contains original, dated operational evidence rather than only planning frameworks. The strongest current evidence is the Windows mainnet RPC record, the same-time local-node/explorer tip match, the nine-command smoke test, and the dated release/ecosystem observations.

The project is ready for narrow invite-only review. It is not ready for broad public launch because license, outside review, public contribution workflow, release-authentication infrastructure, and several service/operational questions remain unresolved.

## Update rule

When new evidence is added:

1. Link the dated record here.
2. Use the narrowest accurate status.
3. Keep maintainer conversation notes distinct from public primary sources.
4. Never upgrade a release or service to verified solely because it is expected or planned.
5. Re-date live-service claims when they are checked again.

## Verification

**Status:** Draft
**Primary sources checked:** MoreBC2 dated local node/RPC records, release inventory and verification records, ecosystem direct-check records, project identity source check, and private-review readiness documents
**Notes:** This is an evidence navigation page and status summary. It does not itself independently reproduce every linked check.