---
title: OpenID Connect
category: Identity protocols
summary: An identity layer on top of OAuth 2.0 that tells the app who signed in.
updated: 2026-10-15
---

> Sample note for the prototype. Replace it with your own summary.

## In one sentence

OpenID Connect (OIDC) adds **authentication** to OAuth 2.0: alongside the access token, the app gets an **ID token** that says who the user is.

## What it adds to OAuth 2.0

- The `openid` scope, which turns an OAuth request into an OIDC one.
- The **ID token**: a signed JWT with claims about the user and the sign-in.
- A **UserInfo** endpoint for more profile details.
- **Discovery**: `/.well-known/openid-configuration` lists the provider's endpoints and keys.

## Key ID token claims

| Claim | Meaning |
| --- | --- |
| `iss` | Who issued the token |
| `sub` | A stable ID for the user |
| `aud` | Which app the token is for |
| `exp` | When it expires |
| `nonce` | Ties the token to this sign-in request |

## Validating an ID token

1. Check the signature with the provider's published keys (JWKS).
2. Check `iss`, `aud` and `exp`.
3. Check the `nonce` matches the one you sent.

> The ID token is for the app. The access token is for the API. Don't send the ID token to APIs.
