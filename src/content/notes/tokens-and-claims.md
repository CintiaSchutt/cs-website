---
title: Tokens, claims and JWTs
summary: What is inside a JSON Web Token, who should read it, and how an API should validate it.
updated: 2026-11-10
---

## In one sentence

A **token** is a piece of data that proves something (a sign-in, a permission). A **claim** is one statement inside it. A **JWT** (JSON Web Token, RFC 7519) is a common, compact format for tokens.

## Anatomy of a JWT

Three base64url-encoded parts separated by dots: `header.payload.signature`.

```text
eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiYzEyMyJ9   ← header
.eyJpc3MiOiJodHRwczovL...                  ← payload (claims)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c   ← signature
```

```json
// header
{ "alg": "RS256", "kid": "abc123", "typ": "JWT" }

// payload
{ "iss": "https://login.example.com/", "sub": "u-42", "aud": "api://invoices",
  "exp": 1767225600, "scp": "invoices.read" }
```

- **Signed** (JWS, RFC 7515): anyone can *read* it. The signature only proves it wasn't changed.
- **Base64url is encoding, not encryption.** Never put secrets in a JWT.
- An encrypted variant (JWE) exists, but most tokens you'll see are signed, not encrypted.

## Registered claims (RFC 7519)

| Claim | Meaning |
| --- | --- |
| `iss` | Issuer |
| `sub` | Subject |
| `aud` | Audience: who the token is for |
| `exp` | Expiration time |
| `nbf` | Not valid before |
| `iat` | Issued at |
| `jti` | Unique token ID, useful against replay |

Microsoft Entra adds claims such as `tid` (tenant), `oid` (user object ID), `scp` (delegated scopes) and `roles` (app roles or application permissions).

## Who reads which token

| Token | Read by | Microsoft guidance |
| --- | --- | --- |
| ID token | The client app | Proof of authentication |
| Access token | **Only the API** | Clients should treat it as an opaque string |
| Refresh token | Only the authorization server | Opaque to everyone else |

Not every access token is a JWT. Some are *opaque* references that the API checks with the authorization server's introspection endpoint (RFC 7662). RFC 9068 defines a standard JWT access token format, marked `typ: at+jwt`.

## Validating a JWT in an API (RFC 8725, JWT Best Current Practices)

1. Allow only the algorithms you expect (for example `RS256`). Never accept `alg: none`.
2. Verify the signature with the issuer's published keys (JWKS, RFC 7517), chosen by `kid`.
3. Check `iss` and `aud` exactly.
4. Check `exp` and `nbf`, allowing a small clock skew.
5. Then check authorization: `scp` or `roles` for the action requested.

## Lifetimes in Microsoft Entra (defaults)

- Access tokens: a random value between **60 and 90 minutes** (75 on average).
- Refresh tokens: **24 hours** for single-page apps, **90 days** for most other cases. They are replaced on every use.

## Security angle

- Bearer tokens work for whoever holds them. Keep them out of URLs, logs and error messages.
- DPoP (RFC 9449) is one way to *sender-constrain* tokens, so a stolen token is useless without the client's key.
- Decoding a token to debug it is fine. Microsoft points to `jwt.ms`. Don't paste production tokens into sites you don't trust.

## Check yourself

1. Can anyone read the payload of a signed JWT?
2. Why should a client app not parse its access token?
3. What is the first thing an API should check about `alg`?

## Sources

- IETF: [RFC 7519, JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)
- IETF: [RFC 7515, JSON Web Signature (JWS)](https://www.rfc-editor.org/rfc/rfc7515)
- IETF: [RFC 7517, JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517)
- IETF: [RFC 8725, JWT Best Current Practices](https://www.rfc-editor.org/rfc/rfc8725)
- IETF: [RFC 9068, JWT Profile for OAuth 2.0 Access Tokens](https://www.rfc-editor.org/rfc/rfc9068)
- IETF: [RFC 7662, Token Introspection](https://www.rfc-editor.org/rfc/rfc7662)
- IETF: [RFC 9449, DPoP](https://www.rfc-editor.org/rfc/rfc9449)
- Microsoft Learn: [Access tokens](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
- Microsoft Learn: [Refresh tokens](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens)
- Microsoft Learn: [Access token claims reference](https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference)
- Microsoft Learn: [Secure applications and APIs by validating claims](https://learn.microsoft.com/en-us/entra/identity-platform/claims-validation)
