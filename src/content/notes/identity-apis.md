---
title: Identity APIs
summary: How scripts and apps manage identities through REST APIs, how they authenticate, and how to use them safely.
---

## In one sentence

**Identity APIs** let software do what admins do in a portal (create users, change groups, read logs) through authenticated REST calls, which makes identity work repeatable and auditable.

## The main ones

| API | Used for |
| --- | --- |
| **Microsoft Graph** | Entra ID users, groups, apps, roles, logs, and much more (see [Microsoft Graph](/notes/microsoft-graph)) |
| **SCIM** | Standard provisioning between systems (see [SCIM](/notes/scim)) |
| **Okta APIs** | Okta users, groups, apps, policies and the System Log |
| **OIDC / OAuth endpoints** | Sign-in and tokens: `/authorize`, `/token`, discovery, JWKS |

## How a script authenticates

A script is a client too, so it uses OAuth 2.0:

| Scenario | Flow | Permission type |
| --- | --- | --- |
| A person runs a script interactively | Authorization code or device code | **Delegated**: the script can only do what that person can do |
| A scheduled job with no user | **Client credentials** | **Application**: acts as itself, tenant-wide. Needs admin consent |

```http
POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id={app-id}&scope=https://graph.microsoft.com/.default
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={signed JWT from a certificate}&grant_type=client_credentials
```

The `/.default` scope means "all the application permissions an admin already granted to this app".

## Patterns every identity API needs

- **Paging**: results come in pages. Follow the next-page link until there isn't one (`@odata.nextLink` in Graph).
- **Throttling**: too many requests get **HTTP 429** with a `Retry-After` header. Wait that long, then retry.
- **Delta queries**: ask only for what changed since last time, instead of reading everything again.
- **Idempotency**: running the same job twice shouldn't create duplicates. Check whether the user exists before creating them.

## Where I've seen this

I design secure REST APIs as a developer. Identity APIs are the same craft, used from the other side: I'm the client, and the API decides what my token allows.

## Security angle

- An automation app with `User.ReadWrite.All` or `Directory.ReadWrite.All` is effectively an admin. Give it the **least privileged** permission listed for each API call.
- Prefer **certificates**, **managed identities** or **workload identity federation** over client secrets. Never commit secrets to Git.
- Store any secret you must have in a vault such as **Azure Key Vault**.
- Log what the automation changed, so its actions show up as [audit evidence](/notes/audit-evidence).

## Flashcards

```flashcards
Q: Name four kinds of identity APIs.
A: Microsoft Graph, SCIM, Okta APIs, and the OIDC and OAuth endpoints.

Q: Delegated or application permissions: when does a script use each?
A: **Delegated** when a person runs it interactively (limited to their rights). **Application** for unattended jobs (tenant-wide, admin consent needed).

Q: What does the `/.default` scope mean?
A: All the application permissions an admin already granted to the app.

Q: How do you handle paging in Microsoft Graph?
A: Follow `@odata.nextLink` until there isn't one.

Q: What should a client do when it gets HTTP 429?
A: Wait for the `Retry-After` time, then retry.

Q: What is a delta query?
A: Asking only for what changed since last time.

Q: Why is idempotency important for provisioning jobs?
A: Running the same job twice shouldn't create duplicates.

Q: How should an automation app authenticate?
A: Prefer certificates, managed identities or workload identity federation over secrets, and never commit secrets to Git.
```

## Sources

- Microsoft Learn: [Overview of Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview)
- Microsoft Learn: [Authentication and authorization basics for Microsoft Graph](https://learn.microsoft.com/en-us/graph/auth/auth-concepts)
- Microsoft Learn: [OAuth 2.0 client credentials flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow)
- Microsoft Learn: [Certificate credentials](https://learn.microsoft.com/en-us/entra/identity-platform/certificate-credentials)
- Microsoft Learn: [Paging Microsoft Graph data](https://learn.microsoft.com/en-us/graph/paging)
- Microsoft Learn: [Microsoft Graph throttling guidance](https://learn.microsoft.com/en-us/graph/throttling)
- Microsoft Learn: [Use delta query](https://learn.microsoft.com/en-us/graph/delta-query-overview)
- Okta Developer: [Okta API reference](https://developer.okta.com/docs/api/)
