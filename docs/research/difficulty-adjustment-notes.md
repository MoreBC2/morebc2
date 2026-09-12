# Difficulty Adjustment Notes

**Category:** Research  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This page tracks the **remaining research questions** around BitcoinII (BC2) difficulty behavior after the current `v31.1.0` implementation facts have already been established elsewhere.

The basic implementation question is no longer open: BitcoinII mainnet uses **ShockWave** beginning at height `57750`. What remains useful to research is how that source-defined controller behaves under controlled vectors and real network conditions.

For established protocol behavior, use [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md), [ShockWave v31](../developers/source-atlas/shockwave-v31.md), and [`pow.cpp`](../developers/source-atlas/pow-cpp.md). This page should not compete with them as a consensus specification.

## Established current behavior

Release-pinned BitcoinII Core `v31.1.0` source supports the following current facts:

- ShockWave activates for mainnet block height `57750` and later.
- `GetNextWorkRequired()` remains the production next-work entry point.
- The longer rolling calculation uses 25 block-index entries / 24 completed intervals.
- MedianTimePast-derived timing is part of the longer-window calculation.
- A separate short-horizon path examines the six most recent completed intervals.
- Normal target movement is bounded relative to the preceding target, subject to `powLimit`.
- Candidate header time is an input to timestamp-aware / emergency behavior.
- Emergency stall recovery becomes eligible after the source-defined adjusted 30-minute threshold, with additional source-defined easing steps afterward.
- Current mining/template code recalculates `nBits` when candidate time changes.
- ShockWave changes required work; active-chain selection still compares accumulated chainwork.
- Fork-aware header sync retains the recent branch-specific history needed to evaluate ShockWave-era headers.

The inherited 10-minute spacing, 14-day target timespan, and 2016-block interval remain relevant to historical pre-activation behavior and inherited helpers. They are not the active post-`57750` mainnet retarget schedule.

## What MoreBC2 has actually exercised

Current MoreBC2 runtime evidence includes:

- a bounded Windows `v31.1.0` mainnet node/RPC run with current peer/header acquisition and partial synchronization;
- isolated zero-peer regtest block generation via `generatetoaddress` as part of the PSBT workflow;
- dated public explorer/API observations for difficulty, hashrate, and next-block-related endpoints.

Those records do **not** independently reproduce the mainnet ShockWave activation boundary, rapid-response path, candidate-time transition behavior, or emergency stall-recovery sequence.

Accordingly, current ShockWave internals are **source-confirmed**, while controlled algorithm vectors and empirical network-performance conclusions remain open research.

## Priority research questions

### 1. Candidate-time / `nBits` vectors

Construct deterministic vectors where the same previous-chain history is paired with different candidate times.

Questions:

- At what candidate times does required `nBits` remain unchanged?
- At what points does emergency easing begin?
- Do observed transitions exactly match the release-pinned implementation?
- How does future-time allowance affect the apparent stall interval?

A useful result should include the previous block history, candidate time, computed `nBits`, decoded target/difficulty, expected source path, and software commit/release used.

### 2. Abrupt hashrate arrival

Model a chain where block intervals suddenly become much shorter.

Questions:

- How quickly does the six-interval response dominate the longer window?
- How quickly does required work tighten?
- How large is each per-block change?
- How much overshoot appears before the rolling window normalizes?

This should be evaluated from reproducible vectors, not inferred from comments or a single live block sequence.

### 3. Abrupt hashrate departure

Model the inverse transition after a period of fast blocks.

Questions:

- How rapidly does difficulty ease under ordinary rolling behavior?
- When, if at all, does emergency stall recovery become relevant?
- How many blocks are needed before the sample window no longer reflects the earlier high-hashrate period?

### 4. Emergency stall recovery

Create controlled candidate-time sequences that cross the source-defined stall thresholds.

Record:

- previous MTP and header times;
- candidate time;
- adjusted stall time;
- threshold crossed;
- target before and after the step;
- whether `powLimit` becomes binding.

The goal is not merely to show that the code contains an emergency path, which is already source-confirmed, but to produce independent, reproducible examples of its behavior.

### 5. Live post-activation block timing

Use an explicitly defined mainnet height window after `57750` and record:

- block timestamps;
- MedianTimePast where needed;
- encoded target / difficulty;
- block intervals;
- estimated work or chainwork increments;
- identifiable extreme fast/slow periods.

Questions:

- What is the empirical block-interval distribution?
- How often do unusually slow intervals occur?
- How often does difficulty materially change from one block to the next?
- Are there visible sequences consistent with abrupt rented-hashrate arrival/departure?

This analysis must distinguish **observed timing patterns** from claims about miner identity or causal intent.

### 6. Explorer hashrate methodology

Public services expose hashrate estimates, but equal-looking metrics may use different windows or formulas.

A comparison should record:

- service and endpoint;
- retrieval time;
- reported window;
- reported value/unit;
- chain tip at retrieval if available;
- whether the methodology is documented;
- an independently derived estimate from the same chain window where practical.

Aligned public values are useful cross-checks but do not establish provider independence.

### 7. Comparison with DGWv3 and other algorithms

ShockWave's source notice attributes part of its rolling calculation to Dark Gravity Wave v3 concepts/code, but the complete BitcoinII implementation includes additional behavior.

A fair comparison should compare properties such as:

- sampling window;
- time measurement;
- response speed;
- per-block bounds;
- stall handling;
- timestamp defenses;
- recovery after temporary hashrate spikes.

It should **not** describe ShockWave as merely DGWv3 or imply source-code equivalence.

## Suggested experimental method

A strong controlled study would:

1. pin BitcoinII Core exactly to `v31.1.0` / its known tag target;
2. use disposable test state only;
3. construct synthetic previous-block histories with known targets and timestamps;
4. invoke the same production next-work path used by consensus validation rather than reimplementing ShockWave from prose;
5. vary one input at a time where possible;
6. record candidate header time, previous history, returned compact target, decoded target/difficulty, and relevant chainwork;
7. compare the observed transition to the release-pinned source path;
8. publish vectors/results separately from the descriptive consensus documentation.

Because the ShockWave implementation carries its own upstream licensing notice, MoreBC2 should report independent test inputs/results and factual analysis without copying or relicensing protected implementation text.

## Evidence cautions

- Explorer difficulty/hashrate output is a dated service observation, not an independent consensus rule.
- Block timestamps are miner-controlled within consensus constraints and are not perfect wall-clock measurements.
- MedianTimePast and raw header time should not be treated as interchangeable.
- A short height window can exaggerate unusual periods.
- Hashrate estimates inferred from block production are probabilistic.
- Correlation between difficulty/timing changes and public pool activity does not prove causation.
- Confirmation count and accumulated chainwork are different quantities.
- A live chain observation cannot by itself reveal every internal ShockWave branch taken without reconstructing the relevant inputs.

## Research outputs worth producing

Useful future deliverables include:

- a small table of deterministic candidate-time / `nBits` vectors;
- fast-hashrate-arrival and departure simulations;
- an emergency-stall threshold example;
- a post-activation block-interval/difficulty dataset with methodology;
- cross-provider hashrate-estimate comparison notes;
- a source/test coverage map identifying which ShockWave paths have upstream tests and which MoreBC2 has independently executed.

When a result becomes reproducible and stable, its factual conclusions can be promoted into Verification or Documentation while this page retains the research method and unresolved questions.

## Related pages

- [Research section](README.md)
- [Difficulty adjustment](../encyclopedia/difficulty-adjustment.md)
- [Proof-of-work](../encyclopedia/proof-of-work.md)
- [Mining overview](../mining/mining-overview.md)
- [ShockWave v31](../developers/source-atlas/shockwave-v31.md)
- [`pow.cpp` Source Atlas](../developers/source-atlas/pow-cpp.md)
- [Fork-aware header synchronization](../developers/source-atlas/headers-sync-v31.md)
- [Life of a reorganization](../architecture/life-of-a-reorg.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)

## Primary sources

Pinned to BitcoinII Core `v31.1.0`:

- `src/pow.cpp`
- `src/pow.h`
- `src/kernel/chainparams.cpp`
- `src/consensus/params.h`
- `src/node/miner.cpp`
- `src/headerssync.cpp`
- `src/headerssync.h`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** BitcoinII Core `v31.1.0` ShockWave/mining/header-sync reviews plus current MoreBC2 runtime and public-infrastructure evidence  
**Notes:** Current implementation identity and major behavior are source-confirmed. Controlled candidate-time/target vectors, live post-activation statistical analysis, direct path-frequency measurements, and empirical cross-algorithm comparison remain open research.
