---
title: Authentication vs authorization
summary: Authentication proves who you are. Authorization decides what you are allowed to do.
---

## In one sentence

**Authentication** (AuthN) verifies an identity. **Authorization** (AuthZ) decides whether that identity may perform a specific action on a specific resource.

## Side by side

| | Authentication | Authorization |
| --- | --- | --- |
| Question | Who are you? | Are you allowed to do this? |
| When | First, at sign-in | On every request to a resource |
| Evidence | Password, passkey, certificate | Roles, scopes, group membership, attributes |
| Standard | OpenID Connect, SAML | OAuth 2.0 (delegated access), app logic |
| Token | ID token (OIDC) | Access token (OAuth 2.0) |

## HTTP status codes

The names are confusing, so it helps to learn them as a pair (RFC 9110):

- **401 Unauthorized**: really means *not authenticated*. The request has no valid credentials. The response includes a `WWW-Authenticate` header.
- **403 Forbidden**: the server understood who you are and refuses anyway. That is an *authorization* failure.

```http
GET /api/invoices/42
Authorization: Bearer eyJhbGciOi...

HTTP/1.1 403 Forbidden
```

## Coming from Angular

In Angular, a route guard (`canActivate`) can hide the admin page from users without the admin role. That is good for the user experience, but it is **not** security: anyone can call the API directly.

```ts
// Angular: UX only. The browser can be bypassed.
{ path: 'admin', component: AdminPage, canActivate: [adminGuard] }
```

The real authorization check has to happen on the server, on every request. OWASP's Authorization Cheat Sheet says to validate permissions on every request and to deny by default.

## Security angle

**Broken access control** is #1 in the OWASP Top 10 (2021). Typical bugs:

- Changing an ID in the URL (`/invoices/42` → `/invoices/43`) and seeing someone else's data.
- An API that checks "is signed in" but never "owns this record".
- Trusting a role sent by the client instead of one from a validated token.

## Flashcards

```flashcards
Q: What is the difference between authentication and authorization?
A: Authentication verifies **who** you are. Authorization decides whether that identity may perform a specific action on a specific resource.

Q: When does each one happen?
A: Authentication happens first, at sign-in. Authorization happens on **every request** to a resource.

Q: Which token is for authentication, and which is for calling an API?
A: The **ID token** (OIDC) is proof of authentication. The **access token** (OAuth 2.0) is sent to the API.

Q: What does HTTP **401 Unauthorized** really mean?
A: *Not authenticated*: the request has no valid credentials. The response includes a `WWW-Authenticate` header.

Q: What does HTTP **403 Forbidden** mean?
A: The server knows who you are and refuses anyway: an **authorization** failure.

Q: A signed-in user opens another customer's invoice and is refused. 401 or 403?
A: **403**: they are authenticated, but not authorized for that record.

Q: Why isn't an Angular route guard enough to protect admin data?
A: It only changes what the browser shows. Anyone can call the API directly, so the server must check authorization on every request.

Q: Which two principles does OWASP's Authorization Cheat Sheet stress?
A: Validate permissions on **every request**, and **deny by default**.

Q: Which category is #1 in the OWASP Top 10 (2021)?
A: **Broken access control**.

Q: Give an example of broken access control.
A: Changing an ID in the URL (`/invoices/42` → `/invoices/43`) and seeing someone else's data, or trusting a role sent by the client instead of one from a validated token.
```

## Sources

- Microsoft Learn: [Authentication vs. authorization](https://learn.microsoft.com/en-us/entra/identity-platform/authentication-vs-authorization)
- NIST CSRC Glossary: [authentication](https://csrc.nist.gov/glossary/term/authentication) and [authorization](https://csrc.nist.gov/glossary/term/authorization)
- IETF: [RFC 9110, HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) (sections 15.5.2 and 15.5.4)
- OWASP: [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- OWASP: [A01:2021 Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
