# Tested Windows v31 node guide

**Category:** Documentation
**Status:** Reviewed / Partial
**Last reviewed:** 2026-09-12

## Scope

This is a bounded, evidence-backed route for running BitcoinII Core `v31.1.0` on 64-bit Windows using the Windows Qt release in server mode.

It is based on the September 11 MoreBC2 validation that used:

- a fresh disposable data directory;
- BitcoinII Core `v31.1.0` Windows Qt;
- mainnet;
- loopback-only JSON-RPC;
- random-cookie authentication;
- ordinary outbound peer discovery;
- default pruning and optional-index settings;
- one newly created disposable wallet;
- clean shutdown and restart.

The test intentionally ended before initial block download completed.

This guide is **not** a production exchange configuration, public-RPC guide, inbound-node/firewall guide, long-duration stability claim, or endorsement of using a disposable test wallet for real funds.

No existing BitcoinII wallet or data directory was opened, copied, rescanned, imported, unlocked, inspected, or spent from during the test.

## 1. Obtain the current tested release

Use the canonical BitcoinII Core `v31.1.0` release and the Windows Qt asset:

```text
BitcoinII-v31.1-Win64-Qt.zip
```

The current MoreBC2 release record lists:

| Field | Recorded value |
|---|---|
| Archive size | `20,557,870` bytes |
| GitHub-reported SHA-256 | `f7b1d16423859bd2392b1bd4f62c16ba855a034c6ffb6693af667f2ec97b375d` |
| Tested executable | `bitcoinII-qt.exe` |
| Runtime version | `v31.1.0` |
| Protocol version | `70016` |

The September runtime test independently calculated the same archive SHA-256 value.

That is useful byte-integrity evidence, but it is not complete publisher authentication. MoreBC2 has not established a maintainer-signed checksum manifest, detached signature for every binary, trusted release-signing-key procedure, or reproducible-build proof for `v31.1.0`.

See [BitcoinII Core v31.1.0 release assets](../releases/v31.1.0-assets.md).

## 2. Use a new data directory

Do not test against an existing wallet or normal BitcoinII data directory.

Create a new directory for the node state. For example:

```powershell
$NodeRoot = Join-Path $env:LOCALAPPDATA 'BitcoinII-v31.1.0-morebc2-test'
$DataDir = Join-Path $NodeRoot 'data'

if (Test-Path -LiteralPath $NodeRoot) {
    throw "Refusing to reuse existing test path: $NodeRoot"
}

New-Item -ItemType Directory -Path $DataDir -Force | Out-Null
```

The exact location is an operator choice. The important tested safety property is that the path is new and explicitly supplied on every launch.

## 3. Create a bounded RPC configuration

The September mainnet test used this configuration shape:

```ini
server=1
rpcport=28332
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

`28332` was chosen only because local default port `8332` was already occupied by unrelated software.

Current v31 JSON-RPC defaults are:

| Network | Default RPC port |
|---|---:|
| mainnet | `8332` |
| testnet3 | `18332` |
| testnet4 | `48332` |
| signet | `38332` |
| regtest | `18443` |

If you choose a different loopback RPC port, use the same value consistently in the configuration and client calls.

Do **not** widen `rpcbind` or `rpcallowip` merely to fix a local connection problem. Do not expose BitcoinII Core RPC directly to the public internet.

### Important P2P-port note

Current BitcoinII `v31.1.0` mainnet chain parameters set the default P2P port to:

```text
8338
```

The generated example `bitcoinII.conf` still contains inherited wording showing mainnet `8333` for the generic `-port` option. That comment is stale for current BitcoinII mainnet.

The September runtime test directly observed BitcoinII listening on `0.0.0.0:8338` and connecting to peers on the current network.

Unless you have a specific reason to override P2P listening, do not copy the generated `8333` comment into a v31 setup.

## 4. Start BitcoinII Qt in server mode

Point `$Qt` at the extracted `bitcoinII-qt.exe` and start it with the disposable data directory:

```powershell
$Qt = 'C:\Path\To\BitcoinII-v31.1-Win64-Qt\bitcoinII-qt.exe'

$args = @(
    "-datadir=$DataDir",
    '-server=1',
    '-rpcport=28332',
    '-rpcbind=127.0.0.1',
    '-rpcallowip=127.0.0.1',
    '-nosplash',
    '-min'
)

$Node = Start-Process -FilePath $Qt `
    -ArgumentList $args `
    -WindowStyle Hidden `
    -PassThru
```

The tested Windows Qt executable is a GUI-subsystem application. The September validation therefore identified the running release through runtime logs, file metadata, and RPC rather than relying on console `-version` output.

## 5. Wait for the RPC cookie

BitcoinII Core creates a temporary authentication cookie in the selected data directory while RPC is running.

A simple bounded readiness wait can look like:

```powershell
$CookiePath = Join-Path $DataDir '.cookie'

$deadline = (Get-Date).AddSeconds(60)
while (-not (Test-Path -LiteralPath $CookiePath)) {
    if ((Get-Date) -gt $deadline) {
        throw 'RPC cookie did not appear before timeout.'
    }
    Start-Sleep -Milliseconds 500
}
```

Do not print or publish the cookie value.

## 6. Call RPC directly over loopback

The locally available v31 Qt test artifact did not include a matching v31 CLI executable, so the successful test sent JSON-RPC directly over HTTP using the random cookie.

This avoids accidentally mixing an older `bitcoinII-cli.exe` with the v31 node.

A PowerShell helper can be written as:

```powershell
function Invoke-Bc2Rpc {
    param(
        [Parameter(Mandatory)] [string] $Method,
        [object[]] $Params = @(),
        [string] $Wallet = $null
    )

    $cookie = (Get-Content -LiteralPath $CookiePath -Raw).Trim()
    $auth = [Convert]::ToBase64String(
        [Text.Encoding]::ASCII.GetBytes($cookie)
    )

    $headers = @{ Authorization = "Basic $auth" }
    $body = @{
        jsonrpc = '1.0'
        id      = $Method
        method  = $Method
        params  = $Params
    } | ConvertTo-Json -Compress -Depth 8

    $uri = 'http://127.0.0.1:28332/'
    if ($Wallet) {
        $uri += 'wallet/' + [Uri]::EscapeDataString($Wallet)
    }

    (Invoke-RestMethod -Uri $uri `
        -Method Post `
        -Headers $headers `
        -ContentType 'application/json' `
        -Body $body).result
}
```

Keep the cookie and authorization header in memory only.

## 7. Confirm node identity

Run:

```powershell
Invoke-Bc2Rpc -Method 'getnetworkinfo'
```

The September `v31.1.0` test observed:

```text
version = 310100
subversion = /BitcoinII:31.1.0/
protocolversion = 70016
networkactive = true
```

Live connection counts and network traffic will vary.

If the reported version is not the release you intended to run, stop and resolve the binary/path mismatch before continuing.

## 8. Observe peers and initial synchronization

Useful status calls include:

```powershell
Invoke-Bc2Rpc -Method 'getnetworkinfo'
Invoke-Bc2Rpc -Method 'getblockchaininfo'
Invoke-Bc2Rpc -Method 'getpeerinfo'
Invoke-Bc2Rpc -Method 'getchaintips'
Invoke-Bc2Rpc -Method 'uptime'
```

During the September test, the fresh node:

- found 4 outbound full-relay IPv4 peers on the first run;
- acquired the then-current header chain to height `58970`;
- advanced validated block height while remaining in initial block download;
- restarted later and obtained 6 outbound full-relay peers;
- retained local chain state across restart.

The observed peer subversion was `/BitcoinII:31.1.0/` and the peer protocol version was `70016`.

Peer counts and chain heights are time-sensitive. Do not treat those exact numbers as expected constants.

### How to tell whether synchronization is progressing

Inspect these fields together:

| Question | Evidence |
|---|---|
| Is RPC alive? | Structured RPC response rather than connection failure |
| Is networking enabled? | `getnetworkinfo.networkactive = true` |
| Are peers present? | outbound connections greater than zero |
| Are headers arriving? | `headers` advances or is ahead of `blocks` during IBD |
| Are blocks validating? | `blocks` increases over time |
| Is IBD still running? | `initialblockdownload = true` |
| Is the node fully synced? | `initialblockdownload = false`, validated chain is caught up, and tip remains aligned with a separately trusted current reference |

The September test did **not** wait for full synchronization. MoreBC2 therefore does not publish a v31 Windows full-sync duration from that test.

## 9. Check pruning and indexes

Run:

```powershell
Invoke-Bc2Rpc -Method 'getblockchaininfo'
Invoke-Bc2Rpc -Method 'getindexinfo'
```

The test intentionally left pruning and optional indexes at their defaults.

Observed:

```text
pruned = false
getindexinfo = {}
```

Current source/defaults establish:

- pruning default: disabled (`prune=0`);
- `txindex` default: disabled;
- pruning and `txindex` are incompatible.

Do not enable `txindex`, pruning, block-filter indexes, coinstats indexes, or other service-oriented indexes merely because they exist. Choose them based on the workflow you actually need and test that exact profile.

A pruned wallet can also face historical-rescan limits if required block data is no longer present locally.

## 10. Wallet behavior observed in the node test

You do not need a wallet to validate basic node startup and sync.

The September mainnet test created one **new disposable** descriptor wallet only to verify current wallet loading behavior. Before creation:

```text
listwallets = []
listwalletdir = no wallets
```

After creation, the wallet reported:

- SQLite format;
- descriptor wallet;
- zero transactions;
- private keys enabled;
- no scan in progress.

After node restart:

- `listwallets` was empty;
- `listwalletdir` still showed the disposable wallet;
- explicit `loadwallet` succeeded;
- the wallet still had zero transactions.

That result demonstrates persistence plus explicit reload in the tested environment. It does not define every wallet autoload/migration configuration.

Do **not** substitute an existing wallet into an experimental procedure.

For current transaction/PSBT runtime evidence, see the separate isolated regtest record. That test used a fresh wallet, zero peers, and local-only submission.

## 11. Mempool status

The mainnet node test also exercised:

```powershell
Invoke-Bc2Rpc -Method 'getmempoolinfo'
```

At the observed moment the mempool was loaded and empty while the node was still in IBD.

The separate isolated regtest test later exercised a complete disposable PSBT flow, `testmempoolaccept`, `sendrawtransaction`, and `getmempoolentry` locally.

That successful `sendrawtransaction` call was **not** a public broadcast: the regtest node had zero peers.

## 12. Stop cleanly

Use RPC shutdown rather than killing the process:

```powershell
Invoke-Bc2Rpc -Method 'stop'
Wait-Process -Id $Node.Id
```

The September test observed a normal `BitcoinII stopping` response and a clean process exit.

After shutdown:

- the RPC cookie had been removed;
- the RPC listener was gone;
- the log ended with `Shutdown done`.

Treat process exit and the completed shutdown log as stronger completion signals than merely receiving the RPC response.

## 13. Restart against retained state

Start the node again using the same **test** data directory and the same launch/configuration values.

The September test directly observed that the node:

- restarted successfully;
- retained chain state from the first run;
- reconnected normally;
- had 6 outbound peers during the bounded restart observation;
- found the disposable wallet on disk;
- reloaded that wallet explicitly;
- shut down cleanly again.

This is bounded restart evidence, not an exhaustive corruption/recovery test.

## Troubleshooting boundaries

### RPC port already in use

The September test encountered this on the ordinary mainnet RPC default `8332`, which was owned by unrelated software.

Choose a free loopback port and update both the node arguments/config and your client URI. Do not widen the RPC bind address.

### Wrong version or executable

Check the exact executable path and confirm `getnetworkinfo.version` / `subversion` after startup.

Do not point an older CLI at a newer node merely because an old CLI happens to exist on the same machine.

### No peers

Check:

- `networkactive`;
- outbound connection count;
- `debug.log` networking messages;
- DNS/network availability.

The September v31 test found peers automatically, but that is dated evidence rather than a guarantee of immediate future bootstrap.

Do not respond to a temporary zero-peer state by pasting random public peer lists into a production configuration.

### Generated config says port 8333

For current v31 mainnet, that generated comment is stale. Release-pinned chain parameters and runtime evidence use **8338** for BitcoinII P2P.

### Node is still syncing

Use `blocks`, `headers`, `verificationprogress`, and `initialblockdownload` together.

Do not infer a completion deadline from a short observation window.

### Wallet exists but is not loaded after restart

The disposable wallet in the September test remained on disk but was not automatically loaded after restart. `listwalletdir` showed it and explicit `loadwallet` succeeded.

Do not search arbitrary wallet directories or try to import/rescan an existing wallet merely to troubleshoot a node-status question.

### Need historical transaction lookup

Default `txindex` is off. Whether you need `txindex=1` depends on the application and RPC lookup behavior required.

Do not combine `txindex=1` with pruning; current source rejects that combination.

## What this guide directly proves

For the documented Windows 11 / BitcoinII Core `v31.1.0` / mainnet environment, MoreBC2 directly observed:

- current Qt release startup with a fresh data directory;
- loopback-only cookie-authenticated RPC;
- runtime identity `310100` / `/BitcoinII:31.1.0/` / protocol `70016`;
- P2P listening on `8338`;
- automatic outbound peer discovery;
- current header acquisition and advancing block validation during IBD;
- default pruning disabled;
- no optional indexes active;
- creation of a fresh disposable descriptor wallet;
- clean shutdown;
- restart with retained chain state;
- normal peer reconnection;
- explicit reload of the same disposable wallet;
- second clean shutdown.

## What remains unresolved

- Full v31 IBD completion and sync duration.
- Long-duration node stability.
- Linux/macOS parity.
- Inbound public-node reachability and NAT/firewall setup.
- Controlled pruning and recovery.
- Optional-index enable/rebuild behavior.
- Upgrade behavior from a real pre-v31 data directory.
- Controlled competing-branch/reorg testing.
- Production exchange/explorer/pool profiles.
- Public-network valid transaction propagation.
- Third-party wallet/hardware/external-signer compatibility.

## Historical v29 evidence

MoreBC2 retains the older Windows `v29.1.0` node and peer-discovery records as historical, version-scoped evidence. They should be used to understand prior behavior or compare releases, not as the current operational baseline.

See:

- [Windows node-operator test — 2026-08-27](../verification/windows-node-operator-test-2026-08-27.md)
- [Windows fresh-node peer-discovery test — 2026-08-28](../verification/windows-peer-discovery-test-2026-08-28.md)

## Related pages

- [Nodes overview](README.md)
- [Configuration](../configuration/README.md)
- [RPC configuration](../configuration/rpc-configuration.md)
- [Node startup architecture](../architecture/node-startup.md)
- [Peer communication model](../architecture/peer-communication-model.md)
- [RPC overview](../developers/rpc-overview.md)
- [Network specifications](../documentation/network-specifications.md)
- [Wallet guide](../wallets/wallet-guide.md)
- [Windows v31.1.0 node and RPC validation — 2026-09-11](../verification/windows-v31-node-rpc-validation-2026-09-11.md)
- [Windows v31.1.0 PSBT and replay-protection validation — 2026-09-11](../verification/windows-v31-psbt-replay-validation-2026-09-11.md)

## Verification

**Status:** Reviewed / Partial  
**Primary sources checked:** BitcoinII Core `v31.1.0` release/source/configuration plus the September 11 Windows mainnet node/RPC validation and isolated regtest wallet/PSBT validation  
**Notes:** This guide replaces the former v29-centered user-facing route with the current tested v31 Windows path. The historical v29 records remain unchanged as version-scoped evidence. Full sync, inbound networking, pruning/index rebuilds, cross-platform parity, upgrade paths, long-duration operation, and public transaction propagation remain open.
