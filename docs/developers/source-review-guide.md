# Source review guide

**Category:** Developer guide
**Status:** Reviewed / Framework
**Last reviewed:** 2026-09-12

## Summary

This guide explains how to review BitcoinII Core source for MoreBC2 without turning a partial code reading into an overbroad protocol or compatibility claim.

A careful partial review is better than a complete-sounding unsupported explanation.

## 1. Pin the source first

Before reviewing, record:

- canonical repository;
- release tag/commit or explicitly mutable branch;
- file path;
- review date;
- subsystem: consensus, policy, wallet, networking, RPC, build, test, or UI.

For current technical claims, prefer release-pinned `v31.1.0` source. Do not silently mix older v29 observations, current `main`, and v31 release behavior.

## 2. Identify purpose and important symbols

Explain what the file or tightly related path does, why it matters, and the important functions/classes/constants/public entry points. Do not inventory every helper unless it improves understanding.

## 3. Trace the call path

Ask who calls the important symbol, what it calls, which subsystem boundaries it crosses, and whether it runs during startup, validation, RPC, wallet operation, relay, mining, or shutdown.

For consensus-sensitive behavior, trace far enough to show where parameters enter validation rather than relying on a nearby comment or helper name.

## 4. Separate consensus, policy, runtime, and compatibility

Keep these distinct:

- **Consensus:** what blocks/transactions are valid.
- **Policy:** what a node accepts/relays/mines locally before confirmation.
- **Runtime evidence:** what happened in a specific executed environment.
- **Compatibility:** whether another wallet/service/library correctly implements the required behavior.

Source review can establish implementation behavior without proving a third-party system is compatible or a public service is operational.

## 5. Look for BitcoinII-specific differences

Do not assume inherited Bitcoin Core structure means identical current behavior. Check for BitcoinII-specific changes in:

- chain/network parameters;
- activation heights;
- address/key encodings;
- difficulty/work selection;
- signature hashing;
- transaction/mempool/block validation;
- header synchronization;
- wallet/PSBT paths;
- mining/template behavior;
- consensus data restrictions;
- ports/seeds/configuration;
- branding and user-facing units.

For `v31.1.0`, the minimum high-risk review set includes ShockWave, replay protection, consensus data restrictions, and fork-aware header synchronization.

## 6. Treat v31 signing paths as cross-subsystem behavior

Replay protection is not only a wallet feature. Current source review shows the fork/domain id flowing through wallet/PSBT/raw-transaction signing, signature hashing, mempool validation, block validation, and validation-cache separation.

A source page about one of those areas should cross-link [Replay protection](source-atlas/replay-protection-v31.md) when the domain affects the claim.

Likewise, mining/template pages should cross-link [ShockWave](source-atlas/shockwave-v31.md) when candidate time or required `nBits` matters.

## 7. Separate source fact from explanation

Example source fact:

> `src/kernel/chainparams.cpp` sets mainnet P2P port `8338` in the reviewed v31 release.

Explanation:

> A default mainnet node listens for peer traffic on that port unless configuration changes it.

Keep the source-backed fact retraceable and avoid turning explanation into a stronger claim than the code supports.

## 8. Record unknowns immediately

Good unknowns are actionable, such as:

> Which test exercises replay-domain activation at the exact mainnet-style boundary?

Avoid vague placeholders like “check this more.” Move unresolved material to the verification backlog when appropriate.

## 9. Cross-check runtime evidence

After source review, check whether MoreBC2 has a dated runtime record for the behavior. If it does, link it and preserve its scope. If it does not, say **source-confirmed; runtime-unverified** rather than implying execution.

The September 11 v31 node/RPC and PSBT records are examples of bounded runtime evidence. They do not prove every source-reviewed path or platform.

## 10. Source Atlas entry standard

A useful atlas page should contain:

- purpose and why it matters;
- release/ref reviewed;
- key symbols/call path;
- BitcoinII-specific behavior;
- consensus/policy/runtime boundary where relevant;
- related MoreBC2 pages;
- open questions;
- primary sources;
- verification block.

## Review checklist

Before finishing a source page, verify that:

- current claims are pinned to the intended release/ref;
- historical claims are labeled historical;
- inherited behavior is not automatically called BitcoinII-specific;
- BitcoinII-specific changes are not hidden behind generic Bitcoin wording;
- consensus and policy are separated;
- source review is not described as runtime testing;
- runtime tests are not generalized beyond their environment;
- third-party compatibility is not inferred from similar formats/APIs;
- mutable service state is not inferred from source code;
- open questions are explicit.

## Related pages

- [Source atlas](source-atlas/README.md)
- [Verification standards](verification-standards.md)
- [Evidence Scale](../../EVIDENCE_SCALE.md)
- [Known unknowns](../verification/known-unknowns.md)
- [Open questions](../verification/open-questions.md)

## Verification

**Status:** Reviewed / Framework  
**Primary sources checked:** Current MoreBC2 evidence rules, v31 source-atlas work, v31 regression audit, and September runtime records  
**Notes:** Refreshed for release-pinned v31 review, current-vs-historical separation, cross-subsystem replay/ ShockWave behavior, and bounded runtime evidence.