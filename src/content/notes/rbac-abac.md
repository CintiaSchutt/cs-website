---
title: RBAC and ABAC
category: Access control
summary: Two ways to decide who can do what, by role or by attributes.
updated: 2026-10-15
---

> Sample note for the prototype. Replace it with your own summary.

## Role-based access control (RBAC)

Permissions are grouped into **roles**, and users get roles.

- Simple to understand and to audit: "who has the Billing Admin role?"
- Can lead to **role explosion** when every exception becomes a new role.

## Attribute-based access control (ABAC)

Access is decided by **rules** over attributes of the user, the resource and the context.

```text
allow if user.department == resource.department
      and user.clearance >= resource.sensitivity
      and time is within business hours
```

- Very flexible and fine-grained.
- Harder to audit: "who can see this?" means evaluating the rules.

## Related ideas

- **Least privilege**: give only the access needed, for only as long as needed.
- **Separation of duties**: no single person can both request and approve the same thing.
- **Access reviews**: managers regularly confirm their team's access is still needed.
