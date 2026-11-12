---
title: SAML 2.0
summary: An XML-based standard for web single sign-on, still common in enterprise and SaaS apps.
---

## In one sentence

SAML 2.0 (Security Assertion Markup Language) lets a user sign in once at an **identity provider (IdP)** and reach other apps (**service providers**, SPs), which trust signed XML **assertions** from the IdP.

## The four building blocks (OASIS)

| Block | What it is | Example |
| --- | --- | --- |
| **Assertions** | Statements about a subject | Authentication, attribute and authorization decision statements |
| **Protocols** | Request and response messages | `AuthnRequest` and `Response` |
| **Bindings** | How messages travel | HTTP Redirect, HTTP POST, HTTP Artifact, SOAP |
| **Profiles** | Combinations for a use case | Web Browser SSO profile |

Partners exchange **metadata** (XML with entity IDs, endpoints and signing certificates) to set up trust.

## SP-initiated Web Browser SSO

1. The user opens the app (SP).
2. The SP sends the browser to the IdP with an `AuthnRequest` (usually HTTP Redirect binding).
3. The user signs in at the IdP.
4. The IdP returns a signed `Response` with an assertion to the SP's **Assertion Consumer Service (ACS) URL** (usually HTTP POST binding).
5. The SP validates it and starts its own session.

In **IdP-initiated** SSO, the user starts at the IdP portal and the SP receives a response it never asked for. OWASP points out the extra risks of these unsolicited responses.

## Inside an assertion (simplified)

```xml
<saml:Assertion ID="_abc123" IssueInstant="2026-11-10T15:00:00Z">
  <saml:Issuer>https://idp.example.com</saml:Issuer>
  <ds:Signature>...</ds:Signature>
  <saml:Subject>
    <saml:NameID>cintia@example.com</saml:NameID>
    <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
      <saml:SubjectConfirmationData Recipient="https://app.example.com/acs"
          NotOnOrAfter="2026-11-10T15:05:00Z" InResponseTo="_req789"/>
    </saml:SubjectConfirmation>
  </saml:Subject>
  <saml:Conditions NotBefore="2026-11-10T14:59:00Z" NotOnOrAfter="2026-11-10T15:05:00Z">
    <saml:AudienceRestriction><saml:Audience>https://app.example.com</saml:Audience></saml:AudienceRestriction>
  </saml:Conditions>
  <saml:AttributeStatement>...</saml:AttributeStatement>
</saml:Assertion>
```

## SAML compared with OIDC

| | SAML 2.0 | OpenID Connect |
| --- | --- | --- |
| Format | XML | JSON / JWT |
| Typical use | Enterprise web SSO | Web, mobile, SPAs, APIs |
| Proof of sign-in | Assertion | ID token |
| Trust setup | Exchange metadata | Discovery URL |
| API access | Not designed for it | Pairs with OAuth 2.0 access tokens |

## In Microsoft Entra

Setting up SAML SSO for an enterprise app means filling in the **Identifier (Entity ID)**, the **Reply URL (ACS URL)** and optionally a **Sign on URL**, then giving the app the Entra signing certificate or federation metadata URL. Claims such as `NameID` and attributes are mapped in *Attributes & Claims*.

## Security angle (OWASP SAML Security Cheat Sheet)

- Validate the **signature**, and make sure it covers the part of the document you actually use. This is the defence against *XML Signature Wrapping* attacks.
- Check `Audience`, `Recipient`/`Destination`, `NotBefore`/`NotOnOrAfter` and, for SP-initiated flows, `InResponseTo`.
- Reject replayed assertions: remember assertion IDs until they expire.
- Use a maintained SAML library and a hardened XML parser. Never parse SAML by hand.

## Flashcards

```flashcards
Q: What is SAML 2.0 used for?
A: Web single sign-on: apps (service providers) trust signed XML assertions from an identity provider.

Q: Name the four SAML building blocks.
A: **Assertions**, **protocols**, **bindings** and **profiles**.

Q: What is the ACS URL?
A: The service provider's **Assertion Consumer Service** URL, where the IdP sends the SAML response.

Q: Which bindings usually carry the request and the response?
A: HTTP **Redirect** for the `AuthnRequest`, HTTP **POST** for the response.

Q: Which element limits which SP can accept an assertion?
A: `AudienceRestriction` (the `Audience`).

Q: Why is IdP-initiated SSO riskier?
A: The SP receives a response it never asked for, so there is no `InResponseTo` to match. OWASP points out these extra risks.

Q: What defends against XML Signature Wrapping?
A: Validating the signature and making sure it covers the part of the document you actually use, with a maintained library.

Q: How do you reject replayed assertions?
A: Remember assertion IDs until they expire.

Q: What do you fill in for SAML SSO on an Entra enterprise app?
A: The **Identifier (Entity ID)**, the **Reply URL (ACS URL)** and optionally a **Sign on URL**.

Q: SAML vs OIDC: which format does each use?
A: SAML uses **XML**. OIDC uses **JSON / JWT**.
```

## Sources

- OASIS: [SAML 2.0 Technical Overview](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- OASIS: [Assertions and Protocols (saml-core)](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
- OASIS: [Bindings (saml-bindings)](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf)
- OASIS: [Profiles (saml-profiles)](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf)
- OWASP: [SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
- Microsoft Learn: [Single sign-on SAML protocol](https://learn.microsoft.com/en-us/entra/identity-platform/single-sign-on-saml-protocol)
- Microsoft Learn: [Enable SAML single sign-on for an enterprise application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso)
