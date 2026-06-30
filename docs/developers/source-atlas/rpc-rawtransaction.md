# Raw transaction RPC

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-30

## Summary

This page covers a first-pass review of:

- `src/rpc/rawtransaction.cpp`

This file contains non-wallet raw transaction and PSBT RPC behavior for reading raw transactions, creating unsigned transactions, decoding transaction/script data, combining signatures, signing with explicitly supplied keys, and working with PSBTs.

This is not a tested command guide. Examples should not be marked verified until they are run against BitcoinII Core in a safe local environment.

## Why this file matters

Raw transaction RPCs are important for:

- Explorers and services that inspect transactions outside the wallet.
- Offline or staged signing workflows.
- PSBT-based coordination.
- Advanced transaction construction.
- Descriptor-assisted PSBT processing.
- Service integrations that should not depend on wallet state.

These commands can be easy to misuse, so MoreBC2 should keep raw transaction examples separate from beginner wallet guides.

## Registered commands reviewed

`RegisterRawTransactionRPCCommands()` registers these commands in the `rawtransactions` category:

- `getrawtransaction`
- `createrawtransaction`
- `decoderawtransaction`
- `decodescript`
- `combinerawtransaction`
- `signrawtransactionwithkey`
- `decodepsbt`
- `combinepsbt`
- `finalizepsbt`
- `createpsbt`
- `converttopsbt`
- `utxoupdatepsbt`
- `descriptorprocesspsbt`
- `joinpsbts`
- `analyzepsbt`

This file does not register wallet RPCs. Wallet-specific signing and funding are covered by the wallet RPC source-atlas entries.

## Transaction lookup and decoding

Reviewed commands include:

- `getrawtransaction`
- `decoderawtransaction`
- `decodescript`

`getrawtransaction` behavior observed from source:

- By default, it only returns a transaction if it is in the mempool.
- With transaction indexing enabled and no block hash, it can return mempool or indexed block transactions.
- With a block hash, it looks in the specified block when available.
- It rejects the genesis block coinbase transaction as not an ordinary transaction.
- Verbosity 0 returns transaction hex.
- Verbosity 1 returns decoded transaction JSON plus block context when available.
- Verbosity 2 can include fee and previous-output information when undo data is available.
- It suggests `gettransaction` for wallet transactions.

`decoderawtransaction` decodes supplied transaction hex and can use witness/non-witness decoding controls.

`decodescript` decodes script hex, reports inferred script information, and conditionally reports P2SH or segwit wrapping information when the script is suitable.

## Raw transaction creation and combining

Reviewed commands include:

- `createrawtransaction`
- `combinerawtransaction`

`createrawtransaction` builds an unsigned transaction from supplied inputs, outputs, optional locktime, and replaceability settings. The reviewed help text says it is not stored in the wallet and is not transmitted to the network.

`combinerawtransaction` combines multiple partially signed raw transactions into one transaction. The reviewed code gathers input coins from chain and mempool views, merges signature data from variants, and returns encoded transaction hex.

## Explicit-key signing

Reviewed command:

- `signrawtransactionwithkey`

Reviewed behavior includes:

- Decoding supplied raw transaction hex.
- Loading explicitly provided private keys into a local signing provider.
- Looking up input coins through node coin lookup.
- Parsing optional previous-output data.
- Returning signed transaction hex, completion status, and per-input errors when present.

This command should be treated as advanced and sensitive in public docs because it handles private key material provided directly to RPC.

## PSBT support reviewed

Reviewed commands include:

- `decodepsbt`
- `combinepsbt`
- `finalizepsbt`
- `createpsbt`
- `converttopsbt`
- `utxoupdatepsbt`
- `descriptorprocesspsbt`
- `joinpsbts`
- `analyzepsbt`

Reviewed behavior includes:

- Decoding PSBTs into detailed input/output metadata.
- Combining compatible PSBT data.
- Finalizing PSBTs and optionally extracting a complete network transaction.
- Creating PSBTs from inputs, outputs, locktime, and replaceability settings.
- Converting unsigned raw transactions to PSBT form.
- Updating PSBT inputs from the UTXO set, mempool, transaction index, and descriptor data where available.
- Joining multiple distinct PSBTs, rejecting duplicate inputs across joined PSBTs.
- Analyzing PSBT completion state, missing data, estimated size, fee rate, fee, and next role.
- Descriptor-assisted PSBT processing, with optional signing and finalization.

## Relationship to wallet RPCs

Raw transaction RPCs and wallet RPCs overlap in user workflows, but they should stay conceptually separate:

- Raw transaction RPCs are node-level construction, decoding, and PSBT tools.
- Wallet RPCs add wallet-owned coins, wallet signing, wallet balance, wallet history, and wallet security state.
- Service docs should avoid mixing wallet-private-key commands with raw transaction examples unless the workflow explicitly requires it.

## Documentation implications

MoreBC2 should separate future raw transaction documentation into:

- Read-only lookup and decoding commands.
- Unsigned transaction construction.
- Explicit-key signing.
- PSBT creation/update/finalization.
- Descriptor-assisted PSBT workflows.
- Service-safe examples after local testing.

## BitcoinII-specific notes

This first-pass review saw BitcoinII naming and amount strings in RPC help text.

No upstream comparison has been completed, so this page does not claim whether raw transaction RPC behavior differs from upstream Bitcoin Core beyond naming and visible strings.

## Open questions

- Which raw transaction examples can be tested safely on regtest?
- Which commands belong in exchange/service documentation?
- Which PSBT workflow should MoreBC2 recommend for safer service integrations?
- Which examples need wallet RPCs versus raw transaction RPCs?
- Where are transaction broadcast and mempool acceptance RPCs implemented?
- How should txindex and pruned-node limitations be explained for services?

## Sources

- `src/rpc/rawtransaction.cpp`
- `src/rpc/rawtransaction_util.h`
- `src/node/transaction.h`
- `src/node/psbt.h`
- `src/wallet/rpc/spend.cpp`

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This is a first-pass raw transaction and PSBT RPC review. Commands have not been run. Public examples, service recommendations, broadcast/mempool RPC linkage, and upstream comparison remain open.
