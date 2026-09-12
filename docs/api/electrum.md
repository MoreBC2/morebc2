# Electrum

**Category:** Developer platform
**Status:** Draft / Observed partial
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 has current read-only Electrum observations for BitcoinII infrastructure from 2026-09-11.

Canonical current evidence: [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md).

The older July smoke test remains historical evidence but is no longer the primary current reference.

## Current observed endpoints

| Endpoint | Status at 2026-09-11 check | Evidence |
|---|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; `server.version` succeeded. | [September infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) |
| `ssl://infra1.bitcoin-ii.org:50009` | Connected over TLS 1.3; hostname validation succeeded; `server.version` succeeded. | [September infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out again. | [September infrastructure smoke test](../verification/public-infrastructure-smoke-test-2026-09-11.md) |

## Observed protocol details

For the working `infra1.bitcoin-ii.org` endpoints, the September check observed:

- server software: `ElectrumX 1.18.0`
- protocol: `1.4`
- TLS 1.3 on the SSL endpoint
- certificate hostname validation succeeded for `infra1.bitcoin-ii.org`
- certificate expiry observed by the client: 2026-11-20

Earlier testing also observed the BitcoinII genesis hash through Electrum metadata:

```text
0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb
```

## What was and was not exercised

The current September recheck established protocol reachability through `server.version` and TLS behavior.

Earlier July testing additionally used:

- `server.features`
- `blockchain.headers.subscribe`

No MoreBC2 record currently establishes:

- wallet-history correctness,
- address/scripthash history correctness,
- watch-only wallet behavior,
- fee behavior inside third-party wallets,
- transaction construction,
- successful Electrum transaction broadcast,
- long-running subscriptions,
- reconnect/load behavior,
- BlueWallet, Cake Wallet, Komodo Wallet, or other third-party wallet compatibility.

## Current endpoint guidance

Use `infra1.bitcoin-ii.org:50008` and `:50009` only as **dated observed Electrum service endpoints**.

Do not publish `explorer.bitcoin-ii.org:5008` as a working current endpoint; it timed out in both the historical and current checks.

Electrum connectivity should not be presented as proof that a specific wallet safely supports BC2.

## Verification

**Status:** Draft / Observed partial  
**Primary source checked:** [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)  
**Notes:** Current read-only TCP/TLS reachability is established. Wallet compatibility, history semantics, spending behavior, and Electrum broadcast remain unverified.