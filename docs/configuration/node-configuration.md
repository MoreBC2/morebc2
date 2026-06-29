# Node configuration

**Category:** Documentation
**Status:** Draft
**Last reviewed:** 2026-06-29

## Summary

This page documents node-operation configuration options observed in the generated BitcoinII example configuration file.

It does not provide production recommendations until behavior is tested.

## Node operation options observed

| Option | Purpose from generated config | Status |
|---|---|---|
| `daemon` | Run in the background as a daemon and accept commands | Draft |
| `daemonwait` | Wait for initialization before exiting; implies daemon | Draft |
| `datadir` | Specify data directory | Draft |
| `blocksdir` | Specify directory for block files | Draft |
| `debuglogfile` | Specify debug log location | Draft |
| `pid` | Specify pid file | Draft |
| `reindex` | Rebuild block index and active optional indexes | Draft |
| `reindex-chainstate` | Rebuild chain state from block files | Draft |
| `txindex` | Maintain a full transaction index | Draft |
| `prune` | Reduce storage by deleting old blocks after validation | Draft |
| `dbcache` | Set maximum database cache size | Draft |
| `maxmempool` | Set maximum mempool memory size | Draft |
| `mempoolexpiry` | Set how long transactions remain in mempool | Draft |
| `persistmempool` | Save mempool on shutdown and load on restart | Draft |
| `blocksonly` | Reject transactions from network peers | Draft |

## Connection options observed

| Option | Purpose from generated config | Status |
|---|---|---|
| `addnode` | Add a node and attempt to keep connection open | Draft |
| `connect` | Connect only to specified nodes | Draft |
| `dns` | Allow DNS lookups for peer-related options | Draft |
| `dnsseed` | Query DNS seeds when low on addresses | Draft |
| `fixedseeds` | Allow fixed seeds if DNS seeds do not provide peers | Draft |
| `externalip` | Specify public address | Draft |
| `discover` | Discover own IP addresses | Draft |
| `bind` | Bind to a given address | Draft |
| `cjdnsreachable` | Configure CJDNS reachability | Draft |

## Pruning caution

The generated config warns that reverting pruning requires re-downloading the entire blockchain.

## Exchange/operator caution

Options such as `txindex`, `prune`, and RPC settings can materially affect service behavior.

Exchange, explorer, and pool configurations should be tested and reviewed before being published as recommended setups.

## Open items

- Test node startup options.
- Confirm public node listening recommendations.
- Confirm whether explorers should require `txindex=1`.
- Confirm pruning guidance for wallets versus infrastructure providers.
- Confirm platform-specific data directory paths.

## Sources

- `share/examples/bitcoinII.conf`: https://github.com/BitcoinII-Dev/BitcoinII/blob/main/share/examples/bitcoinII.conf

## Verification

**Status:** Draft
**Primary sources checked:** Yes
**Notes:** Options are documented from the generated example config. Operational recommendations still need testing.
