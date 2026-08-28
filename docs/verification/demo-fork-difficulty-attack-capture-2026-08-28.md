---
title: Demo-fork difficulty attack capture — 2026-08-28
status: Draft / Dated public observation
---

# Demo-fork difficulty attack capture — 2026-08-28

## Scope

This record preserves a time-sensitive public observation of the temporary BitcoinII demonstration fork exposed at `https://bitcoinii.ddns.net/explorer/` on 2026-08-28.

This chain was described in contemporaneous BitcoinII Discord messages as an **example mainnet fork**, not the canonical production BC2 mainnet. The developer stated that the demonstration fork existed on two machines and would be destroyed before the official mainnet hard fork. The canonical chain was separately identified in those messages as the chain visible at `bc2.live`.

Accordingly, the heights and difficulty values below **must not be represented as canonical BC2 mainnet history**.

## Test context from contemporaneous developer statements

User-supplied screenshots from the BitcoinII Discord record the following statements from BrokenMachine on 2026-08-28:

- The demonstration fork was intended to show the new difficulty-adjustment algorithm's attack resistance.
- The fork's pre-test hashrate was stated as approximately `20 TH/s`.
- A `1 PH/s` simulated hashrate attack was started at approximately 12:13 PM local Discord display time.
- The developer later stated that difficulty was approximately `5.4M` when the attack began.
- At approximately 12:36 PM local Discord display time, the developer stated that the attack had been caught/neutralized and that the `1 PH/s` order would be stopped.
- The developer expected the demonstration fork to stall after the large hashrate left, then recover toward normal operation at the remaining approximately `20 TH/s` hashrate.

These statements are contextual claims from Discord screenshots; the block observations below are independent public explorer observations.

## Preserved public explorer observations

The explorer exposed block-level time, `bits`, difficulty, hash, and other block metadata. Selected observations captured while the temporary fork was still online are below.

| Height | Explorer time (UTC) | Difficulty | Bits | Observation |
| ---: | --- | ---: | --- | --- |
| 57,794 | 15:32 | 3.023M | `1a058cb3` | Pre-burst sample |
| 57,798 | 15:52 | 3.491M | `1a04ce31` | Difficulty already rising gradually |
| 57,799 | 16:01 | 3.738M | `1a047cf8` | Pre-burst sample |
| 57,808 | 16:15 | 5.393M | `1a031c56` | Closely matches developer's stated ~5.4M attack-start difficulty |
| 57,809 | 16:15 | 5.626M | `1a02fb63` | Difficulty rises block-to-block |
| 57,810 | 16:16 | 5.860M | `1a02dcf5` | Rapid block production continues |
| 57,811 | 16:16 | 6.712M | `1a027fe3` | Difficulty rises materially |
| 57,812 | 16:16 | 8.022M | `1a021762` | Difficulty rises materially |
| 57,813 | 16:16 | 9.087M | `1a01d89e` | Difficulty rises materially |
| 57,814 | 16:16 | 10.285M | `1a01a199` | Difficulty rises materially |
| 57,815 | 16:17 | 12.612M | `1a01548c` | Difficulty continues upward |
| 57,816 | 16:19 | 50.447M | `19552300` | Large upward adjustment |
| 57,817 | 16:30 | 201.788M | `191548c0` | Highest captured sampled difficulty |
| 57,818 | 16:31 | 175.468M | `19187a10` | First captured decline after the 201.788M sample |

Explorer pages captured during this observation included:

- `https://bitcoinii.ddns.net/explorer/block-height/57794`
- `https://bitcoinii.ddns.net/explorer/block-height/57798`
- `https://bitcoinii.ddns.net/explorer/block-height/57799`
- `https://bitcoinii.ddns.net/explorer/block-height/57808`
- `https://bitcoinii.ddns.net/explorer/block-height/57809`
- `https://bitcoinii.ddns.net/explorer/block-height/57810`
- `https://bitcoinii.ddns.net/explorer/block-height/57811`
- `https://bitcoinii.ddns.net/explorer/block-height/57812`
- `https://bitcoinii.ddns.net/explorer/block-height/57813`
- `https://bitcoinii.ddns.net/explorer/block-height/57814`
- `https://bitcoinii.ddns.net/explorer/block-height/57815`
- `https://bitcoinii.ddns.net/explorer/block-height/57816`
- `https://bitcoinii.ddns.net/explorer/block-height/57817`
- `https://bitcoinii.ddns.net/explorer/block-height/57818`

At the time of capture, the explorer tip was height `57,818`, with current difficulty approximately `175.468M`.

## Immediate interpretation

The sampled sequence is strong evidence that the demonstration fork was using a difficulty algorithm capable of changing target difficulty on a block-by-block basis during the test.

The most important observed sequence is:

`5.393M -> 5.626M -> 5.860M -> 6.712M -> 8.022M -> 9.087M -> 10.285M -> 12.612M -> 50.447M -> 201.788M -> 175.468M`

across blocks `57,808` through `57,818`.

Several blocks were produced within the same displayed UTC minute during the early part of that sequence. Difficulty then climbed sharply as the burst continued. By block `57,818`, difficulty had fallen from the immediately preceding `201.788M` sample to `175.468M`.

This behavior is consistent with the stated purpose of testing response to a sudden large hashrate increase and subsequent removal. However, this record **does not identify the exact algorithm from chain behavior alone**. Whether the final release uses Dark Gravity Wave, a modified DGW implementation, or another algorithm must be established from the released source code.

## Important chronology correlation

The Discord screenshot records the simulated `1 PH/s` attack as commencing at approximately 12:13 PM in the user's displayed local time. For an Eastern Daylight Time display, that corresponds to approximately 16:13 UTC.

Block `57,808` is timestamped 16:15 UTC and has difficulty `5.393M`, closely matching the developer's later statement that difficulty was `5.4M` when the attack began. This is a strong temporal correlation but is not sufficient by itself to assert that block `57,808` was the exact first attacked block.

## What remains to capture

If the temporary explorer remains available, follow-up capture should attempt to preserve:

1. every block between the pre-attack baseline and height `57,818`;
2. subsequent blocks after `57,818` to measure the post-attack stall/recovery period;
3. exact UNIX block timestamps rather than minute-rounded UI timestamps;
4. per-block difficulty and `bits` values;
5. the time required for block cadence and difficulty to return toward the approximately `20 TH/s` baseline;
6. the final public tip before the demonstration fork is destroyed.

The explorer's public API documentation advertises `/api/block/$HEIGHT` and `/api/blocks/tip`, which may provide a cleaner archival path if those endpoints remain available.

## Evidence boundaries

- This record concerns a temporary demonstration fork, **not canonical BC2 mainnet**.
- No peer addresses, credentials, wallet material, private keys, RPC cookies, or private infrastructure data are included.
- Miner payout addresses visible on public block pages are not reproduced here because they are not needed for the difficulty-analysis claim.
- Discord statements are contextual evidence and are distinguished from independently observed explorer data.
- No claim is made that the demonstrated algorithm is the final production algorithm until the corresponding release source is public and reviewed.
- No claim is made that the demonstration proves resistance to every possible hashrate attack.

## Preservation urgency

The developer explicitly stated that the demonstration fork would be destroyed before the official mainnet fork. The public explorer data should therefore be treated as ephemeral and preserved while available.
