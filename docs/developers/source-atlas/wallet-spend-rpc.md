# Wallet spend and PSBT RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/wallet/rpc/spend.cpp`

This file contains wallet RPC behavior for sending funds, fee settings, transaction funding, fee bumping, signing with wallet data, and PSBT workflows.

This is not a user command guide. Spend-related commands can move funds or prepare fund-moving transactions, so examples should not be marked verified until they are tested on a temporary wallet and reviewed carefully.

## Why this file matters

Spend RPCs are among the highest-impact wallet commands.

For MoreBC2, this file matters because it touches:

- Direct wallet sends.
- Multi-recipient sends.
- Fee selection and fee-rate units.
- Replace-by-fee behavior.
- Coin selection options.
- Change output handling.
- Raw-transaction funding.
- PSBT creation, update, signing, and finalization.
- Fee bumping for eligible wallet transactions.

## Helper behavior reviewed

Reviewed helper behavior includes:

- Recipient construction from destination/amount pairs.
- Fee-estimation option handling.
- Subtract-fee-from-output option parsing.
- Outdated option-name rejection for newer snake_case names.
- Wallet signing/finalization through PSBT helper paths.
- Coin-control option parsing for funding commands.
- Change address and change position validation.
- Watch-only inclusion handling.
- Input lock handling.
- Solving-data parsing for non-wallet or external inputs.

## Direct send behavior reviewed

Reviewed direct spend commands include:

- `sendtoaddress`
- `sendmany`
- `send`
- `sendall`

Observed behavior includes:

- Wallet unlock is required for direct wallet signing paths.
- Wallets with private-key handling disabled cannot use direct send paths that require local signing.
- Recipients are validated before transaction creation.
- Fee settings can be automatic or explicit depending on command/options.
- Replaceability is controlled through wallet defaults or command options.
- Some commands can return either transaction IDs, raw transaction hex, or PSBT output depending on options and completion state.

## Fee and funding behavior reviewed

Reviewed commands and helpers include:

- `settxfee`
- `FundTransaction`
- `walletcreatefundedpsbt`
- `fundrawtransaction`

Observed behavior includes:

- `settxfee` stores a wallet-specific fee rate after checking relay, wallet minimum, and wallet maximum fee bounds.
- Funding commands can add wallet inputs automatically.
- Funding options include change address, change position, change type, minimum/maximum confirmations, include watch-only, input locking, explicit fee rate, confirmation target, and replaceability.
- The reviewed code distinguishes newer `fee_rate` units from older `feeRate` behavior.
- Some options are accepted for backwards compatibility but newer names are preferred.

## Fee bumping behavior reviewed

Reviewed fee-bump commands include:

- `bumpfee`
- `psbtbumpfee`

Observed behavior includes:

- Fee bumping targets an existing opt-in replaceable wallet transaction.
- `bumpfee` creates and commits a new wallet transaction when signing succeeds.
- `psbtbumpfee` returns a PSBT instead of committing a signed transaction.
- The replacement can reduce or reuse change outputs and may add inputs when needed.
- The new fee rate must satisfy incremental relay requirements.
- The reviewed help text warns about fee-rate unit changes from older versions.

## Signing and PSBT behavior reviewed

Reviewed commands include:

- `signrawtransactionwithwallet`
- `walletprocesspsbt`
- `walletcreatefundedpsbt`

Observed behavior includes:

- Raw transaction signing decodes the supplied transaction, looks up previous outputs from chain data and optional inputs, then signs with wallet data when available.
- `walletprocesspsbt` updates a PSBT with wallet data, can sign, can include BIP32 derivation data, and can finalize when possible.
- `walletcreatefundedpsbt` creates and funds a PSBT from inputs, outputs, locktime, and funding options.

## Send-all behavior reviewed

The reviewed `sendall` path supports sweeping selected or available wallet coins while accounting for fee rate, dust checks, transaction weight, optional input locking, and remainder distribution across outputs without specified amounts.

This command should be treated as advanced and tested only on a temporary wallet before any user-facing example is published.

## Documentation implications

MoreBC2 should separate spend documentation into tiers:

- Read-only wallet status commands.
- Receive/address commands.
- Safe backup commands.
- Transaction preparation commands.
- PSBT/offline signing workflows.
- Direct send commands.
- Advanced sweeping and fee-bump commands.

Commands that can move funds should not appear casually in exchange or beginner docs without explicit safety notes and tested examples.

## Relationship to other pages

Related pages:

- [Source atlas: wallet RPC](wallet-rpc.md)
- [Source atlas: wallet backup/import RPC](wallet-backup-import-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [RPC overview](../rpc-overview.md)
- [Service integration checklist](../../exchange/service-integration-checklist.md)

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and amount-unit strings in wallet RPC help text.

No upstream comparison has been completed, so this page does not claim whether spend RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which spend examples can be tested safely on regtest or a temporary wallet?
- Which commands should be documented only for developers or advanced operators?
- Which PSBT workflow should MoreBC2 recommend for safer service integrations?
- How should fee-rate units be explained across wallet and mining RPC docs?
- Which wallet coin-selection defaults matter to normal users?
- Which GUI send paths map to these RPC helpers?
- Confirm whether `v29.1.0` differs from current `main` for this file before upgrading status.

## Sources

- Current observed `main` `src/wallet/rpc/spend.cpp`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/rpc/spend.cpp
- Current observed `main` `src/wallet/wallet.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/wallet.h
- Current observed `main` `src/wallet/spend.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/spend.h
- Current observed `main` `src/wallet/coincontrol.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/coincontrol.h
- Current observed `main` `src/wallet/fees.h`: https://github.com/Bitcoin-II/BitcoinII-Core/blob/main/src/wallet/fees.h

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass spend/PSBT/funding RPC review. Commands have not been run. Public examples, service recommendations, GUI mapping, upstream comparison, and release-versus-main comparison remain open.
