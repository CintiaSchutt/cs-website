---
title: Role design
summary: Turning a pile of individual permissions into a small set of roles people can understand, assign and review.
updated: 2026-11-10
---

## In one sentence

**Role design** groups permissions into roles that match real jobs, so access can be granted, reviewed and removed as a unit instead of one permission at a time.

## The layers (SailPoint's model)

SailPoint's documentation describes a clear hierarchy:

| Layer | What it is | Example |
| --- | --- | --- |
| **Entitlement** | A basic access right on one source (system) | AD group `FIN-RPT-RO`, an ERP permission |
| **Access profile** | A bundle of entitlements from **one** source | "ERP - Accounts payable clerk" |
| **Role** | A bundle of access, from one or **many** sources, often for a job function | "Accounts payable clerk" = ERP profile + reporting profile + shared drive |

Roles can be assigned **automatically** by criteria such as department or job title (this is birthright access) or made **requestable**. SailPoint also has **dynamic roles**, which grant extra birthright access based on *role dimensions* such as location.

## The same idea in Microsoft Entra

- **Groups** hold app and resource access.
- **Access packages** bundle groups, apps and sites into one requestable or auto-assigned unit.
- **App roles** define permissions inside an application.

## A practical approach

1. **Start from jobs**, not systems: what does an accounts payable clerk actually need?
2. **Look at what people already have** in that job. Access that almost everyone shares is a role candidate. Access only one person has is an exception to question.
3. Keep roles **coarse enough to be few** and **specific enough to be meaningful**.
4. Give every role an **owner** who approves changes and reviews membership.
5. Check each role against [separation of duties](/notes/segregation-of-duties) rules *before* publishing it.

```text
Business role:  "Accounts payable clerk"
  ├─ ERP:          AP data entry   (access profile)
  ├─ Reporting:    AP reports, read-only
  └─ File share:   /finance/ap, read/write
Excluded on purpose: "Approve payments" (separation of duties)
```

## Warning signs

- **Role explosion**: so many roles that nobody can tell them apart. A sign that every exception became a role (see [RBAC and ABAC](/notes/rbac-abac)).
- Roles named after people ("Jane's access").
- Roles nobody owns, or nobody has reviewed in a year.

## Security angle

- A role is a promise: everyone in it gets everything in it. Over-broad roles spread excess access fast.
- Least privilege still applies: put rarely needed or risky access behind a request, not in the birthright role.

## Check yourself

1. What is the difference between an access profile and a role in SailPoint?
2. Why start role design from jobs instead of systems?
3. Name one sign that a role model has become unmanageable.

## Sources

- SailPoint: [Access Overview](https://documentation.sailpoint.com/saas/help/access/index.html)
- SailPoint: [Managing Roles](https://documentation.sailpoint.com/saas/help/access/roles.html)
- SailPoint: [Managing Entitlements](https://documentation.sailpoint.com/saas/help/access/entitlements.html)
- NIST CSRC: [Role Based Access Control project](https://csrc.nist.gov/projects/role-based-access-control)
- Microsoft Learn: [What is entitlement management?](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview)
- Microsoft Learn: [Best practices for Microsoft Entra roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices)
