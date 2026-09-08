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

The repository does **not currently have a verified private intake route for external reporters**. [GitHub Private Vulnerability Reporting](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository) is available for public repositories, so it is not available while this repository is private and was not verified as enabled when this policy was added. Do not submit sensitive details through a public issue.

If you need to alert the MoreBC2 maintainers before a verified private route is listed here, you may open a public issue containing no vulnerability details and ask for a private contact method. Do not send confidential information until the maintainer provides a route that you can independently verify. Before public visibility, the repository owner must establish and verify a private reporting route and update this policy.

## Upstream and third-party findings

Security flaws in BitcoinII Core, ShockWave, wallets, nodes, exchanges, pools, explorers, or other third-party software and services generally belong with their respective maintainers or operators. Use a verified upstream reporting route where one exists. Do not assume MoreBC2 is authorized to receive or coordinate disclosure for an upstream project.

MoreBC2 can accept non-sensitive corrections about its own documentation through public issues. A documentation reference to third-party software does not make MoreBC2 that software's security contact.

## No response or reward commitments

MoreBC2 does not currently promise response times, bounty payments, embargo periods, CVE assignment, remediation deadlines, or other service levels.
