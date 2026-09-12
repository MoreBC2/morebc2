# Contributing to MoreBC2

**Status:** Public contribution workflow
**Last reviewed:** 2026-09-12

## Summary

MoreBC2 is an independently maintained, source-backed documentation and verification project for BitcoinII (BC2). Contributions should make the evidence easier to inspect without making claims stronger than the evidence supports.

MoreBC2 is not the official BitcoinII project, release channel, or reference implementation.

## Licensing of contributions

The repository uses the path-scoped licensing model described in [`LICENSE`](LICENSE):

- original MoreBC2 documentation: CC BY 4.0;
- original MoreBC2 software, site tooling, configuration, tests, and rights-cleared project assets: MIT;
- third-party material: remains under its own applicable terms and is not automatically relicensed.

Submit only material you have authority to contribute. Identify third-party material, its source, and its license. Do not submit proprietary, confidential, or restricted material without compatible permission.

Contributors retain their copyright. MoreBC2 does not currently impose a separate contributor license agreement or Developer Certificate of Origin.

## Core rule

Document what the evidence supports.

Clearly label what it does not support.

Do not promote uncertainty, inference, memory, or community assumption into fact.

## Evidence authority is claim-specific

Use the source that has authority for the particular claim:

- release-pinned BitcoinII Core source for protocol/implementation facts;
- official release metadata for release identity and asset inventory;
- dated local-test records for the exact behavior tested;
- direct public-service observations for point-in-time explorer/API/network behavior;
- an exchange or service's own API/docs for that service's operational policy;
- project-controlled website/docs for public project links and positioning;
- attributed maintainer statements or community discussion only within their proper evidentiary scope.

An exchange API can be primary evidence for that exchange's confirmation policy while being irrelevant as authority for BitcoinII consensus. Likewise, an official website can be project-controlled but still contain older technical wording than the current release source.

See [EVIDENCE_SCALE.md](EVIDENCE_SCALE.md) and [SOURCE_REGISTRY.md](SOURCE_REGISTRY.md).

## Repository workflow

Use a short-lived branch for a focused change. Changes should normally enter `main` through a pull request rather than a direct push.

Preferred flow:

1. Keep the pull request limited to one understandable purpose.
2. Cite or link the evidence for factual changes.
3. Run the relevant repository checks.
4. Ask for substantive review when the change affects technical meaning, verification status, security, build/deploy behavior, or broad project policy.
5. Do not approve your own substantive work as its independent review.
6. Merge only when the requested review and validation are complete.

The current repository `CODEOWNERS` file assigns effective review ownership to `@toiletslayer`, including workflow/build/deployment-sensitive paths. That records review ownership; it does not make every direct push or owner-authored change independently reviewed.

## Repository safety and privacy

Do not commit:

- secrets, API tokens, passwords, private keys, seed phrases, or RPC credentials;
- personal information that is not necessary for the documentation;
- real wallet backup material;
- unredacted private local paths when a neutral placeholder is sufficient;
- exploit details that belong in a private security report.

Use disposable test data and isolated environments where practical. If sensitive material is exposed, stop sharing it publicly and follow [`SECURITY.md`](SECURITY.md).

## Status labels

Use page status conservatively:

- **Draft** — useful material exists but important review/work remains.
- **Framework** — structure, policy, or checklist material rather than a completed factual record.
- **Partial** — meaningful evidence exists, but coverage is incomplete.
- **Reviewed** — a substantive review pass has been performed within the page's stated scope.
- **Needs Review** — important content remains unchecked or stale.
- **Verified** — use only when the page's stated verification scope has actually been met.

A current page does not need to be marked Verified. Draft or Reviewed can be the correct mature label when unresolved production or evidence boundaries remain.

## Page verification blocks

Substantial pages should end with a verification block that says what was checked and what remains outside scope:

```md
## Verification

**Status:** Draft / Framework / Partial / Reviewed / Needs Review / Verified
**Primary sources checked:** ...
**Notes:** ...
```

Do not use a verification block as decoration. Its wording should match the actual evidence.

## Source review workflow

When reviewing BitcoinII source:

1. Name the repository.
2. Pin the branch, tag, or commit when the claim is version-sensitive.
3. Name the file path.
4. Describe only the behavior actually reviewed.
5. Separate source-confirmed behavior from runtime-tested behavior.
6. Preserve activation heights, network scope, and other important conditions.
7. Add unresolved questions instead of filling gaps by assumption.

Current-facing protocol documentation should prefer the `v31.1.0` release-pinned source unless a page explicitly targets another version.

## Command and runtime examples

A command example is not verified merely because it resembles Bitcoin Core syntax.

A strong test record identifies:

- date;
- operating system;
- BitcoinII Core version/ref;
- network;
- node/wallet state;
- command or procedure;
- expected and actual result;
- isolation/safety conditions;
- pass/fail and caveats.

Keep wallet-moving, signing, key-management, or live-submission examples out of beginner copy/paste material unless the surrounding safety and prerequisites are explicitly reviewed.

See [Command testing status](docs/verification/command-testing.md), [Windows v31.1.0 node and RPC validation — 2026-09-11](docs/verification/windows-v31-node-rpc-validation-2026-09-11.md), and [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](docs/verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## Release claims

Keep source provenance, byte integrity, signatures, and reproducibility separate.

For the current `v31.1.0` release, MoreBC2 records GitHub asset digest metadata and a cryptographically verified target commit, while a standalone maintainer-signed checksum manifest, per-binary detached signatures, documented release-signing-key process, and reproducible-build proof remain unestablished.

Do not collapse those distinctions into “the binaries are verified.”

See [BitcoinII Core v31.1.0 release assets](docs/releases/v31.1.0-assets.md).

## Ecosystem and service claims

Do not list an explorer, API, pool, exchange, wallet, or service as currently active without a direct recent check appropriate to the claim.

A useful service record includes status, URL/endpoint, last checked date, what was directly observed, and what was not established.

Do not infer:

- uptime from one successful request;
- independent redundancy from different hostnames;
- valid transaction broadcast from an endpoint rejecting malformed data;
- wallet compatibility from a read-only Electrum handshake;
- protocol finality from an exchange field named `irreversible`.

## Documentation-site changes

The public site is generated from the repository and deployed through the Cloudflare Pages production workflow on `main`.

Relevant changes should pass the repository's documented checks. The deployment workflow also performs a generated-output private-path scan and a live indexing-policy check.

A successful site build/deployment means the tooling checks passed for that commit. It does **not** make every factual claim in the published content Verified.

## Suggested feedback buckets

Useful issue/review labels include:

- `source-mismatch`
- `stale-link`
- `unclear-status`
- `unsupported-claim`
- `missing-source`
- `command-not-tested`
- `ecosystem-needs-check`
- `release-verification`
- `wording-polish`
- `navigation-crosslink`
- `open-question`
- `good-first-review`

## Good first contributions

Good first tasks are deliberately narrow: fix a broken link, check one claim against one source, add a missing verification note, update one dated service observation, improve one cross-link, or add one well-scoped open question.

Changes that deserve extra review include broad multi-page rewrites, Verified promotions, consensus wording changes, install/recovery guides, wallet movement, active ecosystem claims, security-sensitive material, and build/deployment changes.

## Tone and naming

Use plain, useful language without hype or investment advice. Help newcomers without talking down to experienced readers.

Use **BitcoinII** for the project, **BC2** for the ticker, and **BitcoinII Core** for the reference node/wallet software. Avoid **Bitcoin2** except when documenting historical third-party usage.

## Related pages

- [Project status](PROJECT_STATUS.md)
- [Evidence scale](EVIDENCE_SCALE.md)
- [Source registry](SOURCE_REGISTRY.md)
- [Writing checklist](WRITING_CHECKLIST.md)
- [Documentation coverage](docs/documentation-coverage.md)
- [Known unknowns](docs/verification/known-unknowns.md)
- [Open questions](docs/verification/open-questions.md)
- [Security policy](SECURITY.md)

## Verification

**Status:** Reviewed
**Primary sources checked:** Current MoreBC2 project status, evidence scale/source registry, CODEOWNERS, security policy, current v31 verification records, and production deployment workflow
**Notes:** Refreshed on 2026-09-12. Review/enforcement practices may evolve as additional maintainers and reviewers participate.