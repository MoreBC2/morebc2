# Wallet coins and balances RPC

**Category:** Developer / Source Atlas  
**Status:** Source-reviewed / Runtime-tested partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps wallet coin/balance RPC behavior centered on `src/wallet/rpc/coins.cpp` for the current BitcoinII Core `v31.1.0` documentation baseline.

The earlier page said none of these commands had been run. That is no longer current: `getbalances` was exercised successfully on a fresh disposable `v31.1.0` regtest descriptor wallet during the September PSBT validation. Other received-amount, UTXO-listing, and lock-state methods remain source-reviewed unless a separate dated test says otherwise.

## Commands reviewed

- `getreceivedbyaddress`
- `getreceivedbylabel`
- `getbalance`
- `getunconfirmedbalance`
- `getbalances`
- `lockunspent`
- `listlockunspent`
- `listunspent`

## Runtime evidence — `getbalances`

The September 11 isolated regtest test created a fresh disposable descriptor wallet, mined only disposable regtest funds to it with `generatetoaddress`, and called `getbalances` before constructing the PSBT spend.

That establishes `getbalances` worked for the documented `v31.1.0` wallet/environment.

No existing user wallet was opened, copied, rescanned, imported, unlocked, inspected, or spent from.

See [Windows v31.1.0 PSBT and replay-protection validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md).

## Balance command behavior

Source review shows balance methods synchronize wallet results to chain state and can distinguish categories such as trusted, untrusted-pending, and immature funds according to the command/wallet configuration.

`getunconfirmedbalance` is deprecated in favor of the relevant `getbalances` field in the reviewed source.

Wallet balance output is wallet state, not an exchange accounting ledger. Confirmation requirements, watch-only state, coinbase maturity, wallet ownership, and wallet policy can all change reported categories.

## Received amount helpers

`getreceivedbyaddress` and `getreceivedbylabel` use common received-value logic with filters such as ownership and minimum confirmations. Source review also accounts for immature coinbase handling where applicable.

These methods were not exercised in the September v31 runtime test.

## UTXO listing

`listunspent` exposes wallet outputs subject to confirmation, address, safety, and query-option filters.

Reviewed fields/options cover areas such as:

- minimum/maximum confirmations;
- optional address filters;
- `include_unsafe`;
- amount/count/sum query constraints;
- immature coinbase handling;
- transaction/output identifiers;
- amount and confirmations;
- spendable/solvable/safe state;
- descriptor/parent-descriptor information where available.

MoreBC2 has not yet produced a current v31 runtime `listunspent` fixture for public documentation.

## Output lock state

`lockunspent` / `listlockunspent` manage wallet-local output-selection state.

They can affect later wallet spending behavior and should not be treated as harmless read-only examples merely because no transaction is broadcast. No current v31 lock/unlock workflow has been runtime-tested by MoreBC2.

## Miner-specific balance caveat

Fresh coinbase outputs are subject to coinbase maturity before ordinary spending. A pool's dashboard balance or payout-accounting balance is also conceptually distinct from a BitcoinII Core wallet's `getbalances` categories.

See [Mining overview](../../mining/mining-overview.md).

## Replay-protection boundary

Balance/UTXO inspection itself does not require producing a replay-domain signature. Spending selected outputs does.

Any workflow that moves from `listunspent` or balance inspection into wallet/raw/PSBT signing must use the BC2 replay-protection domain after mainnet height `57750`.

See [Wallet spend and PSBT RPC](wallet-spend-rpc.md) and [Replay protection v31](replay-protection-v31.md).

## Service integration caution

For exchanges/custody systems:

- do not equate wallet balance with customer ledger balance;
- define confirmation/maturity rules independently;
- test the exact wallet/index/pruning/custody architecture used;
- use transaction/UTXO-level accounting where the service model requires it;
- keep private signing material and wallet RPC behind appropriately restricted administrative boundaries.

## Related pages

- [Wallet RPC](wallet-rpc.md)
- [Wallet spend and PSBT RPC](wallet-spend-rpc.md)
- [Wallet guide](../../wallets/wallet-guide.md)
- [Deposit monitoring](../../exchange/deposit-monitoring.md)
- [Windows v31 PSBT validation](../../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Open work

- Runtime-test `getbalance`, `listunspent`, and selected received-amount queries with disposable fixtures.
- Test immature coinbase visibility/maturity transitions on isolated regtest if useful.
- Keep `lockunspent` state-changing examples out of beginner docs until a dedicated workflow exists.

## Primary sources

Pinned/current review scope includes:

- `v31.1.0/src/wallet/rpc/coins.cpp`
- `v31.1.0/src/wallet/receive.*`
- `v31.1.0/src/wallet/spend.*`
- `v31.1.0/src/wallet/wallet.*`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Source-reviewed / Runtime-tested partial  
**Primary evidence:** BitcoinII Core `v31.1.0` wallet source plus September 11 disposable regtest wallet/PSBT runtime record  
**Notes:** `getbalances` is current-release runtime-observed. Received-amount, UTXO-listing, output-lock, watch-only, and maturity edge-case behavior remains source-reviewed or untested.
