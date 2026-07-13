# Developers

This section is for developer-focused BitcoinII (BC2) resources.

## Start here

- [Developer reading order](reading-order.md)
- [Verification standards workflow](verification-standards.md)
- [Source review guide](source-review-guide.md)
- [Source atlas](source-atlas/README.md)
- [Repository map](repository-map.md)
- [Source tree guide](source-tree.md)
- [API documentation](../api/README.md)
- [Compatibility](../compatibility/README.md)
- [Releases](../releases/README.md)
- [Infrastructure directory](../infrastructure/README.md)

## Developer workflow guides

- [Local development environment](local-development.md)
- [Build system guide](build-system.md)
- [Testing guide](testing.md)
- [Release process guide](release-process.md)
- [Release verification guide](release-verification.md)

## Current drafts

- [Architecture overview](../architecture/architecture-overview.md)
- [RPC overview](rpc-overview.md)

Public API behavior and compatibility observations now live in their own first-class sections:

- [API documentation](../api/README.md)
- [Compatibility](../compatibility/README.md)
- [Infrastructure directory](../infrastructure/README.md)

Source Atlas remains the source-review area. API and compatibility pages should link back to dated verification records instead of duplicating long evidence.

## Source-backed architecture pages

- [Life of a transaction](../architecture/life-of-a-transaction.md)
- [Life of a block](../architecture/life-of-a-block.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Block validation flow](../architecture/block-validation-flow.md)
- [Mempool flow](../architecture/mempool-flow.md)

## Draft topics still to create

- Configuration examples
- Exchange integration support examples

## Verification rule

Developer documentation should cite source code, official releases, or tested commands whenever possible.

Commands should not be marked verified until they have been run against BitcoinII Core.
