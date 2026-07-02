# MoreBC2 Style Conventions

These conventions keep pages consistent.

## Headings

Use sentence case for headings.

Good:

```md
## Network specifications
```

Avoid:

```md
## Network Specifications
```

Exception:

Proper names keep their normal capitalization.

## First mention

On first mention in a page, use:

> BitcoinII (BC2)

After that, use BitcoinII or BC2 as appropriate.

## Dates

Use ISO-style dates:

```text
YYYY-MM-DD
```

Example:

```text
2026-06-29
```

## Status blocks

Substantial pages should start with:

```md
**Category:** Documentation / News / Research / Discussion / History
**Status:** Draft / Needs Review / Verified / Historical / Superseded
**Last reviewed:** YYYY-MM-DD
```

## Verification blocks

Substantial pages should end with:

```md
## Verification

**Status:** Draft / Needs Review / Verified / Historical
**Primary sources checked:** Yes / No
**Notes:** Add caveats here.
```

## Commands

Use fenced code blocks for commands.

Illustrative command examples in style or template pages should be treated as untested examples unless a matching test record exists.

```bash
bitcoinII-cli getblockchaininfo
```

Do not include untested commands in verified documentation.

## Technical values

Use tables or short lists for technical values.

Good:

```md
- Default P2P port: `8338`
- Target block spacing: 10 minutes
```

## Links

Prefer direct links to primary sources.

For source-code claims, include:

- Repository
- File path
- Date reviewed

## Voice

Use third-person or neutral instructional voice in documentation.

Good:

> BitcoinII Core connects to the BitcoinII peer-to-peer network.

Avoid:

> I think BitcoinII Core connects to the network.

## Caution language

Use caution language when needed:

- Needs verification.
- Source needed.
- Current source code appears to show...
- This has not been confirmed by an official source.
- This should not be treated as implemented behavior.

## Price and investment content

Avoid price predictions, investment advice, and hype language.

MoreBC2 may document exchange listings or public market metadata, but it should not tell readers what to buy, sell, hold, or expect.
