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

Fresh MoreBC2 Windows records now cover isolated v31.1.0 node/RPC startup and a disposable regtest PSBT lifecycle, but they do not cover every production path.

**Needed:** longer-duration/current-release coverage for production-relevant daemon, indexing, fee, wallet, and broadcast behaviors.

**Blocks:** claims that the bounded current tests prove all production behavior.

### v31.1.0 RPC runtime behavior

The documented mainnet RPC default is source-confirmed as `8332`. The historical MoreBC2 `8337` observation belongs to a configured v29.1.0 environment.

Fresh isolated v31.1.0 Windows testing has exercised cookie-authenticated loopback JSON-RPC, peer discovery, initial sync, selected read-only node/network commands, shutdown, and restart.

**Still needed:** production-oriented daemon deployment, long-duration behavior, optional index/pruning combinations, fee estimation, and custody workflows.

### ShockWave detailed validation and live behavior

MoreBC2 has source-backed current documentation for ShockWave activation and its high-level algorithm structure.

**Needed:** Detailed test/caller-path mapping plus empirical post-activation analysis of block timing, hashrate shocks, and emergency recovery behavior.

**Blocks:** Strong quantitative claims about ShockWave performance.

### Replay-protection transaction path

MoreBC2 has confirmed mainnet replay protection activation at height `57750` and fork ID `0x01324342`.

A fresh isolated regtest PSBT workflow exercised normal v31.1.0 signing/finalization/mempool paths, and source review traced replay-protection use through signing, PSBT, mempool, block validation, cache, and activation logic. Regtest leaves the mainnet replay activation disabled as shipped.

**Still needed:** mainnet/external-signer vectors and third-party implementation compatibility.

**Blocks:** claims that every signer/service has been runtime-validated against the BC2 replay domain.

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

### Exchange confirmation recommendation — partially resolved

Current direct exchange evidence recorded on 2026-09-12 establishes:

- CoinEx: `safe_confirmations = 2`, `irreversible_confirmations = 6`;
- NonKYC: `confirmsRequired = 50`;
- NestEx: explicit BC2 backend `conf = 50`;
- Biconomy: BC2 listing confirmed, but current BC2 confirmation count and withdrawal availability not publicly verified.

MoreBC2 now uses **50 confirmations as a provisional normal-deposit baseline** because two independently queried BC2 venues explicitly use 50. This is operational guidance, not a BitcoinII consensus rule or maintainer mandate.

**Still needed:** community/maintainer review, a concrete cumulative-chainwork monitoring example, empirical reorganization history, and operational thresholds for large/unusual deposits.

**Blocks:** presenting 50 as mathematical finality or as a universal mandatory exchange rule.

See [Exchange confirmation evidence — 2026-09-12](exchange-confirmation-evidence-2026-09-12.md).

### Technical/security contact process

MoreBC2 has not confirmed the preferred public contact process for exchanges, explorers, pools, wallet developers, or security reports.

**Needed:** Official contact page, repository guidance, or maintainer statement.

### Wallet and third-party compatibility

MoreBC2 has source-reviewed BitcoinII Core wallet behavior and fresh read-only Electrum reachability evidence, but broad third-party wallet compatibility is not established.

**Needed:** Safe current-release compatibility records without private keys, real funds, or unnecessary broadcast risk.

### Public infrastructure independence and production behavior

Fresh 2026-09-11 direct checks now establish current point-in-time REST, WebSocket, Electrum, and invalid-broadcast rejection behavior across the documented public infrastructure.

The Official BitcoinII Explorer exposed a distinct v2.0.0 API surface. `bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` exposed closely aligned Mempool-style REST/WebSocket behavior.

**Still needed:**

- evidence of backend/operator independence where multiple public services are counted as redundancy;
- long-term uptime/reliability evidence;
- successful broadcast of a valid BC2 transaction through any public submission service, if that proof becomes necessary;
- wallet-level Electrum compatibility and Electrum transaction-broadcast behavior;
- periodic dated rechecks because public services can change.

**Resolved from the earlier queue:** current REST route reachability, Mempool-style WebSocket handshakes, Electrum TCP/TLS read-only reachability, TLS hostname validation, and existence/rejection behavior of `/api/tx` on the three tested Mempool-style services.

See [Public infrastructure smoke test — 2026-09-11](public-infrastructure-smoke-test-2026-09-11.md).

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
**Primary sources checked:** Current `v31.1.0` release/source anchors, GitHub release/tag verification metadata, current MoreBC2 v31 runtime records, current public infrastructure checks, and current-dated exchange API evidence
**Notes:** Ticker identity, documented v31.1.0 RPC default, six-asset release inventory, verified target-commit state, current bounded node/RPC and PSBT runtime evidence, explorer hierarchy, public REST/WebSocket/Electrum reachability, invalid public-broadcast rejection behavior, and a provisional evidence-based exchange confirmation baseline have been refreshed. Binary authentication, production custody workflows, chainwork thresholds, technical contact process, successful valid public transaction broadcast, and backend/operator independence remain open.