# Service integration checklist

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-09-12

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
- [ ] GitHub asset-digest model reviewed.
- [ ] Commit/tag signature evidence reviewed.
- [ ] Standalone checksum/signature availability reviewed.
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
- [ ] Required commands tested against the intended BitcoinII Core release.
- [ ] Error cases documented.
- [ ] Logs and alerting reviewed.

## Chain behavior

- [ ] Target block spacing confirmed.
- [ ] ShockWave per-block difficulty behavior reviewed.
- [ ] Best-work / cumulative-chainwork behavior reviewed.
- [ ] Reorganization handling reviewed.
- [ ] Provisional 50-confirmation normal-deposit baseline reviewed against [current exchange evidence](../verification/exchange-confirmation-evidence-2026-09-12.md).
- [ ] Operator-specific large/unusual deposit hold policy documented.
- [ ] Chainwork and tip-health alert thresholds documented.
- [ ] Explorer/API fallback reviewed.

## Wallet behavior

- [ ] Address generation reviewed.
- [ ] Wallet-based versus non-wallet deposit scanning architecture chosen.
- [ ] Balance reporting reviewed.
- [ ] Transaction history / raw transaction lookup behavior tested.
- [ ] Backup and restore process documented.
- [ ] Recovery procedure documented.
- [ ] Replay-protection behavior reviewed for the intended signer/custody stack.

## Deposit and withdrawal policy

- [ ] Normal deposit-credit threshold documented.
- [ ] Confirmation count clearly labeled as exchange policy, not protocol finality.
- [ ] Large-value / unusual-deposit escalation documented.
- [ ] Credited-deposit reorg rollback behavior documented.
- [ ] Withdrawal eligibility after recent deposits documented.
- [ ] Fee estimation and broadcast monitoring documented.
- [ ] Manual review and emergency wallet-disable procedure documented.

## Documentation status

- [ ] Integration package reviewed.
- [ ] Operator guide reviewed.
- [ ] Deposit monitoring guide reviewed.
- [ ] Exchange confirmation evidence reviewed.
- [ ] Known unknowns reviewed.
- [ ] Open questions resolved or accepted as risks.

## Verification

**Status:** Draft
**Primary sources checked:** Current MoreBC2 exchange integration package, current v31.1.0 runtime/source evidence, and 2026-09-12 exchange confirmation evidence
**Notes:** This checklist now reflects the provisional 50-confirmation normal-deposit baseline and chainwork-aware risk model. Each deployment-specific item still needs operator evidence before the integration is treated as production-ready.