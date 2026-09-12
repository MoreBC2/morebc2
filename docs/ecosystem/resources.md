# Resources

**Category:** Ecosystem
**Status:** Reviewed / Partial directory
**Last reviewed:** 2026-09-12

## Summary

This page tracks useful BitcoinII (BC2) project and ecosystem resources that do not fit cleanly into a single exchange, explorer, pool, or wallet entry.

A listed resource is not automatically endorsed. Each entry states what MoreBC2 directly observed and what remains outside scope.

## BitcoinII project website

**Status:** Active, dated check  
**Official:** Yes — project-controlled website  
**Type:** Project portal / documentation / links  
**URL:** https://bitcoin-ii.org/  
**Last checked:** 2026-09-12

The site currently links the BitcoinII Core source/release path, explorer, node map, whitepaper, mining-pool directory, Discord, GitHub organization, X account, and wallet resources.

Important currentness warning: portions of the website remain technically stale relative to BitcoinII Core `v31.1.0`. In particular, the public RPC reference is still v29-oriented and the homepage still contains pre-ShockWave 2016-block difficulty-retarget wording. Project-controlled does not mean every technical statement is current.

## BitcoinII Core repository

**Status:** Active source/release resource  
**Official:** Yes  
**Type:** Source code / releases / issue tracker  
**URL:** https://github.com/Bitcoin-II/BitcoinII-Core  
**Current release baseline:** `v31.1.0`  
**Last checked:** 2026-09-12

For protocol and implementation facts, MoreBC2 prefers release-pinned source over older prose descriptions.

Release provenance and authentication limits are tracked separately under [Releases](../releases/README.md).

## Official BitcoinII Explorer and API documentation

**Status:** Active, dated check  
**Official:** Yes — explorer identifies itself as the Official BitcoinII Explorer  
**Type:** Explorer / node/network tools / public API documentation  
**URL:** https://bitcoinii.ddns.net/explorer/  
**API docs:** https://bitcoinii.ddns.net/explorer/api/docs  
**Last checked:** 2026-09-12

The explorer exposes block, transaction, mempool, mining, supply, UTXO-statistics, peer, node-details, and API tooling. Current MoreBC2 endpoint behavior is recorded in [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

The explorer/API is useful for observation and cross-checking but should not replace an operator's own node for critical custody workflows.

## BitcoinII node map

**Status:** Project-linked resource / Direct current content not fully re-audited in this pass  
**Official:** Project-linked  
**Type:** Network visualization  
**URL:** https://bitcoinii.ddns.net/NodeMap.html  
**Last checked:** 2026-09-12 for project linkage

The current BitcoinII website links a Node Map as a network resource. MoreBC2 should treat displayed node counts, geography, and connectivity metrics as time-sensitive visualization data requiring their own methodology review before making comparative decentralization claims.

## MiningPoolStats BitcoinII directory

**Status:** Active aggregator / Discovery resource  
**Official:** No  
**Type:** Mining-pool/statistics directory  
**URL:** https://miningpoolstats.stream/bitcoinii  
**Last checked:** 2026-09-12

The BitcoinII project website currently directs miners to MiningPoolStats to view available pools.

Use it to discover candidate pools, not as proof that a pool is reachable, synchronized, independently operated, or paying correctly. Direct pool evidence belongs in [Mining pools](mining-pools.md).

## `Bitcoin-II/wallet-bc2`

**Status:** Observed source project  
**Official:** Hosted in the Bitcoin-II GitHub organization; recommendation status not established  
**Type:** Web-wallet source / utility  
**URL:** https://github.com/Bitcoin-II/wallet-bc2  
**Last checked:** 2026-09-12

The repository documents a browser-based BC2 wallet with client-side key/signing functionality, node-backed API access, multiple address types, and additional on-chain messaging features.

MoreBC2 has not run or security-audited it. See [Wallets](wallets.md) for the wallet-specific evidence boundary.

## Genesis Wallet

**Status:** Observed early-access community wallet resource  
**Official:** Conflicting public labels; see Wallets  
**Type:** Android wallet source / website  
**Source:** https://github.com/GenesisWalletOrg/GenesisWallet  
**Website:** https://genesiswallet.org/  
**Last checked:** 2026-09-12

Genesis Wallet's repository describes it as independent and not affiliated with the BitcoinII Organization, while the BitcoinII project website calls it the official Android wallet. MoreBC2 records that disagreement rather than choosing one label without reconciliation.

See [Wallets](wallets.md).

## Tangem BitcoinII asset page

**Status:** Active information page / BitcoinII network temporarily unsupported  
**Official:** Third-party provider  
**Type:** Asset-information / wallet-integration status  
**URL:** https://tangem.com/en/cryptocurrencies/bitcoinii/  
**Last checked:** 2026-09-12

Tangem currently has a BitcoinII (BC2) asset page but states that BitcoinII network support is **temporarily not supported**. Do not treat the presence of the page as evidence that native BC2 storage/signing is currently available.

## Public community and communication links

The current BitcoinII project website exposes links for:

- Discord;
- GitHub organization;
- X / `@TheBitcoinIIOrg`;
- project whitepaper;
- node map;
- explorer;
- Core wallet/source.

These are useful navigation resources. Community statements remain attribution-level evidence unless independently supported by source, runtime, or service-specific observations.

## Resource-quality rules

Before adding or promoting a resource:

- check that the URL is reachable;
- identify whether it is project-controlled, third-party, or community-run;
- distinguish source availability from runtime compatibility;
- record the date;
- preserve any disagreement between project-controlled and project-specific sources;
- avoid turning marketing copy into technical verification;
- move detailed wallet, explorer, API, pool, or exchange claims to the specific ecosystem page.

## Related pages

- [Ecosystem index](README.md)
- [Wallets](wallets.md)
- [Explorers](explorers.md)
- [APIs](apis.md)
- [Mining pools](mining-pools.md)
- [Exchanges](exchanges.md)
- [Developers](../developers/README.md)
- [Verification evidence index](../verification/verification-index.md)

## Verification

**Status:** Reviewed / Partial directory
**Primary sources checked:** Current BitcoinII project website; BitcoinII Core repository/release baseline; Official BitcoinII Explorer/API docs; current MiningPoolStats linkage; `Bitcoin-II/wallet-bc2`; Genesis Wallet repository; Tangem BC2 asset page
**Notes:** This directory records directly observed resources and their evidence boundaries. It is not a recommendation list and does not duplicate detailed compatibility or security testing from the specialized pages.