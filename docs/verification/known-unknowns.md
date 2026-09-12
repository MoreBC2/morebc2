# Known unknowns

**Category:** Verification  
**Status:** Reviewed / Partial  
**Last reviewed:** 2026-09-12

## Summary

This page lists the highest-level things MoreBC2 still does **not** know or has not yet demonstrated.

The September v31 audit sequence resolved many earlier source-location/currentness questions. The remaining gaps are increasingly about runtime behavior, third-party compatibility, operational thresholds, release authentication, and service freshness.

For a more granular queue, use [Open questions](open-questions.md). For the current evidence state, use the [Verification evidence index](verification-index.md).

## Current release authentication

Current `v31.1.0` evidence establishes:

- six Linux/Windows/macOS release assets;
- GitHub-reported SHA-256 metadata for all six;
- lightweight tag `v31.1.0`;
- target commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`;
- GitHub reports that target commit as verified/valid;
- MoreBC2 independently hashed the Windows Qt archive and matched GitHub's digest;
- the extracted Windows Qt executable reported `Authenticode: NotSigned`.

**Still unknown / unverified:**

- independent byte hashes for the other five assets;
- whether BitcoinII publishes a maintainer-signed checksum manifest or detached asset signatures through another canonical route;
- a documented trusted release-key distribution process;
- reproducible-build equivalence between reviewed source and distributed binaries.

A verified commit does not authenticate the binary artifacts by itself.

## Long-duration / production-oriented v31 node behavior

Current Windows evidence covers bounded mainnet startup, peer/header acquisition, advancing IBD, cookie RPC, disposable wallet isolation, shutdown, and restart.

**Still needed:**

- complete initial sync;
- longer-duration operation;
- current headless-daemon coverage if/when an appropriate artifact is available;
- deliberate pruning/index configuration combinations;
- fee-estimation behavior under useful chain/mempool state;
- production custody/service deployment patterns.

The bounded September test should not be promoted into a universal production-readiness claim.

## ShockWave empirical behavior

The current `v31.1.0` source path is no longer unknown. MoreBC2 has documented activation, rolling/short-horizon behavior, timestamp-aware candidate work, emergency recovery, mining-template interaction, and header-sync history requirements.

**Still unknown / unexecuted:**

- independently reproduced candidate-time / `nBits` vectors;
- exact observed behavior across controlled abrupt hashrate arrival/departure scenarios;
- activation frequency of emergency recovery on the live network;
- empirical post-activation block-interval and difficulty-response distributions;
- execution results for the relevant upstream unit/functional tests in a clean v31 build.

These gaps block strong quantitative performance claims, not the basic statement that current mainnet uses ShockWave.

## Replay-domain third-party compatibility

Mainnet replay protection activation (`57750`) and domain `0x01324342` are source-confirmed through wallet/raw/PSBT/mempool/block/cache/signature paths.

The isolated regtest PSBT lifecycle tested ordinary v31 signing/finalization/mempool behavior, but regtest leaves the mainnet replay activation disabled as shipped.

**Still unknown / untested:**

- deterministic mainnet replay-domain signature/digest vectors independently reproduced by MoreBC2;
- external/hardware signer behavior;
- third-party wallet/library support for the BC2 replay-domain semantics;
- compatibility of integrations that assume ordinary Bitcoin sighash behavior.

## Consensus data-restriction runtime boundaries

The source question is substantially resolved: activation at `57750`, output/Taproot-witness restrictions, and block-connection enforcement have been mapped.

**Still needed:**

- execution of located tests;
- activation-boundary vectors;
- independently recorded accept/reject examples covering the important rule classes.

This is now a test-execution gap rather than an unknown source path.

## Fork-aware header-sync runtime scenarios

The source design is now documented: two-phase sync, fork anchoring, bounded branch-specific ShockWave history, and exact work validation.

**Still needed:**

- controlled competing-branch scenarios;
- recovery from branch changes during sync;
- activation-boundary and malformed-history cases;
- mapping of source-reviewed behavior to executed tests.

The source architecture is no longer a known unknown; runtime edge-case coverage remains one.

## Reorganizations and settlement risk

Source review establishes most-work chain selection plus disconnect/undo/reconnect/mempool-repair behavior.

**Still unknown / unmeasured:**

- empirical BC2 reorg-depth/frequency history;
- controlled current-release reorg simulations;
- reorg behavior spanning important activation boundaries;
- production exchange incident thresholds and automated/manual response policy.

No finite confirmation count should be presented as cryptographic finality.

## Exchange confirmation policy

Direct 2026-09-12 evidence established:

- CoinEx: `safe_confirmations = 2`, `irreversible_confirmations = 6`;
- NonKYC: `confirmsRequired = 50`;
- NestEx: BC2 `conf = 50`;
- Biconomy: listing confirmed, exact current count not publicly established.

MoreBC2 therefore uses **50 confirmations as a provisional normal-deposit baseline**.

**Still needed:**

- maintainer/community review if available;
- a concrete cumulative-chainwork monitoring example;
- empirical reorg data;
- value/risk-based escalation thresholds;
- periodic exchange-policy rechecks.

The unknown is no longer simply “what number?”; it is how to operationalize and maintain the risk model around that provisional baseline.

## Public transaction propagation

Current evidence includes local zero-peer `sendrawtransaction` on regtest and public `/api/tx` route rejection of malformed payloads.

**Still unknown:** whether any documented public endpoint successfully accepts and propagates a valid BC2 transaction in a deliberately safe test.

That evidence is not required for ordinary documentation unless a real integration need arises; it should not be obtained by risking an existing user wallet.

## Public infrastructure independence and long-term reliability

The Official Explorer exposes a materially different API surface; `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` expose closely aligned Mempool-style behavior.

**Still unknown / unproven:**

- backend/operator independence among the Mempool-style services;
- long-term uptime/SLA/reliability;
- whether all services remain synchronized under stress;
- wallet-level Electrum behavior beyond read-only reachability;
- production broadcast behavior.

Similar behavior is not proof of one backend; different hostnames are not proof of independent redundancy.

## Pool / Stratum and payout behavior

Public configuration for current pool endpoints, modes, fees, and payout language has been documented.

**Still unknown / untested:**

- current subscribe/authorize/share acceptance;
- assigned share difficulty/extranonce behavior;
- template compatibility under ShockWave candidate-time rules;
- block attribution;
- payout accounting, timing, solvency, and reliability.

A dashboard or published Stratum port does not prove end-to-end mining qualification.

## Third-party wallet / signer compatibility

BitcoinII Core wallet behavior is comparatively well mapped, but broad third-party compatibility remains incomplete.

**Still needed:** disposable/watch-only or otherwise safe current-release qualification of selected wallets, signing libraries, external signers, and Electrum clients—without opening existing user wallets or exposing unnecessary real funds.

## Technical / security contact process

MoreBC2's own private vulnerability reporting route is established, but the preferred **upstream BitcoinII** technical/security/integration contact process for exchanges, explorers, pools, and wallet developers is still not canonicalized in the evidence set.

A verified Core commit author email and GitHub Issues exist, but those should not be promoted into “the official security/integration contact” without upstream guidance.

## Resolved items removed from the unknown queue

These are no longer treated as unknowns:

- ticker `BC2` and base unit `sat2` in current source;
- current mainnet P2P port `8338` and RPC default `8332`;
- current v31 ShockWave activation/basic algorithm identity;
- source path for replay protection;
- source path for consensus data restrictions;
- source design of fork-aware header synchronization;
- current explorer/API/Electrum point-in-time reachability;
- existence of the current six-asset v31 release inventory;
- bounded current v31 Windows node/RPC and disposable PSBT runtime evidence;
- provisional 50-confirmation MoreBC2 exchange baseline.

## Historical evidence rule

Do not rewrite dated v29 records as v31 results. Preserve their original date/version and add a new record when a workflow is re-run.

## Verification

**Status:** Reviewed / Partial  
**Primary evidence checked:** Completed v31 Source Atlas/Architecture audits, September v31 runtime records, current release/provenance records, public infrastructure evidence, exchange evidence, and current mining/wallet/compatibility documentation  
**Notes:** This queue now focuses on genuine runtime, operational, third-party, service-independence, and release-authentication gaps rather than source questions already resolved by the audit sequence.
