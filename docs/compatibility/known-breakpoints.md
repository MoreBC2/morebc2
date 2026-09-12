# Known compatibility breakpoints

**Category:** Compatibility
**Status:** Reviewed / Risk map
**Last reviewed:** 2026-09-12

## Summary

This page lists compatibility assumptions that can break BitcoinII / BC2 integrations.

The items here are risks and boundaries, not blanket claims that a specific third-party product is broken.

## v31.1.0 consensus breakpoint

BitcoinII Core `v31.1.0` activates several BitcoinII-specific rules at mainnet height `57750`:

- ShockWave per-block difficulty adjustment;
- consensus-level data restrictions;
- BC2 replay protection.

The release also adds fork-aware header synchronization and associated wallet, mining, mempool, RPC, validation, and PSBT changes.

Integrations built around older BitcoinII assumptions should be re-reviewed against `v31.1.0` rather than assuming pre-v31 behavior remains valid.

## Difficulty assumptions

**Risk:** monitoring, mining, explorer, or risk systems may assume difficulty changes only every 2016 blocks.

That is historical pre-ShockWave behavior. Current post-height-`57750` BitcoinII difficulty may change every block.

Any integration that infers expected work, confirmation safety, or next-difficulty timing from Bitcoin's 2016-block retarget model can be wrong on current BC2.

## Address and replay assumptions

**Risk:** Bitcoin tooling may recognize Bitcoin-like address encodings and incorrectly assume Bitcoin transaction-domain behavior.

BitcoinII retains Bitcoin-like Base58/Bech32 encodings, but `v31.1.0` activates explicit BC2 replay protection at height `57750` with fork/domain id `0x01324342`.

Address-format similarity is therefore not evidence that Bitcoin signing logic, hardware-wallet behavior, external signers, or transaction replay semantics are interchangeable.

## External signer assumptions

**Risk:** a wallet or hardware-signing stack may support Bitcoin-like addresses and PSBTs but still lack BC2 replay-domain-aware sighash handling.

The `v31.1.0` source trace shows the replay domain entering wallet, PSBT, raw-transaction, signature-hash, mempool, and block-validation paths. The external-signer wallet path explicitly rejects signing when replay-domain semantics cannot be supplied.

BitcoinII Core's own isolated PSBT lifecycle has been runtime-tested, but third-party and external-signer compatibility remains unverified.

## Data-carrier assumptions

**Risk:** software may assume Bitcoin-style Ordinals/inscription/Runes-related behavior transfers directly to BitcoinII.

`v31.1.0` activates BitcoinII-specific consensus-level data restrictions at height `57750`. Detailed compatibility effects still require workflow-specific testing.

## Header synchronization assumptions

**Risk:** node-management or explorer software may assume pre-v31 header synchronization behavior.

`v31.1.0` includes fork-aware header synchronization. Integrations that depend on header-processing edge cases should be tested against the current release rather than older BitcoinII or Bitcoin Core behavior.

## Genesis assumptions

**Risk:** Bitcoin tooling may assume Bitcoin's genesis hash.

BitcoinII genesis hash:

```text
0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb
```

Tools that cannot configure or validate the BitcoinII genesis hash may misidentify the chain even if other address/network conventions look familiar.

## Network identifiers

**Risk:** software may hard-code Bitcoin chain names, network magic, ticker symbols, or default ports.

Current BitcoinII mainnet source uses:

- message-start bytes `42 49 49 21`;
- default P2P port `8338`;
- ticker `BC2`;
- smallest-unit label `sat2`.

## RPC assumptions

**Risk:** integrations may hard-code ports from inherited Bitcoin examples or historical MoreBC2 tests.

Current mainnet RPC default is `8332`, but RPC is operator-configurable. Earlier MoreBC2 v29 testing used `8337`, while the bounded v31 Windows validation used a temporary loopback test port `28332` because `8332` was already occupied by unrelated software.

Neither historical nor test-only ports should be promoted as a BC2 default.

## Bitcoin Core RPC-equivalence assumptions

**Risk:** successful calls to familiar JSON-RPC methods may be mistaken for complete Bitcoin Core equivalence.

Current v31 testing covers a meaningful subset of node, network, blockchain, mempool, wallet, PSBT, raw-transaction, and shutdown behavior. It does not prove identical arguments, error codes, response schemas, defaults, or edge cases across the full Bitcoin Core RPC surface.

## Public API assumptions

**Risk:** integrations may assume all BC2 explorer APIs are interchangeable.

`bc2mempool.com`, `explorer.bitcoin-ii.org`, and `bc2.live` expose closely aligned mempool.space-style interfaces. The Official BitcoinII Explorer exposes a materially different API shape.

Different hostnames among the mempool-style services also do not prove independent infrastructure.

## Broadcast assumptions

**Risk:** an API route rejecting malformed transaction data may be treated as proven broadcast support.

The mempool-style `/api/tx` routes returned HTTP 400 for deliberately invalid payloads, establishing route existence and validation behavior. No valid public transaction broadcast was performed in the current compatibility record.

The Official Explorer's tested broadcast candidates returned HTTP 403.

## Electrum assumptions

**Risk:** a successful Electrum handshake may be treated as proof that a third-party wallet works.

Current checks establish read-only ElectrumX reachability at `infra1.bitcoin-ii.org:50008` and `:50009`. They do not establish wallet history, signing, fee estimation, broadcast, reconnect behavior, or hardware-wallet compatibility.

The older `explorer.bitcoin-ii.org:5008` candidate timed out again in the September recheck.

## Confirmation/finality assumptions

**Risk:** Bitcoin-like confirmation counts or an exchange field named `irreversible` may be treated as mathematical finality.

Current BC2 exchange policies differ materially: CoinEx exposes a `2` / `6` staged policy while NonKYC and NestEx each expose 50-confirmation settings. Those are service policies, not consensus guarantees.

Current BitcoinII chain selection is work-based, and ShockWave changes per-block difficulty behavior. Operational risk systems should not assume equal block counts always imply equal added work.

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Exchange confirmation evidence — 2026-09-12](../verification/exchange-confirmation-evidence-2026-09-12.md)

## Verification

**Status:** Reviewed / Risk map  
**Primary sources checked:** Current v31.1.0 source/runtime records, 2026-09-11 public-infrastructure evidence, and 2026-09-12 exchange-confirmation evidence  
**Notes:** This page identifies compatibility breakpoints supported by current evidence. It does not declare any specific untested third-party product incompatible.
