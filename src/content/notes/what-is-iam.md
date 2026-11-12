---
title: What is IAM?
summary: The people, processes and technology that make sure the right identities get the right access to the right resources.
---

## In one sentence

Identity and access management (IAM) is how an organization knows **who** (or what) is asking for access, **proves** it, and **decides** what that identity is allowed to do.

## The core questions IAM answers

| Question | IAM term | Example |
| --- | --- | --- |
| Who are you? | **Identity** | A user account, a device, an app |
| Can you prove it? | **Authentication** (AuthN) | Password plus passkey, a certificate |
| What can you do? | **Authorization** (AuthZ) | Read-only access to the billing API |
| Is it still right? | **Governance** | A manager reviews the team's access every quarter |
| What happened? | **Audit** | Sign-in and change logs |

Microsoft's IAM fundamentals page explains these building blocks: identities, authentication, authorization, identity providers, directories, tokens and the standards that connect them.

## Three kinds of IAM you'll hear about

- **Workforce IAM**: employees and contractors signing in to company apps (Microsoft Entra ID, Okta, Active Directory).
- **Customer IAM (CIAM)**: the public signing in to a company's product. Scale, self-service sign-up and a smooth experience matter a lot here.
- **Workload IAM**: apps, services and scripts that need access without a person present (see [Digital identities](/notes/digital-identities)).

## Key building blocks

- **Identity provider (IdP)**: the system that signs people in and issues proof of that sign-in (tokens or assertions) to apps.
- **Directory**: the store of identities and their attributes (name, department, groups).
- **Standards**: OAuth 2.0, OpenID Connect and SAML let apps trust an IdP without building their own sign-in. SCIM moves account data between systems.
- **Policy**: rules such as "require MFA from outside the office" or "only HR can read salary data".

## Where I've seen this

My developer work at QHR Technologies included replacing an internal identity provider with **Azure AD B2C**, which is a CIAM product, for millions of users. That work was IAM in practice: OAuth 2.0 and OpenID Connect sign-in, tokens, and a migration plan with a fallback to the old login.

## Security angle

Most attacks need an identity at some point: a stolen password, a token, an over-privileged service account. That is why IAM sits at the centre of modern security models like zero trust (see [Least privilege and zero trust](/notes/least-privilege)).

## Flashcards

```flashcards
Q: In one sentence, what is IAM?
A: How an organization knows **who** (or what) is asking for access, **proves** it, and **decides** what that identity is allowed to do.

Q: Which IAM term answers "Can you prove it?"
A: **Authentication** (AuthN), for example a password plus a passkey, or a certificate.

Q: Which IAM term answers "What can you do?"
A: **Authorization** (AuthZ), for example read-only access to the billing API.

Q: What does governance add on top of authentication and authorization?
A: It asks whether access is **still right** over time, for example a manager reviewing the team's access every quarter.

Q: What is the difference between workforce IAM and customer IAM (CIAM)?
A: Workforce IAM signs employees and contractors in to company apps. CIAM signs the public in to a company's product, where scale, self-service sign-up and a smooth experience matter a lot.

Q: What is workload IAM?
A: Identity for apps, services and scripts that need access without a person present.

Q: What does an identity provider (IdP) do?
A: It signs people in and issues proof of that sign-in (tokens or assertions) to apps.

Q: Which standards let apps trust an IdP, and which one moves account data between systems?
A: OAuth 2.0, OpenID Connect and SAML let apps trust an IdP. **SCIM** moves account data.

Q: Is Azure AD B2C a workforce or a CIAM product?
A: A **CIAM** product: it signs customers in to an organization's apps.

Q: Why does IAM sit at the centre of zero trust?
A: Most attacks need an identity at some point: a stolen password, a token or an over-privileged service account.
```

## Sources

- NIST CSRC Glossary: [identity and access management](https://csrc.nist.gov/glossary/term/identity_and_access_management)
- Microsoft Learn: [Identity and access management (IAM) fundamentals](https://learn.microsoft.com/en-us/entra/fundamentals/introduction-identity-access-management)
- Microsoft Learn: [What is Microsoft Entra?](https://learn.microsoft.com/en-us/entra/fundamentals/what-is-entra)
- Microsoft Learn: [Microsoft Entra External ID overview](https://learn.microsoft.com/en-us/entra/external-id/external-identities-overview)
