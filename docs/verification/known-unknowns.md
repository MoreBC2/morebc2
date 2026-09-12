# Known unknowns

**Category:** Verification
**Status:** Draft
**Last reviewed:** 2026-09-12

## Summary

This page lists the highest-level things MoreBC2 does not know yet.

A known unknown is not a failure. It is an invitation to verify.

For the full working list, use the [open questions backlog](open-questions.md) and [verification queue](README.md).

## Highest-priority known unknowns

### Current release authentication

The current BitcoinII Core release is `v31.1.0`, published on 2026-08-29.

MoreBC2 has now observed:

- six current Linux, Windows, and macOS release assets;
- GitHub-reported SHA-256 digest metadata for all six;
- lightweight tag `v31.1.0`;
- tag target commit `8daaf7b12e71d3646eed787f040bf2899a69dc1c`;
- GitHub verification state reporting that target commit as cryptographically verified with a valid signature.

This resolves the earlier question of whether current commit-signature evidence exists.

**Still needed:** independent downloads/hashes, publisher checksum/signature material if any, a documented BitcoinII release-key process if one exists, and reproducible-build evidence.

**Blocks:** claims that the distributed binaries themselves have been independently authenticated or reproducibly matched to source.

### v31.1.0 runtime regression coverage

Release notes identify wallet, mining, mempool, RPC, validation, and PSBT updates in addition to the headline consensus changes.

MoreBC2's existing local command/node evidence is largely `v29.1.0`-scoped.

**Needed:** Current-release runtime records for core read-only node/RPC behavior and selected safe workflows.

**Blocks:** Claims that earlier local tests prove current-release behavior.

### v31.1.0 RPC runtime behavior

The documented mainnet RPC default is now source-confirmed as `8332`. The historical MoreBC2 `8337` observation belongs to a configured v29.1.0 environment.

**Needed:** fresh v31.1.0 startup, authentication, and RPC command records in an isolated test environment.

**Blocks:** claims that MoreBC2 has directly exercised current-release runtime behavior.

### ShockWave detailed validation and live behavior

MoreBC2 has source-backed current documentation for ShockWave activation and its high-level algorithm structure.

**Needed:** Detailed test/caller-path mapping plus empirical post-activation analysis of block timing, hashrate shocks, and emergency recovery behavior.

**Blocks:** Strong quantitative claims about ShockWave performance.

### Replay-protection transaction path

MoreBC2 has confirmed mainnet replay protection activation at height `57750` and fork ID `0x01324342`.

**Needed:** Detailed source review of transaction serialization/signing/validation behavior and wallet/service integration implications, plus reproducible transaction test vectors.

**Blocks:** Detailed integration guidance beyond the activation/fork-domain facts.

### Consensus data restrictions

MoreBC2 has confirmed `nDataRestrictionsHeight = 57750` and the `v31.1.0` release description of Ordinals, inscriptions, and Runes mitigation.

**Needed:** Detailed validation-path review and boundary testing.

**Blocks:** Precise claims about which data-carrier patterns are accepted or rejected.

### Fork-aware header synchronization

The `v31.1.0` release explicitly identifies fork-aware header synchronization.

**Needed:** Detailed source review and current-release runtime testing around competing-header/fork scenarios.

**Blocks:** Strong operational claims about all synchronization edge cases.

### Ticker status — resolved

`BC2` is source-confirmed in BitcoinII Core v31.1.0, including the formatted currency unit in `src/policy/feerate.h` and related BitcoinII UI/source references.

This is no longer treated as a highest-priority known unknown.

### Exchange confirmation recommendation

MoreBC2 has not established a recommended deposit/withdrawal confirmation policy for current v31 network conditions.

**Needed:** Maintainer recommendation or community-reviewed risk model informed by current ShockWave/reorg behavior.

### Technical/security contact process

MoreBC2 has not confirmed the preferred public contact process for exchanges, explorers, pools, wallet developers, or security reports.

**Needed:** Official contact page, repository guidance, or maintainer statement.

### Wallet and third-party compatibility

MoreBC2 has source-reviewed BitcoinII Core wallet behavior and dated public Electrum observations, but broad third-party wallet compatibility is not established.

**Needed:** Safe current-release compatibility records without private keys, real funds, or unnecessary broadcast risk.

### Active ecosystem resources

The primary explorer hierarchy was refreshed on 2026-09-12:

- `bitcoinii.ddns.net/explorer/` — Official BitcoinII Explorer
- `explorer.bitcoin-ii.org` — project-linked but independently operated/community-funded
- `bc2mempool.com` — supplemental public explorer/API service
- `bc2.live` — supplemental public frontend/service

Current web reachability does not establish long-term uptime or backend independence.

**Needed:** fresh direct protocol checks for documented REST paths, WebSocket, Electrum TCP/TLS, transaction broadcast, and any claimed redundant backend operators.

### Architecture and Source Atlas release drift

Many Source Atlas pages were written against pre-v31 source and remain useful first-pass structural reviews, but release-specific BitcoinII modifications can invalidate detailed assumptions.

**Needed:** Prioritized v31 spot-checks for files touched by the new consensus, validation, header-sync, wallet, mempool, RPC, mining, and PSBT changes.

## Historical evidence rule

Do not rewrite dated `v29.1.0` test or verification records to make them appear current.

Instead:

- preserve the historical record;
- label it clearly by version/date;
- add a new `v31.1.0` record when the workflow is re-tested.

## Verification

**Status:** Draft
**Primary sources checked:** Current `v31.1.0` release/source anchors, GitHub release/tag verification metadata, current public explorer observations, plus existing MoreBC2 evidence records
**Notes:** This page is an executive list. Ticker identity, documented v31.1.0 RPC default, six-asset release inventory, verified target-commit state, and explorer hierarchy were refreshed on 2026-09-12. Runtime validation, binary authentication, confirmation policy, technical contact process, and current protocol-level service testing remain open.
