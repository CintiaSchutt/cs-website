---
title: Segregation of duties
summary: Making sure no single person holds a combination of access that would let them commit and hide fraud or a serious error.
---

## In one sentence

**Segregation (or separation) of duties (SoD)** splits sensitive tasks so that no single person can complete a risky process alone, such as creating a vendor *and* approving payments to it.

## Classic conflicting pairs

| Duty A | Duty B | Risk if one person has both |
| --- | --- | --- |
| Create a vendor | Approve a payment | Paying a fake vendor |
| Write code | Deploy to production without review | Unreviewed changes in production |
| Request access | Approve the same request | Granting yourself anything |
| Administer the audit logs | Perform the audited actions | Hiding your own tracks |

## What the standards say

NIST SP 800-53 control **AC-5 Separation of Duties** asks organizations to identify duties that need separating and to define access authorizations that support it. NIST's RBAC model also includes **constrained RBAC**:

- **Static SoD**: a user can't be *assigned* two conflicting roles.
- **Dynamic SoD**: a user may hold both roles, but can't *activate* them in the same session.

## Preventive and detective controls

| Type | When | Example |
| --- | --- | --- |
| **Preventive** | Before access is granted | An access request is blocked because it conflicts with existing access |
| **Detective** | After the fact | A report lists people who already hold conflicting access |

Exceptions happen, especially in small teams. When allowed, they need an owner, a reason, an end date and a **compensating control** such as extra review of that person's transactions.

## In Microsoft Entra

Entitlement management can mark an access package **incompatible** with other access packages or groups. A user who already has the conflicting access can't request the package.

## In SailPoint

SailPoint's SoD policies are built as **two lists of conflicting access**: identities with access in one list aren't allowed to have access in the other. The service can **prevent** violations, list existing **violations** for remediation, and record **allowed exceptions**.

## Security angle

- SoD defends against insider fraud *and* against a single stolen account doing too much.
- SoD rules must be checked when roles are designed, when access is requested, and during reviews.

## Check yourself

1. Give an IT example of conflicting duties.
2. What is the difference between static and dynamic SoD?
3. What makes an SoD exception acceptable to an auditor?

## Sources

- NIST CSRC Glossary: [separation of duty](https://csrc.nist.gov/glossary/term/separation_of_duty)
- NIST: [SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), control AC-5 Separation of Duties
- NIST CSRC: [Role Based Access Control project](https://csrc.nist.gov/projects/role-based-access-control)
- Microsoft Learn: [Configure separation of duties checks for an access package](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-incompatible)
- SailPoint: [Separation of Duties Overview](https://documentation.sailpoint.com/saas/help/sod/index.html)
