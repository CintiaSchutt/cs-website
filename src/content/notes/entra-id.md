---
title: Microsoft Entra ID basics
summary: Microsoft's cloud identity service (formerly Azure AD), how it differs from Active Directory, and what each licence adds.
updated: 2026-11-10
---

## In one sentence

**Microsoft Entra ID** is Microsoft's cloud-based identity and access management service. It signs users in to Microsoft 365, Azure and thousands of other apps, and was called **Azure Active Directory** until Microsoft renamed it in 2023.

## Key terms

| Term | Meaning |
| --- | --- |
| **Tenant** | Your organization's dedicated instance of Entra ID, with its own users, groups and apps |
| **Tenant ID** | The tenant's GUID. Appears as `tid` in tokens |
| **Object ID** | The unique ID of any object (user, group, app). Appears as `oid` for users |
| **UPN** | User principal name, the sign-in name, such as `jdoe@contoso.com` |
| **Enterprise app** | An app's service principal in your tenant (see [App registration](/notes/app-registration)) |

## Entra ID is not "AD in the cloud"

Microsoft's comparison page shows the differences:

| | Active Directory (AD DS) | Microsoft Entra ID |
| --- | --- | --- |
| Where | On-premises servers | Microsoft cloud service |
| Protocols | Kerberos, NTLM, LDAP | OpenID Connect, OAuth 2.0, SAML, WS-Federation |
| Structure | Forests, domains, OUs | Flat tenant, with administrative units for delegation |
| Device management | Group Policy | Microsoft Intune |
| Admin delegation | OUs and groups | Built-in and custom Entra roles |

## What the licences add (summary)

| Edition | Adds (examples) |
| --- | --- |
| **Free** | Users and groups, SSO, basic security defaults, 7-day log retention |
| **P1** | Conditional Access, dynamic groups, hybrid features, 30-day log retention |
| **P2** | ID Protection (risk-based policies), Privileged Identity Management |
| **Entra ID Governance** | Lifecycle workflows, advanced access reviews and entitlement management |

Features and licensing change over time, so check Microsoft's licensing pages before relying on a specific item.

## The wider Entra family

Entra ID is one product in the **Microsoft Entra** family, which also includes **External ID** (customer and partner identities, the successor for new Azure AD B2C customers), **ID Governance** and **Workload ID**.

## Where I've seen this

Azure AD B2C, which I worked with at QHR Technologies, is a separate tenant type built for customer sign-in. Entra ID is the workforce side. Many concepts carry over (tenants, app registrations, tokens, claims), and admin tasks like Conditional Access and role management are what I'm studying now.

## Security angle

- Protect admin roles first: phishing-resistant MFA, PIM and fewer than five Global Administrators.
- Turn on **security defaults** if the tenant has no Conditional Access.
- Keep two or more **emergency access** accounts.

## Check yourself

1. Name two protocols AD uses that Entra ID doesn't use natively.
2. What does the `tid` claim identify?
3. Which licence first includes Conditional Access?

## Sources

- Microsoft Learn: [What is Microsoft Entra ID?](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)
- Microsoft Learn: [New name for Azure Active Directory](https://learn.microsoft.com/en-us/entra/fundamentals/new-name)
- Microsoft Learn: [Compare Active Directory to Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/fundamentals/compare)
- Microsoft Learn: [What is Microsoft Entra?](https://learn.microsoft.com/en-us/entra/fundamentals/what-is-entra)
- Microsoft Learn: [Microsoft Entra data retention](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention)
- Microsoft Learn: [Security defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults)
