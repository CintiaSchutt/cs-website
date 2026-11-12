---
title: Federation and trust
summary: Federation lets one organization's identity provider vouch for a user to another organization's apps.
---

## In one sentence

**Federation** is a trust relationship where an app (the **relying party**) accepts a user's sign-in from an **identity provider** it doesn't run itself, based on a signed message called an **assertion**.

## The parties

| Term | Meaning | Example |
| --- | --- | --- |
| **Identity provider (IdP)** | Authenticates the user and issues assertions | Microsoft Entra ID, Okta, Google |
| **Relying party (RP)** / service provider (SP) | Trusts the IdP's assertion | A SaaS app like Salesforce |
| **Assertion** | Signed statement about the user and their sign-in | SAML assertion, OIDC ID token |
| **Trust agreement** | The configuration that says "I trust this IdP" | Exchanged metadata, keys, URLs |

## How trust is set up

Trust is technical *and* contractual:

1. The RP and IdP exchange **metadata**: identifiers, endpoints and **signing keys or certificates**.
2. The IdP signs every assertion. The RP checks the signature with the IdP's public key.
3. Both agree on which **claims** (attributes) are sent, such as email, name or employee ID.

In OpenID Connect, the RP can fetch most of this automatically from the IdP's discovery document (`/.well-known/openid-configuration`). In SAML, the parties usually exchange XML metadata files.

## Federation assurance levels (NIST)

NIST SP 800-63C-4 defines three federation assurance levels:

| | FAL1 | FAL2 | FAL3 |
| --- | --- | --- | --- |
| Audience | Several RPs allowed (one recommended) | One RP per assertion | One RP per assertion |
| Assertion injection protection | Recommended | Required | Required |
| Trust agreement | Subscriber-driven or pre-established | Pre-established | Pre-established |
| Presentation | Bearer assertion | Bearer assertion | Holder-of-key assertion or bound authenticator |

A **bearer** assertion works for whoever holds it. **Holder-of-key** means the user must also prove they hold a specific key.

## Federation in Microsoft Entra

- **B2B collaboration**: guests from another organization sign in with their own organization's identity and get access to your apps.
- **Federation with an external IdP**: for example, on-premises AD FS (see [Hybrid identity](/notes/hybrid-identity)).

## Security angle

- The RP must validate signature, issuer, audience and expiry, every time.
- Signing certificates expire. A forgotten rollover breaks sign-in for everyone.
- Trusting an IdP means trusting its security: a compromised IdP can sign in as anyone.

## Flashcards

```flashcards
Q: What is federation?
A: A trust relationship where an app (the relying party) accepts a sign-in from an identity provider it doesn't run, based on a signed **assertion**.

Q: What is a relying party?
A: The app or service provider that trusts the IdP's assertion, such as a SaaS app.

Q: What do the RP and IdP exchange to set up trust?
A: **Metadata**: identifiers, endpoints and signing keys or certificates. They also agree on which claims are sent.

Q: How does the RP check an assertion's signature?
A: With the IdP's **public key**.

Q: Where does an OIDC relying party find most of the IdP's settings automatically?
A: In the discovery document at `/.well-known/openid-configuration`.

Q: How many RPs can one assertion be for at FAL2 and FAL3?
A: **One** RP per assertion.

Q: What is the difference between a bearer assertion and holder-of-key?
A: A **bearer** assertion works for whoever holds it. **Holder-of-key** means the user must also prove they hold a specific key.

Q: What forgotten task breaks sign-in for everyone?
A: A signing **certificate rollover**: certificates expire.
```

## Sources

- NIST CSRC Glossary: [federation](https://csrc.nist.gov/glossary/term/federation)
- NIST: [SP 800-63C-4, Federation and Assertions](https://pages.nist.gov/800-63-4/sp800-63c.html)
- OpenID Foundation: [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)
- OASIS: [SAML 2.0 Technical Overview](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- Microsoft Learn: [B2B collaboration fundamentals](https://learn.microsoft.com/en-us/entra/external-id/b2b-fundamentals)
