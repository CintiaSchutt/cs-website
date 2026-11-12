---
title: OAuth 2.0
summary: A framework that lets an app get limited access to an API on a user's behalf, without ever seeing their password.
---

## In one sentence

OAuth 2.0 (RFC 6749) is an **authorization** framework: it gives a client app a limited **access token** for an API, usually with the user's approval. On its own, it does not tell the app who the user is. That is what [OpenID Connect](/notes/oidc) adds.

## The four roles

| Role | What it is | Example |
| --- | --- | --- |
| Resource owner | Whoever can grant access, usually the user | You |
| Client | The app that wants access | An Angular or React SPA |
| Authorization server | Authenticates the user and issues tokens | Microsoft Entra ID, Azure AD B2C, Okta |
| Resource server | The API that accepts access tokens | Your REST API |

**Client types**: a *confidential* client can keep a secret (server-side web app). A *public* client cannot (a single-page app, a mobile app). Anything shipped to the browser is public.

## Authorization code flow with PKCE

The recommended flow for web, mobile and single-page apps. PKCE (RFC 7636, "pixie") stops a stolen authorization code from being exchanged by an attacker.

```http
1) The browser goes to the authorization endpoint
GET /authorize?response_type=code
  &client_id=spa-123
  &redirect_uri=https://app.example.com/callback
  &scope=openid invoices.read
  &state=af0ifjsldkj
  &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
  &code_challenge_method=S256

2) After sign-in and consent, the server redirects back
https://app.example.com/callback?code=SplxlOBeZQQYbYS6WxSbIA&state=af0ifjsldkj

3) The app exchanges the code at the token endpoint
POST /token
grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA
&redirect_uri=https://app.example.com/callback&client_id=spa-123
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

- `code_verifier`: a random secret the app creates for each sign-in.
- `code_challenge`: the base64url-encoded SHA-256 hash of the verifier, sent first.
- `state`: a random value checked on return, to block cross-site request forgery.

## Other grants

| Grant | Use it for | Status |
| --- | --- | --- |
| Authorization code + PKCE | Apps acting for a signed-in user | Recommended |
| Client credentials | Service-to-service, no user | Fine for confidential clients |
| Device authorization (RFC 8628) | TVs, CLIs, devices without a browser | Fine |
| Refresh token | Getting new access tokens silently | Fine, with protections |
| Implicit | Old SPAs | RFC 9700: **SHOULD NOT** be used |
| Resource owner password credentials | App collects the password | RFC 9700: **MUST NOT** be used |

## Calling the API

The client sends the access token as a bearer token (RFC 6750):

```http
GET /api/invoices
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOi...
```

A *bearer* token works for anyone who holds it, so it must be short-lived and kept out of logs and URLs.

## Where I've seen this

I work with OAuth 2.0 and OpenID Connect at QHR Technologies, including the move to Azure AD B2C. In Angular apps, the SPA is a **public client**: it uses the authorization code flow with PKCE and never holds a client secret.

## Security angle (RFC 9700, OAuth 2.0 Security Best Current Practice)

- Public clients **must** use PKCE. PKCE is recommended for confidential clients too.
- The authorization server should compare redirect URIs by **exact string match**.
- Refresh tokens for public clients must be sender-constrained or **rotated** on each use.
- Restrict access tokens to their intended audience and to the smallest scopes that work.
- For SPAs, the IETF draft *OAuth 2.0 for Browser-Based Applications* describes a backend-for-frontend (BFF) pattern that keeps tokens out of the browser.

## Flashcards

```flashcards
Q: What kind of framework is OAuth 2.0?
A: An **authorization** framework: it gives a client a limited access token for an API. On its own, it doesn't say who the user is.

Q: Name the four OAuth 2.0 roles.
A: **Resource owner**, **client**, **authorization server** and **resource server**.

Q: Why is an Angular or React SPA a public client?
A: Anything shipped to the browser can't keep a secret.

Q: What problem does PKCE solve?
A: It stops a stolen authorization code from being exchanged by anyone except the app that started the flow.

Q: How is the `code_challenge` made from the `code_verifier`?
A: It is the base64url-encoded **SHA-256** hash of the verifier (`code_challenge_method=S256`).

Q: What is the `state` parameter for?
A: A random value checked on return, to block cross-site request forgery.

Q: Which grant is for service-to-service calls with no user?
A: **Client credentials**.

Q: What does RFC 9700 say about the implicit and password grants?
A: The implicit grant **SHOULD NOT** be used. The resource owner password credentials grant **MUST NOT** be used.

Q: How should an authorization server compare redirect URIs?
A: By **exact string match**.

Q: What must protect refresh tokens issued to public clients?
A: Sender-constraining or **rotation** on each use.

Q: Why must bearer tokens be short-lived and kept out of logs and URLs?
A: A bearer token works for **anyone** who holds it.
```

## Sources

- IETF: [RFC 6749, The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749)
- IETF: [RFC 6750, Bearer Token Usage](https://www.rfc-editor.org/rfc/rfc6750)
- IETF: [RFC 7636, Proof Key for Code Exchange (PKCE)](https://www.rfc-editor.org/rfc/rfc7636)
- IETF: [RFC 9700, OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700)
- IETF: [RFC 8628, Device Authorization Grant](https://www.rfc-editor.org/rfc/rfc8628)
- IETF draft: [OAuth 2.0 for Browser-Based Applications](https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/) (work in progress)
- Microsoft Learn: [OAuth 2.0 authorization code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)
