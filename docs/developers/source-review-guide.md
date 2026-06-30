# Source review guide

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This guide explains how to review a BitcoinII Core source file for MoreBC2.

The goal is not to rewrite the source code in prose. The goal is to help readers understand what the file does, why it matters, and which claims are verified.

## Review principle

Move slowly.

A careful partial review is better than a confident but unsupported complete-sounding page.

## Before reviewing

Start by checking:

- Which repository and branch are being reviewed.
- Whether the source path is official, mirrored, or redirected.
- Whether the file exists in current source.
- Whether MoreBC2 already has a related page.
- Whether the file affects consensus, policy, wallet behavior, networking, UI, or build tooling.

If the canonical source path is uncertain, mark it as an open question.

## Step 1: Identify the file purpose

Answer:

- What subsystem does this file belong to?
- What problem does it solve?
- Is it core protocol, wallet, node, networking, RPC, build, test, or UI code?
- Is it inherited Bitcoin Core behavior, BitcoinII-specific behavior, or not yet clear?

Write this in plain language first.

## Step 2: List major symbols

Record the important:

- Functions.
- Classes.
- Constants.
- Structs.
- Enums.
- Global objects.
- Public entry points.

Do not list every helper if it does not help readers.

## Step 3: Identify call paths

For each important symbol, ask:

- Who calls it?
- What does it call?
- Is it an entry point or helper?
- Does it cross subsystem boundaries?
- Does it run during startup, validation, RPC, wallet operation, relay, mining, or shutdown?

Use small flow diagrams when helpful.

## Step 4: Separate consensus from policy

This is critical.

Consensus rules determine whether blocks or transactions are valid.

Policy rules determine what a node accepts, relays, mines, or keeps locally before confirmation.

Never blur the two.

Examples:

- Block proof-of-work checks are consensus-relevant.
- Mempool standardness checks are usually policy.
- Script flags can include mandatory consensus flags and optional policy flags.

When unsure, mark it as Needs Review.

## Step 5: Separate source facts from explanation

Source fact:

> `chainparams.cpp` sets the mainnet P2P port to `8338`.

Explanation:

> This is the default port a mainnet node uses for peer-to-peer connections unless configured otherwise.

Both are useful, but they are not the same kind of statement.

## Step 6: Check BitcoinII-specific differences

When a file appears inherited from Bitcoin Core, identify whether BitcoinII changed:

- Constants.
- Chain parameters.
- Activation heights.
- Address prefixes.
- Ports.
- Seeds.
- Proof-of-work parameters.
- Genesis block values.
- Branding/UI strings.
- RPC names or wallet defaults.

Do not assume a difference exists just because the project is BitcoinII.

## Step 7: Record unknowns immediately

If something is not clear, write it down.

Good open question:

> Which caller path submits locally mined blocks into `ProcessNewBlock`?

Weak open question:

> Need to check this file more.

Open questions should be actionable.

## Step 8: Create or update Source Atlas page

Use this structure:

```md
# source/file/path

**Category:** Documentation
**Status:** Draft
**Last reviewed:** YYYY-MM-DD

## Summary

## Why this file matters

## Key symbols

## Reviewed behavior

## BitcoinII-specific notes

## Related pages

## Open questions

## Sources

## Verification
```

Keep implementation notes specific. Link architecture pages for conceptual explanation.

## Step 9: Update navigation

After adding a Source Atlas page, update:

- [Source atlas README](source-atlas/README.md)
- [Documentation coverage](../documentation-coverage.md)
- Any related architecture page.
- Any relevant documentation page.
- [Open questions backlog](../verification/open-questions.md), if the review resolves or creates major questions.

## Step 10: Choose status honestly

Use:

- **Draft** for first-pass notes.
- **Needs Review** for nearly complete but unchecked pages.
- **Reviewed** only in coverage tables when a meaningful first-pass review exists.
- **Verified** only when claims are backed by strong primary sources and the page is ready to rely on.

Most Source Atlas pages should start as Draft or Needs Review.

## Review checklist

Before committing a source review, ask:

- Did I identify the file path clearly?
- Did I avoid overclaiming?
- Did I separate consensus from policy?
- Did I mark unreviewed caller paths?
- Did I distinguish source facts from interpretation?
- Did I add related MoreBC2 links?
- Did I add open questions?
- Did I update coverage tracking?
- Did I avoid copying large blocks of code?

## Common mistakes

### Mistake: treating community discussion as source

Community discussion may explain why a question matters, but it does not verify source behavior.

### Mistake: calling something BitcoinII-specific too early

If a file is inherited from Bitcoin Core and only lightly changed, say that review has not yet identified BitcoinII-specific behavior.

### Mistake: making architecture pages too implementation-heavy

Architecture pages should explain flows.

Source Atlas pages should anchor implementation.

### Mistake: hiding uncertainty

Uncertainty is useful if it is clearly recorded.

## Verification

**Status:** Draft
**Primary sources checked:** MoreBC2 Source Atlas structure and contributor standards
**Notes:** This guide defines the preferred review process. It should be refined after additional source files are reviewed.
