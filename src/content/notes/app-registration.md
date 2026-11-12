---
title: Entra application registration and consent
summary: How an app gets an identity in Microsoft Entra, what permissions it can ask for, and who is allowed to approve them.
---

## In one sentence

**Registering an app** in Microsoft Entra gives it an identity (a client ID), sign-in settings and the permissions it may request. **Consent** is the approval, by a user or an admin, that lets the app use those permissions.

## Application object vs service principal

| | Application object | Service principal |
| --- | --- | --- |
| What it is | The app's global definition | The app's local instance in one tenant |
| Where it lives | Only in the app's home tenant | In every tenant where the app is used |
| Portal blade | *App registrations* | *Enterprise applications* |
| Analogy | A class | An object created from it |

A multi-tenant app has one application object and many service principals, one per customer tenant. Policies, consent and user assignment apply to the **service principal**.

## What you configure

- **Redirect URIs** per platform: *Web*, *Single-page application* or *Mobile and desktop*. Tokens are only sent to registered URIs.
- **Credentials** (confidential clients only): certificates, client secrets or **federated credentials**. Microsoft recommends certificates over secrets.
- **API permissions** the app requests, and **app roles** it defines.
- **Expose an API**: the scopes your own API offers, such as `api://invoices/Invoices.Read`.

## Two kinds of permissions

| | Delegated permissions | Application permissions |
| --- | --- | --- |
| Acts as | The signed-in user | The app itself, no user |
| Token claim | `scp` | `roles` |
| Effective access | Overlap of the app's permission and the user's own rights | Everything the permission allows, across the tenant |
| Consent | User or admin, depending on the permission | **Admin only** |
| Example | `User.Read` (read my profile) | `User.Read.All` (read every user) |

## Consent

- **User consent**: a user approves low-risk delegated permissions for themselves.
- **Admin consent**: an admin approves for the whole organization. It's required for application permissions and high-privilege delegated ones.
- **Admin consent workflow**: users can *request* an app, and a designated reviewer approves or denies it.

Microsoft's built-in policy `microsoft-user-default-low` allows user consent only for apps from **verified publishers** (or registered in your tenant), and only for permissions you classify as **low impact**.

## Common errors

| Code | Meaning (Microsoft error reference) |
| --- | --- |
| `AADSTS50011` | Redirect URI doesn't match the ones registered |
| `AADSTS65001` | The user or admin hasn't consented to the app |
| `AADSTS700016` | The app wasn't found in the directory or tenant |
| `AADSTS7000215` | Invalid client secret |

## Security angle

- **Consent phishing**: an attacker's app asks users for broad permissions. Limiting user consent and using the admin consent workflow reduces this.
- Prefer **managed identities** or **federated credentials** over secrets. Secrets expire and leak.
- Review service principals with high application permissions regularly: they act without a user and without MFA.

## Where I've seen this

As a developer working with OAuth 2.0 and OIDC, I've configured apps on the developer side: client IDs, redirect URIs and scopes. The IAM side is the same objects seen from the admin's chair: who may consent, which permissions are too broad, and which credentials are about to expire.

## Flashcards

```flashcards
Q: What is the difference between an application object and a service principal?
A: The application object is the app's global definition in its home tenant. A service principal is its local instance in each tenant where it is used.

Q: Which object do Conditional Access, consent and user assignment apply to?
A: The **service principal** (shown under Enterprise applications).

Q: Which credential type does Microsoft recommend over client secrets?
A: **Certificates**. Federated credentials avoid secrets entirely.

Q: Delegated vs application permissions: who does the app act as?
A: **Delegated**: the signed-in user. **Application**: the app itself, with no user.

Q: Which token claim carries delegated scopes, and which carries app roles?
A: `scp` for delegated scopes. `roles` for app roles and application permissions.

Q: Why do application permissions always need admin consent?
A: They act tenant-wide with no user. For example, `User.Read.All` reads every user.

Q: What does the admin consent workflow do?
A: Users can **request** an app, and a designated reviewer approves or denies it.

Q: What does the built-in `microsoft-user-default-low` consent policy allow?
A: User consent only for apps from **verified publishers** (or registered in your tenant), and only for **low-impact** permissions.

Q: What do `AADSTS50011` and `AADSTS65001` mean?
A: `50011`: the redirect URI doesn't match. `65001`: the user or admin hasn't consented.

Q: What is consent phishing?
A: An attacker's app asks users for broad permissions, hoping they accept.
```

## Sources

- Microsoft Learn: [Application and service principal objects](https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals)
- Microsoft Learn: [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- Microsoft Learn: [Add and manage application credentials](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials)
- Microsoft Learn: [Overview of permissions and consent](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview)
- Microsoft Learn: [Configure how users consent to applications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent)
- Microsoft Learn: [Configure the admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow)
- Microsoft Learn: [Microsoft Entra authentication and authorization error codes](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes)
