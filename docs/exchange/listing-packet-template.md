# Exchange Listing Packet Template

**Category:** Template
**Status:** Draft
**Last reviewed:** 2026-07-02

## Summary

This is a reusable template for preparing a BitcoinII (BC2) exchange listing packet.

Do not send this template as-is. Replace placeholders with current, verified information and remove sections that are not yet ready.

## Packet status block

```text
Project: BitcoinII
Ticker: BC2
Packet version: YYYY-MM-DD draft
Prepared by: [name / role]
Technical contact: [email or process]
Status: Draft / Ready for private review / Ready for submission
```

## Executive summary

```text
BitcoinII (BC2) is a native blockchain coin. [Add concise, source-backed description.]

This packet provides the basic project, network, release, and integration information needed for exchange review.
```

Avoid price predictions, hype claims, unsupported security claims, unsupported partnership claims, and unverified ecosystem claims.

## Project identity

| Field | Value | Source / note |
|---|---|---|
| Project name | BitcoinII | Needs final confirmation from official source. |
| Ticker | BC2 | Needs final confirmation from official source. |
| Website | [URL] | Must be current. |
| Source repository | [URL] | Must be canonical. |
| Release page | [URL] | Must be current. |
| License | [License] | Confirm from repository. |
| Block explorer | [URL] | Must be live and current. |
| Contact email | [email] | Must be controlled by project/team. |
| Technical contact | [email/process] | Needed for integration questions. |

## Technical overview

| Field | Value | Source / note |
|---|---|---|
| Chain type | Native blockchain coin | Not a token. |
| Consensus | [value] | Source-backed required. |
| Proof-of-work hash path | [value] | Source-backed required. |
| Target block spacing | [value] | Source-backed required. |
| Difficulty adjustment | [value] | Source-backed required. |
| Max supply | [value] | Source-backed required. |
| Subsidy schedule | [value] | Source-backed required. |
| Mainnet P2P port | [value] | Source-backed required. |
| Mainnet RPC port | [value] | Source-backed required. |
| Address formats | [value] | Source-backed required. |
| Genesis hash | [value] | Source-backed required. |

## Release information

| Field | Value | Source / note |
|---|---|---|
| Current release | [version] | Recheck immediately before submission. |
| Release date | [date] | Use exact date from official release page. |
| Release files | [list] | Include OS/architecture. |
| Checksums | [URL/status] | Required or explain missing. |
| Signatures | [URL/status] | Required or explain missing. |
| Signing key | [URL/status] | Required or explain missing. |
| Release verification status | [status] | Do not overstate. |

## Explorer and network status

| Field | Value | Source / note |
|---|---|---|
| Explorer URL | [URL] | Must be current. |
| Latest checked height | [height] | Record date/time checked. |
| Latest checked block time | [time] | Record date/time checked. |
| Explorer transaction lookup | Yes/No | Test before submission. |
| Explorer address lookup | Yes/No | Test before submission. |
| Network producing blocks | Yes/No | Record source. |
| Known seed nodes | [list/status] | Confirm current function if possible. |

## Integration notes

Link to or attach current notes for full-node setup, configuration, RPC authentication, safe RPC exposure, deposit monitoring, confirmation policy, reorg handling, and software update procedure.

Do not include untested command examples in a final submission packet unless they are clearly marked as untested.

## Community and ecosystem

| Field | Value | Source / note |
|---|---|---|
| X/Twitter | [URL] | Current official account only. |
| Discord | [URL] | Current official invite only. |
| Telegram | [URL] | Current official group only. |
| Reddit | [URL] | Current official/community status. |
| YouTube/media | [URL] | Optional. |
| Existing exchanges | [list] | Directly verify before listing. |
| Existing services | [list] | Directly verify before listing. |
| Community size snapshot | [values/date] | Do not inflate. |

## Security and maintenance

| Field | Value | Source / note |
|---|---|---|
| Responsible disclosure | [process] | Add if available. |
| Maintainer contact | [process] | Needed for urgent software issues. |
| Release cadence | [summary] | Use observed history only. |
| Upgrade notice process | [summary] | Needed for exchanges. |
| Known issues | [summary] | Be honest and current. |
| Prior audits | [summary] | Do not imply audits if none found. |

## Suggested application cover note

```text
Hello,

We would like to submit BitcoinII (BC2), a native blockchain coin, for listing review.

This packet includes the current project identity, source repository, release information, explorer, chain parameters, and initial exchange integration notes. BC2 is a native coin rather than a contract token, so daemon/node integration is required.

Please let us know if your team needs additional RPC, release-verification, or testing information.

Thank you,
[Name / role]
```

## Internal pre-send checklist

Before sending this packet:

- Recheck the official website.
- Recheck the official source repository.
- Recheck the latest release.
- Recheck release artifact status.
- Recheck the explorer.
- Recheck community links.
- Confirm technical contact.
- Remove placeholders.
- Remove claims that are not source-backed.
- Save the sent version and date.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 exchange section and first-pass official exchange listing pages.
**Notes:** This is a packet template, not a completed BC2 listing packet.