# Infrastructure status policy

**Category:** Infrastructure
**Status:** Draft
**Last reviewed:** 2026-07-12

## Purpose

This policy controls how MoreBC2 describes public BitcoinII / BC2 infrastructure.

It is meant to prevent dated observations from turning into broad service guarantees.

## Approved labels

Use the narrowest accurate label.

| Label | Meaning |
|---|---|
| Observed | A page, endpoint, or service responded during a dated check. |
| Locally Tested | A local BitcoinII Core command or behavior was exercised in a documented environment. |
| Same-time comparison | Two sources were compared during a recorded time window. |
| Partial | Useful evidence exists, but major behavior remains untested. |
| Unavailable | The service or endpoint failed in the recorded check. |
| Unknown | No current committed evidence is available. |
| Roadmap | Planned or expected, but not current evidence. |
| Historical | Previously relevant but not current without a fresh check. |

## What not to imply

Do not imply that a service is:

- permanently synced,
- reliable,
- official,
- safe for custody,
- suitable as an exchange's only source of truth,
- wallet-compatible,
- broadcast-compatible,
- rate-limit stable,
- operated by a specific maintainer,
- covered by release or binary verification,

unless a committed evidence record directly supports that exact claim.

## Freshness

Live services can change quickly. Every service claim should include:

- last checked date,
- evidence source,
- what was checked,
- what was not checked,
- known limitations.

If those fields are missing, use `Needs Review` or `Unknown`.

## Same-time comparisons

Use this wording:

> matched at check time

Do not use this wording:

> synced

unless a stronger evidence process exists and the claim is scoped to that process.

## Maintainer statements

Maintainer statements can be recorded as context, but they should not be converted into technical evidence unless the statement itself is the claim being documented.

Example:

- acceptable: "The maintainer has indicated release signing is roadmap work."
- not acceptable: "Release signing exists."

## Verification

**Status:** Draft  
**Primary sources checked:** MoreBC2 evidence language in [Verification evidence index](../verification/verification-index.md) and related verification records  
**Notes:** This policy is editorial guidance. It does not verify any external service.
