# MoreBC2 Glossary

This glossary defines common terms used across MoreBC2.

Definitions should stay neutral and general unless a BitcoinII-specific detail has been verified against a primary source.

For more technical architecture and Source Atlas terms, see the [Developer glossary](docs/encyclopedia/developer-glossary.md).

## Active chain

The branch of the blockchain a node currently treats as its best valid chain.

See also: [Life of a reorganization](docs/architecture/life-of-a-reorg.md).

## Address

A string used to receive funds. Address formats depend on the network and wallet type.

## Base58

An encoding format commonly used by Bitcoin-style addresses and keys. BitcoinII-specific prefix values should be documented in verified network specifications.

## Bech32

An address encoding format commonly used for SegWit-style addresses. BitcoinII-specific human-readable prefix values should be documented in verified network specifications.

## Block

A group of transactions committed to the blockchain by proof-of-work.

See also: [Life of a block](docs/architecture/life-of-a-block.md).

## Block file

A local disk file that stores serialized block data.

See also: [Source atlas: block storage](docs/developers/source-atlas/block-storage.md).

## Block height

The position of a block in the chain, starting from the genesis block.

## Block header

The compact metadata section of a block. It includes fields such as the previous block hash, merkle root, timestamp, difficulty bits, and nonce.

## Block index

A node's local index of known block headers and related metadata.

## Blockchain

An ordered chain of blocks where each block commits to the previous block.

## Chainstate

A node's current view of the active chain and spendable coin state.

## Checkpoint

A known block height and hash used by software as a reference point. Checkpoints must be documented from source code or official releases.

## Coinbase transaction

The first transaction in a block. It creates the block subsidy and collects transaction fees.

## Consensus

The rules that determine whether blocks and transactions are valid.

See also: [Consensus model](docs/architecture/consensus-model.md).

## Confirmation

A transaction has one confirmation when it is included in a block. Each later block added on top increases the confirmation count by one.

## Daemon

A background process that runs node software without a graphical interface.

## Difficulty

A measure of how hard it is to find a valid proof-of-work block.

## Difficulty adjustment

The process that changes mining difficulty based on how quickly blocks were found over a defined period.

See also: [Difficulty adjustment](docs/encyclopedia/difficulty-adjustment.md).

## DNS seed

A DNS service that helps new nodes discover peers on the network.

## Explorer

A website or service that displays blockchain data such as blocks, transactions, addresses, and network status.

## Fee

The difference between transaction input value and output value.

In Bitcoin-style systems, fees can be collected by the miner of the block that includes the transaction.

## Fork

A split or divergence in software or blockchain history. The term can refer to source-code forks, chain forks, or rule changes.

## Full node

Software that independently downloads and validates blocks and transactions according to consensus rules.

## Genesis block

The first block in a blockchain.

## Hash

A fixed-size output produced by a hashing algorithm. Hashes are used throughout blockchains for identifiers, proof-of-work, and data commitments.

## Locktime

A transaction field that can delay when a transaction is final for inclusion.

## Mempool

A node's local collection of valid unconfirmed transactions waiting to be mined into a block.

See also: [Mempool flow](docs/architecture/mempool-flow.md).

## Merkle root

A hash commitment to all transactions in a block.

## Node

A computer or process participating in the peer-to-peer network.

## Nonce

A value miners change while searching for a block header hash that satisfies proof-of-work.

## Orphan block

A block that was validly found but did not become part of the active best chain.

## P2P

Peer-to-peer networking between nodes.

## Policy

Local node rules for accepting, keeping, relaying, or mining unconfirmed transactions.

Policy is not the same as consensus.

## Proof-of-work

A consensus mechanism where miners search for a block hash below a target value.

See also: [Proof-of-work](docs/encyclopedia/proof-of-work.md).

## Pruning

Deleting old block data from local disk while preserving enough validated state for node operation.

## Reindex

A process where node software rebuilds its block index from stored block data.

## Release verification

The process of checking that a downloaded release artifact matches what the project intended to publish.

See also: [Release verification guide](docs/developers/release-verification.md).

## Reorganization

A change in the active chain when a node switches to a competing chain with more accumulated work.

See also: [Life of a reorganization](docs/architecture/life-of-a-reorg.md).

## RPC

Remote Procedure Call. A way for tools, wallets, exchanges, and services to communicate with node software.

## Sequence lock

A relative locktime rule that can prevent a transaction from being valid until certain height or time conditions are met.

## Ticker

The short market symbol commonly used for a cryptocurrency, such as BC2 for BitcoinII.

## Undo data

Data stored so a node can return the UTXO view to an earlier state during a reorganization.

## UTXO

Unspent transaction output. Bitcoin-style chains track spendable balances as outputs that have not yet been spent.

## Validation interface

A notification layer used by node software to tell interested components about validation-related events.

See also: [Source atlas: validation interface](docs/developers/source-atlas/validation-interface.md).

## Wallet

Software that manages keys and helps users send or receive funds. Some wallets also include full-node functionality.

## Verification

**Status:** Draft
**Primary sources checked:** Partially
**Notes:** This glossary is a general reference. BitcoinII-specific details should link to source-backed documentation or be marked Needs Review.
