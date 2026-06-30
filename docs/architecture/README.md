# Architecture

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

The architecture section explains how BitcoinII Core components fit together at a conceptual level.

Architecture pages should stay conservative. If a relationship has not been verified from source code, documentation, or tested behavior, mark it as an open question.

## Current pages

- [Architecture overview](architecture-overview.md)
- [Node startup](node-startup.md)
- [Consensus model](consensus-model.md)
- [Life of a transaction](life-of-a-transaction.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Block validation flow](block-validation-flow.md)
- [Mempool flow](mempool-flow.md)

## Planned pages

- Peer communication model
- Node lifecycle
- RPC flow
- Wallet flow
- Mining flow

## Rules

- Explain concepts in plain language.
- Link back to source files where possible.
- Do not invent internal behavior.
- Mark unverified relationships as Needs Review.
- Separate inherited Bitcoin Core architecture from BitcoinII-specific verified changes.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This section is being created as a framework for source-backed architecture documentation.
