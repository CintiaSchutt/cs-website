---
title: OAuth 2.0
category: Identity protocols
summary: A framework that lets an app access an API on a user's behalf without seeing their password.
updated: 2026-10-15
---

> Sample note for the prototype. Replace it with your own summary.

## In one sentence

OAuth 2.0 is about **authorization**: it gives an application a limited access token for an API, approved by the user. It does not, by itself, tell the app who the user is.

## The roles

| Role | What it is | Example |
| --- | --- | --- |
| Resource owner | The user who owns the data | You |
| Client | The app that wants access | A budgeting app |
| Authorization server | Issues tokens after the user approves | Okta, Entra ID, Keycloak |
| Resource server | The API that accepts the token | Your bank's API |

## Authorization code flow with PKCE

The recommended flow for web, mobile and single-page apps.

1. The app sends the user to the authorization server with a `code_challenge`.
2. The user signs in and approves the requested **scopes**.
3. The server redirects back with a short-lived **authorization code**.
4. The app exchanges the code, plus the original `code_verifier`, for tokens.

PKCE stops a stolen authorization code from being used by anyone except the app that started the flow.

## Tokens

- **Access token**: sent to the API, short-lived. Often a JWT, but it does not have to be.
- **Refresh token**: gets new access tokens without asking the user again. Keep it safe.

## Watch out for

- The implicit flow and the password grant are deprecated. Use authorization code with PKCE.
- Request the smallest scopes that work (least privilege).
