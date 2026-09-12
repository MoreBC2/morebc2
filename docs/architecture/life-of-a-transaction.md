# Life of a transaction

**Category:** Architecture
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Summary

This page explains the BitcoinII transaction lifecycle at a high level: construction, signing, optional dry-run acceptance, mempool admission, relay, mining, confirmation, and possible later reorg effects.

The current release baseline is BitcoinII Core `v31.1.0`.

## Simplified lifecycle

```text
Wallet / caller
  -> creates or funds transaction
  -> signs under the correct BC2 signature domain
  -> optional testmempoolaccept dry run
  -> sendrawtransaction / wallet send path
  -> local mempool acceptance
  -> local mempool storage
  -> peer relay, if enabled and policy permits
  -> candidate block selection
  -> block validation and connection
  -> transaction becomes confirmed
  -> later active-chain blocks increase confirmation depth
  -> reorg can later reduce or remove those confirmations
```

## Step 1: Transaction construction

A wallet or external caller creates a transaction that spends previous outputs and creates new outputs.

Reviewed construction paths include:

- wallet-backed funding/signing through wallet RPC;
- raw-transaction construction and decoding;
- PSBT creation, update, signing, finalization, and extraction.

Bitcoin-like transaction structure does not by itself guarantee compatibility with current BC2 signing rules.

## Step 2: BC2 signing domain

Mainnet replay protection activates at height `57750` with fork/domain id `0x01324342`.

The domain participates in signature-hash calculation; it is not a normal transaction field and does not change the basic address encoding.

Current v31 source review establishes that wallet, raw-transaction, PSBT, mempool, and block-validation paths all obtain the height-appropriate domain.

This creates an important integration boundary: a third-party library can parse BC2 transactions or PSBTs correctly yet still produce invalid signatures if it uses ordinary Bitcoin digest semantics after activation.

## Step 3: Optional dry-run acceptance

`testmempoolaccept` checks whether one or more signed raw transactions would pass the local node's current mempool and consensus checks without adding them to the mempool.

The September 11 isolated regtest test directly exercised `testmempoolaccept` on the finalized disposable transaction and received `allowed = true`.

That is a real v31 runtime result under the documented isolated regtest conditions.

## Step 4: Local submission

`sendrawtransaction` submits a signed transaction to the local node's transaction-acceptance path and, when ordinary networking/relay is available, can then lead to peer relay.

In the September 11 disposable test, `sendrawtransaction` was called only against a zero-peer loopback regtest node. The transaction entered the **local** mempool successfully.

That proves local submission in the isolated environment. It does **not** prove public-network broadcast or propagation.

## Step 5: Mempool acceptance

A simplified single-transaction acceptance path remains:

```text
AcceptSingleTransaction
  -> PreChecks
  -> ReplacementChecks, when relevant
  -> PolicyScriptChecks
  -> ConsensusScriptChecks
  -> Finalize
  -> TransactionAddedToMempool notification
```

Current v31 behavior adds an important rule: mempool signature validation uses the replay-protection domain for the **next block height**. This protects the activation boundary before a transaction is mined.

## Step 6: Mempool storage

Accepted transactions are stored in `CTxMemPool`, which tracks identifiers, dependency relationships, fees, lock points, timing, memory use, and other metadata used by relay, mining, inspection, replacement, and eviction logic.

The September 11 regtest submission produced a real local mempool entry for the disposable transaction.

## Step 7: Relay

If relay is enabled and policy conditions are met, accepted transactions can be announced/requested through peer-manager transaction-relay paths.

Local acceptance is not the same as network propagation. Propagation depends on peers, policy, connectivity, and remote-node behavior.

Current MoreBC2 public-infrastructure testing also has **not** established a valid public transaction-broadcast endpoint. Malformed-transaction rejection from public REST routes proves route handling, not successful valid broadcast.

## Step 8: Mining and block inclusion

Candidate block assembly selects from mempool transactions using package/fee/dependency logic.

Under v31, candidate time can affect required block work through ShockWave, but that mining rule is separate from whether an individual transaction is otherwise valid and selectable.

## Step 9: Block connection and confirmation

Once a containing block becomes part of the active best-work chain, the transaction is confirmed.

During block connection:

- referenced UTXOs are checked;
- signatures/scripts are verified in the block's consensus context;
- fees and sequence/finality rules are applied;
- outputs are added and spent inputs removed from the UTXO set.

Additional active-chain blocks increase confirmation depth.

## Step 10: Reorganization

A later valid branch with greater accumulated work can disconnect the block containing the transaction.

The transaction may then:

- become unconfirmed;
- return to the mempool if still valid and policy-acceptable;
- confirm again on the replacement branch;
- disappear if it conflicts with the new chain or no longer passes current rules.

A finite confirmation count is therefore an operational risk measure, not absolute finality.

## Current runtime evidence

The September 11 isolated v31.1.0 regtest test directly exercised:

- disposable descriptor-wallet creation;
- local mining for disposable funds;
- `getbalances`;
- `walletcreatefundedpsbt`;
- `decodepsbt`;
- `walletprocesspsbt`;
- `finalizepsbt`;
- `decoderawtransaction`;
- `testmempoolaccept`;
- local-only `sendrawtransaction`;
- `getmempoolentry` / mempool inspection.

The transaction spent one disposable 50 BC2 regtest coinbase output, sent 1 BC2 to a new disposable destination, returned `48.99999859` BC2 as change, and paid `0.00000141` BC2 in fees.

The test did not use any existing user wallet, did not have peers, and did not broadcast to a public BitcoinII network.

## What remains open

- Controlled mainnet/testnet replay-domain transaction vectors.
- Third-party wallet and hardware/external-signer compatibility.
- Public-network broadcast and propagation testing.
- Fee-estimation behavior and replacement-policy edge cases.
- Cross-wallet recovery/import compatibility.

## Related pages

- [Mempool flow](mempool-flow.md)
- [Block validation flow](block-validation-flow.md)
- [Life of a block](life-of-a-block.md)
- [Life of a reorganization](life-of-a-reorg.md)
- [Replay protection v31](../developers/source-atlas/replay-protection-v31.md)
- [Wallet spend and PSBT RPC](../developers/source-atlas/wallet-spend-rpc.md)
- [Raw transaction RPC](../developers/source-atlas/rpc-rawtransaction.md)
- [Mempool acceptance](../developers/source-atlas/mempool-accept.md)
- [Windows v31.1.0 PSBT and replay validation](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** Current v31 wallet/PSBT/raw-RPC/mempool/validation source reviews plus the September 11 isolated PSBT and local-mempool runtime record  
**Notes:** The ordinary v31 transaction lifecycle has meaningful local runtime coverage. Mainnet replay-domain activation, third-party signing, public broadcast, and propagation remain unverified.
