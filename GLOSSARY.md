# MoreBC2 Glossary

This glossary defines common terms used across MoreBC2.

Definitions should stay neutral and general unless a BitcoinII-specific detail has been verified against a primary source.

## Address

A string used to receive funds. Address formats depend on the network and wallet type.

## Base58

An encoding format commonly used by Bitcoin-style addresses and keys. BitcoinII-specific prefix values should be documented in verified network specifications.

## Bech32

An address encoding format commonly used for SegWit-style addresses. BitcoinII-specific human-readable prefix values should be documented in verified network specifications.

## Block

A group of transactions committed to the blockchain by proof-of-work.

## Block height

The position of a block in the chain, starting from the genesis block.

## Block header

The compact metadata section of a block. It includes fields such as the previous block hash, merkle root, timestamp, difficulty bits, and nonce.

## Blockchain

An ordered chain of blocks where each block commits to the previous block.

## Checkpoint

A known block height and hash used by software as a reference point. Checkpoints must be documented from source code or official releases.

## Consensus

The rules that determine whether blocks and transactions are valid.

## Confirmation

A transaction has one confirmation when it is included in a block. Each later block added on top increases the confirmation count by one.

## Daemon

A background process that runs node software without a graphical interface.

## Difficulty

A measure of how hard it is to find a valid proof-of-work block.

## Difficulty adjustment

The process that changes mining difficulty based on how quickly blocks were found over a defined period.

## DNS seed

A DNS service that helps new nodes discover peers on the network.

## Explorer

A website or service that displays blockchain data such as blocks, transactions, addresses, and network status.

## Fork

A split or divergence in software or blockchain history. The term can refer to source-code forks, chain forks, or rule changes.

## Full node

Software that independently downloads and validates blocks and transactions according to consensus rules.

## Genesis block

The first block in a blockchain.

## Hash

A fixed-size output produced by a hashing algorithm. Hashes are used throughout blockchains for identifiers, proof-of-work, and data commitments.

## Mempool

A node's local collection of valid unconfirmed transactions waiting to be mined into a block.

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

## Proof-of-work

A consensus mechanism where miners search for a block hash below a target value.

## Reindex

A process where node software rebuilds its block index from stored block data.

## Reorganization

A change in the active chain when a node switches to a competing chain with more accumulated work.

## RPC

Remote Procedure Call. A way for tools, wallets, exchanges, and services to communicate with node software.

## Seed node

A node or DNS service used to help other nodes discover peers.

## Ticker

The short market symbol commonly used for a cryptocurrency, such as BC2 for BitcoinII.

## UTXO

Unspent transaction output. Bitcoin-style chains track spendable balances as outputs that have not yet been spent.

## Wallet

Software that manages keys and helps users send or receive funds. Some wallets also include full-node functionality.
