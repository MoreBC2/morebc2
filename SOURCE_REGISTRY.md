# MoreBC2 Source Registry

**Status:** Reviewed
**Facts synchronized:** 2026-09-12

This registry helps contributors choose appropriate sources for BitcoinII (BC2) documentation.

It does not prove that every listed source is complete, permanently available, or authoritative for every kind of claim. Source authority is **claim-specific**: current BitcoinII source is strongest for protocol behavior, while an exchange's own API is strongest for that exchange's current operational policy.

## Source strength and scope

| Source type | Strongest use | Important boundary |
|---|---|---|
| Current / release-pinned BitcoinII source | Consensus, network parameters, wallet/node behavior, implementation details | Source presence does not by itself prove live runtime behavior. |
| Official BitcoinII release metadata | Version, release date, release notes, asset inventory | Asset existence or GitHub digest metadata is not the same as publisher-authenticated binary provenance. |
| Official BitcoinII website / repositories | Project-controlled links, public positioning, user-facing resources | Website technical text can lag the current release; prefer release-pinned source for current protocol facts. |
| Direct explorer / public-service observation | Dated chain, API, WebSocket, Electrum, or service behavior | Point-in-time reachability is not uptime, independence, or an SLA. |
| Local test record | Dated behavior in the exact recorded environment | Do not generalize beyond the tested version, network, platform, and setup. |
| Service or exchange's own API/docs | That service's own status, policy, or configuration | It is not authority for BitcoinII consensus behavior. |
| Developer / maintainer statement | Intent, clarification, historical context | A statement is not implemented behavior unless implementation evidence exists. |
| Community discussion | Questions, proposals, historical context | Do not present as implementation. |
| Third-party summary / aggregator | External context and discovery | Recheck against a stronger or direct source when possible. |

## BitcoinII source code

Current canonical public reference implementation used by MoreBC2:

- https://github.com/Bitcoin-II/BitcoinII-Core

Current-facing technical documentation is pinned to BitcoinII Core `v31.1.0` unless a page explicitly says otherwise.

The older `BitcoinII-Dev/BitcoinII` path is retained only for historical provenance, migration/redirect history, archived evidence, and older version-scoped records. It should not be used as the current operational source.

## BitcoinII releases

Current release page:

- https://github.com/Bitcoin-II/BitcoinII-Core/releases

Current documented release:

- `v31.1.0`
- Published: `2026-08-29T02:39:30Z`
- Tag target commit: `8daaf7b12e71d3646eed787f040bf2899a69dc1c`

Current release-authentication evidence is deliberately split into separate claims:

- GitHub exposes SHA-256 digest metadata for six recorded `v31.1.0` release assets.
- `v31.1.0` is a lightweight tag pointing to the commit above.
- GitHub reports that target commit as cryptographically verified with a valid signature.
- MoreBC2 has **not** established a standalone maintainer-signed checksum manifest, detached signatures for every binary, a documented release-signing-key process, or reproducible-build proof.

See [BitcoinII Core v31.1.0 release assets](docs/releases/v31.1.0-assets.md).

## BitcoinII website

Current project website:

- https://bitcoin-ii.org/

Use it for project-controlled links, user-facing information, and ecosystem navigation. Do not automatically use older website technical references as the authority for post-v31 consensus behavior when release-pinned source differs or is newer.

## Explorers and public infrastructure

The current dated explorer hierarchy is:

1. `https://bitcoinii.ddns.net/explorer/` — Official BitcoinII Explorer.
2. `https://explorer.bitcoin-ii.org` — project-linked by domain, independently run/community-funded; footer identifies CapsPool.io infrastructure.
3. `https://bc2mempool.com` — supplemental public explorer/API service.
4. `https://bc2.live` — supplemental public explorer/frontend.

A 2026-09-11 direct smoke test found current REST/WebSocket behavior across these services and same-tip agreement during the comparison window. The three Mempool-style hostnames showed closely aligned behavior, so separate hostnames must not be counted automatically as independent redundancy providers.

Electrum read-only reachability was directly observed on 2026-09-11 at:

- `infra1.bitcoin-ii.org:50008` — TCP
- `infra1.bitcoin-ii.org:50009` — TLS

That test established read-only protocol reachability, not broad wallet compatibility, spending/broadcast support, or custody-grade reliability.

See [Public infrastructure smoke test — 2026-09-11](docs/verification/public-infrastructure-smoke-test-2026-09-11.md) and [Explorers](docs/ecosystem/explorers.md).

## Exchanges and other services

For an exchange's own confirmation count, deposit/withdrawal state, or listing requirement, its direct API or official documentation can be primary evidence **for that service's policy**.

It remains third-party evidence relative to BitcoinII protocol behavior.

Current-dated BC2 exchange confirmation evidence is recorded separately so changing exchange policy is not confused with protocol constants:

- CoinEx: `2` safe / `6` exchange-defined `irreversible` confirmations.
- NonKYC: `50` required confirmations.
- NestEx: explicit BC2 backend `conf = 50`.
- Biconomy: listing established; current confirmation count remains unresolved.

See [Exchange confirmation evidence — 2026-09-12](docs/verification/exchange-confirmation-evidence-2026-09-12.md).

## Community and social sources

Community channels are useful for discovery, discussion, historical context, and maintainer statements, but they should not be promoted to implementation evidence without stronger support.

Project-controlled social/community links should be rechecked immediately before reuse in a listing packet or other time-sensitive document.

## Citation pattern

When adding source-backed technical claims, record enough context to reproduce the check:

- repository or service;
- ref, version, date, or observation window;
- file path or endpoint;
- relevant section, line, field, or returned value where practical;
- what the evidence proves and what it does not prove.

Example:

> Source checked: `Bitcoin-II/BitcoinII-Core`, tag `v31.1.0`, `src/kernel/chainparams.cpp`, reviewed 2026-09-12.

## Open source-registry tasks

- Monitor the canonical repository and release path for future changes.
- Capture and periodically recheck project-controlled Discord and X destinations.
- Establish whether an official project-controlled Telegram or Reddit presence exists before labeling either official.
- Keep mining-pool and service observations current and dated.
- Keep explorer/API independence, uptime, and valid-public-broadcast questions separate from simple reachability.
- Update this registry when a new BitcoinII Core release becomes the current baseline.

## Verification

**Status:** Reviewed
**Primary sources checked:** Current MoreBC2 v31.1.0 release/source records, 2026-09-11 public-infrastructure evidence, and 2026-09-12 exchange evidence
**Notes:** Facts synchronized on 2026-09-12. Time-sensitive services still require a fresh direct check before they are presented as currently active.