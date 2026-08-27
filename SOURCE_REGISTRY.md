# MoreBC2 Source Registry

**Status:** Needs Review

This registry helps contributors choose appropriate sources.

It does not prove that every listed source is complete, current, or official in every context. Each page should still cite the exact source used.

## Source strength levels

| Level | Name | Use for |
|---|---|---|
| Primary | Source code | Consensus rules, network parameters, wallet behavior, exact implementation details |
| Primary | Official releases | Version history, release assets, release notes, release dates |
| Primary | Official website/repositories | User-facing links, project positioning, public resources |
| Secondary | Explorer data | Live chain observations, block/transaction examples, network status |
| Secondary | Build/test output | Verified commands, local behavior, reproducible examples |
| Discussion | Developer statements | Clarifying intent, roadmap comments, review-needed context |
| Discussion | Community chat/social posts | Community ideas, questions, proposals, or historical context |
| Tertiary | Aggregators/articles | External summaries, exchange listings, market metadata; verify before relying |

## Known source categories

### BitcoinII source code

Use for:

- Consensus rules
- Network parameters
- Difficulty behavior
- Address prefixes
- Ports
- Hashing path
- Configuration defaults

Current repository path used in MoreBC2 drafts:

- https://github.com/BitcoinII-Dev/BitcoinII

Notes:

- Some GitHub paths may redirect or appear under different owner names. When citing, prefer the public project path that users are expected to visit.
- If repository ownership or canonical location changes, update this registry and affected docs.

### BitcoinII releases

Use for:

- Release versions
- Release dates
- Release notes
- Downloadable assets
- Checksums/signature model, if available

Current release page used in drafts:

- https://github.com/BitcoinII-Dev/BitcoinII/releases

### BitcoinII website

Use for:

- Public project links
- User-facing project information
- Wallet/download references if confirmed

Current website used in drafts:

- https://bitcoin-ii.org/

### Explorers

Use for:

- Block examples
- Transaction examples
- Current chain observations
- Network status

Rules:

- Explorer data is useful but should not override source code for consensus rules.
- Record the explorer name, URL, and date checked.

### Discord and community chats

Use for:

- Community discussion
- Open questions
- Ideas that may become research or proposals
- Historical context

Rules:

- Do not treat Discord discussion as implementation.
- If using Discord-derived information, label it as Discussion unless later verified elsewhere.

### Third-party market or exchange sites

Use for:

- External listing status
- Public exchange metadata
- Aggregator-reported market information

Rules:

- Treat market data as time-sensitive.
- Do not use third-party listings as primary sources for consensus or wallet behavior.

## Citation pattern

When adding source-backed technical claims, cite:

- Repository path
- File path
- Relevant line or section if possible
- Date reviewed

Example:

> Source checked: `src/kernel/chainparams.cpp`, reviewed 2026-06-29.

## Open source-registry tasks

- Confirm canonical BitcoinII GitHub organization/path.
- Add confirmed official Discord invite.
- Add confirmed official Telegram.
- Add confirmed official X account.
- Add confirmed official Reddit.
- Add current explorer list.
- Add current mining pool list.
