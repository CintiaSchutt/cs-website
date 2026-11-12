---
title: Access requests and approvals
summary: Letting people ask for access through a controlled, recorded process with the right approvers and an end date.
---

## In one sentence

An **access request** process lets a person ask for access they don't get by default, routes it to the right **approvers**, records the decision, and ideally sets an **expiry**.

## What a good request process has

| Element | Why it matters |
| --- | --- |
| A **catalogue** of requestable access | People ask for "Finance reporting", not "SG-FIN-RPT-RO-02" |
| **Business justification** | Approvers and auditors can see *why* |
| The **right approver** | A manager knows the need. A resource owner knows the risk |
| **Multi-stage** approval for sensitive access | Manager first, then resource owner or security |
| **Expiration** | Access ends unless someone renews it |
| A **record** | Who asked, who approved, when, and why |

## Microsoft Entra entitlement management

| Concept | Meaning |
| --- | --- |
| **Catalog** | A container of resources (groups, apps, SharePoint sites) and access packages, often managed by a business team |
| **Access package** | A bundle of resources a user can request as one item |
| **Policy** | Who can request it, who must approve, and when access expires |
| **Separation of duties** | An access package can be marked *incompatible* with other packages or groups |

Microsoft notes that creating access packages can be **delegated** to non-administrators, so the people who own a resource decide who gets it.

```text
Access package: "Billing team - standard"
  Resources:   Group "Billing-App-Users", App "Billing", SharePoint "Billing docs"
  Policy:      Requestable by employees in the Finance department
               Approval: manager, then Billing app owner
               Expires:  after 180 days, with a renewal option
```

## SailPoint's version

SailPoint users request roles, access profiles or entitlements through the **Request Center**. Approvals and access request settings are configured by admins.

## Security angle

- Approvers who approve everything ("rubber-stamping") make the process useless. Give them context: what the access allows and who else has it.
- Avoid letting people approve their own requests.
- Requests without expiry slowly become permanent access. Combine requests with [access reviews](/notes/access-reviews).

## Flashcards

```flashcards
Q: Name four elements of a good access request process.
A: For example: a catalogue, a business justification, the right approver, multi-stage approval for sensitive access, an expiry and a record.

Q: What is an Entra access package?
A: A bundle of resources (groups, apps, SharePoint sites) a user can request as one item.

Q: What is a catalog?
A: A container of resources and access packages, often managed by a business team.

Q: What does an access package policy define?
A: Who can request it, who must approve, and when access expires.

Q: Why use business-friendly names for requestable access?
A: People ask for "Finance reporting", not "SG-FIN-RPT-RO-02".

Q: What is the benefit of a two-stage approval?
A: The manager confirms the need, and the resource owner confirms the risk.

Q: What is rubber-stamping?
A: Approvers who approve everything, which makes the process useless.

Q: What happens to access with no expiry and no review?
A: It slowly becomes permanent.

Q: Where do SailPoint users request access?
A: In the **Request Center**.
```

## Sources

- Microsoft Learn: [What is entitlement management?](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview)
- Microsoft Learn: [Change request settings for an access package](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-request-policy)
- Microsoft Learn: [Change approval settings for an access package](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-approval-policy)
- Microsoft Learn: [Configure separation of duties checks for an access package](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-incompatible)
- Microsoft Learn: [Request access to an access package](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-request-access)
- SailPoint: [Requesting Access](https://documentation.sailpoint.com/saas/user-help/requests/request_center.html)
