---
title: SAML 2.0
summary: An older XML-based standard for single sign-on, still common in enterprise apps.
updated: 2026-10-15
---

> Sample note for the prototype. Replace it with your own summary.

## In one sentence

SAML lets a user sign in once at an **identity provider** (IdP) and access other apps (**service providers**, SPs) using signed XML **assertions**.

## SAML compared with OIDC

| | SAML 2.0 | OpenID Connect |
| --- | --- | --- |
| Format | XML | JSON / JWT |
| Typical use | Enterprise web SSO | Web, mobile, APIs |
| Token | Assertion | ID token |
| Setup | Exchange metadata files | Discovery URL |

## SP-initiated flow

1. The user opens the app (SP).
2. The SP redirects the user to the IdP with an `AuthnRequest`.
3. The user signs in at the IdP.
4. The IdP posts a signed assertion back to the SP's ACS URL.
5. The SP validates it and starts a session.

## Watch out for

- Always validate the signature and the audience.
- XML signature wrapping attacks: use a well-maintained library, never hand-rolled parsing.
