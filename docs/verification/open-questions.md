# Open questions backlog

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page collects major open questions from across MoreBC2.

Local pages may still keep their own open-question sections, but this backlog should help contributors find high-value verification work in one place.

## Project identity and sources

### Canonical repository path

**Question:** Which GitHub path should MoreBC2 treat as the canonical public BitcoinII repository path?

**Why it matters:** Many pages cite source files. Canonical source links should be stable before public launch.

**Status:** Needs Review

### Official ticker source

**Question:** What is the strongest primary source confirming `BC2` as the ticker?

**Why it matters:** MoreBC2 consistently uses BC2, but the strongest source should be identified.

**Status:** Needs Review

### Official website and contact process

**Question:** What official website and contact path should exchanges, explorers, pools, and wallet developers use?

**Why it matters:** Integration pages need a reliable contact process.

**Status:** Needs Review

## Releases and verification

### Release verification model

**Question:** How should users verify BitcoinII release downloads?

**Needed evidence:** Checksums, signatures, signed tags, maintainer instructions, or official release documentation.

**Status:** Needs Review

### Current release branch

**Question:** Do the source values documented from `main` match the current public release branch?

**Why it matters:** Network specifications and source-atlas pages should not silently document unreleased values as current network behavior.

**Status:** Needs Review

## Consensus and validation

### Confirmation recommendations

**Question:** What confirmation count should exchanges or services use for BitcoinII deposits and withdrawals?

**Needed evidence:** Maintainer guidance, exchange guidance, or a documented risk model.

**Status:** Needs Review

### Live activation state

**Question:** What is the current live-chain activation state for listed soft-fork heights and deployments?

**Needed evidence:** Running node output, explorer data, or release notes.

**Status:** Needs Review

### Checkpoint usage

**Question:** How exactly does BitcoinII Core use checkpoint data in validation paths?

**Needed evidence:** Source review of checkpoint usage beyond `chainparams.cpp`.

**Status:** Needs Review

### Transaction consensus files

**Question:** What should MoreBC2 document from `consensus/tx_check.*` and `consensus/tx_verify.*`?

**Status:** Not started

### Script validation model

**Question:** How should MoreBC2 explain the script interpreter and standard vs mandatory script checks?

**Status:** Not started

## Mempool and policy

### Replacement policy

**Question:** What replacement policy is implemented and which source files define it?

**Status:** Needs Review

### Package acceptance details

**Question:** What package acceptance behavior should be explained beyond the first-pass `MemPoolAccept` audit?

**Status:** Needs Review

### Mempool option defaults

**Question:** What are the default mempool limits, expiry rules, relay fees, and standardness settings?

**Status:** Needs Review

## Operations and integration

### RPC command verification

**Question:** Which RPC examples have been tested against a running BitcoinII Core node?

**Status:** Needs Review

### Deposit monitoring commands

**Question:** Which wallet/RPC commands should exchange deposit monitoring pages use after testing?

**Status:** Needs Review

### Wallet backup and restore process

**Question:** What wallet backup/restore guidance is verified for BitcoinII Core?

**Status:** Needs Review

## Ecosystem

### Active explorers

**Question:** Which BitcoinII explorers are active, synced, and reliable?

**Status:** Needs direct checks

### Active mining pools

**Question:** Which mining pools support BitcoinII today, and what are their fees/payout rules?

**Status:** Needs direct checks

### Exchange listings

**Question:** Which exchanges currently list BitcoinII, and are deposits/withdrawals open?

**Status:** Needs direct checks

### Community tools

**Question:** Which community tools are active, maintained, and compatible with current BitcoinII?

**Status:** Needs direct checks

## Architecture pages still needed

- Node startup.
- Consensus model.
- Network stack.
- Wallet flow.
- Mining flow.
- RPC flow.
- Block storage and pruning.
- Validation-interface callbacks.

## Developer docs still needed

- Source review guide.
- Verification standards workflow.
- Repository tour refresh.
- Glossary framework.
- Local development environment guide.
- Contribution workflow for invite-only review.

## Verification

**Status:** Draft
**Primary sources checked:** Existing MoreBC2 open questions and audit findings
**Notes:** This is a contributor backlog. Items should move out of this page only after the relevant documentation is updated and sourced.
