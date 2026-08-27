# Service integration checklist

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This checklist tracks what a service provider should verify before integrating BitcoinII (BC2).

It is a documentation checklist only. It does not replace technical review, security review, or maintainer guidance.

## Project identity

- [ ] Project name confirmed as BitcoinII.
- [ ] Ticker source confirmed as BC2.
- [ ] Official website confirmed.
- [ ] Recheck the recorded canonical `Bitcoin-II/BitcoinII-Core` repository path for changes before submission.
- [ ] Release page confirmed.
- [ ] Technical contact process confirmed.

## Software and releases

- [ ] Current release identified.
- [ ] Release assets reviewed.
- [ ] Checksum model reviewed.
- [ ] Signature model reviewed.
- [ ] Build or binary verification process documented.
- [ ] Upgrade procedure documented.

## Node operation

- [ ] Mainnet P2P port confirmed.
- [ ] RPC port confirmed.
- [ ] Configuration file reviewed.
- [ ] Data directory paths reviewed.
- [ ] Indexing and pruning behavior reviewed.
- [ ] Monitoring needs reviewed.

## RPC and service access

- [ ] RPC access restricted to trusted systems.
- [ ] Authentication method reviewed.
- [ ] Required commands tested.
- [ ] Error cases documented.
- [ ] Logs and alerting reviewed.

## Chain behavior

- [ ] Target block spacing confirmed.
- [ ] Difficulty behavior confirmed.
- [ ] Reorganization handling reviewed.
- [ ] Confirmation policy reviewed.
- [ ] Explorer fallback reviewed.

## Wallet behavior

- [ ] Address generation reviewed.
- [ ] Balance reporting reviewed.
- [ ] Transaction history review tested.
- [ ] Backup and restore process documented.
- [ ] Recovery procedure documented.

## Documentation status

- [ ] Integration package reviewed.
- [ ] Operator guide reviewed.
- [ ] Known unknowns reviewed.
- [ ] Open questions resolved or accepted as risks.

## Verification

**Status:** Draft
**Primary sources checked:** Not applicable
**Notes:** This checklist is a framework. Each item should link to evidence before the guide is treated as complete.
