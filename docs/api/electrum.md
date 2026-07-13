# Electrum

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-07-12

## Summary

MoreBC2 has dated read-only Electrum observations for BitcoinII infrastructure.

The canonical evidence is [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md).

## Observed endpoints

| Endpoint | Status at check time | Evidence |
|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; read-only calls succeeded. | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |
| `ssl://infra1.bitcoin-ii.org:50009` | Connected; TLS hostname validation passed; read-only calls succeeded. | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |
| `tcp://explorer.bitcoin-ii.org:5008` | DNS resolved; TCP timed out. | [Public API/Electrum smoke test](../verification/public-api-electrum-smoke-test-2026-07-12.md) |

## Read-only methods used

Only these standard read-only Electrum methods were used in the smoke test:

- `server.version`
- `server.features`
- `blockchain.headers.subscribe`

No wallet-history, address-history, transaction-broadcast, private-key, seed, or account-gated methods were used.

## Observed protocol and chain facts

For the working `infra1.bitcoin-ii.org` TCP and SSL endpoints, the smoke test recorded:

- server software: `ElectrumX 1.18.0`
- protocol: `1.4`
- maximum protocol: `1.4.3`
- observed BitcoinII genesis hash:

```text
0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb
```

The returned header height and hash matched the local node and REST API tip during the check window. See [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md).

## Compatibility boundaries

Electrum connection success does not prove wallet compatibility.

The current evidence does not establish:

- BlueWallet compatibility,
- Cake Wallet compatibility,
- Komodo Wallet compatibility,
- watch-only wallet behavior,
- address-history behavior,
- fee-display correctness inside wallets,
- transaction construction safety,
- transaction broadcast safety,
- correct ticker or unit labeling inside third-party wallets.

## Safe wording

Use:

- "Electrum read-only calls succeeded"
- "TLS hostname validation passed for the SSL endpoint"
- "header matched local/REST tip at check time"
- "wallet compatibility remains unverified"

Do not use:

- "BC2 wallets are supported"
- "Electrum wallet compatibility is proven"
- "safe for spending"
- "broadcast tested"

## Verification

**Status:** Draft / Observed partial  
**Primary sources checked:** [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)  
**Notes:** This page summarizes read-only Electrum observations. It does not establish wallet compatibility.
