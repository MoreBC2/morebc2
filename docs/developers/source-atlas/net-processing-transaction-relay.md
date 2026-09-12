# Net processing transaction relay

**Category:** Developer / Source Atlas  
**Status:** Reviewed / Source-confirmed partial  
**Last reviewed:** 2026-09-12

## Summary

This page maps BitcoinII Core `v31.1.0` P2P transaction-relay behavior in `src/net_processing.*`.

Transaction relay is separate from wallet construction, raw/PSBT signing, local mempool admission, RPC submission, and eventual block confirmation. Current BC2 also adds a material v31 boundary: post-height-`57750` signatures must validate under the BC2 replay-protection domain before ordinary mempool/P2P relay can treat the transaction as acceptable.

## Relay setup

Transaction relay is not enabled identically for every peer class. Reviewed handshake/peer state distinguishes block-relay-only, feeler, normal relay, bloom/filter permissions, and txid/wtxid announcement behavior.

`wtxidrelay` negotiation affects which transaction identifier form is expected/announced for a peer.

## Transaction inventory (`inv`)

Reviewed transaction-inventory handling includes:

- message-size limits;
- relay-permission / peer-mode checks;
- txid vs wtxid inventory handling;
- recording inventory known by the peer;
- suppressing ordinary transaction-download work during IBD;
- handing eligible announcements to the transaction download manager outside IBD.

An inventory announcement means a peer says it has a transaction; it is not proof of validity or confirmation.

## Full `tx` messages

Reviewed transaction receive behavior includes:

- relay-mode/IBD gates;
- witness-aware deserialization;
- txid/wtxid calculation;
- transaction download-manager decisions;
- chainstate/mempool validation;
- accepted transaction relay;
- invalid/orphan/package handling;
- selected peer-punishment paths for appropriate consensus failures.

Current BC2's replay-domain signature checks are applied in the validation/script layer reached by this path.

## Valid / invalid / orphan handling

Accepted transactions are recorded with the transaction download manager, logged, and made eligible for relay through `RelayTransaction`.

Rejected transactions are tracked with their validation result and can feed compact-block extra-transaction/orphan/package paths. Not every policy rejection is peer misbehavior.

Orphan reconsideration re-enters transaction processing when dependencies become available.

## v31 replay-protection boundary

Mempool admission validates signatures for the **next block height**. From mainnet height `57750`, that means the BC2 fork/domain id `0x01324342` is part of signing/verification context.

A transaction can be Bitcoin-shaped and parse correctly yet still fail current BC2 validation if signed using legacy Bitcoin digest semantics.

See [Replay protection v31](replay-protection-v31.md), [Mempool accept](mempool-accept.md), and [Script interpreter](script-interpreter.md).

## Runtime / broadcast boundary

The September 11 isolated `v31.1.0` regtest PSBT test established:

- successful wallet signing/finalization;
- `testmempoolaccept` allowed;
- local `sendrawtransaction` inserted the transaction into a **zero-peer local mempool**;
- `getmempoolentry` confirmed local insertion.

That is **not** a P2P relay test and not evidence of public-mainnet broadcast/propagation.

Likewise, public explorer endpoints that reject malformed transaction payloads only establish route presence/rejection behavior, not successful valid propagation.

## IBD boundary

Reviewed net-processing logic suppresses ordinary transaction-announcement processing during initial block download because the node may not yet have sufficient current chain context.

This is one reason a newly syncing node should not be treated as a production transaction-relay oracle merely because RPC/P2P is running.

## Relay versus confirmation

A transaction may be:

1. constructed/signed;
2. accepted by one local mempool;
3. relayed to peers;
4. accepted by additional peer mempools;
5. mined into a valid block;
6. gain confirmations as more work accumulates.

These are distinct states. P2P propagation is not confirmation, and confirmation count is not protocol finality.

## Related pages

- [Mempool accept](mempool-accept.md)
- [Mempool RPC / broadcast](rpc-mempool.md)
- [Raw transaction RPC](rpc-rawtransaction.md)
- [Replay protection v31](replay-protection-v31.md)
- [Life of a transaction](../../architecture/life-of-a-transaction.md)
- [Public endpoint evidence](../../api/public-endpoints.md)

## Open work

- Perform a dedicated valid public BC2 broadcast/propagation test only with fully disposable funds and explicit scope if needed.
- Review transaction reconciliation/package relay in greater depth.
- Keep local mempool submission distinct from network relay evidence.

## Primary sources

- `v31.1.0/src/net_processing.cpp`
- `v31.1.0/src/net_processing.h`
- `v31.1.0/src/validation.cpp`
- `v31.1.0/src/script/interpreter.cpp`

Canonical tag: https://github.com/Bitcoin-II/BitcoinII-Core/tree/v31.1.0

## Verification

**Status:** Reviewed / Source-confirmed partial  
**Primary evidence:** BitcoinII Core `v31.1.0` relay/validation source plus September 11 local-only zero-peer transaction runtime record  
**Notes:** P2P relay structure and replay-domain boundary are source-backed. Successful public propagation remains unverified.
