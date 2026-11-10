---
title: How the pieces fit: basic IAM architecture
summary: A map of the main IAM components (directory, identity provider, policy, governance, PAM and logs) and how a request flows through them.
---

## In one sentence

A typical IAM setup has a **source of truth**, a **directory**, an **identity provider** that applies **policy**, the **apps** that trust it, and **governance, privileged access and logging** around all of it.

## The map

```text
 HR system (source of truth)
      │  joiner / mover / leaver events
      ▼
 Directory  ◄────── sync ──────  On-premises Active Directory (hybrid)
 (Entra ID, Okta Universal Directory)
      │
      ▼
 Identity provider + policy engine
 (sign-in, MFA, Conditional Access)
      │  tokens / assertions (OIDC, OAuth 2.0, SAML)
      ▼
 Apps and APIs  ◄──── SCIM provisioning ────  Directory

 Around everything:
   Governance (access requests, reviews)      Privileged access (PIM / PAM)
   Logs and monitoring (sign-in, audit)       Automation (APIs, scripts)
```

## Each piece, one line

| Component | What it does | Note |
| --- | --- | --- |
| Source of truth | Says who should exist and in what role | [Identity lifecycle](/notes/identity-lifecycle) |
| Directory | Stores identities, groups and attributes | [Entra ID basics](/notes/entra-id) |
| Identity provider | Authenticates and issues tokens | [OpenID Connect](/notes/oidc) |
| Policy engine | Decides allow, block or "require more" | [Conditional Access](/notes/conditional-access) |
| Provisioning | Creates and removes app accounts | [SCIM](/notes/scim) |
| Governance | Proves access is still right | [What is IGA?](/notes/what-is-iga) |
| Privileged access | Protects admin accounts | [What is PAM?](/notes/what-is-pam) |
| Logs | Record what happened | [Sign-in and audit logs](/notes/logs) |

## A sign-in, end to end

1. A user opens an app. The app redirects them to the identity provider.
2. The IdP authenticates them (password, passkey, MFA).
3. The policy engine checks signals such as user, device, location and risk.
4. If allowed, the IdP issues tokens back to the app.
5. The app calls its API with the access token. The API validates it and checks authorization.
6. Every step is logged.

This matches NIST SP 800-207's zero trust model: the IdP and policy engine decide, and the app and API enforce.

## Microsoft's reference

Microsoft's Entra architecture documentation describes this kind of setup, and its "secure introduction" series explains how to isolate resources and delegate administration.

## Check yourself

1. Where does the user's identity *originate* in a well-run organization?
2. Which component enforces "require MFA from unknown locations"?
3. Name two things that sit "around everything" rather than in the sign-in path.

## Sources

- Microsoft Learn: [Microsoft Entra architecture](https://learn.microsoft.com/en-us/entra/architecture/architecture)
- Microsoft Learn: [Introduction to delegated administration and isolated environments](https://learn.microsoft.com/en-us/entra/architecture/secure-introduction)
- Microsoft Learn: [Identity and access management fundamentals](https://learn.microsoft.com/en-us/entra/fundamentals/introduction-identity-access-management)
- NIST: [SP 800-207, Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
