# Local development environment

**Category:** Developer guide
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page defines how MoreBC2 should document local BitcoinII Core development environments.

It intentionally avoids presenting untested build commands as verified.

Use this page as the safe contributor starting point until Linux, Windows, macOS, and CI build paths are directly tested.

## Goal

A local development guide should eventually help contributors:

- Clone the correct BitcoinII Core repository.
- Identify the source version being reviewed.
- Install build dependencies.
- Build daemon, CLI, and GUI targets where supported.
- Run unit and functional tests.
- Start a local node safely.
- Keep test data separate from real wallet data.
- Record exact command results for MoreBC2 verification.

## Current repository note

Current MoreBC2 review work observes this public source path:

- `https://github.com/Bitcoin-II/BitcoinII-Core`

Project-controlled GitHub metadata reviewed on 2026-07-10 supports this as the current canonical public reference-implementation repository. Repository ownership or location can still change, so contributors should recheck the [source registry](../../SOURCE_REGISTRY.md) before long-lived automation.

## Safety rule

Do not run development builds against a real wallet or production data directory unless you know exactly what you are doing.

For testing, use a separate data directory and a test chain mode when available.

## Environment checklist

Before documenting a build as tested, record:

- Operating system and version.
- CPU architecture.
- BitcoinII repository path.
- Branch, tag, or commit hash.
- Dependency installation method.
- Build command used.
- Test command used.
- Whether GUI support was enabled.
- Whether wallet support was enabled.
- Exact result.
- Date tested.

## Repository checklist

Before building, contributors should verify:

- The repository URL is the intended source.
- The branch or tag is documented.
- The working tree is clean.
- Submodules, if any, are initialized when required.
- Build instructions are taken from repository docs or tested locally, not guessed.

## Build documentation levels

### Framework

A page exists, but commands have not been tested.

### Locally tested

Commands were run successfully by a contributor in a named environment.

### Reproduced

Commands were successfully repeated by another contributor or CI job.

### Release-grade

Build behavior is documented well enough for release or exchange/service use, including verification of source, dependencies, and artifacts.

## Suggested test matrix

| Platform | Build target | Status | Notes |
|---|---|---|---|
| Linux | Daemon and CLI | Not tested | First priority. |
| Linux | GUI | Not tested | Requires GUI dependencies. |
| Windows | Daemon and CLI | Not tested | Needs Windows-specific instructions. |
| Windows | GUI | Not tested | Needs release/build review. |
| macOS | Daemon and CLI | Not tested | Needs platform review. |
| macOS | GUI | Not tested | Needs platform review. |

## Suggested command-record format

Use this format when someone tests a command:

```md
### Test record

**Date tested:** YYYY-MM-DD
**Tester:** Name or handle
**OS:** Example: Ubuntu 24.04 x86_64
**Repository:** owner/repo
**Commit:** full commit hash
**Command:** `command here`
**Result:** Pass / Fail
**Notes:** Short notes, including error output if failed.
```

## Local data-directory rule

Development testing should use a separate data directory.

Document the data directory used in test records. Do not use examples that could accidentally point users at their real wallet data unless the page clearly explains the risk.

## Suggested first verified path

The first path MoreBC2 should verify is:

1. Clean Linux environment.
2. Clone BitcoinII Core from the confirmed source path.
3. Build daemon and CLI only.
4. Run the most basic available test target.
5. Start the daemon with a temporary data directory.
6. Call a harmless local RPC command.
7. Shut down cleanly.

This path should be documented only after it is actually performed.

## Relationship to other pages

- [Build system guide](build-system.md) should explain the build system itself.
- [Testing guide](testing.md) should explain test organization and commands.
- [Release process guide](release-process.md) should explain public release artifacts and verification.
- This page should explain the local contributor environment.

## Open questions

- How should contributors detect and respond to a future canonical-repository move?
- Which Linux distribution should MoreBC2 use for first verified builds?
- Which dependency set is required for daemon-only builds?
- Which dependency set is required for GUI builds?
- Which test command is safest as the first documented smoke test?
- Does BitcoinII use any BitcoinII-specific build configuration beyond naming and asset changes?

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This guide defines the local-development documentation workflow. It does not yet contain verified build commands. Canonical-source wording was synchronized from the dated project-identity evidence on 2026-08-27.
