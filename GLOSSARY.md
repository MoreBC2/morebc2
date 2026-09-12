# MoreBC2 Glossary

**Status:** Reviewed
**Last reviewed:** 2026-09-12

This glossary defines common terms used across MoreBC2. General definitions are explanatory; BitcoinII-specific values should link to current source-backed documentation.

For deeper implementation terminology, see the [Developer glossary](docs/encyclopedia/developer-glossary.md).

## Active chain

The branch a node currently treats as its best valid chain.

## Address

A string used to receive funds. BitcoinII uses Bitcoin-like address encodings; current prefix values are documented in [Network specifications](docs/documentation/network-specifications.md).

## Base58

An encoding format used by several Bitcoin-style address and key formats.

## Bech32

An address encoding format used for SegWit-style addresses. BitcoinII mainnet currently uses the `bc` human-readable prefix.

## Best-work chain

The valid chain with the greatest accumulated chainwork according to the node's chain-selection rules. Block count alone is not the chain-selection rule.

See also: [Reorganizations](docs/encyclopedia/reorganizations.md).

## Block

A group of transactions committed to the blockchain by proof-of-work.

## Block file

A local disk file containing serialized block data.

## Block height

The position of a block in the chain, starting from the genesis block.

## Block header

The compact metadata section of a block, including the previous-block hash, merkle root, timestamp, difficulty bits, and nonce.

## Block index

A node's local index of known block headers and related metadata.

## Blockchain

An ordered chain of blocks where each block commits to the previous block.

## Broadcast

Sending a transaction or block toward the peer-to-peer network. A dry-run mempool check is not the same as broadcast.

## Chainstate

A node's current validated view of the active chain and spendable coin state.

## Chainwork

A cumulative measure of proof-of-work represented by a chain. Bitcoin-style chain selection compares accumulated work rather than simply choosing the chain with the most blocks.

For exchange monitoring, cumulative chainwork after a deposit can provide useful context in addition to a raw confirmation count.

## Checkpoint

A known block height/hash recorded by software as a reference point. Current BitcoinII checkpoint values should be taken from release-pinned source.

## Coinbase transaction

The first transaction in a block. It creates the block subsidy and collects transaction fees.

## Confirmation

A transaction has one confirmation when it is included in a block on the active chain. Each later block built on top increases the count by one.

Confirmation count is an operational settlement signal, not mathematical finality. Under Proof of Work, chain reorganizations remain possible, and equal confirmation counts can represent different accumulated work.

See [Confirmations](docs/encyclopedia/confirmations.md).

## Consensus

The rules that determine whether blocks and transactions are valid.

Policy, exchange rules, wallet behavior, and service-specific settings are not automatically consensus rules.

## Daemon

A background node process without a graphical interface.

## Difficulty

A measure related to how hard it is to find a block hash meeting the proof-of-work target.

## Difficulty adjustment

The process that changes the proof-of-work target over time.

For current BitcoinII mainnet after height `57750`, the active mechanism is ShockWave per-block difficulty adjustment rather than the historical Bitcoin-style 2016-block retarget interval.

## DNS seed

A DNS service used to help new nodes discover peers.

## Dry-run acceptance check

A local check, such as `testmempoolaccept`, that reports whether a transaction would be accepted without actually submitting it for relay.

## Explorer

A public service displaying blockchain information such as blocks, transactions, addresses, mempool state, or mining/network data.

Explorer observations are time-sensitive and do not automatically establish custody-grade reliability.

## Fee

The difference between transaction input value and output value. Fees can be collected by the miner of the block that includes the transaction.

## Finality

The degree of confidence that a transaction will remain in the active chain.

BitcoinII uses Proof of Work and does not gain absolute cryptographic finality merely by reaching a particular confirmation count. Exchange labels such as CoinEx's `irreversible_confirmations` are service policy terminology, not a protocol guarantee.

## Fork

A divergence in software, consensus rules, or blockchain history. The exact meaning should be clear from context.

## Full node

Software that independently validates blocks and transactions according to consensus rules.

## Genesis block

The first block in a blockchain.

## Hash

A fixed-size output produced by a hashing algorithm. Hashes are used for identifiers, proof-of-work, and data commitments.

## Locktime

A transaction field that can delay when a transaction is eligible for inclusion.

## Mempool

A node's local collection of valid unconfirmed transactions waiting to be mined or otherwise removed.

## Merkle root

A hash commitment to the transactions in a block.

## Node

A process participating in the peer-to-peer network and, for a full node, validating blockchain data.

## Nonce

A block-header field miners vary while searching for a proof-of-work hash below the target.

## Orphan / stale block

Informal terms for a validly found block that does not remain in the active best-work chain. Bitcoin Core terminology often distinguishes stale/disconnected blocks from true orphan data; documentation should use the most precise term available for the context.

## P2P

Peer-to-peer networking between nodes.

## Policy

Local rules for accepting, keeping, relaying, or mining unconfirmed transactions. Policy is not consensus.

## Proof of Work

A consensus mechanism in which miners search for a block-header hash below a target value.

See [Proof of work](docs/encyclopedia/proof-of-work.md).

## Pruning

Deleting old block data from local disk while retaining enough validated state for supported node operation.

## PSBT

Partially Signed Bitcoin Transaction. A format for coordinating transaction construction and signing before a final transaction is produced.

## Raw transaction

A serialized transaction representation, typically hex, outside a wallet's high-level send workflow.

## Reindex

A process where node software rebuilds its block index from stored block data.

## Release verification

The process of establishing what a release artifact is, who or what authenticated it, and whether it corresponds to reviewed source.

GitHub-hosted digest metadata, signed source commits, maintainer-signed checksum manifests, detached binary signatures, independent hashing, and reproducible builds are related but distinct forms of evidence.

## Reorganization

A change in the active chain when a node switches from one valid branch to a competing branch with greater accumulated work.

## Replay protection

A mechanism intended to prevent a transaction signature valid for one chain/domain from being validly replayed on another.

BitcoinII Core `v31.1.0` source activates BC2 replay protection on mainnet at height `57750` using fork/domain ID `0x01324342`. MoreBC2 has source-traced this path; external-signer compatibility remains a separate integration concern.

See [Replay protection v31](docs/developers/source-atlas/replay-protection-v31.md).

## RPC

Remote Procedure Call. An interface used by tools, wallets, exchanges, and services to communicate with node software.

## sat2

The BitcoinII base-unit display term used by current source for one hundred-millionth of a BC2 (`1 BC2 = 100,000,000` base units).

## Sequence lock

A relative locktime rule that can delay transaction validity until specified height or time conditions are met.

## ShockWave

BitcoinII's current per-block difficulty-adjustment mechanism, active on mainnet from height `57750` in `v31.1.0` source.

ShockWave changes required work block by block based on recent chain data and includes bounded adjustment/stall-recovery behavior. Current documentation should not describe the old 2016-block Bitcoin retarget as BitcoinII's active post-activation mechanism.

See [ShockWave v31](docs/developers/source-atlas/shockwave-v31.md).

## Ticker

The short market symbol for a cryptocurrency. BitcoinII uses `BC2`.

## Undo data

Data stored so a node can reverse UTXO-state changes when disconnecting blocks during a reorganization.

## Unbroadcast transaction

A locally accepted transaction that a node still tracks for relay because successful announcement has not yet been established.

## UTXO

Unspent transaction output. Bitcoin-style systems represent spendable value as outputs that have not yet been spent.

## Validation interface

A notification layer used by node software to notify interested components of validation-related events.

## Wallet

Software that manages addresses/keys and helps users receive or send funds. Some wallets also include or connect to full-node functionality.

## Watch-only

A wallet or wallet entry that can observe addresses or transactions without holding the private key material required to authorize spending.

## Verification

**Status:** Reviewed
**Primary sources checked:** Current MoreBC2 network/consensus/Source Atlas pages, v31.1.0 verification records, and current exchange-confirmation evidence
**Notes:** Audited 2026-09-12. General definitions remain explanatory; BitcoinII-specific implementation details should defer to the linked release-pinned technical pages.