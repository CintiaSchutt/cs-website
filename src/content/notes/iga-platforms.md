---
title: SailPoint or Saviynt: core concepts
summary: The vocabulary of a dedicated IGA platform, using SailPoint's public documentation, and how it maps to Microsoft Entra.
---

## In one sentence

Dedicated IGA platforms such as **SailPoint** and **Saviynt** connect to many systems, collect who has what access, and run governance (lifecycle, requests, reviews, SoD) across all of them, not just one cloud.

## A note on sources

SailPoint publishes its documentation openly, so this note uses it. **Saviynt's documentation requires a customer sign-in**, so I couldn't check its terms against an official source and haven't described them here. The concepts below are general IGA ideas. The specific names are SailPoint's.

SailPoint's current documentation calls its SaaS platform **SailPoint Human Fabric**. Older pages and many job postings say **Identity Security Cloud**.

## SailPoint vocabulary

| Term | Meaning |
| --- | --- |
| **Source** | An application, database or directory that keeps its own users. SailPoint collects data from it |
| **Authoritative source** | The main source of employee information, such as an HR application, used to create identities |
| **Identity profile** | Instructions for creating and managing identities from the authoritative source |
| **Identity** | A person or machine that has access in the governed environment |
| **Entitlement** | A basic access right on a source |
| **Access profile** | A bundle of entitlements from one source |
| **Role** | Access from one or many sources, grouped for a job function. *Standard* or *dynamic* |
| **Birthright access** | Access most identities get just by being part of the organization |
| **Lifecycle state** | The employment stage someone is in, such as "Pre-Hire", "Employee" or "On Leave". It can grant access |
| **Certification campaign** | An access review |
| **SoD policy** | Two lists of conflicting access |
| **Request Center** | Where users request roles, access profiles or entitlements |
| **Privilege on Demand** | Just-in-time access: pre-approved, provisioned only when activated, removed when the period ends |

## How it maps to Microsoft Entra ID Governance

| Concept | SailPoint | Microsoft Entra |
| --- | --- | --- |
| Connected systems | Sources | Provisioning connectors, SCIM apps |
| Bundled access | Access profiles, roles | Groups, access packages |
| Requests | Request Center | My Access (entitlement management) |
| Reviews | Certification campaigns | Access reviews |
| Conflicts | SoD policies | Incompatible access packages and groups |
| Just-in-time | Privilege on Demand | Privileged Identity Management |

## Why organizations add a dedicated IGA tool

Built-in cloud governance covers that cloud well. Organizations with many on-premises and third-party systems often want one place to see and govern access across all of them. That is the main pitch of platforms like SailPoint and Saviynt.

## How to study it

1. Learn the concepts hands-on with a platform you can access, such as Microsoft Entra ID Governance.
2. Read SailPoint's docs for its vocabulary, using the mapping table above.
3. In interviews, explain the *concept* first ("an access review campaign"), then the product term.

## Flashcards

```flashcards
Q: What do dedicated IGA platforms do?
A: Connect to many systems, collect who has what access, and run governance across all of them.

Q: What does SailPoint's current documentation call its SaaS platform?
A: **SailPoint Human Fabric**. Older pages say Identity Security Cloud.

Q: What is a source in SailPoint?
A: An application, database or directory that keeps its own users. SailPoint collects data from it.

Q: What is an authoritative source?
A: The main source of employee information, such as an HR application, used to create identities.

Q: What is a lifecycle state?
A: The employment stage someone is in, such as "Pre-Hire", "Employee" or "On Leave".

Q: What is Privilege on Demand?
A: Just-in-time access: pre-approved, provisioned only when activated, and removed when the period ends.

Q: Map SailPoint's certification campaigns, SoD policies and Request Center to Entra.
A: Access reviews, incompatible access packages and groups, and My Access (entitlement management).

Q: Why might an organization use SailPoint on top of Entra?
A: To govern access in one place across many on-premises and third-party systems.
```

## Sources

- SailPoint: [Access Overview](https://documentation.sailpoint.com/saas/help/access/index.html)
- SailPoint: [Managing Roles](https://documentation.sailpoint.com/saas/help/access/roles.html)
- SailPoint: [Understanding Certifications](https://documentation.sailpoint.com/saas/help/certs/understanding_certifications.html)
- SailPoint: [Separation of Duties Overview](https://documentation.sailpoint.com/saas/help/sod/index.html)
- SailPoint: [Requesting Access](https://documentation.sailpoint.com/saas/user-help/requests/request_center.html)
- SailPoint: [Glossary](https://documentation.sailpoint.com/saas/help/common/glossary.html)
- Microsoft Learn: [What is Microsoft Entra ID Governance?](https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview)
