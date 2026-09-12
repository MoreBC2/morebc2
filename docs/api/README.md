# BitcoinII API documentation

**Category:** Developer platform
**Status:** Draft / Evidence-linked summary
**Last reviewed:** 2026-09-12

## Summary

This section collects BitcoinII / BC2 developer-platform notes for public APIs, Electrum, WebSockets, and local JSON-RPC examples.

The pages here summarize dated MoreBC2 evidence. They are not service guarantees, complete API specifications, or a replacement for operating a BitcoinII Core node for critical infrastructure.

Newest primary evidence:

- [Public infrastructure smoke test — 2026-09-11](../verification/public-infrastructure-smoke-test-2026-09-11.md)
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31 PSBT/replay validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Verification evidence index](../verification/verification-index.md)

The July API/Electrum and v29 RPC records remain historical evidence where useful, but September evidence should take precedence for current service/runtime wording.

## Pages

- [REST API](rest.md) — current public REST surfaces, including the Official BitcoinII Explorer and Mempool-style services.
- [WebSocket](websocket.md) — current WebSocket reachability on the three Mempool-style services.
- [Electrum](electrum.md) — current read-only Electrum reachability and TLS observations.
- [Public endpoints](public-endpoints.md) — service-oriented endpoint directory with route-level qualifications.
- [Read-only examples](read-only-examples.md) — current locally tested v31.1.0 JSON-RPC examples and publication cautions.
- [mempool.space compatibility](mempool-space-compatibility.md) — tested similarities, extensions, and known gaps.

## Section audit — 2026-09-12

| Page | Audit result |
|---|---|
| `README.md` | Updated to September evidence. |
| `rest.md` | Updated to September multi-service evidence. |
| `websocket.md` | Updated from one July host to three September-tested hosts. |
| `electrum.md` | Updated to September TCP/TLS recheck. |
| `read-only-examples.md` | Updated to current v31.1.0 local RPC evidence. |
| `mempool-space-compatibility.md` | Updated to September route and broadcast-rejection evidence. |
| `public-endpoints.md` | Reviewed; already current from 2026-09-12 work. |

## Evidence language

Use narrow labels:

- **Locally Tested** — exercised against a documented local BitcoinII Core environment.
- **Observed** — seen from a public endpoint or service during a dated check.
- **Same-time comparison** — compared against another source in the same test window.
- **Route present / invalid payload rejected** — a submission route accepted the HTTP method and rejected deliberately malformed data; this is not successful broadcast evidence.
- **Not yet verified** — not tested or insufficiently evidenced.
- **Known limitation** — a specific gap or failed behavior recorded in evidence.

## Current boundaries

Current evidence supports much stronger service documentation than the July snapshot, but several boundaries remain important:

- Public endpoint availability does not establish uptime or an SLA.
- Same-time chain-tip agreement does not establish permanent synchronization or independent redundancy.
- Electrum read-only success does not prove wallet or spending compatibility.
- Mempool-style REST similarity does not prove complete `mempool.space` drop-in compatibility.
- Invalid-transaction rejection on `/api/tx` proves route presence only; successful valid BC2 broadcast through those public services remains unverified.
- Public explorer APIs should not replace an operator's own BitcoinII Core node for custody-critical workflows.

## Verification

**Status:** Draft / Evidence-linked summary  
**Primary sources checked:** September 2026 public-infrastructure and v31.1.0 local-runtime verification records linked above  
**Notes:** Full API section audited on 2026-09-12. Historical July records are retained where useful, but current wording now follows the newer September evidence.