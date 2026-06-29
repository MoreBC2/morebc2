# MoreBC2 Evidence Scale

The evidence scale explains how much confidence readers should place in a claim.

A page can contain multiple claims with different evidence levels. Use the strongest evidence available, and label uncertainty clearly.

## Evidence levels

### E1 — Source Code Verified

The claim is verified directly against current BitcoinII source code.

Use for:

- Consensus behavior
- Network parameters
- Address prefixes
- Ports
- Hashing paths
- Default configuration values

Example:

> Target block spacing is defined in source as `10 * 60` seconds.

### E2 — Release Verified

The claim is verified against official release notes, release assets, tags, or related release metadata.

Use for:

- Release version
- Release date
- Release asset names
- Release notes
- Checksums/signatures if published with releases

### E3 — Official Documentation Verified

The claim is verified against an official website, official documentation, or official project repository README.

Use for:

- Public project descriptions
- Official links
- General project positioning
- User-facing statements

### E4 — Live Network / Explorer Verified

The claim is verified against a public explorer, node output, or live network observation.

Use for:

- Current block height
- Example blocks
- Example transactions
- Observed network state

Caution:

Live observations can change. Include the date checked.

### E5 — Tested Locally

The claim is verified by running commands or software locally.

Use for:

- Build steps
- Wallet behavior
- RPC examples
- Node setup guides

Caution:

Include operating system, version, command used, and date tested.

### E6 — Developer Statement

The claim is based on a public statement from a relevant developer or maintainer.

Use for:

- Clarifying intent
- Explaining planned work
- Explaining why something was done

Caution:

A developer statement is not the same as implemented code.

### E7 — Community Discussion

The claim comes from community discussion, Discord, Reddit, Telegram, or similar sources.

Use for:

- Open questions
- Ideas
- Proposals
- Rumors needing verification
- Historical community context

Caution:

Community discussion must not be presented as current implementation.

### E8 — Third-Party Summary

The claim comes from an external article, aggregator, exchange page, or non-official listing.

Use for:

- External exchange metadata
- Aggregator listings
- Public market information
- Independent commentary

Caution:

Verify against stronger sources when possible.

## Suggested page confidence labels

### High confidence

Most important claims are E1, E2, or E3.

### Medium confidence

Claims are supported by official documentation, explorer data, or local testing, but still need review.

### Low confidence

Claims depend on developer statements, community discussion, or third-party summaries.

### Historical confidence

The claim may have been true at a past time but may not describe current BitcoinII behavior.

## Required wording for uncertain claims

Use wording like:

- Needs verification.
- Based on community discussion only.
- Not currently verified against source code.
- This should not be treated as implemented behavior.
- Current source code has not yet been checked.

## Rule

Never upgrade a claim's confidence because it sounds plausible.

Upgrade confidence only when the evidence improves.
