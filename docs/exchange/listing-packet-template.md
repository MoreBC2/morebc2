# Exchange Listing Packet Template

**Category:** Template
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This is a BC2-focused template for preparing an exchange listing or native-asset integration packet.

Stable, source-backed BitcoinII values are prefilled where practical. Time-sensitive service, release, contact, community, legal, and applicant-authority fields still need to be rechecked immediately before submission.

Do not send this template as-is.

## Applicant status block

```text
Project: BitcoinII
Ticker: BC2
Packet version: YYYY-MM-DD
Prepared by: [name]
Relationship to project: [maintainer / authorized representative / independent contributor / other]
Submission authority: [describe permission if the exchange requires project-team authorization]
Technical contact: [official or maintainer-approved contact/process]
Status: Draft / Ready for private review / Ready for submission
```

MoreBC2 is an independent documentation project and must not be presented as the BitcoinII project team. If an exchange requires an official-team applicant or project-owner information, obtain authorization before submission.

## Executive summary

Suggested neutral language:

```text
BitcoinII (BC2) is a native SHA-256 Proof-of-Work blockchain with a clean genesis and a 21 million maximum supply. The current BitcoinII Core v31.1.0 release uses a 10-minute target block interval and ShockWave per-block difficulty adjustment on mainnet from height 57,750.

This packet provides current project identity, network, release, explorer, and integration information for native-chain review.
```

Avoid price predictions, investment-return language, unsupported security claims, unsupported partnerships, or claims that MoreBC2 represents maintainers unless that is actually true.

## Project identity

| Field | Current BC2 value | Source / note |
|---|---|---|
| Project name | BitcoinII | Current project/source usage. |
| Ticker | `BC2` | Source-confirmed in BitcoinII Core v31.1.0. |
| Website | https://bitcoin-ii.org/ | Recheck before submission. |
| Source repository | https://github.com/Bitcoin-II/BitcoinII-Core | Canonical public reference implementation used by MoreBC2. |
| Release page | https://github.com/Bitcoin-II/BitcoinII-Core/releases | Recheck latest release immediately before submission. |
| Current documented release | `v31.1.0` | Published 2026-08-29. |
| Official explorer | https://bitcoinii.ddns.net/explorer/ | Current-dated reachability evidence exists. |
| Project-linked explorer | https://explorer.bitcoin-ii.org | Independently run/community-funded; not the same classification as the official explorer. |
| License / source-use status | See integration-package licensing note | Do not reduce the v31 ShockWave source notice to a blanket MIT claim. |
| Technical contact | [official/maintainer-approved process] | Not yet canonically established by MoreBC2. |

## Technical overview

| Field | Current BC2 value | Source / note |
|---|---|---|
| Chain type | Native blockchain coin | Not a contract token. |
| Consensus | SHA-256 Proof of Work | Source-backed. |
| Target block spacing | 10 minutes | Source-backed. |
| Difficulty adjustment | ShockWave per block from mainnet height `57,750` | Historical pre-activation behavior should not be presented as current. |
| Maximum supply | 21,000,000 BC2 | `MAX_MONEY = 21000000 * COIN`. |
| Base unit | 100,000,000 base units per BC2 | `COIN = 100000000`. |
| Subsidy halving interval | 210,000 blocks | Source-backed. |
| Mainnet P2P port | `8338` | Chain-parameter authority. |
| Mainnet RPC default | `8332` | Operator-configurable. |
| P2PKH / P2SH | prefixes `0` / `5` | Bitcoin-like address overlap is intentional. |
| Bech32 HRP | `bc` | Source-backed. |
| Replay protection | active from height `57,750`; domain/fork ID `0x01324342` | Important because address encodings overlap Bitcoin. |
| Genesis hash | `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb` | Source-backed. |
| DNS seed | `dnsseed.bitcoin-ii.org.` | Release-pinned chain parameter; recheck live availability separately if required. |

Use [Exchange integration package](integration-package.md) for the maintained technical source list and caveats.

## Release information

Current packet baseline as of 2026-09-12:

| Field | Current status | Source / note |
|---|---|---|
| Current release | `v31.1.0` | Published 2026-08-29. Recheck before sending. |
| Release platforms | Linux CLI/Qt, Windows CLI/Qt, macOS x86_64/arm64 | Six current uploaded assets recorded. |
| SHA-256 metadata | Available from GitHub release asset metadata | Exact values are maintained in the integration package/release record. |
| Release tag | lightweight `v31.1.0` tag | Points to commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`. |
| Commit verification | GitHub reports target commit verified with a valid signature | Useful provenance evidence, not binary reproducibility proof. |
| Standalone signed checksum manifest | Not established by MoreBC2 | Do not claim one exists without a current source. |
| Detached binary signatures | Not established by MoreBC2 | Do not overstate. |
| Reproducible-build proof | Not established by MoreBC2 | Remains open. |

## Explorer and network status

Fill this immediately before submission rather than copying an old height:

| Field | Value | Source / note |
|---|---|---|
| Official explorer reachable | [Yes/No + timestamp] | Use direct current check. |
| Latest checked height | [height] | Record exact time/source. |
| Latest checked block time | [time] | Record exact time/source. |
| Transaction lookup | [Yes/No + tested URL] | Current MoreBC2 evidence exists; recheck at submission. |
| Address lookup | [Yes/No + tested URL] | Recheck at submission. |
| Network producing blocks | [Yes/No + source] | Do not rely on a stale screenshot. |
| Public fallback services | [list] | Do not imply backend independence unless established. |

## Deposit and confirmation policy

Current MoreBC2 guidance uses **50 confirmations as a provisional normal-deposit baseline**.

Evidence recorded on 2026-09-12 includes NonKYC and NestEx explicitly using 50 confirmations, while CoinEx uses a materially more aggressive 2/6 staged policy. Biconomy's count was not publicly verified.

Packet wording should make clear that:

- 50 is MoreBC2 operational guidance, not a BitcoinII consensus rule or maintainer mandate;
- CoinEx's `irreversible` label is exchange terminology, not mathematical finality;
- BC2 chain selection uses accumulated work and ShockWave changes required work per block;
- large or unusual deposits may require longer or manual holds based on current chainwork, tip health, work rate, reorganization activity, transaction value, and account risk;
- MoreBC2 does not currently prescribe a universal automatic 100-confirmation second tier.

See [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md) and [Deposit monitoring](deposit-monitoring.md).

## Integration evidence to attach or link

Recommended packet attachments/links:

- [Exchange integration package](integration-package.md)
- [Exchange operator guide](operator-guide.md)
- [Deposit monitoring](deposit-monitoring.md)
- [Service integration checklist](service-integration-checklist.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)
- [v31.1.0 Windows node/RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [v31.1.0 PSBT/replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Public infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md)

Label the limits of each test. Local/regtest evidence is not the same as a production custody runbook.

## Community and ecosystem

Recheck these fields before every submission:

| Field | Value | Note |
|---|---|---|
| X/Twitter | [current official link] | The official website currently exposes an X link; verify destination. |
| Discord | [current official invite] | Verify invite still works. |
| Telegram | [current official link or N/A] | Do not invent one. |
| Existing exchanges | CoinEx / NonKYC / NestEx / Biconomy, subject to current recheck | Existing listing does not imply recommendation. |
| Market data pages | [current URLs] | Verify direct pages and freshness. |
| Community size snapshot | [values/date/source] | Never inflate or reuse stale counts. |

## Security and maintenance

| Field | Value / status |
|---|---|
| Responsible disclosure process | [official process — unresolved if none is confirmed] |
| Maintainer/urgent technical contact | [official process — unresolved if none is confirmed] |
| Upgrade notification path | [current official channel] |
| Release authentication caveats | GitHub asset digests and verified target commit exist; standalone signed checksum/binary/reproducibility evidence remains incomplete. |
| Known integration issues | [current factual list only] |
| Prior audit/security review | [state exactly what is documented; do not imply an audit if none is established] |

## Cover note — authorized representative

Use only when the sender is authorized to submit on behalf of the project:

```text
Hello,

We are submitting BitcoinII (BC2), a native Proof-of-Work blockchain coin, for listing/integration review.

The attached packet includes current source repository and release information, explorer and network parameters, current node/RPC validation records, and exchange-integration guidance. BC2 requires native-chain wallet/node integration rather than a contract-token listing.

Please let us know what additional technical, compliance, or testing information your team requires.

Thank you,
[Name / authorized role]
```

## Cover note — independent contributor

When no official submission authority is claimed:

```text
Hello,

I maintain independent source-backed integration documentation for BitcoinII (BC2). I am not representing myself as the BitcoinII project team.

If your team is evaluating BC2, I can provide current technical documentation covering the source repository, release metadata, explorer/network parameters, node/RPC testing, and deposit-confirmation evidence. If your process requires an official project representative, please let me know and I will not present this as an authorized listing application.

Thank you,
[Name / independent contributor]
```

## Internal pre-send checklist

Before sending:

- confirm the applicant has the authority required by that exchange;
- recheck the exchange's official application URL and anti-scam guidance;
- recheck the official BitcoinII website, source repository, latest release, and explorer;
- recheck release asset/authentication status;
- recheck community links and existing exchange status;
- confirm the technical/contact path;
- refresh live height/network observations;
- remove unused placeholders;
- remove unsupported or promotional claims;
- save the exact submitted packet and submission date.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 v31.1.0 source/runtime evidence, current public infrastructure evidence, current exchange-confirmation evidence, and current listing-requirement research
**Notes:** Refreshed 2026-09-12. Stable BC2 technical values are now prefilled, while time-sensitive, legal, authorization, contact, and live-service fields remain explicit submission-time checks.