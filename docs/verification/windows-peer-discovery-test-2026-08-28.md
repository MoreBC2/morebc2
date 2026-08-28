# Windows fresh-node peer discovery test — 2026-08-28

**Category:** Verification
**Status:** Draft / Dated local test
**Date tested:** 2026-08-28

## Summary

MoreBC2 repeated BitcoinII Core `v29.1.0` mainnet peer discovery on 64-bit Windows with new disposable data directories, wallet functionality disabled, inbound listening disabled, and RPC restricted to loopback.

Default discovery succeeded twice without borrowed peers, manual peer addresses, `addnode`, `connect`, or a seed override. Both runs reported eight addresses from the configured DNS seeds, established persistent outbound full-relay peers, acquired 57,747 headers, and advanced block validation.

The earlier 2026-08-27 zero-peer observation was therefore not reproduced. This dated result establishes a working default bootstrap path in the tested environment; it does not prove that the DNS seeds will always answer, that every returned address is reachable, or that every operator environment will obtain peers.

The three fixed seeds compiled into the release did not establish a connection during a separate 155-second fixed-seed-only test. All three also timed out in bounded direct TCP checks. Fixed seeds should not currently be treated as a demonstrated recovery path.

## Environment and artifact

| Field | Tested value |
|---|---|
| Host | 64-bit Windows, NT `10.0.26200.9168` |
| Network | BitcoinII mainnet |
| BitcoinII Core | `v29.1.0` |
| Artifact | `BitcoinII-29.1.0-x86_64-win64-CLI.zip` |
| Artifact bytes | `7,987,528` |
| Artifact SHA-256 | `94985c39c2e99406b50b3a318442677ffa3df6f9d471c03cb30f1fb0c4b8fa3a` |
| Test storage | A new disposable data directory for each test |
| Wallet | Disabled with `disablewallet=1` |
| P2P posture | Outbound only with `listen=0` |
| RPC | Cookie authentication on a distinct loopback-only port per test |
| IP logging | Disabled with `logips=0` |

The archive byte size and SHA-256 matched the [release-artifact authentication record](release-artifact-authentication-2026-08-27.md). This remains repeat-byte integrity evidence, not publisher authentication.

No prior `peers.dat`, chain state, wallet state, manual peer, or borrowed address was copied into any test directory.

## Release-defined discovery mechanisms

The `v29.1.0` source defines:

- two mainnet DNS seeds:
  - `dnsseed.bitcoin-ii.org.`
  - `bitcoinII.ddns.net.`
- three compiled mainnet fixed-seed entries;
- `-addnode` for maintained manual connections;
- `-seednode` for a temporary address-fetch connection attempted before DNS seeding;
- `-connect` for connecting only to specified nodes, which disables ordinary automatic connections;
- `-dnsseed`, default enabled unless parameter interaction disables it;
- `-forcednsseed`, default disabled;
- `-fixedseeds`, default enabled;
- DNS name lookup for named `addnode`, `seednode`, and `connect` targets, default enabled.

For an empty address manager, the source queries all configured DNS seeds. Address-manager state is persisted in `peers.dat`. Fixed seeds are added when other sources have not populated a reachable network after 60 seconds, or immediately when DNS seeding is disabled and no addnode or seednode is configured.

Source:

- [v29.1.0 chain parameters](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/kernel/chainparams.cpp)
- [v29.1.0 compiled fixed seeds](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/chainparamsseeds.h)
- [v29.1.0 connection management](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/net.cpp)
- [v29.1.0 networking options](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/init.cpp)
- [v29.1.0 peer-database loading](https://github.com/Bitcoin-II/BitcoinII-Core/blob/v29.1.0/src/addrdb.cpp)

## Seed-generation integrity

The release contains seed-generation scripts and four input lists under `contrib/seeds`, but those inputs do not reproduce the small BitcoinII-specific arrays shipped in `src/chainparamsseeds.h`:

- `nodes_main.txt` contains 2,031 non-comment entries, primarily using Bitcoin's `8333` port plus port-zero privacy-network records, while the compiled BitcoinII mainnet array contains three entries using `8338`;
- the release's `nodes_test.txt`, `nodes_testnet4.txt`, and `nodes_signet.txt` blobs are byte-identical to the corresponding Bitcoin Core `v29.1` files;
- all of those files and the compiled header entered the canonical BitcoinII repository together in the canonical source import, so repository history does not show a BitcoinII seed-generation run that connects the inputs to the shipped header.

This is a reproducibility and maintenance concern. It does not invalidate the working DNS-seed observation, but the inherited input lists should not be described as the source of the release's compiled BitcoinII fixed seeds.

The public [Bitcoin-II DNS seeder repository at commit `98c8ddc`](https://github.com/Bitcoin-II/dnsseeder/tree/98c8ddced9202e097d359ee1914dfa65860b8475) is an older fork with inherited README text and an older seed hostname. Its public source does not by itself prove how the currently responding primary seed is deployed or operated.

## Release versus current main

Canonical upstream `main` was `218d1b7e0f682c2aa43c3698d927cbfbb7adfe76` when checked.

The comparison from the `v29.1.0` target commit to that main commit changes six files. The only changed chain-parameter file alters regtest genesis, checkpoint, and AssumeUTXO material. It does not change mainnet DNS seeds, compiled fixed seeds, connection management, address-manager behavior, or networking defaults.

No post-release source change was found that explains the earlier zero-peer observation or makes current main a different bootstrap implementation.

- [Release-to-current comparison](https://github.com/Bitcoin-II/BitcoinII-Core/compare/3f2a352467750425ec28abe3505a5db5bbc5fa35...218d1b7e0f682c2aa43c3698d927cbfbb7adfe76)

## DNS resolution checks

Resolution was checked at approximately `2026-08-28T11:29:57Z` through:

- the Windows host's configured resolver;
- Cloudflare's public DNS-over-HTTPS service;
- Google's public DNS-over-HTTPS service.

No system DNS setting was changed.

| Seed | A records | AAAA records | Resolver agreement | Classification |
|---|---:|---:|---|---|
| `dnsseed.bitcoin-ii.org` | 8 | 0 | All three returned the same counts | Eight public IPv4 results; no private or loopback result |
| `bitcoinII.ddns.net` | 1 | 0 | All three returned the same counts | One public IPv4 result; no private or loopback result |

Individual returned addresses are intentionally not recorded.

## Default fresh-node tests

Both tests used default peer-discovery behavior. Neither supplied a peer address or discovery override.

### Default run 1

The log reported:

```text
Loading addresses from DNS seed dnsseed.bitcoin-ii.org.
Loading addresses from DNS seed bitcoinII.ddns.net.
8 addresses found from DNS seeds
```

Within 45 seconds:

- four outbound connections were active;
- headers reached `57,747`;
- validated blocks reached `5,681`;
- initial block download remained active.

At the later bounded sample:

- four outbound full-relay connections remained active;
- all sampled peers were IPv4;
- validated blocks advanced to `11,958`;
- addrman held 1,942 addresses after peer address exchange.

### Default run 2

A second empty data directory reproduced the same DNS log result. Within 45 seconds:

- two outbound full-relay connections were active;
- headers reached `57,747`;
- validated blocks reached `2,546`;
- initial block download remained active.

Both daemons were stopped through the supported `stop` RPC, exited, and logged `Shutdown: done`.

These runs establish peer discovery and active initial synchronization, not full synchronization or an expected sync time.

## Seed-hostname isolation checks

Two additional empty data directories used `dnsseed=0`, `fixedseeds=0`, and one source-listed hostname through `seednode`. This tests whether each public hostname can independently supply usable address-manager data. It is diagnostic evidence, not the recommended default startup form.

| Seednode hostname | Address acquisition | Persistent peers | Synchronization |
|---|---|---|---|
| `dnsseed.bitcoin-ii.org` | Addrman populated | One outbound full-relay peer | 57,747 headers; blocks advanced from 1,967 to 10,493 |
| `bitcoinII.ddns.net` | Addrman populated | Zero peers at 45 seconds; two outbound full-relay peers by the later sample | Initially zero; then 57,747 headers and 4,608 blocks |

The secondary path was slower in this bounded test but ultimately supplied usable peer data.

## Fixed-seed-only check

A separate empty data directory used:

```ini
dnsseed=0
fixedseeds=1
```

No addnode, seednode, connect target, or borrowed peer was supplied.

Results:

- 45 seconds: zero peers, zero headers, zero blocks;
- the log then recorded that fixed seeds were added;
- 100 seconds: three addresses in addrman, zero tried addresses, zero peers, zero headers, zero blocks;
- 155 seconds: still zero peers, zero headers, and zero blocks;
- bounded five-second TCP checks to the three compiled entries at the release's P2P port all timed out;
- none of the three compiled fixed entries appeared in either seed hostname's contemporaneous A-record set.

This does not prove that the endpoints are permanently offline. It does show that the compiled fixed-seed set was not a usable bootstrap source in this environment and bounded observation window.

## Root-cause assessment

### Current result

**Default DNS bootstrap is working in the tested environment.**

The previous zero-peer result is not explained by a persistent release-source defect:

- the same `v29.1.0` release bytes succeeded twice;
- no DNS, firewall, router, or system setting was changed;
- three independent resolvers returned consistent seed results;
- both configured hostnames independently yielded usable address-manager data;
- current upstream main has no relevant post-release bootstrap change.

The earlier failure could have been transient seed availability, a transient local DNS/network condition, or timing. The available evidence cannot distinguish those possibilities retrospectively.

### Fixed seeds

The release does contain fixed seeds, so this is not fixed-seed absence. Their bounded failure, lack of overlap with current DNS results, and mismatch with inherited generation inputs support classifying the fixed-seed data as **stale or at least currently unverified bootstrap data**.

### Network availability

Current network scarcity was not demonstrated. The default runs established multiple peers and received a large address set through peer gossip. That does not measure global node count or guarantee future availability.

## Operator-facing boundary

This record supports a minimal future guide clarification after independent review:

- report that default discovery succeeded twice on 2026-08-28 without borrowed peers;
- preserve the dated 2026-08-27 failure as historical evidence;
- retain the warning that seed availability is not guaranteed and a reader may still observe zero peers;
- do not publish or recommend peer addresses;
- do not recommend the fixed seeds as a recovery mechanism based on this test.

The existing [Windows node guide](../nodes/node-guide.md) was intentionally not changed in this investigation.

## Privacy and safety

- No wallet was created or funded.
- No wallet seed, private key, password, authentication cookie, or credential was read or recorded.
- RPC remained loopback-only.
- Inbound P2P listening remained disabled.
- No firewall, router, port-forwarding, infrastructure, organization, or deployment setting was changed.
- No borrowed, local, or discovered peer address is included in this record.
- IP logging was disabled for every daemon run.

## Verification

**Status:** Draft / Dated local test
**Primary sources checked:** BitcoinII Core `v29.1.0` source and generated help behavior; canonical current main comparison; canonical Windows CLI release bytes; three public DNS resolver paths; isolated daemon logs; read-only RPC output; public Bitcoin-II DNS seeder repository
**Notes:** Default fresh-node bootstrap was reproduced twice in one Windows environment. Cross-platform behavior, future seed availability, full synchronization, fixed-seed recovery, and the cause of the earlier dated failure remain bounded or unresolved.
