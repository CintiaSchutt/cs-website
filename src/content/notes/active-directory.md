---
title: Active Directory basics
summary: The on-premises directory most organizations still run, with its forests, domains, groups and Kerberos sign-in.
---

## In one sentence

**Active Directory Domain Services (AD DS)** is Microsoft's on-premises directory: it stores information about users, computers and groups, authenticates them, and lets admins manage them centrally.

## The logical structure

| Concept | What it is |
| --- | --- |
| **Forest** | The top-level security boundary: one or more domains sharing a schema and configuration |
| **Domain** | A partition of the directory with its own policies, for example `corp.example.com` |
| **Organizational unit (OU)** | A container inside a domain, used to delegate administration and apply Group Policy |
| **Trust** | A relationship that lets users in one domain or forest access resources in another |

## The physical side

- **Domain controllers (DCs)** run AD DS. Every DC in a domain holds a full copy of that domain's directory data, and changes **replicate** to all DCs in the domain.
- The **global catalog** holds a partial copy of every object in the forest, so objects can be found across domains.

## Groups in AD

**Types**: *security groups* (for permissions) and *distribution groups* (for email only).

**Scopes**: where a group can be used, and who can be a member:

| Scope | Typical use |
| --- | --- |
| **Domain local** | Grant permissions to resources in one domain |
| **Global** | Group users from one domain by role |
| **Universal** | Group members across domains in the forest |

## How sign-in works

**Kerberos** is the default authentication protocol in AD. The key distribution centre (KDC), which runs on the domain controllers, issues the user a *ticket-granting ticket* at sign-in. The user then exchanges it for service tickets to reach resources, without sending the password again. **NTLM** is an older protocol that is still around for compatibility. **LDAP** is used to query the directory.

## Highly privileged groups

Microsoft's AD security guidance treats a few built-in groups as the most sensitive: **Enterprise Admins**, **Domain Admins**, **Schema Admins** and the built-in **Administrators** group. Their membership should be tiny and closely monitored.

## Useful commands

```powershell
# ActiveDirectory PowerShell module (RSAT)
Get-ADUser -Identity jdoe -Properties MemberOf, Enabled, LastLogonDate
Get-ADGroupMember -Identity "Domain Admins"
Disable-ADAccount -Identity jdoe
```

## Security angle

- Compromising AD often means compromising everything joined to it. Protect DCs as the most critical servers.
- Microsoft's guidance: reduce permanent membership in privileged groups, use separate admin accounts, and manage DCs from secure admin workstations.
- In hybrid setups, an on-premises compromise can reach the cloud through synchronization (see [Hybrid identity](/notes/hybrid-identity)).

## Flashcards

```flashcards
Q: What is AD DS?
A: Microsoft's on-premises directory: it stores users, computers and groups, authenticates them and lets admins manage them centrally.

Q: What is the security boundary in AD?
A: The **forest**.

Q: What is an OU used for?
A: Delegating administration and applying Group Policy inside a domain.

Q: What does each domain controller hold?
A: A full copy of its domain's directory data. Changes replicate to all DCs in the domain.

Q: What does the global catalog hold?
A: A partial copy of every object in the forest, so objects can be found across domains.

Q: Security groups or distribution groups: what is each for?
A: Security groups are for permissions. Distribution groups are for email only.

Q: Name the three AD group scopes.
A: **Domain local**, **global** and **universal**.

Q: How does Kerberos avoid sending the password for each resource?
A: The KDC issues a **ticket-granting ticket** at sign-in, which the user exchanges for service tickets.

Q: Name the most sensitive built-in AD groups.
A: **Enterprise Admins**, **Domain Admins**, **Schema Admins** and the built-in **Administrators** group.
```

## Sources

- Microsoft Learn: [Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- Microsoft Learn: [Understanding the Active Directory logical model](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/understanding-the-active-directory-logical-model)
- Microsoft Learn: [Active Directory security groups](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-groups)
- Microsoft Learn: [Kerberos authentication overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
- Microsoft Learn: [Best practices for securing Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory)
- Microsoft Learn: [Appendix B: Privileged accounts and groups in Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/appendix-b--privileged-accounts-and-groups-in-active-directory)
- Microsoft Learn: [ActiveDirectory PowerShell module](https://learn.microsoft.com/en-us/powershell/module/activedirectory/)
