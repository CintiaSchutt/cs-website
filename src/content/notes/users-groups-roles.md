---
title: Users, groups and roles
summary: The three objects behind almost every access decision, and how to combine them without losing control.
updated: 2026-11-10
---

## In one sentence

**Users** are identities, **groups** collect users (and sometimes devices or apps) so access can be managed in bulk, and **roles** are named sets of permissions, especially administrative ones.

## Users in Microsoft Entra ID

- **Members**: people in your organization. They can be cloud-only or synchronized from on-premises Active Directory.
- **Guests**: people from outside, invited through B2B collaboration (see [Federation and trust](/notes/federation)).
- A deleted user stays in **Deleted users** for **30 days** and can be restored during that time.

## Groups in Microsoft Entra ID

| Type | Used for | Members |
| --- | --- | --- |
| **Security group** | Access to apps and resources, policy targeting | Users, devices, service principals, other groups |
| **Microsoft 365 group** | Collaboration (shared mailbox, files, Teams) | Users only, including guests |

| Membership | How it works |
| --- | --- |
| **Assigned** | Owners or admins add members by hand |
| **Dynamic** | A rule adds and removes members automatically, for example `user.department -eq "Finance"` |

Dynamic groups keep access in step with HR data, which supports the [joiner, mover, leaver](/notes/joiner-mover-leaver) process.

## Roles

There are two different "role" systems in Microsoft's cloud, and it's easy to mix them up:

| | Microsoft Entra roles | Azure RBAC roles |
| --- | --- | --- |
| Controls | The directory: users, groups, apps, policies | Azure resources: VMs, storage, subscriptions |
| Examples | Global Administrator, User Administrator, Helpdesk Administrator | Owner, Contributor, Reader |
| Scope | Tenant, administrative unit or a single app | Management group, subscription, resource group, resource |

Apps can also define their own **app roles** (see [RBAC and ABAC](/notes/rbac-abac)).

## Microsoft's best practices for Entra roles

- Use the **least privileged role** for the task. Microsoft's permissions reference lists what each role can do.
- Keep **Global Administrators to fewer than five** people.
- Use **[Privileged Identity Management](/notes/just-in-time-access)** for just-in-time activation instead of permanent assignments.
- Assign roles to **groups** where it makes sense, and review them regularly.
- Use **administrative units** to limit an admin to a part of the organization, such as one region.

## A simple pattern

```text
Person  →  member of group "Finance-Analysts" (dynamic: department = Finance)
Group   →  assigned to app "ERP", app role "Reader"
Admin   →  eligible (not active) for "User Administrator", scoped to AU "Finance"
```

## Security angle

- Direct, one-off assignments to users are hard to audit. Prefer groups.
- A group's **owner** controls who gets the group's access, so owners need reviews too.
- Role-assignable groups need extra protection, because membership grants an admin role.

## Check yourself

1. What is the difference between a security group and a Microsoft 365 group?
2. Global Administrator and Owner: which one is an Entra role, and which is an Azure RBAC role?
3. Why do dynamic groups help with movers?

## Sources

- Microsoft Learn: [How to create, invite and delete users](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users)
- Microsoft Learn: [Learn about groups and access rights](https://learn.microsoft.com/en-us/entra/fundamentals/concept-learn-about-groups)
- Microsoft Learn: [Dynamic membership rules for groups](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership)
- Microsoft Learn: [Understand roles in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/concept-understand-roles)
- Microsoft Learn: [Microsoft Entra built-in roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference)
- Microsoft Learn: [Best practices for Microsoft Entra roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices)
- Microsoft Learn: [Administrative units](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units)
- Microsoft Learn: [What is Azure RBAC?](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)
