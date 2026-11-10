---
title: Single sign-on (SSO)
summary: Sign in once at an identity provider and reach many apps, and why that one sign-in then needs strong protection.
---

## In one sentence

**Single sign-on (SSO)** lets a user authenticate once and then access several applications without signing in again, because each app trusts the same identity provider.

## How it works

SSO is federation (see [Federation and trust](/notes/federation)) applied to many apps:

1. The user signs in at the identity provider (IdP). The IdP creates **its own session**, usually a cookie on the IdP's domain.
2. App A redirects to the IdP. The IdP sees its session and returns a token or assertion without asking for credentials.
3. App B does the same. Each app creates **its own app session**.

```text
       ┌── App A session
IdP session ─┼── App B session
       └── App C session
```

That is why signing out is hard: ending one app's session does not end the others, or the IdP session. Protocols offer ways to coordinate logout, and apps have to implement them.

## SSO options in Microsoft Entra

| Option | When to use |
| --- | --- |
| **OpenID Connect / OAuth 2.0** | New and modern apps (recommended for apps you build) |
| **SAML** | Enterprise SaaS apps that support it |
| **Password-based** | Apps with only a username and password form. Entra stores and fills in credentials |
| **Linked** | A link in the My Apps portal to an app with its own SSO |
| **Header-based** | Older on-premises apps that read identity from HTTP headers |

Microsoft's guidance is to prefer OIDC or SAML when the app supports them.

## Benefits

- Fewer passwords for users, and fewer password resets for the help desk.
- One place to enforce MFA and [Conditional Access](/notes/conditional-access) for every app.
- One place to disable a leaver's access to everything at once.

## Security angle

- SSO concentrates risk: whoever controls the IdP sign-in reaches every connected app. Pair SSO with strong [MFA](/notes/mfa).
- Disabling a user at the IdP blocks *new* sign-ins. Existing app sessions can last until they expire, so session lifetimes matter.
- Every app must still validate the token or assertion it receives.

## Check yourself

1. Why does a user stay signed in to app B after signing out of app A?
2. Which SSO option should a team building a new app pick in Entra?
3. Why does SSO make MFA more important, not less?

## Sources

- NIST CSRC Glossary: [single sign-on](https://csrc.nist.gov/glossary/term/single_sign_on)
- Microsoft Learn: [What is single sign-on in Microsoft Entra ID?](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-single-sign-on)
- Microsoft Learn: [Plan a single sign-on deployment](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment)
- OpenID Foundation: [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)
