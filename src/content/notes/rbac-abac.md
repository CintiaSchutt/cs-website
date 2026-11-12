---
title: RBAC and ABAC
summary: Two ways to decide who can do what, by role or by attributes, and how Azure and Entra use both.
---

## In one sentence

**Role-based access control (RBAC)** grants permissions through roles that users are assigned. **Attribute-based access control (ABAC)** decides each request with rules over attributes of the user, the resource and the context.

## RBAC

In the NIST RBAC model, **permissions** are assigned to **roles**, and **users** are assigned to roles. Users never get permissions directly. The model has levels:

- **Core RBAC**: users, roles, permissions and sessions.
- **Hierarchical RBAC**: senior roles inherit the permissions of junior roles.
- **Constrained RBAC**: adds [separation of duties](/notes/segregation-of-duties) rules, for example "nobody can hold both of these roles".

Strengths: easy to understand and audit ("who has the Billing Admin role?"). Weakness: when every exception becomes a new role, you end up with too many roles to manage.

## ABAC

NIST SP 800-162 describes ABAC as granting or denying a subject's request based on:

- **subject attributes** (department, clearance, employment type)
- **object attributes** (owner, sensitivity, project tag)
- **environment conditions** (time, location, device state)
- **policies** written over those attributes

```text
allow read if  user.department == document.department
           and document.sensitivity != "restricted"
```

Strengths: fine-grained and flexible, with no new role per exception. Weakness: harder to answer "who can see this?", because you have to evaluate the rules.

## How Microsoft uses both

**Azure RBAC**: a role assignment has three parts:

| Part | Example |
| --- | --- |
| Security principal (who) | A user, group, service principal or managed identity |
| Role definition (what) | Reader, Contributor, Storage Blob Data Reader |
| Scope (where) | Management group, subscription, resource group or resource |

**Azure ABAC**: role assignment *conditions* add attribute checks on top of RBAC, for example "can read blobs only when the blob's `Project` tag matches".

**Entra app roles**: an app defines roles such as `Invoices.Approve`. Users or groups are assigned to them, and the role appears in the token's `roles` claim, so the API can check it.

## Where I've seen this

Designing secure REST APIs means deciding where these checks live. A token tells the API who the caller is and which roles or scopes they have, and the API must still check that the caller may act on *this* record.

## Flashcards

```flashcards
Q: What is RBAC?
A: Permissions are assigned to **roles**, and users are assigned to roles.

Q: In NIST RBAC, can a user be given a permission directly?
A: No. Users get permissions only through roles.

Q: What do hierarchical and constrained RBAC add?
A: **Hierarchical**: senior roles inherit junior roles' permissions. **Constrained**: separation of duties rules.

Q: What is ABAC?
A: Each request is decided by rules over attributes of the user, the resource and the context.

Q: Name the four inputs to an ABAC decision in NIST SP 800-162.
A: **Subject attributes**, **object attributes**, **environment conditions** and **policies**.

Q: What is one strength and one weakness of each model?
A: RBAC is easy to audit, but every exception can become a new role. ABAC is flexible, but answering "who can see this?" means evaluating the rules.

Q: What are the three parts of an Azure role assignment?
A: **Security principal** (who), **role definition** (what) and **scope** (where).

Q: What does Azure ABAC add to Azure RBAC?
A: Role assignment **conditions**, for example reading blobs only when the blob's `Project` tag matches.

Q: Where does an Entra app role appear for the API to check?
A: In the token's `roles` claim.
```

## Sources

- NIST CSRC: [Role Based Access Control project](https://csrc.nist.gov/projects/role-based-access-control)
- NIST: [SP 800-162, Guide to Attribute Based Access Control](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- Microsoft Learn: [What is Azure role-based access control?](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)
- Microsoft Learn: [What is Azure attribute-based access control?](https://learn.microsoft.com/en-us/azure/role-based-access-control/conditions-overview)
- Microsoft Learn: [Add app roles and get them from a token](https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps)
