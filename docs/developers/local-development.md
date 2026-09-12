# Local development environment

**Category:** Developer guide
**Status:** Reviewed / Framework
**Last reviewed:** 2026-09-12

## Summary

This page defines how MoreBC2 should document local BitcoinII Core development environments.

The canonical public source path remains:

- `https://github.com/Bitcoin-II/BitcoinII-Core`

Current MoreBC2 technical work uses release `v31.1.0` as the baseline unless a test or review is explicitly historical.

## Important current boundary

MoreBC2 has now run substantial **release-binary** `v31.1.0` testing on Windows using fresh disposable data directories and wallets. That includes node/RPC behavior and an isolated regtest PSBT lifecycle.

MoreBC2 has **not yet** documented a clean source build of BitcoinII Core `v31.1.0` on Windows, Linux, or macOS. Do not describe the runtime validations as source-build verification.

See:

- [Windows v31.1.0 node and RPC validation](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)
- [Build system guide](build-system.md)
- [Testing guide](testing.md)

## Safety rule

Development and runtime testing should use a fresh, explicitly named data directory and disposable wallet unless the procedure specifically requires otherwise.

Do not open, copy, rescan, import, unlock, inspect, or spend from an existing user wallet as part of a documentation test. Public-network submission should be a separate, explicitly scoped test rather than an accidental side effect of a local workflow.

## Environment checklist

Before documenting a build or runtime procedure as tested, record:

- operating system and version;
- CPU architecture;
- source repository and tag/commit, or exact release artifact;
- dependency installation method for source builds;
- build command, when applicable;
- test/runtime command or launch arguments;
- network selection;
- data-directory and wallet isolation;
- whether GUI and wallet support were enabled;
- exact result;
- date tested.

## Repository checklist

Before building, verify:

- repository URL is the intended source;
- branch/tag/commit is recorded;
- working tree is clean;
- submodules/dependencies are handled according to source documentation;
- commands come from current repository documentation or a dated successful test, not assumption.

Prefer release-pinned source when documenting current release behavior.

## Evidence levels for development work

### Source-documented

The command or option exists in repository documentation/source, but MoreBC2 has not run it.

### Locally tested

The command/procedure succeeded in a named environment with a dated record.

### Reproduced

The same important behavior was independently repeated in another environment or CI context.

### Release-grade

The build/release workflow has enough source, dependency, artifact, test, and provenance evidence for operational reliance.

A release binary successfully running is not the same as a source build reaching Release-grade status.

## Current source-build matrix

| Platform | Build target | MoreBC2 source-build status | Notes |
|---|---|---|---|
| Linux | Daemon and CLI | Not yet executed | High-value first reproducible source-build target |
| Linux | GUI | Not yet executed | Requires GUI dependencies |
| Windows | Daemon and CLI | Not yet executed | Release-binary runtime evidence exists separately |
| Windows | GUI | Not yet executed | v31 Qt release binary has bounded runtime evidence; source build remains open |
| macOS | Daemon and CLI | Not yet executed | Needs platform review |
| macOS | GUI | Not yet executed | Needs platform review |

## Suggested first verified source-build path

The next useful development milestone is:

1. create a clean Linux environment;
2. clone the canonical BitcoinII Core repository;
3. check out tag `v31.1.0` and record the resolved commit;
4. build daemon and CLI using current repository instructions;
5. run the basic/default test target;
6. start the resulting daemon with a fresh disposable data directory and safe test-chain configuration;
7. call harmless loopback RPC;
8. stop cleanly and record artifact hashes/results.

Publish the commands as tested only after this is actually performed.

## Current open questions

- Which clean Linux distribution/environment should be the first reproducible source-build reference?
- Which dependency versions are required in practice for daemon/CLI and GUI builds?
- Which unit/functional subset gives the best first regression signal for v31-specific behavior?
- Can the resulting binaries be reproduced deterministically enough to strengthen release authentication?
- What additional platform-specific behavior appears under Windows/macOS source builds?

## Verification

**Status:** Reviewed / Framework  
**Primary sources checked:** Current canonical repository, v31 build-system review, and September 11 release-binary runtime records  
**Notes:** The guide now distinguishes current release-binary testing from still-unexecuted source-build workflows and strengthens the disposable-data/wallet safety boundary.