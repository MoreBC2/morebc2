# Exchange Readiness Checklist

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This checklist is for preparing BitcoinII (BC2), or another native blockchain coin, for exchange and service-provider review.

It is intentionally conservative. A checked item should mean the information is current, source-backed, and ready to show to a service provider.

## Readiness levels

- **Ready:** Current, source-backed, and suitable for exchange use.
- **Draft:** Written but not ready to send.
- **Needs verification:** Exists somewhere but has not been checked recently.
- **Missing:** Not found.
- **Not applicable:** Does not apply to BC2.

## 1. Project identity

| Item | Status | Notes |
|---|---|---|
| Project name | Draft | Should match official project usage. |
| Ticker | Draft | Should be `BC2` unless official sources change. |
| Official website | Needs verification | Confirm current canonical domain before applications. |
| Official source repository | Needs verification | Current canonical public reference implementation is `Bitcoin-II/BitcoinII-Core`; recheck ownership/path before an application. |
| License | Needs verification | Confirm from repository license file. |
| Logo package | Missing | Needed in PNG/SVG, dark/light variants if possible. |
| Short project description | Draft | Should avoid hype and unverifiable claims. |
| Long project description | Draft | Should be reusable in exchange forms. |
| Public contact email | Needs verification | Should be controlled by project/team. |
| Technical contact process | Missing | Exchanges need a reliable integration contact. |

## 2. Chain and network facts

| Item | Status | Notes |
|---|---|---|
| Mainnet launch/genesis information | Draft | Must be source-backed. |
| Consensus algorithm | Draft | Should cite reviewed source files. |
| Proof-of-work hash path | Draft | Should cite reviewed source files. |
| Target block spacing | Draft | Should cite reviewed source files. |
| Difficulty adjustment | Draft | Should cite reviewed source files. |
| Subsidy and emission schedule | Draft | Should cite reviewed source files. |
| Maximum supply | Draft | Should cite reviewed source files. |
| Address formats | Draft | Should cite reviewed source files. |
| Mainnet P2P port | Draft | Should cite reviewed source files/config. |
| Mainnet RPC port | Draft | Should cite generated config or source. |
| DNS seeds / seed nodes | Draft | Confirm current operation before exchange use. |

## 3. Explorer and public infrastructure

| Item | Status | Notes |
|---|---|---|
| Block explorer URL | Needs verification | Required by many exchanges for native coins. |
| Explorer shows latest blocks | Needs verification | Check height and freshness. |
| Explorer supports transaction lookup | Needs verification | Useful for support teams. |
| Explorer supports address lookup | Needs verification | Useful for deposit tracing. |
| Explorer uptime checked | Needs verification | Do not submit stale explorer links. |
| Public node health information | Missing | Optional but useful. |
| Network status page | Missing | Optional but useful. |

## 4. Releases and software artifacts

| Item | Status | Notes |
|---|---|---|
| Current release identified | Needs verification | Recheck before any submission. |
| Release files available | Needs verification | Record platforms and filenames. |
| SHA256 checksums available | Needs verification | Needed for safe integration. |
| Signed checksum file | Needs verification | Strongly preferred. |
| Release signing key documented | Needs verification | Needed for exchange security review. |
| Build instructions | Draft | Should be tested or clearly labeled untested. |
| Reproducible build notes | Missing | Helpful for higher-quality review. |
| Upgrade procedure | Missing | Exchanges need software-update guidance. |
| Known release issues | Missing | Should be honest and current. |

## 5. Node and RPC integration

| Item | Status | Notes |
|---|---|---|
| Full-node setup instructions | Draft | Do not mark ready until tested. |
| Configuration example | Draft | Avoid unsafe RPC exposure. |
| Sync expectations | Missing | Exchanges need rough sync/storage expectations. |
| Pruning guidance | Missing | Exchanges may prefer archival nodes. |
| Backup guidance | Draft | Safety-critical; should be reviewed. |
| RPC authentication guidance | Draft | Must warn against public RPC exposure. |
| Firewall guidance | Missing | Useful for operators. |
| Monitoring guidance | Draft | Current exchange docs now include height, peers, tip age, difficulty/work, and chainwork as monitoring considerations. |

## 6. Deposit and transaction operations

| Item | Status | Notes |
|---|---|---|
| Address-generation notes | Draft | Needs final exchange architecture and tested operator examples. |
| Deposit monitoring method | Draft | Current guide covers wallet/non-wallet considerations but still needs chainwork examples. |
| Confirmation recommendation | Draft / provisional | MoreBC2 currently uses 50 confirmations as a provisional normal-deposit baseline, grounded in 2026-09-12 direct exchange evidence. Not a protocol rule or finality guarantee. |
| Reorg handling guidance | Draft | Current deposit guide includes rollback/hold behavior; concrete alert thresholds remain open. |
| Transaction creation notes | Draft | Current v31.1.0 PSBT workflow has isolated runtime evidence; production exchange flow remains separate. |
| Broadcast notes | Draft | Invalid public broadcast rejection and local submission are tested; valid public BC2 broadcast remains untested. |
| Failed transaction recovery notes | Missing | Helpful for support. |
| Custody architecture notes | Missing | Keep high-level unless reviewed by maintainers/operators. |

See [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md) and [Deposit monitoring](deposit-monitoring.md).

## 7. RPC documentation package

| Item | Status | Notes |
|---|---|---|
| Read-only RPC list | Draft | Separate from transaction-producing commands. |
| Wallet RPC list | Draft | Mark risky commands clearly. |
| Blockchain RPC list | Draft | Useful for monitoring. |
| Raw transaction RPC list | Draft | Useful for transaction flow. |
| Mempool/broadcast RPC list | Draft | Useful for transaction flow. |
| Tested command examples | Draft | Current v31.1.0 node/RPC evidence exists; exchange-facing command packaging remains incomplete. |
| Error examples | Missing | Helpful for integration teams. |

## 8. Security and trust package

| Item | Status | Notes |
|---|---|---|
| Responsible disclosure process | Missing | Exchanges may ask where to report issues. |
| Known vulnerability list | Missing | Should be honest if unknown. |
| Dependency/update policy | Missing | Useful for service providers. |
| Release verification policy | Draft | Should align with actual release artifacts. |
| Security review notes | Missing | If none, say none found rather than imply audit. |
| False-claim review | Draft | Remove hype and unsupported claims before submission. |

## 9. Community and market evidence

| Item | Status | Notes |
|---|---|---|
| Official X/Twitter | Needs verification | Required by some exchanges. |
| Discord | Needs verification | Required by some exchanges. |
| Telegram | Needs verification | Required by some exchanges. |
| Reddit | Needs verification | Optional but useful. |
| YouTube/media links | Needs verification | Optional; avoid influencer-only framing. |
| Community size snapshot | Missing | Record date and source. |
| Existing exchanges/services | Draft | Direct current observations now exist for CoinEx, NonKYC, NestEx, and Biconomy; recheck before submission. |
| Market data pages | Needs verification | CoinGecko/CMC/etc., if applicable. |

## 10. Submission workflow

| Item | Status | Notes |
|---|---|---|
| Exchange target list | Draft | See [Exchange Listing Target Matrix](exchange-listing-targets.md). |
| Listing packet template | Draft | See [Exchange Listing Packet Template](listing-packet-template.md). |
| Submission tracker | Missing | Track date, contact, response, requested changes. |
| Standard intro email | Missing | Should be short and professional. |
| Technical follow-up template | Missing | Useful after first exchange response. |
| Review owner | Missing | Assign a maintainer or community coordinator. |

## Blocking issues before exchange submission

Do not send a final BC2 listing packet until these are resolved or explicitly labeled:

- Current official release and release-verification status.
- Current block explorer status.
- Canonical technical contact process.
- Current official website and repository links.
- Safe, tested or clearly labeled node setup notes.
- Provisional confirmation baseline plus chainwork/risk caveats.
- Current community links.
- Logo/branding package.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 exchange documentation structure, current v31.1.0 runtime/source evidence, and 2026-09-12 direct exchange confirmation observations
**Notes:** This checklist is not a claim that BC2 is exchange-ready. The confirmation-policy item has advanced from Missing to Draft/provisional, while custody architecture, contact process, and several submission assets remain unresolved.