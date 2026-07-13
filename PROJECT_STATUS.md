# MoreBC2 project status

**Status:** Private foundation-building, ready for narrow v0.2 private review candidate
**Last reviewed:** 2026-07-13

## Summary

MoreBC2 is a private, source-backed documentation and verification project for BitcoinII (BC2).

The repository has moved beyond framework-only documentation. It now contains dated operational evidence from a local BitcoinII Core node, a same-time explorer comparison, a nine-command read-only RPC smoke test, release asset and authentication-gap records, direct ecosystem checks, and a project-identity source review.

The fastest overview is the [verification evidence index](docs/verification/verification-index.md).

First-class v0.2 navigation:

- [API documentation](docs/api/README.md)
- [Infrastructure directory](docs/infrastructure/README.md)
- [Releases](docs/releases/README.md)
- [Compatibility](docs/compatibility/README.md)
- [Developer docs](docs/developers/README.md)
- [Verification router](docs/verification/README.md)
- [Verification evidence index](docs/verification/verification-index.md)

## Current phase

**Phase:** v0.2 narrow private-review candidate

Current goal:

- Send one or two exact review lanes to trusted readers.
- Keep evidence levels, dates, releases, platforms, and network context visible.
- Keep maintainer conversation context separate from public primary-source evidence.
- Preserve the private-review-only license and contribution posture.
- Avoid public-launch claims until the remaining blockers are deliberately resolved or clearly documented as unavailable.

## Launch readiness

MoreBC2 is **not ready for broad public launch**.

It is ready for narrow private review in these lanes:

- local RPC and command-safety evidence,
- release-verification wording,
- explorer/API evidence wording,
- project identity and canonical-source wording,
- P2P and network-test planning,
- ecosystem active-claim boundaries.

## Current verified and observed work

### Local node and RPC

A BitcoinII Core `v29.1.0` GUI node was inspected on Windows mainnet. Local-only RPC was configured on `127.0.0.1:8337` and tested without exposing credentials or wallet data.

Nine read-only commands were successfully tested:

- `getblockcount`
- `getbestblockhash`
- `getblockchaininfo`
- `getnetworkinfo`
- `getconnectioncount`
- `getpeerinfo`
- `getmempoolinfo`
- `getdifficulty`
- `uptime`

Raw peer/network output remains subject to redaction rules.

### Explorer and API

The local node and `bitcoinii.ddns.net` explorer matched at height `57,420` with the same best-block hash within about eight seconds on 2026-07-10.

This is a dated point-in-time agreement. It is not a permanent reliability, official-status, or service-suitability claim.

Public explorer pages and harmless GET endpoints for tip, block, transaction, address, and mempool summary were also observed.

### Release posture

The `v29.1.0` release metadata and uploaded asset inventory are recorded. Generated source archives are distinguished from uploaded assets. The tag and GitHub-reported commit-signature metadata are documented conservatively.

No public BitcoinII checksum manifest, detached release signature, signed annotated tag, trusted release-key path, or independent binary hash record has been established.

The repository owner has spoken with the maintainer and understands release signing and signatures to be roadmap work that is not implemented yet. MoreBC2 records this as maintainer-supplied context, not cryptographic evidence.

### Project identity

Project-controlled GitHub metadata supports treating `Bitcoin-II/BitcoinII-Core` as the canonical public reference implementation. Project-controlled material also strongly supports BitcoinII / `BC2` naming.

A dedicated technical/security integration contact remains unclear, and inherited upstream security-contact wording should not be treated as BitcoinII-specific guidance.

### Ecosystem checks

Dated direct public checks exist for:

- the BitcoinII explorer and public API,
- MiningPoolStats network/mining statistics,
- NonKYC public BC2 pages,
- CoinEx public BC2 pages,
- an unconfirmed NestEx candidate.

These checks do not establish exchange safety, liquidity, regional access, account-level deposit/withdrawal operation, pool payout reliability, or official status.

## Current strengths

- Clear separation between source review, direct observation, local testing, maintainer context, and unresolved claims.
- Strong naming and terminology boundaries.
- Substantial Source Atlas and architecture coverage.
- Real Windows/mainnet local-runtime evidence.
- Same-time local-node/explorer comparison.
- Nine locally tested read-only RPC commands.
- Dated release, explorer, API, exchange, and mining-statistics records.
- Evidence-linked API and infrastructure navigation for REST, WebSocket, Electrum, public endpoints, and service-status wording.
- Conservative release-authentication wording.
- Narrow private-review packets and assignment lanes.
- Verification evidence index and centralized open-question tracking.

## Current risks and blockers

- Final public license decision is not made.
- Public issue/PR and contributor workflow is not established.
- No outside technical reviewer has completed a core-claims review.
- Release binaries are not independently authenticated.
- Public signing/checksum/trusted-key infrastructure is not currently available.
- Wallet backup, restore, encryption, spending, and recovery workflows are not locally tested.
- Exchange/service confirmation policy is unresolved.
- Ecosystem observations can become stale and need dated rechecks.
- Official technical/security contact guidance is incomplete.
- Broader runtime and developer test-suite execution remain open.

## Recommended sharing stage

### Now

Keep the repository private and begin one or two narrow invite-only review assignments.

Recommended order:

1. Local RPC and command-safety review.
2. Release-verification wording review.
3. Explorer/API evidence wording review.

### Next

- Record feedback in the existing review buckets.
- Correct only evidence, wording, redaction, and version/context problems found by reviewers.
- Decide the MoreBC2 license and contribution posture.
- Prepare a short maintainer question covering technical/security contact and explicit ticker/contact confirmation.

### Later

Consider broad public launch only after:

- license and contribution workflow are ready,
- at least one independent technical review is complete,
- release-authentication gaps are clearly presented and updateable,
- stale-service policy and exchange/service wording are settled,
- top-level navigation and known-unknown routing are polished.

## Current coverage snapshot

| Area | Status | Notes |
|---|---|---|
| Documentation foundation | Strong | Governance, structure, READMEs, status labels, and review rules exist. |
| Source Atlas | Strong partial | Broad first-pass coverage exists; consistency and deeper runtime/testing work remain. |
| Verification workflow | Strong | Evidence index, queue, trackers, dated records, review packets, and feedback workflow exist. |
| RPC documentation | Locally tested partial | Nine read-only commands are tested on Windows mainnet; sensitive/state-changing workflows remain open. |
| Wallet documentation | Partial | Source-backed material exists; local backup/recovery/spending tests remain open. |
| Network/P2P documentation | Strong partial | Source review and one live peer snapshot exist; broader runtime and test-suite execution remain open. |
| Release verification | Clearly bounded partial | Metadata and gaps are documented; no binary/signature/trusted-key verification exists. |
| Explorer/API | Dated operational evidence | Same-time tip match and public endpoint checks exist; permanence and official status remain open. |
| Exchange integration | Direct-check partial | Public listing pages were observed; account-level operation and policy remain unverified. |
| Ecosystem directory | Direct-check partial | Explorer/API/mining-statistics/exchange records exist and require periodic refresh. |
| Project identity | Strong partial | Canonical implementation and project-controlled naming evidence exist; contact path remains incomplete. |
| Private review | Ready | Narrow reviewer lanes and evidence rules exist. |
| Public launch | Blocked | License, outside review, contribution workflow, and several operational-policy questions remain. |

## Immediate next actions

1. Send the first narrow private-review assignment.
2. Keep reviewer feedback constrained to evidence strength, version/context, safety, and overclaiming.
3. Decide the MoreBC2 license and public contribution posture.
4. Ask the maintainer one concise set of questions about technical/security contact, explicit ticker wording, and future release-signing publication location.
5. Recheck live ecosystem records only on a deliberate schedule or before publication.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 verification evidence index, local node/RPC records, release inventory and verification records, ecosystem direct-check records, project identity source check, private-review readiness page, legal/reuse posture, and review workflow documents
**Notes:** This is a project-management dashboard. It does not itself verify BitcoinII protocol behavior, release binaries, exchanges, pools, or long-term service reliability.
