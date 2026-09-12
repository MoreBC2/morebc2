# Electrum compatibility

**Category:** Compatibility
**Status:** Reviewed / Observed partial
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 has current dated read-only Electrum observations for BitcoinII infrastructure.

Successful Electrum protocol calls establish server reachability and limited protocol behavior. They do **not** prove compatibility with Electrum wallet software or other third-party wallets.

Canonical evidence:

- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [API Electrum page](../api/electrum.md)
- [Infrastructure service directory](../infrastructure/service-directory.md)

## Current tested endpoints

| Endpoint | 2026-09-11 result |
|---|---|
| `tcp://infra1.bitcoin-ii.org:50008` | Connected; `server.version` returned ElectrumX `1.18.0`, protocol `1.4`. |
| `ssl://infra1.bitcoin-ii.org:50009` | Connected over TLS 1.3; hostname certificate validation succeeded; `server.version` returned ElectrumX `1.18.0`, protocol `1.4`. |
| `tcp://explorer.bitcoin-ii.org:5008` | Timed out. |

The TLS certificate observed for `infra1.bitcoin-ii.org` was valid for that hostname and reported an expiry date of 2026-11-20 in the client environment.

## Historical protocol observations

The earlier July smoke test exercised additional read-only methods including:

- `server.version`
- `server.features`
- `blockchain.headers.subscribe`

That record observed protocol maximum `1.4.3` and the BitcoinII genesis hash:

```text
0000000028f062b221c1a8a5cf0244b1627315f7aa5b775b931cfec46dc17ceb
```

Those July details remain historical evidence. The September recheck establishes current endpoint reachability and server identity, not a complete repeat of every July method.

## Compatibility boundaries

Current evidence does not establish:

- Electrum wallet software compatibility;
- address/scripthash history correctness across wallet workflows;
- fee-estimate behavior in wallets;
- transaction construction or signing behavior;
- transaction broadcast through Electrum;
- long-running subscriptions;
- reconnect/load behavior;
- hardware-wallet integration;
- replay-protection-aware signing by third-party wallet stacks.

The older `explorer.bitcoin-ii.org:5008` candidate should not be presented as a working current endpoint because it timed out again in the September check.

## Safe wording

> BitcoinII currently has a reachable ElectrumX service at `infra1.bitcoin-ii.org` over TCP and TLS, with current read-only protocol reachability observed on 2026-09-11. Third-party Electrum-wallet compatibility remains unverified.

## Verification

**Status:** Reviewed / Observed partial  
**Primary sources checked:** 2026-09-11 public-infrastructure smoke test plus preserved July Electrum record  
**Notes:** Current evidence establishes read-only server reachability only; wallet and broadcast compatibility remain outside the tested scope.
