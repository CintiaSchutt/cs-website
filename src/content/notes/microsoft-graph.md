---
title: Microsoft Graph for identity tasks
summary: The single REST API for Microsoft Entra and Microsoft 365, with the queries and permissions I'll use most for identity work.
updated: 2026-11-10
---

## In one sentence

**Microsoft Graph** is one REST API, at `https://graph.microsoft.com`, for data across Microsoft 365, Windows and Microsoft Entra, including users, groups, apps, roles and logs.

## Basics

- Two versions: **`v1.0`** (generally available, for production) and **`beta`** (preview, can change).
- Every call needs an access token with the right **permission**. Each API page lists the *least privileged* permission first.
- **Graph Explorer** lets you try calls in the browser with your own account.

## Identity calls I'll use

```http
# Who am I?
GET https://graph.microsoft.com/v1.0/me

# Find disabled users (only the fields I need)
GET https://graph.microsoft.com/v1.0/users?$filter=accountEnabled eq false&$select=displayName,userPrincipalName

# Members of a group
GET https://graph.microsoft.com/v1.0/groups/{group-id}/members

# Recent sign-ins (needs AuditLog.Read.All)
GET https://graph.microsoft.com/v1.0/auditLogs/signIns?$top=50

# Directory changes (audit log)
GET https://graph.microsoft.com/v1.0/auditLogs/directoryAudits?$top=50
```

## Query parameters

| Parameter | Does | Example |
| --- | --- | --- |
| `$select` | Returns only some properties | `$select=displayName,mail` |
| `$filter` | Filters results | `$filter=startswith(displayName,'A')` |
| `$top` | Page size | `$top=100` |
| `$expand` | Includes related objects | `$expand=memberOf` |
| `$count` | Counts results | Some queries need the `ConsistencyLevel: eventual` header |

## Permissions (examples, least to most privileged)

Listing users accepts, from least to most privileged: `User.ReadBasic.All`, `User.Read.All`, `User.ReadWrite.All`, `Directory.Read.All`, `Directory.ReadWrite.All`. Pick the first one that does the job.

## Things to handle

- **Paging**: `GET /users` returns 100 results per page by default. Follow `@odata.nextLink`.
- **Throttling**: **429 Too Many Requests** with `Retry-After`.
- **Changes over time**: delta queries return only what changed.

## Try it yourself

In Graph Explorer, sign in with a test account, run `GET /me`, then open the *Modify permissions* tab and see which permission each call needs.

## Security angle

- Graph can do almost anything in a tenant, so app permissions on Graph are some of the most sensitive grants. Review them.
- Prefer `v1.0` for anything that runs unattended.
- Sign-in and audit data contain personal information. Collect only what you need and protect it.

## Check yourself

1. Which version should a production script use?
2. What permission does reading sign-in logs need?
3. Why use `$select`?

## Sources

- Microsoft Learn: [Overview of Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview)
- Microsoft Learn: [Graph Explorer](https://learn.microsoft.com/en-us/graph/graph-explorer/graph-explorer-overview)
- Microsoft Learn: [Use query parameters](https://learn.microsoft.com/en-us/graph/query-parameters)
- Microsoft Learn: [List users](https://learn.microsoft.com/en-us/graph/api/user-list)
- Microsoft Learn: [signIn resource type](https://learn.microsoft.com/en-us/graph/api/resources/signin)
- Microsoft Learn: [directoryAudit resource type](https://learn.microsoft.com/en-us/graph/api/resources/directoryaudit)
- Microsoft Learn: [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- Microsoft Learn: [Paging](https://learn.microsoft.com/en-us/graph/paging) and [Throttling](https://learn.microsoft.com/en-us/graph/throttling)
