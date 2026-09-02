# Known compatibility breakpoints

**Category:** Compatibility
**Status:** Draft / Risk map
**Last reviewed:** 2026-09-02

## Summary

This page lists compatibility assumptions that can break BitcoinII / BC2 integrations.

The items here are risks and boundaries, not blanket claims that a specific third-party product is broken.

## v31.1.0 consensus breakpoint

BitcoinII Core `v31.1.0` activates several BitcoinII-specific rules at mainnet height `57750`:

- ShockWave per-block difficulty adjustment;
- consensus-level data restrictions;
- BC2 replay protection.

The release also adds fork-aware header synchronization and associated wallet, mining, mempool, RPC, validation, and PSBT updates.

Integrations built around older BitcoinII assumptions should be re-reviewed against `v31.1.0` rather than assuming source/API behavior is unchanged.

## Difficulty assumptions

Risk: monitoring, mining, explorer, or risk systems may assume difficulty only changes every 2016 blocks.

That is historical behavior before ShockWave activation. Current post-57750 BitcoinII difficulty may change every block.

## Address and replay assumptions

Risk: Bitcoin tooling may recognize Bitcoin-like address encodings and incorrectly assume Bitcoin transaction-domain behavior.

BitcoinII retains Bitcoin-like Base58/Bech32 encodings, but `v31.1.0` activates explicit BC2 replay protection at height `57750` with fork ID `0x01324342`.

Address-format similarity should not be used as evidence that cross-chain transaction behavior is identical.

## Data-carrier assumptions

Risk: software may assume Bitcoin-style Ordinals/inscription/Runes-related transaction behavior transfers directly to BitcoinII.

`v31.1.0` activates BitcoinII-specific consensus-level data restrictions at height `57750`. Detailed compatibility effects still require workflow-specific testing.

## Header synchronization assumptions

Risk: node-management or explorer software may assume pre-v31 header synchronization behavior.

`v31.1.0` includes fork-aware header synchronization. Integrations that depend on header-processing edge cases should be re-tested against the current release.

## Genesis assumptions

Risk: Bitcoin tooling may assume Bitcoin's genesis hash.

BitcoinII genesis hash:

```text
0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb
```

Tools that cannot configure or validate the BitcoinII genesis hash may misidentify the chain.

## Network identifiers

Risk: software may hard-code Bitcoin chain names, network magic, ticker symbols, or explorer assumptions.

BitcoinII mainnet message-start bytes are `42 49 49 21` and default P2P port is `8338`.

## RPC assumptions

Risk: integrations may hard-code an RPC port from inherited Bitcoin-style example material or from one historical local test.

Generated configuration has shown `8332`, while a dated MoreBC2 `v29.1.0` Windows test used `8337`. Verify the exact current release and active configuration.

## Fee, wallet, and broadcast assumptions

Risk: source/API compatibility may be mistaken for complete operational compatibility.

MoreBC2 has not yet re-tested all state-changing wallet, PSBT, fee-estimation, and broadcast workflows under `v31.1.0`.

## Electrum/API assumptions

Earlier dated smoke tests remain evidence for the versions/services tested at that time, not a guarantee of current complete compatibility.

Known earlier API limitations included missing mempool.space-style address UTXO endpoints and no generic `/api/v1` base response. Those should be rechecked before current integration claims.

## Sources

- BitcoinII Core `v31.1.0` release: https://github.com/Bitcoin-II/BitcoinII-Core/releases/tag/v31.1.0
- [Network specifications](../documentation/network-specifications.md)
- [Consensus overview](../documentation/consensus-overview.md)
- [Exchange integration package](../exchange/integration-package.md)
- [Public API/Electrum smoke test — historical](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [Read-only RPC smoke test — historical](../verification/read-only-rpc-smoke-test-2026-07-10.md)

## Verification

**Status:** Draft / Risk map
**Primary sources checked:** Current `v31.1.0` release/source anchors plus existing dated compatibility records
**Notes:** Current v31-specific breakpoints are now represented. Workflow-specific third-party compatibility still requires direct testing.