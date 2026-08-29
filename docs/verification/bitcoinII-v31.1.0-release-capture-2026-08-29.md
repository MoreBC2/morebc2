---
title: BitcoinII v31.1.0 release capture — 2026-08-29
status: Draft / Dated public observation
---

# BitcoinII v31.1.0 release capture — 2026-08-29

## Scope

This record captures public release, source, and contemporaneous announcement evidence for the BitcoinII Core `v31.1.0` mandatory hard-fork release while the release was newly published.

This is a preservation record, not a completed security audit or an operator endorsement. Live-node upgrade guidance should remain separately tested before being promoted as MoreBC2 operator guidance.

## Canonical release

Canonical repository:

- `https://github.com/Bitcoin-II/BitcoinII-Core`

Canonical release:

- `https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0`
- Release name: `BitcoinII v31.1.0`
- Published: `2026-08-29T02:39:30Z`
- Tag: `v31.1.0`
- Tag target commit: `8daaf7b12e71d3646eed787f040bf2899a69dc1c`

The Git ref for `v31.1.0` points directly to a commit, so this is a lightweight tag rather than an annotated tag object.

The release body lists these high-level changes:

- ShockWave per-block difficulty adjustment;
- consensus-level Ordinals, inscriptions, and Runes mitigation;
- BC2 transaction replay protection;
- fork-aware header synchronization;
- associated wallet, mining, mempool, RPC, validation, and PSBT updates.

## Published release assets and GitHub digest metadata

GitHub's release API reported four uploaded assets at capture time:

| Asset | Size (bytes) | GitHub-reported SHA-256 |
| --- | ---: | --- |
| `BitcoinII-v31.1-Linux-CLI.tar.gz` | 8,839,080 | `78a88df783c2e15d09ea73c05065f7477cad34086b6e995991f7adeae781603f` |
| `BitcoinII-v31.1-Linux-Qt.tar.gz` | 20,629,261 | `745f6fc1cf7132357ca1ee09ea9c02873aac98cae92a6067ee3a26e8e5fd09ac` |
| `BitcoinII-v31.1-Win64-CLI.zip` | 9,116,723 | `74e052791cbd5183b1876693e5d99f474fb4165b795ba45d8f3c966bd5a7d687` |
| `BitcoinII-v31.1-Win64-Qt.zip` | 20,557,870 | `f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d` |

These are GitHub asset metadata digests. MoreBC2 has not yet independently downloaded and re-hashed the four v31.1.0 binaries in this record.

## Signature / authenticity boundary

GitHub reports the tag target commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c` as a verified commit. The commit is authored by Kvanta Mechanic but committed through GitHub's `web-flow` identity, and the verification object contains a GitHub web-flow PGP signature.

That verifies the GitHub-hosted commit through GitHub's signing infrastructure. It does **not**, by itself, establish a BitcoinII publisher signature over the uploaded binary archives.

Contemporaneous Discord messaging described the download as “official, GitHub-signed.” That phrase should not be normalized into a stronger publisher-authentication claim until binary-signature or attestation evidence is independently reviewed.

## Consensus activation height

The tagged `v31.1.0` source sets all three new mainnet consensus activation heights to block `57,750`:

- `nDataRestrictionsHeight = 57750`
- `nShockWaveActivationHeight = 57750`
- `nReplayProtectionHeight = 57750`

The tagged source also sets:

- replay-protection fork ID: `0x01324342`
- target block spacing: `600` seconds
- default mainnet P2P port: `8338`
- a checkpoint at height `57,752` with hash:
  `000000000000000013ceffe797280c57f75a5b9f1d9e70c3503584058c322576`

These source values independently support the Discord announcement that the hard fork activates from block `57,750`.

## ShockWave source correlation

The public `v31.1.0` `src/pow.cpp` identifies the new algorithm as **ShockWave**. The source comments state that its rolling baseline derives in part from concepts/code originating in Dark Gravity Wave v3, while BitcoinII adds additional mechanisms.

High-level source-confirmed properties include:

- 25 sampled blocks / 24 completed intervals;
- MedianTimePast-based rolling baseline;
- true `+/-4x` final per-block difficulty bounds;
- a six-interval normalized raw tightening sensor;
- aggressive-ratchet continuation for very fast blocks;
- overshoot-regime handling and post-stall reset;
- timestamp-consistency checks;
- deterministic emergency stall recovery;
- a 30-minute stall-recovery trigger;
- five-minute recovery steps;
- source comments describing 25% emergency difficulty reductions every five minutes once recovery begins;
- post-recovery stabilization/refill behavior;
- integer-only consensus arithmetic.

This is materially more specific than describing ShockWave as merely “DGW.” The published source says the algorithm uses a DGW-derived rolling baseline but adds independent BitcoinII mechanisms.

The temporary demonstration-fork observations captured separately by MoreBC2 are consistent with these published mechanisms, including rapid per-block tightening and large recovery easing after the injected hashrate was removed. The demonstration fork was not canonical BC2 mainnet and must remain labeled as such.

## Consensus-level data restrictions

Tagged source confirms the new block-space restrictions are implemented as consensus validation rules at/after the activation height, not merely relay policy.

Source-confirmed output/witness restrictions include:

- at most one `OP_RETURN` output per transaction;
- complete `OP_RETURN` scriptPubKey capped at 83 bytes;
- `OP_13` forbidden as an opcode inside `OP_RETURN`;
- bare multisig outputs rejected;
- Taproot annex data rejected;
- Taproot script-path revealed script capped at 3,600 bytes;
- semantic Ordinals envelope detection for `OP_FALSE OP_IF <push "ord">`;
- ordinary Taproot key-path spends remain permitted by these rules.

Validation code maps these violations to consensus block-invalid results.

## Replay protection

The tagged consensus parameters define a BC2-specific fork ID and activate signature-hash domain separation at height `57,750`.

The public source states that historical blocks below the activation height use the legacy signature-hash domain, while post-fork signature hashes use the configured fork ID.

This supports the announcement's high-level replay-protection claim. A separate transaction-signing / wallet-behavior test is still needed before MoreBC2 turns that into operational wallet guidance.

## Contemporaneous mandatory-upgrade announcement

User-supplied Discord screenshots dated around 2026-08-29 00:19 local display time state:

- `BitcoinII Core v31.1.0` is a mandatory update;
- BC2 hard-forked at block `57,750`;
- v29.x nodes are frozen at `57,750` and are no longer on the BC2 chain;
- nodes, pools, wallets, and exchanges should use v31.1.0;
- withdrawals should be paused until upgraded;
- transactions signed on v29.x at or after the fork height may remain unconfirmed and require abandonment/re-send on v31.1.0.

The same announcement gives an operator recovery sequence:

1. stop the node, replace binaries with v31.1.0, and restart;
2. if still stuck at height `57,750`, use `reconsiderblock` with a stated block hash;
3. if still unable to sync, use an explicit peer at `bitcoinii.ddns.net:8338`.

These are preserved here as **announcement context only**. MoreBC2 has not yet independently tested those live-upgrade recovery steps and should not treat them as verified operator instructions until a controlled upgrade test is completed.

## Screenshot preservation metadata

The contemporaneous announcement was supplied in five screenshots in the MoreBC2 research conversation. The local capture hashes were:

| Screenshot | SHA-256 |
| --- | --- |
| `IMG_5209.png` | `4e19b35aab93a278c634f767692eb6d177670c4aa0ddff630163892a750a2ead` |
| `IMG_5210.png` | `d1d47fbcac7fdb61d0adf825296709a61a4d590ba7890d3acc17d2cf5861926c` |
| `IMG_5211.png` | `b0ea2a8ccfa45c813e3f0974c4586e47999d558a796c29b5eb4c62e87fbe1969` |
| `IMG_5212.png` | `e55ee2de8cf650b90ea6faf37620d74366e0d72345bbbf6de72bbfdb188b5444` |
| `IMG_5213.png` | `229f5bd0443244913085fc7fc2cab5ff1b0c19686641dd42a3e83a2396abe886` |

The binary screenshots are not committed to this repository by this record.

## Release-documentation inconsistencies captured at publication

The README at tag `v31.1.0` contains several internally inconsistent or stale statements relative to the actual release page:

- it says `BitcoinII v31.1.` in one place;
- it refers to “the primary changes in BitcoinII v31.1.1”;
- it gives `v31.1.1` as an example official source release point;
- it states that pre-built release binaries are not currently provided, while the v31.1.0 release page in fact contains four uploaded binaries.

These inconsistencies should be preserved as release-documentation observations rather than silently corrected in MoreBC2's evidence record.

## ShockWave licensing observation

The public source is reviewable, but the original ShockWave implementation is explicitly **not MIT-licensed**. The source and README include a proprietary source-review license that permits security/technical/consensus review, interoperability analysis, academic/technical evaluation, and testing, while restricting reuse and redistribution of original ShockWave implementation material.

MoreBC2 should therefore summarize and cite the algorithm rather than reproduce substantial proprietary ShockWave source code.

A small attribution inconsistency is also worth later review: the `pow.cpp` notice names KvantaMechanic as copyright holder for the original ShockWave material, while the tagged README describes the relevant copyright holder as `KvantaMechanic & Second Chance Digital, LLC.`

## Immediate operator boundary

No live user node, wallet, configuration, datadir, or binaries were modified during this capture.

Because this is a mandatory consensus fork involving wallet/signature changes, the next operator milestone should be a controlled Windows v29.1.0 -> v31.1.0 upgrade test with:

- independent artifact hashing;
- wallet and configuration backup first;
- preserved old binaries;
- isolated/preflight testing before touching the live datadir;
- explicit confirmation of wallet loading and balances;
- explicit confirmation of chain height beyond 57,750;
- downgrade/rollback compatibility assessment;
- only then a live-node upgrade.

## Evidence status

Captured from canonical public GitHub release/tag/source plus contemporaneous user-supplied Discord screenshots. Release presence, asset metadata, tag target, activation constants, consensus restrictions, replay fork ID, and high-level ShockWave mechanics are source-backed.

Independent binary re-hashing, binary publisher authentication, Windows upgrade behavior, wallet migration behavior, and the announcement's recovery commands remain unverified by this record.
