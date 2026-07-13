# Electrum compatibility

**Category:** Compatibility
**Status:** Draft / Observed partial
**Last reviewed:** 2026-07-13

## Summary

MoreBC2 has dated read-only Electrum observations for BitcoinII infrastructure.

Electrum connection success does not prove wallet compatibility.

Canonical evidence:

- [Public API, WebSocket, and Electrum smoke test - 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [API Electrum page](../api/electrum.md)
- [Infrastructure service directory](../infrastructure/service-directory.md)

## Tested servers

| Endpoint | Status at check time |
|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; read-only calls succeeded. |
| `ssl://infra1.bitcoin-ii.org:50009` | Connected; TLS hostname validation passed; read-only calls succeeded. |
| `tcp://explorer.bitcoin-ii.org:5008` | DNS resolved; TCP timed out. |

## Read-only methods tested

Only these methods were used:

- `server.version`
- `server.features`
- `blockchain.headers.subscribe`

No wallet-history, address-history, transaction broadcast, wallet subscription, private-key, seed, or account-gated methods were used.

## Observed protocol details

For the working `infra1.bitcoin-ii.org` TCP and SSL endpoints, the smoke test recorded:

- server software: `ElectrumX 1.18.0`
- protocol: `1.4`
- maximum protocol: `1.4.3`
- genesis hash: `0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb`

The returned header height and hash matched the local node and REST API tip during the check window.

## SSL observations

The SSL endpoint `ssl://infra1.bitcoin-ii.org:50009` accepted the checked read-only calls, and TLS hostname validation passed in the 2026-07-12 smoke test.

## Infrastructure boundaries

Current evidence does not establish:

- wallet compatibility,
- address-history correctness,
- fee-estimate behavior in wallets,
- transaction construction behavior,
- transaction broadcast behavior,
- long-running subscription behavior,
- load or reconnect behavior.

## Verification

**Status:** Draft / Observed partial  
**Primary sources checked:** Existing public API/Electrum smoke-test record linked above  
**Notes:** This page summarizes read-only Electrum observations. It does not establish wallet compatibility.
