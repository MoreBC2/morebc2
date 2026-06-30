# Developer reading order

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page gives new contributors a recommended path through MoreBC2.

It is meant to prevent the repository from feeling like a pile of disconnected pages.

## First pass: understand the project

Read these first:

1. [MoreBC2 README](../../README.md)
2. [Project status](../../PROJECT_STATUS.md)
3. [Repository audit](../AUDIT.md)
4. [Documentation coverage](../documentation-coverage.md)
5. [Documentation philosophy](../../DOCUMENTATION_PHILOSOPHY.md)
6. [Editorial style guide](../../STYLE_GUIDE.md)

Goal:

Understand what MoreBC2 is, what it is not, and why verification matters.

## Second pass: understand the architecture

Read these next:

1. [Architecture overview](../architecture/architecture-overview.md)
2. [Node startup](../architecture/node-startup.md)
3. [Consensus model](../architecture/consensus-model.md)
4. [Life of a transaction](../architecture/life-of-a-transaction.md)
5. [Life of a block](../architecture/life-of-a-block.md)
6. [Life of a reorganization](../architecture/life-of-a-reorg.md)
7. [Block validation flow](../architecture/block-validation-flow.md)
8. [Mempool flow](../architecture/mempool-flow.md)

Goal:

Understand the major BitcoinII Core flows before reading source-atlas implementation notes.

## Third pass: read the technical documentation

Read:

1. [What is BitcoinII?](../documentation/what-is-bitcoinii.md)
2. [Project overview](../documentation/project-overview.md)
3. [Network specifications](../documentation/network-specifications.md)
4. [Consensus overview](../documentation/consensus-overview.md)
5. [Checkpoints](../documentation/checkpoints.md)
6. [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
7. [Proof-of-work](../encyclopedia/proof-of-work.md)
8. [Confirmations](../encyclopedia/confirmations.md)
9. [Reorganizations](../encyclopedia/reorganizations.md)

Goal:

Understand the verified or partially verified claims MoreBC2 currently makes about BitcoinII.

## Fourth pass: source atlas

Read:

1. [Source atlas index](source-atlas/README.md)
2. [chainparams.cpp](source-atlas/chainparams-cpp.md)
3. [startup initialization](source-atlas/init-cpp.md)
4. [pow.cpp](source-atlas/pow-cpp.md)
5. [block lifecycle](source-atlas/block-acceptance.md)
6. [validation.cpp](source-atlas/validation-cpp.md)
7. [mempool accept](source-atlas/mempool-accept.md)
8. [mempool source](source-atlas/txmempool.md)
9. [mempool entry](source-atlas/mempool-entry.md)
10. [disconnected transactions](source-atlas/disconnected-transactions.md)
11. [block primitives](source-atlas/block-primitives.md)
12. [hash.h](source-atlas/hash-h.md)

Goal:

Move from conceptual understanding to implementation details.

## Fifth pass: integration and operations

Read based on what you are trying to do:

### Exchanges and service providers

- [Exchange integration](../exchange/README.md)
- [Exchange integration package](../exchange/integration-package.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)

### Node operators

- [Nodes](../nodes/README.md)
- [Configuration](../configuration/README.md)
- [Node configuration](../configuration/node-configuration.md)
- [RPC configuration](../configuration/rpc-configuration.md)

### Wallet users and maintainers

- [Wallets](../wallets/README.md)
- [Wallet guide](../wallets/wallet-guide.md)

### Miners and pool operators

- [Mining](../mining/README.md)
- [Mining overview](../mining/mining-overview.md)
- [Ecosystem mining pools](../ecosystem/mining-pools.md)

## Sixth pass: open work

Read:

1. [Verification queue](../verification/README.md)
2. [Known unknowns](../verification/known-unknowns.md)
3. [Documentation coverage](../documentation-coverage.md)
4. [Roadmap](../../ROADMAP.md)

Goal:

Find useful work without guessing where help is needed.

## Contributor rule

Do not start by adding big new claims.

Start by improving one of these:

- A source link.
- A missing citation.
- A wording issue.
- A broken navigation path.
- An open question.
- A Draft page that needs clearer caveats.

## Verification

**Status:** Draft
**Primary sources checked:** Repository navigation and current documentation structure
**Notes:** This reading order should be updated whenever major sections are added, renamed, or reorganized.
