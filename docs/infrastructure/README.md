# BitcoinII infrastructure

**Category:** Infrastructure
**Status:** Draft / Evidence-linked summary
**Last reviewed:** 2026-09-12

## Summary

This section tracks public BitcoinII / BC2 infrastructure and the evidence MoreBC2 has gathered about it.

The strongest current public-infrastructure record is the [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md). That test directly rechecked the Official BitcoinII Explorer, three Mempool-style public services, their WebSocket surfaces, Electrum endpoints, and public transaction-submission route behavior.

This section does **not** certify permanent uptime, synchronization, operator independence, custody suitability, wallet compatibility, successful valid-transaction broadcast, or service-provider reliability.

## Current infrastructure classes

Use these classes consistently:

- **Official BitcoinII Explorer** — `https://bitcoinii.ddns.net/explorer/`; explicitly identifies itself as the Official BitcoinII Explorer and exposes its own materially different API surface.
- **Project-linked, independently operated explorer** — `https://explorer.bitcoin-ii.org`; hosted under the BitcoinII domain but identifies itself as independently run/community-funded, with CapsPool.io infrastructure.
- **Supplemental Mempool-style services** — `https://bc2mempool.com` and `https://bc2.live`.
- **Electrum service** — `infra1.bitcoin-ii.org` on TCP `50008` and TLS `50009` was reachable in the 2026-09-11 read-only check.

Do not treat the three Mempool-style hostnames as three independent redundancy providers without separate backend/operator evidence.

## Primary current evidence

- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Public endpoints](../api/public-endpoints.md)
- [Explorers](../ecosystem/explorers.md)
- [APIs](../ecosystem/apis.md)
- [Compatibility](../compatibility/README.md)
- [Verification evidence index](../verification/verification-index.md)

Historical context remains available in:

- [Public API, WebSocket, and Electrum smoke test — 2026-07-12](../verification/public-api-electrum-smoke-test-2026-07-12.md)
- [Local BitcoinII node inspection — 2026-07-10](../verification/local-node-inspection-2026-07-10.md)
- [Project identity source check — 2026-07-10](../verification/project-identity-source-check-2026-07-10.md)

## Pages

- [Service directory](service-directory.md) — current public-service directory with dated status and evidence boundaries.
- [Status policy](status-policy.md) — wording rules for service status, freshness, independence, and limitations.

## Infrastructure status rules

Use the narrowest accurate wording:

- **Observed** — checked during a dated public or local record.
- **Same-time comparison** — compared with another source during a recorded window.
- **Partial** — useful evidence exists, but important behavior remains open.
- **Unavailable** — checked but not reachable or not working in the recorded check.
- **Unknown** — not yet checked or not recorded clearly enough.
- **Historical** — useful past evidence, but not current service-state evidence.
- **Roadmap** — expected or planned, not current evidence.

A route returning HTTP 200 may still be functionally disabled at the application layer. A route returning HTTP 400 to deliberately invalid transaction data proves route existence/rejection behavior, not successful valid broadcast. A same-time tip match proves point-in-time agreement, not permanent synchronization.

## 2026-09-12 audit record

| Page | Audit result |
|---|---|
| `README.md` | Updated to make the September infrastructure check primary and to classify current service roles. |
| `service-directory.md` | Updated from July-era status to current explorer/API/WebSocket/Electrum evidence and current service classifications. |
| `status-policy.md` | Updated with explicit rules for service ownership, redundancy, application-level failures, and broadcast evidence. |

## Verification

**Status:** Draft / Evidence-linked summary  
**Primary sources checked:** September 2026 public-infrastructure record plus linked API, ecosystem, compatibility, and verification records  
**Notes:** This section summarizes committed evidence. It does not independently establish long-term reliability, custody suitability, or operator independence.
