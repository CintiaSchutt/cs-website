---
title: OpenID Connect
summary: An identity layer on top of OAuth 2.0 that tells the app who signed in, using a signed ID token.
---

## In one sentence

OpenID Connect (OIDC) adds **authentication** to OAuth 2.0: along with the access token, the app (the *relying party*) receives an **ID token** that says who the user is and how they signed in.

## What OIDC adds to OAuth 2.0

- The **`openid` scope**, which turns an OAuth request into an OIDC request.
- The **ID token**: a signed JWT with claims about the user and the sign-in event.
- The **UserInfo endpoint**, for more profile claims.
- **Discovery**: `https://<issuer>/.well-known/openid-configuration` lists the provider's endpoints, supported features and the `jwks_uri` for its signing keys.
- Standard scopes for profile data: `profile`, `email`, `address`, `phone`.

## ID token claims

Required by OIDC Core: `iss`, `sub`, `aud`, `exp`, `iat`.

| Claim | Meaning |
| --- | --- |
| `iss` | Issuer: who created the token |
| `sub` | Subject: an identifier for the user, unique and never reassigned within that issuer |
| `aud` | Audience: must include your app's `client_id` |
| `exp` / `iat` | Expiry and issued-at times |
| `nonce` | Echoes the value the app sent, to tie the token to this request |
| `auth_time`, `acr`, `amr` | When and how the user authenticated |

```json
{
  "iss": "https://login.example.com/",
  "sub": "248289761001",
  "aud": "spa-123",
  "nonce": "n-0S6_WzA2Mj",
  "exp": 1311281970,
  "iat": 1311280970
}
```

**Use `iss` + `sub` as the user's key, not email.** OIDC Core says only that pair is guaranteed to be stable and unique. Emails can change and can be reused. In Microsoft Entra, `sub` is different for each app, while `oid` identifies the user across apps in the tenant.

## Validating an ID token (OIDC Core 3.1.3.7, simplified)

1. `iss` exactly matches the issuer in the discovery document.
2. `aud` contains your `client_id`.
3. The signature is valid, using the key from `jwks_uri` that matches the token's `kid`.
4. The current time is before `exp`.
5. `nonce` matches the value you sent.

In practice, a maintained library (MSAL, an OIDC client library) does this. Your job is to configure it correctly and never skip validation.

## Signing out

The OIDC *RP-Initiated Logout* spec lets the app send the user to the provider's `end_session_endpoint`, often with `id_token_hint` and `post_logout_redirect_uri`. Clearing the app's own session does **not** end the session at the identity provider.

## Where I've seen this

In the move to Azure AD B2C, apps signed users in through OIDC. Questions such as "which claim identifies the user?" and "what happens to existing sessions during the fallback?" are core OIDC questions.

## Security angle

- **The ID token is for the app. The access token is for the API.** Microsoft's docs say not to use ID tokens to call APIs.
- Always validate `aud`: a token issued to another app must be rejected.
- Don't trust claims sent from the browser. Trust only claims from a token you validated.

## Check yourself

1. Which scope makes an OAuth request an OIDC request?
2. Why is `email` a poor primary key for users?
3. What does the `nonce` protect against?

## Sources

- OpenID Foundation: [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- OpenID Foundation: [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)
- OpenID Foundation: [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)
- Microsoft Learn: [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc)
- Microsoft Learn: [ID tokens](https://learn.microsoft.com/en-us/entra/identity-platform/id-tokens)
- Microsoft Learn: [ID token claims reference](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference)
