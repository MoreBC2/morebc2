# Infrastructure status policy

**Category:** Infrastructure
**Status:** Draft
**Last reviewed:** 2026-09-12

## Purpose

This policy controls how MoreBC2 describes public BitcoinII / BC2 infrastructure.

It is meant to prevent dated observations, project-linked hostnames, or familiar API shapes from turning into broader claims about uptime, official operation, backend independence, wallet support, broadcast support, or custody suitability.

## Approved labels

Use the narrowest accurate label.

| Label | Meaning |
|---|---|
| Observed | A page, endpoint, or service responded during a dated check. |
| Locally Tested | A local BitcoinII Core command or behavior was exercised in a documented environment. |
| Same-time comparison | Two or more sources were compared during a recorded time window. |
| Partial | Useful evidence exists, but major behavior remains untested. |
| Unavailable | The service or endpoint failed in the recorded check. |
| Unknown | No current committed evidence is available. |
| Historical | Previously relevant evidence that should not be treated as current service state without a fresh check. |
| Roadmap | Planned or expected, but not current evidence. |

## Service-role labels

Service role and service health are separate claims.

Use role labels only when the evidence supports them:

- **Official** — a project-controlled or service-controlled source explicitly designates the service as official.
- **Project-linked** — the hostname or project documentation links the service, but that does not prove project operation.
- **Independently operated** — the service itself or another sufficiently direct source states independent operation.
- **Supplemental** — useful third-party/public infrastructure without official-project designation.

A hostname under `bitcoin-ii.org` is not, by itself, proof that the BitcoinII project operates the backend.

## What not to imply

Do not imply that a service is:

- permanently synced,
- reliable,
- official,
- project-operated,
- independently redundant,
- safe for custody,
- suitable as an exchange's only source of truth,
- wallet-compatible,
- valid-transaction broadcast-compatible,
- rate-limit stable,
- operated by a specific maintainer,
- covered by release or binary verification,

unless a committed evidence record directly supports that exact claim.

## Freshness

Live services can change quickly. Every service claim should include, where applicable:

- last checked date,
- evidence source,
- what was checked,
- what was not checked,
- known limitations.

If those fields are missing, use `Unknown`, `Historical`, or an equivalent qualified label rather than presenting the service as currently active.

A successful dated probe is evidence for that probe window only.

## Same-time comparisons

Use:

> matched at check time

or:

> reported the same height and best-block hash during the recorded comparison window

Do not automatically use:

> synced

A same-time match is valuable evidence but does not establish permanent synchronization, shared chain-selection behavior under every condition, or long-term reliability.

## Redundancy and independence

Multiple hostnames do not automatically equal multiple independent providers.

Before describing services as independent redundancy, look for separate evidence about:

- operators,
- node backends,
- databases/indexers,
- hosting/network providers,
- failure domains,
- service-control paths.

Closely aligned route shapes, schemas, values, WebSocket behavior, or error behavior may justify a caution that independence is **not established**. Those similarities do not, by themselves, prove a shared backend.

## HTTP status versus functional status

Transport success and application success are separate.

Examples:

- HTTP 200 with `success:false` means the route is reachable but the requested function did not succeed.
- HTTP 404 is evidence that the tested route was unavailable at that path/time.
- HTTP 500 is evidence of server-side failure for the tested request, not necessarily permanent service failure.
- A parameter-validation error can establish route presence without establishing successful operation for a complete request.

Document both the HTTP result and the application-level result when they differ.

## Transaction-submission evidence

Use strict wording for broadcast routes.

If an endpoint accepts POST and rejects deliberately invalid transaction data, safe wording is:

> transaction-submission route exists and rejects malformed input

That does **not** support:

> valid BC2 transaction broadcast tested

Successful valid-transaction broadcast requires an actual valid BC2 transaction test under an explicitly safe test plan and must be recorded separately.

## Electrum evidence

Successful `server.version`, TLS, or header calls establish protocol reachability for those methods only.

They do not establish:

- wallet compatibility,
- address-history correctness,
- fee behavior,
- transaction construction,
- transaction broadcast,
- long-running subscription stability,
- reconnect/load behavior.

## Public APIs versus operator nodes

Public explorer/API services are useful for observation and cross-checking, but MoreBC2 should not present them as replacements for an operator's own BitcoinII Core node in critical deposit, withdrawal, custody, or chain-risk workflows.

A service provider may use public infrastructure as secondary monitoring while retaining its own node as the primary authority.

## Maintainer and operator statements

Maintainer/operator statements can be recorded as context, but they should not be converted into unrelated technical evidence.

Example:

- acceptable: "The service identifies itself as independently run/community-funded."
- not acceptable: "The service is independently redundant at the backend level."

Similarly:

- acceptable: "The maintainer has indicated release signing is roadmap work."
- not acceptable: "Release signing exists."

## Verification

**Status:** Draft  
**Primary sources checked:** September 2026 infrastructure evidence, current MoreBC2 evidence language, and linked verification records  
**Notes:** This policy is editorial guidance. It does not independently verify any external service.
