# BitcoinII Project Overview

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

BitcoinII is a peer-to-peer proof-of-work cryptocurrency network, and BitcoinII Core is the current public reference implementation used to participate in that network.

This page separates project-controlled identity/resources from protocol facts. For current technical behavior, release-pinned BitcoinII Core source takes priority over older website prose when the two differ.

## Project identity

- Project name: **BitcoinII**
- Current formatted currency unit / ticker in BitcoinII Core source: **BC2**
- Current atomic unit label in source: **sat2**
- Current canonical public reference-implementation repository: https://github.com/Bitcoin-II/BitcoinII-Core
- Current documented Core release: `v31.1.0`
- Current project website: https://bitcoin-ii.org/

The older MoreBC2 question about whether `BC2` had a primary-source anchor is now resolved: current BitcoinII Core source defines `CURRENCY_UNIT = "BC2"` and `CURRENCY_ATOM = "sat2"`.

## BitcoinII Core

BitcoinII Core provides the node software used to connect to the BitcoinII peer-to-peer network, validate blocks and transactions, and optionally provide wallet/GUI functionality.

Current `v31.1.0` source and release material contain BitcoinII-specific behavior beyond inherited Bitcoin architecture, including:

- ShockWave per-block difficulty adjustment;
- replay-protection signature domains;
- consensus data restrictions;
- fork-aware header synchronization;
- associated wallet, PSBT, mempool, mining, RPC, and validation changes.

Because of those changes, current documentation should not describe BitcoinII merely as an unchanged Bitcoin clone.

## Bitcoin Core lineage

BitcoinII source retains Bitcoin Core lineage and substantial inherited architecture.

That lineage is useful when reading the codebase, but compatibility must be claim-specific. Bitcoin-like addresses, RPC names, transaction structures, or PSBT concepts do not automatically imply current Bitcoin compatibility after BitcoinII-specific consensus/signing changes.

See [Compatibility](../compatibility/README.md).

## License

BitcoinII Core is distributed under the MIT license according to the repository/source materials.

## Current project-controlled resources

The BitcoinII project website currently links or exposes navigation to:

- BitcoinII Core source/releases;
- the project whitepaper;
- the Official BitcoinII Explorer;
- a node map;
- mining-pool discovery;
- Discord;
- the Bitcoin-II GitHub organization;
- X / `@TheBitcoinIIOrg`;
- wallet resources.

MoreBC2 treats those project-controlled links as strong evidence for **project navigation and public positioning**, not automatically as the strongest authority for current protocol details.

## Website currentness caution

The project website remains useful, but portions of its technical prose were still stale relative to `v31.1.0` when rechecked on 2026-09-12.

Examples include older RPC-oriented material and pre-ShockWave 2016-block difficulty wording.

For current consensus/network behavior, use release-pinned source and current MoreBC2 technical pages rather than copying older website text verbatim.

## Wallet-label caution

Project-controlled and wallet-project sources can disagree.

A current example is Genesis Wallet: the BitcoinII website calls it the official Android wallet, while the Genesis Wallet repository describes itself as independent and not affiliated with the BitcoinII Organization.

MoreBC2 records that conflict instead of silently choosing one label.

See [Wallets](../ecosystem/wallets.md).

## Current technical/contact boundary

MoreBC2 has a verified source-commit author email from current Core provenance and the canonical GitHub issue tracker is available, but a maintainer-published canonical **security/integration contact process** has not yet been established strongly enough for MoreBC2 to present one as definitive.

Do not invent or imply official representation when contacting wallets, exchanges, or service providers. MoreBC2 is an independent source-backed documentation project.

## Historical repository paths

Older MoreBC2 material observed legacy or redirected repository paths such as:

- `BitcoinII-Dev/BitcoinII`

Those should remain historical provenance only. Current operational source/release citations use:

- `Bitcoin-II/BitcoinII-Core`

## Related pages

- [What is BitcoinII?](what-is-bitcoinii.md)
- [Network specifications](network-specifications.md)
- [Consensus overview](consensus-overview.md)
- [Releases](releases.md)
- [Source Registry](../../SOURCE_REGISTRY.md)
- [Ecosystem resources](../ecosystem/resources.md)
- [Wallets](../ecosystem/wallets.md)
- [Compatibility](../compatibility/README.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` source/release path, current BitcoinII project website/resources, MoreBC2 Source Registry, current ecosystem/wallet evidence  
**Notes:** Project name, `BC2`/`sat2` source units, canonical repository/release path, and current project-controlled resource links are established. A canonical maintainer-published technical/security integration-contact process remains unresolved, and conflicting wallet-status labels are preserved explicitly.
