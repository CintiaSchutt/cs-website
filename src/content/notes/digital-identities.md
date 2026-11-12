---
title: Digital identities: people, devices and workloads
summary: Not every identity is a person. Devices and software need identities too, and each kind is secured differently.
---

## In one sentence

A **digital identity** is the unique representation of a subject (a person, device or piece of software) in an online system, so that system can authenticate it and decide its access.

## Three kinds of identity

| Kind | Examples | How it usually authenticates |
| --- | --- | --- |
| **People** | Employees, contractors, customers, partners (guests) | Password, MFA, passkeys |
| **Devices** | Laptops, phones | Device registration, certificates |
| **Workloads** | Apps, APIs, scripts, CI/CD pipelines, containers | Client secrets, certificates, managed identities, federated tokens |

NIST SP 800-63-4 uses precise words for people: a **subject** is the person, a **subscriber** is someone who has an account with a credential service provider, and a **claimant** is someone trying to prove they are that subscriber.

## Workload identities in Microsoft Entra

Microsoft groups these under *workload identities*:

- **Application** and **service principal**: the identity an app uses in a tenant (see [Entra application registration](/notes/app-registration)).
- **Managed identity**: an identity for an Azure resource where Azure handles the credential for you. Your code never sees a secret.
- **Workload identity federation**: lets a workload outside Azure, such as **GitHub Actions** or a **Kubernetes** workload, swap a token from its own platform for a Microsoft Entra access token. No stored secret is needed.

```yaml
# GitHub Actions: sign in to Azure with a federated credential.
# The IDs below are not passwords, and no client secret is stored.
permissions:
  id-token: write   # lets the job request an OIDC token from GitHub
steps:
  - uses: azure/login@v2
    with:
      client-id: ${{ secrets.AZURE_CLIENT_ID }}
      tenant-id: ${{ secrets.AZURE_TENANT_ID }}
      subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

## Devices in Microsoft Entra

A device can be **Microsoft Entra registered** (often a personal device), **Microsoft Entra joined** (company-owned, cloud first) or **Microsoft Entra hybrid joined** (joined to on-premises Active Directory and also known to Entra). Policies like [Conditional Access](/notes/conditional-access) can then require a compliant or joined device.

## Where I've seen this

I support CI/CD with GitHub Actions, Docker and Azure Kubernetes Service. A pipeline that deploys to Azure is a workload identity, and whether it uses a stored secret or a federated credential is an IAM decision.

## Security angle

- Workload credentials are easy to forget: secrets end up in code, in config files or in pipeline variables with no expiry.
- Prefer managed identities or workload identity federation over long-lived secrets.
- Workloads need owners, least privilege and reviews, just like people.

## Check yourself

1. What is the difference between a subject and a subscriber in NIST terms?
2. Why is a managed identity safer than a client secret?
3. Name two ways a device can be known to Microsoft Entra.

## Sources

- NIST CSRC Glossary: [digital identity](https://csrc.nist.gov/glossary/term/digital_identity)
- NIST: [SP 800-63-4, Digital Identity Guidelines](https://pages.nist.gov/800-63-4/sp800-63.html)
- Microsoft Learn: [What are workload identities?](https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview)
- Microsoft Learn: [Managed identities for Azure resources](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview)
- Microsoft Learn: [Workload identity federation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation)
- Microsoft Learn: [Use GitHub Actions to connect to Azure with OpenID Connect](https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect)
- Microsoft Learn: [What is device identity?](https://learn.microsoft.com/en-us/entra/identity/devices/overview)
