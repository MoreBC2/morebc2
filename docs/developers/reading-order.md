# Developer reading order

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-07-02

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
5. [transaction consensus files](source-atlas/transaction-consensus.md)
6. [script engine](source-atlas/script-interpreter.md)
7. [block lifecycle](source-atlas/block-acceptance.md)
8. [block storage](source-atlas/block-storage.md)
9. [validation.cpp](source-atlas/validation-cpp.md)
10. [validation interface](source-atlas/validation-interface.md)
11. [mempool accept](source-atlas/mempool-accept.md)
12. [mempool source](source-atlas/txmempool.md)
13. [mempool entry](source-atlas/mempool-entry.md)
14. [disconnected transactions](source-atlas/disconnected-transactions.md)
15. [block primitives](source-atlas/block-primitives.md)
16. [hash.h](source-atlas/hash-h.md)

Then read the current network group:

17. [protocol primitives](source-atlas/protocol.md)
18. [network RPC](source-atlas/rpc-network.md)
19. [connection management](source-atlas/net-connection-management.md)
20. [peer handshake](source-atlas/net-processing-handshake.md)
21. [address sharing](source-atlas/net-processing-address-relay.md)
22. [block and header sharing](source-atlas/net-processing-block-relay.md)
23. [transaction sharing](source-atlas/net-processing-transaction-relay.md)
24. [peer health and stale-tip checks](source-atlas/net-processing-peer-eviction.md)
25. [peer send loop](source-atlas/net-processing-send-loop.md)

Goal:

Move from conceptual understanding to implementation details.

## Fifth pass: developer workflow

Read:

1. [Source review guide](source-review-guide.md)
2. [Verification standards workflow](verification-standards.md)
3. [Local development environment](local-development.md)
4. [Build system guide](build-system.md)
5. [Testing guide](testing.md)
6. [Release process guide](release-process.md)
7. [Release verification guide](release-verification.md)

Goal:

Understand how to add or verify work without turning guesses into documentation.

## Sixth pass: integration and operations

Read based on what you are trying to do:

### Exchanges and service providers

- [Exchange integration](../exchange/README.md)
- [Exchange integration package](../exchange/integration-package.md)
- [Service integration checklist](../exchange/service-integration-checklist.md)
- [Deposit monitoring](../exchange/deposit-monitoring.md)
- [Native coin exchange listing guide](../exchange/native-coin-listing-guide.md)
- [Exchange listing target matrix](../exchange/exchange-listing-targets.md)
- [Exchange readiness checklist](../exchange/exchange-readiness-checklist.md)
- [Exchange listing packet template](../exchange/listing-packet-template.md)
- [Release verification guide](release-verification.md)

### Node operators

- [Nodes](../nodes/README.md)
- [Configuration](../configuration/README.md)
- [Node configuration](../configuration/node-configuration.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Network RPC source review](source-atlas/rpc-network.md)
- [Connection management source review](source-atlas/net-connection-management.md)
- [Source atlas index](source-atlas/README.md)

### Wallet users and maintainers

- [Wallets](../wallets/README.md)
- [Wallet guide](../wallets/wallet-guide.md)

### Miners and pool operators

- [Mining](../mining/README.md)
- [Mining overview](../mining/mining-overview.md)
- [Ecosystem mining pools](../ecosystem/mining-pools.md)

## Seventh pass: open work

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
**Notes:** This reading order was refreshed after the network Source Atlas slices through lower-level connection management and the exchange-listing documentation batch were added. It should be updated whenever major sections are added, renamed, or reorganized.
