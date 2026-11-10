---
title: What is identity governance?
summary: Identity governance and administration (IGA) proves the right people have the right access, and only for as long as they need it.
updated: 2026-11-10
---

## In one sentence

**Identity governance and administration (IGA)** is the set of processes and tools that control *how* access is granted, reviewed and removed, and that produce **evidence** the controls work.

## The questions IGA answers

Microsoft's ID Governance overview frames it with questions like these:

- Who has access to what, and **should** they?
- What are they doing with that access?
- Are there effective controls for managing access?
- Can **auditors verify** that the controls are working?

## IAM vs IGA

| | Access management | Identity governance |
| --- | --- | --- |
| Focus | Can this sign-in succeed right now? | Is this access still right, and can we prove it? |
| Tools | IdP, MFA, Conditional Access | Access requests, reviews, lifecycle automation, SoD |
| Time frame | Seconds (each sign-in) | Weeks and months (the life of the access) |
| Typical owner | IT / identity engineering | Identity team with security, audit and business owners |

## The three lifecycles

Microsoft Entra ID Governance organizes the work into:

1. **Identity lifecycle**: create, update and remove identities ([joiner, mover, leaver](/notes/joiner-mover-leaver)).
2. **Access lifecycle**: request, approve, review and expire access ([access requests](/notes/access-requests), [access reviews](/notes/access-reviews)).
3. **Privileged access**: time-bound, approved admin access ([PAM](/notes/what-is-pam)).

## Core IGA capabilities

| Capability | Microsoft Entra feature | SailPoint concept |
| --- | --- | --- |
| Lifecycle automation | Lifecycle workflows, HR provisioning | Lifecycle states |
| Access requests | Entitlement management (access packages) | Access requests |
| Access reviews | Access reviews | Certifications (campaigns) |
| Role model | Groups, access packages | Entitlements → access profiles → roles |
| Separation of duties | Incompatible access packages and groups | SoD policies |
| Privileged access | Privileged Identity Management | Privilege on Demand (just-in-time) |

## Why it matters

Regulations and audits (financial, health, privacy) expect organizations to show *who approved* access and *when it was reviewed*. NIST SP 800-53 control **AC-2** expects account approvals, monitoring and periodic review.

## Where I've seen this

My background includes a bank (Banco do Brasil) and enterprise healthcare SaaS that handles sensitive health information (QHR Technologies). Both are highly regulated, and IGA is how regulated organizations show their access controls are working.

## Check yourself

1. In one sentence, how is IGA different from access management?
2. Name the three lifecycles Microsoft uses.
3. What does SailPoint call an access review?

## Sources

- Microsoft Learn: [What is Microsoft Entra ID Governance?](https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview)
- Microsoft Learn: [What is entitlement management?](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview)
- Microsoft Learn: [What are access reviews?](https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview)
- SailPoint: [Access Overview](https://documentation.sailpoint.com/saas/help/access/index.html)
- SailPoint: [Glossary](https://documentation.sailpoint.com/saas/help/common/glossary.html)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), control AC-2 Account Management
