# BitcoinII Network Specifications

**Category:** Documentation
**Status:** Reviewed / Source-confirmed with bounded runtime evidence
**Last reviewed:** 2026-09-12

## Summary

This page records BitcoinII mainnet values checked against BitcoinII Core `v31.1.0` source, current release metadata, and bounded September 2026 runtime evidence.

Release-pinned source controls protocol/network constants. Runtime observations are listed separately so a local test is not mistaken for a protocol constant.

## Current release baseline

- Current documented release: `v31.1.0`
- Published: `2026-08-29T02:39:30Z`
- Canonical repository: https://github.com/Bitcoin-II/BitcoinII-Core
- Canonical release page: https://github.com/Bitcoin-II/BitcoinII-Core/releases
- Tag target commit: `8daaf7b12e71d3646eed787f040bf2899a69dc1c`

## Supply and units

Current source defines:

- formatted currency unit: `BC2`
- atom/minimum formatted unit label: `sat2`
- `COIN = 100000000`
- `MAX_MONEY = 21000000 * COIN`
- subsidy halving interval: `210000` blocks

The source ticker/unit value resolves the older MoreBC2 question about whether `BC2` had a current primary-source anchor.

## Block timing and current difficulty behavior

- Target block spacing: `10 * 60` seconds (10 minutes)
- Historical/inherited target timespan: `14 * 24 * 60 * 60` seconds
- Historical Bitcoin-style adjustment interval: 2016 blocks
- Current post-activation difficulty algorithm: **ShockWave per block**
- ShockWave activation height: `57750`

The 14-day / 2016-block values remain in chain parameters for inherited/historical behavior. They are **not** the current post-`57750` mainnet difficulty-adjustment schedule.

Current ShockWave source uses a 25-block sample / 24 timing intervals, shorter-horizon response logic, per-block adjustment bounds, timestamp safeguards, and emergency stall recovery. Exact consensus behavior remains defined by release-pinned code.

## v31.1.0 activation heights

| Rule | Height/value |
|---|---|
| Data restrictions | `57750` |
| ShockWave | `57750` |
| Replay protection | `57750` |
| Replay-protection fork/domain ID | `0x01324342` |

Earlier deployment parameters remain:

| Rule/deployment | Height or value |
|---|---|
| BIP34 | `250` |
| BIP65 | `260` |
| BIP66 | `270` |
| CSV | `280` |
| SegWit | `290` |
| Taproot deployment bit | `2` |
| Taproot minimum activation height | `300` |

## Proof of work

- `powLimit = 00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff`
- Block-header hashing path: double-SHA256
- Mainnet minimum-difficulty blocks: disabled
- Retargeting: enabled

Post-`57750` next-work calculation is ShockWave per block. Chain selection still uses accumulated chain work.

## Network identity

- Message start bytes: `0x42 0x49 0x49 0x21`
- Default mainnet P2P port: `8338`
- Prune-after height: `200000`
- Assumed blockchain size hint: `10`
- Assumed chain-state size hint: `10`

### Generated configuration caution

The release-generated example configuration contains inherited Bitcoin wording that describes the default P2P `-port` as `8333`.

BitcoinII `v31.1.0` mainnet chain parameters set `nDefaultPort = 8338`. For current BC2 network documentation, `8338` is the authoritative mainnet P2P default.

## RPC defaults and current runtime evidence

Current source/documentation defines these JSON-RPC defaults:

- Mainnet: `8332`
- Testnet3: `18332`
- Testnet4: `48332`
- Signet: `38332`
- Regtest: `18443`

RPC is operator-configurable and Qt does not expose RPC unless server mode is enabled.

MoreBC2's September 11 `v31.1.0` Windows mainnet validation used an explicit loopback override, `127.0.0.1:28332`, because local port `8332` was already occupied by unrelated software. Random-cookie authentication worked, and the node answered the requested current RPC methods.

That test therefore confirms current v31 RPC behavior under an explicit override; it does **not** mean `28332` is a BitcoinII default.

A historical `v29.1.0` MoreBC2 test used configured port `8337`. That remains historical configured-runtime evidence only.

## September 11 mainnet runtime identity

The isolated Windows `v31.1.0` node reported:

- chain: `main`
- runtime version: `310100`
- subversion: `/BitcoinII:31.1.0/`
- protocol version: `70016`
- P2P listener: `0.0.0.0:8338`
- first-run outbound peers: `4`
- restart outbound peers: `6`
- pruning: disabled by default in the test
- optional indexes: none enabled in the test

The bounded run acquired the current header chain and advanced block validation during initial block download, then restarted cleanly against retained disposable chain state.

## Genesis block

- Timestamp text: `BBC News 12/04/2024 French government collapses in no-confidence vote`
- Time: `1734019071`
- Nonce: `1597163478`
- Bits: `0x1d00ffff`
- Version: `1`
- Reward: `50 * COIN`
- Genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`
- Merkle root: `80d1b4e9ca868f83b88b9301036205876072bdd3ded0ad4dc022e1f9266ddc49`

## Checkpoints

The current `v31.1.0` mainnet checkpoint table contains 23 entries and currently extends through:

- height `57752`
- hash `000000000000000013ceffe797280c57f75a5b9f1d9e70c3503584058c322576`

See [Checkpoints](checkpoints.md) for the release-pinned list and evidence boundary.

## Chain work and assume-valid

Release-specific chain-data fields in `v31.1.0` include:

- Minimum chain work: `0000000000000000000000000000000000000000000000959028194ff1139272`
- Default assume-valid hash: `00000000000000067e82c9cebc8b58e70f0be31908598d3240a4ecbaa527682e`

These are moving release-specific values and should always be labeled by version.

## DNS seeds

`v31.1.0` mainnet chain parameters explicitly list:

- `dnsseed.bitcoin-ii.org.`

Older MoreBC2 material recorded `bitcoinII.ddns.net.` from older source. Treat that older seed as historical unless re-established in current release source.

## Address prefixes

- Base58 P2PKH prefix: `0`
- Base58 P2SH prefix: `5`
- Base58 secret-key prefix: `128`
- Extended public key: `04 88 B2 1E`
- Extended secret key: `04 88 AD E4`
- Bech32 HRP: `bc`

These Bitcoin-like encodings do **not** imply ordinary Bitcoin signing compatibility after the v31 replay-protection activation. Wallets/external signers must handle the BC2 signature domain correctly.

## Current safe summary

> BitcoinII is a native proof-of-work blockchain with 10-minute target spacing, double-SHA256 block-header hashing, and ShockWave per-block difficulty adjustment active from mainnet height 57750.

## Evidence boundary

Current source and runtime evidence establish the values above, but MoreBC2 has not yet completed:

- a full source-build/reproducible-build validation;
- a full mainnet initial-block-download run in the September environment;
- controlled activation-boundary vectors for replay/data restrictions/ShockWave;
- inbound-P2P testing;
- broad third-party wallet/external-signer compatibility testing.

## Related pages

- [Consensus overview](consensus-overview.md)
- [Checkpoints](checkpoints.md)
- [Architecture](../architecture/README.md)
- [Compatibility](../compatibility/README.md)
- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Source-confirmed with bounded runtime evidence  
**Primary sources checked:** BitcoinII Core `v31.1.0` release-pinned chain parameters, consensus/difficulty source, unit definitions, generated configuration, RPC documentation, checkpoint table, and September 11 v31 Windows runtime record  
**Notes:** Current network constants and principal v31 behavior are source-confirmed. Mainnet P2P `8338`, current node identity, outbound peer operation, and configurable loopback RPC were also directly observed in the bounded Windows test.
