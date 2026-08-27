# BitcoinII releases

**Category:** Releases
**Status:** Draft / Evidence-linked summary
**Last reviewed:** 2026-08-27

## Summary

This section summarizes BitcoinII Core release information already recorded in MoreBC2.

It summarizes a completed integrity audit, but it does not authenticate binaries, source archives, signatures, trusted keys, or release provenance.

Canonical evidence remains in the Verification section:

- [Verification evidence index](../verification/verification-index.md)
- [Release asset inventory attempt](../verification/release-asset-inventory-attempt.md)
- [Release-artifact authentication — 2026-08-27](../verification/release-artifact-authentication-2026-08-27.md)
- [Release artifact checklist](../verification/release-artifact-checklist.md)
- [Release source comparison notes](../verification/release-source-comparison.md)
- [Network release comparison](../verification/network-release-comparison.md)
- [Developer release verification guide](../developers/release-verification.md)
- [BitcoinII releases](../documentation/releases.md)

## Current release pages

- [v29.1.0 uploaded assets](v29.1.0-assets.md)
- [GitHub-generated source archives](source-archives.md)
- [Authentication status](authentication-status.md)
- [Release verification guide](release-verification-guide.md)
- [Signing and checksum roadmap](signing-and-checksum-roadmap.md)

## Evidence labels

Use narrow labels:

- **Observed** - recorded from a public page, GitHub API metadata, or committed evidence record.
- **Locally Tested** - exercised in a documented local environment. Release downloads and hashes have a bounded integrity record; binary authenticity does not have this status.
- **Source Reviewed** - found in source-tree documentation or source comparison records.
- **Maintainer Statement** - maintainer-supplied context; not cryptographic proof.
- **Unknown** - not established by current evidence.
- **Roadmap** - planned or expected, not current release evidence.

## Current release posture

MoreBC2 has recorded metadata, inventory, and local integrity fingerprints for BitcoinII Core `v29.1.0`.

Current evidence supports saying:

- the release metadata was observed,
- 10 uploaded release assets were inventoried from GitHub API metadata,
- two GitHub-generated source archives were listed separately,
- all 12 release-page downloads were independently hashed on 2026-08-27,
- all 10 uploaded-asset sizes and hashes matched GitHub API metadata,
- the `v29.1.0` tag appears lightweight in the recorded metadata,
- the tagged source commit locally verified against GitHub's web-flow service key,
- no uploaded asset name appeared to be `SHA256SUMS`, `SHA256SUMS.asc`, a detached signature, or a release-key file,
- no trusted BitcoinII release-key path has been established.

Current evidence does not support saying:

- release binaries are authenticated,
- release binaries match source,
- release assets are signed,
- source archives are verified,
- a trusted release-key path exists,
- BitcoinII releases are public-launch ready from a verification standpoint.

## Verification

**Status:** Draft / Evidence-linked summary  
**Primary sources checked:** Existing MoreBC2 release verification records linked above  
**Notes:** This section summarizes committed evidence. Local integrity fingerprints do not authenticate publisher intent, binary provenance, or signer identity.
