# Developer reading order

**Category:** Developer guide
**Status:** Reviewed / Framework
**Last reviewed:** 2026-09-12

## Summary

This is the recommended path for contributors who want to understand MoreBC2 without mistaking inherited Bitcoin structure for current BitcoinII `v31.1.0` behavior.

## 1. Understand MoreBC2 and its evidence rules

Read:

1. [MoreBC2 README](../../README.md)
2. [Project status](../../PROJECT_STATUS.md)
3. [Evidence Scale](../../EVIDENCE_SCALE.md)
4. [Documentation philosophy](../../DOCUMENTATION_PHILOSOPHY.md)
5. [Verification standards](verification-standards.md)
6. [Source review guide](source-review-guide.md)

Goal: understand what MoreBC2 can prove, what remains partial, and why claim-specific evidence matters.

## 2. Learn the current v31 BitcoinII-specific changes first

Before relying on generic Bitcoin-style assumptions, read:

1. [Network specifications](../documentation/network-specifications.md)
2. [Consensus overview](../documentation/consensus-overview.md)
3. [ShockWave difficulty adjustment](source-atlas/shockwave-v31.md)
4. [Replay protection](source-atlas/replay-protection-v31.md)
5. [Consensus data restrictions](source-atlas/data-restrictions-v31.md)
6. [Fork-aware header synchronization](source-atlas/headers-sync-v31.md)
7. [v31 wallet/PSBT/RPC/mempool/mining regression audit](../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)

Goal: know where current BitcoinII materially diverges from inherited Bitcoin assumptions before reading broad structural pages.

## 3. Understand architecture

Read:

1. [Architecture overview](../architecture/architecture-overview.md)
2. [Node startup](../architecture/node-startup.md)
3. [Consensus model](../architecture/consensus-model.md)
4. [Life of a transaction](../architecture/life-of-a-transaction.md)
5. [Life of a block](../architecture/life-of-a-block.md)
6. [Life of a reorganization](../architecture/life-of-a-reorg.md)
7. [Block validation flow](../architecture/block-validation-flow.md)
8. [Mempool flow](../architecture/mempool-flow.md)
9. [Peer communication model](../architecture/peer-communication-model.md)

Goal: understand major flows before diving into file-by-file implementation notes.

## 4. Use the Source Atlas by subsystem

Start with [Source atlas index](source-atlas/README.md), then use the entries relevant to the task.

For consensus/validation, prioritize `chainparams.cpp`, `pow.cpp`, transaction consensus, script interpreter, validation, block acceptance/storage, mempool acceptance, and the v31-specific entries above.

For networking, use protocol, connection management, addrman/banman, handshake, address relay, block/header relay, transaction relay, peer eviction, and send-loop pages.

For wallets/services, use wallet startup/RPC/spend/backup/encryption/coins/history plus raw-transaction, mempool, blockchain, network, and mining RPC pages.

Goal: trace implementation paths without treating every first-pass atlas page as exhaustive current-release verification.

## 5. Read the runtime evidence

Current high-value records are:

1. [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
2. [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
3. [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)

Goal: distinguish what was actually executed from what is only source-reviewed.

## 6. Developer workflow

Read:

1. [Local development environment](local-development.md)
2. [Build system guide](build-system.md)
3. [Testing guide](testing.md)
4. [Release process guide](release-process.md)
5. [Release verification guide](release-verification.md)

Goal: contribute without turning source-documented build/test commands into claims that MoreBC2 has already executed them.

## 7. Integration and operations

Choose the relevant maintained section:

- [API](../api/README.md)
- [Compatibility](../compatibility/README.md)
- [Infrastructure](../infrastructure/README.md)
- [Wallets](../wallets/README.md)
- [Exchange Integration](../exchange/README.md)
- [Ecosystem](../ecosystem/README.md)
- [Releases](../releases/README.md)
- [Nodes](../nodes/README.md)
- [Configuration](../configuration/README.md)
- [Mining](../mining/README.md)

For exchange/service work, current confirmation, chainwork, release-authentication, RPC/indexing, replay-protection, and public-infrastructure evidence should be read together rather than independently.

## 8. Historical material

Older v29 records remain useful for history and regression comparison, but they do not override v31 release-pinned source or September 2026 runtime evidence.

When a historical page and a current page disagree, first determine whether the difference is a real release change, a configuration difference, or stale documentation.

## Verification

**Status:** Reviewed / Framework  
**Primary sources checked:** Current developer index, v31 source-atlas entries, September runtime records, and maintained integration sections  
**Notes:** Refreshed on 2026-09-12 to put v31-specific consensus/signing behavior and current runtime evidence ahead of inherited structural assumptions.