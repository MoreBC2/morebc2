# Mining RPC

**Category:** Developer / Source Atlas  
**Status:** Source-reviewed / Runtime-tested partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` mining-related JSON-RPC behavior centered on `src/rpc/mining.cpp` and the block-template path.

The important BitcoinII-specific v31 boundary is **ShockWave**: candidate header time can affect required work after mainnet height `57750`, so block-template code must derive `nBits` from the actual candidate header rather than assume difficulty is fixed between 2016-block boundaries.

MoreBC2 now has one bounded mining-RPC runtime result: `generatetoaddress` was exercised successfully on an isolated zero-peer `v31.1.0` regtest node during the September PSBT test. Public mining, `getblocktemplate`, network-hash estimation, and block/header submission remain source-reviewed rather than release-specific runtime-tested.

## Registered mining RPC surface

Release-pinned source review identifies these public mining-category commands:

- `getnetworkhashps`
- `getmininginfo`
- `prioritisetransaction`
- `getprioritisedtransactions`
- `getblocktemplate`
- `submitblock`
- `submitheader`

Local/test generation helpers include:

- `generatetoaddress`
- `generatetodescriptor`
- `generateblock`

The legacy hidden `generate` method is not a normal public mining workflow.

## `getnetworkhashps`

`GetNetworkHashPS` estimates network hashrate from accumulated chain work over observed time.

Reviewed behavior includes:

- validating lookup/height inputs;
- supporting historical lookup windows;
- clamping the requested range to available chain history;
- comparing chain work between block indexes;
- dividing work difference by elapsed time;
- returning zero where a usable time span cannot be established.

This is an estimate derived from chain history. It is not a direct measurement of every miner connected to the network.

MoreBC2 has not yet executed `getnetworkhashps` against its September `v31.1.0` runtime environment.

## `getmininginfo`

Current source exposes mining and next-block context including chain height, difficulty/target information, network-hash estimate, mempool state, chain name, warnings, and next-block work context.

Under current BC2, next-block difficulty must reflect ShockWave rather than the old assumption that the tip's `nBits` can simply be reused between long retarget boundaries.

MoreBC2 has not yet executed `getmininginfo` in a dated `v31.1.0` mining-RPC smoke test.

## `getblocktemplate`

`getblocktemplate` is the main Core-side block-template interface.

Reviewed behavior includes:

- normal template mode and proposal mode;
- required client rule handling such as `segwit`;
- non-test-chain peer/sync checks before serving normal templates;
- long-poll support;
- cached template construction through the mining interface;
- candidate-time refresh before response construction;
- BIP22/BIP23-style response fields such as version, previous block hash, transactions, coinbase value, target, current time, `bits`, height, limits, and witness commitment where applicable.

### v31 candidate-time / `nBits` rule

BitcoinII Core `v31.1.0` mining/template code recalculates required work through `GetNextWorkRequired()` when candidate time changes.

That matters because ShockWave's post-activation calculation includes timestamp-aware behavior and emergency stall recovery. A miner, pool, proxy, or template implementation that updates `nTime` while retaining stale `nBits` can construct an invalid candidate.

Bitcoin-style GBT support by itself therefore does not establish BC2 mining compatibility.

MoreBC2 has not yet run a controlled `getblocktemplate` vector demonstrating `nTime`/`nBits` changes across normal and stall-recovery candidate times.

## Proposal mode

In proposal mode, reviewed source decodes proposed block data and checks it without treating the request as a normal mining/submission path.

The path can report duplicate/inconclusive states and invokes block-validity checks appropriate to proposal handling. Exact validation semantics remain defined by the release-pinned source.

## Block and header submission

### `submitblock`

Reviewed source decodes a supplied block, updates required block structures where possible, and routes it through BitcoinII validation/`ProcessNewBlock`, returning BIP22-style or duplicate/inconclusive results as appropriate.

### `submitheader`

Reviewed source decodes a header, requires its previous header to be known, and routes it through new-header processing with proof-of-work checks.

Neither command has a current MoreBC2 `v31.1.0` submission test. They should remain advanced/operator-only examples until a dedicated isolated workflow is recorded.

## Local generation helpers

The source-defined local generation helpers create templates and search for proof of work in controlled/local contexts.

### Runtime evidence — 2026-09-11

During the isolated Windows `v31.1.0` regtest PSBT validation, MoreBC2 successfully used `generatetoaddress` with a fresh disposable descriptor wallet to generate regtest funds.

That establishes the command worked in the documented zero-peer regtest environment. It does **not** establish practical public-mainnet mining performance, pool compatibility, or public block submission.

See [Windows v31.1.0 PSBT and replay-protection validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## Transaction prioritization

`prioritisetransaction` applies a user-specified fee delta to local mempool transaction-selection state. `getprioritisedtransactions` exposes such deltas and related local state.

These are node-local policy/template controls, not BitcoinII consensus changes. MoreBC2 has not runtime-tested them on v31.

## Core RPC versus pool Stratum

BitcoinII Core mining RPC and pool Stratum are separate interfaces.

Current pool pages publish BC2 Stratum endpoints for services such as 1Miner.Net and CapsPool, but MoreBC2 has not yet performed a current BC2 Stratum subscribe/authorize/share-submission qualification against those endpoints.

A published pool hostname/port therefore does not prove:

- successful Stratum handshake;
- accepted shares;
- correct share difficulty;
- valid current block-template handling;
- correct block attribution;
- payout correctness.

See [Mining overview](../../mining/mining-overview.md) and [Ecosystem mining pools](../../ecosystem/mining-pools.md).

## Amount-unit note

Mining/template protocols can express some values in atomic units rather than formatted BC2 amounts. Integrators should follow the exact RPC/template field semantics instead of assuming wallet-RPC amount formatting applies everywhere.

## Current runtime matrix

| Method/path | Current MoreBC2 evidence |
|---|---|
| `generatetoaddress` | Runtime-tested on isolated zero-peer `v31.1.0` regtest |
| `getmininginfo` | Source-reviewed; current v31 runtime test still needed |
| `getnetworkhashps` | Source-reviewed; current v31 runtime test still needed |
| `getblocktemplate` | Source-reviewed, including ShockWave candidate-time coupling; runtime vector still needed |
| `prioritisetransaction` / `getprioritisedtransactions` | Source-reviewed only |
| `submitblock` | Source-reviewed; no current safe submission test |
| `submitheader` | Source-reviewed; no current safe submission test |
| Public pool Stratum | Published configuration observed; no MoreBC2 share test |

## Related pages

- [Block-template assembly](miner.md)
- [ShockWave v31](shockwave-v31.md)
- [pow.cpp](pow-cpp.md)
- [Mining overview](../../mining/mining-overview.md)
- [v31 wallet/mempool/mining regression audit](../../verification/v31-wallet-mempool-mining-regression-2026-09-02.md)
- [Windows v31 PSBT runtime record](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Command testing status](../../verification/command-testing.md)

## Primary sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/rpc/mining.cpp`
- `src/node/miner.cpp`
- `src/node/miner.h`
- `src/node/mini_miner.cpp`
- `src/node/mini_miner.h`
- `src/pow.cpp`
- `src/rpc/server_util.cpp`
- `src/validation.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary evidence:** BitcoinII Core `v31.1.0`, September 2 mining regression source review, September 11 isolated regtest runtime record, September 12 mining/pool audit  
**Notes:** The page is current for the v31 ShockWave/template boundary. `generatetoaddress` has bounded runtime evidence; GBT, mining-status/hashrate, prioritization, block/header submission, and public Stratum remain separately unverified at runtime.
