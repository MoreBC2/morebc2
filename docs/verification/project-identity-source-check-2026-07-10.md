# BitcoinII project identity source check — 2026-07-10

**Category:** Verification record  
**Status:** Partial  
**Date checked:** 2026-07-10

## Summary

This record checks primary public sources for the BitcoinII canonical repository, project website, ticker evidence, public project contact paths, and explorer ownership/status language.

The check supports treating `Bitcoin-II/BitcoinII-Core` as the canonical public reference-implementation repository. It also identifies organization-controlled public channels and strong `BC2` ticker usage, but it does not establish a dedicated technical-support contact or independently prove that the public explorer is operated by the same maintainers.

## Canonical repository

Checked:

- `https://github.com/Bitcoin-II/BitcoinII-Core`
- `https://github.com/Bitcoin-II`

Observed:

- The repository description says: `BitcoinII-Core Source Code (Canonical Reference Implementation of the BitcoinII Blockchain)`.
- The Bitcoin-II GitHub organization lists `BitcoinII-Core` as its first popular repository with the same canonical-reference description.
- The repository README links the project website and identifies the tree as the BitcoinII Core integration/staging tree.
- The repository publishes the observed current release `v29.1.0`.

**Conclusion:** MoreBC2 may treat `https://github.com/Bitcoin-II/BitcoinII-Core` as the current canonical public reference-implementation repository, while still recording that repository ownership or maintainer structure can change over time.

## Official website

Observed organization/repository website link:

```text
https://Bitcoin-II.org
```

The GitHub organization and canonical repository both link this domain.

**Conclusion:** This is the strongest currently observed project-controlled website link.

## Ticker evidence

Primary/project-controlled observations include:

- The public BitcoinII Explorer displays `BC2` as its currency unit.
- The Bitcoin-II organization hosts a repository named `wallet-bc2`.
- BitcoinII source/UI material previously reviewed by MoreBC2 uses BC2 units.

**Conclusion:** `BC2` has strong project-controlled usage and is suitable as the documented ticker with an evidence note. No single reviewed page in this check contained a standalone formal sentence equivalent to “the official ticker is BC2,” so maintainer confirmation would still strengthen the record.

## Public project contact paths

The Bitcoin-II GitHub organization publicly links:

- Website: `https://Bitcoin-II.org`
- X account: `@TheBitcoinIIOrg`
- Discord invitation
- Telegram: `BitcoinIIOrganization`
- Reddit: `r/BitcoinII`

The organization has no public members listed.

**Conclusion:** These are project-controlled public community/contact paths. This check did not find a dedicated integration-support email, named technical contact, or service-provider contact page.

## Security contact caveat

The canonical repository's `SECURITY.md` still points to Bitcoin Core's lifecycle page, Bitcoin Core's security email, and Bitcoin Core developer keys.

This appears inherited from upstream and should not be treated as a valid BitcoinII vulnerability-reporting or technical-support route without explicit maintainer confirmation.

## Explorer status language

The public explorer at:

```text
https://bitcoinii.ddns.net/explorer/
```

states `Official Explorer for the BitcoinII network` and displays BC2-denominated network data.

MoreBC2 has separately recorded a same-time height and tip-hash match between this explorer and a local BitcoinII Core v29.1.0 node on 2026-07-10.

**Conclusion:** The explorer's official-status claim is directly observed and its chain tip matched a local node during a dated check. Independent maintainer confirmation of ownership/operation remains open.

## What this record supports

- `Bitcoin-II/BitcoinII-Core` is the current canonical public reference-implementation repository.
- `Bitcoin-II.org` is the strongest currently observed project-controlled website link.
- `BC2` has strong project-controlled ticker/unit usage.
- The Bitcoin-II GitHub organization exposes public community contact channels.
- The explorer publicly claims official status and passed one dated same-time local-node comparison.

## What remains unresolved

- Dedicated technical/integration support contact.
- Dedicated BitcoinII vulnerability-reporting route.
- Named public maintainers or organization members.
- Independent confirmation that the explorer is operated by the canonical project maintainers.
- A standalone formal maintainer statement explicitly declaring `BC2` as the official ticker.

## Sources checked

- Bitcoin-II GitHub organization profile
- `Bitcoin-II/BitcoinII-Core` repository page and README
- `Bitcoin-II/BitcoinII-Core` release page for `v29.1.0`
- `Bitcoin-II/BitcoinII-Core` `SECURITY.md`
- BitcoinII Explorer public page
- Existing MoreBC2 explorer and local-node verification records

## Verification

**Status:** Partial  
**Notes:** Canonical repository status is supported by explicit organization/repository descriptions. Ticker, contact, and explorer-officiality findings remain carefully scoped to observed project-controlled usage and public claims.