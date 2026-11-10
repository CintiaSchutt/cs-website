---
title: Privileged accounts
summary: The kinds of privileged accounts (human admins, emergency accounts, service accounts, local admins) and how to protect each one.
updated: 2026-11-10
---

## In one sentence

A **privileged account** has rights beyond a normal user's, and each kind (human admin, emergency, service, local administrator) needs its own protections.

## Types and protections

| Type | Example | Key protections |
| --- | --- | --- |
| **Human admin account** | `adm-jdoe` with User Administrator | Separate from the daily account, phishing-resistant MFA, just-in-time activation |
| **Emergency access (break-glass)** | Two cloud-only Global Admins | Excluded from normal policies, very strong credentials, alert on every use |
| **Directory admin groups** | Domain Admins, Enterprise Admins | Tiny membership, monitored changes, secure admin workstations |
| **Local administrator** | Built-in admin on each Windows device | Unique password per device, rotated automatically (Windows LAPS) |
| **Service account / workload identity** | An app's service principal with `Directory.ReadWrite.All` | Least privilege, managed identity or certificate, an owner, reviews |

## Separate admin accounts

Use a **separate account** for admin work, with no email or web browsing. A phishing email to the daily account then can't directly reach admin rights. Microsoft's guidance for Entra and Microsoft 365 adds: use **cloud-only** accounts for privileged cloud roles, not accounts synchronized from on-premises AD.

## Emergency access accounts

Microsoft recommends **two or more** emergency access accounts that are:

- **cloud-only**, using the `*.onmicrosoft.com` domain, not federated or synced
- protected with strong authentication that doesn't depend on the same systems as everyone else
- **monitored**: any sign-in should raise an alert
- tested regularly

They exist for when Conditional Access, MFA or federation breaks and nobody else can sign in.

## Local administrator passwords

Microsoft's documentation notes that local administrator accounts often share the same password across many devices, which attackers can use to move from one machine to the next. **Windows LAPS** automatically manages and backs up a unique local admin password for each Entra-joined or AD-joined device.

## Privileged access devices

Microsoft describes **privileged access workstations (PAWs)**: dedicated, locked-down devices for admin work, which don't allow general web browsing or productivity apps.

## Security angle

- Count privileged accounts regularly. Unknown ones are the dangerous ones.
- Service accounts often have more access than any person and never use MFA. Review them like admins.
- Microsoft recommends fewer than five Global Administrators.

## Check yourself

1. Why should an admin have two accounts?
2. Why must emergency access accounts be cloud-only?
3. What problem does Windows LAPS solve?

## Sources

- Microsoft Learn: [Manage emergency access accounts](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access)
- Microsoft Learn: [Best practices for Microsoft Entra roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices)
- Microsoft Learn: [Protect Microsoft 365 from on-premises attacks](https://learn.microsoft.com/en-us/entra/architecture/protect-m365-from-on-premises-attacks)
- Microsoft Learn: [Windows LAPS overview](https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview)
- Microsoft Learn: [Privileged access devices](https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-devices)
- Microsoft Learn: [Appendix B: Privileged accounts and groups in Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/appendix-b--privileged-accounts-and-groups-in-active-directory)
- NIST CSRC Glossary: [privileged account](https://csrc.nist.gov/glossary/term/privileged_account)
