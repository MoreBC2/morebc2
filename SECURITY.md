# Security reporting

MoreBC2 is an independently maintained BitcoinII documentation and verification project. It is not the BitcoinII Core repository, its security team, or an official protocol-security authority.

## Maintained scope

This policy covers the current MoreBC2 repository and site tooling and the current published MoreBC2 documentation. Historical BitcoinII evidence records are archival documentation; they are not supported software releases.

## Ordinary documentation issues

Report non-sensitive problems through [MoreBC2's public GitHub issues](https://github.com/MoreBC2/morebc2/issues). Examples include:

- broken links or typographical errors;
- stale version information or incorrect factual descriptions;
- documentation inconsistencies;
- non-sensitive reproduction problems; and
- public source-reference corrections.

Do not put secrets, credentials, private keys, personal information, unpublished vulnerabilities, exploit details, or sensitive infrastructure information in a public issue.

## Sensitive security reports

Treat a report as sensitive when immediate public disclosure could create meaningful security risk. Examples include:

- an undisclosed vulnerability in MoreBC2 software or site tooling;
- a vulnerability in a service deployed or operated by MoreBC2, if one exists;
- exposed credentials or secrets;
- a repository-automation weakness that could permit unauthorized modification; or
- a security-sensitive upstream finding that should not initially be public.

[GitHub Private Vulnerability Reporting](https://github.com/MoreBC2/morebc2/security/advisories/new) is enabled as the verified private intake route for external reporters. Sign in to GitHub, open the linked reporting form, and select **Report a vulnerability** from the repository's Security page if the form is not already displayed. Submit the report there so its details are shared privately with the MoreBC2 maintainers through a proposed repository security advisory.

Do not submit secrets, exploit details, or other sensitive information through a public issue, pull request, discussion, or other public channel. GitHub account access is required to use the private reporting form.

## Upstream and third-party findings

Security flaws in BitcoinII Core, ShockWave, wallets, nodes, exchanges, pools, explorers, or other third-party software and services generally belong with their respective maintainers or operators. Use a verified upstream reporting route where one exists. Do not assume MoreBC2 is authorized to receive or coordinate disclosure for an upstream project.

MoreBC2 can accept non-sensitive corrections about its own documentation through public issues. A documentation reference to third-party software does not make MoreBC2 that software's security contact.

## No response or reward commitments

MoreBC2 does not currently promise response times, bounty payments, embargo periods, CVE assignment, remediation deadlines, or other service levels.
