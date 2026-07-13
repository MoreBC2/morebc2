# Read-only examples

**Category:** Developer platform
**Status:** Draft / Locally tested partial
**Last reviewed:** 2026-07-12

## Summary

This page summarizes BitcoinII read-only command examples that have a dated local test record.

Canonical evidence:

- [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md)
- [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)

## Locally tested environment

The 2026-07-10 smoke test used:

- BitcoinII Core `v29.1.0`
- Windows
- mainnet
- local GUI node
- local-only RPC at `127.0.0.1:8337`
- cookie authentication
- `bitcoinII-cli.exe`

This is one documented environment, not a guarantee for every platform, release, or configuration.

## Tested read-only commands

The following commands succeeded in the 2026-07-10 smoke test:

| Command | Status | Publication note |
|---|---|---|
| `getblockcount` | Locally Tested | Suitable as a harmless read-only example; output is time-dependent. |
| `getbestblockhash` | Locally Tested | Suitable as a harmless read-only example; output is time-dependent. |
| `getblockchaininfo` | Locally Tested | Suitable with clear example-output labeling. |
| `getnetworkinfo` | Locally Tested | Suitable only with local/public address fields omitted or redacted. |
| `getconnectioncount` | Locally Tested | Suitable as a harmless read-only example. |
| `getpeerinfo` | Locally Tested | Raw output is not safe for publication without redacting peer/local addresses and session fields. |
| `getmempoolinfo` | Locally Tested | Suitable as a harmless read-only example; output is time-dependent. |
| `getdifficulty` | Locally Tested | Suitable as a harmless read-only example; output is time-dependent. |
| `uptime` | Locally Tested | Suitable as a harmless read-only example. |

## Command prefix used in evidence record

The exact prefix is preserved in [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md).

Do not copy local paths into general user instructions without adapting them to the user's installation.

## Commands not covered here

The smoke test does not support treating the following as safe public examples:

- wallet commands,
- private-key commands,
- seed or descriptor commands,
- address-generation commands,
- transaction creation or broadcast commands,
- mining commands,
- import/export commands,
- peer-control commands,
- shutdown,
- any state-changing RPC.

## Output privacy rules

Do not publish raw output that includes:

- peer IP addresses,
- local bind addresses,
- local service addresses,
- session identifiers,
- RPC credentials,
- cookie contents,
- wallet data.

## Verification

**Status:** Draft / Locally tested partial  
**Primary sources checked:** [Read-only RPC smoke test - 2026-07-10](../verification/read-only-rpc-smoke-test-2026-07-10.md), [Local BitcoinII node inspection - 2026-07-10](../verification/local-node-inspection-2026-07-10.md)  
**Notes:** This page summarizes locally tested read-only commands. It does not broaden the tested scope.
