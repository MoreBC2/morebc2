# Peer-to-peer and cross-chain BC2 trading

**Category:** Ecosystem
**Status:** Draft / Partial
**Last reviewed:** 2026-11-22

## Summary

This page records two third-party services advertising native BitcoinII (BC2) and USDT trading across BitcoinII Mainnet and BNB Smart Chain (BSC). Their architectures differ. Listing them is **not** a recommendation, security audit, demonstration of customer liquidity, or claim that the BitcoinII project operates them.

A BNB Chain smart contract cannot independently validate a native BitcoinII transfer without additional proof/verification machinery. Distinguish off-chain operator attestation from a two-legged hash-timelock construction.

## BC2Market — operator-reconciled marketplace

**Status:** Observed live contracts and dated operator-controlled test; independent customer activity and custody safety not established  
**Official:** No — service explicitly describes itself as independent  
**Website:** https://bc2market.com/  
**Description:** https://bc2market.com/about  
**Buy escrow (V5):** [BscScan](https://bscscan.com/address/0xA85adcb9082e6C11916d27fc953c6D4fd4218a93#code)  
**Sell escrow (V6):** [BscScan](https://bscscan.com/address/0xE77208c61c902c43eBb7172a3Fae1A4d85F6E3A3#code)  
**Last checked:** 2026-11-22  
**Evidence:** E6 service documentation, E4 public BSC and BC2 explorer observations

The site describes buy-side USDT escrow and native BC2 delivery, as well as sell-side BC2 deposits and USDT payouts. Its [About page](https://bc2market.com/about) explicitly states that off-chain marketplace workers reconcile BSC order state and BC2 Mainnet evidence. This should **not** be called a trustless atomic swap.

A bounded cross-chain test was corroborated for [sell order #11](https://bc2market.com/sell-v6-order.html?id=11): the assigned BitcoinII address received **1 BC2** on mainnet, and [BSC transaction](https://bscscan.com/tx/0x2cbf58c80d4ad7d538cecfc4d7524f5d71f219d192e1eb72e6cfb3de78288ccb) transferred **0.14016944 USDT**. The payout occurred before the native deposit's first block confirmation. Both recorded sides involved marketplace-associated deployer/operator addresses, so this is evidence of a controlled live-network settlement **not** evidence of independent customer trading.

The current public [sell configuration](https://bc2market.com/market-config.json) reported `requiredBc2Confirmations: 0` on the review date. That is a **service setting**, not a BC2 finality guarantee. Confirmations, reorganization risk, cancellation, and refund conditions matter when transferring value.

The current V5 buy and V6 sell BscScan pages did **not** display independently verified Solidity source on the review date. An older V5 sell contract had published source, but that cannot validate the deployed V6 code. An independent audit of the current contracts, independently enforceable refund paths, outside-customer volume, and full operator permissions were **not established**.

### BC2Market sources

- https://bc2market.com/about
- https://bc2market.com/terms
- https://bc2market.com/market-config.json
- https://bc2market.com/sell-v6-order.html?id=11
- https://bscscan.com/tx/0x2cbf58c80d4ad7d538cecfc4d7524f5d71f219d192e1eb72e6cfb3de78288ccb
- https://bc2mempool.com/api/address/bc1q3wxdjrtuna3ppduzvt54jla0lreeyy7umrfvhv/txs

## XFR — proposed two-legged HTLC atomic-swap flow

**Status:** Public order-book/guide observed; user-to-user swap, contract implementation, refund and recovery paths not independently tested by MoreBC2  
**Official:** No BitcoinII project designation established  
**Website:** https://xfr.money/swap  
**Technical guide:** https://xfr.money/swap/guide  
**Last checked:** 2026-11-22  
**Evidence:** E6 service-operator documentation

[XFR's technical guide](https://xfr.money/swap/guide) documents a different design: USDT locked in a BSC contract and native BC2 locked in a hash-timelock contract (HTLC). The buyer's BC2 claim reveals a secret (preimage) that the seller can use to claim USDT. The operator says it runs an order book and chain watchers, not the users' private keys.

Its guide describes approximately **24-hour native** and **48-hour USDT** windows, user-signed actions, and an approximately **0.5% protocol fee** on the USDT claim. These are XFR's documented settings, not independently verified live-contract guarantees. Both parties must understand secret backup, timing, supported wallets and refund paths; a missed claim window can have material consequences.

A page calling itself *trustless* does not alone establish trustlessness. MoreBC2 has not audited XFR's current deployed contracts, native HTLC scripts, watcher design, user-wallet security, or completed swaps. Do not list BasicSwap or other proposed integrations as active BC2 trading without separate evidence.

## Comparison and user safety

| Question | BC2Market | XFR |
|---|---|---|
| Published model | USDT contract plus operator-reconciled native BC2 transfers | BSC USDT contract plus native BC2 HTLC |
| Observed evidence | Dated operator-controlled cross-chain test | Public technical guide and swap UI |
| Operator role | Settlement/reconciliation worker and owner actions | Order-book/chain watchers; user-signing model claimed |
| Independently audited and end-to-end verified by MoreBC2? | No | No |
| Outside-user transactions / refund reliability established? | No | No |

Neither site is an official BitcoinII wallet or exchange. Before transferring funds, independently verify the chain, destination, current contracts, counterparty and any withdrawal/refund deadlines. Small tests are useful but are not a substitute for a security audit or a verified recovery path. Region, account, and regulatory availability were not reviewed.

## Related pages

- [Exchanges](exchanges.md)
- [Wallets](wallets.md)
- [Exchange deposit monitoring](../exchange/deposit-monitoring.md)
- [Ecosystem index](README.md)

## Verification

**Status:** Draft / Partial  
**Primary sources checked:** BC2Market About, public marketplace configuration and order page, BscScan transaction/contract pages, public BitcoinII explorer address history, XFR swap and operator guide (2026-11-22)  
**Notes:** Public read-only inspection only; no wallet connected, order placed, transaction signed, or contract source/security audit performed. Service settings and transaction history may change.