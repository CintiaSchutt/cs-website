---
title: SCIM provisioning
summary: A standard REST API and schema for creating, updating and deactivating user accounts across systems.
---

## In one sentence

**SCIM** (System for Cross-domain Identity Management) is an IETF standard that defines a common **schema** for users and groups and a **REST protocol** to manage them, so an identity provider can provision accounts in apps automatically.

## The three RFCs

| RFC | Covers |
| --- | --- |
| **RFC 7642** | Concepts and use cases |
| **RFC 7643** | Core schema: `User`, `Group` and the Enterprise User extension |
| **RFC 7644** | Protocol: endpoints, operations, filtering, bulk requests |

## Roles

- **SCIM client**: sends the changes. Usually the identity provider (Microsoft Entra ID, Okta).
- **SCIM service provider**: the app that exposes the SCIM endpoints and holds the accounts.

## Endpoints and operations

| Request | Purpose |
| --- | --- |
| `POST /Users` | Create a user |
| `GET /Users/{id}` | Read one user |
| `GET /Users?filter=userName eq "jdoe@example.com"` | Find a user |
| `PUT /Users/{id}` | Replace a user |
| `PATCH /Users/{id}` | Change some attributes |
| `DELETE /Users/{id}` | Delete a user |
| `/Groups` | The same operations for groups |
| `/ServiceProviderConfig`, `/Schemas`, `/ResourceTypes` | Discover what the server supports |

## A user resource

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "id": "2819c223-7f76-453a-919d-413861904646",
  "externalId": "E12345",
  "userName": "jdoe@example.com",
  "name": { "givenName": "Jane", "familyName": "Doe" },
  "emails": [{ "value": "jdoe@example.com", "primary": true }],
  "active": true
}
```

- `id` is set by the app. `externalId` is the client's own identifier.
- `active: false` is how many clients **deactivate** a user instead of deleting them.

```http
PATCH /Users/2819c223-7f76-453a-919d-413861904646
Content-Type: application/scim+json

{ "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations": [{ "op": "replace", "path": "active", "value": false }] }
```

## In Microsoft Entra and Okta

- **Microsoft Entra** provisioning runs an initial cycle, then incremental cycles that send only changes. It acts as the SCIM client. Microsoft documents what your SCIM endpoint must support to integrate.
- **Okta** uses SCIM for its provisioning integrations and describes provisioning as Create, Read, Update and **Deprovision** (instead of delete).

## Security angle

- The SCIM endpoint can create and disable accounts, so protect it with strong authentication (for example an OAuth bearer token) and TLS.
- Treat SCIM input as untrusted: validate attributes and don't let it grant admin rights by accident.
- Deprovisioning through SCIM is what closes leavers' accounts in SaaS apps. Test it, not just account creation.

## Check yourself

1. Which side hosts the `/Users` endpoint: the IdP or the app?
2. What is the difference between `id` and `externalId`?
3. Why do many clients set `active: false` instead of sending `DELETE`?

## Sources

- IETF: [RFC 7642, SCIM: Definitions, Overview, Concepts, and Requirements](https://www.rfc-editor.org/rfc/rfc7642)
- IETF: [RFC 7643, SCIM: Core Schema](https://www.rfc-editor.org/rfc/rfc7643)
- IETF: [RFC 7644, SCIM: Protocol](https://www.rfc-editor.org/rfc/rfc7644)
- Microsoft Learn: [Develop and plan provisioning for a SCIM endpoint](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups)
- Microsoft Learn: [How application provisioning works](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/how-provisioning-works)
- Okta Help: [Provisioning](https://help.okta.com/en-us/content/topics/provisioning/lcm/con-okta-prov.htm)
- Okta Help: [SCIM app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps-about-scim.htm)
